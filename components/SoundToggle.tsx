"use client";

import { useState } from "react";
import { toggleSound } from "@/lib/motion";

export default function SoundToggle({ t }: { t: { on: string; off: string; aria: string } }) {
  const [on, setOn] = useState(false);
  return (
    <button
      type="button"
      className="sound-toggle mono"
      aria-pressed={on}
      aria-label={t.aria}
      onClick={() => setOn(toggleSound())}
    >
      <span className="sound-dot" aria-hidden="true" />
      <span>{on ? t.on : t.off}</span>
    </button>
  );
}
