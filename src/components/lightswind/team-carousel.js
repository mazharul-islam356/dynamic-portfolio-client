"use client";
import React, { useState, useCallback, useEffect, useMemo } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "../lib/utils";
import ShinyTitle from "@/components/ShinyTitle";
import Link from "next/link";

export const TeamCarousel = ({
  members,
  title = "Project Showcase",
  titleSize = "xl",
  titleColor = "white",
  background,
  cardWidth = 500,
  cardHeight = 300,
  cardRadius = 20,
  showArrows = true,
  showDots = true, // currently not used but kept for API
  keyboardNavigation = true,
  touchNavigation = true,
  animationDuration = 1000,
  autoPlay = 0, // ms, 0 = no autoplay
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
  const [isHovered, setIsHovered] = useState(false);

  const totalMembers = members.length;

  /* -------------------------- Responsive sizing -------------------------- */
  const [cardSize, setCardSize] = useState({
    width: cardWidth,
    height: cardHeight,
  });

  useEffect(() => {
    const updateSize = () => {
      if (typeof window === "undefined") return;

      const w = window.innerWidth;

      if (w < 640) {
        setCardSize({ width: 260, height: 200 });
      } else if (w < 1024) {
        setCardSize({ width: 360, height: 260 });
      } else {
        setCardSize({ width: cardWidth, height: cardHeight });
      }
    };

    updateSize();
    window.addEventListener("resize", updateSize);
    return () => window.removeEventListener("resize", updateSize);
  }, [cardWidth, cardHeight]);

  const responsiveWidth = cardSize.width;
  const responsiveHeight = cardSize.height;

  /* --------------------------------------------------
   *  প্রতিটি ইমেজের জন্য স্কেল করা height সেভ করে রাখব
   * -------------------------------------------------- */
  // index => scaled image height
  const [imageHeights, setImageHeights] = useState({});

  // ইমেজ লোড হলে তার natural size নিয়ে কার্ড width অনুযায়ী scale করব
  const handleImageLoad = (index, e) => {
    const img = e.currentTarget;

    const naturalWidth = img.naturalWidth;
    const naturalHeight = img.naturalHeight;

    if (!naturalWidth || !naturalHeight) return;

    // ইমেজকে কার্ড width অনুযায়ী fit করি (object-cover এর মত)
    const scale = responsiveWidth / naturalWidth;
    const scaledHeight = naturalHeight * scale;

    // আমরা আসল height-এর থেকেও কিছুটা বাড়িয়ে দিতে চাই (যদি full pan extra smooth চাই)
    // তবে তোমার চাহিদা অনুযায়ী "পুরো আসল ইমেজ" যেন টপ থেকে বটম পর্যন্ত যায়, তাই অতিরিক্ত scale করলাম না।
    setImageHeights((prev) => ({
      ...prev,
      [index]: scaledHeight,
    }));
  };

  /* ---------------------------- Pagination ---------------------------- */
  const paginate = useCallback(
    (newDirection) => {
      if (totalMembers === 0) return;
      setDirection(newDirection);
      setCurrentIndex((prevIndex) => {
        const nextIndex =
          (prevIndex + newDirection + totalMembers) % totalMembers;
        const nextMember = members[nextIndex];
        onMemberChange?.(nextMember, nextIndex);
        return nextIndex;
      });
    },
    [totalMembers, members, onMemberChange],
  );

  const wrapIndex = useCallback(
    (index) => (index + totalMembers) % totalMembers,
    [totalMembers],
  );

  const calculatePosition = useCallback(
    (index) => {
      const diff = wrapIndex(index - currentIndex);
      if (diff === 0) return "center";
      if (diff <= visibleCards) return `right-${diff}`;
      if (diff >= totalMembers - visibleCards)
        return `left-${totalMembers - diff}`;
      return "hidden";
    },
    [currentIndex, totalMembers, visibleCards, wrapIndex],
  );

  /* ------------------------------ MOTION STYLES ----------------------------- */
  const getVariantStyles = useCallback(
    (position) => {
      const transition = {
        duration: animationDuration / 1000,
        ease: [0.25, 0.46, 0.45, 0.94],
      };

      const w = responsiveWidth;

      switch (position) {
        case "center":
          return {
            zIndex: 10,
            opacity: 1,
            scale: 1.05,
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
            filter: grayscaleEffect ? "grayscale(100%)" : "grayscale(0%)",
            transition,
          };

        case "left-1":
          return {
            zIndex: 5,
            opacity: sideCardOpacity,
            scale: sideCardScale,
            x: -w * 0.7,
            filter: grayscaleEffect ? "grayscale(100%)" : "grayscale(0%)",
            pointerEvents: "auto",
            transition,
          };

        case "left-2":
          return {
            zIndex: 1,
            opacity: sideCardOpacity * 0.7,
            scale: sideCardScale * 0.9,
            x: -w * 1.4,
            filter: grayscaleEffect ? "grayscale(100%)" : "grayscale(0%)",
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
    },
    [
      animationDuration,
      responsiveWidth,
      direction,
      visibleCards,
      sideCardOpacity,
      sideCardScale,
      grayscaleEffect,
    ],
  );

  /* -------------------------- Card hover animation (card scale) -------------------------- */
  const hoverAnimation = {
    scale: 1.03,
    transition: { duration: 0.35, ease: "easeOut" },
  };

  /* --------------------------- Autoplay --------------------------- */
  useEffect(() => {
    if (autoPlay <= 0 || totalMembers <= 1 || isHovered) return;

    const interval = setInterval(() => {
      paginate(1);
    }, autoPlay);

    return () => clearInterval(interval);
  }, [autoPlay, totalMembers, paginate, isHovered]);

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

  /* ---------------------------- Keyboard ---------------------------- */
  const handleKeyDown = (e) => {
    if (!keyboardNavigation) return;
    if (e.key === "ArrowLeft") paginate(-1);
    if (e.key === "ArrowRight") paginate(1);
  };

  const titleSizeClasses = {
    md: "text-2xl",
    lg: "text-4xl",
    xl: "text-5xl",
  };

  /* ---------------------------- UI ---------------------------- */
  return (
    <div
      className={cn(
        "md:min-h-screen min-h-[75vh] flex flex-col items-center justify-center overflow-hidden relative",
        className,
      )}
      style={{ background }}
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
      onMouseEnter={pauseOnHover ? () => setIsHovered(true) : undefined}
      onMouseLeave={pauseOnHover ? () => setIsHovered(false) : undefined}
      onKeyDown={handleKeyDown}
      tabIndex={keyboardNavigation ? 0 : -1}
    >
      {title && (
        <h2
          className={cn(
            "font-black hero-font uppercase tracking-tight absolute left-1/2 -translate-x-1/2 whitespace-nowrap z-10 md: text-4xl lg:text-4xl xl:text-5xl",

            titleClassName,
          )}
          style={{
            top: "4rem",
            color: titleColor,
          }}
        >
          <ShinyTitle
            text={title}
            disabled={false}
            speed={3}
            className="custom-class"
          />
        </h2>
      )}

      <div
        className="w-full max-w-6xl relative"
        style={{ height: responsiveHeight + 120 }}
      >
        {/* Arrows */}
        {showArrows && totalMembers > 1 && (
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

              // এই ইমেজের জন্য scaled height (লোড হলে সেট হবে)
              const imgHeight = imageHeights[index];

              // verticalPan নির্ভর করবে imgHeight-এর ওপর
              // না লোড হওয়া পর্যন্ত 0 রাখছি যাতে jump না হয়
              const verticalPan =
                imgHeight && imgHeight > responsiveHeight
                  ? responsiveHeight - imgHeight // top -> bottom পুরো
                  : 0; // যদি height না পাওয়া যায় বা ছোট হয়, তাহলে মুভ করবে না

              return (
                <motion.div
                  key={member.id ?? index}
                  className={cn(
                    "absolute bg-white overflow-hidden shadow-2xl cursor-pointer carousel-card",
                    cardClassName,
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
                  {/* ইমেজ: ডিফল্টে টপ অংশ, hover এ top → bottom পুরো ইমেজ */}
                  <motion.img
                    src={member.image}
                    alt={member.name ?? "Project image"}
                    className="w-full object-cover"
                    style={{
                      position: "absolute",
                      top: 0,
                      left: 0,
                    }}
                    // ইমেজ লোড হলে আসল size নিয়ে scaledHeight ক্যালকুলেট করছি
                    onLoad={(e) => handleImageLoad(index, e)}
                    initial={{ y: 0 }} // সবসময় টপ থেকে শুরু
                    animate={{ y: 0 }} // নরমাল অবস্থায় টপ
                    whileHover={
                      isActive && verticalPan !== 0
                        ? {
                            y: verticalPan,
                            transition: {
                              duration: 4.5,
                              ease: "easeInOut",
                            },
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
        {infoPosition === "bottom" && members[currentIndex] && (
          <motion.div
            key={members[currentIndex].id + "-info"}
            initial={{ opacity: 0, y: 30, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -20, scale: 0.9 }}
            transition={{ duration: 0.4, ease: "easeOut" }}
            className="md:mt-12 flex justify-center"
          >
            <div className="flex items-center gap-4 bg-white/5 backdrop-blur-lg border border-white/10 rounded-full pl-6 pr-2 py-2">
              {/* Animated dot */}
              <span className="relative flex h-3 w-3">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-3 w-3 bg-green-500"></span>
              </span>

              {/* Project Name */}
              {members[currentIndex].name && (
                <h2 className="text-lg font-medium text-white">
                  {members[currentIndex].name}
                </h2>
              )}

              {/* Divider */}
              <div className="w-px h-6 bg-white/20" />

              {/* Live URL Button */}
              {members[currentIndex].liveUrl && (
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Link
                    href={members[currentIndex].liveUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 px-5 py-2.5 rounded-full bg.white text-black font-semibold text-sm bg-gray-100 transition-colors"
                  >
                    <span>View Project</span>
                    <svg
                      className="w-4 h-4"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
                      />
                    </svg>
                  </Link>
                </motion.div>
              )}
            </div>
          </motion.div>
        )}
      </div>
    </div>
  );
};

export default TeamCarousel;
