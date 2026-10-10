/* Portal Apps 404 · MNEMOSYNE 404 catalog extension */
(function () {
  'use strict';
  var data = window.PORTAL_DATA;
  if (!data || !Array.isArray(data.APPS) || !data.LANGUAGES) return;
  if (data.APPS.some(function (app) { return app && app.name === 'MNEMOSYNE-404'; })) return;
  data.LANGUAGES['MNEMOSYNE-404'] = 'HTML / CSS / JavaScript / WebGL / IndexedDB';
  data.APPS.push({
    name: 'MNEMOSYNE-404',
    short: 'Palacio de memoria 3D/2D local-first para organizar conocimientos, vincular recuerdos a objetos y repasarlos.',
    description: 'MNEMOSYNE 404 es un palacio de memoria local-first con exploración 3D WebGL nativa y alternativa 2D. Permite crear y editar recuerdos de texto, asociarlos a objetos de salas, buscar contenidos y etiquetas, crear objetos personalizados y repasar memorias con intervalos. Incluye cuatro temas, importación de Markdown y JSON, copias de seguridad versionadas y almacenamiento IndexedDB. Proyecto en desarrollo Alpha: antes de confiarle información irremplazable, realizar backups y validar su funcionamiento en navegador.',
    category: 'Productividad / Memoria',
    saga: 'Universo 404',
    icon: '◈',
    featured: true,
    screenshot: 'assets/screenshots/MNEMOSYNE-404.svg',
    pages: 'https://ivan7800.github.io/MNEMOSYNE-404/',
    github: 'https://github.com/ivan7800/MNEMOSYNE-404',
    status: 'catalogued',
    availability: 'verified',
    offline: 'declared',
    platform: 'web',
    delivery: 'web-app'
  });
})();
