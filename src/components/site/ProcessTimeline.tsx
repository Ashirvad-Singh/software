import { motion } from "framer-motion";
import { Compass, Palette, Code2, ShieldCheck, Rocket, CheckCircle2 } from "lucide-react";

interface StepItem {
  num: string;
  title: string;
  subtitle: string;
  description: string;
  tags: string[];
  icon: React.ElementType;
}

const processSteps: StepItem[] = [
  {
    num: "01",
    title: "Discovery & Strategy",
    subtitle: "Understanding your goals",
    description: "Deep dive into your business objectives, target audience, technical roadmap, and core project requirements.",
    tags: ["Goal Mapping", "Architecture", "Project Scope"],
    icon: Compass,
  },
  {
    num: "02",
    title: "Design & UX Architecture",
    subtitle: "Crafting intuitive experiences",
    description: "Creating wireframes, interactive prototypes, user journeys, and modern aesthetic design systems.",
    tags: ["Wireframing", "UI/UX Design", "Prototypes"],
    icon: Palette,
  },
  {
    num: "03",
    title: "Agile Development",
    subtitle: "Engineering scalable code",
    description: "Iterative sprint execution with clean modular code, robust APIs, and high-performance infrastructure.",
    tags: ["Sprint Execution", "API Integration", "Scalable Code"],
    icon: Code2,
  },
  {
    num: "04",
    title: "Quality & Security QA",
    subtitle: "Zero-bug assurance",
    description: "Rigorous automated testing, security vulnerability audits, cross-device performance, and speed tuning.",
    tags: ["Automated Tests", "Security Audit", "Performance Tuning"],
    icon: ShieldCheck,
  },
  {
    num: "05",
    title: "Launch & Continuous Growth",
    subtitle: "Seamless deployment & support",
    description: "Seamless cloud deployment, CI/CD pipeline automation, 24/7 monitoring, and ongoing product evolution.",
    tags: ["Cloud Deploy", "CI/CD Automation", "24/7 Support"],
    icon: Rocket,
  },
];

export default function ProcessTimeline({ hideHeader = false }: { hideHeader?: boolean }) {
  return (
    <section
      id="process"
      className="w-full py-12 sm:py-16 lg:py-24 bg-gradient-to-b from-neutral-50/50 via-white to-neutral-50/30 dark:from-neutral-950 dark:via-neutral-900 dark:to-neutral-950 overflow-hidden relative"
    >
      {/* Decorative ambient background blur */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[300px] bg-primary/5 blur-[120px] rounded-full pointer-events-none" />

      <div className="container max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Header Section */}
        {!hideHeader && (
          <div className="text-center max-w-3xl mx-auto mb-12 sm:mb-16">
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
            >
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-primary/10 text-primary text-xs font-bold uppercase tracking-widest mb-3">
                <CheckCircle2 className="w-3.5 h-3.5" />
                How We Work
              </span>
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight text-neutral-900 dark:text-white leading-[1.15]">
                Our <span className="text-primary">Process</span>
              </h2>
            </motion.div>
            <p className="mx-auto mt-3 max-w-2xl text-fluid-body text-neutral-600 dark:text-neutral-300 leading-relaxed">
              From initial consultation to deployment and scaling, here is how we engineer your vision into high-impact digital products.
            </p>
          </div>
        )}

        {/* Process Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-5 sm:gap-6 relative">
          {processSteps.map((step, idx) => {
            const Icon = step.icon;
            return (
              <motion.div
                key={step.num}
                initial={{ opacity: 0, y: 25 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-30px" }}
                transition={{ duration: 0.5, delay: idx * 0.1 }}
                className="group relative flex flex-col h-full"
              >
                {/* Step Connector Line for Desktop */}
                {idx < processSteps.length - 1 && (
                  <div className="hidden lg:block absolute top-7 -right-3 w-6 h-[2px] bg-neutral-200 dark:bg-neutral-800 z-0 group-hover:bg-primary/50 transition-colors" />
                )}

                {/* Main Process Card */}
                <div className="flex-1 bg-white dark:bg-neutral-900/90 rounded-2xl p-5 sm:p-6 border border-neutral-200/80 dark:border-neutral-800/80 shadow-sm group-hover:shadow-xl group-hover:border-primary/40 group-hover:-translate-y-1.5 transition-all duration-300 flex flex-col justify-between relative overflow-hidden">
                  
                  {/* Glowing Top Border Highlight on Hover */}
                  <div className="absolute top-0 inset-x-0 h-1 bg-gradient-to-r from-primary/80 to-sky-400 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

                  <div>
                    {/* Header Row: Step Badge & Icon */}
                    <div className="flex items-center justify-between mb-4">
                      <span className="text-xs font-extrabold tracking-wider uppercase px-2.5 py-1 rounded-md bg-primary/10 text-primary font-mono">
                        STEP {step.num}
                      </span>
                      <div className="w-10 h-10 rounded-xl bg-neutral-100 dark:bg-neutral-800 text-neutral-700 dark:text-neutral-200 group-hover:bg-primary group-hover:text-white flex items-center justify-center transition-all duration-300 shadow-xs">
                        <Icon className="w-5 h-5 stroke-[2]" />
                      </div>
                    </div>

                    {/* Title & Subtitle */}
                    <h3 className="text-base sm:text-lg font-bold text-neutral-900 dark:text-white tracking-tight leading-snug group-hover:text-primary transition-colors">
                      {step.title}
                    </h3>
                    <p className="text-xs font-semibold text-primary/80 dark:text-sky-400 mt-0.5 mb-2">
                      {step.subtitle}
                    </p>

                    {/* Description */}
                    <p className="text-xs sm:text-sm text-neutral-600 dark:text-neutral-400 leading-relaxed">
                      {step.description}
                    </p>
                  </div>

                  {/* Deliverable Micro Tags */}
                  <div className="mt-5 pt-4 border-t border-neutral-100 dark:border-neutral-800/60 flex flex-wrap gap-1.5">
                    {step.tags.map((tag) => (
                      <span
                        key={tag}
                        className="text-[10px] sm:text-[11px] font-medium px-2 py-0.5 rounded-full bg-neutral-100 dark:bg-neutral-800 text-neutral-600 dark:text-neutral-400 border border-neutral-200/50 dark:border-neutral-700/50"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
