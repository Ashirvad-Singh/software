import { useEffect, useRef } from "react"
import gsap from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import { Search, PenTool, Code, CheckSquare, Rocket, HeadphonesIcon } from "lucide-react"
import { motion } from "framer-motion"

gsap.registerPlugin(ScrollTrigger)

const steps = [
  {
    icon: <Search className="w-6 h-6" />,
    title: "Discovery & Requirements",
    description: "We start by understanding your business goals, target audience, and project requirements in detail.",
  },
  {
    icon: <PenTool className="w-6 h-6" />,
    title: "Planning & Design",
    description: "Creating wireframes, UI/UX designs, and technical architecture to lay a solid foundation.",
  },
  {
    icon: <Code className="w-6 h-6" />,
    title: "Development",
    description: "Writing clean, scalable code to bring the designs to life using modern technologies.",
  },
  {
    icon: <CheckSquare className="w-6 h-6" />,
    title: "Testing & QA",
    description: "Rigorous testing across devices and browsers to ensure a bug-free experience.",
  },
  {
    icon: <Rocket className="w-6 h-6" />,
    title: "Deployment",
    description: "Launching your product to the world with proper CI/CD pipelines and server setup.",
  },
  {
    icon: <HeadphonesIcon className="w-6 h-6" />,
    title: "Support & Maintenance",
    description: "Providing ongoing support, updates, and optimization to keep your solution running smoothly.",
  },
]

export default function ProcessTimeline() {
  const containerRef = useRef<HTMLDivElement>(null)
  const lineRef = useRef<HTMLDivElement>(null)
  const stepRefs = useRef<(HTMLDivElement | null)[]>([])

  useEffect(() => {
    if (!containerRef.current || !lineRef.current) return

    const timeline = gsap.timeline({
      scrollTrigger: {
        trigger: containerRef.current,
        start: "top center",
        end: "bottom center",
        scrub: 1,
      },
    })

    timeline.to(lineRef.current, {
      height: "100%",
      ease: "none",
    })

    stepRefs.current.forEach((step, index) => {
      if (!step) return
      
      gsap.fromTo(
        step,
        { opacity: 0, x: index % 2 === 0 ? -50 : 50 },
        {
          opacity: 1,
          x: 0,
          duration: 1,
          ease: "power2.out",
          scrollTrigger: {
            trigger: step,
            start: "top 80%",
            end: "top 50%",
            scrub: true,
          },
        }
      )
    })

    return () => {
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill())
    }
  }, [])

  return (
    <section id="process" className="py-24 bg-background overflow-hidden">
      <div className="container mx-auto px-4 md:px-6">
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center max-w-3xl mx-auto mb-20"
        >
          <h2 className="text-sm font-bold text-primary tracking-widest uppercase mb-3">
            How We Work
          </h2>
          <h3 className="text-3xl md:text-5xl font-bold tracking-tighter mb-6">
            Our Proven Process
          </h3>
          <p className="text-muted-foreground text-lg">
            We follow an agile, transparent, and structured methodology to deliver high-quality websites and mobile apps on time.
          </p>
        </motion.div>

        <div className="relative max-w-4xl mx-auto" ref={containerRef}>
          {/* Background Line */}
          <div className="absolute left-4 md:left-1/2 top-0 bottom-0 w-0.5 bg-border -translate-x-1/2" />
          
          {/* Animated Fill Line */}
          <div 
            ref={lineRef} 
            className="absolute left-4 md:left-1/2 top-0 w-0.5 bg-primary -translate-x-1/2 h-0 origin-top" 
            style={{ boxShadow: "0 0 10px 2px rgba(59, 130, 246, 0.5)" }}
          />

          <div className="space-y-12 md:space-y-24 relative z-10 py-10">
            {steps.map((step, index) => {
              const isEven = index % 2 === 0
              return (
                <div 
                  key={step.title}
                  ref={(el) => { stepRefs.current[index] = el }}
                  className={`flex flex-col md:flex-row items-start md:items-center gap-6 md:gap-12 ${
                    isEven ? "md:flex-row-reverse text-left md:text-right" : "text-left"
                  }`}
                >
                  <div className="flex-1 w-full" />
                  
                  {/* Timeline Dot/Icon */}
                  <div className="absolute left-4 md:left-1/2 -translate-x-1/2 flex items-center justify-center w-12 h-12 rounded-full border-4 border-background bg-secondary text-primary shrink-0 z-10">
                    {step.icon}
                  </div>

                  <div className="flex-1 w-full pl-16 md:pl-0">
                    <div className="bg-secondary/30 p-6 rounded-xl border border-border/50 hover:border-primary/50 transition-colors">
                      <div className="text-sm font-bold text-primary mb-2">Step 0{index + 1}</div>
                      <h4 className="text-xl font-bold mb-3">{step.title}</h4>
                      <p className="text-muted-foreground">{step.description}</p>
                    </div>
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      </div>
    </section>
  )
}
