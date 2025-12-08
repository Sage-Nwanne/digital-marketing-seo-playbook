# Case Study 1: Technical SEO Audit & Fixes

**Client:** E-commerce Platform (Anonymized)  
**Industry:** Retail / E-commerce  
**Project Type:** Technical SEO Audit + Implementation  
**Strategist:** Sage Nwanne

**Skills:** `Technical SEO` `Screaming Frog` `Lighthouse` `Schema Markup` `Core Web Vitals` `Site Architecture`

---

## TL;DR

| | |
|---|---|
| **Problem** | E-commerce site with crawl issues, slow performance, missing schema, and indexation problems |
| **Approach** | Full technical audit using Screaming Frog + Lighthouse, prioritized fixes by impact |
| **Results** | Lighthouse score 54→92 (+38), LCP 5.2s→1.8s (-65%), indexed pages +21% |

---

## Contents

| Document | Description |
|----------|-------------|
| [Audit Report](./audit-report.md) | Full technical audit with findings and recommendations |
| [Schema Example](./schema-example.json) | Product, Breadcrumb, and Organization schema |
| [Lighthouse Before](./lighthouse-before.png) | Pre-optimization performance screenshot |
| [Lighthouse After](./lighthouse-after.png) | Post-optimization performance screenshot |

---

## The Challenge

An e-commerce client was experiencing poor organic performance despite quality products and content. Technical issues were blocking search engine crawlers and hurting user experience:

- Missing alt attributes across ~120 images
- Poor CLS & LCP metrics from unoptimized hero images
- Incorrect canonical URLs on blog pages
- Duplicate title tags from pagination
- Orphan pages discovered via crawl map
- Sitemap not submitted to Search Console
- Slow TTFB on `/shop` due to inefficient server logic

---

## Key Results

| Metric | Before | After | Improvement |
|--------|--------|-------|-------------|
| Lighthouse Performance | 54 | 92 | +38 points |
| LCP (Largest Contentful Paint) | 5.2s | 1.8s | -65% |
| Indexed Pages | 1,856 | 2,247 | +21% |
| Crawl Errors | 47 | 3 | -94% |

---

## Skills Demonstrated

| Skill | How It's Applied |
|-------|------------------|
| **Technical Auditing** | Screaming Frog crawls, Lighthouse analysis, log file review |
| **Core Web Vitals** | LCP, CLS, TTFB optimization |
| **Schema Markup** | Product, Breadcrumb, Organization JSON-LD |
| **Site Architecture** | Canonical tags, pagination handling, internal linking |
| **Performance Engineering** | Image compression, lazy loading, caching headers |

---

## Interview Talking Points

### On Technical Auditing
> "I used Screaming Frog to crawl the entire site and identified 47 crawl errors, 120 missing alt tags, and orphan pages that weren't linked from anywhere. I prioritized fixes by SEO impact and implementation effort."

### On Core Web Vitals
> "The hero images were causing layout shift and slow LCP. I implemented lazy loading, image compression, and preloading for critical assets — reducing LCP from 5.2s to 1.8s."

### On Schema Implementation
> "I added Product schema to all shop pages, enabling rich results with pricing and availability. The Breadcrumb schema improved site structure visibility in search results."

### On Measurable Results
> "The combination of technical fixes led to a 38-point Lighthouse improvement and 21% more indexed pages within 60 days. This directly translated to organic traffic growth."

### Key Artifacts to Reference
| If Asked About... | Show This File |
|-------------------|----------------|
| Audit methodology | `audit-report.md` |
| Schema implementation | `schema-example.json` |
| Before/after proof | `lighthouse-before.png` / `lighthouse-after.png` |

---

## Related Files

- [Technical SEO Checklist](../tools/technical-seo-checklist.md)
- [SEO Playbook](../tools/seo-playbook.md)
- [Metadata Audit Script](../tools/metadata-audit-script.js)

