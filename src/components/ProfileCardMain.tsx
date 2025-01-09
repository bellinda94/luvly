import { CheckCircle, Heart, X } from "lucide-react";

interface ProfileCardMainProps {
  name: string;
  age: number;
  distance: string;
  bio: string;
  verified: boolean;
  imageUrl: string;
  onLike: () => void;
  onPass: () => void;
  onClick: () => void;
}

export const ProfileCardMain = ({
  name,
  age,
  distance,
  bio,
  verified,
  imageUrl,
  onLike,
  onPass,
  onClick,
}: ProfileCardMainProps) => {
  return (
    <div 
      className="relative w-full max-w-sm mx-auto rounded-2xl overflow-hidden shadow-lg animate-fade-in cursor-pointer hover:shadow-xl transition-shadow"
      onClick={onClick}
    >
      <div className="relative aspect-[3/4]">
        <img
          src={imageUrl}
          alt={name}
          className="w-full h-full object-cover"
          loading="lazy"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
        
        {verified && (
          <div className="absolute top-4 right-4 bg-white/90 p-1 rounded-full">
            <CheckCircle className="w-5 h-5 text-primary" />
          </div>
        )}
        
        <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
          <div className="flex items-center gap-2 mb-2">
            <h3 className="text-2xl font-semibold">{name}, {age}</h3>
          </div>
          <p className="text-sm text-white/90 mb-2">{distance} away</p>
          <p className="text-sm text-white/80">{bio}</p>
        </div>
      </div>
      
      <div className="flex justify-center gap-4 p-4 bg-white">
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
    </div>
  );
};