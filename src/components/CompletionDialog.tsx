import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Home, RefreshCw } from "lucide-react";

interface CompletionDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onRepeat: () => void;
  onHome: () => void;
}

export function CompletionDialog({
  open,
  onOpenChange,
  onRepeat,
  onHome,
}: CompletionDialogProps) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="text-center text-2xl font-display font-bold gradient-text">
            🎉 Let's go another round?
          </DialogTitle>
          <DialogDescription className="text-center text-muted-foreground">
            You crushed it! What would you like to do next?
          </DialogDescription>
        </DialogHeader>
        <div className="flex gap-3 pt-4">
          <Button
            variant="outline"
            className="flex-1 h-12 gap-2 rounded-xl"
            onClick={onHome}
          >
            <Home className="w-4 h-4" />
            Return to Home
          </Button>
          <Button
            className="flex-1 h-12 gap-2 rounded-xl"
            onClick={onRepeat}
          >
            <RefreshCw className="w-4 h-4" />
            Repeat Again
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
