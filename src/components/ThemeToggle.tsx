import { Moon, Sun } from "lucide-react";
import { motion } from "framer-motion";

interface ThemeToggleProps {
  isDark: boolean;
  onToggle: () => void;
}

export function ThemeToggle({ isDark, onToggle }: ThemeToggleProps) {
  return (
    <button
      onClick={onToggle}
      className="fixed top-4 right-4 z-50 w-14 h-7 rounded-full bg-muted border border-border/50 backdrop-blur-md p-0.5 transition-colors duration-300 focus:outline-none focus-visible:ring-2 focus-visible:ring-ring"
      aria-label="Toggle dark mode"
    >
      <motion.div
        className="w-6 h-6 rounded-full bg-primary flex items-center justify-center shadow-md"
        animate={{ x: isDark ? 26 : 0 }}
        transition={{ type: "spring", stiffness: 500, damping: 30 }}
      >
        <motion.div
          key={isDark ? "moon" : "sun"}
          initial={{ rotate: -90, opacity: 0, scale: 0.5 }}
          animate={{ rotate: 0, opacity: 1, scale: 1 }}
          exit={{ rotate: 90, opacity: 0, scale: 0.5 }}
          transition={{ duration: 0.2 }}
        >
          {isDark ? (
            <Moon className="w-3.5 h-3.5 text-primary-foreground" />
          ) : (
            <Sun className="w-3.5 h-3.5 text-primary-foreground" />
          )}
        </motion.div>
      </motion.div>
    </button>
  );
}
