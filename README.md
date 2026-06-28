# I. Roig · Portal Apps 404

> Ecosistema premium de apps web, herramientas creativas, ficción interactiva y Universo 404.

**v23 · Commercial Premium**

Portal web estático preparado para **GitHub Pages**, sin frameworks, sin tracking, sin CDN y con soporte PWA/offline.

## Qué incluye

- **46 apps** organizadas por saga, categoría y rutas rápidas.
- Bloque destacado para **Web Architect**: “Crea modelos pro de webs en segundos”.
- Secciones curadas: **Top apps**, **Nuevas**, **Para escritores**, **Para devs** y **Universo 404**.
- Etiquetas de utilidad en tarjetas: Web app, PWA, Offline, Escritura, Diseño, Dev, IA, Juego, Privacidad, Universo 404.
- Mockups SVG locales mejorados para las apps principales.
- Búsqueda, filtros, ordenación, favoritos locales y copia de enlaces.
- **8 temas visuales**: Darknight, Claro, Bosque, Royal, Mono, Sunset, Océano y Oro.
- Accesibilidad: skip-link, ARIA, focus-visible, botones táctiles y layout móvil reforzado.
- Seguridad: CSP, sin `eval`, sin dependencias externas y enlaces externos con `noopener noreferrer`.

## Estructura

```text
├── index.html          # Entrada principal
├── 404.html            # Página de error
├── styles.css          # UI, responsive, temas y secciones premium
├── app.js              # Lógica del portal
├── app-data.js         # Datos de las 46 apps
├── manifest.webmanifest
├── sw.js               # Service Worker v23
├── icons/              # Iconos SVG
└── assets/screenshots/ # Mockups/previews SVG locales
```

## Publicación en GitHub Pages

1. Sube todo el contenido de `portal-fixed/` al repositorio.
2. En GitHub: **Settings → Pages → Deploy from branch**.
3. Selecciona `main` y carpeta `/root`.
4. Abre la URL pública del repo.

## Versión v23

- Hero reescrito con mensaje más comercial y claro.
- Web Architect añadido como spotlight en portada.
- Rutas rápidas añadidas para reducir saturación del catálogo.
- Tarjetas enriquecidas con etiquetas de utilidad.
- Mockups principales rediseñados para parecer más producto real.
- Cache busting actualizado a `v23`.
- Service worker actualizado a `portal-apps-404-v23-commercial`.

© I. Roig — ivan7800.github.io
