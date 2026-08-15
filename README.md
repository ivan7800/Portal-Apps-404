# I. Roig · Portal Apps 404

Portal estático y PWA instalable que reúne **85 proyectos web** de I. Roig. Está preparado para GitHub Pages, funciona sin backend, no incorpora analítica ni dependencias externas y mantiene todo el catálogo en el navegador.

## Características

- Catálogo de 85 aplicaciones con búsqueda por nombre, categoría, descripción, saga o tecnología.
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
  data.js                  Catálogo de 85 aplicaciones
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

## Actualización v15 — World TV 404

- Añadida World TV 404 como aplicación número 77.
- Catálogo multimedia para importar, organizar y reproducir canales públicos, propios o autorizados.
- Caché PWA actualizada a `portal-apps-404-v15`.


## Actualización v16 — World Dishes 404

- Añadida World Dishes 404 como aplicación número 78.
- Incluye 33 recetas iniciales, búsqueda, filtros, favoritos, lista de la compra, ajuste de raciones y modo cocina.
- Caché PWA actualizada a `portal-apps-404-v16`.


## Actualización v17 — AppHub 404

- Añadida AppHub 404 como aplicación número 79.
- Gestión local de instalación, actualización, inventario y mantenimiento de aplicaciones Windows mediante WinGet.
- Se reutiliza un recurso visual existente para mantener el paquete en 100 archivos.
- Caché PWA actualizada a `portal-apps-404-v17`.

## Versión 19 — Motion 404

- Añadida Motion 404 al catálogo.
- Total actualizado a 81 aplicaciones únicas.
- Caché PWA actualizada a `portal-apps-404-v19`.
- Se reutiliza un recurso visual existente para conservar el límite de 100 archivos.

## Actualización v20 — Luna Natura 404

- Añadida Luna Natura 404 como aplicación número 82.
- Integra meteorología real, calendario lunar, huerto inteligente, tareas, 123 cultivos, diseñador de bancales y diario natural.
- Se reutiliza un recurso visual existente para mantener el paquete en 100 archivos.
- Caché PWA actualizada a `portal-apps-404-v20`.


## Actualización v21 — MYTHOS 404

- Añadida MYTHOS 404 como aplicación número 83.
- PWA local-first para explorar mitologías, religiones antiguas, tradiciones narrativas y folclore.
- Se refleja la separación editorial entre corpus revisado e índice de descubrimiento.
- Se reutiliza un recurso visual existente para mantener el paquete en 100 archivos.
- Caché PWA actualizada a `portal-apps-404-v21`.


## Actualización v22 — Comic Reader 404

- Añadida Comic Reader 404 como aplicación número 84.
- PWA privada y local-first para leer y organizar cómics propios en CBZ/ZIP, CBR/RAR, PDF e imágenes.
- Preparada para GitHub Pages, sin backend, cuenta ni compilación.
- Se reutiliza `assets/screenshots/Atlas-Librorum.svg` para mantener el proyecto en 100 archivos.
- Caché PWA actualizada a `portal-apps-404-v22`.


## Actualización v23 — PixelForge 404

- Añadida PixelForge 404 como aplicación 85 del catálogo.
- Editor gráfico local-first con capas, máscaras, filtros, PSD/PSB, RAW mediante LibRaw-WASM, compositor tiled e IA neuronal local.
- Caché PWA actualizada a `portal-apps-404-v23`.
- Se reutiliza un recurso visual existente para mantener el proyecto en 100 archivos.
