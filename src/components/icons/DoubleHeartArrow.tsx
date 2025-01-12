import { Heart } from "lucide-react";

export const DoubleHeartArrow = ({ className = "" }: { className?: string }) => {
  return (
    <div className={`relative flex items-center ${className}`}>
      <Heart className="w-4 h-4 text-blue-400 absolute -left-1" fill="currentColor" />
      <Heart className="w-4 h-4 text-blue-400 absolute -right-1" fill="currentColor" />
      <div className="w-4 h-0.5 bg-blue-400 rotate-45 absolute left-1/2 -translate-x-1/2" />
    </div>
  );
};