/* Portal Apps 404 · CASE 404 catalog extension */
(function () {
  'use strict';
  var data = window.PORTAL_DATA;
  if (!data || !Array.isArray(data.APPS) || !data.LANGUAGES) return;
  if (data.APPS.some(function (app) { return app && app.name === 'CASE-404'; })) return;

  data.LANGUAGES['CASE-404'] = 'HTML / CSS / JavaScript / IndexedDB / PWA';
  data.APPS.push({
    name: 'CASE-404',
    short: 'Estudio de investigación visual local-first con expedientes, tablero de evidencias, cronologías, teorías, grafos y modo escritor.',
    description: 'CASE 404 — Investigation Studio es una aplicación web local-first, offline y sin backend para construir investigaciones visuales. Incluye Case Files, Evidence Board con conexiones, Investigation DB, Timeline 404, Theory Engine, Connection Graph, Writer Mode, informes y seis skins premium. Los expedientes se guardan en IndexedDB y pueden exportarse en formato .case404 o backup.',
    category: 'Productividad / Investigación',
    saga: 'Universo 404',
    icon: '⌕',
    featured: true,
    screenshot: 'assets/screenshots/CASE-404.svg',
    pages: 'https://ivan7800.github.io/CASE-404/',
    github: 'https://github.com/ivan7800/CASE-404',
    status: 'catalogued',
    availability: 'verified',
    offline: 'declared',
    platform: 'web',
    delivery: 'web-app'
  });
})();
