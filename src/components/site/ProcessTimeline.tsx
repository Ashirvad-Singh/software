import { useState } from "react";
import ParticleWave from "@/components/ui/particle-wave";
import { motion } from "framer-motion";

const processSteps = [
  {
    number: "01",
    title: "Discovery & Strategy",
    description: "Deep dive into business goals, user needs, and strategic technical roadmap.",
  },
  {
    number: "02",
    title: "Architecture & UI/UX",
    description: "Designing scalable cloud architecture, wireframes, and intuitive user interfaces.",
  },
  {
    number: "03",
    title: "Agile Development",
    description: "Iterative sprint coding, robust API integrations, and clean code standards.",
  },
  {
    number: "04",
    title: "Quality & Security",
    description: "Rigorous automated testing, security audits, and multi-device performance tuning.",
  },
  {
    number: "05",
    title: "Deployment & Scaling",
    description: "Production cloud launch, real-time monitoring, and continuous product evolution.",
  },
];


export default function ProcessTimeline({ hideHeader = false }: { hideHeader?: boolean }) {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  return (
    <section id="process" className={`w-full bg-gradient-to-b from-white via-sky-50/50 to-slate-100/90 dark:from-[#060D27] dark:via-[#050B1E] dark:to-[#020617] border-y border-neutral-200/80 dark:border-sky-500/20 text-foreground relative overflow-hidden py-10 md:py-16`}>
      <div className="w-full max-w-[1600px] mx-auto px-4 sm:px-8 md:px-12 lg:px-16 relative z-10">
        {!hideHeader && (
          <div className="text-center max-w-3xl mx-auto mb-12 sm:mb-16">
            <h2 className="text-xs sm:text-sm font-bold text-sky-600 dark:text-sky-400 tracking-widest uppercase mb-3">
              How We Work
            </h2>
            <h3 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-neutral-900 dark:text-white">
              Our Process
            </h3>
          </div>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-16 items-start pb-10 md:pb-16">
          {/* Left Column */}
          <div className="lg:col-span-5 flex flex-col justify-between h-full">
            <div>
              <h3 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold tracking-tight text-neutral-900 dark:text-white leading-tight">
                Your Path <br className="hidden sm:inline" />
                to Success
              </h3>
              <p className="mt-5 text-sm sm:text-base leading-relaxed text-neutral-600 dark:text-sky-200/70 max-w-md font-normal">
                ADAT Soft Solutions offers a structured engineering approach to scaling your business, ensuring you have the right strategies, architecture, and continuous execution.
              </p>
            </div>

            {/* Large Outline Arrow */}
            <div className="mt-10 lg:mt-20 text-sky-500/25 dark:text-sky-500/25">
              <svg
                className="w-24 h-24 sm:w-32 sm:h-32"
                viewBox="0 0 100 100"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M20 80L80 20M80 20H35M80 20V65"
                  stroke="currentColor"
                  strokeWidth="3.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </div>
          </div>

          {/* Right Column: Process Steps List */}
          <div className="lg:col-span-7 flex flex-col border-t border-neutral-200/80 dark:border-sky-900/40">
            {processSteps.map((step, index) => {
              const isHovered = hoveredIndex === index;
              return (
                <motion.div
                  key={step.number}
                  initial={{ opacity: 0, x: 20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: index * 0.08 }}
                  onMouseEnter={() => setHoveredIndex(index)}
                  onMouseLeave={() => setHoveredIndex(null)}
                  className={`py-6 border-b border-neutral-200/80 dark:border-sky-900/40 grid grid-cols-1 md:grid-cols-12 items-center gap-4 transition-all duration-300 ${
                    isHovered ? "bg-sky-500/10 px-4 rounded-xl border-sky-300 dark:border-sky-500/40" : "px-2"
                  }`}
                >
                  {/* Number Circle & Step Title */}
                  <div className="md:col-span-6 flex items-center gap-4 sm:gap-6">
                    <div className={`site-step-badge w-10 h-10 sm:w-11 sm:h-11 rounded-full border flex items-center justify-center text-xs sm:text-sm font-semibold shrink-0 transition-colors ${
                      isHovered
                        ? "border-sky-500 bg-sky-500 text-white shadow-md shadow-sky-500/30"
                        : "border-sky-200 dark:border-sky-400/30 text-sky-600 dark:text-sky-200 bg-sky-50 dark:bg-sky-950/30"
                    }`}>
                      {step.number}
                    </div>
                    <h4 className="text-base sm:text-lg lg:text-xl font-bold text-neutral-900 dark:text-white tracking-wide">
                      {step.title}
                    </h4>
                  </div>

                  {/* Step Description */}
                  <div className="md:col-span-6">
                    <p className="text-xs sm:text-sm text-neutral-600 dark:text-sky-200/70 leading-relaxed font-normal">
                      {step.description}
                    </p>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>

      {/* 3D Particle Mesh Background */}
      <ParticleWave />
    </section>
  );
}

