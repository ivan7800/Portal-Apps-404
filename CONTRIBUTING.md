# Contribuir

## Requisitos

- Node.js 20 o posterior.
- Un navegador moderno para la comprobación manual.

## Flujo

1. Crea una rama desde `main`.
2. Modifica el catálogo conservando el esquema de `assets/data.js`.
3. Añade o reutiliza una captura local con una justificación clara.
4. Ejecuta `npm run check`.
5. Sirve el proyecto con `python3 -m http.server 8080` y prueba el flujo afectado.
6. Describe en el pull request el cambio, las pruebas y cualquier limitación.

## Reglas del catálogo

- No marques `availability` como `verified` sin comprobar las dos URL.
- `offline: "declared"` significa que la ficha lo afirma; no equivale a una certificación.
- Usa `delivery: "repository"` cuando no exista una aplicación web y `pages` sea el mismo enlace que `github`.
- No añadas secretos, telemetría ni recursos remotos sin documentar la necesidad y el impacto de privacidad.

## Checklist de interfaz

- Teclado, Escape, foco y navegación atrás/adelante.
- 320, 360, 390, 768 y 1440 píxeles.
- Movimiento reducido.
- Instalación, actualización y modo offline de la PWA cuando se modifique el shell.
