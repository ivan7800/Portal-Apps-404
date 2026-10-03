/* Portal Apps 404 · JARVIS 404 catalog extension */
(function () {
  'use strict';
  var data = window.PORTAL_DATA;
  if (!data || !Array.isArray(data.APPS) || !data.LANGUAGES) return;
  if (data.APPS.some(function (app) { return app && app.name === 'JARVIS-404'; })) return;

  data.LANGUAGES['JARVIS-404'] = 'Python / HTML / CSS / JavaScript / SQLite / Ollama';
  data.APPS.push({
    name: 'JARVIS-404',
    short: 'Asistente local para Windows orientado a sistemas, conocimiento, RAG, diagnóstico, voz y automatización controlada.',
    description: 'JARVIS 404 es un asistente local para Windows orientado a sistemas, conocimiento y automatización controlada. Integra chat, diagnóstico, memoria/RAG con SQLite y FTS5/BM25, voz, agentes especializados, 20 System Tools de solo lectura, 22 workflows allowlisted y un Command Center. Funciona en modo DEMO o con Ollama local mediante NEURAL 404 y aplica controles de seguridad loopback-only, token efímero, Origin/Host Guard y confirmación para automatizaciones sensibles.',
    category: 'Sistemas / IA local',
    saga: 'Universo 404',
    icon: '◈',
    featured: true,
    screenshot: 'assets/screenshots/JARVIS-404.svg',
    pages: 'https://github.com/ivan7800/JARVIS-404',
    github: 'https://github.com/ivan7800/JARVIS-404',
    status: 'catalogued',
    availability: 'verified',
    offline: 'declared',
    platform: 'windows',
    delivery: 'desktop-app'
  });
})();
