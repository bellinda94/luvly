import { ProfileCard } from "./ProfileCard";
import { ProfileActions } from "./profile/ProfileActions";
import { UndoButton } from "./profile/UndoButton";
import { useSwipeActions } from "@/hooks/useSwipeActions";

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

export const SwipeInterface = () => {
  const {
    currentIndex,
    handleLike,
    handlePass,
    handleUndo,
    canUndo
  } = useSwipeActions(mockProfiles);

  const currentProfile = mockProfiles[currentIndex];

  return (
    <div className="w-full max-w-screen-xl mx-auto px-4 py-8">
      <div className="max-w-sm mx-auto relative">
        {currentProfile && (
          <ProfileCard
            {...currentProfile}
            onLike={handleLike}
            onPass={handlePass}
            extraButton={
              <UndoButton onClick={handleUndo} disabled={!canUndo} />
            }
          />
        )}
      </div>
    </div>
  );
};
