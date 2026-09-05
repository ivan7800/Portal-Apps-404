#!/usr/bin/env node
import { readFile, readdir, stat } from 'node:fs/promises';
import { existsSync } from 'node:fs';
import { dirname, join, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';
import vm from 'node:vm';

const root = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const online = process.argv.includes('--online');
const errors = [];
const warnings = [];

function fail(message) { errors.push(message); }
function warn(message) { warnings.push(message); }

async function walk(directory) {
  const entries = await readdir(directory);
  const files = [];
  for (const entry of entries) {
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

const apps = data?.APPS || [];
const required = ['name', 'short', 'category', 'saga', 'icon', 'screenshot', 'pages', 'github'];
const seen = { name: new Map(), pages: new Map(), github: new Map() };

for (const [index, app] of apps.entries()) {
  const label = app.name || `Registro ${index + 1}`;
  for (const field of required) if (!String(app[field] || '').trim()) fail(`${label}: falta “${field}”.`);
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
}

const files = await walk(root);
if (files.length >= 100) fail(`El proyecto tiene ${files.length} archivos; debe mantenerse por debajo de 100.`);

const indexHTML = await readFile(join(root, 'index.html'), 'utf8');
if (/\b91\s+(?:apps|aplicaciones)\b/i.test(indexHTML)) fail('index.html contiene un recuento fijo de aplicaciones.');
if (!/Content-Security-Policy/i.test(indexHTML)) warn('index.html no declara una política CSP.');
for (const match of indexHTML.matchAll(/(?:src|href)=["']([^"'#?]+)["']/g)) {
  const reference = match[1];
  if (/^(?:https?:|mailto:|tel:)/i.test(reference)) continue;
  if (!existsSync(join(root, reference.replace(/^\.\//, '')))) fail(`index.html: recurso local inexistente (${reference}).`);
}

for (const jsonFile of ['manifest.webmanifest']) {
  try { JSON.parse(await readFile(join(root, jsonFile), 'utf8')); }
  catch (error) { fail(`${jsonFile}: JSON inválido (${error.message}).`); }
}

const coreMatch = (await readFile(join(root, 'sw.js'), 'utf8')).match(/const CORE=\[(.*?)\];/s);
if (!coreMatch) fail('sw.js: no se pudo localizar la lista CORE.');
else {
  for (const match of coreMatch[1].matchAll(/['"](.+?)['"]/g)) {
    const item = match[1].replace(/^\.\//, '');
    if (item && !existsSync(join(root, item))) fail(`sw.js: recurso CORE inexistente (${match[1]}).`);
  }
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
