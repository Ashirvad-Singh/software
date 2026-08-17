import React, { useState, useEffect } from "react";
import { motion, useMotionValue, useMotionTemplate } from "framer-motion";
import { Link } from "react-router-dom";
import { MagneticButton } from "@/components/ui/magnetic-button";
import { ArrowRight } from "lucide-react";

const RandomSpot = () => {
  const [position, setPosition] = useState({ x: Math.random() * 80, y: Math.random() * 80 });
  const [opacity, setOpacity] = useState(0);

  useEffect(() => {
    const moveSpot = () => {
      setPosition({ x: 10 + Math.random() * 80, y: 10 + Math.random() * 80 });
      setOpacity(0.3 + Math.random() * 0.4);
    };
    moveSpot();
    const interval = setInterval(moveSpot, 3000 + Math.random() * 2000);
    return () => clearInterval(interval);
  }, []);

  return (
    <motion.div 
      className="absolute w-[300px] h-[300px] pointer-events-none z-0 rounded-full"
      animate={{
        left: `${position.x}%`,
        top: `${position.y}%`,
        opacity: opacity,
      }}
      transition={{ duration: 4, ease: "easeInOut" }}
      style={{
        backgroundImage: "radial-gradient(circle, rgba(14,165,233,0.15) 0%, transparent 70%)",
        transform: "translate(-50%, -50%)",
      }}
    />
  );
};

export default function HeroModern() {
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const [isHovering, setIsHovering] = useState(false);

  const baseDelay = 0;

  const handleMouseMove = (e: React.MouseEvent<HTMLElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    mouseX.set(e.clientX - rect.left);
    mouseY.set(e.clientY - rect.top);
  };

  const maskImage = useMotionTemplate`radial-gradient(250px circle at ${mouseX}px ${mouseY}px, black, transparent)`;

  return (
    <section 
      className="relative pt-24 sm:pt-28 md:pt-32 pb-8 sm:pb-10 md:pb-12 overflow-hidden bg-[#Fdfdfd]"
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovering(true)}
      onMouseLeave={() => setIsHovering(false)}
    >
      {/* Background Dots - Base Layer (Dim) */}
      <div 
        className="absolute inset-0 pointer-events-none opacity-20 z-0"
        style={{
          backgroundImage: "radial-gradient(#000 1.5px, transparent 1.5px)",
          backgroundSize: "24px 24px",
        }}
      ></div>

      {/* Background Dots - Interactive Hover Layer (Bright/Shining) */}
      <motion.div 
        className="absolute inset-0 pointer-events-none z-0"
        animate={{
          opacity: isHovering ? 0.7 : 0,
        }}
        transition={{ duration: 0.3 }}
        style={{
          backgroundImage: "radial-gradient(#0ea5e9 2px, transparent 2px)", // Sky blue brighter dots
          backgroundSize: "24px 24px",
          WebkitMaskImage: maskImage,
          maskImage: maskImage,
        }}
      ></motion.div>

      {/* Autonomous Random Shining Spots */}
      <RandomSpot />
      <RandomSpot />
      <RandomSpot />

      <div className="container mx-auto px-4 relative z-10 flex flex-col items-center justify-center py-2">
        <div className="max-w-4xl mx-auto text-center flex flex-col items-center">
          
          {/* Pill Badge */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-8"
          >
            <div className="inline-flex items-center gap-2 px-4 md:px-5 py-2 md:py-2.5 rounded-full bg-sky-100 border border-sky-200 text-sky-800 font-bold text-xs sm:text-sm shadow-sm text-center max-w-[90%] md:max-w-none mx-auto leading-relaxed md:leading-normal">
              <span className="relative flex h-3 w-3 md:h-3.5 md:w-3.5 flex-shrink-0">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-sky-500 opacity-50"></span>
                <span className="relative inline-flex rounded-full h-3 w-3 md:h-3.5 md:w-3.5 bg-sky-600 border-[2.5px] border-sky-200"></span>
              </span>
              <span>New! We build AI-powered Web & Mobile Applications</span>
            </div>
          </motion.div>

          {/* Heading */}
          <motion.h1 
            initial="hidden"
            animate="visible"
            variants={{
              hidden: { opacity: 0, y: 20 },
              visible: {
                opacity: 1,
                y: 0,
                transition: {
                  duration: 0.8,
                  ease: "easeOut",
                  staggerChildren: 0.2,
                },
              },
            }}
            className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold tracking-tight text-neutral-900 mb-4 sm:mb-6 md:mb-8 leading-[1.3] md:leading-[1.1]"
          >
            {/* Line 1 */}
            <motion.span 
              className="block"
              variants={{
                hidden: { opacity: 0, y: 20 },
                visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: "easeOut" } }
              }}
            >
              Build software.
            </motion.span>
            
            {/* Line 2 */}
            <motion.span 
              className="block mt-2"
              variants={{
                hidden: { opacity: 0, y: 20 },
                visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: "easeOut" } }
              }}
            >
              <span className="relative inline-block px-2 sm:px-4 py-0 sm:py-1 whitespace-nowrap">
                <motion.span
                  initial={{ width: "0%" }}
                  animate={{ width: "100%" }}
                  transition={{ duration: 1, ease: "circOut", delay: 0.4 }}
                  className="absolute inset-0 bg-sky-100 rounded-2xl -z-10"
                />
                <span className="text-sky-600">Scale your business.</span>
              </span>
            </motion.span>
          </motion.h1>

          {/* Subheading */}
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: baseDelay + 0.2 }}
            className="text-sm sm:text-base md:text-lg text-neutral-500 mb-8 md:mb-10 max-w-2xl mx-auto px-4 md:px-0 leading-relaxed font-medium"
          >
            We architect scalable, future-proof web and mobile apps. Focus on what matters - growing your business.
          </motion.p>

          {/* CTA Button */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: baseDelay + 0.3 }}
          >
            <MagneticButton>
              <Link 
                to="/contact"
                className="inline-flex items-center justify-center h-10 px-5 text-sm md:h-14 md:px-8 md:text-lg rounded-full bg-sky-600 hover:bg-sky-700 text-white font-bold shadow-[0_4px_14px_0_rgba(2,132,199,0.39)] transition-all hover:shadow-[0_6px_20px_rgba(2,132,199,0.23)]"
              >
                Start a Project - Let's Talk <ArrowRight className="ml-2 w-5 h-5" />
              </Link>
            </MagneticButton>
          </motion.div>


        </div>
      </div>


    </section>
  );
}
