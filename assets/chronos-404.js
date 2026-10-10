/* Portal Apps 404 · CHRONOS-404 catalog extension */
(function () {
  'use strict';
  var data = window.PORTAL_DATA;
  if (!data || !Array.isArray(data.APPS) || !data.LANGUAGES) return;
  if (data.APPS.some(function (app) { return app && app.name === 'CHRONOS-404'; })) return;
  data.LANGUAGES['CHRONOS-404'] = 'HTML / CSS / JavaScript / LocalStorage';
  data.APPS.push({
    name: 'CHRONOS-404',
    short: 'Explorador histórico interactivo con 30 registros, 14 culturas, atlas, máquina del tiempo, recorridos y biblioteca.',
    description: 'CHRONOS 404 es un explorador histórico estático con 30 registros históricos, 14 perfiles culturales, atlas esquemático, máquina del tiempo, tres recorridos con nueve paradas, biblioteca de 12 fichas y tres temas visuales. Funciona sin cuentas ni backend y utiliza rutas relativas compatibles con GitHub Pages. Mapas y reconstrucciones son esquemáticos, no certificaciones arqueológicas.',
    category: 'Educación / Historia',
    saga: 'Universo 404',
    icon: '◷',
    featured: true,
    screenshot: 'assets/screenshots/CHRONOS-404.svg',
    pages: 'https://ivan7800.github.io/CHRONOS-404/',
    github: 'https://github.com/ivan7800/CHRONOS-404',
    status: 'catalogued',
    availability: 'verified',
    offline: 'declared',
    platform: 'web',
    delivery: 'web-app'
  });
})();
