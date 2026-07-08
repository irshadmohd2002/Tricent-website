// Mission flight-path rail: a thin flight vector down the left edge that
// connects every section as a waypoint and doubles as the scroll-progress
// indicator. Node positions are derived from actual section scroll offsets.

const NS = 'http://www.w3.org/2000/svg';

export function buildRail(sections) {
  const rail = document.getElementById('wp-rail');
  const svg = document.createElementNS(NS, 'svg');
  rail.appendChild(svg);

  let nodes = [];       // { t, x, y, g, wp, label }
  let basePath, livePath, marker, pathLen = 0, segs = [];

  function layout() {
    svg.innerHTML = '';
    nodes = [];
    const vh = window.innerHeight;
    const y0 = vh * 0.10, y1 = vh * 0.90;
    const doc = document.documentElement;
    const maxScroll = doc.scrollHeight - vh;

    const pts = sections.map((sec, i) => {
      const t = Math.min(1, Math.max(0, sec.scrollStart / maxScroll));
      return {
        t,
        x: 24 + (i % 2) * 14,           // dogleg legs, like a plotted route
        y: y0 + t * (y1 - y0),
        wp: sec.wp, label: sec.label,
      };
    });

    const d = pts.map((p, i) => `${i ? 'L' : 'M'}${p.x},${p.y}`).join(' ');
    basePath = document.createElementNS(NS, 'path');
    basePath.setAttribute('d', d);
    basePath.setAttribute('class', 'wp-path-base');
    svg.appendChild(basePath);

    livePath = document.createElementNS(NS, 'path');
    livePath.setAttribute('d', d);
    livePath.setAttribute('class', 'wp-path-live');
    svg.appendChild(livePath);
    pathLen = livePath.getTotalLength();
    livePath.style.strokeDasharray = `${pathLen}`;
    livePath.style.strokeDashoffset = `${pathLen}`;

    // cumulative length at each node, for marker interpolation
    segs = [0];
    for (let i = 1; i < pts.length; i++) {
      const dx = pts[i].x - pts[i - 1].x, dy = pts[i].y - pts[i - 1].y;
      segs.push(segs[i - 1] + Math.hypot(dx, dy));
    }

    for (const p of pts) {
      const g = document.createElementNS(NS, 'g');
      g.setAttribute('class', 'wp-node');
      const c = document.createElementNS(NS, 'circle');
      c.setAttribute('cx', p.x); c.setAttribute('cy', p.y); c.setAttribute('r', 3);
      const tx = document.createElementNS(NS, 'text');
      tx.setAttribute('x', p.x + 9); tx.setAttribute('y', p.y + 2.5);
      tx.textContent = p.wp;
      g.append(c, tx);
      svg.appendChild(g);
      p.g = g;
      nodes.push(p);
    }

    marker = document.createElementNS(NS, 'path');
    marker.setAttribute('class', 'wp-marker');
    marker.setAttribute('d', 'M0,-5 L3.4,4 L0,2.2 L-3.4,4 Z'); // aircraft chevron
    svg.appendChild(marker);
  }

  const secLabel = document.querySelector('.hud-sec-label');

  function update(progress) {
    if (!livePath) return;
    // distance along path proportional to overall scroll progress
    const dist = pathLen * progress;
    livePath.style.strokeDashoffset = `${Math.max(0, pathLen - dist)}`;
    const pt = livePath.getPointAtLength(dist);
    // heading of the marker follows the leg direction
    const ahead = livePath.getPointAtLength(Math.min(pathLen, dist + 2));
    const ang = (Math.atan2(ahead.y - pt.y, ahead.x - pt.x) * 180) / Math.PI + 90;
    marker.setAttribute('transform', `translate(${pt.x},${pt.y}) rotate(${ang})`);

    let current = nodes[0];
    for (const n of nodes) {
      const hit = progress >= n.t - 0.002;
      n.g.classList.toggle('hit', hit);
      if (hit) current = n;
    }
    if (secLabel && current) secLabel.textContent = `${current.wp} · ${current.label}`;
  }

  layout();
  return { layout, update };
}
