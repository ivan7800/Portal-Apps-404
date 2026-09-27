/* Portal Apps 404 · v41.34 · runtime integrity guard */
(function () {
  'use strict';
  var d = window.PORTAL_DATA;
  if (!d || !Array.isArray(d.APPS)) return;

  var additions = [
    {name:'Pocket-404-DX',short:'Aventura web 16-bit conectada con overworld, siete dungeons, herramientas, secretos, side quests y jefes.',description:'Pocket 404 DX · Rune Quest 404 DX es una aventura web 16-bit original para navegador y PWA. Su campaña conecta un overworld explorable con siete dungeons, herramientas que desbloquean rutas, backtracking, side quests, secretos, economía, jefes y créditos.',category:'Juego / Aventura 16-bit',saga:'Universo 404',icon:'◆',screenshot:'assets/screenshots/Pocket-404-DX.svg',pages:'https://ivan7800.github.io/Pocket-404-DX/',github:'https://github.com/ivan7800/Pocket-404-DX',featured:true,status:'catalogued',availability:'unverified',offline:'declared',platform:'web',delivery:'web-app',language:'HTML / JavaScript'},
    {name:'Blackthorn-404',short:'Aventura 16-bit de horror psicológico y cósmico con 108 salas, combate, sigilos, nueve jefes, tres finales y New Game+.',description:'Blackthorn 404: The Unremembered es una aventura web 16-bit original de horror psicológico y cósmico. Recorre Blackthorn Manor y ocho memorias históricas, domina percepción, sigilos y un arsenal de 12 armas, enfréntate a nueve jefes de tres fases y desbloquea tres finales y New Game+.',category:'Juego / Horror 16-bit',saga:'Universo 404',icon:'♜',screenshot:'assets/screenshots/Blackthorn-404.svg',pages:'https://ivan7800.github.io/Blackthorn-404/',github:'https://github.com/ivan7800/Blackthorn-404',featured:true,status:'catalogued',availability:'unverified',offline:'declared',platform:'web',delivery:'web-app',language:'HTML / CSS / JavaScript / Canvas 2D'},
    {name:'Bomb-Sweeper-87',short:'Homenaje web a Bomb Sweeper con modos Original y Enhanced, Game A/B, logros, estadísticas, gamepad y PWA offline.',description:'Bomb Sweeper ’87 — Premium Web Edition v5 es un homenaje web fan y no oficial creado desde cero con HTML, CSS, Canvas y JavaScript. Incluye modos Original y Enhanced, Game A con diez laberintos y fase bonus, Game B variable, perfil local, diez logros, estadísticas, controles táctiles y gamepad, fullscreen y funcionamiento PWA/offline.',category:'Juego / Retro LCD',saga:'Universo 404',icon:'●',screenshot:'assets/screenshots/Bomb-Sweeper-87.svg',pages:'https://ivan7800.github.io/Bomb-Sweeper-87/',github:'https://github.com/ivan7800/Bomb-Sweeper-87',featured:true,status:'catalogued',availability:'unverified',offline:'declared',platform:'web',delivery:'web-app',language:'HTML / CSS / JavaScript / Canvas'},
    {name:'Abyssal-Descent',short:'Dungeon crawler de horror cósmico en primera persona con exploración por cuadrícula, combate por turnos, cordura y campaña de cuatro actos.',description:'Abyssal Descent es un dungeon crawler original de horror cósmico para navegador inspirado en los CRPG clásicos en primera persona. Incluye una campaña de cuatro actos, tres arquetipos, plantas procedurales 17×13, 14 tipos de enemigos, cuatro guardianes, combate por turnos, 26 objetos, estados de cordura con alucinaciones, secretos, múltiples finales y guardado local.',category:'Juego / Dungeon crawler',saga:'Universo 404',icon:'◉',screenshot:'assets/screenshots/Abyssal-Descent.svg',pages:'https://ivan7800.github.io/Abyssal-Descent/',github:'https://github.com/ivan7800/Abyssal-Descent',featured:true,status:'catalogued',availability:'unverified',offline:'declared',platform:'web',delivery:'web-app',language:'HTML / CSS / JavaScript / Canvas'},
    {name:'Historias-del-Bloque-404',short:'Aventura narrativa quinqui local-first basada en Los chicos del bloque, con decisiones, consecuencias visibles y tres finales.',description:'Historias del Bloque 404 — Los chicos del bloque es una aventura narrativa quinqui estática y local-first inspirada en la novela de I. Roig. Recorre de Sant Roc en 1981 al epílogo de Dani en 1991 mediante 21 escenas principales, 75 opciones totales, rutas e interludios condicionales, consecuencias persistentes, tres finales narrativos y una duración orientativa de 30–40 minutos. Incluye guardado local, PWA offline, sonido ambiental local y navegación por ratón, tacto o teclado.',category:'Juego / Ficción interactiva',saga:'Universo 404',icon:'◆',screenshot:'assets/screenshots/Historias-del-Bloque-404.svg',pages:'https://ivan7800.github.io/Historias-del-Bloque-404-/',github:'https://github.com/ivan7800/Historias-del-Bloque-404-',featured:true,status:'catalogued',availability:'unverified',offline:'declared',platform:'web',delivery:'web-app',language:'HTML / CSS / JavaScript'}
  ];

  var seen = Object.create(null);
  d.APPS.forEach(function (app) { if (app && app.name) seen[app.name] = true; });
  d.LANGUAGES = d.LANGUAGES || {};
  additions.forEach(function (app) {
    d.LANGUAGES[app.name] = d.LANGUAGES[app.name] || app.language;
    if (!seen[app.name]) {
      var copy = {};
      Object.keys(app).forEach(function (key) { if (key !== 'language') copy[key] = app[key]; });
      d.APPS.push(copy);
      seen[app.name] = true;
    }
  });

  var unique = [];
  seen = Object.create(null);
  d.APPS.forEach(function (app) {
    if (!app || !app.name || seen[app.name]) return;
    seen[app.name] = true;
    unique.push(app);
  });
  d.APPS.splice.apply(d.APPS, [0, d.APPS.length].concat(unique));
  if (d.META) { d.META.release = 'v41.34'; d.META.updated = '2026-09-27'; }
  window.PORTAL_RELEASE = { version: 'v41.34', appCount: d.APPS.length };

  function syncVisibleCount() {
    var count = d.APPS.length;
    var hero = document.querySelector('.hero h1 em');
    if (hero) hero.textContent = count + ' apps, un solo universo.';
    var catalogNav = document.querySelector('.side-nav a[href="#catalogo"] b');
    if (catalogNav) catalogNav.textContent = String(count);
    Array.prototype.forEach.call(document.querySelectorAll('.stat'), function (stat) {
      var label = stat.querySelector('span');
      var strong = stat.querySelector('strong');
      if (label && strong && /apps catalogadas/i.test(label.textContent || '')) {
        strong.setAttribute('data-count', String(count));
        if (!strong.getAttribute('data-animated')) strong.textContent = String(count);
      }
    });
  }

  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', syncVisibleCount);
  else syncVisibleCount();
  window.addEventListener('load', syncVisibleCount);
})();
