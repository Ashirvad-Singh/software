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
    title: "Global FinTech & Trading Platform",
    category: "Web Engineering",
    image:
      "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&q=85&w=1200",
    tags: ["React", "Node.js", "PostgreSQL", "Redis"],
    client: "FinServe Global Capital",
    timeline: "6 Months",
    result: "150% Increase in Daily Transaction Volume",
    challenge:
      "FinServe Global needed to modernize their core trading dashboard to handle over 50,000 sub-millisecond transactions per minute while adhering to strict FINRA compliance, multi-factor security, and automated fraud prevention.",
    solution:
      "We engineered a distributed microservices ecosystem utilizing Node.js, Redis pub/sub caching, and PostgreSQL database sharding. The frontend dashboard was built using React with virtualized data grids and WebSockets for real-time price feeds.",
    metrics: "50k+/min|Real-time Transactions\n99.99%|System Availability SLA\n150%|Daily Trading Volume Growth",
    gallery: [
      "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&q=85&w=1200",
      "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&q=85&w=1200",
      "https://images.unsplash.com/photo-1590283603385-17ffb3a7f29f?auto=format&fit=crop&q=85&w=1200",
    ],
    testimonial:
      "Adat Soft Solutions delivered an architecture that transformed our core business. Their deep technical expertise in real-time systems and financial security is world-class.",
    testimonialAuthor: "Marcus Vance — CTO, FinServe Global",
  },
  {
    slug: "healthcare-booking-app",
    title: "Telehealth & Doctor Appointment Ecosystem",
    category: "Mobile App",
    image:
      "https://images.unsplash.com/photo-1576091160550-2173dba999ef?auto=format&fit=crop&q=85&w=1200",
    tags: ["Flutter", "Firebase", "WebRTC"],
    client: "MediCare Plus Network",
    timeline: "4 Months",
    result: "10,000+ Active Daily Teleconsultations",
    challenge:
      "MediCare Plus required a HIPAA-compliant cross-platform mobile app allowing patients to schedule emergency appointments, access encrypted lab results, and conduct HD video consultations with specialist doctors without lag.",
    solution:
      "Using Flutter, we built a single codebase iOS and Android app integrated with WebRTC for zero-latency peer-to-peer video streaming. We built a secure Node.js backend with automated push notifications and calendar sync.",
    metrics: "10,000+|Daily Teleconsultations\n4.9 / 5.0|App Store Rating\n< 2 Sec|Average Booking Speed",
    gallery: [
      "https://images.unsplash.com/photo-1576091160550-2173dba999ef?auto=format&fit=crop&q=85&w=1200",
      "https://images.unsplash.com/photo-1581056771107-24ca5f033842?auto=format&fit=crop&q=85&w=1200",
      "https://images.unsplash.com/photo-1532938911079-1b06ac7ceec7?auto=format&fit=crop&q=85&w=1200",
    ],
    testimonial:
      "The mobile app built by Adat Soft Solutions scaled seamlessly overnight during peak patient demand. Their attention to UX and security is remarkable.",
    testimonialAuthor: "Dr. Elena Rostova — Medical Director, MediCare Plus",
  },
  {
    slug: "luxury-fashion-store",
    title: "Luxury E-Commerce & Headless Storefront",
    category: "E-commerce",
    image:
      "https://images.unsplash.com/photo-1441986300917-64674bd600d8?auto=format&fit=crop&q=85&w=1200",
    tags: ["Shopify Plus", "Next.js", "Tailwind CSS"],
    client: "Aura Luxury Boutique",
    timeline: "3 Months",
    result: "30% Higher Mobile Conversion Rate",
    challenge:
      "Aura Boutique faced high bounce rates on their traditional monolith storefront due to slow page load speeds (4.5s) and clunky mobile checkout flows.",
    solution:
      "We engineered a Headless E-Commerce storefront utilizing Next.js, Shopify GraphQL APIs, and Tailwind CSS. We implemented instant sub-second page transitions, 3D product previews, and localized multi-currency checkout.",
    metrics: "0.8 Sec|Page Load Speed\n+30%|Conversion Rate Growth\n45%|Cart Abandonment Reduction",
    gallery: [
      "https://images.unsplash.com/photo-1441986300917-64674bd600d8?auto=format&fit=crop&q=85&w=1200",
      "https://images.unsplash.com/photo-1472851294608-062f824d29cc?auto=format&fit=crop&q=85&w=1200",
      "https://images.unsplash.com/photo-1445205170230-053b83016050?auto=format&fit=crop&q=85&w=1200",
    ],
    testimonial:
      "Our website transformed from a standard online shop into an immersive brand experience. Sales jumped 30% within the first month of launch!",
    testimonialAuthor: "Sophia Laurent — Brand Director, Aura Boutique",
  },
  {
    slug: "logistics-dashboard",
    title: "AI Logistics & Fleet Operations Center",
    category: "Web App",
    image:
      "https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?auto=format&fit=crop&q=85&w=1200",
    tags: ["React", "Python", "Mapbox GL"],
    client: "Swift Express Logistics",
    timeline: "5 Months",
    result: "25% Savings in Fuel & Transit Time",
    challenge:
      "Swift Logistics operated 1,200 delivery trucks across 14 hubs with manual dispatching spreadsheets, leading to delayed shipments and route inefficiencies.",
    solution:
      "We built a real-time Fleet Management Command Center featuring Mapbox GL live GPS tracking, automated dynamic route optimization using Python OR-Tools, and automated SMS alerts.",
    metrics: "1,200+|Vehicles Tracked\n25%|Fuel Cost Reduction\n98.4%|On-Time Delivery Rate",
    gallery: [
      "https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?auto=format&fit=crop&q=85&w=1200",
      "https://images.unsplash.com/photo-1578575437130-527eed3abbec?auto=format&fit=crop&q=85&w=1200",
    ],
  },
  {
    slug: "fitness-tracker-app",
    title: "AI Powered Fitness & Nutrition Tracker",
    category: "Mobile App",
    image:
      "https://images.unsplash.com/photo-1594882645126-14020914d58d?auto=format&fit=crop&q=85&w=1200",
    tags: ["React Native", "Apple HealthKit", "TensorFlow"],
    client: "FitPulse Interactive",
    timeline: "6 Months",
    result: "500,000+ Downloads & 4.8 Rating",
    challenge:
      "FitPulse wanted a mobile app capable of analyzing meal photos using on-device computer vision to estimate macros instantly, while syncing continuous heart rate data from Apple Watch.",
    solution:
      "We created a React Native app with embedded TensorFlow Lite models for instant food photo recognition. We integrated Apple HealthKit and Google Health Connect APIs for background biometric data syncing.",
    metrics: "500k+|Mobile Installs\n4.8 ★|App Store Rating\n94%|Food Photo Recognition",
    gallery: [
      "https://images.unsplash.com/photo-1594882645126-14020914d58d?auto=format&fit=crop&q=85&w=1200",
      "https://images.unsplash.com/photo-1517838277536-f5f99be501cd?auto=format&fit=crop&q=85&w=1200",
    ],
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
    <main className="min-h-screen bg-background pb-10 md:pb-16 pt-32 font-sans text-foreground sm:pt-40">
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
