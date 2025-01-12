import React from "react";

export const SuperLikeIcon = ({ className = "", size = 24 }: { className?: string; size?: number }) => {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      {/* Back heart */}
      <path
        d="M12 6C12 6 9.5 3.5 7 3.5C4.5 3.5 2.5 5.5 2.5 8C2.5 10.5 4.5 13 12 19"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        transform="translate(2 2)"
      />
      <path
        d="M12 6C12 6 14.5 3.5 17 3.5C19.5 3.5 21.5 5.5 21.5 8C21.5 10.5 19.5 13 12 19"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        transform="translate(2 2)"
      />

      {/* Front heart */}
      <path
        d="M12 6C12 6 9.5 3.5 7 3.5C4.5 3.5 2.5 5.5 2.5 8C2.5 10.5 4.5 13 12 19"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M12 6C12 6 14.5 3.5 17 3.5C19.5 3.5 21.5 5.5 21.5 8C21.5 10.5 19.5 13 12 19"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />

      {/* Arrow */}
      <line
        x1="4"
        y1="12"
        x2="20"
        y2="12"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        transform="rotate(-45, 12, 12)"
      />
      <path
        d="M16 8L20 12L16 16"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        transform="rotate(-45, 12, 12) translate(2, 0)"
      />
    </svg>
  );
};