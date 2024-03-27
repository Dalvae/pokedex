import React from "react";

interface PokeballPixelProps {
  className?: string;
}
const PokeballPixel: React.FC<PokeballPixelProps> = ({ className }) => {
  return (
    <svg
      width="120"
      height="120"
      viewBox="0 0 120 120"
      fill="none"
      className={className}
      xmlns="http://www.w3.org/2000/svg"
    >
      <g clipPath="url(#clip0_1_2)">
        <rect x="20" y="20" width="80" height="80" fill="white" />
        <path d="M40 100H80V120H40V100Z" fill="black" />
        <rect x="20" y="80" width="20" height="20" fill="black" />
        <rect y="40" width="20" height="40" fill="black" />
        <path d="M40 0H80V20H40V0Z" fill="black" />
        <rect x="100" y="40" width="20" height="40" fill="black" />
        <rect x="80" y="20" width="20" height="20" fill="black" />
        <rect x="20" y="20" width="20" height="20" fill="black" />
        <rect x="80" y="80" width="20" height="20" fill="black" />
        <rect x="20" y="40" width="80" height="20" fill="black" />
        <rect x="60" y="20" width="20" height="20" fill="black" />
      </g>
    </svg>
  );
};

export default PokeballPixel;
