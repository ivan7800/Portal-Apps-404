# I. Roig · Portal Apps 404

Portal estático y PWA instalable que reúne **71 proyectos web** de I. Roig. Está preparado para GitHub Pages, funciona sin backend, no incorpora analítica ni dependencias externas y mantiene todo el catálogo en el navegador.

## Características

- Catálogo de 71 aplicaciones con búsqueda por nombre, categoría, descripción, saga o tecnología.
- Filtros por tecnología y por siete sagas temáticas.
- Diez proyectos destacados y una aplicación aleatoria en portada.
- Fichas accesibles mediante diálogo modal con cierre por `Esc`, bloqueo de scroll, control de foco y restauración del elemento de origen.
- Tres temas visuales con preferencia persistente en `localStorage`.
- PWA instalable con caché básica de la interfaz principal.
- Diseño responsive, fuentes autoalojadas, `prefers-reduced-motion`, skip link y foco visible.
- Sin tracking, CDN, cookies, cuentas ni backend.

## Estructura

```text
index.html                 Página principal
404.html                   Página de error sin indexación
.nojekyll                  Desactiva Jekyll en GitHub Pages
manifest.webmanifest       Metadatos de instalación PWA
sw.js                      Caché offline de la interfaz
robots.txt / sitemap.xml   SEO técnico
assets/
  app.js                   Interfaz y lógica en JavaScript
  data.js                  Catálogo de 71 aplicaciones
  styles.css               Diseño responsive y temas
  fonts.css                Cuatro fuentes/subconjuntos locales
  fonts/                    Archivos WOFF2 utilizados
  logo.webp                Identidad visual
  screenshots/             Mockups SVG del catálogo
```

## Publicar en GitHub Pages

1. Sube el contenido de esta carpeta a la raíz del repositorio.
2. En GitHub abre **Settings → Pages**.
3. Selecciona **Deploy from a branch**, rama `main`, carpeta `/ (root)`.
4. Comprueba `https://ivan7800.github.io/Portal-Apps-404/` y fuerza una recarga para activar la nueva versión del service worker.

## Editar el catálogo

Los datos viven en `assets/data.js`. Cada app requiere `name`, `short`, `category`, `saga`, `icon`, `screenshot`, `pages` y `github`. La propiedad opcional `featured: true` la añade a “Imprescindibles”. También debe existir una entrada del mismo nombre en `LANGUAGES`.

## Verificación rápida

```bash
node --check assets/data.js
node --check assets/app.js
python3 -m http.server 8080
```

Después abre `http://localhost:8080`, prueba búsqueda, filtros, cambio de tema, apertura/cierre de fichas, navegación por teclado y modo móvil.
