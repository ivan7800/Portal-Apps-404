# I. Roig · Portal Apps 404 — Universo 404 OS v41.22 · QUINQUI 404

## Actualización v41.22 — integración de QUINQUI 404

- Eliminada la barra de búsqueda del catálogo, que duplicaba el buscador universal y concentraba los problemas de interacción.
- El catálogo conserva filtros por tecnología, orden, favoritos y acceso al buscador universal desde cabecera y navegación móvil.

## Actualización v41.10 — Native Fallback

- El cierre es ahora un enlace nativo además de un control JavaScript: nunca queda bloqueado por un evento.
- El buscador es un formulario nativo y conserva el filtrado instantáneo; al pulsar Buscar también funciona sin JavaScript.

## Actualización v41.7 — Interaction Fix

- El cierre de fichas retira el modal en el primer toque y sincroniza el historial después.
- El buscador principal responde a escritura, confirmación y teclado virtual de iPhone.

## Actualización v41.6 — Close Control Polish

- Ajustado el centrado óptico del glifo “×” dentro del botón de cierre.

## Actualización v41.5 — Cover Polish

- Las portadas reales se muestran completas y centradas dentro de la ficha, sin el recorte editorial de las miniaturas.
- La columna visual queda estable mientras se recorre el contenido en escritorio y recupera formato panorámico en móvil/tablet.
- La cabecera reserva una zona propia para el cierre, evitando cruces con el botón de favorito.

## Actualización v41.4 — Modal Polish

- La ficha cambia a estado cerrado desde el primer toque, antes de completar la animación.
- El cierre conserva la navegación atrás con una recuperación segura si el navegador no emite el evento esperado.
- La “×” tiene un área táctil de 48 × 48 px, centrado óptico y respuesta táctil directa.
- El diálogo se centra dentro del alto útil y respeta las zonas seguras del dispositivo.

## Actualización v41.3 — Lighthouse Final

- Reforzado el contraste del atajo `Ctrl K` en el buscador de escritorio.
- Se conserva el resultado móvil: 96 rendimiento y 100 en accesibilidad, buenas prácticas y SEO.

## Actualización v41.2 — Lighthouse Polish

- Corregido el rol ARIA del indicador de progreso de exploración.
- Reforzado el contraste de metadatos del catálogo manteniendo la estética original.
- Resultado Lighthouse móvil de referencia antes del ajuste: 96 rendimiento, 93 accesibilidad, 100 buenas prácticas y 100 SEO.

## Actualización v41.1 — Visual Polish

- Ocho portadas generadas se sustituyen por capturas reales verificadas de sus aplicaciones publicadas.
- El icono PWA de 512 px reduce su peso de 433 KB a 118 KB sin pérdida visual apreciable.
- La caché del service worker se renueva para distribuir los nuevos recursos.

## Actualización v41 — Premium Universe

- Portadas únicas para todas las fichas genéricas o con capturas compartidas.
- Mapa interactivo de los siete mundos del ecosistema.
- Modo presentación a pantalla completa con teclado y controles táctiles.
- Códigos QR generados localmente dentro de cada ficha.
- Transiciones visuales al cambiar de mundo respetando movimiento reducido.
- Caché PWA renovada con funcionamiento offline del generador QR.

## Actualización v38.2 — Quality & PWA

- El catálogo declara de forma explícita estado, disponibilidad, plataforma, soporte offline y tipo de entrega de cada aplicación.
- La búsqueda usa un módulo puro y probado, normaliza acentos y actualiza únicamente el catálogo en lugar de reconstruir toda la interfaz.
- Los filtros activos pueden retirarse individualmente y el botón de limpieza muestra cuántos hay aplicados.
- La paleta universal expone correctamente su opción activa a tecnologías de asistencia.
- Los controles táctiles principales alcanzan un mínimo de 44 × 44 px e incluyen mejoras para áreas seguras y contraste forzado.
- La PWA limita la limpieza a sus propias cachés, evita acumular una copia por cada URL y conserva una interfaz offline versionada.
- Se añaden pruebas automáticas, auditoría de release, flujo de GitHub Actions y documentación de contribución y seguridad.

## Correcciones v38.1 — Release Audit

- Normalizados los dos mundos aislados para recuperar la taxonomía de siete mundos y evitar nodos solapados en el mapa orbital.
- Corregidos el destino del enlace de salto, la estructura de landmarks y el nombre accesible del buscador.
- El botón de filtros elimina ahora búsqueda, mundo, intención, tecnología y ordenación de forma coherente.
- Las fichas relacionadas reemplazan la ficha activa sin crear una cadena de entradas de historial.
- Los estados no comprobados se muestran como “Catalogada” y “Offline declarado”, no como hechos verificados.
- Sincronizado el indicador online/offline de la cabecera principal y renovada la caché PWA.

## Actualización v38 — Caminos Malditos Sangrientos

- Añadida **Caminos Malditos Sangrientos** como aplicación nº 94.
- Motor narrativo local-first de horror cósmico: juego de rol libre, escritura colaborativa, memoria narrativa y mundo estructurado.
- Integrada en **Universo 404**, búsquedas, filtros, novedades y enlaces directos del portal.

## Actualización v37 — Compra 404

- Añadida **Compra 404** como aplicación nº 93.
- Lista de la compra sencilla, visual y local-first, con organización práctica y opciones para compartirla.
- Integrada en **Vida privada**, en las búsquedas, filtros, novedades y enlaces directos del portal.

## Actualización v36 — ReleaseForge 404

- Añadida **ReleaseForge 404** como aplicación nº 92.
- Web App Auditor, QA Lab & Release Studio para revisar, probar y preparar aplicaciones web antes de publicarlas.
- Integrada en **Formación & IT**, en las búsquedas, filtros, novedades y enlaces directos del portal.

## Actualización v35 — Discovery & Reliability

- Recuento visible calculado directamente desde `assets/data.js`; los metadatos ya no quedan obsoletos al ampliar el catálogo.
- Estado editorial, plataforma y disponibilidad local visibles en tarjetas y fichas.
- Ordenación por recomendación, fecha de incorporación, nombre, categoría y favoritos.
- Búsquedas, filtros, vista y fichas representados en la URL, compatibles con enlaces directos y navegación atrás/adelante.
- Botón “Sorpréndeme” que evita las aplicaciones abiertas recientemente.
- Discovery Center con las seis últimas incorporaciones.
- Instalación PWA guiada, estado online/offline y aviso controlado de actualización.
- Enlaces compartibles mediante el menú nativo o copia al portapapeles.
- Transiciones de salida, cambio animado de vista y respeto íntegro de movimiento reducido.
- Auditor local y opcionalmente online mediante `node scripts/audit.mjs`.

## Actualización v34 — Ultimate Motion

- Tres intensidades guardadas localmente: Reducido, Equilibrado y Cinematográfico.
- Revelado progresivo de secciones con `IntersectionObserver` y alternativa segura.
- Contadores y barras del Control Center animados al entrar en pantalla.
- Apertura premium de fichas, buscador y selector de apariencia.
- Microanimación de favoritos, halos orbitales y ambientación especial por skin.
- Respeto completo de `prefers-reduced-motion` y simplificación en móvil.
- Sin librerías externas, telemetría, backend ni pantalla de carga bloqueante.

Portal estático y PWA instalable que reúne los proyectos web de I. Roig. Está preparado para GitHub Pages, funciona sin backend, no incorpora analítica ni dependencias de ejecución externas y calcula automáticamente el tamaño del catálogo. Las preferencias y el historial reciente permanecen en el navegador.

## Características

- Catálogo dinámico con búsqueda por nombre, categoría, descripción, saga, intención o tecnología.
- Filtros por tecnología y por siete sagas temáticas.
- Centro de mando Universo 404 OS con acceso por intención y mapa orbital de sus mundos.
- Buscador universal con `Ctrl/Cmd + K`, resultados por nombre, función, categoría, saga y tecnología.
- Favoritos y apps recientes persistentes en `localStorage`, sin cuentas ni sincronización externa.
- Vistas de catálogo en cuadrícula o lista, con preferencia local.
- Ocho proyectos destacados y una aplicación aleatoria en portada.
- Fichas accesibles mediante diálogo modal con cierre por `Esc`, bloqueo de scroll, control de foco y restauración del elemento de origen.
- Siete skins visuales reales — Cósmica, Obsidiana, Void OLED, Glass, Terminal, Arctic y Synthwave — con preferencia persistente en `localStorage`.
- Selector visual de apariencia con previsualizaciones y control manual de movimiento ambiental.
- Oculus 404 reactivo, órbitas animadas, microinteracciones y parallax mínimo en puntero fino, sin librerías externas.
- Respeta `prefers-reduced-motion` y permite forzar movimiento reducido desde la propia interfaz.
- PWA instalable con shell offline, actualización controlada y caché aislada por proyecto.
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
  catalog-utils.js         Normalización y ranking puro de búsqueda
  data.js                  Catálogo de 95 aplicaciones
  styles.css               Diseño responsive y temas
  fonts.css                Tres fuentes/subconjuntos locales
  fonts/                    Archivos WOFF2 utilizados
  logo.webp                Identidad visual
  screenshots/             Mockups SVG del catálogo
scripts/
  audit.mjs                Auditoría local y comprobación opcional de URLs
tests/                     Pruebas unitarias y de regresión
.github/workflows/
  quality.yml              Validación automática en GitHub Actions
package.json               Comandos de calidad y metadatos de release
CHANGELOG.md               Historial de cambios
CONTRIBUTING.md            Guía de contribución
SECURITY.md                Política para comunicar vulnerabilidades
RELEASE_AUDIT_v41.10.1.md  Auditoría y evidencias de la release actual
RELEASE_AUDIT_v38.2.md     Auditoría histórica v38.2
```

## Publicar en GitHub Pages

1. Sube el contenido de esta carpeta a la raíz del repositorio.
2. En GitHub abre **Settings → Pages**.
3. Selecciona **Deploy from a branch**, rama `main`, carpeta `/ (root)`.
4. Comprueba `https://ivan7800.github.io/Portal-Apps-404/` y fuerza una recarga para activar la nueva versión del service worker.

## Editar el catálogo

Los datos viven en `assets/data.js`. Cada app requiere `name`, `short`, `category`, `saga`, `icon`, `screenshot`, `pages`, `github`, `status`, `availability`, `offline`, `platform` y `delivery`. La propiedad opcional `featured: true` la añade a “Imprescindibles”. También debe existir una entrada del mismo nombre en `LANGUAGES`.

Los valores editoriales admitidos están documentados y validados por el auditor. `availability: "unverified"` significa que el enlace forma parte del catálogo, pero no se ha comprobado en la release actual; no equivale a “disponible”.

## Verificación rápida

```bash
npm install
npm run check
python3 -m http.server 8080
```

Para comprobar también las páginas publicadas y los repositorios:

```bash
npm run audit:online
```

Después abre `http://localhost:8080`, prueba búsqueda, filtros, cambio de tema, apertura/cierre de fichas, navegación por teclado y modo móvil.

## Limitaciones conocidas

- El repositorio no incluye una licencia. Antes de aceptar contribuciones o redistribuciones, añade la licencia que decidas aplicar.
- El auditor local valida estructura, datos y recursos. La disponibilidad de las 188 URLs externas (`pages` y `github`) requiere ejecutar `npm run audit:online` con acceso de red; hasta entonces se muestra como no verificada.
- “Offline declarado” describe la ficha del proyecto enlazado; no certifica que cada aplicación externa haya superado una prueba offline desde este portal.

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
- Total verificado: **91 aplicaciones**.
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
- Catálogo y métricas siguen calculándose desde las 91 apps reales.

## Actualización v33 — Signature Edition

- Mantiene las 91 aplicaciones y la arquitectura visual elegida de Universo 404 OS.
- Añade siete skins diferenciadas, no simples recoloreados.
- Nuevo panel accesible de Apariencia con miniaturas y persistencia local.
- Oculus 404 reactivo a búsqueda, favoritos, navegación y apertura de fichas.
- Movimiento ambiental CSS, entrada escalonada y parallax mínimo solo con puntero fino.
- Modo de movimiento reducido manual además de `prefers-reduced-motion`.
- Sin dependencias externas ni nuevos assets; sigue preparado para GitHub Pages.
- Caché PWA actualizada a `portal-apps-404-v33-signature`.


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


## Actualización v33 — Ringtone 404

- Añadida **Ringtone 404** como aplicación nº 91.
- PWA local-first para seleccionar hasta 30 segundos de audio, previsualizar, procesar y exportar un ringtone sin subir el archivo a servidores.
