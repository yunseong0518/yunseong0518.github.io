const researchInterests =
  "I work on computational imaging — capturing and modeling light beyond what " +
  "conventional cameras see, across hyperspectral bands and polarization.";

const showcaseProjects = [
  {
    title: "Hyperspectral Polarimetric BRDFs",
    venue: "SIGGRAPH Asia 2025",
    pub: "hpbrdf",
    poster: "assets/showcase/poster_sigasia2025_moon.jpg",
    video: "assets/showcase/video_sigasia2025_moon.mp4",
  },
  {
    title: "Broadband Hyperspectral 3D Imaging",
    venue: "SIGGRAPH 2026",
    pub: "broadband",
    poster: "assets/showcase/poster_sig2026_shin.jpg",
    video: "assets/showcase/video_sig2026_shin.mp4",
  },
  {
    title: "Event Ellipsometer",
    venue: "CVPR 2025 (highlight)",
    pub: "event",
    poster: "assets/showcase/poster_cvpr2025_ryota.jpg",
    video: "assets/showcase/video_cvpr2025_ryota.mp4",
  },
  {
    title: "Spectral & Polarization Vision",
    venue: "CVPR 2024 (highlight)",
    pub: "spectral",
    poster: "assets/showcase/poster_cvpr2024_jeon.jpg",
  },
  {
    title: "Transient Polarimetry",
    venue: "SIGGRAPH 2026 (Poster)",
    pub: "transient",
    poster: "assets/showcase/poster_sig2026_oscar.jpg",
    video: "assets/showcase/video_sig2026_oscar.mp4",
  },
];

const AUTO_ADVANCE_MS = 7000; // how long each slide is shown before auto-advancing

const prefersReducedMotion =
  window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches;

function decodeImage(url) {
  return new Promise((resolve) => {
    const im = new Image();
    im.onload = () => resolve(true);
    im.onerror = () => resolve(false);
    im.src = url;
    if (im.decode) im.decode().catch(() => {});
  });
}

function mountStill(media, url, alt) {
  const img = document.createElement("img");
  img.className = "showcase-frame";
  img.alt = alt;
  img.decoding = "async";
  media.appendChild(img);

  let loaded = false;
  function load() {
    if (loaded) return;
    loaded = true;
    img.onload = () => img.classList.add("is-ready");
    img.src = url;
  }

  return {
    activate: load,
    deactivate() {},
    preload: load,
  };
}

// A looping <video> slide with a poster fallback.
function mountVideo(media, videoUrl, poster, alt) {
  const img = document.createElement("img"); // poster shown until the video paints
  img.className = "showcase-frame";
  img.alt = alt;
  img.decoding = "async";
  if (poster) img.src = poster;
  img.onload = () => img.classList.add("is-ready");
  media.appendChild(img);

  const video = document.createElement("video");
  video.className = "showcase-frame";
  video.muted = true;
  video.loop = true;
  video.playsInline = true;
  video.preload = "none"; // don't touch the network until activated
  video.setAttribute("aria-label", alt);
  media.appendChild(video);

  return {
    activate() {
      if (!video.src) video.src = videoUrl; // lazy source assignment
      video.play().catch(() => {});
    },
    deactivate() {
      video.pause();
    },
    preload() {
      if (poster) decodeImage(poster); // warm the poster; leave the video alone
    },
  };
}

// Scroll to a publication entry and flash it.
function goToPublication(pubId) {
  const el = document.getElementById("pub-" + pubId);
  if (!el) return;
  el.scrollIntoView({ behavior: "smooth", block: "center" });
  el.classList.remove("publication-flash");
  void el.offsetWidth; // force reflow so the animation restarts on every click
  el.classList.add("publication-flash");
}

function createSlide(project) {
  const el = document.createElement("div");
  el.className = "carousel-slide";
  let api = null;

  function ensureMounted() {
    if (api) return;
    api = project.video
      ? mountVideo(el, project.video, project.poster, project.title)
      : mountStill(el, project.poster, project.title);
  }

  return {
    el,
    activate() {
      ensureMounted();
      el.classList.add("is-active");
      api.activate();
    },
    deactivate() {
      el.classList.remove("is-active");
      if (api) api.deactivate();
    },
    preload() {
      ensureMounted();
      api.preload();
    },
  };
}

function renderShowcase() {
  const intro = document.getElementById("showcase-intro");
  if (intro) intro.textContent = researchInterests;

  const root = document.getElementById("showcase-carousel");
  if (!root || !showcaseProjects.length) return;

  const n = showcaseProjects.length;

  // --- build DOM: [ ‹ ] [ viewport ] [ › ] , then dots ---
  const row = document.createElement("div");
  row.className = "carousel-row";

  const prevBtn = document.createElement("button");
  prevBtn.className = "carousel-arrow prev";
  prevBtn.type = "button";
  prevBtn.setAttribute("aria-label", "Previous project");
  prevBtn.innerHTML = "&#8249;";

  const nextBtn = document.createElement("button");
  nextBtn.className = "carousel-arrow next";
  nextBtn.type = "button";
  nextBtn.setAttribute("aria-label", "Next project");
  nextBtn.innerHTML = "&#8250;";

  // The clip itself is a link to the matching publication entry.
  const viewport = document.createElement("a");
  viewport.className = "carousel-viewport";

  const slides = showcaseProjects.map(createSlide);
  slides.forEach((s) => viewport.appendChild(s.el));

  const overlay = document.createElement("div");
  overlay.className = "carousel-overlay";
  viewport.appendChild(overlay);

  row.appendChild(prevBtn);
  row.appendChild(viewport);
  row.appendChild(nextBtn);

  const dots = document.createElement("div");
  dots.className = "carousel-dots";
  const dotButtons = showcaseProjects.map((p, i) => {
    const b = document.createElement("button");
    b.type = "button";
    b.setAttribute("aria-label", `Show ${p.title}`);
    b.addEventListener("click", () => goTo(i));
    dots.appendChild(b);
    return b;
  });

  root.appendChild(row);
  root.appendChild(dots);

  // --- state & behavior ---
  let current = 0;
  let initialized = false;
  let onScreen = false;
  let hovered = false;
  let autoTimer = null;

  function updateOverlay(i) {
    const p = showcaseProjects[i];
    overlay.innerHTML = `
      <span class="showcase-title">${p.title}</span>
      <span class="showcase-venue">${p.venue}</span>
    `;
  }

  function updateDots(i) {
    dotButtons.forEach((b, k) => {
      const on = k === i;
      b.classList.toggle("is-active", on);
      b.setAttribute("aria-current", on ? "true" : "false");
    });
  }

  function scheduleAuto() {
    clearTimeout(autoTimer);
    if (prefersReducedMotion || n < 2 || !onScreen || hovered || document.hidden) return;
    autoTimer = setTimeout(() => goTo(current + 1), AUTO_ADVANCE_MS);
  }

  function goTo(i) {
    const target = ((i % n) + n) % n;
    if (initialized && target !== current) slides[current].deactivate();
    current = target;
    slides[current].activate();
    slides[(current + 1) % n].preload(); // prefetch the likely-next slide
    viewport.href = "#pub-" + showcaseProjects[current].pub;
    updateOverlay(current);
    updateDots(current);
    scheduleAuto();
  }

  // Clicking the clip jumps to (and highlights) the matching publication.
  viewport.addEventListener("click", (e) => {
    e.preventDefault();
    goToPublication(showcaseProjects[current].pub);
  });

  prevBtn.addEventListener("click", () => goTo(current - 1));
  nextBtn.addEventListener("click", () => goTo(current + 1));

  root.addEventListener("keydown", (e) => {
    if (e.key === "ArrowLeft") { goTo(current - 1); e.preventDefault(); }
    else if (e.key === "ArrowRight") { goTo(current + 1); e.preventDefault(); }
  });

  // Pause auto-advance while the user is interacting with the carousel.
  viewport.addEventListener("mouseenter", () => { hovered = true; scheduleAuto(); });
  viewport.addEventListener("mouseleave", () => { hovered = false; scheduleAuto(); });

  document.addEventListener("visibilitychange", () => {
    if (document.hidden) {
      clearTimeout(autoTimer);
    } else if (initialized) {
      slides[current].activate();
      scheduleAuto();
    }
  });

  // Nothing loads until the carousel scrolls into view; pause when it leaves.
  const io = new IntersectionObserver(
    (entries) => {
      onScreen = entries[0].isIntersecting;
      if (onScreen) {
        if (!initialized) { initialized = true; goTo(0); }
        else { slides[current].activate(); scheduleAuto(); }
      } else {
        clearTimeout(autoTimer);
        if (initialized) slides[current].deactivate();
      }
    },
    { rootMargin: "200px" }
  );
  io.observe(root);
}

renderShowcase();
