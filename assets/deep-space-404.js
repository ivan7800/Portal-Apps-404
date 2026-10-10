/* Portal Apps 404 · DEEP SPACE 404 catalog extension */
(function () {
  'use strict';
  var data = window.PORTAL_DATA;
  if (!data || !Array.isArray(data.APPS) || !data.LANGUAGES) return;
  if (data.APPS.some(function (app) { return app && app.name === 'DEEP-SPACE-404'; })) return;
  data.LANGUAGES['DEEP-SPACE-404'] = 'HTML / CSS / JavaScript / LocalStorage / PWA';
  data.APPS.push({
    name: 'DEEP-SPACE-404',
    short: 'Simulador espacial local-first con expediciones, 24 sistemas estelares, tripulación, recursos, mejoras y narrativa.',
    description: 'DEEP SPACE 404 — AURORA es una aventura estratégica de exploración espacial local-first con 24 sistemas conectados, cinco tripulantes, misiones planetarias, tres arcos narrativos, ingeniería de nave, mejoras, investigación y decisiones sobre combustible, oxígeno, comida, casco y moral. Incluye planificación de rutas FTL, asistente AURORA contextual, tres temas, audio opcional, guardado local, importación/exportación y PWA. La experiencia se encuentra en release candidate; la validación E2E y offline en navegador sigue pendiente.',
    category: 'Juegos / Estrategia espacial',
    saga: 'Universo 404',
    icon: '✦',
    featured: true,
    screenshot: 'assets/screenshots/DEEP-SPACE-404.svg',
    pages: 'https://ivan7800.github.io/DEEP-SPACE-404/',
    github: 'https://github.com/ivan7800/DEEP-SPACE-404',
    status: 'catalogued',
    availability: 'verified',
    offline: 'declared',
    platform: 'web',
    delivery: 'web-app'
  });
})();
