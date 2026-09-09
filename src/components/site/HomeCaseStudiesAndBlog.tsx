import { useEffect, useState } from "react";
import { collection, getDocs, limit, orderBy, query } from "firebase/firestore";
import { ArrowRight, ArrowUpRight, Clock, X } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";
import { db } from "@/lib/firebase";

type BlogPost = {
  id: string | number;
  slug: string;
  title: string;
  excerpt: string;
  image: string;
  category: string;
  author: string;
  date: string;
  readTime: string;
};

const staticPosts: BlogPost[] = [
  {
    id: 1,
    slug: "future-of-web-development-2026",
    title: "The Future of Web Development in 2026",
    excerpt:
      "Explore the trends shaping digital products, from AI-driven interfaces to faster, smarter web experiences.",
    image:
      "https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&q=80&w=900",
    category: "Technology",
    author: "Adat Team",
    date: "Oct 24, 2026",
    readTime: "5 min read",
  },
  {
    id: 2,
    slug: "mastering-react-server-components",
    title: "Mastering React Server Components",
    excerpt:
      "A practical look at building faster, more scalable React applications with a thoughtful component architecture.",
    image:
      "https://images.unsplash.com/photo-1633356122544-f134324a6cee?auto=format&fit=crop&q=80&w=900",
    category: "Development",
    author: "Adat Team",
    date: "Oct 20, 2026",
    readTime: "8 min read",
  },
  {
    id: 3,
    slug: "design-systems-for-scale",
    title: "Building Design Systems for Scale",
    excerpt:
      "How flexible design foundations help teams create consistent, maintainable digital products.",
    image:
      "https://images.unsplash.com/photo-1561070791-2526d30994b5?auto=format&fit=crop&q=80&w=900",
    category: "Design",
    author: "Adat Team",
    date: "Oct 15, 2026",
    readTime: "6 min read",
  },
];

const sampleCaseStudies = [
  {
    id: "sample-fintech",
    slug: "global-fintech-platform",
    title: "Global FinTech Platform",
    category: "Web",
    client: "FinServe Global",
    image:
      "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&q=85&w=1200",
    challenge:
      "A secure, scalable financial platform designed to handle thousands of concurrent transactions without latency.",
    solution:
      "We created a real-time dashboard with robust architecture, clear workflows, and performance-focused engineering.",
    result: "Increased transaction volume by 150%",
  },
  {
    id: "sample-healthcare",
    slug: "healthcare-booking-app",
    title: "Healthcare Booking App",
    category: "Mobile App",
    client: "MediCare Plus",
    image:
      "https://images.unsplash.com/photo-1576091160550-2173dba999ef?auto=format&fit=crop&q=85&w=1200",
    challenge:
      "Patients needed a faster and simpler way to discover doctors and book appointments.",
    solution:
      "A cross-platform mobile experience with live availability, notifications, and a frictionless booking flow.",
    result: "10k+ active daily users",
  },
  {
    id: "sample-ecommerce",
    slug: "luxury-fashion-store",
    title: "Luxury Fashion Store",
    category: "E-commerce",
    client: "Aura Boutique",
    image:
      "https://images.unsplash.com/photo-1441986300917-64674bd600d8?auto=format&fit=crop&q=85&w=1200",
    challenge:
      "An outdated online store was slowing purchases and failing to reflect the premium brand.",
    solution:
      "A polished storefront with high-quality visuals, fast browsing, and a smoother checkout journey.",
    result: "30% higher conversion rate",
  },
  {
    id: "sample-logistics",
    slug: "logistics-dashboard",
    title: "Logistics Dashboard",
    category: "Web App",
    client: "Swift Logistics",
    image:
      "https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?auto=format&fit=crop&q=85&w=1200",
    challenge:
      "Dispatchers needed a clearer view of vehicles, routes, and delivery progress.",
    solution:
      "A live operations dashboard that brings tracking, assignments, and route planning into one place.",
    result: "Optimized route planning",
  },
  {
    id: "sample-fitness",
    slug: "fitness-tracker-app",
    title: "Fitness Tracker App",
    category: "Mobile App",
    client: "FitLife",
    image:
      "https://images.unsplash.com/photo-1594882645126-14020914d58d?auto=format&fit=crop&q=85&w=1200",
    challenge:
      "Users wanted meaningful workout insights across multiple wearable devices.",
    solution:
      "A motivating fitness experience with synced health data, progress analytics, and gamified goals.",
    result: "4.8/5 App Store rating",
  },
];

export default function HomeCaseStudiesAndBlog({
  caseStudiesOnly = false,
  blogOnly = false,
}: {
  caseStudiesOnly?: boolean;
  blogOnly?: boolean;
}) {
  const [caseStudies, setCaseStudies] = useState<any[]>(sampleCaseStudies);
  const [posts, setPosts] = useState<BlogPost[]>(staticPosts);
  const [activeCaseStudy, setActiveCaseStudy] = useState(0);
  const [expandedCaseStudy, setExpandedCaseStudy] = useState<any | null>(null);
  const [activeBlog, setActiveBlog] = useState(0);
  const [canDragPreview, setCanDragPreview] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const media = window.matchMedia("(min-width: 1280px) and (hover: hover) and (pointer: fine)");
    const updatePreview = () => setCanDragPreview(media.matches);
    updatePreview();
    media.addEventListener("change", updatePreview);
    return () => media.removeEventListener("change", updatePreview);
  }, []);

  useEffect(() => {
    let cancelled = false;
    const fetchContent = async () => {
      try {
        const [caseStudySnapshot, blogSnapshot] = await Promise.all([
          getDocs(
            query(
              collection(db, "case_studies"),
              orderBy("createdAt", "desc"),
              limit(5),
            ),
          ),
          getDocs(
            query(
              collection(db, "blogs"),
              orderBy("createdAt", "desc"),
              limit(5),
            ),
          ),
        ]);
        if (cancelled) return;
        if (!caseStudySnapshot.empty) {
          setCaseStudies(
            caseStudySnapshot.docs.map((doc) => ({
              id: doc.id,
              ...doc.data(),
            })),
          );
          setActiveCaseStudy(0);
        }
        if (!blogSnapshot.empty) {
          setPosts(
            blogSnapshot.docs.map((doc) => ({
              id: doc.id,
              ...doc.data(),
            })) as BlogPost[],
          );
        }
      } catch (error) {
        console.error("Error fetching homepage content:", error);
      }
    };
    fetchContent();
    return () => {
      cancelled = true;
    };
  }, []);

  return (
    <>
      {!blogOnly && (
        <section
          style={{ fontFamily: '"Geist Variable", sans-serif' }}
          className="relative min-h-[680px] overflow-hidden bg-[#f4f7fb] px-5 py-16 font-sans text-foreground sm:min-h-[760px] sm:px-8 sm:py-24 xl:px-12 xl:py-28"
        >
          <svg
            aria-hidden="true"
            className="pointer-events-none absolute -right-16 top-20 h-80 w-80 text-primary/10 sm:right-8"
            viewBox="0 0 320 320"
            fill="none"
          >
            <circle
              cx="160"
              cy="160"
              r="118"
              stroke="currentColor"
              strokeWidth="1"
            />
            <circle
              cx="160"
              cy="160"
              r="78"
              stroke="currentColor"
              strokeWidth="1"
              strokeDasharray="5 8"
            />
            <path
              d="M32 160h256M160 32v256M70 70l180 180M250 70L70 250"
              stroke="currentColor"
              strokeWidth="1"
              opacity="0.7"
            />
            <circle cx="160" cy="160" r="8" fill="currentColor" />
          </svg>
          <div className="mx-auto flex max-w-7xl flex-col justify-between xl:min-h-[620px]">
            <div className="flex items-start justify-between">
              <div>
                <p className="text-xs font-medium uppercase tracking-[0.24em] text-primary">
                  Selected Case Studies
                </p>
                <h2 className="mt-4 text-4xl font-bold tracking-tight text-foreground sm:text-6xl">
                  Case Studies
                </h2>
                <p className="mt-3 max-w-sm text-sm leading-relaxed text-muted-foreground">
                  Detailed progress and measurable outcomes from the projects we
                  have built.
                </p>
              </div>
              <Link
                to="/case-studies"
                className="hidden items-center gap-2 text-xs uppercase tracking-wider text-muted-foreground transition-colors hover:text-primary sm:inline-flex"
              >
                View all case studies <ArrowUpRight className="h-4 w-4" />
              </Link>
            </div>

            {caseStudies.length > 0 && (
              <div className="relative mt-10 grid flex-1 grid-cols-1 items-center justify-items-center gap-8 xl:grid-cols-2 xl:gap-20">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={caseStudies[activeCaseStudy]?.slug}
                    initial={{ opacity: 0, x: -35, rotate: canDragPreview ? -4 : 0 }}
                    animate={{ opacity: 1, x: 0, rotate: canDragPreview ? -4 : 0 }}
                    exit={{ opacity: 0, x: 35, rotate: canDragPreview ? 4 : 0 }}
                    transition={{ duration: 0.65, ease: "easeOut" }}
                    className="relative min-w-0 w-full max-w-[560px]"
                  >
                    <motion.div
                      drag={canDragPreview}
                      dragConstraints={{
                        left: -60,
                        right: 60,
                        top: -35,
                        bottom: 35,
                      }}
                      dragElastic={0.2}
                      whileDrag={{ scale: 1.03, rotate: 0, cursor: "grabbing" }}
                      className={`group relative aspect-[4/3] overflow-hidden rounded-xl border border-white/15 bg-neutral-900 shadow-2xl ${canDragPreview ? "cursor-grab" : ""}`}
                    >
                      <img
                        src={caseStudies[activeCaseStudy]?.image}
                        alt={caseStudies[activeCaseStudy]?.title}
                        loading="lazy"
                        className="h-full w-full object-cover opacity-90 transition-transform duration-700 group-hover:scale-105"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-transparent to-transparent" />
                      <div className="absolute bottom-5 left-5 right-5 flex items-end justify-between gap-4">
                        <div>
                          <p className="text-xs uppercase tracking-[0.2em] text-white/55">
                            {caseStudies[activeCaseStudy]?.category ||
                              "Case Study"}
                          </p>
                          <p className="mt-2 text-xl font-medium text-white sm:text-2xl">
                            {caseStudies[activeCaseStudy]?.title}
                          </p>
                        </div>
                        <span className={`${canDragPreview ? "" : "hidden"} rounded-full border border-white/25 px-3 py-1 text-[10px] uppercase tracking-wider text-white/65`}>
                          Drag
                        </span>
                      </div>
                    </motion.div>
                  </motion.div>
                </AnimatePresence>

                <div className="relative z-10 min-w-0 w-full max-w-[560px] xl:max-w-md">
                  <p className="mb-4 border-b border-border pb-3 text-xs uppercase tracking-[0.2em] text-muted-foreground">
                    My Case Studies
                  </p>
                  <div className="space-y-1">
                    {caseStudies.map((project, index) => (
                      <button
                        key={project.id || project.slug}
                        type="button"
                        onMouseEnter={() => setActiveCaseStudy(index)}
                        onFocus={() => setActiveCaseStudy(index)}
                        onClick={() =>
                          navigate(`/case-studies/${project.slug}`)
                        }
                        className={`group flex min-h-12 w-full items-center justify-between gap-3 border-b border-border py-3 text-left text-xl leading-snug tracking-tight transition-colors sm:text-3xl ${index === activeCaseStudy ? "text-foreground" : "text-muted-foreground hover:text-foreground"}`}
                      >
                        <span className="min-w-0 break-words">{project.title}</span>
                        <ArrowUpRight
                          className={`h-5 w-5 shrink-0 transition-all ${index === activeCaseStudy ? "text-primary opacity-100" : "opacity-0 group-hover:opacity-100"}`}
                        />
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            )}

            <Link
              to="/case-studies"
              className="mt-8 inline-flex items-center gap-2 text-sm font-semibold text-primary sm:hidden"
            >
              View all case studies <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </section>
      )}

      {!caseStudiesOnly && !blogOnly && (
        <section className="bg-background px-5 py-16 font-sans sm:px-8 sm:py-24 lg:px-12 lg:py-28">
          <div className="mx-auto max-w-7xl">
            <div className="mb-10 flex items-end justify-between gap-6 sm:mb-14">
              <div>
                <p className="text-xs font-bold uppercase tracking-[0.2em] text-primary">
                  Selected work
                </p>
                <h2 className="mt-3 text-3xl font-bold tracking-tight text-foreground sm:text-5xl">
                  Case studies that move businesses forward.
                </h2>
              </div>
              <Link
                to="/case-studies"
                className="hidden shrink-0 items-center gap-2 text-sm font-semibold text-primary transition-transform hover:translate-x-1 sm:inline-flex"
              >
                View all work <ArrowRight className="h-4 w-4" />
              </Link>
            </div>

            <div className="relative overflow-hidden py-2 sm:py-4">
              <div className="relative h-full">
                {caseStudies.map((project, index) => (
                  <motion.div
                    key={project.id || project.slug}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: index === activeCaseStudy ? 1 : 0.5 }}
                    transition={{ duration: 0.7, ease: "easeOut" }}
                    className={`${index === activeCaseStudy ? "relative" : "absolute"} left-1/2 top-0 w-[calc(100%-1rem)] -translate-x-1/2 transition-transform duration-700 xl:w-[68%] ${index === activeCaseStudy ? "z-20" : index === (activeCaseStudy - 1 + caseStudies.length) % caseStudies.length ? "z-10 -translate-x-[115%] sm:-translate-x-[112%]" : "z-10 translate-x-[15%] sm:translate-x-[12%]"} ${index !== activeCaseStudy ? "hidden xl:block" : ""}`}
                  >
                    <div className="group block overflow-hidden rounded-2xl border border-border bg-card shadow-sm transition-all duration-500 hover:shadow-xl">
                      <div className="relative aspect-[16/9] overflow-hidden bg-muted sm:aspect-[16/8]">
                        <motion.img
                          drag
                          dragConstraints={{
                            left: -45,
                            right: 45,
                            top: -25,
                            bottom: 25,
                          }}
                          dragElastic={0.18}
                          whileDrag={{ scale: 1.04, cursor: "grabbing" }}
                          src={project.image}
                          alt={project.title}
                          loading="lazy"
                          className="h-full w-full cursor-grab object-cover transition-transform duration-700 group-hover:scale-105"
                        />
                        <span className="absolute left-5 top-5 rounded-full bg-primary px-3 py-1.5 text-xs font-semibold text-primary-foreground">
                          {project.category || "Digital Product"}
                        </span>
                        <span className="absolute bottom-4 right-4 rounded-full bg-background/90 px-3 py-1.5 text-xs font-medium text-foreground shadow-sm">
                          Drag preview
                        </span>
                      </div>
                      <div className="grid gap-5 p-5 sm:grid-cols-[1fr_auto] sm:p-7">
                        <div>
                          <div className="flex items-center gap-3 text-xs font-medium uppercase tracking-wider text-muted-foreground">
                            <span>
                              Case study {String(index + 1).padStart(2, "0")}
                            </span>
                            <span className="h-1 w-1 rounded-full bg-primary" />
                            <span>{project.client || "Adat Client"}</span>
                          </div>
                          <Link
                            to={`/case-studies/${project.slug}`}
                            className="mt-3 block text-2xl font-bold tracking-tight text-foreground group-hover:text-primary sm:text-4xl"
                          >
                            {project.title}
                          </Link>
                          <p className="mt-3 max-w-2xl text-sm leading-relaxed text-muted-foreground">
                            {project.challenge ||
                              project.description ||
                              "A focused digital product built for measurable results."}
                          </p>
                          <button
                            type="button"
                            onClick={() => setExpandedCaseStudy(project)}
                            className="mt-5 inline-flex items-center gap-2 text-sm font-semibold text-primary transition-transform hover:translate-x-1"
                          >
                            View details <ArrowRight className="h-4 w-4" />
                          </button>
                        </div>
                        <div className="flex items-end justify-between gap-5 sm:flex-col sm:items-end">
                          <Link
                            to={`/case-studies/${project.slug}`}
                            aria-label={`Open ${project.title} case study`}
                          >
                            <ArrowUpRight className="h-6 w-6 text-primary transition-transform hover:-translate-y-1 hover:translate-x-1" />
                          </Link>
                          {project.result && (
                            <span className="text-right text-sm font-semibold text-primary">
                              {project.result}
                            </span>
                          )}
                        </div>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
              <button
                type="button"
                aria-label="Previous case study"
                onClick={() =>
                  setActiveCaseStudy(
                    (index) =>
                      (index - 1 + caseStudies.length) % caseStudies.length,
                  )
                }
                className="absolute left-2 top-1/2 z-30 flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full border border-border bg-background/90 text-foreground shadow-sm transition-colors hover:bg-primary hover:text-primary-foreground sm:left-5"
              >
                <ArrowRight className="h-5 w-5 rotate-180" />
              </button>
              <button
                type="button"
                aria-label="Next case study"
                onClick={() =>
                  setActiveCaseStudy(
                    (index) => (index + 1) % caseStudies.length,
                  )
                }
                className="absolute right-2 top-1/2 z-30 flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full border border-border bg-background/90 text-foreground shadow-sm transition-colors hover:bg-primary hover:text-primary-foreground sm:right-5"
              >
                <ArrowRight className="h-5 w-5" />
              </button>
            </div>
            <div className="mt-6 flex items-center justify-center gap-2">
              {caseStudies.map((project, index) => (
                <button
                  key={project.id || project.slug}
                  type="button"
                  aria-label={`Show case study ${index + 1}`}
                  onClick={() => setActiveCaseStudy(index)}
                  className={`h-2 rounded-full transition-all ${index === activeCaseStudy ? "w-8 bg-primary" : "w-2 bg-border hover:bg-primary/50"}`}
                />
              ))}
            </div>
            <AnimatePresence>
              {expandedCaseStudy && (
                <motion.div
                  initial={{ opacity: 0, height: 0, y: 12 }}
                  animate={{ opacity: 1, height: "auto", y: 0 }}
                  exit={{ opacity: 0, height: 0, y: 12 }}
                  transition={{ duration: 0.45, ease: "easeOut" }}
                  className="relative mt-8 overflow-hidden rounded-2xl border border-primary/30 bg-primary/5 p-6 sm:p-8"
                >
                  <button
                    type="button"
                    aria-label="Close case study details"
                    onClick={() => setExpandedCaseStudy(null)}
                    className="absolute right-5 top-5 rounded-full p-2 text-muted-foreground transition-colors hover:bg-background hover:text-foreground"
                  >
                    <X className="h-5 w-5" />
                  </button>
                  <p className="text-xs font-bold uppercase tracking-[0.2em] text-primary">
                    Case study details
                  </p>
                  <h3 className="mt-3 max-w-2xl text-2xl font-bold tracking-tight text-foreground sm:text-3xl">
                    {expandedCaseStudy.title}
                  </h3>
                  <div className="mt-5 grid gap-6 text-sm leading-relaxed text-muted-foreground md:grid-cols-2">
                    <p>
                      <strong className="text-foreground">The challenge</strong>
                      <br />
                      {expandedCaseStudy.challenge ||
                        expandedCaseStudy.description ||
                        "A focused digital challenge solved through thoughtful product strategy and engineering."}
                    </p>
                    <p>
                      <strong className="text-foreground">The solution</strong>
                      <br />
                      {expandedCaseStudy.solution ||
                        "A custom digital experience designed around the client’s goals, users, and long-term growth."}
                    </p>
                  </div>
                  <Link
                    to={`/case-studies/${expandedCaseStudy.slug}`}
                    className="mt-6 inline-flex items-center gap-2 rounded-full bg-primary px-5 py-2.5 text-sm font-semibold text-primary-foreground transition-transform hover:translate-x-1"
                  >
                    Open full case study <ArrowUpRight className="h-4 w-4" />
                  </Link>
                </motion.div>
              )}
            </AnimatePresence>
            <Link
              to="/case-studies"
              className="mt-8 inline-flex items-center gap-2 text-sm font-semibold text-primary sm:hidden"
            >
              View all work <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </section>
      )}

      {!caseStudiesOnly && (
        <section
          style={{ fontFamily: '"Geist Variable", sans-serif' }}
          className="border-t border-border bg-secondary/30 px-5 py-16 font-sans sm:px-8 sm:py-24 lg:px-12 lg:py-28"
        >
          <div className="mx-auto max-w-7xl">
            <div className="mb-10 flex items-end justify-between gap-6 sm:mb-14">
              <div>
                <p className="text-xs font-bold uppercase tracking-[0.2em] text-primary">
                  From the journal
                </p>
                <h2 className="mt-3 text-3xl font-bold tracking-tight text-foreground sm:text-5xl">
                  Ideas for building better digital products.
                </h2>
              </div>
              <Link
                to="/blog"
                className="hidden shrink-0 items-center gap-2 text-sm font-semibold text-primary transition-transform hover:translate-x-1 sm:inline-flex"
              >
                View all articles <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
            <div className="relative overflow-hidden py-2">
              {posts.slice(0, 3).map((post, index) => (
                <motion.div
                  key={post.id || post.slug}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: index === activeBlog ? 1 : 0.42, y: 0 }}
                  transition={{ duration: 0.6, ease: "easeOut" }}
                  className={`${index === activeBlog ? "relative" : "absolute"} left-1/2 top-0 w-[calc(100%-1rem)] -translate-x-1/2 transition-transform duration-700 xl:w-[58%] ${index === activeBlog ? "z-20" : index === (activeBlog - 1 + Math.min(posts.length, 3)) % Math.min(posts.length, 3) ? "z-10 -translate-x-[112%]" : "z-10 translate-x-[12%]"} ${index !== activeBlog ? "hidden xl:block" : ""}`}
                >
                  <Link
                    to={`/blog/${post.slug}`}
                    className="group block h-full rounded-2xl border border-border bg-card p-3 shadow-sm transition-all duration-500 hover:shadow-xl sm:p-4"
                  >
                    <div className="aspect-[16/9] overflow-hidden rounded-lg bg-muted">
                      <img
                        src={post.image}
                        alt={post.title}
                        loading="lazy"
                        className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                      />
                    </div>
                    <div className="p-4 sm:p-6">
                      <div className="flex items-center justify-between gap-3 text-xs text-muted-foreground">
                        <span className="font-semibold uppercase tracking-wider text-primary">
                          {post.category}
                        </span>
                        <span className="flex items-center gap-1">
                          <Clock className="h-3.5 w-3.5" />
                          {post.readTime}
                        </span>
                      </div>
                      <h3 className="mt-4 text-xl font-bold leading-tight text-foreground group-hover:text-primary">
                        {post.title}
                      </h3>
                      <p className="mt-3 line-clamp-2 text-sm leading-relaxed text-muted-foreground">
                        {post.excerpt}
                      </p>
                      <p className="mt-5 text-xs text-muted-foreground">
                        {post.date} · {post.author}
                      </p>
                    </div>
                  </Link>
                </motion.div>
              ))}
              <button
                type="button"
                aria-label="Previous blog post"
                onClick={() =>
                  setActiveBlog(
                    (index) =>
                      (index - 1 + Math.min(posts.length, 3)) %
                      Math.min(posts.length, 3),
                  )
                }
                className="absolute left-2 top-1/2 z-30 flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full border border-border bg-background/90 text-foreground shadow-sm transition-colors hover:bg-primary hover:text-primary-foreground sm:left-5"
              >
                <ArrowRight className="h-5 w-5 rotate-180" />
              </button>
              <button
                type="button"
                aria-label="Next blog post"
                onClick={() =>
                  setActiveBlog(
                    (index) => (index + 1) % Math.min(posts.length, 3),
                  )
                }
                className="absolute right-2 top-1/2 z-30 flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full border border-border bg-background/90 text-foreground shadow-sm transition-colors hover:bg-primary hover:text-primary-foreground sm:right-5"
              >
                <ArrowRight className="h-5 w-5" />
              </button>
            </div>
            <div className="mt-6 flex items-center justify-center gap-2">
              {posts.slice(0, 3).map((post, index) => (
                <button
                  key={post.id || post.slug}
                  type="button"
                  aria-label={`Show blog post ${index + 1}`}
                  onClick={() => setActiveBlog(index)}
                  className={`h-2 rounded-full transition-all ${index === activeBlog ? "w-8 bg-primary" : "w-2 bg-border hover:bg-primary/50"}`}
                />
              ))}
            </div>
            <Link
              to="/blog"
              className="mt-8 inline-flex items-center gap-2 text-sm font-semibold text-primary sm:hidden"
            >
              View all articles <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </section>
      )}
    </>
  );
}
