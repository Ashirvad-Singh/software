"use client";
import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";

export type TeamMember = {
  name: string;
  image: string;
  role?: string;
};

export const HoverMember = ({ teamMembers }: { teamMembers: TeamMember[] }) => {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  return (
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-4 sm:gap-6 md:gap-8 w-full max-w-7xl mx-auto">
      {teamMembers.map((member, idx) => (
        <div
          key={idx}
          className="relative w-full aspect-[4/5] rounded-[2rem] overflow-hidden cursor-pointer group shadow-sm hover:shadow-xl transition-all duration-500"
          onMouseEnter={() => setHoveredIndex(idx)}
          onMouseLeave={() => setHoveredIndex(null)}
          onTouchStart={() => setHoveredIndex(hoveredIndex === idx ? null : idx)}
        >
          {/* Base Image */}
          <img
            src={member.image}
            alt={member.name}
            className="w-full h-full object-cover transition-transform duration-1000 ease-out group-hover:scale-110"
          />

          {/* Gradient Overlay (always visible slightly at bottom for contrast if needed, but here we do full reveal) */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

          {/* Hover Content */}
          <AnimatePresence>
            {hoveredIndex === idx && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.4 }}
                className="absolute inset-0 flex flex-col items-center justify-center p-2 sm:p-4 md:p-6 text-center backdrop-blur-[2px] bg-black/40"
              >
                <div className="overflow-hidden">
                  <motion.h3
                    initial={{ y: "100%" }}
                    animate={{ y: 0 }}
                    exit={{ y: "100%" }}
                    transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                    className="text-lg sm:text-2xl md:text-4xl font-black text-white uppercase tracking-widest mb-1 sm:mb-2"
                  >
                    {member.name}
                  </motion.h3>
                </div>
                
                {member.role && (
                  <div className="overflow-hidden mt-1 sm:mt-2">
                    <motion.div
                      initial={{ y: "100%" }}
                      animate={{ y: 0 }}
                      exit={{ y: "100%" }}
                      transition={{ duration: 0.5, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
                      className="px-2 py-1 sm:px-4 sm:py-2 rounded-full bg-white/20 backdrop-blur-md border border-white/30 text-white text-[10px] sm:text-xs md:text-sm font-medium tracking-wide uppercase"
                    >
                      {member.role}
                    </motion.div>
                  </div>
                )}
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      ))}
    </div>
  );
};
