/* Portal Apps 404 · Techno 404 Studio catalog extension */
(function () {
  'use strict';
  var data = window.PORTAL_DATA;
  if (!data || !Array.isArray(data.APPS) || !data.LANGUAGES) return;
  if (data.APPS.some(function (app) { return app && app.name === 'Techno-404-Studio'; })) return;

  data.LANGUAGES['Techno-404-Studio'] = 'HTML / CSS / JavaScript / Web Audio API';
  data.APPS.push({
    name: 'Techno-404-Studio',
    short: 'Groovebox y mini-DAW techno profesional con secuenciador, arranger, sampler, mixer, MIDI, automatización y exportación WAV/MP3/FLAC/STEMS.',
    description: 'Techno 404 Studio v4.2.0 es una groovebox / mini-DAW techno profesional para navegador, construida con JavaScript y Web Audio API sin frameworks. Incluye secuenciador de 16/32/64 pasos, 8 pistas, 16 patterns, Live Scenes, generadores de estilos techno, piano roll Acid, clips MIDI, arranger multipista de hasta 64 compases, sampler, mixer con EQ y efectos, 2 LFOs, automatización, Web MIDI, analizador FFT, guardado local y exportación profesional a WAV, MP3, FLAC y STEMS WAV ZIP. Dispone de 7 skins, modos Cinematic/Clean/Performance y PWA/offline; los codecs MP3/FLAC se preparan bajo demanda la primera vez.',
    category: 'Música / Groovebox / Mini-DAW',
    saga: 'Universo 404',
    icon: '♫',
    featured: true,
    screenshot: 'assets/screenshots/Techno-404-Studio.svg',
    pages: 'https://ivan7800.github.io/Techno-404-Studio/',
    github: 'https://github.com/ivan7800/Techno-404-Studio',
    status: 'catalogued',
    availability: 'unverified',
    offline: 'declared',
    platform: 'web',
    delivery: 'web-app'
  });
})();
