import { useState, useEffect } from "react";

interface HueBurstProps {
  trigger: number; // increment to trigger
  isDark: boolean;
}

export function HueBurst({ trigger, isDark }: HueBurstProps) {
  const [active, setActive] = useState(false);
  const [hueShift, setHueShift] = useState(0);

  useEffect(() => {
    if (trigger === 0 || !isDark) return;
    setHueShift((h) => (h + 40) % 360);
    setActive(true);
    const t = setTimeout(() => setActive(false), 1200);
    return () => clearTimeout(t);
  }, [trigger, isDark]);

  if (!isDark) return null;

  return (
    <div
      className={`bg-hue-burst ${active ? "active" : ""}`}
      style={{ filter: `hue-rotate(${hueShift}deg)` }}
    />
  );
}
