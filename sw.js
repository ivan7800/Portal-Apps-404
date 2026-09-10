const CACHE_PREFIX = 'portal-apps-404-';
const CACHE = CACHE_PREFIX + 'v41-6-close-control-polish';
const CORE = [
  './',
  './index.html',
  './assets/styles.css',
  './assets/fonts.css',
  './assets/data.js',
  './assets/catalog-utils.js',
  './assets/qr-lite.js',
  './assets/app.js',
  './assets/logo.webp',
  './assets/favicon-32.png',
  './assets/apple-touch-icon.png',
  './assets/icon-192.png',
  './assets/icon-512.png',
  './manifest.webmanifest'
];

self.addEventListener('install', event => {
  event.waitUntil(caches.open(CACHE).then(cache => cache.addAll(CORE)));
});

self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys()
      .then(keys => Promise.all(keys
        .filter(key => key.startsWith(CACHE_PREFIX) && key !== CACHE)
        .map(key => caches.delete(key))))
      .then(() => self.clients.claim())
  );
});

self.addEventListener('message', event => {
  if (event.data && event.data.type === 'SKIP_WAITING') self.skipWaiting();
});

async function updateCache(request, response) {
  if (!response || !response.ok) return response;
  const cache = await caches.open(CACHE);
  await cache.put(request, response.clone());
  return response;
}

async function navigationResponse(request) {
  const cache = await caches.open(CACHE);
  try {
    const response = await fetch(request);
    if (response.ok) {
      await cache.put('./index.html', response.clone());
    }
    return response;
  } catch (error) {
    return (await cache.match('./index.html')) || Response.error();
  }
}

async function assetResponse(request) {
  const cache = await caches.open(CACHE);
  const cached = await cache.match(request);
  const network = fetch(request)
    .then(response => updateCache(request, response))
    .catch(() => null);
  return cached || (await network) || Response.error();
}

self.addEventListener('fetch', event => {
  const request = event.request;
  if (request.method !== 'GET') return;
  const url = new URL(request.url);
  if (url.origin !== location.origin) return;
  event.respondWith(request.mode === 'navigate' ? navigationResponse(request) : assetResponse(request));
});
