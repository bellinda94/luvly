import { Button } from "@/components/ui/button";
import { RotateCcw } from "lucide-react";

interface UndoButtonProps {
  onClick: () => void;
  disabled: boolean;
}

export const UndoButton = ({ onClick, disabled }: UndoButtonProps) => {
  return (
    <Button
      size="icon"
      onClick={onClick}
      disabled={disabled}
      className="h-10 w-10 text-muted-foreground hover:text-foreground"
      title="Rückgängig machen"
    >
      <RotateCcw className="w-4 h-4" />
    </Button>
  );
};