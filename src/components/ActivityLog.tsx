import { useEffect, useState } from "react";
import { formatTimeAgo } from "@/lib/timeFormat";
import { ScrollArea } from "@/components/ui/scroll-area";
import type { LogEntry } from "@/hooks/useGoalTracker";
import { Clock } from "lucide-react";

interface ActivityLogProps {
  logs: LogEntry[];
}

export function ActivityLog({ logs }: ActivityLogProps) {
  const [, setTick] = useState(0);

  useEffect(() => {
    const id = setInterval(() => setTick((t) => t + 1), 5000);
    return () => clearInterval(id);
  }, []);

  return (
    <div className="glass-card p-4 space-y-3">
      <h2 className="text-xs font-medium text-muted-foreground uppercase tracking-wider flex items-center gap-1.5">
        <Clock className="w-3 h-3" /> Activity Log
      </h2>
      <ScrollArea className="h-48">
        <div className="space-y-1 pr-3">
          {logs.map((log, i) => (
            <div
              key={log.id}
              className="flex items-center justify-between text-sm py-1.5 border-b border-border/30 last:border-0"
            >
              <span className="text-foreground">
                Click #{logs.length - i}
              </span>
              <span className="text-muted-foreground text-xs">
                {formatTimeAgo(log.timestamp)}
              </span>
            </div>
          ))}
        </div>
      </ScrollArea>
    </div>
  );
}
