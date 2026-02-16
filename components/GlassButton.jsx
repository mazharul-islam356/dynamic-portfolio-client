"use client";
import { useState } from "react";

export default function GlassButtonDemo() {
  const [reflectionColor, setReflectionColor] = useState("#B4F0E6");
  const [reflectionOpacity, setReflectionOpacity] = useState(0.15);
  const [shadowBlur, setShadowBlur] = useState(2);

  const rgba = () => {
    const r = parseInt(reflectionColor.substring(1, 3), 16);
    const g = parseInt(reflectionColor.substring(3, 5), 16);
    const b = parseInt(reflectionColor.substring(5, 7), 16);
    return `rgba(${r}, ${g}, ${b}, ${reflectionOpacity})`;
  };

  return (
    <div className="w-full flex items-center justify-center text-white overflow-hidden relative font-inter mt-5">
      {/* GRID BACKGROUND */}
      <svg className="absolute inset-0 w-full h-full z-0">
        <defs>
          <pattern
            id="dottedGrid"
            width="30"
            height="30"
            patternUnits="userSpaceOnUse"
          >
            <circle cx="2" cy="2" r="1" fill="rgba(0,0,0,0.15)" />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#dottedGrid)" />
      </svg>

      <div className="flex gap-10 items-center">
        {/* BUTTON WRAP */}
        <div className="relative">
          {/* MAIN BUTTON */}
          <button
            className="relative select-none md:px-10 px-7 py-1.5 md:py-2 rounded-full cursor-pointer backdrop-blur-sm bg-white/10 shadow-[inset_0_2px_4px_rgba(0,0,0,0.05),inset_0_-2px_4px_rgba(255,255,255,0.5),0_4px_2px_-2px_rgba(0,0,0,0.2)] transition-transform duration-300"
            style={{}}
          >
            {/* REFLECTION */}
            <span
              className="absolute inset-0 rounded-full pointer-events-none"
              style={{
                background: `linear-gradient(135deg, ${rgba()}, transparent)`,
              }}
            />
            <span className="relative font-medium text-gray-100 tracking-tight md:text-base text-sm drop-shadow-sm poppins">
              Explore Now
            </span>
          </button>
        </div>

        {/* CONTROLS */}
      </div>
    </div>
  );
}
