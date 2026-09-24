import { useCatalog } from "@/lib/content/useCatalog";
import { listValue } from "@/lib/content/model";
import HomeServicesSection from "@/components/site/HomeServicesSection";
import InnerPageHero from "@/components/site/InnerPageHero";
import FaqSection from "@/components/site/FaqSection";
import { motion } from "framer-motion";
import { Code2, CheckCircle2, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";

import SEO from "@/components/site/SEO";

export default function ServicesPage() {
  const { entries } = useCatalog("services");
  const serviceCapabilities = entries.filter(service => service.benefits || service.features).map(service => ({
    ...service, icon: Code2, deliverables: listValue(service.benefits || service.features, service.benefits ? /\n/ : /[,\n]/),
  }));
  return (
    <main className="min-h-screen bg-white dark:bg-neutral-950">
      <SEO
        title="Custom Digital Services & Software Engineering"
        description="From high-scale web platforms and mobile apps to CMS, UI/UX and QA, we build reliable digital solutions tailored to business growth."
      />
      <InnerPageHero
        eyebrow="DIGITAL SERVICES"
        title="Custom Digital"
        highlightTitle="Services & Solutions"
        description="From high-scale web platforms and mobile apps to CMS, UI/UX and QA, we build reliable digital solutions tailored to business growth."
        breadcrumbs={[
          { label: "Home", href: "/" },
          { label: "Services" },
        ]}
      />

      {/* Main Interactive Services Accordion */}
      <HomeServicesSection showAll hideHeader />

      {/* Detailed Capabilities Grid */}
      {serviceCapabilities.length > 0 && <section className="py-10 md:py-16 bg-neutral-50 dark:bg-neutral-900/40 border-t border-neutral-200 dark:border-neutral-800">
        <div className="container mx-auto px-4 max-w-6xl">
          <div className="text-center max-w-3xl mx-auto mb-8 sm:mb-12">
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
                  className="bg-white dark:bg-neutral-950 p-5 sm:p-8 rounded-3xl border border-neutral-200 dark:border-neutral-800 shadow-sm hover:shadow-md transition-all flex flex-col justify-between"
                >
                  <div>
                    <div className="w-12 h-12 rounded-2xl bg-sky-50 dark:bg-sky-950 text-sky-600 flex items-center justify-center mb-6">
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
                      to={`/services/${capability.slug}`}
                      className="inline-flex items-center gap-2 text-xs font-bold text-primary hover:underline"
                    >
                      Explore Service <ArrowRight className="w-3.5 h-3.5" />
                    </Link>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>}

      {/* FAQ Section */}
      <FaqSection />
    </main>
  );
}
