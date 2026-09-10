import { useEffect, useState } from "react";
import { collection, getDocs, limit, orderBy, query } from "firebase/firestore";
import { ArrowRight, Clock } from "lucide-react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { db } from "@/lib/firebase";
import { StickyCard002 } from "@/components/v1/skiper17";

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
    title: "Global FinTech Transaction Platform",
    category: "Web Application & Microservices",
    client: "FinServe Global Inc.",
    image:
      "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&q=85&w=1200",
    challenge:
      "FinServe Global faced severe sub-second latency spikes, database locks, and auditing compliance friction when processing over 50,000 concurrent international transactions during peak trading hours across 12 countries.",
    solution:
      "We architected a high-throughput React 19 micro-frontend ecosystem backed by WebSocket data streaming pipelines, automated zero-downtime cluster failover, and automated AES-256 ledger auditing.",
    features: [
      "Sub-10ms real-time market data & transaction processing",
      "Automated SOC-2 & PCI-DSS compliance telemetry audit logs",
    ],
    result: "⚡ 150% Increase in Transaction Capacity",
    tags: ["React 19", "TypeScript", "Node.js", "WebSockets", "AWS Lambda"],
  },
  {
    id: "sample-healthcare",
    slug: "healthcare-booking-app",
    title: "Telehealth & Doctor Discovery App",
    category: "Mobile App & Telehealth",
    client: "MediCare Plus Health",
    image:
      "https://images.unsplash.com/photo-1576091160550-2173dba999ef?auto=format&fit=crop&q=85&w=1200",
    challenge:
      "Patients suffered from long clinic queues, cumbersome specialist discovery, and fragmented communication between local healthcare providers and digital prescription portals.",
    solution:
      "Engineered an all-in-one cross-platform mobile suite featuring live doctor calendar synchronization, HIPAA-compliant HD video consultation, automated SMS reminders, and instant digital prescription delivery.",
    features: [
      "1-Click instant specialist search & video booking",
      "HIPAA-compliant WebRTC encrypted telehealth calls",
    ],
    result: "🌟 10,000+ Active Daily Patients",
    tags: ["React Native", "Firebase", "Node.js", "WebRTC", "GraphQL"],
  },
  {
    id: "sample-ecommerce",
    slug: "luxury-fashion-store",
    title: "Luxury E-Commerce 3D Experience",
    category: "Headless E-Commerce",
    client: "Aura Boutique Paris",
    image:
      "https://images.unsplash.com/photo-1441986300917-64674bd600d8?auto=format&fit=crop&q=85&w=1200",
    challenge:
      "An outdated monolithic shopping platform produced high cart drop-off rates on mobile devices and failed to project the brand's high-end luxury craftsmanship.",
    solution:
      "Developed a headless storefront powered by Next.js and Three.js 3D interactive product preview, AI-driven personal style recommendations, and optimized 1-click Apple Pay checkout integration.",
    features: [
      "Interactive 360° 3D garment visualization in browser",
      "Sub-second page rendering with Next.js edge caching",
    ],
    result: "📈 30% Higher Mobile Conversion Rate",
    tags: ["Next.js", "Tailwind CSS", "Shopify API", "Three.js", "Stripe"],
  },
  {
    id: "sample-logistics",
    slug: "logistics-dashboard",
    title: "Real-Time Fleet Command Center",
    category: "Enterprise Web App",
    client: "Swift Freight Systems",
    image:
      "https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?auto=format&fit=crop&q=85&w=1200",
    challenge:
      "Logistics dispatchers relied on disconnected legacy tracking systems, leading to unoptimized route planning, delayed driver assignments, and rising fuel expenditures.",
    solution:
      "Built a unified operations command dashboard featuring live GPS vehicle telemetry, AI dynamic route optimization algorithms, driver load assignment tools, and instant exception alerts.",
    features: [
      "Live GPS tracking for 500+ active delivery vehicles",
      "AI dynamic route recalculation reducing fuel waste",
    ],
    result: "🚀 40% Reduction in Route Transit Times",
    tags: ["React", "Mapbox GL", "Node.js", "PostgreSQL", "Redis"],
  },
  {
    id: "sample-fitness",
    slug: "fitness-tracker-app",
    title: "AI Fitness & Wearable Analytics",
    category: "Mobile App & IoT",
    client: "FitLife Technologies",
    image:
      "https://images.unsplash.com/photo-1594882645126-14020914d58d?auto=format&fit=crop&q=85&w=1200",
    challenge:
      "Fitness enthusiasts struggled to aggregate workout metrics across disparate smartwatches, heart rate monitors, and custom fitness equipment.",
    solution:
      "Created a high-energy mobile application with real-time Bluetooth smartwatch sync, biometric health data analytics, personalized AI workout coaching, and gamified community leaderboards.",
    features: [
      "Instant Bluetooth BLE sync across 20+ wearable devices",
      "Real-time biometric analytics & performance scoring",
    ],
    result: "⭐ 4.8/5 App Store Rating (50k+ Reviews)",
    tags: ["React Native", "GraphQL", "BleManager", "Tailwind CSS"],
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
  const [activeBlog, setActiveBlog] = useState(0);

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
        <StickyCard002
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
            result: cs.result,
            slug: cs.slug,
            tags: cs.tags || [cs.category || "Digital Product", "Case Study", "Engineering"],
          }))}
          badge="Selected Case Studies"
          title="Case Studies That Drive Growth"
          subtitle="Explore real client outcomes, engineering solutions, and digital products we built."
        />
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
