/* Portal Apps 404 · CAU OS catalog extension */
(function () {
  'use strict';
  var data = window.PORTAL_DATA;
  if (!data || !Array.isArray(data.APPS) || !data.LANGUAGES) return;
  if (data.APPS.some(function (app) { return app && app.name === 'CAU-OS'; })) return;

  data.LANGUAGES['CAU-OS'] = 'Go / HTML / CSS / JavaScript / Search Index / Windows Server';
  data.APPS.push({
    name: 'CAU-OS',
    short: 'Base de conocimiento y biblioteca documental centralizada para equipos de soporte, con búsqueda, usuarios, roles, auditoría y backups.',
    description: 'CAU OS v2.0.0 Knowledge Server es una base de conocimiento y biblioteca documental centralizada para equipos de soporte. Un servidor Windows mantiene documentación, índice de búsqueda, fichas de solución, usuarios, roles, auditoría y copias de seguridad. Admite múltiples formatos documentales, búsqueda por texto y pasajes, validación de soluciones, sesiones temporales, PBKDF2-HMAC-SHA256, skins y funcionamiento sin IA externa ni envío de documentación a servicios cloud.',
    category: 'Sistemas / Knowledge Base',
    saga: 'Universo 404',
    icon: '▦',
    featured: true,
    screenshot: 'assets/screenshots/CAU-OS.svg',
    pages: 'https://github.com/ivan7800/CAU-OS',
    github: 'https://github.com/ivan7800/CAU-OS',
    status: 'catalogued',
    availability: 'verified',
    offline: 'declared',
    platform: 'windows',
    delivery: 'server-app'
  });
})();
