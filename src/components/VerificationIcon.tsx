import { CheckCircle, CircleX } from "lucide-react";
import { cn } from "@/lib/utils";

interface VerificationIconProps {
  status: boolean | "pending";
  className?: string;
}

export const VerificationIcon = ({ status, className }: VerificationIconProps) => {
  if (status === true) {
    // Verified: Colored CheckCircle
    return <CheckCircle className={cn("w-4 h-4 text-primary", className)} />;
  }
  
  if (status === "pending") {
    // Pending: Gray CheckCircle
    return <CheckCircle className={cn("w-4 h-4 text-gray-300", className)} />;
  }
  
  // Unverified (false): Gray CircleX
  return <CircleX className={cn("w-4 h-4 text-gray-300", className)} />;
};
