/* Portal Apps 404 · Historias del Bloque 404 catalog extension */
(function () {
  'use strict';
  var data = window.PORTAL_DATA;
  if (!data || !Array.isArray(data.APPS) || !data.LANGUAGES) return;
  if (data.APPS.some(function (app) { return app && app.name === 'Historias-del-Bloque-404'; })) return;

  data.LANGUAGES['Historias-del-Bloque-404'] = 'HTML / CSS / JavaScript';
  data.APPS.push({
    name: 'Historias-del-Bloque-404',
    short: 'Aventura narrativa quinqui local-first basada en Los chicos del bloque, con decisiones, consecuencias visibles y tres finales.',
    description: 'Historias del Bloque 404 — Los chicos del bloque es una aventura narrativa quinqui estática y local-first inspirada en la novela de I. Roig. Recorre de Sant Roc en 1981 al epílogo de Dani en 1991 mediante 21 escenas principales, 75 opciones totales, rutas e interludios condicionales, consecuencias persistentes, tres finales narrativos y una duración orientativa de 30–40 minutos. Incluye guardado local, PWA offline, sonido ambiental local y navegación por ratón, tacto o teclado.',
    category: 'Juego / Ficción interactiva',
    saga: 'Universo 404',
    icon: '◆',
    featured: true,
    screenshot: 'assets/screenshots/Historias-del-Bloque-404.svg',
    pages: 'https://ivan7800.github.io/Historias-del-Bloque-404-/',
    github: 'https://github.com/ivan7800/Historias-del-Bloque-404-',
    status: 'catalogued',
    availability: 'unverified',
    offline: 'declared',
    platform: 'web',
    delivery: 'web-app'
  });
})();
