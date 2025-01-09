import {
  Dialog,
  DialogContent,
} from "@/components/ui/dialog";
import { useState } from "react";
import { ProfileCardMain } from "./ProfileCardMain";
import { ProfileDetails } from "./ProfileDetails";

interface ProfileCardProps {
  name: string;
  age: number;
  distance: string;
  bio: string;
  verified: boolean;
  imageUrl: string;
  images: string[];
  onLike: () => void;
  onPass: () => void;
  preferences?: {
    ageRange?: string;
    lookingFor?: string;
    interests?: string[];
  };
}

export const ProfileCard = ({
  name,
  age,
  distance,
  bio,
  verified,
  imageUrl,
  images,
  onLike,
  onPass,
  preferences,
}: ProfileCardProps) => {
  const [showDetails, setShowDetails] = useState(false);

  return (
    <>
      <ProfileCardMain
        name={name}
        age={age}
        distance={distance}
        bio={bio}
        verified={verified}
        imageUrl={imageUrl}
        onLike={onLike}
        onPass={onPass}
        onClick={() => setShowDetails(true)}
      />

      <Dialog open={showDetails} onOpenChange={setShowDetails}>
        <DialogContent className="sm:max-w-[425px] max-h-[90vh] overflow-y-auto">
          <ProfileDetails
            name={name}
            age={age}
            verified={verified}
            images={images}
            bio={bio}
            distance={distance}
            preferences={preferences}
            onClose={() => setShowDetails(false)}
          />
        </DialogContent>
      </Dialog>
    </>
  );
};