/* Portal Apps 404 · Abyssal Descent catalog extension */
(function () {
  'use strict';
  var data = window.PORTAL_DATA;
  if (!data || !Array.isArray(data.APPS) || !data.LANGUAGES) return;
  if (data.APPS.some(function (app) { return app && app.name === 'Abyssal-Descent'; })) return;

  data.LANGUAGES['Abyssal-Descent'] = 'HTML / CSS / JavaScript / Canvas';
  data.APPS.push({
    name: 'Abyssal-Descent',
    short: 'Dungeon crawler de horror cósmico en primera persona con exploración por cuadrícula, combate por turnos, cordura y campaña de cuatro actos.',
    description: 'Abyssal Descent es un dungeon crawler original de horror cósmico para navegador inspirado en los CRPG clásicos en primera persona. Incluye una campaña de cuatro actos, tres arquetipos, plantas procedurales 17×13, 14 tipos de enemigos, cuatro guardianes, combate por turnos, 26 objetos, estados de cordura con alucinaciones, secretos, múltiples finales y guardado local.',
    category: 'Juego / Dungeon crawler',
    saga: 'Universo 404',
    icon: '◉',
    featured: true,
    screenshot: 'assets/screenshots/Abyssal-Descent.svg',
    pages: 'https://ivan7800.github.io/Abyssal-Descent/',
    github: 'https://github.com/ivan7800/Abyssal-Descent',
    status: 'catalogued',
    availability: 'unverified',
    offline: 'declared',
    platform: 'web',
    delivery: 'web-app'
  });
})();
