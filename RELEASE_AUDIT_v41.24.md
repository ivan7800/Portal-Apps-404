# Universo 404 · Auditoría de hotfix v41.24

## Incidencia reproducida por código

Los controles del catálogo (`#tech`, `#sort` y `[data-view]`) ejecutaban `render()` tras cada cambio. `render()` reemplaza todo `#app` mediante `root.innerHTML`, por lo que el nodo que originaba la interacción desaparecía, se perdían foco/estado del control y el navegador podía recolocar el scroll al reconstruirse la página completa. Además, los handlers llamaban después a `scrollToId('catalogo')`, forzando otro desplazamiento.

## Corrección

- Tecnología, orden y cambio cuadrícula/lista pasan a usar `updateCatalogOnly()`.
- `updateCatalogOnly()` reemplaza únicamente `#catalog-content`.
- Se conserva y restaura la posición `scrollX/scrollY`.
- Se sincronizan `aria-pressed`, clases activas y valores de los `<select>` sin reconstruir la aplicación.
- `resetFilters()` y la eliminación individual de filtros utilizan también actualización parcial.
- Se elimina el `scrollToId('catalogo')` de estos controles.
- Se renueva el cache busting a v41.24 y la familia de caché del Service Worker.

## Verificación automatizada

- `node --check assets/app.js`: OK.
- `npm run audit`: 96 apps, 118 archivos, 0 avisos, 0 errores.
- `npm test`: 23/23 tests OK.
- Nuevo test de regresión: filtros, orden y vista no llaman `render()` ni `scrollToId()` y sí usan `updateCatalogOnly()`.

## Limitación de entorno

Se intentó una prueba de interacción con Chromium/Playwright, pero la política del entorno bloquea la navegación del navegador tanto a `127.0.0.1` como a `file://` con `ERR_BLOCKED_BY_ADMINISTRATOR`. No se contabiliza esa prueba como superada.

## Estado

**RELEASE CANDIDATE**. La causa del fallo observado queda corregida en código y cubierta por regresión automatizada. La comprobación final recomendada es abrir la release en navegador real, situarse en el catálogo y probar tecnología, orden, cuadrícula/lista y limpiar filtros comprobando que la página no salta al inicio.
