/* I. Roig · Portal Apps 404 — app */
(function () {
  'use strict';

  var D = window.PORTAL_DATA;
  var APPS = D.APPS;
  var LANGUAGES = D.LANGUAGES;
  var SKINS = ['cosmica', 'obsidiana', 'claro'];
  var SKIN_NAMES = { cosmica: 'Cósmica', obsidiana: 'Obsidiana', claro: 'Claro' };

  var state = {
    skin: 'cosmica',
    query: '',
    activeSaga: null,
    techFilter: '',
    selectedApp: null,
    spotlight: APPS[Math.floor(Math.random() * APPS.length)]
  };

  // restore skin preference
  try {
    var saved = localStorage.getItem('u404-skin');
    if (saved && SKINS.indexOf(saved) !== -1) state.skin = saved;
  } catch (e) { /* storage unavailable */ }

  var esc = function (s) {
    return String(s == null ? '' : s).replace(/[&<>"']/g, function (ch) {
      return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[ch];
    });
  };

  var sagaNames = APPS.map(function (a) { return a.saga; })
    .filter(function (v, i, arr) { return arr.indexOf(v) === i; });
  var totalCats = APPS.map(function (a) { return a.category; })
    .filter(function (v, i, arr) { return arr.indexOf(v) === i; }).length;
  var techs = Object.keys(LANGUAGES).map(function (k) { return LANGUAGES[k]; })
    .filter(function (v, i, arr) { return arr.indexOf(v) === i; }).sort();

  var sagas = sagaNames.map(function (name) {
    var items = APPS.filter(function (a) { return a.saga === name; });
    return { name: name, count: items.length, icon: items[0].icon };
  });
  var maxSaga = Math.max.apply(null, sagas.map(function (s) { return s.count; }));

  function catalog() {
    var out = APPS.map(function (a) {
      var o = {}; for (var k in a) o[k] = a[k];
      o.language = LANGUAGES[a.name] || 'JavaScript';
      return o;
    });
    if (state.activeSaga) out = out.filter(function (a) { return a.saga === state.activeSaga; });
    if (state.techFilter) out = out.filter(function (a) { return a.language === state.techFilter; });
    var q = state.query.trim().toLowerCase();
    if (q) {
      out = out.filter(function (a) {
        return a.name.toLowerCase().indexOf(q) !== -1 ||
               a.category.toLowerCase().indexOf(q) !== -1 ||
               a.short.toLowerCase().indexOf(q) !== -1;
      });
    }
    return out;
  }

  var alt = function (i) { return i % 2 === 0 ? 'var(--accent)' : 'var(--accent2)'; };

  function cardHTML(a, i) {
    return '<button class="card" data-app="' + esc(a.name) + '" ' +
      'style="--c:' + alt(i) + '" ' +
      'onmouseover="this.style.boxShadow=\'0 18px 44px -20px \'+getComputedStyle(this).getPropertyValue(\'--c\');this.style.borderColor=getComputedStyle(this).getPropertyValue(\'--c\')" ' +
      'onmouseout="this.style.boxShadow=\'\';this.style.borderColor=\'\'">' +
      '<img src="' + esc(a.screenshot) + '" alt="Mockup de ' + esc(a.name) + '" loading="lazy" decoding="async" width="1280" height="720">' +
      '<div class="card-body">' +
      '<p class="card-cat" style="color:' + alt(i) + '">' + esc(a.category) + '</p>' +
      '<strong>' + esc(a.name) + '</strong>' +
      '<p>' + esc(a.short) + '</p>' +
      '</div></button>';
  }

  function miniHTML(a, i) {
    return '<button class="mini" data-app="' + esc(a.name) + '" ' +
      'style="--c:' + alt(i) + '" ' +
      'onmouseover="this.style.borderColor=getComputedStyle(this).getPropertyValue(\'--c\');this.style.boxShadow=\'0 14px 32px -18px \'+getComputedStyle(this).getPropertyValue(\'--c\')" ' +
      'onmouseout="this.style.borderColor=\'\';this.style.boxShadow=\'\'">' +
      '<span class="mini-head"><span style="color:' + alt(i) + '">' + esc(a.icon) + '</span>' +
      '<strong>' + esc(a.name) + '</strong></span>' +
      '<p>' + esc(a.short) + '</p>' +
      '<span class="mini-foot"><span class="cat">' + esc(a.category) + '</span>' +
      '<span class="go" style="color:' + alt(i) + '">Ver ficha →</span></span>' +
      '</button>';
  }

  function render() {
    document.documentElement.setAttribute('data-skin', state.skin);
    var list = catalog();
    var featured = APPS.filter(function (a) { return a.featured; });
    var sp = state.spotlight;
    var spDesc = sp.description || sp.short;

    var html =
    '<div class="wrap">' +
      '<nav class="nav">' +
        '<a class="brand" href="#top">' +
          '<picture><source srcset="assets/logo.webp" type="image/webp">' +
          '<img src="assets/logo.png" alt="" width="38" height="38"></picture>' +
          '<span><strong>I. Roig</strong><small>Portal Apps 404</small></span>' +
        '</a>' +
        '<div class="navlinks">' +
          '<a href="#top-apps">Top apps</a><a href="#suites">Suites</a>' +
          '<a href="#panel">Panel</a><a href="#catalogo">Catálogo</a>' +
        '</div>' +
        '<div class="navright">' +
          '<button class="btn-skin" id="skin">Skin: ' + esc(SKIN_NAMES[state.skin]) + '</button>' +
          '<a href="https://github.com/ivan7800" target="_blank" rel="noopener noreferrer">GitHub</a>' +
        '</div>' +
      '</nav>' +

      '<section class="hero" id="top">' +
        '<div>' +
          '<p class="eyebrow">Apps web · escritura · diseño · Universo 404</p>' +
          '<h1>Un ecosistema de mundos digitales, <em>catalogado como una constelación.</em></h1>' +
          '<p class="lede">' + APPS.length + ' apps de I. Roig — herramientas web, ficción interactiva, audio y sistemas propios, sin tracking ni dependencias externas.</p>' +
          '<div class="chips">' +
            '<span class="chip">GitHub Pages ready</span><span class="chip">' + APPS.length + ' apps</span>' +
            '<span class="chip">Sin tracking</span><span class="chip">Offline-ready</span>' +
          '</div>' +
          '<div class="cta"><a class="btn-primary" href="#top-apps">Ver top apps</a>' +
          '<a class="btn-ghost" href="#catalogo">Explorar catálogo</a></div>' +
        '</div>' +
        '<div class="oculus">' +
          '<div class="ring0"></div><div class="ring1"></div><div class="ring2"></div>' +
          '<picture><source srcset="assets/logo.webp" type="image/webp">' +
          '<img src="assets/logo.png" alt="Símbolo personal de I. Roig: planetas cósmicos" width="512" height="512"></picture>' +
        '</div>' +
      '</section>' +

      '<section class="sec">' +
        '<div class="sec-head"><p class="kicker">Centro de mando</p>' +
        '<h2>Cada puerta lleva a un mundo distinto.</h2></div>' +
        '<div class="grid-cmd">' +
          '<a class="cmd" href="#top-apps"><span class="num">01</span><strong>Top apps</strong><small>Lo más representativo para enseñar primero.</small></a>' +
          '<a class="cmd" href="#suites"><span class="num">02</span><strong>Suites U404</strong><small>Archivo simbólico, Estudio audiovisual, Formación &amp; IT.</small></a>' +
          '<a class="cmd" href="#panel"><span class="num">03</span><strong>Panel del ecosistema</strong><small>Estadísticas y distribución por área.</small></a>' +
          '<a class="cmd" href="#catalogo"><span class="num">04</span><strong>Catálogo</strong><small>Busca, filtra y abre cada proyecto.</small></a>' +
        '</div>' +
      '</section>' +

      '<section class="spotlight">' +
        '<a class="shot" href="' + esc(sp.pages) + '" target="_blank" rel="noopener noreferrer">' +
        '<img src="' + esc(sp.screenshot) + '" alt="Mockup de ' + esc(sp.name) + '" loading="lazy" decoding="async" width="1280" height="720"></a>' +
        '<div>' +
          '<p class="kicker">App destacada al entrar</p>' +
          '<h2>' + esc(sp.name) + '</h2>' +
          '<p class="sec-note" style="max-width:48ch;margin-bottom:1.2rem">' + esc(spDesc) + '</p>' +
          '<div class="modal-tags"><span class="tag">' + esc(sp.category) + '</span><span class="tag">GitHub Pages</span></div>' +
          '<div class="cta"><a class="btn-primary" href="' + esc(sp.pages) + '" target="_blank" rel="noopener noreferrer">Abrir app</a>' +
          '<a class="btn-ghost" href="' + esc(sp.github) + '" target="_blank" rel="noopener noreferrer">Ver código</a></div>' +
        '</div>' +
      '</section>' +

      '<section class="sec" id="top-apps">' +
        '<div class="sec-head"><p class="kicker">Top apps</p><h2>Imprescindibles</h2></div>' +
        '<div class="grid-cards">' + featured.map(cardHTML).join('') + '</div>' +
      '</section>' +

      '<section class="sec bleed tint-accent" id="suites">' +
        '<div class="sec-head"><p class="kicker">Ecosistema</p><h2>Suites U404</h2>' +
        '<p class="sec-note">Una capa transversal para entrar por mundo: símbolos, sonido/imagen o formación e IT. Pulsa una suite para filtrar el catálogo.</p></div>' +
        '<div class="grid-cmd">' + sagas.map(function (s, i) {
          var on = state.activeSaga === s.name;
          return '<button class="suite" data-saga="' + esc(s.name) + '" aria-pressed="' + on + '" ' +
            'style="--c:' + alt(i) + '" ' +
            'onmouseover="this.style.borderColor=getComputedStyle(this).getPropertyValue(\'--c\')" ' +
            'onmouseout="if(this.getAttribute(\'aria-pressed\')!==\'true\')this.style.borderColor=\'\'">' +
            '<span class="ico" style="color:' + alt(i) + '">' + esc(s.icon) + '</span>' +
            '<strong>' + esc(s.name) + '</strong><small>' + s.count + ' proyectos</small></button>';
        }).join('') + '</div>' +
      '</section>' +

      '<section class="sec bleed tint-accent2" id="panel">' +
        '<div class="sec-head"><p class="kicker">Control Center</p><h2>Estado del ecosistema</h2></div>' +
        '<div class="grid-stats">' +
          '<div class="stat"><strong style="color:var(--accent)" data-count="' + APPS.length + '">0</strong><span>apps catalogadas</span></div>' +
          '<div class="stat"><strong style="color:var(--accent2)" data-count="' + sagaNames.length + '">0</strong><span>sagas</span></div>' +
          '<div class="stat"><strong data-count="' + totalCats + '">0</strong><span>categorías</span></div>' +
        '</div>' +
        '<div class="bars"><p class="bars-title">Distribución por saga</p><div class="bar-row">' +
          sagas.map(function (s) {
            return '<div><div class="bar-label"><span>' + esc(s.name) + '</span><span>' + s.count + '</span></div>' +
              '<div class="bar-track"><div class="bar-fill" style="width:' +
              Math.round((s.count / maxSaga) * 100) + '%"></div></div></div>';
          }).join('') +
        '</div></div>' +
      '</section>' +

      '<section class="sec" id="catalogo">' +
        '<div class="sec-head"><p class="kicker">Catálogo</p><h2>Todas las apps</h2>' +
        '<p class="sec-note">Busca por nombre, categoría o descripción. Sin envío de datos fuera del navegador.</p></div>' +
        '<div class="filters">' +
          '<input class="search" id="q" type="search" placeholder="Buscar apps…" aria-label="Buscar apps" value="' + esc(state.query) + '">' +
          '<select class="select" id="tech" aria-label="Filtrar por tecnología">' +
            '<option value="">Toda tecnología</option>' +
            techs.map(function (t) {
              return '<option value="' + esc(t) + '"' + (state.techFilter === t ? ' selected' : '') + '>' + esc(t) + '</option>';
            }).join('') +
          '</select>' +
          (state.activeSaga ? '<button class="btn-clear" id="clear">Filtro: ' + esc(state.activeSaga) + ' ✕</button>' : '') +
        '</div>' +
        '<p class="count" role="status">Mostrando ' + list.length + ' de ' + APPS.length + ' apps.</p>' +
        (list.length
          ? '<div class="grid-mini">' + list.map(miniHTML).join('') + '</div>'
          : '<div class="empty"><p class="mark">◌</p><strong>No hay apps con esos filtros.</strong>' +
            '<p>Prueba otra búsqueda, quita la tecnología o el filtro de suite.</p></div>') +
      '</section>' +

      '<footer><div><strong>I. Roig · Portal Apps 404</strong>' +
      '<p>Portafolio experimental, sin tracking, listo para GitHub Pages.</p></div>' +
      '<a href="#top">Volver arriba</a></footer>' +
    '</div>' +
    (state.selectedApp ? modalHTML(state.selectedApp) : '');

    document.getElementById('app').innerHTML = html;
    wire();
  }

  function modalHTML(a) {
    return '<div class="overlay" id="overlay" role="dialog" aria-modal="true" aria-label="Ficha de ' + esc(a.name) + '">' +
      '<div class="modal" id="modal">' +
        '<button class="close" id="close" aria-label="Cerrar ficha">×</button>' +
        '<img src="' + esc(a.screenshot) + '" alt="Mockup de ' + esc(a.name) + '" width="1280" height="720">' +
        '<div class="modal-body">' +
          '<p class="modal-saga">' + esc(a.saga) + '</p>' +
          '<h3>' + esc(a.name) + '</h3>' +
          '<p class="modal-desc">' + esc(a.description || a.short) + '</p>' +
          '<div class="modal-tags"><span class="tag">' + esc(a.category) + '</span>' +
          '<span class="tag">' + esc(LANGUAGES[a.name] || 'JavaScript') + '</span>' +
          '<span class="tag">GitHub Pages</span></div>' +
          '<div class="modal-cta">' +
            '<a class="btn-primary" href="' + esc(a.pages) + '" target="_blank" rel="noopener noreferrer">Abrir app</a>' +
            '<a class="btn-ghost" href="' + esc(a.github) + '" target="_blank" rel="noopener noreferrer">Ver código</a>' +
          '</div>' +
        '</div>' +
      '</div></div>';
  }

  function byName(n) {
    for (var i = 0; i < APPS.length; i++) if (APPS[i].name === n) return APPS[i];
    return null;
  }

  var lastFocus = null;

  function wire() {
    document.getElementById('skin').onclick = function () {
      state.skin = SKINS[(SKINS.indexOf(state.skin) + 1) % SKINS.length];
      try { localStorage.setItem('u404-skin', state.skin); } catch (e) {}
      render();
    };

    var q = document.getElementById('q');
    if (q) {
      q.oninput = function (e) {
        state.query = e.target.value;
        var pos = e.target.selectionStart;
        render();
        var n = document.getElementById('q');
        n.focus();
        try { n.setSelectionRange(pos, pos); } catch (err) {}
      };
    }
    var tech = document.getElementById('tech');
    if (tech) tech.onchange = function (e) { state.techFilter = e.target.value; render(); };

    var clear = document.getElementById('clear');
    if (clear) clear.onclick = function () { state.activeSaga = null; render(); };

    Array.prototype.forEach.call(document.querySelectorAll('[data-saga]'), function (b) {
      b.onclick = function () {
        var n = b.getAttribute('data-saga');
        state.activeSaga = state.activeSaga === n ? null : n;
        render();
        var el = document.getElementById('catalogo');
        if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
      };
    });

    Array.prototype.forEach.call(document.querySelectorAll('[data-app]'), function (b) {
      b.onclick = function () {
        lastFocus = b;
        state.selectedApp = byName(b.getAttribute('data-app'));
        render();
        var c = document.getElementById('close');
        if (c) c.focus();
      };
    });

    var ov = document.getElementById('overlay');
    if (ov) {
      ov.onclick = function (e) { if (e.target === ov) closeModal(); };
      document.getElementById('close').onclick = closeModal;
      document.getElementById('modal').onclick = function (e) { e.stopPropagation(); };
    }

    countUp();
  }

  function closeModal() {
    state.selectedApp = null;
    render();
    if (lastFocus) {
      var again = document.querySelector('[data-app="' + lastFocus.getAttribute('data-app') + '"]');
      if (again) again.focus();
    }
  }

  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape' && state.selectedApp) closeModal();
  });

  var counted = false;
  function countUp() {
    if (counted) return;
    var els = document.querySelectorAll('[data-count]');
    if (!els.length) return;
    counted = true;
    var start = performance.now(), dur = 900;
    function tick(now) {
      var p = Math.min(1, (now - start) / dur);
      Array.prototype.forEach.call(els, function (el) {
        el.textContent = Math.round(parseInt(el.getAttribute('data-count'), 10) * p);
      });
      if (p < 1) requestAnimationFrame(tick);
    }
    requestAnimationFrame(tick);
  }

  render();
})();
