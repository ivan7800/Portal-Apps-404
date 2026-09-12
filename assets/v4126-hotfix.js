/* Universo 404 OS v41.26 · Local Visual Covers release marker */
(function () {
  'use strict';

  if (window.PORTAL_DATA && window.PORTAL_DATA.META) {
    window.PORTAL_DATA.META.release = 'v41.26';
  }

  function syncReleaseLabel() {
    var nodes = document.querySelectorAll('.footer small');
    Array.prototype.forEach.call(nodes, function (node) {
      if (/v41\.24\s*·\s*Catalog Controls Hotfix/.test(node.textContent || '')) {
        node.textContent = (node.textContent || '').replace('v41.24 · Catalog Controls Hotfix', 'v41.26 · Local Visual Covers');
      }
    });
  }

  syncReleaseLabel();
  if ('MutationObserver' in window && document.body) {
    new MutationObserver(syncReleaseLabel).observe(document.body, { childList: true, subtree: true });
  }
})();
