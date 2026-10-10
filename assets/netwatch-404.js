/* Portal Apps 404 · NETWATCH 404 catalog extension */
(function () {
  'use strict';
  var data = window.PORTAL_DATA;
  if (!data || !Array.isArray(data.APPS) || !data.LANGUAGES) return;
  if (data.APPS.some(function (app) { return app && app.name === 'NETWATCH-404'; })) return;

  data.LANGUAGES['NETWATCH-404'] = 'Python / PowerShell / HTML / CSS / JavaScript / Windows';
  data.APPS.push({
    name: 'NETWATCH-404',
    short: 'Panel local de análisis de red para Windows con diagnóstico, monitorización, mapa visual y exploración autorizada de subred.',
    description: 'NETWATCH 404 v2.2 RC es una herramienta local de Network Analytics para Windows 10/11 con servidor Python y recolector PowerShell 5.1+. Permite revisar interfaces, gateways, vecinos, estadísticas y conexiones del propio equipo, realizar ping a subredes privadas directamente conectadas con autorización, visualizar dispositivos observados en un mapa ilustrativo, comparar datos CSV/JSON exportados del router y guardar capturas pasivas del monitor local. El servidor escucha solo en 127.0.0.1:8765. GitHub Pages no ejecuta el backend Python/PowerShell.',
    category: 'Sistemas / Redes',
    saga: 'Universo 404',
    icon: '◎',
    featured: true,
    screenshot: 'assets/screenshots/NETWATCH-404.svg',
    pages: 'https://github.com/ivan7800/NETWATCH-404',
    github: 'https://github.com/ivan7800/NETWATCH-404',
    status: 'catalogued',
    availability: 'verified',
    offline: 'declared',
    platform: 'windows',
    delivery: 'desktop-app'
  });
})();
