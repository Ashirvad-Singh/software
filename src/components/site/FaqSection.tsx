import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown, HelpCircle, Sparkles, MessageSquare } from "lucide-react";
import { Link } from "react-router-dom";

interface FaqItem {
  question: string;
  answer: string;
  category: string;
}

const faqs: FaqItem[] = [
  {
    category: "Web & Mobile",
    question: "What technologies and frameworks do you use for Web Development?",
    answer:
      "We build fast, secure, scalable, and high-performing web solutions tailored to your business goals. Our core web stack includes React, Next.js, TypeScript, Node.js, Python, and cloud-native databases (PostgreSQL, MongoDB, Redis).",
  },
  {
    category: "Web & Mobile",
    question: "Do you build iOS and Android mobile apps using cross-platform or native frameworks?",
    answer:
      "We transform your ideas into powerful, intuitive, and high-performing mobile applications using cross-platform frameworks like Flutter and React Native for unified iOS & Android delivery, as well as native Swift and Kotlin when platform-specific depth is needed.",
  },
  {
    category: "CMS & E-commerce",
    question: "Which CMS and E-commerce platforms do you build and support?",
    answer:
      "We build, manage, and scale powerful websites and online stores with flexible CMS and eCommerce solutions including Headless CMS architectures (Strapi, Sanity), WordPress/WooCommerce, Shopify, and custom eCommerce platforms designed for seamless content management.",
  },
  {
    category: "UI/UX Design",
    question: "What is included in your UI/UX Design & Prototyping process?",
    answer:
      "We create intuitive, engaging, and user-focused digital experiences with user research, wireframes, interactive Figma prototypes, complete design systems, and seamless interactions built around real user needs before any code is written.",
  },
  {
    category: "Email Marketing",
    question: "How do your Email Marketing services drive customer growth and engagement?",
    answer:
      "We build stronger customer relationships and drive measurable growth with targeted email campaigns, smart automation, responsive email templates, audience segmentation, personalized messaging, and performance-driven analytics.",
  },
  {
    category: "QA & Testing",
    question: "What types of testing do you perform under QA & Software Testing?",
    answer:
      "We deliver reliable, secure, and high-performing digital products with comprehensive QA and software testing across web, mobile, and custom applications including automated end-to-end testing, manual functional testing, cross-browser validation, and security auditing.",
  },
  {
    category: "Process & IP",
    question: "How quickly can Adat Soft Solutions initiate a new project?",
    answer:
      "We can onboard dedicated engineering teams within 48 to 72 hours following requirement discovery and contract alignment. Scoped fixed-price projects begin immediately with a structured sprint plan.",
  },
  {
    category: "Process & IP",
    question: "Do clients retain 100% ownership of source code and Intellectual Property (IP)?",
    answer:
      "Yes, absolutely. Upon milestone completion and final delivery, 100% of source code, architecture designs, trademarks, and intellectual property rights are legally transferred to your organization under strict Non-Disclosure Agreements (NDAs).",
  },
];

export default function FaqSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);
  const [selectedCategory, setSelectedCategory] = useState<string>("All");

  const categories = [
    "All",
    "Web & Mobile",
    "CMS & E-commerce",
    "UI/UX Design",
    "Email Marketing",
    "QA & Testing",
    "Process & IP",
  ];

  const filteredFaqs =
    selectedCategory === "All"
      ? faqs
      : faqs.filter((faq) => faq.category === selectedCategory);

  return (
    <section className="py-10 md:py-16 bg-white dark:bg-neutral-950 font-sans border-t border-neutral-200 dark:border-neutral-800">
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
            className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight text-neutral-900 dark:text-white leading-[1.15]"
          >
            Frequently Asked <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-sky-400">Questions</span>
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="mt-4 text-fluid-body text-neutral-600 dark:text-neutral-400"
          >
            Everything you need to know about our Web & Mobile Development, CMS & E-commerce Solutions, UI/UX Design, Email Marketing, QA Testing, and IP ownership.
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
                key={faq.question}
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
                  className="w-full px-4 sm:px-6 py-5 flex items-center justify-between gap-4 text-left font-semibold text-neutral-900 dark:text-white text-fluid-card-title"
                >
                  <span className="flex items-center gap-3">
                    <span className="site-step-badge w-7 h-7 rounded-lg bg-neutral-100 dark:bg-neutral-900 text-neutral-500 dark:text-neutral-400 flex items-center justify-center text-xs font-mono font-bold shrink-0">
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
                      <div className="px-4 sm:px-6 pb-6 pt-2 text-sm md:text-base text-neutral-600 dark:text-neutral-400 leading-relaxed border-t border-neutral-200/50 dark:border-neutral-800/50 sm:ml-10">
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
        <div className="mt-8 sm:mt-12 p-5 sm:p-8 rounded-3xl bg-neutral-900 text-white border border-neutral-800 flex flex-col md:flex-row items-center justify-between gap-6 shadow-xl relative overflow-hidden">
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
            className="site-button z-10 bg-white hover:bg-neutral-100 text-neutral-900 font-bold px-6 py-3.5 rounded-full text-sm shrink-0 transition-colors shadow-lg flex items-center gap-2"
          >
            <MessageSquare className="w-4 h-4 text-primary" />
            Book Architecture Call
          </Link>
        </div>
      </div>
    </section>
  );
}
