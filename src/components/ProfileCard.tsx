import { CheckCircle, MessageCircle, Heart, X, RotateCcw, Info } from "lucide-react";
import { cn } from "@/lib/utils";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { useState } from "react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";

interface ExtraButtonProps {
  onClick?: (e: React.MouseEvent) => void;
  disabled?: boolean;
  title?: string;
  children?: React.ReactNode;
}

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
  extraButton?: React.ReactElement<ExtraButtonProps>;
  preferences?: {
    ageRange?: string;
    lookingFor?: string;
    interests?: string[];
  };
  recentlyActive?: boolean;
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
  extraButton,
  preferences,
  recentlyActive = true,
}: ProfileCardProps) => {
  const [showDetails, setShowDetails] = useState(false);

  return (
    <>
      <div 
        className="relative w-full h-full rounded-none sm:rounded-2xl overflow-hidden shadow-lg animate-fade-in cursor-pointer hover:shadow-xl transition-shadow"
        onClick={() => setShowDetails(true)}
      >
        <div className="relative w-full h-full">
          <img
            src={imageUrl}
            alt={name}
            className="w-full h-full object-cover"
            loading="lazy"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
          
          {verified && (
            <div className="absolute top-4 right-4 bg-white/90 p-1 rounded-full">
              <CheckCircle className="w-5 h-5 text-primary" />
            </div>
          )}
          
          <div className="absolute bottom-24 left-0 right-0 p-6 text-white">
            {recentlyActive && (
              <span className="inline-block px-3 py-1 bg-green-500/20 text-white rounded-full text-sm mb-4">
                Kürzlich aktiv
              </span>
            )}
            
            <div className="flex items-center gap-2 mb-2">
              <h3 className="text-2xl font-semibold">{name}, {age}</h3>
              <button 
                onClick={(e) => {
                  e.stopPropagation();
                  setShowDetails(true);
                }}
                className="p-1 rounded-full bg-white/10 hover:bg-white/20"
              >
                <Info className="w-5 h-5" />
              </button>
            </div>
            
            {preferences?.interests && (
              <div className="flex flex-wrap gap-2 mb-4">
                {preferences.interests.map((interest, index) => (
                  <span
                    key={index}
                    className={cn(
                      "px-4 py-1 rounded-full text-sm font-medium",
                      index === 0 ? "bg-primary text-white" : "bg-gray-700/50 text-white"
                    )}
                  >
                    {interest}
                  </span>
                ))}
              </div>
            )}
            
            <p className="text-sm text-white/90 mb-2">{distance} away</p>
            <p className="text-sm text-white/80">{bio}</p>
          </div>
        </div>
        
        <div className="absolute bottom-0 left-0 right-0 flex items-center justify-center gap-4 p-4 bg-gradient-to-t from-black/80 to-transparent">
          <div className="flex items-center justify-center gap-4">
            {extraButton && (
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  if (extraButton.props.onClick) {
                    extraButton.props.onClick(e);
                  }
                }}
                className="h-14 w-14 flex items-center justify-center rounded-full bg-white hover:bg-white/90 transition-colors"
                disabled={extraButton.props.disabled}
                title={extraButton.props.title}
              >
                {extraButton.props.children}
              </button>
            )}
            <button
              onClick={(e) => {
                e.stopPropagation();
                onPass();
              }}
              className="h-14 w-14 flex items-center justify-center rounded-full bg-white hover:bg-white/90 transition-colors"
            >
              <X className="w-6 h-6 text-gray-500" />
            </button>
            <button
              onClick={(e) => {
                e.stopPropagation();
                onLike();
              }}
              className="h-14 w-14 flex items-center justify-center rounded-full bg-white hover:bg-white/90 transition-colors"
            >
              <Heart className="w-6 h-6 text-green-500" />
            </button>
          </div>
        </div>
      </div>

      <Dialog open={showDetails} onOpenChange={setShowDetails}>
        <DialogContent className="sm:max-w-[425px] w-[95vw] max-h-[90vh] overflow-y-auto rounded-lg sm:rounded-lg pt-4">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              {name}, {age}
              {verified && <CheckCircle className="w-5 h-5 text-primary" />}
            </DialogTitle>
          </DialogHeader>
          
          <Carousel className="w-full max-w-[300px] mx-auto" opts={{ loop: true }}>
            <CarouselContent>
              {images.map((image, index) => (
                <CarouselItem key={index}>
                  <div className="aspect-[3/4] w-full min-h-[250px] h-[60vh]">
                    <img
                      src={image}
                      alt={`${name} ${index + 1}`}
                      className="w-full h-full object-cover rounded-lg"
                    />
                  </div>
                </CarouselItem>
              ))}
            </CarouselContent>
            <CarouselPrevious />
            <CarouselNext />
          </Carousel>

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
        </DialogContent>
      </Dialog>
    </>
  );
};