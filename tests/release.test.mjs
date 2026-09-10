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
  assert.ok(closeApp.indexOf('state.selectedApp = null') < closeApp.indexOf("animateClose('modal-overlay'"));
  assert.match(styles, /\.modal-close\{[^}]*width:48px[^}]*height:48px[^}]*display:grid[^}]*place-items:center[^}]*touch-action:manipulation/);
  assert.match(styles, /\.app-modal\{[^}]*max-height:calc\(100dvh[^}]*margin:auto/);
});

test('manifest y caché usan la release v41.4 y rutas relativas', () => {
  assert.equal(manifest.id, './');
  assert.equal(manifest.start_url, './');
  assert.equal(manifest.scope, './');
  assert.match(serviceWorker, /v41-4-modal-polish/);
  assert.match(serviceWorker, /key\.startsWith\(CACHE_PREFIX\)/);
});

test('el auditor ignora metadatos del clon y dependencias locales', () => {
  assert.match(audit, /new Set\(\['\.git', 'node_modules'\]\)/);
  assert.doesNotMatch(audit, /debe mantenerse por debajo de 100/);
});
