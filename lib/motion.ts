import type Lenis from "lenis";

// Shared, non-React runtime state for the motion layer. Components that need
// to talk to the scroll engine or audio (menu, sound toggle) go through here.

type Audio = { ctx: AudioContext; gain: GainNode; filt: BiquadFilterNode };

export const motion: { lenis: Lenis | null; soundOn: boolean; audio: Audio | null } = {
  lenis: null,
  soundOn: false,
  audio: null,
};

export const prefersReducedMotion = () =>
  typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches;

export const isMobile = () => window.matchMedia("(max-width: 767px)").matches;

/* ------------------------------------------------ movement sound */

function startAudio(): boolean {
  const AC =
    window.AudioContext ||
    (window as unknown as { webkitAudioContext?: typeof AudioContext }).webkitAudioContext;
  if (!AC) return false;
  const ctx = new AC();
  // 2s looping brown-ish noise
  const len = ctx.sampleRate * 2;
  const buf = ctx.createBuffer(1, len, ctx.sampleRate);
  const d = buf.getChannelData(0);
  let last = 0;
  for (let i = 0; i < len; i++) {
    const w = Math.random() * 2 - 1;
    last = (last + w * 0.03) * 0.985;
    d[i] = last * 6;
  }
  const src = ctx.createBufferSource();
  src.buffer = buf;
  src.loop = true;
  const filt = ctx.createBiquadFilter();
  filt.type = "bandpass";
  filt.frequency.value = 320;
  filt.Q.value = 0.9;
  const gain = ctx.createGain();
  gain.gain.value = 0;
  src.connect(filt).connect(gain).connect(ctx.destination);
  src.start();
  motion.audio = { ctx, gain, filt };
  return true;
}

/** Toggles the scroll "whoosh". Returns the new state. */
export function toggleSound(): boolean {
  if (!motion.audio && !startAudio()) return motion.soundOn;
  motion.soundOn = !motion.soundOn;
  const a = motion.audio!;
  if (motion.soundOn && a.ctx.state === "suspended") a.ctx.resume();
  if (!motion.soundOn) a.gain.gain.value = 0;
  return motion.soundOn;
}

/** Velocity → filtered whoosh, called every frame by the cube loop. */
export function updateSound(speed: number) {
  const a = motion.audio;
  if (!motion.soundOn || !a || prefersReducedMotion()) return;
  const now = a.ctx.currentTime;
  const s = Math.min(1, speed);
  a.gain.gain.setTargetAtTime(0.05 * s, now, 0.12);
  a.filt.frequency.setTargetAtTime(300 + s * 900, now, 0.12);
}
