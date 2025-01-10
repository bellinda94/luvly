import { useState } from "react";
import { ProfileCard } from "./ProfileCard";
import { toast } from "sonner";
import { RotateCcw } from "lucide-react";
import { Button } from "./ui/button";

const mockProfiles = [
  {
    id: 1,
    name: "Sarah",
    age: 28,
    distance: "3 km",
    bio: "Adventure seeker & coffee enthusiast",
    verified: true,
    imageUrl: "https://images.unsplash.com/photo-1494790108377-be9c29b29330",
    images: [
      "https://images.unsplash.com/photo-1494790108377-be9c29b29330",
      "https://images.unsplash.com/photo-1534528741775-53994a69daeb",
      "https://images.unsplash.com/photo-1517841905240-472988babdf9",
    ],
    preferences: {
      ageRange: "25-35",
      lookingFor: "Langzeitbeziehung",
      interests: ["Reisen", "Fotografie", "Kaffee", "Wandern"],
    },
  },
  {
    id: 2,
    name: "Michael",
    age: 31,
    distance: "5 km",
    bio: "Photography & hiking",
    verified: false,
    imageUrl: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e",
    images: [
      "https://images.unsplash.com/photo-1500648767791-00dcc994a43e",
      "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d",
      "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7",
    ],
    preferences: {
      ageRange: "27-35",
      lookingFor: "Dating",
      interests: ["Fotografie", "Wandern", "Kochen"],
    },
  },
];

type Action = {
  type: 'like' | 'pass';
  profileId: number;
};

export const SwipeInterface = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [actions, setActions] = useState<Action[]>([]);

  const handleLike = () => {
    const action: Action = { type: 'like', profileId: mockProfiles[currentIndex].id };
    setActions([...actions, action]);
    toast.success("Liked! 💖", { duration: 2500 });
    setCurrentIndex((prev) => Math.min(prev + 1, mockProfiles.length - 1));
  };

  const handlePass = () => {
    const action: Action = { type: 'pass', profileId: mockProfiles[currentIndex].id };
    setActions([...actions, action]);
    toast.error("Passed! 👋", { duration: 2500 });
    setCurrentIndex((prev) => Math.min(prev + 1, mockProfiles.length - 1));
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

  const currentProfile = mockProfiles[currentIndex];
  const canUndo = actions.length > 0 && currentIndex > 0;

  return (
    <div className="w-full max-w-screen-xl mx-auto px-4 py-8">
      <div className="max-w-sm mx-auto">
        {currentProfile && (
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
        )}
      </div>
    </div>
  );
};