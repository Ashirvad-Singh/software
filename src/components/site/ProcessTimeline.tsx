import { motion } from "framer-motion"
import { Lightbulb, Search, Target, Star, Megaphone } from "lucide-react"

const steps = [
  {
    icon: <Lightbulb className="w-8 h-8 mb-4 mx-auto" strokeWidth={1.5} />,
    title: "Discovery",
    description: "We start by understanding your business goals, target audience, and project requirements.",
    color: "bg-[#9be1ad]",
    dotColor: "bg-[#4da968]", 
  },
  {
    icon: <Search className="w-8 h-8 mb-4 mx-auto" strokeWidth={1.5} />,
    title: "Planning & Design",
    description: "Creating wireframes, UI/UX designs, and solid technical architecture for a strong foundation.",
    color: "bg-[#fbdb71]",
    dotColor: "bg-[#e5a910]",
  },
  {
    icon: <Target className="w-8 h-8 mb-4 mx-auto" strokeWidth={1.5} />,
    title: "Development",
    description: "Writing clean, scalable code using modern technologies to bring designs to life.",
    color: "bg-[#a2b5f6]",
    dotColor: "bg-[#5a7bed]",
  },
  {
    icon: <Star className="w-8 h-8 mb-4 mx-auto" strokeWidth={1.5} />,
    title: "Testing & QA",
    description: "Rigorous testing across devices and browsers to ensure a flawless, bug-free experience.",
    color: "bg-[#9be1ad]",
    dotColor: "bg-[#4da968]",
  },
  {
    icon: <Megaphone className="w-8 h-8 mb-4 mx-auto" strokeWidth={1.5} />,
    title: "Launch & Support",
    description: "Deploying your product to the world and providing ongoing maintenance and updates.",
    color: "bg-[#fbdb71]",
    dotColor: "bg-[#e5a910]",
  },
]

const WavyLine = ({ count }: { count: number }) => {
  const step = 100 / count;
  let d = `M ${step/2} 5`; 
  for (let i = 0; i < count - 1; i++) {
    const nextDot = (i + 1.5) * step;
    const midPoint = (i + 1) * step;
    d += ` Q ${midPoint} 18, ${nextDot} 5`;
  }

  return (
    <svg className="absolute top-1/2 left-0 w-full h-16 -translate-y-[30%] z-0 overflow-visible" preserveAspectRatio="none" viewBox="0 0 100 20">
      <path d={d} fill="none" stroke="currentColor" strokeWidth="0.4" strokeDasharray="1.5,1.5" className="text-zinc-800 dark:text-zinc-400 opacity-60" />
    </svg>
  );
}

export default function ProcessTimeline({ hideHeader = false }: { hideHeader?: boolean }) {
  return (
    <section id="process" className="py-12 sm:py-16 md:py-20 lg:py-24 bg-background overflow-x-hidden">
      <div className="container mx-auto px-4 sm:px-6 md:px-8">
        {!hideHeader && (
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-sm font-bold text-primary tracking-widest uppercase mb-3">
              How We Work
            </h2>
            <h3 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold tracking-tighter mb-6 text-foreground">
              Our Process
            </h3>
          </div>
        )}

        <div className="relative max-w-6xl mx-auto pb-10">
          <div className="min-w-0 flex flex-col relative md:px-4">
            {/* Cards Row */}
            <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-5 w-full gap-4 sm:gap-6 xl:gap-4">
              {steps.map((step, index) => (
                <motion.div 
                  key={step.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className={`flex-1 flex flex-col items-center text-center p-4 sm:p-5 md:p-6 xl:p-5 rounded-t-2xl md:rounded-t-2xl xl:rounded-b-none rounded-b-2xl ${step.color} text-zinc-900 shadow-sm relative`}
                  style={{ clipPath: "none" }} // overriding for simpler structure on mobile if needed, or keeping it but adjusting
                >
                  <div className="hidden xl:block absolute bottom-0 left-0 w-full h-[30px] bg-background" style={{ clipPath: "polygon(0 100%, 100% 100%, 50% 0)" }}></div>
                  {step.icon}
                  <h4 className="font-bold text-[17px] mb-3">{step.title}</h4>
                  <p className="text-sm sm:text-base opacity-80 leading-relaxed font-medium">
                    {step.description}
                  </p>
                </motion.div>
              ))}
            </div>

            {/* Dots and Wavy Line Row */}
            <div className="hidden xl:flex relative w-full mt-8 h-12">
              <WavyLine count={steps.length} />
              {steps.map((step, index) => (
                <div key={index} className="flex-1 flex justify-center items-center">
                  <div className={`w-8 h-8 rounded-full ${step.dotColor} text-zinc-900 flex items-center justify-center font-bold text-sm shadow-md z-10 border-2 border-transparent`}>
                    {index + 1}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
