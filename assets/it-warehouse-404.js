/* Portal Apps 404 · IT Warehouse 404 catalog extension */
(function () {
  'use strict';
  var data = window.PORTAL_DATA;
  if (!data || !Array.isArray(data.APPS) || !data.LANGUAGES) return;
  if (data.APPS.some(function (app) { return app && app.name === 'IT-Warehouse-404'; })) return;

  data.LANGUAGES['IT-Warehouse-404'] = 'Python / PostgreSQL / HTML / CSS / JavaScript / QR';
  data.APPS.push({
    name: 'IT-Warehouse-404',
    short: 'Inventario IT multiusuario para almacén central, con roles, movimientos auditados, ubicaciones y escaneo QR desde móvil.',
    description: 'IT Warehouse 404 v3.0.0 es un sistema multiusuario de inventario IT para servidor central y clientes Windows/móvil en LAN. Utiliza PostgreSQL, usuarios y roles, sesiones autenticadas, protección CSRF, auditoría por operador e IP, transacciones para evitar movimientos concurrentes incoherentes, ubicaciones y capacidad de estanterías, QR de material y ubicación, escáner móvil con BarcodeDetector y fallback manual por Asset Tag, serie o ubicación. Incluye migración desde SQLite v2.x, backups PostgreSQL y controles de seguridad para despliegue interno.',
    category: 'Sistemas / Inventario IT',
    saga: 'Universo 404',
    icon: '▣',
    featured: true,
    screenshot: 'assets/screenshots/IT-Warehouse-404.svg',
    pages: 'https://github.com/ivan7800/IT-Warehouse-404',
    github: 'https://github.com/ivan7800/IT-Warehouse-404',
    status: 'catalogued',
    availability: 'verified',
    offline: 'declared',
    platform: 'windows',
    delivery: 'server-app'
  });
})();
