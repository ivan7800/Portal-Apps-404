# Auditoría de release · Universo 404 OS v38.2

Fecha: 2026-09-09
Alcance: portal estático/PWA recibido como v38.1 y evolución a v38.2
Estado final: **PUBLICABLE CON LIMITACIONES**

## 1. Estado inicial

La base v38.1 era funcional y no requería compilación, pero todavía tenía riesgos de release: el service worker podía eliminar cachés ajenas del mismo origen, la búsqueda reconstruía toda la interfaz, varios estados se inferían desde textos, faltaban pruebas automatizadas y algunos controles no alcanzaban un objetivo táctil adecuado.

Puntuación de partida de esta iteración: **8,2/10**.

## 2. Arquitectura detectada

- Aplicación web estática sin backend ni dependencias de ejecución.
- HTML, CSS y JavaScript clásicos; punto de entrada `index.html`.
- Catálogo global cargado desde `assets/data.js`.
- Persistencia de preferencias, favoritos y recientes mediante `localStorage`.
- PWA con manifest y service worker, destinada a una subruta de GitHub Pages.
- Enlaces externos hacia las aplicaciones y sus repositorios.
- Sin autenticación, base de datos, telemetría ni carga de archivos.

## 3. Función principal

Descubrir una de las 94 aplicaciones mediante búsqueda, filtros, intenciones, mundos o selección editorial; abrir su ficha y continuar hacia la aplicación o el repositorio correspondiente.

## 4. Problemas priorizados

| ID | Severidad | Resultado |
|---|---|---|
| REL-101 | Alta | Corregido: aislamiento de cachés PWA |
| REL-102 | Media | Corregido: búsqueda sin rerender completo |
| REL-103 | Media | Corregido: estados editoriales explícitos |
| REL-104 | Media | Corregido: semántica de la paleta universal |
| REL-105 | Media | Corregido: objetivos táctiles y safe areas |
| REL-106 | Baja | Corregido: filtros activos removibles |
| REL-107 | Media | Corregido: proyecto entregado solo como repositorio |
| REL-108 | Media | Corregido: pruebas, auditoría y CI |
| REL-109 | Media | No verificable: 188 URLs externas |
| REL-110 | Media | Pendiente: licencia del repositorio |
| REL-111 | Media | No verificable: recorrido visual en navegador real de v38.2 |

## 5. Hallazgos

### [REL-101] Limpieza PWA demasiado amplia

- **Severidad:** ALTA
- **Estado:** CORREGIDO
- **Archivo:** `sw.js`
- **Evidencia:** la activación anterior eliminaba cualquier caché cuyo nombre no coincidiera con la versión actual.
- **Impacto:** en un mismo origen de GitHub Pages podía borrar cachés pertenecientes a otros proyectos.
- **Causa:** ausencia de un prefijo de propiedad al filtrar cachés antiguas.
- **Corrección aplicada:** `CACHE_PREFIX` y eliminación limitada a claves que empiezan por ese prefijo. Las lecturas se hacen además desde la caché propia de esta versión.
- **Verificación:** prueba automatizada conserva `another-app-v1` y elimina únicamente la caché anterior de Portal Apps 404.
- **Riesgo pendiente:** ninguno conocido dentro de la lógica comprobada.

### [REL-102] Búsqueda costosa y pérdida potencial de foco

- **Severidad:** MEDIA
- **Estado:** CORREGIDO
- **Archivo:** `assets/app.js`, `assets/catalog-utils.js`
- **Evidencia:** cada pulsación terminaba reconstruyendo el árbol completo de la aplicación.
- **Impacto:** trabajo DOM innecesario, posible pérdida de foco y peor respuesta en equipos móviles.
- **Causa:** renderizado monolítico.
- **Corrección aplicada:** módulo puro de búsqueda y actualización limitada a `#catalog-content`.
- **Verificación:** pruebas de normalización, alias y ranking; prueba de regresión que impide modificar `root.innerHTML` en el actualizador parcial.
- **Riesgo pendiente:** no se ha medido con un perfilador en dispositivos de gama baja.

### [REL-103] Metadatos derivados de textos libres

- **Severidad:** MEDIA
- **Estado:** CORREGIDO
- **Archivo:** `assets/data.js`, `assets/app.js`, `scripts/audit.mjs`
- **Evidencia:** estado, plataforma y soporte offline dependían de inferencias sobre nombre, categoría o descripción.
- **Impacto:** una edición de copy podía cambiar el significado operativo de una ficha.
- **Causa:** esquema de datos incompleto.
- **Corrección aplicada:** esquema v2 con `status`, `availability`, `offline`, `platform` y `delivery` en las 94 fichas.
- **Verificación:** auditor y pruebas validan presencia, vocabularios y coherencia de todas las entradas.
- **Riesgo pendiente:** los valores editoriales deben mantenerse al incorporar nuevas aplicaciones.

### [REL-104] Paleta universal sin selección activa completa

- **Severidad:** MEDIA
- **Estado:** CORREGIDO
- **Archivo:** `assets/app.js`
- **Evidencia:** la selección visual no estaba expuesta de forma suficiente a tecnologías de asistencia.
- **Impacto:** navegación ambigua con lector de pantalla.
- **Causa:** faltaban roles de combobox/listbox/option y `aria-activedescendant`.
- **Corrección aplicada:** semántica ARIA, actualización de `aria-selected` y asociación estable de resultados, incluido el estado vacío.
- **Verificación:** prueba estructural automatizada y revisión del flujo de teclado en código.
- **Riesgo pendiente:** falta validación con un lector de pantalla real.

### [REL-105] Controles táctiles pequeños

- **Severidad:** MEDIA
- **Estado:** CORREGIDO
- **Archivo:** `assets/styles.css`
- **Evidencia:** varios botones de icono y favoritos quedaban por debajo de 44 px.
- **Impacto:** mayor tasa de errores táctiles y divergencia respecto a WCAG 2.2 AA como referencia.
- **Causa:** dimensiones priorizadas para escritorio.
- **Corrección aplicada:** mínimos de 44 × 44 px, safe areas y ajustes móviles y de contraste forzado.
- **Verificación:** inspección estática de reglas responsive.
- **Riesgo pendiente:** falta medición visual real en 320, 375, 390 px y tablet.

### [REL-106] Estado de filtros poco visible

- **Severidad:** BAJA
- **Estado:** CORREGIDO
- **Archivo:** `assets/app.js`, `assets/styles.css`
- **Evidencia:** solo era posible limpiar todo el conjunto y no se veía cada condición aplicada.
- **Impacto:** menor claridad al combinar búsqueda, mundo, intención, tecnología y ordenación.
- **Causa:** toolbar sin representación del estado compuesto.
- **Corrección aplicada:** chips removibles y contador en el botón de limpieza.
- **Verificación:** lógica cubierta por auditoría sintáctica y renderizado de estados vacíos.
- **Riesgo pendiente:** validación manual de copy con usuarios.

### [REL-107] Acción engañosa para una entrega solo como repositorio

- **Severidad:** MEDIA
- **Estado:** CORREGIDO
- **Archivo:** `assets/data.js`, `assets/app.js`
- **Evidencia:** cuando `pages` y `github` eran el mismo destino, la ficha presentaba dos acciones equivalentes.
- **Impacto:** prometía una aplicación publicada donde solo se había catalogado un repositorio.
- **Causa:** ausencia del campo `delivery`.
- **Corrección aplicada:** acción única “Abrir repositorio” para esa ficha y validación del esquema.
- **Verificación:** prueba de coherencia `delivery === repository`.
- **Riesgo pendiente:** actualizar `delivery` cuando el proyecto obtenga despliegue web.

### [REL-108] Release sin red de seguridad automatizada

- **Severidad:** MEDIA
- **Estado:** CORREGIDO
- **Archivo:** `package.json`, `package-lock.json`, `tests/`, `.github/workflows/quality.yml`
- **Evidencia:** no existían pruebas ni ejecución CI versionada.
- **Impacto:** regresiones de catálogo, búsqueda y PWA podían publicarse sin señal previa.
- **Causa:** proceso de release manual.
- **Corrección aplicada:** 13 pruebas con `node:test`, auditor ampliado y workflow Quality.
- **Verificación:** 13/13 pruebas superadas y auditoría con 0 errores y 0 avisos, también desde un clon con metadatos `.git`.
- **Riesgo pendiente:** CI solo se comprobará definitivamente al subirlo a GitHub.

### [REL-109] Disponibilidad externa no comprobada

- **Severidad:** MEDIA
- **Estado:** NO VERIFICABLE
- **Archivo:** `assets/data.js`
- **Evidencia:** las 94 fichas declaran `availability: unverified`.
- **Impacto:** algún enlace puede redirigir, requerir acceso o no estar disponible.
- **Causa:** el entorno de auditoría no permitió comprobar de forma fiable las 188 URLs externas.
- **Corrección aplicada:** la UI deja de presentar esas direcciones como verificadas y el auditor ofrece un modo `--online`.
- **Verificación:** esquema y copy comprobados localmente.
- **Riesgo pendiente:** ejecutar `npm run audit:online` en una red abierta y revisar los resultados.

### [REL-110] Repositorio sin licencia

- **Severidad:** MEDIA
- **Estado:** PENDIENTE
- **Archivo:** `LICENSE` ausente
- **Evidencia:** no existe un texto de licencia.
- **Impacto:** quedan sin definir los permisos de copia, modificación y redistribución.
- **Causa:** decisión legal/editorial no proporcionada.
- **Corrección aplicada:** limitación documentada; no se inventó una licencia.
- **Verificación:** comprobación del árbol final.
- **Riesgo pendiente:** elegir y añadir la licencia correspondiente antes de aceptar contribuciones externas.

### [REL-111] Validación visual de la versión modificada

- **Severidad:** MEDIA
- **Estado:** NO VERIFICABLE
- **Archivo:** conjunto de la interfaz
- **Evidencia:** el servidor local respondió correctamente, pero la versión v38.2 no estaba desplegada en una URL accesible al navegador de prueba disponible.
- **Impacto:** no existe evidencia completa de layout, consola, teclado, lector de pantalla ni instalación PWA en navegador real para esta build.
- **Causa:** separación entre el entorno local de archivos y el navegador remoto.
- **Corrección aplicada:** pruebas puras y de service worker, auditoría de recursos y comprobación HTTP local.
- **Verificación:** todos los recursos críticos respondieron 200 con MIME adecuado.
- **Riesgo pendiente:** ejecutar el checklist manual indicado antes de promocionar la release.

## 6. Clasificación funcional

| Función | Clasificación | Evidencia |
|---|---|---|
| Carga del portal y recursos | REAL | HTTP 200 y auditor de referencias |
| Catálogo de 94 apps | REAL | esquema e invariantes probados |
| Búsqueda y ranking | REAL | módulo puro y 4 pruebas de catálogo |
| Filtros y ordenación | REAL | handlers y estado URL implementados |
| Fichas modales | REAL | implementación, escape, focus trap y restauración |
| Favoritos y recientes | REAL | persistencia local implementada |
| Skins y movimiento reducido | REAL | estado persistente y reglas CSS |
| Estado compartible en URL | REAL | History API y `popstate` implementados |
| Shell offline del portal | REAL | service worker probado en aislamiento |
| Offline de las apps enlazadas | AUSENTE | el portal no controla aplicaciones externas |
| Instalación PWA | NO VERIFICABLE | depende del navegador y no se probó en dispositivo |
| Compartir ficha | PARCIAL | Web Share con fallback a portapapeles/prompt |
| Disponibilidad de enlaces externos | NO VERIFICABLE | auditoría online pendiente |
| Backend, cuenta y sincronización | AUSENTE | no forman parte del producto anunciado |
| Funciones esenciales simuladas | ninguna detectada | revisión de código y patrones |

## 7. Cambios realizados

### Archivos creados

- `assets/catalog-utils.js`
- `tests/catalog.test.mjs`
- `tests/release.test.mjs`
- `tests/service-worker.test.mjs`
- `package.json`
- `package-lock.json`
- `.github/workflows/quality.yml`
- `.gitignore`
- `CHANGELOG.md`
- `CONTRIBUTING.md`
- `SECURITY.md`
- `RELEASE_AUDIT_v38.2.md`

### Archivos modificados

- `index.html`
- `assets/app.js`
- `assets/data.js`
- `assets/styles.css`
- `manifest.webmanifest`
- `sw.js`
- `scripts/audit.mjs`
- `README.md`

### Archivos eliminados

- Ninguno. No se detectaron capturas huérfanas, backups, temporales de editor ni secretos que justificaran una eliminación.

## 8. Verificación ejecutada

Comandos equivalentes ejecutados:

```bash
node --check assets/data.js
node --check assets/catalog-utils.js
node --check assets/app.js
node --check sw.js
node scripts/audit.mjs
node --test tests/*.test.mjs
python3 -m http.server 8765 --bind 127.0.0.1
curl http://127.0.0.1:8765/...
```

Resultados:

- Auditoría local: **94 apps, 0 avisos, 0 errores**.
- Tests: **13 superados, 0 fallidos, 0 omitidos**.
- Sintaxis JavaScript: **4/4 archivos comprobados sin error**.
- Recursos críticos servidos: **8/8 con HTTP 200 y MIME esperado**.
- Capturas: **78 únicas referenciadas, 0 huérfanas**.
- Secretos y patrones de temporales: **ninguno detectado por la revisión local**.

El intento de `npm install --package-lock-only --ignore-scripts` fue bloqueado por la política de red del entorno. El proyecto no tiene dependencias; el lockfile v3 quedó generado y las órdenes subyacentes de `npm run check` se ejecutaron una por una con éxito.

## 9. Pruebas no ejecutadas y comprobaciones pendientes

- Auditoría online de las 188 URLs externas.
- Prueba visual de v38.2 en Chrome, Firefox y Safari.
- Consola del navegador en los flujos interactivos.
- Lector de pantalla NVDA/VoiceOver.
- Vista real a 320, 375, 390 px, tablet y escritorio.
- Instalación, actualización y recuperación PWA en un dispositivo.
- Lighthouse o WebPageTest desde el despliegue final.
- Ejecución real del workflow en GitHub Actions.

## 10. Seguridad y privacidad

- CSP presente y recursos de ejecución autoalojados.
- Todo texto del catálogo se escapa antes de insertarlo mediante plantillas HTML.
- Enlaces externos con `target="_blank"` usan `rel="noopener noreferrer"`.
- No se detectaron credenciales, tokens, cookies, telemetría ni APIs remotas.
- `localStorage` conserva preferencias, favoritos y recientes hasta que el usuario limpie los datos del sitio.
- El service worker solo intercepta peticiones GET del mismo origen y solo elimina su familia de cachés.

## 11. Estado, puntuación y límites

Estado final: **PUBLICABLE CON LIMITACIONES**.

La build no presenta bloqueantes conocidos en estructura, catálogo ni PWA y es compatible con hosting estático en subruta. No se clasifica como PUBLICABLE sin matices porque faltan la verificación de enlaces externos, la ejecución visual/manual sobre la build desplegada y una decisión de licencia.

Puntuación final: **8,8/10 — producto sólido**.

Para acercarse a 10/10 faltaría:

1. desplegar esta build en una URL de staging;
2. ejecutar el recorrido manual y multidispositivo completo;
3. validar accesibilidad con herramientas y lector de pantalla;
4. comprobar las 188 URLs y registrar fecha/resultado en el catálogo;
5. medir rendimiento real y resolver cualquier regresión;
6. añadir la licencia elegida;
7. comprobar el workflow y un ciclo real de actualización PWA.

## 12. Ejecución y publicación

Ejecución local:

```bash
python3 -m http.server 8080
```

Abrir `http://localhost:8080`. Para calidad:

```bash
npm run check
npm run audit:online
```

Publicación en GitHub Pages:

1. subir el contenido del ZIP a la raíz de la rama `main`;
2. seleccionar **Settings → Pages → Deploy from a branch → main / root**;
3. esperar a que termine Pages y el workflow Quality;
4. abrir la URL bajo `/Portal-Apps-404/` y forzar una recarga una vez;
5. completar el checklist manual y probar una actualización desde la caché anterior.

## 13. Checklist final

- [x] Sin backend obligatorio ni dependencias de ejecución.
- [x] Rutas principales relativas y compatibles con subruta.
- [x] Manifest coherente y parseable.
- [x] Service worker versionado, aislado y probado.
- [x] Catálogo válido, único y con recursos existentes.
- [x] Sin secretos o temporales detectados.
- [x] README, changelog, contribución, seguridad e instrucciones actualizados.
- [x] ZIP nuevo sin sobrescribir el original.
- [ ] URLs externas comprobadas desde una red abierta.
- [ ] Navegadores, móvil, lector de pantalla e instalación PWA validados.
- [ ] Licencia elegida y añadida.
