import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import test from 'node:test';

const index = await readFile(new URL('../index.html', import.meta.url), 'utf8');
const app = await readFile(new URL('../assets/app.js', import.meta.url), 'utf8');
const styles = await readFile(new URL('../assets/styles.css', import.meta.url), 'utf8');
const manifest = JSON.parse(await readFile(new URL('../manifest.webmanifest', import.meta.url), 'utf8'));
const serviceWorker = await readFile(new URL('../sw.js', import.meta.url), 'utf8');
const audit = await readFile(new URL('../scripts/audit.mjs', import.meta.url), 'utf8');
const qrLite = await readFile(new URL('../assets/qr-lite.js', import.meta.url), 'utf8');

test('la página contiene un único landmark principal en tiempo de ejecución', () => {
  assert.doesNotMatch(index, /<main[^>]+id=["']app["']/i);
  assert.match(index, /href=["']#main-content["']/i);
  assert.match(app, /<main class="workspace" id="main-content" tabindex="-1">/);
});

test('los recursos críticos llevan versión explícita para evitar caché antigua', () => {
  assert.match(index, /assets\/styles\.css\?v=41\.16/);
  assert.match(index, /assets\/app\.js\?v=41\.16/);
  assert.match(index, /assets\/data\.js\?v=41\.16/);
});

test('la búsqueda evita reconstruir toda la aplicación', () => {
  const partialUpdate = app.match(/function updateCatalogOnly\(\) \{([\s\S]*?)\n  function renderPaletteBody/)?.[1] || '';
  assert.match(partialUpdate, /catalog-content/);
  assert.match(partialUpdate, /catalogContentHTML\(catalog\(\)\)/);
  assert.doesNotMatch(partialUpdate, /root\.innerHTML/);
});

test('el buscador universal expone selección activa accesible', () => {
  assert.match(app, /role="combobox"/);
  assert.match(app, /aria-activedescendant/);
  assert.match(app, /role="listbox"/);
  assert.match(app, /role="option"/);
});

test('el progreso de exploración usa semántica de medidor accesible', () => {
  assert.match(app, /class="exploration-meter" role="progressbar"/);
  assert.match(app, /aria-valuemin="0" aria-valuemax="100" aria-valuenow=/);
});

test('las funciones premium son locales y accesibles', () => {
  assert.match(app, /function presentationHTML/);
  assert.match(app, /id="presentation-stage" role="dialog" aria-modal="true"/);
  assert.match(app, /id="app-qr"/);
  assert.match(app, /window\.QRLite\.draw/);
  assert.match(qrLite, /global\.QRLite=/);
  assert.doesNotMatch(app, /api\.qrserver|chart\.googleapis/);
});

test('la ficha se cierra al primer toque y la cruz queda centrada', () => {
  const closeApp = app.match(/function closeApp\(\) \{([\s\S]*?)\n  function openPalette/)?.[1] || '';
  assert.match(closeApp, /if \(!state\.selectedApp \|\| appClosing\) return/);
  assert.ok(closeApp.indexOf('state.selectedApp = null') < closeApp.indexOf('syncURL(false)'));
  assert.doesNotMatch(closeApp, /animateClose\('modal-overlay'/);
  assert.match(styles, /\.modal-close\{[^}]*width:48px[^}]*height:48px[^}]*display:grid[^}]*place-items:center[^}]*touch-action:manipulation/);
  assert.match(styles, /\.modal-close:before\{[^}]*transform:translateY\(3px\)/);
  assert.match(styles, /\.app-modal\{[^}]*max-height:calc\(100dvh[^}]*margin:auto/);
  assert.match(app, /if \(target\.closest\('#close-modal'\)\)/);
  assert.match(app, /document\.addEventListener\('click', function \(event\)/);
  assert.doesNotMatch(app, /addEventListener\('pointerup'/);
});

test('el catálogo no incluye una barra de búsqueda redundante', () => {
  assert.doesNotMatch(app, /id="catalog-search-form"/);
  assert.doesNotMatch(app, /id="q" name="buscar"/);
  assert.match(app, /id="open-palette-top"/);
});

test('las portadas de ficha se muestran completas y centradas', () => {
  assert.match(styles, /\.modal-shot \.modal-shot-visual img\{[^}]*object-fit:contain[^}]*object-position:50% 50%/);
  assert.ok(styles.lastIndexOf('.modal-shot .modal-shot-visual img') > styles.lastIndexOf('.app-shot img'));
  assert.match(styles, /\.modal-heading\{padding-right:56px/);
});

test('manifest y caché usan la release v41.16 y rutas relativas', () => {
  assert.equal(manifest.id, './');
  assert.equal(manifest.start_url, './');
  assert.equal(manifest.scope, './');
  assert.match(serviceWorker, /v41-16-no-redraw-filters/);
  assert.match(serviceWorker, /key\.startsWith\(CACHE_PREFIX\)/);
});

test('el auditor ignora metadatos del clon y dependencias locales', () => {
  assert.match(audit, /new Set\(\['\.git', 'node_modules'\]\)/);
  assert.doesNotMatch(audit, /debe mantenerse por debajo de 100/);
});


test('la versión visible y el registro del service worker coinciden con v41.16', () => {
  assert.match(app, /var VERSION = 'v41\.16 No-Redraw Filters'/);
  assert.match(app, /register\('\.\/sw\.js\?v=41\.16'\)/);
});

test('los controles del catálogo usan delegación persistente', () => {
  assert.match(app, /function setCatalogView\(nextView\)/);
  assert.match(app, /function setCatalogTechnology\(value\)/);
  assert.match(app, /function setCatalogSort\(value\)/);
  assert.match(app, /var view = target\.closest\('\[data-view\]'\)/);
  assert.match(app, /data-toggle-catalog-menu/);
  assert.match(app, /data-tech-filter/);
  assert.match(app, /data-catalog-sort/);
  assert.match(app, /target\.closest\('#clear-filter'\)/);
});
