import { motion } from "framer-motion"
import { Link } from "react-router-dom"
import { ArrowLeft } from "lucide-react"

interface SubBannerProps {
  badge?: string
  title: string
  highlightTitle?: string
  subtitle: string
  backLink?: { to: string; label: string }
  className?: string
}

export default function SubBanner({
  badge,
  backLink,
  title,
  highlightTitle,
  subtitle,
  className = "",
}: SubBannerProps) {
  return (
    <div className={`site-sub-banner relative pt-24 md:pt-32 pb-8 md:pb-12 overflow-hidden bg-gradient-to-b from-sky-50/50 via-sky-50/10 to-transparent dark:from-sky-950/20 dark:via-transparent dark:to-transparent ${className}`}>
      {/* Ambient Glowing Light Orb */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-sky-400/15 rounded-full blur-[110px] pointer-events-none z-0" />

      {/* Seamless Dot Grid with Soft Fade Mask */}
      <div
        className="absolute inset-0 pointer-events-none opacity-25 z-0"
        style={{
          backgroundImage: "radial-gradient(#38bdf8 1.2px, transparent 1.2px)",
          backgroundSize: "28px 28px",
          maskImage: "radial-gradient(ellipse at center, black 30%, transparent 80%)",
          WebkitMaskImage: "radial-gradient(ellipse at center, black 30%, transparent 80%)",
        }}
      />

      <div className="container mx-auto px-4 sm:px-6 relative z-10 text-center max-w-4xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="flex flex-col items-center"
        >
          {/* Pill Badge */}
          {badge && (
            <motion.div 
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: 0.1, duration: 0.4 }}
              className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-sky-500/10 border border-sky-400/30 text-sky-600 dark:text-sky-400 font-semibold text-xs mb-4 shadow-sm backdrop-blur-sm"
            >
              <span className="w-2 h-2 rounded-full bg-sky-500 animate-ping shrink-0" />
              <span>{badge}</span>
            </motion.div>
          )}

          {/* Heading */}
          <h1 className="text-fluid-h1 font-extrabold tracking-tight text-neutral-900 dark:text-white mb-4">
            {title} {highlightTitle && <span className="text-sky-500 bg-clip-text text-transparent bg-gradient-to-r from-sky-500 to-blue-600">{highlightTitle}</span>}
          </h1>

          {/* Subtitle */}
          <p className="text-fluid-body text-neutral-600 dark:text-neutral-300 max-w-2xl mx-auto font-medium">
            {subtitle}
          </p>
          {backLink && (
            <Link to={backLink.to} className="mt-6 inline-flex items-center gap-2 text-sm font-semibold text-sky-700 hover:text-sky-600 dark:text-sky-400 transition-colors">
              <ArrowLeft aria-hidden="true" className="h-4 w-4" />
              {backLink.label}
            </Link>
          )}
        </motion.div>
      </div>
    </div>
  )
}
