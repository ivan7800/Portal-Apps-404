const CACHE_NAME = 'portal-apps-404-v23-commercial';
const ASSETS = [
  "./",
  "./index.html",
  "./404.html",
  "./styles.css",
  "./app-data.js",
  "./app.js",
  "./manifest.webmanifest",
  "./icons/icon-192.svg",
  "./icons/icon-512.svg",
  "./assets/screenshots/AETHERION-Editorial-OS.svg",
  "./assets/screenshots/Ajedrez-Maestro.svg",
  "./assets/screenshots/Atlas-Librorum.svg",
  "./assets/screenshots/Atlas-Pattern-AI.svg",
  "./assets/screenshots/Atlas-Web-Pro.svg",
  "./assets/screenshots/Baraja-del-Fin.svg",
  "./assets/screenshots/Biblioteca-Oculta.svg",
  "./assets/screenshots/Biblioteca-de-Sue-os.svg",
  "./assets/screenshots/Cauers4ever.svg",
  "./assets/screenshots/Claude-Skills-Pack.svg",
  "./assets/screenshots/El-Criterio-Omega.svg",
  "./assets/screenshots/El-Evangelio-del-Nombre-Devorado.svg",
  "./assets/screenshots/FotoLibro-Studio-Pro.svg",
  "./assets/screenshots/Guardian-Senior-AI.svg",
  "./assets/screenshots/I-Ching.svg",
  "./assets/screenshots/INSANITY.svg",
  "./assets/screenshots/Investigador-404.svg",
  "./assets/screenshots/La-Caja-Infinita.svg",
  "./assets/screenshots/NECRONOMICON-404.svg",
  "./assets/screenshots/NetLab-404.svg",
  "./assets/screenshots/Nocturne.svg",
  "./assets/screenshots/Ouija.svg",
  "./assets/screenshots/Photo-Studio-OS.svg",
  "./assets/screenshots/PocketTone-Archive.svg",
  "./assets/screenshots/QR-Studio-Offline.svg",
  "./assets/screenshots/SafeSignal.svg",
  "./assets/screenshots/Storyboard-Studio.svg",
  "./assets/screenshots/Strategy-Lab-Campaign.svg",
  "./assets/screenshots/Tarot.svg",
  "./assets/screenshots/UI-Skills-Navigator-Pro.svg",
  "./assets/screenshots/Web-Architect.svg",
  "./assets/screenshots/VOX-MORPHER-404.svg",
  "./assets/screenshots/Vigilia-Abisal.svg",
  "./assets/screenshots/Windows-Master-Suite.svg",
  "./assets/screenshots/calma-mental.svg",
  "./assets/screenshots/diario-moleskine.svg",
  "./assets/screenshots/doppelganger-chat.svg",
  "./assets/screenshots/fotocinema.svg",
  "./assets/screenshots/i.roig.svg",
  "./assets/screenshots/json404.svg",
  "./assets/screenshots/musica-404.svg",
  "./assets/screenshots/os404.svg",
  "./assets/screenshots/portal-descargas-corporativas.svg",
  "./assets/screenshots/recetario.svg",
  "./assets/screenshots/sin-bruma.svg",
  "./assets/screenshots/zerokey-ai.svg"
];


self.addEventListener('install', event => {
  event.waitUntil(caches.open(CACHE_NAME).then(cache => cache.addAll(ASSETS)));
  self.skipWaiting();
});

self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys()
      .then(keys => Promise.all(keys.filter(key => key !== CACHE_NAME).map(key => caches.delete(key))))
      .then(() => self.clients.claim())
  );
});

function isNavigation(request) {
  return request.mode === 'navigate' || (request.headers.get('accept') || '').includes('text/html');
}

self.addEventListener('fetch', event => {
  if (event.request.method !== 'GET') return;

  event.respondWith((async () => {
    const cache = await caches.open(CACHE_NAME);

    if (isNavigation(event.request)) {
      try {
        const fresh = await fetch(event.request);
        cache.put(event.request, fresh.clone());
        return fresh;
      } catch (_) {
        return (await cache.match('./index.html')) || (await cache.match('./404.html'));
      }
    }

    try {
      const fresh = await fetch(event.request);
      cache.put(event.request, fresh.clone());
      return fresh;
    } catch (_) {
      return (await cache.match(event.request, { ignoreSearch: true })) || (await cache.match('./404.html'));
    }
  })());
});
