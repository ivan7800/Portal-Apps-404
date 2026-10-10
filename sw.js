const CACHE_PREFIX = 'portal-apps-404-';
const CACHE = CACHE_PREFIX + 'v41-26-cinematic-41-29-evolution-chronos-114';
const CORE = [
  './',
  './index.html',
  './assets/styles.css',
  './assets/cinematic.css',
  './assets/fonts.css',
  './assets/data.js',
  './assets/pocket-404-dx.js',
  './assets/blackthorn-404.js',
  './assets/bomb-sweeper-87.js',
  './assets/abyssal-descent.js',
  './assets/historias-del-bloque-404.js',
  './assets/techno-404-studio.js',
  './assets/numeria-404.js',
  './assets/homeops-404.js',
  './assets/jarvis-404.js',
  './assets/oneiro-404.js',
  './assets/souls-codex-404.js',
  './assets/case-404.js',
  './assets/cau-os.js',
  './assets/it-warehouse-404.js',
  './assets/abyssal-hand-404.js',
  './assets/netwatch-404.js',
  './assets/evolution-lab-404.js',
  './assets/chronos-404.js',
  './assets/catalog-utils.js',
  './assets/qr-lite.js',
  './assets/app.js',
  './assets/cinematic.js',
  './assets/logo.webp',
  './assets/favicon-32.png',
  './assets/apple-touch-icon.png',
  './assets/icon-192.png',
  './assets/icon-512.png',
  './assets/screenshots/QUINQUI-404.webp',
  './assets/screenshots/Night-Shift-404.png',
  './assets/screenshots/Pocket-404-DX.svg',
  './assets/screenshots/Blackthorn-404.svg',
  './assets/screenshots/Bomb-Sweeper-87.svg',
  './assets/screenshots/Abyssal-Descent.svg',
  './assets/screenshots/Historias-del-Bloque-404.svg',
  './assets/screenshots/Techno-404-Studio.svg',
  './assets/screenshots/Numeria-404.svg',
  './assets/screenshots/HomeOps-404.svg',
  './assets/screenshots/JARVIS-404.svg',
  './assets/screenshots/ONEIRO-404.svg',
  './assets/screenshots/SOULS-CODEX-404.svg',
  './assets/screenshots/CASE-404.svg',
  './assets/screenshots/CAU-OS.svg',
  './assets/screenshots/IT-Warehouse-404.svg',
  './assets/screenshots/ABYSSAL-HAND-404.svg',
  './assets/screenshots/NETWATCH-404.svg',
  './assets/screenshots/EVOLUTION-LAB-404.svg',
  './assets/screenshots/CHRONOS-404.svg',
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

function scopePath() {
  return new URL(self.registration.scope).pathname;
}

function isShellNavigation(request) {
  const scope = scopePath();
  const path = new URL(request.url).pathname;
  const indexPath = scope + (scope.endsWith('/') ? '' : '/') + 'index.html';
  return path === scope || path === indexPath;
}

async function navigationResponse(request) {
  const cache = await caches.open(CACHE);
  try {
    const response = await fetch(request);
    if (response.ok && isShellNavigation(request)) {
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
  if (url.origin !== location.origin || !url.pathname.startsWith(scopePath())) return;
  event.respondWith(request.mode === 'navigate' ? navigationResponse(request) : assetResponse(request));
});
