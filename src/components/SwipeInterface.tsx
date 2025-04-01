
import { useState, useEffect } from "react";
import { ProfileCard } from "./ProfileCard";
import { toast } from "sonner";
import { RotateCcw } from "lucide-react";
import { Button } from "./ui/button";
import { useProfiles } from "@/hooks/useProfiles";
import { User } from "@/types/user";

type Action = {
  type: 'like' | 'pass';
  profileId: string;
};

export const SwipeInterface = () => {
  const { profiles, loading } = useProfiles();
  const [currentIndex, setCurrentIndex] = useState(0);
  const [actions, setActions] = useState<Action[]>([]);
  const [loadError, setLoadError] = useState<string | null>(null);

  useEffect(() => {
    // Debug-Informationen
    console.log("SwipeInterface profiles:", profiles);
    console.log("SwipeInterface loading state:", loading);
    console.log("SwipeInterface current index:", currentIndex);
  }, [profiles, loading, currentIndex]);

  const handleLike = () => {
    if (!profiles.length) return;
    
    const action: Action = { type: 'like', profileId: profiles[currentIndex].id };
    setActions([...actions, action]);
    toast.success("Liked! 💖", { duration: 2500 });
    setCurrentIndex((prev) => Math.min(prev + 1, profiles.length - 1));
  };

  const handlePass = () => {
    if (!profiles.length) return;
    
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

  if (loading) {
    return (
      <div className="w-full h-[calc(100vh-4rem)] flex items-center justify-center">
        <div className="h-8 w-8 animate-spin rounded-full border-4 border-primary border-t-transparent"></div>
      </div>
    );
  }

  if (profiles.length === 0) {
    return (
      <div className="w-full h-[calc(100vh-4rem)] flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-semibold mb-4">Keine Profile verfügbar</h2>
          <p className="text-muted-foreground">Es gibt aktuell keine Profile zum Anzeigen.</p>
        </div>
      </div>
    );
  }

  if (loadError) {
    return (
      <div className="w-full h-[calc(100vh-4rem)] flex items-center justify-center">
        <div className="text-center text-red-500">
          <h2 className="text-2xl font-semibold mb-4">Fehler beim Laden</h2>
          <p>{loadError}</p>
          <Button 
            className="mt-4" 
            onClick={() => window.location.reload()}
          >
            Erneut versuchen
          </Button>
        </div>
      </div>
    );
  }

  const currentProfile = profiles[currentIndex];
  const canUndo = actions.length > 0 && currentIndex > 0;

  // Überprüfen, ob ein gültiges Profil zum Anzeigen vorhanden ist
  if (!currentProfile) {
    return (
      <div className="w-full h-[calc(100vh-4rem)] flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-semibold mb-4">Keine weiteren Profile</h2>
          <p className="text-muted-foreground">Du hast alle verfügbaren Profile gesehen.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full h-[calc(100vh-4rem)] flex items-center justify-center">
      <div className="w-full h-full">
        <ProfileCard
          {...currentProfile}
          onLike={handleLike}
          onPass={handlePass}
          extraButton={
            <Button
              size="icon"
              onClick={handleUndo}
              disabled={!canUndo}
              className="h-10 w-10 text-muted-foreground hover:text-foreground"
              title="Rückgängig machen"
            >
              <RotateCcw className="w-4 h-4" />
            </Button>
          }
        />
      </div>
    </div>
  );
};
