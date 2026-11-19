import * as THREE from "three";

// WebGL half of the "Selected work" film strip (components/FilmStrip.tsx).
// The DOM cards own layout, links and captions; this layer redraws each card's image
// as a curling, RGB-split plane at the card's on-screen rect, plus the greyscale cloud backdrop.
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
uniform float uWave;  // ripple amplitude in px (scroll-speed driven, 0 at rest)
uniform float uPhase; // advances with time and scroll so the ripple travels
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

  // One wave rolling right → left across the card (crests move toward -x as uPhase grows).
  // Stronger toward the top edge, gentle at the bottom so the image stays legible.
  if (uWave > 0.01) {
    float w = uv.x * 4.0 + uPhase;
    float a = uWave * mix(0.45, 1.0, uv.y);
    P.y += a * sin(w);
    P.z += a * 1.4 * sin(w + 0.8);
    vShade = 1.0 - 0.06 * (0.5 + 0.5 * sin(w + 0.8));
  }

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
    col = vec3(0.94, 0.945, 0.943); // paper back of the curled corner
  }
  col *= vShade;
  col += (hash(gl_FragCoord.xy + fract(uTime * 7.0) * 113.0) - 0.5) * 0.035;
  gl_FragColor = vec4(col, uAlpha);
}
`;

/* ------------------------------------------------------------------ clouds */

/** Blur a canvas by `blur` px (canvas filter, or shrink-and-scale on browsers without it). */
function blurred(src: HTMLCanvasElement, blur: number) {
  const out = document.createElement("canvas");
  out.width = src.width;
  out.height = src.height;
  const o = out.getContext("2d")!;
  if (typeof o.filter === "string") {
    o.filter = `blur(${blur}px)`;
    o.drawImage(src, 0, 0);
    return out;
  }
  const k = Math.max(0.05, 1 / (1 + blur / 2));
  const small = document.createElement("canvas");
  small.width = Math.ceil(src.width * k);
  small.height = Math.ceil(src.height * k);
  const s = small.getContext("2d")!;
  s.imageSmoothingQuality = "high";
  s.drawImage(src, 0, 0, small.width, small.height);
  o.imageSmoothingQuality = "high";
  o.drawImage(small, 0, 0, out.width, out.height);
  return out;
}

/** A soft grey cloud bank: overlapping puffs on a flat base, lit from above, then blurred. */
function cloudCanvas(seed: number, blur: number) {
  const W = 640;
  const H = 300;
  const c = document.createElement("canvas");
  c.width = W;
  c.height = H;
  const g = c.getContext("2d")!;
  const rnd = seeded(seed);
  const base = H * 0.78;
  const shade = g.createLinearGradient(0, H * 0.15, 0, base);
  shade.addColorStop(0, "rgba(252, 252, 252, 1)");
  shade.addColorStop(0.55, "rgba(218, 221, 220, 1)");
  shade.addColorStop(1, "rgba(160, 165, 164, 1)");
  g.fillStyle = shade;
  g.beginPath();
  const n = 9;
  for (let i = 0; i < n; i++) {
    const t = (i + 0.5) / n;
    const x = 70 + t * (W - 140) + (rnd() - 0.5) * 30;
    const hump = Math.sin(t * Math.PI); // taller in the middle
    const r = (34 + rnd() * 30) * (0.6 + hump * 0.9);
    const y = base - r * (0.55 + rnd() * 0.35);
    g.moveTo(x + r, y);
    g.arc(x, y, r, 0, Math.PI * 2);
  }
  g.rect(60, base - 40, W - 120, 40); // flat underside
  g.fill();
  return blurred(c, blur);
}

type Cloud = {
  mesh: THREE.Mesh;
  bx: number; // base x, fraction of stage width
  top: boolean; // top bank (flipped, hangs down) or bottom bank
  y: number; // centre offset from its edge, fraction of stage height
  width: number; // fraction of stage width
  depth: number; // parallax factor
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

  /* clouds: greyscale banks along the top and bottom edges (the CSS fade blends them into the page) */
  const mobile = window.matchMedia("(max-width: 767px)").matches;
  const cloudTex = [cloudCanvas(11, 16), cloudCanvas(23, 10), cloudCanvas(37, 22)].map((c) => {
    const t = new THREE.CanvasTexture(c);
    t.anisotropy = 4;
    return t;
  });
  const cloudGeo = new THREE.PlaneGeometry(1, 1);
  const rnd = seeded(20261119);
  const clouds: Cloud[] = [];
  const perBank = mobile ? 3 : 5;
  [true, false].forEach((top) => {
    for (let k = 0; k < perBank; k++) {
      const depth = 0.4 + rnd() * 0.6;
      const mat = new THREE.MeshBasicMaterial({
        map: cloudTex[Math.floor(rnd() * cloudTex.length)],
        transparent: true,
        depthTest: false,
        depthWrite: false,
        opacity: 0.6 + depth * 0.35,
      });
      const mesh = new THREE.Mesh(cloudGeo, mat);
      mesh.renderOrder = -1000 + Math.round(depth * 100);
      scene.add(mesh);
      clouds.push({
        mesh,
        bx: ((k + rnd() * 0.7) / perBank) * 1.8 - 0.4,
        top,
        y: 0.05 + rnd() * 0.12,
        width: (mobile ? 1.1 : 0.55) + rnd() * (mobile ? 0.5 : 0.35),
        depth,
        phase: rnd() * Math.PI * 2,
      });
    }
  });

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
      uWave: { value: 0 },
      uPhase: { value: 0 },
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

    const span = W * 1.8;
    clouds.forEach((c) => {
      // Slow drift: top bank to the right, bottom bank to the left; nearer clouds move further.
      const dir = c.top ? 1 : -1;
      let x = c.bx * W + dir * (progress * W * 0.45 * c.depth + time * 4 * c.depth) + Math.sin(time * 0.1 + c.phase) * 8;
      x = ((((x + W * 0.4) % span) + span) % span) - W * 0.4;
      const w = c.width * W;
      const h = w * (300 / 640);
      const lift = progress * H * 0.04 * c.depth; // a touch of vertical parallax
      const y = c.top ? c.y * H + h * 0.12 - lift : H - c.y * H - h * 0.12 + lift;
      c.mesh.position.set(x - W / 2, H / 2 - y, 0);
      c.mesh.scale.set(w, c.top ? -h : h, 1); // top bank flipped so the puffs hang down
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
      // Waves: side cards ripple hard, the centred one only a little; flat again at rest.
      const waveSpeed = Math.min(1, speed * 1.6);
      u.uWave.value = (r.w / 396) * (waveSpeed * 26 + enter * 5) * (0.15 + 0.85 * (1 - centre));
      u.uPhase.value = progress * 30; // scroll-driven only, same phase for every card
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
    clouds.forEach((c) => (c.mesh.material as THREE.Material).dispose());
    cloudTex.forEach((t) => t.dispose());
    cardGeo.dispose();
    cloudGeo.dispose();
    renderer.dispose();
    renderer.forceContextLoss();
  };

  return { frame, resize, dispose };
}
