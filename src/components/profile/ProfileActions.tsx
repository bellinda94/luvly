import { Button } from "@/components/ui/button";
import { Heart, X } from "lucide-react";

interface ProfileActionsProps {
  onLike: () => void;
  onPass: () => void;
}

export const ProfileActions = ({ onLike, onPass }: ProfileActionsProps) => {
  return (
    <div className="flex-1 flex justify-center gap-4">
      <button
        onClick={(e) => {
          e.stopPropagation();
          onPass();
        }}
        className="p-3 rounded-full bg-muted hover:bg-muted/80 transition-colors"
      >
        <X className="w-6 h-6 text-destructive" />
      </button>
      <button
        onClick={(e) => {
          e.stopPropagation();
          onLike();
        }}
        className="p-3 rounded-full bg-primary hover:bg-primary/90 transition-colors"
      >
        <Heart className="w-6 h-6 text-white" />
      </button>
    </div>
  );
};