/* Portal Apps 404 · ABYSSAL HAND 404 catalog extension */
(function () {
  'use strict';
  var data = window.PORTAL_DATA;
  if (!data || !Array.isArray(data.APPS) || !data.LANGUAGES) return;
  if (data.APPS.some(function (app) { return app && app.name === 'ABYSSAL-HAND-404'; })) return;

  data.LANGUAGES['ABYSSAL-HAND-404'] = 'HTML / CSS / JavaScript / IndexedDB / Web Audio / PWA';
  data.APPS.push({
    name: 'ABYSSAL-HAND-404',
    short: 'Roguelike de cartas y horror cósmico, jugable offline, con expediciones por semilla, reliquias, rituales y arte abisal.',
    description: 'ABYSSAL HAND 404 es un roguelike de cartas y horror cósmico con frontend estático y sin dependencias remotas durante el juego. Incluye expediciones con semillas reproducibles, selección y descarte de manos, rituales, reliquias, transformaciones, guardado local, importación/exportación JSON, PWA offline y ocho sectores con fondos propios y arte panorámico. La versión 1.0.0-rc.5 incorpora un bundle clásico compatible con file:// y correcciones de persistencia, autosave, nueva expedición y Service Worker.',
    category: 'Juegos / Roguelike de cartas',
    saga: 'Universo 404',
    icon: '♠',
    featured: true,
    screenshot: 'assets/screenshots/ABYSSAL-HAND-404.svg',
    pages: 'https://ivan7800.github.io/ABYSSAL-HAND-404/',
    github: 'https://github.com/ivan7800/ABYSSAL-HAND-404',
    status: 'catalogued',
    availability: 'verified',
    offline: 'declared',
    platform: 'web',
    delivery: 'web-app'
  });
})();
