import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Target, Sparkles } from "lucide-react";
import { motion } from "framer-motion";

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
      <motion.div
        initial={{ opacity: 0, y: 30, scale: 0.96 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="glass-card p-8 md:p-12 w-full max-w-md text-center space-y-8"
      >
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
          className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-primary/10 mx-auto"
        >
          <Target className="w-8 h-8 text-primary" />
        </motion.div>
        <div className="space-y-2">
          <h1 className="text-3xl font-display font-bold tracking-tight">
            <span className="gradient-text">Set Your Goal</span>
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
            className="text-center text-2xl font-display h-14 bg-background/60 border-border/50 focus:border-primary/50 transition-all"
            autoFocus
          />
          <Button
            type="submit"
            disabled={!value || parseInt(value) <= 0}
            className="w-full h-12 text-base font-semibold gap-2 rounded-xl"
          >
            <Sparkles className="w-4 h-4" />
            Start Tracking
          </Button>
        </form>
        <p className="text-xs text-muted-foreground">
          Choose between 1 and 10,000
        </p>
      </motion.div>
    </div>
  );
}
