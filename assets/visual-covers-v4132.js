/* Portal Apps 404 · v41.32 · Definitive unique visual covers */
(function () {
  'use strict';
  var data = window.PORTAL_DATA;
  if (!data || !Array.isArray(data.APPS)) return;

  var covers = {
    'AppHub-404': 'assets/screenshots/AppHub-404.svg',
    'Novel-Forge-404': 'assets/screenshots/Novel-Forge-404.svg',
    'Motion-404': 'assets/screenshots/Motion-404.svg',
    'Luna-Natura-404': 'assets/screenshots/Luna-Natura-404.svg',
    'MYTHOS-404': 'assets/screenshots/MYTHOS-404.svg',
    'Comic-Reader-404': 'assets/screenshots/Comic-Reader-404.svg',
    'PixelForge-404': 'assets/screenshots/PixelForge-404.svg',
    'MD-Forge-404': 'assets/screenshots/MD-Forge-404.svg',
    'FileDoctor-404': 'assets/screenshots/FileDoctor-404.svg',
    'HumanScript-404': 'assets/screenshots/HumanScript-404.svg',
    'IT-Commander-404': 'assets/screenshots/IT-Commander-404.svg',
    'SECOND-BRAIN-404': 'assets/screenshots/SECOND-BRAIN-404.svg',
    'Ringtone-404': 'assets/screenshots/Ringtone-404.svg',
    'ReleaseForge-404': 'assets/screenshots/ReleaseForge-404.svg',
    'Compra-404': 'assets/screenshots/Compra-404.svg',
    'Caminos-Malditos-Sangrientos': 'assets/screenshots/Caminos-Malditos-Sangrientos.svg'
  };

  data.APPS.forEach(function (app) {
    if (app && covers[app.name]) app.screenshot = covers[app.name];
  });

  if (data.META) {
    data.META.release = 'v41.32';
    data.META.updated = '2026-09-27';
  }
})();
