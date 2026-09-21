import { useSwipe } from "@/hooks/useSwipe";
import { useScroll, useTransform, motion } from "framer-motion";
import { useRef, useState, useEffect } from "react";
import { cn } from "@/lib/utils";
import { X, ChevronLeft, ChevronRight } from "lucide-react";

export const ParallaxScroll = ({
  images,
  className,
}: {
  images: string[];
  className?: string;
}) => {
  const gridRef = useRef<any>(null);
  const { scrollYProgress } = useScroll();

  const translateFirst = useTransform(scrollYProgress, [0, 1], [0, -200]);
  const translateSecond = useTransform(scrollYProgress, [0, 1], [0, 200]);
  const translateThird = useTransform(scrollYProgress, [0, 1], [0, -200]);

  const firstPart = images.filter((_, index) => index % 3 === 0);
  const secondPart = images.filter((_, index) => index % 3 === 1);
  const thirdPart = images.filter((_, index) => index % 3 === 2);

  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);

  const gallerySwipe = useSwipe((direction) => {
    setSelectedIndex((index) => index === null ? null : Math.max(0, Math.min(images.length - 1, index + direction)));
  });

  // Close lightbox on escape key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") setSelectedIndex(null);
      if (e.key === "ArrowLeft" && selectedIndex !== null && selectedIndex > 0) {
        setSelectedIndex(selectedIndex - 1);
      }
      if (e.key === "ArrowRight" && selectedIndex !== null && selectedIndex < images.length - 1) {
        setSelectedIndex(selectedIndex + 1);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [selectedIndex, images.length]);

  return (
    <div
      className={cn("items-start w-full", className)}
      ref={gridRef}
    >
      <div
        className={cn("grid grid-cols-1 items-start w-full gap-4 lg:gap-6 py-12 lg:py-16 px-4 lg:px-8", images.length === 2 ? "md:grid-cols-2" : images.length >= 3 ? "md:grid-cols-3" : "")}
      >
        <div className="grid gap-6">
          {firstPart.map((el, idx) => (
            <motion.div
              style={{ y: translateFirst }} // Apply the translateY motion value here
              key={"grid-1" + idx}
            >
              <img
                src={el}
                onClick={() => setSelectedIndex(idx * 3)}
                className="h-56 lg:h-80 w-full object-cover object-left-top rounded-lg gap-10 !m-0 !p-0 cursor-pointer hover:opacity-90 transition-opacity shadow-sm"
                height="400"
                width="400"
                alt="thumbnail"
              />
            </motion.div>
          ))}
        </div>
        {secondPart.length > 0 && <div className="grid gap-6">
          {secondPart.map((el, idx) => (
            <motion.div style={{ y: translateSecond }} key={"grid-2" + idx}>
              <img
                src={el}
                onClick={() => setSelectedIndex(idx * 3 + 1)}
                className="h-56 lg:h-80 w-full object-cover object-left-top rounded-lg gap-10 !m-0 !p-0 cursor-pointer hover:opacity-90 transition-opacity shadow-sm"
                height="400"
                width="400"
                alt="thumbnail"
              />
            </motion.div>
          ))}
        </div>}
        {thirdPart.length > 0 && <div className="grid gap-6">
          {thirdPart.map((el, idx) => (
            <motion.div style={{ y: translateThird }} key={"grid-3" + idx}>
              <img
                src={el}
                onClick={() => setSelectedIndex(idx * 3 + 2)}
                className="h-56 lg:h-80 w-full object-cover object-left-top rounded-lg gap-10 !m-0 !p-0 cursor-pointer hover:opacity-90 transition-opacity shadow-sm"
                height="400"
                width="400"
                alt="thumbnail"
              />
            </motion.div>
          ))}
        </div>}
      </div>

      {/* Lightbox Modal */}
      {selectedIndex !== null && (
        <div {...gallerySwipe} className="fixed inset-0 z-[100] flex items-center justify-center bg-black/90 backdrop-blur-sm">
          <button
            onClick={() => setSelectedIndex(null)}
            className="absolute top-4 right-4 md:top-8 md:right-8 text-white/70 hover:text-white z-50 p-2"
          >
            <X className="w-8 h-8" />
          </button>
          
          {selectedIndex > 0 && (
            <button
              onClick={(e) => {
                e.stopPropagation();
                setSelectedIndex(selectedIndex - 1);
              }}
              className="absolute left-4 md:left-8 text-white/50 hover:text-white transition-colors z-50 p-2"
            >
              <ChevronLeft className="w-10 h-10 md:w-16 md:h-16" />
            </button>
          )}

          <motion.img
            key={selectedIndex} // Forces re-animation when changing images
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.2 }}
            src={images[selectedIndex]}
            className="max-h-[85vh] max-w-[90vw] object-contain rounded-md shadow-2xl"
            alt={`gallery-image-${selectedIndex}`}
          />

          {selectedIndex < images.length - 1 && (
            <button
              onClick={(e) => {
                e.stopPropagation();
                setSelectedIndex(selectedIndex + 1);
              }}
              className="absolute right-4 md:right-8 text-white/50 hover:text-white transition-colors z-50 p-2"
            >
              <ChevronRight className="w-10 h-10 md:w-16 md:h-16" />
            </button>
          )}
        </div>
      )}
    </div>
  );
};
