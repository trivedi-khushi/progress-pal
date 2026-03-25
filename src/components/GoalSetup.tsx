import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Target, Sparkles, User } from "lucide-react";
import { motion } from "framer-motion";
import { GOAL_TYPES, getGoalType } from "@/lib/goalTypes";
import doodleBg from "@/assets/doodle-bg.png";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface GoalSetupProps {
  onSetGoal: (goal: number, name: string, goalType: string) => void;
}

const NAME_REGEX = /^[A-Za-z]+(?:\s[A-Za-z]+)*$/;

export function GoalSetup({ onSetGoal }: GoalSetupProps) {
  const [name, setName] = useState("");
  const [nameError, setNameError] = useState("");
  const [value, setValue] = useState("");
  const [goalType, setGoalType] = useState("");

  const validateName = (v: string) => {
    if (!v.trim()) {
      setNameError("");
      return;
    }
    if (!NAME_REGEX.test(v.trim())) {
      setNameError("Name should contain only letters");
    } else {
      setNameError("");
    }
  };

  const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const v = e.target.value;
    setName(v);
    validateName(v);
  };

  const selectedType = getGoalType(goalType);
  const goalLabel = selectedType?.goalLabel ?? "e.g. 100";

  const isValid =
    name.trim() &&
    NAME_REGEX.test(name.trim()) &&
    goalType &&
    value &&
    parseInt(value) > 0;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!isValid) return;
    onSetGoal(parseInt(value, 10), name.trim(), goalType);
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
            Tell us your name, what you're tracking, and your target
          </p>
        </div>
        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Name */}
          <div className="space-y-1">
            <div className="relative">
              <User className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <Input
                type="text"
                placeholder="Your name"
                value={name}
                onChange={handleNameChange}
                className={`pl-10 text-center text-lg font-display h-12 bg-background/60 border-border/50 focus:border-primary/50 transition-all ${
                  nameError ? "border-destructive focus:border-destructive" : ""
                }`}
                autoFocus
                maxLength={30}
              />
            </div>
            {nameError && (
              <p className="text-xs text-destructive text-left pl-1">{nameError}</p>
            )}
          </div>

          {/* Goal Type */}
          <Select value={goalType} onValueChange={setGoalType}>
            <SelectTrigger className="h-12 bg-background/60 border-border/50 focus:border-primary/50 text-sm">
              <SelectValue placeholder="What are you tracking?" />
            </SelectTrigger>
            <SelectContent>
              {GOAL_TYPES.map((t) => (
                <SelectItem key={t.value} value={t.value}>
                  {t.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          {/* Goal Number */}
          <div className="space-y-1">
            {selectedType && (
              <p className="text-xs text-muted-foreground text-left pl-1">
                {selectedType.goalLabel}
              </p>
            )}
            <Input
              type="number"
              min={1}
              max={10000}
              placeholder={goalLabel}
              value={value}
              onChange={(e) => setValue(e.target.value)}
              className="text-center text-2xl font-display h-14 bg-background/60 border-border/50 focus:border-primary/50 transition-all"
            />
          </div>

          <Button
            type="submit"
            disabled={!isValid}
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
