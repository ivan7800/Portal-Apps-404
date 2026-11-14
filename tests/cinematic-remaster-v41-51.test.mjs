import assert from 'node:assert/strict';
import { readFile, stat } from 'node:fs/promises';
import test from 'node:test';

const names = ["SONIC-FORGE-404","LINGUA-NATIVA-404","SOLO-BUSINESS-404","PROJECT-COMMAND-404","GHOST-TEST-404","Pi-Legacy","EIFFEL-404","WORLD-GENESIS-404","ONEIRO-404","JARVIS-404"];
const sources = ["sonic-forge-404","lingua-nativa-404","solo-business-404","project-command-404","ghost-test-404","pi-legacy","eiffel-404","world-genesis-404","oneiro-404","jarvis-404"];

test('las diez portadas cinematográficas sustituyen las plantillas genéricas', async () => {
  const seen = new Set();
  const sw = await readFile(new URL('../sw.js', import.meta.url), 'utf8');
  for (let i=0; i<names.length; i++) {
    const name = names[i], path = 'assets/screenshots/' + name + '.svg';
    const [svg, info, extension] = await Promise.all([
      readFile(new URL('../' + path, import.meta.url), 'utf8'),
      stat(new URL('../' + path, import.meta.url)),
      readFile(new URL('../assets/' + sources[i] + '.js', import.meta.url), 'utf8')
    ]);
    assert.ok(info.size > 90000, name + ': imagen incompleta');
    assert.ok(svg.startsWith('<svg ') && svg.trimEnd().endsWith('</svg>'), name + ': SVG inválido');
    assert.ok(svg.includes('viewBox="0 0 1280 720"'), name + ': formato incorrecto');
    assert.ok(svg.includes('data:image/jpeg;base64,'), name + ': imagen no incrustada');
    assert.ok(svg.includes('Carátula cinematográfica exclusiva de ' + name), name + ': portada equivocada');
    assert.ok(!seen.has(svg), name + ': portada duplicada');
    assert.ok(extension.includes(path), name + ': la ficha no enlaza con la portada');
    const core = sw.match(/const CORE = \[([\s\S]*?)\];/)?.[1] || '';
    assert.ok(!core.includes(path), name + ': carátula no debe forzar instalación');
    seen.add(svg);
  }
});
