"use client";
import React, { useState, useCallback, useEffect } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "../lib/utils";

export const TeamCarousel = ({
  members,
  title = "Project Showcase",
  titleSize = "2xl",
  titleColor = "rgba(0, 76, 255, 1)",
  background,
  cardWidth = 500,
  cardHeight = 300,
  cardRadius = 20,
  showArrows = true,
  showDots = true,
  keyboardNavigation = true,
  touchNavigation = true,
  animationDuration = 1000,
  autoPlay = 0,
  pauseOnHover = true,
  visibleCards = 2,
  sideCardScale = 0.9,
  sideCardOpacity = 0.8,
  grayscaleEffect = true,
  className,
  cardClassName,
  titleClassName,
  infoPosition = "bottom",
  infoTextColor = "rgb(8, 42, 123)",
  infoBackground = "transparent",
  onMemberChange,
  onCardClick,
  initialIndex = 0,
}) => {
  const [currentIndex, setCurrentIndex] = useState(initialIndex);
  const [direction, setDirection] = useState(0);
  const [touchStart, setTouchStart] = useState(0);
  const [touchEnd, setTouchEnd] = useState(0);

  const totalMembers = members.length;

  /* -------------------------- Responsive -------------------------- */
  const responsiveWidth =
    typeof window !== "undefined"
      ? window.innerWidth < 640
        ? 260
        : window.innerWidth < 1024
        ? 360
        : cardWidth
      : cardWidth;

  const responsiveHeight =
    typeof window !== "undefined"
      ? window.innerWidth < 640
        ? 200
        : window.innerWidth < 1024
        ? 260
        : cardHeight
      : cardHeight;

  /* ---------------------------- Pagination ---------------------------- */
  const paginate = useCallback(
    (newDirection) => {
      if (totalMembers === 0) return;
      setDirection(newDirection);
      const nextIndex =
        (currentIndex + newDirection + totalMembers) % totalMembers;
      setCurrentIndex(nextIndex);
      onMemberChange?.(members[nextIndex], nextIndex);
    },
    [currentIndex, totalMembers]
  );

  const wrapIndex = (index) => (index + totalMembers) % totalMembers;

  const calculatePosition = (index) => {
    const diff = wrapIndex(index - currentIndex);
    if (diff === 0) return "center";
    if (diff <= visibleCards) return `right-${diff}`;
    if (diff >= totalMembers - visibleCards)
      return `left-${totalMembers - diff}`;
    return "hidden";
  };

  

   /* ------------------------------ MOTION STYLES ----------------------------- */
  const getVariantStyles = (position) => {
    const transition = {
      duration: animationDuration / 1000,
      ease: [0.25, 0.46, 0.45, 0.94],
    };

    const w = responsiveWidth;
    const h = responsiveHeight;

    switch (position) {
      case "center":
        return {
          zIndex: 10,
          opacity: 1,
          scale: 1.1,
          x: 0,
          filter: "grayscale(0%)",
          pointerEvents: "auto",
          transition,
        };

      case "right-1":
        return {
          zIndex: 5,
          opacity: sideCardOpacity,
          scale: sideCardScale,
          x: w * 0.7,
          filter: grayscaleEffect ? "grayscale(100%)" : "grayscale(0%)",
          pointerEvents: "auto",
          transition,
        };

      case "right-2":
        return {
          zIndex: 1,
          opacity: sideCardOpacity * 0.7,
          scale: sideCardScale * 0.9,
          x: w * 1.4,
          transition,
        };

      case "left-1":
        return {
          zIndex: 5,
          opacity: sideCardOpacity,
          scale: sideCardScale,
          x: -w * 0.7,
          transition,
        };

      case "left-2":
        return {
          zIndex: 1,
          opacity: sideCardOpacity * 0.7,
          scale: sideCardScale * 0.9,
          x: -w * 1.4,
          transition,
        };

      default:
        return {
          zIndex: 0,
          opacity: 0,
          scale: 0.8,
          x: direction > 0 ? w * (visibleCards + 1) : -w * (visibleCards + 1),
          pointerEvents: "none",
          transition,
        };
    }
  };

  /* -------------------------- Hover Animation (UPDATED) -------------------------- */
const hoverAnimation = {
  width: responsiveWidth - 60,
  height: responsiveHeight + 120,
  transition: { duration: 0.5 },
};




  /* --------------------------- Autoplay --------------------------- */
  useEffect(() => {
    let interval;
    if (autoPlay > 0) interval = setInterval(() => paginate(1), autoPlay);
    return () => clearInterval(interval);
  }, [autoPlay]);

  /* ---------------------------- Touch ---------------------------- */
  const handleTouchStart = (e) => {
    if (!touchNavigation) return;
    setTouchStart(e.targetTouches[0].clientX);
  };
  const handleTouchMove = (e) => {
    if (!touchNavigation) return;
    setTouchEnd(e.targetTouches[0].clientX);
  };
  const handleTouchEnd = () => {
    if (!touchNavigation) return;
    const diff = touchStart - touchEnd;
    if (Math.abs(diff) > 50) paginate(diff > 0 ? 1 : -1);
  };

  

  /* ---------------------------- UI ---------------------------- */
  return (
    <div
      className={cn(
        "min-h-screen flex flex-col items-center justify-center overflow-hidden relative",
        className
      )}
      style={{ background }}
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
    >
      <div
        className="w-full max-w-6xl relative mt-24"
        style={{ height: responsiveHeight + 120 }}
      >
        {/* Arrows */}
        {showArrows && (
          <>
            <button
              onClick={() => paginate(-1)}
              className="absolute left-5 top-1/2 -translate-y-1/2 z-20 bg-black/60 text-white w-10 h-10 rounded-full flex items-center justify-center cursor-pointer"
            >
              <ChevronLeft />
            </button>

            <button
              onClick={() => paginate(1)}
              className="absolute right-5 top-1/2 -translate-y-1/2 z-20 bg-black/60 text-white w-10 h-10 rounded-full flex items-center justify-center cursor-pointer"
            >
              <ChevronRight />
            </button>
          </>
        )}

        {/* Cards */}
        <div className="w-full h-full flex justify-center items-center relative">
          <AnimatePresence initial={false}>
            {members.map((member, index) => {
              const position = calculatePosition(index);
              const isActive = index === currentIndex;
              if (position === "hidden" && !isActive) return null;

              return (
                <motion.div
                  key={member.id}
                  className={cn(
                    "absolute bg-white overflow-hidden shadow-2xl cursor-pointer carousel-card",
                    cardClassName
                  )}
                  style={{
                    width: responsiveWidth,
                    height: responsiveHeight,
                    borderRadius: cardRadius,
                  }}
                  initial={getVariantStyles("hidden")}
                  animate={getVariantStyles(position)}
                  exit={getVariantStyles("hidden")}
                  whileHover={isActive ? hoverAnimation : {}}
                  onClick={() => {
                    if (!isActive) paginate(index > currentIndex ? 1 : -1);
                    onCardClick?.(member, index);
                  }}
                >
                <motion.img
  src={member.image}
  className="w-full h-auto object-cover"
  style={{
    position: "absolute",
    top: 0,
    left: 0,
  }}
  initial={{ y: 0 }}
  animate={{ y: 0 }}
  whileHover={
    isActive
      ? {
          y: (responsiveHeight - (responsiveHeight + 1100)), 
          transition: { duration: 4.5, ease: "easeInOut" },
        }
      : {}
  }
/>



                </motion.div>
              );
            })}
          </AnimatePresence>
        </div>

        {/* Overlay Info */}
                  {infoPosition === "overlay" && (
                    <div
                      className="absolute bottom-0 left-0 right-0 p-4 text-center"
                      style={{
                        background:
                          infoBackground ||
                          "linear-gradient(transparent, rgba(0,0,0,0.8))",
                        color: infoTextColor,
                      }}
                    >
                      <h3 className="font-bold text-white">{members.name}</h3>
                      <p className="opacity-80">{members.role}</p>
                    </div>
                  )}
      </div>
    </div>
  );
};

export default TeamCarousel;
