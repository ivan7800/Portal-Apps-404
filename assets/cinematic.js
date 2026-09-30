/* Portal Apps 404 · Cinematic Experience Layer v41.29 POLISH
   No framework. No CDN. Progressive enhancement for the existing v41.26 portal. */
(function(){
  'use strict';

  var D = window.PORTAL_DATA || {};
  var APPS = Array.isArray(D.APPS) ? D.APPS : [];
  var finePointer = !!(window.matchMedia && window.matchMedia('(hover:hover) and (pointer:fine)').matches);
  var reduceMotion = !!(window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches);
  var lang = localStorage.getItem('u404-lang') === 'en' ? 'en' : 'es';
  var archiveOpen = false;
  var rafCursor = 0, mouseX = -100, mouseY = -100, ringX = -100, ringY = -100;
  var revealObserver = null;
  var mutationTimer = 0;

  function esc(value){return String(value == null ? '' : value).replace(/[&<>"']/g,function(ch){return {'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[ch];});}
  function norm(value){return String(value || '').toLowerCase().normalize ? String(value || '').toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g,'') : String(value || '').toLowerCase();}
  function pad(n){return String(n).padStart(3,'0');}
  function tr(es,en){return lang === 'en' ? en : es;}

  var TEXT_EN = {
    'Explorar':'Explore','Inicio':'Home','Qué quieres hacer':'What do you want to do','Novedades':'New','Destacadas':'Featured','Catálogo':'Catalog','Control Center':'Control Center','Mundos':'Worlds','Apariencia':'Appearance','Buscar apps':'Search apps',
    'Conexión detectada':'Connection detected','Sin conexión detectada':'No connection detected','CONEXIÓN DETECTADA':'CONNECTION DETECTED','SIN CONEXIÓN DETECTADA':'NO CONNECTION DETECTED',
    'Tu ecosistema digital.':'Your digital ecosystem.','apps, un solo universo.':'apps, one universe.','Herramientas, escritura, diseño, IA, sistemas, cultura y ficción interactiva reunidos en un portal estático con preferencias locales.':'Tools, writing, design, AI, systems, culture and interactive fiction brought together in a static portal with local preferences.',
    'Buscar en Universo 404':'Search Universe 404','Sorpréndeme':'Surprise me','Presentación':'Presentation','Instalar portal':'Install portal','apps':'apps','mundos':'worlds','categorías':'categories','exploradas':'explored','SEÑAL DESTACADA · AHORA':'FEATURED SIGNAL · NOW','Abrir ficha':'Open card',
    'Acceso por intención':'Access by intent','¿Qué quieres hacer?':'What do you want to do?','Entra por objetivo y el sistema seleccionará las apps relacionadas.':'Choose a goal and the system will select related apps.',
    'Crear':'Create','Ideas, contenido y herramientas':'Ideas, content and tools','Escribir':'Write','Novela, narrativa y texto':'Novel, narrative and text','Diseñar':'Design','Imagen, UI y creación visual':'Image, UI and visual creation','Investigar':'Research','Datos, cultura y conocimiento':'Data, culture and knowledge','Organizar':'Organize','Productividad, sistema y utilidades':'Productivity, systems and utilities','Jugar':'Play','Juegos, horror y ficción':'Games, horror and fiction','Aprender':'Learn','Formación, idiomas y cultura':'Learning, languages and culture',
    'App destacada':'Featured app','SELECCIÓN DEL SISTEMA':'SYSTEM SELECTION','Ver ficha':'View details','Abrir app ↗':'Open app ↗','Abrir repositorio ↗':'Open repository ↗','Tu espacio':'Your space','Favoritos':'Favorites','Guardados solo en este navegador.':'Stored only in this browser.','Actividad local':'Local activity','Abiertas recientemente':'Recently opened','Limpiar':'Clear',
    'Discovery Center':'Discovery Center','Últimas incorporaciones':'Latest additions','Las seis aplicaciones añadidas más recientemente al catálogo.':'The six most recently added applications.','Selección 404':'404 Selection','Imprescindibles':'Essentials','Una muestra representativa del ecosistema.':'A representative sample of the ecosystem.',
    'Estado del ecosistema':'Ecosystem status','Datos calculados en tiempo real desde el catálogo.':'Data calculated in real time from the catalog.','apps catalogadas':'cataloged apps','Catálogo completo':'Full catalog','Explora todas las aplicaciones, filtra por tecnología y cambia la vista.':'Explore all applications, filter by technology and change the view.',
    'Mostrando':'Showing','de':'of','Cuadrícula':'Grid','Lista':'List','Recomendadas':'Recommended','Más recientes':'Newest','Nombre A–Z':'Name A–Z','Categoría':'Category','Favoritas primero':'Favorites first','Sin filtros':'No filters','Filtros activos':'Active filters',
    'Sin coincidencias':'No matches','Prueba otra búsqueda o elimina los filtros activos.':'Try another search or remove active filters.','Restablecer filtros':'Reset filters','Resultados':'Results','Recientes y destacadas':'Recent and featured','Apps destacadas':'Featured apps','navegar':'navigate','abrir':'open','apps locales':'local apps',
    'Cerrar ficha':'Close details','Favorita':'Favorite','Compartir ficha':'Share','Salto entre dispositivos':'Cross-device jump','Abrir desde el móvil':'Open on mobile','Escanea este código. Se genera localmente y no envía la dirección a ningún servidor.':'Scan this code. It is generated locally and does not send the address to any server.','Descargar QR':'Download QR','Conexiones 404':'404 Connections','También te puede servir':'You may also like',
    'Anterior':'Previous','Siguiente':'Next','Usa ← → para navegar y Escape para salir.':'Use ← → to navigate and Escape to exit.','Intensidad del movimiento':'Motion intensity','Reducido':'Reduced','Equilibrado':'Balanced','Cinematográfico':'Cinematic','Elige una atmósfera. La selección se guarda solo en este navegador.':'Choose an atmosphere. Your choice is stored only in this browser.'
  };

  function setupLoader(){
    var loader = document.getElementById('u404-loader');
    if(!loader){
      loader = document.createElement('div'); loader.id='u404-loader'; loader.className='u404-loader'; loader.setAttribute('aria-hidden','true');
      loader.innerHTML='<div class="u404-loader-inner"><div class="u404-loader-meta"><span>I. ROIG · PORTAL APPS 404</span><span>101 SYSTEMS</span></div><div class="u404-loader-count"><span id="u404-loader-count">000</span></div><div class="u404-loader-track"><div class="u404-loader-bar" id="u404-loader-bar"></div></div></div>';
      document.body.insertBefore(loader,document.body.firstChild);
    }
    var count=document.getElementById('u404-loader-count'), bar=document.getElementById('u404-loader-bar');
    var started=performance.now(), duration=reduceMotion?100:660;
    function frame(now){
      var p=Math.min(1,(now-started)/duration), eased=1-Math.pow(1-p,3), value=Math.round(eased*100);
      if(count) count.textContent=String(value).padStart(3,'0'); if(bar) bar.style.width=value+'%';
      if(p<1) requestAnimationFrame(frame); else window.setTimeout(function(){document.documentElement.classList.add('u404-loaded');},reduceMotion?0:90);
    }
    requestAnimationFrame(frame);
    window.setTimeout(function(){document.documentElement.classList.add('u404-loaded');},1500);
  }

  function setupScrollProgress(){
    if(document.querySelector('.u404-scroll-progress')) return;
    var el=document.createElement('div'); el.className='u404-scroll-progress'; document.body.appendChild(el);
    function update(){var max=Math.max(1,document.documentElement.scrollHeight-window.innerHeight); el.style.transform='scaleX('+Math.min(1,window.scrollY/max)+')';}
    window.addEventListener('scroll',update,{passive:true}); update();
  }

  function setupCursor(){
    if(!finePointer || reduceMotion) return;
    var dot=document.createElement('div'), ring=document.createElement('div'), label=document.createElement('div');
    dot.className='u404-cursor'; ring.className='u404-cursor-ring'; label.className='u404-cursor-label'; label.textContent='VER';
    document.body.append(dot,ring,label); document.documentElement.classList.add('has-custom-cursor');
    var queued=false,lastX=-100,lastY=-100;
    function paint(){
      queued=false;
      var t='translate3d('+lastX+'px,'+lastY+'px,0) translate(-50%,-50%)';
      dot.style.transform=t; ring.style.transform=t; label.style.transform=t;
    }
    document.addEventListener('pointermove',function(e){
      lastX=e.clientX; lastY=e.clientY;
      if(!queued){queued=true;requestAnimationFrame(paint);}
    },{passive:true});
    document.addEventListener('pointerover',function(e){
      var view=e.target.closest && e.target.closest('[data-app],.app-open,.row-open,.small-tile,.archive-card');
      var action=e.target.closest && e.target.closest('a,button,input,select');
      document.documentElement.classList.toggle('cursor-view',!!view);
      document.documentElement.classList.toggle('cursor-action',!view&&!!action);
    });
    document.addEventListener('pointerout',function(e){if(!e.relatedTarget){document.documentElement.classList.remove('cursor-view','cursor-action');}});
  }

  function injectTicker(){
    var hero=document.querySelector('.hero-os'); if(!hero || document.getElementById('cine-ticker')) return;
    var ticker=document.createElement('div'); ticker.id='cine-ticker'; ticker.className='cine-ticker'; ticker.setAttribute('data-cine-owned','');
    var chunk='<span>I. ROIG</span><b>✦</b><span>101 APPS</span><b>✦</b><span>UNIVERSO 404</span><b>✦</b><span>LOCAL-FIRST</span><b>✦</b><span>GAMES</span><b>✦</b><span>SYSTEMS</span><b>✦</b><span>PWA</span><b>✦</b><span>NO FRAMEWORKS</span><b>✦</b>';
    ticker.innerHTML='<div class="cine-ticker-track">'+chunk+chunk+'</div>'; hero.insertAdjacentElement('afterend',ticker);
  }

  function decorateCards(scope){
    var root=scope||document;
    root.querySelectorAll('.app-card:not(.cine-decorated)').forEach(function(card){
      card.classList.add('cine-decorated','u404-tilt');
      if(!card.querySelector('.card-marquee')){
        var title=card.querySelector('strong'), name=title?title.textContent.trim():'UNIVERSO 404', m=document.createElement('div');
        m.className='card-marquee'; m.setAttribute('data-cine-owned','');
        m.innerHTML='<span>'+esc(name)+' · '+esc(name)+' · '+esc(name)+' · '+esc(name)+' · </span>';
        card.appendChild(m);
      }
    });
    root.querySelectorAll('.intent-card:not(.cine-decorated),.small-tile:not(.cine-decorated)').forEach(function(el){el.classList.add('cine-decorated','u404-tilt');});
  }

  function setupTilt(){
    if(!finePointer || reduceMotion) return;
    var queued=false,lastEvent=null,lastEl=null;
    function paint(){
      queued=false;
      var e=lastEvent,el=lastEl;
      if(!e||!el||!document.documentElement.contains(el))return;
      var r=el.getBoundingClientRect();
      if(!r.width||!r.height)return;
      var nx=(e.clientX-r.left)/r.width-.5, ny=(e.clientY-r.top)/r.height-.5;
      el.style.setProperty('--px',(((nx+.5)*100).toFixed(1))+'%');
      el.style.setProperty('--py',(((ny+.5)*100).toFixed(1))+'%');
      el.style.transform='perspective(920px) rotateX('+(-ny*2.6).toFixed(2)+'deg) rotateY('+(nx*3.2).toFixed(2)+'deg) translateY(-1px)';
    }
    document.addEventListener('pointermove',function(e){
      var el=e.target.closest && e.target.closest('.u404-tilt'); if(!el) return;
      lastEvent=e; lastEl=el;
      if(!queued){queued=true;requestAnimationFrame(paint);}
    },{passive:true});
    document.addEventListener('pointerout',function(e){var el=e.target.closest&&e.target.closest('.u404-tilt');if(el && (!e.relatedTarget || !el.contains(e.relatedTarget))) el.style.transform='';});
  }

  function setupParallax(){
    if(reduceMotion) return;
    var scrollQueued=false,pointerQueued=false,px=0;
    function applyScroll(){
      scrollQueued=false;
      var hero=document.querySelector('.hero-copy');if(hero){var y=Math.min(11,window.scrollY*.015);hero.style.setProperty('--cine-hero-y',y+'px');}
      var spot=document.querySelector('.spot-card');if(spot){var r=spot.getBoundingClientRect(),center=r.top+r.height/2-window.innerHeight/2,sy=Math.max(-7,Math.min(7,-center*.016));spot.style.setProperty('--cine-spot-y',sy+'px');}
    }
    function applyPointer(){pointerQueued=false;var hero=document.querySelector('.hero-copy');if(hero)hero.style.setProperty('--cine-hero-x',px.toFixed(2)+'px');}
    window.addEventListener('scroll',function(){if(!scrollQueued){scrollQueued=true;requestAnimationFrame(applyScroll);}},{passive:true});
    if(finePointer) document.addEventListener('pointermove',function(e){px=(e.clientX/window.innerWidth-.5)*3.5;if(!pointerQueued){pointerQueued=true;requestAnimationFrame(applyPointer);}},{passive:true});
    applyScroll();
  }

  function cleanupLegacyCinematicReveals(){
    document.querySelectorAll('.cine-reveal,.cine-visible,.cine-scanned').forEach(function(el){
      el.classList.remove('cine-reveal','cine-visible','cine-scanned');
    });
  }

  function visibilityFailsafe(){
    window.setTimeout(function(){
      document.querySelectorAll('.section-head,.intent-card,.spot-card,.small-tile,.featured-grid .app-card,.control-panel,.catalog-section').forEach(function(el){
        if(!el.classList.contains('is-visible')) el.classList.add('is-visible');
      });
    },1200);
  }

  function imageForApp(a){return a && a.screenshot ? a.screenshot : '';}
  function openAppByName(name,replace){
    closeArchive(false);
    try{var url=new URL(window.location.href);url.searchParams.set('app',name);if(replace)window.history.replaceState({},'',url);else window.history.pushState({},'',url);window.dispatchEvent(new PopStateEvent('popstate'));}catch(e){var existing=document.querySelector('[data-app="'+CSS.escape(name)+'"]');if(existing)existing.click();}
  }

  function archiveHTML(){
    var cards=APPS.map(function(a,i){var img=imageForApp(a);return '<button class="archive-card" type="button" data-archive-app="'+esc(a.name)+'"><span class="archive-card-index">'+pad(i+1)+'</span><span class="archive-card-visual">'+(img?'<img src="'+esc(img)+'" alt="" loading="lazy" decoding="async">':'<span class="archive-card-fallback">'+esc(a.icon||'404')+'</span>')+'</span><span class="archive-card-copy"><strong>'+esc(a.name)+'</strong><small>'+esc(a.category)+'</small></span></button>';}).join('');
    return '<div class="visual-archive-overlay" id="visual-archive" role="dialog" aria-modal="true" aria-labelledby="visual-archive-title"><div class="visual-archive-head"><div class="visual-archive-title"><h2 id="visual-archive-title">'+tr('Archivo visual','Visual archive')+'</h2><span>'+APPS.length+' '+tr('aplicaciones','applications')+'</span></div><div class="visual-archive-actions"><button type="button" id="archive-fullscreen" aria-label="'+tr('Pantalla completa','Fullscreen')+'" title="'+tr('Pantalla completa','Fullscreen')+'">⤢</button><button type="button" id="archive-close" aria-label="'+tr('Cerrar','Close')+'" title="'+tr('Cerrar','Close')+'">×</button></div></div><div class="visual-archive-toolbar"><input class="visual-archive-search" id="archive-search" type="search" autocomplete="off" placeholder="'+tr('Filtrar las 101 apps…','Filter 101 apps…')+'" aria-label="'+tr('Filtrar archivo visual','Filter visual archive')+'"><span class="visual-archive-count" id="archive-count">'+APPS.length+' / '+APPS.length+'</span></div><div class="visual-archive-grid" id="archive-grid">'+cards+'</div></div>';
  }

  function openArchive(){
    if(archiveOpen || !APPS.length) return; archiveOpen=true; document.body.insertAdjacentHTML('beforeend',archiveHTML()); document.body.classList.add('modal-open');
    var overlay=document.getElementById('visual-archive'), search=document.getElementById('archive-search'); if(search) search.focus();
    overlay.addEventListener('error',function(e){if(e.target&&e.target.tagName==='IMG'){var box=e.target.parentNode;if(box){box.innerHTML='<span class="archive-card-fallback">404</span>';}}},true);
    overlay.addEventListener('click',function(e){var card=e.target.closest('[data-archive-app]');if(card){openAppByName(card.getAttribute('data-archive-app'));return;}if(e.target===overlay)closeArchive();});
    document.getElementById('archive-close').onclick=function(){closeArchive();};
    document.getElementById('archive-fullscreen').onclick=function(){toggleFullscreen(overlay);};
    search.oninput=function(){var q=norm(search.value),visible=0;overlay.querySelectorAll('.archive-card').forEach(function(card){var show=!q||norm(card.textContent).indexOf(q)!==-1;card.hidden=!show;if(show)visible++;});document.getElementById('archive-count').textContent=visible+' / '+APPS.length;};
  }
  function closeArchive(focus){var el=document.getElementById('visual-archive');if(el)el.remove();archiveOpen=false;if(!document.querySelector('.overlay,.presentation-overlay'))document.body.classList.remove('modal-open');if(focus!==false){var b=document.getElementById('u404-archive-fab');if(b)b.focus();}}

  function toggleFullscreen(el){
    el=el||document.documentElement;
    try{if(!document.fullscreenElement && el.requestFullscreen)el.requestFullscreen();else if(document.fullscreenElement&&document.exitFullscreen)document.exitFullscreen();}catch(e){}
  }

  function injectArchiveLaunchers(){
    if(!document.getElementById('u404-archive-fab')){var fab=document.createElement('button');fab.id='u404-archive-fab';fab.className='u404-archive-fab';fab.setAttribute('data-cine-owned','');fab.type='button';fab.innerHTML='<span>▦</span><b>'+tr('Archivo visual','Visual archive')+'</b><em>'+APPS.length+'</em>';fab.onclick=openArchive;document.body.appendChild(fab);}
    var heroActions=document.querySelector('.hero-actions');if(heroActions&&!document.getElementById('open-visual-archive')){var b=document.createElement('button');b.id='open-visual-archive';b.className='ghost';b.setAttribute('data-cine-owned','');b.innerHTML='▦ '+tr('Archivo visual','Visual archive')+' <small>'+APPS.length+'</small>';b.onclick=openArchive;heroActions.appendChild(b);}
  }

  function injectLanguage(){
    var actions=document.querySelector('.top-actions'); if(!actions || document.getElementById('u404-lang')) return;
    var box=document.createElement('div');box.id='u404-lang';box.className='u404-lang';box.setAttribute('data-cine-owned','');box.setAttribute('role','group');box.setAttribute('aria-label','Idioma / Language');
    box.innerHTML='<button type="button" data-lang="es" aria-pressed="'+(lang==='es')+'">ES</button><i></i><button type="button" data-lang="en" aria-pressed="'+(lang==='en')+'">EN</button>';
    box.addEventListener('click',function(e){var b=e.target.closest('[data-lang]');if(!b)return;lang=b.getAttribute('data-lang');localStorage.setItem('u404-lang',lang);document.documentElement.lang=lang;try{window.dispatchEvent(new PopStateEvent('popstate'));}catch(err){}window.setTimeout(function(){applyLanguage();injectLanguage();refreshInjectedLabels();},0);});
    actions.insertBefore(box,actions.firstChild);
  }

  function translateTextNode(node){
    if(lang!=='en')return;var raw=node.nodeValue, trimmed=raw.trim();if(!trimmed)return;
    if(TEXT_EN[trimmed]){node.nodeValue=raw.replace(trimmed,TEXT_EN[trimmed]);return;}
    var m=trimmed.match(/^(\d+) apps, un solo universo\.$/);if(m)node.nodeValue=raw.replace(trimmed,m[1]+' apps, one universe.');
    var m2=trimmed.match(/^(\d+) sistemas$/);if(m2)node.nodeValue=raw.replace(trimmed,m2[1]+' systems');
  }
  function applyLanguage(){
    document.documentElement.lang=lang;
    if(lang==='es')return; // App.js renders Spanish; English is applied after each render.
    var walker=document.createTreeWalker(document.getElementById('app')||document.body,NodeFilter.SHOW_TEXT,{acceptNode:function(n){var p=n.parentElement;if(!p||/^(SCRIPT|STYLE|TEXTAREA)$/.test(p.tagName))return NodeFilter.FILTER_REJECT;return NodeFilter.FILTER_ACCEPT;}});var nodes=[];while(walker.nextNode())nodes.push(walker.currentNode);nodes.forEach(translateTextNode);
  }
  function refreshInjectedLabels(){
    var fab=document.getElementById('u404-archive-fab');if(fab)fab.innerHTML='<span>▦</span><b>'+tr('Archivo visual','Visual archive')+'</b><em>'+APPS.length+'</em>';
    var hero=document.getElementById('open-visual-archive');if(hero)hero.innerHTML='▦ '+tr('Archivo visual','Visual archive')+' <small>'+APPS.length+'</small>';
  }

  function selectedAppIndex(){var title=document.querySelector('#modal-title');if(!title)return-1;var name=title.textContent.trim();return APPS.findIndex(function(a){return a.name===name;});}
  function stepModal(delta){var idx=selectedAppIndex();if(idx<0||!APPS.length)return;idx=(idx+delta+APPS.length)%APPS.length;openAppByName(APPS[idx].name,true);}
  function applyFeaturedModalTheme(modal){
    if(!modal)return;
    modal.classList.remove('cine-theme-abyssal','cine-theme-night','cine-theme-quinqui');
    var title=modal.querySelector('#modal-title');
    var name=title?title.textContent.trim():'';
    if(name==='Abyssal-Descent')modal.classList.add('cine-theme-abyssal');
    else if(name==='Night-Shift-404')modal.classList.add('cine-theme-night');
    else if(name==='QUINQUI-404')modal.classList.add('cine-theme-quinqui');
  }
  function injectModalControls(){
    var modal=document.getElementById('app-modal');if(modal){applyFeaturedModalTheme(modal);}if(modal&&!modal.querySelector('.cine-modal-nav')){var nav=document.createElement('div');nav.className='cine-modal-nav';nav.setAttribute('data-cine-owned','');nav.innerHTML='<button type="button" data-cine-prev aria-label="'+tr('Aplicación anterior','Previous app')+'" title="'+tr('Anterior','Previous')+'">←</button><button type="button" data-cine-next aria-label="'+tr('Aplicación siguiente','Next app')+'" title="'+tr('Siguiente','Next')+'">→</button><button type="button" data-cine-full aria-label="'+tr('Pantalla completa','Fullscreen')+'" title="'+tr('Pantalla completa','Fullscreen')+'">⤢</button>';modal.appendChild(nav);nav.querySelector('[data-cine-prev]').onclick=function(){stepModal(-1);};nav.querySelector('[data-cine-next]').onclick=function(){stepModal(1);};nav.querySelector('[data-cine-full]').onclick=function(){toggleFullscreen(modal);};}
    var stage=document.getElementById('presentation-stage');if(stage&&!stage.querySelector('.presentation-fullscreen')){var fs=document.createElement('button');fs.className='presentation-fullscreen';fs.setAttribute('data-cine-owned','');fs.type='button';fs.textContent='⤢';fs.setAttribute('aria-label',tr('Pantalla completa','Fullscreen'));fs.onclick=function(){toggleFullscreen(stage);};stage.appendChild(fs);}
  }

  function scan(){
    cleanupLegacyCinematicReveals();
    injectTicker();
    decorateCards(document);
    injectArchiveLaunchers();
    injectLanguage();
    injectModalControls();
    if(lang==='en') applyLanguage();
    visibilityFailsafe();
  }

  function scheduleScan(){
    if(mutationTimer)return;
    mutationTimer=window.setTimeout(function(){mutationTimer=0;scan();},140);
  }
  function isOwnedNode(node){
    if(!node||node.nodeType!==1)return true;
    if(node.hasAttribute && node.hasAttribute('data-cine-owned'))return true;
    if(node.closest && node.closest('[data-cine-owned]'))return true;
    return false;
  }
  var observer=new MutationObserver(function(records){
    var meaningful=false;
    for(var i=0;i<records.length&&!meaningful;i++){
      var r=records[i];
      for(var j=0;j<r.addedNodes.length;j++){
        var n=r.addedNodes[j];
        if(n.nodeType===1 && !isOwnedNode(n)){meaningful=true;break;}
      }
      if(!meaningful){
        for(var k=0;k<r.removedNodes.length;k++){
          var x=r.removedNodes[k];
          if(x.nodeType===1 && !isOwnedNode(x)){meaningful=true;break;}
        }
      }
    }
    if(meaningful)scheduleScan();
  });
  observer.observe(document.getElementById('app')||document.body,{childList:true,subtree:true});

  document.addEventListener('keydown',function(e){
    if(archiveOpen){if(e.key==='Escape'){e.preventDefault();closeArchive();return;}if((e.ctrlKey||e.metaKey)&&e.key.toLowerCase()==='f'){var s=document.getElementById('archive-search');if(s){e.preventDefault();s.focus();}return;}}
    if(document.getElementById('app-modal')&&!document.getElementById('visual-archive')&&(e.key==='ArrowLeft'||e.key==='ArrowRight')){var tag=document.activeElement&&document.activeElement.tagName;if(tag==='INPUT'||tag==='SELECT'||tag==='TEXTAREA')return;e.preventDefault();stepModal(e.key==='ArrowRight'?1:-1);}
    if(e.key.toLowerCase()==='f' && e.shiftKey && !e.ctrlKey && !e.metaKey && !e.altKey){var active=document.getElementById('app-modal')||document.getElementById('presentation-stage');if(active){e.preventDefault();toggleFullscreen(active);}}
  },true);

  setupLoader();setupScrollProgress();setupCursor();setupTilt();setupParallax();cleanupLegacyCinematicReveals();scan();
})();
