import { useState } from "react";
import { Link } from "react-router-dom";
import { ArrowUpRight, Search } from "lucide-react";
import SEO from "@/components/site/SEO";
import { useContent } from "@/lib/content/useContent";
import type { ContentEntry, ContentKind } from "@/lib/content/model";
export function ContentCard({ entry, story = false, reverse = false }: { entry: ContentEntry; story?: boolean; reverse?: boolean }) {
  return <Link to={`${story ? "/case-studies" : "/work"}/${entry.slug}`} className={`group overflow-hidden rounded-2xl border border-border bg-card transition-shadow hover:shadow-xl focus-visible:outline-2 focus-visible:outline-primary ${story ? "grid md:grid-cols-2" : "flex flex-col"}`}>
    <div className={`relative aspect-[16/10] overflow-hidden bg-muted ${story && reverse ? "md:order-2" : ""}`}>
      <img src={entry.image || "/adat_hero_ui.webp"} alt={entry.title} loading="lazy" className="h-full w-full object-cover transition-transform duration-500 motion-safe:group-hover:scale-105" />
      {entry.featured && <span className="absolute left-4 top-4 rounded-full bg-background/95 px-3 py-1 text-xs font-semibold">Featured {story ? "story" : "project"}</span>}
    </div>
    <div className={`flex flex-1 flex-col p-6 md:p-8 ${story && reverse ? "md:order-1" : ""}`}>
      <p className="text-xs font-semibold uppercase tracking-widest text-primary">{entry.industry || entry.category}{story && " / Success story"}</p>
      <h2 className={`mt-3 font-semibold tracking-tight ${story ? "text-2xl lg:text-3xl" : "text-2xl"}`}>{entry.title}</h2>
      {entry.client && <p className="mt-2 text-xs text-muted-foreground">{entry.client}</p>}
      <p className="mt-4 line-clamp-3 text-sm leading-relaxed text-muted-foreground">{entry.description || (story ? entry.overview : "")}</p>
      {story && entry.outcomes && <p className="mt-5 line-clamp-2 border-l-2 border-primary pl-4 text-sm font-medium">{entry.outcomes}</p>}
      {!story && <div className="mt-5 flex flex-wrap gap-2">{entry.technologies.slice(0, 4).map(t => <span key={t} className="rounded-md bg-secondary px-2 py-1 text-xs">{t}</span>)}</div>}
      <span className="mt-auto flex items-center gap-2 pt-6 text-sm font-semibold text-primary">{story ? "Read the case study" : "View Project"}<ArrowUpRight size={17} /></span>
    </div>
  </Link>;
}
export default function ContentListing({ kind }: { kind: ContentKind }) {
  const story = kind === "case_studies";
  const { entries, loading, error, retry } = useContent(kind);
  const [category, setCategory] = useState("All");
  const [search, setSearch] = useState("");
  const [featured, setFeatured] = useState(false);
  const [count, setCount] = useState(6);
  const categories = ["All", ...new Set(entries.flatMap(e => [e.industry, e.category]).filter(Boolean))];
  const filtered = entries.filter(e => (category === "All" || e.industry === category || e.category === category) && (!featured || e.featured) && [e.title, e.description, e.client, e.industry, e.category, ...e.technologies, ...e.services].join(" ").toLowerCase().includes(search.toLowerCase()));
  return <main className="min-h-screen bg-background pb-20 pt-28 md:pt-36">
    <SEO title={story ? "Case Studies" : "Projects & Portfolio"} description={story ? "Explore the business challenges, engineering decisions, and outcomes behind our client success stories." : "Explore the websites, applications, and digital platforms built by Adat Soft Solutions."} />
    <div className="mx-auto max-w-7xl px-5 md:px-10">
      <nav aria-label="Work sections" className="mb-10 flex gap-6 border-b border-border pb-4 text-sm font-semibold"><Link to="/work" aria-current={!story ? "page" : undefined} className={!story ? "text-primary" : "text-muted-foreground"}>Projects</Link><Link to="/case-studies" aria-current={story ? "page" : undefined} className={story ? "text-primary" : "text-muted-foreground"}>Case Studies</Link></nav>
      <p className="text-xs font-semibold uppercase tracking-[0.2em] text-primary">{story ? "Behind the results" : "Selected portfolio"}</p>
      <h1 className="mt-4 max-w-4xl text-4xl font-semibold leading-[1.08] tracking-tight sm:text-5xl md:text-7xl">{story ? <>Real challenges.<br /><span className="text-muted-foreground">Thoughtful solutions.</span></> : <>Digital products,<br /><span className="text-muted-foreground">built for business.</span></>}</h1>
      <p className="mt-6 max-w-2xl text-lg leading-relaxed text-muted-foreground">{story ? "Detailed success stories: the problem, our approach, and the results achieved together." : "Explore what we have built—from customer-facing experiences to the platforms that power daily operations."}</p>
      <div className="mb-8 mt-12 space-y-5">
        <div className="flex flex-wrap items-center gap-4"><label className="flex min-w-0 basis-full sm:basis-0 flex-1 items-center gap-3 rounded-xl border border-border px-4 py-3"><Search size={18} aria-hidden="true" /><input aria-label={story ? "Search case studies" : "Search projects"} placeholder="Search by name, industry, or technology" value={search} onChange={e => {setSearch(e.target.value); setCount(6);}} className="w-full bg-transparent text-sm outline-none" /></label><label className="flex items-center gap-2 text-sm"><input type="checkbox" checked={featured} onChange={e => {setFeatured(e.target.checked); setCount(6);}} />Featured only</label></div>
        <div className="flex flex-wrap gap-2" aria-label="Filter by category or industry">{categories.map(c => <button key={c} aria-pressed={category === c} onClick={() => {setCategory(c); setCount(6);}} className={`rounded-full px-4 py-2 text-sm transition-colors ${category === c ? "bg-primary text-primary-foreground" : "bg-secondary hover:bg-secondary/70"}`}>{c}</button>)}</div>
      </div>
      {loading ? <p role="status" className="py-16 text-center text-muted-foreground">Loading {story ? "case studies" : "projects"}…</p> : error ? <div role="alert" className="rounded-2xl border border-border p-10 text-center"><p>We couldn’t load this collection.</p><button onClick={retry} className="mt-4 text-primary underline">Try again</button></div> : <>
        <p aria-live="polite" className="mb-5 text-sm text-muted-foreground">{filtered.length} {story ? "case studies" : "projects"}</p>
        {filtered.length ? <div className={story ? "space-y-8" : "grid gap-6 sm:grid-cols-2 lg:grid-cols-3"}>{filtered.slice(0, count).map((entry, index) => <ContentCard key={entry.id} entry={entry} story={story} reverse={index % 2 === 1} />)}</div> : <div className="rounded-2xl border border-dashed border-border px-6 py-16 text-center"><h2 className="text-xl font-semibold">{entries.length ? "No matching results" : story ? "New success stories are on the way" : "New projects are on the way"}</h2><p className="mt-3 text-muted-foreground">{entries.length ? "Try a different search or category." : "Contact us to discuss work relevant to your business."}</p>{entries.length > 0 && <button className="mt-4 text-primary underline" onClick={() => {setSearch("");setCategory("All");setFeatured(false);setCount(6);}}>Clear filters</button>}</div>}
        {count < filtered.length && <div className="mt-10 text-center"><button onClick={() => setCount(n => n + 6)} className="rounded-full border border-border px-8 py-3 font-medium hover:bg-secondary">Load more</button></div>}
      </>}
      <div className="mt-16 rounded-2xl bg-secondary p-8 md:p-12"><h2 className="text-3xl font-semibold tracking-tight">Have a project in mind?</h2><p className="mt-3 text-muted-foreground">Let’s explore what we can build together.</p><Link to="/contact" className="mt-6 inline-flex items-center gap-2 rounded-full bg-primary px-6 py-3 text-sm font-semibold text-primary-foreground">Start a conversation<ArrowUpRight size={17} /></Link></div>
    </div>
  </main>;
}
