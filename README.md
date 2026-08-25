# I. Roig · Portal Apps 404 — Universo 404 OS v32 Signature Edition

Portal estático y PWA instalable que reúne **90 proyectos web** de I. Roig. Está preparado para GitHub Pages, funciona sin backend, no incorpora analítica ni dependencias externas y mantiene todo el catálogo en el navegador.

## Características

- Catálogo de 90 aplicaciones con búsqueda por nombre, categoría, descripción, saga, intención o tecnología.
- Filtros por tecnología y por siete sagas temáticas.
- Centro de mando Universo 404 OS con 90 aplicaciones, acceso por intención y mapa orbital de los siete mundos.
- Buscador universal con `Ctrl/Cmd + K`, resultados por nombre, función, categoría, saga y tecnología.
- Favoritos y apps recientes persistentes en `localStorage`, sin cuentas ni sincronización externa.
- Vistas de catálogo en cuadrícula o lista, con preferencia local.
- Ocho proyectos destacados y una aplicación aleatoria en portada.
- Fichas accesibles mediante diálogo modal con cierre por `Esc`, bloqueo de scroll, control de foco y restauración del elemento de origen.
- Siete skins visuales reales — Cósmica, Obsidiana, Void OLED, Glass, Terminal, Arctic y Synthwave — con preferencia persistente en `localStorage`.
- Selector visual de apariencia con previsualizaciones y control manual de movimiento ambiental.
- Oculus 404 reactivo, órbitas animadas, microinteracciones y parallax mínimo en puntero fino, sin librerías externas.
- Respeta `prefers-reduced-motion` y permite forzar movimiento reducido desde la propia interfaz.
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
  data.js                  Catálogo de 90 aplicaciones
  styles.css               Diseño responsive y temas
  fonts.css                Tres fuentes/subconjuntos locales
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


## Versión 24 — Universo 404 OS

- Rediseño integral del portal como centro de mando / sistema operativo visual.
- Total verificado: **90 aplicaciones**.
- Navegación por intención: Crear, Escribir, Diseñar, Investigar, Organizar, Jugar y Aprender.
- Mapa orbital interactivo de los siete mundos/sagas.
- Command Palette con `Ctrl/Cmd + K`, navegación por teclado y apertura rápida.
- Favoritos y recientes locales; sin backend ni tracking.
- Catálogo con vistas cuadrícula/lista y filtros combinables.
- Nueva ficha modal, panel de estado, navegación lateral y barra móvil.
- Metadatos SEO y caché PWA actualizados a v24.

## v26 — Refinamiento premium

- Conserva el diseño Universo 404 OS elegido como base.
- Buscador mejorado por intención y sinónimos.
- Fichas de app con conexiones relacionadas.
- Microinteracciones y profundidad visual refinadas.
- Catálogo y métricas siguen calculándose desde las 90 apps reales.

## Actualización v32 — Signature Edition

- Mantiene las 90 aplicaciones y la arquitectura visual elegida de Universo 404 OS.
- Añade siete skins diferenciadas, no simples recoloreados.
- Nuevo panel accesible de Apariencia con miniaturas y persistencia local.
- Oculus 404 reactivo a búsqueda, favoritos, navegación y apertura de fichas.
- Movimiento ambiental CSS, entrada escalonada y parallax mínimo solo con puntero fino.
- Modo de movimiento reducido manual además de `prefers-reduced-motion`.
- Sin dependencias externas ni nuevos assets; sigue preparado para GitHub Pages.
- Caché PWA actualizada a `portal-apps-404-v32-signature`.


## Actualización v28 — MD Forge 404

- Añadida **MD Forge 404** como aplicación nº 86.
- IDE Markdown local-first para documentación técnica, verificación contra evidencias del código, construcción de sitio estático y preparación de publicación.
- Integrada en **Formación & IT** y en la búsqueda global del portal.


## Actualización v29 — FileDoctor 404

- Añadida **FileDoctor 404** como aplicación nº 87.
- PWA local-first para archivos/proyectos + agente PowerShell para diagnóstico profundo de Windows.


## Actualización v30 — HumanScript 404

- Añadida **HumanScript 404** como aplicación nº 88.
- PWA local-first para revisión de manuscritos: prosa mecánica, recurrencias, cambios de voz, diálogo expositivo y continuidad.
- Evita presentar detección probabilística como prueba de autoría.


## Actualización v31 — IT Commander 404

- Añadida **IT Commander 404** como aplicación nº 89.
- Toolkit local-first de troubleshooting y diagnóstico para Windows.
- Combina PWA estática para GitHub Pages, herramientas PowerShell/BAT y Agent 404 opcional, local y de solo lectura.


## Actualización v32 — SECOND BRAIN 404

- Añadida **SECOND BRAIN 404** como aplicación/proyecto nº 90.
- Second Brain local-first para Windows con Obsidian, Docker, RAG, Watch Folder, grafo de conocimiento y memoria persistente controlada.
- Enlace principal al repositorio GitHub del proyecto.
