import { Link } from "react-router-dom"
import HeroScrollDemo from "@/components/container-scroll-animation-demo"
import { ImagesBadge } from "@/components/ui/images-badge"
import Testimonials from "@/components/site/Testimonials"
import ThreeDMarqueeDemo from "@/components/3d-marquee-demo"
import FeaturesSectionDemo from "@/components/ui/features-section-demo-3"
import StatsCounter from "@/components/site/StatsCounter"
import { ArrowRight, Code, Layout, Smartphone, ShoppingCart, ShoppingBag } from "lucide-react"
import { Button } from "@/components/ui/button"
import WorldMap from "@/components/ui/world-map"
import { motion } from "framer-motion"
import { 
  IconBrandReact, 
  IconBrandNextjs, 
  IconBrandVue, 
  IconBrandTailwind, 
  IconBrandTypescript,
  IconBrandFlutter,
  IconBrandSwift,
  IconBrandKotlin,
  IconBrandAws,
  IconBrandDocker,
  IconBrandFirebase,
  IconBrandNodejs,
  IconBrandWordpress,
  IconBrandWix,
  IconBrandWebflow
} from "@tabler/icons-react"

export default function HomePage() {
  return (
    <main>
      <HeroScrollDemo />
      
      <div className="flex w-full items-center justify-center pb-20 -mt-10 relative z-20">
        <ImagesBadge
          text="Explore Our Web & App Solutions"
          images={[
            "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&q=80&w=300",
            "https://images.unsplash.com/photo-1576091160550-2173dba999ef?auto=format&fit=crop&q=80&w=300",
            "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&q=80&w=300",
          ]}
          folderSize={{ width: 48, height: 36 }}
          teaserImageSize={{ width: 40, height: 28 }}
          hoverImageSize={{ width: 140, height: 108 }}
          hoverTranslateY={-110}
          hoverSpread={50}
        />
      </div>

      <StatsCounter />
      
      {/* Mini About Section */}
      <section className="py-24 bg-neutral-50">
        <div className="container mx-auto px-4 max-w-4xl text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-sm font-bold text-primary tracking-widest uppercase mb-3">Who We Are</h2>
            <h3 className="text-3xl md:text-4xl font-bold mb-6 text-neutral-900">Building Digital Experiences That Matter</h3>
            <p className="text-lg text-neutral-600 mb-12 leading-relaxed">
              Adat Soft Solutions is a premier digital agency specializing in cutting-edge web and mobile applications. We connect global businesses with modern technology to help them scale and succeed in the digital era.
            </p>
          </motion.div>
          
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="mb-12"
          >
            <WorldMap
              lineColor="var(--color-primary)"
              dots={[
                {
                  start: { lat: 28.6139, lng: 77.209, label: "New Delhi (HQ)" },
                  end: { lat: 34.0522, lng: -118.2437, label: "Los Angeles, USA" },
                },
                {
                  start: { lat: 28.6139, lng: 77.209 },
                  end: { lat: 51.5074, lng: -0.1278, label: "London, UK" },
                },
                {
                  start: { lat: 28.6139, lng: 77.209 },
                  end: { lat: 40.7128, lng: -74.0060, label: "New York, USA" },
                },
                {
                  start: { lat: 28.6139, lng: 77.209 },
                  end: { lat: -33.8688, lng: 151.2093, label: "Sydney, Australia" },
                },
                {
                  start: { lat: 28.6139, lng: 77.209 },
                  end: { lat: 25.2048, lng: 55.2708, label: "Dubai, UAE" },
                },
              ]}
            />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            <Button asChild variant="outline" size="lg" className="rounded-full border-neutral-300 hover:bg-neutral-100">
              <Link to="/about">
                Learn More About Us <ArrowRight className="ml-2 w-4 h-4" />
              </Link>
            </Button>
          </motion.div>
        </div>
      </section>

      <FeaturesSectionDemo />

      {/* Advanced Tech Stack Section (Light Mode) */}
      <section className="py-32 relative overflow-hidden bg-white border-t border-neutral-100">
        
        {/* SVG Grid Background */}
        <div className="absolute inset-0 pointer-events-none opacity-[0.03]" 
             style={{ backgroundImage: "radial-gradient(#000 1px, transparent 1px)", backgroundSize: "24px 24px" }}>
        </div>
        
        {/* Soft Linear Gradient */}
        <div className="absolute inset-0 bg-gradient-to-b from-blue-50/50 via-white to-white pointer-events-none"></div>

        <div className="container mx-auto px-4 max-w-7xl relative z-10">
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6 }}
            className="text-center mb-24"
          >
            <h2 className="text-sm font-bold text-primary tracking-widest uppercase mb-4">The Engine Room</h2>
            <h3 className="text-4xl md:text-5xl font-bold mb-6 text-neutral-900">
              Powered by Next-Gen Tech
            </h3>
            <p className="text-neutral-500 max-w-2xl mx-auto text-lg">
              We don't just write code. We architect scalable, future-proof digital ecosystems (websites and mobile apps) using the industry's most advanced tools and frameworks.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
            
            {/* Frontend Architecture */}
            <motion.div 
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="group relative p-8 md:p-10 rounded-[2rem] bg-white border border-neutral-200 shadow-sm hover:shadow-xl hover:border-primary/20 transition-all duration-300 overflow-hidden"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-blue-50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              
              <div className="relative z-10">
                <div className="w-14 h-14 rounded-2xl bg-neutral-50 border border-neutral-100 flex items-center justify-center mb-8 group-hover:bg-white group-hover:shadow-sm transition-all">
                  <Code className="w-7 h-7 text-blue-500" />
                </div>
                <h4 className="text-2xl font-bold mb-2 text-neutral-900">Frontend Architecture</h4>
                <p className="text-neutral-500 mb-10 text-sm leading-relaxed">Crafting lightning-fast, reactive, and accessible user interfaces that engage and convert.</p>
                
                <div className="grid grid-cols-3 gap-4">
                  <AdvancedTechBadge icon={IconBrandReact} name="React" hoverColor="group-hover:text-[#61DAFB]" />
                  <AdvancedTechBadge icon={IconBrandNextjs} name="Next.js" hoverColor="group-hover:text-black" />
                  <AdvancedTechBadge icon={IconBrandVue} name="Vue.js" hoverColor="group-hover:text-[#4FC08D]" />
                  <AdvancedTechBadge icon={IconBrandTailwind} name="Tailwind" hoverColor="group-hover:text-[#06B6D4]" />
                  <AdvancedTechBadge icon={IconBrandTypescript} name="TypeScript" hoverColor="group-hover:text-[#3178C6]" />
                </div>
              </div>
            </motion.div>

            {/* Mobile Ecosystem */}
            <motion.div 
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="group relative p-8 md:p-10 rounded-[2rem] bg-white border border-neutral-200 shadow-sm hover:shadow-xl hover:border-primary/20 transition-all duration-300 overflow-hidden"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-purple-50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              
              <div className="relative z-10">
                <div className="w-14 h-14 rounded-2xl bg-neutral-50 border border-neutral-100 flex items-center justify-center mb-8 group-hover:bg-white group-hover:shadow-sm transition-all">
                  <Smartphone className="w-7 h-7 text-purple-500" />
                </div>
                <h4 className="text-2xl font-bold mb-2 text-neutral-900">Mobile Ecosystem</h4>
                <p className="text-neutral-500 mb-10 text-sm leading-relaxed">Building native-grade iOS and Android experiences from a single robust codebase.</p>
                
                <div className="grid grid-cols-3 gap-4">
                  <AdvancedTechBadge icon={IconBrandFlutter} name="Flutter" hoverColor="group-hover:text-[#02569B]" />
                  <AdvancedTechBadge icon={IconBrandReact} name="React Native" hoverColor="group-hover:text-[#61DAFB]" />
                  <AdvancedTechBadge icon={IconBrandSwift} name="Swift" hoverColor="group-hover:text-[#F05138]" />
                  <AdvancedTechBadge icon={IconBrandKotlin} name="Kotlin" hoverColor="group-hover:text-[#7F52FF]" />
                </div>
              </div>
            </motion.div>

            {/* Cloud & Infrastructure */}
            <motion.div 
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="group relative p-8 md:p-10 rounded-[2rem] bg-white border border-neutral-200 shadow-sm hover:shadow-xl hover:border-primary/20 transition-all duration-300 overflow-hidden"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-orange-50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              
              <div className="relative z-10">
                <div className="w-14 h-14 rounded-2xl bg-neutral-50 border border-neutral-100 flex items-center justify-center mb-8 group-hover:bg-white group-hover:shadow-sm transition-all">
                  <Layout className="w-7 h-7 text-orange-500" />
                </div>
                <h4 className="text-2xl font-bold mb-2 text-neutral-900">Cloud & Backend</h4>
                <p className="text-neutral-500 mb-10 text-sm leading-relaxed">Architecting secure, auto-scaling backend infrastructure that handles millions of requests.</p>
                
                <div className="grid grid-cols-3 gap-4">
                  <AdvancedTechBadge icon={IconBrandAws} name="AWS" hoverColor="group-hover:text-[#FF9900]" />
                  <AdvancedTechBadge icon={IconBrandDocker} name="Docker" hoverColor="group-hover:text-[#2496ED]" />
                  <AdvancedTechBadge icon={IconBrandFirebase} name="Firebase" hoverColor="group-hover:text-[#FFCA28]" />
                  <AdvancedTechBadge icon={IconBrandNodejs} name="Node.js" hoverColor="group-hover:text-[#339933]" />
                </div>
              </div>
            </motion.div>

            {/* CMS & E-Commerce */}
            <motion.div 
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.5, delay: 0.4 }}
              className="group relative p-8 md:p-10 rounded-[2rem] bg-white border border-neutral-200 shadow-sm hover:shadow-xl hover:border-primary/20 transition-all duration-300 overflow-hidden"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-green-50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              
              <div className="relative z-10">
                <div className="w-14 h-14 rounded-2xl bg-neutral-50 border border-neutral-100 flex items-center justify-center mb-8 group-hover:bg-white group-hover:shadow-sm transition-all">
                  <ShoppingCart className="w-7 h-7 text-green-500" />
                </div>
                <h4 className="text-2xl font-bold mb-2 text-neutral-900">CMS & E-Commerce</h4>
                <p className="text-neutral-500 mb-10 text-sm leading-relaxed">Empowering businesses with robust content management and highly scalable online storefronts.</p>
                
                <div className="grid grid-cols-3 gap-4">
                  <AdvancedTechBadge icon={IconBrandWordpress} name="WordPress" hoverColor="group-hover:text-[#21759B]" />
                  <AdvancedTechBadge icon={ShoppingBag} name="Shopify" hoverColor="group-hover:text-[#95BF47]" />
                  <AdvancedTechBadge icon={IconBrandWix} name="Wix" hoverColor="group-hover:text-black" />
                  <AdvancedTechBadge icon={IconBrandWebflow} name="Webflow" hoverColor="group-hover:text-[#4353FF]" />
                </div>
              </div>
            </motion.div>

          </div>
        </div>
      </section>


      <ThreeDMarqueeDemo />
      <Testimonials />

    </main>
  )
}

function AdvancedTechBadge({ icon: Icon, name, hoverColor }: { icon: any, name: string, hoverColor: string }) {
  return (
    <div className={`flex flex-col items-center justify-center gap-2 p-4 rounded-xl bg-neutral-50/50 border border-neutral-100 hover:bg-white hover:shadow-sm hover:border-primary/30 transition-all duration-300 cursor-pointer group`}>
      <Icon className={`w-8 h-8 text-neutral-400 transition-colors duration-300 ${hoverColor} group-hover:scale-110`} stroke={1.5} />
      <span className="text-[11px] font-medium text-neutral-500 group-hover:text-neutral-900 transition-colors uppercase tracking-wider">{name}</span>
    </div>
  )
}
