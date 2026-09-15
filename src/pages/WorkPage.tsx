import { useState } from "react";
import { Link } from "react-router-dom";
import { ArrowUpRight, Search } from "lucide-react";
import SEO from "@/components/site/SEO";
import SubBanner from "@/components/site/SubBanner";
import { useContent } from "@/lib/content/useContent";
import "./WorkPage.css";

export default function WorkPage() {
  const { entries, loading, error, retry } = useContent("projects");
  const [category, setCategory] = useState("");
  const [search, setSearch] = useState("");
  const [featured, setFeatured] = useState(false);
  const [count, setCount] = useState(6);
  const categories = [...new Set(entries.flatMap((entry) => [entry.category, entry.industry]).filter(Boolean))];
  const filtered = entries.filter((entry) =>
    (!category || entry.category === category || entry.industry === category) &&
    (!featured || entry.featured) &&
    [entry.title, entry.description, entry.client, entry.category, entry.industry, ...entry.services, ...entry.technologies].join(" ").toLowerCase().includes(search.trim().toLowerCase()),
  );
  const clearFilters = () => { setCategory(""); setSearch(""); setFeatured(false); setCount(6); };

  return (
    <main className="work-page">
      <SEO title="Projects & Portfolio" description="Explore websites, online stores, and digital experiences built by Adat Soft Solutions." />
      <SubBanner
        badge="Our Portfolio"
        title="Thoughtful Design."
        highlightTitle="Real Work."
        subtitle="Explore our websites, Shopify and WooCommerce stores, and UI/UX projects—built around each brand and its customers."
        className="work-sub-banner"
      />
      <div className="work-shell">
        <header className="work-header">
          <h2>Selected projects</h2>
          <nav className="work-categories" aria-label="Filter projects by category">
            {["", ...categories].map((item) => <button key={item} type="button" aria-pressed={category === item} onClick={() => { setCategory(item); setCount(6); }}>{item || "Selected Work"}</button>)}
            <Link to="/case-studies">Case Studies <ArrowUpRight size={14} /></Link>
          </nav>
        </header>
        <div className="work-toolbar">
          <p role="status">{loading ? "Loading projects…" : error ? "" : `${filtered.length} project${filtered.length === 1 ? "" : "s"}`}</p>
          <div className="work-filter-tools">
            <label className="work-search"><Search size={16} aria-hidden="true" /><input aria-label="Search projects" placeholder="Search work" value={search} onChange={(event) => { setSearch(event.target.value); setCount(6); }} /></label>
            <label className="work-featured"><input type="checkbox" checked={featured} onChange={(event) => { setFeatured(event.target.checked); setCount(6); }} /> Featured only</label>
          </div>
        </div>
        {loading ? <div className="work-grid" aria-hidden="true">{[0, 1].map((item) => <div key={item} className="work-skeleton" />)}</div> : error ? (
          <div className="work-message" role="alert"><h2>We couldn’t load the projects.</h2><button className="site-button" onClick={retry}>Try again</button></div>
        ) : filtered.length ? (
          <>
            <div className="work-grid">
              {filtered.slice(0, count).map((entry, index) => {
                const tags = [...new Set([...entry.services, ...entry.technologies])].slice(0, 3);
                return <article key={entry.id} className={`work-project work-tone-${index % 4}`}>
                  <Link className="work-project-link" to={`/work/${entry.slug}`} aria-label={`View project: ${entry.title}`}>
                    <div className="work-preview">
                      <div className="work-image"><img src={entry.image || "/adat_hero_ui.webp"} alt={entry.title} loading={index < 2 ? "eager" : "lazy"} onError={(event) => { if (!event.currentTarget.src.endsWith("/adat_hero_ui.webp")) event.currentTarget.src = "/adat_hero_ui.webp"; }} /></div>
                      <div className="work-preview-copy">
                        {entry.client && <p className="work-client">{entry.client}</p>}
                        <h2>{entry.title}</h2>
                        <div className="work-tags">{(tags.length ? tags : [entry.category || "Website Development"]).map((tag) => <span key={tag}>{tag}</span>)}</div>
                        <span className="work-short-rule" aria-hidden="true" />
                      </div>
                    </div>
                    <div className="work-caption">
                      <h3>{entry.description || entry.title}</h3>
                      <span className="work-open site-button site-button-icon" aria-hidden="true"><ArrowUpRight size={19} /></span>
                    </div>
                    <div className="work-project-meta"><span>{entry.industry || entry.category || "Digital experience"}</span>{entry.featured && <span className="work-featured-label">Featured</span>}</div>
                  </Link>
                </article>;
              })}
            </div>
            {count < filtered.length && <div className="work-load"><button className="site-button" onClick={() => setCount((value) => value + 6)}>Load more projects <ArrowUpRight size={17} /></button></div>}
          </>
        ) : <div className="work-message"><h2>{entries.length ? "No matching projects" : "New projects are on the way"}</h2><p>{entries.length ? "Try another category or search term." : "Tell us what you have in mind. We would love to help."}</p>{entries.length ? <button className="site-button" onClick={clearFilters}>Clear filters</button> : <Link className="site-button" to="/contact">Start a conversation <ArrowUpRight size={17} /></Link>}</div>}
        <footer className="work-bottom"><p>Have something in mind?</p><Link className="site-button" to="/contact">Let’s create your next project. <ArrowUpRight /></Link></footer>
      </div>
    </main>
  );
}
