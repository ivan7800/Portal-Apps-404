# Portal Apps 404 — Auditoría visual v41.32

Fecha: 2026-09-27

## Resultado

- 101 aplicaciones catalogadas (96 base + 5 incorporaciones recientes).
- 101 rutas de imagen propias/distintas tras aplicar el mapa visual v41.32.
- 0 fichas que dependan de la portada de otra aplicación.
- Se mantienen las capturas/portadas reales ya existentes de Night Shift 404, QUINQUI 404 y el resto de apps que ya tenían imagen propia.
- Las cinco incorporaciones recientes conservan portadas individuales: Pocket-404-DX, Blackthorn-404, Bomb-Sweeper-87, Abyssal-Descent e Historias-del-Bloque-404.

## Portadas sustituidas en v41.32

- AppHub-404
- Novel-Forge-404
- Motion-404
- Luna-Natura-404
- MYTHOS-404
- Comic-Reader-404
- PixelForge-404
- MD-Forge-404
- FileDoctor-404
- HumanScript-404
- IT-Commander-404
- SECOND-BRAIN-404
- Ringtone-404
- ReleaseForge-404
- Compra-404
- Caminos-Malditos-Sangrientos

## Criterio

Cada ficha debe tener una imagen con identidad propia y coherente con su función. Se evita reutilizar imágenes entre aplicaciones y se priorizan capturas reales cuando existen; en su ausencia se utiliza una portada editorial local específica para la app.

## Implementación

`assets/visual-covers-v4132.js` aplica las nuevas rutas antes del render del catálogo. El Service Worker usa la caché `v41-32-definitive-visual-covers` para invalidar versiones anteriores y precargar las nuevas portadas clave.
