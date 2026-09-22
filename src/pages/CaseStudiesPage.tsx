import { useState } from "react";
import { Link } from "react-router-dom";
import { ArrowUpRight, Search } from "lucide-react";
import SEO from "@/components/site/SEO";
import { useContent } from "@/lib/content/useContent";
import { ContentCard } from "@/components/content/ContentCard";

import InnerPageHero from "@/components/site/InnerPageHero";

export default function CaseStudiesPage() {
  const { entries, loading, error, retry } = useContent("case_studies");
  const [category, setCategory] = useState("All");
  const [search, setSearch] = useState("");
  const [featured, setFeatured] = useState(false);
  const [count, setCount] = useState(6);
  const categories = [
    "All",
    ...new Set(
      entries.flatMap((e) => [e.industry, e.category]).filter(Boolean),
    ),
  ];
  const filtered = entries.filter(
    (e) =>
      (category === "All" ||
        e.industry === category ||
        e.category === category) &&
      (!featured || e.featured) &&
      [
        e.title,
        e.description,
        e.client,
        e.industry,
        e.category,
        ...e.technologies,
        ...e.services,
      ]
        .join(" ")
        .toLowerCase()
        .includes(search.toLowerCase()),
  );
  return (
    <main className="min-h-screen bg-background">
      <SEO
        title="Case Studies"
        description="Explore the business challenges, engineering decisions, and outcomes behind our client success stories."
      />
      <InnerPageHero
        eyebrow="CASE STUDIES"
        title="Real Challenges."
        highlightTitle="Thoughtful Solutions."
        description="Explore the business challenges, engineering decisions, and outcomes behind our client success stories."
        breadcrumbs={[
          { label: "Home", href: "/" },
          { label: "Case Studies" },
        ]}
      />
      <div className="mx-auto max-w-7xl px-5 md:px-10 py-10">
        <div className="mb-8 mt-12 space-y-5">
          <div className="flex flex-wrap items-center gap-4">
            <label className="flex min-w-0 basis-full sm:basis-0 flex-1 items-center gap-3 rounded-xl border border-border px-4 py-3">
              <Search size={18} aria-hidden="true" />
              <input
                aria-label="Search case studies"
                placeholder="Search by name, industry, or technology"
                value={search}
                onChange={(e) => {
                  setSearch(e.target.value);
                  setCount(6);
                }}
                className="w-full bg-transparent text-sm outline-none"
              />
            </label>
            <label className="flex items-center gap-2 text-sm">
              <input
                type="checkbox"
                checked={featured}
                onChange={(e) => {
                  setFeatured(e.target.checked);
                  setCount(6);
                }}
              />
              Featured only
            </label>
          </div>
          <div
            className="flex flex-wrap gap-2"
            aria-label="Filter by category or industry"
          >
            {categories.map((c) => (
              <button
                key={c}
                aria-pressed={category === c}
                onClick={() => {
                  setCategory(c);
                  setCount(6);
                }}
                className={`rounded-full px-4 py-2 text-sm transition-colors ${category === c ? "bg-primary text-primary-foreground" : "bg-secondary hover:bg-secondary/70"}`}
              >
                {c}
              </button>
            ))}
          </div>
        </div>
        {loading ? (
          <p role="status" className="py-16 text-center text-muted-foreground">
            Loading case studies…
          </p>
        ) : error ? (
          <div
            role="alert"
            className="rounded-2xl border border-border p-10 text-center"
          >
            <p>We couldn’t load this collection.</p>
            <button onClick={retry} className="mt-4 text-primary underline">
              Try again
            </button>
          </div>
        ) : (
          <>
            <p
              aria-live="polite"
              className="mb-5 text-sm text-muted-foreground"
            >
              {filtered.length} case studies
            </p>
            {filtered.length ? (
              <div
                className="space-y-8"
              >
                {filtered.slice(0, count).map((entry, index) => (
                  <ContentCard
                    key={entry.id}
                    entry={entry}
                    story
                    reverse={index % 2 === 1}
                  />
                ))}
              </div>
            ) : (
              <div className="rounded-2xl border border-dashed border-border px-6 py-16 text-center">
                <h2 className="text-xl font-semibold">
                  {entries.length
                    ? "No matching results"
                    : "New success stories are on the way"}
                </h2>
                <p className="mt-3 text-muted-foreground">
                  {entries.length
                    ? "Try a different search or category."
                    : "Contact us to discuss work relevant to your business."}
                </p>
                {entries.length > 0 && (
                  <button
                    className="mt-4 text-primary underline"
                    onClick={() => {
                      setSearch("");
                      setCategory("All");
                      setFeatured(false);
                      setCount(6);
                    }}
                  >
                    Clear filters
                  </button>
                )}
              </div>
            )}
            {count < filtered.length && (
              <div className="mt-10 text-center">
                <button
                  onClick={() => setCount((n) => n + 6)}
                  className="site-button rounded-full border border-border px-8 py-3 font-medium hover:bg-secondary"
                >
                  Load more
                </button>
              </div>
            )}
          </>
        )}
        <div className="mt-16 rounded-2xl bg-secondary p-8 md:p-12">
          <h2 className="text-section-title font-semibold">
            Have a project in mind?
          </h2>
          <p className="mt-3 text-muted-foreground">
            Let’s explore what we can build together.
          </p>
          <Link
            to="/contact"
            className="site-button mt-6 inline-flex items-center gap-2 rounded-full bg-primary px-6 py-3 text-sm font-semibold text-primary-foreground [--site-icon-color:var(--color-primary-foreground)]"
          >
            Start a conversation
            <ArrowUpRight size={17} />
          </Link>
        </div>
      </div>
    </main>
  );
}
