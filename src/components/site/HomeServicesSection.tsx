import { useEffect, useState } from "react";
import { collection, getDocs, limit, orderBy, query } from "firebase/firestore";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
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
    showAll ? services : services.slice(0, 5),
  );
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    let cancelled = false;
    async function fetchServices() {
      try {
        const snapshot = await getDocs(
          query(
            collection(db, "services"),
            orderBy("createdAt", "asc"),
            ...(showAll ? [] : [limit(5)]),
          ),
        );
        const data = snapshot.docs.map((doc) => doc.data() as FeaturedService);
        if (!cancelled && data.length > 0) {
          setFeaturedServices(data);
          setActiveIndex(0);
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

  const activeService = featuredServices[activeIndex];
  const activeFallbackImage =
    fallbackImages[activeIndex % fallbackImages.length];

  return (
    <section
      id="services"
      aria-label={hideHeader ? "Services" : undefined}
      aria-labelledby={hideHeader ? undefined : "home-services-heading"}
      className="bg-white px-5 py-16 font-sans text-[15px] dark:bg-neutral-950 sm:px-8 sm:py-24 lg:px-12 lg:py-28"
    >
      <div className="mx-auto max-w-[1280px]">
        {!hideHeader && (
          <>
            <motion.h2
              id="home-services-heading"
              initial={reduceMotion ? false : { opacity: 0, y: 18 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              className="text-center text-2xl font-bold tracking-tight text-neutral-900 dark:text-white sm:text-3xl md:text-4xl lg:text-5xl"
            >
              Our Services And Works
            </motion.h2>
            <p className="mx-auto mb-10 mt-4 max-w-2xl text-center text-sm leading-relaxed text-neutral-500 dark:text-neutral-400 sm:mb-12 sm:text-base">
              Thoughtful digital solutions designed to help your business stand
              out, scale faster, and create better customer experiences.
            </p>
          </>
        )}

        <div className="border-t border-neutral-200 dark:border-neutral-800">
          {featuredServices.map((service, index) => {
            const isActive = index === activeIndex;
            const fallbackImage = fallbackImages[index % fallbackImages.length];

            return (
              <Link
                key={service.slug}
                to={`/services/${service.slug}`}
                onMouseEnter={() => setActiveIndex(index)}
                onMouseLeave={() => setActiveIndex(-1)}
                onFocus={() => setActiveIndex(index)}
                onMouseMove={(event) => {
                  const bounds = event.currentTarget.getBoundingClientRect();
                  event.currentTarget.style.setProperty(
                    "--mouse-x",
                    `${event.clientX - bounds.left}px`,
                  );
                  event.currentTarget.style.setProperty(
                    "--mouse-y",
                    `${event.clientY - bounds.top}px`,
                  );
                }}
                className="group relative grid min-h-[124px] items-center border-b border-neutral-200 bg-white px-3 py-7 dark:border-neutral-800 dark:bg-neutral-950 sm:grid-cols-[1fr_1.45fr_72px] sm:px-5 lg:min-h-[132px] lg:grid-cols-[1fr_1.35fr_72px]"
              >
                <span
                  aria-hidden="true"
                  className="pointer-events-none absolute inset-0 z-0 bg-primary opacity-0 transition-[clip-path,opacity] duration-[1200ms] ease-out group-hover:opacity-100 [clip-path:circle(0%_at_var(--mouse-x,50%)_var(--mouse-y,50%))] group-hover:[clip-path:circle(150%_at_var(--mouse-x,50%)_var(--mouse-y,50%))]"
                />
                <span className="relative z-20 font-sans text-xl font-normal tracking-tight text-neutral-950 transition-colors duration-700 group-hover:text-white dark:text-white sm:text-2xl lg:text-[26px]">
                  {service.title}
                </span>
                <span
                  className={`relative z-20 mt-2 max-w-sm font-sans text-sm leading-snug transition-colors duration-700 sm:mt-0 ${isActive ? "max-w-[280px] text-neutral-500 group-hover:text-white/85 lg:max-w-[320px]" : "text-neutral-500 group-hover:text-white/85 dark:text-neutral-400"}`}
                >
                  {service.description}
                </span>
                {isActive && activeService && (
                  <AnimatePresence mode="wait">
                    <motion.span
                      key={activeService.slug}
                      initial={
                        reduceMotion ? false : { opacity: 0, scale: 0.92, y: 8 }
                      }
                      animate={{ opacity: 1, scale: 1, y: 0 }}
                      exit={
                        reduceMotion
                          ? undefined
                          : { opacity: 0, scale: 0.92, y: -8 }
                      }
                      transition={{ duration: 0.7, ease: "easeOut" }}
                      className="pointer-events-none absolute bottom-2 right-16 z-10 hidden h-48 w-72 rotate-[-4deg] overflow-hidden border-4 border-white bg-neutral-100 shadow-xl dark:border-neutral-800 sm:block lg:bottom-1 lg:right-20 lg:h-56 lg:w-84"
                    >
                      <img
                        src={activeService.thumbnailUrl || fallbackImage}
                        alt=""
                        loading="lazy"
                        decoding="async"
                        onError={(event) => {
                          if (
                            event.currentTarget.getAttribute("src") !==
                            activeFallbackImage
                          ) {
                            event.currentTarget.src = activeFallbackImage;
                          }
                        }}
                        className="h-full w-full object-cover"
                      />
                    </motion.span>
                  </AnimatePresence>
                )}
                <span className="relative z-20 mt-4 flex h-11 w-11 items-center justify-center justify-self-end rounded-full border border-neutral-200 text-neutral-500 transition-colors duration-700 group-hover:border-white group-hover:text-white sm:mt-0">
                  <ArrowUpRight
                    aria-hidden="true"
                    className="relative z-10 h-5 w-5"
                  />
                </span>
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
}
