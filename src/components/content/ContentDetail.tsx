import { Link, useParams } from "react-router-dom";
import { ArrowLeft, ArrowUpRight } from "lucide-react";
import SEO from "@/components/site/SEO";
import { useContent } from "@/lib/content/useContent";
import type { ContentKind } from "@/lib/content/model";
import { ContentCard } from "./ContentListing";
import ImageGallery from "./ImageGallery";
export default function ContentDetail({ kind }: { kind: ContentKind }) {
  const { slug } = useParams();
  const story = kind === "case_studies";
  const { entries, loading, error, retry } = useContent(kind);
  const linked = useContent(story ? "projects" : "case_studies");
  const entry = entries.find(e => e.slug === slug);
  const back = story ? "/case-studies" : "/work";
  if (loading || error || !entry) return <main className="min-h-screen px-5 pb-20 pt-36 text-center"><SEO title={loading ? "Loading" : error ? "Content unavailable" : "Page not found"} /><h1 className="text-3xl font-semibold" role={error ? "alert" : "status"}>{loading ? "Loading…" : error ? "We couldn’t load this page." : `${story ? "Case study" : "Project"} not found`}</h1>{error && <button onClick={retry} className="mt-5 block w-full text-primary underline">Try again</button>}<Link to={back} className="mt-6 inline-block text-primary">Back to {story ? "case studies" : "projects"}</Link></main>;
  const sections = story ? [
    ["overview", "Project overview", entry.overview || entry.description],
    ["background", "The business behind the brief", entry.background],
    ["challenge", "The challenge", entry.challenge],
    ["goals", "Goals & objectives", entry.goals],
    ["approach", "Our approach", entry.approach],
    ["solution", "The solution", entry.solution],
    ["process", "Development & implementation", entry.process],
    ["tools", "Technologies & tools", entry.tools],
    ["outcomes", "Results & outcomes", entry.outcomes],
  ].filter(([, , content]) => content) : [["overview", "What we built", entry.description]];
  const related = entries.filter(e => e.id !== entry.id).sort((a,b) => Number(b.industry === entry.industry && !!entry.industry) - Number(a.industry === entry.industry && !!entry.industry)).slice(0, 3);
  const references = linked.entries.filter(e => story ? e.id === entry.projectId : e.projectId === entry.id);
  return <main className="min-h-screen bg-background pb-20 pt-28 md:pt-36">
    <SEO title={entry.seoTitle || entry.title} description={entry.seoDescription || entry.description || entry.overview} keywords={entry.seoKeywords || [...entry.services, ...entry.technologies, entry.industry].join(", ")} image={entry.image} />
    <div className="mx-auto max-w-6xl px-5 md:px-10">
      <Link to={back} className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-primary"><ArrowLeft size={16} />All {story ? "case studies" : "projects"}</Link>
      <p className="mt-10 text-xs font-semibold uppercase tracking-widest text-primary">{story ? "Case study" : "Project"} / {entry.industry || entry.category}</p>
      <h1 className="mt-4 max-w-5xl text-4xl font-semibold leading-[1.1] tracking-tight md:text-6xl">{entry.title}</h1>
      {entry.description && <p className="mt-6 max-w-3xl text-lg leading-relaxed text-muted-foreground">{entry.description}</p>}
      <img src={entry.image || "/adat_hero_ui.webp"} alt={entry.title} className="mt-10 aspect-video w-full rounded-2xl border border-border object-cover" />
      <div className="mt-12 grid gap-10 lg:grid-cols-[1fr_280px] lg:gap-16">
        <div className="min-w-0 space-y-12">
          {sections.map(([id, title, content]) => <section key={id} id={id} className="scroll-mt-28"><h2 className="text-2xl font-semibold tracking-tight">{title}</h2><p className="mt-4 whitespace-pre-line leading-8 text-muted-foreground">{content}</p></section>)}
          {story && entry.features.length > 0 && <section><h2 className="text-2xl font-semibold">Key features</h2><ul className="mt-5 grid gap-3 sm:grid-cols-2">{entry.features.map((f,i) => <li key={i} className="rounded-xl border border-border bg-secondary/30 p-4 text-sm">{f}</li>)}</ul></section>}
          {story && entry.metrics.length > 0 && <section><h2 className="text-2xl font-semibold">Impact in numbers</h2><div className="mt-5 grid gap-4 sm:grid-cols-2">{entry.metrics.map((m,i) => <div key={i} className="rounded-xl bg-secondary p-6"><p className="text-3xl font-semibold text-primary">{m.value}</p><p className="mt-2 text-sm text-muted-foreground">{m.label}</p></div>)}</div>{entry.measurementNotes && <p className="mt-4 whitespace-pre-line text-sm text-muted-foreground">{entry.measurementNotes}</p>}</section>}
          {entry.gallery.length > 0 && <section><h2 className="text-2xl font-semibold">{story ? "Inside the solution" : "Project gallery"}</h2><ImageGallery key={entry.id} images={entry.gallery} title={entry.title} /></section>}
          {story && entry.testimonial && <blockquote className="border-l-4 border-primary pl-6"><p className="text-2xl leading-relaxed">“{entry.testimonial}”</p>{entry.testimonialAuthor && <cite className="mt-4 block text-sm not-italic text-muted-foreground">{entry.testimonialAuthor}</cite>}</blockquote>}
        </div>
        <aside className="h-fit space-y-6 rounded-2xl border border-border bg-secondary/25 p-6 lg:sticky lg:top-28">
          <h2 className="font-semibold">{story ? "Engagement at a glance" : "Project details"}</h2>
          <dl className="space-y-5">{[["Client",entry.client],["Industry",entry.industry],["Category",entry.category],["Services",entry.services.join(", ")],["Technologies",entry.technologies.join(", ")],[story ? "Project timeline" : "Duration",entry.timeline]].filter(([,v])=>v).map(([label,value])=><div key={label}><dt className="text-xs uppercase tracking-wider text-muted-foreground">{label}</dt><dd className="mt-2 whitespace-pre-line text-sm leading-relaxed">{value}</dd></div>)}</dl>
          {!story && entry.liveUrl && <a href={entry.liveUrl} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 text-sm font-semibold text-primary">Visit live project<ArrowUpRight size={16} /></a>}
          {references.map(ref => <Link key={ref.id} to={`${story ? "/work" : "/case-studies"}/${ref.slug}`} className="block border-t border-border pt-5 text-sm font-semibold text-primary">{story ? "Explore the project" : "Read the full case study"}: {ref.title}{" "}<ArrowUpRight aria-hidden="true" className="inline-block h-4 w-4 align-text-bottom" /></Link>)}
          {story && <nav aria-label="In this case study" className="space-y-3 border-t border-border pt-5">{sections.map(([id,title])=><a key={id} href={`#${id}`} className="block text-sm text-muted-foreground hover:text-primary">{title}</a>)}</nav>}
        </aside>
      </div>
      <section className="mt-16 rounded-2xl bg-secondary p-8 text-center md:p-12"><h2 className="text-3xl font-semibold">{story && entry.ctaTitle || "Let’s build your next chapter."}</h2><Link to="/contact" className="mt-6 inline-flex rounded-full bg-primary px-7 py-3 font-medium text-primary-foreground">{story && entry.ctaLabel || "Discuss your project"}</Link></section>
      {related.length > 0 && <section className="mt-16"><h2 className="mb-6 text-3xl font-semibold">{story ? "Related case studies" : "More projects"}</h2><div className={story ? "space-y-6" : "grid gap-6 md:grid-cols-3"}>{related.map(e => <ContentCard key={e.id} entry={e} story={story} />)}</div></section>}
    </div>
  </main>;
}
