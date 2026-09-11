# Universo 404 · Auditoría de release v41.21

## Resultado

Base restaurada desde `Portal-Apps-404_v41.11_CLEAN-CATALOG(1).zip`, con versionado actualizado a v41.21 y caché PWA renovada. No se ha publicado esta copia adicional desde esta revisión; el ZIP es el entregable previo a cualquier cambio posterior en GitHub.

## Objetivo y criterios de aceptación

- Mantener las 94 aplicaciones y los recursos locales del paquete.
- Conservar la navegación de fichas, filtros, ordenación y cambio de vista de la base estable.
- Servir correctamente el portal bajo la subruta `/Portal-Apps-404/`.
- No introducir dependencias nuevas, secretos ni backend.
- Entregar evidencia reproducible y separar lo verificado de lo no ejecutado.

## Iteración 1

- **Estado inicial:** paquete v41.11 adjunto; ZIP íntegro.
- **Hipótesis:** la base v41.11 es una regresión menor y estable respecto a las revisiones posteriores.
- **Cambio aplicado:** actualización de versión a v41.21, rutas de assets y nombre de caché; actualización de pruebas, auditor y documentación.
- **Archivos modificados:** `assets/app.js`, `assets/data.js`, `index.html`, `sw.js`, `package.json`, `package-lock.json`, `scripts/audit.mjs`, `tests/catalog.test.mjs`, `tests/release.test.mjs`, `tests/service-worker.test.mjs`, `README.md`, `CHANGELOG.md`.
- **Archivo añadido:** este informe.
- **Decisión:** FINALIZADO para entrega local; publicación posterior requiere decisión del usuario.

## Pruebas ejecutadas

| Comprobación | Estado | Evidencia |
|---|---|---|
| Integridad del ZIP de entrada | ✅ Verificado | `unzip -t` sin errores |
| Sintaxis JavaScript | ✅ Verificado | `node --check` en datos, utilidades, aplicación y service worker |
| Auditoría estructural | ✅ Verificado | 94 apps, 115 archivos, 0 avisos, 0 errores |
| Tests de catálogo y regresión | ✅ Verificado | 22/22 tests superados |
| Service worker: instalación, activación y caché | ✅ Verificado | Tests específicos superados |
| Rutas relativas para GitHub Pages | ✅ Verificado | Auditoría y manifest |
| CSP, manifest y recursos locales | ✅ Verificado | Auditoría estática |
| Navegación con teclado | ⚠️ Verificado parcialmente | Revisada la implementación; no se ejecutó lector de pantalla físico |
| Chrome/Edge del entorno | ⚠️ Verificado parcialmente | Validación estática y pruebas automatizadas; no se considera matriz completa de dispositivos |
| Firefox | ⏳ No ejecutado | Entorno no disponible |
| Safari/iPhone físico | ⏳ No ejecutado | Requiere dispositivo físico |
| Lighthouse | ⏳ No ejecutado | No se inventa puntuación |
| Instalación PWA física | ⏳ No ejecutado | Requiere instalación HTTPS en dispositivo |
| Auditoría online de las 188 URLs externas | ⏳ No ejecutado | Fuera de esta entrega local |

## Limitaciones

La evidencia local no sustituye una prueba física en iPhone/Safari, Firefox, instalación real de PWA ni una medición Lighthouse bajo red real. La copia queda preparada para revisión y no debe describirse como validada en esos entornos hasta ejecutar esas comprobaciones.

## Comandos reproducibles

```bash
node --check assets/data.js
node --check assets/catalog-utils.js
node --check assets/app.js
node --check sw.js
node scripts/audit.mjs
node --test tests/*.test.mjs
```

## Revisión adversarial pendiente

En el siguiente ciclo conviene probar clics repetidos, atrás/adelante, recarga directa bajo la subruta, filtros con valores vacíos, vista lista/cuadrícula, almacenamiento local corrupto y actualización del service worker en Chrome y Safari.
