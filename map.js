/* ============================================================
   आज़ादी Map — interactive pins over a verified outline map,
   with a year timeline that reveals events chronologically.
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
  };
  const iconPlay = els.playBtn.querySelector(".icon-play");
  const iconPause = els.playBtn.querySelector(".icon-pause");

  const years = MAP_EVENTS.map(ev => ev.yearSort);
  const minYear = Math.min(...years);
  const maxYear = Math.max(...years);
  const uniqueYears = [...new Set(years)].sort((a, b) => a - b);

  let lastFocused = null;
  let activePin = null;
  let playing = false;
  let playTimer = null;

  function renderPins(){
    els.pins.innerHTML = MAP_EVENTS.map((ev, i) => {
      const modifiers = [
        ev.top < 22 ? "flip-down" : "",
        ev.left < 12 ? "align-left" : (ev.left > 88 ? "align-right" : ""),
      ].filter(Boolean).join(" ");
      return `
      <div class="map-pin ${modifiers}" style="left:${ev.left}%; top:${ev.top}%;" data-index="${i}" data-year="${ev.yearSort}">
        <button class="map-pin-dot" aria-label="${ev.place}, ${ev.year}: ${ev.title}" type="button"></button>
        <div class="map-pin-card">
          <img class="map-pin-card-img" src="${ev.image}" alt="" loading="lazy">
          <div class="map-pin-card-body">
            <span class="map-pin-card-eyebrow">${ev.place} &middot; ${ev.year}</span>
            <h4 class="map-pin-card-title">${ev.title}</h4>
            <p class="map-pin-card-text">${ev.text}</p>
            <a class="map-pin-card-link" href="${ev.link}" target="_blank" rel="noopener noreferrer">Read more &rarr;</a>
          </div>
        </div>
      </div>`;
    }).join("");
  }

  function renderTicks(){
    els.ticks.innerHTML = uniqueYears.map(y => {
      const pct = (y - minYear) / (maxYear - minYear) * 100;
      return `<button class="map-tick" style="left:${pct}%" data-year="${y}" aria-label="Jump to ${y}" type="button"></button>`;
    }).join("");
  }

  function applyYear(year){
    els.yearReadout.textContent = year;
    els.slider.setAttribute("aria-valuetext", `${year}`);
    els.pins.querySelectorAll(".map-pin").forEach(pin => {
      pin.classList.toggle("unreached", Number(pin.dataset.year) > year);
    });
  }

  function setActivePin(pin){
    if(activePin){
      activePin.classList.remove("active");
      const wasSame = activePin === pin;
      activePin = null;
      if(wasSame) return;
    }
    if(pin){
      pin.classList.add("active");
      activePin = pin;
    }
  }

  function stopPlay(){
    playing = false;
    if(playTimer){ clearInterval(playTimer); playTimer = null; }
    iconPlay.hidden = false;
    iconPause.hidden = true;
    els.playBtn.setAttribute("aria-label", "Play timeline");
  }

  function startPlay(){
    playing = true;
    iconPlay.hidden = true;
    iconPause.hidden = false;
    els.playBtn.setAttribute("aria-label", "Pause timeline");
    let y = Number(els.slider.value);
    if(y >= maxYear) y = minYear;
    applyYear(y);
    els.slider.value = y;
    playTimer = setInterval(() => {
      y += 3;
      if(y >= maxYear){
        y = maxYear;
        els.slider.value = y;
        applyYear(y);
        stopPlay();
        return;
      }
      els.slider.value = y;
      applyYear(y);
    }, 70);
  }

  function open(){
    lastFocused = document.activeElement;
    page.classList.add("open");
    page.setAttribute("aria-hidden", "false");
    document.body.classList.add("modal-open");
    stopPlay();
    els.slider.value = maxYear;
    applyYear(maxYear);
  }

  function close(){
    page.classList.remove("open");
    page.setAttribute("aria-hidden", "true");
    document.body.classList.remove("modal-open");
    stopPlay();
    setActivePin(null);
    if(lastFocused) lastFocused.focus();
  }

  renderPins();
  renderTicks();

  els.pins.addEventListener("click", (e) => {
    const dot = e.target.closest(".map-pin-dot");
    if(!dot) return;
    setActivePin(dot.closest(".map-pin"));
  });

  document.addEventListener("click", (e) => {
    if(activePin && !activePin.contains(e.target)) setActivePin(null);
  });

  els.slider.addEventListener("input", () => {
    if(playing) stopPlay();
    applyYear(Number(els.slider.value));
  });

  els.ticks.addEventListener("click", (e) => {
    const tick = e.target.closest(".map-tick");
    if(!tick) return;
    if(playing) stopPlay();
    const y = Number(tick.dataset.year);
    els.slider.value = y;
    applyYear(y);
  });

  els.playBtn.addEventListener("click", () => {
    if(playing) stopPlay(); else startPlay();
  });

  els.close.addEventListener("click", close);
  page.querySelector(".app-page-backdrop").addEventListener("click", close);
  document.addEventListener("keydown", (e) => {
    if(e.key === "Escape" && page.classList.contains("open")) close();
  });

  document.getElementById("navOpenMap")?.addEventListener("click", open);
  document.getElementById("navOpenMapMobile")?.addEventListener("click", () => {
    document.getElementById("navMobileMenu")?.classList.remove("open");
    open();
  });

  window.__openAzadiMap = open;
})();
