import { useEffect, useState } from "react";
import { collection, getDocs, limit, orderBy, query } from "firebase/firestore";
import { motion, useReducedMotion } from "framer-motion";
import { ArrowUpRight, Sparkles } from "lucide-react";
import { Link } from "react-router-dom";
import { db } from "@/lib/firebase";
import { services } from "@/data/services";

type FeaturedService = {
  slug: string;
  title: string;
  description: string;
  thumbnailUrl?: string;
};

export default function HomeServicesSection({
  showAll = false,
  hideHeader = false,
}: {
  showAll?: boolean;
  hideHeader?: boolean;
}) {
  const reduceMotion = useReducedMotion();
  const [featuredServices, setFeaturedServices] = useState<FeaturedService[]>(
    showAll ? services : services.slice(0, 5)
  );

  useEffect(() => {
    let cancelled = false;
    async function fetchServices() {
      try {
        const snapshot = await getDocs(
          query(
            collection(db, "services"),
            orderBy("createdAt", "asc"),
            ...(showAll ? [] : [limit(5)])
          )
        );
        const data = snapshot.docs.map((doc) => doc.data() as FeaturedService);
        if (!cancelled && data.length > 0) {
          setFeaturedServices(data);
        }
      } catch (error) {
        console.error("Error fetching featured services:", error);
      }
    }
    fetchServices();
    return () => {
      cancelled = true;
    };
  }, [showAll]);

  return (
    <section
      id="services"
      aria-label={hideHeader ? "Services" : undefined}
      aria-labelledby={hideHeader ? undefined : "home-services-heading"}
      className="bg-white px-5 py-14 font-sans text-neutral-900 dark:bg-neutral-950 dark:text-white sm:px-8 sm:py-20 lg:px-12 lg:py-24"
    >
      <div className="mx-auto max-w-[1280px]">
        {!hideHeader && (
          <div className="mb-12 text-center sm:mb-16">
            <div className="inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/10 px-4 py-1.5 text-xs font-extrabold uppercase tracking-widest text-primary shadow-xs">
              <Sparkles className="h-3.5 w-3.5" />
              Core Capabilities
            </div>
            <motion.h2
              id="home-services-heading"
              initial={reduceMotion ? false : { opacity: 0, y: 18 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              className="mt-4 text-3xl font-extrabold tracking-tight sm:text-4xl md:text-5xl lg:text-6xl text-neutral-900 dark:text-white"
            >
              Our Services & Core Works
            </motion.h2>
            <p className="mx-auto mt-4 max-w-2xl text-base sm:text-lg font-medium leading-relaxed text-neutral-600 dark:text-neutral-400">
              Thoughtful digital solutions designed to help your business stand out, scale faster, and deliver world-class digital experiences.
            </p>
          </div>
        )}

        <div className="divide-y divide-neutral-200 border-y border-neutral-200 dark:divide-neutral-800 dark:border-neutral-800">
          {featuredServices.map((service, index) => {
            const paddedIndex = String(index + 1).padStart(2, "0");

            return (
              <Link
                key={service.slug}
                to={`/services/${service.slug}`}
                className="group relative flex flex-col justify-between gap-6 px-4 py-8 transition-all duration-300 hover:bg-slate-50/80 dark:hover:bg-neutral-900/60 sm:flex-row sm:items-center sm:px-6 lg:px-8"
              >
                {/* Left: Number & Title */}
                <div className="flex items-center gap-6 sm:w-1/2 md:w-5/12">
                  <span className="text-sm sm:text-base font-bold text-neutral-400 dark:text-neutral-500 font-mono tracking-wider">
                    {paddedIndex}
                  </span>
                  <h3 className="text-xl sm:text-2xl lg:text-3xl font-extrabold tracking-tight text-neutral-900 dark:text-white transition-all duration-300 group-hover:text-primary group-hover:translate-x-1.5">
                    {service.title}
                  </h3>
                </div>

                {/* Middle: Rich Description */}
                <div className="sm:w-1/2 md:w-5/12">
                  <p className="text-sm sm:text-base font-normal leading-relaxed text-neutral-600 dark:text-neutral-400 transition-colors duration-300 group-hover:text-neutral-900 dark:group-hover:text-neutral-200">
                    {service.description}
                  </p>
                </div>

                {/* Right: Modern Arrow Circle */}
                <div className="flex shrink-0 items-center justify-end">
                  <span className="flex h-12 w-12 items-center justify-center rounded-full border border-neutral-300 dark:border-neutral-700 bg-white dark:bg-neutral-900 text-neutral-700 dark:text-neutral-200 shadow-sm transition-all duration-300 group-hover:border-primary group-hover:bg-primary group-hover:text-white group-hover:scale-110">
                    <ArrowUpRight className="h-5 w-5 transition-transform duration-300 group-hover:rotate-45" />
                  </span>
                </div>
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
}

