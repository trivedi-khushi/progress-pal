import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Target } from "lucide-react";

interface GoalSetupProps {
  onSetGoal: (goal: number) => void;
}

export function GoalSetup({ onSetGoal }: GoalSetupProps) {
  const [value, setValue] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const num = parseInt(value, 10);
    if (num > 0 && num <= 10000) onSetGoal(num);
  };

  return (
    <div className="flex min-h-screen items-center justify-center p-4">
      <div className="glass-card p-8 md:p-12 w-full max-w-md animate-fade-in text-center space-y-8">
        <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-primary/10 mx-auto">
          <Target className="w-8 h-8 text-primary" />
        </div>
        <div className="space-y-2">
          <h1 className="text-3xl font-display font-bold tracking-tight text-foreground">
            Set Your Goal
          </h1>
          <p className="text-muted-foreground text-sm">
            How many steps to your next milestone?
          </p>
        </div>
        <form onSubmit={handleSubmit} className="space-y-4">
          <Input
            type="number"
            min={1}
            max={10000}
            placeholder="e.g. 100"
            value={value}
            onChange={(e) => setValue(e.target.value)}
            className="text-center text-2xl font-display h-14 bg-background/60"
            autoFocus
          />
          <Button
            type="submit"
            disabled={!value || parseInt(value) <= 0}
            className="w-full h-12 text-base font-medium"
          >
            Start Tracking
          </Button>
        </form>
        <p className="text-xs text-muted-foreground">
          Choose between 1 and 10,000
        </p>
      </div>
    </div>
  );
}
