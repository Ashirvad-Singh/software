import React, { useState, useEffect } from "react";
import { motion, useMotionValue, useMotionTemplate } from "framer-motion";
import { Link } from "react-router-dom";
import { MagneticButton } from "@/components/ui/magnetic-button";
import { ArrowRight, Triangle, MoreVertical } from "lucide-react";

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

          {/* Avatar Group */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: baseDelay + 0.4 }}
            className="mt-10 flex flex-col items-center gap-3"
          >
            <div className="flex -space-x-3 hover:space-x-0 transition-all duration-300">
              {[
                "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=100&h=100&q=80",
                "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=100&h=100&q=80",
                "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=100&h=100&q=80",
                "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=100&h=100&q=80",
                "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=crop&w=100&h=100&q=80",
                "https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=100&h=100&q=80"
              ].map((img, i) => (
                <img 
                  key={i} 
                  src={img} 
                  alt={`User ${i+1}`} 
                  className="w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12 rounded-full border-[3px] border-white object-cover shadow-sm hover:z-20 hover:scale-110 relative transition-transform duration-300 cursor-pointer"
                />
              ))}
            </div>
            <p className="text-sm font-medium text-neutral-500">Joined by 10,000+ others</p>
          </motion.div>
        </div>
      </div>

      {/* FLOATING ELEMENTS - ALL DROPPING FROM TOP OF SCREEN */}
      
      {/* Task 1: Lighthouse Score */}
      <motion.div 
        initial={{ y: -1000, opacity: 0, rotate: -20 }}
        animate={{ y: 0, opacity: 1, rotate: -20 }}
        transition={{ type: "spring", bounce: 0.5, duration: 1.8, delay: baseDelay + 0.1 }}
        className="hidden lg:flex absolute top-32 left-[5%]"
      >
        <motion.div 
          animate={{ y: [0, -15, 0] }}
          transition={{ repeat: Infinity, duration: 6, ease: "easeInOut" }}
          className="bg-white p-3 rounded-2xl shadow-lg border border-neutral-100 flex items-center gap-3"
        >
          <div className="w-8 h-8 rounded-full bg-green-100 flex items-center justify-center">
            <span className="text-green-700 font-bold text-xs">99</span>
          </div>
          <div>
            <p className="text-xs font-bold text-neutral-800">Lighthouse Score</p>
            <p className="text-[10px] text-green-600 font-medium">Performance Optimized</p>
          </div>
        </motion.div>
      </motion.div>

      {/* Task 2: Code Review */}
      <motion.div 
        initial={{ y: -1100, opacity: 0, rotate: 15 }}
        animate={{ y: 0, opacity: 1, rotate: 15 }}
        transition={{ type: "spring", bounce: 0.4, duration: 2.0, delay: baseDelay + 0.3 }}
        className="hidden lg:flex absolute top-24 right-[10%]"
      >
        <motion.div 
          animate={{ y: [0, 20, 0] }}
          transition={{ repeat: Infinity, duration: 5, ease: "easeInOut", delay: 1 }}
          className="bg-white p-3 rounded-2xl shadow-lg border border-neutral-100 flex items-center gap-3"
        >
          <div className="w-8 h-8 rounded-full bg-indigo-100 flex items-center justify-center">
            <svg className="w-4 h-4 text-indigo-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4"></path></svg>
          </div>
          <div>
            <p className="text-xs font-bold text-neutral-800">Pull Request</p>
            <p className="text-[10px] text-indigo-500 font-medium">Merged to Main</p>
          </div>
        </motion.div>
      </motion.div>

      {/* Task 3: Jira Ticket */}
      <motion.div 
        initial={{ y: -1200, opacity: 0, rotate: -10 }}
        animate={{ y: 0, opacity: 1, rotate: -10 }}
        transition={{ type: "spring", bounce: 0.5, duration: 1.7, delay: baseDelay + 0.5 }}
        className="hidden lg:flex absolute top-16 left-[30%]"
      >
        <motion.div 
          animate={{ y: [0, -10, 0] }}
          transition={{ repeat: Infinity, duration: 7, ease: "easeInOut", delay: 0.5 }}
          className="bg-white px-4 py-2 rounded-xl shadow-md border border-neutral-100 flex items-center gap-2"
        >
          <span className="text-[10px] font-bold bg-blue-100 text-blue-700 px-2 py-0.5 rounded">DEV-402</span>
          <p className="text-xs font-medium text-neutral-600">Deploy to Server</p>
        </motion.div>
      </motion.div>
      
      {/* Task 4: SEO Setup */}
      <motion.div 
        initial={{ y: -900, opacity: 0, rotate: -12 }}
        animate={{ y: 0, opacity: 1, rotate: -12 }}
        transition={{ type: "spring", bounce: 0.6, duration: 1.9, delay: baseDelay + 0.2 }}
        className="hidden lg:flex absolute top-52 left-[12%]"
      >
        <motion.div 
          animate={{ y: [0, -12, 0] }}
          transition={{ repeat: Infinity, duration: 4, ease: "easeInOut" }}
          className="bg-white p-3 rounded-2xl shadow-[0_20px_40px_-15px_rgba(0,0,0,0.1)] border border-neutral-100 flex items-center gap-3"
        >
          <div className="w-8 h-8 rounded-full bg-yellow-100 flex items-center justify-center text-yellow-600 font-bold text-xs">
            SEO
          </div>
          <div>
            <p className="text-xs font-bold text-neutral-800">Speed Optimized</p>
            <p className="text-[10px] text-neutral-400">Core Web Vitals</p>
          </div>
        </motion.div>
      </motion.div>

      {/* Task 5: Server Status */}
      <motion.div 
        initial={{ y: -1050, opacity: 0, rotate: 15 }}
        animate={{ y: 0, opacity: 1, rotate: 15 }}
        transition={{ type: "spring", bounce: 0.5, duration: 2.1, delay: baseDelay + 0.4 }}
        className="hidden lg:flex absolute top-72 right-[18%]"
      >
        <motion.div 
          animate={{ y: [0, 15, 0] }}
          transition={{ repeat: Infinity, duration: 5, ease: "easeInOut", delay: 1 }}
          className="bg-white p-3 rounded-2xl shadow-[0_20px_40px_-15px_rgba(0,0,0,0.1)] border border-neutral-100 flex items-center gap-3"
        >
          <div className="w-8 h-8 rounded-full bg-purple-100 flex items-center justify-center">
            <svg className="w-4 h-4 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 12h14M5 12a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v4a2 2 0 01-2 2M5 12a2 2 0 00-2 2v4a2 2 0 002 2h14a2 2 0 002-2v-4a2 2 0 00-2-2m-2-4h.01M17 16h.01"></path></svg>
          </div>
          <div>
            <p className="text-xs font-bold text-neutral-800">Database</p>
            <p className="text-[10px] text-green-500 font-semibold">PostgreSQL Linked</p>
          </div>
        </motion.div>
      </motion.div>

      {/* Task 6: API Config */}
      <motion.div 
        initial={{ y: -950, opacity: 0, rotate: 8 }}
        animate={{ y: 0, opacity: 1, rotate: 8 }}
        transition={{ type: "spring", bounce: 0.4, duration: 1.6, delay: baseDelay + 0.6 }}
        className="hidden 2xl:flex absolute top-10 right-[25%]"
      >
        <motion.div 
          animate={{ y: [0, -10, 0] }}
          transition={{ repeat: Infinity, duration: 6, ease: "easeInOut", delay: 0.2 }}
          className="bg-white p-3 rounded-2xl shadow-lg border border-neutral-100 flex items-center gap-3"
        >
          <div className="w-8 h-8 rounded-full bg-orange-100 flex items-center justify-center">
             <span className="text-orange-600 font-bold text-[10px]">API</span>
          </div>
          <div>
            <p className="text-xs font-bold text-neutral-800">Payment Gateway</p>
            <p className="text-[10px] text-orange-500 font-medium">Stripe Configured</p>
          </div>
        </motion.div>
      </motion.div>

      {/* Task 7: Vercel Deploy */}
      <motion.div 
        initial={{ y: -1300, opacity: 0, rotate: -25 }}
        animate={{ y: 0, opacity: 1, rotate: -25 }}
        transition={{ type: "spring", bounce: 0.5, duration: 2.2, delay: baseDelay + 0.7 }}
        className="hidden xl:flex absolute bottom-40 left-[20%]"
      >
        <motion.div 
          animate={{ y: [0, 15, 0] }}
          transition={{ repeat: Infinity, duration: 5.5, ease: "easeInOut", delay: 0.8 }}
          className="bg-black text-white p-3 rounded-2xl shadow-xl border border-neutral-800 flex items-center gap-3"
        >
          <div className="w-6 h-6 rounded-full border border-neutral-700 flex items-center justify-center">
            <Triangle className="w-3 h-3 text-white fill-white" />
          </div>
          <div>
            <p className="text-xs font-bold text-white">Vercel Deploy</p>
            <p className="text-[10px] text-neutral-400">Production Ready</p>
          </div>
        </motion.div>
      </motion.div>

      {/* Bottom Left Card */}
      <motion.div 
        initial={{ y: -1000, opacity: 0, rotate: -8 }}
        animate={{ y: 0, opacity: 1, rotate: -8 }}
        transition={{ type: "spring", bounce: 0.5, duration: 1.8, delay: baseDelay + 0.2 }}
        className="hidden xl:block absolute bottom-10 left-[8%] w-72"
      >
        <motion.div 
          animate={{ y: [0, -15, 0] }}
          transition={{ repeat: Infinity, duration: 6, ease: "easeInOut" }}
          className="w-full bg-[#F6F8FB] rounded-3xl shadow-[0_20px_50px_-15px_rgba(0,0,0,0.15)] border border-white/50 overflow-hidden"
        >
          <div className="bg-white/80 backdrop-blur-sm p-4 border-b border-white/50">
            <p className="text-xs font-bold text-neutral-500">Tech Stack</p>
          </div>
          <div className="p-4 space-y-3 bg-white">
            <motion.div
              initial={{ y: -50, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.6, type: "spring", bounce: 0.5 }}
            >
              <p className="text-[10px] font-semibold text-neutral-400 mb-1">E-Commerce</p>
              <div className="bg-white border border-neutral-100 rounded-xl p-3 shadow-sm border-l-4 border-l-sky-500">
                <p className="text-sm font-bold text-neutral-900">Shopify & WooCommerce</p>
                <p className="text-[10px] text-neutral-400 mt-1">Priority: High</p>
              </div>
            </motion.div>
            <motion.div
              initial={{ y: -50, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.8, type: "spring", bounce: 0.5 }}
            >
              <p className="text-[10px] font-semibold text-neutral-400 mb-1">CMS Platform</p>
              <div className="bg-white border border-neutral-100 rounded-xl p-3 shadow-sm border-l-4 border-l-sky-500">
                <p className="text-sm font-bold text-neutral-900">WordPress</p>
                <p className="text-[10px] text-neutral-400 mt-1">Priority: High</p>
              </div>
            </motion.div>
            <motion.div
              initial={{ y: -50, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 1.0, type: "spring", bounce: 0.5 }}
            >
              <p className="text-[10px] font-semibold text-neutral-400 mb-1">Web Portals</p>
              <div className="bg-white border border-neutral-100 rounded-xl p-3 shadow-sm border-l-4 border-l-neutral-300">
                <p className="text-sm font-bold text-neutral-900">Custom PHP Dev</p>
                <p className="text-[10px] text-neutral-400 mt-1">Priority: Medium</p>
              </div>
            </motion.div>
          </div>
        </motion.div>
      </motion.div>

      {/* API Integrations Card (Bottom Left Offset) */}
      <motion.div
        initial={{ y: -1200, opacity: 0, rotate: -15 }}
        animate={{ y: 0, opacity: 1, rotate: -15 }}
        transition={{ type: "spring", bounce: 0.5, duration: 2.0, delay: baseDelay + 0.4 }}
        className="hidden xl:block absolute bottom-[-40px] left-[25%] w-64"
      >
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ repeat: Infinity, duration: 5.5, ease: "easeInOut", delay: 0.5 }}
          className="w-full bg-white rounded-3xl shadow-[0_20px_50px_-15px_rgba(0,0,0,0.15)] border border-neutral-100 overflow-hidden"
        >
          <div className="p-4 border-b border-neutral-100">
            <p className="text-xs font-bold text-neutral-800">API Integrations</p>
          </div>
          <div className="p-5 flex gap-2 justify-center bg-[#F8FAFC]">
             <div className="w-10 h-10 rounded-xl bg-slate-800 flex items-center justify-center text-white font-bold shadow-md text-xs">AWS</div>
             <div className="w-10 h-10 rounded-xl bg-blue-600 flex items-center justify-center text-white font-bold shadow-md text-[10px]">Stripe</div>
             <div className="w-10 h-10 rounded-xl bg-sky-500 flex items-center justify-center text-white font-bold shadow-md text-xs">Auth</div>
             <div className="w-10 h-10 rounded-xl bg-indigo-500 flex items-center justify-center text-white font-bold shadow-md text-xs">REST</div>
          </div>
        </motion.div>
      </motion.div>


      {/* Bottom Right Cards */}
      <motion.div 
        initial={{ y: -1100, opacity: 0, rotate: 8 }}
        animate={{ y: 0, opacity: 1, rotate: 8 }}
        transition={{ type: "spring", bounce: 0.5, duration: 2.0, delay: baseDelay + 0.3 }}
        className="hidden xl:block absolute bottom-16 right-[8%] w-[22rem]"
      >
        <motion.div 
          animate={{ y: [0, 20, 0] }}
          transition={{ repeat: Infinity, duration: 7, ease: "easeInOut", delay: 0.2 }}
          className="w-full bg-[#F1F5F9] rounded-[2rem] shadow-[0_20px_50px_-15px_rgba(0,0,0,0.15)] border border-white p-6"
        >
          <div className="absolute -top-6 left-6 w-4 h-12 border-2 border-neutral-300 rounded-full bg-white z-10 shadow-sm rotate-12"></div>
          <div className="space-y-4 relative z-0">
            <motion.div 
              initial={{ x: 50, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ delay: 0.8, type: "spring", bounce: 0.4 }}
              className="bg-white rounded-2xl p-4 shadow-sm flex items-center justify-between border border-neutral-100"
            >
              <div className="flex items-center gap-4">
                <div className="relative w-10 h-10 rounded-full bg-blue-500 flex items-center justify-center text-white font-bold text-sm">
                  MJ
                  <div className="absolute bottom-0 right-0 w-3 h-3 bg-sky-400 border-2 border-white rounded-full"></div>
                </div>
                <div>
                  <p className="text-sm font-bold text-neutral-900">Web Development</p>
                  <p className="text-[10px] text-neutral-500 font-medium">Phase: Front-end UI</p>
                </div>
              </div>
              <MoreVertical className="w-4 h-4 text-neutral-400" />
            </motion.div>
            
            <motion.div 
              initial={{ x: 50, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ delay: 1.0, type: "spring", bounce: 0.4 }}
              className="bg-white rounded-2xl p-4 shadow-sm flex items-center justify-between border border-neutral-100"
            >
              <div className="flex items-center gap-4">
                <div className="relative w-10 h-10 rounded-full bg-indigo-500 flex items-center justify-center text-white font-bold text-sm">
                  AD
                  <div className="absolute bottom-0 right-0 w-3 h-3 bg-sky-400 border-2 border-white rounded-full"></div>
                </div>
                <div>
                  <p className="text-sm font-bold text-neutral-900">Theme Setup</p>
                  <p className="text-[10px] text-neutral-500 font-medium">Phase: Liquid Coding</p>
                </div>
              </div>
              <MoreVertical className="w-4 h-4 text-neutral-400" />
            </motion.div>
          </div>
        </motion.div>
      </motion.div>

    </section>
  );
}
