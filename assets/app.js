/* I. Roig · Portal Apps 404 — Universo 404 OS v31 Signature Edition */
(function () {
  'use strict';

  var D = window.PORTAL_DATA;
  var root = document.getElementById('app');
  if (!D || !Array.isArray(D.APPS) || !root) {
    if (root) root.innerHTML = '<p class="fatal">No se pudo cargar el catálogo.</p>';
    return;
  }

  var APPS = D.APPS;
  var LANGUAGES = D.LANGUAGES || {};
  var SKINS = ['cosmica', 'obsidiana', 'void', 'glass', 'terminal', 'arctic', 'synthwave'];
  var SKIN_NAMES = { cosmica: 'Cósmica', obsidiana: 'Obsidiana', void: 'Void OLED', glass: 'Glass', terminal: 'Terminal', arctic: 'Arctic', synthwave: 'Synthwave' };
  var SKIN_HINTS = { cosmica: 'Naranja y azul · identidad 404', obsidiana: 'Grafito elegante · baja saturación', void: 'Negro absoluto · OLED', glass: 'Cristal oscuro · profundidad', terminal: 'Workstation · fósforo verde', arctic: 'Claro editorial · máxima limpieza', synthwave: 'Neón violeta · experimental' };
  var THEME_COLORS = { cosmica: '#070a12', obsidiana: '#08090c', void: '#000000', glass: '#081018', terminal: '#050907', arctic: '#eef3f7', synthwave: '#0d0717' };
  var VIEW_NAMES = { grid: 'Cuadrícula', list: 'Lista' };

  var INTENTS = [
    { id: 'crear', icon: '✦', name: 'Crear', hint: 'Ideas, contenido y herramientas', test: /diseño|visual|escritura|multimedia|música|audio|prompt|foto/i },
    { id: 'escribir', icon: '✎', name: 'Escribir', hint: 'Novela, narrativa y texto', test: /escritura|narrativa|libros|prompt/i },
    { id: 'disenar', icon: '◇', name: 'Diseñar', hint: 'Imagen, UI y creación visual', test: /diseño|visual|foto|multimedia/i },
    { id: 'investigar', icon: '⌕', name: 'Investigar', hint: 'Datos, cultura y conocimiento', test: /datos|cultura|mitología|diccionario|auditoría|esoterismo/i },
    { id: 'organizar', icon: '▦', name: 'Organizar', hint: 'Productividad, sistema y utilidades', test: /productividad|directorios|sistema|windows|utilidad|seguridad|administración/i },
    { id: 'jugar', icon: '♜', name: 'Jugar', hint: 'Juegos, horror y ficción', test: /juego|juegos|horror|terror|ficción interactiva|simulación/i },
    { id: 'aprender', icon: '△', name: 'Aprender', hint: 'Formación, idiomas y cultura', test: /formación|educación|idiomas|cultura|mitología/i }
  ];

  function loadJSON(key, fallback) {
    try {
      var value = JSON.parse(localStorage.getItem(key));
      return value == null ? fallback : value;
    } catch (e) { return fallback; }
  }
  function saveJSON(key, value) {
    try { localStorage.setItem(key, JSON.stringify(value)); } catch (e) {}
  }
  function loadText(key, fallback) {
    try { return localStorage.getItem(key) || fallback; } catch (e) { return fallback; }
  }

  var state = {
    skin: loadText('u404-skin', 'cosmica'),
    query: '',
    activeSaga: null,
    activeIntent: null,
    techFilter: '',
    selectedApp: null,
    view: loadText('u404-view', 'grid'),
    favorites: loadJSON('u404-favorites', []),
    recent: loadJSON('u404-recent', []),
    palette: false,
    paletteQuery: '',
    skinPanel: false,
    motion: loadText('u404-motion', 'auto'),
    spotlight: APPS[Math.floor(Math.random() * APPS.length)]
  };
  if (SKINS.indexOf(state.skin) === -1) state.skin = 'cosmica';
  if (!VIEW_NAMES[state.view]) state.view = 'grid';
  if (['auto', 'reduced'].indexOf(state.motion) === -1) state.motion = 'auto';

  var esc = function (s) {
    return String(s == null ? '' : s).replace(/[&<>"']/g, function (ch) {
      return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[ch];
    });
  };

  var sagaNames = APPS.map(function (a) { return a.saga; }).filter(unique);
  var totalCats = APPS.map(function (a) { return a.category; }).filter(unique).length;
  var techs = Object.keys(LANGUAGES).map(function (k) { return LANGUAGES[k]; }).filter(unique).sort();
  var sagas = sagaNames.map(function (name) {
    var items = APPS.filter(function (a) { return a.saga === name; });
    return { name: name, count: items.length, icon: items[0] ? items[0].icon : '◌' };
  });
  var maxSaga = Math.max.apply(null, sagas.map(function (s) { return s.count; }));

  function unique(v, i, arr) { return arr.indexOf(v) === i; }
  function byName(name) {
    for (var i = 0; i < APPS.length; i++) if (APPS[i].name === name) return APPS[i];
    return null;
  }
  function currentIntent() {
    for (var i = 0; i < INTENTS.length; i++) if (INTENTS[i].id === state.activeIntent) return INTENTS[i];
    return null;
  }
  var SEARCH_ALIASES = {
    'PixelForge-404': 'editar fotos editar foto photoshop imagen imagenes capas psd raw diseño grafico retoque',
    'Novel-Forge-404': 'escribir novela libro manuscrito narrativa escritor planificar capitulos epub',
    'Comic-Reader-404': 'leer comic comics manga cbz cbr rar pdf lector biblioteca',
    'MYTHOS-404': 'mitologia mitos dioses religiones folklore leyendas cultura historia',
    'Motion-404': 'animacion motion web animada prompts diseño interfaz ui ux',
    'Luna-Natura-404': 'huerto luna lunar plantas cultivo cultivos jardin naturaleza meteorologia',
    'World-TV-404': 'television tv canales iptv multimedia ver television',
    'AppHub-404': 'windows winget instalar programas actualizar software aplicaciones',
    'AETHERION-Editorial-OS': 'revisar novela editorial corregir manuscrito auditoria literaria',
    'Photo-Studio-OS': 'foto fotografia estudio fotografico imagen retoque estudio visual',
    'PDF-Forge-404': 'pdf unir dividir convertir editar documento',
    'PromptForge-404': 'prompt prompts inteligencia artificial ia generar prompts',
    'Second-Brain-404': 'notas obsidian rag documentos conocimiento segundo cerebro'
  };
  function normalizeText(value) {
    var s = String(value == null ? '' : value).toLowerCase();
    try { s = s.normalize('NFD').replace(/[\u0300-\u036f]/g, ''); } catch (e) {}
    return s.replace(/[^a-z0-9]+/g, ' ').trim();
  }
  function appText(a) {
    return normalizeText([a.name, a.category, a.short, a.description, a.saga, LANGUAGES[a.name], SEARCH_ALIASES[a.name] || ''].join(' '));
  }
  function queryTokens(q) { return normalizeText(q).split(/\s+/).filter(Boolean); }
  function searchScore(a, q) {
    var tokens = queryTokens(q);
    if (!tokens.length) return 0;
    var name = normalizeText(a.name);
    var category = normalizeText(a.category);
    var short = normalizeText(a.short);
    var full = appText(a);
    var score = 0;
    tokens.forEach(function (t) {
      if (name.indexOf(t) !== -1) score += 12;
      if (category.indexOf(t) !== -1) score += 7;
      if (short.indexOf(t) !== -1) score += 5;
      if (full.indexOf(t) !== -1) score += 3;
    });
    if (full.indexOf(normalizeText(q)) !== -1) score += 14;
    return score;
  }
  function relatedApps(a) {
    return APPS.filter(function (x) { return x.name !== a.name; }).map(function (x) {
      var score = 0;
      if (x.saga === a.saga) score += 5;
      if (x.category === a.category) score += 6;
      var ac = normalizeText(a.category).split(' '), xc = normalizeText(x.category);
      ac.forEach(function (t) { if (t.length > 3 && xc.indexOf(t) !== -1) score += 2; });
      if (x.featured) score += 1;
      return { app: x, score: score };
    }).filter(function (x) { return x.score > 0; }).sort(function (a1, b1) { return b1.score - a1.score || a1.app.name.localeCompare(b1.app.name); }).slice(0, 3).map(function (x) { return x.app; });
  }
  function isFavorite(name) { return state.favorites.indexOf(name) !== -1; }

  function catalog() {
    var out = APPS.slice();
    var intent = currentIntent();
    if (intent) out = out.filter(function (a) { return intent.test.test(appText(a)); });
    if (state.activeSaga) out = out.filter(function (a) { return a.saga === state.activeSaga; });
    if (state.techFilter) out = out.filter(function (a) { return (LANGUAGES[a.name] || 'JavaScript') === state.techFilter; });
    var q = state.query.trim();
    if (q) out = out.filter(function (a) { return searchScore(a, q) > 0; }).sort(function (a, b) { return searchScore(b, q) - searchScore(a, q); });
    return out;
  }

  function paletteResults() {
    var q = state.paletteQuery.trim();
    if (!q) {
      var recent = state.recent.map(byName).filter(Boolean);
      var featured = APPS.filter(function (a) { return a.featured; });
      return recent.concat(featured.filter(function (a) { return recent.indexOf(a) === -1; })).slice(0, 8);
    }
    return APPS.map(function (a) { return { app: a, score: searchScore(a, q) }; })
      .filter(function (x) { return x.score > 0; })
      .sort(function (a, b) { return b.score - a.score || a.app.name.localeCompare(b.app.name); })
      .slice(0, 8).map(function (x) { return x.app; });
  }

  function setIntent(id) {
    state.activeIntent = state.activeIntent === id ? null : id;
    state.activeSaga = null;
    state.query = '';
    render();
    pulseCore('navigate');
    scrollToId('catalogo');
  }
  function setSaga(name) {
    state.activeSaga = state.activeSaga === name ? null : name;
    state.activeIntent = null;
    render();
    pulseCore('navigate');
    scrollToId('catalogo');
  }
  function scrollToId(id) {
    var el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: reduceMotion() ? 'auto' : 'smooth', block: 'start' });
  }
  function reduceMotion() { return !!(window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches); }

  function addRecent(name) {
    state.recent = [name].concat(state.recent.filter(function (n) { return n !== name; })).slice(0, 8);
    saveJSON('u404-recent', state.recent);
  }
  function toggleFavorite(name) {
    if (isFavorite(name)) state.favorites = state.favorites.filter(function (n) { return n !== name; });
    else state.favorites = [name].concat(state.favorites).slice(0, 30);
    saveJSON('u404-favorites', state.favorites);
    pulseCore('favorite');
  }

  function openApp(name) {
    var app = byName(name);
    if (!app) return;
    lastFocusName = name;
    addRecent(name);
    state.selectedApp = app;
    state.palette = false;
    render();
    pulseCore('open');
    document.body.classList.add('modal-open');
    var c = document.getElementById('close-modal');
    if (c) c.focus();
  }

  function closeApp() {
    state.selectedApp = null;
    document.body.classList.remove('modal-open');
    render();
    if (lastFocusName) {
      var again = document.querySelector('[data-app="' + cssEsc(lastFocusName) + '"]');
      if (again) again.focus();
    }
  }

  function openPalette() {
    state.palette = true;
    state.skinPanel = false;
    state.paletteQuery = '';
    render();
    pulseCore('search');
    document.body.classList.add('modal-open');
    var input = document.getElementById('palette-q');
    if (input) input.focus();
  }
  function closePalette() {
    state.palette = false;
    state.paletteQuery = '';
    document.body.classList.remove('modal-open');
    render();
    var trigger = document.getElementById('open-palette');
    if (trigger) trigger.focus();
  }

  function cssEsc(value) {
    if (window.CSS && CSS.escape) return CSS.escape(value);
    return String(value).replace(/["\\]/g, '\\$&');
  }

  var lastFocusName = null;
  var alt = function (i) { return i % 2 === 0 ? 'var(--accent)' : 'var(--accent2)'; };

  function compactCard(a, i) {
    return '<article class="app-card" style="--c:' + alt(i) + '">' +
      '<button class="app-open" data-app="' + esc(a.name) + '" aria-label="Ver ficha de ' + esc(a.name) + '">' +
        '<span class="app-shot"><img src="' + esc(a.screenshot) + '" alt="" loading="lazy" decoding="async" width="1280" height="720"></span>' +
        '<span class="app-copy"><span class="app-meta"><span>' + esc(a.category) + '</span><span>' + esc(LANGUAGES[a.name] || 'JavaScript') + '</span></span>' +
        '<strong>' + esc(a.name) + '</strong><span class="app-desc">' + esc(a.short) + '</span></span>' +
      '</button>' +
      '<button class="fav" data-fav="' + esc(a.name) + '" aria-label="' + (isFavorite(a.name) ? 'Quitar ' : 'Añadir ') + esc(a.name) + (isFavorite(a.name) ? ' de favoritos' : ' a favoritos') + '" aria-pressed="' + isFavorite(a.name) + '">' + (isFavorite(a.name) ? '★' : '☆') + '</button>' +
    '</article>';
  }

  function listCard(a, i) {
    return '<article class="app-row" style="--c:' + alt(i) + '">' +
      '<button class="row-open" data-app="' + esc(a.name) + '">' +
        '<span class="row-icon">' + esc(a.icon) + '</span>' +
        '<span class="row-main"><strong>' + esc(a.name) + '</strong><small>' + esc(a.short) + '</small></span>' +
        '<span class="row-cat">' + esc(a.category) + '</span><span class="row-tech">' + esc(LANGUAGES[a.name] || 'JavaScript') + '</span><span class="row-go">→</span>' +
      '</button>' +
      '<button class="fav row-fav" data-fav="' + esc(a.name) + '" aria-label="Favorito" aria-pressed="' + isFavorite(a.name) + '">' + (isFavorite(a.name) ? '★' : '☆') + '</button>' +
    '</article>';
  }

  function smallTile(a, i) {
    return '<button class="small-tile" data-app="' + esc(a.name) + '" style="--c:' + alt(i) + '">' +
      '<span class="tile-icon">' + esc(a.icon) + '</span><span><strong>' + esc(a.name) + '</strong><small>' + esc(a.category) + '</small></span><span class="tile-go">↗</span>' +
    '</button>';
  }

  function orbitHTML() {
    return '<div class="universe" aria-label="Mapa de las siete áreas del ecosistema">' +
      '<div class="orbit orbit-a"></div><div class="orbit orbit-b"></div><div class="orbit orbit-c"></div>' +
      '<button class="core" id="open-palette-core" aria-label="Abrir buscador universal"><img src="assets/logo.webp" alt="" width="180" height="180"><span>U404</span><small>' + APPS.length + ' sistemas</small></button>' +
      sagas.map(function (s, i) {
        return '<button class="orbit-node n' + i + '" data-saga="' + esc(s.name) + '" aria-pressed="' + (state.activeSaga === s.name) + '"><span>' + esc(s.icon) + '</span><small>' + esc(s.name) + '</small><b>' + s.count + '</b></button>';
      }).join('') +
    '</div>';
  }

  function render() {
    document.documentElement.setAttribute('data-skin', state.skin);
    document.documentElement.setAttribute('data-view', state.view);
    document.documentElement.setAttribute('data-motion', state.motion);
    var themeMeta = document.querySelector('meta[name="theme-color"]');
    if (themeMeta) themeMeta.setAttribute('content', THEME_COLORS[state.skin] || '#070a12');
    var list = catalog();
    var featured = APPS.filter(function (a) { return a.featured; }).slice(0, 8);
    var favoriteApps = state.favorites.map(byName).filter(Boolean);
    var recentApps = state.recent.map(byName).filter(Boolean).slice(0, 6);
    var intent = currentIntent();
    var sp = state.spotlight;
    var activeFilter = intent ? intent.name : (state.activeSaga || 'Todas');

    root.innerHTML =
      '<div class="os-shell">' +
        sidebarHTML() +
        '<div class="os-main">' +
          topbarHTML() +
          '<main class="workspace" id="main-content">' +
            '<section class="hero-os" id="top">' +
              '<div class="hero-copy">' +
                '<p class="eyebrow"><span class="status-dot"></span> UNIVERSO 404 · SISTEMA ONLINE</p>' +
                '<h1>Tu ecosistema digital.<br><em>89 apps, un solo universo.</em></h1>' +
                '<p class="lede">Herramientas, escritura, diseño, IA, sistemas, cultura y ficción interactiva reunidos en un centro de mando local-first.</p>' +
                '<div class="hero-actions"><button class="primary" id="open-palette">⌕ Buscar en Universo 404 <kbd>Ctrl K</kbd></button><a class="ghost" href="#catalogo">Explorar las ' + APPS.length + ' apps</a></div>' +
                '<div class="system-pills"><span><b>' + APPS.length + '</b> apps</span><span><b>' + sagaNames.length + '</b> mundos</span><span><b>' + totalCats + '</b> categorías</span><span>● sin tracking</span></div>' +
              '</div>' +
              orbitHTML() +
            '</section>' +

            '<section class="section" id="intenciones">' +
              '<div class="section-head"><div><p class="kicker">Acceso por intención</p><h2>¿Qué quieres hacer?</h2></div><p>Entra por objetivo y el sistema seleccionará las apps relacionadas.</p></div>' +
              '<div class="intent-grid">' + INTENTS.map(function (it) {
                return '<button class="intent-card' + (state.activeIntent === it.id ? ' is-active' : '') + '" data-intent="' + it.id + '" aria-pressed="' + (state.activeIntent === it.id) + '"><span class="intent-icon">' + it.icon + '</span><span><strong>' + it.name + '</strong><small>' + it.hint + '</small></span><span class="intent-arrow">→</span></button>';
              }).join('') + '</div>' +
            '</section>' +

            '<section class="section spotlight-os" id="destacada">' +
              '<div class="spot-card"><div class="spot-visual"><img src="' + esc(sp.screenshot) + '" alt="Vista previa de ' + esc(sp.name) + '" loading="lazy" width="1280" height="720"><span class="spot-badge">SELECCIÓN DEL SISTEMA</span></div>' +
              '<div class="spot-copy"><p class="kicker">App destacada</p><h2>' + esc(sp.name) + '</h2><p>' + esc(sp.description || sp.short) + '</p><div class="tagline"><span>' + esc(sp.category) + '</span><span>' + esc(LANGUAGES[sp.name] || 'JavaScript') + '</span><span>' + esc(sp.saga) + '</span></div><div class="spot-actions"><button class="primary compact" data-app="' + esc(sp.name) + '">Ver ficha</button><a class="ghost compact" href="' + esc(sp.pages) + '" target="_blank" rel="noopener noreferrer">Abrir app ↗</a></div></div></div>' +
            '</section>' +

            (favoriteApps.length ? '<section class="section" id="favoritos"><div class="section-head"><div><p class="kicker">Tu espacio</p><h2>Favoritos</h2></div><p>Guardados solo en este navegador.</p></div><div class="small-grid">' + favoriteApps.slice(0, 8).map(smallTile).join('') + '</div></section>' : '') +
            (recentApps.length ? '<section class="section" id="recientes"><div class="section-head"><div><p class="kicker">Actividad local</p><h2>Abiertas recientemente</h2></div><button class="text-btn" id="clear-recent">Limpiar</button></div><div class="small-grid">' + recentApps.map(smallTile).join('') + '</div></section>' : '') +

            '<section class="section" id="top-apps"><div class="section-head"><div><p class="kicker">Selección 404</p><h2>Imprescindibles</h2></div><p>Una muestra representativa del ecosistema.</p></div><div class="featured-grid">' + featured.map(compactCard).join('') + '</div></section>' +

            '<section class="section control-panel" id="panel">' +
              '<div class="section-head"><div><p class="kicker">Control Center</p><h2>Estado del ecosistema</h2></div><p>Datos calculados en tiempo real desde el catálogo.</p></div>' +
              '<div class="stats-grid"><div class="stat"><strong>' + APPS.length + '</strong><span>apps catalogadas</span></div><div class="stat"><strong>' + sagaNames.length + '</strong><span>mundos</span></div><div class="stat"><strong>' + totalCats + '</strong><span>categorías</span></div><div class="stat"><strong>' + techs.length + '</strong><span>tecnologías</span></div></div>' +
              '<div class="distribution"><h3>Distribución por mundo</h3>' + sagas.map(function (s) { return '<button class="dist-row" data-saga="' + esc(s.name) + '"><span>' + esc(s.icon) + ' ' + esc(s.name) + '</span><i><b style="width:' + Math.round((s.count / maxSaga) * 100) + '%"></b></i><strong>' + s.count + '</strong></button>'; }).join('') + '</div>' +
            '</section>' +

            '<section class="section catalog-section" id="catalogo">' +
              '<div class="section-head catalog-head"><div><p class="kicker">Explorador</p><h2>Las ' + APPS.length + ' aplicaciones</h2></div><div class="view-switch" role="group" aria-label="Vista del catálogo"><button data-view="grid" aria-pressed="' + (state.view === 'grid') + '" title="Cuadrícula">▦</button><button data-view="list" aria-pressed="' + (state.view === 'list') + '" title="Lista">☷</button></div></div>' +
              '<div class="catalog-toolbar">' +
                '<label class="catalog-search"><span>⌕</span><input id="q" type="search" autocomplete="off" spellcheck="false" placeholder="Buscar por nombre, función, categoría…" value="' + esc(state.query) + '"></label>' +
                '<select id="tech" aria-label="Filtrar por tecnología"><option value="">Toda tecnología</option>' + techs.map(function (t) { return '<option value="' + esc(t) + '"' + (state.techFilter === t ? ' selected' : '') + '>' + esc(t) + '</option>'; }).join('') + '</select>' +
                '<button class="filter-chip' + ((state.activeIntent || state.activeSaga) ? ' is-on' : '') + '" id="clear-filter">' + esc(activeFilter) + ((state.activeIntent || state.activeSaga) ? ' ×' : '') + '</button>' +
              '</div>' +
              '<div class="catalog-status"><span role="status">Mostrando <b>' + list.length + '</b> de ' + APPS.length + '</span><span>' + esc(VIEW_NAMES[state.view]) + '</span></div>' +
              (list.length ? (state.view === 'grid' ? '<div class="catalog-grid">' + list.map(compactCard).join('') + '</div>' : '<div class="catalog-list">' + list.map(listCard).join('') + '</div>') : '<div class="empty"><span>◌</span><h3>Sin coincidencias</h3><p>Prueba otra búsqueda o elimina los filtros activos.</p><button class="ghost compact" id="reset-empty">Restablecer filtros</button></div>') +
            '</section>' +

            '<footer class="footer"><div><img src="assets/logo.webp" alt="" width="36" height="36"><span><strong>Universo 404 OS</strong><small>I. Roig · v28 Signature</small></span></div><p>' + APPS.length + ' apps · local-first · sin tracking · GitHub Pages</p><a href="#top">Volver al núcleo ↑</a></footer>' +
          '</main>' +
          mobileNavHTML() +
        '</div>' +
      '</div>' +
      (state.selectedApp ? modalHTML(state.selectedApp) : '') +
      (state.palette ? paletteHTML() : '') +
      (state.skinPanel ? skinPanelHTML() : '');

    wire();
  }

  function sidebarHTML() {
    return '<aside class="sidebar" aria-label="Navegación principal">' +
      '<a class="side-brand" href="#top"><img src="assets/logo.webp" alt="" width="48" height="48"><span><strong>U404</strong><small>PORTAL OS</small></span></a>' +
      '<nav class="side-nav"><p>Explorar</p><a href="#top" class="active"><span>◉</span>Inicio</a><a href="#intenciones"><span>✦</span>Qué quieres hacer</a><a href="#top-apps"><span>◇</span>Destacadas</a><a href="#catalogo"><span>▦</span>Catálogo <b>' + APPS.length + '</b></a><a href="#panel"><span>⌁</span>Control Center</a></nav>' +
      '<div class="side-worlds"><p>Mundos</p>' + sagas.map(function (s) { return '<button data-saga="' + esc(s.name) + '" class="' + (state.activeSaga === s.name ? 'active' : '') + '"><span>' + esc(s.icon) + '</span><em>' + esc(s.name) + '</em><b>' + s.count + '</b></button>'; }).join('') + '</div>' +
      '<div class="side-bottom"><button id="skin" class="skin-button"><span>◐</span><span><small>Apariencia</small><strong>' + esc(SKIN_NAMES[state.skin]) + '</strong></span></button><a href="https://github.com/ivan7800" target="_blank" rel="noopener noreferrer"><span>⌘</span>GitHub ↗</a></div>' +
    '</aside>';
  }

  function topbarHTML() {
    return '<header class="topbar"><div class="crumb"><span class="pulse"></span><strong>UNIVERSO 404</strong><span>/</span><span>Centro de mando</span></div><div class="top-actions"><button class="top-search" id="open-palette-top">⌕ <span>Buscar apps</span><kbd>Ctrl K</kbd></button><button class="icon-btn" id="skin-top" aria-label="Abrir apariencia" title="Apariencia">◐</button><a class="avatar" href="https://github.com/ivan7800" target="_blank" rel="noopener noreferrer" aria-label="GitHub de I. Roig">IR</a></div></header>';
  }

  function mobileNavHTML() {
    return '<nav class="mobile-nav" aria-label="Navegación móvil"><a href="#top"><span>◉</span><small>Inicio</small></a><a href="#intenciones"><span>✦</span><small>Crear</small></a><button id="mobile-search"><span>⌕</span><small>Buscar</small></button><a href="#catalogo"><span>▦</span><small>Apps</small></a><a href="#panel"><span>⌁</span><small>Panel</small></a></nav>';
  }

  function modalHTML(a) {
    var related = relatedApps(a);
    return '<div class="overlay" id="modal-overlay"><div class="app-modal" id="app-modal" role="dialog" aria-modal="true" aria-labelledby="modal-title" tabindex="-1">' +
      '<button class="modal-close" id="close-modal" aria-label="Cerrar ficha">×</button>' +
      '<div class="modal-shot"><img src="' + esc(a.screenshot) + '" alt="Vista previa de ' + esc(a.name) + '" width="1280" height="720"><span>' + esc(a.saga) + '</span></div>' +
      '<div class="modal-content"><div class="modal-heading"><div><p class="kicker">' + esc(a.category) + '</p><h2 id="modal-title">' + esc(a.name) + '</h2></div><button class="modal-fav" id="modal-fav" data-fav="' + esc(a.name) + '" aria-pressed="' + isFavorite(a.name) + '">' + (isFavorite(a.name) ? '★ Favorita' : '☆ Favorita') + '</button></div>' +
      '<p class="modal-description">' + esc(a.description || a.short) + '</p><div class="modal-tags"><span>' + esc(LANGUAGES[a.name] || 'JavaScript') + '</span><span>GitHub Pages</span><span>Local-first</span></div>' +
      '<div class="modal-actions"><a class="primary" href="' + esc(a.pages) + '" target="_blank" rel="noopener noreferrer">Abrir aplicación ↗</a><a class="ghost" href="' + esc(a.github) + '" target="_blank" rel="noopener noreferrer">Ver repositorio</a></div>' +
      (related.length ? '<div class="modal-related"><p class="kicker">Conexiones 404</p><h3>También te puede servir</h3><div class="related-grid">' + related.map(function (r) { return '<button data-app="' + esc(r.name) + '"><span>' + esc(r.icon) + '</span><span><strong>' + esc(r.name) + '</strong><small>' + esc(r.category) + '</small></span><b>→</b></button>'; }).join('') + '</div></div>' : '') +
      '</div></div></div>';
  }

  function paletteHTML() {
    var results = paletteResults();
    return '<div class="overlay palette-overlay" id="palette-overlay"><div class="palette" id="palette" role="dialog" aria-modal="true" aria-labelledby="palette-title">' +
      '<div class="palette-input"><span>⌕</span><input id="palette-q" type="search" autocomplete="off" placeholder="Busca una app o escribe lo que quieres hacer…" value="' + esc(state.paletteQuery) + '" aria-label="Buscar en Universo 404"><kbd>ESC</kbd></div>' +
      '<div class="palette-body"><p id="palette-title">' + (state.paletteQuery ? 'Resultados' : (state.recent.length ? 'Recientes y destacadas' : 'Apps destacadas')) + '</p>' +
      (results.length ? '<div class="palette-results">' + results.map(function (a, i) { return '<button data-palette-app="' + esc(a.name) + '"' + (i === 0 ? ' class="selected"' : '') + '><span class="p-icon">' + esc(a.icon) + '</span><span><strong>' + esc(a.name) + '</strong><small>' + esc(a.short) + '</small></span><em>' + esc(a.category) + '</em><b>↵</b></button>'; }).join('') + '</div>' : '<div class="palette-empty">No hay coincidencias. Prueba con “imagen”, “novela”, “Windows” o “terror”.</div>') +
      '</div><div class="palette-foot"><span><kbd>↑</kbd><kbd>↓</kbd> navegar</span><span><kbd>Enter</kbd> abrir</span><span>' + APPS.length + ' apps locales</span></div>' +
    '</div></div>';
  }


  function skinPanelHTML() {
    return '<div class="overlay skin-overlay" id="skin-overlay"><div class="skin-panel" id="skin-panel" role="dialog" aria-modal="true" aria-labelledby="skin-title" tabindex="-1">' +
      '<div class="skin-head"><div><p class="kicker">Signature Edition</p><h2 id="skin-title">Apariencia</h2><p>Elige una atmósfera. La selección se guarda solo en este navegador.</p></div><button class="modal-close skin-close" id="close-skin" aria-label="Cerrar apariencia">×</button></div>' +
      '<div class="skin-grid">' + SKINS.map(function (key) {
        return '<button class="skin-choice' + (state.skin === key ? ' is-active' : '') + '" data-skin-choice="' + key + '" aria-pressed="' + (state.skin === key) + '">' +
          '<span class="skin-preview preview-' + key + '"><i></i><i></i><i></i><b>404</b></span>' +
          '<span class="skin-copy"><strong>' + esc(SKIN_NAMES[key]) + '</strong><small>' + esc(SKIN_HINTS[key]) + '</small></span><em>' + (state.skin === key ? '✓' : '→') + '</em>' +
        '</button>';
      }).join('') + '</div>' +
      '<div class="motion-setting"><span><strong>Movimiento ambiental</strong><small>Respeta “Reducir movimiento” del sistema automáticamente.</small></span><button id="motion-toggle" class="motion-toggle" aria-pressed="' + (state.motion === 'reduced') + '"><span></span>' + (state.motion === 'reduced' ? 'Reducido' : 'Dinámico') + '</button></div>' +
      '<div class="skin-foot"><span>Sin librerías externas</span><span>GPU-friendly</span><span>Preferencia local</span></div>' +
    '</div></div>';
  }

  function openSkinPanel() {
    state.skinPanel = true;
    state.palette = false;
    render();
    document.body.classList.add('modal-open');
    var panel = document.getElementById('skin-panel');
    if (panel) panel.focus();
  }

  function closeSkinPanel() {
    state.skinPanel = false;
    document.body.classList.remove('modal-open');
    render();
    var trigger = document.getElementById('skin');
    if (trigger) trigger.focus();
  }

  function setSkin(key) {
    if (SKINS.indexOf(key) === -1) return;
    state.skin = key;
    try { localStorage.setItem('u404-skin', state.skin); } catch (e) {}
    render();
    document.body.classList.add('modal-open');
    var chosen = document.querySelector('[data-skin-choice="' + cssEsc(key) + '"]');
    if (chosen) chosen.focus();
  }

  function toggleMotion() {
    state.motion = state.motion === 'reduced' ? 'auto' : 'reduced';
    try { localStorage.setItem('u404-motion', state.motion); } catch (e) {}
    render();
    document.body.classList.add('modal-open');
    var toggle = document.getElementById('motion-toggle');
    if (toggle) toggle.focus();
  }

  var activityTimer = null;
  function pulseCore(kind) {
    document.body.setAttribute('data-activity', kind || 'active');
    if (activityTimer) clearTimeout(activityTimer);
    activityTimer = setTimeout(function () { document.body.removeAttribute('data-activity'); }, 720);
  }

  function wire() {
    var skin = document.getElementById('skin');
    var skinTop = document.getElementById('skin-top');
    if (skin) skin.onclick = openSkinPanel;
    if (skinTop) skinTop.onclick = openSkinPanel;

    ['open-palette', 'open-palette-top', 'open-palette-core', 'mobile-search'].forEach(function (id) {
      var el = document.getElementById(id); if (el) el.onclick = openPalette;
    });

    Array.prototype.forEach.call(document.querySelectorAll('[data-intent]'), function (b) {
      b.onclick = function () { setIntent(b.getAttribute('data-intent')); };
    });
    Array.prototype.forEach.call(document.querySelectorAll('[data-saga]'), function (b) {
      b.onclick = function () { setSaga(b.getAttribute('data-saga')); };
    });
    Array.prototype.forEach.call(document.querySelectorAll('[data-app]'), function (b) {
      b.onclick = function () { openApp(b.getAttribute('data-app')); };
    });
    Array.prototype.forEach.call(document.querySelectorAll('[data-fav]'), function (b) {
      b.onclick = function (e) {
        e.stopPropagation();
        toggleFavorite(b.getAttribute('data-fav'));
        var selectedName = state.selectedApp && state.selectedApp.name;
        render();
        if (selectedName) { document.body.classList.add('modal-open'); var f = document.getElementById('modal-fav'); if (f) f.focus(); }
      };
    });
    Array.prototype.forEach.call(document.querySelectorAll('[data-view]'), function (b) {
      b.onclick = function () { state.view = b.getAttribute('data-view'); try { localStorage.setItem('u404-view', state.view); } catch (e) {} render(); scrollToId('catalogo'); };
    });

    var q = document.getElementById('q');
    if (q) q.oninput = function (e) { state.query = e.target.value; updateCatalogOnly(); };
    var tech = document.getElementById('tech');
    if (tech) tech.onchange = function (e) { state.techFilter = e.target.value; render(); scrollToId('catalogo'); };
    var clear = document.getElementById('clear-filter');
    if (clear) clear.onclick = function () { state.activeSaga = null; state.activeIntent = null; render(); scrollToId('catalogo'); };
    var reset = document.getElementById('reset-empty');
    if (reset) reset.onclick = resetFilters;
    var clearRecent = document.getElementById('clear-recent');
    if (clearRecent) clearRecent.onclick = function () { state.recent = []; saveJSON('u404-recent', []); render(); };

    Array.prototype.forEach.call(document.querySelectorAll('[data-skin-choice]'), function (b) {
      b.onclick = function () { setSkin(b.getAttribute('data-skin-choice')); };
    });
    var motionToggle = document.getElementById('motion-toggle');
    if (motionToggle) motionToggle.onclick = toggleMotion;
    var skinOv = document.getElementById('skin-overlay');
    if (skinOv) {
      skinOv.onclick = function (e) { if (e.target === skinOv) closeSkinPanel(); };
      var skinClose = document.getElementById('close-skin');
      if (skinClose) skinClose.onclick = closeSkinPanel;
    }

    var modalOv = document.getElementById('modal-overlay');
    if (modalOv) {
      modalOv.onclick = function (e) { if (e.target === modalOv) closeApp(); };
      var close = document.getElementById('close-modal'); if (close) close.onclick = closeApp;
    }
    var paletteOv = document.getElementById('palette-overlay');
    if (paletteOv) {
      paletteOv.onclick = function (e) { if (e.target === paletteOv) closePalette(); };
      var pq = document.getElementById('palette-q');
      if (pq) pq.oninput = function (e) { state.paletteQuery = e.target.value; renderPaletteBody(); };
      wirePaletteResults();
    }
  }

  function updateCatalogOnly() {
    var section = document.getElementById('catalogo');
    if (!section) { render(); return; }
    var active = document.activeElement;
    var value = state.query;
    var pos = active && active.id === 'q' ? active.selectionStart : value.length;
    render();
    var next = document.getElementById('q');
    if (next) { next.focus(); try { next.setSelectionRange(pos, pos); } catch (e) {} }
  }

  function renderPaletteBody() {
    var results = paletteResults();
    var body = document.querySelector('.palette-body');
    if (!body) return;
    body.innerHTML = '<p id="palette-title">Resultados</p>' + (results.length ? '<div class="palette-results">' + results.map(function (a, i) { return '<button data-palette-app="' + esc(a.name) + '"' + (i === 0 ? ' class="selected"' : '') + '><span class="p-icon">' + esc(a.icon) + '</span><span><strong>' + esc(a.name) + '</strong><small>' + esc(a.short) + '</small></span><em>' + esc(a.category) + '</em><b>↵</b></button>'; }).join('') + '</div>' : '<div class="palette-empty">No hay coincidencias. Prueba con “imagen”, “novela”, “Windows” o “terror”.</div>');
    wirePaletteResults();
  }

  function wirePaletteResults() {
    Array.prototype.forEach.call(document.querySelectorAll('[data-palette-app]'), function (b) {
      b.onclick = function () { openApp(b.getAttribute('data-palette-app')); };
    });
  }

  function nextSkin() {
    state.skin = SKINS[(SKINS.indexOf(state.skin) + 1) % SKINS.length];
    try { localStorage.setItem('u404-skin', state.skin); } catch (e) {}
    render();
  }

  function resetFilters() {
    state.query = ''; state.activeSaga = null; state.activeIntent = null; state.techFilter = ''; render(); scrollToId('catalogo');
  }

  document.addEventListener('keydown', function (e) {
    var isShortcut = (e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 'k';
    if (isShortcut) { e.preventDefault(); if (state.palette) closePalette(); else openPalette(); return; }
    if (e.key === 'Escape') {
      if (state.selectedApp) { closeApp(); return; }
      if (state.palette) { closePalette(); return; }
      if (state.skinPanel) { closeSkinPanel(); return; }
    }
    if (state.palette && (e.key === 'ArrowDown' || e.key === 'ArrowUp')) {
      var items = Array.prototype.slice.call(document.querySelectorAll('[data-palette-app]'));
      if (!items.length) return;
      e.preventDefault();
      var current = document.querySelector('[data-palette-app].selected');
      var idx = Math.max(0, items.indexOf(current));
      idx = e.key === 'ArrowDown' ? (idx + 1) % items.length : (idx - 1 + items.length) % items.length;
      items.forEach(function (x) { x.classList.remove('selected'); }); items[idx].classList.add('selected'); items[idx].scrollIntoView({ block: 'nearest' });
    }
    if (state.palette && e.key === 'Enter') {
      var input = document.getElementById('palette-q');
      if (document.activeElement === input) {
        var selected = document.querySelector('[data-palette-app].selected') || document.querySelector('[data-palette-app]');
        if (selected) { e.preventDefault(); openApp(selected.getAttribute('data-palette-app')); }
      }
    }
    if ((state.selectedApp || state.palette || state.skinPanel) && e.key === 'Tab') trapFocus(e);
  });

  function trapFocus(e) {
    var dialog = state.selectedApp ? document.getElementById('app-modal') : (state.palette ? document.getElementById('palette') : document.getElementById('skin-panel'));
    if (!dialog) return;
    var focusable = dialog.querySelectorAll('a[href],button:not([disabled]),input:not([disabled]),select:not([disabled]),[tabindex]:not([tabindex="-1"])');
    if (!focusable.length) return;
    var first = focusable[0], last = focusable[focusable.length - 1];
    if (e.shiftKey && document.activeElement === first) { e.preventDefault(); last.focus(); }
    else if (!e.shiftKey && document.activeElement === last) { e.preventDefault(); first.focus(); }
  }


  var finePointer = !!(window.matchMedia && window.matchMedia('(hover:hover) and (pointer:fine)').matches);
  var pointerRAF = 0;
  if (finePointer) {
    document.addEventListener('pointermove', function (e) {
      if (state.motion === 'reduced' || reduceMotion()) return;
      if (pointerRAF) cancelAnimationFrame(pointerRAF);
      pointerRAF = requestAnimationFrame(function () {
        var uni = document.querySelector('.universe');
        if (uni) {
          var r = uni.getBoundingClientRect();
          var dx = ((e.clientX - (r.left + r.width / 2)) / r.width);
          var dy = ((e.clientY - (r.top + r.height / 2)) / r.height);
          dx = Math.max(-.5, Math.min(.5, dx));
          dy = Math.max(-.5, Math.min(.5, dy));
          uni.style.setProperty('--parallax-x', (dx * 10).toFixed(2) + 'px');
          uni.style.setProperty('--parallax-y', (dy * 10).toFixed(2) + 'px');
        }
        var card = e.target && e.target.closest ? e.target.closest('.app-card,.intent-card,.small-tile') : null;
        if (card) {
          var cr = card.getBoundingClientRect();
          card.style.setProperty('--px', (((e.clientX - cr.left) / cr.width) * 100).toFixed(1) + '%');
          card.style.setProperty('--py', (((e.clientY - cr.top) / cr.height) * 100).toFixed(1) + '%');
        }
      });
    }, { passive: true });
  }

  if ('serviceWorker' in navigator && location.protocol !== 'file:') {
    window.addEventListener('load', function () { navigator.serviceWorker.register('./sw.js').catch(function () {}); });
  }

  render();
})();
