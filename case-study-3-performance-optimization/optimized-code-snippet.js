// Lazy-load images for improved LCP
document.addEventListener("DOMContentLoaded", () => {
  document.querySelectorAll("img[data-src]").forEach(img => {
    img.src = img.dataset.src;
  });
});
