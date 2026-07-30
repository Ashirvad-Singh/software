import { motion } from "framer-motion"
import { ShieldCheck, Lock, Eye, FileText, Bell, CheckCircle2, RefreshCw } from "lucide-react"

export default function PrivacyPolicyPage() {
  const lastUpdated = "July 30, 2026"

  const sections = [
    {
      id: "information-collection",
      title: "1. Information We Collect",
      icon: Eye,
      content: `We collect information you provide directly to us when using our services. This includes personal information such as your name, email address, phone number, company name, and project specifications submitted via our contact or application forms. We also collect non-personal analytical data such as IP address, browser type, device information, and site interaction metrics through cookies and telemetry tools.`
    },
    {
      id: "use-of-information",
      title: "2. How We Use Your Information",
      icon: FileText,
      content: `Your data is strictly utilized to deliver, optimize, and secure our services. Specifically, we use your information to:
      • Provide custom software development, consulting, and support.
      • Communicate project milestones, updates, and service announcements.
      • Analyze site traffic and user engagement to enhance performance and UI/UX.
      • Protect against unauthorized access, fraudulent activities, and legal liabilities.`,
    },
    {
      id: "data-protection",
      title: "3. Data Security & Encryption",
      icon: Lock,
      content: `Security is central to our engineering ethos. We implement enterprise-grade encryption (TLS 1.3 in transit and AES-256 at rest), strict access controls, and regular vulnerability audits. Access to personal data is restricted exclusively to authorized personnel who require it for operational purposes.`
    },
    {
      id: "sharing-disclosure",
      title: "4. Data Sharing & Third Parties",
      icon: ShieldCheck,
      content: `We do not sell, rent, or trade your personal information. We may share data with trusted third-party service providers (such as cloud hosting, analytics, and CRM platforms) solely to assist in operating our services under strict confidentiality agreements. We may also disclose data when required by law or legal proceedings.`
    },
    {
      id: "cookies-tracking",
      title: "5. Cookies & Tracking Technologies",
      icon: RefreshCw,
      content: `Our website utilizes essential and performance cookies to remember your preferences and analyze traffic patterns. You can control or disable cookies through your browser settings, though doing so may affect certain interactive features of our website.`
    },
    {
      id: "your-rights",
      title: "6. Your Privacy Rights",
      icon: CheckCircle2,
      content: `Depending on your location (including GDPR & CCPA rights), you have the right to request access to, correction of, or deletion of your personal data. You may also opt out of promotional communications at any time by contacting us directly at privacy@adatsoft.com.`
    },
    {
      id: "policy-updates",
      title: "7. Updates to This Policy",
      icon: Bell,
      content: `We may update this Privacy Policy periodically to reflect changes in our practices or applicable legal standards. Significant revisions will be highlighted on our website along with an updated effective date.`
    }
  ]

  return (
    <main className="pt-32 sm:pt-36 md:pt-40 pb-20 min-h-screen bg-background text-foreground">
      {/* Header */}
      <div className="bg-gradient-to-b from-sky-50/50 via-background to-background border-b border-border/40 py-12 md:py-16">
        <div className="container mx-auto px-4 max-w-4xl text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-sky-100 dark:bg-sky-950/60 border border-sky-200 dark:border-sky-800 text-sky-700 dark:text-sky-300 font-semibold text-xs mb-6">
              <ShieldCheck className="w-4 h-4" /> Legal &amp; Transparency
            </div>
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight mb-4">
              Privacy Policy
            </h1>
            <p className="text-sm sm:text-base text-muted-foreground max-w-2xl mx-auto leading-relaxed">
              At Adat Soft Solutions, your privacy and data security are our highest priorities. Learn how we safeguard your information.
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
          {sections.map((sec, idx) => {
            const Icon = sec.icon
            return (
              <motion.div
                key={sec.id}
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
                    {sec.title}
                  </h2>
                </div>
                <div className="text-sm sm:text-base text-muted-foreground leading-relaxed whitespace-pre-line pl-0 sm:pl-13">
                  {sec.content}
                </div>
              </motion.div>
            )
          })}
        </div>

        {/* Contact Info Box */}
        <motion.div
          initial={{ opacity: 0, scale: 0.98 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          className="mt-16 bg-neutral-900 text-white rounded-2xl p-6 sm:p-10 text-center relative overflow-hidden"
        >
          <div className="relative z-10 max-w-xl mx-auto">
            <h3 className="text-xl sm:text-2xl font-bold mb-2">Have Questions About Your Privacy?</h3>
            <p className="text-xs sm:text-sm text-neutral-400 mb-6">
              Our legal and security teams are available to address any inquiries or data requests.
            </p>
            <a
              href="mailto:privacy@adatsoft.com"
              className="inline-flex items-center justify-center px-6 py-3 rounded-full bg-sky-500 hover:bg-sky-600 text-white font-bold text-sm transition-all shadow-md"
            >
              Contact Privacy Team
            </a>
          </div>
        </motion.div>
      </div>
    </main>
  )
}
