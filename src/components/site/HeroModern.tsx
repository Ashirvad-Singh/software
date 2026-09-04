import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { MagneticButton } from "@/components/ui/magnetic-button";
import { ArrowRight } from "lucide-react";

export default function HeroModern() {
  const baseDelay = 0;

  return (
    <section 
      className="relative min-h-[90vh] md:min-h-screen flex items-center justify-center pt-20 overflow-hidden bg-black"
    >
      {/* Background Video */}
      <video 
        autoPlay 
        loop 
        muted 
        playsInline
        className="absolute inset-0 w-full h-full object-cover z-0"
      >
        <source src="/75668ad5438032989d3af79b8264dce2_720w.mp4" type="video/mp4" />
      </video>
      {/* Dark Overlay for Text Readability */}
      <div className="absolute inset-0 bg-black/60 z-0"></div>

      <div className="container mx-auto px-4 relative z-10 flex flex-col items-center justify-center py-2">
        <div className="max-w-4xl mx-auto text-center flex flex-col items-center">
          
          {/* Pill Badge */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-8"
          >
            <div className="inline-flex items-center gap-2 px-4 md:px-5 py-2 md:py-2.5 rounded-full bg-white/10 border border-white/20 text-white backdrop-blur-md font-bold text-xs sm:text-sm shadow-sm text-center max-w-[90%] md:max-w-none mx-auto leading-relaxed md:leading-normal">
              <span className="relative flex h-3 w-3 md:h-3.5 md:w-3.5 flex-shrink-0">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-sky-400 opacity-50"></span>
                <span className="relative inline-flex rounded-full h-3 w-3 md:h-3.5 md:w-3.5 bg-sky-400 border-[2.5px] border-transparent"></span>
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
            className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold tracking-tight text-white mb-4 sm:mb-6 md:mb-8 leading-[1.3] md:leading-[1.1]"
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
              className="block mt-2 md:mt-4"
              variants={{
                hidden: { opacity: 0, y: 20 },
                visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: "easeOut" } }
              }}
            >
              <span className="relative inline-block px-4 sm:px-6 py-1 sm:py-2 whitespace-nowrap">
                <motion.span
                  initial={{ width: "0%" }}
                  animate={{ width: "100%" }}
                  transition={{ duration: 1, ease: "circOut", delay: 0.4 }}
                  className="absolute inset-0 bg-[#072439]/70 backdrop-blur-md border border-white/10 shadow-[0_8px_30px_rgb(0,0,0,0.4)] rounded-2xl -z-10"
                />
                <span className="text-white">Scale your business.</span>
              </span>
            </motion.span>
          </motion.h1>

          {/* Subheading */}
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: baseDelay + 0.2 }}
            className="text-sm sm:text-base md:text-lg text-neutral-200 mb-8 md:mb-10 max-w-2xl mx-auto px-4 md:px-0 leading-relaxed font-medium"
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
