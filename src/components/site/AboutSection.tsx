import { motion } from "framer-motion";
import WorldMap from "@/components/ui/world-map";
import ProcessTimeline from "@/components/site/ProcessTimeline";

export default function AboutSection({ hideHeader = false }: { hideHeader?: boolean }) {
  return (
    <section id="about" className="py-10 md:py-16 bg-background overflow-hidden w-full">
      <div className="container max-w-7xl mx-auto px-4 sm:px-6 md:px-8 text-center">
        {!hideHeader && (
          <>
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="text-sm sm:text-base md:text-lg text-muted-foreground max-w-4xl mx-auto mb-10 sm:mb-16 leading-relaxed space-y-4 text-center md:text-center"
            >
              <p>
                ADAT Soft Solutions is an internationally-recognized brand for the development of sophisticated web &amp; mobile solutions. Our highly capable team, state-of-the-art processes and supportive infrastructure emphasize our dedication towards cutting-edge engineering solutions and stringent quality standards.
              </p>
              <p>
                We specialize in providing premium development and design services that fit the challenging requirements of our enterprise customers across various industries in the US, Canada, Australia and Europe.
              </p>
              <p>
                As the strategical partner for many SME clients we pride ourselves in assisting our clients throughout the full life cycle of their products.
              </p>
            </motion.div>
          </>
        )}

        {/* Office Infrastructure Showcase Image */}
        <motion.div
          initial={{ opacity: 0, scale: 0.96, y: 20 }}
          whileInView={{ opacity: 1, scale: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.6 }}
          className="relative max-w-5xl mx-auto my-8 sm:my-12 overflow-hidden rounded-2xl md:rounded-3xl border border-neutral-200 dark:border-neutral-800 shadow-xl group"
        >
          <img
            src="/office-workspace.jpg"
            alt="ADAT Soft Solutions Modern Office Infrastructure & Engineering Hub"
            className="w-full min-h-[250px] sm:min-h-[360px] max-h-[540px] object-cover transition-transform duration-700 group-hover:scale-[1.01]"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent pointer-events-none" />
          <div className="absolute bottom-0 inset-x-0 p-3.5 sm:p-6 md:p-8 text-left text-white z-10 flex flex-col justify-end">
            <span className="self-start inline-block px-2.5 py-0.5 sm:px-3 sm:py-1 bg-[#0284c7] text-white text-[10px] sm:text-xs font-bold tracking-wider uppercase rounded-full mb-1.5 sm:mb-2 shadow-md">
              Our Workspace &amp; Infrastructure
            </span>
            <h3 className="text-sm sm:text-xl md:text-3xl font-bold tracking-tight text-white drop-shadow-md leading-snug">
              State-of-the-Art Engineering Facility
            </h3>
            <p className="text-[11px] sm:text-sm md:text-base text-neutral-200 mt-1 max-w-2xl font-medium drop-shadow-sm leading-normal">
              Our Mohali engineering center where developers, designers, and strategists collaborate to engineer world-class web and mobile solutions.
            </p>
          </div>
        </motion.div>

        {/* Process Timeline Section (Placed directly below office image) */}
        <div className="my-10 sm:my-14 -mx-4 sm:-mx-6 md:-mx-8">
          <ProcessTimeline />
        </div>

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
          className="mt-12 sm:mt-16 max-w-4xl mx-auto text-left"
        >
          <div className="bg-neutral-50 dark:bg-neutral-900 rounded-3xl p-6 sm:p-8 md:p-12 border border-neutral-200 dark:border-neutral-800">
            <h3 className="text-xl sm:text-2xl font-bold tracking-tight text-neutral-800 dark:text-neutral-100 mb-3">Message from the Founder</h3>
            <p className="text-sm sm:text-base md:text-lg font-medium text-neutral-600 dark:text-neutral-300 italic mb-6 leading-relaxed">
              &quot;Our mission is simple: to build digital experiences that matter. We started ADAT Soft Solutions with a vision to bridge the gap between complex engineering and intuitive, user-centric design. Every line of code we write and every product we ship is dedicated to helping your business grow globally with robust web and mobile applications.&quot;
            </p>
            <div>
              <p className="font-bold text-neutral-900 dark:text-white text-lg">Vijay Vikram Singh</p>
              <p className="text-primary font-semibold text-sm">Founder &amp; CEO</p>
            </div>
          </div>
        </motion.div>

      </div>
    </section>
  )
}
