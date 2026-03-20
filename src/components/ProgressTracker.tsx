import { useState, useEffect, useCallback } from "react";
import { Button } from "@/components/ui/button";
import { Plus, RotateCcw } from "lucide-react";
import { getQuote } from "@/lib/quotes";
import { formatTimeAgo, formatDuration } from "@/lib/timeFormat";
import { ActivityLog } from "@/components/ActivityLog";
import { ResetDialog } from "@/components/ResetDialog";
import type { LogEntry } from "@/hooks/useGoalTracker";
import confetti from "canvas-confetti";

interface ProgressTrackerProps {
  goal: number;
  progress: number;
  percentage: number;
  isComplete: boolean;
  lastClickTime: number | null;
  totalDuration: number | null;
  logs: LogEntry[];
  onIncrement: () => void;
  onReset: () => void;
}

export function ProgressTracker({
  goal,
  progress,
  percentage,
  isComplete,
  lastClickTime,
  totalDuration,
  logs,
  onIncrement,
  onReset,
}: ProgressTrackerProps) {
  const [quote, setQuote] = useState(() => getQuote(0));
  const [lastUpdated, setLastUpdated] = useState("");
  const [showReset, setShowReset] = useState(false);
  const [clickScale, setClickScale] = useState(false);
  const [hasTriggeredConfetti, setHasTriggeredConfetti] = useState(false);

  // Live "last updated" timer
  useEffect(() => {
    if (!lastClickTime) return;
    const update = () => setLastUpdated(formatTimeAgo(lastClickTime));
    update();
    const id = setInterval(update, 1000);
    return () => clearInterval(id);
  }, [lastClickTime]);

  // Confetti on completion
  useEffect(() => {
    if (isComplete && !hasTriggeredConfetti) {
      setHasTriggeredConfetti(true);
      const end = Date.now() + 2000;
      const fire = () => {
        confetti({ particleCount: 80, spread: 100, origin: { y: 0.6 } });
        if (Date.now() < end) requestAnimationFrame(fire);
      };
      fire();
    }
  }, [isComplete, hasTriggeredConfetti]);

  const handleClick = useCallback(() => {
    onIncrement();
    setClickScale(true);
    setTimeout(() => setClickScale(false), 200);
    // Get quote based on next percentage
    const nextPct = Math.round(((progress + 1) / goal) * 100);
    setQuote(getQuote(nextPct));
  }, [onIncrement, progress, goal]);

  return (
    <div className="flex min-h-screen flex-col items-center p-4 md:p-8">
      <div className="w-full max-w-lg space-y-6 animate-fade-in">
        {/* Header */}
        <div className="text-center space-y-1 pt-8">
          <h1 className="text-2xl font-display font-bold tracking-tight text-foreground">
            {isComplete ? "🎉 Goal Complete!" : "Your Progress"}
          </h1>
          {lastClickTime && !isComplete && (
            <p className="text-xs text-muted-foreground">
              Last updated {lastUpdated}
            </p>
          )}
        </div>

        {/* Progress Card */}
        <div className="glass-card p-6 md:p-8 space-y-6">
          {/* Numbers */}
          <div className="text-center space-y-1">
            <div className="text-5xl font-display font-bold text-foreground tabular-nums">
              {percentage}%
            </div>
            <div className="text-sm text-muted-foreground">
              {progress} / {goal}
            </div>
          </div>

          {/* Progress Bar */}
          <div className="relative h-4 rounded-full bg-progress-track overflow-hidden">
            <div
              className={`absolute inset-y-0 left-0 rounded-full bg-primary transition-all duration-500 ease-out ${
                isComplete ? "progress-glow" : ""
              }`}
              style={{ width: `${Math.min(percentage, 100)}%` }}
            />
          </div>

          {/* Quote */}
          <div
            className="text-center text-sm text-muted-foreground italic min-h-[2.5rem] flex items-center justify-center transition-opacity duration-300"
            key={quote}
          >
            {progress > 0 || isComplete ? quote : "Ready when you are ✨"}
          </div>

          {/* Completion stats */}
          {isComplete && totalDuration !== null && (
            <div className="text-center glass-card p-4 bg-accent/50">
              <p className="text-xs text-muted-foreground">Completed in</p>
              <p className="text-lg font-display font-semibold text-accent-foreground">
                {formatDuration(totalDuration)}
              </p>
            </div>
          )}
        </div>

        {/* Action Buttons */}
        <div className="flex gap-3">
          <Button
            onClick={handleClick}
            disabled={isComplete}
            className={`flex-1 h-14 text-base font-semibold gap-2 transition-transform ${
              clickScale ? "scale-95" : "scale-100"
            }`}
            size="lg"
          >
            <Plus className="w-5 h-5" />
            +1 Progress
          </Button>
          <Button
            variant="outline"
            size="lg"
            className="h-14 px-4"
            onClick={() => setShowReset(true)}
          >
            <RotateCcw className="w-4 h-4" />
          </Button>
        </div>

        {/* Activity Log */}
        {logs.length > 0 && <ActivityLog logs={logs} />}
      </div>

      <ResetDialog
        open={showReset}
        onOpenChange={setShowReset}
        onConfirm={() => {
          onReset();
          setShowReset(false);
          setQuote(getQuote(0));
          setHasTriggeredConfetti(false);
        }}
      />
    </div>
  );
}
