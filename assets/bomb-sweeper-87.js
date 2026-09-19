/* Portal Apps 404 · Bomb Sweeper 87 catalog extension */
(function () {
  'use strict';
  var data = window.PORTAL_DATA;
  if (!data || !Array.isArray(data.APPS) || !data.LANGUAGES) return;
  if (data.APPS.some(function (app) { return app && app.name === 'Bomb-Sweeper-87'; })) return;

  data.LANGUAGES['Bomb-Sweeper-87'] = 'HTML / CSS / JavaScript / Canvas';
  data.APPS.push({
    name: 'Bomb-Sweeper-87',
    short: 'Homenaje web a Bomb Sweeper con modos Original y Enhanced, Game A/B, logros, estadísticas, gamepad y PWA offline.',
    description: 'Bomb Sweeper ’87 — Premium Web Edition v5 es un homenaje web fan y no oficial creado desde cero con HTML, CSS, Canvas y JavaScript. Incluye modos Original y Enhanced, Game A con diez laberintos y fase bonus, Game B variable, perfil local, diez logros, estadísticas, controles táctiles y gamepad, fullscreen y funcionamiento PWA/offline.',
    category: 'Juego / Retro LCD',
    saga: 'Universo 404',
    icon: '●',
    featured: true,
    screenshot: 'assets/screenshots/Bomb-Sweeper-87.svg',
    pages: 'https://ivan7800.github.io/Bomb-Sweeper-87/',
    github: 'https://github.com/ivan7800/Bomb-Sweeper-87',
    status: 'catalogued',
    availability: 'unverified',
    offline: 'declared',
    platform: 'web',
    delivery: 'web-app'
  });
})();
