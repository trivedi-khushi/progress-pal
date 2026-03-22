import { Volume2, VolumeX } from "lucide-react";
import { Button } from "@/components/ui/button";

interface SoundToggleProps {
  muted: boolean;
  onToggle: () => void;
}

export function SoundToggle({ muted, onToggle }: SoundToggleProps) {
  return (
    <Button
      variant="ghost"
      size="icon"
      onClick={onToggle}
      className="fixed top-4 right-16 z-50 rounded-full w-10 h-10 bg-card/60 backdrop-blur-md border border-border/40 hover:bg-card/80 transition-all"
      aria-label={muted ? "Unmute" : "Mute"}
    >
      {muted ? (
        <VolumeX className="w-4 h-4 text-muted-foreground" />
      ) : (
        <Volume2 className="w-4 h-4 text-primary" />
      )}
    </Button>
  );
}
