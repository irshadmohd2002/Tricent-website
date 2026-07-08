import Lenis from 'lenis';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { heroScene, macroScene, explodedScene } from './scenes.js';
import { terrainView } from './terrain.js';
import { sweepView } from './sweep.js';
import { buildRail } from './rail.js';

gsap.registerPlugin(ScrollTrigger);

// cinematic page: always open at the top so the GCS boot runs over the hero
if ('scrollRestoration' in history) history.scrollRestoration = 'manual';
window.scrollTo(0, 0);
window.addEventListener('load', () => {
  requestAnimationFrame(() => { window.scrollTo(0, 0); ScrollTrigger.refresh(); });
});

/* ================= GCS BOOT ================= */

const boot = document.getElementById('boot');
const bootLines = boot.querySelectorAll('.boot-line');
const bootFill = boot.querySelector('.boot-bar-fill');
gsap.to(bootFill, { scaleX: 1, duration: 1.15, ease: 'power1.inOut' });
bootLines.forEach((el, i) => setTimeout(() => el.classList.add('on'), 120 + i * 340));
setTimeout(() => {
  boot.classList.add('done');
  heroIntro();
}, 1350);

/* ================= SMOOTH SCROLL ================= */

const lenis = new Lenis({ duration: 1.1 });
lenis.on('scroll', ScrollTrigger.update);
gsap.ticker.add((time) => lenis.raf(time * 1000));
gsap.ticker.lagSmoothing(0);

/* ================= TOP NAV ================= */

const navLinks = document.getElementById('nav-links');
const burger = document.getElementById('nav-burger');
burger.addEventListener('click', () => navLinks.classList.toggle('open'));

// anchor navigation through Lenis (pinned sections keep native anchor
// scrolling from landing correctly, so drive it ourselves)
document.querySelectorAll('a[data-nav]').forEach((a) => {
  a.addEventListener('click', (e) => {
    const id = a.getAttribute('href');
    if (!id || !id.startsWith('#')) return;
    const target = document.querySelector(id);
    if (!target) return;
    e.preventDefault();
    navLinks.classList.remove('open');
    const y = target.getBoundingClientRect().top + window.scrollY;
    lenis.scrollTo(y, { duration: 1.4 });
  });
});

/* ================= SCENES ================= */

const hero = heroScene(document.getElementById('hero-canvas'));
const macro = macroScene(document.getElementById('macro-canvas'));
const exploded = explodedScene(document.getElementById('exploded-canvas'));
const terrain = terrainView(document.getElementById('terrain-canvas'));
const sweep = sweepView(document.getElementById('sweep-canvas'));

// render only what is on screen
const visible = new Set();
const io = new IntersectionObserver((entries) => {
  for (const e of entries) {
    const id = e.target.closest('section')?.id;
    if (!id) continue;
    e.isIntersecting ? visible.add(id) : visible.delete(id);
  }
});
document.querySelectorAll('.stage canvas').forEach((c) => io.observe(c));

/* ================= PINNED SCRUB SECTIONS ================= */

function pinScrub(secId, lengthPct, onUpdate) {
  const sec = document.getElementById(secId);
  const stage = sec.querySelector('.stage');
  return ScrollTrigger.create({
    trigger: sec,
    start: 'top top',
    end: `+=${lengthPct}%`,
    pin: stage,
    scrub: true,
    anticipatePin: 1,
    onUpdate: (st) => onUpdate(st.progress),
  });
}

/* ---- home: hero orbit ---- */
const heroCopy = document.querySelector('.hero-copy');
const heroHint = document.getElementById('hero-hint');
const heroAz = document.getElementById('hero-azimuth');
pinScrub('home', 300, (p) => {
  hero.progress = p;
  heroHint.style.opacity = String(Math.max(0, 1 - p * 9));
  const fade = p < 0.6 ? 1 : Math.max(0, 1 - (p - 0.6) / 0.28);
  heroCopy.style.opacity = String(fade);
});

function heroIntro() {
  gsap.fromTo('#hero-logo', { opacity: 0, y: -16 },
    { opacity: 1, y: 0, duration: 1.2, ease: 'power3.out' });
  gsap.fromTo('#hero-title .line',
    { opacity: 0, letterSpacing: '0.55em' },
    { opacity: 1, letterSpacing: '0.18em', duration: 1.7, ease: 'power3.out', stagger: 0.14 });
  gsap.fromTo(['#hero-tagline', '#hero-subline', '#hero-hint', '#hero-readout'],
    { opacity: 0, y: 14 },
    { opacity: 1, y: 0, duration: 1.1, ease: 'power2.out', stagger: 0.1, delay: 0.55, clearProps: 'opacity,transform' });
}

/* ---- operations: nadir flyover + telemetry ---- */
const T = {
  alt: document.getElementById('t-alt'), gs: document.getElementById('t-gs'),
  hdg: document.getElementById('t-hdg'), lat: document.getElementById('t-lat'),
  lon: document.getElementById('t-lon'), bat: document.getElementById('t-bat'),
  tc: document.getElementById('t-tc'),
};
pinScrub('operations', 350, (p) => { terrain.state.progress = p; });

function updateTelemetry(t) {
  const p = terrain.state.shown;
  T.alt.textContent = `${(120 + Math.sin(p * 40) * 2.4 + Math.sin(t * 0.001) * 0.7).toFixed(1)} M`;
  T.gs.textContent = `${(18.2 + Math.sin(p * 25) * 0.5).toFixed(1)} M/S`;
  T.hdg.textContent = `${String(Math.round(((7 + Math.sin(p * 30) * 3) + 360) % 360)).padStart(3, '0')}°`;
  T.lat.textContent = `${(26.84670 + p * 0.04512).toFixed(5)} N`;
  T.lon.textContent = `${(80.94981 + Math.sin(p * 3.1) * 0.0012).toFixed(5)} E`;
  T.bat.textContent = `${Math.round(94 - p * 13)}%`;
  const secs = p * 372;
  const hh = '00';
  const mm = String(Math.floor(secs / 60)).padStart(2, '0');
  const ss = String(Math.floor(secs % 60)).padStart(2, '0');
  const ff = String(Math.floor((secs % 1) * 25)).padStart(2, '0');
  T.tc.textContent = `${hh}:${mm}:${ss}:${ff}`;
}

/* ---- payload: sensor macro + callouts ---- */
const MACRO_CALLS = [
  'EO/IR GIMBAL · 3-AXIS STABILISED',
  'CFRP COMPOSITE SKIN · PANELISED ACCESS',
  'EDGE-AI BAY · PASSIVE THERMAL VENTING · SEALED AVIONICS',
  'C2 / TELEMETRY LINK · ENCRYPTED',
];
const mcIndex = document.getElementById('mc-index');
const mcText = document.getElementById('mc-text');
let mcCurrent = -1;
pinScrub('payload', 280, (p) => {
  macro.progress = p;
  const i = Math.min(3, Math.floor(p * 4));
  if (i !== mcCurrent) {
    mcCurrent = i;
    mcIndex.textContent = `0${i + 1} / 04`;
    mcText.textContent = MACRO_CALLS[i];
    gsap.fromTo(mcText, { opacity: 0, x: 10 }, { opacity: 1, x: 0, duration: 0.4 });
  }
});

/* ---- technology: exploded architecture + leader lines ---- */
const ARCH = [
  { key: 'autonomy', off: [-280, -175], label: 'AUTONOMY STACK', sub: 'ONE STACK, EVERY PLATFORM' },
  { key: 'gcslink', off: [200, -95], label: 'RUGGED GCS LINK', sub: 'COMMON GCS LAYER' },
  { key: 'edgeai', off: [230, -30], label: 'EDGE-AI COMPUTE MODULE', sub: 'ONBOARD INFERENCE · SENSOR-TO-DECISION' },
  { key: 'gimbal', off: [180, 140], label: 'EO/IR PAYLOAD', sub: 'COMMON PAYLOAD INTERFACE' },
  { key: 'battery', off: [-280, 120], label: 'BATTERY / PROPULSION PACK', sub: 'FIELD-SWAPPABLE' },
  { key: 'groundSeg', off: [200, 40], label: 'AI MISSION ANALYTICS PLATFORM', sub: 'ONE ANALYTICS LAYER ACROSS THE FLEET' },
];
const leaderSvg = document.getElementById('leader-svg');
const coWrap = document.getElementById('arch-callouts');
const archEls = ARCH.map((a) => {
  const div = document.createElement('div');
  div.className = 'arch-co';
  div.innerHTML = `<span>${a.label}</span>${a.sub ? `<small>${a.sub}</small>` : ''}`;
  coWrap.appendChild(div);
  const line = document.createElementNS('http://www.w3.org/2000/svg', 'line');
  const line2 = document.createElementNS('http://www.w3.org/2000/svg', 'line');
  const dot = document.createElementNS('http://www.w3.org/2000/svg', 'circle');
  dot.setAttribute('r', 2.5);
  leaderSvg.append(line, line2, dot);
  return { ...a, div, line, line2, dot };
});
const archDone = document.createElement('p');
archDone.className = 'mono arch-co';
archDone.style.cssText = 'left:50%;top:78%;transform:translateX(-50%);color:#dfe4ea;';
archDone.innerHTML = 'INTEGRATION COMPLETE · <span style="color:var(--ok)">ONE AIRCRAFT</span>';
coWrap.appendChild(archDone);

pinScrub('technology', 300, (p) => { exploded.progress = p; });

function updateArchCallouts() {
  const stage = document.querySelector('#technology .stage');
  const w = stage.clientWidth, h = stage.clientHeight;
  const k = exploded.assembly();                       // 1 = exploded, 0 = assembled
  const vis = Math.max(0, Math.min(1, (k - 0.06) * 2.4));
  const uas = exploded.uas.userData;
  const narrow = w < 900;                              // stacked legend, no leader lines
  for (const [idx, a] of archEls.entries()) {
    const obj = a.key === 'groundSeg' ? uas.groundSeg : uas.modules[a.key];
    const pt = exploded.project(obj);
    let lx, ly;
    if (narrow) {
      lx = Math.round(w * 0.08);
      ly = Math.round(h * 0.60 + idx * 52);
    } else {
      const scale = Math.min(1, w / 1300);
      lx = pt.x + a.off[0] * scale;
      ly = pt.y + a.off[1] * scale;
      lx = Math.max(12, Math.min(w - 330, lx));
      ly = Math.max(240, Math.min(h - 60, ly));
    }
    a.div.style.left = `${lx}px`;
    a.div.style.top = `${ly}px`;
    a.div.style.opacity = String(vis);
    const ex = lx > pt.x ? lx - 8 : lx + a.div.offsetWidth + 8;
    a.line.setAttribute('x1', pt.x); a.line.setAttribute('y1', pt.y);
    a.line.setAttribute('x2', ex); a.line.setAttribute('y2', ly);
    a.line2.setAttribute('x1', ex); a.line2.setAttribute('y1', ly);
    a.line2.setAttribute('x2', lx > pt.x ? lx - 2 : lx + a.div.offsetWidth + 2); a.line2.setAttribute('y2', ly);
    a.dot.setAttribute('cx', pt.x); a.dot.setAttribute('cy', pt.y);
    for (const el of [a.line, a.line2, a.dot]) el.style.opacity = String(narrow ? 0 : vis);
  }
  archDone.style.opacity = String(k < 0.02 ? 1 : 0);
}

/* ---- airspace sweep ---- */
const ssEls = document.querySelectorAll('#sweep-status .ss');
pinScrub('airspace', 280, (p) => {
  sweep.state.progress = p;
  ssEls[0].classList.toggle('on', p > 0.32);
  ssEls[1].classList.toggle('on', p > 0.52);
  ssEls[2].classList.toggle('on', p > 0.72);
});

/* ================= TEXT REVEALS ================= */

gsap.utils.toArray('.reveal').forEach((el) => {
  gsap.to(el, {
    opacity: 1, y: 0, ease: 'none',
    scrollTrigger: { trigger: el, start: 'top 88%', end: 'top 58%', scrub: true },
  });
});

/* ================= WAYPOINT RAIL ================= */

const sections = [...document.querySelectorAll('section[data-wp]')].map((el) => ({
  el, wp: el.dataset.wp, label: el.dataset.label, scrollStart: 0,
}));
function measureSections() {
  for (const s of sections) {
    s.scrollStart = s.el.getBoundingClientRect().top + window.scrollY;
  }
}
measureSections();
const rail = buildRail(sections);
ScrollTrigger.addEventListener('refresh', () => { measureSections(); rail.layout(); });

/* ================= HUD CLOCK ================= */

const utcEl = document.querySelector('.hud-utc');
setInterval(() => {
  utcEl.textContent = `UTC ${new Date().toISOString().slice(11, 19)}`;
}, 1000);

/* ================= ENQUIRY FORM (opens the user's mail client) ============ */

document.getElementById('quote-form').addEventListener('submit', (e) => {
  e.preventDefault();
  const f = new FormData(e.target);
  const subject = encodeURIComponent(`Enquiry — ${f.get('sector')} — ${f.get('org')}`);
  const body = encodeURIComponent(
    `Name: ${f.get('name')}\nOrganisation: ${f.get('org')}\nEmail: ${f.get('email')}\nSector: ${f.get('sector')}\n\nRequirement:\n${f.get('msg')}`
  );
  window.location.href = `mailto:info@tricentaerospace.in?subject=${subject}&body=${body}`;
});

/* ================= MASTER LOOP ================= */

gsap.ticker.add((time) => {
  const t = time * 1000;
  if (visible.has('home')) {
    hero.tick(t);
    heroAz.textContent = `AZ ${hero.azimuth().toFixed(1).padStart(5, '0')}°`;
  }
  if (visible.has('operations')) { terrain.tick(t); updateTelemetry(t); }
  if (visible.has('payload')) macro.tick(t);
  if (visible.has('technology')) { exploded.tick(t); updateArchCallouts(); }
  if (visible.has('airspace')) sweep.tick(t);

  const doc = document.documentElement;
  const max = doc.scrollHeight - window.innerHeight;
  rail.update(max > 0 ? Math.min(1, Math.max(0, window.scrollY / max)) : 0);
});

/* ================= RESIZE ================= */

let rsT;
window.addEventListener('resize', () => {
  clearTimeout(rsT);
  rsT = setTimeout(() => {
    hero.resize(); macro.resize(); exploded.resize();
    terrain.resize(); sweep.resize();
    ScrollTrigger.refresh();
  }, 150);
});

// debug/verification handle: lets tooling drive one frame even when the tab
// is hidden and rAF is paused
window.__tricent = {
  hero, macro, exploded, terrain, sweep, rail, lenis, ScrollTrigger,
  frame(t = performance.now()) {
    hero.tick(t); macro.tick(t); exploded.tick(t);
    terrain.tick(t); sweep.tick(t);
    updateTelemetry(t); updateArchCallouts();
    heroAz.textContent = `AZ ${hero.azimuth().toFixed(1).padStart(5, '0')}°`;
    const max = document.documentElement.scrollHeight - window.innerHeight;
    rail.update(max > 0 ? Math.min(1, Math.max(0, window.scrollY / max)) : 0);
  },
};
