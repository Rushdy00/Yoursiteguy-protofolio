import * as THREE from "three";
import { MOTION_CONFIG } from "./content";

// The steel "?" cube: a fixed full-viewport WebGL layer above the page that
// descends and weaves through the document, driven by scroll with spring physics.

export type CubeLayer = {
  /** Advance one frame. `scroll` is the current (smoothed) scroll position. */
  frame: (scroll: number) => void;
  dispose: () => void;
};

type Options = {
  reduced: boolean;
  onMotion: (speed: number) => void;
  config?: Partial<typeof MOTION_CONFIG>;
};

const isArabic = () => document.documentElement.lang === "ar";
// The "?" glyph: Arabic question mark in Cairo on the Arabic page, Manrope otherwise.
const glyph = () => (isArabic() ? "؟" : "?");
const displayFont = () => (isArabic() ? '"Cairo", sans-serif' : '"Manrope", sans-serif');

function makeEnv(renderer: THREE.WebGLRenderer) {
  // studio-ish equirect: soft grey gradient with hard rect lights
  const c = document.createElement("canvas");
  c.width = 1024;
  c.height = 512;
  const g = c.getContext("2d")!;
  const grad = g.createLinearGradient(0, 0, 0, 512);
  grad.addColorStop(0, "#ffffff");
  grad.addColorStop(0.5, "#c9cfd4");
  grad.addColorStop(1, "#5d6368");
  g.fillStyle = grad;
  g.fillRect(0, 0, 1024, 512);
  g.fillStyle = "#ffffff";
  g.fillRect(120, 40, 300, 130);
  g.fillRect(660, 90, 200, 90);
  g.fillStyle = "rgba(255,255,255,0.7)";
  g.fillRect(380, 300, 420, 60);
  const tex = new THREE.CanvasTexture(c);
  tex.mapping = THREE.EquirectangularReflectionMapping;
  const pmrem = new THREE.PMREMGenerator(renderer);
  const env = pmrem.fromEquirectangular(tex).texture;
  pmrem.dispose();
  tex.dispose();
  return env;
}

function faceTex(kind: "side" | "top" | "glyph") {
  const c = document.createElement("canvas");
  c.width = 512;
  c.height = 512;
  const g = c.getContext("2d")!;
  if (kind === "top") {
    // polished chrome cap
    const gr = g.createLinearGradient(0, 0, 512, 512);
    gr.addColorStop(0, "#B9C0C6");
    gr.addColorStop(0.42, "#F2F5F7");
    gr.addColorStop(0.62, "#D2D8DC");
    gr.addColorStop(1, "#9BA3A9");
    g.fillStyle = gr;
    g.fillRect(0, 0, 512, 512);
    for (let i = 0; i < 260; i++) {
      // fine circular brushing
      g.strokeStyle = "rgba(255,255,255," + Math.random() * 0.05 + ")";
      g.lineWidth = Math.random() * 1.4;
      g.beginPath();
      g.arc(256, 256, 20 + Math.random() * 300, Math.random() * 6.28, Math.random() * 6.28);
      g.stroke();
    }
  } else {
    const gr = g.createLinearGradient(0, 0, 0, 512);
    gr.addColorStop(0, "#EDF0F1");
    gr.addColorStop(0.32, "#B4BCC0");
    gr.addColorStop(0.68, "#767E83");
    gr.addColorStop(1, "#3B4145");
    g.fillStyle = gr;
    g.fillRect(0, 0, 512, 512);
    for (let i = 0; i < 900; i++) {
      // vertical brushed-steel grain
      const x = Math.random() * 512;
      g.strokeStyle = "rgba(" + (Math.random() > 0.5 ? "255,255,255," : "0,0,0,") + Math.random() * 0.06 + ")";
      g.lineWidth = Math.random() * 1.6;
      g.beginPath();
      g.moveTo(x, 0);
      g.lineTo(x + (Math.random() - 0.5) * 8, 512);
      g.stroke();
    }
    // raking specular streak near the top bevel
    const st = g.createLinearGradient(0, 0, 0, 90);
    st.addColorStop(0, "rgba(255,255,255,0.85)");
    st.addColorStop(1, "rgba(255,255,255,0)");
    g.fillStyle = st;
    g.fillRect(0, 0, 512, 90);
    if (kind === "glyph") {
      g.font = `700 300px ${displayFont()}`;
      g.textAlign = "center";
      g.textBaseline = "middle";
      g.fillStyle = "rgba(255,255,255,0.92)";
      g.fillText(glyph(), 256, 268);
      g.fillStyle = "rgba(0,0,0,0.18)";
      g.fillText(glyph(), 250, 262);
    }
  }
  const t = new THREE.CanvasTexture(c);
  t.colorSpace = THREE.SRGBColorSpace;
  return t;
}

function roundedBox(size: number, radius: number, seg: number) {
  const geo = new THREE.BoxGeometry(size, size, size, seg, seg, seg);
  const pos = geo.attributes.position;
  const inner = size / 2 - radius;
  const v = new THREE.Vector3();
  for (let i = 0; i < pos.count; i++) {
    v.fromBufferAttribute(pos, i);
    const cx = Math.max(-inner, Math.min(inner, v.x));
    const cy = Math.max(-inner, Math.min(inner, v.y));
    const cz = Math.max(-inner, Math.min(inner, v.z));
    const dx = v.x - cx, dy = v.y - cy, dz = v.z - cz;
    const len = Math.hypot(dx, dy, dz) || 1;
    pos.setXYZ(i, cx + (dx / len) * radius, cy + (dy / len) * radius, cz + (dz / len) * radius);
  }
  geo.computeVertexNormals();
  return geo;
}

function makeCube(size: number) {
  const geo = roundedBox(size, size * 0.135, 12);
  // brushed / polished steel
  const mk = (kind: "side" | "top" | "glyph") => {
    const m = new THREE.MeshPhysicalMaterial({
      map: faceTex(kind),
      roughness: 0.22,
      metalness: 1.0,
      clearcoat: 0.6,
      clearcoatRoughness: 0.12,
      envMapIntensity: 1.9,
      iridescence: 0.06,
    });
    if (kind === "top") {
      m.roughness = 0.08;
      m.clearcoat = 1.0;
      m.clearcoatRoughness = 0.04;
    }
    return m;
  };
  // BoxGeometry group order: +X, -X, +Y, -Y, +Z, -Z
  return new THREE.Mesh(geo, [mk("side"), mk("side"), mk("top"), mk("side"), mk("glyph"), mk("side")]);
}

function makeShadow(size: number) {
  const c = document.createElement("canvas");
  c.width = 256;
  c.height = 256;
  const g = c.getContext("2d")!;
  const gr = g.createRadialGradient(128, 128, 10, 128, 128, 126);
  gr.addColorStop(0, "rgba(20,26,24,0.55)");
  gr.addColorStop(0.55, "rgba(20,26,24,0.20)");
  gr.addColorStop(1, "rgba(20,26,24,0)");
  g.fillStyle = gr;
  g.fillRect(0, 0, 256, 256);
  const mat = new THREE.MeshBasicMaterial({
    map: new THREE.CanvasTexture(c),
    transparent: true,
    depthWrite: false,
    opacity: 0.25,
  });
  const sz = size * 1.9;
  const mesh = new THREE.Mesh(new THREE.PlaneGeometry(sz, sz), mat);
  mesh.renderOrder = -1;
  return mesh;
}

/** Returns null when WebGL is unavailable; the caller then runs without a cube. */
export async function createCube(canvas: HTMLCanvasElement, opts: Options): Promise<CubeLayer | null> {
  const cfg = { ...MOTION_CONFIG, ...opts.config };

  let renderer: THREE.WebGLRenderer;
  try {
    renderer = new THREE.WebGLRenderer({ canvas, alpha: true, antialias: true, powerPreference: "high-performance" });
  } catch {
    return null;
  }
  if (!renderer.getContext()) return null;

  // The "?" glyph is drawn with the display font, so wait for it.
  try {
    await document.fonts.ready;
  } catch {}

  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
  renderer.setSize(window.innerWidth, window.innerHeight, false);
  renderer.setClearAlpha(0);
  renderer.outputColorSpace = THREE.SRGBColorSpace;

  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(35, window.innerWidth / window.innerHeight, 0.1, 100);
  camera.position.set(0, 0, 6);

  scene.environment = makeEnv(renderer);
  const dir = new THREE.DirectionalLight(0xffffff, 1.4);
  dir.position.set(4, 6, 5);
  scene.add(dir);
  scene.add(new THREE.AmbientLight(0xffffff, 0.35));

  const cube = makeCube(cfg.cubeSize);
  scene.add(cube);
  const shadow = makeShadow(cfg.cubeSize);
  scene.add(shadow);

  const warp = { x: 0, y: 0, z: 0, vx: 0, vy: 0, vz: 0 };
  const rotCur = { x: 0, y: 0, vx: 0, vy: 0 };
  const mouse = { x: 0, y: 0, tx: 0, ty: 0 };
  let rotAcc = 0;
  let layerOpacity = 0;
  let lastScroll = window.scrollY;
  const clock = new THREE.Clock();
  const trust = document.getElementById("trust");

  const onResize = () => {
    renderer.setSize(window.innerWidth, window.innerHeight, false);
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
  };
  const onMove = (e: PointerEvent) => {
    mouse.tx = (e.clientX / window.innerWidth - 0.5) * 2;
    mouse.ty = (e.clientY / window.innerHeight - 0.5) * 2;
  };
  window.addEventListener("resize", onResize);
  window.addEventListener("pointermove", onMove, { passive: true });

  const k = cfg.damping;
  const d = 0.8;
  const spring = (axis: "x" | "y" | "z", target: number) => {
    const v = ("v" + axis) as "vx" | "vy" | "vz";
    warp[v] += (target - warp[axis]) * k;
    warp[v] *= d;
    warp[axis] += warp[v];
    return warp[axis];
  };

  const frame = (scroll: number) => {
    const time = clock.getElapsedTime();

    // one continuous journey: starts at the partner section, ends before the footer
    const docH = Math.max(1, document.documentElement.scrollHeight - window.innerHeight);
    const startY = trust ? Math.max(0, trust.offsetTop - window.innerHeight * 0.6) : docH * 0.12;
    const endY = docH * 0.97;
    const g = Math.max(0, Math.min(1, (scroll - startY) / Math.max(1, endY - startY)));
    const fadeIn = Math.max(0, Math.min(1, g / 0.05));
    const fadeOut = Math.max(0, Math.min(1, (1 - g) / 0.05));
    const targetOp = fadeIn * fadeOut;
    if (Math.abs(targetOp - layerOpacity) > 0.001) {
      layerOpacity += (targetOp - layerOpacity) * 0.12;
      canvas.style.opacity = layerOpacity.toFixed(3);
    }

    // rotation bound to scroll delta (reverses when scrolling up)
    rotAcc += (scroll - lastScroll) * cfg.spinPerPixel;
    lastScroll = scroll;

    if (layerOpacity < 0.01 && targetOp < 0.01) {
      if (layerOpacity !== 0) {
        layerOpacity = 0;
        canvas.style.opacity = "0";
      }
      return;
    }

    // weaves left↔right a few times while descending once over the page
    const tx = Math.sin(g * Math.PI * 2.6 + 0.5) * cfg.driftX;
    const ty = 1.7 - 3.4 * g;
    const tz = -0.3 + Math.sin(g * Math.PI * 3.1) * 0.7;
    const x = spring("x", tx);
    let y = spring("y", ty);
    const z = spring("z", tz);

    if (!opts.reduced) {
      rotCur.vy += (rotAcc - rotCur.y) * k;
      rotCur.vy *= d;
      rotCur.y += rotCur.vy;
      rotCur.vx += (rotAcc * 0.6 - rotCur.x) * k;
      rotCur.vx *= d;
      rotCur.x += rotCur.vx;
      y += Math.sin(time * 0.6) * 0.06;
    }

    mouse.x += (mouse.tx - mouse.x) * 0.05;
    mouse.y += (mouse.ty - mouse.y) * 0.05;
    const tilt = (6 * Math.PI) / 180;

    cube.position.set(x, y, z);
    cube.rotation.set(
      rotCur.x + mouse.y * tilt,
      rotCur.y + mouse.x * tilt,
      opts.reduced ? 0 : Math.sin(time * 0.45) * 0.035,
    );
    const moved = Math.hypot(warp.vx, warp.vy) * 9 + Math.abs(rotCur.vy) * 3;
    opts.onMotion(moved * layerOpacity);

    shadow.position.set(x - cfg.cubeSize * 0.36, y - cfg.cubeSize * 0.9, z - 0.5);
    shadow.material.opacity = 0.25 * layerOpacity;

    renderer.render(scene, camera);
  };

  const dispose = () => {
    window.removeEventListener("resize", onResize);
    window.removeEventListener("pointermove", onMove);
    scene.traverse((o) => {
      if (o instanceof THREE.Mesh) {
        o.geometry.dispose();
        const mats = Array.isArray(o.material) ? o.material : [o.material];
        mats.forEach((m: THREE.MeshBasicMaterial) => {
          m.map?.dispose();
          m.dispose();
        });
      }
    });
    scene.environment?.dispose();
    renderer.dispose();
  };

  return { frame, dispose };
}
