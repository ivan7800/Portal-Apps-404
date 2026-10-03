/* Portal Apps 404 · ONEIRO 404 catalog extension */
(function () {
  'use strict';
  var data = window.PORTAL_DATA;
  if (!data || !Array.isArray(data.APPS) || !data.LANGUAGES) return;
  if (data.APPS.some(function (app) { return app && app.name === 'ONEIRO-404'; })) return;

  data.LANGUAGES['ONEIRO-404'] = 'HTML / CSS / JavaScript / IndexedDB / Web Audio / PWA';
  data.APPS.push({
    name: 'ONEIRO-404',
    short: 'Laboratorio personal de sueños local-first con protocolos de inducción temática, diario, Dream DNA, analítica, mapa y sesiones guiadas.',
    description: 'ONEIRO 404 es una PWA local-first para registro e incubación temática de sueños. Incluye protocolos Dream, Lucid, Nightmare, Liminal, Adventure, Memory y Custom; motor de sesión PREPARE → PRIME → DESCENT → SLEEP → WAKE → RECALL; audio procedural local con Web Audio, Dream Journal en IndexedDB, Dream DNA, Analytics, Dream Map, siete skins, PIN local opcional y copias JSON normales o cifradas con AES-256-GCM.',
    category: 'Bienestar / Sueños',
    saga: 'Universo 404',
    icon: '◐',
    featured: true,
    screenshot: 'assets/screenshots/ONEIRO-404.svg',
    pages: 'https://ivan7800.github.io/ONEIRO-404/',
    github: 'https://github.com/ivan7800/ONEIRO-404',
    status: 'catalogued',
    availability: 'verified',
    offline: 'declared',
    platform: 'web',
    delivery: 'web-app'
  });
})();
