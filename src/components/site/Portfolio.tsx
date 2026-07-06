import { useState, useRef, useEffect } from "react"
import { collection, getDocs, query, orderBy } from "firebase/firestore"
import { db } from "@/lib/firebase"
import { motion, AnimatePresence, useScroll, useTransform } from "framer-motion"
import { ExternalLink, ArrowRight } from "lucide-react"
import { projects } from "@/data/projects"
import type { Project } from "@/data/projects"
import { Link } from "react-router-dom"

const categories = ["All", "Web", "App", "E-commerce"]

const StickyProjectCard = ({
  project,
  i,
  progress,
  range,
  targetScale,
}: {
  project: Project
  i: number
  progress: any
  range: [number, number]
  targetScale: number
}) => {
  const container = useRef<HTMLDivElement>(null)
  const scale = useTransform(progress, range, [1, targetScale])

  return (
    <div ref={container} className="sticky top-0 flex flex-col items-center justify-start min-h-screen pt-24 md:pt-32">
      <motion.div
        style={{
          scale,
          top: `${i * 25}px`, // Just stacking offset, the base offset is handled by container padding
        }}
        className="relative flex flex-col md:flex-row w-[90vw] max-w-5xl h-[550px] md:h-[600px] origin-top overflow-hidden rounded-3xl border border-border/50 bg-secondary/20 shadow-2xl backdrop-blur-sm mt-8 md:mt-0"
      >
        <div className="w-full md:w-1/2 h-[40%] md:h-full relative overflow-hidden">
          <img src={project.image} alt={project.title} className="w-full h-full object-cover transition-transform duration-700 hover:scale-105" />
          <div className="absolute inset-0 bg-gradient-to-t from-background/80 via-transparent to-transparent md:bg-gradient-to-r" />
        </div>
        
        <div className="w-full md:w-1/2 h-[60%] md:h-full p-5 sm:p-8 md:p-12 flex flex-col justify-center bg-background/95">
          <div className="flex flex-wrap gap-1.5 md:gap-2 mb-2 sm:mb-4">
            {project.tags.map(tag => (
              <span key={tag} className="px-3 py-1 bg-secondary rounded-full text-xs font-medium border border-border/50">
                {tag}
              </span>
            ))}
          </div>
          <h4 className="text-2xl md:text-5xl font-bold mb-2 md:mb-4 line-clamp-1 md:line-clamp-none">{project.title}</h4>
          <p className="text-primary font-medium mb-3 md:mb-6 text-sm md:text-lg">{project.result}</p>
          <p className="text-muted-foreground line-clamp-2 md:line-clamp-3 mb-4 md:mb-8 text-xs md:text-base">{project.challenge}</p>
          
          <Link to={`/work/${project.slug}`} className="inline-flex items-center text-xs md:text-sm font-bold uppercase tracking-wider hover:text-primary transition-colors mt-auto pt-2 border-t border-border/30 md:border-none md:pt-0">
            View Case Study <ArrowRight className="ml-2 w-5 h-5" />
          </Link>
        </div>
      </motion.div>
    </div>
  )
}

export default function Portfolio() {
  const [activeTab, setActiveTab] = useState("All")
  const [dbProjects, setDbProjects] = useState<any[]>([])

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const q = query(collection(db, "projects"), orderBy("createdAt", "desc"));
        const snapshot = await getDocs(q);
        const data = snapshot.docs.map(doc => {
          const docData = doc.data();
          const tags = docData.tags ? docData.tags.split(',').map((t: string) => t.trim()) : [];
          return { id: doc.id, ...docData, tags };
        });
        
        if (data.length > 0) {
          setDbProjects(data);
        } else {
          setDbProjects(projects);
        }
      } catch (error) {
        console.error("Error fetching projects:", error);
        setDbProjects(projects);
      }
    };
    fetchProjects();
  }, []);

  const displayProjects = dbProjects.length > 0 ? dbProjects : projects;

  const filteredProjects = displayProjects.filter(
    (project) => activeTab === "All" || project.category === activeTab
  )

  const featuredProjects = displayProjects.filter(p => p.featured)
  const containerRef = useRef<HTMLDivElement>(null)
  
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  })

  return (
    <section id="work" className="py-24 bg-background">
      <div className="container mx-auto px-4 md:px-6">
        
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-8">
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="max-w-2xl"
          >
            <h2 className="text-sm font-bold text-primary tracking-widest uppercase mb-3">
              Our Work
            </h2>
            <h3 className="text-3xl md:text-5xl font-bold tracking-tighter mb-4">
              Selected Case Studies
            </h3>
            <p className="text-muted-foreground text-lg">
              Explore our recent projects and see how we've helped businesses achieve their digital goals through custom web and mobile apps.
            </p>
          </motion.div>
          
          {/* Tabs */}
          <div className="flex flex-wrap gap-2">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setActiveTab(category)}
                className={`px-5 py-2 rounded-full text-sm font-medium transition-all ${
                  activeTab === category
                    ? "bg-primary text-primary-foreground"
                    : "bg-secondary text-secondary-foreground hover:bg-secondary/80"
                }`}
              >
                {category}
              </button>
            ))}
          </div>
        </div>

        {/* Featured Projects (Sticky Scroll) */}
        {activeTab === "All" && (
          <div ref={containerRef} className="relative w-full pb-[10vh] mt-4 md:mt-8">
            {featuredProjects.map((project, i) => {
              const targetScale = 1 - ((featuredProjects.length - i - 1) * 0.05);
              return (
                <StickyProjectCard
                  key={`featured-${project.id}`}
                  project={project}
                  i={i}
                  progress={scrollYProgress}
                  range={[i * (1 / featuredProjects.length), 1]}
                  targetScale={targetScale}
                />
              )
            })}
          </div>
        )}

        {/* Project Grid */}
        <motion.div layout className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          <AnimatePresence mode="popLayout">
            {filteredProjects.filter(p => activeTab !== "All" || !p.featured).map((project) => (
              <motion.div
                layout
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.4 }}
                key={project.id}
                className="group cursor-pointer rounded-xl overflow-hidden border border-border/50 bg-secondary/10"
              >
                <div className="relative h-60 overflow-hidden">
                  <img 
                    src={project.image} 
                    alt={project.title} 
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110 opacity-70 group-hover:opacity-100"
                  />
                  <div className="absolute inset-0 bg-background/20 group-hover:bg-transparent transition-colors duration-300" />
                  <Link to={`/work/${project.slug}`} className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-10">
                    <div className="bg-background/80 backdrop-blur-sm p-3 rounded-full">
                      <ExternalLink className="w-6 h-6 text-primary" />
                    </div>
                  </Link>
                </div>
                <div className="p-6">
                  <div className="text-xs text-primary font-bold tracking-widest uppercase mb-2">
                    {project.category}
                  </div>
                  <Link to={`/work/${project.slug}`} className="hover:text-primary transition-colors">
                    <h4 className="text-xl font-bold mb-2">{project.title}</h4>
                  </Link>
                  <div className="flex flex-wrap gap-2">
                    {project.tags.slice(0,2).map((tag: string) => (
                      <span key={tag} className="text-sm text-muted-foreground bg-secondary px-2 py-0.5 rounded-md">
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
      </div>
    </section>
  )
}
