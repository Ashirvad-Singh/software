import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { Sparkles } from "lucide-react";

export default function AnimatedMockupSection() {
  const containerRef = useRef<HTMLDivElement>(null);
  
  // Track scroll progress for this specific section
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "center center"],
  });

  // 3D Transform values based on scroll
  const rotateX = useTransform(scrollYProgress, [0, 1], [40, 0]);
  const scale = useTransform(scrollYProgress, [0, 1], [0.8, 1]);
  const opacity = useTransform(scrollYProgress, [0, 0.5], [0, 1]);

  return (
    <section 
      ref={containerRef} 
      className="relative py-24 md:py-32 bg-background overflow-hidden"
      style={{ perspective: "1000px" }} // Required for 3D rotation
    >
      {/* Background ambient glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[80%] h-[50%] bg-sky-500/10 blur-[120px] rounded-full pointer-events-none z-0" />

      <div className="container mx-auto px-4 flex flex-col items-center relative z-10">
        
        {/* Animated Heading */}
        <div className="text-center mb-16 md:mb-24 max-w-3xl">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-sky-100 border border-sky-200 text-sky-800 font-bold text-xs sm:text-sm shadow-sm mb-6"
          >
            <Sparkles className="w-4 h-4 text-sky-500" /> Premium Digital Solutions
          </motion.div>
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-4xl md:text-5xl lg:text-7xl font-bold tracking-tight mb-6"
          >
            Unleash the power of <br className="hidden md:block"/>
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-sky-400 to-blue-600">
              Modern Software
            </span>
          </motion.h2>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-lg md:text-xl text-muted-foreground"
          >
            Experience lightning-fast performance, beautiful interfaces, and scalable architecture built for the future.
          </motion.p>
        </div>

        {/* 3D Animated Browser/App Mockup */}
        <motion.div
          style={{
            rotateX,
            scale,
            opacity,
            transformStyle: "preserve-3d",
          }}
          className="relative w-full max-w-6xl rounded-[1.5rem] md:rounded-[2.5rem] border border-border/50 bg-secondary/30 p-2 md:p-4 shadow-2xl backdrop-blur-sm"
        >
          <div className="rounded-[1rem] md:rounded-[2rem] overflow-hidden border border-border/50 bg-background/80 relative shadow-inner">
            
            {/* macOS Style Top Bar */}
            <div className="w-full h-10 bg-secondary/80 flex items-center px-4 gap-2 backdrop-blur-md absolute top-0 left-0 z-10 border-b border-border/50">
              <div className="w-3 h-3 rounded-full bg-red-400/90 shadow-sm"></div>
              <div className="w-3 h-3 rounded-full bg-amber-400/90 shadow-sm"></div>
              <div className="w-3 h-3 rounded-full bg-green-400/90 shadow-sm"></div>
              <div className="mx-auto text-xs text-muted-foreground font-medium hidden sm:block">
                adatsoft.com - Platform Dashboard
              </div>
            </div>

            {/* Dashboard Image */}
            <img 
              src="/adat_hero_ui.png" 
              alt="Platform Interface" 
              className="w-full h-auto mt-10 object-cover"
            />
            
            {/* Overlay Gradient at the bottom to fade it out nicely */}
            <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-background to-transparent pointer-events-none"></div>
          </div>
          
          {/* Intense Glow effect behind the mockup */}
          <div className="absolute -inset-2 -z-10 bg-gradient-to-r from-sky-500 to-blue-600 rounded-[3rem] blur-3xl opacity-20 md:opacity-30"></div>
        </motion.div>
      </div>
    </section>
  );
}
