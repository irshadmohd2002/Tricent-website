// Three WebGL stages sharing one procedural airframe:
//   heroScene     — 360° studio turntable, scrubbed by scroll
//   macroScene    — close camera dolly across gimbal / skin / link
//   explodedScene — mission modules converging into the aircraft
//
// Each scene exposes { progress, active, resize(), tick(time) } and renders
// only while its section is on screen.

import * as THREE from 'three';
import { buildUAS, addStudioLights, makeDust } from './uas.js';

const DPR = Math.min(window.devicePixelRatio || 1, 1.75);

function baseScene(canvas) {
  const renderer = new THREE.WebGLRenderer({ canvas, antialias: true, alpha: true });
  renderer.setPixelRatio(DPR);
  renderer.toneMapping = THREE.ACESFilmicToneMapping;
  renderer.toneMappingExposure = 1.35;
  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(32, 1, 0.05, 60);
  addStudioLights(scene);
  const uas = buildUAS();
  scene.add(uas);

  const api = {
    renderer, scene, camera, uas,
    progress: 0, active: false,
    resize() {
      const w = canvas.clientWidth, h = canvas.clientHeight;
      if (!w || !h) return;
      renderer.setSize(w, h, false);
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
    },
  };
  api.resize();
  return api;
}

/* ---------------- HERO ORBIT ---------------- */

export function heroScene(canvas) {
  const s = baseScene(canvas);
  s.camera.position.set(4.0, 0.85, 4.0);
  s.camera.lookAt(0, 0, 0);
  s.uas.position.y = -0.08;
  const dust = makeDust(300, 6);
  s.scene.add(dust);

  s.tick = (t) => {
    const p = s.progress;
    s.uas.rotation.y = p * Math.PI * 2 + 0.6;         // full turntable
    s.uas.rotation.z = Math.sin(t * 0.0004) * 0.02;    // station-keeping sway
    s.uas.position.y = -0.08 + Math.sin(t * 0.0006) * 0.035;
    dust.rotation.y = t * 0.00002;
    dust.position.y = Math.sin(t * 0.0002) * 0.1;
    s.renderer.render(s.scene, s.camera);
  };
  s.azimuth = () => ((s.uas.rotation.y * 180 / Math.PI) % 360 + 360) % 360;
  return s;
}

/* ---------------- SENSOR MACRO ---------------- */

export function macroScene(canvas) {
  const s = baseScene(canvas);
  s.camera.fov = 26;
  s.camera.updateProjectionMatrix();
  s.scene.fog = new THREE.Fog(0x0a0b0d, 2.2, 6.5);
  const dust = makeDust(160, 3);
  s.scene.add(dust);

  // dolly path hugging the airframe: gimbal -> spine/edge-AI -> link -> tail
  const camPath = new THREE.CatmullRomCurve3([
    new THREE.Vector3(1.35, -0.22, 0.75),
    new THREE.Vector3(0.90, 0.10, 0.85),
    new THREE.Vector3(0.35, 0.42, 0.80),
    new THREE.Vector3(-0.30, 0.40, 0.85),
    new THREE.Vector3(-1.00, 0.35, 0.95),
  ]);
  const aimPath = new THREE.CatmullRomCurve3([
    new THREE.Vector3(0.52, -0.14, 0),
    new THREE.Vector3(0.45, -0.02, 0),
    new THREE.Vector3(0.30, 0.06, 0.05),
    new THREE.Vector3(-0.28, 0.10, 0),
    new THREE.Vector3(-0.95, 0.20, 0),
  ]);
  const aim = new THREE.Vector3();

  s.tick = (t) => {
    const p = THREE.MathUtils.clamp(s.progress, 0, 1);
    camPath.getPointAt(p, s.camera.position);
    aimPath.getPointAt(p, aim);
    // hand-held micro drift
    s.camera.position.y += Math.sin(t * 0.0007) * 0.008;
    s.camera.lookAt(aim);
    dust.rotation.y = t * 0.00003;
    s.renderer.render(s.scene, s.camera);
  };
  return s;
}

/* ---------------- EXPLODED ARCHITECTURE ---------------- */

// exploded offsets per module (from rest position)
const EXPLODE = {
  gimbal:   new THREE.Vector3(0.55, -0.45, 0.15),
  battery:  new THREE.Vector3(0.05, -0.55, -0.35),
  edgeai:   new THREE.Vector3(0.25, 0.45, 0.55),
  gcslink:  new THREE.Vector3(-0.45, 0.55, 0.30),
  autonomy: new THREE.Vector3(0.10, 0.65, -0.30),
};

export function explodedScene(canvas) {
  const s = baseScene(canvas);
  s.camera.position.set(3.1, 1.35, 4.0);
  s.camera.lookAt(0, 0.05, 0);
  s.uas.rotation.y = 0.7;
  const dust = makeDust(200, 5);
  s.scene.add(dust);

  const mods = s.uas.userData.modules;
  const ease = (x) => 1 - Math.pow(1 - x, 3);

  s.tick = (t) => {
    const p = THREE.MathUtils.clamp(s.progress, 0, 1);
    // start fully exploded, converge to assembled over first 80% of scrub
    const k = 1 - ease(Math.min(p / 0.8, 1));
    for (const [name, m] of Object.entries(mods)) {
      m.position.copy(m.userData.rest).addScaledVector(EXPLODE[name], k);
      m.rotation.y = k * 0.5;
    }
    s.uas.rotation.y = 0.7 + p * 0.55;
    s.uas.position.y = Math.sin(t * 0.0005) * 0.02;
    dust.rotation.y = t * 0.00002;
    s.renderer.render(s.scene, s.camera);
  };

  // world -> screen px, for leader lines
  const v = new THREE.Vector3();
  s.project = (obj) => {
    obj.getWorldPosition(v).project(s.camera);
    return {
      x: (v.x * 0.5 + 0.5) * canvas.clientWidth,
      y: (-v.y * 0.5 + 0.5) * canvas.clientHeight,
    };
  };
  s.assembly = () => 1 - ease(Math.min(THREE.MathUtils.clamp(s.progress, 0, 1) / 0.8, 1));
  return s;
}
