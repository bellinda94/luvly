import { cn } from "@/lib/utils";

interface DoubleHeartIconProps extends React.SVGProps<SVGSVGElement> {
  className?: string;
}

export const DoubleHeartIcon = ({ className, ...props }: DoubleHeartIconProps) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      className={cn("w-6 h-6", className)}
      {...props}
    >
      <path
        d="M14 3C9 3 7 8 7 8s-2-5-7-5c0 5.185 7 11 7 11s7-5.815 7-11"
        fill="#FFDEE2"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
        transform="translate(3.5, 4) scale(0.8)"
      />
      <path
        d="M14 3C9 3 7 8 7 8s-2-5-7-5c0 5.185 7 11 7 11s7-5.815 7-11"
        fill="#FDE1D3"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
        transform="translate(6, 2)"
      />
    </svg>
  );
};