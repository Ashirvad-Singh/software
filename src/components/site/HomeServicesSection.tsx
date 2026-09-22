import { useState } from "react";
import { useReducedMotion } from "framer-motion";
import { ArrowUpRight, Sparkles } from "lucide-react";
import { Link } from "react-router-dom";
import { useCatalog } from "@/lib/content/useCatalog";
import CatalogState from "@/components/content/CatalogState";
import { motion } from "framer-motion";

const fallbackImages = [
  "/service_web.png",
  "/service_mobile.png",
  "/service_ecommerce.png",
  "/service_uiux.png",
];

export default function HomeServicesSection({
  showAll = false,
  hideHeader = false,
}: {
  showAll?: boolean;
  hideHeader?: boolean;
}) {
  const reduceMotion = useReducedMotion();
  const { entries, loading, error, retry } = useCatalog("services");
  const featuredServices = showAll ? entries : entries.slice(0, 6);
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  return (
    <section
      id="services"
      aria-label={hideHeader ? "Services" : undefined}
      aria-labelledby={hideHeader ? undefined : "home-services-heading"}
      className="py-10 md:py-16 bg-white px-5 font-sans text-neutral-900 dark:bg-neutral-950 dark:text-white sm:px-8 lg:px-12"
    >
      <div className="mx-auto max-w-[1280px]">
        {!hideHeader && (
          <div className="mb-8 text-center lg:text-left lg:mb-10">
            <div className="inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/10 px-3 py-1 text-[11px] font-extrabold uppercase tracking-widest text-primary shadow-sm mb-3">
              <Sparkles className="h-3 w-3" />
              Core Capabilities
            </div>
            <motion.h2
              id="home-services-heading"
              initial={reduceMotion ? false : { opacity: 0, y: 18 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight text-neutral-900 dark:text-white leading-[1.15]"
            >
              Services we <br className="hidden lg:block" />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-sky-400">specialize in</span>
            </motion.h2>
            <p className="mt-2.5 max-w-xl text-xs sm:text-sm font-medium text-neutral-600 dark:text-neutral-400 leading-relaxed mx-auto lg:mx-0">
              Thoughtful digital solutions designed to help your business stand out, scale faster, and deliver world-class digital experiences.
            </p>
          </div>
        )}

        <CatalogState loading={loading} error={error} empty={!entries.length} label="services" retry={retry} />
        
        {featuredServices.length > 0 && (
          <div className="relative flex flex-col lg:flex-row gap-6 lg:gap-10 items-start">
            
            {/* Left Side: Services List */}
            <div className="flex-1 w-full lg:w-[55%] xl:w-[60%] flex flex-col">
              {featuredServices.map((service, index) => {
                const paddedIndex = String(index + 1).padStart(2, "0");

                return (
                  <Link
                    key={service.slug}
                    to={`/services/${service.slug}`}
                    onMouseEnter={() => setHoveredIndex(index)}
                    onMouseLeave={() => setHoveredIndex(null)}
                    onFocus={() => setHoveredIndex(index)}
                    onBlur={() => setHoveredIndex(null)}
                    className="group flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 py-5 sm:py-6 border-t border-neutral-200 dark:border-neutral-800 first:border-t-0 transition-colors duration-300 hover:bg-neutral-50 dark:hover:bg-neutral-900/40 -mx-3 px-3 sm:mx-0 sm:px-4 rounded-2xl"
                  >
                    <div className="flex-1 space-y-2">
                      <div className="flex items-center gap-3 md:gap-4">
                        <span className="font-mono text-xs md:text-sm font-bold text-neutral-400 dark:text-neutral-600 group-hover:text-primary dark:group-hover:text-primary transition-colors duration-300">
                          {paddedIndex}
                        </span>
                        <h3 className="text-lg sm:text-xl md:text-2xl font-bold tracking-tight text-neutral-900 dark:text-white group-hover:text-primary transition-colors duration-300">
                          {service.title}
                        </h3>
                      </div>
                      <p className="text-xs sm:text-sm text-neutral-600 dark:text-neutral-400 pl-[2rem] md:pl-[2.5rem] max-w-lg group-hover:text-neutral-900 dark:group-hover:text-neutral-200 transition-colors duration-300 leading-relaxed">
                        {service.description}
                      </p>
                    </div>
                    
                    <span className="flex h-10 w-10 sm:h-11 sm:w-11 shrink-0 items-center justify-center rounded-full border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-950 text-neutral-900 dark:text-white transition-all duration-300 group-hover:scale-105 group-hover:border-primary group-hover:bg-primary group-hover:text-white sm:ml-4 shadow-xs">
                      <ArrowUpRight className="h-4 w-4 sm:h-5 sm:w-5 transition-transform duration-300 group-hover:rotate-45" />
                    </span>
                  </Link>
                );
              })}
            </div>

            {/* Right Side: Sticky Image Preview (Desktop Only) */}
            <div className="hidden lg:block lg:w-[45%] xl:w-[40%] sticky top-28 h-[440px] lg:h-[480px] rounded-2xl overflow-hidden bg-neutral-100 dark:bg-neutral-900 shadow-xl">
              {featuredServices.map((service, index) => {
                const isActive = hoveredIndex === null ? index === 0 : hoveredIndex === index;
                const fallbackImage = fallbackImages[index % fallbackImages.length];
                
                return (
                  <div 
                    key={service.slug}
                    className={`absolute inset-0 transition-opacity duration-500 ease-in-out ${isActive ? 'opacity-100 z-10' : 'opacity-0 z-0 pointer-events-none'}`}
                  >
                    <img 
                      src={service.thumbnailUrl || fallbackImage}
                      alt={service.title}
                      loading="lazy"
                      className="w-full h-full object-cover transition-transform duration-1000 ease-out"
                      style={{ transform: isActive ? 'scale(1)' : 'scale(1.05)' }}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-transparent" />
                    
                    <div 
                      className="absolute bottom-6 left-6 right-6 backdrop-blur-xl bg-white/95 dark:bg-neutral-900/95 p-4 rounded-xl shadow-lg transition-all duration-500 ease-out border border-white/20 dark:border-neutral-800/50"
                      style={{ 
                        transform: isActive ? 'translateY(0)' : 'translateY(15px)',
                        opacity: isActive ? 1 : 0
                      }}
                    >
                       <h4 className="font-bold text-neutral-900 dark:text-white text-base mb-1">{service.title}</h4>
                       <span className="text-primary font-bold text-[10px] uppercase tracking-wider flex items-center gap-1">
                         Discover Service
                       </span>
                    </div>
                  </div>
                )
              })}
            </div>

          </div>
        )}
      </div>
    </section>
  );
}

