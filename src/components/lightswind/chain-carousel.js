import { useState, useEffect, useRef, useCallback, useMemo } from 'react';
import { motion } from 'framer-motion';
import { TrendingUp, Search, DeleteIcon } from 'lucide-react';

// Placeholder Input
const Input = (props) => <input {...props} />;

// Carousel Item Card
const CarouselItemCard = ({ chain, side }) => {
  const { distanceFromCenter, id, name, details, logo, icon: FallbackIcon } = chain;
  const distance = Math.abs(distanceFromCenter);

  const opacity = 1 - distance / 4;
  const scale = 1 - distance * 0.1;
  const yOffset = distanceFromCenter * 90;
  const xOffset = side === 'left' ? -distance * 40 : distance * 40;

  const IconOrLogo = (
    <div className="rounded-full border border-muted-foreground/60 dark:border-muted-foreground/40 p-2 bg-foreground">
      {logo ? (
        <img src={logo} alt={`${name} logo`} className="size-8 rounded-full object-cover" />
      ) : (
        <FallbackIcon className="size-8 text-background" />
      )}
    </div>
  );

  return (
    <motion.div
      key={id}
      className={`absolute flex items-center gap-4 text-background px-6 py-3 
        ${side === 'left' ? 'flex-row-reverse' : 'flex-row'}`}
      animate={{
        opacity,
        scale,
        y: yOffset,
        x: xOffset,
      }}
      transition={{ duration: 0.4, ease: 'easeInOut' }}
    >
      {IconOrLogo}
      <div className={`flex flex-col mx-4 ${side === 'left' ? 'text-right' : 'text-left'}`}>
        <span className="text-md lg:text-lg font-semibold text-foreground whitespace-nowrap">{name}</span>
        <span className="text-xs lg:text-sm text-gray-500">{details}</span>
      </div>
    </motion.div>
  );
};

// Main Component
const ChainCarousel = ({ items, scrollSpeedMs = 3000, visibleItemCount = 9, className = '', onChainSelect }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [showDropdown, setShowDropdown] = useState(false);

  const totalItems = items.length;

  // Auto-scroll
  useEffect(() => {
    if (isPaused || totalItems === 0) return;

    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % totalItems);
    }, scrollSpeedMs);

    return () => clearInterval(interval);
  }, [isPaused, totalItems, scrollSpeedMs]);

  // Visible items
  const getVisibleItems = useCallback(() => {
    const visibleItems = [];
    if (totalItems === 0) return [];

    const itemsToShow = visibleItemCount % 2 === 0 ? visibleItemCount + 1 : visibleItemCount;
    const half = Math.floor(itemsToShow / 2);

    for (let i = -half; i <= half; i++) {
      let index = currentIndex + i;
      if (index < 0) index += totalItems;
      if (index >= totalItems) index -= totalItems;

      visibleItems.push({
        ...items[index],
        originalIndex: index,
        distanceFromCenter: i,
      });
    }
    return visibleItems;
  }, [currentIndex, items, totalItems, visibleItemCount]);

  // Search filter
  const filteredItems = useMemo(
    () => items.filter((item) => item.name.toLowerCase().includes(searchTerm.toLowerCase())),
    [items, searchTerm]
  );

  const handleSelectChain = (id, name) => {
    const index = items.findIndex((c) => c.id === id);
    if (index !== -1) {
      setCurrentIndex(index);
      setIsPaused(true);
      if (onChainSelect) onChainSelect(id, name);
    }
    setSearchTerm(name);
    setShowDropdown(false);
  };

  const currentItem = items[currentIndex];

  return (
    <div id="explore-section" className={`space-y-20 ${className}`}>
      <div className="flex flex-col xl:flex-row max-w-7xl mx-auto px-4 md:px-8 gap-12 justify-center items-center">

        {/* Left Carousel */}
        <motion.div
          className="relative w-full max-w-md xl:max-w-2xl h-[450px] flex items-center justify-center hidden xl:flex -left-14"
          onMouseEnter={() => !searchTerm && setIsPaused(true)}
          onMouseLeave={() => !searchTerm && setIsPaused(false)}
          initial={{ x: '-100%', opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ type: 'spring', stiffness: 80, damping: 20, duration: 0.8 }}
        >
          {getVisibleItems().map((chain) => (
            <CarouselItemCard key={chain.id} chain={chain} side="left" />
          ))}
        </motion.div>

        {/* Middle: Search + Info */}
        <div className="flex flex-col text-center gap-4 max-w-md">
          {currentItem && (
            <div className="flex flex-col items-center justify-center gap-0 mt-4">
              <div className="p-2 bg-foreground rounded-full">
                {currentItem.logo ? (
                  <img src={currentItem.logo} className="size-12 rounded-full object-cover" />
                ) : (
                  <currentItem.icon className="size-8 text-background" />
                )}
              </div>
              <h3 className="text-xl xl:text-2xl font-bold text-foreground mt-2">{currentItem.name}</h3>
              <p className="text-sm xl:text-lg text-gray-400">{currentItem.details}</p>
            </div>
          )}

        
        </div>

        {/* Right Carousel */}
        <motion.div
          className="relative w-full max-w-md xl:max-w-2xl h-[450px] flex items-center justify-center -right-14"
          onMouseEnter={() => !searchTerm && setIsPaused(true)}
          onMouseLeave={() => !searchTerm && setIsPaused(false)}
          initial={{ x: '100%', opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ type: 'spring', stiffness: 80, damping: 20, duration: 0.8 }}
        >
          {getVisibleItems().map((chain) => (
            <CarouselItemCard key={chain.id} chain={chain} side="right" />
          ))}
        </motion.div>

      </div>
    </div>
  );
};

export default ChainCarousel;
