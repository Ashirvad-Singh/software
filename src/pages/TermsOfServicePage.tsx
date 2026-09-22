import { motion } from "framer-motion"
import { Scale, FileCode2, UserCheck, AlertCircle, Cpu, ShieldAlert, Sparkles } from "lucide-react"
import InnerPageHero from "@/components/site/InnerPageHero"

export default function TermsOfServicePage() {

  const terms = [
    {
      id: "acceptance",
      title: "1. Acceptance of Terms",
      icon: UserCheck,
      content: `By accessing or utilizing the services provided by Adat Soft Solutions ("Company", "we", "us"), you agree to be bound by these Terms of Service. If you do not agree with any portion of these terms, you must refrain from using our website, software products, or consultancy services.`
    },
    {
      id: "services-scope",
      title: "2. Scope of Engineering & Design Services",
      icon: FileCode2,
      content: `Adat Soft Solutions provides custom web application development, mobile app engineering, UI/UX design, CMS & E-commerce implementation, cloud deployment, and strategic technical consulting. Project deliverables, timelines, and payment structures are defined in individual Statements of Work (SOW) or client agreements.`
    },
    {
      id: "intellectual-property",
      title: "3. Intellectual Property Rights",
      icon: Sparkles,
      content: `• Client Ownership: Upon final payment for a custom development engagement, all custom code, assets, and deliverables created specifically for the client are assigned to the client.
      • Company IP: Pre-existing software libraries, proprietary frameworks, internal tools, and open-source components utilized by us remain the property of the Company or their respective licensors.`
    },
    {
      id: "user-responsibilities",
      title: "4. User Responsibilities & Conduct",
      icon: AlertCircle,
      content: `Users agree not to:
      • Reverse engineer, decompile, or attempt to derive source code from proprietary platforms provided by us.
      • Use our services to transmit malicious code, launch Denial of Service (DoS) attacks, or violate applicable cyber regulations.
      • Misrepresent identity or ownership during project consultations.`
    },
    {
      id: "warranties-limitation",
      title: "5. Warranties & Limitation of Liability",
      icon: ShieldAlert,
      content: `While we maintain strict QA standards and code audits, services are provided "as is" unless specified in a formal SLA. Under no circumstances shall Adat Soft Solutions be liable for indirect, incidental, or consequential damages resulting from third-party server downtime or API deprecations.`
    },
    {
      id: "termination",
      title: "6. Project Termination",
      icon: Scale,
      content: `Either party may terminate an SOW upon written notice if the other party breaches material obligations. Outstanding fees for completed milestones prior to termination remain due and payable.`
    },
    {
      id: "governing-law",
      title: "7. Governing Law & Dispute Resolution",
      icon: Cpu,
      content: `These terms shall be governed by and construed in accordance with the applicable laws of the jurisdiction in which Adat Soft Solutions operates. Any disputes arising under these terms shall be resolved through good-faith negotiation or arbitration before seeking judicial recourse.`
    }
  ]

  return (
    <main className="min-h-screen bg-background text-foreground">
      <InnerPageHero
        eyebrow="LEGAL / TERMS"
        title="Terms of"
        highlightTitle="Service"
        description="Please read these terms carefully before engaging our software development or digital consulting services."
        breadcrumbs={[
          { label: "Home", href: "/" },
          { label: "Terms of Service" },
        ]}
      />

      {/* Content Container */}
      <div className="container mx-auto px-4 max-w-4xl mt-12 md:mt-16">
        <div className="space-y-10">
          {terms.map((item, idx) => {
            const Icon = item.icon
            return (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: idx * 0.05 }}
                className="bg-card border border-border/60 rounded-2xl p-6 sm:p-8 shadow-sm hover:shadow-md transition-shadow"
              >
                <div className="flex items-center gap-3.5 mb-4">
                  <div className="w-10 h-10 rounded-xl bg-sky-50 dark:bg-sky-950/60 border border-sky-200 dark:border-sky-800/60 flex items-center justify-center text-sky-600 dark:text-sky-400 shrink-0">
                    <Icon className="w-5 h-5" />
                  </div>
                  <h2 className="text-lg sm:text-xl font-bold tracking-tight text-foreground">
                    {item.title}
                  </h2>
                </div>
                <div className="text-sm sm:text-base text-muted-foreground leading-relaxed whitespace-pre-line pl-0 sm:pl-13">
                  {item.content}
                </div>
              </motion.div>
            )
          })}
        </div>

        {/* Support Box */}
        <motion.div
          initial={{ opacity: 0, scale: 0.98 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          className="mt-16 bg-neutral-900 text-white rounded-2xl p-6 sm:p-10 text-center relative overflow-hidden"
        >
          <div className="relative z-10 max-w-xl mx-auto">
            <h3 className="text-xl sm:text-2xl font-bold mb-2">Questions Regarding Our Terms?</h3>
            <p className="text-xs sm:text-sm text-neutral-400 mb-6">
              Our legal team is happy to assist with any contract or service level questions.
            </p>
            <a
              href="mailto:info@adatsolutions.com"
              className="site-button inline-flex items-center justify-center px-6 py-3 rounded-full bg-sky-500 hover:bg-sky-600 text-white font-bold text-sm transition-all shadow-md"
            >
              Contact Legal Department
            </a>
          </div>
        </motion.div>
      </div>
    </main>
  )
}
