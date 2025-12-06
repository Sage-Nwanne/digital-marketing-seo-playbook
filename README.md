# SEO Case Studies & Technical Optimization Projects

This repository showcases my approach to technical SEO, content strategy, and site performance optimization through real and simulated case studies.

I specialize in bridging the gap between **software engineering and SEO**, applying backend logic, automation, and data-driven analysis to improve search visibility and user experience.

---

## Case Study Index

| Case Study | Summary | Skills Demonstrated |
|------------|---------|---------------------|
| [Technical SEO Audit](./case-study-1-technical-seo-audit/) | Identified crawl issues, metadata gaps, and Core Web Vitals problems; implemented structured data and site architecture fixes | Screaming Frog, Lighthouse, JSON-LD Schema, GSC |
| [Content Strategy Plan](./case-study-2-content-strategy/) | Created keyword clusters, 3-month content roadmap, and internal linking strategy for SaaS platform | Keyword Research, Content Architecture, Sitemap Analysis |
| [Performance Optimization](./case-study-3-performance-optimization/) | Reduced LCP by 56%, implemented lazy-loading and JavaScript optimizations for marketplace app | PageSpeed, Core Web Vitals, Performance Engineering |
| [Automation Tools](./tools/) | Built metadata checker, SEO audit scripts, and technical playbook | Node.js, Automation, Scripting |

---

## Tools & Techniques

| Category | Tools & Methods |
|----------|-----------------|
| **Auditing** | Google Search Console, Lighthouse, Screaming Frog SEO Spider |
| **Research** | SEMRush, Keyword Gap Analysis, Topical Clustering |
| **Implementation** | JSON-LD Structured Data, Technical SEO Best Practices |
| **Performance** | Page Speed Optimization, Core Web Vitals (LCP, CLS, TTFB) |
| **Automation** | Node.js Scripts, Programmatic SEO |

---

## Case Studies

### 1. Technical SEO Audit & Fixes (Client Project – Anonymized)

**Issues Identified:**
- Missing alt attributes across ~120 images
- Poor CLS & LCP metrics (layout shift from hero images)
- Incorrect canonical URLs on blog pages
- Duplicate title tags due to pagination
- Orphan pages discovered via crawl map
- Sitemap not submitted in Search Console
- Slow TTFB on `/shop` due to inefficient server logic

**Solutions Implemented:**
- Compressed and lazy-loaded hero images
- Preloaded key font files and implemented caching headers
- Added canonical tags to paginated categories
- Added JSON-LD schema for Product, Breadcrumb, and Logo
- Generated updated XML sitemap and fixed robots.txt
- Introduced metadata validation script

**Results:**

| Metric | Before | After |
|--------|--------|-------|
| Lighthouse Performance Score | 54 | 92 (+38) |
| Indexed Pages | 1,856 | 2,247 (+21%) |
| LCP | 5.2s | 1.8s (-65%) |

| Before | After |
|--------|-------|
| ![Lighthouse Before](./case-study-1-technical-seo-audit/lighthouse-before.png) | ![Lighthouse After](./case-study-1-technical-seo-audit/lighthouse-after.png) |

*Note: Lighthouse screenshots are placeholder images for demonstration.*

**Related Files:**
- [Full Audit Report](./case-study-1-technical-seo-audit/audit-report.md)
- [JSON-LD Schema Example](./case-study-1-technical-seo-audit/schema-example.json)
- [Technical SEO Checklist](./tools/technical-seo-checklist.md)

---

### 2. AI-Driven Content Strategy for SaaS Platform

**Goal:** Build a 3-month content roadmap to increase visibility for mid-funnel keywords related to productivity and automation.

**Target Keywords:**
- "best productivity templates"
- "AI workflow tools"
- "how to automate small business tasks"

**Actions Taken:**
- Keyword gap analysis and search intent mapping
- Topical clustering and content calendar creation
- Semantic optimization using AI-assisted analysis
- Sitemap analysis and cleanup

**Results:**

| Metric | Before | After (60 days) |
|--------|--------|-----------------|
| Organic Impressions | 12,400/mo | 47,120/mo (+280%) |
| Indexed Pages | 34 | 46 (+12) |
| Blog Traffic | 2,100/mo | 8,400/mo (+300%) |

**Related Files:**
- [Full Content Plan](./case-study-2-content-strategy/content-plan.md)
- [Sitemap Analysis](./case-study-2-content-strategy/sitemap-analysis.md)
- [SEO Playbook](./tools/seo-playbook.md)

---

### 3. Performance Optimization for Marketplace App

**Problem:** Slow time-to-first-byte (TTFB) and render delays on key product pages affecting user experience and SEO.

**Fixes Applied:**
- Implemented image compression (-65% file size reduction)
- Reduced unused JavaScript by splitting bundles (-77%)
- Added HTTP caching headers
- Optimized server logic to reduce TTFB
- Added lazy-loading for images

**Results:**

| Metric | Before | After |
|--------|--------|-------|
| LCP (Largest Contentful Paint) | 4.8s | 2.1s (-56%) |
| CLS (Cumulative Layout Shift) | 0.24 | 0.05 (-79%) |
| TTFB (Time to First Byte) | 1,200ms | 380ms (-68%) |
| PageSpeed Score | 63 | 89 (+26) |

**Related Files:**
- [Full Optimization Report](./case-study-3-performance-optimization/page-seed-report.md)
- [Lazy Loading Code](./case-study-3-performance-optimization/optimized-code-snippet.js)
- [Before/After Metrics (JSON)](./case-study-3-performance-optimization/before-after-comparision.json)

---

## Additional Resources

| Resource | Description |
|----------|-------------|
| [Technical SEO Checklist](./tools/technical-seo-checklist.md) | Comprehensive checklist covering indexation, metadata, performance, and structured data |
| [Metadata Audit Script](./tools/metadata-audit-script.js) | Node.js script using `node-fetch` and `cheerio` to extract page metadata from any URL |
| [SEO Playbook](./tools/seo-playbook.md) | Playbook covering crawling, indexation, performance, structured data, and content strategy |

---

## How to Use This Repository

**If you're a hiring manager or collaborator:**

1. Start with the [SEO Playbook](./tools/seo-playbook.md) to understand my overall process and methodology
2. Dive into the case studies to see concrete examples of audits, content strategy, and performance optimization
3. Check the [`tools/`](./tools/) folder for scripts and checklists that demonstrate the engineering side of SEO

**If you're an engineer or SEO professional:**

1. Clone the repo and adapt the checklists and scripts for your own projects
2. The [metadata audit script](./tools/metadata-audit-script.js) is ready to run — just install dependencies with `npm install node-fetch cheerio`
3. PRs and suggestions are welcome

---

## About This Repository

This repository demonstrates my ability to combine **engineering skills**, **SEO strategy**, and **business thinking** to drive measurable growth.

Whether it's diagnosing crawl issues, optimizing Core Web Vitals, or building content systems at scale—I approach SEO as both a technical discipline and a growth lever for digital-first organizations.

---

## Contact

Interested in collaborating or have questions about any of these case studies? Feel free to reach out.
