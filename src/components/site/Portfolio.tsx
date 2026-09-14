import { ArrowUpRight } from "lucide-react";
import { Link } from "react-router-dom";
import { useContent } from "@/lib/content/useContent";
import { ContentCard } from "@/components/content/ContentListing";
export default function Portfolio() {
  const { entries } = useContent("projects");
  const featured = entries.filter(entry => entry.featured).slice(0, 3);
  if (!featured.length) return null;
  return <section className="mx-auto max-w-7xl px-5 py-12 md:px-10 md:py-16"><div className="mb-8 flex flex-wrap items-end justify-between gap-4"><div><p className="text-xs font-semibold uppercase tracking-widest text-primary">What we have built</p><h2 className="mt-3 text-3xl font-semibold tracking-tight md:text-4xl">Featured projects</h2></div><Link to="/work" className="text-sm font-semibold text-primary">Explore all projects{" "}<ArrowUpRight aria-hidden="true" className="inline-block h-4 w-4 align-text-bottom" /></Link></div><div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">{featured.map(entry => <ContentCard key={entry.id} entry={entry} />)}</div></section>;
}
