/* Portal Apps 404 · SOULS CODEX 404 catalog extension */
(function () {
  'use strict';
  var data = window.PORTAL_DATA;
  if (!data || !Array.isArray(data.APPS) || !data.LANGUAGES) return;
  if (data.APPS.some(function (app) { return app && app.name === 'SOULS-CODEX-404'; })) return;

  data.LANGUAGES['SOULS-CODEX-404'] = 'HTML / CSS / JavaScript ES Modules / IndexedDB / PWA';
  data.APPS.push({
    name: 'SOULS-CODEX-404',
    short: 'Diario universal de videojuegos local-first para registrar progreso, puzles, bosses, builds, zonas, objetos, NPC, misiones, lore y secretos.',
    description: 'SOULS CODEX 404 es una PWA offline y local-first para convertir cada partida en una guía personal. Permite organizar múltiples juegos, guardar dónde estabas, documentar puzles y soluciones, bosses, builds, zonas, objetos, NPC, misiones, secretos, lore, checklists, coleccionables, logros y finales. Incluye relaciones y backlinks, búsqueda global, control de spoilers, progreso automático o manual, siete skins y exportación a JSON, Markdown, CSV, HTML e impresión/PDF.',
    category: 'Gaming / Diario y guía',
    saga: 'Universo 404',
    icon: '⚔',
    featured: true,
    screenshot: 'assets/screenshots/SOULS-CODEX-404.svg',
    pages: 'https://ivan7800.github.io/SOULS-CODEX-404/',
    github: 'https://github.com/ivan7800/SOULS-CODEX-404',
    status: 'catalogued',
    availability: 'verified',
    offline: 'declared',
    platform: 'web',
    delivery: 'web-app'
  });
})();
