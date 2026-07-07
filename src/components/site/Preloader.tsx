import { motion } from "framer-motion";
import { useEffect, useState } from "react";

export default function Preloader() {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const duration = 2500; // 2.5 seconds total loading time
    const intervalTime = 50;
    const steps = duration / intervalTime;
    const increment = 100 / steps;

    const timer = setInterval(() => {
      setProgress((prev) => {
        const next = prev + increment;
        if (next >= 100) {
          clearInterval(timer);
          return 100;
        }
        return next;
      });
    }, intervalTime);

    return () => clearInterval(timer);
  }, []);

  const filledBlocks = Math.floor(progress / 10);
  const totalBlocks = 10;

  return (
    <div className="fixed inset-0 z-[999999] flex items-center justify-center bg-[#F3F4F6] overflow-hidden font-sans">
      
      {/* Decorative Floating Element - Bottom Left */}
      <motion.div 
        initial={{ opacity: 0, y: 20, rotate: -15 }}
        animate={{ opacity: 1, y: 0, rotate: -12 }}
        transition={{ delay: 0.2, duration: 0.8, type: "spring" }}
        className="absolute bottom-20 left-10 md:bottom-32 md:left-32 bg-white p-4 shadow-sm w-48 hidden md:block"
      >
        <p className="text-xs font-bold text-neutral-400 uppercase leading-tight mb-4">
          Adat Soft<br/>Solutions<br/>Next-Gen Tech
        </p>
        <p className="text-[10px] font-bold text-neutral-400 uppercase leading-tight">
          Est.<br/>2024
        </p>
      </motion.div>

      {/* Decorative Floating Element - Bottom Right */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4, duration: 0.8, type: "spring" }}
        className="absolute bottom-20 right-10 md:bottom-32 md:right-32 bg-white rounded-xl p-5 shadow-sm w-64 hidden md:block"
      >
        <div className="flex justify-between items-center mb-3">
          <p className="text-[10px] font-bold text-neutral-500 uppercase">Our Mission</p>
          <div className="flex gap-1">
            <div className="w-2 h-2 rounded-full bg-neutral-200"></div>
            <div className="w-2 h-2 rounded-full bg-neutral-200"></div>
          </div>
        </div>
        <p className="text-[10px] text-neutral-400 leading-relaxed">
          We architect scalable, future-proof web and mobile apps. Focus on what matters - growing your business with Next-Gen technology.
        </p>
      </motion.div>

      {/* Main Loader Box */}
      <motion.div 
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
        className="bg-white rounded-2xl shadow-[0_10px_40px_-10px_rgba(0,0,0,0.08)] w-[320px] p-5 flex flex-col gap-4 relative z-10"
      >
        {/* Header */}
        <div className="flex justify-between items-center">
          <span className="text-[10px] font-black tracking-widest text-neutral-500 uppercase">Loader</span>
          <div className="flex gap-1.5">
            <div className="w-2 h-2 rounded-full bg-neutral-200"></div>
            <div className="w-2 h-2 rounded-full bg-neutral-200"></div>
          </div>
        </div>

        {/* Progress Blocks */}
        <div className="flex justify-between items-center bg-neutral-50 p-1.5 rounded-xl">
          {Array.from({ length: totalBlocks }).map((_, i) => (
            <motion.div
              key={i}
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: i * 0.05 }}
              className={`w-[22px] h-[22px] rounded-md transition-colors duration-200 ${
                i < filledBlocks ? "bg-neutral-600 shadow-sm" : "bg-neutral-200/50"
              }`}
            />
          ))}
        </div>

        {/* Percentage */}
        <div className="flex justify-end">
          <span className="text-xs font-bold text-neutral-600">
            {Math.round(progress)}%
          </span>
        </div>
      </motion.div>
    </div>
  );
}
