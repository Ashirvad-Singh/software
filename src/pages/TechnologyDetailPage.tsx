import ContentSkeleton from "@/components/content/ContentSkeleton";
import DetailThumbnail from "@/components/content/DetailThumbnail";
import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import {
  ArrowRight,
  Code2,
  Cpu,
  ShieldCheck,
  Zap,
  CheckCircle2,
  Layers,
  Server,
  Globe,
  HelpCircle,
  ChevronDown,
  MessageSquare,
  Sparkles,
} from "lucide-react";
import SEO from "@/components/site/SEO";
import InnerPageHero from "@/components/site/InnerPageHero";
import { useContent } from "@/lib/content/useContent";
import { collection, getDocs } from "firebase/firestore";
import { db } from "@/lib/firebase";
import { defaultTechnologyPage, findDefaultTechnology, technologySlug, type TechnologyDetail } from "@/data/technologyDetails";
import type { TechTechnology } from "@/components/dashboard/TechStackTab";
const benefitIcons = { CheckCircle2, Code2, Cpu, ShieldCheck, Zap, Layers, Server, Globe };

export default function TechnologyDetailPage() {
  const { slug } = useParams<{ slug: string }>();
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  const [pageState, setPageState] = useState<{slug: string; detail: TechnologyDetail | null; error: boolean} | null>(null);
  const [attempt, setAttempt] = useState(0);
  const { entries: publishedProjects } = useContent("projects");
  useEffect(() => {
    let active = true;
    setOpenFaq(null);
    getDocs(collection(db, "tech_stack")).then(snapshot => {
      let detail = findDefaultTechnology(slug || "") || null;
      for (const category of snapshot.docs) {
        const data = category.data();
        const tech = (data.technologies || []).find((item: TechTechnology) =>
          technologySlug(item.slug || item.name) === technologySlug(slug || "") ||
          (!item.slug && findDefaultTechnology(item.name)?.slug === slug)
        ) as TechTechnology | undefined;
        if (tech) {
          detail = { ...defaultTechnologyPage(tech.name, data.title || ""), ...tech.page, slug: tech.slug || technologySlug(tech.name) };
          break;
        }
      }
      if (active) setPageState({slug: slug || "",detail,error:false});
    }).catch(() => { if(active) setPageState({slug:slug || "",detail:null,error:true}); });
    return () => { active = false; };
  }, [slug, attempt]);
  if (!pageState || pageState.slug !== slug) return <main className="min-h-screen"><ContentSkeleton variant="detail" label="technology" /></main>;
  if (pageState.error) return <main className="min-h-screen pt-36 text-center"><h1 className="text-2xl font-bold">Unable to load technology</h1><button className="mt-4 text-primary underline" onClick={() => {setPageState(null);setAttempt(value=>value+1);}}>Try again</button></main>;
  const techDetail = pageState.detail;
  if (!techDetail) return <main className="min-h-screen pt-36 text-center"><h1 className="text-2xl font-bold">Technology not found</h1><Link to="/technologies" className="mt-4 inline-block text-primary">Explore our technology stack</Link></main>;
  const relatedProjects = publishedProjects.filter(project => project.technologies.some(name =>
    technologySlug(name) === technologySlug(techDetail.name) || findDefaultTechnology(name)?.slug === findDefaultTechnology(techDetail.name)?.slug && !!findDefaultTechnology(name)
  )).slice(0, 3);

  return (
    <main className="min-h-screen bg-white dark:bg-neutral-950 font-sans text-neutral-900 dark:text-white md:">
      <SEO
        title={techDetail.seoTitle || `${techDetail.name} | Technology Expertise`}
        description={techDetail.seoDescription || techDetail.overview}
        keywords={techDetail.seoKeywords || `${techDetail.name}, Adat Soft Solutions, ${techDetail.category}, custom software development`}
      />

      {/* InnerPageHero Header */}
      <InnerPageHero
        eyebrow={`TECHNOLOGY / ${(techDetail.category || "STACK").toUpperCase()}`}
        title={techDetail.name}
        highlightTitle={techDetail.category}
        description={techDetail.tagline || techDetail.overview}
        breadcrumbs={[
          { label: "Home", href: "/" },
          { label: "Technologies", href: "/technologies" },
          { label: techDetail.name },
        ]}
      />

      {techDetail.featuredImageUrl && <div className="container mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8"><DetailThumbnail src={techDetail.featuredImageUrl} alt={techDetail.name} landscape /></div>}

      {/* Overview & Key Benefits Section */}
      <section className="pt-6 md:pt-8 bg-white dark:bg-neutral-950">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
          <div className="grid grid-cols-1 lg:grid-cols-[1.2fr_1fr] gap-8 lg:gap-10 items-start mb-10 md:mb-12">
            <div className="space-y-5">
              <span className="inline-flex text-xs font-bold uppercase tracking-wider text-primary bg-primary/10 px-3.5 py-1.5 rounded-full border border-primary/20">
                Technology Overview
              </span>
              <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-neutral-900 dark:text-white">
                {techDetail.overviewTitle || `Why We Build with ${techDetail.name}`}
              </h2>
              <p className="text-base md:text-lg text-neutral-600 dark:text-neutral-400 leading-relaxed whitespace-pre-line">
                {techDetail.overview}
              </p>

              <div className="pt-2 flex flex-col sm:flex-row items-stretch sm:items-center gap-3 w-full sm:w-auto">
                <Link
                  to="/contact"
                  className="site-button bg-primary text-white font-bold px-6 py-3 rounded-full text-xs sm:text-sm hover:scale-[1.02] transition-all shadow-md flex items-center justify-center gap-2 text-center"
                >
                  <MessageSquare className="w-4 h-4 shrink-0" />
                  <span>Consult Tech Team</span>
                </Link>
                <Link
                  to="/work"
                  className="site-button border border-neutral-300 dark:border-neutral-800 text-neutral-800 dark:text-neutral-200 font-bold px-6 py-3 rounded-full text-xs sm:text-sm hover:bg-neutral-100 dark:hover:bg-neutral-900 transition-colors flex items-center justify-center gap-2 text-center"
                >
                  <span>View Featured Work</span>
                  <ArrowRight className="w-4 h-4 shrink-0" />
                </Link>
              </div>
            </div>

            {/* 4 Benefits Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {techDetail.benefits.map((benefit, idx) => {
                const Icon = benefitIcons[benefit.icon as keyof typeof benefitIcons] || Code2;
                return (
                  <div
                    key={idx}
                    className="p-5 rounded-2xl bg-neutral-50 dark:bg-neutral-900/60 border border-neutral-200 dark:border-neutral-800 space-y-2 hover:border-primary/30 transition-colors"
                  >
                    <div className="w-10 h-10 rounded-xl bg-neutral-900 text-white dark:bg-white dark:text-neutral-900 flex items-center justify-center font-bold">
                      <Icon className="w-5 h-5 text-primary" />
                    </div>
                    <h3 className="text-sm font-bold text-neutral-900 dark:text-white">
                      {benefit.title}
                    </h3>
                    <p className="text-xs text-neutral-500 dark:text-neutral-400 leading-relaxed">
                      {benefit.desc}
                    </p>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Key Deliverables & Features List */}
          {techDetail.keyFeatures.some(feature => feature.trim()) && (
          <div className="p-5 sm:p-8 md:p-12 rounded-3xl bg-neutral-900 text-white border border-neutral-800 mb-12 sm:mb-16">
            <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-primary mb-3">
              <Sparkles className="w-4 h-4" /> Engineering Capabilities
            </div>
            <h3 className="text-xl sm:text-2xl md:text-3xl font-bold mb-6 sm:mb-8">
              {techDetail.featuresTitle || `Technical Features of ${techDetail.name}`}
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {techDetail.keyFeatures.filter(feature => feature.trim()).map((feature, idx) => (
                <div
                  key={idx}
                  className="p-4 rounded-xl bg-neutral-800/60 border border-neutral-700/60 flex items-start gap-3 text-xs md:text-sm text-neutral-200"
                >
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                  <span>{feature}</span>
                </div>
              ))}
            </div>
          </div>
          )}

          {/* Ideal Use Cases Grid */}
          {techDetail.useCases.length > 0 && (
          <div className="mb-16">
            <div className="text-center max-w-2xl mx-auto mb-10">
              <span className="inline-flex text-xs font-bold uppercase tracking-wider text-primary bg-primary/10 px-3.5 py-1.5 rounded-full border border-primary/20">
                Application Scenarios
              </span>
              <h2 className="text-3xl font-bold mt-4 text-neutral-900 dark:text-white">
                {techDetail.useCasesTitle || `Use Cases for ${techDetail.name}`}
              </h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {techDetail.useCases.map((useCase, idx) => (
                <div
                  key={idx}
                  className="p-6 rounded-2xl bg-neutral-50 dark:bg-neutral-900/40 border border-neutral-200 dark:border-neutral-800 space-y-2 hover:border-primary/40 transition-colors"
                >
                  <div className="text-xs font-bold text-primary uppercase tracking-wider">
                    Use Case 0{idx + 1}
                  </div>
                  <h3 className="text-lg font-bold text-neutral-900 dark:text-white">
                    {useCase.title}
                  </h3>
                  <p className="text-xs md:text-sm text-neutral-600 dark:text-neutral-400 leading-relaxed">
                    {useCase.desc}
                  </p>
                </div>
              ))}
            </div>
          </div>
          )}

          {/* Development Lifecycle Steps */}
          {techDetail.process.length > 0 && (
          <div className="mb-16">
            <div className="text-center max-w-2xl mx-auto mb-10">
              <span className="inline-flex text-xs font-bold uppercase tracking-wider text-primary bg-primary/10 px-3.5 py-1.5 rounded-full border border-primary/20">
                Delivery Pipeline
              </span>
              <h2 className="text-3xl font-bold mt-4 text-neutral-900 dark:text-white">
                {techDetail.processTitle || `Our ${techDetail.name} Delivery Process`}
              </h2>
            </div>

            <div className="space-y-4">
              {techDetail.process.map((stepItem, idx) => (
                <div
                  key={idx}
                  className="p-4 sm:p-6 rounded-2xl bg-white dark:bg-neutral-950 border border-neutral-200 dark:border-neutral-800 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 shadow-sm"
                >
                  <div className="flex items-start sm:items-center gap-3.5 sm:gap-4">
                    <span className="site-step-badge w-10 h-10 rounded-xl bg-neutral-900 text-white dark:bg-white dark:text-neutral-900 font-extrabold flex items-center justify-center text-xs shrink-0">
                      {stepItem.step}
                    </span>
                    <div>
                      <h3 className="text-base font-bold text-neutral-900 dark:text-white">
                        {stepItem.title}
                      </h3>
                      <p className="text-xs text-neutral-500 dark:text-neutral-400 mt-0.5 max-w-2xl leading-relaxed">
                        {stepItem.desc}
                      </p>
                    </div>
                  </div>
                  <span className="text-xs font-semibold text-emerald-600 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-950/60 px-3 py-1 rounded-full shrink-0">
                    Phase {idx + 1}
                  </span>
                </div>
              ))}
            </div>
          </div>
          )}

          {/* Related Projects Showcase */}
          {relatedProjects.length > 0 && (
          <div className="mb-16">
            <div className="flex items-center justify-between mb-8">
              <div>
                <h2 className="text-2xl font-bold text-neutral-900 dark:text-white">
                  Featured Projects Built With Modern Tech
                </h2>
                <p className="text-xs text-neutral-500 mt-1">
                  Explore production web and mobile apps engineered by Adat Soft Solutions.
                </p>
              </div>
              <Link
                to="/work"
                className="text-xs font-bold text-primary hover:underline inline-flex items-center gap-1"
              >
                View All Projects <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {relatedProjects.map((project) => (
                <Link
                  key={project.id}
                  to={`/work/${project.slug}`}
                  className="group rounded-2xl border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-950 overflow-hidden shadow-sm hover:shadow-xl transition-all"
                >
                  <div className="aspect-video overflow-hidden bg-neutral-100 dark:bg-neutral-900">
                    <img
                      src={project.image}
                      alt={project.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                  </div>
                  <div className="p-5 space-y-2">
                    <span className="text-[10px] font-bold uppercase tracking-wider text-primary">
                      {project.category}
                    </span>
                    <h3 className="text-base font-bold text-neutral-900 dark:text-white group-hover:text-primary transition-colors">
                      {project.title}
                    </h3>
                    <p className="text-xs text-neutral-500 line-clamp-2">
                      {project.description}
                    </p>
                  </div>
                </Link>
              ))}
            </div>
          </div>
          )}

          {/* Technology FAQ Accordion */}
          {techDetail.faqs.length > 0 && (
          <div className="mb-16">
            <div className="text-center max-w-2xl mx-auto mb-8">
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-neutral-100 dark:bg-neutral-900 text-neutral-800 dark:text-neutral-200 text-xs font-semibold uppercase tracking-wider mb-2 border border-neutral-200 dark:border-neutral-800">
                <HelpCircle className="w-4 h-4 text-primary" />
                {techDetail.name} FAQ
              </div>
              <h2 className="text-2xl md:text-3xl font-bold text-neutral-900 dark:text-white">
                {techDetail.faqTitle || "Frequently Asked Questions"}
              </h2>
            </div>

            <div className="space-y-3 max-w-4xl mx-auto">
              {techDetail.faqs.map((faq, idx) => {
                const isOpen = openFaq === idx;
                return (
                  <div
                    key={idx}
                    className={`rounded-2xl border transition-all ${
                      isOpen
                        ? "border-primary/40 bg-neutral-50 dark:bg-neutral-900/60"
                        : "border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-950"
                    }`}
                  >
                    <button
                      onClick={() => setOpenFaq(isOpen ? null : idx)}
                      aria-expanded={isOpen}
                      className="w-full p-5 flex items-center justify-between gap-4 text-left font-bold text-neutral-900 dark:text-white text-base"
                    >
                      <span>{faq.q}</span>
                      <ChevronDown
                        className={`w-5 h-5 shrink-0 transition-transform ${
                          isOpen ? "rotate-180 text-primary" : "text-neutral-400"
                        }`}
                      />
                    </button>
                    {isOpen && (
                      <div className="px-5 pb-5 text-sm text-neutral-600 dark:text-neutral-400 leading-relaxed border-t border-neutral-200/50 dark:border-neutral-800/50 pt-3">
                        {faq.a}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
          )}

          {/* Bottom Consultation CTA */}
          <div className="p-8 md:p-12 rounded-3xl bg-neutral-900 text-white border border-neutral-800 flex flex-col md:flex-row items-center justify-between gap-8 shadow-2xl relative overflow-hidden">
            <div className="space-y-3 text-center md:text-left z-10 max-w-2xl">
              <span className="inline-flex items-center gap-1.5 text-xs font-bold text-primary uppercase tracking-wider">
                <Sparkles className="w-4 h-4" /> Ready to Build with {techDetail.name}?
              </span>
              <h2 className="text-2xl md:text-3xl font-bold tracking-tight">
                {techDetail.ctaTitle || `Build Your ${techDetail.name} Application`}
              </h2>
              <p className="text-sm text-neutral-400 leading-relaxed">
                {techDetail.ctaDescription || "Talk to our team about your requirements, architecture, and timeline."}
              </p>
            </div>
            <Link
              to="/contact"
              className="site-button z-10 bg-white hover:bg-neutral-100 text-neutral-900 font-bold px-6 sm:px-8 py-3.5 sm:py-4 rounded-full text-xs sm:text-sm shrink-0 transition-all shadow-lg hover:scale-105 flex items-center justify-center gap-2 w-full sm:w-auto text-center"
            >
              <MessageSquare className="w-4 h-4 text-primary shrink-0" />
              <span>{techDetail.ctaLabel || "Discuss Your Project"}</span>
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
