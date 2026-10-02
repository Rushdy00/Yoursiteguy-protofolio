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
      aria-label="تشغيل أو إيقاف صوت الحركة"
      onClick={() => setOn(toggleSound())}
    >
      <span className="sound-dot" aria-hidden="true" />
      <span>{on ? "الصوت مُفعّل" : "الصوت مُطفأ"}</span>
    </button>
  );
}
