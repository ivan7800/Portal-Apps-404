/* Portal Apps 404 · Blackthorn 404 catalog extension */
(function () {
  'use strict';
  var data = window.PORTAL_DATA;
  if (!data || !Array.isArray(data.APPS) || !data.LANGUAGES) return;
  if (data.APPS.some(function (app) { return app && app.name === 'Blackthorn-404'; })) return;

  data.LANGUAGES['Blackthorn-404'] = 'HTML / CSS / JavaScript / Canvas 2D';
  data.APPS.push({
    name: 'Blackthorn-404',
    short: 'Aventura 16-bit de horror psicológico y cósmico con 108 salas, combate, sigilos, nueve jefes, tres finales y New Game+.',
    description: 'Blackthorn 404: The Unremembered es una aventura web 16-bit original de horror psicológico y cósmico. Recorre Blackthorn Manor y ocho memorias históricas, domina percepción, sigilos y un arsenal de 12 armas, enfréntate a nueve jefes de tres fases y desbloquea tres finales y New Game+.',
    category: 'Juego / Horror 16-bit',
    saga: 'Universo 404',
    icon: '♜',
    featured: true,
    screenshot: 'assets/screenshots/Blackthorn-404.svg',
    pages: 'https://ivan7800.github.io/Blackthorn-404/',
    github: 'https://github.com/ivan7800/Blackthorn-404',
    status: 'catalogued',
    availability: 'unverified',
    offline: 'declared',
    platform: 'web',
    delivery: 'web-app'
  });
})();
