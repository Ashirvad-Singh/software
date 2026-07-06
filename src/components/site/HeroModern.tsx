import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { ArrowRight, Zap, MoreVertical, Circle, Triangle, Hexagon } from "lucide-react";

export default function HeroModern() {
  return (
    <section className="relative min-h-screen pt-32 pb-20 md:pt-48 md:pb-32 overflow-hidden bg-[#Fdfdfd]">
      {/* Background Dots */}
      <div 
        className="absolute inset-0 pointer-events-none opacity-20 z-0"
        style={{
          backgroundImage: "radial-gradient(#000 1.5px, transparent 1.5px)",
          backgroundSize: "24px 24px",
        }}
      ></div>

      <div className="container mx-auto px-4 relative z-10 flex flex-col items-center justify-center min-h-[60vh]">
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
              hidden: { opacity: 1 },
              visible: {
                opacity: 1,
                transition: {
                  staggerChildren: 0.03,
                  delayChildren: 0.1,
                },
              },
            }}
            className="text-4xl sm:text-5xl md:text-[5.5rem] font-bold tracking-tight text-neutral-900 mb-6 leading-[1.2] md:leading-[1.1]"
          >
            {/* Line 1 */}
            <span className="block">
              {"Build software.".split("").map((char, index) => (
                <motion.span
                  key={`l1-${index}`}
                  variants={{
                    hidden: { opacity: 0, display: "none" },
                    visible: { opacity: 1, display: "inline-block" },
                  }}
                >
                  {char === " " ? "\u00A0" : char}
                </motion.span>
              ))}
            </span>
            {/* Line 2 */}
            <span className="block mt-2">
              <span className="relative inline-block px-2 sm:px-4 py-1">
                <motion.span
                  initial={{ width: "0%" }}
                  animate={{ width: "100%" }}
                  transition={{ duration: 1, ease: "circOut", delay: 1 }}
                  className="absolute inset-0 bg-sky-100 rounded-2xl -z-10"
                />
                <span className="text-sky-600">
                  {"Scale your business.".split("").map((char, index) => (
                    <motion.span
                      key={`l2-${index}`}
                      variants={{
                        hidden: { opacity: 0, display: "none" },
                        visible: { opacity: 1, display: "inline-block" },
                      }}
                    >
                      {char === " " ? "\u00A0" : char}
                    </motion.span>
                  ))}
                </span>
              </span>
            </span>
          </motion.h1>

          {/* Subheading */}
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-base sm:text-lg md:text-xl text-neutral-500 mb-8 md:mb-10 max-w-2xl mx-auto px-4 md:px-0 leading-relaxed font-medium"
          >
            We architect scalable, future-proof web and mobile apps. Focus on what matters - growing your business.
          </motion.p>

          {/* CTA Button */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
          >
            <Link 
              to="/contact"
              className="inline-flex items-center justify-center h-14 px-8 rounded-full bg-sky-500 hover:bg-sky-600 text-white font-bold text-lg shadow-[0_4px_14px_0_rgba(14,165,233,0.39)] transition-all hover:shadow-[0_6px_20px_rgba(14,165,233,0.23)] hover:-translate-y-0.5"
            >
              Start a Project - Let's Talk <ArrowRight className="ml-2 w-5 h-5" />
            </Link>
          </motion.div>

          {/* Avatar Group */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
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
                  className="w-12 h-12 rounded-full border-[3px] border-white object-cover shadow-sm hover:z-20 hover:scale-110 relative transition-transform duration-300 cursor-pointer"
                />
              ))}
            </div>
            <p className="text-sm font-medium text-neutral-500">Joined by 10,000+ others</p>
          </motion.div>
        </div>
      </div>

      {/* FLOATING ELEMENTS */}
      
      {/* Top Left Floating Triangle */}
      <motion.div 
        animate={{ y: [0, -15, 0], rotate: [0, 45, 0] }}
        transition={{ repeat: Infinity, duration: 6, ease: "easeInOut" }}
        className="hidden md:flex absolute top-32 left-[5%] text-sky-200 opacity-60"
      >
        <Triangle className="w-12 h-12" strokeWidth={3} />
      </motion.div>

      {/* Top Right Floating Circle */}
      <motion.div 
        animate={{ y: [0, 20, 0], scale: [1, 1.1, 1] }}
        transition={{ repeat: Infinity, duration: 5, ease: "easeInOut", delay: 1 }}
        className="hidden md:flex absolute top-24 right-[10%] text-sky-200 opacity-60"
      >
        <Circle className="w-16 h-16" strokeWidth={2} />
      </motion.div>

      {/* Top Center Floating Hexagon */}
      <motion.div 
        animate={{ y: [0, -10, 0], rotate: [0, -30, 0] }}
        transition={{ repeat: Infinity, duration: 7, ease: "easeInOut", delay: 0.5 }}
        className="hidden lg:flex absolute top-16 left-[30%] text-sky-100 opacity-80"
      >
        <Hexagon className="w-10 h-10" strokeWidth={2.5} />
      </motion.div>
      
      {/* Top Left Zap */}
      <motion.div 
        animate={{ y: [0, -12, 0] }}
        transition={{ repeat: Infinity, duration: 4, ease: "easeInOut" }}
        className="hidden lg:flex absolute top-40 left-[12%] w-24 h-24 bg-white rounded-3xl shadow-[0_20px_40px_-15px_rgba(0,0,0,0.1)] border border-neutral-100 items-center justify-center rotate-[-12deg]"
      >
        <Zap className="w-12 h-12 text-sky-400 fill-sky-400" />
      </motion.div>

      {/* Middle Right Zap */}
      <motion.div 
        animate={{ y: [0, 15, 0] }}
        transition={{ repeat: Infinity, duration: 5, ease: "easeInOut", delay: 1 }}
        className="hidden lg:flex absolute top-72 right-[18%] w-20 h-20 bg-white rounded-3xl shadow-[0_20px_40px_-15px_rgba(0,0,0,0.1)] border border-neutral-100 items-center justify-center rotate-[15deg]"
      >
        <Zap className="w-10 h-10 text-sky-400 fill-sky-400" />
      </motion.div>

      {/* Bottom Left Card */}
      <motion.div 
        animate={{ y: [0, -15, 0], rotate: [-8, -5, -8] }}
        transition={{ repeat: Infinity, duration: 6, ease: "easeInOut" }}
        className="hidden xl:block absolute bottom-10 left-[8%] w-72 bg-[#F6F8FB] rounded-3xl shadow-[0_20px_50px_-15px_rgba(0,0,0,0.15)] border border-white/50 overflow-hidden rotate-[-8deg]"
      >
        <div className="bg-white/80 backdrop-blur-sm p-4 border-b border-white/50">
          <p className="text-xs font-bold text-neutral-500">Tech Stack</p>
        </div>
        <div className="p-4 space-y-5 bg-white">
          <div>
            <p className="text-xs font-semibold text-neutral-400 mb-2">Web Application</p>
            <div className="bg-white border border-neutral-100 rounded-xl p-3 shadow-sm">
              <p className="text-sm font-bold text-neutral-900">React Dashboard</p>
              <p className="text-xs text-neutral-400 mt-1">Status: Deployed</p>
            </div>
          </div>
          <div>
            <p className="text-xs font-semibold text-neutral-400 mb-2">Mobile Application</p>
            <div className="bg-white border border-neutral-100 rounded-xl p-3 shadow-sm">
              <p className="text-sm font-bold text-neutral-900">React Native App</p>
              <p className="text-xs text-neutral-400 mt-1">Status: In Progress</p>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Social Media Integrations Card (Bottom Left Offset) */}
      <motion.div
        animate={{ y: [0, 10, 0], rotate: [-15, -12, -15] }}
        transition={{ repeat: Infinity, duration: 5.5, ease: "easeInOut", delay: 0.5 }}
        className="hidden xl:block absolute bottom-[-40px] left-[25%] w-64 bg-white rounded-3xl shadow-[0_20px_50px_-15px_rgba(0,0,0,0.15)] border border-neutral-100 overflow-hidden rotate-[-15deg]"
      >
        <div className="p-4 border-b border-neutral-100">
          <p className="text-xs font-bold text-neutral-800">Social Media Integrations</p>
        </div>
        <div className="p-5 flex gap-2 justify-center bg-[#F8FAFC]">
           <div className="w-10 h-10 rounded-xl bg-[#5865F2] flex items-center justify-center text-white font-bold shadow-md">D</div>
           <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-yellow-400 via-pink-500 to-purple-500 flex items-center justify-center text-white font-bold shadow-md">I</div>
           <div className="w-10 h-10 rounded-xl bg-[#1877F2] flex items-center justify-center text-white font-bold shadow-md">f</div>
           <div className="w-10 h-10 rounded-xl bg-[#0A66C2] flex items-center justify-center text-white font-bold shadow-md">in</div>
        </div>
      </motion.div>


      {/* Bottom Right Cards */}
      <motion.div 
        animate={{ y: [0, 20, 0], rotate: [8, 12, 8] }}
        transition={{ repeat: Infinity, duration: 7, ease: "easeInOut", delay: 0.2 }}
        className="hidden xl:block absolute bottom-16 right-[8%] w-[22rem] bg-[#F1F5F9] rounded-[2rem] shadow-[0_20px_50px_-15px_rgba(0,0,0,0.15)] border border-white p-6 rotate-[8deg]"
      >
        <div className="absolute -top-6 left-6 w-4 h-12 border-2 border-neutral-300 rounded-full bg-white z-10 shadow-sm rotate-12"></div>
        <div className="space-y-4 relative z-0">
          <div className="bg-white rounded-2xl p-4 shadow-sm flex items-center justify-between border border-neutral-100">
            <div className="flex items-center gap-4">
              <div className="relative w-10 h-10 rounded-full bg-blue-500 flex items-center justify-center text-white font-bold text-sm">
                MJ
                <div className="absolute bottom-0 right-0 w-3 h-3 bg-sky-400 border-2 border-white rounded-full"></div>
              </div>
              <div>
                <p className="text-sm font-bold text-neutral-900">Web Development</p>
                <p className="text-xs text-neutral-500 font-medium">Phase: Front-end UI</p>
              </div>
            </div>
            <MoreVertical className="w-4 h-4 text-neutral-400" />
          </div>
          
          <div className="bg-white rounded-2xl p-4 shadow-sm flex items-center justify-between border border-neutral-100">
            <div className="flex items-center gap-4">
              <div className="relative w-10 h-10 rounded-full bg-indigo-500 flex items-center justify-center text-white font-bold text-sm">
                AD
                <div className="absolute bottom-0 right-0 w-3 h-3 bg-sky-400 border-2 border-white rounded-full"></div>
              </div>
              <div>
                <p className="text-sm font-bold text-neutral-900">App Development</p>
                <p className="text-xs text-neutral-500 font-medium">Phase: API Integration</p>
              </div>
            </div>
            <MoreVertical className="w-4 h-4 text-neutral-400" />
          </div>
        </div>
      </motion.div>

    </section>
  );
}
