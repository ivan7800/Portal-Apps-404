/* I. Roig · Portal Apps 404 — Universo 404 OS v41.8 Cache Bust */
(function () {
  'use strict';

  var D = window.PORTAL_DATA;
  var Catalog = window.PORTAL_CATALOG;
  var root = document.getElementById('app');
  if (!D || !Catalog || !Array.isArray(D.APPS) || !D.APPS.length || !root) {
    if (root) root.innerHTML = '<p class="fatal">No se pudo cargar el catálogo.</p>';
    return;
  }

  var APPS = D.APPS;
  var screenshotUses = {};
  APPS.forEach(function (app) { screenshotUses[app.screenshot] = (screenshotUses[app.screenshot] || 0) + 1; });
  var GENERIC_COVER_APPS = {
    INSANITY: 1, 'musica-404': 1, json404: 1, SafeSignal: 1,
    'Windows-Master-Suite': 1, Cauers4ever: 1, 'diario-moleskine': 1,
    'Biblioteca-Oculta': 1, 'PocketTone-Archive': 1, 'Storyboard-Studio': 1,
    'portal-descargas-corporativas': 1, 'sin-bruma': 1, 'Atlas-Pattern-AI': 1,
    'Claude-Skills-Pack': 1, 'zerokey-ai': 1, 'doppelganger-chat': 1, 'i.roig': 1,
    'El-Evangelio-del-Nombre-Devorado': 1, 'NECRONOMICON-404': 1,
    'Strategy-Lab-Campaign': 1, 'Vigilia-Abisal': 1, 'VOX-MORPHER-404': 1,
    'Guardian-Senior-AI': 1, 'AppHub-404': 1, 'MYTHOS-404': 1,
    'PixelForge-404': 1, 'MD-Forge-404': 1, 'FileDoctor-404': 1, 'HumanScript-404': 1,
    'IT-Commander-404': 1, 'SECOND-BRAIN-404': 1, 'Ringtone-404': 1,
    'ReleaseForge-404': 1, 'Compra-404': 1
  };
  var readyTimer = null;
  var VERSION = 'v41.8 Cache Bust';
  var UPDATED = '10 de septiembre de 2026';
  var LANGUAGES = D.LANGUAGES || {};
  var SKINS = ['cosmica', 'obsidiana', 'void', 'glass', 'terminal', 'arctic', 'synthwave'];
  var SKIN_NAMES = { cosmica: 'Cósmica', obsidiana: 'Obsidiana', void: 'Void OLED', glass: 'Glass', terminal: 'Terminal', arctic: 'Arctic', synthwave: 'Synthwave' };
  var SKIN_HINTS = { cosmica: 'Naranja y azul · identidad 404', obsidiana: 'Grafito elegante · baja saturación', void: 'Negro absoluto · OLED', glass: 'Cristal oscuro · profundidad', terminal: 'Workstation · fósforo verde', arctic: 'Claro editorial · máxima limpieza', synthwave: 'Neón violeta · experimental' };
  var THEME_COLORS = { cosmica: '#070a12', obsidiana: '#08090c', void: '#000000', glass: '#081018', terminal: '#050907', arctic: '#eef3f7', synthwave: '#0d0717' };
  var VIEW_NAMES = { grid: 'Cuadrícula', list: 'Lista' };
  var SORT_NAMES = { recommended: 'Recomendadas', recent: 'Más recientes', name: 'Nombre A–Z', category: 'Categoría', favorites: 'Favoritas primero' };
  var URL_KEYS = ['buscar', 'mundo', 'intencion', 'tecnologia', 'orden', 'vista', 'app'];

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
  function loadStringArray(key, limit) {
    var value = loadJSON(key, []);
    if (!Array.isArray(value)) return [];
    return value.filter(function (item, index, items) {
      return typeof item === 'string' && items.indexOf(item) === index;
    }).slice(0, limit);
  }

  var state = {
    skin: loadText('u404-skin', 'cosmica'),
    query: '',
    activeSaga: null,
    activeIntent: null,
    techFilter: '',
    selectedApp: null,
    view: loadText('u404-view', 'grid'),
    sort: loadText('u404-sort', 'recommended'),
    favorites: loadStringArray('u404-favorites', 30),
    recent: loadStringArray('u404-recent', 8),
    explored: loadStringArray('u404-explored', APPS.length),
    palette: false,
    paletteQuery: '',
    skinPanel: false,
    presentation: false,
    presentationIndex: 0,
    motion: loadText('u404-motion', 'balanced'),
    spotlight: APPS[Math.floor(Math.random() * APPS.length)]
  };
  if (SKINS.indexOf(state.skin) === -1) state.skin = 'cosmica';
  if (!VIEW_NAMES[state.view]) state.view = 'grid';
  if (!SORT_NAMES[state.sort]) state.sort = 'recommended';
  if (state.motion === 'auto') state.motion = 'balanced';
  if (['reduced', 'balanced', 'cinematic'].indexOf(state.motion) === -1) state.motion = 'balanced';

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
  function appMeta(a) {
    var status = { catalogued: 'Catalogada', experimental: 'Experimental', archived: 'Archivada' }[a.status] || 'Catalogada';
    var platform = { web: 'Web', webassembly: 'WebAssembly', 'hybrid-windows': 'Windows + web' }[a.platform] || 'Web';
    var offline = { declared: 'Offline declarado', 'not-declared': 'Conexión variable' }[a.offline] || 'Conexión variable';
    var availability = { verified: 'Enlace verificado', unverified: 'Enlace sin verificar', unavailable: 'No disponible' }[a.availability] || 'Enlace sin verificar';
    var index = APPS.indexOf(a);
    return {
      status: status,
      statusClass: a.status === 'experimental' ? 'experimental' : (a.status === 'archived' ? 'archived' : 'published'),
      platform: platform,
      offline: offline,
      availability: availability,
      recent: index >= APPS.length - 12,
      order: index
    };
  }

  function applyURLState(fromNavigation) {
    var params;
    try { params = new URL(window.location.href).searchParams; } catch (e) { return; }
    state.query = params.get('buscar') || '';
    state.activeSaga = sagaNames.indexOf(params.get('mundo')) !== -1 ? params.get('mundo') : null;
    state.activeIntent = INTENTS.some(function (x) { return x.id === params.get('intencion'); }) ? params.get('intencion') : null;
    state.techFilter = techs.indexOf(params.get('tecnologia')) !== -1 ? params.get('tecnologia') : '';
    state.sort = SORT_NAMES[params.get('orden')] ? params.get('orden') : (fromNavigation ? 'recommended' : state.sort);
    state.view = VIEW_NAMES[params.get('vista')] ? params.get('vista') : (fromNavigation ? 'grid' : state.view);
    state.selectedApp = byName(params.get('app'));
  }

  function syncURL(push) {
    if (!window.history || !window.URL) return;
    var url = new URL(window.location.href);
    URL_KEYS.forEach(function (key) { url.searchParams.delete(key); });
    if (state.query) url.searchParams.set('buscar', state.query);
    if (state.activeSaga) url.searchParams.set('mundo', state.activeSaga);
    if (state.activeIntent) url.searchParams.set('intencion', state.activeIntent);
    if (state.techFilter) url.searchParams.set('tecnologia', state.techFilter);
    if (state.sort !== 'recommended') url.searchParams.set('orden', state.sort);
    if (state.view !== 'grid') url.searchParams.set('vista', state.view);
    if (state.selectedApp) url.searchParams.set('app', state.selectedApp.name);
    try { window.history[push ? 'pushState' : 'replaceState']({}, '', url.pathname + (url.search ? url.search : '') + url.hash); } catch (e) {}
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
    'SECOND-BRAIN-404': 'notas obsidian rag documentos conocimiento segundo cerebro'
  };
  function normalizeText(value) { return Catalog.normalizeText(value); }
  function appText(a) { return Catalog.appText(a, LANGUAGES, SEARCH_ALIASES); }
  function searchScore(a, q) {
    return Catalog.searchScore(a, q, LANGUAGES, SEARCH_ALIASES);
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
  function sharedScreenshot(a) { return !!(a && (screenshotUses[a.screenshot] > 1 || GENERIC_COVER_APPS[a.name])); }
  function coverHTML(a, altText, eager) {
    var index = Math.max(0, APPS.indexOf(a));
    if (sharedScreenshot(a)) {
      var hue = (index * 47 + 18) % 360;
      return '<span class="app-shot generated-cover" style="--cover-hue:' + hue + '" role="img" aria-label="Portada de ' + esc(a.name) + '"><span class="cover-rings" aria-hidden="true"></span><span class="cover-core" aria-hidden="true">' + esc(a.icon) + '</span><span class="cover-title">' + esc(a.name) + '</span><span class="cover-category">' + esc(a.category) + '</span></span>';
    }
    return '<span class="app-shot"><img src="' + esc(a.screenshot) + '" alt="' + esc(altText || ('Vista previa de ' + a.name)) + '" loading="' + (eager ? 'eager' : 'lazy') + '" decoding="async" width="1280" height="720"></span>';
  }
  function isFavorite(name) { return state.favorites.indexOf(name) !== -1; }

  function catalog() {
    var out = APPS.slice();
    var intent = currentIntent();
    if (intent) out = out.filter(function (a) { return intent.test.test(appText(a)); });
    if (state.activeSaga) out = out.filter(function (a) { return a.saga === state.activeSaga; });
    if (state.techFilter) out = out.filter(function (a) { return (LANGUAGES[a.name] || 'JavaScript') === state.techFilter; });
    var q = state.query.trim();
    if (q) out = out.filter(function (a) { return searchScore(a, q) > 0; });
    if (state.sort === 'name') out.sort(function (a, b) { return a.name.localeCompare(b.name, 'es'); });
    else if (state.sort === 'category') out.sort(function (a, b) { return a.category.localeCompare(b.category, 'es') || a.name.localeCompare(b.name, 'es'); });
    else if (state.sort === 'recent') out.sort(function (a, b) { return appMeta(b).order - appMeta(a).order; });
    else if (state.sort === 'favorites') out.sort(function (a, b) { return Number(isFavorite(b.name)) - Number(isFavorite(a.name)) || a.name.localeCompare(b.name, 'es'); });
    else if (q) out.sort(function (a, b) { return searchScore(b, q) - searchScore(a, q); });
    else out.sort(function (a, b) { return Number(!!b.featured) - Number(!!a.featured) || appMeta(b).order - appMeta(a).order; });
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

  function activeFilterItems() {
    var items = [];
    var intent = currentIntent();
    if (state.query) items.push({ key: 'query', label: 'Búsqueda: “' + state.query + '”' });
    if (state.activeSaga) items.push({ key: 'saga', label: 'Mundo: ' + state.activeSaga });
    if (intent) items.push({ key: 'intent', label: 'Intención: ' + intent.name });
    if (state.techFilter) items.push({ key: 'tech', label: 'Tecnología: ' + state.techFilter });
    if (state.sort !== 'recommended') items.push({ key: 'sort', label: 'Orden: ' + SORT_NAMES[state.sort] });
    return items;
  }

  function activeFiltersHTML() {
    var items = activeFilterItems();
    if (!items.length) return '';
    return '<div class="active-filters" aria-label="Filtros activos"><span>Filtros activos</span>' + items.map(function (item) {
      return '<button type="button" data-clear-filter="' + item.key + '" aria-label="Eliminar ' + esc(item.label) + '">' + esc(item.label) + ' <b aria-hidden="true">×</b></button>';
    }).join('') + '</div>';
  }

  function catalogContentHTML(list) {
    return activeFiltersHTML() +
      '<div class="catalog-status"><span role="status" aria-live="polite">Mostrando <b>' + list.length + '</b> de ' + APPS.length + '</span><span>' + esc(VIEW_NAMES[state.view]) + '</span></div>' +
      (list.length ? (state.view === 'grid' ? '<div class="catalog-grid">' + list.map(compactCard).join('') + '</div>' : '<div class="catalog-list">' + list.map(listCard).join('') + '</div>') : '<div class="empty"><span>◌</span><h3>Sin coincidencias</h3><p>Prueba otra búsqueda o elimina los filtros activos.</p><button class="ghost compact" id="reset-empty">Restablecer filtros</button></div>');
  }

  function setIntent(id) {
    state.activeIntent = state.activeIntent === id ? null : id;
    state.activeSaga = null;
    state.query = '';
    syncURL(true);
    render();
    pulseCore('navigate');
    scrollToId('catalogo');
  }
  function setSaga(name) {
    var changeWorld = function () {
      state.activeSaga = state.activeSaga === name ? null : name;
      state.activeIntent = null;
      syncURL(true);
      render();
    };
    if (document.startViewTransition && !reduceMotion()) document.startViewTransition(changeWorld); else changeWorld();
    pulseCore('world');
    scrollToId('catalogo');
  }
  function scrollToId(id) {
    var el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: reduceMotion() ? 'auto' : 'smooth', block: 'start' });
  }
  function reduceMotion() { return state.motion === 'reduced' || !!(window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches); }

  function addRecent(name) {
    state.recent = [name].concat(state.recent.filter(function (n) { return n !== name; })).slice(0, 8);
    saveJSON('u404-recent', state.recent);
  }
  function addExplored(name) {
    if (state.explored.indexOf(name) !== -1) return;
    state.explored = state.explored.concat(name).slice(-APPS.length);
    saveJSON('u404-explored', state.explored);
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
    appClosing = false;
    var replacingModal = !!state.selectedApp;
    if (!replacingModal) lastFocusName = name;
    addRecent(name);
    addExplored(name);
    state.selectedApp = app;
    state.palette = false;
    state.presentation = false;
    modalHistoryPushed = modalHistoryPushed || !replacingModal;
    syncURL(!replacingModal);
    render();
    pulseCore('open');
    document.body.classList.add('modal-open');
    var c = document.getElementById('close-modal');
    if (c) c.focus();
  }

  function closeApp() {
    if (!state.selectedApp || appClosing) return;
    appClosing = true;
    var shouldReturnInHistory = modalHistoryPushed;
    modalHistoryPushed = false;
    state.selectedApp = null;
    document.body.classList.remove('modal-open');
    syncURL(false);
    render();
    restoreAppFocus();
    appClosing = false;
    if (shouldReturnInHistory) window.setTimeout(function () { window.history.back(); }, 0);
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
    animateClose('palette-overlay', function () {
      state.palette = false;
      state.paletteQuery = '';
      document.body.classList.remove('modal-open');
      render();
      var trigger = document.getElementById('open-palette');
      if (trigger) trigger.focus();
    });
  }

  function cssEsc(value) {
    if (window.CSS && CSS.escape) return CSS.escape(value);
    return String(value).replace(/["\\]/g, '\\$&');
  }

  var lastFocusName = null;
  var modalHistoryPushed = false;
  var appClosing = false;
  function restoreAppFocus() {
    if (!lastFocusName) return;
    var again = document.querySelector('[data-app="' + cssEsc(lastFocusName) + '"]');
    if (again) again.focus();
  }
  function animateClose(id, done) {
    var el = document.getElementById(id);
    if (!el || reduceMotion()) { done(); return; }
    if (el.classList.contains('is-closing')) return;
    el.classList.add('is-closing');
    setTimeout(done, 190);
  }
  var alt = function (i) { return i % 2 === 0 ? 'var(--accent)' : 'var(--accent2)'; };

  function compactCard(a, i) {
    var meta = appMeta(a);
    return '<article class="app-card" style="--c:' + alt(i) + '">' +
      '<button class="app-open" data-app="' + esc(a.name) + '" aria-label="Ver ficha de ' + esc(a.name) + '">' +
        coverHTML(a, 'Vista previa de ' + a.name, false) +
        (meta.recent ? '<span class="release-badge">NUEVA</span>' : '') +
        '<span class="app-copy"><span class="app-meta"><span>' + esc(a.category) + '</span><span class="status-label ' + meta.statusClass + '">● ' + esc(meta.status) + '</span></span>' +
        '<strong>' + esc(a.name) + '</strong><span class="app-desc">' + esc(a.short) + '</span><span class="card-signature"><span>' + esc(meta.platform) + '</span><span>' + esc(LANGUAGES[a.name] || 'JavaScript') + '</span><b>↗</b></span></span>' +
      '</button>' +
      '<button class="fav" data-fav="' + esc(a.name) + '" aria-label="' + (isFavorite(a.name) ? 'Quitar ' : 'Añadir ') + esc(a.name) + (isFavorite(a.name) ? ' de favoritos' : ' a favoritos') + '" aria-pressed="' + isFavorite(a.name) + '">' + (isFavorite(a.name) ? '★' : '☆') + '</button>' +
    '</article>';
  }

  function listCard(a, i) {
    var meta = appMeta(a);
    return '<article class="app-row" style="--c:' + alt(i) + '">' +
      '<button class="row-open" data-app="' + esc(a.name) + '">' +
        '<span class="row-icon">' + esc(a.icon) + '</span>' +
        '<span class="row-main"><strong>' + esc(a.name) + '</strong><small>' + esc(a.short) + '</small></span>' +
        '<span class="row-cat">' + esc(a.category) + '</span><span class="row-tech"><span class="status-label ' + meta.statusClass + '">● ' + esc(meta.status) + '</span></span><span class="row-go">→</span>' +
      '</button>' +
      '<button class="fav row-fav" data-fav="' + esc(a.name) + '" aria-label="' + (isFavorite(a.name) ? 'Quitar ' : 'Añadir ') + esc(a.name) + (isFavorite(a.name) ? ' de favoritos' : ' a favoritos') + '" aria-pressed="' + isFavorite(a.name) + '">' + (isFavorite(a.name) ? '★' : '☆') + '</button>' +
    '</article>';
  }

  function smallTile(a, i) {
    return '<button class="small-tile" data-app="' + esc(a.name) + '" style="--c:' + alt(i) + '">' +
      '<span class="tile-icon">' + esc(a.icon) + '</span><span><strong>' + esc(a.name) + '</strong><small>' + esc(a.category) + '</small></span><span class="tile-go">↗</span>' +
    '</button>';
  }

  function orbitHTML() {
    return '<div class="universe" aria-label="Mapa de las ' + sagaNames.length + ' áreas del ecosistema">' +
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
    document.title = state.selectedApp ? state.selectedApp.name + ' · Universo 404' : 'Universo 404 OS · ' + APPS.length + ' aplicaciones · I. Roig';
    var themeMeta = document.querySelector('meta[name="theme-color"]');
    if (themeMeta) themeMeta.setAttribute('content', THEME_COLORS[state.skin] || '#070a12');
    document.body.classList.toggle('modal-open', !!(state.selectedApp || state.palette || state.skinPanel || state.presentation));
    var list = catalog();
    var featured = APPS.filter(function (a) { return a.featured; }).slice(0, 8);
    var favoriteApps = state.favorites.map(byName).filter(Boolean);
    var recentApps = state.recent.map(byName).filter(Boolean).slice(0, 6);
    var latestApps = APPS.slice(-6).reverse();
    var sp = state.spotlight;
    var filterCount = activeFilterItems().length;

    root.innerHTML =
      '<div class="os-shell">' +
        sidebarHTML() +
        '<div class="os-main">' +
          topbarHTML() +
          '<main class="workspace" id="main-content" tabindex="-1">' +
            '<section class="hero-os" id="top">' +
              '<div class="hero-copy">' +
                '<p class="eyebrow"><span class="status-dot"></span> UNIVERSO 404 · <span id="hero-network-label">' + (navigator.onLine ? 'CONEXIÓN DETECTADA' : 'SIN CONEXIÓN DETECTADA') + '</span></p>' +
                '<h1>Tu ecosistema digital.<br><em>' + APPS.length + ' apps, un solo universo.</em></h1>' +
                '<p class="lede">Herramientas, escritura, diseño, IA, sistemas, cultura y ficción interactiva reunidos en un portal estático con preferencias locales.</p>' +
                '<div class="hero-actions"><button class="primary" id="open-palette">⌕ Buscar en Universo 404 <kbd>Ctrl K</kbd></button><button class="ghost" id="random-app">✦ Sorpréndeme</button><button class="ghost" id="open-presentation">▶ Presentación</button><button class="ghost install-pwa' + (deferredInstallPrompt ? ' is-ready' : '') + '" id="install-pwa">⇩ Instalar portal</button></div>' +
                '<div class="system-pills"><span><b>' + APPS.length + '</b> apps</span><span><b>' + sagaNames.length + '</b> mundos</span><span><b>' + totalCats + '</b> categorías</span><span><b>' + state.explored.length + '</b> exploradas</span></div>' +
                '<div class="hero-signal"><span class="signal-beacon" aria-hidden="true"></span><span class="signal-copy"><small>SEÑAL DESTACADA · AHORA</small><strong>' + esc(sp.name) + '</strong></span><button class="signal-open" data-app="' + esc(sp.name) + '">Abrir ficha <span aria-hidden="true">↗</span></button></div>' +
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
              '<div class="spot-card"><div class="spot-visual">' + coverHTML(sp, 'Vista previa de ' + sp.name, true).replace('class="app-shot"', 'class="app-shot spot-shot"') + '<span class="spot-badge">SELECCIÓN DEL SISTEMA</span></div>' +
              '<div class="spot-copy"><p class="kicker">App destacada</p><h2>' + esc(sp.name) + '</h2><p>' + esc(sp.description || sp.short) + '</p><div class="tagline"><span>' + esc(sp.category) + '</span><span>' + esc(LANGUAGES[sp.name] || 'JavaScript') + '</span><span>' + esc(sp.saga) + '</span></div><div class="spot-actions"><button class="primary compact" data-app="' + esc(sp.name) + '">Ver ficha</button><a class="ghost compact" href="' + esc(sp.pages) + '" target="_blank" rel="noopener noreferrer" aria-label="' + (sp.delivery === 'repository' ? 'Abrir repositorio' : 'Abrir aplicación') + '; se abre en otra pestaña">' + (sp.delivery === 'repository' ? 'Abrir repositorio ↗' : 'Abrir app ↗') + '</a></div></div></div>' +
            '</section>' +

            (favoriteApps.length ? '<section class="section" id="favoritos"><div class="section-head"><div><p class="kicker">Tu espacio</p><h2>Favoritos</h2></div><p>Guardados solo en este navegador.</p></div><div class="small-grid">' + favoriteApps.slice(0, 8).map(smallTile).join('') + '</div></section>' : '') +
            (recentApps.length ? '<section class="section" id="recientes"><div class="section-head"><div><p class="kicker">Actividad local</p><h2>Abiertas recientemente</h2></div><button class="text-btn" id="clear-recent">Limpiar</button></div><div class="small-grid">' + recentApps.map(smallTile).join('') + '</div></section>' : '') +

            '<section class="section news-section" id="novedades"><div class="section-head"><div><p class="kicker">Discovery Center · actualizado ' + UPDATED + '</p><h2>Últimas incorporaciones</h2></div><p>Las seis aplicaciones añadidas más recientemente al catálogo.</p></div><div class="featured-grid">' + latestApps.map(compactCard).join('') + '</div></section>' +

            '<section class="section" id="top-apps"><div class="section-head"><div><p class="kicker">Selección 404</p><h2>Imprescindibles</h2></div><p>Una muestra representativa del ecosistema.</p></div><div class="featured-grid">' + featured.map(compactCard).join('') + '</div></section>' +

            '<section class="section control-panel" id="panel">' +
              '<div class="section-head"><div><p class="kicker">Control Center</p><h2>Estado del ecosistema</h2></div><p>Datos calculados en tiempo real desde el catálogo.</p></div>' +
              '<div class="stats-grid"><div class="stat"><strong data-count="' + APPS.length + '">' + APPS.length + '</strong><span>apps catalogadas</span></div><div class="stat"><strong data-count="' + sagaNames.length + '">' + sagaNames.length + '</strong><span>mundos</span></div><div class="stat"><strong data-count="' + totalCats + '">' + totalCats + '</strong><span>categorías</span></div><div class="stat"><strong data-count="' + techs.length + '">' + techs.length + '</strong><span>tecnologías</span></div></div>' +
              '<div class="exploration-card"><div><p class="kicker">Mapa de descubrimiento</p><h3>' + state.explored.length + ' de ' + APPS.length + ' aplicaciones exploradas</h3><p>Este progreso se guarda únicamente en este navegador.</p></div><div class="exploration-meter" role="progressbar" aria-label="Progreso de exploración" aria-valuemin="0" aria-valuemax="100" aria-valuenow="' + Math.round((state.explored.length / APPS.length) * 100) + '"><b style="width:' + Math.max(2, Math.round((state.explored.length / APPS.length) * 100)) + '%"></b></div><span class="exploration-percent">' + Math.round((state.explored.length / APPS.length) * 100) + '%</span></div>' +
              '<div class="distribution"><h3>Distribución por mundo</h3>' + sagas.map(function (s) { return '<button class="dist-row" data-saga="' + esc(s.name) + '"><span>' + esc(s.icon) + ' ' + esc(s.name) + '</span><i><b style="width:' + Math.round((s.count / maxSaga) * 100) + '%"></b></i><strong>' + s.count + '</strong></button>'; }).join('') + '</div>' +
            '</section>' +

            '<section class="section about-section" id="universo"><div class="about-grid"><div><p class="kicker">El proyecto</p><h2>Universo 404</h2><p>Un sistema operativo personal para reunir herramientas, mundos narrativos y experimentos en un único espacio local-first.</p><p class="about-note">Sin cuentas. Sin tracking. Tus favoritos, historial y progreso viven en tu dispositivo.</p></div><div class="about-orbit" aria-hidden="true"><span>404</span><i></i><i></i></div><div class="about-facts"><span><b>' + APPS.length + '</b> aplicaciones</span><span><b>' + sagaNames.length + '</b> mundos conectados</span><span><b>0</b> servidores propios</span></div></div></section>' +

            '<section class="section constellation-section" id="mapa"><div class="section-head"><div><p class="kicker">Cartografía interactiva</p><h2>Mapa del Universo</h2></div><p>Selecciona un mundo para descubrir sus aplicaciones y conexiones.</p></div><div class="constellation-map"><div class="constellation-core"><span>U404</span><small>' + APPS.length + ' sistemas</small></div>' + sagas.map(function (s, i) { return '<button class="constellation-node cn' + i + '" data-saga="' + esc(s.name) + '" aria-pressed="' + (state.activeSaga === s.name) + '"><span>' + esc(s.icon) + '</span><strong>' + esc(s.name) + '</strong><small>' + s.count + ' apps</small></button>'; }).join('') + '<svg class="constellation-lines" viewBox="0 0 1000 420" preserveAspectRatio="none" aria-hidden="true"><path d="M500 210 L150 82 M500 210 L390 58 M500 210 L680 68 M500 210 L850 130 M500 210 L790 340 M500 210 L430 365 M500 210 L160 320"/></svg></div></section>' +

            '<section class="section catalog-section" id="catalogo">' +
              '<div class="section-head catalog-head"><div><p class="kicker">Explorador</p><h2>Las ' + APPS.length + ' aplicaciones</h2></div><div class="view-switch" role="group" aria-label="Vista del catálogo"><button data-view="grid" aria-label="Vista en cuadrícula" aria-pressed="' + (state.view === 'grid') + '" title="Cuadrícula">▦</button><button data-view="list" aria-label="Vista en lista" aria-pressed="' + (state.view === 'list') + '" title="Lista">☷</button></div></div>' +
              '<div class="catalog-toolbar">' +
                '<label class="catalog-search"><span aria-hidden="true">⌕</span><input id="q" type="search" autocomplete="off" spellcheck="false" aria-label="Buscar aplicaciones" placeholder="Buscar por nombre, función, categoría…" value="' + esc(state.query) + '"></label>' +
                '<select id="tech" aria-label="Filtrar por tecnología"><option value="">Toda tecnología</option>' + techs.map(function (t) { return '<option value="' + esc(t) + '"' + (state.techFilter === t ? ' selected' : '') + '>' + esc(t) + '</option>'; }).join('') + '</select>' +
                '<select id="sort" aria-label="Ordenar aplicaciones">' + Object.keys(SORT_NAMES).map(function (key) { return '<option value="' + key + '"' + (state.sort === key ? ' selected' : '') + '>' + esc(SORT_NAMES[key]) + '</option>'; }).join('') + '</select>' +
                '<button class="filter-chip' + (filterCount ? ' is-on' : '') + '" id="clear-filter" aria-label="' + (filterCount ? 'Eliminar todos los filtros' : 'No hay filtros activos') + '"' + (filterCount ? '' : ' disabled') + '>' + (filterCount ? 'Limpiar (' + filterCount + ')' : 'Sin filtros') + '</button>' +
              '</div>' +
              '<div id="catalog-content">' + catalogContentHTML(list) + '</div>' +
            '</section>' +

            '<footer class="footer"><div><img src="assets/logo.webp" alt="" width="36" height="36"><span><strong>Universo 404 OS</strong><small>I. Roig · ' + VERSION + '</small></span></div><p>' + APPS.length + ' apps · preferencias locales · sin tracking · GitHub Pages</p><a href="#top">Volver al núcleo ↑</a></footer>' +
          '</main>' +
          mobileNavHTML() +
        '</div>' +
      '</div>' +
      (state.selectedApp ? modalHTML(state.selectedApp) : '') +
      (state.palette ? paletteHTML() : '') +
      (state.skinPanel ? skinPanelHTML() : '') +
      (state.presentation ? presentationHTML() : '') +
      '<div class="system-toast" id="system-toast" role="status" aria-live="polite"></div>' +
      '<div class="update-toast" id="update-toast" role="status"' + (waitingWorker ? '' : ' hidden') + '><span><strong>Actualización disponible</strong><small>Hay una nueva versión del portal preparada.</small></span><button id="apply-update">Actualizar ahora</button></div>';

    wire();
    initMotion();
    renderAppQR();
    if (!readyTimer && !root.classList.contains('u404-ready')) {
      readyTimer = setTimeout(function () { root.classList.add('u404-ready'); }, 850);
    }
  }

  function sidebarHTML() {
    return '<aside class="sidebar" aria-label="Navegación principal">' +
      '<a class="side-brand" href="#top"><img src="assets/logo.webp" alt="" width="48" height="48"><span><strong>U404</strong><small>PORTAL OS</small></span></a>' +
      '<nav class="side-nav"><p>Explorar</p><a href="#top" class="active"><span>◉</span>Inicio</a><a href="#intenciones"><span>✦</span>Qué quieres hacer</a><a href="#novedades"><span>＋</span>Novedades</a><a href="#top-apps"><span>◇</span>Destacadas</a><a href="#universo"><span>◌</span>Universo 404</a><a href="#mapa"><span>⌘</span>Mapa</a><a href="#catalogo"><span>▦</span>Catálogo <b>' + APPS.length + '</b></a><a href="#panel"><span>⌁</span>Control Center</a></nav>' +
      '<div class="side-worlds"><p>Mundos</p>' + sagas.map(function (s) { return '<button data-saga="' + esc(s.name) + '" class="' + (state.activeSaga === s.name ? 'active' : '') + '"><span>' + esc(s.icon) + '</span><em>' + esc(s.name) + '</em><b>' + s.count + '</b></button>'; }).join('') + '</div>' +
      '<div class="side-bottom"><button id="skin" class="skin-button"><span>◐</span><span><small>Apariencia</small><strong>' + esc(SKIN_NAMES[state.skin]) + '</strong></span></button><a href="https://github.com/ivan7800" target="_blank" rel="noopener noreferrer" aria-label="GitHub de I. Roig; se abre en otra pestaña"><span>⌘</span>GitHub ↗</a></div>' +
    '</aside>';
  }

  function topbarHTML() {
    return '<header class="topbar"><div class="crumb"><span class="pulse ' + (navigator.onLine ? '' : 'is-offline') + '"></span><strong>UNIVERSO 404</strong><span>/</span><span id="network-label">' + (navigator.onLine ? 'Conexión detectada' : 'Sin conexión detectada') + '</span></div><div class="top-actions"><button class="top-search" id="open-palette-top">⌕ <span>Buscar apps</span><kbd>Ctrl K</kbd></button><button class="icon-btn install-pwa' + (deferredInstallPrompt ? ' is-ready' : '') + '" id="install-pwa-top" aria-label="Instalar portal" title="Instalar portal">⇩</button><button class="icon-btn" id="skin-top" aria-label="Abrir apariencia" title="Apariencia">◐</button><a class="avatar" href="https://github.com/ivan7800" target="_blank" rel="noopener noreferrer" aria-label="GitHub de I. Roig; se abre en otra pestaña">IR</a></div></header>';
  }

  function mobileNavHTML() {
    return '<nav class="mobile-nav" aria-label="Navegación móvil"><a href="#top"><span>◉</span><small>Inicio</small></a><a href="#intenciones"><span>✦</span><small>Crear</small></a><button id="mobile-search"><span>⌕</span><small>Buscar</small></button><a href="#catalogo"><span>▦</span><small>Apps</small></a><a href="#panel"><span>⌁</span><small>Panel</small></a></nav>';
  }

  function presentationApps() {
    var selected = APPS.filter(function (a) { return a.featured; });
    return selected.length ? selected : APPS.slice(0, 12);
  }

  function presentationHTML() {
    var items = presentationApps();
    var index = ((state.presentationIndex % items.length) + items.length) % items.length;
    var a = items[index];
    var meta = appMeta(a);
    return '<div class="presentation-overlay" id="presentation-overlay"><div class="presentation-stage" id="presentation-stage" role="dialog" aria-modal="true" aria-labelledby="presentation-title" tabindex="-1">' +
      '<button class="presentation-close" id="close-presentation" aria-label="Cerrar presentación">×</button>' +
      '<div class="presentation-visual">' + coverHTML(a, 'Vista previa de ' + a.name, true).replace('class="app-shot"', 'class="app-shot presentation-shot"') + '<span class="presentation-counter">' + (index + 1) + ' / ' + items.length + '</span></div>' +
      '<div class="presentation-copy"><p class="kicker">' + esc(a.saga) + ' · ' + esc(meta.platform) + '</p><h2 id="presentation-title">' + esc(a.name) + '</h2><p>' + esc(a.description || a.short) + '</p><div class="modal-tags"><span class="status-label ' + meta.statusClass + '">● ' + esc(meta.status) + '</span><span>' + esc(LANGUAGES[a.name] || 'JavaScript') + '</span><span>' + esc(a.category) + '</span></div><div class="presentation-actions"><button class="ghost" id="presentation-prev">← Anterior</button><button class="primary" data-app="' + esc(a.name) + '">Ver ficha</button><button class="ghost" id="presentation-next">Siguiente →</button></div><p class="presentation-help">Usa ← → para navegar y Escape para salir.</p></div>' +
    '</div></div>';
  }

  function modalHTML(a) {
    var related = relatedApps(a);
    var meta = appMeta(a);
    var primaryLabel = a.delivery === 'repository' ? 'Abrir repositorio ↗' : 'Abrir aplicación ↗';
    return '<div class="overlay" id="modal-overlay"><div class="app-modal" id="app-modal" role="dialog" aria-modal="true" aria-labelledby="modal-title" aria-describedby="modal-description" tabindex="-1">' +
      '<button class="modal-close" id="close-modal" aria-label="Cerrar ficha">×</button>' +
      '<div class="modal-shot">' + coverHTML(a, 'Vista previa de ' + a.name, true).replace('class="app-shot"', 'class="app-shot modal-shot-visual"') + '<span class="modal-saga">' + esc(a.saga) + '</span></div>' +
      '<div class="modal-content"><div class="modal-heading"><div><p class="kicker">' + esc(a.category) + '</p><h2 id="modal-title">' + esc(a.name) + '</h2></div><button class="modal-fav" id="modal-fav" data-fav="' + esc(a.name) + '" aria-pressed="' + isFavorite(a.name) + '">' + (isFavorite(a.name) ? '★ Favorita' : '☆ Favorita') + '</button></div>' +
      '<p class="modal-description" id="modal-description">' + esc(a.description || a.short) + '</p><div class="modal-tags"><span class="status-label ' + meta.statusClass + '">● ' + esc(meta.status) + '</span><span>' + esc(meta.availability) + '</span><span>' + esc(meta.platform) + '</span><span>' + esc(meta.offline) + '</span><span>' + esc(LANGUAGES[a.name] || 'JavaScript') + '</span></div>' +
      '<div class="modal-actions"><a class="primary" href="' + esc(a.pages) + '" target="_blank" rel="noopener noreferrer" aria-label="' + esc(primaryLabel.replace(' ↗', '')) + '; se abre en otra pestaña">' + esc(primaryLabel) + '</a>' + (a.delivery === 'repository' ? '' : '<a class="ghost" href="' + esc(a.github) + '" target="_blank" rel="noopener noreferrer" aria-label="Ver repositorio; se abre en otra pestaña">Ver repositorio</a>') + '<button class="ghost" id="share-app">Compartir ficha</button></div>' +
      '<div class="modal-qr"><canvas id="app-qr" width="180" height="180" role="img" aria-label="Código QR para abrir ' + esc(a.name) + '"></canvas><div><p class="kicker">Salto entre dispositivos</p><h3>Abrir desde el móvil</h3><p>Escanea este código. Se genera localmente y no envía la dirección a ningún servidor.</p><button class="ghost compact" id="download-qr">Descargar QR</button></div></div>' +
      (related.length ? '<div class="modal-related"><p class="kicker">Conexiones 404</p><h3>También te puede servir</h3><div class="related-grid">' + related.map(function (r) { return '<button data-app="' + esc(r.name) + '"><span>' + esc(r.icon) + '</span><span><strong>' + esc(r.name) + '</strong><small>' + esc(r.category) + '</small></span><b>→</b></button>'; }).join('') + '</div></div>' : '') +
      '</div></div></div>';
  }

  function paletteResultsHTML(results) {
    if (!results.length) return '<div class="palette-results" id="palette-results" role="listbox" aria-label="Aplicaciones encontradas"><p class="palette-empty">No hay coincidencias. Prueba con “imagen”, “novela”, “Windows” o “terror”.</p></div>';
    return '<div class="palette-results" id="palette-results" role="listbox" aria-label="Aplicaciones encontradas">' + results.map(function (a, i) {
      return '<button type="button" role="option" id="palette-result-' + i + '" data-palette-app="' + esc(a.name) + '" aria-selected="' + (i === 0) + '" tabindex="-1"' + (i === 0 ? ' class="selected"' : '') + '><span class="p-icon">' + esc(a.icon) + '</span><span><strong>' + esc(a.name) + '</strong><small>' + esc(a.short) + '</small></span><em>' + esc(a.category) + '</em><b>↵</b></button>';
    }).join('') + '</div>';
  }

  function paletteHTML() {
    var results = paletteResults();
    return '<div class="overlay palette-overlay" id="palette-overlay"><div class="palette" id="palette" role="dialog" aria-modal="true" aria-labelledby="palette-title">' +
      '<div class="palette-input"><span aria-hidden="true">⌕</span><input id="palette-q" type="search" role="combobox" autocomplete="off" placeholder="Busca una app o escribe lo que quieres hacer…" value="' + esc(state.paletteQuery) + '" aria-label="Buscar en Universo 404" aria-autocomplete="list" aria-expanded="true" aria-controls="palette-results"' + (results.length ? ' aria-activedescendant="palette-result-0"' : '') + '><kbd>ESC</kbd></div>' +
      '<div class="palette-body"><p id="palette-title">' + (state.paletteQuery ? 'Resultados' : (state.recent.length ? 'Recientes y destacadas' : 'Apps destacadas')) + '</p>' +
      paletteResultsHTML(results) +
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
      '<div class="motion-setting"><span><strong>Intensidad del movimiento</strong><small>Equilibrado es el modo recomendado. La preferencia del sistema siempre tiene prioridad.</small></span><div class="motion-options" role="group" aria-label="Intensidad del movimiento">' +
        [['reduced','Reducido'],['balanced','Equilibrado'],['cinematic','Cinematográfico']].map(function (m) { return '<button data-motion-choice="' + m[0] + '" aria-pressed="' + (state.motion === m[0]) + '">' + m[1] + '</button>'; }).join('') +
      '</div></div>' +
      '<div class="skin-foot"><span>Sin librerías externas</span><span>GPU-friendly</span><span>Preferencia local</span></div>' +
    '</div></div>';
  }

  function openSkinPanel() {
    state.skinPanel = true;
    state.palette = false;
    render();
    document.body.classList.add('modal-open');
    var close = document.getElementById('close-skin');
    if (close) close.focus();
  }

  function closeSkinPanel() {
    animateClose('skin-overlay', function () {
      state.skinPanel = false;
      document.body.classList.remove('modal-open');
      render();
      var trigger = document.getElementById('skin');
      if (trigger) trigger.focus();
    });
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

  function setMotion(mode) {
    if (['reduced', 'balanced', 'cinematic'].indexOf(mode) === -1) return;
    state.motion = mode;
    try { localStorage.setItem('u404-motion', state.motion); } catch (e) {}
    render();
    document.body.classList.add('modal-open');
    var toggle = document.querySelector('[data-motion-choice="' + mode + '"]');
    if (toggle) toggle.focus();
  }

  var activityTimer = null;
  var searchTimer = null;
  var deferredInstallPrompt = null;
  var waitingWorker = null;
  function pulseCore(kind) {
    document.body.setAttribute('data-activity', kind || 'active');
    if (activityTimer) clearTimeout(activityTimer);
    activityTimer = setTimeout(function () { document.body.removeAttribute('data-activity'); }, 720);
  }

  function openRandomApp() {
    var available = APPS.filter(function (a) { return state.recent.indexOf(a.name) === -1; });
    if (!available.length) available = APPS.slice();
    openApp(available[Math.floor(Math.random() * available.length)].name);
  }

  function openPresentation() {
    state.presentation = true;
    state.presentationIndex = 0;
    render();
    document.body.classList.add('modal-open');
    var stage = document.getElementById('presentation-stage');
    if (stage) stage.focus();
  }

  function closePresentation() {
    state.presentation = false;
    document.body.classList.remove('modal-open');
    render();
    var trigger = document.getElementById('open-presentation');
    if (trigger) trigger.focus();
  }

  function stepPresentation(amount) {
    var length = presentationApps().length;
    state.presentationIndex = (state.presentationIndex + amount + length) % length;
    render();
    document.body.classList.add('modal-open');
    var stage = document.getElementById('presentation-stage');
    if (stage) stage.focus();
  }

  function renderAppQR() {
    var canvas = document.getElementById('app-qr');
    if (!canvas || !state.selectedApp || !window.QRLite) return;
    try {
      window.QRLite.draw(canvas, state.selectedApp.pages, { size: 180, margin: 4, foreground: '#101522', background: '#ffffff' });
    } catch (error) {
      canvas.hidden = true;
    }
  }

  function downloadAppQR() {
    var canvas = document.getElementById('app-qr');
    if (!canvas || !state.selectedApp) return;
    var link = document.createElement('a');
    link.download = state.selectedApp.name.replace(/[^a-z0-9-]+/gi, '-') + '-QR.png';
    link.href = canvas.toDataURL('image/png');
    link.click();
  }

  function showToast(message) {
    var toast = document.getElementById('system-toast');
    if (!toast) return;
    toast.textContent = message;
    toast.classList.remove('is-visible');
    void toast.offsetWidth;
    toast.classList.add('is-visible');
    setTimeout(function () { toast.classList.remove('is-visible'); }, 3600);
  }

  function installPWA() {
    if (window.matchMedia && window.matchMedia('(display-mode: standalone)').matches) {
      showToast('Universo 404 ya está instalado.');
      return;
    }
    if (!deferredInstallPrompt) {
      var ios = /iphone|ipad|ipod/i.test(navigator.userAgent || '');
      showToast(ios ? 'En Safari: Compartir → Añadir a pantalla de inicio.' : 'Usa la opción “Instalar aplicación” del menú del navegador.');
      return;
    }
    deferredInstallPrompt.prompt();
    deferredInstallPrompt.userChoice.then(function (choice) {
      showToast(choice.outcome === 'accepted' ? 'Instalación iniciada.' : 'Instalación cancelada.');
      deferredInstallPrompt = null;
    });
  }

  function shareCurrentApp() {
    if (!state.selectedApp) return;
    syncURL(false);
    var url = window.location.href;
    var data = { title: state.selectedApp.name + ' · Universo 404', text: state.selectedApp.short, url: url };
    if (navigator.share) {
      navigator.share(data).catch(function (error) {
        if (!error || error.name !== 'AbortError') showToast('No se pudo compartir la ficha.');
      });
    } else if (navigator.clipboard && navigator.clipboard.writeText) {
      navigator.clipboard.writeText(url).then(function () { showToast('Enlace de la ficha copiado.'); }, function () { showToast('No se pudo copiar el enlace.'); });
    } else {
      window.prompt('Copia el enlace de esta ficha:', url);
    }
  }

  function showUpdate(worker) {
    waitingWorker = worker || waitingWorker;
    var toast = document.getElementById('update-toast');
    if (toast) toast.hidden = false;
  }

  function applyUpdate() {
    if (waitingWorker) waitingWorker.postMessage({ type: 'SKIP_WAITING' });
  }

  function clearOneFilter(key) {
    if (key === 'query') state.query = '';
    else if (key === 'saga') state.activeSaga = null;
    else if (key === 'intent') state.activeIntent = null;
    else if (key === 'tech') state.techFilter = '';
    else if (key === 'sort') {
      state.sort = 'recommended';
      try { localStorage.setItem('u404-sort', state.sort); } catch (error) {}
    }
    syncURL(true);
    render();
    scrollToId('catalogo');
  }

  function wireDynamicContent(scope) {
    var area = scope || document;
    Array.prototype.forEach.call(area.querySelectorAll('[data-app]'), function (button) {
      button.onclick = function () { openApp(button.getAttribute('data-app')); };
    });
    Array.prototype.forEach.call(area.querySelectorAll('[data-fav]'), function (button) {
      button.onclick = function (event) {
        event.stopPropagation();
        toggleFavorite(button.getAttribute('data-fav'));
        var selectedName = state.selectedApp && state.selectedApp.name;
        render();
        if (selectedName) {
          document.body.classList.add('modal-open');
          var favorite = document.getElementById('modal-fav');
          if (favorite) favorite.focus();
        }
      };
    });
    Array.prototype.forEach.call(area.querySelectorAll('[data-clear-filter]'), function (button) {
      button.onclick = function () { clearOneFilter(button.getAttribute('data-clear-filter')); };
    });
    var reset = area.querySelector('#reset-empty');
    if (reset) reset.onclick = resetFilters;
  }

  function updateClearFilterButton() {
    var button = document.getElementById('clear-filter');
    if (!button) return;
    var count = activeFilterItems().length;
    button.disabled = !count;
    button.classList.toggle('is-on', !!count);
    button.setAttribute('aria-label', count ? 'Eliminar todos los filtros' : 'No hay filtros activos');
    button.textContent = count ? 'Limpiar (' + count + ')' : 'Sin filtros';
  }

  function wire() {
    var skin = document.getElementById('skin');
    var skinTop = document.getElementById('skin-top');
    if (skin) skin.onclick = openSkinPanel;
    if (skinTop) skinTop.onclick = openSkinPanel;

    ['open-palette', 'open-palette-top', 'open-palette-core', 'mobile-search'].forEach(function (id) {
      var el = document.getElementById(id); if (el) el.onclick = openPalette;
    });
    ['install-pwa', 'install-pwa-top'].forEach(function (id) { var el = document.getElementById(id); if (el) el.onclick = installPWA; });
    var random = document.getElementById('random-app'); if (random) random.onclick = openRandomApp;
    var presentation = document.getElementById('open-presentation'); if (presentation) presentation.onclick = openPresentation;
    var update = document.getElementById('apply-update'); if (update) update.onclick = applyUpdate;
    var share = document.getElementById('share-app'); if (share) share.onclick = shareCurrentApp;
    var qrDownload = document.getElementById('download-qr'); if (qrDownload) qrDownload.onclick = downloadAppQR;
    var presentationClose = document.getElementById('close-presentation'); if (presentationClose) presentationClose.onclick = closePresentation;
    var presentationPrev = document.getElementById('presentation-prev'); if (presentationPrev) presentationPrev.onclick = function () { stepPresentation(-1); };
    var presentationNext = document.getElementById('presentation-next'); if (presentationNext) presentationNext.onclick = function () { stepPresentation(1); };

    Array.prototype.forEach.call(document.querySelectorAll('[data-intent]'), function (b) {
      b.onclick = function () { setIntent(b.getAttribute('data-intent')); };
    });
    Array.prototype.forEach.call(document.querySelectorAll('[data-saga]'), function (b) {
      b.onclick = function () { setSaga(b.getAttribute('data-saga')); };
    });
    wireDynamicContent(document);
    Array.prototype.forEach.call(document.querySelectorAll('[data-view]'), function (b) {
      b.onclick = function () {
        var nextView = b.getAttribute('data-view');
        var commit = function () { state.view = nextView; try { localStorage.setItem('u404-view', state.view); } catch (e) {} syncURL(true); render(); };
        if (document.startViewTransition && !reduceMotion()) document.startViewTransition(commit); else commit();
        scrollToId('catalogo');
      };
    });

    var q = document.getElementById('q');
    var commitQuery = function (event) {
      var input = event.target;
      state.query = input.value;
      syncURL(false);
      updateCatalogOnly();
    };
    if (q) {
      q.oninput = commitQuery;
      q.onchange = commitQuery;
      q.onsearch = commitQuery;
    }
    var tech = document.getElementById('tech');
    if (tech) tech.onchange = function (e) { state.techFilter = e.target.value; syncURL(true); render(); scrollToId('catalogo'); };
    var sort = document.getElementById('sort');
    if (sort) sort.onchange = function (e) { state.sort = e.target.value; try { localStorage.setItem('u404-sort', state.sort); } catch (err) {} syncURL(true); render(); scrollToId('catalogo'); };
    var clear = document.getElementById('clear-filter');
    if (clear) clear.onclick = resetFilters;
    var clearRecent = document.getElementById('clear-recent');
    if (clearRecent) clearRecent.onclick = function () { state.recent = []; saveJSON('u404-recent', []); render(); };

    Array.prototype.forEach.call(document.querySelectorAll('[data-skin-choice]'), function (b) {
      b.onclick = function () { setSkin(b.getAttribute('data-skin-choice')); };
    });
    Array.prototype.forEach.call(document.querySelectorAll('[data-motion-choice]'), function (b) {
      b.onclick = function () { setMotion(b.getAttribute('data-motion-choice')); };
    });
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
    var presentationOv = document.getElementById('presentation-overlay');
    if (presentationOv) presentationOv.onclick = function (e) { if (e.target === presentationOv) closePresentation(); };
  }

  function updateCatalogOnly() {
    var content = document.getElementById('catalog-content');
    if (!content) { render(); return; }
    content.innerHTML = catalogContentHTML(catalog());
    updateClearFilterButton();
    wireDynamicContent(content);
  }

  function renderPaletteBody() {
    var results = paletteResults();
    var body = document.querySelector('.palette-body');
    if (!body) return;
    body.innerHTML = '<p id="palette-title">Resultados</p>' + paletteResultsHTML(results);
    var input = document.getElementById('palette-q');
    if (input) {
      if (results.length) input.setAttribute('aria-activedescendant', 'palette-result-0');
      else input.removeAttribute('aria-activedescendant');
    }
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
    state.query = ''; state.activeSaga = null; state.activeIntent = null; state.techFilter = ''; state.sort = 'recommended';
    try { localStorage.setItem('u404-sort', state.sort); } catch (e) {}
    syncURL(true); render(); scrollToId('catalogo');
  }

  var motionObserver = null;
  function initMotion() {
    if (motionObserver) motionObserver.disconnect();
    var targets = document.querySelectorAll('.section-head,.intent-card,.spot-card,.small-tile,.featured-grid .app-card,.control-panel,.catalog-section');
    if (reduceMotion() || !('IntersectionObserver' in window)) {
      Array.prototype.forEach.call(targets, function (el) { el.classList.add('is-visible'); });
      animateMetrics();
      return;
    }
    motionObserver = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (!entry.isIntersecting) return;
        entry.target.classList.add('is-visible');
        if (entry.target.classList.contains('control-panel')) animateMetrics();
        motionObserver.unobserve(entry.target);
      });
    }, { threshold: .12, rootMargin: '0px 0px -7% 0px' });
    Array.prototype.forEach.call(targets, function (el, i) {
      el.style.setProperty('--reveal-delay', Math.min(i % 8, 5) * 36 + 'ms');
      motionObserver.observe(el);
    });
  }

  function animateMetrics() {
    Array.prototype.forEach.call(document.querySelectorAll('[data-count]'), function (el) {
      if (el.getAttribute('data-animated') || reduceMotion()) return;
      el.setAttribute('data-animated', 'true');
      var target = Number(el.getAttribute('data-count')) || 0, start = performance.now();
      function frame(now) {
        var p = Math.min(1, (now - start) / 700);
        el.textContent = Math.round(target * (1 - Math.pow(1 - p, 3)));
        if (p < 1) requestAnimationFrame(frame);
      }
      requestAnimationFrame(frame);
    });
    Array.prototype.forEach.call(document.querySelectorAll('.dist-row i b'), function (bar) { bar.classList.add('bar-ready'); });
  }

  document.addEventListener('keydown', function (e) {
    var isShortcut = (e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 'k';
    if (isShortcut) { e.preventDefault(); if (state.palette) closePalette(); else openPalette(); return; }
    if (state.presentation && (e.key === 'ArrowLeft' || e.key === 'ArrowRight')) {
      e.preventDefault(); stepPresentation(e.key === 'ArrowRight' ? 1 : -1); return;
    }
    if (e.key === 'Escape') {
      if (state.presentation) { closePresentation(); return; }
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
      items.forEach(function (x) { x.classList.remove('selected'); x.setAttribute('aria-selected', 'false'); });
      items[idx].classList.add('selected');
      items[idx].setAttribute('aria-selected', 'true');
      var paletteInput = document.getElementById('palette-q');
      if (paletteInput) paletteInput.setAttribute('aria-activedescendant', items[idx].id);
      items[idx].scrollIntoView({ block: 'nearest' });
    }
    if (state.palette && e.key === 'Enter') {
      var input = document.getElementById('palette-q');
      if (document.activeElement === input) {
        var selected = document.querySelector('[data-palette-app].selected') || document.querySelector('[data-palette-app]');
        if (selected) { e.preventDefault(); openApp(selected.getAttribute('data-palette-app')); }
      }
    }
    if ((state.selectedApp || state.palette || state.skinPanel || state.presentation) && e.key === 'Tab') trapFocus(e);
  });

  function trapFocus(e) {
    var dialog = state.selectedApp ? document.getElementById('app-modal') : (state.palette ? document.getElementById('palette') : (state.skinPanel ? document.getElementById('skin-panel') : document.getElementById('presentation-stage')));
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

  window.addEventListener('beforeinstallprompt', function (event) {
    event.preventDefault();
    deferredInstallPrompt = event;
    var buttons = document.querySelectorAll('.install-pwa');
    Array.prototype.forEach.call(buttons, function (button) { button.classList.add('is-ready'); });
  });

  window.addEventListener('appinstalled', function () {
    deferredInstallPrompt = null;
    showToast('Universo 404 se ha instalado correctamente.');
  });

  function updateNetworkUI() {
    var dot = document.querySelector('.topbar .pulse');
    var label = document.getElementById('network-label');
    var heroLabel = document.getElementById('hero-network-label');
    if (dot) dot.classList.toggle('is-offline', !navigator.onLine);
    if (label) label.textContent = navigator.onLine ? 'Conexión detectada' : 'Sin conexión detectada';
    if (heroLabel) heroLabel.textContent = navigator.onLine ? 'CONEXIÓN DETECTADA' : 'SIN CONEXIÓN DETECTADA';
    showToast(navigator.onLine ? 'El navegador indica que la conexión ha vuelto.' : 'El navegador indica que no hay conexión.');
  }
  window.addEventListener('online', updateNetworkUI);
  window.addEventListener('offline', updateNetworkUI);

  window.addEventListener('popstate', function () {
    var hadModal = !!state.selectedApp;
    modalHistoryPushed = false;
    applyURLState(true);
    render();
    if ((hadModal || appClosing) && !state.selectedApp) restoreAppFocus();
    appClosing = false;
  });

  if ('serviceWorker' in navigator && location.protocol !== 'file:') {
    var refreshing = false;
    navigator.serviceWorker.addEventListener('controllerchange', function () {
      if (refreshing) return;
      refreshing = true;
      window.location.reload();
    });
    window.addEventListener('load', function () {
      navigator.serviceWorker.register('./sw.js').then(function (registration) {
        if (registration.waiting) showUpdate(registration.waiting);
        registration.addEventListener('updatefound', function () {
          var worker = registration.installing;
          if (!worker) return;
          worker.addEventListener('statechange', function () {
            if (worker.state === 'installed' && navigator.serviceWorker.controller) showUpdate(worker);
          });
        });
      }).catch(function () {});
    });
  }

  applyURLState();
  render();
  if (state.selectedApp) {
    document.body.classList.add('modal-open');
    var initialClose = document.getElementById('close-modal');
    if (initialClose) initialClose.focus();
  }
})();
