
import { motion } from "framer-motion";
import { Search, Lightbulb, Rocket } from "lucide-react";

export default function WhatSetsUsApart() {
  return (
    <section className="py-10 md:py-16 relative overflow-hidden bg-white w-full">
      {/* Background Wireframe Elements */}
      <div className="absolute top-10 left-10 opacity-30 pointer-events-none hidden lg:block">
        <svg width="180" height="180" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
          {/* Green Triangle Wireframe */}
          <path d="M50 5L95 85H5Z" stroke="#86efac" strokeWidth="0.5" strokeLinejoin="round"/>
          <path d="M50 5V85" stroke="#86efac" strokeWidth="0.5"/>
          <path d="M27.5 45H72.5" stroke="#86efac" strokeWidth="0.5"/>
          <path d="M5 85L72.5 45" stroke="#86efac" strokeWidth="0.5"/>
          <path d="M95 85L27.5 45" stroke="#86efac" strokeWidth="0.5"/>
        </svg>
      </div>
      
      <div className="absolute top-64 left-64 opacity-30 pointer-events-none hidden lg:block">
        <svg width="220" height="220" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
          {/* Orange Circle Wireframe */}
          <circle cx="50" cy="50" r="45" stroke="#fed7aa" strokeWidth="0.5"/>
          <path d="M5 50H95" stroke="#fed7aa" strokeWidth="0.5"/>
          <path d="M18 18L82 82" stroke="#fed7aa" strokeWidth="0.5"/>
          <path d="M18 82L82 18" stroke="#fed7aa" strokeWidth="0.5"/>
        </svg>
      </div>

      <div className="absolute bottom-10 left-20 opacity-30 pointer-events-none hidden lg:block rotate-[-15deg]">
        <svg width="160" height="100" viewBox="0 0 160 100" fill="none" xmlns="http://www.w3.org/2000/svg">
          {/* Blue Envelope/Rectangle Wireframe */}
          <rect x="5" y="5" width="150" height="90" stroke="#93c5fd" strokeWidth="0.5"/>
          <path d="M5 5L155 95" stroke="#93c5fd" strokeWidth="0.5"/>
          <path d="M5 95L155 5" stroke="#93c5fd" strokeWidth="0.5"/>
          <circle cx="80" cy="50" r="30" stroke="#93c5fd" strokeWidth="0.5"/>
        </svg>
      </div>

      <div className="container mx-auto px-4 sm:px-6 md:px-8 max-w-7xl relative z-10">
        <div className="grid grid-cols-1 xl:grid-cols-2 gap-8 lg:gap-8 items-center">
          
          {/* Left Side: Content */}
          <div className="flex flex-col justify-center max-w-lg">
            <motion.h2 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-fluid-h2 font-bold mb-4 sm:mb-6 text-gray-900"
            >
              What Sets Us <span className="text-primary italic font-serif font-medium">Apart!</span>
            </motion.h2>
            
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-fluid-body text-gray-600 mb-6"
            >
              Our expertise lies in crafting bespoke web solutions, optimizing digital strategies, and delivering measurable results.
            </motion.p>
            
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="text-gray-900"
            >
              <span className="font-semibold">Vijay Vikram Singh</span>, <span className="italic text-gray-600">Founder</span>
            </motion.div>
          </div>

          {/* Right Side: Cards */}
          <div className="flex flex-col md:grid md:grid-cols-2 xl:flex xl:flex-col gap-4 sm:gap-6 md:gap-6 xl:gap-0 xl:space-y-6 relative">
            
            {/* Card 1: Research */}
            <motion.div 
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="bg-[#dcfce7] rounded-xl p-4 sm:p-5 md:p-6 lg:p-8 border border-black/15 shadow-sm flex flex-col sm:flex-row md:flex-col xl:flex-row items-center sm:items-start gap-4 sm:gap-6 ml-0 xl:ml-12 hover:shadow-md transition-shadow relative overflow-hidden group"
            >
              <div className="site-icon-tile bg-white/60 p-4 rounded-full shrink-0 relative z-10 group-hover:scale-110 transition-transform duration-300">
                <Search className="w-10 h-10 text-green-600" />
              </div>
              <div className="relative z-10 min-w-0 text-center sm:text-left">
                <h3 className="text-2xl font-semibold mb-3 text-gray-900">Research</h3>
                <p className="text-gray-700 leading-relaxed text-sm">
                  We Dive Deep Into Understanding Your Brand, Audience, And Goals, Uncovering Insights To Shape Your Digital Success.
                </p>
              </div>
              {/* Decorative faint pattern */}
              <div className="absolute right-0 top-0 opacity-10 pointer-events-none translate-x-1/4 -translate-y-1/4">
                <Search className="w-48 h-48 text-green-900" />
              </div>
            </motion.div>

            {/* Card 2: Strategy */}
            <motion.div 
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="bg-[#bfdbfe] rounded-xl p-4 sm:p-5 md:p-6 lg:p-8 border border-black/15 shadow-sm flex flex-col sm:flex-row md:flex-col xl:flex-row items-center sm:items-start gap-4 sm:gap-6 mr-0 xl:mr-12 hover:shadow-md transition-shadow relative overflow-hidden group"
            >
              <div className="site-icon-tile bg-white/60 p-4 rounded-full shrink-0 relative z-10 group-hover:scale-110 transition-transform duration-300">
                <Lightbulb className="w-10 h-10 text-blue-600" />
              </div>
              <div className="relative z-10 min-w-0 text-center sm:text-left">
                <h3 className="text-2xl font-semibold mb-3 text-gray-900">Strategy</h3>
                <p className="text-gray-700 leading-relaxed text-sm">
                  We Craft Tailored Plans That Combine Creativity And Data To Align Your Vision With Measurable Outcomes.
                </p>
              </div>
              {/* Decorative faint pattern */}
              <div className="absolute right-0 top-0 opacity-10 pointer-events-none translate-x-1/4 -translate-y-1/4">
                <Lightbulb className="w-48 h-48 text-blue-900" />
              </div>
            </motion.div>

            {/* Card 3: Execution */}
            <motion.div 
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.5 }}
              className="bg-[#e9d5ff] rounded-xl p-4 sm:p-5 md:p-6 lg:p-8 border border-black/15 shadow-sm flex flex-col sm:flex-row md:flex-col xl:flex-row items-center sm:items-start gap-4 sm:gap-6 ml-0 xl:ml-24 hover:shadow-md transition-shadow relative overflow-hidden group md:col-span-2 xl:col-span-1"
            >
              <div className="site-icon-tile bg-white/60 p-4 rounded-full shrink-0 relative z-10 group-hover:scale-110 transition-transform duration-300">
                <Rocket className="w-10 h-10 text-purple-600" />
              </div>
              <div className="relative z-10 min-w-0 text-center sm:text-left">
                <h3 className="text-2xl font-semibold mb-3 text-gray-900">Execution</h3>
                <p className="text-gray-700 leading-relaxed text-sm">
                  We Bring Concepts To Life With Precision, Ensuring Every Detail Works Seamlessly To Achieve Impactful Results.
                </p>
              </div>
              {/* Decorative faint pattern */}
              <div className="absolute right-0 top-0 opacity-10 pointer-events-none translate-x-1/4 -translate-y-1/4">
                <Rocket className="w-48 h-48 text-purple-900" />
              </div>
            </motion.div>

          </div>
        </div>
      </div>
    </section>
  );
}
