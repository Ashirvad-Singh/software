import { useEffect, useState } from "react";
import { collection, getDocs, orderBy, query } from "firebase/firestore";
import { ArrowUpRight, Loader2 } from "lucide-react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { db } from "@/lib/firebase";
import SEO from "@/components/site/SEO";
import SubBanner from "@/components/site/SubBanner";

type CaseStudy = {
  id: string;
  slug: string;
  title: string;
  category?: string;
  image: string;
  description?: string;
  challenge?: string;
  result?: string;
  client?: string;
};

const sampleCaseStudies: CaseStudy[] = [
  {
    id: "sample-fintech",
    slug: "global-fintech-platform",
    title: "Global FinTech Platform",
    category: "Web",
    image:
      "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&q=85&w=1200",
    challenge:
      "A secure, scalable financial platform designed for real-time transactions.",
    result: "Increased transaction volume by 150%",
  },
  {
    id: "sample-healthcare",
    slug: "healthcare-booking-app",
    title: "Healthcare Booking App",
    category: "Mobile App",
    image:
      "https://images.unsplash.com/photo-1576091160550-2173dba999ef?auto=format&fit=crop&q=85&w=1200",
    challenge:
      "A faster and simpler way for patients to discover doctors and book appointments.",
    result: "10k+ active daily users",
  },
  {
    id: "sample-ecommerce",
    slug: "luxury-fashion-store",
    title: "Luxury Fashion Store",
    category: "E-commerce",
    image:
      "https://images.unsplash.com/photo-1441986300917-64674bd600d8?auto=format&fit=crop&q=85&w=1200",
    challenge:
      "A polished storefront designed to make premium shopping feel effortless.",
    result: "30% higher conversion rate",
  },
  {
    id: "sample-logistics",
    slug: "logistics-dashboard",
    title: "Logistics Dashboard",
    category: "Web App",
    image:
      "https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?auto=format&fit=crop&q=85&w=1200",
    challenge:
      "A live operations dashboard for clearer routes and delivery progress.",
    result: "Optimized route planning",
  },
  {
    id: "sample-fitness",
    slug: "fitness-tracker-app",
    title: "Fitness Tracker App",
    category: "Mobile App",
    image:
      "https://images.unsplash.com/photo-1594882645126-14020914d58d?auto=format&fit=crop&q=85&w=1200",
    challenge:
      "A motivating experience with synced health data and progress analytics.",
    result: "4.8/5 App Store rating",
  },
];

export default function CaseStudiesPage() {
  const [caseStudies, setCaseStudies] =
    useState<CaseStudy[]>(sampleCaseStudies);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getDocs(query(collection(db, "case_studies"), orderBy("createdAt", "desc")))
      .then((snapshot) =>
        snapshot.empty
          ? sampleCaseStudies
          : (snapshot.docs.map((doc) => ({
              id: doc.id,
              ...doc.data(),
            })) as CaseStudy[]),
      )
      .catch((error) => {
        console.error("Error fetching case studies:", error);
        setCaseStudies(sampleCaseStudies);
      })
      .finally(() => setLoading(false));
  }, []);

  return (
    <main className="min-h-screen bg-background pb-10 md:pb-16 font-sans text-foreground">
      <SEO
        title="Case Studies | Adat Soft Solutions"
        description="Explore Adat Soft Solutions case studies, outcomes, and digital product work."
        keywords="Adat case studies, digital product case studies"
      />
      <SubBanner
        badge="Case Studies"
        title="Our"
        highlightTitle="Case Studies"
        subtitle="A closer look at the problems we solved, the products we built, and the outcomes our clients achieved."
      />
      <div className="mx-auto max-w-7xl px-5 pt-4 sm:px-8 md:pt-8 lg:px-12">
        {loading ? (
          <div className="flex h-64 items-center justify-center">
            <Loader2 className="h-8 w-8 animate-spin text-primary" />
          </div>
        ) : caseStudies.length === 0 ? (
          <div className="border-t border-border py-16 text-muted-foreground">
            Case studies will appear here once they are published from the
            dashboard.
          </div>
        ) : (
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {caseStudies.map((caseStudy, index) => (
              <motion.div
                key={caseStudy.id || caseStudy.slug}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.06 }}
              >
                <Link
                  to={`/case-studies/${caseStudy.slug}`}
                  className="group block overflow-hidden rounded-2xl border border-border bg-card shadow-sm transition-all duration-500 hover:-translate-y-1 hover:shadow-xl"
                >
                  <div className="aspect-[4/3] overflow-hidden bg-muted">
                    <img
                      src={caseStudy.image}
                      alt={caseStudy.title}
                      className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                    />
                  </div>
                  <div className="p-5 sm:p-6">
                    <div className="flex items-center justify-between gap-3 text-xs font-semibold uppercase tracking-wider text-primary">
                      <span>{caseStudy.category || "Digital Product"}</span>
                      <ArrowUpRight className="h-4 w-4 transition-transform group-hover:-translate-y-1 group-hover:translate-x-1" />
                    </div>
                    <h2 className="mt-4 text-2xl font-bold tracking-tight group-hover:text-primary">
                      {caseStudy.title}
                    </h2>
                    <p className="mt-3 line-clamp-3 text-sm leading-relaxed text-muted-foreground">
                      {caseStudy.challenge ||
                        caseStudy.description ||
                        "Explore this project case study."}
                    </p>
                    {caseStudy.result && (
                      <p className="mt-5 text-sm font-semibold text-primary">
                        {caseStudy.result}
                      </p>
                    )}
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </main>
  );
}
