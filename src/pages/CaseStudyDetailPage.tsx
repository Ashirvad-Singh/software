import { useEffect, useState } from "react";
import { collection, getDocs, query, where } from "firebase/firestore";
import { ArrowLeft, ArrowUpRight, Loader2 } from "lucide-react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { motion } from "framer-motion";
import { db } from "@/lib/firebase";
import SEO from "@/components/site/SEO";

type CaseStudy = {
  slug: string;
  title: string;
  category?: string;
  image: string;
  tags?: string | string[];
  client?: string;
  timeline?: string;
  result?: string;
  challenge?: string;
  solution?: string;
  gallery?: string | string[];
  videoUrl?: string;
  testimonial?: string;
  testimonialAuthor?: string;
  metrics?: string;
};

function listValue(value?: string | string[]) {
  return Array.isArray(value)
    ? value
    : typeof value === "string"
      ? value
          .split(/[\n,]/)
          .map((item) => item.trim())
          .filter(Boolean)
      : [];
}

const sampleCaseStudies: CaseStudy[] = [
  {
    slug: "global-fintech-platform",
    title: "Global FinTech Platform",
    category: "Web",
    image:
      "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&q=85&w=1200",
    tags: ["React", "Node.js", "PostgreSQL"],
    client: "FinServe Global",
    timeline: "6 Months",
    result: "Increased transaction volume by 150%",
    challenge:
      "A secure, scalable financial platform was needed to handle thousands of concurrent transactions without latency.",
    solution:
      "We created a real-time dashboard with robust architecture, clear workflows, and performance-focused engineering.",
  },
  {
    slug: "healthcare-booking-app",
    title: "Healthcare Booking App",
    category: "Mobile App",
    image:
      "https://images.unsplash.com/photo-1576091160550-2173dba999ef?auto=format&fit=crop&q=85&w=1200",
    tags: ["Flutter", "Firebase"],
    client: "MediCare Plus",
    timeline: "4 Months",
    result: "10k+ active daily users",
    challenge:
      "Patients needed a faster and simpler way to discover doctors and book appointments.",
    solution:
      "A cross-platform mobile experience with live availability, notifications, and a frictionless booking flow.",
  },
  {
    slug: "luxury-fashion-store",
    title: "Luxury Fashion Store",
    category: "E-commerce",
    image:
      "https://images.unsplash.com/photo-1441986300917-64674bd600d8?auto=format&fit=crop&q=85&w=1200",
    tags: ["Shopify", "Tailwind CSS"],
    client: "Aura Boutique",
    timeline: "3 Months",
    result: "30% higher conversion rate",
    challenge:
      "An outdated online store was slowing purchases and failing to reflect the premium brand.",
    solution:
      "A polished storefront with high-quality visuals, fast browsing, and a smoother checkout journey.",
  },
  {
    slug: "logistics-dashboard",
    title: "Logistics Dashboard",
    category: "Web App",
    image:
      "https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?auto=format&fit=crop&q=85&w=1200",
    tags: ["Vue.js", "Express"],
    client: "Swift Logistics",
    timeline: "5 Months",
    result: "Optimized route planning",
    challenge:
      "Dispatchers needed a clearer view of vehicles, routes, and delivery progress.",
    solution:
      "A live operations dashboard bringing tracking, assignments, and route planning into one place.",
  },
  {
    slug: "fitness-tracker-app",
    title: "Fitness Tracker App",
    category: "Mobile App",
    image:
      "https://images.unsplash.com/photo-1594882645126-14020914d58d?auto=format&fit=crop&q=85&w=1200",
    tags: ["React Native", "Redux"],
    client: "FitLife",
    timeline: "6 Months",
    result: "4.8/5 App Store rating",
    challenge:
      "Users wanted meaningful workout insights across multiple wearable devices.",
    solution:
      "A motivating fitness experience with synced health data, progress analytics, and gamified goals.",
  },
];

export default function CaseStudyDetailPage() {
  const { slug } = useParams<{ slug: string }>();
  const navigate = useNavigate();
  const [caseStudy, setCaseStudy] = useState<CaseStudy | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!slug) return;
    getDocs(query(collection(db, "case_studies"), where("slug", "==", slug)))
      .then((snapshot) =>
        setCaseStudy(
          snapshot.empty
            ? sampleCaseStudies.find((item) => item.slug === slug) || null
            : (snapshot.docs[0].data() as CaseStudy),
        ),
      )
      .catch((error) => {
        console.error("Error fetching case study:", error);
        setCaseStudy(
          sampleCaseStudies.find((item) => item.slug === slug) || null,
        );
      })
      .finally(() => setLoading(false));
  }, [slug]);

  if (loading)
    return (
      <main className="flex min-h-screen items-center justify-center bg-background">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </main>
    );
  if (!caseStudy)
    return (
      <main className="flex min-h-screen flex-col items-center justify-center bg-background px-5 text-center">
        <h1 className="text-3xl font-bold">Case study not found</h1>
        <button
          onClick={() => navigate("/case-studies")}
          className="mt-6 rounded-full bg-primary px-5 py-2.5 text-sm font-semibold text-primary-foreground"
        >
          Back to case studies
        </button>
      </main>
    );

  const gallery = listValue(caseStudy.gallery);
  const tags = listValue(caseStudy.tags);
  const metrics =
    typeof caseStudy.metrics === "string"
      ? caseStudy.metrics
          .split("\n")
          .map((metric) => {
            const [value, ...label] = metric.split("|");
            return { value: value?.trim(), label: label.join("|").trim() };
          })
          .filter((metric) => metric.value && metric.label)
      : [];

  return (
    <main className="min-h-screen bg-background pb-24 pt-32 font-sans text-foreground sm:pt-40">
      <SEO
        title={`${caseStudy.title} | Case Studies`}
        description={
          caseStudy.challenge || `Read the ${caseStudy.title} case study.`
        }
        keywords={`${caseStudy.title}, Adat case study`}
      />
      <div className="mx-auto max-w-6xl px-5 sm:px-8">
        <Link
          to="/case-studies"
          className="inline-flex items-center gap-2 text-sm text-muted-foreground transition-colors hover:text-primary"
        >
          <ArrowLeft className="h-4 w-4" /> All case studies
        </Link>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mt-10"
        >
          <div className="flex flex-wrap gap-2 text-xs font-semibold uppercase tracking-wider text-primary">
            {caseStudy.category && <span>{caseStudy.category}</span>}
            {tags.map((tag) => (
              <span
                key={tag}
                className="rounded-full bg-secondary px-3 py-1 text-secondary-foreground"
              >
                {tag}
              </span>
            ))}
          </div>
          <h1 className="mt-5 max-w-4xl text-4xl font-bold tracking-tight sm:text-6xl">
            {caseStudy.title}
          </h1>
          <div className="mt-10 aspect-video overflow-hidden rounded-2xl border border-border bg-muted shadow-xl">
            {caseStudy.videoUrl ? (
              <video
                src={caseStudy.videoUrl}
                controls
                autoPlay
                muted
                loop
                playsInline
                className="h-full w-full object-cover"
              />
            ) : (
              <img
                src={caseStudy.image}
                alt={caseStudy.title}
                className="h-full w-full object-cover"
              />
            )}
          </div>
          <div className="mt-12 grid gap-10 lg:grid-cols-[1fr_280px]">
            <div className="space-y-10">
              <section>
                <h2 className="text-2xl font-bold">The challenge</h2>
                <p className="mt-4 text-lg leading-relaxed text-muted-foreground">
                  {caseStudy.challenge ||
                    "A focused business challenge solved through thoughtful product strategy."}
                </p>
              </section>
              <section>
                <h2 className="text-2xl font-bold">The solution</h2>
                <p className="mt-4 text-lg leading-relaxed text-muted-foreground">
                  {caseStudy.solution ||
                    "A custom digital experience designed around the client, users, and goals."}
                </p>
              </section>
            </div>
            <aside className="h-fit space-y-6 rounded-2xl border border-border bg-secondary/30 p-6">
              <div>
                <p className="text-xs uppercase tracking-wider text-muted-foreground">
                  Client
                </p>
                <p className="mt-1 font-semibold">
                  {caseStudy.client || "Adat Client"}
                </p>
              </div>
              <div>
                <p className="text-xs uppercase tracking-wider text-muted-foreground">
                  Timeline
                </p>
                <p className="mt-1 font-semibold">
                  {caseStudy.timeline || "Project delivery"}
                </p>
              </div>
              {caseStudy.result && (
                <div>
                  <p className="text-xs uppercase tracking-wider text-muted-foreground">
                    Result
                  </p>
                  <p className="mt-1 font-semibold text-primary">
                    {caseStudy.result}
                  </p>
                </div>
              )}
            </aside>
          </div>
          {metrics.length > 0 && (
            <div className="grid gap-4 sm:grid-cols-3">
              {metrics.map((metric) => (
                <div
                  key={`${metric.value}-${metric.label}`}
                  className="rounded-2xl border border-border bg-card p-6"
                >
                  <p className="text-3xl font-bold">{metric.value}</p>
                  <p className="mt-2 text-sm text-muted-foreground">
                    {metric.label}
                  </p>
                </div>
              ))}
            </div>
          )}
          {gallery.length > 0 && (
            <section>
              <h2 className="text-2xl font-bold">Project gallery</h2>
              <div className="mt-6 grid gap-5 sm:grid-cols-2">
                {gallery.map((image, index) => (
                  <img
                    key={`${image}-${index}`}
                    src={image}
                    alt={`${caseStudy.title} gallery ${index + 1}`}
                    className="aspect-[4/3] w-full rounded-xl border border-border object-cover"
                  />
                ))}
              </div>
            </section>
          )}
          {caseStudy.testimonial && (
            <blockquote className="border-l-4 border-primary pl-6">
              <p className="text-2xl font-medium leading-tight">
                “{caseStudy.testimonial}”
              </p>
              {caseStudy.testimonialAuthor && (
                <cite className="mt-3 block text-sm not-italic text-muted-foreground">
                  {caseStudy.testimonialAuthor}
                </cite>
              )}
            </blockquote>
          )}
          <Link
            to="/contact"
            className="inline-flex items-center gap-2 rounded-full bg-primary px-5 py-3 text-sm font-semibold text-primary-foreground"
          >
            Start a similar project <ArrowUpRight className="h-4 w-4" />
          </Link>
        </motion.div>
      </div>
    </main>
  );
}
