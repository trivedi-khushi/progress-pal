import { useGoalTracker } from "@/hooks/useGoalTracker";
import { useTheme } from "@/hooks/useTheme";
import { GoalSetup } from "@/components/GoalSetup";
import { ProgressTracker } from "@/components/ProgressTracker";
import { ThemeToggle } from "@/components/ThemeToggle";

const Index = () => {
  const tracker = useGoalTracker();
  const { isDark, toggle } = useTheme();

  // Apply green theme class when progress >= 50%
  const isGreenPhase = tracker.goal !== null && tracker.percentage >= 50;

  return (
    <div className={isGreenPhase ? "green-phase" : ""}>
      <ThemeToggle isDark={isDark} onToggle={toggle} />
      {tracker.goal === null ? (
        <GoalSetup onSetGoal={tracker.setGoal} />
      ) : (
        <ProgressTracker
          goal={tracker.goal}
          progress={tracker.progress}
          percentage={tracker.percentage}
          isComplete={tracker.isComplete}
          lastClickTime={tracker.lastClickTime}
          totalDuration={tracker.totalDuration}
          logs={tracker.logs}
          isDark={isDark}
          onIncrement={tracker.increment}
          onReset={tracker.reset}
        />
      )}
    </div>
  );
};

export default Index;
