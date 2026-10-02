/* Portal Apps 404 · Numeria 404 catalog extension */
(function () {
  'use strict';
  var data = window.PORTAL_DATA;
  if (!data || !Array.isArray(data.APPS) || !data.LANGUAGES) return;
  if (data.APPS.some(function (app) { return app && app.name === 'Numeria-404'; })) return;

  data.LANGUAGES['Numeria-404'] = 'HTML / CSS / JavaScript / SVG';
  data.APPS.push({
    name: 'Numeria-404',
    short: 'Suite local-first de numerología pitagórica y caldea con ciclos, calendario, compatibilidad, carta visual y perfiles guardados.',
    description: 'Numeria 404 v2.2.0 es una aplicación web/PWA local-first de numerología simbólica. Incluye perfil pitagórico con camino de vida, expresión, alma, personalidad y madurez; carta visual SVG, matriz 1–9, mapa bioenergético simbólico, pináculos y desafíos, calendario personal 2026–2030, numerología caldea independiente, compatibilidad de pareja, biblioteca local de perfiles y exportación de informes HTML, PDF y JSON. Todo el cálculo principal se realiza localmente en el navegador.',
    category: 'Bienestar / Numerología simbólica',
    saga: 'Universo 404',
    icon: '✦',
    featured: true,
    screenshot: 'assets/screenshots/Numeria-404.svg',
    pages: 'https://ivan7800.github.io/Numeria-404/',
    github: 'https://github.com/ivan7800/Numeria-404',
    status: 'catalogued',
    availability: 'verified',
    offline: 'declared',
    platform: 'web',
    delivery: 'web-app'
  });
})();
