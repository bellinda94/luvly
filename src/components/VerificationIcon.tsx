
import { CheckCircle, CircleX } from "lucide-react";
import { cn } from "@/lib/utils";

interface VerificationIconProps {
  status: "unverified" | "pending" | "verified";
  className?: string;
}

export const VerificationIcon = ({ status, className }: VerificationIconProps) => {
  if (status === "verified") {
    return <CheckCircle className={cn("w-4 h-4 text-primary", className)} />;
  }
  
  if (status === "pending") {
    return <CheckCircle className={cn("w-4 h-4 text-gray-300", className)} />;
  }
  
  // unverified
  return <CircleX className={cn("w-4 h-4 text-gray-300", className)} />;
};
