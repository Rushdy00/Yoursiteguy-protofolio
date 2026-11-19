import * as THREE from "three";

// WebGL half of the "Selected work" film strip (components/FilmStrip.tsx).
// The DOM cards own layout, links and captions; this layer redraws each card's image
// as a curling, RGB-split plane at the card's on-screen rect, plus the blurred petal backdrop.
// Everything is in CSS pixels: the camera is placed so the z = 0 plane maps 1:1 to the stage.

export type FilmCardFrame = { x: number; y: number; w: number; h: number; u: number; alpha: number };
export type FilmFrame = { cards: FilmCardFrame[]; vel: number; progress: number; time: number };
export type FilmGL = { frame(f: FilmFrame): void; resize(w: number, h: number): void; dispose(): void };

const FOV = 30;

const CARD_VERT = /* glsl */ `
uniform vec2 uSize;
uniform vec2 uDirA;
uniform float uFoldA;
uniform vec2 uDirB;
uniform float uFoldB;
uniform float uBend;
varying vec2 vUv;
varying float vShade;
varying float vCurl;
const float PI = 3.14159265;

// Cylinder page curl: everything past a fold line perpendicular to dir wraps around a
// cylinder of radius R toward the camera; past half a turn it lies flat on the way back.
void fold(inout vec3 P, vec2 dir, float f, float R) {
  if (f <= 0.5) return;
  vec2 a = normalize(dir);
  float edge = abs(a.x) * uSize.x * 0.5 + abs(a.y) * uSize.y * 0.5;
  float q = dot(P.xy, a) - edge; // 0 at the outermost corner, negative inside
  float s = q + f;               // distance past the fold line
  if (s <= 0.0) return;
  float th = s / R;
  float q2;
  float z;
  if (th < PI) {
    q2 = -f + R * sin(th);
    z = R * (1.0 - cos(th));
  } else {
    q2 = -f - (s - PI * R);
    z = 2.0 * R;
  }
  P.xy += a * (q2 - q);
  P.z += z;
  float t = min(th, PI);
  vShade = min(vShade, 0.8 + 0.2 * cos(t));
  vCurl = max(vCurl, t / PI);
}

void main() {
  vUv = uv;
  vShade = 1.0;
  vCurl = 0.0;
  vec3 P = vec3(position.xy * uSize, 0.0);
  float R = max(14.0, min(uSize.x, uSize.y) * 0.16);
  fold(P, uDirA, uFoldA, R);
  fold(P, uDirB, uFoldB, R * 1.5);
  // Velocity bend: the sheet bows along its diagonal like paper pushed through air.
  float d = (uv.x - uv.y) * 0.7071;
  P.z += uBend * (0.5 - d * d * 2.0);
  vCurl = max(vCurl, abs(uBend) / 140.0);
  gl_Position = projectionMatrix * modelViewMatrix * vec4(P, 1.0);
}
`;

const CARD_FRAG = /* glsl */ `
uniform sampler2D uTex;
uniform vec2 uSize;
uniform float uImgAspect;
uniform float uRGB;
uniform float uAlpha;
uniform float uTime;
varying vec2 vUv;
varying float vShade;
varying float vCurl;

// object-fit: cover, anchored to the top (screenshots read from the header down).
vec2 cover(vec2 uv) {
  float pa = uSize.x / uSize.y;
  vec2 s = pa > uImgAspect ? vec2(1.0, uImgAspect / pa) : vec2(pa / uImgAspect, 1.0);
  return vec2((uv.x - 0.5) * s.x + 0.5, 1.0 - (1.0 - uv.y) * s.y);
}
float hash(vec2 p) { return fract(sin(dot(p, vec2(12.9898, 78.233))) * 43758.5453); }

void main() {
  vec3 col;
  if (gl_FrontFacing) {
    vec2 off = vec2(1.0 / uSize.x, -0.6 / uSize.y) * uRGB * (1.0 + 1.6 * vCurl);
    col.r = texture2D(uTex, cover(vUv + off)).r;
    col.g = texture2D(uTex, cover(vUv)).g;
    col.b = texture2D(uTex, cover(vUv - off)).b;
  } else {
    col = vec3(0.925, 0.965, 0.95); // paper back of the curled corner
  }
  col *= vShade;
  col += (hash(gl_FragCoord.xy + fract(uTime * 7.0) * 113.0) - 0.5) * 0.035;
  gl_FragColor = vec4(col, uAlpha);
}
`;

/* ------------------------------------------------------------------ petals */

/** One soft petal on a 2D canvas: rounded crown, pointed cyan tip, blurred by `blur` px. */
function petalCanvas(blur: number) {
  const W = 220;
  const H = 320;
  const sharp = document.createElement("canvas");
  sharp.width = W;
  sharp.height = H;
  const g = sharp.getContext("2d")!;
  g.translate(W / 2, H / 2);
  g.beginPath();
  g.moveTo(0, 118);
  g.bezierCurveTo(46, 70, 84, -40, 30, -112);
  g.bezierCurveTo(4, -136, -40, -128, -62, -92);
  g.bezierCurveTo(-90, -34, -40, 60, 0, 118);
  const lg = g.createLinearGradient(-40, -120, 10, 118);
  lg.addColorStop(0, "rgba(232, 248, 244, 0.95)");
  lg.addColorStop(0.45, "rgba(178, 232, 222, 0.92)");
  lg.addColorStop(0.82, "rgba(98, 210, 208, 0.95)");
  lg.addColorStop(1, "rgba(24, 186, 204, 1)");
  g.fillStyle = lg;
  g.fill();
  // faint vein + crown highlight
  g.globalCompositeOperation = "source-atop";
  const rg = g.createRadialGradient(-18, -70, 4, -18, -70, 90);
  rg.addColorStop(0, "rgba(255,255,255,0.55)");
  rg.addColorStop(1, "rgba(255,255,255,0)");
  g.fillStyle = rg;
  g.fillRect(-W / 2, -H / 2, W, H);
  g.strokeStyle = "rgba(60, 170, 175, 0.18)";
  g.lineWidth = 2;
  g.beginPath();
  g.moveTo(-6, -100);
  g.quadraticCurveTo(-4, 20, 0, 112);
  g.stroke();

  if (blur <= 0) return sharp;
  const out = document.createElement("canvas");
  out.width = W;
  out.height = H;
  const o = out.getContext("2d")!;
  if (typeof o.filter === "string") {
    o.filter = `blur(${blur}px)`;
    o.drawImage(sharp, 0, 0);
    return out;
  }
  // No canvas filter (older Safari): blur by shrinking and scaling back up.
  const k = Math.max(0.06, 1 / (1 + blur / 2));
  const small = document.createElement("canvas");
  small.width = Math.ceil(W * k);
  small.height = Math.ceil(H * k);
  const s = small.getContext("2d")!;
  s.imageSmoothingQuality = "high";
  s.drawImage(sharp, 0, 0, small.width, small.height);
  o.imageSmoothingQuality = "high";
  o.drawImage(small, 0, 0, W, H);
  return out;
}

type Petal = {
  mesh: THREE.Mesh;
  bx: number; // base position, fraction of stage
  by: number;
  size: number; // fraction of the stage's shorter side
  rot: number;
  depth: number; // parallax factor; also picks the blur tier
  phase: number;
};

function seeded(seed: number) {
  let s = seed >>> 0;
  return () => (s = (s * 1664525 + 1013904223) >>> 0) / 2 ** 32;
}

/* ------------------------------------------------------------------ main */

export function createFilmGL(
  canvas: HTMLCanvasElement,
  srcs: string[],
  onCardReady: (i: number) => void,
): FilmGL | null {
  let renderer: THREE.WebGLRenderer;
  try {
    renderer = new THREE.WebGLRenderer({ canvas, alpha: true, antialias: true, powerPreference: "high-performance" });
  } catch {
    return null;
  }
  // Textures are sampled as raw sRGB and written straight out (no colour-space round trip).
  renderer.outputColorSpace = THREE.LinearSRGBColorSpace;
  renderer.setClearColor(0x000000, 0);

  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(FOV, 1, 1, 10000);
  let W = 1;
  let H = 1;

  /* petals */
  const mobile = window.matchMedia("(max-width: 767px)").matches;
  const petalTex = [petalCanvas(11), petalCanvas(5), petalCanvas(1.2)].map((c) => {
    const t = new THREE.CanvasTexture(c);
    t.anisotropy = 4;
    return t;
  });
  const petalGeo = new THREE.PlaneGeometry(1, 1);
  const rnd = seeded(20261119);
  const petals: Petal[] = [];
  const count = mobile ? 14 : 26;
  for (let i = 0; i < count; i++) {
    // Scattered along the bottom-left → top-right diagonal, with wide perpendicular jitter.
    const t = rnd() * 1.4 - 0.2;
    const j = (rnd() - 0.5) * 0.9;
    const depth = 0.35 + rnd() * 0.9;
    const tier = depth > 1.0 ? 2 : depth > 0.65 ? 1 : 0;
    const mat = new THREE.MeshBasicMaterial({
      map: petalTex[tier],
      transparent: true,
      depthTest: false,
      depthWrite: false,
      opacity: tier === 2 ? 0.85 : tier === 1 ? 0.65 : 0.45,
    });
    const mesh = new THREE.Mesh(petalGeo, mat);
    mesh.renderOrder = -1000 + Math.round(depth * 100);
    scene.add(mesh);
    petals.push({
      mesh,
      bx: t + j * 0.5,
      by: 1 - t + j * 0.5,
      size: (0.12 + rnd() * 0.16) * (0.7 + depth * 0.5),
      rot: rnd() * Math.PI * 2,
      depth,
      phase: rnd() * Math.PI * 2,
    });
  }

  /* cards */
  const cardGeo = new THREE.PlaneGeometry(1, 1, 48, 36);
  const loader = new THREE.TextureLoader();
  loader.setCrossOrigin("anonymous");
  const maxAniso = renderer.capabilities.getMaxAnisotropy();
  const cards = srcs.map((src, i) => {
    const uniforms = {
      uTex: { value: null as THREE.Texture | null },
      uSize: { value: new THREE.Vector2(1, 1) },
      uImgAspect: { value: 4 / 3 },
      uDirA: { value: new THREE.Vector2(1, -0.75) }, // trailing (bottom-right) corner flips back
      uFoldA: { value: 0 },
      uDirB: { value: new THREE.Vector2(-1, 0.3) }, // leading (left) edge warps on the way out
      uFoldB: { value: 0 },
      uBend: { value: 0 },
      uRGB: { value: 0 },
      uAlpha: { value: 0 },
      uTime: { value: 0 },
    };
    const mat = new THREE.ShaderMaterial({
      uniforms,
      vertexShader: CARD_VERT,
      fragmentShader: CARD_FRAG,
      transparent: true,
      side: THREE.DoubleSide,
      depthTest: false,
      depthWrite: false,
    });
    const mesh = new THREE.Mesh(cardGeo, mat);
    mesh.frustumCulled = false; // vertices are scaled in the shader
    mesh.visible = false;
    scene.add(mesh);
    const card = { mesh, uniforms, ready: false, tex: null as THREE.Texture | null };
    loader.load(
      src,
      (tex) => {
        if (disposed) return tex.dispose();
        tex.anisotropy = Math.min(8, maxAniso);
        const img = tex.image as HTMLImageElement;
        uniforms.uTex.value = tex;
        uniforms.uImgAspect.value = img.width / img.height || 4 / 3;
        card.tex = tex;
        card.ready = true;
        onCardReady(i);
      },
      undefined,
      () => {}, // keep the DOM <img> for this card
    );
    return card;
  });

  let disposed = false;

  const resize = (w: number, h: number) => {
    W = Math.max(1, w);
    H = Math.max(1, h);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, mobile ? 1.5 : 2));
    renderer.setSize(W, H, false);
    camera.aspect = W / H;
    camera.position.set(0, 0, H / 2 / Math.tan((FOV * Math.PI) / 360));
    camera.near = 1;
    camera.far = camera.position.z * 4;
    camera.updateProjectionMatrix();
  };

  const smooth = (a: number, b: number, x: number) => {
    const t = Math.min(1, Math.max(0, (x - a) / (b - a)));
    return t * t * (3 - 2 * t);
  };

  const frame = ({ cards: rects, vel, progress, time }: FilmFrame) => {
    const speed = Math.min(1, Math.abs(vel));

    const S = Math.min(W, H);
    const rangeY = H * 1.7;
    petals.forEach((p, i) => {
      // Drift up-right as the strip runs down-left; nearer petals travel further.
      let x = p.bx * W + progress * W * 0.3 * p.depth + Math.sin(time * 0.21 + p.phase) * 14;
      let y = p.by * H - progress * H * 1.1 * p.depth + Math.cos(time * 0.17 + p.phase) * 10;
      y = ((((y + H * 0.35) % rangeY) + rangeY) % rangeY) - H * 0.35;
      x = ((((x + W * 0.25) % (W * 1.5)) + W * 1.5) % (W * 1.5)) - W * 0.25;
      const sz = p.size * S * 1.6;
      p.mesh.position.set(x - W / 2, H / 2 - y, 0);
      p.mesh.scale.set(sz * 0.69, sz, 1);
      p.mesh.rotation.z = p.rot + Math.sin(time * 0.3 + i) * 0.08 + vel * 0.15 * p.depth;
    });

    rects.forEach((r, i) => {
      const c = cards[i];
      if (!c) return;
      const show = c.ready && r.alpha > 0.01 && r.w > 1;
      c.mesh.visible = show;
      if (!show) return;
      const u = c.uniforms;
      u.uSize.value.set(r.w, r.h);
      u.uAlpha.value = r.alpha;
      u.uTime.value = time;
      const diag = Math.hypot(r.w, r.h);
      // Entering (top-right) → strong curl; centred → nearly flat; leaving → slight edge warp.
      const enter = 1 - smooth(-0.45, 0.42, r.u);
      const centre = 1 - Math.min(1, Math.abs(r.u - 0.5) / 0.5);
      const leave = smooth(0.85, 1.6, r.u);
      u.uFoldA.value = diag * (0.42 * enter + 0.22 * speed * (1 - centre * 0.7));
      u.uFoldB.value = r.w * (0.16 * leave + 0.1 * speed * leave);
      u.uBend.value = vel * 120 * (0.35 + 0.65 * (1 - centre));
      u.uRGB.value = 0.4 + speed * 2.6 + enter * 1.2;
      c.mesh.position.set(r.x + r.w / 2 - W / 2, H / 2 - (r.y + r.h / 2), 0);
      c.mesh.renderOrder = Math.round(r.u * 100);
    });

    renderer.render(scene, camera);
  };

  const dispose = () => {
    disposed = true;
    cards.forEach((c) => {
      c.tex?.dispose();
      (c.mesh.material as THREE.Material).dispose();
    });
    petals.forEach((p) => (p.mesh.material as THREE.Material).dispose());
    petalTex.forEach((t) => t.dispose());
    cardGeo.dispose();
    petalGeo.dispose();
    renderer.dispose();
    renderer.forceContextLoss();
  };

  return { frame, resize, dispose };
}
