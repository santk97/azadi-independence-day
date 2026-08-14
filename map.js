/* ============================================================
   आज़ादी Map — interactive pins over a verified outline map.
   A year timeline shows only the events from the selected year;
   the map itself supports mouse-wheel zoom and drag-to-pan.
   Runs as a full-screen overlay so the persistent music player
   keeps playing underneath.
   ============================================================ */
(function mapApp(){
  const page = document.getElementById("mapPage");
  if(!page || typeof MAP_EVENTS === "undefined") return;

  const els = {
    close: document.getElementById("mapClose"),
    pins: document.getElementById("mapPins"),
    slider: document.getElementById("mapYearSlider"),
    yearReadout: document.getElementById("mapYearReadout"),
    ticks: document.getElementById("mapTimelineTicks"),
    playBtn: document.getElementById("mapPlayBtn"),
    showAllBtn: document.getElementById("mapShowAllBtn"),
    imageWrap: document.getElementById("mapImageWrap"),
    zoomLayer: document.getElementById("mapZoomLayer"),
    zoomIn: document.getElementById("mapZoomIn"),
    zoomOut: document.getElementById("mapZoomOut"),
    zoomReset: document.getElementById("mapZoomReset"),
    card: document.getElementById("mapPinCard"),
    cardImg: document.getElementById("mapCardImg"),
    cardEyebrow: document.getElementById("mapCardEyebrow"),
    cardTitle: document.getElementById("mapCardTitle"),
    cardText: document.getElementById("mapCardText"),
    cardLink: document.getElementById("mapCardLink"),
  };
  const iconPlay = els.playBtn.querySelector(".icon-play");
  const iconPause = els.playBtn.querySelector(".icon-pause");

  const years = MAP_EVENTS.map(ev => ev.yearSort);
  const minYear = Math.min(...years);
  const maxYear = Math.max(...years);
  const uniqueYears = [...new Set(years)].sort((a, b) => a - b);

  let lastFocused = null;
  let mode = "all"; // "all" | "year"
  let playing = false;
  let playTimer = null;
  let playIdx = 0;
  let cardOwner = null; // the .map-pin-dot currently showing the card
  let hideTimer = null; // grace period so the pointer can travel from dot to card

  function cancelHide(){
    clearTimeout(hideTimer);
    hideTimer = null;
  }
  function scheduleHide(delay){
    cancelHide();
    hideTimer = setTimeout(hideCard, delay);
  }

  /* ---------------- Pins ---------------- */

  function renderPins(){
    els.pins.innerHTML = MAP_EVENTS.map((ev, i) => `
      <div class="map-pin" style="left:${ev.left}%; top:${ev.top}%;" data-index="${i}" data-year="${ev.yearSort}">
        <button class="map-pin-dot" aria-label="${ev.place}, ${ev.year}: ${ev.title}" type="button"></button>
      </div>`).join("");
  }

  function renderTicks(){
    els.ticks.innerHTML = uniqueYears.map(y => {
      const pct = (y - minYear) / (maxYear - minYear) * 100;
      return `<button class="map-tick" style="left:${pct}%" data-year="${y}" aria-label="Show ${y}" type="button"></button>`;
    }).join("");
  }

  /* ---------------- Year filtering ---------------- */

  function showAll(){
    mode = "all";
    els.yearReadout.textContent = "All";
    els.pins.querySelectorAll(".map-pin").forEach(pin => pin.classList.remove("map-pin-hidden"));
    els.ticks.querySelectorAll(".map-tick").forEach(t => t.classList.remove("active"));
  }

  function showYear(year){
    mode = "year";
    els.yearReadout.textContent = year;
    els.slider.value = year;
    els.slider.setAttribute("aria-valuetext", `${year}`);
    els.pins.querySelectorAll(".map-pin").forEach(pin => {
      pin.classList.toggle("map-pin-hidden", Number(pin.dataset.year) !== year);
    });
    els.ticks.querySelectorAll(".map-tick").forEach(t => {
      t.classList.toggle("active", Number(t.dataset.year) === year);
    });
    if(cardOwner && Number(cardOwner.closest(".map-pin").dataset.year) !== year) hideCard();
  }

  /* ---------------- Play through years ---------------- */

  function stopPlay(){
    playing = false;
    if(playTimer){ clearInterval(playTimer); playTimer = null; }
    iconPlay.hidden = false;
    iconPause.hidden = true;
    els.playBtn.setAttribute("aria-label", "Play through the years");
  }

  function startPlay(){
    playing = true;
    iconPlay.hidden = true;
    iconPause.hidden = false;
    els.playBtn.setAttribute("aria-label", "Pause");
    playIdx = mode === "year" ? uniqueYears.indexOf(Number(els.slider.value)) : -1;
    if(playIdx < 0) playIdx = -1;
    showYear(uniqueYears[(playIdx + 1) % uniqueYears.length]);
    playIdx = (playIdx + 1) % uniqueYears.length;
    playTimer = setInterval(() => {
      playIdx = (playIdx + 1) % uniqueYears.length;
      showYear(uniqueYears[playIdx]);
    }, 1100);
  }

  /* ---------------- Shared hover/tap card ---------------- */

  function positionCard(dot){
    const rect = dot.getBoundingClientRect();
    const cardW = 236, cardH = els.card.offsetHeight || 260, margin = 10;
    let left = rect.left + rect.width / 2 - cardW / 2;
    left = Math.max(margin, Math.min(left, window.innerWidth - cardW - margin));

    const spaceAbove = rect.top;
    const flipDown = spaceAbove < cardH + margin + 20;
    let top = flipDown ? rect.bottom + 12 : rect.top - cardH - 12;
    top = Math.max(margin, Math.min(top, window.innerHeight - cardH - margin));

    els.card.style.left = `${left}px`;
    els.card.style.top = `${top}px`;
  }

  function showCard(dot){
    cancelHide();
    const pin = dot.closest(".map-pin");
    const ev = MAP_EVENTS[Number(pin.dataset.index)];
    els.cardImg.src = ev.image;
    els.cardImg.alt = ev.title;
    els.cardEyebrow.textContent = `${ev.place} · ${ev.year}`;
    els.cardTitle.textContent = ev.title;
    els.cardText.textContent = ev.text;
    els.cardLink.href = ev.link;
    els.card.classList.add("open");
    cardOwner = dot;
    positionCard(dot);
  }

  function hideCard(){
    cancelHide();
    els.card.classList.remove("open");
    cardOwner = null;
  }

  /* ---------------- Zoom & pan ---------------- */

  const zoom = { scale: 1, x: 0, y: 0, min: 1, max: 4 };
  let dragging = false, dragStartX = 0, dragStartY = 0, dragOriginX = 0, dragOriginY = 0;
  let zoomingTimer = null;

  function clampPan(){
    const wrapRect = els.imageWrap.getBoundingClientRect();
    const maxX = (wrapRect.width * (zoom.scale - 1)) / 2;
    const maxY = (wrapRect.height * (zoom.scale - 1)) / 2;
    zoom.x = Math.max(-maxX, Math.min(maxX, zoom.x));
    zoom.y = Math.max(-maxY, Math.min(maxY, zoom.y));
  }

  function applyZoom(){
    clampPan();
    els.zoomLayer.style.transform = `translate(${zoom.x}px, ${zoom.y}px) scale(${zoom.scale})`;
    els.imageWrap.classList.toggle("zoomed", zoom.scale > 1.01);
    // Suppress the pin transform transition while actively zooming/panning
    // so dot size tracks the wheel/drag 1:1 instead of lagging behind it;
    // the transition still applies for the year-filter show/hide fade.
    els.pins.classList.add("map-pins--zooming");
    clearTimeout(zoomingTimer);
    zoomingTimer = setTimeout(() => els.pins.classList.remove("map-pins--zooming"), 220);
    els.pins.style.setProperty("--pin-counter-scale", 1 / zoom.scale);
    if(cardOwner) positionCard(cardOwner);
  }

  function zoomBy(factor, cx, cy){
    const wrapRect = els.imageWrap.getBoundingClientRect();
    const originX = cx !== undefined ? cx - wrapRect.left - wrapRect.width / 2 : 0;
    const originY = cy !== undefined ? cy - wrapRect.top - wrapRect.height / 2 : 0;
    const newScale = Math.max(zoom.min, Math.min(zoom.max, zoom.scale * factor));
    const actualFactor = newScale / zoom.scale;
    zoom.x = (zoom.x - originX) * actualFactor + originX;
    zoom.y = (zoom.y - originY) * actualFactor + originY;
    zoom.scale = newScale;
    applyZoom();
  }

  function resetZoom(){
    zoom.scale = 1; zoom.x = 0; zoom.y = 0;
    applyZoom();
  }

  els.imageWrap.addEventListener("wheel", (e) => {
    e.preventDefault();
    const factor = e.deltaY < 0 ? 1.15 : 1 / 1.15;
    zoomBy(factor, e.clientX, e.clientY);
  }, { passive: false });

  els.imageWrap.addEventListener("mousedown", (e) => {
    if(zoom.scale <= 1.01) return;
    if(e.target.closest(".map-pin-dot")) return;
    dragging = true;
    dragStartX = e.clientX; dragStartY = e.clientY;
    dragOriginX = zoom.x; dragOriginY = zoom.y;
    els.imageWrap.classList.add("dragging");
  });
  window.addEventListener("mousemove", (e) => {
    if(!dragging) return;
    zoom.x = dragOriginX + (e.clientX - dragStartX);
    zoom.y = dragOriginY + (e.clientY - dragStartY);
    applyZoom();
  });
  window.addEventListener("mouseup", () => {
    dragging = false;
    els.imageWrap.classList.remove("dragging");
  });

  els.zoomIn.addEventListener("click", () => zoomBy(1.4));
  els.zoomOut.addEventListener("click", () => zoomBy(1 / 1.4));
  els.zoomReset.addEventListener("click", resetZoom);
  els.imageWrap.addEventListener("dblclick", (e) => {
    if(zoom.scale > 1.01) resetZoom();
    else zoomBy(2, e.clientX, e.clientY);
  });

  /* ---------------- Open / close ---------------- */

  function open(){
    lastFocused = document.activeElement;
    page.classList.add("open");
    page.setAttribute("aria-hidden", "false");
    document.body.classList.add("modal-open");
    stopPlay();
    resetZoom();
    showAll();
    hideCard();
  }

  function close(){
    page.classList.remove("open");
    page.setAttribute("aria-hidden", "true");
    document.body.classList.remove("modal-open");
    stopPlay();
    hideCard();
    if(lastFocused) lastFocused.focus();
  }

  renderPins();
  renderTicks();

  els.pins.addEventListener("mouseover", (e) => {
    const dot = e.target.closest(".map-pin-dot");
    if(dot) showCard(dot);
  });
  els.pins.addEventListener("mouseout", (e) => {
    const dot = e.target.closest(".map-pin-dot");
    // Grace period: the pointer needs a moment to cross the gap onto the
    // card itself (WCAG 1.4.13 "hoverable") — cancelled by the card's own
    // mouseenter, or by re-entering a dot, below.
    if(dot && (!e.relatedTarget || !els.card.contains(e.relatedTarget))) scheduleHide(400);
  });
  els.card.addEventListener("mouseenter", cancelHide);
  els.card.addEventListener("mouseleave", () => scheduleHide(150));
  els.pins.addEventListener("focusin", (e) => {
    const dot = e.target.closest(".map-pin-dot");
    if(dot) showCard(dot);
  });
  els.pins.addEventListener("focusout", (e) => {
    if(!els.pins.contains(e.relatedTarget) && !els.card.contains(e.relatedTarget)) hideCard();
  });
  els.card.addEventListener("focusout", (e) => {
    if(!els.card.contains(e.relatedTarget) && !els.pins.contains(e.relatedTarget)) hideCard();
  });
  els.pins.addEventListener("click", (e) => {
    const dot = e.target.closest(".map-pin-dot");
    if(!dot) return;
    if(cardOwner === dot) hideCard(); else showCard(dot);
  });
  document.addEventListener("click", (e) => {
    if(cardOwner && !e.target.closest(".map-pin") && !els.card.contains(e.target)) hideCard();
  });

  els.slider.addEventListener("input", () => {
    if(playing) stopPlay();
    showYear(Number(els.slider.value));
  });
  els.ticks.addEventListener("click", (e) => {
    const tick = e.target.closest(".map-tick");
    if(!tick) return;
    if(playing) stopPlay();
    showYear(Number(tick.dataset.year));
  });
  els.showAllBtn.addEventListener("click", () => {
    if(playing) stopPlay();
    showAll();
  });
  els.playBtn.addEventListener("click", () => {
    if(playing) stopPlay(); else startPlay();
  });

  els.close.addEventListener("click", close);
  page.querySelector(".app-page-backdrop").addEventListener("click", close);
  document.addEventListener("keydown", (e) => {
    if(!page.classList.contains("open")) return;
    if(e.key === "Escape"){
      if(cardOwner){ const dot = cardOwner; hideCard(); dot.focus(); }
      else close();
    }
  });

  document.getElementById("navOpenMap")?.addEventListener("click", open);
  document.getElementById("navOpenMapMobile")?.addEventListener("click", () => {
    document.getElementById("navMobileMenu")?.classList.remove("open");
    open();
  });

  window.__openAzadiMap = open;
})();
