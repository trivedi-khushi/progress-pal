import { useState, useCallback, useRef, useEffect } from "react";

const MUTE_KEY = "goal-tracker-muted";

function createOscillator(
  ctx: AudioContext,
  frequency: number,
  duration: number,
  volume: number
) {
  const osc = ctx.createOscillator();
  const gain = ctx.createGain();
  osc.type = "sine";
  osc.frequency.value = frequency;
  gain.gain.setValueAtTime(volume, ctx.currentTime);
  gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + duration);
  osc.connect(gain);
  gain.connect(ctx.destination);
  osc.start();
  osc.stop(ctx.currentTime + duration);
}

/**
 * Plays a short, pleasant tone that rises in pitch as progress increases.
 * At completion, plays a celebratory chord.
 */
export function useSound() {
  const [muted, setMuted] = useState(() => {
    try {
      return localStorage.getItem(MUTE_KEY) === "true";
    } catch {
      return false;
    }
  });
  const ctxRef = useRef<AudioContext | null>(null);

  const getCtx = useCallback(() => {
    if (!ctxRef.current) {
      ctxRef.current = new AudioContext();
    }
    return ctxRef.current;
  }, []);

  const toggleMute = useCallback(() => {
    setMuted((m) => {
      const next = !m;
      localStorage.setItem(MUTE_KEY, String(next));
      return next;
    });
  }, []);

  /** percentage: 0-100 */
  const playClick = useCallback(
    (percentage: number) => {
      if (muted) return;
      try {
        const ctx = getCtx();
        // Base frequency 400Hz → 800Hz as progress increases
        const freq = 400 + (percentage / 100) * 400;
        createOscillator(ctx, freq, 0.12, 0.15);
        // Add a harmonic for richness
        createOscillator(ctx, freq * 1.5, 0.08, 0.06);
      } catch {}
    },
    [muted, getCtx]
  );

  const playComplete = useCallback(() => {
    if (muted) return;
    try {
      const ctx = getCtx();
      // Celebratory arpeggio
      const notes = [523, 659, 784, 1047]; // C5, E5, G5, C6
      notes.forEach((freq, i) => {
        setTimeout(() => {
          createOscillator(ctx, freq, 0.3, 0.12);
        }, i * 100);
      });
    } catch {}
  }, [muted, getCtx]);

  return { muted, toggleMute, playClick, playComplete };
}
