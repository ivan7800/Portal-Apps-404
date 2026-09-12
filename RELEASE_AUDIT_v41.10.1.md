# Release Audit · Portal Apps 404 v41.10.1

Fecha de auditoría: 11 de septiembre de 2026  
Proyecto auditado: `Portal-Apps-404_v41.10_COPY.zip`  
Paquete resultante: `Portal-Apps-404_v41.10.1_RELEASE.zip`

## 1. Estado inicial

El proyecto recibido era una PWA estática madura, con catálogo local, pruebas automatizadas, auditor propio, CSP, service worker y workflow de GitHub Actions. La base era sólida, pero existían incoherencias de versionado, un fallo real en el fallback nativo del buscador y un riesgo de integridad de caché en el service worker. También había seis assets obsoletos no referenciados.

**Puntuación inicial global: 8,4/10 — producto sólido, todavía no cerrado como release.**

## 2. Arquitectura detectada

- Aplicación estática HTML/CSS/JavaScript sin bundler ni backend.
- Punto de entrada: `index.html`.
- Lógica de interfaz: `assets/app.js`.
- Datos: `assets/data.js` con 94 aplicaciones y esquema de catálogo v2.
- Búsqueda/ranking puro: `assets/catalog-utils.js`.
- Persistencia: `localStorage` para preferencias, favoritos, recientes y progreso.
- PWA: `manifest.webmanifest` + `sw.js`.
- Destino de publicación: GitHub Pages bajo `/Portal-Apps-404/`.
- QA: Node.js `node:test`, auditor `scripts/audit.mjs` y GitHub Actions.
- Sin dependencias de runtime, backend, cuentas, cookies o analítica detectados.

## 3. Función principal

Permitir descubrir, buscar, filtrar y abrir las aplicaciones del ecosistema Universo 404, conservar preferencias locales y ofrecer un shell PWA instalable/offline para el propio portal. El portal enlaza posteriormente a aplicaciones o repositorios externos.

## 4. Tabla priorizada de problemas

| ID | Severidad | Estado | Resumen |
|---|---|---|---|
| REL-001 | MEDIA | CORREGIDO | Versionado incoherente entre paquete, UI y release declarada. |
| REL-002 | ALTA | CORREGIDO | CSP bloqueaba el fallback nativo del formulario de búsqueda. |
| REL-003 | ALTA | CORREGIDO | Navegaciones HTML podían reemplazar indebidamente el shell offline cacheado. |
| REL-004 | BAJA | CORREGIDO | Seis mockups SVG obsoletos no referenciados. |
| REL-005 | MEDIA | NO VERIFICABLE | E2E real en Chromium bloqueado por política del entorno. |
| REL-006 | MEDIA | NO VERIFICABLE | Auditoría de 188 URLs externas no concluyó por limitaciones de red/tiempo. |
| REL-007 | BAJA | PENDIENTE | No existe `LICENSE`; requiere decisión expresa del propietario. |

## 5. Clasificación funcional

| Función | Estado | Evidencia |
|---|---|---|
| Esquema de catálogo e invariantes | REAL | Tests de catálogo + auditor local. |
| Normalización y ranking de búsqueda | REAL | Tests unitarios. |
| Auditor local de release | REAL | 0 avisos / 0 errores. |
| Fallback nativo de búsqueda | REAL | CSP corregida + prueba de regresión estática. |
| Filtros, orden y vistas | PARCIAL | Implementación coherente; falta E2E de navegador en esta ejecución. |
| Favoritos, recientes y skins | PARCIAL | Persistencia implementada; falta E2E real. |
| Fichas/modales, foco y Escape | PARCIAL | Regresiones automatizadas de estructura/interacción; falta ejecución real del navegador. |
| Generador QR local | PARCIAL | Implementación local y pruebas de integración estática; canvas no ejecutado en navegador por bloqueo. |
| Service worker: instalación/activación/caché | REAL | Harness automatizado con pruebas de install, activate, fetch y update. |
| PWA instalable en dispositivo | NO VERIFICABLE | Requiere navegador/OS real y evento `beforeinstallprompt`. |
| Compartir con Web Share/clipboard | NO VERIFICABLE | Requiere permisos y runtime de navegador. |
| Disponibilidad de las 188 URLs externas | NO VERIFICABLE | `audit:online` no completado. |
| GitHub Pages del paquete corregido | NO VERIFICABLE | Aún no desplegado; el despliegue remoto observado pertenece al commit anterior. |

## 6. Correcciones aplicadas

### [REL-001] Versionado de release incoherente

- **Severidad:** MEDIA
- **Estado:** CORREGIDO
- **Archivo:** `package.json`, `package-lock.json`, `assets/data.js`, `assets/app.js`, `README.md`, `CHANGELOG.md`, `scripts/audit.mjs`, tests.
- **Evidencia:** el original mezclaba `41.5.0`, `v41.8` y `v41.10`.
- **Impacto:** trazabilidad de release confusa y riesgo de servir recursos antiguos.
- **Causa:** iteraciones visuales/funcionales sin sincronización completa del número de versión.
- **Corrección aplicada:** versión unificada en `v41.10.1`; query de cache bust `41.10.1`; registro del SW y caché actualizados.
- **Verificación:** `npm run check` y regresiones de versión superadas.
- **Riesgo pendiente:** ninguno conocido en el árbol local.

### [REL-002] CSP bloqueaba el fallback nativo del buscador

- **Severidad:** ALTA
- **Estado:** CORREGIDO
- **Archivo:** `index.html`, `tests/release.test.mjs`.
- **Evidencia:** el formulario usa `action="./" method="get"`, pero la CSP original declaraba `form-action 'none'`.
- **Impacto:** el fallback anunciado como nativo/estándar quedaba bloqueado por el propio navegador cuando JavaScript no interceptaba el submit.
- **Causa:** política CSP demasiado restrictiva para la funcionalidad declarada.
- **Corrección aplicada:** `form-action 'self'`, manteniendo restringido el destino al mismo origen.
- **Verificación:** nueva prueba de regresión + `npm run check`.
- **Riesgo pendiente:** la validación E2E real del submit no pudo ejecutarse por bloqueo de Chromium en el entorno.

### [REL-003] Riesgo de contaminación del shell offline

- **Severidad:** ALTA
- **Estado:** CORREGIDO
- **Archivo:** `sw.js`, `tests/service-worker.test.mjs`.
- **Evidencia:** cualquier navegación `response.ok` controlada por el SW escribía la respuesta en la clave `./index.html`; una visita directa a otra página HTML podía sustituir el shell offline.
- **Impacto:** posibilidad de que el portal offline devolviera contenido incorrecto tras determinadas navegaciones.
- **Causa:** normalización de navegación demasiado amplia.
- **Corrección aplicada:** solo la raíz del scope y `index.html` pueden refrescar el shell; además, el SW ignora peticiones del mismo origen que queden fuera de su scope lógico.
- **Verificación:** pruebas nuevas para no sobrescribir el shell con `404.html` y no interceptar recursos fuera de la subruta; suite 23/23.
- **Riesgo pendiente:** prueba de service worker real en Chromium no ejecutable en este entorno.

### [REL-004] Assets huérfanos

- **Severidad:** BAJA
- **Estado:** CORREGIDO
- **Archivo:** `assets/screenshots/`.
- **Evidencia:** seis SVG no aparecían referenciados en ningún archivo y sus aplicaciones ya usan capturas `*-real.jpg`.
- **Impacto:** ruido de release y peso innecesario.
- **Causa:** recursos históricos conservados tras sustitución por capturas reales.
- **Corrección aplicada:** eliminados seis SVG huérfanos.
- **Verificación:** auditor local posterior: 114 archivos, 0 avisos, 0 errores; todas las capturas referenciadas existen.
- **Riesgo pendiente:** ninguno detectado.

### [REL-005] Navegador E2E no disponible

- **Severidad:** MEDIA
- **Estado:** NO VERIFICABLE
- **Archivo:** no aplica.
- **Evidencia:** Chromium y Playwright estaban presentes, pero cualquier navegación local terminó en `ERR_BLOCKED_BY_ADMINISTRATOR`.
- **Impacto:** no fue posible ejecutar en esta sesión un flujo real de clics, foco, teclado, viewport móvil, consola y service worker.
- **Causa:** política del entorno de ejecución, no un fallo demostrado del proyecto.
- **Corrección aplicada:** ninguna posible dentro del proyecto.
- **Verificación:** se reforzaron las pruebas unitarias/regresión como cobertura sustitutiva.
- **Riesgo pendiente:** debe hacerse un smoke test manual o CI E2E antes de promover a PUBLICABLE.

### [REL-006] URLs externas no verificadas completamente

- **Severidad:** MEDIA
- **Estado:** NO VERIFICABLE
- **Archivo:** `assets/data.js`, `scripts/audit.mjs`.
- **Evidencia:** `npm run audit:online` no terminó dentro del tiempo disponible; `curl` externo no pudo resolver DNS desde el contenedor.
- **Impacto:** alguna aplicación o repositorio enlazado podría haberse movido o estar caído.
- **Causa:** dependencia de conectividad externa y volumen de URLs.
- **Corrección aplicada:** ninguna; no se cambiaron estados `availability` sin evidencia.
- **Verificación:** la sintaxis HTTPS y unicidad de URLs sí se validan localmente.
- **Riesgo pendiente:** ejecutar `npm run audit:online` en un entorno con salida de red estable.

### [REL-007] Licencia ausente

- **Severidad:** BAJA
- **Estado:** PENDIENTE
- **Archivo:** `LICENSE` ausente.
- **Evidencia:** README ya declara esta limitación.
- **Impacto:** no bloquea GitHub Pages, pero deja sin definir derechos de reutilización/contribución.
- **Causa:** decisión legal/editorial todavía no tomada.
- **Corrección aplicada:** ninguna; no es correcto elegir una licencia sin instrucción del propietario.
- **Verificación:** ausencia confirmada en el árbol final.
- **Riesgo pendiente:** decidir y añadir licencia si se desea distribución abierta.

## 7. Archivos creados

- `RELEASE_AUDIT_v41.10.1.md`

## 8. Archivos modificados

- `CHANGELOG.md`
- `README.md`
- `assets/app.js`
- `assets/data.js`
- `index.html`
- `package-lock.json`
- `package.json`
- `scripts/audit.mjs`
- `sw.js`
- `tests/catalog.test.mjs`
- `tests/release.test.mjs`
- `tests/service-worker.test.mjs`

## 9. Archivos eliminados

- `assets/screenshots/Biblioteca-de-Sue-os.svg`
- `assets/screenshots/FotoLibro-Studio-Pro.svg`
- `assets/screenshots/I-Ching.svg`
- `assets/screenshots/Ouija.svg`
- `assets/screenshots/Tarot.svg`
- `assets/screenshots/calma-mental.svg`

Todos estaban sin referencias en el proyecto final.

## 10. Comandos ejecutados

- Extracción del ZIP original en área de trabajo separada.
- Inspección completa de árbol, tamaños y patrones de riesgo.
- `npm run check` múltiples veces antes y después de cambios.
- `npm test` múltiples veces durante la regresión.
- `npm ci`.
- `npm audit --omit=dev`.
- Servidor estático local con `python3 -m http.server` bajo una subruta `Portal-Apps-404/`.
- Comprobaciones HTTP locales con `curl` para `index.html`, JS, manifest, SW y `404.html`.
- `npm run audit:online` — iniciado pero no completado dentro del límite de ejecución.
- Intento E2E con Playwright + Chromium — bloqueado por política del entorno (`ERR_BLOCKED_BY_ADMINISTRATOR`).
- Comparación recursiva contra una extracción limpia del ZIP original.
- Escaneo de secretos, backups, temporales, duplicados y assets huérfanos.

## 11. Tests superados

- **23/23 tests Node superados.**
- Auditoría local: **0 avisos / 0 errores**.
- `npm audit --omit=dev`: **0 vulnerabilidades conocidas**.
- `npm ci`: correcto.
- Sintaxis JS (`node --check`) para datos, utilidades, app y service worker: correcta.
- Recursos principales bajo subruta local: HTTP 200 y MIME razonable.
- Secretos detectados por patrones habituales: 0.
- Duplicados binarios: 0 grupos.
- Backups/temporales: 0.
- Capturas referenciadas inexistentes: 0.

## 12. Tests fallidos

- **0 tests automatizados del proyecto fallidos.**

## 13. Tests no ejecutados o no concluyentes

- E2E real en Chromium: bloqueado por política del entorno.
- Lighthouse: no ejecutado porque requiere navegación real del navegador.
- Instalación PWA real y actualización de SW en dispositivo: no ejecutadas.
- Safari/iOS y Chrome/Android físicos: no ejecutados.
- `npm run audit:online` completo sobre las 188 URLs: no concluyente.
- Despliegue real de esta revisión v41.10.1 en GitHub Pages: pendiente de publicación.

## 14. Comprobaciones manuales pendientes

Antes de promover de RELEASE CANDIDATE a PUBLICABLE:

1. Abrir la versión publicada en Chrome/Edge y Safari.
2. Probar 360/390 px, tablet y escritorio.
3. Buscar con teclado y botón de envío del teclado virtual.
4. Abrir/cerrar fichas con ratón, toque, `Esc`, atrás y adelante.
5. Probar favoritos/recientes tras recargar.
6. Probar cambio de skin y movimiento reducido.
7. Generar y descargar un QR.
8. Probar Web Share o fallback de portapapeles.
9. Instalar la PWA, pasar a offline y recargar.
10. Publicar una actualización y comprobar el flujo de `SKIP_WAITING`.
11. Revisar consola y Network: 0 errores/404 en el flujo principal.
12. Ejecutar Lighthouse móvil y escritorio.
13. Ejecutar `npm run audit:online` hasta completar.

## 15. Riesgos

- Enlaces externos potencialmente caducados no verificados en esta ejecución.
- Interacciones DOM y experiencia móvil no probadas en un navegador real durante esta sesión.
- La ausencia de licencia limita redistribución/contribución.
- Las afirmaciones `offline: declared` de apps enlazadas siguen siendo declaraciones editoriales, no certificaciones del portal.

## 16. Limitaciones

- El portal es estático y no puede garantizar disponibilidad ni seguridad de aplicaciones enlazadas.
- El service worker cubre el shell del portal, no convierte automáticamente cada app externa en offline.
- La CSP conserva `'unsafe-inline'` en estilos porque la UI genera estilos inline; no se detectó `eval`, `new Function` ni scripts inline de terceros.
- `file://` no ofrece service worker; el uso local correcto requiere un servidor HTTP sencillo.

## 17. Estado final

# RELEASE CANDIDATE

Justificación: no quedan bloqueantes conocidos en análisis estático, auditor local, dependencias o pruebas automatizadas; las correcciones importantes tienen regresiones. Sin embargo, faltan la validación E2E real de esta revisión, la auditoría externa completa y el despliegue de este paquete exacto. Por rigor, no se clasifica todavía como PUBLICABLE.

## 18. Puntuación inicial

**8,4/10**

## 19. Puntuación final

**8,8/10**

| Área | Inicial | Final |
|---|---:|---:|
| Producto | 8,4 | 8,7 |
| Arquitectura | 8,7 | 8,9 |
| Código | 8,5 | 8,8 |
| UX/UI | 8,7 | 8,7 |
| Móvil | 8,4 | 8,4 |
| QA | 8,2 | 8,8 |
| Seguridad | 8,5 | 8,8 |
| Privacidad | 9,0 | 9,0 |
| Rendimiento | 8,6 | 8,6 |
| Accesibilidad | 8,4 | 8,5 |
| PWA | 8,0 | 8,8 |
| Mantenibilidad | 8,5 | 8,8 |
| Documentación | 8,2 | 8,8 |
| GitHub | 8,8 | 8,9 |
| GitHub Pages | 8,6 | 8,7 |
| Preparación de release | 8,0 | 8,8 |

La puntuación no supera 9 porque faltan pruebas E2E de navegador, validación real de esta build desplegada y comprobación completa de enlaces externos.

## 20. Qué falta para 10/10

- E2E automatizado en navegador real para desktop y móvil.
- Lighthouse consistente y registrado como evidencia de esta misma revisión.
- Instalación/actualización/offline PWA probados en Chrome y Safari compatibles.
- Comprobación de las 188 URLs externas sin resultados ambiguos.
- Despliegue de v41.10.1 y smoke test post-deploy sin consola/Network errors.
- Decisión de licencia si se pretende código abierto/reutilización.
- Idealmente, tests de accesibilidad automatizados (axe u otro equivalente) complementados con teclado/manual.

## 21. Instrucciones de ejecución

```bash
npm ci
npm run check
python3 -m http.server 8080
```

Abrir `http://localhost:8080/`.

Para comprobar enlaces externos:

```bash
npm run audit:online
```

## 22. Instrucciones de publicación

1. Sustituir el contenido de la rama `main` por esta revisión, conservando la raíz del proyecto.
2. Confirmar que GitHub Actions `Quality` termina en verde.
3. En Settings → Pages usar `Deploy from a branch`, `main`, `/ (root)`.
4. Esperar a que `pages build and deployment` termine correctamente.
5. Abrir `https://ivan7800.github.io/Portal-Apps-404/`.
6. Hacer una recarga normal y después comprobar que el service worker v41.10.1 controla la página.
7. Ejecutar el checklist manual del apartado 14.
8. Solo entonces promover el estado a PUBLICABLE si no aparecen regresiones.

## 23. Checklist final

- [x] ZIP original conservado sin sobrescribir.
- [x] Arquitectura identificada.
- [x] Catálogo y esquema validados.
- [x] Versionado sincronizado.
- [x] CSP revisada y fallback nativo corregido.
- [x] Service worker endurecido.
- [x] Cache bust renovado.
- [x] Manifest con rutas relativas.
- [x] Assets críticos existentes.
- [x] Assets huérfanos seguros eliminados.
- [x] Sin secretos detectados.
- [x] Sin dependencias vulnerables conocidas.
- [x] 23/23 tests superados.
- [x] Auditoría local 0/0.
- [x] Servido correctamente bajo subruta local por HTTP.
- [ ] E2E real de navegador de esta revisión.
- [ ] Lighthouse de esta revisión.
- [ ] Auditoría online completa.
- [ ] Despliegue real de v41.10.1.
- [ ] Smoke test post-deploy.
- [ ] LICENSE si se desea distribución abierta.

## 24. Paquete final

Se entrega un ZIP nuevo, limpio y separado del original. El ZIP debe validarse mediante extracción limpia y repetición de `npm run check` antes de considerarse entrega final.
