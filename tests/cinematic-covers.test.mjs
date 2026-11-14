import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import test from 'node:test';
import vm from 'node:vm';

const names = ["INSANITY","musica-404","json404","SafeSignal","Cauers4ever","Biblioteca-Oculta","PocketTone-Archive","Atlas-Pattern-AI","NECRONOMICON-404","Windows-Master-Suite"];

test('las diez carátulas cinematográficas son distintas, válidas y autocontenidas', async () => {
  const fingerprints = new Set();
  for (const name of names) {
    const svg = await readFile(new URL('../assets/screenshots/' + name + '.svg', import.meta.url), 'utf8');
    assert.ok(svg.startsWith('<svg ') && svg.trimEnd().endsWith('</svg>'), name + ': SVG inválido');
    assert.ok(svg.includes('viewBox="0 0 1280 720"'), name + ': formato incorrecto');
    assert.ok(svg.includes('data:image/jpeg;base64,'), name + ': imagen no incrustada');
    assert.ok(svg.length > 90000, name + ': imagen incompleta');
    assert.ok(!fingerprints.has(svg), name + ': imagen repetida');
    fingerprints.add(svg);
  }
});
test('el catálogo conserva las portadas y evita precargarlas', async () => {
  const code = await readFile(new URL('../assets/data.js', import.meta.url), 'utf8');
  const serviceWorker = await readFile(new URL('../sw.js', import.meta.url), 'utf8');
  const context = { window: {} };
  vm.runInNewContext(code, context);
  assert.doesNotMatch(serviceWorker.match(/const CORE = \[([\s\S]*?)\];/)?.[1] || '', /assets\/screenshots\//);
  assert.match(serviceWorker, /async function assetResponse\(/);
  for (const name of names) {
    const app = context.window.PORTAL_DATA.APPS.find(app => app.name === name);
    assert.equal(app?.screenshot, 'assets/screenshots/' + name + '.svg', name);

  }
});
