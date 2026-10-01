# Cuba 2026

Especial multimedia sobre la crisis económica, energética y social de Cuba, sus principales fuentes de recursos y la evolución de la presión de Estados Unidos durante 2026.

El proyecto fue desarrollado a partir del diseño suministrado en Adobe XD, conservando su estructura visual, recursos gráficos, tipografías, colores e interacciones principales para las versiones de escritorio (PC) y móvil (MO).

## Tecnologías

- HTML5 semántico.
- CSS3 responsive.
- JavaScript vanilla.
- Adobe Fonts / Typekit para las tipografías definidas en el diseño.
- Recursos gráficos en formato SVG.
- Sin frameworks de frontend.

## Estructura

```txt
.
├── index.html
├── assets/
│   ├── icons/
│   │   ├── flecha-hacia-la-derecha-en-un-circulo.svg
│   │   ├── flecha-hacia-la-izquiarda-en-un-circulo.svg
│   │   └── informe-de-analisis.svg
│   ├── sliders-pc/
│   │   ├── slide-01.svg
│   │   ├── slide-02.svg
│   │   ├── slide-03.svg
│   │   ├── slide-04.svg
│   │   ├── slide-05.svg
│   │   ├── slide-06.svg
│   │   ├── slide-07.svg
│   │   └── slide-08.svg
│   ├── sliders-mo/
│   │   ├── 1.svg
│   │   ├── 2.svg
│   │   ├── 3.svg
│   │   ├── 4.svg
│   │   ├── 5.svg
│   │   ├── 6.svg
│   │   ├── 7.svg
│   │   ├── 8.svg
│   │   └── Mapa_Cuba_Mobile.svg
│   └── TITULO.svg
├── css/
│   └── styles.css
├── js/
│   └── main.js
└── README.md
```

## Implementación

La página está construida como una experiencia editorial de una sola vista, siguiendo la composición y las proporciones definidas en Adobe XD.

La cabecera utiliza `TITULO.svg` como recurso gráfico principal y está acompañada por los textos introductorios definidos en el diseño.

Debajo de la introducción se encuentra un carrusel compuesto por ocho secciones gráficas. Cada sección utiliza un SVG específico para escritorio y otro para móvil.

La navegación del carrusel se realiza mediante:

- `flecha-hacia-la-derecha-en-un-circulo.svg`
- `flecha-hacia-la-izquiarda-en-un-circulo.svg`

En el primer slide solamente se muestra la flecha derecha. En los slides intermedios se muestran ambas flechas y en el último slide solamente se muestra la flecha izquierda.

La sección de cronología utiliza una composición de título diferente al resto de las secciones, respetando la disposición definida en Adobe XD.

## Versión móvil (MO)

Para pantallas de hasta `768px`, el proyecto cambia automáticamente a los recursos ubicados en `assets/sliders-mo/`.

En la sección **Cómo y de dónde obtiene Cuba sus recursos básicos**, el mapa `Mapa_Cuba_Mobile.svg` se presenta dentro de un contenedor con desplazamiento horizontal. El usuario puede recorrerlo con el dedo en dispositivos táctiles o mediante desplazamiento horizontal en otros dispositivos.

El desplazamiento horizontal de este mapa es independiente del carrusel. Mover el mapa no cambia de slide; el cambio de lámina se realiza únicamente con los botones de flecha ubicados junto al título.

En MO, la sección **Fuentes** se encuentra al final del contenido. Al tocar el botón se abre el panel de fuentes y al volver a tocarlo se cierra.

## Diseño y tipografías

Los estilos visuales se basan en las especificaciones suministradas desde Adobe XD. El archivo `css/styles.css` contiene la maquetación general, colores, familias tipográficas, tamaños, pesos, interlineados y ajustes responsive utilizados en la página.

El color principal de fondo del proyecto es:

```css
background: #F3F4E1;
```

Las fuentes se cargan mediante Adobe Fonts / Typekit:

```html
<link rel="stylesheet" href="https://use.typekit.net/xkd2kgw.css">
```

Typekit se encarga de cargar la familia tipográfica Source Serif Pro utilizada en el diseño.

## Fuentes

En escritorio, el acceso **Fuentes** aparece en la zona superior derecha, acompañado por `informe-de-analisis.svg`.

En móvil, el acceso se ubica al final de la experiencia.

Al hacer clic o tocar **Fuentes**, se despliega el panel correspondiente. Al volver a pulsar el botón se oculta nuevamente. También puede cerrarse haciendo clic fuera del panel o mediante la tecla `Esc`.

## Carrusel e interacciones

El archivo `js/main.js` controla:

- Navegación entre los ocho slides.
- Cambio automático entre los SVG de PC y MO según el ancho de pantalla.
- Visibilidad de las flechas anterior y siguiente.
- Navegación entre slides únicamente mediante los botones de flecha ubicados junto al título.
- Desplazamiento horizontal independiente del mapa en MO.
- Apertura y cierre de la sección Fuentes.
