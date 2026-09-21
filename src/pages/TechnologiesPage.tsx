import { useEffect, useState } from "react";
import { collection, getDocs, orderBy, query } from "firebase/firestore";
import * as LucideIcons from "lucide-react";
import * as TablerIcons from "@tabler/icons-react";
import { motion } from "framer-motion";
import SubBanner from "@/components/site/SubBanner";
import SEO from "@/components/site/SEO";
import { FloatingShapes } from "@/components/ui/floating-shapes";
import { db } from "@/lib/firebase";
import {
  Code2,
  Server,
  ShieldCheck,
  Zap,
  CheckCircle2,
  ArrowRight,
  ChevronDown,
  Sparkles,
  HelpCircle,
  MessageSquare,
} from "lucide-react";
import { Link } from "react-router-dom";

import { staticCategories, type TechCategory } from "@/data/technologyCatalog";
import { technologyIconColor } from "@/data/technologyIconColors";

const pillars = [
  {
    title: "High Performance & Speed",
    description: "Sub-second load times with Lighthouse 95+ scores across mobile and desktop devices.",
    icon: Zap,
  },
  {
    title: "Enterprise Security & Compliance",
    description: "OWASP top 10 compliance, AES-256 encryption, and SOC2 compliant architecture.",
    icon: ShieldCheck,
  },
  {
    title: "99.99% Uptime & Scalability",
    description: "Distributed cloud load balancing and auto-scaling to handle peak user spikes effortlessly.",
    icon: Server,
  },
  {
    title: "100% Code Ownership & IP",
    description: "Full transfer of source code, repository rights, and clean architectural documentation.",
    icon: CheckCircle2,
  },
];

const processSteps = [
  {
    step: "01",
    title: "Tech Audit & Architecture Blueprint",
    detail: "We evaluate your project goals to select the optimal frameworks, database schemas, and cloud deployment topology.",
  },
  {
    step: "02",
    title: "Agile Sprint Development",
    detail: "Our senior engineers write clean, modular, and type-safe code in bi-weekly sprints with continuous integration.",
  },
  {
    step: "03",
    title: "Automated QA & Security Audit",
    detail: "Rigorous unit testing, vulnerability penetration scans, and performance load testing before any release.",
  },
  {
    step: "04",
    title: "Cloud Deployment & Edge CDN",
    detail: "Zero-downtime blue/green deployment to AWS, GCP, or Vercel with global SSL and CDN caching.",
  },
  {
    step: "05",
    title: "24/7 SLA Uptime & Feature Updates",
    detail: "Continuous monitoring, automated database backups, security patches, and ongoing enhancement sprints.",
  },
];

const techFaqs = [
  {
    q: "How do you select the right technology stack for a new project?",
    a: "We analyze your expected user volume, performance requirements, security compliance needs, budget, and long-term scalability. For instance, high-traffic SEO sites get Next.js/React, mobile apps receive Flutter or React Native, and data-heavy platforms utilize Node.js or Go with PostgreSQL/Redis.",
  },
  {
    q: "Can you modernize or migrate an existing legacy codebase?",
    a: "Yes! We specialize in legacy code refactoring and incremental cloud migrations. We can wrap legacy systems in REST/GraphQL APIs, migrate monolith databases to cloud-native instances, and rebuild frontends using modern frameworks like React/Next.js without downtime.",
  },
  {
    q: "Do clients retain full ownership of the source code and IP?",
    a: "100% yes. Upon milestone completion, all repository access (GitHub/GitLab), cloud environment credentials, and intellectual property rights are fully transferred to your team.",
  },
  {
    q: "How do you integrate Custom AI models or LLMs into existing software?",
    a: "We build custom RAG pipelines over vector databases (Pinecone/Weaviate), integrate OpenAI/Claude APIs, and deploy fine-tuned open-source models (Llama 3, Mistral) on private cloud instances with strict data privacy.",
  },
];

export default function TechnologiesPage() {
  const [categories, setCategories] = useState<TechCategory[]>(staticCategories);
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  useEffect(() => {
    const fetchTechStack = async () => {
      try {
        const techQuery = query(
          collection(db, "tech_stack"),
          orderBy("createdAt", "asc"),
        );
        const snapshot = await getDocs(techQuery);
        if (!snapshot.empty) {
          const dbData = snapshot.docs.map((document) => ({
            id: document.id,
            ...document.data(),
          })) as TechCategory[];
          setCategories(dbData);
        }
      } catch (error) {
        console.error("Error fetching tech stack:", error);
      }
    };

    fetchTechStack();
  }, []);


  return (
    <main className="min-h-screen bg-white dark:bg-neutral-950 font-sans text-neutral-900 dark:text-white">
      <SEO
        title="Technology Stack & Engineering Capabilities"
        description="Explore Adat Soft Solutions' enterprise tech stack: React, Next.js, Node.js, Flutter, AWS, Python, Shopify, and Custom AI Models built for 99.99% uptime scalability."
        keywords="Adat Tech Stack, React Development, Next.js Agency, Flutter Mobile Apps, AWS Cloud, Node.js Microservices, Python AI"
      />

      {/* SubBanner Header */}
      <SubBanner
        badge="Enterprise Technology Stack"
        title="Modern Engineering"
        highlightTitle="Tools & Frameworks"
        subtitle="We build high-performance web platforms, cross-platform mobile apps, enterprise AI systems, and cloud infrastructure using battle-tested technology."
      />

      {/* Value Pillars Strip */}
      <section className="py-10 md:py-16 bg-neutral-900 text-white border-y border-neutral-800">
        <div className="container mx-auto px-4 max-w-6xl">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {pillars.map((pillar, idx) => {
              const Icon = pillar.icon;
              return (
                <div
                  key={idx}
                  className="flex items-start gap-4 p-4 rounded-2xl bg-neutral-800/50 border border-neutral-750"
                >
                  <div className="w-10 h-10 rounded-xl bg-primary/20 text-primary flex items-center justify-center shrink-0">
                    <Icon className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="text-sm font-bold text-white leading-snug">
                      {pillar.title}
                    </h3>
                    <p className="text-xs text-neutral-400 mt-1 leading-relaxed">
                      {pillar.description}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>


      {/* Main Technology Grid Section */}
      <section className="py-10 md:py-16 bg-white dark:bg-neutral-950 relative overflow-hidden">
        <FloatingShapes />
        <div className="container relative z-10 mx-auto max-w-7xl px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
            {categories.map((category, index) => {
              const CategoryIcon =
                (LucideIcons as any)[category.categoryIcon] || Code2;

              return (
                <motion.article
                  key={category.id || index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: index * 0.08 }}
                  className="group relative flex flex-col justify-between overflow-hidden rounded-3xl border border-neutral-200 dark:border-neutral-800 bg-neutral-50/60 dark:bg-neutral-900/40 p-6 md:p-8 hover:border-primary/40 hover:bg-white dark:hover:bg-neutral-900 shadow-sm hover:shadow-xl transition-all duration-300"
                >
                  <div>
                    <div className="flex items-center justify-between mb-4">
                      <div className="w-12 h-12 rounded-2xl bg-neutral-900 text-white dark:bg-white dark:text-neutral-900 flex items-center justify-center font-bold shadow-md">
                        <CategoryIcon className="w-6 h-6 text-primary" />
                      </div>
                      <span className="text-[10px] font-bold uppercase tracking-wider px-3 py-1 rounded-full bg-primary/10 text-primary border border-primary/20">
                        {category.technologies?.length || 6} Tools
                      </span>
                    </div>

                    <h2 className="text-xl font-bold text-neutral-900 dark:text-white mb-2">
                      {category.title}
                    </h2>
                    <p className="text-xs md:text-sm text-neutral-600 dark:text-neutral-400 leading-relaxed mb-6">
                      {category.description}
                    </p>

                    {/* Technologies Grid */}
                    <div className="space-y-3">
                      {category.technologies?.map((tech, techIdx) => {
                        const isImage =
                          tech.iconUrl?.startsWith("http") ||
                          tech.iconUrl?.startsWith("data:");
                        const IconComponent = !isImage
                          ? (TablerIcons as any)[tech.iconUrl] ||
                            TablerIcons.IconCode
                          : null;
                        const techSlug = (tech.slug || tech.name).toLowerCase().replace(/[^a-z0-9]/g, "");

                        return (
                          <Link
                            key={techIdx}
                            to={`/technologies/${techSlug}`}
                            className="p-3 rounded-2xl bg-white dark:bg-neutral-950 border border-neutral-200/80 dark:border-neutral-800 flex items-center justify-between gap-3 hover:border-primary/40 hover:bg-neutral-100/50 dark:hover:bg-neutral-900/80 transition-all group/item"
                          >
                            <div className="flex items-center gap-3 min-w-0">
                              <div className="w-8 h-8 rounded-xl bg-neutral-100 dark:bg-neutral-900 flex items-center justify-center shrink-0">
                                {isImage ? (
                                  <img
                                    src={tech.iconUrl}
                                    alt={tech.name}
                                    className="w-5 h-5 object-contain"
                                  />
                                ) : (
                                  <IconComponent
                                    className={`w-5 h-5 ${technologyIconColor(tech.iconUrl)}`}
                                    stroke={1.5}
                                  />
                                )}
                              </div>
                              <div className="min-w-0">
                                <h3 className="text-xs font-bold text-neutral-900 dark:text-white truncate group-hover/item:text-primary transition-colors">
                                  {tech.name}
                                </h3>
                                <p className="text-[10px] text-neutral-500 truncate">
                                  {tech.useCase || tech.description}
                                </p>
                              </div>
                            </div>
                            {tech.badge && (
                              <span className="text-[9px] font-bold px-2 py-0.5 rounded-md bg-neutral-100 dark:bg-neutral-900 text-neutral-600 dark:text-neutral-300 shrink-0">
                                {tech.badge}
                              </span>
                            )}
                          </Link>
                        );
                      })}
                    </div>
                  </div>

                  <div className="mt-8 pt-4 border-t border-neutral-200/60 dark:border-neutral-800 flex items-center justify-between">
                    <span className="text-xs text-neutral-500 font-medium">
                      Enterprise Grade Stack
                    </span>
                    <Link
                      to="/contact"
                      className="text-xs font-bold text-primary hover:underline inline-flex items-center gap-1"
                    >
                      Consult Stack <ArrowRight className="w-3 h-3" />
                    </Link>
                  </div>
                </motion.article>
              );
            })}
          </div>
        </div>
      </section>

      {/* Agile 5-Step Process Timeline Section */}
      <section className="py-10 md:py-16 bg-neutral-50 dark:bg-neutral-900/40 border-t border-neutral-200 dark:border-neutral-800">
        <div className="container mx-auto px-4 max-w-5xl">
          <div className="text-center max-w-3xl mx-auto mb-12">
            <span className="text-xs font-bold uppercase tracking-wider text-primary bg-primary/10 px-3.5 py-1.5 rounded-full border border-primary/20">
              Engineering Lifecycle
            </span>
            <h2 className="text-3xl md:text-4xl font-bold mt-4 text-neutral-900 dark:text-white">
              Our 5-Step Agile Software Delivery Process
            </h2>
            <p className="mt-3 text-neutral-600 dark:text-neutral-400 text-sm md:text-base">
              From architectural blueprint to continuous cloud deployment — how we ensure high quality, zero downtime, and robust performance.
            </p>
          </div>

          <div className="space-y-4">
            {processSteps.map((item, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, x: -15 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.08 }}
                className="p-4 sm:p-6 rounded-2xl bg-white dark:bg-neutral-950 border border-neutral-200 dark:border-neutral-800 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 shadow-sm"
              >
                <div className="flex items-start sm:items-center gap-3.5 sm:gap-4">
                  <span className="site-step-badge w-10 h-10 sm:w-12 sm:h-12 rounded-xl sm:rounded-2xl bg-neutral-900 text-white dark:bg-white dark:text-neutral-900 font-extrabold flex items-center justify-center text-xs sm:text-sm shrink-0">
                    {item.step}
                  </span>
                  <div>
                    <h3 className="text-base sm:text-lg font-bold text-neutral-900 dark:text-white">
                      {item.title}
                    </h3>
                    <p className="text-xs sm:text-sm text-neutral-600 dark:text-neutral-400 mt-1 max-w-2xl leading-relaxed">
                      {item.detail}
                    </p>
                  </div>
                </div>
                <div className="self-end md:self-center shrink-0">
                  <span className="px-3 py-1 rounded-full bg-emerald-100 dark:bg-emerald-950 text-emerald-700 dark:text-emerald-300 text-xs font-semibold flex items-center gap-1.5">
                    <CheckCircle2 className="w-3.5 h-3.5" /> Phase {idx + 1}
                  </span>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Tech Stack FAQ Accordion */}
      <section className="py-10 md:py-16 bg-white dark:bg-neutral-950 border-t border-neutral-200 dark:border-neutral-800">
        <div className="container mx-auto px-4 max-w-4xl">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-neutral-100 dark:bg-neutral-900 text-neutral-800 dark:text-neutral-200 text-xs font-semibold uppercase tracking-wider mb-3 border border-neutral-200 dark:border-neutral-800">
              <HelpCircle className="w-4 h-4 text-primary" />
              Technical FAQ
            </div>
            <h2 className="text-3xl font-bold text-neutral-900 dark:text-white">
              Technology Stack Questions & Answers
            </h2>
          </div>

          <div className="space-y-3">
            {techFaqs.map((faq, idx) => {
              const isOpen = openFaq === idx;
              return (
                <div
                  key={idx}
                  className={`rounded-2xl border transition-all ${
                    isOpen
                      ? "border-primary/40 bg-neutral-50 dark:bg-neutral-900/60"
                      : "border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-950"
                  }`}
                >
                  <button
                    onClick={() => setOpenFaq(isOpen ? null : idx)}
                    className="w-full p-5 flex items-center justify-between gap-4 text-left font-bold text-neutral-900 dark:text-white text-base"
                  >
                    <span>{faq.q}</span>
                    <ChevronDown
                      className={`w-5 h-5 shrink-0 transition-transform ${
                        isOpen ? "rotate-180 text-primary" : "text-neutral-400"
                      }`}
                    />
                  </button>
                  {isOpen && (
                    <div className="px-5 pb-5 text-sm text-neutral-600 dark:text-neutral-400 leading-relaxed border-t border-neutral-200/50 dark:border-neutral-800/50 pt-3">
                      {faq.a}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* CTA Consultation Card */}
      <section className="py-10 md:py-16 bg-neutral-50 dark:bg-neutral-900/50 border-t border-neutral-200 dark:border-neutral-800">
        <div className="container mx-auto px-4 max-w-5xl">
          <div className="p-6 sm:p-8 md:p-12 rounded-3xl bg-neutral-900 text-white border border-neutral-800 flex flex-col md:flex-row items-center justify-between gap-8 shadow-2xl relative overflow-hidden">
            <div className="space-y-3 text-center md:text-left z-10 max-w-2xl">
              <span className="inline-flex items-center gap-1.5 text-xs font-bold text-primary uppercase tracking-wider">
                <Sparkles className="w-4 h-4" /> Need Technology Consultation?
              </span>
              <h2 className="text-2xl md:text-4xl font-bold tracking-tight">
                Ready to Build Your Digital Product With Our Stack?
              </h2>
              <p className="text-xs sm:text-sm text-neutral-300 dark:text-neutral-400 leading-relaxed">
                Book a 30-minute technical architecture discovery session with our Lead Solutions Architect to discuss your database, framework, and cloud deployment requirements.
              </p>
            </div>
            <Link
              to="/contact"
              className="site-button z-10 bg-white hover:bg-neutral-100 text-neutral-900 font-bold px-8 py-4 rounded-full text-sm shrink-0 transition-all shadow-lg hover:scale-105 flex items-center gap-2"
            >
              <MessageSquare className="w-4 h-4 text-primary" />
              Schedule Tech Call
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
