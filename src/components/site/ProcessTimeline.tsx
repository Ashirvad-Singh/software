import { motion } from "framer-motion";
import { Compass, Palette, Code2, ShieldCheck, Rocket } from "lucide-react";

interface StepItem {
  num: string;
  title: string;
  description: string;
  cardBg: string;
  badgeTextColor: string;
  icon: React.ElementType;
}

const processSteps: StepItem[] = [
  {
    num: "01",
    title: "Discovery & Scope",
    description: "Deep dive into business goals, user needs, and strategic technical roadmap.",
    cardBg: "bg-gradient-to-br from-rose-500 to-rose-600 shadow-rose-500/25 hover:shadow-rose-500/40",
    badgeTextColor: "text-rose-600 dark:text-rose-400",
    icon: Compass,
  },
  {
    num: "02",
    title: "Design & UI/UX",
    description: "Prioritize intuitive user journeys, wireframes, and storytelling visuals.",
    cardBg: "bg-gradient-to-br from-orange-500 to-amber-500 shadow-orange-500/25 hover:shadow-orange-500/40",
    badgeTextColor: "text-orange-600 dark:text-orange-400",
    icon: Palette,
  },
  {
    num: "03",
    title: "Agile Build",
    description: "Iterative sprint coding, robust APIs, and scalable architecture.",
    cardBg: "bg-gradient-to-br from-sky-500 to-blue-600 shadow-sky-500/25 hover:shadow-sky-500/40",
    badgeTextColor: "text-sky-600 dark:text-sky-400",
    icon: Code2,
  },
  {
    num: "04",
    title: "Quality Assurance",
    description: "Automated testing, security audits, and cross-device performance tuning.",
    cardBg: "bg-gradient-to-br from-purple-500 to-indigo-600 shadow-purple-500/25 hover:shadow-purple-500/40",
    badgeTextColor: "text-purple-600 dark:text-purple-400",
    icon: ShieldCheck,
  },
  {
    num: "05",
    title: "Launch & Scale",
    description: "Seamless cloud deployment, store publishing, and 24/7 support.",
    cardBg: "bg-gradient-to-br from-emerald-500 to-teal-600 shadow-emerald-500/25 hover:shadow-emerald-500/40",
    badgeTextColor: "text-emerald-600 dark:text-emerald-400",
    icon: Rocket,
  },
];

export default function ProcessTimeline({ hideHeader = false }: { hideHeader?: boolean }) {
  return (
    <section
      id="process"
      className="w-full bg-transparent py-14 sm:py-20 lg:py-24 overflow-hidden relative"
    >
      <div className="container max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Header Section */}
        {!hideHeader && (
          <div className="text-center max-w-3xl mx-auto mb-12 sm:mb-16 lg:mb-20">
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
            >
              <p className="mb-1.5 text-xs sm:text-sm font-bold uppercase tracking-widest text-primary">
                How We Work
              </p>
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight text-neutral-900 dark:text-white text-balance leading-[1.15]">
                Our <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-sky-400">Process</span>
              </h2>
            </motion.div>
            <p className="mx-auto mt-2 max-w-2xl text-fluid-body text-neutral-500 dark:text-neutral-400">
              From initial consultation to deployment and scaling, here is how we bring your vision to life.
            </p>
          </div>
        )}

        {/* 5 Cards Grid Section */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6 sm:gap-6 lg:gap-4 xl:gap-6 relative items-start">
          {processSteps.map((step, idx) => {
            const Icon = step.icon;
            const isLower = idx % 2 === 1;

            return (
              <div key={step.num} className="relative flex flex-col w-full">
                {/* Connecting Curved Arrow SVG (Desktop only) */}
                {idx < processSteps.length - 1 && (
                  <div
                    className={`hidden lg:block absolute -right-6 ${
                      isLower ? "top-10" : "top-24"
                    } w-10 h-10 z-20 pointer-events-none`}
                  >
                    <svg
                      className="w-full h-full text-neutral-400 dark:text-neutral-600 overflow-visible"
                      viewBox="0 0 40 40"
                      fill="none"
                    >
                      {isLower ? (
                        /* Upward Arc Arrow */
                        <g>
                          <path
                            d="M 2 30 Q 20 5 38 15"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                          />
                          <path
                            d="M 30 14 L 38 15 L 35 7"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                        </g>
                      ) : (
                        /* Downward Arc Arrow */
                        <g>
                          <path
                            d="M 2 10 Q 20 35 38 25"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                          />
                          <path
                            d="M 30 24 L 38 25 L 35 33"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                        </g>
                      )}
                    </svg>
                  </div>
                )}

                <motion.div
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-40px" }}
                  transition={{ duration: 0.5, delay: idx * 0.08 }}
                  className={`w-full relative transition-all duration-300 ${
                    isLower ? "lg:mt-12" : ""
                  }`}
                >
                  {/* Top-Left Floating Number Pill Badge */}
                  <div className="absolute -top-3.5 left-4 z-20 px-3 py-0.5 rounded-full bg-white dark:bg-neutral-900 border border-neutral-100 dark:border-neutral-800 shadow-md flex items-center justify-center">
                    <span className={`text-xs sm:text-sm font-black font-sans ${step.badgeTextColor}`}>
                      {step.num}
                    </span>
                  </div>

                  {/* Main Colorful Card */}
                  <div
                    className={`${step.cardBg} rounded-[26px] p-5 sm:p-6 shadow-xl min-h-[220px] sm:min-h-[240px] flex flex-col justify-between relative overflow-hidden text-white transition-all duration-300 hover:-translate-y-1.5`}
                  >
                    {/* Card Text Content */}
                    <div className="pt-2">
                      <h3 className="text-base sm:text-lg font-extrabold tracking-tight leading-snug text-white">
                        {step.title}
                      </h3>
                      <p className="mt-2 text-xs sm:text-sm font-medium leading-relaxed text-white/90">
                        {step.description}
                      </p>
                    </div>

                    {/* Bottom-Right Floating White Icon Badge */}
                    <div className="self-end mt-4 p-2.5 rounded-xl bg-white/95 dark:bg-neutral-900/90 shadow-md flex items-center justify-center text-neutral-900 dark:text-white border border-white/50 backdrop-blur-xs">
                      <Icon className="w-4 h-4 sm:w-5 sm:h-5 stroke-[2.2]" />
                    </div>
                  </div>
                </motion.div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

