/* Portal Apps 404 · Pocket 404 DX catalog extension */
(function () {
  'use strict';
  var data = window.PORTAL_DATA;
  if (!data || !Array.isArray(data.APPS) || !data.LANGUAGES) return;
  if (data.APPS.some(function (app) { return app && app.name === 'Pocket-404-DX'; })) return;

  data.LANGUAGES['Pocket-404-DX'] = 'HTML / JavaScript';
  data.APPS.push({
    name: 'Pocket-404-DX',
    short: 'Aventura web 16-bit conectada con overworld, siete dungeons, herramientas, secretos, side quests y jefes.',
    description: 'Pocket 404 DX · Rune Quest 404 DX es una aventura web 16-bit original para navegador y PWA. Su campaña conecta un overworld explorable con siete dungeons, herramientas que desbloquean rutas, backtracking, side quests, secretos, economía, jefes y créditos.',
    category: 'Juego / Aventura 16-bit',
    saga: 'Universo 404',
    icon: '◆',
    featured: true,
    screenshot: 'assets/screenshots/Pocket-404-DX.svg',
    pages: 'https://ivan7800.github.io/Pocket-404-DX/',
    github: 'https://github.com/ivan7800/Pocket-404-DX',
    status: 'catalogued',
    availability: 'unverified',
    offline: 'declared',
    platform: 'web',
    delivery: 'web-app'
  });
})();
