/* Portal Apps 404 · v41.34 · service worker refresh */
(function(){
  'use strict';
  if (!('serviceWorker' in navigator)) return;
  window.addEventListener('load', function(){
    navigator.serviceWorker.register('./sw.js?v=41.34').then(function(registration){
      registration.update().catch(function(){});
    }).catch(function(){});
  });
})();
