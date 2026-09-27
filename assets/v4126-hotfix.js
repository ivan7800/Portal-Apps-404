/* Universo 404 OS v41.32 · Definitive Visual Covers release marker */
(function () {
  'use strict';

  if (window.PORTAL_DATA && window.PORTAL_DATA.META) {
    window.PORTAL_DATA.META.release = 'v41.32';
    window.PORTAL_DATA.META.updated = '2026-09-27';
  }

  function syncReleaseLabel() {
    var nodes = document.querySelectorAll('.footer small');
    Array.prototype.forEach.call(nodes, function (node) {
      var text = node.textContent || '';
      text = text.replace(/v41\.(?:24|26|31)(?:\s*·\s*[^|]*)?/, 'v41.32 · Definitive Visual Covers');
      node.textContent = text;
    });
  }

  syncReleaseLabel();
  if ('MutationObserver' in window && document.body) {
    new MutationObserver(syncReleaseLabel).observe(document.body, { childList: true, subtree: true });
  }
})();
