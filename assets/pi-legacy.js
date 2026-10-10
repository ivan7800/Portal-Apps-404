/* Portal Apps 404 · Pi Legacy catalog extension */
(function () {
  'use strict';
  var data=window.PORTAL_DATA;
  if (!data || !Array.isArray(data.APPS) || !data.LANGUAGES) return;
  if (data.APPS.some(function (app) { return app && app.name === 'Pi Legacy'; })) return;
  data.LANGUAGES['Pi Legacy'] = 'HTML / CSS / JavaScript / Canvas';
  data.APPS.push({
    name: 'Pi Legacy',
    short: 'Museo matemático interactivo dedicado a Ramón Llorens, con un millón de decimales de π.',
    description: 'RAMÓN LLORENS · π LEGACY es un homenaje editorial independiente y museo matemático interactivo. Ofrece explorador de 1.000.000 de decimales de pi, búsqueda y descarga TXT, laboratorio de Leibniz, Nilakantha, Machin y Monte Carlo, arte Canvas, universo 3D de puntos, quiz, reto de memoria, visita guiada de siete paradas y presentación de seis escenas. Web estática y local, sin backend ni telemetría. Estado 6.0.0 candidato de publicación; algunas referencias históricas y detalles biográficos requieren verificación documental.',
    category: 'Educación / Matemáticas',
    saga: 'Universo 404',
    icon: 'π',
    featured: true,
    screenshot: 'assets/screenshots/Pi-Legacy.svg',
    pages: 'https://ivan7800.github.io/Pi-legacy/',
    github: 'https://github.com/ivan7800/Pi-legacy',
    status: 'catalogued',
    availability: 'verified',
    offline: 'declared',
    platform: 'web',
    delivery: 'web-app'
  });
})();
