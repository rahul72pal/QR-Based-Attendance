import * as React from "react";
import { cn } from "@/lib/utils";

const CircularProgress = React.forwardRef<
  SVGSVGElement,
  React.ComponentPropsWithoutRef<"svg"> & { value?: number; size?: number; strokeWidth?: number }
>(({ className, value = 0, size = 100, strokeWidth = 8, ...props }, ref) => { // Default strokeWidth set to 8
  const radius = (size - strokeWidth) / 2; // Adjust for stroke width
  const circumference = 2 * Math.PI * radius;
  const progress = Math.min(Math.max(value, 0), 100); // Ensure value is between 0 and 100
  const offset = circumference - (progress / 100) * circumference;

  return (
    <svg
      ref={ref}
      className={cn("circular-progress", className)}
      width={size}
      height={size}
      viewBox={`0 0 ${size} ${size}`}
      {...props}
    >
      {/* Background Circle */}
      <circle
        cx={size / 2}
        cy={size / 2}
        r={radius}
        fill="none"
        stroke="currentColor"
        strokeWidth={strokeWidth}
        className="text-gray-200 dark:text-gray-800"
      />
      {/* Progress Circle */}
      <circle
        cx={size / 2}
        cy={size / 2}
        r={radius}
        fill="none"
        stroke="currentColor"
        strokeWidth={strokeWidth}
        strokeDasharray={circumference}
        strokeDashoffset={offset}
        strokeLinecap="round"
        className="text-[#63cb44] dark:text-gray-50 transition-all"
        style={{
          transform: `rotate(-90deg)`,
          transformOrigin: "50% 50%",
        }}
      />
      {/* Percentage Text */}
      <text
        x="50%"
        y="50%"
        textAnchor="middle"
        dominantBaseline="middle"
        fill="currentColor"
        fontSize="20" // Adjust font size as needed
        className="font-bold"
      >
        {`${progress}%`}
      </text>
    </svg>
  );
});

CircularProgress.displayName = "CircularProgress";

export { CircularProgress };