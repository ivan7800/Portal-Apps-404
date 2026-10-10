/* Portal Apps 404 · LINGUA NATIVA 404 */
(function () {
  'use strict';
  var d=window.PORTAL_DATA;
  if (!d || !Array.isArray(d.APPS) || !d.LANGUAGES) return;
  if (d.APPS.some(function(a){return a && a.name==='LINGUA-NATIVA-404';})) return;
  d.LANGUAGES['LINGUA-NATIVA-404']='HTML / CSS / JavaScript / ES Modules / Local Storage';
  d.APPS.push({
    name:'LINGUA-NATIVA-404',
    short:'Diccionario local y espacio de aprendizaje de guaraní, quechua y náhuatl, ampliable con paquetes propios.',
    description:'LINGUA NATIVA 404 es un diccionario y entorno educativo local-first para explorar vocabulario de guaraní, quechua y náhuatl, guardar favoritos, organizar palabras personales y seguir el aprendizaje. Admite paquetes lingüísticos personalizados y una copia integral JSON de vocabulario, progreso, favoritos y decisiones editoriales. No traduce texto libre ni certifica que las entradas hayan sido revisadas por hablantes nativos. Versión candidata RC1.',
    category:'Educación / Idiomas',
    saga:'Universo 404',
    icon:'✥',
    featured:true,
    screenshot:'assets/screenshots/LINGUA-NATIVA-404.svg',
    pages:'https://ivan7800.github.io/LINGUA-NATIVA-404/',
    github:'https://github.com/ivan7800/LINGUA-NATIVA-404',
    status:'catalogued',
    availability:'unverified',
    offline:'declared',
    platform:'web',
    delivery:'web-app'
  });
})();
