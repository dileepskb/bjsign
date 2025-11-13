'use client';

import React from "react";

interface TooltipProps {
  text: string;
  children: React.ReactNode;
  position?: "top" | "bottom" | "left" | "right";
}

export const Tooltip: React.FC<TooltipProps> = ({ text, children, position = "top" }) => {
  return (
    <div className="relative  group">
      {children}
      <span
        className={`
          absolute z-10 hidden group-hover:block whitespace-nowrap rounded-md bg-gray-800 text-white text-xs px-2 py-1
          ${position === "top" && "bottom-full left-1/2 -translate-x-1/2 mb-2"}
          ${position === "bottom" && "top-full left-1/2 -translate-x-1/2 mt-2"}
          ${position === "left" && "right-full top-1/2 -translate-y-1/2 mr-2"}
          ${position === "right" && "left-full top-1/2 -translate-y-1/2 ml-2"}
        `}
      >
        {text}
      </span>
    </div>
  );
};
