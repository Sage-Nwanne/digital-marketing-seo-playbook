/**
 * Image Lazy Loading Implementation
 *
 * This script implements lazy loading for images to improve Core Web Vitals:
 * - LCP (Largest Contentful Paint): Only loads visible images initially
 * - Reduces initial page weight and network requests
 * - Uses Intersection Observer API for efficient scroll detection
 *
 * Usage:
 *   <img data-src="actual-image.jpg" src="placeholder.jpg" alt="Description" />
 *
 * The script will swap data-src → src when the image enters the viewport.
 */

// Configuration
const LAZY_LOAD_CONFIG = {
  rootMargin: '100px',  // Start loading 100px before entering viewport
  threshold: 0.1        // Trigger when 10% of image is visible
};

/**
 * Initialize lazy loading using Intersection Observer
 * Falls back to immediate loading if IO is not supported
 */
function initLazyLoading() {
  const lazyImages = document.querySelectorAll('img[data-src]');

  // Check for Intersection Observer support
  if ('IntersectionObserver' in window) {
    const imageObserver = new IntersectionObserver((entries, observer) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const img = entry.target;
          loadImage(img);
          observer.unobserve(img); // Stop observing once loaded
        }
      });
    }, LAZY_LOAD_CONFIG);

    lazyImages.forEach(img => imageObserver.observe(img));

    console.log(`[Lazy Load] Observing ${lazyImages.length} images`);
  } else {
    // Fallback: Load all images immediately for older browsers
    console.warn('[Lazy Load] Intersection Observer not supported, loading all images');
    lazyImages.forEach(img => loadImage(img));
  }
}

/**
 * Load an image by swapping data-src to src
 * Handles loading states and errors
 */
function loadImage(img) {
  const src = img.dataset.src;

  if (!src) return;

  // Add loading state
  img.classList.add('loading');

  // Create a new image to preload
  const tempImage = new Image();

  tempImage.onload = () => {
    img.src = src;
    img.classList.remove('loading');
    img.classList.add('loaded');
    img.removeAttribute('data-src');
  };

  tempImage.onerror = () => {
    console.error(`[Lazy Load] Failed to load: ${src}`);
    img.classList.remove('loading');
    img.classList.add('error');
  };

  tempImage.src = src;
}

/**
 * Preload critical images (above-the-fold)
 * Call this for hero images that should load immediately
 */
function preloadCriticalImages(selectors) {
  const criticalImages = document.querySelectorAll(selectors);
  criticalImages.forEach(img => {
    if (img.dataset.src) {
      loadImage(img);
    }
  });
}

// Initialize on DOM ready
document.addEventListener('DOMContentLoaded', () => {
  // Preload hero/LCP images immediately
  preloadCriticalImages('.hero-image, [data-priority="high"]');

  // Lazy load everything else
  initLazyLoading();
});

// Also handle dynamically added images (for SPAs)
const mutationObserver = new MutationObserver((mutations) => {
  mutations.forEach(mutation => {
    mutation.addedNodes.forEach(node => {
      if (node.nodeType === 1) { // Element node
        const newImages = node.querySelectorAll?.('img[data-src]') || [];
        if (node.matches?.('img[data-src]')) {
          initLazyLoading(); // Re-init to observe new images
        } else if (newImages.length > 0) {
          initLazyLoading();
        }
      }
    });
  });
});

// Start observing DOM for dynamically added images
mutationObserver.observe(document.body, { childList: true, subtree: true });
