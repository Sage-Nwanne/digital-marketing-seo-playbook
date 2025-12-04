# Technical SEO Audit – Case Study 1 (Anonymized Client)

## Overview
This audit identifies technical issues affecting indexation, crawlability, and performance. Insights are based on Lighthouse, Screaming Frog, and manual inspection.

## Key Findings
- Missing alt attributes across ~120 images
- Poor CLS & LCP metrics (layout shift from hero images)
- Incorrect canonical URLs on blog pages
- Duplicate title tags due to pagination
- Orphan pages discovered via crawl map
- Sitemap not submitted in Search Console
- Slow TTFB on /shop due to inefficient server logic

## Recommendations
### 1. Improve Core Web Vitals
- Compress and lazy-load hero images
- Preload key font files
- Implement proper caching headers

### 2. Fix Metadata & Canonicals
- Add canonical tags to paginated categories
- Rewrite duplicate titles & meta descriptions

### 3. Structured Data
- Add JSON-LD schema for Product, Breadcrumb, and Logo

### 4. Sitemap & Robots
- Generate updated XML sitemap
- Allow crawling for category pages blocked by mistake

## Expected Impact
- +15–25% improvement in indexation coverage
- Higher ranking stability for product pages
- Improved crawl efficiency and bot access
