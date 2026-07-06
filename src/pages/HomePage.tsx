import { Link } from "react-router-dom";
import HeroModern from "@/components/site/HeroModern";
import { ImagesBadge } from "@/components/ui/images-badge";
import Testimonials from "@/components/site/Testimonials";
import ThreeDMarqueeDemo from "@/components/3d-marquee-demo";
import FeaturesSectionDemo from "@/components/ui/features-section-demo-3";
import StatsCounter from "@/components/site/StatsCounter";
import { FloatingShapes } from "@/components/ui/floating-shapes";
import { ArrowRight, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import WorldMap from "@/components/ui/world-map";
import { motion } from "framer-motion";
import { useState, useEffect } from "react";
import { collection, getDocs, query, orderBy } from "firebase/firestore";
import { db } from "@/lib/firebase";
import * as TablerIcons from "@tabler/icons-react";
import * as LucideIcons from "lucide-react";

export default function HomePage() {
  const [techCategories, setTechCategories] = useState<any[]>([]);
  const [loadingTech, setLoadingTech] = useState(true);

  useEffect(() => {
    const fetchTechStack = async () => {
      try {
        const q = query(collection(db, "tech_stack"), orderBy("createdAt", "asc"));
        const snapshot = await getDocs(q);
        const data = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
        setTechCategories(data);
      } catch (error) {
        console.error("Error fetching tech stack:", error);
      } finally {
        setLoadingTech(false);
      }
    };
    fetchTechStack();
  }, []);

  const getThemeColors = (color: string) => {
    switch (color) {
      case "blue": return { bg: "from-blue-50", text: "text-blue-500", groupHoverText: "group-hover:text-blue-500" };
      case "purple": return { bg: "from-purple-50", text: "text-purple-500", groupHoverText: "group-hover:text-purple-500" };
      case "orange": return { bg: "from-orange-50", text: "text-orange-500", groupHoverText: "group-hover:text-orange-500" };
      case "green": return { bg: "from-green-50", text: "text-green-500", groupHoverText: "group-hover:text-green-500" };
      default: return { bg: "from-gray-50", text: "text-gray-500", groupHoverText: "group-hover:text-gray-500" };
    }
  };

  const renderCategoryIcon = (iconName: string, textClass: string) => {
    const IconComponent = (LucideIcons as any)[iconName] || LucideIcons.Code;
    return <IconComponent className={`w-7 h-7 ${textClass}`} />;
  };

  return (
    <main>
      <HeroModern />

      <div className="flex w-full items-center justify-center pb-20 -mt-32 relative z-20">
        <ImagesBadge
          text="Explore Our Web & App Solutions"
          images={[
            "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&q=80&w=300",
            "https://images.unsplash.com/photo-1576091160550-2173dba999ef?auto=format&fit=crop&q=80&w=300",
            "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&q=80&w=300",
          ]}
          folderSize={{ width: 48, height: 36 }}
          teaserImageSize={{ width: 40, height: 28 }}
          hoverImageSize={{ width: 140, height: 108 }}
          hoverTranslateY={-110}
          hoverSpread={50}
        />
      </div>

      <StatsCounter />

      {/* Mini About Section */}
      <section className="py-24 bg-neutral-50 relative overflow-hidden">
        <FloatingShapes />
        <div className="container mx-auto px-4 max-w-4xl text-center relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-sm font-bold text-primary tracking-widest uppercase mb-3">
              Who We Are
            </h2>
            <h3 className="text-3xl md:text-4xl font-bold mb-6 text-neutral-900">
              Building Digital Experiences That Matter
            </h3>
            <p className="text-lg text-neutral-600 mb-12 leading-relaxed">
              Adat Soft Solutions is a premier digital agency specializing in
              cutting-edge web and mobile applications. We connect global
              businesses with modern technology to help them scale and succeed
              in the digital era.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="mb-12"
          >
            <WorldMap
              lineColor="var(--color-primary)"
              dots={[
                {
                  start: { lat: 28.6139, lng: 77.209, label: "New Delhi (HQ)" },
                  end: { lat: 34.0522, lng: -118.2437, label: "Los Angeles, USA" },
                },
                {
                  start: { lat: 28.6139, lng: 77.209 },
                  end: { lat: 51.5074, lng: -0.1278, label: "London, UK" },
                },
                {
                  start: { lat: 28.6139, lng: 77.209 },
                  end: { lat: 40.7128, lng: -74.006, label: "New York, USA" },
                },
                {
                  start: { lat: 28.6139, lng: 77.209 },
                  end: { lat: -33.8688, lng: 151.2093, label: "Sydney, Australia" },
                },
                {
                  start: { lat: 28.6139, lng: 77.209 },
                  end: { lat: 25.2048, lng: 55.2708, label: "Dubai, UAE" },
                },
              ]}
            />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            <Button
              asChild
              variant="outline"
              size="lg"
              className="rounded-full border-neutral-300 hover:bg-neutral-100"
            >
              <Link to="/about">
                Learn More About Us <ArrowRight className="ml-2 w-4 h-4" />
              </Link>
            </Button>
          </motion.div>
        </div>
      </section>

      <FeaturesSectionDemo />
      <ThreeDMarqueeDemo />
      
      {/* Advanced Tech Stack Section (Dynamic) */}
      <section className="py-32 relative overflow-hidden bg-white border-t border-neutral-100">
        <div
          className="absolute inset-0 pointer-events-none opacity-[0.03]"
          style={{
            backgroundImage: "radial-gradient(#000 1px, transparent 1px)",
            backgroundSize: "24px 24px",
          }}
        ></div>

        <div className="absolute inset-0 bg-gradient-to-b from-blue-50/50 via-white to-white pointer-events-none z-0"></div>
        <FloatingShapes />

        <div className="container mx-auto px-4 max-w-7xl relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6 }}
            className="text-center mb-24"
          >
            <h2 className="text-sm font-bold text-primary tracking-widest uppercase mb-4">
              The Engine Room
            </h2>
            <h3 className="text-4xl md:text-5xl font-bold mb-6 text-neutral-900">
              Powered by Next-Gen Tech
            </h3>
            <p className="text-neutral-500 max-w-2xl mx-auto text-lg">
              We don't just write code. We architect scalable, future-proof
              digital ecosystems (websites and mobile apps) using the industry's
              most advanced tools and frameworks.
            </p>
          </motion.div>

          {loadingTech ? (
             <div className="flex justify-center items-center py-20">
               <Loader2 className="w-8 h-8 animate-spin text-primary" />
             </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
              {techCategories.length === 0 ? (
                <div className="col-span-full text-center text-neutral-500 py-12">
                  No tech stack added yet. Add from Dashboard.
                </div>
              ) : techCategories.map((category, idx) => {
                const theme = getThemeColors(category.themeColor);
                return (
                  <motion.div
                    key={category.id || idx}
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-100px" }}
                    transition={{ duration: 0.5, delay: idx * 0.1 }}
                    className="group relative p-8 md:p-10 rounded-[2rem] bg-white border border-neutral-200 shadow-sm hover:shadow-xl hover:border-primary/20 transition-all duration-300 overflow-hidden"
                  >
                    <div className={`absolute inset-0 bg-gradient-to-br ${theme.bg} to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500`}></div>

                    <div className="relative z-10">
                      <div className="w-14 h-14 rounded-2xl bg-neutral-50 border border-neutral-100 flex items-center justify-center mb-8 group-hover:bg-white group-hover:shadow-sm transition-all">
                        {renderCategoryIcon(category.categoryIcon, theme.text)}
                      </div>
                      <h4 className="text-2xl font-bold mb-2 text-neutral-900">
                        {category.title}
                      </h4>
                      <p className="text-neutral-500 mb-10 text-sm leading-relaxed">
                        {category.description}
                      </p>

                      <div className="grid grid-cols-3 gap-4">
                        {category.technologies?.map((tech: any, tIdx: number) => (
                          <AdvancedTechBadge
                            key={tIdx}
                            iconUrl={tech.iconUrl}
                            name={tech.name}
                            hoverColor={theme.groupHoverText}
                          />
                        ))}
                      </div>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          )}
        </div>
      </section>

      <Testimonials />
    </main>
  );
}

function AdvancedTechBadge({
  iconUrl,
  name,
  hoverColor,
}: {
  iconUrl: string;
  name: string;
  hoverColor: string;
}) {
  const isImage = iconUrl?.startsWith("http") || iconUrl?.startsWith("data:");
  const IconComponent = !isImage ? (TablerIcons as any)[iconUrl] || TablerIcons.IconCode : null;

  return (
    <div
      className={`flex flex-col items-center justify-center gap-2 p-4 rounded-xl bg-neutral-50/50 border border-neutral-100 hover:bg-white hover:shadow-sm hover:border-primary/30 transition-all duration-300 cursor-pointer group`}
    >
      {isImage ? (
        <img src={iconUrl} alt={name} className="w-8 h-8 object-contain transition-transform duration-300 group-hover:scale-110" />
      ) : (
        <IconComponent
          className={`w-8 h-8 text-neutral-400 transition-colors duration-300 ${hoverColor} group-hover:scale-110`}
          stroke={1.5}
        />
      )}
      <span className="text-[11px] font-medium text-neutral-500 group-hover:text-neutral-900 transition-colors uppercase tracking-wider text-center">
        {name}
      </span>
    </div>
  );
}
