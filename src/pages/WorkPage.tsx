import { useEffect, useState, useRef } from "react";
import { collection, getDocs, query, orderBy } from "firebase/firestore";
import { db } from "@/lib/firebase";
import { projects as staticProjects } from "@/data/projects";
import { motion, AnimatePresence } from "framer-motion";
import { Link } from "react-router-dom";
import SEO from "@/components/site/SEO";
import { ArrowUpRight } from "lucide-react";

const sampleVideos = [
  "https://assets.mixkit.co/videos/preview/mixkit-code-animation-on-a-screen-4075-large.mp4",
  "https://assets.mixkit.co/videos/preview/mixkit-hands-holding-a-smartphone-over-a-table-41552-large.mp4",
  "https://assets.mixkit.co/videos/preview/mixkit-man-working-on-his-laptop-308-large.mp4",
  "https://assets.mixkit.co/videos/preview/mixkit-futuristic-robotic-arm-in-a-laboratory-43403-large.mp4",
  "https://assets.mixkit.co/videos/preview/mixkit-developer-working-on-code-41566-large.mp4",
  "https://assets.mixkit.co/videos/preview/mixkit-web-design-application-on-a-laptop-41555-large.mp4",
];

// Single Elium Studio Editorial Row Component
const EliumProjectRow = ({ project, idx }: { project: any; idx: number }) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isHovered, setIsHovered] = useState(false);

  const videoSrc = project.videoUrl || sampleVideos[idx % sampleVideos.length];

  const handleMouseEnter = () => {
    setIsHovered(true);
    if (videoRef.current) {
      videoRef.current.currentTime = 0;
      videoRef.current.play().catch(() => {});
    }
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    if (videoRef.current) {
      videoRef.current.pause();
    }
  };

  // Format tags as comma separated or array
  const tagsList = Array.isArray(project.tags) && project.tags.length > 0
    ? project.tags
    : typeof project.tags === "string" && project.tags.trim().length > 0
    ? project.tags.split(",").map((t: string) => t.trim())
    : [project.category || "Web App"];

  const indexFormatted = idx < 9 ? `0${idx + 1}` : `${idx + 1}`;

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
      className="group border-t border-neutral-300 dark:border-neutral-800 py-12 sm:py-16 md:py-20"
    >
      <Link
        to={`/work/${project.slug}`}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center"
      >
        {/* COLUMN 1: Meta Information (Left side) */}
        <div className="lg:col-span-3 flex flex-col gap-2">
          <span className="font-mono text-xs text-neutral-400 dark:text-neutral-500 font-semibold tracking-wider">
            {indexFormatted}
          </span>
          
          <div className="flex flex-col mt-2">
            <span className="text-xs font-mono uppercase tracking-widest font-bold text-neutral-900 dark:text-white">
              {project.client || "ADAT CLIENT"}
            </span>
            <span className="text-[11px] font-mono text-neutral-500 mt-1">
              ©2024-2026
            </span>
          </div>

          <div className="flex flex-wrap gap-1.5 mt-4">
            {tagsList.map((tag: string, tIdx: number) => (
              <span
                key={tIdx}
                className="text-[10px] font-mono uppercase tracking-wider text-neutral-600 dark:text-neutral-400 bg-neutral-200/60 dark:bg-neutral-900 px-2 py-0.5 rounded"
              >
                {tag}
              </span>
            ))}
          </div>
        </div>

        {/* COLUMN 2: Big Title & Description (Center) */}
        <div className="lg:col-span-5 flex flex-col justify-center">
          <div className="flex items-center gap-3">
            <h2 className="text-3xl sm:text-5xl md:text-6xl font-medium tracking-tight text-neutral-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors duration-300">
              {project.title}
            </h2>
            <ArrowUpRight className="w-6 h-6 text-neutral-400 group-hover:text-blue-600 dark:group-hover:text-blue-400 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform duration-300 shrink-0" />
          </div>

          <p className="mt-4 text-sm sm:text-base text-neutral-600 dark:text-neutral-400 font-normal leading-relaxed max-w-lg">
            {project.challenge || project.description || "Delivering high detailing, user-centric software architecture, and custom interactive engineering."}
          </p>

          {project.result && (
            <div className="mt-4 text-xs font-mono text-blue-600 dark:text-blue-400 font-medium">
              → {project.result}
            </div>
          )}
        </div>

        {/* COLUMN 3: Product Image / Video Showcase (Right side) */}
        <div className="lg:col-span-4 flex justify-end">
          <div className="relative overflow-hidden rounded-2xl w-full max-w-md aspect-[4/3] bg-neutral-100 dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 shadow-sm group-hover:shadow-xl transition-shadow duration-500">
            {/* Image */}
            <img
              src={project.image}
              alt={project.title}
              className={`w-full h-full object-cover transition-all duration-700 ${
                isHovered ? "scale-105 opacity-0" : "scale-100 opacity-100"
              }`}
            />

            {/* Video */}
            <video
              ref={videoRef}
              src={videoSrc}
              loop
              muted
              playsInline
              preload="none"
              className={`absolute inset-0 w-full h-full object-cover transition-all duration-700 ${
                isHovered ? "opacity-100 scale-105" : "opacity-0 scale-100"
              }`}
            />
          </div>
        </div>
      </Link>
    </motion.div>
  );
};

export default function WorkPage() {
  const [dbProjects, setDbProjects] = useState<any[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string>("ALL");

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const q = query(collection(db, "projects"), orderBy("createdAt", "desc"));
        const snapshot = await getDocs(q);
        const data = snapshot.docs.map((doc) => {
          const docData = doc.data();
          const tags = docData.tags ? docData.tags.split(",").map((t: string) => t.trim()) : [];
          return { id: doc.id, ...docData, tags };
        });
        if (data.length > 0) {
          setDbProjects(data);
        } else {
          setDbProjects(staticProjects);
        }
      } catch (error) {
        console.error("Error fetching projects:", error);
        setDbProjects(staticProjects);
      }
    };
    fetchProjects();
  }, []);

  const rawProjects = dbProjects.length > 0 ? dbProjects : staticProjects;

  const categories = [
    { label: "SELECTED", value: "ALL" },
    { label: "WEB APPS", value: "WEB" },
    { label: "MOBILE APPS", value: "APP" },
    { label: "E-COMMERCE", value: "E-COMMERCE" },
  ];

  const filteredProjects = selectedCategory === "ALL" 
    ? rawProjects 
    : rawProjects.filter((p) => (p.category || "").toUpperCase().includes(selectedCategory));

  return (
    <main className="min-h-screen bg-[#fcfcfc] dark:bg-neutral-950 text-neutral-900 dark:text-white pt-28 sm:pt-32 md:pt-36 pb-28 font-sans selection:bg-blue-600 selection:text-white">
      <SEO 
        title="Our Work | Adat Soft Solutions" 
        description="We stand up for precision and qualitative software manufacturing. Explore our portfolio of web applications, mobile platforms, and custom software." 
        keywords="elium studio work, software portfolio, adat work, web development"
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-12">
        {/* TOP MANIFESTO INTRO (Exact Elium Studio Vibe) */}
        <div className="mb-14 max-w-4xl">
          <span className="text-xs font-mono font-bold uppercase tracking-widest text-neutral-400 dark:text-neutral-500 block mb-4">
            OUR WORK
          </span>
          <h1 className="text-3xl sm:text-5xl md:text-6xl font-light tracking-tight text-neutral-900 dark:text-white leading-[1.15]">
            We stand up for <span className="font-semibold italic">precision engineering</span> and qualitative digital craftsmanship. We work hand-in-hand with founders to deliver high detailing and scalable platforms.
          </h1>
        </div>

        {/* CATEGORY FILTER TABS (Exact Elium Studio Navigation) */}
        <div className="flex flex-wrap items-center gap-6 sm:gap-10 pb-6 mb-8 border-b border-neutral-300 dark:border-neutral-800">
          {categories.map((cat) => (
            <button
              key={cat.value}
              onClick={() => setSelectedCategory(cat.value)}
              className={`text-xs sm:text-sm font-mono tracking-wider transition-colors relative py-1 ${
                selectedCategory === cat.value
                  ? "text-neutral-900 dark:text-white font-bold"
                  : "text-neutral-400 hover:text-neutral-800 dark:hover:text-neutral-200"
              }`}
            >
              {cat.label}
              {selectedCategory === cat.value && (
                <motion.div
                  layoutId="activeCategory"
                  className="absolute bottom-0 left-0 right-0 h-[2px] bg-neutral-900 dark:bg-white"
                />
              )}
            </button>
          ))}
          <span className="ml-auto text-xs font-mono text-neutral-400">
            SHOWING ({filteredProjects.length}) PROJECTS
          </span>
        </div>

        {/* EDITORIAL PROJECT ROWS */}
        <div className="flex flex-col">
          <AnimatePresence mode="wait">
            {filteredProjects.map((project, idx) => (
              <EliumProjectRow 
                key={project.id || project.slug || idx} 
                project={project} 
                idx={idx} 
              />
            ))}
          </AnimatePresence>
        </div>
      </div>
    </main>
  );
}
