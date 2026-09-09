import { useEffect, useState } from "react";
import { collection, getDocs, orderBy, query } from "firebase/firestore";
import * as LucideIcons from "lucide-react";
import * as TablerIcons from "@tabler/icons-react";
import { motion } from "framer-motion";
import SubBanner from "@/components/site/SubBanner";
import { FloatingShapes } from "@/components/ui/floating-shapes";
import { db } from "@/lib/firebase";

interface Technology {
  name: string;
  iconUrl: string;
}

interface TechCategory {
  id?: string;
  title: string;
  description: string;
  categoryIcon: string;
  themeColor: string;
  technologies?: Technology[];
}

const themeColors: Record<
  string,
  { bg: string; text: string; hoverText: string }
> = {
  blue: {
    bg: "from-blue-50",
    text: "text-blue-500",
    hoverText: "group-hover:text-blue-500",
  },
  purple: {
    bg: "from-purple-50",
    text: "text-purple-500",
    hoverText: "group-hover:text-purple-500",
  },
  orange: {
    bg: "from-orange-50",
    text: "text-orange-500",
    hoverText: "group-hover:text-orange-500",
  },
  green: {
    bg: "from-green-50",
    text: "text-green-500",
    hoverText: "group-hover:text-green-500",
  },
  gray: {
    bg: "from-gray-50",
    text: "text-gray-500",
    hoverText: "group-hover:text-gray-500",
  },
};

function TechnologyBadge({
  technology,
  hoverText,
}: {
  technology: Technology;
  hoverText: string;
}) {
  const isImage =
    technology.iconUrl?.startsWith("http") ||
    technology.iconUrl?.startsWith("data:");
  const IconComponent = !isImage
    ? (TablerIcons as any)[technology.iconUrl] || TablerIcons.IconCode
    : null;

  return (
    <div className="group flex min-w-0 flex-col items-center justify-center gap-2 rounded-xl border border-neutral-100 bg-neutral-50/50 p-4 transition-all duration-300 hover:border-primary/30 hover:bg-white hover:shadow-sm">
      {isImage ? (
        <img
          src={technology.iconUrl}
          alt={technology.name}
          className="h-8 w-8 object-contain transition-transform duration-300 group-hover:scale-110"
        />
      ) : (
        <IconComponent
          className={`h-8 w-8 text-neutral-400 transition-colors duration-300 ${hoverText} group-hover:scale-110`}
          stroke={1.5}
        />
      )}
      <span className="max-w-full break-words text-center text-[11px] font-medium uppercase tracking-wider text-neutral-500 transition-colors group-hover:text-neutral-900">
        {technology.name}
      </span>
    </div>
  );
}

export default function TechnologiesPage() {
  const [techCategories, setTechCategories] = useState<TechCategory[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTechStack = async () => {
      try {
        const techQuery = query(
          collection(db, "tech_stack"),
          orderBy("createdAt", "asc"),
        );
        const snapshot = await getDocs(techQuery);
        setTechCategories(
          snapshot.docs.map((document) => ({
            id: document.id,
            ...document.data(),
          })) as TechCategory[],
        );
      } catch (error) {
        console.error("Error fetching tech stack:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchTechStack();
  }, []);

  return (
    <main className="min-h-[80vh] bg-white pb-16 dark:bg-neutral-950">
      <SubBanner
        badge="Our Expertise"
        title="Technology"
        highlightTitle="Stack"
        subtitle="The tools and frameworks we use to build scalable, future-ready digital products."
      />

      <section className="relative overflow-hidden border-t border-neutral-100 py-12 sm:py-16 md:py-20 lg:py-28">
        <div
          className="pointer-events-none absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage: "radial-gradient(#000 1px, transparent 1px)",
            backgroundSize: "24px 24px",
          }}
        />
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-blue-50/50 via-white to-white" />
        <FloatingShapes />

        <div className="container relative z-10 mx-auto max-w-7xl px-4">
          {loading ? (
            <div className="py-20 text-center text-neutral-500">
              Loading our technology stack...
            </div>
          ) : techCategories.length === 0 ? (
            <div className="py-20 text-center text-neutral-500">
              No technology categories have been added yet.
            </div>
          ) : (
            <div className="grid grid-cols-1 gap-6 md:grid-cols-2 md:gap-8">
              {techCategories.map((category, index) => {
                const theme =
                  themeColors[category.themeColor] || themeColors.gray;
                const CategoryIcon =
                  (LucideIcons as any)[category.categoryIcon] ||
                  LucideIcons.Code;

                return (
                  <motion.article
                    key={category.id || index}
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-100px" }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                    className="group relative overflow-hidden rounded-[2rem] border border-neutral-200 bg-white p-5 shadow-sm transition-all duration-300 hover:border-primary/20 hover:shadow-xl sm:p-6 md:p-6 xl:p-10"
                  >
                    <div
                      className={`absolute inset-0 bg-gradient-to-br ${theme.bg} to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100`}
                    />
                    <div className="relative z-10">
                      <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-2xl border border-neutral-100 bg-neutral-50 transition-all group-hover:bg-white group-hover:shadow-sm md:mb-8 md:h-14 md:w-14">
                        <CategoryIcon className={`h-7 w-7 ${theme.text}`} />
                      </div>
                      <h2 className="mb-2 text-lg font-bold text-neutral-900 sm:text-xl md:text-2xl">
                        {category.title}
                      </h2>
                      <p className="mb-5 text-sm leading-relaxed text-neutral-500 md:mb-10">
                        {category.description}
                      </p>
                      <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-2 xl:grid-cols-3 sm:gap-4">
                        {category.technologies?.map(
                          (technology, technologyIndex) => (
                            <TechnologyBadge
                              key={`${technology.name}-${technologyIndex}`}
                              technology={technology}
                              hoverText={theme.hoverText}
                            />
                          ),
                        )}
                      </div>
                    </div>
                  </motion.article>
                );
              })}
            </div>
          )}
        </div>
      </section>
    </main>
  );
}
