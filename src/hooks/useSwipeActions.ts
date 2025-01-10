import { useState } from "react";
import { toast } from "sonner";

export type Action = {
  type: 'like' | 'pass';
  profileId: number;
};

interface Profile {
  id: number;
}

export const useSwipeActions = (profiles: Profile[]) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [actions, setActions] = useState<Action[]>([]);

  const handleLike = () => {
    const action: Action = { type: 'like', profileId: profiles[currentIndex].id };
    setActions([...actions, action]);
    toast.success("Liked! 💖", { duration: 2500 });
    setCurrentIndex((prev) => Math.min(prev + 1, profiles.length - 1));
  };

  const handlePass = () => {
    const action: Action = { type: 'pass', profileId: profiles[currentIndex].id };
    setActions([...actions, action]);
    toast.error("Passed! 👋", { duration: 2500 });
    setCurrentIndex((prev) => Math.min(prev + 1, profiles.length - 1));
  };

  const handleUndo = () => {
    if (actions.length === 0 || currentIndex === 0) return;
    
    const lastAction = actions[actions.length - 1];
    setActions(actions.slice(0, -1));
    setCurrentIndex((prev) => prev - 1);
    
    toast.info(
      lastAction.type === 'like' 
        ? "Like rückgängig gemacht" 
        : "Pass rückgängig gemacht",
      { duration: 2500 }
    );
  };

  return {
    currentIndex,
    actions,
    handleLike,
    handlePass,
    handleUndo,
    canUndo: actions.length > 0 && currentIndex > 0
  };
};