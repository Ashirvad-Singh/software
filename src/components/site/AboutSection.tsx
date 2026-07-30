import { motion } from "framer-motion"
import WorldMap from "@/components/ui/world-map"

export default function AboutSection({ hideHeader = false }: { hideHeader?: boolean }) {
  return (
    <section id="about" className="py-12 sm:py-16 md:py-20 lg:py-24 bg-background overflow-hidden w-full">
      <div className="container max-w-7xl mx-auto px-4 sm:px-6 md:px-8 text-center">
        {!hideHeader && (
          <>
            <motion.h2 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.5 }}
              className="text-sm font-bold text-primary tracking-widest uppercase mb-3"
            >
              About Us
            </motion.h2>
            <p className="font-bold text-2xl sm:text-3xl md:text-4xl lg:text-5xl dark:text-white text-black mb-4 sm:mb-6 tracking-tight">
              Delivering Excellence{" "}
              <span className="text-primary inline-block whitespace-nowrap">
                {"Worldwide".split("").map((word, idx) => (
                  <motion.span
                    key={idx}
                    className="inline-block"
                    initial={{ x: -10, opacity: 0 }}
                    whileInView={{ x: 0, opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: idx * 0.04 }}
                  >
                    {word}
                  </motion.span>
                ))}
              </span>
            </p>
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="text-sm sm:text-base text-muted-foreground max-w-2xl mx-auto mb-10 sm:mb-16"
            >
              At Adat Soft Solutions, we build websites and mobile apps that transcend borders. From startup MVPs to enterprise systems, we connect global businesses with cutting-edge technology.
            </motion.p>
          </>
        )}

        <WorldMap
          lineColor="var(--color-primary)"
          dots={[
            {
              start: { lat: 30.7046, lng: 76.7179, label: "Mohali, Punjab (HQ)" },
              end: { lat: 34.0522, lng: -118.2437, label: "Los Angeles, USA" },
            },
            {
              start: { lat: 30.7046, lng: 76.7179 },
              end: { lat: 51.5074, lng: -0.1278, label: "London, UK" },
            },
            {
              start: { lat: 30.7046, lng: 76.7179 },
              end: { lat: 52.5200, lng: 13.4050, label: "Berlin, Germany" },
            },
            {
              start: { lat: 30.7046, lng: 76.7179 },
              end: { lat: 40.7128, lng: -74.0060, label: "New York, USA" },
            },
            {
              start: { lat: 30.7046, lng: 76.7179 },
              end: { lat: -33.8688, lng: 151.2093, label: "Sydney, Australia" },
            },
            {
              start: { lat: 30.7046, lng: 76.7179 },
              end: { lat: 25.2048, lng: 55.2708, label: "Dubai, UAE" },
            },
            {
              start: { lat: 30.7046, lng: 76.7179 },
              end: { lat: 1.3521, lng: 103.8198, label: "Singapore" },
            },
          ]}
        />

        <motion.div 
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.7 }}
          className="mt-16 sm:mt-24 lg:mt-32 max-w-4xl mx-auto text-left"
        >
          <div className="flex flex-col md:flex-row items-center md:items-start gap-6 sm:gap-8 md:gap-10 bg-neutral-50 dark:bg-neutral-900 rounded-3xl p-4 sm:p-6 md:p-8 lg:p-12 border border-neutral-200 dark:border-neutral-800">
            <div className="shrink-0 relative">
              <div className="w-32 h-32 md:w-48 md:h-48 rounded-full overflow-hidden border-4 border-white shadow-xl relative z-10">
                <img 
                  src="https://images.unsplash.com/photo-1560250097-0b93528c311a?q=80&w=800&auto=format&fit=crop" 
                  alt="Founder" 
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="absolute -bottom-4 -right-4 w-24 h-24 bg-primary/20 rounded-full blur-2xl z-0"></div>
            </div>
            
            <div className="flex-1 text-center md:text-left">
              <h3 className="text-xl sm:text-2xl font-bold tracking-tight text-neutral-800 dark:text-neutral-100 mb-2">Message from the Founder</h3>
              <p className="text-sm sm:text-base font-medium text-neutral-600 dark:text-neutral-300 italic mb-6 leading-relaxed">
                "Our mission is simple: to build digital experiences that matter. We started Adat Soft Solutions with a vision to bridge the gap between complex technology and beautiful, user-centric design. Every line of code we write and every pixel we place is dedicated to helping your business grow globally with robust web and mobile applications."
              </p>
              <div>
                <p className="font-bold text-neutral-900 dark:text-white text-lg">Alex Mercer</p>
                <p className="text-primary font-medium">Founder & CEO</p>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Company Facts */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.7, delay: 0.2 }}
          className="mt-12 sm:mt-16 lg:mt-20 max-w-5xl mx-auto text-left"
        >
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 md:gap-8">
            <div className="bg-neutral-50 dark:bg-neutral-900 p-4 sm:p-5 md:p-6 lg:p-8 rounded-2xl border border-neutral-200 dark:border-neutral-800">
              <h4 className="text-sm font-bold text-muted-foreground uppercase mb-1">Founded</h4>
              <p className="text-xl font-bold text-primary">2017</p>
            </div>
            <div className="bg-neutral-50 dark:bg-neutral-900 p-4 sm:p-5 md:p-6 lg:p-8 rounded-2xl border border-neutral-200 dark:border-neutral-800">
              <h4 className="text-sm font-bold text-muted-foreground uppercase mb-1">Company Size</h4>
              <p className="text-xl font-bold text-primary">11-50 employees</p>
            </div>
            <div className="bg-neutral-50 dark:bg-neutral-900 p-4 sm:p-5 md:p-6 lg:p-8 rounded-2xl border border-neutral-200 dark:border-neutral-800">
              <h4 className="text-sm font-bold text-muted-foreground uppercase mb-1">Headquarters</h4>
              <p className="text-xl font-bold text-primary">Mohali, Punjab</p>
            </div>
            <div className="bg-neutral-50 dark:bg-neutral-900 p-4 sm:p-5 md:p-6 lg:p-8 rounded-2xl border border-neutral-200 dark:border-neutral-800">
              <h4 className="text-sm font-bold text-muted-foreground uppercase mb-1">Industry</h4>
              <p className="text-xl font-bold text-primary">Software Development</p>
            </div>
            <div className="bg-neutral-50 dark:bg-neutral-900 p-4 sm:p-5 md:p-6 lg:p-8 rounded-2xl border border-neutral-200 dark:border-neutral-800">
              <h4 className="text-sm font-bold text-muted-foreground uppercase mb-1">Type</h4>
              <p className="text-xl font-bold text-primary">Partnership</p>
            </div>
            <div className="bg-neutral-50 dark:bg-neutral-900 p-4 sm:p-5 md:p-6 lg:p-8 rounded-2xl border border-neutral-200 dark:border-neutral-800">
              <h4 className="text-sm font-bold text-muted-foreground uppercase mb-1">Website</h4>
              <a href="https://www.adatsolutions.com" target="_blank" rel="noopener noreferrer" className="text-xl font-bold text-sky-500 hover:underline">www.adatsolutions.com</a>
            </div>
          </div>
          <div className="mt-4 sm:mt-6 bg-neutral-50 dark:bg-neutral-900 p-4 sm:p-5 md:p-6 lg:p-8 rounded-2xl border border-neutral-200 dark:border-neutral-800">
            <h4 className="text-sm font-bold text-muted-foreground uppercase mb-2">Specialties</h4>
            <div className="flex flex-wrap gap-2">
              {["Web Development", "Design & UI", "Quality Assurance", "E-Commerce Systems", "Product Management"].map((spec) => (
                <span key={spec} className="px-4 py-2 bg-white dark:bg-neutral-800 rounded-full text-sm font-medium border border-neutral-200 dark:border-neutral-700 shadow-sm text-neutral-700 dark:text-neutral-300">
                  {spec}
                </span>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
