// Airspace-awareness sweep: ownship holds station while a passive EO/IR
// detection envelope expands; an unauthorised small-UAS contact is boxed and
// walked through DETECTED -> CLASSIFIED -> TRACKED.
// Detection, classification and airspace awareness only.

export function sweepView(canvas) {
  const ctx = canvas.getContext('2d');
  const state = { progress: 0, shown: 0, active: false };

  function resize() {
    const dpr = Math.min(window.devicePixelRatio || 1, 1.5);
    canvas.width = canvas.clientWidth * dpr;
    canvas.height = canvas.clientHeight * dpr;
  }
  resize();

  const TI = 'rgba(199,204,212,';
  const SAF = 'rgba(217,142,63,';
  const GRN = 'rgba(111,191,143,';

  function ownship(cx, cy, s) {
    // top-view fixed-wing glyph
    ctx.save();
    ctx.translate(cx, cy);
    ctx.strokeStyle = TI + '0.95)';
    ctx.fillStyle = 'rgba(20,22,26,0.9)';
    ctx.lineWidth = s * 0.06;
    ctx.beginPath();
    ctx.moveTo(s, 0);                 // nose
    ctx.lineTo(s * 0.25, s * 0.16);
    ctx.lineTo(s * 0.1, s * 1.05);    // starboard wing
    ctx.lineTo(-s * 0.12, s * 1.05);
    ctx.lineTo(-s * 0.28, s * 0.16);
    ctx.lineTo(-s * 0.85, s * 0.4);   // stab
    ctx.lineTo(-s * 0.95, s * 0.4);
    ctx.lineTo(-s * 0.75, 0);
    ctx.lineTo(-s * 0.95, -s * 0.4);
    ctx.lineTo(-s * 0.85, -s * 0.4);
    ctx.lineTo(-s * 0.28, -s * 0.16);
    ctx.lineTo(-s * 0.12, -s * 1.05); // port wing
    ctx.lineTo(s * 0.1, -s * 1.05);
    ctx.lineTo(s * 0.25, -s * 0.16);
    ctx.closePath();
    ctx.fill();
    ctx.stroke();
    ctx.restore();
  }

  function tick(t) {
    state.shown += (state.progress - state.shown) * 0.1;
    const p = Math.max(0, Math.min(1, state.shown));
    const w = canvas.width, h = canvas.height;
    if (!w || !h) return;
    ctx.clearRect(0, 0, w, h);
    const u = Math.min(w, h) / 800;                    // scale unit
    const cx = w * 0.34, cy = h * 0.56;

    // ---- polar grid ----
    ctx.lineWidth = 1;
    for (let i = 1; i <= 5; i++) {
      ctx.strokeStyle = TI + '0.07)';
      ctx.beginPath();
      ctx.arc(cx, cy, i * 130 * u, 0, Math.PI * 2);
      ctx.stroke();
    }
    for (let a = 0; a < 12; a++) {
      const ang = (a / 12) * Math.PI * 2;
      ctx.strokeStyle = TI + '0.05)';
      ctx.beginPath();
      ctx.moveTo(cx + Math.cos(ang) * 60 * u, cy + Math.sin(ang) * 60 * u);
      ctx.lineTo(cx + Math.cos(ang) * 660 * u, cy + Math.sin(ang) * 660 * u);
      ctx.stroke();
    }
    // range labels
    ctx.font = `${10 * u + 6}px "IBM Plex Mono", monospace`;
    ctx.fillStyle = TI + '0.35)';
    for (let i = 2; i <= 5; i++) ctx.fillText(`R${i - 1}`, cx + i * 130 * u - 22 * u, cy - 6 * u);

    // ---- expanding passive detection envelope ----
    const env = (80 + p * 560) * u;
    const coneA0 = -0.62, coneA1 = 0.62;               // cone toward +x
    const cone = ctx.createRadialGradient(cx, cy, 30 * u, cx, cy, env);
    cone.addColorStop(0, SAF + '0.10)');
    cone.addColorStop(0.8, SAF + '0.035)');
    cone.addColorStop(1, SAF + '0)');
    ctx.fillStyle = cone;
    ctx.beginPath();
    ctx.moveTo(cx, cy);
    ctx.arc(cx, cy, env, coneA0, coneA1);
    ctx.closePath();
    ctx.fill();
    ctx.strokeStyle = SAF + '0.35)';
    ctx.setLineDash([4, 7]);
    ctx.beginPath();
    ctx.arc(cx, cy, env, coneA0, coneA1);
    ctx.stroke();
    ctx.setLineDash([]);

    // soft omnidirectional pulse rings
    for (let k = 0; k < 2; k++) {
      const ring = (((t * 0.00012 + k * 0.5) % 1) * 0.5 + p * 0.5) * 640 * u;
      ctx.strokeStyle = TI + `${0.10 * (1 - ring / (660 * u))})`;
      ctx.beginPath();
      ctx.arc(cx, cy, Math.max(ring, 1), 0, Math.PI * 2);
      ctx.stroke();
    }

    // ---- ownship ----
    ownship(cx, cy, 26 * u);
    ctx.fillStyle = TI + '0.5)';
    ctx.fillText('TRC-0107 · STATION', cx - 48 * u, cy + 52 * u);

    // ---- contact ----
    const appear = 0.32;
    if (p > appear) {
      const q = (p - appear) / (1 - appear);           // contact-local progress
      // slow inbound drift
      const dx = cx + (520 - q * 90) * u, dy = cy - (200 - q * 50) * u;
      const blink = (Math.sin(t * 0.008) + 1) / 2;

      // track history
      if (p > 0.72) {
        ctx.fillStyle = GRN + '0.5)';
        for (let i = 1; i <= 6; i++) {
          const hq = Math.max(0, q - i * 0.06);
          const hx = cx + (520 - hq * 90) * u, hy = cy - (200 - hq * 50) * u;
          ctx.fillRect(hx - 1.5, hy - 1.5, 3, 3);
        }
        // velocity vector
        ctx.strokeStyle = GRN + '0.8)';
        ctx.lineWidth = 1.2;
        ctx.beginPath();
        ctx.moveTo(dx, dy);
        ctx.lineTo(dx - 46 * u, dy + 26 * u);
        ctx.stroke();
      }

      // contact dot
      ctx.fillStyle = `rgba(224, 120, 80, ${0.6 + blink * 0.4})`;
      ctx.beginPath();
      ctx.arc(dx, dy, 4.5 * u, 0, Math.PI * 2);
      ctx.fill();

      // designation box (corner brackets)
      const bs = 26 * u;
      const col = p > 0.72 ? GRN + '0.95)' : p > 0.52 ? SAF + '0.95)' : TI + '0.9)';
      ctx.strokeStyle = col;
      ctx.lineWidth = 1.4;
      const L = bs * 0.4;
      ctx.beginPath();
      // four corners
      ctx.moveTo(dx - bs, dy - bs + L); ctx.lineTo(dx - bs, dy - bs); ctx.lineTo(dx - bs + L, dy - bs);
      ctx.moveTo(dx + bs - L, dy - bs); ctx.lineTo(dx + bs, dy - bs); ctx.lineTo(dx + bs, dy - bs + L);
      ctx.moveTo(dx + bs, dy + bs - L); ctx.lineTo(dx + bs, dy + bs); ctx.lineTo(dx + bs - L, dy + bs);
      ctx.moveTo(dx - bs + L, dy + bs); ctx.lineTo(dx - bs, dy + bs); ctx.lineTo(dx - bs, dy + bs - L);
      ctx.stroke();

      // label block — flips left when the contact nears the frame edge
      ctx.fillStyle = col;
      const fs = 10 * u + 6;
      ctx.font = `${fs}px "IBM Plex Mono", monospace`;
      let label = 'DETECTED';
      let sub = `CONF ${(0.42 + q * 0.55).toFixed(2)}`;
      if (p > 0.52) { label = 'CLASSIFIED'; sub = 'CLASS · MICRO-UAS QUADCOPTER'; }
      if (p > 0.72) { label = 'TRACKED'; sub = 'TRK-014 · UNAUTHORISED · ALT 90 M'; }
      const flip = dx + bs + 240 * u > w;
      ctx.textAlign = flip ? 'right' : 'left';
      const lxx = flip ? dx - bs - 12 * u : dx + bs + 12 * u;
      ctx.fillText(label, lxx, dy - 4 * u);
      ctx.fillStyle = TI + '0.65)';
      ctx.fillText(sub, lxx, dy + fs);
      ctx.textAlign = 'left';
      // bearing line back to ownship
      ctx.strokeStyle = TI + '0.18)';
      ctx.setLineDash([2, 6]);
      ctx.beginPath();
      ctx.moveTo(cx, cy);
      ctx.lineTo(dx, dy);
      ctx.stroke();
      ctx.setLineDash([]);
    }
  }

  return { state, tick, resize };
}
