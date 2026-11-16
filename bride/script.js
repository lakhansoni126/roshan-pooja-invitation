/* /bride behaviour — plain JS port of the reference (no GSAP / React). */
(function () {
  "use strict";
  const C = window.INVITE || {};
  const $ = (s, r) => (r || document).querySelector(s);
  const $$ = (s, r) => Array.from((r || document).querySelectorAll(s));
  const esc = (s) => String(s == null ? "" : s).replace(/[&<>"]/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }[c]));
  const setText = (id, v) => { const el = document.getElementById(id); if (el && v != null) el.textContent = v; };
  document.title = C.pageTitle || document.title;

  /* ---------- 1. reveal-on-scroll (replaces GSAP scrollTrigger) ---------- */
  const io = new IntersectionObserver((entries) => {
    entries.forEach((en) => {
      if (!en.isIntersecting) return;
      const el = en.target;
      if (el.hasAttribute("data-reveal")) $$(".reveal", el).forEach((r, i) => { r.style.transitionDelay = (0.2 + i * 0.12) + "s"; });
      el.classList.add("in");
      io.unobserve(el);
    });
  }, { threshold: 0.15, rootMargin: "0px 0px -10% 0px" });
  const watch = (el) => el && io.observe(el);

  /* ---------- 2. music ---------- */
  const music = $("#bg-music"), audioBtn = $("#audio-btn");
  const m = C.media || {};
  const setAudioIcon = () => { $("#audio-on").style.display = music.paused ? "none" : "block"; $("#audio-off").style.display = music.paused ? "block" : "none"; };
  let musicPrimed = false;
  const primeMusic = () => { if (musicPrimed || !m.music) return; musicPrimed = true; music.preload = "auto"; music.src = m.music; music.load(); };
  audioBtn.addEventListener("click", () => { if (!m.music) return; primeMusic(); if (music.paused) music.play().catch(() => {}); else music.pause(); setTimeout(setAudioIcon, 60); });
  music.addEventListener("play", setAudioIcon); music.addEventListener("pause", setAudioIcon);

  /* ---------- 3. intro: tap → video → flash → invitation ---------- */
  const intro = $("#intro"), video = $("#introVideo"), cover = $("#introCover"), flash = $("#flash");
  const I = C.intro || {};
  if (I.cover) cover.src = I.cover;
  if (I.video) video.src = I.video;
  video.addEventListener("canplaythrough", primeMusic, { once: true });
  window.addEventListener("load", () => setTimeout(primeMusic, 2500), { once: true });
  let started = false, opened = false;
  const open = () => {
    if (opened) return; opened = true;
    intro.classList.add("gone");
    document.body.classList.remove("no-scroll");
    setTimeout(() => { $("#main-content").classList.add("visible"); watch($("#hero")); }, 200);
    startPetals();
  };
  const finishWithFlash = () => {
    if (opened) return;
    flash.classList.add("on");
    setTimeout(() => { open(); flash.classList.remove("on"); flash.classList.add("off"); setTimeout(() => flash.remove(), 2300); }, 1000);
  };
  intro.addEventListener("click", () => {
    if (started) return; started = true;
    if (m.musicOn && m.music) { primeMusic(); music.play().catch(() => {}); setTimeout(setAudioIcon, 100); }
    if (!I.video) { open(); return; }
    intro.classList.add("playing");
    const p = video.play();
    if (p && p.catch) p.catch(() => open());
  });
  video.addEventListener("timeupdate", () => { const lead = I.flashSecondsBeforeEnd == null ? 1 : I.flashSecondsBeforeEnd; if (video.duration > 0 && video.duration - video.currentTime <= lead) finishWithFlash(); });
  video.addEventListener("ended", finishWithFlash);
  video.addEventListener("error", () => { if (started) open(); });

  /* ---------- 4. hero ---------- */
  const H = C.hero || {};
  if (H.ganeshImage) $("#ganesh").src = H.ganeshImage;
  setText("shloka", H.shloka); setText("introText", H.introText);
  setText("name1", H.brideFirst === false ? H.groom : H.bride);
  setText("name2", H.brideFirst === false ? H.bride : H.groom);
  setText("parents", H.parents); setText("scrollLabel", H.scrollLabel);

  /* ---------- 5. petals (after opening) ---------- */
  function startPetals() {
    const cv = $("#petals-canvas"), ctx = cv.getContext("2d"), petals = [];
    const colors = ["#f7c6c7", "#eac9c7", "#f0d0c0", "#e8c8b8", "#f5d5c5", "#d4af37"];
    const size = () => { cv.width = window.innerWidth; cv.height = window.innerHeight; };
    size(); window.addEventListener("resize", size);
    const spawn = () => { if (petals.length > 35) return; petals.push({ x: Math.random() * cv.width, y: -20, r: Math.random() * Math.PI * 2, vx: (Math.random() - .5) * .8, vy: .6 + Math.random() * 1.2, vr: (Math.random() - .5) * .02, size: 6 + Math.random() * 10, opacity: .3 + Math.random() * .5, color: colors[Math.floor(Math.random() * colors.length)] }); };
    const tick = () => {
      ctx.clearRect(0, 0, cv.width, cv.height);
      for (let i = petals.length - 1; i >= 0; i--) {
        const p = petals[i];
        p.x += p.vx + Math.sin(p.y * .01) * .3; p.y += p.vy; p.r += p.vr;
        if (p.y > cv.height + 20) { petals.splice(i, 1); continue; }
        ctx.save(); ctx.translate(p.x, p.y); ctx.rotate(p.r); ctx.globalAlpha = p.opacity; ctx.fillStyle = p.color;
        ctx.beginPath(); ctx.ellipse(0, 0, p.size * .5, p.size, 0, 0, Math.PI * 2); ctx.fill(); ctx.restore();
      }
      if (Math.random() < .06) spawn();
      requestAnimationFrame(tick);
    };
    cv.classList.add("active"); tick();
  }

  /* ---------- 6. confetti (big burst on unlock, side cannons on RSVP) ---------- */
  const confettiCanvas = $("#confetti-canvas"), cctx = confettiCanvas.getContext("2d");
  let confettiPieces = [], confettiRunning = false;
  const confettiLoop = () => {
    cctx.clearRect(0, 0, confettiCanvas.width, confettiCanvas.height);
    let alive = false;
    confettiPieces.forEach((r) => {
      r.vy += r.gravity; r.x += r.vx; r.y += r.vy; r.rotation += r.rotSpeed; r.vx *= .99;
      if (r.y > confettiCanvas.height * .7) r.opacity -= .02;
      if (r.opacity > 0 && r.y < confettiCanvas.height + 50) {
        alive = true; cctx.save(); cctx.translate(r.x, r.y); cctx.rotate(r.rotation * Math.PI / 180); cctx.globalAlpha = Math.max(0, r.opacity); cctx.fillStyle = r.color; cctx.fillRect(-r.w / 2, -r.h / 2, r.w, r.h); cctx.restore();
      }
    });
    if (alive) requestAnimationFrame(confettiLoop); else { confettiRunning = false; confettiPieces = []; confettiCanvas.classList.remove("on"); }
  };
  const burst = (pieces) => {
    confettiCanvas.width = window.innerWidth; confettiCanvas.height = window.innerHeight; confettiCanvas.classList.add("on");
    confettiPieces.push(...pieces);
    if (!confettiRunning) { confettiRunning = true; requestAnimationFrame(confettiLoop); }
  };
  const rainConfetti = () => {
    const colors = ["#c9a270", "#e8d5b7", "#d4af37", "#f5c6cb", "#ff9a9e", "#fad0c4", "#a8e6cf", "#dcedc1", "#ffd3b6", "#fff1e6"];
    const W = window.innerWidth, Hh = window.innerHeight, out = [];
    for (let i = 0; i < 150; i++) out.push({ x: Math.random() * W, y: -20 - Math.random() * Hh * .5, vx: (Math.random() - .5) * 8, vy: Math.random() * 3 + 2, w: Math.random() * 10 + 5, h: Math.random() * 6 + 3, color: colors[Math.floor(Math.random() * colors.length)], rotation: Math.random() * 360, rotSpeed: (Math.random() - .5) * 10, gravity: .12 + Math.random() * .08, opacity: 1 });
    burst(out);
  };
  const sideCannons = (ms) => {
    const colors = ["#d4af37", "#8a4f4c", "#ffffff"], end = Date.now() + ms, Hh = window.innerHeight, W = window.innerWidth;
    const shot = () => {
      const out = [];
      for (let i = 0; i < 8; i++) {
        [[0, 60], [W, 120]].forEach(([x, ang]) => {
          const a = (ang + (Math.random() - .5) * 55) * Math.PI / 180, sp = 9 + Math.random() * 6;
          out.push({ x, y: Hh * .55, vx: Math.cos(a) * sp, vy: -Math.sin(a) * sp, w: 8, h: 4, color: colors[i % 3], rotation: Math.random() * 360, rotSpeed: (Math.random() - .5) * 10, gravity: .18, opacity: 1 });
        });
      }
      burst(out);
      if (Date.now() < end) requestAnimationFrame(shot);
    };
    shot();
  };

  /* ---------- 7. save the date: scratch cards ---------- */
  const S = C.saveTheDate || {};
  setText("sdLabel", S.label); setText("sdTitle", S.title); setText("sdDesc", S.desc);
  const grid = $("#scratchGrid");
  grid.innerHTML = (S.cards || []).map((c) => `
    <div class="scratch-item">
      <span class="scratch-label">${esc(c.label)}</span>
      <div class="scratch-card-wrapper wiggling">
        <div class="scratch-value">${esc(c.value)}</div>
        <canvas class="scratch-canvas" width="120" height="160"></canvas>
        <div class="scratch-overlay"><span>Scratch</span></div>
      </div>
      <span class="scratch-hint">↑ SCRATCH</span>
    </div>`).join("");
  let doneCards = 0;
  const unlock = () => {
    rainConfetti();
    setTimeout(() => {
      $("#locked").classList.add("unlocked");
      initUnlocked();
      window.scrollBy({ top: window.innerHeight * .3, behavior: "smooth" });
    }, 1500);
  };
  $$(".scratch-item", grid).forEach((item) => {
    const cv = $("canvas", item), ctx = cv.getContext("2d", { willReadFrequently: true }), wrap = $(".scratch-card-wrapper", item);
    const g = ctx.createLinearGradient(0, 0, 120, 160);
    g.addColorStop(0, "#d1a3a4"); g.addColorStop(.5, "#b97a7e"); g.addColorStop(1, "#a15b5f");
    ctx.fillStyle = g; ctx.fillRect(0, 0, 120, 160);
    ctx.globalCompositeOperation = "destination-out"; ctx.lineWidth = 65; ctx.lineCap = "round"; ctx.lineJoin = "round";
    let drawing = false, done = false, lx = 0, ly = 0;
    const pos = (e) => { const b = cv.getBoundingClientRect(); return { x: (e.clientX - b.left) * 120 / b.width, y: (e.clientY - b.top) * 160 / b.height }; };
    const check = () => {
      if (done) return;
      const d = ctx.getImageData(0, 0, 120, 160).data; let n = 0;
      for (let i = 3; i < d.length; i += 4) if (d[i] < 128) n++;
      if (n / (d.length / 4) > .45) {
        done = true; cv.classList.add("done"); wrap.classList.remove("wiggling");
        $(".scratch-overlay", item).classList.add("hidden"); $(".scratch-hint", item).classList.add("hidden");
        if (++doneCards === (S.cards || []).length) unlock();
      }
    };
    cv.addEventListener("pointerdown", (e) => { if (done) return; e.preventDefault(); drawing = true; cv.setPointerCapture(e.pointerId); const p = pos(e); lx = p.x; ly = p.y; ctx.beginPath(); ctx.arc(p.x, p.y, 32.5, 0, Math.PI * 2); ctx.fill(); });
    cv.addEventListener("pointermove", (e) => { if (!drawing || done) return; e.preventDefault(); const p = pos(e); ctx.beginPath(); ctx.moveTo(lx, ly); ctx.lineTo(p.x, p.y); ctx.stroke(); lx = p.x; ly = p.y; });
    const up = () => { if (!drawing) return; drawing = false; check(); };
    cv.addEventListener("pointerup", up); cv.addEventListener("pointercancel", up); cv.addEventListener("pointerleave", up);
  });
  watch($("#scratch-section"));

  /* ---------- 8. everything below the scratch cards ---------- */
  let unlockedInit = false;
  function initUnlocked() {
    if (unlockedInit) return; unlockedInit = true;

    /* countdown */
    const CD = C.countdown || {};
    setText("cdQuote", CD.quote); setText("cdScript", CD.script); setText("cdDate", CD.dateText);
    const target = new Date(CD.target || "");
    const pad = (n) => String(Math.max(0, n)).padStart(2, "0");
    const tick = () => {
      let diff = Math.max(0, target - Date.now());
      const d = Math.floor(diff / 864e5); diff -= d * 864e5;
      const h = Math.floor(diff / 36e5); diff -= h * 36e5;
      const mi = Math.floor(diff / 6e4); diff -= mi * 6e4;
      setText("cdDays", pad(d)); setText("cdHours", pad(h)); setText("cdMins", pad(mi)); setText("cdSecs", pad(Math.floor(diff / 1e3)));
    };
    if (!isNaN(target)) { tick(); setInterval(tick, 1000); }
    watch($("#countdown-section"));

    /* story stack */
    const ST = C.story || {};
    setText("storyLabel", ST.label); setText("storyTitle", ST.title);
    const stack = $("#storyStack");
    stack.innerHTML = (ST.photos || []).map((p) => `
      <div class="story-card-wrapper"><div class="story-polaroid"><img src="${esc(p.src)}" alt="${esc(p.caption)}" loading="lazy" decoding="async"><div class="story-polaroid-caption">${esc(p.caption)}</div></div></div>`).join("");
    const cards = $$(".story-card-wrapper", stack), tilt = [-2.5, 1.8, -1.5, 2.2, -2, 1.5];
    const layout = () => {
      cards.forEach((card, i) => {
        const t = tilt[i % tilt.length];
        if (i < cards.length - 1) {
          const nextTop = cards[i + 1].getBoundingClientRect().top, hold = window.innerHeight * .22;
          if (nextTop <= hold) { card.style.transform = `scale(0.92) rotate(${t}deg)`; card.style.filter = "brightness(0.5)"; }
          else if (nextTop < window.innerHeight) {
            const prog = Math.max(0, Math.min(1, 1 - (nextTop - hold) / (window.innerHeight - hold)));
            card.style.transform = `scale(${1 - .08 * prog}) rotate(${t}deg)`; card.style.filter = `brightness(${1 - .5 * prog})`;
          } else { card.style.transform = `scale(1) rotate(${t}deg)`; card.style.filter = "brightness(1)"; }
        } else { card.style.transform = `scale(1) rotate(${t}deg)`; card.style.filter = "brightness(1)"; }
      });
    };
    layout(); window.addEventListener("scroll", layout, { passive: true });

    /* venue */
    const V = C.venue || {};
    setText("venueLabel", V.label); setText("venueTitle", V.title); setText("venueName", V.name); setText("venueAddr", V.address); setText("venueBtnLabel", V.buttonLabel || "View on Maps");
    $("#venueBtn").href = V.mapsUrl || "#";
    const mapIo = new IntersectionObserver((en) => { if (en.some((e) => e.isIntersecting)) { $("#venueMap").src = V.mapEmbedUrl || ""; mapIo.disconnect(); } }, { rootMargin: "600px 0px" });
    mapIo.observe($("#venue-section"));
    watch($("#venue-section"));

    /* festivities */
    const E = C.events || {};
    setText("eventsLabel", E.label); setText("eventsTitle", E.title);
    const pin = `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/></svg>`;
    $("#eventsStack").innerHTML = (E.items || []).map((ev) => {
      const dark = ev.dark ? " dark-text" : "";
      const venue = ev.venue || E.venue || "", mapQ = ev.mapQuery || E.mapQuery || "";
      return `
      <div class="event-block">
        <div class="event-invite-frame${ev.image ? "" : " plain"}">
          ${ev.image ? `<img class="event-invite-bg" src="${esc(ev.image)}" alt="" loading="lazy"><div class="event-invite-shade"></div>` : ""}
          <div class="event-invite-overlay"><div class="event-invite-stack">
            <h3 class="event-invite-title${dark}">${esc(ev.title)}</h3>
            <div class="event-date-row${dark}"><span>${esc(ev.day)}</span><span class="event-date-bar">|</span><span class="event-date-num">${esc(ev.num)}</span><span class="event-date-bar">|</span><span>${esc(ev.monthYear)}</span></div>
            <div class="event-invite-time${dark}">${esc(ev.time)}</div>
          </div></div>
        </div>
        <div class="evt-details">
          <p class="evt-tagline">"${esc(ev.tagline)}"</p>
          ${ev.dresscode ? `<div class="evt-dresscode"><span class="evt-dresscode-lbl">Dress code</span><div class="evt-dresscode-dots">${(ev.dresscode.colors || []).map((c) => `<span class="evt-dresscode-dot" style="background:${esc(c)}"></span>`).join("")}</div><span class="evt-dresscode-names">${esc(ev.dresscode.names)}</span><span class="evt-dresscode-note">${esc(ev.dresscode.note)}</span></div>` : ""}
          <div class="evt-venue"><span class="evt-venue-name">${esc(venue)}</span>${mapQ ? `<a class="evt-dir-btn" href="https://maps.google.com/?q=${encodeURIComponent(mapQ)}" target="_blank" rel="noopener">${pin}Get directions</a>` : ""}</div>
        </div>
      </div>`;
    }).join("");
    $$(".event-block").forEach(watch);

    /* rsvp */
    const R = C.rsvp || {};
    setText("rsvpLabel", R.label); setText("rsvpTitle", R.title); setText("rsvpIntro", R.intro); setText("thanksTitle", R.thankYouTitle); setText("thanksText", R.thankYouText);
    const tickSvg = `<svg width="14" height="10" viewBox="0 0 14 10" fill="none"><path d="M1 5L4.5 8.5L13 1" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg>`;
    $("#rsvpEvents").innerHTML = (R.events || []).map((e) => `<div class="rsvp-ev on" data-name="${esc(e.name)}"><div><span class="rsvp-ev-name">${esc(e.name)}</span><span class="rsvp-ev-date">${esc(e.date)}</span></div><div class="rsvp-ev-box">${tickSvg}</div></div>`).join("");
    $$(".rsvp-ev").forEach((el) => el.addEventListener("click", () => el.classList.toggle("on")));
    const yes = $("#choiceYes"), no = $("#choiceNo"), extra = $("#rsvpExtra");
    let attending = "yes";
    const setChoice = (v) => { attending = v; yes.classList.toggle("active", v === "yes"); no.classList.toggle("active", v === "no"); extra.style.display = v === "yes" ? "" : "none"; };
    yes.addEventListener("click", () => setChoice("yes")); no.addEventListener("click", () => setChoice("no"));
    $("#rsvp").addEventListener("submit", (e) => {
      e.preventDefault();
      const btn = $("#rsvpSend");
      btn.disabled = true; btn.innerHTML = `<span class="spin"></span>Sending...`;
      const name = $("#rName").value.trim() || "Guest", phone = $("#rPhone").value.trim();
      const lines = [`RSVP for ${H.bride || ""} & ${H.groom || ""}'s wedding`, `Name: ${name}`];
      if (phone) lines.push(`Phone: +91 ${phone}`);
      lines.push(`Attending: ${attending === "yes" ? "Joyfully accept" : "Regrettably decline"}`);
      if (attending === "yes") {
        lines.push(`Party size: ${$("#rSize").value}`);
        const evs = $$(".rsvp-ev.on").map((el) => el.getAttribute("data-name"));
        lines.push(`Events: ${evs.length ? evs.join(", ") : "none"}`);
        const song = $("#rSong").value.trim(); if (song) lines.push(`Song request: ${song}`);
        lines.push(`Dietary: ${$("#rDiet").value}`);
        const adv = $("#rAdvice").value.trim(); if (adv) lines.push(`Advice: ${adv}`);
      }
      setTimeout(() => {
        if (R.whatsapp) window.open(`https://wa.me/${R.whatsapp}?text=${encodeURIComponent(lines.join("\n"))}`, "_blank");
        $("#rsvpForm").hidden = true; $("#rsvpDone").hidden = false;
        sideCannons(3000);
      }, 1200);
    });

    /* footer */
    const F = C.footer || {};
    setText("footerMsg", F.message); setText("footerRegardsLabel", F.regardsLabel); setText("footerRegards", F.regards); setText("footerNames", F.names); setText("footerCredit", F.credit);
    watch($("#footer-section"));
  }
})();
