import { CheckCircle, X } from "lucide-react";
import { ProfileGallery } from "./ProfileGallery";

interface ProfileDetailsProps {
  name: string;
  age: number;
  verified: boolean;
  images: string[];
  bio: string;
  distance: string;
  preferences?: {
    ageRange?: string;
    lookingFor?: string;
    interests?: string[];
  };
  onClose: () => void;
}

export const ProfileDetails = ({
  name,
  age,
  verified,
  images,
  bio,
  distance,
  preferences,
  onClose,
}: ProfileDetailsProps) => {
  return (
    <>
      <div className="relative pr-6">
        <div className="flex items-center gap-2">
          <h2 className="text-lg font-semibold">
            {name}, {age}
            {verified && <CheckCircle className="w-5 h-5 text-primary" />}
          </h2>
        </div>
        <button
          onClick={onClose}
          className="absolute right-0 top-0 p-2 rounded-full hover:bg-muted/50 transition-colors"
          aria-label="Close dialog"
        >
          <X className="h-4 w-4" />
        </button>
      </div>

      <ProfileGallery images={images} name={name} />

      <div className="grid gap-4 py-4">
        <div className="space-y-2">
          <h4 className="font-medium text-primary">Über mich</h4>
          <p className="text-sm text-gray-600">{bio}</p>
        </div>
        {preferences && (
          <div className="space-y-2">
            <h4 className="font-medium text-primary">Präferenzen</h4>
            <div className="text-sm text-gray-600 space-y-1">
              {preferences.ageRange && (
                <p>Altersbereich: {preferences.ageRange}</p>
              )}
              {preferences.lookingFor && (
                <p>Sucht nach: {preferences.lookingFor}</p>
              )}
              {preferences.interests && (
                <div>
                  <p className="mb-1">Interessen:</p>
                  <div className="flex flex-wrap gap-2">
                    {preferences.interests.map((interest, index) => (
                      <span
                        key={index}
                        className="px-2 py-1 bg-secondary rounded-full text-xs"
                      >
                        {interest}
                      </span>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        )}
        <p className="text-sm text-gray-500">{distance} entfernt</p>
      </div>
    </>
  );
};