import { useEffect, useState } from "react";
import { formatTimeAgo } from "@/lib/timeFormat";
import { ScrollArea } from "@/components/ui/scroll-area";
import type { LogEntry } from "@/hooks/useGoalTracker";
import { Clock } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

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
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className="glass-card p-4 space-y-3"
    >
      <h2 className="text-xs font-medium text-muted-foreground uppercase tracking-wider flex items-center gap-1.5">
        <Clock className="w-3 h-3" /> Activity Log
      </h2>
      <ScrollArea className="h-48">
        <div className="space-y-0.5 pr-3">
          <AnimatePresence initial={false}>
            {logs.map((log, i) => (
              <motion.div
                key={log.id}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.2 }}
                className="flex items-center justify-between text-sm py-2 px-2 rounded-lg hover:bg-muted/40 transition-colors"
              >
                <span className="text-foreground font-medium">
                  Click #{logs.length - i}
                </span>
                <span className="text-muted-foreground text-xs">
                  {formatTimeAgo(log.timestamp)}
                </span>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      </ScrollArea>
    </motion.div>
  );
}
