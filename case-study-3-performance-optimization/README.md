# Case Study 3: Performance Optimization for Marketplace App

**Client:** Online Marketplace (Anonymized)  
**Industry:** E-commerce / Marketplace  
**Project Type:** Core Web Vitals Optimization  
**Strategist:** Sage Nwanne

**Skills:** `Core Web Vitals` `Performance Engineering` `JavaScript Optimization` `Lazy Loading` `PageSpeed` `TTFB`

---

## TL;DR

| | |
|---|---|
| **Problem** | Marketplace with slow page loads hurting SEO and user experience — high bounce rates on product pages |
| **Approach** | Analyzed Core Web Vitals, implemented image optimization, JavaScript splitting, and server-side fixes |
| **Results** | LCP -56%, CLS -79%, TTFB -68%, PageSpeed score 63→89 |

---

## Contents

| Document | Description |
|----------|-------------|
| [Performance Report](./page-seed-report.md) | Full analysis with root cause identification and fixes |
| [Optimized Code](./optimized-code-snippet.js) | Lazy loading and performance optimization implementation |
| [Before/After Data](./before-after-comparision.json) | Metrics comparison in JSON format |

---

## The Challenge

A marketplace app was experiencing slow page loads that directly impacted SEO rankings and conversion rates:

- LCP (Largest Contentful Paint) at 4.8s — well above the 2.5s threshold
- CLS (Cumulative Layout Shift) at 0.24 — causing poor user experience
- TTFB (Time to First Byte) at 1.2s — server response too slow
- Unused JavaScript bloating page weight
- Unoptimized images loading synchronously
- No caching headers configured

---

## Key Results

| Metric | Before | After | Improvement |
|--------|--------|-------|-------------|
| LCP | 4.8s | 2.1s | -56% |
| CLS | 0.24 | 0.05 | -79% |
| TTFB | 1,200ms | 380ms | -68% |
| PageSpeed Score | 63 | 89 | +26 points |
| JavaScript Bundle | 450KB | 103KB | -77% |

---

## Solutions Implemented

| Issue | Solution | Impact |
|-------|----------|--------|
| Large images | WebP conversion + compression | -65% file size |
| Unused JavaScript | Bundle splitting + tree shaking | -77% JS weight |
| Slow TTFB | Server-side caching, optimized queries | -68% response time |
| Layout shift | Explicit image dimensions, font preloading | CLS 0.24→0.05 |
| No lazy loading | Intersection Observer implementation | Faster initial load |

---

## Skills Demonstrated

| Skill | How It's Applied |
|-------|------------------|
| **Core Web Vitals** | LCP, CLS, FID/INP, TTFB analysis and optimization |
| **JavaScript Engineering** | Bundle analysis, code splitting, lazy loading |
| **Performance Auditing** | Lighthouse, WebPageTest, Chrome DevTools |
| **Image Optimization** | Format conversion, compression, responsive images |
| **Caching Strategy** | HTTP headers, CDN configuration, browser caching |

---

## Interview Talking Points

### On Performance Engineering
> "I identified that the main bottleneck was a 450KB JavaScript bundle loading synchronously. By implementing code splitting and lazy loading non-critical scripts, I reduced bundle size by 77% and improved LCP by 56%."

### On Core Web Vitals
> "CLS was at 0.24 because images didn't have explicit dimensions and fonts were loading late causing layout shift. I added width/height attributes and preloaded critical fonts to bring CLS down to 0.05."

### On Server-Side Optimization
> "TTFB was 1.2 seconds because the server was making redundant database queries on every request. I implemented response caching and optimized the query logic to reduce TTFB to 380ms."

### On Business Impact
> "Page speed directly affects both SEO rankings and conversion rates. Google uses Core Web Vitals as a ranking factor, and studies show each second of delay reduces conversions by 7%. These optimizations improved both discoverability and revenue."

### Key Artifacts to Reference
| If Asked About... | Show This File |
|-------------------|----------------|
| Root cause analysis | `page-seed-report.md` |
| Code implementation | `optimized-code-snippet.js` |
| Metrics proof | `before-after-comparision.json` |

---

## Related Files

- [Technical SEO Checklist](../tools/technical-seo-checklist.md)
- [SEO Playbook](../tools/seo-playbook.md)

