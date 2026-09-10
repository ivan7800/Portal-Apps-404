import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import test from 'node:test';
import vm from 'node:vm';

const sandbox = { window: {} };
vm.runInNewContext(await readFile(new URL('../assets/data.js', import.meta.url), 'utf8'), sandbox);
vm.runInNewContext(await readFile(new URL('../assets/catalog-utils.js', import.meta.url), 'utf8'), sandbox);

const data = sandbox.window.PORTAL_DATA;
const catalog = sandbox.window.PORTAL_CATALOG;
const aliases = {
  'SECOND-BRAIN-404': 'notas obsidian rag documentos conocimiento segundo cerebro'
};

test('el catálogo usa el esquema v2 y conserva sus invariantes', () => {
  assert.equal(data.META.schemaVersion, 2);
  assert.equal(data.META.release, 'v41.5');
  assert.equal(data.APPS.length, 94);
  assert.equal(Object.keys(data.LANGUAGES).length, 94);
  assert.equal(new Set(data.APPS.map(app => app.name)).size, 94);
  assert.equal(new Set(data.APPS.map(app => app.saga)).size, 7);
});

test('todas las fichas declaran estado verificable y tipo de entrega', () => {
  for (const app of data.APPS) {
    assert.match(app.status, /^(catalogued|experimental|archived)$/);
    assert.match(app.availability, /^(verified|unverified|unavailable)$/);
    assert.match(app.offline, /^(declared|not-declared)$/);
    assert.match(app.platform, /^(web|webassembly|hybrid-windows)$/);
    assert.match(app.delivery, /^(web-app|repository)$/);
  }
});

test('la búsqueda normaliza acentos y utiliza alias editoriales', () => {
  const mythos = data.APPS.find(app => app.name === 'MYTHOS-404');
  const brain = data.APPS.find(app => app.name === 'SECOND-BRAIN-404');
  assert.ok(catalog.searchScore(mythos, 'mitología', data.LANGUAGES, aliases) > 0);
  assert.ok(catalog.searchScore(mythos, 'mitologia', data.LANGUAGES, aliases) > 0);
  assert.ok(catalog.searchScore(brain, 'segundo cerebro', data.LANGUAGES, aliases) > 0);
  assert.equal(catalog.searchScore(brain, '', data.LANGUAGES, aliases), 0);
});

test('la coincidencia por nombre se prioriza', () => {
  const ranked = data.APPS
    .map(app => ({ name: app.name, score: catalog.searchScore(app, 'Ringtone', data.LANGUAGES, aliases) }))
    .sort((a, b) => b.score - a.score);
  assert.equal(ranked[0].name, 'Ringtone-404');
});
