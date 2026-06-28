(() => {
  'use strict';

  const $ = selector => document.querySelector(selector);
  const $$ = selector => [...document.querySelectorAll(selector)];

  function safeStorageGet(key, fallback = null) {
    try {
      const value = localStorage.getItem(key);
      return value === null ? fallback : value;
    } catch (_) {
      return fallback;
    }
  }

  function safeStorageSet(key, value) {
    try {
      localStorage.setItem(key, String(value));
    } catch (_) {}
  }

  function safeStorageRemove(key) {
    try {
      localStorage.removeItem(key);
    } catch (_) {}
  }

  function safeJsonArray(key) {
    try {
      const parsed = JSON.parse(safeStorageGet(key, '[]') || '[]');
      return Array.isArray(parsed) ? parsed : [];
    } catch (_) {
      safeStorageRemove(key);
      return [];
    }
  }

  function normalize(text) {
    return String(text || '')
      .toLowerCase()
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '');
  }

  function escapeHtml(value) {
    return String(value ?? '')
      .replaceAll('&', '&amp;')
      .replaceAll('<', '&lt;')
      .replaceAll('>', '&gt;')
      .replaceAll('"', '&quot;')
      .replaceAll("'", '&#039;');
  }

  function rankUpdated(text = '') {
    const t = normalize(text);
    const numberMatch = t.match(/(\d+)/);
    const amount = numberMatch ? Number(numberMatch[1]) : 1;
    if (t.includes('nueva')) return -1;
    if (t.includes('hora')) return amount / 24;
    if (t.includes('dia')) return amount;
    if (t.includes('semana')) return amount * 7;
    if (t.includes('mes')) return amount * 30;
    return 999;
  }

  const safeApps = Array.isArray(window.APPS) ? window.APPS : (typeof APPS !== 'undefined' && Array.isArray(APPS) ? APPS : []);

  const featured = new Set([
    'os404',
    'El-Criterio-Omega',
    'Baraja-del-Fin',
    'La-Caja-Infinita',
    'AETHERION-Editorial-OS',
    'NetLab-404',
    'Ajedrez-Maestro',
    'Nocturne',
    'fotocinema',
    'Investigador-404',
    'Atlas-Librorum',
    'QR-Studio-Offline',
    'Web-Architect'
  ]);

  const essentials = [
    'os404',
    'El-Criterio-Omega',
    'Baraja-del-Fin',
    'La-Caja-Infinita',
    'AETHERION-Editorial-OS',
    'NetLab-404',
    'Ajedrez-Maestro',
    'Nocturne',
    'fotocinema',
    'Web-Architect'
  ];

  const sagaSymbols = {
    'Universo 404': '◈',
    'Archivo simbólico': '◎',
    'Estudio audiovisual': '◧',
    'Formación & IT': '⌬',
    'Herramientas': '⬡',
    'Vida privada': '◌',
    'Laboratorio 404': '⟡'
  };

  const categorySymbols = {
    'Escritura': '▱',
    'Ficción': '◈',
    'Música': '◧',
    'Audio': '◧',
    'Datos': '⬡',
    'Dev': '⌬',
    'Formación': '⌬',
    'IT': '⌬',
    'Horror': '⟡',
    'Esoterismo': '◎',
    'Productividad': '⬢',
    'Visual': '▰',
    'Seguridad': '⬣'
  };


  const quickSections = [
    {
      id: 'top-apps',
      title: 'Top apps',
      subtitle: 'Las más representativas para enseñar primero.',
      cta: 'Ver destacadas',
      predicate: app => featured.has(app.name),
      limit: 6
    },
    {
      id: 'nuevas',
      title: 'Nuevas',
      subtitle: 'Últimos proyectos y actualizaciones fuertes.',
      cta: 'Ver nuevas',
      predicate: app => rankUpdated(app.updated) <= 1,
      limit: 6
    },
    {
      id: 'escritores',
      title: 'Para escritores',
      subtitle: 'Apps para novela, ideas, libros y mundos narrativos.',
      cta: 'Filtrar escritura',
      predicate: app => hasAny(app, ['escritura', 'libros', 'narrativa', 'editorial', 'storyboard', 'diario']),
      limit: 6
    },
    {
      id: 'devs',
      title: 'Para devs',
      subtitle: 'Herramientas, IT, datos, diseño web y productividad técnica.',
      cta: 'Filtrar dev',
      predicate: app => hasAny(app, ['dev', 'it', 'datos', 'windows', 'diseño', 'web', 'netlab', 'json']),
      limit: 6
    },
    {
      id: 'universo-404',
      title: 'Universo 404',
      subtitle: 'Ficción interactiva, horror, audio y mundos conectados.',
      cta: 'Entrar al universo',
      predicate: app => app.saga === 'Universo 404',
      limit: 6
    }
  ];

  function hasAny(app, words) {
    const haystack = normalize(`${app.name} ${app.description} ${app.short} ${app.language} ${app.category} ${app.saga}`);
    return words.some(word => haystack.includes(normalize(word)));
  }

  function deriveTags(app) {
    const tags = new Set(['Web app']);
    const haystack = normalize(`${app.name} ${app.description} ${app.short} ${app.language} ${app.category} ${app.saga}`);

    if (haystack.includes('pwa')) tags.add('PWA');
    if (haystack.includes('offline') || haystack.includes('sin tracking')) tags.add('Offline');
    if (hasAny(app, ['escritura', 'libros', 'narrativa', 'editorial', 'diario', 'storyboard'])) tags.add('Escritura');
    if (hasAny(app, ['dev', 'it', 'datos', 'json', 'windows', 'netlab'])) tags.add('Dev');
    if (hasAny(app, ['diseño', 'visual', 'foto', 'web architect', 'atlas web'])) tags.add('Diseño');
    if (hasAny(app, ['ia', 'ai', 'claude', 'skills'])) tags.add('IA');
    if (hasAny(app, ['juegos', 'ajedrez', 'baraja', 'caja infinita', 'horror'])) tags.add('Juego');
    if (app.saga === 'Universo 404') tags.add('Universo 404');
    if (hasAny(app, ['seguridad', 'privacidad', 'guardian', 'safe'])) tags.add('Privacidad');
    if (rankUpdated(app.updated) <= 1) tags.add('Nueva');

    return [...tags].slice(0, 5);
  }

  function renderTagBadges(app, compact = false) {
    return deriveTags(app)
      .slice(0, compact ? 3 : 5)
      .map(tag => `<span class="utility-tag">${escapeHtml(tag)}</span>`)
      .join('');
  }

  function getAppIcon(app) {
    const haystack = `${app.category || ''} ${app.name || ''}`;
    const matched = Object.keys(categorySymbols).find(key => haystack.includes(key));
    return matched ? categorySymbols[matched] : (sagaSymbols[app.saga] || '◈');
  }

  const THEME_VERSION = 'v23-commercial';
  if (safeStorageGet('portal404:themeVersion', '') !== THEME_VERSION) {
    safeStorageSet('portal404:theme', 'midnight');
    safeStorageSet('portal404:themeVersion', THEME_VERSION);
  }

  const themes = ['midnight', 'light', 'forest', 'royal', 'mono', 'sunset', 'ocean', 'gold'];
  const themeLabels = {
    midnight: 'Darknight',
    light: 'Claro',
    forest: 'Bosque',
    royal: 'Royal',
    mono: 'Mono',
    sunset: 'Sunset',
    ocean: 'Océano',
    gold: 'Oro'
  };

  const state = {
    query: '',
    category: 'Todas',
    saga: 'Todas',
    sort: 'featured',
    favoritesOnly: false,
    favorites: new Set(safeJsonArray('portal404:favorites')),
    theme: safeStorageGet('portal404:theme', 'midnight') || 'midnight'
  };

  const els = {
    root: document.documentElement,
    install: $('#installBtn'),
    theme: $('#themeBtn'),
    copyIndex: $('#copyIndexBtn'),
    totalApps: $('#totalApps'),
    totalSagas: $('#totalSagas'),
    totalCategories: $('#totalCategories'),
    favoriteCount: $('#favoriteCount'),
    essentialsGrid: $('#essentialsGrid'),
    quickSections: $('#quickSections'),
    sagaGrid: $('#sagaGrid'),
    clearSaga: $('#clearSagaBtn'),
    showFeatured: $('#showFeaturedBtn'),
    search: $('#searchInput'),
    sort: $('#sortSelect'),
    onlyFavorites: $('#onlyFavoritesBtn'),
    categoryStrip: $('#categoryStrip'),
    activeFilters: $('#activeFilters'),
    resultCount: $('#resultCount'),
    reset: $('#resetBtn'),
    grid: $('#appsGrid'),
    empty: $('#emptyState'),
    emptyReset: $('#emptyResetBtn'),
    toast: $('#toast'),
    fatalFallback: $('#fatalFallback'),
    repair: $('#repairPortalBtn')
  };

  let deferredInstallPrompt = null;

  function toast(message) {
    if (!els.toast) return;
    els.toast.textContent = message;
    els.toast.classList.add('show');
    window.clearTimeout(toast.timer);
    toast.timer = window.setTimeout(() => els.toast.classList.remove('show'), 2200);
  }

  function saveFavorites() {
    safeStorageSet('portal404:favorites', JSON.stringify([...state.favorites]));
    if (els.favoriteCount) els.favoriteCount.textContent = String(state.favorites.size);
  }

  function applyTheme() {
    if (!themes.includes(state.theme)) state.theme = 'midnight';
    if (state.theme === 'midnight') els.root.removeAttribute('data-theme');
    else els.root.setAttribute('data-theme', state.theme);
    if (els.theme) {
      const label = themeLabels[state.theme] || state.theme;
      els.theme.textContent = `Tema: ${label}`;
      els.theme.setAttribute('aria-label', `Cambiar tema. Tema actual: ${label}`);
    }
  }

  function cycleTheme() {
    const index = themes.indexOf(state.theme);
    state.theme = themes[(index + 1) % themes.length];
    safeStorageSet('portal404:theme', state.theme);
    applyTheme();
    toast(`Tema activo: ${themeLabels[state.theme]}`);
  }

  function appMatches(app) {
    const haystack = normalize(`${app.name} ${app.description} ${app.short} ${app.language} ${app.category} ${app.saga} ${app.updated} ${deriveTags(app).join(' ')}`);
    const matchesQuery = !state.query || haystack.includes(normalize(state.query));
    const matchesCategory = state.category === 'Todas' || app.category === state.category;
    const matchesSaga = state.saga === 'Todas' || app.saga === state.saga;
    const matchesFavorites = !state.favoritesOnly || state.favorites.has(app.name);
    return matchesQuery && matchesCategory && matchesSaga && matchesFavorites;
  }

  function getSortedApps(list) {
    return [...list].sort((a, b) => {
      if (state.sort === 'az') return a.name.localeCompare(b.name, 'es');
      if (state.sort === 'saga') return a.saga.localeCompare(b.saga, 'es') || a.name.localeCompare(b.name, 'es');
      if (state.sort === 'category') return a.category.localeCompare(b.category, 'es') || a.name.localeCompare(b.name, 'es');
      if (state.sort === 'language') return a.language.localeCompare(b.language, 'es') || a.name.localeCompare(b.name, 'es');
      if (state.sort === 'updated') return rankUpdated(a.updated) - rankUpdated(b.updated) || a.name.localeCompare(b.name, 'es');

      const featuredDiff = Number(featured.has(b.name)) - Number(featured.has(a.name));
      return featuredDiff || rankUpdated(a.updated) - rankUpdated(b.updated) || a.name.localeCompare(b.name, 'es');
    });
  }

  function renderStats() {
    const sagas = new Set(safeApps.map(app => app.saga).filter(Boolean));
    const categories = new Set(safeApps.map(app => app.category).filter(Boolean));
    if (els.totalApps) els.totalApps.textContent = String(safeApps.length);
    const heroCount = document.getElementById('heroAppCount');
    if (heroCount) heroCount.textContent = `${safeApps.length} apps`;
    if (els.totalSagas) els.totalSagas.textContent = String(sagas.size);
    if (els.totalCategories) els.totalCategories.textContent = String(categories.size);
    if (els.favoriteCount) els.favoriteCount.textContent = String(state.favorites.size);
  }

  function renderEssentials() {
    if (!els.essentialsGrid) return;
    const essentialApps = essentials
      .map(name => safeApps.find(app => app.name === name))
      .filter(Boolean);

    els.essentialsGrid.innerHTML = essentialApps.map(app => `
      <article class="essential-card">
        <div class="essential-shot-wrap">
          <img class="essential-shot" src="${escapeHtml(app.screenshot)}" alt="Preview visual de ${escapeHtml(app.name)}" loading="lazy">
        </div>
        <div class="essential-body">
          <div class="essential-meta">
            <span class="app-mini-icon" aria-hidden="true">${escapeHtml(getAppIcon(app))}</span>
            <span class="app-mini-tech">${escapeHtml(app.language)}</span>
          </div>
          <h3>${escapeHtml(app.name)}</h3>
          <p>${escapeHtml(app.short || app.description)}</p>
          <div class="utility-tags">${renderTagBadges(app, true)}</div>
          <div class="essential-actions">
            <a class="card-action primary" href="${escapeHtml(app.pages)}" target="_blank" rel="noopener noreferrer">Abrir app</a>
            <a class="card-action" href="${escapeHtml(app.github)}" target="_blank" rel="noopener noreferrer">GitHub</a>
          </div>
        </div>
      </article>
    `).join('');
  }


  function renderQuickSections() {
    if (!els.quickSections) return;

    els.quickSections.innerHTML = quickSections.map(section => {
      const apps = getSortedApps(safeApps.filter(section.predicate)).slice(0, section.limit);
      return `
        <article class="curated-block" id="${escapeHtml(section.id)}">
          <div class="curated-head">
            <div>
              <h3>${escapeHtml(section.title)}</h3>
              <p>${escapeHtml(section.subtitle)}</p>
            </div>
            <button type="button" class="micro-cta" data-quick-section="${escapeHtml(section.id)}">${escapeHtml(section.cta)}</button>
          </div>
          <div class="mini-app-grid">
            ${apps.map(app => `
              <a class="mini-app" href="${escapeHtml(app.pages)}" target="_blank" rel="noopener noreferrer">
                <img src="${escapeHtml(app.screenshot)}" alt="Preview de ${escapeHtml(app.name)}" loading="lazy">
                <span>
                  <strong>${escapeHtml(app.name)}</strong>
                  <small>${renderTagBadges(app, true)}</small>
                </span>
              </a>
            `).join('')}
          </div>
        </article>
      `;
    }).join('');
  }

  function renderSagas() {
    if (!els.sagaGrid) return;
    const sagas = [...new Set(safeApps.map(app => app.saga).filter(Boolean))]
      .sort((a, b) => a.localeCompare(b, 'es'));

    els.sagaGrid.innerHTML = sagas.map(saga => {
      const count = safeApps.filter(app => app.saga === saga).length;
      const symbol = sagaSymbols[saga] || '◆';
      return `
        <button class="saga-card" type="button" data-saga="${escapeHtml(saga)}" aria-pressed="${state.saga === saga}">
          <span class="saga-symbol">${escapeHtml(symbol)}</span>
          <span>
            <strong>${escapeHtml(saga)}</strong>
            <small>${count} apps</small>
          </span>
        </button>
      `;
    }).join('');
  }

  function renderCategories() {
    if (!els.categoryStrip) return;
    const categories = ['Todas', ...new Set(safeApps.map(app => app.category).filter(Boolean).sort((a, b) => a.localeCompare(b, 'es')))];
    els.categoryStrip.innerHTML = categories.map(category => {
      const count = category === 'Todas' ? safeApps.length : safeApps.filter(app => app.category === category).length;
      return `
        <button class="category-chip" type="button" data-category="${escapeHtml(category)}" aria-pressed="${state.category === category}">
          ${escapeHtml(category)} · ${count}
        </button>
      `;
    }).join('');
  }

  function renderActiveFilters() {
    if (!els.activeFilters) return;
    const filters = [];
    if (state.saga !== 'Todas') filters.push(`Saga: ${state.saga}`);
    if (state.category !== 'Todas') filters.push(`Categoría: ${state.category}`);
    if (state.query) filters.push(`Búsqueda: ${state.query}`);
    if (state.favoritesOnly) filters.push('Solo favoritos');
    els.activeFilters.innerHTML = filters.map(filter => `<span class="filter-pill">${escapeHtml(filter)}</span>`).join('');
  }

  function renderCards() {
    if (!els.grid) return;
    const filtered = getSortedApps(safeApps.filter(appMatches));

    els.grid.innerHTML = filtered.map(app => {
      const isFavorite = state.favorites.has(app.name);
      const isFeatured = featured.has(app.name);
      return `
        <article class="app-card">
          <div class="app-cover">
            <img src="${escapeHtml(app.screenshot)}" alt="Preview visual de ${escapeHtml(app.name)}" loading="lazy">
          </div>
          <div class="card-body">
            <div class="card-head">
              <div class="card-title-group">
                <span class="app-mini-icon" aria-hidden="true">${escapeHtml(getAppIcon(app))}</span>
                <div>
                  <h3>${escapeHtml(app.name)}</h3>
                  <small class="card-subline">${escapeHtml(app.language)} · ${escapeHtml(app.category)}</small>
                </div>
              </div>
              <button class="favorite-btn" type="button" data-favorite="${escapeHtml(app.name)}" aria-pressed="${isFavorite}" aria-label="${isFavorite ? 'Quitar de favoritos' : 'Añadir a favoritos'} ${escapeHtml(app.name)}">★</button>
            </div>
            <p>${escapeHtml(app.description)}</p>
            <div class="utility-tags">${renderTagBadges(app)}</div>
            <div class="badges">
              <span class="badge strong">${escapeHtml(app.saga)}</span>
              <span class="badge">${escapeHtml(app.updated)}</span>
              ${isFeatured ? '<span class="badge strong">Destacada</span>' : ''}
            </div>
            <div class="card-actions">
              <a class="card-action primary" href="${escapeHtml(app.pages)}" target="_blank" rel="noopener noreferrer">Abrir app</a>
              <a class="card-action" href="${escapeHtml(app.github)}" target="_blank" rel="noopener noreferrer">Código</a>
              <a class="card-action preview" href="${escapeHtml(app.screenshot || app.pages)}" target="_blank" rel="noopener noreferrer">Vista previa</a>
              <button class="card-action copy-link" type="button" data-copy-link="${escapeHtml(app.pages)}">Copiar enlace</button>
            </div>
          </div>
        </article>
      `;
    }).join('');

    if (els.resultCount) els.resultCount.textContent = `Mostrando ${filtered.length} de ${safeApps.length} apps.`;
    if (els.empty) els.empty.hidden = filtered.length !== 0;

    renderActiveFilters();
    renderSagas();
    renderCategories();
    renderStats();
  }

  function resetFilters() {
    state.query = '';
    state.category = 'Todas';
    state.saga = 'Todas';
    state.sort = 'featured';
    state.favoritesOnly = false;

    if (els.search) els.search.value = '';
    if (els.sort) els.sort.value = 'featured';
    if (els.onlyFavorites) els.onlyFavorites.setAttribute('aria-pressed', 'false');

    renderCards();
    toast('Filtros limpiados.');
  }

  function copyMarkdownIndex() {
    const markdown = safeApps
      .slice()
      .sort((a, b) => a.saga.localeCompare(b.saga, 'es') || a.name.localeCompare(b.name, 'es'))
      .map(app => `- **${app.name}** · ${app.saga} / ${app.category}\n  - App: ${app.pages}\n  - Código: ${app.github}\n  - ${app.description}`)
      .join('\n');

    navigator.clipboard?.writeText(markdown)
      .then(() => toast('Índice copiado.'))
      .catch(() => toast('No se pudo copiar el índice.'));
  }

  function showFeatured() {
    state.category = 'Todas';
    state.saga = 'Todas';
    state.query = '';
    state.favoritesOnly = false;
    state.sort = 'featured';

    if (els.search) els.search.value = '';
    if (els.sort) els.sort.value = 'featured';
    if (els.onlyFavorites) els.onlyFavorites.setAttribute('aria-pressed', 'false');

    renderCards();
    $('#catalog')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }

  function bindEvents() {
    els.theme?.addEventListener('click', cycleTheme);
    els.copyIndex?.addEventListener('click', copyMarkdownIndex);
    els.showFeatured?.addEventListener('click', showFeatured);

    els.search?.addEventListener('input', event => {
      state.query = event.target.value.trim();
      renderCards();
    });

    els.sort?.addEventListener('change', event => {
      state.sort = event.target.value;
      renderCards();
    });

    els.onlyFavorites?.addEventListener('click', () => {
      state.favoritesOnly = !state.favoritesOnly;
      els.onlyFavorites.setAttribute('aria-pressed', String(state.favoritesOnly));
      renderCards();
    });

    els.reset?.addEventListener('click', resetFilters);
    els.emptyReset?.addEventListener('click', resetFilters);

    els.clearSaga?.addEventListener('click', () => {
      state.saga = 'Todas';
      renderCards();
      toast('Mostrando todas las sagas.');
    });


    els.quickSections?.addEventListener('click', event => {
      const button = event.target.closest('[data-quick-section]');
      if (!button) return;
      const id = button.dataset.quickSection;
      state.query = '';
      state.category = 'Todas';
      state.saga = 'Todas';
      state.favoritesOnly = false;
      state.sort = 'featured';
      if (id === 'universo-404') state.saga = 'Universo 404';
      if (id === 'escritores') state.query = 'Escritura';
      if (id === 'devs') state.query = 'Dev';
      if (id === 'nuevas') state.sort = 'updated';
      if (els.search) els.search.value = state.query;
      if (els.sort) els.sort.value = state.sort;
      if (els.onlyFavorites) els.onlyFavorites.setAttribute('aria-pressed', 'false');
      renderCards();
      $('#catalog')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    });

    els.categoryStrip?.addEventListener('click', event => {
      const button = event.target.closest('[data-category]');
      if (!button) return;
      state.category = button.dataset.category;
      renderCards();
    });

    els.sagaGrid?.addEventListener('click', event => {
      const button = event.target.closest('[data-saga]');
      if (!button) return;
      state.saga = button.dataset.saga;
      renderCards();
      $('#catalog')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    });

    document.addEventListener('click', event => {
      const copyLink = event.target.closest('[data-copy-link]');
      if (copyLink) {
        navigator.clipboard?.writeText(copyLink.dataset.copyLink)
          .then(() => toast('Enlace copiado.'))
          .catch(() => toast('No se pudo copiar el enlace.'));
        return;
      }

      const favorite = event.target.closest('[data-favorite]');
      if (!favorite) return;
      const name = favorite.dataset.favorite;
      if (state.favorites.has(name)) {
        state.favorites.delete(name);
        toast('Quitada de favoritos.');
      } else {
        state.favorites.add(name);
        toast('Añadida a favoritos.');
      }
      saveFavorites();
      renderCards();
    });

    window.addEventListener('beforeinstallprompt', event => {
      event.preventDefault();
      deferredInstallPrompt = event;
      if (els.install) els.install.hidden = false;
    });

    els.install?.addEventListener('click', async () => {
      if (!deferredInstallPrompt) return;
      deferredInstallPrompt.prompt();
      await deferredInstallPrompt.userChoice;
      deferredInstallPrompt = null;
      if (els.install) els.install.hidden = true;
    });

    els.repair?.addEventListener('click', () => {
      try {
        Object.keys(localStorage)
          .filter(key => key.startsWith('portal404:'))
          .forEach(key => localStorage.removeItem(key));
        navigator.serviceWorker?.getRegistrations?.().then(registrations => registrations.forEach(reg => reg.unregister()));
      } catch (_) {}
      window.location.reload();
    });
  }

  function showFatalFallback(error) {
    console.error('Portal Apps 404 error:', error);
    if (els.fatalFallback) els.fatalFallback.hidden = false;
  }

  function registerServiceWorker() {
    if (!('serviceWorker' in navigator)) return;
    window.addEventListener('load', () => {
      navigator.serviceWorker.register('./sw.js').catch(() => {
        console.info('Service worker no registrado. Normal si se abre como archivo local.');
      });
    });
  }

  function init() {
    if (!safeApps.length) throw new Error('No hay apps cargadas.');
    if (!themes.includes(state.theme)) state.theme = 'midnight';

    applyTheme();
    renderStats();
    renderEssentials();
    renderQuickSections();
    renderSagas();
    renderCategories();
    renderCards();
    bindEvents();
    registerServiceWorker();
  }

  try {
    init();
  } catch (error) {
    showFatalFallback(error);
  }
})();
