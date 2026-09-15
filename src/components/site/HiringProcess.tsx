import { useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { ArrowUpRight, BriefcaseBusiness, Code2, MessageCircle, Plus, Users } from "lucide-react";

const steps = [
  {
    title: "Apply to open roles",
    subtitle: "Find your next chapter",
    description: "Choose a role that matches your skills and interests. Share your experience through the application form on the job page.",
    detail: "Keep your resume ready. Add your portfolio, relevant skills, and a short introduction so we can get to know your work.",
    icon: BriefcaseBusiness,
    tags: ["Your experience", "Your ambitions"],
  },
  {
    title: "HR screening",
    subtitle: "Let’s get to know you",
    description: "Our team reviews your application and connects with shortlisted candidates to discuss their experience and the opportunity.",
    detail: "We’ll talk about your background, interests, availability, and expectations. It’s also a chance to ask questions about the team.",
    icon: Users,
    tags: ["A conversation", "Shared expectations"],
  },
  {
    title: "Technical interview",
    subtitle: "Show us how you think",
    description: "Walk us through your work, discuss relevant challenges, and show how you approach problems in your area of expertise.",
    detail: "Prepare to explain your contribution to previous projects, the choices you made, and what you learned. The discussion is tailored to the role.",
    icon: Code2,
    tags: ["Your approach", "Your craft"],
  },
  {
    title: "Final HR discussion",
    subtitle: "Explore the next step",
    description: "Discuss the role in more detail, align on expectations, and understand the next steps in the hiring process.",
    detail: "Use this conversation to clarify responsibilities, working arrangements, and any remaining questions before the hiring decision.",
    icon: MessageCircle,
    tags: ["Team alignment", "Next steps"],
  },
];

export default function HiringProcess() {
  const reduceMotion = useReducedMotion();
  const [expanded, setExpanded] = useState<number | null>(null);

  return <section aria-labelledby="hiring-process-heading" className="overflow-hidden border-t border-neutral-100 bg-[#fdfbf8] py-12 md:py-20">
    <div className="mx-auto max-w-6xl px-5 md:px-8">
      <div className="mb-10 flex flex-wrap items-end justify-between gap-6 md:mb-12">
        <div>
          <p className="mb-3 text-xs font-semibold uppercase tracking-[0.2em] text-orange-600">Your journey at Adat</p>
          <h2 id="hiring-process-heading" className="text-3xl font-bold tracking-tight text-neutral-950 md:text-5xl">How To Apply</h2>
          <p className="mt-4 max-w-xl text-base leading-relaxed text-neutral-600">Four steps to explore what we could build together.</p>
        </div>
        <a href="#open-roles" className="site-button inline-flex items-center gap-2 rounded-full bg-neutral-950 px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-orange-600 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-orange-600">Explore open roles <ArrowUpRight aria-hidden="true" size={18} /></a>
      </div>

      <ol className="grid items-start gap-5 md:grid-cols-2 md:gap-6">
        {steps.map((step, index) => {
          const Icon = step.icon;
          const isExpanded = expanded === index;
          return <motion.li key={step.title}
            initial={reduceMotion ? false : { opacity: 0, y: 48, scale: 0.97 }}
            whileInView={{ opacity: 1, y: 0, scale: 1 }}
            viewport={{ once: true, amount: 0.15 }}
            transition={{ duration: reduceMotion ? 0 : 0.55, delay: reduceMotion ? 0 : (index % 2) * 0.08, ease: [0.22, 1, 0.36, 1] }}
            className="group relative isolate overflow-hidden rounded-3xl border border-neutral-200/80 bg-white p-6 shadow-sm transition-[border-color,box-shadow] duration-300 hover:border-orange-200 hover:shadow-xl hover:shadow-orange-950/5 focus-within:border-orange-300 sm:p-8">
            <div aria-hidden="true" className="pointer-events-none absolute -right-10 -top-10 -z-10 h-40 w-40 rounded-full bg-orange-50 opacity-60 transition-transform duration-500 motion-safe:group-hover:scale-150" />
            <div className="mb-8 flex items-center justify-between">
              <span className="flex h-14 w-14 items-center justify-center rounded-2xl border border-orange-100 bg-orange-50 text-orange-600 transition-colors group-hover:bg-orange-600 group-hover:text-white"><Icon aria-hidden="true" size={26} strokeWidth={1.6} /></span>
              <span aria-label={`Step ${index + 1}`} className="site-step-number text-5xl font-semibold tracking-tighter text-neutral-200">0{index + 1}</span>
            </div>
            <p className="mb-2 text-xs font-semibold uppercase tracking-widest text-orange-600">{step.subtitle}</p>
            <h3 className="text-2xl font-bold tracking-tight text-neutral-950">{step.title}</h3>
            <p className="mt-4 text-sm leading-7 text-neutral-600">{step.description}</p>
            <div className="mt-5 flex flex-wrap gap-2">{step.tags.map(tag => <span key={tag} className="rounded-full bg-neutral-100 px-3 py-1 text-xs text-neutral-600">{tag}</span>)}</div>
            <button type="button" aria-expanded={isExpanded} aria-controls={`hiring-step-${index}`} onClick={() => setExpanded(isExpanded ? null : index)} className="mt-7 flex w-full items-center justify-between gap-4 border-t border-neutral-100 pt-5 text-left text-sm font-semibold text-neutral-900 transition-colors hover:text-orange-600 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-orange-600">
              {isExpanded ? "Show less" : "What to expect"}
              <Plus aria-hidden="true" size={18} className={`transition-transform motion-reduce:transition-none ${isExpanded ? "rotate-45" : ""}`} />
            </button>
            <div id={`hiring-step-${index}`}>
              <AnimatePresence initial={false}>{isExpanded && <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }} exit={{ height: 0, opacity: 0 }} transition={{ duration: reduceMotion ? 0 : 0.2 }} className="overflow-hidden"><p className="pt-4 text-sm leading-7 text-neutral-600">{step.detail}</p></motion.div>}</AnimatePresence>
            </div>
          </motion.li>;
        })}
      </ol>
    </div>
  </section>;
}
