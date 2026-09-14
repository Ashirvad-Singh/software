export type ContentKind = "projects" | "case_studies";
export type PublicationStatus = "draft" | "published";
export interface ContentBase {
  id: string; title: string; slug: string; description: string; image: string;
  category: string; industry: string; client: string; services: string[];
  technologies: string[]; gallery: string[]; timeline: string;
  status: PublicationStatus; featured: boolean; seoTitle: string;
  seoDescription: string; seoKeywords: string; createdAt: number;
}
export interface PortfolioProject extends ContentBase { liveUrl: string; }
export interface CaseStudy extends ContentBase {
  projectId: string; overview: string; background: string; challenge: string;
  goals: string; approach: string; solution: string; process: string;
  features: string[]; tools: string; outcomes: string;
  metrics: { value: string; label: string }[]; measurementNotes: string;
  testimonial: string; testimonialAuthor: string; ctaTitle: string; ctaLabel: string;
}
export type ContentEntry = PortfolioProject & CaseStudy;
export function listValue(value: unknown, separator = /[,\n]/): string[] {
  return (Array.isArray(value) ? value : typeof value === "string" ? value.split(separator) : [])
    .filter((v): v is string => typeof v === "string").map(v => v.trim()).filter(Boolean);
}
export function slugify(value: string): string {
  return value.normalize("NFKD").replace(/[\u0300-\u036f]/g, "").toLowerCase()
    .replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");
}
export function safeUrl(value: string): string {
  try { const url = new URL(value); return ["https:", "http:"].includes(url.protocol) ? url.href : ""; } catch { return ""; }
}
export function normalizeEntry(id: string, raw: Record<string, unknown>): ContentEntry {
  const str = (key: string) => typeof raw[key] === "string" ? raw[key] as string : "";
  const metrics = Array.isArray(raw.metrics) ? raw.metrics : listValue(raw.metrics, /\n/).map(line => {
    const [value, ...label] = line.split("|"); return { value: value.trim(), label: label.join("|").trim() };
  });
  return {
    id, title: str("title"), slug: str("slug"), description: str("description"), image: str("image"),
    category: str("category"), industry: str("industry"), client: str("client"),
    services: listValue(raw.services), technologies: listValue(raw.technologies ?? raw.tags),
    gallery: listValue(raw.gallery, /\n/), timeline: str("timeline"),
    // Existing records require review and explicit publication in the CMS.
    status: raw.status === "published" ? "published" : "draft", featured: raw.featured === true,
    seoTitle: str("seoTitle"), seoDescription: str("seoDescription"), seoKeywords: str("seoKeywords"),
    createdAt: typeof raw.createdAt === "number" ? raw.createdAt : 0,
    liveUrl: safeUrl(str("liveUrl")), projectId: str("projectId"), overview: str("overview"),
    background: str("background"), challenge: str("challenge"), goals: str("goals"),
    approach: str("approach"), solution: str("solution"), process: str("process"),
    features: listValue(raw.features, /\n/), tools: str("tools"), outcomes: str("outcomes") || str("result"),
    metrics: metrics.filter((m): m is {value: string; label: string} => !!m && typeof m.value === "string" && typeof m.label === "string" && !!m.value && !!m.label),
    measurementNotes: str("measurementNotes"), testimonial: str("testimonial"), testimonialAuthor: str("testimonialAuthor"),
    ctaTitle: str("ctaTitle"), ctaLabel: str("ctaLabel"),
  };
}
export function sortEntries(entries: ContentEntry[]) {
  return [...entries].sort((a, b) => Number(b.featured) - Number(a.featured) || b.createdAt - a.createdAt || a.title.localeCompare(b.title));
}
