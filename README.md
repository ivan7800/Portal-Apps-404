# I. Roig · Portal Apps 404

Portal del ecosistema de 69 proyectos web de I. Roig (herramientas, ficción interactiva, audio, Universo 404), con estética cósmica inspirada en el símbolo personal del autor.

## Estructura

```
index.html              Página principal (1.8 KB)
404.html                Página de error
.nojekyll               Evita el procesado Jekyll de GitHub Pages
robots.txt / sitemap.xml
assets/
  app.js                Lógica del portal (vanilla JS, sin dependencias)
  data.js               Catálogo: 69 apps, 3 paletas, lenguajes
  styles.css            Estilos y las 3 skins
  fonts.css             @font-face autoalojado
  fonts/                18 woff2 (Cinzel Decorative, Cormorant Garamond, Outfit)
  logo.webp / logo.png  Símbolo personal
  screenshots/          69 mockups SVG
```

## Características

- Hero con el símbolo personal en óculo animado y app destacada aleatoria en cada carga.
- Centro de mando con accesos por intención (Top apps, Suites, Panel, Catálogo).
- Sección "Imprescindibles": las 8 apps marcadas como destacadas.
- Suites U404 filtrables por saga (7 sagas).
- Panel de estadísticas con contador animado y distribución por saga.
- Catálogo de 69 apps con búsqueda en vivo, filtro por tecnología y ficha de detalle (modal).
- Tres skins: Cósmica, Obsidiana y Claro. La preferencia se guarda en `localStorage`.
- Responsive, sin overflow horizontal en móvil.
- Accesibilidad: `lang="es"`, skip link, foco visible, modal cerrable con `Esc` y foco restaurado, `aria-pressed` en los filtros de suite.
- Respeta `prefers-reduced-motion`.

## Stack

Vanilla JS, cero dependencias, cero CDN, sin tracking. Fuentes autoalojadas.

## Publicar en GitHub Pages

1. Sube el contenido de esta carpeta a la raíz del repositorio.
2. Settings → Pages → Deploy from branch → rama `main`, carpeta `/ (root)`.

Si el repositorio no se llama `Portal-Apps-404`, actualiza la URL en la etiqueta `canonical`, en las `og:`/`twitter:` de `index.html`, en `sitemap.xml`, `robots.txt` y el enlace de `404.html`.

## Editar el catálogo

Todo el contenido vive en `assets/data.js`. Para añadir una app, añade un objeto a `APPS`:

```js
{
  name: "Mi-App",
  short: "Descripción corta para la tarjeta.",
  category: "Herramientas",
  saga: "Laboratorio 404",
  icon: "◆",
  screenshot: "assets/screenshots/Mi-App.svg",
  pages: "https://ivan7800.github.io/Mi-App/",
  github: "https://github.com/ivan7800/Mi-App",
  featured: true   // opcional: la muestra en "Imprescindibles"
}
```

Las estadísticas, las suites y el filtro de tecnología se recalculan solos.

## Notas

Portal estático: sin backend, sin analítica. Los enlaces "Abrir app" / "Ver código" apuntan a los repositorios y GitHub Pages reales del autor.
