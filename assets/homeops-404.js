/* Portal Apps 404 · HomeOps 404 catalog extension */
(function () {
  'use strict';
  var data = window.PORTAL_DATA;
  if (!data || !Array.isArray(data.APPS) || !data.LANGUAGES) return;
  if (data.APPS.some(function (app) { return app && app.name === 'HomeOps-404'; })) return;

  data.LANGUAGES['HomeOps-404'] = 'HTML / CSS / JavaScript / IndexedDB / PWA';
  data.APPS.push({
    name: 'HomeOps-404',
    short: 'Gestión del hogar local-first con tareas, mantenimiento, inventario, garantías, documentos, gastos, compras y copias de seguridad.',
    description: 'HomeOps 404 es una PWA estática y local-first para organizar el hogar sin backend. Integra tareas y responsables, mantenimiento, inventario, garantías, documentos locales, gastos y presupuesto, lista de compras, calendario .ics y copias JSON normales o cifradas con AES-GCM-256. Los datos permanecen en el navegador mediante IndexedDB.',
    category: 'Productividad / Hogar',
    saga: 'Universo 404',
    icon: '⌂',
    featured: true,
    screenshot: 'assets/screenshots/HomeOps-404.svg',
    pages: 'https://ivan7800.github.io/HomeOps-404/',
    github: 'https://github.com/ivan7800/HomeOps-404',
    status: 'catalogued',
    availability: 'verified',
    offline: 'declared',
    platform: 'web',
    delivery: 'web-app'
  });
})();
