import type { CSSProperties } from "react";
import { ArrowUpRight } from "lucide-react";
import { Link } from "react-router-dom";
import { cn } from "@/lib/utils";
import "./CaseStudyStack.css";

interface CardData {
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

interface CaseStudyStackProps {
  cards: CardData[];
  className?: string;
  containerClassName?: string;
  imageClassName?: string;
  badge?: string;
  title?: string;
  subtitle?: string;
  isDark?: boolean;
}

export default function CaseStudyStack({
  cards,
  className,
  containerClassName,
  imageClassName,
  title = "Case Studies That Drive Growth",
  subtitle,
  isDark = false,
}: CaseStudyStackProps) {
  if (!cards.length) return null;

  return (
    <section className={cn("case-study-section font-sans", isDark && "case-study-section--dark", className)}>
      <header className="case-study-heading">
        <h2 className={cn("text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight leading-[1.15]", isDark ? "text-white" : "text-neutral-900")}>
          {title.toLowerCase().includes("case studies") ? (
            <>Case Studies <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-sky-400">That Drive Growth</span></>
          ) : title}
        </h2>
        {subtitle && <p className={cn("mt-2.5 max-w-xl mx-auto text-fluid-body font-medium", isDark ? "text-neutral-400" : "text-neutral-600")}>{subtitle}</p>}
      </header>

      <div className="case-study-deck">
        {cards.map((card, index) => (
          <article
            key={card.id}
            className={cn("case-study-sheet", containerClassName)}
            style={{
              "--card-index": index,
              "--card-inset": `${Math.min(cards.length - index - 1, 4) * 14}px`,
              zIndex: index + 1,
            } as CSSProperties}
          >
            <div className="case-study-image">
              <img
                src={card.image}
                alt={card.alt || card.title || "Case study preview"}
                loading="lazy"
                className={imageClassName}
              />
            </div>
            <div className="case-study-copy">
              <p className="case-study-meta">{[card.client, card.category].filter(Boolean).join(" · ")}</p>
              <h3 className="text-fluid-h3 font-extrabold tracking-tight">{card.title || "Selected case study"}</h3>
              {card.challenge && <p className="case-study-description">{card.challenge}</p>}
              <div className="case-study-footer">
                {card.result && <p className="case-study-result">{card.result}</p>}
                {(card.slug || card.link) && (
                  <Link className="case-study-link" to={card.link || `/case-studies/${card.slug}`}>
                    Explore case study <ArrowUpRight size={18} aria-hidden="true" />
                    <span className="sr-only">: {card.title}</span>
                  </Link>
                )}
              </div>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
