import { useState } from "react";
import { ProfileCard } from "./ProfileCard";
import { toast } from "sonner";

const mockProfiles = [
  {
    id: 1,
    name: "Sarah",
    age: 28,
    distance: "3 km",
    bio: "Adventure seeker & coffee enthusiast",
    verified: true,
    imageUrl: "https://images.unsplash.com/photo-1494790108377-be9c29b29330",
  },
  {
    id: 2,
    name: "Michael",
    age: 31,
    distance: "5 km",
    bio: "Photography & hiking",
    verified: false,
    imageUrl: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e",
  },
];

export const SwipeInterface = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const handleLike = () => {
    toast.success("Liked! 💖");
    setCurrentIndex((prev) => Math.min(prev + 1, mockProfiles.length - 1));
  };

  const handlePass = () => {
    setCurrentIndex((prev) => Math.min(prev + 1, mockProfiles.length - 1));
  };

  const currentProfile = mockProfiles[currentIndex];

  return (
    <div className="w-full max-w-screen-xl mx-auto px-4 py-8">
      <div className="max-w-sm mx-auto">
        {currentProfile && (
          <ProfileCard
            {...currentProfile}
            onLike={handleLike}
            onPass={handlePass}
          />
        )}
      </div>
    </div>
  );
};