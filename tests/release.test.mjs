import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import test from 'node:test';
import vm from 'node:vm';
import { MIN_CATALOG_APPS } from '../scripts/catalog-policy.mjs';

const index = await readFile(new URL('../index.html', import.meta.url), 'utf8');
const app = await readFile(new URL('../assets/app.js', import.meta.url), 'utf8');
const styles = await readFile(new URL('../assets/styles.css', import.meta.url), 'utf8');
const manifest = JSON.parse(await readFile(new URL('../manifest.webmanifest', import.meta.url), 'utf8'));
const serviceWorker = await readFile(new URL('../sw.js', import.meta.url), 'utf8');
const audit = await readFile(new URL('../scripts/audit.mjs', import.meta.url), 'utf8');
const qrLite = await readFile(new URL('../assets/qr-lite.js', import.meta.url), 'utf8');
const cinematicScript = await readFile(new URL('../assets/cinematic.js', import.meta.url), 'utf8');
const dataSource = await readFile(new URL('../assets/data.js', import.meta.url), 'utf8');
const dataSandbox = { window: {} };
vm.runInNewContext(dataSource, dataSandbox);
const data = dataSandbox.window.PORTAL_DATA;
const extensionScripts = [...index.matchAll(/<script src="(assets\/[a-z0-9-]+\.js)(?:\?[^"]*)?" defer><\/script>/gi)]
  .map(match => match[1])
  .filter(path => !['assets/data.js', 'assets/app.js', 'assets/catalog-utils.js', 'assets/qr-lite.js', 'assets/cinematic.js'].includes(path));
for (const path of extensionScripts) vm.runInNewContext(await readFile(new URL('../' + path, import.meta.url), 'utf8'), dataSandbox, { filename: path });

const releaseMatch = index.match(/assets\/styles\.css\?v=([0-9]+(?:\.[0-9]+)+)/);
assert.ok(releaseMatch, 'index.html debe versionar styles.css');
const releaseVersion = releaseMatch[1];
const escapedReleaseVersion = releaseVersion.replace(/\./g, '\\.');
const cacheReleaseVersion = releaseVersion.replace(/\./g, '-');

test('la página contiene un único landmark principal en tiempo de ejecución', () => {
  assert.doesNotMatch(index, /<main[^>]+id=["']app["']/i);
  assert.match(index, /href=["']#main-content["']/i);
  assert.match(app, /<main class="workspace" id="main-content" tabindex="-1">/);
});

test('número de apps, ticker, fecha y versión visible coinciden con el catálogo', () => {
  assert.ok(data.APPS.length >= MIN_CATALOG_APPS, `Catálogo reducido a ${data.APPS.length} aplicaciones`);
  const expectedDate = new Intl.DateTimeFormat('es-ES', { day: 'numeric', month: 'long', year: 'numeric', timeZone: 'UTC' })
    .format(new Date(`${data.META.updated}T12:00:00Z`));
  assert.ok(app.includes(`var UPDATED = '${expectedDate}'`));
  assert.match(cinematicScript, /var appCount=window\.PORTAL_DATA&&Array\.isArray\(window\.PORTAL_DATA\.APPS\)\?window\.PORTAL_DATA\.APPS\.length:0/);
  assert.doesNotMatch(cinematicScript, /101 APPS/);
  assert.ok(app.includes(`var VERSION = '${data.META.release} · Release Sync'`));
});

test('los recursos críticos llevan una versión explícita y coherente para evitar caché antigua', () => {
  assert.equal(releaseVersion, data.META.release.replace(/^v/, ''));
  const localResources = [...index.matchAll(/(?:src|href)="(assets\/[^"?#]+\.(?:css|js))(?:\?v=([^"&]+))?"/g)];
  assert.ok(localResources.length > 0);
  for (const [, path, version] of localResources) assert.equal(version, releaseVersion, path + ' debe usar la versión global del portal');
  assert.match(index, new RegExp(`assets\\/styles\\.css\\?v=${escapedReleaseVersion}`));
  assert.match(index, new RegExp(`assets\\/app\\.js\\?v=${escapedReleaseVersion}`));
  assert.match(index, new RegExp(`assets\\/data\\.js\\?v=${escapedReleaseVersion}`));
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
  assert.match(app, /document\.addEventListener\('pointerup', closeFromEvent, true\)/);
  assert.match(app, /document\.addEventListener\('click', closeFromEvent, true\)/);
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

test('manifest y caché usan la release actual y rutas relativas', () => {
  assert.equal(manifest.id, './');
  assert.equal(manifest.start_url, './');
  assert.equal(manifest.scope, './');
  assert.match(serviceWorker, new RegExp(`v${cacheReleaseVersion}(?:-|')`));
  assert.match(serviceWorker, /key\.startsWith\(CACHE_PREFIX\)/);
});

test('el auditor ignora metadatos del clon y dependencias locales', () => {
  assert.match(audit, /new Set\(\['\.git', 'node_modules'\]\)/);
  assert.doesNotMatch(audit, /debe mantenerse por debajo de 100/);
});


test('la versión base visible y el registro del service worker están versionados explícitamente', () => {
  assert.ok(app.includes(`var VERSION = '${data.META.release} · Release Sync'`));
  assert.match(app, new RegExp("register\\('\\.\\/sw\\.js\\?v=" + escapedReleaseVersion + "'\\)"));
  assert.equal(releaseVersion, data.META.release.replace(/^v/, ''));
  const localResources = [...index.matchAll(/(?:src|href)="(assets\/[^"?#]+\.(?:css|js))(?:\?v=([^"&]+))?"/g)];
  assert.ok(localResources.length > 0);
  for (const [, path, version] of localResources) assert.equal(version, releaseVersion, path + ' debe usar la versión global del portal');
});


test('filtros, orden y vista actualizan solo el catálogo sin saltar al inicio', () => {
  const wireBlock = app.match(/function wire\(\) \{([\s\S]*?)\n  \/\/ Keep critical interactions alive/)?.[1] || '';
  assert.match(wireBlock, /state\.view = nextView;[\s\S]*?updateCatalogOnly\(\)/);
  assert.match(wireBlock, /tech\.onchange[\s\S]*?updateCatalogOnly\(\)/);
  assert.match(wireBlock, /sort\.onchange[\s\S]*?updateCatalogOnly\(\)/);
  const viewHandler = wireBlock.match(/\[data-view\][\s\S]*?var tech =/)?.[0] || '';
  assert.doesNotMatch(viewHandler, /render\(\)|scrollToId/);
  const partialUpdate = app.match(/function updateCatalogOnly\(\) \{([\s\S]*?)\n  function renderPaletteBody/)?.[1] || '';
  assert.match(partialUpdate, /window\.scrollTo\(scrollX, scrollY\)/);
});
