import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { ChevronRight } from "lucide-react";

export interface BreadcrumbItem {
  label: string;
  href?: string;
}

export interface InnerPageHeroProps {
  eyebrow?: string;
  title: string;
  highlightTitle?: string;
  description: string;
  breadcrumbs?: BreadcrumbItem[];
  className?: string;
  bgPosition?: string;
}

export default function InnerPageHero({
  eyebrow,
  title,
  highlightTitle,
  description,
  breadcrumbs = [],
  className = "",
  bgPosition,
}: InnerPageHeroProps) {
  const customBgStyle = bgPosition ? { backgroundPosition: bgPosition } : {};

  return (
    <header
      className={`relative w-full overflow-hidden bg-no-repeat bg-cover pt-28 sm:pt-32 md:pt-36 lg:pt-40 pb-10 sm:pb-12 min-h-[300px] sm:min-h-[340px] md:min-h-[380px] lg:min-h-[430px] flex items-center bg-[position:left_center] sm:bg-[position:right_-260px_center] md:bg-[position:right_-160px_center] lg:bg-[position:right_center] ${className}`}
      style={{
        backgroundImage: "url('/inner-hero-bg.png')",
        backgroundRepeat: "no-repeat",
        backgroundSize: "cover",
        ...customBgStyle,
      }}
    >
      {/* Dynamic Overlay for Enhanced Text Contrast */}
      <div className="absolute inset-0 bg-gradient-to-r from-white via-white/90 to-white/20 sm:from-white/95 sm:via-white/80 sm:to-transparent dark:from-neutral-950 dark:via-neutral-950/90 dark:to-transparent z-0 pointer-events-none max-w-full sm:max-w-[60%] md:max-w-[55%] lg:max-w-[50%]" />

      <div className="container mx-auto px-4 sm:px-6 lg:px-10 max-w-7xl relative z-10">
        <div className="w-full max-w-[340px] sm:max-w-[380px] md:max-w-[410px] lg:max-w-[480px] xl:max-w-[540px] text-left">
          {/* 1. Small Eyebrow / Label */}
          {eyebrow && (
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4 }}
              className="flex items-center gap-2 mb-2 sm:mb-3"
            >
              <span className="w-5 h-[2.5px] bg-[#0284c7] rounded-full inline-block shrink-0" />
              <span className="text-[11px] sm:text-[12px] font-bold tracking-[0.1em] uppercase text-[#0284c7]">
                {eyebrow}
              </span>
            </motion.div>
          )}

          {/* 2. Main Page Heading */}
          <motion.h1
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.45, delay: 0.08 }}
            className="text-[22px] sm:text-[26px] md:text-[32px] lg:text-[40px] xl:text-[44px] font-extrabold leading-[1.15] tracking-tight text-[#0f172a] dark:text-white mb-2.5 sm:mb-3.5"
          >
            {title}{" "}
            {highlightTitle && (
              <span className="text-[#0284c7] inline-block">{highlightTitle}</span>
            )}
          </motion.h1>

          {/* 3. Short Page Description */}
          <motion.p
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.45, delay: 0.16 }}
            className="text-[13px] sm:text-[14px] md:text-[15px] lg:text-[16px] leading-[1.55] text-[#334155] dark:text-neutral-200 mb-4 sm:mb-6 font-medium"
          >
            {description}
          </motion.p>

          {/* 4. Breadcrumb (Must appear below description) */}
          {breadcrumbs && breadcrumbs.length > 0 && (
            <motion.nav
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.45, delay: 0.24 }}
              aria-label="Breadcrumb"
            >
              <ol className="inline-flex items-center flex-wrap gap-1.5 text-[12px] sm:text-[13px] md:text-[14px] font-semibold text-[#1e293b] dark:text-neutral-200">
                {breadcrumbs.map((item, idx) => {
                  const isLast = idx === breadcrumbs.length - 1;
                  return (
                    <li key={idx} className="inline-flex items-center gap-1.5">
                      {idx > 0 && (
                        <ChevronRight
                          className="w-3.5 h-3.5 text-[#64748b] shrink-0 stroke-[2.5]"
                          aria-hidden="true"
                        />
                      )}
                      {isLast || !item.href ? (
                        <span
                          className="text-[#0284c7] font-bold"
                          aria-current={isLast ? "page" : undefined}
                        >
                          {item.label}
                        </span>
                      ) : (
                        <Link
                          to={item.href}
                          className="hover:text-[#0284c7] text-[#334155] dark:text-neutral-200 transition-colors"
                        >
                          {item.label}
                        </Link>
                      )}
                    </li>
                  );
                })}
              </ol>
            </motion.nav>
          )}
        </div>
      </div>
    </header>
  );
}
