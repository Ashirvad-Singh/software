import React, { useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { ArrowUpRight, Sparkles, ExternalLink, ShieldCheck, CheckCircle2 } from "lucide-react";
import { Link } from "react-router-dom";
import { cn } from "@/lib/utils";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger, useGSAP);
}

export interface CardData {
  id: string | number;
  image: string;
  alt?: string;
  title?: string;
  category?: string;
  client?: string;
  challenge?: string;
  solution?: string;
  features?: string | string[];
  result?: string;
  slug?: string;
  link?: string;
  tags?: string[];
}

export interface StickyCard002Props {
  cards: CardData[];
  className?: string;
  containerClassName?: string;
  imageClassName?: string;
  badge?: string;
  title?: string;
  subtitle?: string;
  isDark?: boolean;
}

export const StickyCard002: React.FC<StickyCard002Props> = ({
  cards,
  className,
  containerClassName,
  imageClassName,
  badge = "Selected Case Studies",
  title = "Impactful Solutions & Case Studies",
  subtitle = "Explore detailed outcomes and modern engineering from our selected client projects.",
  isDark = false,
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const cardFrameRef = useRef<HTMLDivElement>(null);
  const cardRefs = useRef<(HTMLDivElement | null)[]>([]);

  useGSAP(
    () => {
      if (!containerRef.current || !cardFrameRef.current || cards.length === 0) return;

      const cardEls = cardRefs.current.filter(Boolean) as HTMLDivElement[];
      const totalCards = cardEls.length;

      // Set initial card states with 100% SOLID opacity so zero text bleeds through during slide-up
      cardEls.forEach((card, index) => {
        if (index === 0) {
          gsap.set(card, {
            yPercent: 0,
            opacity: 1,
            scale: 1,
            rotate: 0,
            zIndex: 1,
            pointerEvents: "auto",
          });
        } else {
          gsap.set(card, {
            yPercent: 100,
            opacity: 1,
            scale: 1,
            rotate: 0,
            zIndex: index + 1,
            pointerEvents: "none",
          });
        }
      });

      // Pinned GSAP timeline centered in viewport for perfect visibility
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: cardFrameRef.current,
          start: "center center",
          end: `+=${Math.max((totalCards - 1) * 380, 800)}`,
          pin: true,
          pinSpacing: true,
          scrub: 0.6,
          anticipatePin: 1,
          invalidateOnRefresh: true,
        },
      });

      cardEls.forEach((card, index) => {
        if (index > 0) {
          tl.to(
            card,
            {
              yPercent: 0,
              opacity: 1,
              pointerEvents: "auto",
              ease: "power1.inOut",
              duration: 1,
            },
            index - 0.75
          );
        }
      });

      ScrollTrigger.refresh();
    },
    { scope: containerRef, dependencies: [cards] }
  );

  return (
    <section
      ref={containerRef}
      className={cn(
        "relative w-full font-sans transition-colors duration-300 py-8 md:py-12 min-h-[95vh] flex flex-col justify-center items-center overflow-hidden",
        isDark
          ? "bg-neutral-950 text-white"
          : "bg-slate-50 text-neutral-900 border-y border-neutral-200/80",
        className
      )}
    >
      {/* Background ambient pattern */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        {isDark ? (
          <>
            <div className="absolute top-1/4 -left-40 h-[450px] w-[450px] rounded-full bg-primary/15 blur-[140px]" />
            <div className="absolute bottom-1/3 -right-40 h-[450px] w-[450px] rounded-full bg-blue-600/10 blur-[150px]" />
          </>
        ) : (
          <>
            <div className="absolute top-10 left-1/2 -translate-x-1/2 h-[400px] w-[800px] rounded-full bg-primary/5 blur-[120px]" />
            <div className="absolute inset-0 bg-[radial-gradient(#e2e8f0_1px,transparent_1px)] [background-size:24px_24px] opacity-60" />
          </>
        )}
      </div>

      {/* Main card stack frame container */}
      <div className="flex flex-col justify-center items-center w-full px-4 md:px-8 max-w-7xl mx-auto my-auto">
        {/* Header content */}
        <div className="relative z-20 mx-auto max-w-3xl text-center mb-5 md:mb-7 shrink-0">
          <div
            className={cn(
              "inline-flex items-center gap-2 rounded-full px-4 py-1.5 text-xs font-extrabold uppercase tracking-widest shadow-sm border",
              isDark
                ? "border-primary/30 bg-primary/10 text-primary"
                : "border-primary/20 bg-primary/10 text-primary"
            )}
          >
            <Sparkles className="h-4 w-4" />
            {badge}
          </div>
          <h2
            className={cn(
              "mt-2.5 text-2xl font-extrabold tracking-tight sm:text-3xl lg:text-4xl",
              isDark ? "text-white" : "text-neutral-900"
            )}
          >
            {title}
          </h2>
          {subtitle && (
            <p
              className={cn(
                "mt-2 max-w-xl mx-auto text-xs sm:text-sm md:text-base font-medium leading-normal",
                isDark ? "text-neutral-400" : "text-neutral-600"
              )}
            >
              {subtitle}
            </p>
          )}
        </div>

        {/* Card stack frame - Spacious, Large & 100% Opaque */}
        <div
          ref={cardFrameRef}
          className="relative z-10 w-full max-w-6xl h-[550px] sm:h-[550px] md:h-[560px] lg:h-[580px] mx-auto overflow-hidden rounded-3xl shadow-2xl"
        >
          {cards.map((card, i) => {
            const cardSlug = card.slug || `case-study-${card.id}`;
            const hasLink = Boolean(card.slug || card.link);
            const featureList = Array.isArray(card.features)
              ? card.features
              : card.features
              ? [card.features]
              : [];

            return (
              <div
                key={card.id || i}
                ref={(el) => {
                  cardRefs.current[i] = el;
                }}
                className={cn(
                  "absolute inset-0 w-full h-full rounded-3xl p-6 sm:p-8 lg:p-10 shadow-2xl border flex flex-col justify-between transition-shadow duration-300 opacity-100",
                  isDark
                    ? "bg-neutral-900 border-neutral-700 text-white shadow-black/80"
                    : "bg-white border-neutral-200/90 text-neutral-900 shadow-slate-300/80 ring-1 ring-black/5",
                  containerClassName
                )}
                style={{
                  willChange: "transform",
                }}
              >
                <div className="grid grid-cols-1 md:grid-cols-12 gap-6 lg:gap-10 items-stretch h-full w-full">
                  {/* LEFT SIDE: Image Preview (5 cols) */}
                  <div
                    className={cn(
                      "md:col-span-5 relative w-full h-44 sm:h-52 md:h-full overflow-hidden rounded-2xl border group shadow-sm shrink-0",
                      isDark
                        ? "border-white/10 bg-neutral-950"
                        : "border-neutral-200 bg-neutral-100"
                    )}
                  >
                    <img
                      src={card.image}
                      alt={card.alt || card.title || `Card ${card.id}`}
                      loading="lazy"
                      className={cn(
                        "h-full w-full object-cover transition-transform duration-700 group-hover:scale-105",
                        imageClassName
                      )}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/20 to-transparent opacity-90" />

                    {card.category && (
                      <span className="absolute top-4 left-4 rounded-full bg-primary px-3.5 py-1 text-xs sm:text-sm font-extrabold text-white uppercase tracking-wider shadow-md">
                        {card.category}
                      </span>
                    )}

                    {card.result && (
                      <div className="absolute bottom-4 left-4 right-4 rounded-xl bg-slate-900/95 p-3.5 border border-white/20 flex items-center gap-3 shadow-xl backdrop-blur-md">
                        <ShieldCheck className="h-5 w-5 text-emerald-400 shrink-0" />
                        <span className="text-xs sm:text-sm font-extrabold text-emerald-300 leading-snug line-clamp-1">
                          {card.result}
                        </span>
                      </div>
                    )}
                  </div>

                  {/* RIGHT SIDE: Spacious & Clear Content Details (7 cols) */}
                  <div className="md:col-span-7 flex flex-col justify-between h-full py-1 min-w-0 space-y-3.5 sm:space-y-4">
                    <div className="space-y-3.5 sm:space-y-4">
                      {/* Client Header */}
                      <div className="flex items-center justify-between gap-3 border-b border-slate-100 dark:border-neutral-800 pb-2">
                        {card.client && (
                          <span className="text-xs sm:text-sm font-black uppercase tracking-widest text-primary">
                            CLIENT: {card.client}
                          </span>
                        )}
                        {card.category && (
                          <span className="text-xs font-bold text-neutral-400 uppercase tracking-wider">
                            {card.category}
                          </span>
                        )}
                      </div>

                      {/* Case Study Title */}
                      <h3
                        className={cn(
                          "text-2xl sm:text-3xl lg:text-4xl font-extrabold tracking-tight leading-tight break-words",
                          isDark ? "text-white" : "text-neutral-900"
                        )}
                      >
                        {card.title || `Case Study #${card.id}`}
                      </h3>

                      {/* Challenge Section */}
                      {card.challenge && (
                        <div className="space-y-1">
                          <p className="text-[11px] sm:text-xs font-black uppercase tracking-widest text-neutral-500 dark:text-neutral-400">
                            THE CHALLENGE
                          </p>
                          <p
                            className={cn(
                              "text-xs sm:text-sm md:text-base leading-relaxed font-normal line-clamp-2 sm:line-clamp-3",
                              isDark ? "text-neutral-300" : "text-neutral-700"
                            )}
                          >
                            {card.challenge}
                          </p>
                        </div>
                      )}

                      {/* Solution Section */}
                      {card.solution && (
                        <div className="space-y-1">
                          <p className="text-[11px] sm:text-xs font-black uppercase tracking-widest text-primary">
                            OUR SOLUTION
                          </p>
                          <p
                            className={cn(
                              "text-xs sm:text-sm md:text-base leading-relaxed font-normal line-clamp-2 sm:line-clamp-3",
                              isDark ? "text-neutral-300" : "text-neutral-700"
                            )}
                          >
                            {card.solution}
                          </p>
                        </div>
                      )}

                      {/* Feature Bullet Points / Key Highlights */}
                      {featureList.length > 0 && (
                        <div className="space-y-2 pt-0.5">
                          {featureList.map((ft, fIdx) => (
                            <div
                              key={fIdx}
                              className="flex items-start gap-2.5 text-xs sm:text-sm font-semibold text-neutral-800 dark:text-neutral-200"
                            >
                              <CheckCircle2 className="h-4.5 w-4.5 text-primary shrink-0 mt-0.5" />
                              <span className="line-clamp-1">{ft}</span>
                            </div>
                          ))}
                        </div>
                      )}
                    </div>

                    {/* Bottom Footer Row: Tech Stack Tags & CTA Button */}
                    <div className="space-y-3 pt-2.5 border-t border-slate-100 dark:border-neutral-800 shrink-0">
                      {card.tags && card.tags.length > 0 && (
                        <div className="flex flex-wrap gap-2">
                          {card.tags.map((tag, tIdx) => (
                            <span
                              key={tIdx}
                              className={cn(
                                "rounded-xl px-3 py-1 text-xs font-bold border shadow-xs transition-colors",
                                isDark
                                  ? "border-white/10 bg-white/5 text-neutral-200"
                                  : "border-slate-200 bg-slate-100 text-slate-800"
                              )}
                            >
                              {tag}
                            </span>
                          ))}
                        </div>
                      )}

                      {/* Action CTA Button */}
                      <div className="pt-0.5">
                        {hasLink ? (
                          <Link
                            to={card.link || `/case-studies/${cardSlug}`}
                            className={cn(
                              "inline-flex items-center gap-2 rounded-full px-7 py-3 text-xs sm:text-sm font-extrabold transition-all shadow-md hover:scale-105 w-fit",
                              isDark
                                ? "bg-white text-neutral-900 hover:bg-primary hover:text-white"
                                : "bg-neutral-900 text-white hover:bg-primary hover:text-white"
                            )}
                          >
                            Explore Case Study
                            <ArrowUpRight className="h-4.5 w-4.5" />
                          </Link>
                        ) : (
                          <div
                            className={cn(
                              "inline-flex items-center gap-2 text-xs sm:text-sm font-bold",
                              isDark ? "text-neutral-400" : "text-neutral-500"
                            )}
                          >
                            <ExternalLink className="h-4 w-4" />
                            Featured Showcase
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default StickyCard002;

