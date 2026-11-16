/* Royal Grace invitation — behaviour. No frameworks, no build step. */
(function () {
  "use strict";
  const C = window.INVITE || {};
  const $ = (s, r) => (r || document).querySelector(s);
  const $$ = (s, r) => Array.from((r || document).querySelectorAll(s));
  const get = (path) => path.split(".").reduce((o, k) => (o == null ? undefined : o[k]), C);

  /* ---------- 1. fill text from config ---------- */
  document.title = C.pageTitle || document.title;
  $$("[data-bind]").forEach((el) => {
    const v = get(el.getAttribute("data-bind"));
    if (v != null) el.textContent = v;
  });
  const m = C.media || {};
  const root = $(".invite");
  const bgUrl = (p) => (p ? `url("${p}")` : "none");
  /* the paper textures sit below the hero; they are loaded only after the invitation is opened */
  let paperLoaded = false;
  const loadPaper = () => {
    if (paperLoaded) return;
    paperLoaded = true;
    root.style.setProperty("--welcome-bg", bgUrl(m.welcomeBackground));
    root.style.setProperty("--general-bg", bgUrl(m.generalBackground));
    root.style.setProperty("--end-bg", bgUrl(m.endBackground));
  };

  const video = $("#introVideo");
  const music = $("#music");
  if (m.poster) video.poster = m.poster;        /* first frame, shows instantly */
  if (m.introVideo) video.src = m.introVideo;
  /* the music is not fetched on page load: it starts downloading once the video is buffered
     (or on tap, whichever comes first) so the "Tap to open" screen appears as fast as possible */
  let musicPrimed = false;
  const primeMusic = () => {
    if (musicPrimed || !m.music) return;
    musicPrimed = true;
    music.preload = "auto"; music.src = m.music; music.load();
  };
  video.addEventListener("canplaythrough", primeMusic, { once: true });
  window.addEventListener("load", () => setTimeout(primeMusic, 2500), { once: true });

  /* hero name order (bride's card shows the bride first) */
  if (C.hero && C.hero.brideFirst) {
    const names = $$(".hero-name"), amp = $(".hero-amp");
    if (names.length === 2) { names[0].before(names[1]); if (amp) names[0].before(amp); }   /* bride, &, groom */
  }

  /* placeholders & inputs */
  const r = C.rsvp || {};
  $("#rsvpName").placeholder = r.namePlaceholder || "";
  $("#rsvpMsg").placeholder = r.messagePlaceholder || "";
  const credit = $("#creditLink");
  if (C.footer && C.footer.creditLink) {
    credit.href = C.footer.creditUrl || "#";
    if (C.footer.creditUrl) credit.target = "_blank";
  } else {
    credit.remove();
  }

  /* optional per-section icons (names from the sprite in index.html) */
  const setIcon = (secId, cfg) => {
    if (!cfg || !cfg.icon) return;
    const use = $(`${secId} .sec-icon use`);
    if (use) use.setAttribute("href", "#i-" + cfg.icon);
  };
  setIcon("#sec-dress", C.dressCode); setIcon("#sec-transport", C.transportation);
  setIcon("#sec-stay", C.accommodation); setIcon("#sec-gifts", C.gifts);
  setIcon("#sec-timeline", C.timeline); setIcon("#sec-pre", C.preEvents); setIcon("#sec-venue", C.venue);

  /* ---------- 2. optional sections ---------- */
  const hide = (id, cond) => { if (cond) $(id).classList.add("hidden"); };
  hide("#sec-slides", !(C.slideshow && C.slideshow.enabled && C.slideshow.images && C.slideshow.images.length));
  hide("#sec-timeline", !(C.timeline && C.timeline.enabled && C.timeline.days && C.timeline.days.length));
  hide("#sec-venue", !(C.venue && C.venue.enabled));
  hide("#sec-dress", !(C.dressCode && C.dressCode.enabled && C.dressCode.groups && C.dressCode.groups.length));
  hide("#sec-pre", !(C.preEvents && C.preEvents.enabled && C.preEvents.days && C.preEvents.days.length));
  hide("#sec-transport", !(C.transportation && C.transportation.enabled && C.transportation.text));
  hide("#sec-stay", !(C.accommodation && C.accommodation.enabled && C.accommodation.text));
  hide("#sec-gifts", !(C.gifts && C.gifts.enabled && C.gifts.text));
  hide("#sec-rsvp", !(C.rsvp && C.rsvp.enabled));

  /* ---------- 3. hero: tap to open ---------- */
  const hero = $("#hero");
  const muteBtn = $("#muteBtn");
  const muteUse = $("use", muteBtn);
  let opened = false, revealed = false, musicWanted = !!m.musicOn;

  const setMuteIcon = () => muteUse.setAttribute("href", music.paused ? "#i-volume-x" : "#i-volume-2");
  const reveal = () => {
    if (revealed) return;
    revealed = true;
    loadPaper();
    hero.classList.add("is-revealed");
    document.body.classList.remove("is-closed");
  };
  const open = () => {
    if (opened) return;
    opened = true;
    loadPaper();
    video.muted = true;
    const p = video.play();
    if (p && p.catch) p.catch(() => reveal());
    if (musicWanted && m.music) { primeMusic(); music.volume = 1; music.play().catch(() => {}); }
    setTimeout(setMuteIcon, 150);
  };
  video.addEventListener("click", open);
  hero.addEventListener("click", (e) => { if (!opened) open(); });
  video.addEventListener("timeupdate", () => {
    const at = (C.hero && C.hero.revealAt) || 7.2;
    if (video.currentTime >= at) reveal();
  });
  video.addEventListener("ended", reveal);
  video.addEventListener("error", () => { hero.style.background = "#0f0f0f"; });

  muteBtn.addEventListener("click", (e) => {
    e.stopPropagation();
    if (!m.music) return;
    if (music.paused) { musicWanted = true; primeMusic(); music.play().catch(() => {}); }
    else { musicWanted = false; music.pause(); }
    setTimeout(setMuteIcon, 50);
  });
  music.addEventListener("play", setMuteIcon);
  music.addEventListener("pause", setMuteIcon);

  /* ---------- 4. scroll-in reveal ---------- */
  const io = new IntersectionObserver((entries) => {
    entries.forEach((en) => { if (en.isIntersecting) { en.target.classList.add("in"); io.unobserve(en.target); } });
  }, { threshold: 0.12, rootMargin: "0px 0px -8% 0px" });
  $$(".sec.reveal").forEach((s) => io.observe(s));

  /* ---------- 5. timeline / pre-events / dress code ---------- */
  const esc = (s) => String(s == null ? "" : s).replace(/[&<>"]/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }[c]));
  const renderDays = (holder, days) => {
    holder.innerHTML = (days || []).map((d) => `
      <div class="day">
        <div class="day-head"><div class="line"></div><p>${esc(d.date)}</p><div class="line"></div></div>
        <div class="items">${(d.items || []).map((it) => `
          <div class="item">
            <span class="item-time">${esc(it.time)}</span>
            <div class="item-body">
              <p class="item-title">${esc(it.title)}</p>
              ${it.desc ? `<p class="item-desc">${esc(it.desc)}</p>` : ""}
            </div>
          </div>`).join("")}
        </div>
      </div>`).join("");
    $$(".day", holder).forEach((d, i) => { d.style.transitionDelay = (i * 0.15) + "s"; io2.observe(d); });
  };
  const io2 = new IntersectionObserver((entries) => {
    entries.forEach((en) => { if (en.isIntersecting) { en.target.classList.add("in"); io2.unobserve(en.target); } });
  }, { threshold: 0.2 });
  if (C.timeline) renderDays($("#timelineDays"), C.timeline.days);
  if (C.preEvents) renderDays($("#preDays"), C.preEvents.days);
  if (C.dressCode) {
    $("#dressGrid").innerHTML = (C.dressCode.groups || []).map((g) => `
      <div class="dress"><h3>${esc(g.title)}</h3><div class="rule"></div><p>${esc(g.text)}</p></div>`).join("");
  }

  /* ---------- 6. venue map ---------- */
  if (C.venue && C.venue.enabled) {
    const q = encodeURIComponent(`${C.venue.name || ""}, ${C.venue.address || ""}`);
    const mapSrc = C.venue.mapEmbedUrl || `https://maps.google.com/maps?q=${q}&t=m&z=14&output=embed`;
    /* the Google map is heavy: load it only when the venue section is about to scroll into view */
    const mapIo = new IntersectionObserver((entries) => {
      if (entries.some((en) => en.isIntersecting)) { $("#venueMap").src = mapSrc; mapIo.disconnect(); }
    }, { rootMargin: "800px 0px" });
    mapIo.observe($("#sec-venue"));
  }

  /* ---------- 7. slideshow ---------- */
  (function slideshow() {
    const cfg = C.slideshow;
    if (!cfg || !cfg.enabled || !cfg.images || !cfg.images.length) return;
    const box = $("#slideshow"), track = $("#slides"), dots = $("#dots");
    track.innerHTML = cfg.images.map((src, i) => `
      <div class="slide${i === 0 ? " active" : ""}">
        <div class="slide-inner">
          <img class="slide-blur" src="${esc(src)}" alt="" aria-hidden="true" loading="lazy">
          <div class="slide-tint" aria-hidden="true"></div>
          <img class="slide-img" src="${esc(src)}" alt="Wedding moment ${i + 1}" loading="lazy">
        </div>
      </div>`).join("");
    dots.innerHTML = cfg.images.map((_, i) => `<span${i === 0 ? ' class="active"' : ""}></span>`).join("");
    const slides = $$(".slide", track), ds = $$("span", dots);
    let cur = 0, timer;
    const show = (n) => {
      cur = (n + slides.length) % slides.length;
      slides.forEach((s, i) => s.classList.toggle("active", i === cur));
      ds.forEach((d, i) => d.classList.toggle("active", i === cur));
    };
    const start = () => { stop(); timer = setInterval(() => show(cur + 1), (cfg.intervalSeconds || 4) * 1000); };
    const stop = () => clearInterval(timer);
    /* box shape: from config, or match the tallest photo as each one loads (photos stay lazy) */
    if (cfg.aspectRatio) box.style.aspectRatio = cfg.aspectRatio;
    else {
      let ratio = Infinity;
      $$(".slide-img", track).forEach((im) => {
        const fit = () => { if (im.naturalWidth) { ratio = Math.min(ratio, im.naturalWidth / im.naturalHeight); box.style.aspectRatio = ratio + " / 1"; } };
        if (im.complete) fit(); else im.addEventListener("load", fit, { once: true });
      });
    }
    /* swipe / drag */
    let sx = null;
    track.addEventListener("pointerdown", (e) => { sx = e.clientX; stop(); });
    track.addEventListener("pointerup", (e) => {
      if (sx == null) return;
      const dx = e.clientX - sx; sx = null;
      if (Math.abs(dx) > 40) show(cur + (dx < 0 ? 1 : -1));
      start();
    });
    track.addEventListener("pointercancel", () => { sx = null; start(); });
    start();
  })();

  /* ---------- 8. countdown ---------- */
  (function countdown() {
    const ev = C.event || {};
    const target = new Date(`${ev.date}T${ev.time || "00:00"}:00`);
    const els = { d: $("#cdDays"), h: $("#cdHours"), m: $("#cdMinutes"), s: $("#cdSeconds") };
    const pad = (n) => String(Math.max(0, n)).padStart(2, "0");
    const set = (el, v) => { if (el.textContent !== v) { el.textContent = v; el.classList.remove("tick"); void el.offsetWidth; el.classList.add("tick"); } };
    const tick = () => {
      let diff = Math.max(0, target - Date.now());
      const d = Math.floor(diff / 864e5); diff -= d * 864e5;
      const h = Math.floor(diff / 36e5); diff -= h * 36e5;
      const mi = Math.floor(diff / 6e4); diff -= mi * 6e4;
      const s = Math.floor(diff / 1e3);
      set(els.d, pad(d)); set(els.h, pad(h)); set(els.m, pad(mi)); set(els.s, pad(s));
    };
    if (!isNaN(target)) { tick(); setInterval(tick, 1000); }
  })();

  /* ---------- 9. scratch card ---------- */
  (function scratch() {
    const cv = $("#scratchCanvas"), ctx = cv.getContext("2d");
    const W = cv.width, H = cv.height;
    /* green foil surface with sparkle */
    const g = ctx.createRadialGradient(W * .45, H * .42, 8, W * .5, H * .5, W * .62);
    g.addColorStop(0, "#c9c8a8");
    g.addColorStop(.35, "#9ea484");
    g.addColorStop(.7, "#78826a");
    g.addColorStop(1, "#5b6650");
    ctx.fillStyle = g; ctx.fillRect(0, 0, W, H);
    for (let i = 0; i < 2600; i++) {
      const x = Math.random() * W, y = Math.random() * H, rr = Math.random();
      ctx.fillStyle = rr < .55 ? `rgba(255,255,255,${(Math.random() * .6 + .2).toFixed(2)})` : `rgba(50,60,40,${(Math.random() * .35 + .05).toFixed(2)})`;
      ctx.beginPath(); ctx.arc(x, y, rr < .9 ? Math.random() * 1.1 + .3 : Math.random() * 2 + 1, 0, Math.PI * 2); ctx.fill();
    }
    ctx.globalCompositeOperation = "destination-out";
    let drawing = false, done = false, last = null, strokes = 0;
    const pos = (e) => { const b = cv.getBoundingClientRect(); return { x: (e.clientX - b.left) * W / b.width, y: (e.clientY - b.top) * H / b.height }; };
    const dab = (p) => { ctx.beginPath(); ctx.arc(p.x, p.y, 30, 0, Math.PI * 2); ctx.fill(); };
    const line = (a, b) => { ctx.lineWidth = 60; ctx.lineCap = "round"; ctx.beginPath(); ctx.moveTo(a.x, a.y); ctx.lineTo(b.x, b.y); ctx.stroke(); };
    const cleared = () => {
      const d = ctx.getImageData(0, 0, W, H).data; let n = 0;
      for (let i = 3; i < d.length; i += 4 * 8) if (d[i] === 0) n++;
      return n / (d.length / (4 * 8));
    };
    const box = cv.closest(".heart-box"), cta = $("#scratchCta");
    const finish = () => {
      if (done) return; done = true;
      cv.classList.add("done");
      box.classList.add("done");
      if (cta) cta.classList.add("hide");
      $("#invitedText").classList.add("show");
      confetti();
    };
    const NEED = 0.4;   /* fraction of the foil that must be scratched away */
    let nudge;          /* brings the hint back if the guest stops half-way */
    cv.addEventListener("pointerdown", (e) => { if (done) return; e.preventDefault(); drawing = true; clearTimeout(nudge); box.classList.add("scratching"); cv.setPointerCapture(e.pointerId); last = pos(e); dab(last); });
    cv.addEventListener("pointermove", (e) => { if (!drawing || done) return; const p = pos(e); line(last, p); dab(p); last = p; if (++strokes % 10 === 0 && cleared() > NEED) finish(); });
    const up = () => { if (!drawing) return; drawing = false; if (!done && cleared() > NEED) finish(); if (!done) nudge = setTimeout(() => box.classList.remove("scratching"), 3000); };
    cv.addEventListener("pointerup", up); cv.addEventListener("pointercancel", up); cv.addEventListener("pointerleave", up);
  })();

  function confetti() {
    const host = $("#confetti");
    const colors = ["rgb(163,71,209)", "rgb(60,140,221)", "rgb(223,173,73)", "rgb(221,60,60)", "rgb(64,191,64)", "rgb(240,199,117)"];
    const frag = document.createDocumentFragment();
    for (let i = 0; i < 70; i++) {
      const p = document.createElement("i");
      const circle = Math.random() > .35;
      const size = circle ? 6 + Math.random() * 6 : 3;
      p.style.cssText = `left:${Math.random() * 100}%;width:${circle ? size : 3}px;height:${circle ? size : 20 + Math.random() * 28}px;border-radius:${circle ? "50%" : "2px"};background:${colors[i % colors.length]};--dx:${(Math.random() * 200 - 100).toFixed(0)}px;--rot:${(Math.random() * 720 - 360).toFixed(0)}deg;animation-duration:${(2.6 + Math.random() * 1.6).toFixed(2)}s;animation-delay:${(Math.random() * .6).toFixed(2)}s`;
      frag.appendChild(p);
    }
    host.appendChild(frag);
    setTimeout(() => { host.innerHTML = ""; }, 5000);
  }

  /* ---------- 10. save the date ---------- */
  (function saveTheDate() {
    const btn = $("#saveDateBtn"), menu = $("#calMenu"), ev = C.event || {};
    const start = new Date(`${ev.date}T${ev.time || "00:00"}:00`);
    const end = new Date(start.getTime() + (ev.durationHours || 3) * 36e5);
    const loc = C.venue ? `${C.venue.name || ""}, ${C.venue.address || ""}` : "";
    const title = ev.title || "Wedding";
    const desc = (C.welcome && C.welcome.text) || "";
    const fmtLocal = (d) => d.getFullYear() + String(d.getMonth() + 1).padStart(2, "0") + String(d.getDate()).padStart(2, "0") + "T" + String(d.getHours()).padStart(2, "0") + String(d.getMinutes()).padStart(2, "0") + "00";
    const fmtUTC = (d) => d.toISOString().replace(/[-:]/g, "").replace(/\.\d{3}/, "");
    $("#calNote").textContent = `${ev.dateLabel || ""} · ${ev.timeLabel || ""}`;

    const links = {
      google: () => `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${encodeURIComponent(title)}&dates=${fmtLocal(start)}/${fmtLocal(end)}&details=${encodeURIComponent(desc)}&location=${encodeURIComponent(loc)}`,
      outlook: () => `https://outlook.live.com/calendar/0/deeplink/compose?path=%2Fcalendar%2Faction%2Fcompose&rru=addevent&subject=${encodeURIComponent(title)}&startdt=${start.toISOString()}&enddt=${end.toISOString()}&body=${encodeURIComponent(desc)}&location=${encodeURIComponent(loc)}`,
      yahoo: () => `https://calendar.yahoo.com/?v=60&title=${encodeURIComponent(title)}&st=${fmtUTC(start)}&et=${fmtUTC(end)}&desc=${encodeURIComponent(desc)}&in_loc=${encodeURIComponent(loc)}`
    };
    const ics = () => {
      const body = ["BEGIN:VCALENDAR", "VERSION:2.0", "PRODID:-//Invitation//EN", "BEGIN:VEVENT",
        "UID:" + Date.now() + "@invitation", "DTSTAMP:" + fmtUTC(new Date()), "DTSTART:" + fmtUTC(start), "DTEND:" + fmtUTC(end),
        "SUMMARY:" + title.replace(/,/g, "\\,"), "DESCRIPTION:" + desc.replace(/\n/g, "\\n").replace(/,/g, "\\,"), "LOCATION:" + loc.replace(/,/g, "\\,"),
        "END:VEVENT", "END:VCALENDAR"].join("\r\n");
      const a = document.createElement("a");
      a.href = URL.createObjectURL(new Blob([body], { type: "text/calendar;charset=utf-8" }));
      a.download = title.replace(/[^\w]+/g, "-") + ".ics"; document.body.appendChild(a); a.click(); a.remove();
    };
    const close = () => { menu.hidden = true; btn.setAttribute("aria-expanded", "false"); };
    const place = () => {
      const b = btn.getBoundingClientRect();
      let left = b.left + b.width / 2 - 144;
      left = Math.max(12, Math.min(left, window.innerWidth - 288 - 12));
      menu.style.left = left + "px";
      menu.style.top = (b.bottom + 12) + "px";
    };
    btn.addEventListener("click", (e) => {
      e.stopPropagation();
      if (menu.hidden) { place(); menu.hidden = false; btn.setAttribute("aria-expanded", "true"); } else close();
    });
    menu.addEventListener("click", (e) => e.stopPropagation());
    $$("[data-cal]", menu).forEach((b) => b.addEventListener("click", () => {
      const k = b.getAttribute("data-cal");
      if (k === "apple" || k === "ics") ics(); else window.open(links[k](), "_blank", "noopener");
      close();
    }));
    document.addEventListener("click", close);
    document.addEventListener("keydown", (e) => { if (e.key === "Escape") close(); });
    window.addEventListener("scroll", () => { if (!menu.hidden) place(); }, { passive: true });
    window.addEventListener("resize", () => { if (!menu.hidden) place(); });
  })();

  /* ---------- 11. RSVP ---------- */
  $("#rsvpForm").addEventListener("submit", (e) => {
    e.preventDefault();
    const name = $("#rsvpName").value.trim(), att = $("#rsvpAttend").value, msg = $("#rsvpMsg").value.trim();
    if (!name) { $("#rsvpName").focus(); return; }
    if (!att) { $("#rsvpAttend").focus(); return; }
    const attText = att === "yes" ? (r.optionYes || "Yes") : (r.optionNo || "No");
    const text = `RSVP from ${name}\n${r.attendingLabel || "Attending"}: ${attText}${msg ? "\n" + msg : ""}`;
    if (r.whatsapp) window.open(`https://wa.me/${String(r.whatsapp).replace(/\D/g, "")}?text=${encodeURIComponent(text)}`, "_blank", "noopener");
    else if (r.email) window.location.href = `mailto:${r.email}?subject=${encodeURIComponent("RSVP - " + name)}&body=${encodeURIComponent(text)}`;
    $("#rsvpDone").hidden = false;
    e.target.reset();
  });
})();
