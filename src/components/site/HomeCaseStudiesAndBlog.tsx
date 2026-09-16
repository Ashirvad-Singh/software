import { useSwipe } from "@/hooks/useSwipe";
import { useState } from "react";
import { ArrowRight, Clock } from "lucide-react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { useCatalog } from "@/lib/content/useCatalog";
import CatalogState from "@/components/content/CatalogState";
import { useContent } from "@/lib/content/useContent";
import { StickyCard002 } from "@/components/v1/skiper17";

export default function HomeCaseStudiesAndBlog({
  caseStudiesOnly = false,
  blogOnly = false,
}: {
  caseStudiesOnly?: boolean;
  blogOnly?: boolean;
}) {
  const { entries: publishedStudies } = useContent("case_studies");
  const caseStudies = publishedStudies.slice(0, 5);
  const { entries: allPosts, loading, error, retry } = useCatalog("blogs");
  const posts = allPosts.slice(0, 5);
  const [activeBlog, setActiveBlog] = useState(0);
  const blogSwipe = useSwipe((direction) => {
    const count = Math.min(posts.length, 3);
    if (count > 1) setActiveBlog((index) => (index + direction + count) % count);
  });


  return (
    <>
      {!blogOnly && caseStudies.length > 0 && (
        <StickyCard002
          showWave
          cards={caseStudies.map((cs) => ({
            id: cs.id || cs.slug,
            image: cs.image,
            alt: cs.title,
            title: cs.title,
            category: cs.category || "Digital Product",
            client: cs.client || "Adat Client",
            challenge: cs.challenge || cs.description || "Solving complex digital challenges with scalable engineering.",
            solution: cs.solution || "Custom software engineered for high performance, reliability, and growth.",
            features: cs.features,
            result: cs.outcomes,
            slug: cs.slug,
            tags: cs.technologies,
          }))}
          badge="Selected Case Studies"
          title="Case Studies That Drive Growth"
          subtitle="Explore real client outcomes, engineering solutions, and digital products we built."
        />
      )}

      {!caseStudiesOnly && (
        <section
          style={{ fontFamily: '"Geist Variable", sans-serif' }}
          className="py-10 md:py-16 border-t border-border bg-secondary/30 px-5 font-sans sm:px-8 lg:px-12"
        >
          <div className="mx-auto max-w-7xl">
            <CatalogState loading={loading} error={error} empty={!posts.length} label="articles" retry={retry} />
            <div className="mb-8 flex flex-col items-start justify-between gap-4 sm:mb-12 sm:flex-row sm:items-end">
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
            <div {...blogSwipe} className="relative overflow-hidden py-2">
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
              {posts.length > 1 && <><button
                type="button"
                aria-label="Previous blog post"
                onClick={() =>
                  setActiveBlog(
                    (index) =>
                      (index - 1 + Math.min(posts.length, 3)) %
                      Math.min(posts.length, 3),
                  )
                }
                className="site-button site-button-icon absolute left-2 top-1/2 z-30 flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full border border-border bg-background/90 text-foreground shadow-sm transition-colors hover:bg-primary hover:text-primary-foreground sm:left-5"
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
                className="site-button site-button-icon absolute right-2 top-1/2 z-30 flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full border border-border bg-background/90 text-foreground shadow-sm transition-colors hover:bg-primary hover:text-primary-foreground sm:right-5"
              >
                <ArrowRight className="h-5 w-5" />
              </button>
              </>}
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
