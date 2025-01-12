import { CheckCircle, MessageCircle, Heart, X, RotateCcw, Star, Send, Share2, Shield, AlertTriangle } from "lucide-react";
import { SuperLikeIcon } from "./icons/SuperLikeIcon";
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
import { Button } from "./ui/button";
import { toast } from "sonner";
import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { Textarea } from "@/components/ui/textarea";

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
}: ProfileCardProps) => {
  const [showDetails, setShowDetails] = useState(false);
  const [showSuperLikeDialog, setShowSuperLikeDialog] = useState(false);
  const [showMessageDialog, setShowMessageDialog] = useState(false);
  const [superLikeMessage, setSuperLikeMessage] = useState("");
  const [directMessage, setDirectMessage] = useState("");

  const handleSuperLike = (e: React.MouseEvent) => {
    e.stopPropagation();
    setShowSuperLikeDialog(true);
  };

  const handleSendSuperLike = () => {
    toast.success("Super-Like gesendet! 🌟");
    // Here you would typically handle the chat creation
    toast.success("Chat wurde erstellt");
    setShowSuperLikeDialog(false);
    setSuperLikeMessage("");
  };

  const handleDirectMessage = (e: React.MouseEvent) => {
    e.stopPropagation();
    setShowMessageDialog(true);
  };

  const handleSendDirectMessage = () => {
    if (directMessage.trim()) {
      toast.success("Nachricht gesendet!");
      // Here you would typically handle the message sending
      toast.success("Chat wurde erstellt");
      setShowMessageDialog(false);
      setDirectMessage("");
    }
  };

  const handleShare = () => {
    toast.success("Profil wurde geteilt");
    setShowDetails(false);
  };

  const handleBlock = () => {
    toast.success(`${name} wurde blockiert`);
    setShowDetails(false);
  };

  const handleReport = () => {
    toast.success("Profil wurde gemeldet");
    setShowDetails(false);
  };

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
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
          
          {verified && (
            <div className="absolute top-4 right-4 bg-white/90 p-1 rounded-full">
              <CheckCircle className="w-5 h-5 text-primary" />
            </div>
          )}
          
          <div className="absolute bottom-16 left-0 right-0 p-6 text-white">
            <div className="flex items-center gap-2 mb-2">
              <h3 className="text-2xl font-semibold">{name}, {age}</h3>
            </div>
            <p className="text-sm text-white/90 mb-2">{distance} away</p>
            <p className="text-sm text-white/80 mb-3">{bio}</p>
            {preferences?.interests && (
              <div className="flex flex-wrap gap-2">
                {preferences.interests.map((interest, index) => (
                  <span
                    key={index}
                    className="px-3 py-1 bg-white/20 backdrop-blur-sm rounded-full text-xs font-medium text-white"
                  >
                    {interest}
                  </span>
                ))}
              </div>
            )}
          </div>
        </div>
        
        <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black via-black/80 to-transparent">
          <div className="flex justify-center items-center gap-4">
            <div className="ml-2">
              {extraButton && (
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    if (extraButton.props.onClick) {
                      extraButton.props.onClick(e);
                    }
                  }}
                  className="h-14 w-14 flex items-center justify-center rounded-full bg-white/10 hover:bg-white/20 transition-colors"
                  disabled={extraButton.props.disabled}
                  title={extraButton.props.title}
                >
                  {extraButton.props.children}
                </button>
              )}
            </div>
            <button
              onClick={(e) => {
                e.stopPropagation();
                onPass();
              }}
              className="h-14 w-14 flex items-center justify-center rounded-full bg-white/10 hover:bg-white/20 transition-colors"
            >
              <X className="w-6 h-6 text-white" />
            </button>
            <button
              onClick={handleSuperLike}
              className="h-14 w-14 flex items-center justify-center rounded-full bg-white/10 hover:bg-white/20 transition-colors"
            >
              <SuperLikeIcon className="w-6 h-6 text-blue-400" />
            </button>
            <button
              onClick={(e) => {
                e.stopPropagation();
                onLike();
              }}
              className="h-14 w-14 flex items-center justify-center rounded-full bg-primary hover:bg-primary/90 transition-colors"
            >
              <Heart className="w-6 h-6 text-white" />
            </button>
            <button
              onClick={handleDirectMessage}
              className="h-14 w-14 flex items-center justify-center rounded-full bg-white/10 hover:bg-white/20 transition-colors"
            >
              <Send className="w-6 h-6 text-white" />
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

            <div className="space-y-2 pt-4 border-t">
              <Button 
                variant="ghost" 
                className="w-full justify-start" 
                onClick={handleDirectMessage}
              >
                <MessageCircle className="mr-2 h-4 w-4" />
                {name} eine Nachricht schreiben
              </Button>
              <Button 
                variant="ghost" 
                className="w-full justify-start" 
                onClick={handleShare}
              >
                <Share2 className="mr-2 h-4 w-4" />
                {name}s Profil teilen
              </Button>
              <Button 
                variant="ghost" 
                className="w-full justify-start" 
                onClick={handleBlock}
              >
                <Shield className="mr-2 h-4 w-4" />
                {name} blockieren
              </Button>
              <Button 
                variant="ghost" 
                className="w-full justify-start text-destructive" 
                onClick={handleReport}
              >
                <AlertTriangle className="mr-2 h-4 w-4" />
                {name} melden
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      <AlertDialog open={showSuperLikeDialog} onOpenChange={setShowSuperLikeDialog}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Super-Like an {name} senden</AlertDialogTitle>
            <AlertDialogDescription>
              Schreibe {name} eine persönliche Nachricht. Der Chat wird automatisch erstellt.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <div className="py-4">
            <Textarea
              value={superLikeMessage}
              onChange={(e) => setSuperLikeMessage(e.target.value)}
              placeholder={`Schreibe ${name} eine Nachricht...`}
              className="min-h-[100px]"
            />
          </div>
          <AlertDialogFooter>
            <Button variant="outline" onClick={() => setShowSuperLikeDialog(false)}>
              Abbrechen
            </Button>
            <Button onClick={handleSendSuperLike}>
              Super-Like senden
            </Button>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

      <AlertDialog open={showMessageDialog} onOpenChange={setShowMessageDialog}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Nachricht an {name}</AlertDialogTitle>
            <AlertDialogDescription>
              Schreibe {name} eine Nachricht. Ein Chat wird automatisch erstellt.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <div className="py-4">
            <Textarea
              value={directMessage}
              onChange={(e) => setDirectMessage(e.target.value)}
              placeholder={`Schreibe ${name} eine Nachricht...`}
              className="min-h-[100px]"
            />
          </div>
          <AlertDialogFooter>
            <Button variant="outline" onClick={() => setShowMessageDialog(false)}>
              Abbrechen
            </Button>
            <Button onClick={handleSendDirectMessage}>
              Nachricht senden
            </Button>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
};
