import { useParams, Link, useNavigate } from "react-router-dom"
import { motion } from "framer-motion"
import { ArrowLeft, CheckCircle2, Loader2 } from "lucide-react"
import { useState, useEffect } from "react"
import { collection, getDocs, query, where } from "firebase/firestore"
import { db } from "@/lib/firebase"
import { services as staticServices } from "@/data/services"

export default function ServiceDetailPage() {
  const { slug } = useParams<{ slug: string }>()
  const navigate = useNavigate()
  const [service, setService] = useState<any>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchService = async () => {
      try {
        const q = query(collection(db, "services"), where("slug", "==", slug));
        const snapshot = await getDocs(q);
        if (!snapshot.empty) {
          const docData = snapshot.docs[0].data();
          
          const benefits = docData.benefits ? docData.benefits.split('\n').filter((b: string) => b.trim().length > 0) : [];
          const process = docData.process ? docData.process.split('\n').filter((p: string) => p.trim().length > 0).map((p: string) => {
            const parts = p.split(':');
            return {
              step: parts[0]?.trim() || 'Step',
              detail: parts.slice(1).join(':').trim() || ''
            };
          }) : [];

          setService({ 
            id: snapshot.docs[0].id, 
            ...docData,
            benefits,
            process
          });
        } else {
          const staticSvc = staticServices.find(s => s.slug === slug);
          if (staticSvc) {
            setService(staticSvc);
          } else {
            setService(null);
          }
        }
      } catch (error) {
        console.error("Error fetching service details:", error);
        const staticSvc = staticServices.find(s => s.slug === slug);
        if (staticSvc) {
          setService(staticSvc);
        } else {
          setService(null);
        }
      } finally {
        setLoading(false);
      }
    };
    if (slug) fetchService();
  }, [slug]);

  if (loading) {
    return (
      <main className="bg-white dark:bg-neutral-950 min-h-screen flex items-center justify-center">
        <Loader2 className="w-8 h-8 animate-spin text-primary" />
      </main>
    );
  }

  if (!service) {
    return (
      <main className="bg-white dark:bg-neutral-950 min-h-screen flex flex-col items-center justify-center pt-24 pb-20">
        <h1 className="text-2xl font-bold mb-4">Service not found</h1>
        <button onClick={() => navigate("/services")} className="bg-primary text-primary-foreground px-4 py-2 rounded-md font-medium">Back to Services</button>
      </main>
    );
  }

  return (
    <main className="pt-32 md:pt-40 pb-20">
      <div className="container mx-auto px-4 max-w-4xl">
        <Link to="/services" className="inline-flex items-center text-sm font-medium text-muted-foreground hover:text-primary transition-colors mb-8">
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back to Services
        </Link>
        
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tighter mb-6">{service.title}</h1>
          <p className="text-xl text-muted-foreground mb-12">{service.description}</p>
          
          <div className="prose prose-lg dark:prose-invert max-w-none mb-16">
            <p className="text-lg leading-relaxed text-foreground/80">{service.longDescription}</p>
          </div>

          <div className="grid md:grid-cols-2 gap-12 mb-16">
            <div>
              <h3 className="text-2xl font-bold mb-6">Key Benefits</h3>
              <ul className="space-y-4">
                {service.benefits && service.benefits.length > 0 ? service.benefits.map((benefit: string, index: number) => (
                  <li key={index} className="flex items-start">
                    <CheckCircle2 className="w-6 h-6 text-primary mr-3 shrink-0" />
                    <span className="text-foreground/80">{benefit}</span>
                  </li>
                )) : null}
              </ul>
            </div>
            
            <div className="bg-secondary/20 p-8 rounded-2xl border border-border/50">
              <h3 className="text-2xl font-bold mb-6">Our Process</h3>
              <div className="space-y-6">
                {service.process && service.process.length > 0 ? (
                  service.process.map((step: any, index: number) => (
                    <div key={index} className="flex">
                      <div className="flex-shrink-0 mr-4">
                        <div className="w-8 h-8 rounded-full bg-primary/10 text-primary flex items-center justify-center font-bold">
                          {index + 1}
                        </div>
                      </div>
                      <div>
                        <h4 className="font-bold text-lg mb-1">{step.step}</h4>
                        <p className="text-muted-foreground text-sm">{step.detail}</p>
                      </div>
                    </div>
                  ))
                ) : (
                  <p className="text-muted-foreground">Process details coming soon.</p>
                )}
              </div>
            </div>
          </div>
          
          {service.features && (
            <div className="mb-16">
              <h3 className="text-2xl font-bold mb-6">Technologies & Capabilities</h3>
              <div className="flex flex-wrap gap-3">
                {(typeof service.features === 'string' ? service.features.split(',') : (Array.isArray(service.features) ? service.features : [])).map((feature: string, index: number) => {
                  const f = feature.trim();
                  if (!f) return null;
                  return (
                    <span key={index} className="px-4 py-2 bg-primary/10 text-primary rounded-full font-medium text-sm border border-primary/20">
                      {f}
                    </span>
                  );
                })}
              </div>
            </div>
          )}

          <div className="bg-primary text-primary-foreground rounded-2xl p-8 md:p-12 text-center">
            <h3 className="text-2xl md:text-3xl font-bold mb-4">Ready to get started?</h3>
            <p className="mb-8 opacity-90 max-w-xl mx-auto">Let's discuss how our {service.title} services can help you achieve your business goals.</p>
            <Link to="/contact" className="inline-flex items-center justify-center h-12 px-8 rounded-full bg-background text-foreground font-medium hover:scale-105 transition-transform">
              Contact Us Today
            </Link>
          </div>
        </motion.div>
      </div>
    </main>
  )
}
