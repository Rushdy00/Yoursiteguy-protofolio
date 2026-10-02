"use client";

import { useState } from "react";
import { toggleSound } from "@/lib/motion";

export default function SoundToggle() {
  const [on, setOn] = useState(false);
  return (
    <button
      type="button"
      className="sound-toggle mono"
      aria-pressed={on}
      aria-label="Toggle motion sound"
      onClick={() => setOn(toggleSound())}
    >
      <span className="sound-dot" aria-hidden="true" />
      <span>{on ? "Sound on" : "Sound off"}</span>
    </button>
  );
}
