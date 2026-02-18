"use client";

import { useEffect, useRef, useState } from "react";
import { useCarouselScene } from "./carouselScene";

const CarouselCanvas = ({ imagePaths, onProgressChange, onLoaded }) => {
  const canvasRef = useRef(null);
  const [isMobile, setIsMobile] = useState(false);

  // Track mobile only here
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };

    checkMobile();
    window.addEventListener("resize", checkMobile);

    return () => {
      window.removeEventListener("resize", checkMobile);
    };
  }, []);

  useCarouselScene({
    canvasRef,
    imagePaths,
    isMobile,
    onProgress: onProgressChange,
    onLoaded,
  });

  return (
    <canvas
      ref={canvasRef}
      className="absolute md:top-14 top-10 inset-0 z-10 webgl"
    />
  );
};

export default CarouselCanvas;
