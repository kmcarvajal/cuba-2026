# Cuba 2026 — infografía interactiva

Proyecto HTML/CSS/JS construido a partir de los SVG y especificaciones del diseño suministrado.

## Ejecutar

Puedes abrir `index.html` directamente en el navegador. Para evitar restricciones de algunos navegadores con archivos locales, también puedes levantar un servidor local desde esta carpeta:

```bash
python -m http.server 8000
```

Luego abre `http://localhost:8000`.

## Estructura

- `index.html`: estructura principal, bloque de fuentes, introducción y carrusel.
- `css/styles.css`: maquetación, tipografía y comportamiento responsive.
- `js/main.js`: navegación de las ocho láminas y apertura/cierre de Fuentes.
- `assets/TITULO.svg`: encabezado gráfico.
- `assets/icons/`: iconos suministrados.
- `assets/sliders/slide-01.svg` a `slide-08.svg`: láminas del carrusel.

El proyecto intenta conservar las medidas del arte de escritorio de 1920 px y se adapta a pantallas más pequeñas.
