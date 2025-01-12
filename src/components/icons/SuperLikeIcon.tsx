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
      {/* First heart (back) */}
      <path
        d="M11.5 7C11.5 7 9 4.5 6.5 4.5C4 4.5 2 6.5 2 9C2 11.5 4 14 11.5 20"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        transform="translate(2 1)"
      />
      <path
        d="M11.5 7C11.5 7 14 4.5 16.5 4.5C19 4.5 21 6.5 21 9C21 11.5 19 14 11.5 20"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        transform="translate(2 1)"
      />
      
      {/* Second heart (front) */}
      <path
        d="M11.5 7C11.5 7 9 4.5 6.5 4.5C4 4.5 2 6.5 2 9C2 11.5 4 14 11.5 20"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M11.5 7C11.5 7 14 4.5 16.5 4.5C19 4.5 21 6.5 21 9C21 11.5 19 14 11.5 20"
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
      />
      <path
        d="M16 8L20 12L16 16"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
};