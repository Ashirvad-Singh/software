import { useEffect, useState, useRef } from "react";
import { collection, getDocs, query, orderBy } from "firebase/firestore";
import { db } from "@/lib/firebase";
import { projects as staticProjects } from "@/data/projects";
import { motion, AnimatePresence } from "framer-motion";
import { Link } from "react-router-dom";
import SEO from "@/components/site/SEO";

const sampleVideos = [
  "https://assets.mixkit.co/videos/preview/mixkit-code-animation-on-a-screen-4075-large.mp4",
  "https://assets.mixkit.co/videos/preview/mixkit-hands-holding-a-smartphone-over-a-table-41552-large.mp4",
  "https://assets.mixkit.co/videos/preview/mixkit-man-working-on-his-laptop-308-large.mp4",
  "https://assets.mixkit.co/videos/preview/mixkit-futuristic-robotic-arm-in-a-laboratory-43403-large.mp4",
  "https://assets.mixkit.co/videos/preview/mixkit-developer-working-on-code-41566-large.mp4",
  "https://assets.mixkit.co/videos/preview/mixkit-web-design-application-on-a-laptop-41555-large.mp4",
];

const WorkCard = ({ project, idx }: { project: any; idx: number }) => {
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

  // Format tags as hyphenated uppercase string (like reference image)
  const formattedServices = project.tags
    ? (Array.isArray(project.tags) ? project.tags : project.tags.split(",")).map((t: string) => t.trim().toUpperCase()).join(" - ")
    : "DIGITAL DESIGN - WEB DEVELOPMENT - UI/UX";

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.4, delay: (idx % 2) * 0.08 }}
      className="group flex flex-col cursor-pointer pb-6"
    >
      <Link
        to={`/work/${project.slug}`}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        className="block relative overflow-hidden bg-neutral-900 aspect-[4/3] w-full border border-neutral-200 dark:border-neutral-800"
      >
        {/* Static Image */}
        <img
          src={project.image}
          alt={project.title}
          className={`w-full h-full object-cover transition-opacity duration-500 ${
            isHovered ? "opacity-0 scale-105" : "opacity-100 scale-100"
          }`}
        />

        {/* Hover Video Preview */}
        <video
          ref={videoRef}
          src={videoSrc}
          loop
          muted
          playsInline
          preload="none"
          className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-500 ${
            isHovered ? "opacity-100 scale-105" : "opacity-0 scale-100"
          }`}
        />

        {/* Overlay Title on Hover (like Tengile River Lodge card in reference image) */}
        <div className={`absolute inset-0 p-6 flex flex-col justify-center items-center text-center bg-black/40 backdrop-blur-[2px] transition-opacity duration-300 ${
          isHovered ? "opacity-100" : "opacity-0"
        }`}>
          <span className="text-[10px] font-mono uppercase tracking-widest text-white/80 bg-black/50 px-2.5 py-1 mb-2 rounded-sm border border-white/20">
            {project.client || "FEATURED PROJECT"}
          </span>
          <h2 className="text-2xl sm:text-4xl font-serif uppercase tracking-wider text-white drop-shadow-md">
            {project.title}
          </h2>
        </div>
      </Link>

      {/* Subtitle / Category List Below Card (Exact match to reference image) */}
      <div className="pt-3 flex flex-col">
        <span className="text-[10px] sm:text-[11px] font-sans font-medium uppercase tracking-wider text-neutral-600 dark:text-neutral-400">
          {formattedServices}
        </span>
        <Link to={`/work/${project.slug}`}>
          <h3 className="text-lg sm:text-xl font-bold uppercase tracking-tight text-neutral-900 dark:text-white group-hover:text-blue-600 transition-colors mt-0.5">
            {project.title}
          </h3>
        </Link>
      </div>
    </motion.div>
  );
};

export default function WorkPage() {
  const [dbProjects, setDbProjects] = useState<any[]>([]);
  const [viewMode, setViewMode] = useState<"GRID" | "LIST">("GRID");
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

  const categories = ["ALL", "WEB", "APP", "E-COMMERCE"];

  const filteredProjects = selectedCategory === "ALL" 
    ? rawProjects 
    : rawProjects.filter((p) => (p.category || "").toUpperCase() === selectedCategory);

  return (
    <main className="min-h-screen bg-[#f5f5f5] dark:bg-neutral-950 text-neutral-900 dark:text-white pt-24 sm:pt-28 md:pt-32 pb-24 px-4 sm:px-8 md:px-12 lg:px-16 font-sans">
      <SEO 
        title="Work | Adat Soft Solutions" 
        description="Explore our portfolio of digital experiences, custom applications, and mobile products." 
        keywords="work, portfolio, projects, web development, mobile apps"
      />

      {/* Header Section matching reference screenshot */}
      <div className="w-full mb-8">
        <div className="flex items-center justify-between pb-4 border-b-2 border-neutral-900 dark:border-white">
          {/* WORK* Logo Title */}
          <h1 className="text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-black uppercase tracking-tighter text-neutral-900 dark:text-white leading-none">
            WORK<span className="text-blue-600">*</span>
          </h1>

          {/* Center Category Filter */}
          <div className="hidden sm:flex items-center gap-2">
            <span className="text-xs font-mono font-bold uppercase tracking-wider text-neutral-500 mr-2">
              FILTER:
            </span>
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`text-xs font-bold uppercase tracking-wider px-3 py-1 rounded transition-colors ${
                  selectedCategory === cat
                    ? "text-neutral-900 dark:text-white underline decoration-2 underline-offset-4"
                    : "text-neutral-500 hover:text-neutral-900 dark:hover:text-white"
                }`}
              >
                {cat} {cat === "ALL" && "+"}
              </button>
            ))}
          </div>

          {/* Right Grid / List Switcher */}
          <div className="flex items-center gap-1 bg-neutral-200 dark:bg-neutral-900 p-1 rounded-full border border-neutral-300 dark:border-neutral-800">
            <button
              onClick={() => setViewMode("GRID")}
              className={`px-3.5 py-1 text-[11px] font-bold uppercase rounded-full transition-all ${
                viewMode === "GRID"
                  ? "bg-neutral-900 text-white dark:bg-white dark:text-neutral-900 shadow"
                  : "text-neutral-600 dark:text-neutral-400 hover:text-neutral-900"
              }`}
            >
              GRID
            </button>
            <button
              onClick={() => setViewMode("LIST")}
              className={`px-3.5 py-1 text-[11px] font-bold uppercase rounded-full transition-all ${
                viewMode === "LIST"
                  ? "bg-neutral-900 text-white dark:bg-white dark:text-neutral-900 shadow"
                  : "text-neutral-600 dark:text-neutral-400 hover:text-neutral-900"
              }`}
            >
              LIST
            </button>
          </div>
        </div>
      </div>

      {/* Content Section */}
      <div className="w-full">
        <AnimatePresence mode="wait">
          {viewMode === "GRID" ? (
            <motion.div 
              key="grid"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="grid grid-cols-1 md:grid-cols-2 gap-x-8 md:gap-x-12 gap-y-10 md:gap-y-14"
            >
              {filteredProjects.map((project, idx) => (
                <WorkCard key={project.id || project.slug || idx} project={project} idx={idx} />
              ))}
            </motion.div>
          ) : (
            <motion.div
              key="list"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="divide-y divide-neutral-300 dark:divide-neutral-800"
            >
              {filteredProjects.map((project, idx) => (
                <Link
                  key={project.id || project.slug || idx}
                  to={`/work/${project.slug}`}
                  className="group flex flex-col sm:flex-row sm:items-center justify-between py-6 px-2 hover:bg-neutral-200/50 dark:hover:bg-neutral-900/50 transition-colors"
                >
                  <div className="flex items-center gap-6">
                    <span className="text-xs font-mono text-neutral-400">0{idx + 1}</span>
                    <h3 className="text-xl sm:text-2xl font-bold uppercase tracking-tight text-neutral-900 dark:text-white group-hover:text-blue-600 transition-colors">
                      {project.title}
                    </h3>
                  </div>

                  <div className="flex items-center gap-8 mt-2 sm:mt-0 text-xs uppercase font-mono text-neutral-500">
                    <span>{project.category}</span>
                    <span>©2024-2026</span>
                    <span className="group-hover:translate-x-1 transition-transform">&rarr;</span>
                  </div>
                </Link>
              ))}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </main>
  );
}
