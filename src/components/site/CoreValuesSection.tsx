import { motion } from "framer-motion";
import {
  ShieldCheck,
  Code2,
  MessageSquareCheck,
  Zap,
  Sparkles,
  Globe2,
} from "lucide-react";

const coreValues = [
  {
    icon: ShieldCheck,
    title: "Client-Centric Ownership & Trust",
    description:
      "We treat every client project with deep personal ownership, delivering honest recommendations, resilient code, and measurable business growth.",
  },
  {
    icon: Code2,
    title: "Engineering & Technical Excellence",
    description:
      "We build on modern tech stacks, clean code principles, and scalable system architecture engineered for high performance and longevity.",
  },
  {
    icon: MessageSquareCheck,
    title: "Radical Transparency & Clarity",
    description:
      "No hidden surprises or jargon. We maintain clear sprint updates, transparent progress tracking, and open communication at every phase.",
  },
  {
    icon: Zap,
    title: "Agile Speed & Execution Focus",
    description:
      "We balance rapid time-to-market with uncompromising software quality, helping businesses launch fast and scale continuously.",
  },
  {
    icon: Sparkles,
    title: "Continuous Learning & Self-Mastery",
    description:
      "We foster curiosity and continuous upskilling, empowering our team to push technical boundaries and grow into top-tier industry leaders.",
  },
  {
    icon: Globe2,
    title: "Think Big & Build for Global Scale",
    description:
      "From local startups to enterprise platforms, we design resilient digital products built to handle global traffic and long-term expansion.",
  },
];


export default function CoreValuesSection() {
  return (
    <section className="py-10 md:py-16 bg-background overflow-hidden w-full border-t border-border/40">
      <div className="container max-w-6xl mx-auto px-4 sm:px-6 md:px-8">
        <div className="text-center max-w-3xl mx-auto mb-14 sm:mb-16">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight text-neutral-900 dark:text-white"
          >
            Our <span className="text-sky-500 bg-clip-text text-transparent bg-gradient-to-r from-sky-500 to-blue-600">Core Values</span>
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="mt-4 text-sm sm:text-base md:text-lg text-muted-foreground leading-relaxed font-medium"
          >
            Our values drive how we work, grow and lead individually and as a team. They were shaped by the voices and experiences of the people who make ADAT what it is.
          </motion.p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 sm:gap-10 lg:gap-12">
          {coreValues.map((item, index) => {
            const Icon = item.icon;
            return (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: index * 0.08 }}
                className="flex items-start gap-4 sm:gap-5 group p-4 sm:p-5 rounded-2xl transition-all duration-300 hover:bg-sky-500/5 dark:hover:bg-neutral-900/60 border border-transparent hover:border-sky-200/60 dark:hover:border-neutral-800"
              >
                <div className="w-12 h-12 rounded-2xl bg-sky-50 dark:bg-neutral-800 border border-sky-100 dark:border-neutral-700/80 flex items-center justify-center text-sky-600 dark:text-sky-400 shrink-0 shadow-xs group-hover:scale-110 group-hover:bg-sky-500 group-hover:text-white transition-all duration-300">
                  <Icon className="w-6 h-6" strokeWidth={1.75} />
                </div>
                <div>
                  <h3 className="text-base sm:text-lg font-bold text-neutral-900 dark:text-white mb-1.5 group-hover:text-sky-600 dark:group-hover:text-sky-400 transition-colors">
                    {item.title}
                  </h3>
                  <p className="text-sm text-neutral-600 dark:text-neutral-400 leading-relaxed">
                    {item.description}
                  </p>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
