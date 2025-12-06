# Page Speed Optimization Report

**Client:** Marketplace App (Anonymized)
**Industry:** E-commerce / Two-sided Marketplace
**Project Duration:** 4 weeks
**Engineer:** Sage Nwanne

---

## TL;DR

| | |
|---|---|
| **Site Type** | Two-sided marketplace with ~5,000 product listings |
| **Main Issues** | Slow TTFB (1,200ms), large unoptimized images, render-blocking JavaScript, poor Core Web Vitals |
| **Actions Taken** | Image compression (-65%), lazy loading, bundle splitting, HTTP caching, server-side optimization |
| **Results** | PageSpeed score 63 → 89 (+26), LCP reduced 56% (4.8s → 2.1s), CLS improved 79% (0.24 → 0.05) |

> *Note: Client data is anonymized. Metrics are from actual performance optimization project.*

---

## Problem Statement

The marketplace app was experiencing:

- **High bounce rates** on mobile (68%) correlated with slow page loads
- **Poor Core Web Vitals** failing all three metrics in Google Search Console
- **SEO impact** — Product pages dropping in rankings after Google's page experience update
- **User complaints** about slow loading, especially on product listing pages

### Initial Performance Audit

| Metric | Mobile | Desktop | Status |
|--------|--------|---------|--------|
| PageSpeed Score | 63 | 78 | Needs Improvement |
| LCP | 4.8s | 3.2s | Poor (>4s) |
| CLS | 0.24 | 0.15 | Poor (>0.25) |
| TTFB | 1,200ms | 980ms | Poor (>800ms) |
| Total Blocking Time | 890ms | 420ms | Poor |
| Total Page Weight | 4.2MB | 4.2MB | Too heavy |

---

## Root Cause Analysis

### 1. Image Issues (Biggest Impact)

```
Problem: Hero images averaged 1.8MB each
- No compression applied
- Serving PNG instead of WebP
- No lazy loading (all images loaded upfront)
- No explicit width/height (causing CLS)
```

### 2. JavaScript Bloat

```
Problem: Single 1.2MB bundle blocking render
- All JavaScript loaded synchronously
- Third-party scripts loaded in <head>
- No code splitting by route
- Unused polyfills for modern browsers
```

### 3. Server Response Time

```
Problem: TTFB averaging 1,200ms
- No CDN in use
- Database queries unoptimized
- No server-side caching
- Cold starts on serverless functions
```

### 4. Font Loading

```
Problem: Custom fonts causing FOUT and CLS
- No font-display property
- Fonts not preloaded
- Multiple font weights loaded upfront
```

---

## Solutions Implemented

### 1. Image Optimization (-65% file size)

**Before:**
```html
<img src="product-hero.png" alt="Product">
```

**After:**
```html
<picture>
  <source srcset="product-hero.avif" type="image/avif">
  <source srcset="product-hero.webp" type="image/webp">
  <img
    src="product-hero.jpg"
    alt="Product description"
    width="800"
    height="600"
    loading="lazy"
    decoding="async"
  >
</picture>
```

**Results:**
- Average image size: 1.8MB → 630KB (-65%)
- Hero image preloaded for LCP improvement
- Explicit dimensions eliminated CLS from images

### 2. JavaScript Bundle Splitting

**Before:**
```javascript
// Single monolithic bundle
import everything from './all-the-things';
```

**After:**
```javascript
// Route-based code splitting
const ProductPage = lazy(() => import('./ProductPage'));
const CheckoutPage = lazy(() => import('./CheckoutPage'));

// Third-party scripts deferred
<script src="analytics.js" defer></script>
<script src="chat-widget.js" async></script>
```

**Results:**
- Initial bundle: 1.2MB → 280KB (-77%)
- Third-party scripts no longer render-blocking
- TBT reduced from 890ms to 210ms

### 3. HTTP Caching Strategy

```
# Static assets (versioned filenames)
Cache-Control: public, max-age=31536000, immutable

# Product images (CDN cached)
Cache-Control: public, max-age=86400, stale-while-revalidate=604800

# HTML pages
Cache-Control: public, max-age=0, must-revalidate
ETag: "abc123"

# API responses
Cache-Control: private, max-age=60
```

**Results:**
- Repeat visits load in <1s
- CDN cache hit rate: 94%
- Server load reduced by 60%

### 4. Server-Side Optimizations

```javascript
// Database query optimization
// Before: N+1 query problem
products.forEach(p => fetchReviews(p.id)); // 100 queries

// After: Batched query
fetchReviewsForProducts(productIds); // 1 query

// Added Redis caching for hot data
const cachedProduct = await redis.get(`product:${id}`);
if (cachedProduct) return JSON.parse(cachedProduct);
```

**Results:**
- TTFB: 1,200ms → 380ms (-68%)
- Database queries per page: 47 → 8

### 5. Lazy Loading Implementation

See [optimized-code-snippet.js](./optimized-code-snippet.js) for the implementation.

```javascript
// Intersection Observer for lazy loading
const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const img = entry.target;
      img.src = img.dataset.src;
      observer.unobserve(img);
    }
  });
}, { rootMargin: '100px' });

document.querySelectorAll('img[data-src]').forEach(img => {
  observer.observe(img);
});
```

---

## Results

### Core Web Vitals Comparison

| Metric | Before | After | Change | Status |
|--------|--------|-------|--------|--------|
| **LCP** | 4.8s | 2.1s | -56% | Good (<2.5s) |
| **CLS** | 0.24 | 0.05 | -79% | Good (<0.1) |
| **TTFB** | 1,200ms | 380ms | -68% | Good (<800ms) |
| **TBT** | 890ms | 210ms | -76% | Good (<300ms) |
| **PageSpeed Score** | 63 | 89 | +26 | Good |

### Before/After Screenshots

| Before | After |
|--------|-------|
| ![Before](../case-study-1-technical-seo-audit/lighthouse-before.png) | ![After](../case-study-1-technical-seo-audit/lighthouse-after.png) |

*Note: Lighthouse screenshots are simulated representations for demonstration.*

### Business Impact (30 Days Post-Launch)

| Metric | Before | After | Change |
|--------|--------|-------|--------|
| Mobile Bounce Rate | 68% | 52% | -16% |
| Avg. Session Duration | 1:42 | 2:34 | +51% |
| Pages/Session | 2.1 | 3.4 | +62% |
| Conversion Rate | 1.8% | 2.3% | +28% |

### SEO Impact (60 Days Post-Launch)

| Metric | Before | After | Change |
|--------|--------|-------|--------|
| CWV Status (GSC) | 12% Good | 89% Good | +77% |
| Organic Sessions | 34,200 | 41,800 | +22% |
| Avg. Position | 14.2 | 11.8 | +2.4 |

---

## Technical Details

See [before-after-comparision.json](./before-after-comparision.json) for raw metrics data.

### Tools Used

| Tool | Purpose |
|------|---------|
| Lighthouse CI | Automated performance testing |
| WebPageTest | Waterfall analysis, filmstrip |
| Chrome DevTools | Network, Performance tabs |
| Google Search Console | Field data (CrUX) |
| Cloudflare | CDN, caching |

---

## Lessons Learned

1. **Images are usually the biggest win** — 65% reduction in image size had the largest impact on LCP.

2. **Bundle splitting requires planning** — Needed to refactor imports across the codebase.

3. **Server-side caching is essential** — Redis cache reduced TTFB more than any frontend optimization.

4. **Measure field data, not just lab data** — Chrome UX Report (CrUX) showed different patterns than Lighthouse.

5. **Performance is ongoing** — Set up Lighthouse CI to prevent regressions.

---

## Monitoring Setup

```yaml
# Lighthouse CI configuration
ci:
  collect:
    url:
      - https://example.com/
      - https://example.com/products/sample
    numberOfRuns: 3
  assert:
    assertions:
      categories:performance:
        - error
        - minScore: 0.85
      largest-contentful-paint:
        - error
        - maxNumericValue: 2500
```

---

## Next Steps

1. Implement AVIF format for browsers that support it
2. Add resource hints (preconnect, prefetch) for critical third-parties
3. Explore server-side rendering for critical pages
4. Set up Real User Monitoring (RUM) for ongoing tracking
