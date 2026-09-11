import HomeServicesSection from "@/components/site/HomeServicesSection";
import SubBanner from "@/components/site/SubBanner";
import FaqSection from "@/components/site/FaqSection";
import { motion } from "framer-motion";
import { Code2, Cpu, Zap, Layers, CheckCircle2, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";

const serviceCapabilities = [
  {
    title: "Full-Stack Web Engineering",
    description: "Enterprise-grade web platforms built with React, Next.js, Node.js, and Serverless cloud architectures designed to handle millions of requests daily.",
    icon: Code2,
    deliverables: [
      "Modern React / Next.js SSR & SSG Frontends",
      "RESTful & GraphQL API Architectures",
      "PostgreSQL, MongoDB & Redis Caching",
      "CI/CD Automated Deployment Pipelines",
    ],
  },
  {
    title: "Cross-Platform Mobile Apps",
    description: "Native-performing iOS and Android applications developed using Flutter and React Native with offline sync, biometric security, and push notifications.",
    icon: Layers,
    deliverables: [
      "Single Codebase iOS & Android Apps",
      "Native Module Integrations & Bluetooth",
      "Offline First Architecture & SQLite",
      "App Store & Google Play Publishing",
    ],
  },
  {
    title: "Enterprise AI & LLM Systems",
    description: "Custom AI solutions leveraging Fine-tuned LLMs, Retrieval-Augmented Generation (RAG), and custom AI agents to automate complex enterprise workflows.",
    icon: Cpu,
    deliverables: [
      "RAG Vector Database Search (Pinecone / Weaviate)",
      "Private Enterprise LLM Deployment",
      "Autonomous AI Customer Support Agents",
      "AI Data Extraction & Document Analysis",
    ],
  },
  {
    title: "Cloud Infrastructure & DevOps",
    description: "Robust AWS, Google Cloud, and Azure cloud infrastructure with infrastructure-as-code (Terraform), Kubernetes orchestration, and 99.99% uptime SLAs.",
    icon: Zap,
    deliverables: [
      "Docker & Kubernetes Containerization",
      "AWS Lambda & Serverless Compute",
      "Zero-Downtime Blue/Green Deployments",
      "SOC2 & OWASP Security Audit Hardening",
    ],
  },
];

export default function ServicesPage() {
  return (
    <main className="min-h-screen bg-white dark:bg-neutral-950">
      {/* SubBanner Header */}
      <SubBanner
        badge="Enterprise Software Capabilities"
        title="Custom Digital"
        highlightTitle="Services & Solutions"
        subtitle="From high-scale Web Platforms and Cross-Platform Mobile Apps to Enterprise AI Systems — we build reliable, future-proof software tailored to your growth."
      />

      {/* Metrics & Guarantees Strip */}
      <section className="py-10 md:py-16 bg-neutral-900 text-white border-y border-neutral-800">
        <div className="container mx-auto px-4 max-w-6xl">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            <div>
              <div className="text-3xl md:text-4xl font-extrabold text-primary">50+</div>
              <div className="text-xs md:text-sm text-neutral-400 mt-1 font-medium">
                Production Apps Shipped
              </div>
            </div>
            <div>
              <div className="text-3xl md:text-4xl font-extrabold text-white">99.99%</div>
              <div className="text-xs md:text-sm text-neutral-400 mt-1 font-medium">
                Uptime SLA Guarantee
              </div>
            </div>
            <div>
              <div className="text-3xl md:text-4xl font-extrabold text-primary">100%</div>
              <div className="text-xs md:text-sm text-neutral-400 mt-1 font-medium">
                Source Code & IP Transfer
              </div>
            </div>
            <div>
              <div className="text-3xl md:text-4xl font-extrabold text-white">48 Hrs</div>
              <div className="text-xs md:text-sm text-neutral-400 mt-1 font-medium">
                Squad Onboarding SLA
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Main Interactive Services Accordion */}
      <HomeServicesSection showAll hideHeader />

      {/* Detailed Capabilities Grid */}
      <section className="py-10 md:py-16 bg-neutral-50 dark:bg-neutral-900/40 border-t border-neutral-200 dark:border-neutral-800">
        <div className="container mx-auto px-4 max-w-6xl">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <span className="text-xs font-bold uppercase tracking-wider text-primary bg-primary/10 px-3.5 py-1.5 rounded-full border border-primary/20">
              Technical Deliverables
            </span>
            <h2 className="text-3xl md:text-4xl font-bold mt-4 text-neutral-900 dark:text-white">
              What You Receive With Every Engineering Partnership
            </h2>
            <p className="mt-3 text-neutral-600 dark:text-neutral-400 text-sm md:text-base">
              Every project comes bundled with clean architecture documentation, automated testing coverage, security hardening, and complete IP transfer.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {serviceCapabilities.map((capability, idx) => {
              const Icon = capability.icon;
              return (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: idx * 0.1 }}
                  className="bg-white dark:bg-neutral-950 p-8 rounded-3xl border border-neutral-200 dark:border-neutral-800 shadow-sm hover:shadow-md transition-all flex flex-col justify-between"
                >
                  <div>
                    <div className="w-12 h-12 rounded-2xl bg-neutral-900 dark:bg-white text-white dark:text-neutral-900 flex items-center justify-center mb-6">
                      <Icon className="w-6 h-6" />
                    </div>
                    <h3 className="text-xl font-bold text-neutral-900 dark:text-white mb-2">
                      {capability.title}
                    </h3>
                    <p className="text-neutral-600 dark:text-neutral-400 text-sm leading-relaxed mb-6">
                      {capability.description}
                    </p>

                    <div className="space-y-2.5 pt-4 border-t border-neutral-100 dark:border-neutral-800">
                      <div className="text-xs font-bold uppercase tracking-wider text-neutral-600 dark:text-neutral-400 mb-3">
                        Key Deliverables Included:
                      </div>
                      {capability.deliverables.map((item, itemIdx) => (
                        <div key={itemIdx} className="flex items-start gap-2.5 text-xs md:text-sm text-neutral-700 dark:text-neutral-300">
                          <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
                          <span>{item}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="mt-8 pt-4">
                    <Link
                      to="/contact"
                      className="inline-flex items-center gap-2 text-xs font-bold text-primary hover:underline"
                    >
                      Request Technical Proposal <ArrowRight className="w-3.5 h-3.5" />
                    </Link>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <FaqSection />
    </main>
  );
}
