import ContentSkeleton from "@/components/content/ContentSkeleton";
import { useParams, Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowRight, CheckCircle2, Users, Search, Target, Layout, PenTool, PlayCircle, Rocket } from "lucide-react";
import { useCatalog } from "@/lib/content/useCatalog";
import { listValue } from "@/lib/content/model";
import CatalogState from "@/components/content/CatalogState";
import InnerPageHero from "@/components/site/InnerPageHero";
import DetailThumbnail from "@/components/content/DetailThumbnail";

import SEO from "@/components/site/SEO";

export default function ServiceDetailPage() {
  const { slug } = useParams<{ slug: string }>();
  const navigate = useNavigate();
  const { entries, loading, error, retry } = useCatalog("services", slug);
  const record = entries[0];
  const service = record ? { ...record, benefits: listValue(record.benefits, /\n/),
    process: listValue(record.process, /\n/).map(line => {
      const [step, ...detail] = line.split(":");
      return { step, detail: detail.join(":").trim() };
    }) } : null;

  if (error) return <main className="min-h-screen pt-32"><CatalogState loading={false} error empty={false} label="this service" retry={retry} /></main>;

  if (loading) return <main className="min-h-screen"><ContentSkeleton variant="detail" label="service" /></main>;

  if (!service) {
    return (
      <main className="bg-white dark:bg-neutral-950 min-h-screen flex flex-col items-center justify-center pt-24 pb-20">
        <SEO title="Service Not Found" />
        <h1 className="text-2xl font-bold mb-4">Service not found</h1>
        <button onClick={() => navigate("/services")} className="site-button bg-primary text-primary-foreground px-4 py-2 rounded-md font-medium">Back to Services</button>
      </main>
    );
  }

  const featuredImage = service.featuredImageUrl || (slug === "web-development" ? "/images/web-development-landscape.png" : service.thumbnailUrl || "");

  return (
    <main className="bg-white dark:bg-neutral-950 min-h-screen">
      <SEO
        title={service.title}
        description={service.description}
      />
      <InnerPageHero
        eyebrow="SERVICE DETAIL"
        title="Engineering Services:"
        highlightTitle={service.title}
        description={service.description}
        breadcrumbs={[
          { label: "Home", href: "/" },
          { label: "Services", href: "/services" },
          { label: service.title },
        ]}
      />

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl py-10">
        <div className="prose prose-base dark:prose-invert max-w-none mb-6 sm:mb-10">
          <p className="text-base leading-relaxed text-foreground/80">{service.longDescription}</p>
        </div>
        {featuredImage && (
          <div className="mb-6 sm:mb-10">
            <DetailThumbnail
              src={featuredImage}
              alt={service.title}
              landscape={Boolean(service.featuredImageUrl) || slug === "web-development"}
            />
          </div>
        )}

        {/* Key Benefits */}
        <div className="mb-16">
          <div className="grid grid-cols-1 md:grid-cols-3 bg-gradient-to-br from-blue-50 to-white rounded-xl border border-blue-100 overflow-hidden shadow-xl shadow-blue-900/5">
            {service.benefits && service.benefits.length > 0 ? service.benefits.map((benefit: string, index: number) => {
              let title = benefit;
              let desc = "";
              if (benefit.includes(":")) {
                const parts = benefit.split(":");
                title = parts[0].trim();
                desc = parts.slice(1).join(":").trim();
              } else if (benefit.length > 30) {
                const words = benefit.split(" ");
                title = words.slice(0, 3).join(" ");
                desc = benefit;
              }
              
              const isRightEdge = (index + 1) % 3 === 0;
              const isLastRow = index >= Math.floor((service.benefits.length - 1) / 3) * 3;
              return (
                <div key={index} className={`group relative p-6 transition-colors duration-300 border-blue-100 ${!isRightEdge ? 'md:border-r' : ''} ${!isLastRow ? 'border-b' : 'border-b md:border-b-0'}`}>
                  <div className="absolute inset-0 bg-gradient-to-r from-blue-100/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />
                  <div className="absolute left-0 top-1/2 -translate-y-1/2 w-1 h-0 bg-primary group-hover:h-8 transition-all duration-300 rounded-r" />
                  <div className="relative z-10">
                    <CheckCircle2 className="w-5 h-5 text-primary/70 mb-4 group-hover:text-primary transition-colors" />
                    <h4 className="text-blue-950 font-bold text-base mb-1.5">{title}</h4>
                    {desc ? (
                      <p className="text-blue-900/70 text-xs sm:text-sm leading-relaxed font-medium">{desc}</p>
                    ) : (
                      <p className="text-blue-900/70 text-xs sm:text-sm leading-relaxed font-medium">{benefit}</p>
                    )}
                  </div>
                </div>
              );
            }) : null}
          </div>
        </div>
      </div>

      <div className="mb-20 max-w-6xl mx-auto px-4 lg:px-8 mt-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-14">
          {/* Left Column - Sticky Content */}
          <div className="relative">
            <div className="sticky top-28">
              <span className="inline-block px-3.5 py-1 rounded-full bg-blue-50 text-blue-600 font-bold text-[10px] tracking-widest uppercase mb-4">
                Our Process
              </span>
              <h2 className="text-2xl md:text-3xl lg:text-4xl font-extrabold text-slate-900 leading-tight mb-3 tracking-tight">
                From Idea to <span className="text-primary">Impact</span>
              </h2>
              <p className="text-sm sm:text-base text-slate-600 mb-8 max-w-md leading-relaxed">
                A clear, strategic, and collaborative process to turn your vision into powerful digital solutions.
              </p>
              
              <div className="relative w-full max-w-md mx-auto xl:ml-0 mb-8 hidden md:block group">
                <div className="absolute inset-0 bg-blue-400/20 rounded-full blur-2xl scale-75 group-hover:scale-100 transition-transform duration-700 opacity-50"></div>
                <img 
                  src="/fd2c1894-96b3-45fc-83d8-ed158a766b0c.png" 
                  alt="Our Process Illustration" 
                  className="relative z-10 w-full h-auto max-h-[300px] object-contain drop-shadow-xl group-hover:-translate-y-1.5 transition-transform duration-500" 
                />
              </div>
              
              <div className="bg-slate-50/80 backdrop-blur-sm p-5 sm:p-6 rounded-2xl border border-slate-100 flex flex-col sm:flex-row items-center sm:items-start gap-4 mt-6 shadow-sm max-w-lg">
                <div className="bg-blue-100/50 p-3 rounded-xl text-blue-600 shrink-0">
                  <Users className="w-5 h-5" />
                </div>
                <div className="text-center sm:text-left flex-1">
                  <h4 className="font-bold text-slate-900 text-base mb-1">Let's Build Something Amazing Together</h4>
                  <p className="text-xs text-slate-500 leading-relaxed mb-4">Have a project in mind? Let's discuss how we can turn your ideas into impactful digital experiences.</p>
                  <Link to="/contact" className="inline-flex items-center justify-center gap-2 bg-primary text-white font-bold py-2.5 px-5 rounded-full text-xs shadow-md shadow-primary/20 hover:shadow-lg transition-all w-fit">
                    Start a Project <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                </div>
              </div>
            </div>
          </div>
          
          {/* Right Column - Animated Timeline */}
          <div className="relative pt-4">
            <div className="absolute top-12 bottom-12 left-[19px] sm:left-[27px] w-[2px] bg-slate-100" />
            
            <div className="space-y-6">
              {service.process && service.process.length > 0 ? (
                service.process.map((step: any, index: number) => {
                  const icons = [Search, Target, Layout, PenTool, PlayCircle, CheckCircle2, Rocket];
                  const StepIcon = icons[index % icons.length];
                  
                  return (
                    <motion.div 
                      key={index} 
                      initial={{ opacity: 0, x: 20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true, margin: "-50px" }}
                      transition={{ duration: 0.5, delay: index * 0.1 }}
                      className="relative flex gap-6 sm:gap-10 group"
                    >
                      <div className="relative z-10 flex-shrink-0 mt-6 bg-white py-2">
                        <div className="w-10 h-10 sm:w-14 sm:h-14 rounded-full bg-blue-50 text-blue-600 flex items-center justify-center font-bold text-sm sm:text-base border-4 border-white shadow-sm transition-transform duration-300 group-hover:scale-110">
                          {String(index + 1).padStart(2, '0')}
                        </div>
                        <div className="absolute top-1/2 left-full w-4 sm:w-6 h-[2px] bg-slate-100 -translate-y-1/2"></div>
                      </div>
                      
                      <div className="flex-1 bg-white p-6 sm:p-8 rounded-[2rem] shadow-sm border border-slate-100 hover:shadow-md transition-all duration-300 group-hover:-translate-y-1 flex items-start sm:items-center gap-6 cursor-default">
                        <div className="hidden sm:flex w-12 h-12 bg-blue-50/50 rounded-full items-center justify-center text-blue-500 shrink-0 border border-blue-100/50">
                          <StepIcon className="w-5 h-5" />
                        </div>
                        <div className="flex-1">
                          <h4 className="font-extrabold text-lg text-slate-900 mb-2 flex items-center gap-2">
                            {step.step}
                          </h4>
                          <p className="text-slate-500 text-sm leading-relaxed">{step.detail}</p>
                        </div>
                        <div className="hidden md:flex w-8 h-8 rounded-full bg-slate-50 items-center justify-center text-slate-400 shrink-0 group-hover:bg-blue-50 group-hover:text-blue-500 transition-colors">
                          <ArrowRight className="w-4 h-4" />
                        </div>
                      </div>
                    </motion.div>
                  );
                })
              ) : (
                <p className="text-muted-foreground">Process details coming soon.</p>
              )}
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 max-w-4xl pb-16">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
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

          <div className="bg-primary text-primary-foreground rounded-2xl p-6 sm:p-8 md:p-12 text-center">
            <h3 className="text-2xl md:text-3xl font-bold mb-4">Ready to get started?</h3>
            <p className="mb-8 opacity-90 max-w-xl mx-auto text-sm sm:text-base">Let's discuss how our {service.title} services can help you achieve your business goals.</p>
            <Link to="/contact" className="inline-flex items-center justify-center h-12 px-8 rounded-full bg-white text-primary font-bold hover:scale-105 hover:bg-neutral-50 transition-all shadow-md gap-2">
              Contact Us Today <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </motion.div>
      </div>
    </main>
  );
}
