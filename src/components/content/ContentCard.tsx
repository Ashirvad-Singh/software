import { Link } from "react-router-dom";
import { ArrowUpRight } from "lucide-react";
import type { ContentEntry } from "@/lib/content/model";

export function ContentCard({
  entry,
  story = false,
  reverse = false,
}: {
  entry: ContentEntry;
  story?: boolean;
  reverse?: boolean;
}) {
  return (
    <Link
      to={`${story ? "/case-studies" : "/work"}/${entry.slug}`}
      className={`group overflow-hidden rounded-2xl border border-border bg-card transition-shadow hover:shadow-xl focus-visible:outline-2 focus-visible:outline-primary ${story ? "grid md:grid-cols-2" : "flex flex-col"}`}
    >
      <div
        className={`relative overflow-hidden bg-muted ${story ? "aspect-[16/10] md:aspect-auto md:h-full" : "aspect-[16/10]"} ${story && reverse ? "md:order-2" : ""}`}
      >
        <img
          src={entry.image || "/adat_hero_ui.webp"}
          alt={entry.title}
          loading="lazy"
          className="absolute inset-0 h-full w-full object-cover transition-transform duration-500 motion-safe:group-hover:scale-105"
        />
        {entry.featured && (
          <span className="absolute left-4 top-4 rounded-full bg-background/95 px-3 py-1 text-xs font-semibold">
            Featured {story ? "story" : "project"}
          </span>
        )}
      </div>
      <div
        className={`flex flex-1 flex-col p-6 md:p-8 ${story && reverse ? "md:order-1" : ""}`}
      >
        <p className="text-xs font-semibold uppercase tracking-widest text-primary">
          {entry.industry || entry.category}
          {story && " / Success story"}
        </p>
        <h2
          className={`mt-3 font-semibold tracking-tight ${story ? "text-2xl lg:text-3xl" : "text-2xl"}`}
        >
          {entry.title}
        </h2>
        {entry.client && (
          <p className="mt-2 text-xs text-muted-foreground">{entry.client}</p>
        )}
        <p className="mt-4 line-clamp-3 text-sm leading-relaxed text-muted-foreground">
          {entry.description || (story ? entry.overview : "")}
        </p>
        {story && entry.outcomes && (
          <p className="mt-5 line-clamp-2 border-l-2 border-primary pl-4 text-sm font-medium">
            {entry.outcomes}
          </p>
        )}
        {!story && (
          <div className="mt-5 flex flex-wrap gap-1.5">
            {entry.technologies.slice(0, 4).map((t) => (
              <span
                key={t}
                className="rounded-full border border-primary/20 bg-primary/10 px-2.5 py-1 text-xs font-medium text-primary"
              >
                {t}
              </span>
            ))}
          </div>
        )}
        <span className="mt-auto flex items-center gap-2 pt-6 text-sm font-semibold text-primary">
          {story ? "Read the case study" : "View Project"}
          <ArrowUpRight size={17} />
        </span>
      </div>
    </Link>
  );
}
