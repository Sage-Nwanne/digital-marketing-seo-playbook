# Technical SEO Checklist

A comprehensive checklist for auditing technical SEO health. Use this as a baseline for site audits, migrations, and ongoing monitoring.

---

## 1. Crawlability

### Robots.txt
- [ ] Robots.txt exists and is accessible at `/robots.txt`
- [ ] No critical pages/directories blocked unintentionally
- [ ] Sitemap URL referenced in robots.txt
- [ ] Staging/dev environments blocked from crawling
- [ ] No syntax errors in robots.txt directives

### XML Sitemap
- [ ] Sitemap exists and is accessible
- [ ] Sitemap submitted to Google Search Console
- [ ] Sitemap submitted to Bing Webmaster Tools
- [ ] Only indexable URLs included (no 404s, redirects, or noindex pages)
- [ ] Sitemap file size under 50MB / 50,000 URLs per file
- [ ] Sitemap index used for large sites
- [ ] Last modified dates accurate and updated

### Crawl Efficiency
- [ ] No infinite crawl traps (calendars, filters, session IDs)
- [ ] Faceted navigation handled properly (noindex or canonical)
- [ ] Pagination implemented correctly (rel=prev/next or load more)
- [ ] Internal search results pages blocked or noindexed
- [ ] URL parameters configured in GSC (if applicable)

---

## 2. Indexation

### Index Coverage
- [ ] GSC Index Coverage report reviewed
- [ ] No unexpected "Excluded" pages
- [ ] "Crawled - currently not indexed" pages investigated
- [ ] "Discovered - currently not indexed" backlog addressed
- [ ] Duplicate content issues resolved

### Canonical Tags
- [ ] All pages have self-referencing canonical tags
- [ ] Canonical URLs are absolute (not relative)
- [ ] Canonicals point to preferred URL version (www vs non-www, https)
- [ ] Paginated pages canonical to page 1 OR self-reference (consistent strategy)
- [ ] No canonical chains (A → B → C)

### Indexing Directives
- [ ] Noindex tags used appropriately (thin content, utility pages)
- [ ] No conflicting signals (noindex in meta + indexed in sitemap)
- [ ] Hreflang implemented correctly for international sites
- [ ] Language/region targeting configured in GSC

---

## 3. On-Page SEO

### Title Tags
- [ ] Every page has a unique title tag
- [ ] Title length between 30-60 characters
- [ ] Primary keyword included near the beginning
- [ ] Brand name included (typically at end)
- [ ] No duplicate titles across the site

### Meta Descriptions
- [ ] Every page has a unique meta description
- [ ] Description length between 120-160 characters
- [ ] Includes primary keyword naturally
- [ ] Contains compelling call-to-action
- [ ] No duplicate descriptions across the site

### Heading Structure
- [ ] Every page has exactly one H1 tag
- [ ] H1 includes primary keyword
- [ ] Heading hierarchy is logical (H1 → H2 → H3)
- [ ] No skipped heading levels
- [ ] Headings used for structure, not styling

### Images
- [ ] All images have descriptive alt text
- [ ] Alt text includes relevant keywords where appropriate
- [ ] Image file names are descriptive (not IMG_001.jpg)
- [ ] Images are properly sized (not scaled by CSS)
- [ ] Next-gen formats used (WebP, AVIF)
- [ ] Images have explicit width/height attributes (CLS prevention)

### Internal Linking
- [ ] Important pages reachable within 3 clicks from homepage
- [ ] Orphan pages identified and linked
- [ ] Anchor text is descriptive (not "click here")
- [ ] No broken internal links (404s)
- [ ] Breadcrumbs implemented where appropriate

---

## 4. Performance (Core Web Vitals)

### Largest Contentful Paint (LCP)
- [ ] LCP under 2.5 seconds on mobile
- [ ] LCP element identified and optimized
- [ ] Hero images preloaded
- [ ] Critical CSS inlined
- [ ] Server response time (TTFB) under 600ms

### Cumulative Layout Shift (CLS)
- [ ] CLS score under 0.1
- [ ] Images and embeds have explicit dimensions
- [ ] Web fonts don't cause layout shift (font-display: swap)
- [ ] Ads and dynamic content have reserved space
- [ ] No content injected above existing content

### First Input Delay (FID) / Interaction to Next Paint (INP)
- [ ] FID under 100ms / INP under 200ms
- [ ] JavaScript execution time minimized
- [ ] Long tasks broken up
- [ ] Third-party scripts deferred or lazy-loaded
- [ ] Main thread not blocked during page load

### General Performance
- [ ] Time to First Byte (TTFB) under 600ms
- [ ] Total page weight under 3MB
- [ ] HTTP/2 or HTTP/3 enabled
- [ ] Gzip/Brotli compression enabled
- [ ] Browser caching configured (cache-control headers)
- [ ] CDN in use for static assets
- [ ] Unused CSS/JS removed or deferred
- [ ] Critical rendering path optimized

---

## 5. Mobile Optimization

- [ ] Site is mobile-responsive (passes Mobile-Friendly Test)
- [ ] Viewport meta tag configured correctly
- [ ] Tap targets adequately sized and spaced (48px minimum)
- [ ] Text readable without zooming (16px minimum)
- [ ] No horizontal scrolling required
- [ ] Mobile page speed acceptable (check PageSpeed Insights)
- [ ] No intrusive interstitials

---

## 6. Security & HTTPS

- [ ] Site fully migrated to HTTPS
- [ ] HTTP → HTTPS redirects in place (301)
- [ ] No mixed content warnings
- [ ] SSL certificate valid and not expiring soon
- [ ] HSTS enabled
- [ ] Security headers configured (X-Frame-Options, CSP, etc.)

---

## 7. Structured Data

### Implementation
- [ ] JSON-LD format used (preferred over microdata)
- [ ] Schema validates in Google Rich Results Test
- [ ] Schema validates in Schema.org Validator
- [ ] No warnings or errors in GSC Enhancements reports

### Common Schema Types
- [ ] Organization/LocalBusiness on homepage
- [ ] BreadcrumbList for navigation
- [ ] Article/BlogPosting for blog content
- [ ] Product for e-commerce pages
- [ ] FAQPage for FAQ content
- [ ] Review/AggregateRating where applicable
- [ ] HowTo for instructional content
- [ ] VideoObject for video content

---

## 8. Redirects

- [ ] No redirect chains (limit to single hop)
- [ ] No redirect loops
- [ ] 301 redirects used for permanent moves
- [ ] 302 redirects used only for temporary moves
- [ ] Old URLs redirect to relevant new pages (not all to homepage)
- [ ] Redirect map documented for site migrations
- [ ] Server-side redirects (not JavaScript/meta refresh)

---

## 9. Accessibility (SEO Impact)

- [ ] Proper heading hierarchy
- [ ] Alt text on all informational images
- [ ] Sufficient color contrast
- [ ] Keyboard navigation works
- [ ] ARIA labels used where appropriate
- [ ] Skip navigation link for screen readers
- [ ] Form inputs have associated labels

---

## 10. International SEO (If Applicable)

- [ ] Hreflang tags implemented correctly
- [ ] Self-referencing hreflang included
- [ ] x-default hreflang specified
- [ ] Hreflang reciprocal (if A points to B, B points to A)
- [ ] Language/country targeting in GSC
- [ ] Localized content (not just translated)
- [ ] Local hosting or CDN for target regions

---

## 11. Monitoring & Maintenance

### Regular Checks
- [ ] GSC checked weekly for errors
- [ ] Core Web Vitals monitored monthly
- [ ] Crawl errors addressed promptly
- [ ] Security issues monitored
- [ ] Backlink profile reviewed quarterly

### Tools to Use
- [ ] Google Search Console
- [ ] Bing Webmaster Tools
- [ ] Google Analytics 4
- [ ] Screaming Frog (monthly crawls)
- [ ] Lighthouse CI (automated testing)
- [ ] Uptime monitoring configured

---

## Audit Sign-Off

| Section | Status | Notes |
|---------|--------|-------|
| Crawlability | ☐ Pass / ☐ Fail | |
| Indexation | ☐ Pass / ☐ Fail | |
| On-Page SEO | ☐ Pass / ☐ Fail | |
| Performance | ☐ Pass / ☐ Fail | |
| Mobile | ☐ Pass / ☐ Fail | |
| Security | ☐ Pass / ☐ Fail | |
| Structured Data | ☐ Pass / ☐ Fail | |
| Redirects | ☐ Pass / ☐ Fail | |
| Accessibility | ☐ Pass / ☐ Fail | |
| International | ☐ Pass / ☐ N/A | |

**Auditor:** ___________________
**Date:** ___________________
**Next Review:** ___________________
