import { useParams, Link, useNavigate } from "react-router-dom"
import { motion } from "framer-motion"
import { ArrowLeft, Loader2 } from "lucide-react"
import { useState, useEffect } from "react"
import { collection, getDocs, query, where } from "firebase/firestore"
import { db } from "@/lib/firebase"
import { projects as staticProjects } from "@/data/projects"

export default function ProjectDetailPage() {
  const { slug } = useParams<{ slug: string }>()
  const navigate = useNavigate()
  const [project, setProject] = useState<any>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchProject = async () => {
      try {
        const q = query(collection(db, "projects"), where("slug", "==", slug));
        const snapshot = await getDocs(q);
        if (!snapshot.empty) {
          const docData = snapshot.docs[0].data();
          const tags = docData.tags ? docData.tags.split(',').map((t: string) => t.trim()) : [];
          const gallery = docData.gallery ? docData.gallery.split('\n').map((g: string) => g.trim()).filter(Boolean) : [];
          
          setProject({ 
            id: snapshot.docs[0].id, 
            ...docData,
            tags,
            gallery
          });
        } else {
          const staticProj = staticProjects.find(p => p.slug === slug);
          if (staticProj) {
            setProject(staticProj);
          } else {
            setProject(null);
          }
        }
      } catch (error) {
        console.error("Error fetching project:", error);
        const staticProj = staticProjects.find(p => p.slug === slug);
        if (staticProj) {
          setProject(staticProj);
        } else {
          setProject(null);
        }
      } finally {
        setLoading(false);
      }
    };
    if (slug) fetchProject();
  }, [slug]);

  if (loading) {
    return (
      <main className="bg-white dark:bg-neutral-950 min-h-screen flex items-center justify-center">
        <Loader2 className="w-8 h-8 animate-spin text-primary" />
      </main>
    );
  }

  if (!project) {
    return (
      <main className="bg-white dark:bg-neutral-950 min-h-screen flex flex-col items-center justify-center pt-24 pb-20">
        <h1 className="text-2xl font-bold mb-4">Project not found</h1>
        <button onClick={() => navigate("/work")} className="bg-primary text-primary-foreground px-4 py-2 rounded-md font-medium">Back to Portfolio</button>
      </main>
    );
  }

  return (
    <main className="pt-32 md:pt-40 pb-20">
      <div className="container mx-auto px-4 max-w-5xl">
        <Link to="/work" className="inline-flex items-center text-sm font-medium text-muted-foreground hover:text-primary transition-colors mb-8">
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back to Portfolio
        </Link>
        
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <div className="flex flex-wrap items-center gap-4 mb-4">
            <span className="text-sm font-bold text-primary tracking-widest uppercase">{project.category}</span>
            <div className="flex gap-2">
              {project.tags && project.tags.map((tag: string) => (
                <span key={tag} className="px-3 py-1 bg-secondary text-secondary-foreground rounded-full text-xs font-medium">
                  {tag}
                </span>
              ))}
            </div>
          </div>
          
          <h1 className="text-4xl md:text-5xl lg:text-7xl font-bold tracking-tighter mb-8">{project.title}</h1>
          
          <div className="w-full aspect-video rounded-3xl overflow-hidden mb-16 border border-border/50 shadow-lg">
            <img src={project.image} alt={project.title} className="w-full h-full object-cover" />
          </div>

          <div className="grid md:grid-cols-3 gap-12 mb-16">
            <div className="md:col-span-2 space-y-12">
              <section>
                <h2 className="text-3xl font-bold mb-6">The Challenge</h2>
                <p className="text-lg leading-relaxed text-muted-foreground">{project.challenge}</p>
              </section>
              
              <section>
                <h2 className="text-3xl font-bold mb-6">The Solution</h2>
                <p className="text-lg leading-relaxed text-muted-foreground">{project.solution}</p>
              </section>
            </div>
            
            <div className="space-y-8 bg-secondary/10 p-8 rounded-2xl border border-border/50 h-fit">
              <div>
                <h4 className="text-sm font-semibold text-muted-foreground uppercase tracking-wider mb-2">Client</h4>
                <p className="text-xl font-medium">{project.client}</p>
              </div>
              <div>
                <h4 className="text-sm font-semibold text-muted-foreground uppercase tracking-wider mb-2">Timeline</h4>
                <p className="text-xl font-medium">{project.timeline}</p>
              </div>
              <div>
                <h4 className="text-sm font-semibold text-muted-foreground uppercase tracking-wider mb-2">Key Result</h4>
                <p className="text-xl font-medium text-primary">{project.result}</p>
              </div>
            </div>
          </div>

          <div className="space-y-8">
            <h3 className="text-3xl font-bold mb-8">Project Gallery</h3>
            <div className="grid md:grid-cols-2 gap-8">
              {project.gallery && project.gallery.map((img: string, i: number) => (
                <div key={i} className="rounded-2xl overflow-hidden border border-border/50 shadow-md">
                  <img src={img} alt={`${project.title} gallery ${i + 1}`} className="w-full h-auto aspect-[4/3] object-cover" />
                </div>
              ))}
            </div>
          </div>
          
          <div className="mt-24 bg-secondary/30 rounded-3xl p-12 text-center border border-border/50">
            <h3 className="text-3xl font-bold mb-6">Want to build something similar?</h3>
            <Link to="/contact" className="inline-flex items-center justify-center h-12 px-8 rounded-full bg-primary text-primary-foreground font-medium hover:scale-105 transition-transform">
              Let's Talk
            </Link>
          </div>
        </motion.div>
      </div>
    </main>
  )
}
