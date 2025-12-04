/**
 * SEO Metadata Audit Script
 *
 * A comprehensive Node.js tool for auditing on-page SEO elements.
 * Extracts and validates metadata, headings, images, and links from any URL.
 *
 * Usage:
 *   node metadata-audit-script.js https://example.com
 *   node metadata-audit-script.js urls.txt (for batch processing)
 *
 * Dependencies:
 *   npm install node-fetch cheerio
 */

import fetch from "node-fetch";
import * as cheerio from "cheerio";
import { readFileSync, writeFileSync } from "fs";

// Configuration
const CONFIG = {
  titleMinLength: 30,
  titleMaxLength: 60,
  descriptionMinLength: 120,
  descriptionMaxLength: 160,
  timeout: 10000,
  userAgent: "SEO-Audit-Bot/1.0 (https://github.com/yourusername/seo-tools)"
};

/**
 * Fetches and parses HTML from a URL
 */
async function fetchPage(url) {
  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), CONFIG.timeout);

  try {
    const response = await fetch(url, {
      headers: { "User-Agent": CONFIG.userAgent },
      signal: controller.signal
    });
    clearTimeout(timeout);

    if (!response.ok) {
      throw new Error(`HTTP ${response.status}: ${response.statusText}`);
    }

    const html = await response.text();
    return { html, status: response.status, headers: response.headers };
  } catch (error) {
    clearTimeout(timeout);
    throw error;
  }
}

/**
 * Extracts all SEO-relevant metadata from HTML
 */
function extractMetadata($, url) {
  // Title analysis
  const title = $("title").text().trim();
  const titleLength = title.length;
  const titleStatus = getTitleStatus(titleLength);

  // Meta description analysis
  const metaDescription = $('meta[name="description"]').attr("content")?.trim() || "";
  const descriptionLength = metaDescription.length;
  const descriptionStatus = getDescriptionStatus(descriptionLength);

  // Heading structure
  const headings = {
    h1: $("h1").map((_, el) => $(el).text().trim()).get(),
    h2: $("h2").map((_, el) => $(el).text().trim()).get(),
    h3: $("h3").map((_, el) => $(el).text().trim()).get()
  };

  // Image audit
  const images = [];
  $("img").each((_, el) => {
    const $img = $(el);
    images.push({
      src: $img.attr("src") || "[no src]",
      alt: $img.attr("alt") || null,
      hasAlt: !!$img.attr("alt"),
      width: $img.attr("width") || null,
      height: $img.attr("height") || null,
      loading: $img.attr("loading") || null
    });
  });

  const imagesWithoutAlt = images.filter(img => !img.hasAlt);
  const imagesWithoutDimensions = images.filter(img => !img.width || !img.height);

  // Canonical and robots
  const canonical = $('link[rel="canonical"]').attr("href") || null;
  const robotsMeta = $('meta[name="robots"]').attr("content") || null;

  // Open Graph
  const openGraph = {
    title: $('meta[property="og:title"]').attr("content") || null,
    description: $('meta[property="og:description"]').attr("content") || null,
    image: $('meta[property="og:image"]').attr("content") || null,
    url: $('meta[property="og:url"]').attr("content") || null
  };

  // Twitter Card
  const twitterCard = {
    card: $('meta[name="twitter:card"]').attr("content") || null,
    title: $('meta[name="twitter:title"]').attr("content") || null,
    description: $('meta[name="twitter:description"]').attr("content") || null
  };

  // Structured data
  const structuredData = [];
  $('script[type="application/ld+json"]').each((_, el) => {
    try {
      const json = JSON.parse($(el).html());
      structuredData.push(json);
    } catch (e) {
      structuredData.push({ error: "Invalid JSON-LD" });
    }
  });

  // Internal vs external links
  const urlHost = new URL(url).hostname;
  const links = { internal: 0, external: 0, broken: [] };
  $("a[href]").each((_, el) => {
    const href = $(el).attr("href");
    try {
      const linkUrl = new URL(href, url);
      if (linkUrl.hostname === urlHost) {
        links.internal++;
      } else {
        links.external++;
      }
    } catch {
      // Relative or malformed URL
      links.internal++;
    }
  });

  return {
    url,
    title: { value: title, length: titleLength, status: titleStatus },
    metaDescription: { value: metaDescription, length: descriptionLength, status: descriptionStatus },
    headings,
    images: {
      total: images.length,
      withoutAlt: imagesWithoutAlt.length,
      withoutDimensions: imagesWithoutDimensions.length,
      details: imagesWithoutAlt.slice(0, 10) // First 10 for report
    },
    canonical,
    robotsMeta,
    openGraph,
    twitterCard,
    structuredData,
    links
  };
}

function getTitleStatus(length) {
  if (length === 0) return "MISSING";
  if (length < CONFIG.titleMinLength) return "TOO_SHORT";
  if (length > CONFIG.titleMaxLength) return "TOO_LONG";
  return "OK";
}

function getDescriptionStatus(length) {
  if (length === 0) return "MISSING";
  if (length < CONFIG.descriptionMinLength) return "TOO_SHORT";
  if (length > CONFIG.descriptionMaxLength) return "TOO_LONG";
  return "OK";
}

/**
 * Generates issues list based on audit results
 */
function generateIssues(metadata) {
  const issues = [];
  const warnings = [];

  // Title issues
  if (metadata.title.status === "MISSING") {
    issues.push("CRITICAL: Missing title tag");
  } else if (metadata.title.status === "TOO_SHORT") {
    warnings.push(`Title too short (${metadata.title.length} chars, min: ${CONFIG.titleMinLength})`);
  } else if (metadata.title.status === "TOO_LONG") {
    warnings.push(`Title too long (${metadata.title.length} chars, max: ${CONFIG.titleMaxLength})`);
  }

  // Description issues
  if (metadata.metaDescription.status === "MISSING") {
    issues.push("CRITICAL: Missing meta description");
  } else if (metadata.metaDescription.status === "TOO_SHORT") {
    warnings.push(`Meta description too short (${metadata.metaDescription.length} chars)`);
  } else if (metadata.metaDescription.status === "TOO_LONG") {
    warnings.push(`Meta description too long (${metadata.metaDescription.length} chars)`);
  }

  // H1 issues
  if (metadata.headings.h1.length === 0) {
    issues.push("CRITICAL: Missing H1 tag");
  } else if (metadata.headings.h1.length > 1) {
    warnings.push(`Multiple H1 tags found (${metadata.headings.h1.length})`);
  }

  // Image issues
  if (metadata.images.withoutAlt > 0) {
    issues.push(`${metadata.images.withoutAlt} images missing alt text`);
  }
  if (metadata.images.withoutDimensions > 0) {
    warnings.push(`${metadata.images.withoutDimensions} images missing width/height (CLS risk)`);
  }

  // Canonical
  if (!metadata.canonical) {
    warnings.push("No canonical URL specified");
  }

  // Structured data
  if (metadata.structuredData.length === 0) {
    warnings.push("No structured data (JSON-LD) found");
  }

  // Open Graph
  if (!metadata.openGraph.title || !metadata.openGraph.image) {
    warnings.push("Incomplete Open Graph tags");
  }

  return { issues, warnings };
}

/**
 * Formats audit results for console output
 */
function formatReport(metadata, issues) {
  const divider = "=".repeat(60);
  const lines = [
    divider,
    `SEO AUDIT REPORT`,
    `URL: ${metadata.url}`,
    divider,
    "",
    "TITLE TAG",
    `  Value: "${metadata.title.value}"`,
    `  Length: ${metadata.title.length} chars [${metadata.title.status}]`,
    "",
    "META DESCRIPTION",
    `  Value: "${metadata.metaDescription.value.substring(0, 100)}${metadata.metaDescription.value.length > 100 ? '...' : ''}"`,
    `  Length: ${metadata.metaDescription.length} chars [${metadata.metaDescription.status}]`,
    "",
    "HEADING STRUCTURE",
    `  H1 (${metadata.headings.h1.length}): ${metadata.headings.h1.join(" | ") || "[none]"}`,
    `  H2 count: ${metadata.headings.h2.length}`,
    `  H3 count: ${metadata.headings.h3.length}`,
    "",
    "IMAGES",
    `  Total: ${metadata.images.total}`,
    `  Missing alt: ${metadata.images.withoutAlt}`,
    `  Missing dimensions: ${metadata.images.withoutDimensions}`,
    "",
    "LINKS",
    `  Internal: ${metadata.links.internal}`,
    `  External: ${metadata.links.external}`,
    "",
    "TECHNICAL",
    `  Canonical: ${metadata.canonical || "[not set]"}`,
    `  Robots: ${metadata.robotsMeta || "[not set]"}`,
    `  Structured Data: ${metadata.structuredData.length} schema(s) found`,
    "",
    divider,
    "ISSUES FOUND",
    divider
  ];

  if (issues.issues.length === 0 && issues.warnings.length === 0) {
    lines.push("  No issues found!");
  } else {
    issues.issues.forEach(issue => lines.push(`  [ERROR] ${issue}`));
    issues.warnings.forEach(warning => lines.push(`  [WARN]  ${warning}`));
  }

  lines.push(divider);
  return lines.join("\n");
}

/**
 * Main audit function
 */
async function auditUrl(url) {
  console.log(`\nAuditing: ${url}\n`);

  try {
    const { html, status } = await fetchPage(url);
    const $ = cheerio.load(html);
    const metadata = extractMetadata($, url);
    const issues = generateIssues(metadata);
    const report = formatReport(metadata, issues);

    console.log(report);

    return { success: true, metadata, issues };
  } catch (error) {
    console.error(`Failed to audit ${url}: ${error.message}`);
    return { success: false, error: error.message };
  }
}

/**
 * Batch audit from file
 */
async function auditFromFile(filePath) {
  const urls = readFileSync(filePath, "utf-8")
    .split("\n")
    .map(line => line.trim())
    .filter(line => line && !line.startsWith("#"));

  const results = [];
  for (const url of urls) {
    const result = await auditUrl(url);
    results.push({ url, ...result });
  }

  // Generate summary
  const summary = {
    total: results.length,
    successful: results.filter(r => r.success).length,
    failed: results.filter(r => !r.success).length,
    issueCount: results.reduce((sum, r) => sum + (r.issues?.issues?.length || 0), 0),
    warningCount: results.reduce((sum, r) => sum + (r.issues?.warnings?.length || 0), 0)
  };

  console.log("\n" + "=".repeat(60));
  console.log("BATCH AUDIT SUMMARY");
  console.log("=".repeat(60));
  console.log(`Total URLs: ${summary.total}`);
  console.log(`Successful: ${summary.successful}`);
  console.log(`Failed: ${summary.failed}`);
  console.log(`Total Issues: ${summary.issueCount}`);
  console.log(`Total Warnings: ${summary.warningCount}`);

  // Save results to JSON
  const outputPath = "audit-results.json";
  writeFileSync(outputPath, JSON.stringify(results, null, 2));
  console.log(`\nResults saved to: ${outputPath}`);

  return results;
}

// CLI Entry Point
const args = process.argv.slice(2);

if (args.length === 0) {
  console.log(`
SEO Metadata Audit Script
=========================

Usage:
  node metadata-audit-script.js <url>           Audit a single URL
  node metadata-audit-script.js <file.txt>      Batch audit URLs from file

Examples:
  node metadata-audit-script.js https://example.com
  node metadata-audit-script.js urls.txt

The script checks:
  - Title tag (presence, length)
  - Meta description (presence, length)
  - H1 tags (presence, duplicates)
  - Images (alt text, dimensions)
  - Canonical URL
  - Open Graph tags
  - Structured data (JSON-LD)
  - Internal/external link counts
`);
} else {
  const input = args[0];

  if (input.startsWith("http://") || input.startsWith("https://")) {
    auditUrl(input);
  } else {
    auditFromFile(input);
  }
}
