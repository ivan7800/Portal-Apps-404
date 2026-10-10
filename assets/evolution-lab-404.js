/* Portal Apps 404 · EVOLUTION-LAB-404 catalog extension */
(function () {
  'use strict';
  var data = window.PORTAL_DATA;
  if (!data || !Array.isArray(data.APPS) || !data.LANGUAGES) return;
  if (data.APPS.some(function (app) { return app && app.name === 'EVOLUTION-LAB-404'; })) return;
  data.LANGUAGES['EVOLUTION-LAB-404'] = 'HTML / CSS / JavaScript / ES Modules / LocalStorage';
  data.APPS.push({
    name: 'EVOLUTION-LAB-404',
    short: 'Simulador didáctico de ecosistemas y evolución: especies, genes, biomas, genealogía, experimentos y observatorio.',
    description: 'EVOLUTION LAB 404 es un simulador de ecosistemas local-first con especies herbívoras, carnívoras y omnívoras, rasgos heredables simplificados, mutaciones, reproducción, clima, biomas, estaciones, eventos, red trófica, migración, aislamiento, linajes ilustrativos, mapas de calor, ensayos pareados y estadísticas longitudinales. Incluye semilla reproducible, guardado local y exportación/importación JSON. Es un modelo educativo, no una predicción ecológica real.',
    category: 'Educación / Simulación',
    saga: 'Universo 404',
    icon: '◈',
    featured: true,
    screenshot: 'assets/screenshots/EVOLUTION-LAB-404.svg',
    pages: 'https://ivan7800.github.io/EVOLUTION-LAB-404/',
    github: 'https://github.com/ivan7800/EVOLUTION-LAB-404',
    status: 'catalogued',
    availability: 'verified',
    offline: 'declared',
    platform: 'web',
    delivery: 'web-app'
  });
})();
