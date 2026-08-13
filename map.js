/* ============================================================
   आज़ादी Map — interactive pins over a verified outline map.
   Runs as a full-screen overlay so the persistent music player
   keeps playing underneath.
   ============================================================ */
(function mapApp(){
  const page = document.getElementById("mapPage");
  if(!page || typeof MAP_EVENTS === "undefined") return;

  const els = {
    close: document.getElementById("mapClose"),
    pins: document.getElementById("mapPins"),
    detail: document.getElementById("mapDetail"),
    detailClose: document.getElementById("mapDetailClose"),
    detailYear: document.getElementById("mapDetailYear"),
    detailTitle: document.getElementById("mapDetailTitle"),
    detailText: document.getElementById("mapDetailText"),
    detailLink: document.getElementById("mapDetailLink"),
  };
  let lastFocused = null;
  let activePin = null;

  function renderPins(){
    els.pins.innerHTML = MAP_EVENTS.map((ev, i) => `
      <button class="map-pin" style="left:${ev.left}%; top:${ev.top}%;" data-index="${i}" aria-label="${ev.place}: ${ev.title}">
        <span class="map-pin-dot"></span>
        <span class="map-pin-label">${ev.place}</span>
      </button>
    `).join("");
  }

  function showDetail(index){
    const ev = MAP_EVENTS[index];
    els.detailYear.textContent = `${ev.place} · ${ev.year}`;
    els.detailTitle.textContent = ev.title;
    els.detailText.textContent = ev.text;
    els.detailLink.href = ev.link;
    els.detail.hidden = false;

    if(activePin) activePin.classList.remove("active");
    activePin = els.pins.querySelector(`[data-index="${index}"]`);
    if(activePin) activePin.classList.add("active");
  }

  function hideDetail(){
    els.detail.hidden = true;
    if(activePin){ activePin.classList.remove("active"); activePin = null; }
  }

  function open(){
    lastFocused = document.activeElement;
    page.classList.add("open");
    page.setAttribute("aria-hidden", "false");
    document.body.classList.add("modal-open");
  }

  function close(){
    page.classList.remove("open");
    page.setAttribute("aria-hidden", "true");
    document.body.classList.remove("modal-open");
    hideDetail();
    if(lastFocused) lastFocused.focus();
  }

  renderPins();

  els.pins.addEventListener("click", (e) => {
    const pin = e.target.closest(".map-pin");
    if(pin) showDetail(Number(pin.dataset.index));
  });
  els.detailClose.addEventListener("click", hideDetail);
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
