import { useEffect, useState, useRef } from "react"
import { collection, getDocs, query, orderBy } from "firebase/firestore"
import { db } from "@/lib/firebase"
import { projects as staticProjects } from "@/data/projects"
import { motion, useScroll, useTransform } from "framer-motion"
import { Link } from "react-router-dom"
import { ExternalLink } from "lucide-react"

// Simple card for mobile
const MobileProjectCard = ({ project, idx }: { project: any; idx: number }) => (
  <motion.div
    initial={{ opacity: 0, y: 24 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.4, delay: idx * 0.08 }}
    className="group relative flex flex-col cursor-pointer bg-white dark:bg-zinc-900 rounded-2xl overflow-hidden border border-border shadow-sm active:shadow-md transition-shadow"
  >
    <Link to={`/work/${project.slug}`} className="absolute inset-0 z-10" aria-label={`View ${project.title}`} />
    
    {/* Image */}
    <div className="relative overflow-hidden aspect-[16/9] bg-secondary/20">
      <img
        src={project.image}
        alt={project.title}
        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
      />
      <div className="absolute inset-0 bg-black/10 group-hover:bg-transparent transition-colors duration-300" />
      <span className="absolute top-3 left-3 text-[10px] font-bold tracking-widest uppercase bg-white/90 text-primary px-2.5 py-1 rounded-full">
        {project.category}
      </span>
    </div>

    {/* Content */}
    <div className="p-4">
      <h3 className="text-base font-bold mb-1.5 group-hover:text-primary transition-colors leading-snug">
        {project.title}
      </h3>
      <p className="text-muted-foreground text-xs line-clamp-2 mb-3">
        {project.challenge || "Explore the full case study to learn more about this project."}
      </p>
      <div className="flex flex-wrap gap-1.5">
        {project.tags?.slice(0, 3).map((tag: string) => (
          <span key={tag} className="text-[10px] font-medium bg-secondary/50 px-2.5 py-1 rounded-full border border-border/50">
            {tag}
          </span>
        ))}
      </div>
    </div>
  </motion.div>
)

// Parallax card for desktop
const DesktopProjectCard = ({ project, yMotion }: { project: any; yMotion: any }) => (
  <motion.div
    style={{ y: yMotion }}
    className="group relative flex flex-col cursor-pointer bg-white dark:bg-zinc-900 rounded-3xl p-4 border border-border shadow-sm hover:shadow-xl transition-shadow duration-500"
    data-cursor-text="View Project"
  >
    <Link to={`/work/${project.slug}`} className="absolute inset-0 z-10" aria-label={`View ${project.title}`} />
    <div className="relative overflow-hidden rounded-2xl aspect-[4/3] bg-secondary/20 mb-6">
      <img
        src={project.image}
        alt={project.title}
        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
      />
      <div className="absolute inset-0 bg-black/10 group-hover:bg-transparent transition-colors duration-500" />
      <div className="absolute top-4 right-4 bg-white dark:bg-black p-3 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300 translate-y-4 group-hover:translate-y-0 shadow-lg">
        <ExternalLink className="w-5 h-5 text-primary" />
      </div>
    </div>
    <div className="px-2 pb-4">
      <div className="text-sm text-primary font-bold tracking-widest uppercase mb-3">
        {project.category}
      </div>
      <h3 className="text-2xl md:text-3xl font-bold mb-3 group-hover:text-primary transition-colors">
        {project.title}
      </h3>
      <p className="text-muted-foreground line-clamp-2 mb-6">
        {project.challenge || "Explore the full case study to learn more about this project."}
      </p>
      <div className="flex flex-wrap gap-2">
        {project.tags?.slice(0, 3).map((tag: string) => (
          <span key={tag} className="text-xs font-medium bg-secondary/50 px-3 py-1.5 rounded-full border border-border/50">
            {tag}
          </span>
        ))}
      </div>
    </div>
  </motion.div>
)

export default function WorkPage() {
  const [dbProjects, setDbProjects] = useState<any[]>([])
  const [isMobile, setIsMobile] = useState(false)

  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 768)
    check()
    window.addEventListener("resize", check)
    return () => window.removeEventListener("resize", check)
  }, [])

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const q = query(collection(db, "projects"), orderBy("createdAt", "desc"))
        const snapshot = await getDocs(q)
        const data = snapshot.docs.map(doc => {
          const docData = doc.data()
          const tags = docData.tags ? docData.tags.split(',').map((t: string) => t.trim()) : []
          return { id: doc.id, ...docData, tags }
        })
        if (data.length > 0) {
          setDbProjects(data)
        } else {
          setDbProjects(staticProjects)
        }
      } catch (error) {
        console.error("Error fetching projects:", error)
        setDbProjects(staticProjects)
      }
    }
    fetchProjects()
  }, [])

  const displayProjects = dbProjects.length > 0 ? dbProjects : staticProjects

  // Parallax (desktop only)
  const gridRef = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({ target: gridRef, offset: ["start end", "end start"] })
  const yFast = useTransform(scrollYProgress, [0, 1], [0, -300])
  const ySlow = useTransform(scrollYProgress, [0, 1], [0, 200])

  return (
    <main className="pt-24 md:pt-40 min-h-screen bg-background overflow-hidden">
      <div className="container mx-auto px-4 md:px-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="max-w-4xl mx-auto text-center mb-12 md:mb-32"
        >
          <h1 className="text-4xl md:text-7xl font-bold tracking-tighter mb-4 md:mb-6">
            Our <span className="text-primary">Work</span>
          </h1>
          <p className="text-base md:text-xl text-muted-foreground">
            Explore our portfolio of digital experiences, custom applications, and web platforms built for the modern era.
          </p>
        </motion.div>

        {/* MOBILE: Simple grid, no parallax */}
        {isMobile && (
          <div className="flex flex-col gap-5 pb-16">
            {displayProjects.map((project, idx) => (
              <MobileProjectCard key={project.id || project.slug} project={project} idx={idx} />
            ))}
          </div>
        )}

        {/* DESKTOP: Parallax layout */}
        {!isMobile && (
          <div className="relative pb-32" ref={gridRef}>
            <div className="grid grid-cols-2 gap-8 md:gap-16 max-w-6xl mx-auto">
              {displayProjects.map((project, idx) => {
                const isEven = idx % 2 === 0
                return (
                  <div
                    key={project.id || project.slug}
                    style={{ marginTop: !isEven ? '8rem' : '0' }}
                  >
                    <DesktopProjectCard project={project} yMotion={isEven ? yFast : ySlow} />
                  </div>
                )
              })}
            </div>
          </div>
        )}
      </div>
    </main>
  )
}
