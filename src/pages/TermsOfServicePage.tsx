import { motion } from "framer-motion"
import { Scale, FileCode2, UserCheck, AlertCircle, Cpu, ShieldAlert, Sparkles } from "lucide-react"

export default function TermsOfServicePage() {
  const lastUpdated = "July 30, 2026"

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
      id: "user-obligations",
      title: "4. User & Client Responsibilities",
      icon: Scale,
      content: `Clients agree to provide timely feedback, required credentials, content assets, and clear requirements necessary for project execution. Users agree not to misuse our website, attempt unauthorized access to server infrastructure, or inject malicious code.`
    },
    {
      id: "warranties-limitation",
      title: "5. Warranties & Limitation of Liability",
      icon: ShieldAlert,
      content: `While we build software using industry best practices and modern security standards, all services are provided "as is" unless explicitly backed by a Service Level Agreement (SLA). Adat Soft Solutions shall not be liable for indirect, incidental, or consequential damages resulting from service interruptions or third-party platform failures.`
    },
    {
      id: "termination",
      title: "6. Termination & Project Cancellation",
      icon: AlertCircle,
      content: `Either party may terminate an ongoing engagement in accordance with the notice period specified in the project contract. In the event of early termination, the client shall pay for all work completed and expenses incurred up to the date of cancellation.`
    },
    {
      id: "governing-law",
      title: "7. Governing Law & Dispute Resolution",
      icon: Cpu,
      content: `These terms shall be governed by and construed in accordance with the applicable laws of the jurisdiction in which Adat Soft Solutions operates. Any disputes arising under these terms shall be resolved through good-faith negotiation or arbitration before seeking judicial recourse.`
    }
  ]

  return (
    <main className="pt-24 sm:pt-28 md:pt-36 pb-20 min-h-screen bg-background text-foreground">
      {/* Header */}
      <div className="bg-gradient-to-b from-sky-50/50 via-background to-background border-b border-border/40 py-12 md:py-16">
        <div className="container mx-auto px-4 max-w-4xl text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-sky-100 dark:bg-sky-950/60 border border-sky-200 dark:border-sky-800 text-sky-700 dark:text-sky-300 font-semibold text-xs mb-6">
              <Scale className="w-4 h-4" /> Terms &amp; Conditions
            </div>
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight mb-4">
              Terms of Service
            </h1>
            <p className="text-sm sm:text-base text-muted-foreground max-w-2xl mx-auto leading-relaxed">
              Please read these terms carefully before engaging our software development or digital consulting services.
            </p>
            <p className="text-xs text-muted-foreground mt-4 font-medium">
              Last Updated: <span className="text-foreground">{lastUpdated}</span>
            </p>
          </motion.div>
        </div>
      </div>

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
              href="mailto:legal@adatsoft.com"
              className="inline-flex items-center justify-center px-6 py-3 rounded-full bg-sky-500 hover:bg-sky-600 text-white font-bold text-sm transition-all shadow-md"
            >
              Contact Legal Department
            </a>
          </div>
        </motion.div>
      </div>
    </main>
  )
}
