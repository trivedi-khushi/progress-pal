import { useState, useEffect, useCallback } from "react";
import { Button } from "@/components/ui/button";
import { Plus, RotateCcw, Zap } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { getQuote } from "@/lib/quotes";
import { formatTimeAgo, formatDuration } from "@/lib/timeFormat";
import { getGoalType } from "@/lib/goalTypes";
import { ActivityLog } from "@/components/ActivityLog";
import { ResetDialog } from "@/components/ResetDialog";
import { HueBurst } from "@/components/HueBurst";
import type { LogEntry } from "@/hooks/useGoalTracker";
import confetti from "canvas-confetti";

interface ProgressTrackerProps {
  goal: number;
  name: string;
  goalType: string;
  progress: number;
  percentage: number;
  isComplete: boolean;
  lastClickTime: number | null;
  totalDuration: number | null;
  logs: LogEntry[];
  isDark: boolean;
  onIncrement: () => void;
  onReset: () => void;
  onClickSound: (pct: number) => void;
  onCompleteSound: () => void;
}

export function ProgressTracker({
  goal,
  name,
  goalType,
  progress,
  percentage,
  isComplete,
  lastClickTime,
  totalDuration,
  logs,
  isDark,
  onIncrement,
  onReset,
  onClickSound,
  onCompleteSound,
}: ProgressTrackerProps) {
  const [quote, setQuote] = useState(() => getQuote(0));
  const [lastUpdated, setLastUpdated] = useState("");
  const [showReset, setShowReset] = useState(false);
  const [clickScale, setClickScale] = useState(false);
  const [hasTriggeredConfetti, setHasTriggeredConfetti] = useState(false);
  const [burstTrigger, setBurstTrigger] = useState(0);
  const [displayPct, setDisplayPct] = useState(percentage);

  // Animated percentage counter
  useEffect(() => {
    const start = displayPct;
    const end = percentage;
    if (start === end) return;
    const duration = 400;
    const startTime = Date.now();
    const tick = () => {
      const elapsed = Date.now() - startTime;
      const t = Math.min(elapsed / duration, 1);
      setDisplayPct(Math.round(start + (end - start) * t));
      if (t < 1) requestAnimationFrame(tick);
    };
    requestAnimationFrame(tick);
  }, [percentage]);

  // Live "last updated" timer
  useEffect(() => {
    if (!lastClickTime) return;
    const update = () => setLastUpdated(formatTimeAgo(lastClickTime));
    update();
    const id = setInterval(update, 1000);
    return () => clearInterval(id);
  }, [lastClickTime]);

  // Confetti + sound on completion
  useEffect(() => {
    if (isComplete && !hasTriggeredConfetti) {
      setHasTriggeredConfetti(true);
      onCompleteSound();
      const end = Date.now() + 2500;
      const fire = () => {
        confetti({
          particleCount: 100,
          spread: 120,
          origin: { y: 0.6 },
          colors: ["#8B5CF6", "#D946EF", "#3B82F6", "#EC4899", "#6366F1"],
        });
        if (Date.now() < end) requestAnimationFrame(fire);
      };
      fire();
    }
  }, [isComplete, hasTriggeredConfetti, onCompleteSound]);

  const handleClick = useCallback(() => {
    onIncrement();
    setClickScale(true);
    setBurstTrigger((t) => t + 1);
    setTimeout(() => setClickScale(false), 200);
    const nextPct = Math.round(((progress + 1) / goal) * 100);
    setQuote(getQuote(nextPct));
    onClickSound(nextPct);
  }, [onIncrement, progress, goal, onClickSound]);

  return (
    <>
      <HueBurst trigger={burstTrigger} isDark={isDark} />

      <div className="relative z-10 flex min-h-screen flex-col items-center p-4 md:p-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="w-full max-w-lg space-y-6"
        >
          {/* Header */}
          <div className="text-center space-y-1 pt-12">
            <h1 className="text-2xl font-display font-bold tracking-tight">
              {isComplete ? (
                <span className="gradient-text">🎉 Goal Complete!</span>
              ) : (
                <span className="gradient-text">{name}'s Progress</span>
              )}
            </h1>
            {lastClickTime && !isComplete && (
              <p className="text-xs text-muted-foreground">
                Last updated {lastUpdated}
              </p>
            )}
          </div>

          {/* Progress Card */}
          <motion.div layout className="glass-card p-6 md:p-8 space-y-6">
            {/* Percentage */}
            <div className="text-center space-y-1">
              <motion.div
                key={displayPct}
                className="text-6xl font-display font-bold tabular-nums gradient-text"
                animate={clickScale ? { scale: [1, 1.08, 1] } : {}}
                transition={{ duration: 0.3 }}
              >
                {displayPct}%
              </motion.div>
              <div className="text-sm text-muted-foreground font-medium">
                {progress} / {goal} {getGoalType(goalType)?.unitLabel ?? ""}
              </div>
            </div>

            {/* Progress Bar */}
            <div className="relative h-5 rounded-full bg-progress-track overflow-hidden">
              <motion.div
                className={`absolute inset-y-0 left-0 rounded-full progress-bar-fill ${
                  isComplete ? "progress-glow" : ""
                }`}
                initial={{ width: 0 }}
                animate={{ width: `${Math.min(percentage, 100)}%` }}
                transition={{ duration: 0.6, ease: "easeOut" }}
              />
              {percentage > 0 && percentage < 100 && (
                <motion.div
                  className="absolute top-0 bottom-0 w-2 rounded-full bg-primary-foreground/30 blur-sm"
                  animate={{ left: `calc(${Math.min(percentage, 100)}% - 4px)` }}
                  transition={{ duration: 0.6, ease: "easeOut" }}
                  style={{ animation: "pulse-glow 2s ease-in-out infinite" }}
                />
              )}
            </div>

            {/* Quote */}
            <AnimatePresence mode="wait">
              <motion.div
                key={quote}
                initial={{ opacity: 0, y: 12, scale: 0.97 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: -12, scale: 0.97 }}
                transition={{ duration: 0.4, ease: "easeOut" }}
                className="text-center text-lg md:text-xl text-foreground font-bold italic min-h-[3.5rem] flex items-center justify-center px-4 py-3 leading-relaxed"
              >
                {progress > 0 || isComplete ? `"${quote}"` : "Ready when you are ✨"}
              </motion.div>
            </AnimatePresence>

            {/* Completion stats */}
            {isComplete && totalDuration !== null && (
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="text-center glass-card p-4 bg-accent/50"
              >
                <p className="text-xs text-muted-foreground">Completed in</p>
                <p className="text-lg font-display font-semibold gradient-text">
                  {formatDuration(totalDuration)}
                </p>
              </motion.div>
            )}
          </motion.div>

          {/* Action Buttons */}
          <div className="flex gap-3">
            <motion.div className="flex-1" whileTap={{ scale: 0.96 }}>
              <Button
                onClick={handleClick}
                disabled={isComplete}
                className="w-full h-14 text-base font-semibold gap-2 rounded-xl"
                size="lg"
              >
                {isComplete ? (
                  <Zap className="w-5 h-5" />
                ) : (
                  <Plus className="w-5 h-5" />
                )}
                +1 Progress
              </Button>
            </motion.div>
            <motion.div whileTap={{ scale: 0.95 }}>
              <Button
                variant="outline"
                size="lg"
                className="h-14 px-4 rounded-xl"
                onClick={() => setShowReset(true)}
              >
                <RotateCcw className="w-4 h-4" />
              </Button>
            </motion.div>
          </div>

          {/* Activity Log */}
          {logs.length > 0 && <ActivityLog logs={logs} />}
        </motion.div>

        <ResetDialog
          open={showReset}
          onOpenChange={setShowReset}
          onConfirm={() => {
            onReset();
            setShowReset(false);
            setQuote(getQuote(0));
            setHasTriggeredConfetti(false);
            setDisplayPct(0);
          }}
        />
      </div>
    </>
  );
}
