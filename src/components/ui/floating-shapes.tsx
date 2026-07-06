"use client";
import { motion } from "framer-motion";

export function FloatingShapes() {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none z-0">
      {/* Blue Circle */}
      <motion.div
        animate={{
          y: [0, -50, 0],
          x: [0, 30, 0],
          rotate: [0, 90, 0],
        }}
        transition={{
          duration: 15,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        className="absolute top-[10%] left-[5%] opacity-[0.04] text-blue-500"
      >
        <svg width="200" height="200" viewBox="0 0 100 100" fill="currentColor">
          <circle cx="50" cy="50" r="40" />
        </svg>
      </motion.div>
      
      {/* Emerald Square */}
      <motion.div
        animate={{
          y: [0, 60, 0],
          x: [0, -40, 0],
          rotate: [0, -45, 0],
        }}
        transition={{
          duration: 20,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 2,
        }}
        className="absolute top-[40%] right-[10%] opacity-[0.03] text-emerald-500"
      >
        <svg width="250" height="250" viewBox="0 0 100 100" fill="currentColor">
          <rect x="20" y="20" width="60" height="60" rx="10" />
        </svg>
      </motion.div>

      {/* Amber Triangle */}
      <motion.div
        animate={{
          y: [0, -60, 0],
          scale: [1, 1.2, 1],
          rotate: [0, 180, 0],
        }}
        transition={{
          duration: 25,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 5,
        }}
        className="absolute bottom-[20%] left-[20%] opacity-[0.04] text-amber-500"
      >
        <svg width="150" height="150" viewBox="0 0 100 100" fill="currentColor">
          <polygon points="50,10 90,90 10,90" />
        </svg>
      </motion.div>

      {/* Purple Circle */}
      <motion.div
        animate={{
          y: [0, 40, 0],
          x: [0, 60, 0],
        }}
        transition={{
          duration: 18,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 7,
        }}
        className="absolute bottom-[10%] right-[30%] opacity-[0.03] text-purple-500"
      >
        <svg width="180" height="180" viewBox="0 0 100 100" fill="currentColor">
          <circle cx="50" cy="50" r="30" />
        </svg>
      </motion.div>

      {/* Primary Color Cross / Plus */}
      <motion.div
        animate={{
          y: [0, 30, 0],
          x: [0, -30, 0],
          rotate: [0, 360, 0],
        }}
        transition={{
          duration: 30,
          repeat: Infinity,
          ease: "linear",
        }}
        className="absolute top-[30%] left-[40%] opacity-[0.04] text-primary"
      >
        <svg width="120" height="120" viewBox="0 0 100 100" fill="currentColor">
          <path d="M 40 10 L 60 10 L 60 40 L 90 40 L 90 60 L 60 60 L 60 90 L 40 90 L 40 60 L 10 60 L 10 40 L 40 40 Z" />
        </svg>
      </motion.div>
    </div>
  );
}
