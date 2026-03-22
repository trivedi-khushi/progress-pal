import { useState, useCallback, useEffect } from "react";

export interface LogEntry {
  id: string;
  timestamp: number;
}

interface GoalState {
  goal: number | null;
  name: string | null;
  progress: number;
  logs: LogEntry[];
  startedAt: number | null;
  completedAt: number | null;
}

const STORAGE_KEY = "goal-tracker-state";

function loadState(): GoalState {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (raw) return JSON.parse(raw);
  } catch {}
  return { goal: null, name: null, progress: 0, logs: [], startedAt: null, completedAt: null };
}

function saveState(state: GoalState) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
}

export function useGoalTracker() {
  const [state, setState] = useState<GoalState>(loadState);

  useEffect(() => {
    saveState(state);
  }, [state]);

  const setGoal = useCallback((goal: number, name: string) => {
    setState({ goal, name, progress: 0, logs: [], startedAt: null, completedAt: null });
  }, []);

  const increment = useCallback(() => {
    setState((s) => {
      if (s.goal === null || s.progress >= s.goal) return s;
      const now = Date.now();
      const newProgress = s.progress + 1;
      const entry: LogEntry = { id: crypto.randomUUID(), timestamp: now };
      return {
        ...s,
        progress: newProgress,
        logs: [entry, ...s.logs],
        startedAt: s.startedAt ?? now,
        completedAt: newProgress >= s.goal ? now : null,
      };
    });
  }, []);

  const reset = useCallback(() => {
    setState({ goal: null, name: null, progress: 0, logs: [], startedAt: null, completedAt: null });
    localStorage.removeItem(STORAGE_KEY);
  }, []);

  const percentage = state.goal ? Math.round((state.progress / state.goal) * 100) : 0;
  const isComplete = state.goal !== null && state.progress >= state.goal;
  const lastClickTime = state.logs.length > 0 ? state.logs[0].timestamp : null;
  const totalDuration =
    state.startedAt && state.completedAt ? state.completedAt - state.startedAt : null;

  return {
    goal: state.goal,
    name: state.name,
    progress: state.progress,
    logs: state.logs,
    percentage,
    isComplete,
    lastClickTime,
    totalDuration,
    setGoal,
    increment,
    reset,
  };
}
