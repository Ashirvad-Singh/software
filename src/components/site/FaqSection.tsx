import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown, HelpCircle, Sparkles, MessageSquare } from "lucide-react";
import { Link } from "react-router-dom";

interface FaqItem {
  question: string;
  answer: string;
  category: "General" | "Security & IP" | "Process" | "Tech & AI";
}

const faqs: FaqItem[] = [
  {
    category: "Process",
    question: "How quickly can Adat Soft Solutions initiate a new project?",
    answer:
      "We can onboard dedicated engineering teams within 48 to 72 hours following requirement discovery and contract alignment. For scoped fixed-price projects, discovery and kickoff begin immediately with a structured 1-week sprint plan.",
  },
  {
    category: "Security & IP",
    question: "Do clients retain 100% ownership of source code and Intellectual Property (IP)?",
    answer:
      "Yes, absolutely. Upon project completion and milestone delivery, 100% of the source code, architecture designs, trademarks, and intellectual property rights are legally transferred to your organization. We sign strict Non-Disclosure Agreements (NDAs) prior to any code discussion.",
  },
  {
    category: "Tech & AI",
    question: "Can you integrate custom AI models (LLMs, RAG, OpenAI, Claude) into existing software?",
    answer:
      "Yes! Our AI engineering team specializes in fine-tuning open-source LLMs (Llama 3, Mistral), building Retrieval-Augmented Generation (RAG) pipelines over proprietary enterprise data, and integrating OpenAI, Anthropic Claude, and Gemini APIs directly into web and mobile apps.",
  },
  {
    category: "Security & IP",
    question: "What security standards and compliance frameworks do you adhere to?",
    answer:
      "We follow OWASP Top 10 security guidelines, zero-trust architecture, SOC2 compliance protocols, and end-to-end encryption in transit (TLS 1.3) and at rest (AES-256). All database schema interactions and API endpoints undergo rigorous vulnerability testing.",
  },
  {
    category: "Process",
    question: "What engagement models do you offer for software development?",
    answer:
      "We offer three flexible client engagement models: 1) Dedicated Engineering Squads (Monthly retainer with full agility), 2) Fixed-Price Milestone Deliveries (Strict budget & scope guarantee), and 3) Staff Augmentation (Embedding senior developers directly into your in-house team).",
  },
  {
    category: "Tech & AI",
    question: "What post-launch SLA, support, and maintenance packages do you provide?",
    answer:
      "Every production release includes 30 to 90 days of post-launch warranty support. Beyond launch, we provide SLA-backed maintenance retainer plans featuring 24/7 uptime monitoring, automated cloud backups, security patch updates, and ongoing feature enhancement sprints.",
  },
];

export default function FaqSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);
  const [selectedCategory, setSelectedCategory] = useState<string>("All");

  const categories = ["All", "Process", "Security & IP", "Tech & AI"];

  const filteredFaqs =
    selectedCategory === "All"
      ? faqs
      : faqs.filter((faq) => faq.category === selectedCategory);

  return (
    <section className="py-12 md:py-16 bg-white dark:bg-neutral-950 font-sans border-t border-neutral-200 dark:border-neutral-800">
      <div className="container mx-auto px-4 max-w-5xl">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-neutral-100 dark:bg-neutral-900 text-neutral-800 dark:text-neutral-200 text-xs font-semibold uppercase tracking-wider mb-4 border border-neutral-200 dark:border-neutral-800"
          >
            <HelpCircle className="w-4 h-4 text-primary" />
            Client Questions & Clarifications
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-neutral-900 dark:text-white"
          >
            Frequently Asked Questions
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="mt-4 text-base text-neutral-600 dark:text-neutral-400 leading-relaxed"
          >
            Everything you need to know about our engineering methodology, security standards, intellectual property ownership, and client engagement options.
          </motion.p>

          {/* Category Filter Pills */}
          <div className="flex flex-wrap justify-center gap-2 mt-8">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => {
                  setSelectedCategory(cat);
                  setOpenIndex(null);
                }}
                className={`px-4 py-2 rounded-full text-xs font-semibold transition-all ${
                  selectedCategory === cat
                    ? "bg-neutral-900 text-white dark:bg-white dark:text-neutral-900 shadow-sm"
                    : "bg-neutral-100 text-neutral-600 dark:bg-neutral-900 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-white"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* FAQ Accordion List */}
        <div className="space-y-4">
          {filteredFaqs.map((faq, idx) => {
            const isOpen = openIndex === idx;
            return (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.05 }}
                className={`rounded-2xl border transition-all duration-300 overflow-hidden ${
                  isOpen
                    ? "border-primary/40 bg-neutral-50/90 dark:bg-neutral-900/60 shadow-md"
                    : "border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-950 hover:border-neutral-300 dark:hover:border-neutral-700"
                }`}
              >
                <button
                  onClick={() => setOpenIndex(isOpen ? null : idx)}
                  className="w-full px-6 py-5 flex items-center justify-between gap-4 text-left font-semibold text-neutral-900 dark:text-white text-base md:text-lg"
                >
                  <span className="flex items-center gap-3">
                    <span className="w-7 h-7 rounded-lg bg-neutral-100 dark:bg-neutral-900 text-neutral-500 dark:text-neutral-400 flex items-center justify-center text-xs font-mono font-bold shrink-0">
                      0{idx + 1}
                    </span>
                    {faq.question}
                  </span>
                  <div
                    className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 transition-transform duration-300 ${
                      isOpen
                        ? "rotate-180 bg-primary text-white"
                        : "bg-neutral-100 dark:bg-neutral-900 text-neutral-500"
                    }`}
                  >
                    <ChevronDown className="w-4 h-4" />
                  </div>
                </button>

                <AnimatePresence>
                  {isOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3 }}
                      className="overflow-hidden"
                    >
                      <div className="px-6 pb-6 pt-2 text-sm md:text-base text-neutral-600 dark:text-neutral-400 leading-relaxed border-t border-neutral-200/50 dark:border-neutral-800/50 ml-10">
                        {faq.answer}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            );
          })}
        </div>

        {/* Bottom Contact Help Card */}
        <div className="mt-12 p-8 rounded-3xl bg-neutral-900 text-white border border-neutral-800 flex flex-col md:flex-row items-center justify-between gap-6 shadow-xl relative overflow-hidden">
          <div className="absolute -right-16 -bottom-16 w-48 h-48 bg-primary/20 rounded-full blur-3xl" />
          <div className="space-y-2 text-center md:text-left z-10">
            <div className="inline-flex items-center gap-1.5 text-xs font-semibold text-primary uppercase tracking-wider">
              <Sparkles className="w-3.5 h-3.5" />
              Have a Custom Technical Requirement?
            </div>
            <h3 className="text-xl md:text-2xl font-bold">
              Let's Discuss Your Architectural Blueprint
            </h3>
            <p className="text-sm text-neutral-400 max-w-xl">
              Schedule a 30-minute discovery consultation with our Principal Solutions Architect to evaluate project feasibility and technology stack options.
            </p>
          </div>
          <Link
            to="/contact"
            className="z-10 bg-white hover:bg-neutral-100 text-neutral-900 font-bold px-6 py-3.5 rounded-full text-sm shrink-0 transition-colors shadow-lg flex items-center gap-2"
          >
            <MessageSquare className="w-4 h-4 text-primary" />
            Book Architecture Call
          </Link>
        </div>
      </div>
    </section>
  );
}
