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
  const tagsList =
    Array.isArray(project.tags) && project.tags.length > 0
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
      className={`group py-3 sm:py-4 ${idx === 0 ? "lg:col-span-3" : ""}`}
    >
      <Link
        to={`/work/${project.slug}`}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        className={`items-center gap-6 rounded-xl bg-card p-4 shadow-sm ring-1 ring-black/[0.04] transition-shadow duration-500 group-hover:shadow-xl dark:ring-white/10 sm:p-5 lg:gap-8 ${idx === 0 ? "grid grid-cols-1 lg:grid-cols-12 lg:p-6" : "flex flex-col"}`}
      >
        {/* COLUMN 1: Meta Information (Left side) */}
        <div
          className={`${idx === 0 ? "hidden" : "order-2 flex w-full"} flex-col gap-2 lg:col-span-3`}
        >
          <span className="font-sans text-xs font-semibold tracking-wider text-neutral-400 dark:text-neutral-500">
            {indexFormatted}
          </span>

          <div className="flex flex-col mt-2">
            <span className="text-xs font-sans font-bold uppercase tracking-widest text-neutral-900 dark:text-white">
              {project.client || "ADAT CLIENT"}
            </span>
            <span className="mt-1 text-[11px] font-sans text-neutral-500">
              ©2024-2026
            </span>
          </div>

          <div className="flex flex-wrap gap-1.5 mt-4">
            {tagsList.map((tag: string, tIdx: number) => (
              <span
                key={tIdx}
                className="rounded bg-secondary/70 px-2 py-0.5 text-[10px] font-sans uppercase tracking-wider text-secondary-foreground dark:bg-neutral-800 dark:text-neutral-300"
              >
                {tag}
              </span>
            ))}
          </div>
        </div>

        {/* COLUMN 2: Big Title & Description (Center) */}
        <div
          className={`flex w-full flex-col justify-center ${idx === 0 ? "lg:col-span-5 lg:order-2" : "order-3"}`}
        >
          <div className="flex items-center gap-3">
            <h2 className="text-3xl font-medium tracking-tight text-neutral-900 transition-colors duration-500 group-hover:text-primary dark:text-white sm:text-4xl md:text-5xl">
              {project.title}
            </h2>
            <ArrowUpRight className="h-6 w-6 shrink-0 text-neutral-400 transition-transform duration-300 group-hover:-translate-y-1 group-hover:translate-x-1 group-hover:text-primary" />
          </div>

          <p className="mt-4 text-sm sm:text-base text-neutral-600 dark:text-neutral-400 font-normal leading-relaxed max-w-lg">
            {project.challenge ||
              project.description ||
              "Delivering high detailing, user-centric software architecture, and custom interactive engineering."}
          </p>

          {project.result && (
            <div className="mt-4 text-xs font-sans font-medium text-primary">
              → {project.result}
            </div>
          )}
        </div>

        {/* COLUMN 3: Product Image / Video Showcase (Right side) */}
        <div
          className={`flex w-full justify-end ${idx === 0 ? "lg:col-span-7 lg:order-1" : "order-1"}`}
        >
          <div
            className={`relative w-full overflow-hidden rounded-lg border border-border bg-muted shadow-sm transition-shadow duration-500 group-hover:shadow-xl ${idx === 0 ? "aspect-[16/9]" : "aspect-[4/3]"}`}
          >
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
  const [openFaq, setOpenFaq] = useState(2);

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const q = query(
          collection(db, "projects"),
          orderBy("createdAt", "desc"),
        );
        const snapshot = await getDocs(q);
        const data = snapshot.docs.map((doc) => {
          const docData = doc.data();
          const tags = docData.tags
            ? docData.tags.split(",").map((t: string) => t.trim())
            : [];
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

  const filteredProjects =
    selectedCategory === "ALL"
      ? rawProjects
      : rawProjects.filter((p) =>
          (p.category || "").toUpperCase().includes(selectedCategory),
        );

  const projectFaqs = [
    {
      question: "Are these your only projects?",
      answer:
        "These are selected examples of our work. We can share more relevant case studies based on your industry and project goals.",
    },
    {
      question: "Can you show work from our industry?",
      answer:
        "Yes. Our team works across web platforms, mobile products, ecommerce, CMS, SaaS, and custom business applications.",
    },
    {
      question: "What did Adat deliver?",
      answer:
        "Each case study shows our exact role, from strategy and UX/UI to development, launch, content, and ongoing growth.",
    },
    {
      question: "How are the results measured?",
      answer:
        "Results come from client goals, platform analytics, and performance data collected after launch. The measurement period varies by project.",
    },
    {
      question: "Do you work with internal teams?",
      answer:
        "Yes. We can lead the complete project or work alongside your marketing, design, and development teams.",
    },
  ];

  return (
    <main
      className="min-h-screen bg-background pb-28 pt-28 font-sans text-foreground selection:bg-primary selection:text-primary-foreground sm:pt-32 md:pt-36"
      style={{ fontFamily: '"Geist Variable", sans-serif' }}
    >
      <SEO
        title="Our Work | Adat Soft Solutions"
        description="We stand up for precision and qualitative software manufacturing. Explore our portfolio of web applications, mobile platforms, and custom software."
        keywords="elium studio work, software portfolio, adat work, web development"
      />

      <div className="mx-auto max-w-7xl px-4 sm:px-6 md:px-12">
        {/* TOP MANIFESTO INTRO (Exact Elium Studio Vibe) */}
        <div className="mb-14 max-w-5xl">
          <span className="mb-4 block text-xs font-sans font-bold uppercase tracking-widest text-neutral-400 dark:text-neutral-500">
            OUR WORK
          </span>
          <h1 className="text-4xl font-medium leading-[1.05] tracking-tight text-neutral-950 dark:text-white sm:text-6xl md:text-7xl">
            Selected work <span className="font-normal italic">and</span>
            <br />
            the results behind it.
          </h1>
          <p className="mt-6 max-w-2xl text-sm leading-relaxed text-neutral-600 dark:text-neutral-400 sm:text-base">
            Digital products built with thoughtful strategy, sharp design, and
            the engineering needed to perform in the real world.
          </p>
        </div>

        {/* CATEGORY FILTER TABS (Exact Elium Studio Navigation) */}
        <div className="mb-8 flex flex-wrap items-center gap-2 border-b border-neutral-300 pb-6 dark:border-neutral-800 sm:gap-3">
          {categories.map((cat) => (
            <button
              key={cat.value}
              onClick={() => setSelectedCategory(cat.value)}
              className={`relative rounded-md px-3 py-2 text-xs font-medium tracking-wide transition-colors sm:text-sm ${
                selectedCategory === cat.value
                  ? "bg-primary text-primary-foreground"
                  : "bg-secondary text-secondary-foreground hover:bg-secondary/80"
              }`}
            >
              {cat.label}
              {selectedCategory === cat.value && (
                <motion.div layoutId="activeCategory" className="hidden" />
              )}
            </button>
          ))}
          <span className="ml-auto text-xs font-sans text-neutral-400">
            SHOWING ({filteredProjects.length}) PROJECTS
          </span>
        </div>

        {/* EDITORIAL PROJECT ROWS */}
        <div className="grid grid-cols-1 gap-2 sm:grid-cols-2 lg:grid-cols-3">
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

        <section className="mt-28 grid grid-cols-1 gap-12 border-t border-border pt-16 lg:grid-cols-[1fr_1.35fr] lg:gap-20 lg:pt-24">
          <div>
            <span className="text-xs font-sans font-bold uppercase tracking-widest text-muted-foreground">
              About the work
            </span>
            <h2 className="mt-3 max-w-md text-4xl font-medium leading-[1.05] tracking-tight text-foreground sm:text-5xl">
              Questions about
              <br />
              our projects.
            </h2>
            <p className="mt-6 max-w-md text-sm leading-relaxed text-muted-foreground sm:text-base">
              A closer look at what we delivered, what we measured, and how we
              worked with each team.
            </p>
            <div className="mt-8 aspect-[4/3] max-w-md overflow-hidden rounded-lg border border-border bg-muted">
              <img
                src={rawProjects[0]?.image || "/adat_hero_ui.webp"}
                alt={rawProjects[0]?.title || "Adat project work"}
                className="h-full w-full object-cover"
              />
            </div>
          </div>

          <div className="divide-y divide-border">
            {projectFaqs.map((faq, index) => {
              const isOpen = openFaq === index;
              return (
                <div key={faq.question} className="border-border">
                  <button
                    type="button"
                    onClick={() => setOpenFaq(isOpen ? -1 : index)}
                    aria-expanded={isOpen}
                    className="flex w-full items-center justify-between gap-6 py-5 text-left text-lg font-semibold tracking-tight text-foreground transition-colors hover:text-primary sm:text-xl"
                  >
                    {faq.question}
                    <span className="shrink-0 text-2xl font-normal text-muted-foreground">
                      {isOpen ? "×" : "+"}
                    </span>
                  </button>
                  <AnimatePresence initial={false}>
                    {isOpen && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.35, ease: "easeOut" }}
                        className="overflow-hidden"
                      >
                        <p className="max-w-2xl pb-6 pr-10 text-sm leading-relaxed text-muted-foreground sm:text-base">
                          {faq.answer}
                        </p>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              );
            })}
          </div>
        </section>
      </div>
    </main>
  );
}
