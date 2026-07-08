// Procedural VTOL fixed-wing ISR UAS.
// Axes: +X nose, +Y up, +Z starboard. Units ~ metres.
// Returns a THREE.Group with userData.modules — named, detachable mission
// modules used by the exploded-architecture scene.

import * as THREE from 'three';

const MAT = {
  graphite: () => new THREE.MeshStandardMaterial({ color: 0x24262b, metalness: 0.45, roughness: 0.6 }),
  titanium: () => new THREE.MeshStandardMaterial({ color: 0x9aa2ad, metalness: 0.9, roughness: 0.32 }),
  dark:     () => new THREE.MeshStandardMaterial({ color: 0x17181c, metalness: 0.3, roughness: 0.7 }),
  glass:    () => new THREE.MeshStandardMaterial({ color: 0x0c1116, metalness: 1.0, roughness: 0.12, emissive: 0x0a1826, emissiveIntensity: 0.7 }),
  saffron:  () => new THREE.MeshStandardMaterial({ color: 0x3a2410, emissive: 0xd98e3f, emissiveIntensity: 0.55, roughness: 0.5 }),
  green:    () => new THREE.MeshStandardMaterial({ color: 0x0e2417, emissive: 0x3f9367, emissiveIntensity: 0.7, roughness: 0.5 }),
};

function fuselage() {
  // lathe profile: tail -> nose
  const pts = [];
  const prof = [
    [0.000, 0.020], [0.10, 0.045], [0.28, 0.068], [0.55, 0.085],
    [0.85, 0.090], [1.10, 0.088], [1.30, 0.078], [1.45, 0.058],
    [1.55, 0.034], [1.60, 0.001],
  ];
  for (const [y, r] of prof) pts.push(new THREE.Vector2(r, y));
  const geo = new THREE.LatheGeometry(pts, 40);
  const m = new THREE.Mesh(geo, MAT.graphite());
  m.rotation.z = -Math.PI / 2;          // length along +X
  m.position.x = -0.8;                  // centre roughly at origin
  const g = new THREE.Group();
  g.add(m);
  // panel seam rings
  for (const x of [-0.42, 0.02, 0.38]) {
    const rr = 0.086 - Math.abs(x) * 0.02;
    const ring = new THREE.Mesh(new THREE.TorusGeometry(rr, 0.0035, 8, 48), MAT.dark());
    ring.rotation.y = Math.PI / 2;
    ring.position.x = x;
    g.add(ring);
  }
  // saffron registration stripe (port + starboard)
  for (const s of [-1, 1]) {
    const stripe = new THREE.Mesh(new THREE.BoxGeometry(0.34, 0.012, 0.004), MAT.saffron());
    stripe.position.set(0.18, 0.012, s * 0.089);
    g.add(stripe);
  }
  // pitot
  const pitot = new THREE.Mesh(new THREE.CylinderGeometry(0.004, 0.004, 0.12, 8), MAT.titanium());
  pitot.rotation.z = Math.PI / 2;
  pitot.position.set(0.84, 0.02, 0);
  g.add(pitot);
  return g;
}

function wingPair() {
  const g = new THREE.Group();
  const span = 3.0, chord = 0.30, thick = 0.052;
  const geo = new THREE.CapsuleGeometry(0.11, span - 0.22, 6, 20);
  geo.scale(chord / 0.22, 1, thick / 0.22);    // airfoil-ish cross-section
  geo.rotateX(Math.PI / 2);                    // span along Z
  const wing = new THREE.Mesh(geo, MAT.graphite());
  wing.position.set(0.05, 0.10, 0);
  g.add(wing);
  // titanium leading edge
  const le = new THREE.Mesh(new THREE.CylinderGeometry(0.008, 0.008, span * 0.94, 8), MAT.titanium());
  le.rotation.x = Math.PI / 2;
  le.position.set(0.05 + chord * 0.48, 0.10, 0);
  g.add(le);
  // wingtip nav markers — green starboard, saffron port
  for (const s of [-1, 1]) {
    const tip = new THREE.Mesh(new THREE.BoxGeometry(0.05, 0.014, 0.02),
      s > 0 ? MAT.green() : MAT.saffron());
    tip.position.set(0.05, 0.105, s * (span / 2 - 0.03));
    g.add(tip);
  }
  return g;
}

function boomsAndTail() {
  const g = new THREE.Group();
  const boomZ = 0.55, boomLen = 1.5;
  for (const s of [-1, 1]) {
    const boom = new THREE.Mesh(new THREE.CylinderGeometry(0.030, 0.026, boomLen, 14), MAT.graphite());
    boom.rotation.z = Math.PI / 2;
    boom.position.set(-0.25, 0.02, s * boomZ);
    g.add(boom);
    // vertical fin at boom tail
    const fin = new THREE.Mesh(new THREE.CapsuleGeometry(0.075, 0.22, 4, 10), MAT.graphite());
    fin.scale.set(1.5, 1, 0.16);
    fin.position.set(-0.96, 0.16, s * boomZ);
    fin.rotation.z = -0.22;
    g.add(fin);
  }
  // horizontal stabiliser bridging booms
  const stabGeo = new THREE.CapsuleGeometry(0.075, 2 * boomZ - 0.1, 4, 10);
  stabGeo.scale(1.6, 1, 0.28);                 // chord x thickness
  stabGeo.rotateX(Math.PI / 2);                // span along Z
  const stab = new THREE.Mesh(stabGeo, MAT.graphite());
  stab.position.set(-0.96, 0.30, 0);
  g.add(stab);
  return g;
}

function liftMotors() {
  const g = new THREE.Group();
  const boomZ = 0.55;
  let k = 0;
  for (const s of [-1, 1]) for (const x of [0.32, -0.82]) {
    const pod = new THREE.Group();
    const motor = new THREE.Mesh(new THREE.CylinderGeometry(0.045, 0.05, 0.075, 18), MAT.dark());
    motor.position.y = 0.055;
    pod.add(motor);
    const cap = new THREE.Mesh(new THREE.CylinderGeometry(0.02, 0.03, 0.02, 12), MAT.titanium());
    cap.position.y = 0.1;
    pod.add(cap);
    // two-blade prop, parked at varied angles
    const blades = new THREE.Group();
    for (const b of [0, 1]) {
      const blade = new THREE.Mesh(new THREE.BoxGeometry(0.42, 0.006, 0.032), MAT.dark());
      blade.position.x = (b === 0 ? 1 : -1) * 0.21;
      blade.rotation.x = (b === 0 ? 1 : -1) * 0.12; // blade pitch
      blades.add(blade);
    }
    blades.position.y = 0.115;
    blades.rotation.y = 0.5 + k * 0.9;
    pod.add(blades);
    pod.position.set(x, 0.02, s * boomZ);
    g.add(pod);
    k++;
  }
  return g;
}

function pusherProp() {
  const g = new THREE.Group();
  const spinner = new THREE.Mesh(new THREE.ConeGeometry(0.032, 0.09, 14), MAT.titanium());
  spinner.rotation.z = Math.PI / 2;
  spinner.position.x = -0.85;
  g.add(spinner);
  for (const b of [0, 1]) {
    const blade = new THREE.Mesh(new THREE.BoxGeometry(0.006, 0.34, 0.03), MAT.dark());
    blade.position.set(-0.83, (b === 0 ? 1 : -1) * 0.17, 0);
    blade.rotation.x = (b === 0 ? 1 : -1) * 0.16;
    g.add(blade);
  }
  return g;
}

// ---------- detachable mission modules ----------

function gimbalModule() {
  const g = new THREE.Group();
  const collar = new THREE.Mesh(new THREE.CylinderGeometry(0.055, 0.06, 0.05, 20), MAT.titanium());
  collar.position.y = 0.06;
  g.add(collar);
  const ball = new THREE.Mesh(new THREE.SphereGeometry(0.085, 28, 20), MAT.graphite());
  g.add(ball);
  // sensor window
  const lensHouse = new THREE.Mesh(new THREE.CylinderGeometry(0.038, 0.045, 0.03, 16), MAT.dark());
  lensHouse.rotation.x = Math.PI / 2;
  lensHouse.position.set(0.045, -0.045, 0);
  lensHouse.rotation.z = -0.7;
  g.add(lensHouse);
  const lens = new THREE.Mesh(new THREE.CircleGeometry(0.034, 20), MAT.glass());
  lens.position.set(0.062, -0.062, 0);
  lens.lookAt(new THREE.Vector3(0.6, -0.6, 0));
  g.add(lens);
  g.position.set(0.52, -0.115, 0);
  return g;
}

function batteryModule() {
  const g = new THREE.Group();
  const pack = new THREE.Mesh(new THREE.BoxGeometry(0.34, 0.06, 0.12), MAT.dark());
  g.add(pack);
  const rail = new THREE.Mesh(new THREE.BoxGeometry(0.34, 0.008, 0.015), MAT.titanium());
  rail.position.y = -0.032;
  g.add(rail);
  const tell = new THREE.Mesh(new THREE.BoxGeometry(0.02, 0.012, 0.005), MAT.green());
  tell.position.set(0.14, 0, 0.061);
  g.add(tell);
  g.position.set(0.02, -0.095, 0);
  return g;
}

function edgeAiModule() {
  const g = new THREE.Group();
  const body = new THREE.Mesh(new THREE.BoxGeometry(0.16, 0.05, 0.10), MAT.dark());
  g.add(body);
  // heatsink fins
  for (let i = 0; i < 6; i++) {
    const fin = new THREE.Mesh(new THREE.BoxGeometry(0.14, 0.016, 0.006), MAT.titanium());
    fin.position.set(0, 0.033, -0.04 + i * 0.016);
    g.add(fin);
  }
  g.position.set(0.30, 0.045, 0.10);
  return g;
}

function gcsLinkModule() {
  const g = new THREE.Group();
  const base = new THREE.Mesh(new THREE.BoxGeometry(0.09, 0.03, 0.06), MAT.dark());
  g.add(base);
  const blade = new THREE.Mesh(new THREE.CapsuleGeometry(0.02, 0.08, 4, 10), MAT.graphite());
  blade.scale.set(0.9, 1, 0.28);
  blade.position.y = 0.07;
  g.add(blade);
  const led = new THREE.Mesh(new THREE.BoxGeometry(0.012, 0.012, 0.012), MAT.saffron());
  led.position.set(0.03, 0.02, 0);
  g.add(led);
  g.position.set(-0.30, 0.095, 0);
  return g;
}

function autonomyModule() {
  const g = new THREE.Group();
  const tray = new THREE.Mesh(new THREE.BoxGeometry(0.26, 0.035, 0.09), MAT.graphite());
  g.add(tray);
  const lid = new THREE.Mesh(new THREE.BoxGeometry(0.24, 0.006, 0.07), MAT.titanium());
  lid.position.y = 0.021;
  g.add(lid);
  g.position.set(0.12, 0.085, 0);
  return g;
}

export function buildUAS() {
  const uas = new THREE.Group();

  const airframe = new THREE.Group();
  airframe.add(fuselage(), wingPair(), boomsAndTail(), liftMotors(), pusherProp());
  uas.add(airframe);

  const modules = {
    gimbal:   gimbalModule(),
    battery:  batteryModule(),
    edgeai:   edgeAiModule(),
    gcslink:  gcsLinkModule(),
    autonomy: autonomyModule(),
  };
  for (const m of Object.values(modules)) uas.add(m);

  // ground-segment anchor (invisible) — leader-line target for the
  // AI mission-analytics platform callout
  const groundSeg = new THREE.Object3D();
  groundSeg.position.set(-0.1, -0.85, 0);
  uas.add(groundSeg);

  // remember rest positions for exploded view
  for (const m of Object.values(modules)) m.userData.rest = m.position.clone();

  uas.userData.modules = modules;
  uas.userData.airframe = airframe;
  uas.userData.groundSeg = groundSeg;
  return uas;
}

// shared studio lighting rig — cool rim light out of a graphite void
export function addStudioLights(scene) {
  const rim1 = new THREE.DirectionalLight(0x9fc4e7, 3.2);
  rim1.position.set(-3, 4, -4);
  scene.add(rim1);
  const rim2 = new THREE.DirectionalLight(0xc7ccd4, 1.5);
  rim2.position.set(4, 1.5, 3);
  scene.add(rim2);
  const under = new THREE.DirectionalLight(0x39424f, 0.7);
  under.position.set(0.5, -3, 1);
  scene.add(under);
  scene.add(new THREE.HemisphereLight(0x2a3140, 0x05060a, 0.55));
}

// drifting dust particulate
export function makeDust(count = 260, spread = 5) {
  const geo = new THREE.BufferGeometry();
  const pos = new Float32Array(count * 3);
  for (let i = 0; i < count * 3; i++) pos[i] = (Math.random() - 0.5) * spread;
  geo.setAttribute('position', new THREE.BufferAttribute(pos, 3));
  const mat = new THREE.PointsMaterial({
    color: 0x8b929c, size: 0.008, transparent: true, opacity: 0.45,
    sizeAttenuation: true, depthWrite: false,
  });
  return new THREE.Points(geo, mat);
}
