# TRICENT AEROSPACE — corporate site

Sense. Integrate. Deliver.

Positioned as an established deep-tech company: top navigation (Home,
Products & Services dropdown, Technology, About, Newsroom, Contact),
product/service tiles with quote-on-request (no public pricing), mission /
vision / leadership / HQ, newsroom, and an enquiry form (opens the visitor's
mail client to `info@tricentaerospace.in` — change in `index.html` and
`src/main.js` if needed). No phase plans, financials, TRLs or application
details appear anywhere on the site. The logo is an inline SVG
(`#tricent-mark` in `index.html`) recreated from the brand mark.

## Run

```
npm install
npm run dev      # http://localhost:5173
```

## Architecture

- **Vite + vanilla ES modules**, `three` (WebGL), `gsap/ScrollTrigger` (pin + scrub), `lenis` (smooth scroll).
- Every cinematic section is a pinned 100vh stage scrubbed by scroll:
  - `WP-01 Hero` — 360° studio turntable of the UAS ([src/scenes.js](src/scenes.js) `heroScene`)
  - `WP-03 Flyover` — nadir terrain strip panned under the viewer + live telemetry ([src/terrain.js](src/terrain.js))
  - `WP-04 Sensor` — macro camera dolly across gimbal/skin/link (`macroScene`)
  - `WP-05 Architecture` — exploded modules converging, leader-line callouts + TRL badges (`explodedScene`)
  - `WP-07 Roadmap` — horizontal mission timeline
  - `WP-08 Airspace` — passive detection sweep, DETECTED → CLASSIFIED → TRACKED ([src/sweep.js](src/sweep.js))
- GCS chrome: boot sequence, corner brackets, grid, scanline, UTC clock, waypoint
  flight-path rail as scroll progress ([src/rail.js](src/rail.js)).

## Seedance 2.0 video swap-in (pending Higgsfield credits)

The hero orbit and nadir flyover are procedural stand-ins behind the same
scrub interface a frame sequence uses. When credits are available:

1. Generate ONE hero image of the flagship aircraft (matte graphite VTOL/fixed-wing
   ISR UAS, EO/IR gimbal under the nose, graphite void, cool rim light).
2. Generate 5 clips with `seedance_2_0` (mode `std`, 1080p, 16:9, ~8 s,
   `generate_audio:false`), passing the hero image as `image_references` to every
   clip: hero orbit · nadir flyover · macro sensor fly-through · exploded
   assembly · airspace sweep.
3. Extract frames (no system ffmpeg needed):
   `npm i -D ffmpeg-static` then
   `node -e "const f=require('ffmpeg-static');const{execFileSync}=require('child_process');execFileSync(f,['-i','clip.mp4','-vf','fps=25,scale=1280:-2','-q:v','3','public/assets/sequences/<name>/%04d.jpg'])"`
4. Replace the procedural `tick()` in the relevant module with a frame-sequence
   blitter: `frame = Math.round(progress * (frames.length - 1))` →
   `ctx.drawImage(frames[frame], ...)`. The scrub progress plumbing is already in place.

## Figures policy

The public site intentionally carries no capacities, prices, TRLs,
financials or programme phases — pricing is issued as a quotation via the
contact form. Do not add flight-performance numbers (endurance, range,
MTOW, EO/IR resolution, datalink range) without approved values.
