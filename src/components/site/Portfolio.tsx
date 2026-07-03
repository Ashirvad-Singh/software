import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { ExternalLink, ArrowRight } from "lucide-react"

const projects = [
  {
    id: 1,
    title: "Global FinTech Platform",
    category: "Web",
    image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&q=80&w=1000",
    tags: ["React", "Node.js", "PostgreSQL"],
    result: "Increased transaction volume by 150%",
    featured: true,
  },
  {
    id: 2,
    title: "Healthcare Booking App",
    category: "App",
    image: "https://images.unsplash.com/photo-1576091160550-2173dba999ef?auto=format&fit=crop&q=80&w=1000",
    tags: ["Flutter", "Firebase"],
    result: "10k+ active daily users",
    featured: true,
  },
  {
    id: 3,
    title: "Luxury Fashion Store",
    category: "E-commerce",
    image: "https://images.unsplash.com/photo-1441986300917-64674bd600d8?auto=format&fit=crop&q=80&w=1000",
    tags: ["Shopify", "Tailwind CSS"],
    result: "30% higher conversion rate",
    featured: false,
  },
  {
    id: 4,
    title: "Logistics Dashboard",
    category: "Web",
    image: "https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?auto=format&fit=crop&q=80&w=1000",
    tags: ["Vue.js", "Express"],
    result: "Optimized route planning",
    featured: false,
  },
  {
    id: 5,
    title: "Fitness Tracker App",
    category: "App",
    image: "https://images.unsplash.com/photo-1594882645126-14020914d58d?auto=format&fit=crop&q=80&w=1000",
    tags: ["React Native", "Redux"],
    result: "4.8/5 App Store Rating",
    featured: false,
  },
  {
    id: 6,
    title: "B2B SaaS Portal",
    category: "Web",
    image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&q=80&w=1000",
    tags: ["Next.js", "Prisma"],
    result: "$2M+ processed monthly",
    featured: false,
  },
]

const categories = ["All", "Web", "App", "E-commerce"]

export default function Portfolio() {
  const [activeTab, setActiveTab] = useState("All")

  const filteredProjects = projects.filter(
    (project) => activeTab === "All" || project.category === activeTab
  )

  const featuredProjects = projects.filter(p => p.featured)

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

        {/* Featured Projects (Only show on 'All' tab) */}
        {activeTab === "All" && (
          <div className="grid md:grid-cols-2 gap-8 mb-16">
            {featuredProjects.map((project, index) => (
              <motion.div
                key={`featured-${project.id}`}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1, duration: 0.6 }}
                className="group relative rounded-2xl overflow-hidden border border-border/50 bg-secondary/20 aspect-[4/3] md:aspect-auto md:h-[500px]"
              >
                <img 
                  src={project.image} 
                  alt={project.title} 
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105 opacity-80 group-hover:opacity-100"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-background via-background/40 to-transparent opacity-80 group-hover:opacity-90 transition-opacity duration-300" />
                
                <div className="absolute inset-0 p-8 flex flex-col justify-end">
                  <div className="flex flex-wrap gap-2 mb-4">
                    {project.tags.map(tag => (
                      <span key={tag} className="px-3 py-1 bg-background/50 backdrop-blur-md rounded-full text-xs font-medium border border-border/50">
                        {tag}
                      </span>
                    ))}
                  </div>
                  <h4 className="text-3xl font-bold mb-2">{project.title}</h4>
                  <p className="text-primary font-medium mb-6">{project.result}</p>
                  
                  <a href="#" className="inline-flex items-center text-sm font-bold uppercase tracking-wider hover:text-primary transition-colors">
                    View Case Study <ArrowRight className="ml-2 w-4 h-4" />
                  </a>
                </div>
              </motion.div>
            ))}
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
                  <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <div className="bg-background/80 backdrop-blur-sm p-3 rounded-full">
                      <ExternalLink className="w-6 h-6 text-primary" />
                    </div>
                  </div>
                </div>
                <div className="p-6">
                  <div className="text-xs text-primary font-bold tracking-widest uppercase mb-2">
                    {project.category}
                  </div>
                  <h4 className="text-xl font-bold mb-2">{project.title}</h4>
                  <div className="flex flex-wrap gap-2">
                    {project.tags.slice(0,2).map(tag => (
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
