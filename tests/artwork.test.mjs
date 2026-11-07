import assert from 'node:assert/strict';
import { readFile, stat } from 'node:fs/promises';
import test from 'node:test';

const upgraded=["AppHub-404","MD-Forge-404","FileDoctor-404","HumanScript-404","IT-Commander-404","SECOND-BRAIN-404","Ringtone-404","ReleaseForge-404","Novel-Forge-404","Motion-404","Abyssal-Descent","BinForge-404","Bomb-Sweeper-87","CHRONOS-404","Caminos-Malditos-Sangrientos","Cockatils-404","Comic-Reader-404","Compra-404","DEEP-SPACE-404","EIFFEL-404","EVOLUTION-LAB-404","GHOST-TEST-404","JARVIS-404","LINGUA-NATIVA-404","Luna-Natura-404","MNEMOSYNE-404","MYTHOS-404","NETWATCH-404","Nightmare-404","Numeria-404","PROJECT-COMMAND-404","Pi-Legacy","PixelForge-404","Pocket-404-DX","SOLO-BUSINESS-404","SONIC-FORGE-404","SOULS-CODEX-404","WORLD-GENESIS-404"];

test('38 portadas mejoradas tienen contenido propio y tamaño suficiente', async () => {
  const seen=new Set();
  for(const name of upgraded){
    const path=new URL('../assets/screenshots/'+name+'.svg',import.meta.url);
    const [file,info]=await Promise.all([readFile(path,'utf8'),stat(path)]);
    assert.ok(info.size>=5000,name+' parece una portada básica o incompleta');
    assert.ok(file.includes('<svg ') && file.includes('viewBox="0 0 1280 720"'), name+' tiene formato SVG inválido');
    assert.ok(file.trimEnd().endsWith('</svg>'),name+' no cierra el SVG');
    assert.match(file, /aria-label=/);
    assert.ok(!seen.has(file),name+' duplica una portada');
    seen.add(file);
  }
});
