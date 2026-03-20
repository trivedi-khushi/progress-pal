import { useGoalTracker } from "@/hooks/useGoalTracker";
import { GoalSetup } from "@/components/GoalSetup";
import { ProgressTracker } from "@/components/ProgressTracker";

const Index = () => {
  const tracker = useGoalTracker();

  if (tracker.goal === null) {
    return <GoalSetup onSetGoal={tracker.setGoal} />;
  }

  return (
    <ProgressTracker
      goal={tracker.goal}
      progress={tracker.progress}
      percentage={tracker.percentage}
      isComplete={tracker.isComplete}
      lastClickTime={tracker.lastClickTime}
      totalDuration={tracker.totalDuration}
      logs={tracker.logs}
      onIncrement={tracker.increment}
      onReset={tracker.reset}
    />
  );
};

export default Index;
