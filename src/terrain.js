// Nadir survey-run terrain: a tall pre-rendered strip (farmland, dirt tracks,
// a river, a road corridor, an industrial estate, a power line, tree stands,
// and a coastline at the end) panned beneath the viewer by scroll —
// as if the viewer IS the aircraft on a survey run.
//
// Drop-in note: this module is the procedural fallback for the Seedance
// nadir-flyover frame sequence. Replace draw() with a frame-sequence
// blitter reading /assets/sequences/flyover/*.jpg when clips are available.

const W = 1600;
const H = 9600;

function rng(seed) {
  let s = seed >>> 0;
  return () => ((s = (s * 1664525 + 1013904223) >>> 0) / 4294967296);
}

export function buildTerrain() {
  const c = document.createElement('canvas');
  c.width = W; c.height = H;
  const x = c.getContext('2d');
  const r = rng(20260707);

  // ---- base earth ----
  x.fillStyle = '#3a3d31';
  x.fillRect(0, 0, W, H);

  // ---- field patchwork with crop rows ----
  const palette = ['#43503a', '#4f5a41', '#5a5f46', '#575243', '#4a4536', '#3f4a3c', '#525c3e', '#464b38'];
  let y = 0;
  while (y < H) {
    const rowH = 120 + r() * 220;
    let xx = -40;
    while (xx < W) {
      const cw = 140 + r() * 320;
      x.fillStyle = palette[(r() * palette.length) | 0];
      x.fillRect(xx, y, cw + 2, rowH + 2);
      // crop rows
      if (r() > 0.35) {
        x.strokeStyle = 'rgba(0,0,0,0.08)';
        x.lineWidth = 1;
        const vert = r() > 0.5;
        const step = 7 + r() * 6;
        x.save();
        x.beginPath();
        x.rect(xx, y, cw, rowH);
        x.clip();
        x.beginPath();
        if (vert) for (let i = xx; i < xx + cw; i += step) { x.moveTo(i, y); x.lineTo(i, y + rowH); }
        else for (let i = y; i < y + rowH; i += step) { x.moveTo(xx, i); x.lineTo(xx + cw, i); }
        x.stroke();
        x.restore();
      }
      // field boundary
      x.strokeStyle = 'rgba(30,32,24,0.5)';
      x.strokeRect(xx, y, cw, rowH);
      xx += cw;
    }
    y += rowH;
  }

  // ---- dirt tracks ----
  x.strokeStyle = '#5c5642';
  x.lineWidth = 4;
  for (let i = 0; i < 14; i++) {
    x.beginPath();
    const ty = r() * H;
    x.moveTo(0, ty);
    x.bezierCurveTo(W * 0.3, ty + (r() - 0.5) * 300, W * 0.7, ty + (r() - 0.5) * 300, W, ty + (r() - 0.5) * 200);
    x.stroke();
  }

  // ---- river (meanders down the strip) ----
  const riverPts = [];
  for (let i = 0; i <= 60; i++) {
    const ry = (H * i) / 60;
    riverPts.push([W * 0.68 + Math.sin(i * 0.55) * 160 + Math.sin(i * 0.13) * 240, ry]);
  }
  x.lineJoin = 'round'; x.lineCap = 'round';
  x.strokeStyle = '#4a4f3c'; x.lineWidth = 96;   // banks
  x.beginPath(); riverPts.forEach(([px, py], i) => (i ? x.lineTo(px, py) : x.moveTo(px, py))); x.stroke();
  x.strokeStyle = '#2c3a41'; x.lineWidth = 58;   // water
  x.beginPath(); riverPts.forEach(([px, py], i) => (i ? x.lineTo(px, py) : x.moveTo(px, py))); x.stroke();
  x.strokeStyle = 'rgba(150,170,175,0.14)'; x.lineWidth = 3; // glint
  x.beginPath(); riverPts.forEach(([px, py], i) => (i ? x.lineTo(px, py) : x.moveTo(px, py))); x.stroke();

  // ---- main road corridor ----
  const roadX = (ry) => W * 0.30 + Math.sin(ry * 0.0006) * 120;
  x.strokeStyle = '#4e5158'; x.lineWidth = 26;
  x.beginPath();
  for (let ry = 0; ry <= H; ry += 40) { const px = roadX(ry); ry ? x.lineTo(px, ry) : x.moveTo(px, ry); }
  x.stroke();
  x.strokeStyle = 'rgba(210,214,220,0.35)'; x.lineWidth = 2;
  x.setLineDash([26, 30]);
  x.beginPath();
  for (let ry = 0; ry <= H; ry += 40) { const px = roadX(ry); ry ? x.lineTo(px, ry) : x.moveTo(px, ry); }
  x.stroke();
  x.setLineDash([]);
  // connector roads
  x.strokeStyle = '#4a4d54'; x.lineWidth = 14;
  for (let i = 0; i < 8; i++) {
    const ry = 500 + i * 1150 + r() * 300;
    x.beginPath(); x.moveTo(roadX(ry), ry);
    x.lineTo(ry % 2 ? W : 0, ry + (r() - 0.5) * 260); x.stroke();
  }
  // vehicles
  for (let i = 0; i < 90; i++) {
    const ry = r() * H, off = (r() - 0.5) * 14;
    x.fillStyle = r() > 0.5 ? '#b9bdc4' : '#6d7076';
    x.fillRect(roadX(ry) + off - 3, ry, 6, 11);
  }

  // ---- industrial estate ----
  const estY = H * 0.42;
  x.fillStyle = '#3c3e42';
  x.fillRect(W * 0.08, estY, W * 0.42, 900);          // apron
  for (let i = 0; i < 12; i++) {
    const bx = W * 0.10 + (i % 4) * W * 0.10;
    const by = estY + 60 + Math.floor(i / 4) * 280;
    const bw = W * 0.075 + r() * 30, bh = 190 + r() * 50;
    x.fillStyle = '#565b63';
    x.fillRect(bx, by, bw, bh);
    // saw-tooth roof lines
    x.strokeStyle = 'rgba(20,22,26,0.5)'; x.lineWidth = 2;
    x.beginPath();
    for (let sx = bx; sx < bx + bw; sx += 18) { x.moveTo(sx, by); x.lineTo(sx, by + bh); }
    x.stroke();
    x.fillStyle = 'rgba(170,176,186,0.5)';
    x.fillRect(bx, by, bw, 5);                        // roof highlight
  }
  // parking with car dots
  x.fillStyle = '#43464c';
  x.fillRect(W * 0.10, estY + 640, W * 0.36, 180);
  for (let i = 0; i < 140; i++) {
    x.fillStyle = ['#9aa0a8', '#787d85', '#b9bdc4', '#5c6067'][(r() * 4) | 0];
    x.fillRect(W * 0.11 + r() * W * 0.34, estY + 652 + r() * 150, 5, 9);
  }

  // ---- power line (pylons + catenary shadows) ----
  const pylX = (ry) => W * 0.52 + (ry / H) * 260;
  x.strokeStyle = 'rgba(200,205,212,0.20)'; x.lineWidth = 1.5;
  x.beginPath();
  for (let ry = 0; ry <= H; ry += 30) { const px = pylX(ry); ry ? x.lineTo(px, ry) : x.moveTo(px, ry); }
  x.stroke();
  x.beginPath();
  for (let ry = 0; ry <= H; ry += 30) { const px = pylX(ry) + 10; ry ? x.lineTo(px, ry) : x.moveTo(px, ry); }
  x.stroke();
  for (let ry = 140; ry < H; ry += 240) {
    const px = pylX(ry);
    // long soft shadow
    x.strokeStyle = 'rgba(15,17,14,0.35)'; x.lineWidth = 3;
    x.beginPath(); x.moveTo(px + 5, ry); x.lineTo(px + 58, ry + 26); x.stroke();
    // pylon cross
    x.strokeStyle = '#8f959d'; x.lineWidth = 2.5;
    x.beginPath();
    x.moveTo(px - 9, ry - 9); x.lineTo(px + 19, ry + 9);
    x.moveTo(px + 19, ry - 9); x.lineTo(px - 9, ry + 9);
    x.stroke();
  }

  // ---- tree stands ----
  for (let i = 0; i < 260; i++) {
    const cx = r() * W, cy = r() * H, n = 3 + r() * 14;
    for (let j = 0; j < n; j++) {
      const tx = cx + (r() - 0.5) * 90, ty = cy + (r() - 0.5) * 90, tr = 3 + r() * 6;
      x.fillStyle = 'rgba(18,26,16,0.55)';
      x.beginPath(); x.arc(tx + 4, ty + 3, tr, 0, 7); x.fill();   // shadow
      x.fillStyle = ['#2e4229', '#354b2c', '#28381f'][(r() * 3) | 0];
      x.beginPath(); x.arc(tx, ty, tr, 0, 7); x.fill();
    }
  }

  // ---- coastline at the top (end of run) ----
  const coastY = 1400;
  const shore = (px) => coastY + Math.sin(px * 0.008) * 60 + Math.sin(px * 0.0021) * 140;
  const water = x.createLinearGradient(0, 0, 0, coastY + 200);
  water.addColorStop(0, '#16222b');
  water.addColorStop(1, '#22333e');
  x.fillStyle = water;
  x.beginPath();
  x.moveTo(0, 0); x.lineTo(W, 0);
  for (let px = W; px >= 0; px -= 20) x.lineTo(px, shore(px));
  x.closePath(); x.fill();
  // sand strip + surf
  x.strokeStyle = '#6b6350'; x.lineWidth = 26;
  x.beginPath(); for (let px = 0; px <= W; px += 20) { const sy = shore(px) + 14; px ? x.lineTo(px, sy) : x.moveTo(px, sy); } x.stroke();
  for (let k = 0; k < 3; k++) {
    x.strokeStyle = `rgba(220,228,232,${0.22 - k * 0.06})`; x.lineWidth = 2.5 - k * 0.6;
    x.beginPath();
    for (let px = 0; px <= W; px += 20) {
      const sy = shore(px) - 12 - k * 22 + Math.sin(px * 0.05 + k) * 4;
      px ? x.lineTo(px, sy) : x.moveTo(px, sy);
    }
    x.stroke();
  }

  // ---- speckle noise ----
  x.fillStyle = 'rgba(255,255,255,0.022)';
  for (let i = 0; i < 9000; i++) x.fillRect(r() * W, r() * H, 1.5, 1.5);
  x.fillStyle = 'rgba(0,0,0,0.05)';
  for (let i = 0; i < 9000; i++) x.fillRect(r() * W, r() * H, 2, 2);

  return c;
}

// live scrubbed viewport onto the strip
export function terrainView(canvas) {
  const ctx = canvas.getContext('2d');
  const strip = buildTerrain();
  const state = { progress: 0, shown: 0, active: false };

  function resize() {
    const dpr = Math.min(window.devicePixelRatio || 1, 1.5);
    canvas.width = canvas.clientWidth * dpr;
    canvas.height = canvas.clientHeight * dpr;
  }
  resize();

  function tick(t) {
    // smooth the scrub for a flown feel
    state.shown += (state.progress - state.shown) * 0.09;
    const cw = canvas.width, ch = canvas.height;
    if (!cw || !ch) return;
    const viewW = W;
    const viewH = Math.round((ch / cw) * viewW);
    const range = H - viewH;
    const yOff = range * (1 - state.shown);          // fly bottom -> top (north)
    const drift = Math.sin(state.shown * 4.2) * 26;  // gentle crab
    ctx.save();
    ctx.imageSmoothingEnabled = true;
    ctx.imageSmoothingQuality = 'high';
    ctx.clearRect(0, 0, cw, ch);
    ctx.drawImage(strip, drift, yOff, viewW - 60, viewH, 0, 0, cw, ch);
    // dark tactical grade + vignette
    ctx.fillStyle = 'rgba(6, 9, 11, 0.42)';
    ctx.fillRect(0, 0, cw, ch);
    const vg = ctx.createRadialGradient(cw / 2, ch / 2, ch * 0.32, cw / 2, ch / 2, ch * 0.85);
    vg.addColorStop(0, 'rgba(0,0,0,0)');
    vg.addColorStop(1, 'rgba(2,3,4,0.55)');
    ctx.fillStyle = vg;
    ctx.fillRect(0, 0, cw, ch);
    ctx.restore();
  }

  return { state, tick, resize };
}
