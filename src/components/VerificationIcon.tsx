import { CheckCircle, CircleX } from "lucide-react";
import { cn } from "@/lib/utils";

interface VerificationIconProps {
  status: boolean | "pending";
  className?: string;
}

export const VerificationIcon = ({ status, className }: VerificationIconProps) => {
  if (status === "pending") {
    return <CircleX className={cn("w-4 h-4 text-gray-300", className)} />;
  }
  return (
    <CheckCircle 
      className={cn(
        "w-4 h-4",
        status ? "text-primary" : "text-gray-300",
        className
      )} 
    />
  );
};
