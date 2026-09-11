import { useEffect, useState } from "react";
import { collection, getDocs, limit, orderBy, query } from "firebase/firestore";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
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

const fallbackImages = [
  "/adat_hero_ui.webp",
  "/adat_mobile_app.webp",
  "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&q=85&w=1000",
  "/Gemini_Generated_Image_721zvy721zvy721z.png",
  "/Gemini_Generated_Image_baghl8baghl8bagh.png",
];

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
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

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
      className="py-10 md:py-16 bg-white px-5 font-sans text-neutral-900 dark:bg-neutral-950 dark:text-white sm:px-8 lg:px-12"
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
              Services
            </motion.h2>
            <p className="mx-auto mt-4 max-w-2xl text-base sm:text-lg font-medium leading-relaxed text-neutral-600 dark:text-neutral-400">
              Thoughtful digital solutions designed to help your business stand out, scale faster, and deliver world-class digital experiences.
            </p>
          </div>
        )}

        <div className="divide-y divide-neutral-200 border-y border-neutral-200 dark:divide-neutral-800 dark:border-neutral-800">
          {featuredServices.map((service, index) => {
            const paddedIndex = String(index + 1).padStart(2, "0");
            const isHovered = hoveredIndex === index;
            const fallbackImage = fallbackImages[index % fallbackImages.length];

            return (
              <Link
                key={service.slug}
                to={`/services/${service.slug}`}
                onMouseEnter={() => setHoveredIndex(index)}
                onMouseLeave={() => setHoveredIndex(null)}
                onFocus={() => setHoveredIndex(index)}
                onBlur={() => setHoveredIndex(null)}
                className="group relative grid grid-cols-1 items-center gap-6 px-4 py-9 transition-all duration-300 hover:bg-slate-50/90 dark:hover:bg-neutral-900/60 md:grid-cols-12 md:px-6 lg:px-8 lg:py-11"
              >
                {/* Left: Number & Title (4 cols) */}
                <div className="flex items-center gap-5 md:col-span-5 lg:col-span-4">
                  <span className="font-mono text-base font-bold tracking-wider text-neutral-400 dark:text-neutral-500">
                    {paddedIndex}
                  </span>
                  <h3 className="text-2xl font-extrabold tracking-tight text-neutral-900 transition-all duration-300 group-hover:translate-x-2 group-hover:text-primary dark:text-white sm:text-3xl lg:text-4xl">
                    {service.title}
                  </h3>
                </div>

                {/* Middle: Rich Description (5 cols) */}
                <div className="md:col-span-5 lg:col-span-5">
                  <p className="text-base font-normal leading-relaxed text-neutral-600 transition-colors duration-300 group-hover:text-neutral-900 dark:text-neutral-400 dark:group-hover:text-neutral-200 sm:text-lg">
                    {service.description}
                  </p>
                </div>

                {/* Right: Modern Arrow Circle & Floating Image (3 cols) */}
                <div className="relative flex items-center justify-end md:col-span-2 lg:col-span-3">
                  {/* Floating Hover Image Preview - Safely located in dedicated right column */}
                  <AnimatePresence>
                    {isHovered && (
                      <motion.div
                        initial={reduceMotion ? false : { opacity: 0, scale: 0.88, y: 12, rotate: -2 }}
                        animate={{ opacity: 1, scale: 1, y: 0, rotate: -2 }}
                        exit={{ opacity: 0, scale: 0.88, y: 12, rotate: -2 }}
                        transition={{ duration: 0.25, ease: "easeOut" }}
                        className="pointer-events-none absolute right-16 top-1/2 z-30 hidden -translate-y-1/2 overflow-hidden rounded-2xl border-4 border-white bg-neutral-900 shadow-2xl dark:border-neutral-800 xl:block"
                        style={{ width: "280px", height: "175px" }}
                      >
                        <img
                          src={service.thumbnailUrl || fallbackImage}
                          alt={service.title}
                          loading="lazy"
                          className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent" />
                        <span className="absolute bottom-3 left-3 rounded-full bg-primary/95 px-3 py-1 text-[11px] font-extrabold uppercase tracking-wider text-white shadow-md">
                          {service.title}
                        </span>
                      </motion.div>
                    )}
                  </AnimatePresence>

                  <span className="flex h-14 w-14 items-center justify-center rounded-full border border-neutral-300 bg-white text-neutral-700 shadow-sm transition-all duration-300 group-hover:scale-110 group-hover:border-primary group-hover:bg-primary group-hover:text-white dark:border-neutral-700 dark:bg-neutral-900 dark:text-neutral-200">
                    <ArrowUpRight className="h-6 w-6 transition-transform duration-300 group-hover:rotate-45" />
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


