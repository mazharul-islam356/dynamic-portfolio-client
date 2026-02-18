"use client";
import { useRef, useState, useEffect } from "react";
import useThreeSlider from "./useThreeSlider";
import LoadingScreen from "../Loader";

export default function CanvasSlider() {
  const canvasRef = useRef(null);
  const [isLoading, setLoading] = useState(true);
  const [progress, setProgress] = useState(0);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 768);
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);

  useThreeSlider(canvasRef, isMobile, setProgress, setLoading);

  return (
    <>
      {isLoading && <LoadingScreen progress={progress} />}
      <canvas ref={canvasRef} className="absolute inset-0 z-10" />
    </>
  );
}
