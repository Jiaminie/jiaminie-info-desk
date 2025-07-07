import React from "react";

interface ShukaPatternProps {
  className: string;
}
const ShukaPattern: React.FC<ShukaPatternProps> = ({ className }) => (
  <div className={`${className} opacity-90`}>
    <div className="grid grid-cols-8 gap-0 h-full">
      {Array.from({ length: 64 }, (_, i) => (
        <div
          key={i}
          className={`aspect-square ${
            (Math.floor(i / 8) + i) % 2 === 0 ? "bg-red-500" : "bg-black"
          }`}
        />
      ))}
    </div>
  </div>
);

export default ShukaPattern;
