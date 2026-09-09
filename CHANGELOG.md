# Changelog

Los cambios relevantes del proyecto se documentan en este archivo.

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
