import { useGoalTracker } from "@/hooks/useGoalTracker";
import { useTheme } from "@/hooks/useTheme";
import { GoalSetup } from "@/components/GoalSetup";
import { ProgressTracker } from "@/components/ProgressTracker";
import { ThemeToggle } from "@/components/ThemeToggle";

const Index = () => {
  const tracker = useGoalTracker();
  const { isDark, toggle } = useTheme();

  return (
    <>
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
    </>
  );
};

export default Index;
