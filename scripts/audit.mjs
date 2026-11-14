#!/usr/bin/env node
import { readFile, readdir, stat } from 'node:fs/promises';
import { existsSync } from 'node:fs';
import { dirname, join, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';
import vm from 'node:vm';
import { MIN_CATALOG_APPS, ALLOWED_PLATFORMS } from './catalog-policy.mjs';

const root = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const online = process.argv.includes('--online');
const errors = [];
const warnings = [];
const ignoredDirectories = new Set(['.git', 'node_modules']);

function fail(message) { errors.push(message); }
function warn(message) { warnings.push(message); }

async function walk(directory) {
  const entries = await readdir(directory);
  const files = [];
  for (const entry of entries) {
    if (ignoredDirectories.has(entry)) continue;
    const path = join(directory, entry);
    const info = await stat(path);
    if (info.isDirectory()) files.push(...await walk(path));
    else files.push(path);
  }
  return files;
}

const source = await readFile(join(root, 'assets/data.js'), 'utf8');
const sandbox = { window: {} };
vm.runInNewContext(source, sandbox, { filename: 'assets/data.js' });
const data = sandbox.window.PORTAL_DATA;
if (!data || !Array.isArray(data.APPS)) fail('assets/data.js no expone un catálogo APPS válido.');
if (data?.META?.schemaVersion !== 2) fail('assets/data.js no usa el esquema de catálogo v2.');
const release = data?.META?.release;
if (!/^v\d+\.\d+$/.test(release || '')) fail('assets/data.js no declara una release válida.');
const indexHTML = await readFile(join(root, 'index.html'), 'utf8');
const extensionScripts = [...indexHTML.matchAll(/<script src="(assets\/[a-z0-9-]+\.js)(?:\?[^"]*)?" defer><\/script>/gi)]
  .map(match => match[1])
  .filter(path => !['assets/data.js', 'assets/app.js', 'assets/catalog-utils.js', 'assets/qr-lite.js', 'assets/cinematic.js'].includes(path));
for (const path of extensionScripts) {
  const extension = await readFile(join(root, path), 'utf8');
  vm.runInNewContext(extension, sandbox, { filename: path });
}

const apps = data?.APPS || [];
if (!apps.length) fail('El catálogo APPS está vacío.');
if (apps.length < MIN_CATALOG_APPS) fail(`Regresión del catálogo: se esperaban al menos ${MIN_CATALOG_APPS} aplicaciones y se encontraron ${apps.length}.`);
const required = ['name', 'short', 'category', 'saga', 'icon', 'screenshot', 'pages', 'github', 'status', 'availability', 'offline', 'platform', 'delivery'];
const seen = { name: new Map(), pages: new Map(), github: new Map() };
const allowed = {
  status: new Set(['catalogued', 'experimental', 'archived']),
  availability: new Set(['verified', 'unverified', 'unavailable']),
  offline: new Set(['declared', 'not-declared']),
  platform: ALLOWED_PLATFORMS,
  delivery: new Set(['web-app', 'repository', 'server-app', 'desktop-app'])
};

for (const [index, app] of apps.entries()) {
  const label = app.name || `Registro ${index + 1}`;
  for (const field of required) if (!String(app[field] || '').trim()) fail(`${label}: falta “${field}”.`);
  for (const [field, values] of Object.entries(allowed)) if (!values.has(app[field])) fail(`${label}: valor inválido en “${field}” (${app[field]}).`);
  for (const field of Object.keys(seen)) {
    const value = String(app[field] || '').toLowerCase();
    if (!value) continue;
    if (seen[field].has(value)) fail(`${label}: ${field} duplicado con ${seen[field].get(value)}.`);
    else seen[field].set(value, label);
  }
  for (const field of ['pages', 'github']) {
    try {
      const url = new URL(app[field]);
      if (url.protocol !== 'https:') fail(`${label}: ${field} no usa HTTPS.`);
    } catch { fail(`${label}: ${field} no es una URL válida.`); }
  }
  const shot = resolve(root, app.screenshot || '');
  if (!shot.startsWith(root + '/') || !existsSync(shot)) fail(`${label}: captura no encontrada (${app.screenshot}).`);
  if (!data.LANGUAGES?.[app.name]) warn(`${label}: tecnología no declarada; se mostrará JavaScript.`);
  if (app.delivery === 'repository' && app.pages !== app.github) fail(`${label}: delivery repository requiere pages y github idénticos.`);
}

if (Object.keys(data.LANGUAGES || {}).length !== apps.length) fail('LANGUAGES y APPS no tienen el mismo número de entradas.');

const sagas = [...new Set(apps.map(app => app.saga))];
if (sagas.length !== 7) fail(`El mapa orbital requiere 7 mundos y el catálogo declara ${sagas.length}.`);

const files = await walk(root);
// El tamaño o número de archivos no determina por sí mismo un fallo.
const referencedScreenshots = new Set(apps.map(app => app.screenshot));
for (const name of await readdir(join(root, 'assets', 'screenshots'))) {
  const path = 'assets/screenshots/' + name;
  if (!referencedScreenshots.has(path)) warn('Carátula sin ficha activa: ' + path);
}
const loadedScripts = new Set(
  [...indexHTML.matchAll(/<script\b[^>]*\bsrc=["'](assets\/[^"'?]+\.js)(?:\?[^"']*)?["']/g)]
    .map(match => match[1])
);
for (const name of await readdir(join(root, 'assets'))) {
  if (name.endsWith('.js') && !loadedScripts.has('assets/' + name)) {
    warn('Script no cargado por index.html: assets/' + name);
  }
}

const appSource = await readFile(join(root, 'assets/app.js'), 'utf8');
const cinematicSource = await readFile(join(root, 'assets/cinematic.js'), 'utf8');
const serviceWorker = await readFile(join(root, 'sw.js'), 'utf8');
const readme = await readFile(join(root, 'README.md'), 'utf8');
const releaseNumber = String(release || '').replace(/^v/, '');
const expectedCacheVersion = releaseNumber.replace(/\./g, '-');
if (!appSource.includes(`var VERSION = '${release} · Release Sync'`)) fail('assets/app.js y assets/data.js no declaran la misma release visible.');
if (/^\d{4}-\d{2}-\d{2}$/.test(data?.META?.updated || '')) {
  const updated = new Intl.DateTimeFormat('es-ES', { day: 'numeric', month: 'long', year: 'numeric', timeZone: 'UTC' })
    .format(new Date(`${data.META.updated}T12:00:00Z`));
  if (!appSource.includes(`var UPDATED = '${updated}'`)) fail('assets/app.js no refleja la fecha real de actualización del catálogo.');
} else fail('assets/data.js: fecha META.updated inválida o ausente.');
if (!appSource.includes(`sw.js?v=${releaseNumber}`)) fail('assets/app.js registra un Service Worker con una versión distinta.');
if (!new RegExp(`v${expectedCacheVersion}(?:-|')`).test(serviceWorker)) fail('sw.js y assets/data.js no comparten la versión de caché.');
for (const match of indexHTML.matchAll(/(?:src|href)=["'](assets\/[^"'?#]+)(?:\?v=([^"'&]+))?["']/g)) {
  if (/\.(?:css|js)$/i.test(match[1]) && match[2] !== releaseNumber) fail(`index.html: ${match[1]} no usa la versión global ${releaseNumber}.`);
}
if (!/window\.PORTAL_DATA\.APPS\.length/.test(cinematicSource) || /\b101 APPS\b/.test(cinematicSource)) fail('assets/cinematic.js debe obtener el recuento del catálogo.');
if (/\b91\s+(?:apps|aplicaciones)\b/i.test(indexHTML)) fail('index.html contiene un recuento fijo de aplicaciones.');
if (!/Content-Security-Policy/i.test(indexHTML)) warn('index.html no declara una política CSP.');
if (/<main[^>]+id=["']app["']/i.test(indexHTML)) fail('index.html usa <main id="app"> y la aplicación inserta otro <main>; los landmarks quedarían anidados.');
if (!/href=["']#main-content["']/i.test(indexHTML)) fail('index.html: el enlace de salto no apunta al contenido principal.');
if (!/assets\/data\.js/.test(readme)) fail('README.md debe mencionar assets/data.js.');
if (!/assets\/data\.js[\s\S]*assets\/catalog-utils\.js[\s\S]*assets\/app\.js/.test(indexHTML)) fail('index.html: el orden de scripts del catálogo no es válido.');
for (const match of indexHTML.matchAll(/(?:src|href)=["']([^"'#?]+)["']/g)) {
  const reference = match[1];
  if (/^(?:https?:|mailto:|tel:)/i.test(reference)) continue;
  if (!existsSync(join(root, reference.replace(/^\.\//, '')))) fail(`index.html: recurso local inexistente (${reference}).`);
}

let manifest;
try { manifest = JSON.parse(await readFile(join(root, 'manifest.webmanifest'), 'utf8')); }
catch (error) { fail(`manifest.webmanifest: JSON inválido (${error.message}).`); }
if (manifest) {
  for (const field of ['name', 'short_name', 'id', 'start_url', 'scope', 'display']) {
    if (!String(manifest[field] || '').trim()) fail(`manifest.webmanifest: falta “${field}”.`);
  }
  if (manifest.start_url !== './' || manifest.scope !== './') fail('manifest.webmanifest: start_url y scope deben ser relativos para GitHub Pages.');
  const iconSizes = new Set((manifest.icons || []).map(icon => icon.sizes));
  for (const size of ['192x192', '512x512']) if (!iconSizes.has(size)) fail(`manifest.webmanifest: falta el icono ${size}.`);
  for (const icon of manifest.icons || []) {
    if (!existsSync(join(root, icon.src || ''))) fail(`manifest.webmanifest: icono inexistente (${icon.src || 'sin ruta'}).`);
  }
}

const coreMatch = serviceWorker.match(/const\s+CORE\s*=\s*\[(.*?)\];/s);
if (!coreMatch) fail('sw.js: no se pudo localizar la lista CORE.');
else {
  const items = [...coreMatch[1].matchAll(/['"](.+?)['"]/g)].map(match => match[1].replace(/^\.\//, ''));
  if (items.length !== new Set(items).size) fail('sw.js: CORE contiene rutas duplicadas.');
  let shellBytes = 0;
  for (const item of items) {
    if (item.startsWith('assets/screenshots/')) fail('sw.js: no se deben precargar carátulas: ' + item);
    const filename = join(root, item);
    if (item && item !== '.' && !existsSync(filename)) {
      fail('sw.js: recurso CORE inexistente (' + item + ').');
    } else if (item && item !== '.' && existsSync(filename)) {
      const entry = await stat(filename);
      if (entry.isFile()) shellBytes += entry.size;
    }
  }
  if (shellBytes > 5 * 1024 * 1024) warn('sw.js: la instalación supera 5 MiB (' + shellBytes + ' bytes).');
  if (!serviceWorker.includes('async function assetResponse(') ||
      !serviceWorker.includes('await cache.put(request, response.clone())')) {
    fail('sw.js: falta la caché bajo demanda.');
  }
}
if (!/key\.startsWith\(CACHE_PREFIX\)/.test(serviceWorker)) fail('sw.js: la limpieza de caché no está aislada por prefijo.');

for (const requiredFile of ['.gitignore', 'CHANGELOG.md', 'package.json', 'package-lock.json', '.github/workflows/quality.yml']) {
  if (!existsSync(join(root, requiredFile))) fail(`Falta el archivo de release ${requiredFile}.`);
}

async function probe(url) {
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), 12000);
  try {
    let response = await fetch(url, { method: 'HEAD', redirect: 'follow', signal: controller.signal });
    if (response.status === 405) response = await fetch(url, { method: 'GET', redirect: 'follow', signal: controller.signal, headers: { Range: 'bytes=0-0' } });
    return { url, ok: response.ok, status: response.status };
  } catch (error) { return { url, ok: false, status: error.name || 'ERROR' }; }
  finally { clearTimeout(timer); }
}

if (online) {
  const urls = [...new Set(apps.flatMap(app => [app.pages, app.github]))];
  const queue = urls.slice();
  const results = [];
  await Promise.all(Array.from({ length: Math.min(8, queue.length) }, async () => {
    while (queue.length) results.push(await probe(queue.shift()));
  }));
  for (const result of results) {
    if (result.ok) continue;
    if (result.status === 404 || result.status === 410) fail(`Enlace HTTP roto (${result.status}): ${result.url}`);
    else warn(`Comprobación no concluyente (${result.status}): ${result.url}`);
  }
}

console.log(`Universo 404 · auditoría ${online ? 'local + online' : 'local'}`);
console.log(`Apps: ${apps.length} · Archivos: ${files.length} · Avisos: ${warnings.length} · Errores: ${errors.length}`);
for (const message of warnings) console.log(`AVISO: ${message}`);
for (const message of errors) console.error(`ERROR: ${message}`);
if (!online) console.log('Para comprobar las URLs publicadas: node scripts/audit.mjs --online');
process.exitCode = errors.length ? 1 : 0;
