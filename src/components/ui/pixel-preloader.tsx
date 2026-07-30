import { useState, useEffect } from "react";
import { motion, type Variants } from "framer-motion";

export const PixelPreloader = () => {
  const [dimensions, setDimensions] = useState({ width: 0, height: 0 });

  useEffect(() => {
    const updateDimensions = () => {
      setDimensions({ width: window.innerWidth, height: window.innerHeight });
    };
    updateDimensions();
    window.addEventListener("resize", updateDimensions);
    return () => window.removeEventListener("resize", updateDimensions);
  }, []);

  const blockSize = 60;
  const columns = dimensions.width > 0 ? Math.ceil(dimensions.width / blockSize) : 0;
  const rows = dimensions.height > 0 ? Math.ceil(dimensions.height / blockSize) : 0;
  const totalBlocks = columns * rows;
  const blocks = Array.from({ length: totalBlocks });

  // Randomized staggered exit — each block flies away
  const blockVariants: Variants = {
    initial: { opacity: 1, scale: 1, y: 0 },
    exit: (_i: number) => ({
      opacity: 0,
      scale: 0,
      y: -80,
      transition: {
        duration: 0.6,
        delay: Math.random() * 0.7,
        ease: [0.22, 1, 0.36, 1],
      },
    }),
  };

  const textVariants: Variants = {
    initial: { opacity: 0, y: 20, filter: "blur(6px)" },
    animate: {
      opacity: 1,
      y: 0,
      filter: "blur(0px)",
      transition: { duration: 0.9, ease: "easeOut", delay: 0.15 },
    },
    exit: {
      opacity: 0,
      y: -20,
      filter: "blur(6px)",
      transition: { duration: 0.3, ease: "easeIn" },
    },
  };

  if (dimensions.width === 0)
    return <div className="fixed inset-0 z-[9999] bg-white" />;

  return (
    <motion.div className="fixed inset-0 z-[9999] flex items-center justify-center pointer-events-all">
      {/* Light pixel grid */}
      <div
        className="absolute inset-0 z-0 flex flex-wrap"
        style={{
          width: columns * blockSize,
          height: rows * blockSize,
          left: "50%",
          top: "50%",
          transform: "translate(-50%, -50%)",
        }}
      >
        {blocks.map((_, i) => (
          <motion.div
            key={i}
            custom={i}
            variants={blockVariants}
            initial="initial"
            exit="exit"
            style={{ width: blockSize, height: blockSize }}
            className="bg-white border border-neutral-100 m-0 p-0"
          />
        ))}
      </div>

      {/* Center Text */}
      <motion.div
        variants={textVariants}
        initial="initial"
        animate="animate"
        exit="exit"
        className="relative z-10 text-center px-6"
      >
        {/* Logo / Brand */}
        <div className="flex items-center justify-center gap-2 mb-6">
          <div className="w-10 h-10 rounded-xl bg-sky-600 flex items-center justify-center shadow-lg">
            <span className="text-white font-black text-lg">A</span>
          </div>
          <span className="text-2xl font-black text-neutral-800 tracking-tight">
            adat<span className="text-sky-600">.</span>
          </span>
        </div>

        <p className="text-neutral-800 font-bold text-2xl md:text-4xl lg:text-5xl leading-tight tracking-tight">
          Architecting Scalable
        </p>
        <p className="text-neutral-800 font-bold text-2xl md:text-4xl lg:text-5xl leading-tight tracking-tight">
          Web &amp; Mobile Apps
        </p>
        <p className="text-neutral-500 font-semibold text-xl md:text-3xl lg:text-4xl mt-1">
          For{" "}
          <span className="text-sky-600 font-extrabold">Your Business</span>
        </p>

        {/* Loading bar */}
        <div className="mt-8 mx-auto w-48 h-1 rounded-full bg-neutral-100 overflow-hidden">
          <motion.div
            className="h-full bg-sky-500 rounded-full"
            initial={{ width: "0%" }}
            animate={{ width: "100%" }}
            transition={{ duration: 1.6, ease: "easeInOut" }}
          />
        </div>
      </motion.div>
    </motion.div>
  );
};
