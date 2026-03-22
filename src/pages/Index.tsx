import { useGoalTracker } from "@/hooks/useGoalTracker";
import { useTheme } from "@/hooks/useTheme";
import { useSound } from "@/hooks/useSound";
import { GoalSetup } from "@/components/GoalSetup";
import { ProgressTracker } from "@/components/ProgressTracker";
import { ThemeToggle } from "@/components/ThemeToggle";
import { SoundToggle } from "@/components/SoundToggle";

const Index = () => {
  const tracker = useGoalTracker();
  const { isDark, toggle } = useTheme();
  const { muted, toggleMute, playClick, playComplete } = useSound();

  const isGreenPhase = tracker.goal !== null && tracker.percentage >= 50;

  return (
    <div className={isGreenPhase ? "green-phase" : ""}>
      <ThemeToggle isDark={isDark} onToggle={toggle} />
      <SoundToggle muted={muted} onToggle={toggleMute} />
      {tracker.goal === null ? (
        <GoalSetup onSetGoal={tracker.setGoal} />
      ) : (
        <ProgressTracker
          goal={tracker.goal}
          name={tracker.name ?? "You"}
          progress={tracker.progress}
          percentage={tracker.percentage}
          isComplete={tracker.isComplete}
          lastClickTime={tracker.lastClickTime}
          totalDuration={tracker.totalDuration}
          logs={tracker.logs}
          isDark={isDark}
          onIncrement={tracker.increment}
          onReset={tracker.reset}
          onClickSound={playClick}
          onCompleteSound={playComplete}
        />
      )}
    </div>
  );
};

export default Index;
