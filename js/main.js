(() => {
  const slides = [
    {
      title: "EL CUELLO DE BOTELLA: EL PETRÓLEO",
      src: "assets/sliders/slide-01.svg",
      alt: "Infografía: El cuello de botella, el petróleo."
    },
    {
      title: "CÓMO Y DE DÓNDE OBTIENE CUBA SUS RECURSOS BÁSICOS",
      src: "assets/sliders/slide-02.svg",
      alt: "Infografía: Cómo y de dónde obtiene Cuba sus recursos básicos."
    },
    {
      title: "LA ISLA SE QUEDA SIN GENTE",
      src: "assets/sliders/slide-03.svg",
      alt: "Infografía: La isla se queda sin gente."
    },
    {
      title: "UNA ECONOMÍA QUE LLEVA AÑOS CONTRAYÉNDOSE",
      src: "assets/sliders/slide-04.svg",
      alt: "Infografía: Una economía que lleva años contrayéndose."
    },
    {
      title: "EL TURISMO SE HUNDE",
      src: "assets/sliders/slide-05.svg",
      alt: "Infografía: El turismo se hunde."
    },
    {
      title: "QUIÉN MANDA EN CUBA",
      src: "assets/sliders/slide-06.svg",
      alt: "Infografía: Quién manda en Cuba."
    },
    {
      title: "CRONOLOGÍA: ASÍ HA EVOLUCIONADO LA PRESIÓN DE EE. UU. EN 2026",
      titleLines: ["CRONOLOGÍA:", "ASÍ HA EVOLUCIONADO LA PRESIÓN DE EE. UU. EN 2026"],
      src: "assets/sliders/slide-07.svg",
      alt: "Infografía: Cronología, así ha evolucionado la presión de Estados Unidos en 2026."
    },
    {
      title: "LOS UMBRALES QUE DEFINIRÁN EL LÍMITE",
      src: "assets/sliders/slide-08.svg",
      alt: "Infografía: Los umbrales que definirán el límite."
    }
  ];

  const title = document.querySelector("[data-slide-title]");
  const image = document.querySelector("[data-slide-image]");
  const status = document.querySelector("[data-slide-status]");
  const prev = document.querySelector("[data-prev]");
  const next = document.querySelector("[data-next]");
  const slider = document.querySelector(".slider");

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
    renderTitle(slide);
    image.src = slide.src;
    image.alt = slide.alt;
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
    if (event.key === "ArrowLeft") {
      event.preventDefault();
      goTo(current - 1);
    }
    if (event.key === "ArrowRight") {
      event.preventDefault();
      goTo(current + 1);
    }
  });

  // Soporte de gesto horizontal en pantallas táctiles.
  let touchStartX = null;
  slider.addEventListener("touchstart", (event) => {
    touchStartX = event.changedTouches[0]?.clientX ?? null;
  }, { passive: true });

  slider.addEventListener("touchend", (event) => {
    if (touchStartX === null) return;
    const touchEndX = event.changedTouches[0]?.clientX ?? touchStartX;
    const delta = touchEndX - touchStartX;
    touchStartX = null;
    if (Math.abs(delta) < 55) return;
    goTo(delta > 0 ? current - 1 : current + 1);
  }, { passive: true });

  const sourcesRoot = document.querySelector("[data-sources]");
  const sourcesTrigger = document.querySelector("[data-sources-trigger]");
  const sourcesPanel = document.querySelector("[data-sources-panel]");

  function setSourcesOpen(open) {
    sourcesTrigger.setAttribute("aria-expanded", String(open));
    sourcesPanel.hidden = !open;
  }

  sourcesTrigger.addEventListener("click", () => {
    setSourcesOpen(sourcesPanel.hidden);
  });

  document.addEventListener("click", (event) => {
    if (!sourcesPanel.hidden && !sourcesRoot.contains(event.target)) {
      setSourcesOpen(false);
    }
  });

  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape" && !sourcesPanel.hidden) {
      setSourcesOpen(false);
      sourcesTrigger.focus();
    }
  });

  renderSlide(current);
})();
