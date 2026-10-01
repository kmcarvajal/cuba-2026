(() => {
  const slides = [
    {
      title: "EL CUELLO DE BOTELLA: EL PETRÓLEO",
      desktopSrc: "assets/sliders-pc/slide-01.svg",
      mobileSrc: "assets/sliders-mo/1.svg",
      alt: "Infografía: El cuello de botella, el petróleo."
    },
    {
      title: "CÓMO Y DE DÓNDE OBTIENE CUBA SUS RECURSOS BÁSICOS",
      desktopSrc: "assets/sliders-pc/slide-02.svg",
      mobileSrc: "assets/sliders-mo/2.svg",
      mobileMap: true,
      alt: "Infografía: Cómo y de dónde obtiene Cuba sus recursos básicos."
    },
    {
      title: "LA ISLA SE QUEDA SIN GENTE",
      desktopSrc: "assets/sliders-pc/slide-03.svg",
      mobileSrc: "assets/sliders-mo/3.svg",
      alt: "Infografía: La isla se queda sin gente."
    },
    {
      title: "UNA ECONOMÍA QUE LLEVA AÑOS CONTRAYÉNDOSE",
      desktopSrc: "assets/sliders-pc/slide-04.svg",
      mobileSrc: "assets/sliders-mo/4.svg",
      alt: "Infografía: Una economía que lleva años contrayéndose."
    },
    {
      title: "EL TURISMO SE HUNDE",
      desktopSrc: "assets/sliders-pc/slide-05.svg",
      mobileSrc: "assets/sliders-mo/5.svg",
      alt: "Infografía: El turismo se hunde."
    },
    {
      title: "QUIÉN MANDA EN CUBA",
      desktopSrc: "assets/sliders-pc/slide-06.svg",
      mobileSrc: "assets/sliders-mo/6.svg",
      alt: "Infografía: Quién manda en Cuba."
    },
    {
      title: "CRONOLOGÍA: ASÍ HA EVOLUCIONADO LA PRESIÓN DE EE. UU. EN 2026",
      titleLines: ["CRONOLOGÍA:", "ASÍ HA EVOLUCIONADO LA PRESIÓN DE EE. UU. EN 2026"],
      desktopSrc: "assets/sliders-pc/slide-07.svg",
      mobileSrc: "assets/sliders-mo/7.svg",
      alt: "Infografía: Cronología, así ha evolucionado la presión de Estados Unidos en 2026."
    },
    {
      title: "LOS UMBRALES QUE DEFINIRÁN EL LÍMITE",
      desktopSrc: "assets/sliders-pc/slide-08.svg",
      mobileSrc: "assets/sliders-mo/8.svg",
      alt: "Infografía: Los umbrales que definirán el límite."
    }
  ];

  const mobileQuery = window.matchMedia("(max-width: 768px)");
  const title = document.querySelector("[data-slide-title]");
  const image = document.querySelector("[data-slide-image]");
  const status = document.querySelector("[data-slide-status]");
  const prev = document.querySelector("[data-prev]");
  const next = document.querySelector("[data-next]");
  const slider = document.querySelector(".slider");
  const mobileMap = document.querySelector("[data-mobile-map]");
  const mapScroller = document.querySelector("[data-map-scroller]");

  let current = 0;

  function renderTitle(slide) {
    title.classList.toggle("is-chronology", Boolean(slide.titleLines));
    title.replaceChildren();

    if (slide.titleLines) {
      slide.titleLines.forEach((line) => {
        const span = document.createElement("span");
        span.textContent = line;
        title.appendChild(span);
      });
      return;
    }

    title.textContent = slide.title;
  }

  function renderSlide(index) {
    const slide = slides[index];
    const isMobile = mobileQuery.matches;

    renderTitle(slide);
    image.src = isMobile ? slide.mobileSrc : slide.desktopSrc;
    image.alt = slide.alt;

    const showMobileMap = isMobile && Boolean(slide.mobileMap);
    mobileMap.hidden = !showMobileMap;

    if (showMobileMap && mapScroller) {
      // Cada vez que se entra a esta lámina, el mapa inicia desde el occidente de Cuba.
      mapScroller.scrollLeft = 0;
    }

    prev.hidden = index === 0;
    next.hidden = index === slides.length - 1;
    status.textContent = `Lámina ${index + 1} de ${slides.length}: ${slide.title}`;
  }

  function goTo(index) {
    if (index < 0 || index >= slides.length || index === current) return;
    current = index;
    renderSlide(current);
  }

  prev.addEventListener("click", () => goTo(current - 1));
  next.addEventListener("click", () => goTo(current + 1));

  slider.addEventListener("keydown", (event) => {
    // Si el foco está en el mapa móvil, las flechas deben desplazar el mapa,
    // no cambiar de lámina.
    if (event.target.closest?.("[data-map-scroller]")) return;

    if (event.key === "ArrowLeft") {
      event.preventDefault();
      goTo(current - 1);
    }
    if (event.key === "ArrowRight") {
      event.preventDefault();
      goTo(current + 1);
    }
  });

  // Gesto horizontal para cambiar de lámina, excepto dentro del mapa desplazable.
  let touchStartX = null;
  let touchStartedOnMap = false;

  slider.addEventListener("touchstart", (event) => {
    touchStartedOnMap = Boolean(event.target.closest?.("[data-map-scroller]"));
    if (touchStartedOnMap) {
      touchStartX = null;
      return;
    }

    touchStartX = event.changedTouches[0]?.clientX ?? null;
  }, { passive: true });

  slider.addEventListener("touchend", (event) => {
    if (touchStartedOnMap) {
      touchStartedOnMap = false;
      touchStartX = null;
      return;
    }

    if (touchStartX === null) return;
    const touchEndX = event.changedTouches[0]?.clientX ?? touchStartX;
    const delta = touchEndX - touchStartX;
    touchStartX = null;

    if (Math.abs(delta) < 55) return;
    goTo(delta > 0 ? current - 1 : current + 1);
  }, { passive: true });

  // Al cruzar el breakpoint se cambia automáticamente entre SVG de PC y MO.
  const handleViewportChange = () => renderSlide(current);
  if (typeof mobileQuery.addEventListener === "function") {
    mobileQuery.addEventListener("change", handleViewportChange);
  } else {
    mobileQuery.addListener(handleViewportChange);
  }

  // ---------- Fuentes: hay una versión de escritorio y otra al final en MO. ----------
  const sourceBlocks = [...document.querySelectorAll("[data-sources]")];

  function setSourcesOpen(root, open) {
    const trigger = root.querySelector("[data-sources-trigger]");
    const panel = root.querySelector("[data-sources-panel]");
    if (!trigger || !panel) return;

    trigger.setAttribute("aria-expanded", String(open));
    panel.hidden = !open;
  }

  sourceBlocks.forEach((root) => {
    const trigger = root.querySelector("[data-sources-trigger]");
    const panel = root.querySelector("[data-sources-panel]");
    if (!trigger || !panel) return;

    trigger.addEventListener("click", () => {
      const willOpen = panel.hidden;

      // Mantiene una sola caja abierta si cambia el viewport.
      sourceBlocks.forEach((otherRoot) => {
        if (otherRoot !== root) setSourcesOpen(otherRoot, false);
      });

      setSourcesOpen(root, willOpen);
    });
  });

  document.addEventListener("click", (event) => {
    sourceBlocks.forEach((root) => {
      const panel = root.querySelector("[data-sources-panel]");
      if (panel && !panel.hidden && !root.contains(event.target)) {
        setSourcesOpen(root, false);
      }
    });
  });

  document.addEventListener("keydown", (event) => {
    if (event.key !== "Escape") return;

    sourceBlocks.forEach((root) => {
      const trigger = root.querySelector("[data-sources-trigger]");
      const panel = root.querySelector("[data-sources-panel]");
      if (panel && !panel.hidden) {
        setSourcesOpen(root, false);
        trigger?.focus();
      }
    });
  });

  renderSlide(current);
})();
