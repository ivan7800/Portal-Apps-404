import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import test from 'node:test';
import vm from 'node:vm';
import { MIN_CATALOG_APPS, ALLOWED_PLATFORMS } from '../scripts/catalog-policy.mjs';

const sandbox = { window: {} };
vm.runInNewContext(await readFile(new URL('../assets/data.js', import.meta.url), 'utf8'), sandbox);
const indexHTML = await readFile(new URL('../index.html', import.meta.url), 'utf8');
const extensions = [...indexHTML.matchAll(/<script src="(assets\/[a-z0-9-]+\.js)(?:\?[^\"]*)?" defer><\/script>/gi)]
  .map(match => match[1])
  .filter(path => !['assets/data.js', 'assets/app.js', 'assets/catalog-utils.js', 'assets/qr-lite.js', 'assets/cinematic.js'].includes(path));
for (const path of extensions) {
  vm.runInNewContext(await readFile(new URL('../' + path, import.meta.url), 'utf8'), sandbox, { filename: path });
}
vm.runInNewContext(await readFile(new URL('../assets/catalog-utils.js', import.meta.url), 'utf8'), sandbox);

const data = sandbox.window.PORTAL_DATA;
const catalog = sandbox.window.PORTAL_CATALOG;
const aliases = {
  'SECOND-BRAIN-404': 'notas obsidian rag documentos conocimiento segundo cerebro'
};

test('el catálogo usa el esquema v2 y conserva sus invariantes', () => {
  assert.equal(data.META.schemaVersion, 2);
  assert.equal(data.META.release, 'v41.52');
  assert.ok(data.APPS.length >= MIN_CATALOG_APPS, `Catálogo reducido a ${data.APPS.length} aplicaciones`);
  assert.equal(Object.keys(data.LANGUAGES).length, data.APPS.length);
  assert.equal(new Set(data.APPS.map(app => app.name)).size, data.APPS.length);
  assert.equal(new Set(data.APPS.map(app => app.saga)).size, 7);
});

test('todas las fichas declaran estado verificable y tipo de entrega', () => {
  for (const app of data.APPS) {
    assert.match(app.status, /^(catalogued|experimental|archived)$/);
    assert.match(app.availability, /^(verified|unverified|unavailable)$/);
    assert.match(app.offline, /^(declared|not-declared)$/);
    assert.ok(ALLOWED_PLATFORMS.has(app.platform), `${app.name}: plataforma no reconocida (${app.platform})`);
    assert.match(app.delivery, /^(web-app|repository|server-app|desktop-app)$/);
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

test('las carátulas recientes son únicas y existen en el proyecto', async () => {
  const recentNames = ['LINUX-404', 'EIDOLON-404', 'VIRUS-MUSEUM-404', 'WONDERS-404', 'DAYTONA-404', 'VOYNICH-404', 'CHASE-404', 'DRIVE-THE-SUNSET', 'SANITY-404', 'DEAD-ROAD-404', 'NAMELESS-404', 'DEAD-CABIN-404', 'INTO-THE-ABYSS-404', 'MUTATION-404', 'DUNGEON-404'];
  const covers = new Set();
  for (const name of recentNames) {
    const app = data.APPS.find(item => item.name === name);
    assert.ok(app, name + ' debe figurar en el catálogo');
    const expectedPath = name === 'DUNGEON-404'
      ? 'assets/screenshots/DUNGEON-404-cinematic.jpg'
      : 'assets/screenshots/' + name + '.svg';
    assert.equal(app.screenshot, expectedPath);
    assert.ok(!covers.has(app.screenshot), name + ' no debe compartir carátula');
    covers.add(app.screenshot);
    const contents = await readFile(new URL('../' + app.screenshot, import.meta.url));
    if (expectedPath.endsWith('.svg')) {
      const svg = contents.toString('utf8');
      assert.match(svg, /<svg[^>]+viewBox="0 0 1280 720"/);
      assert.ok(svg.includes(name), name + ': portada SVG sin identidad');
    } else {
      assert.ok(contents.length > 100_000, name + ': JPEG cinematográfico incompleto');
      assert.equal(contents.subarray(0, 3).toString('hex'), 'ffd8ff', name + ': firma JPEG inválida');
    }
  }
});

test('las seis carátulas cinematográficas son JPEG únicos y cacheables bajo demanda', async () => {
  const names = ['DUNGEON-404', 'WORLD-404', 'ZOMBIE-404', 'ASHEN-VEIL-404', 'ECLIPSE-OF-ASH', 'Marea-hueca'];
  const sw = await readFile(new URL('../sw.js', import.meta.url), 'utf8');
  const paths = new Set();
  for (const name of names) {
    const app = data.APPS.find(entry => entry.name === name);
    const path = 'assets/screenshots/' + name + '-cinematic.jpg';
    assert.equal(app?.screenshot, path, name + ': la ficha no enlaza con el JPEG');
    assert.ok(!paths.has(path), name + ': portada duplicada');
    paths.add(path);
    const jpg = await readFile(new URL('../' + path, import.meta.url));
    assert.ok(jpg.length > 100_000, name + ': JPEG demasiado pequeño');
    assert.equal(jpg.subarray(0, 3).toString('hex'), 'ffd8ff', name + ': firma JPEG inválida');
    assert.equal(jpg.subarray(-2).toString('hex'), 'ffd9', name + ': JPEG incompleto');
    const core = sw.match(/const CORE = \[([\s\S]*?)\];/)?.[1] || '';
    assert.ok(!core.includes(path), name + ': descarga obligatoria innecesaria');
  }
});

test('todas las carátulas del catálogo completo existen y tienen formato válido', async () => {
  const screenshots = new Set();
  for (const app of data.APPS) {
    const path = app.screenshot;
    assert.match(path, /^assets\/screenshots\/[a-z0-9ñáéíóú._-]+\.(svg|png|jpg|jpeg|webp)$/i, app.name);
    assert.ok(!screenshots.has(path), app.name + ' reutiliza una carátula de otra aplicación: ' + path);
    screenshots.add(path);

    const contents = await readFile(new URL('../' + path, import.meta.url));
    assert.ok(contents.length > 100, app.name + ' tiene una carátula vacía o incompleta');
    if (path.endsWith('.svg')) {
      const markup = contents.toString('utf8');
      assert.match(markup, /<svg\b[^>]*>/, app.name + ' no tiene cabecera SVG');
      assert.match(markup, /<\/svg>\s*$/, app.name + ' no cierra el SVG');
      assert.match(markup, /viewBox=/, app.name + ' no define viewBox');
    }
  }
});

test('las catorce portadas recuperadas apuntan a su propio recurso', () => {
  const restored = [
    'Novel-Forge-404', 'AppHub-404', 'MYTHOS-404', 'Comic-Reader-404',
    'Motion-404', 'Luna-Natura-404', 'Caminos-Malditos-Sangrientos',
    'MD-Forge-404', 'FileDoctor-404', 'HumanScript-404', 'IT-Commander-404',
    'SECOND-BRAIN-404', 'Ringtone-404', 'ReleaseForge-404'
  ];
  for (const name of restored) {
    assert.equal(data.APPS.find(app => app.name === name)?.screenshot, 'assets/screenshots/' + name + '.svg');
  }
});

test('PixelForge y Compra usan sus carátulas propias', () => {
  assert.equal(data.APPS.find(app => app.name === 'PixelForge-404')?.screenshot, 'assets/screenshots/PixelForge-404.svg');
  assert.equal(data.APPS.find(app => app.name === 'Compra-404')?.screenshot, 'assets/screenshots/Compra-404.svg');
});
