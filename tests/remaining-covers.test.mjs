import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import test from 'node:test';
import vm from 'node:vm';
const names=["diario-moleskine","Storyboard-Studio","sin-bruma","Claude-Skills-Pack","zerokey-ai","doppelganger-chat","i.roig","El-Evangelio-del-Nombre-Devorado","Strategy-Lab-Campaign","Vigilia-Abisal","VOX-MORPHER-404","Guardian-Senior-AI","portal-descargas-corporativas"];
test('las 13 carátulas originales no recurren a la vieja plantilla', async () => {
  const seen = new Set();
  for (const name of names) {
    const svg = await readFile(new URL('../assets/screenshots/' + name + '.svg', import.meta.url), 'utf8');
    assert.ok(svg.startsWith('<svg ') && svg.trimEnd().endsWith('</svg>'), name + ': SVG incompleto');
    assert.ok(svg.includes('viewBox="0 0 1280 720"'), name + ': formato incorrecto');
    assert.ok(svg.includes('Carátula artística original de ' + name), name + ': identidad equivocada');
    assert.ok(svg.length > 6500, name + ': carátula incompleta');
    assert.ok(!svg.includes('ABRIR APP') && !svg.includes('GITHUB</text>'), name + ': plantilla antigua');
    assert.ok(!seen.has(svg), name + ': arte duplicado');
    seen.add(svg);
  }
});
test('catálogo y precarga reconocen las trece carátulas', async () => {
  const d = await readFile(new URL('../assets/data.js', import.meta.url), 'utf8');
  const worker = await readFile(new URL('../sw.js', import.meta.url), 'utf8');
  const ctx = { window: {} };
  vm.runInNewContext(d, ctx);
  for (const name of names) {
    assert.equal(ctx.window.PORTAL_DATA.APPS.find(a => a.name === name)?.screenshot, 'assets/screenshots/' + name + '.svg', name);
    assert.ok(worker.includes("'./assets/screenshots/" + name + ".svg'"), name + ': no está precacheada');
  }
});