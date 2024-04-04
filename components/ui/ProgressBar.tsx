// components/ProgressBar.jsx
import React from "react";

interface ProgressBarProps {
  currentValue: number;
  totalValue: number;
}

export const ProgressBar = ({ currentValue, totalValue }: ProgressBarProps) => {
  const progress = (currentValue / totalValue) * 100;

  return (
    <div className="h-2 w-full bg-gray-200  overflow-hidden">
      <div
        className="h-full bg-black transition-all duration-500"
        style={{ width: `${progress}%` }}
      />
    </div>
  );
};
