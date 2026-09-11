# Changelog

## v41.21 Stable Catalog Restore — restauración validada

- Restaurada la base v41.11, confirmada como estable en PC e iPhone.
- Renovadas las rutas versionadas y la caché PWA para evitar servir artefactos de releases posteriores.

## v41.11 Clean Catalog — revisión preparada

- Retirada la barra de búsqueda del catálogo para eliminar una interacción redundante y frágil.
- Se conservan los filtros, la ordenación y el buscador universal del portal.

## v41.10.1 Release Audit — revisión preparada

- Sincronizada la versión del paquete y la versión visible del portal con la release v41.10.
- Permitido el envío nativo del buscador mediante `form-action 'self'` sin relajar el resto de la CSP.
- Endurecido el service worker para que solo la navegación del shell pueda refrescar `index.html` en caché y para ignorar recursos fuera de su scope.
- Añadidas regresiones automáticas para CSP, versionado y protección del shell offline.

## v41.10 Native Fallback — revisión preparada

- La X de cada ficha tiene destino HTML nativo sin el parámetro app, además del cierre instantáneo por JavaScript.
- El buscador es un formulario nativo con campo buscar, compatible con el teclado virtual y con envío estándar.

## v41.9 Interaction Reset — revisión preparada

- Renovada la ruta del service worker y la caché PWA para reemplazar de forma inequívoca la versión anterior.
- El cierre de ficha se resuelve desde eventos persistentes de puntero y clic.
- El buscador principal escucha entrada, cambio y búsqueda desde un único controlador persistente.

## v41.8 Cache Bust — revisión preparada

- Versionadas las rutas de JavaScript y CSS para evitar que Safari conserve el comportamiento anterior.

## v41.7 Interaction Fix — revisión preparada

- Cierre inmediato de fichas, con historial sincronizado después.
- Buscador reforzado para teclado de escritorio y teclado virtual de iPhone.

## v41.6 Close Control Polish — revisión preparada

- Ajustado el centrado óptico del glifo “×” dentro del botón de cierre.

## v41.5 Cover Polish — revisión preparada

- Corregido el recorte y desplazamiento aparente de portadas reales dentro de las fichas.
- Separado el encaje de miniaturas (`cover`) del encaje del modal (`contain`).
- Estabilizada la columna visual y reservada la zona de los controles superiores.

## v41.4 Modal Polish — revisión publicada

- Corregido el cierre de fichas para que responda al primer toque también en iPhone.
- Añadido bloqueo contra cierres duplicados y recuperación del historial.
- Centrada ópticamente la “×” dentro de un objetivo táctil de 48 × 48 px.
- Ajustado el centrado vertical del diálogo a la zona segura del viewport.

## v41.3 Lighthouse Final — revisión publicada

- Corregido el último contraste insuficiente detectado por Lighthouse en escritorio.
- Renovación de caché PWA para entregar el ajuste.

## v41.2 Lighthouse Polish — revisión publicada

- El medidor de exploración expone ahora semántica `progressbar` completa.
- Mejorado el contraste de los estados y firmas técnicas del catálogo.
- Renovación de la caché PWA para entregar los ajustes inmediatamente.

## v41.1 Visual Polish — revisión local

- Capturas reales para Biblioteca de Sueños, Tarot, Ouija, I Ching, FotoLibro Studio, Photo Studio OS, Calma Mental y Mi Recetario PRO.
- Optimización del icono PWA de 512 px: 433 KB → 118 KB.
- Renovación de la caché PWA y pruebas de release.

Los cambios relevantes del proyecto se documentan en este archivo.

## v41 Premium Universe — revisión local

- Añadida transición visual al cambiar entre mundos.
- Incorporado un mapa interactivo de los siete mundos y sus conexiones.
- Añadido modo presentación navegable con teclado y controles táctiles.
- Integrado un generador QR local en cada ficha, sin servicios externos.
- Renovada la caché PWA e incluido el generador QR para uso sin conexión.

## v40.3 Portadas Completas — revisión local

- Detectadas 42 fichas que conservaban el patrón visual genérico original.
- Aplicadas portadas únicas a todas las fichas genéricas o con capturas compartidas.
- Resultado: 52 portadas generadas y 42 composiciones originales conservadas.

## v40.2 Cover Polish — revisión local

- Sustituidas las portadas repetidas por composiciones visuales únicas y ligeras.
- Añadido texto alternativo descriptivo a las capturas reales.
- Mejorada la lectura de las portadas en móvil y en fichas ampliadas.

## v40.1 Final polish — revisión local

- Mejorada la estabilidad visual de imágenes y tarjetas para reducir saltos de diseño.
- Añadido modo reducido de desplazamiento cuando el sistema lo solicita.
- Refinados foco, targets táctiles, tipografía y áreas seguras para móvil.
- Añadida barra de herramientas del catálogo persistente durante la exploración.
- Aplicada carga diferida de secciones para reducir trabajo inicial.

## v40 Discovery Edition — revisión local

- Añadido progreso local de exploración del catálogo.
- Añadido manifiesto visual del Universo 404.
- Mejorado el panel de novedades y la lectura de descubrimiento.
- Esta iteración queda preparada para revisión antes de publicarse.

## v39 Cosmic Edition — revisión local

- Añadida una señal destacada en la portada para acceder rápidamente a una aplicación.
- Enriquecidas las tarjetas con plataforma, tecnología y acceso visual.
- Reforzada la jerarquía visual de la sección de novedades.
- Esta iteración es local y todavía no se ha publicado en GitHub.

## [38.2.0] — 2026-09-09

### Añadido

- Esquema de catálogo v2 con estado, disponibilidad, soporte offline, plataforma y tipo de entrega explícitos.
- Utilidades puras y comprobables para normalización y búsqueda.
- Pruebas automáticas del catálogo, búsqueda, estructura de release y service worker.
- Workflow de GitHub Actions con comprobación local y auditoría externa opcional.
- `.gitignore`, guía de contribución y política de seguridad.
- Chips individuales para identificar y retirar filtros activos.

### Cambiado

- La búsqueda actualiza solo el contenido del catálogo, sin reconstruir toda la interfaz.
- El buscador universal expone semántica de combobox/listbox y selección activa.
- Metadatos y mensajes distinguen datos catalogados, declaraciones offline y enlaces no verificados.
- El service worker aísla la limpieza por prefijo y evita acumular una copia HTML por cada URL de búsqueda.
- Aumentados los objetivos táctiles y mejorado el uso de safe areas en móvil.
- Eliminado el límite artificial de menos de 100 archivos del auditor.

### Corregido

- Riesgo de eliminar cachés de otras aplicaciones alojadas en el mismo dominio.
- Etiquetas ambiguas en proyectos que solo ofrecen repositorio.
- Foco inicial del diálogo de apariencia.
- El auditor excluye `.git` y `node_modules`, por lo que funciona igual en un ZIP, un clon local y GitHub Actions.

## [38.1.0] — 2026-09-09

- Normalización a siete mundos, correcciones de accesibilidad, historial, filtros, almacenamiento y manifest.

## [38.0.0] — 2026-09-05

- Incorporación de Caminos Malditos Sangrientos como aplicación 94.
