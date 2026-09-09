import { lazy, Suspense } from "react";
import { Link } from "react-router-dom";
import HeroModern from "@/components/site/HeroModern";
import { FloatingShapes } from "@/components/ui/floating-shapes";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";

// Lazy loaded components for faster initial load

const WorldMap = lazy(() => import("@/components/ui/world-map"));
const IndustriesSection = lazy(
  () => import("@/components/site/IndustriesSection"),
);
const HomeServicesSection = lazy(
  () => import("@/components/site/HomeServicesSection"),
);
const ThreeDMarqueeDemo = lazy(() => import("@/components/3d-marquee-demo"));
const WhatSetsUsApart = lazy(() => import("@/components/site/WhatSetsUsApart"));
const Testimonials = lazy(() => import("@/components/site/Testimonials"));
const HomeCaseStudiesSection = lazy(
  () => import("@/components/site/HomeCaseStudiesSection"),
);
const HomeBlogSection = lazy(() => import("@/components/site/HomeBlogSection"));
const FaqSection = lazy(() => import("@/components/site/FaqSection"));
export default function HomePage() {
  return (
    <main>
      <HeroModern />

      {/* Mini About Section */}
      <section className="py-10 sm:py-14 md:py-20 lg:py-24 bg-neutral-50 relative overflow-hidden">
        <FloatingShapes />
        <div className="container mx-auto px-4 max-w-4xl text-center relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-sm font-bold text-primary tracking-widest uppercase mb-3">
              Who We Are
            </h2>
            <h3 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-4 md:mb-6 text-neutral-900">
              Building Digital Experiences That Matter
            </h3>
            <p className="text-sm sm:text-base md:text-lg text-neutral-600 mb-8 md:mb-12 leading-relaxed">
              Adat Soft Solutions is a premier digital agency specializing in
              cutting-edge web and mobile applications. We connect global
              businesses with modern technology to help them scale and succeed
              in the digital era.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="mb-12"
          >
            <Suspense
              fallback={
                <div className="h-[300px] w-full bg-neutral-100 animate-pulse rounded-3xl" />
              }
            >
              <WorldMap
                lineColor="var(--color-primary)"
                dots={[
                  {
                    start: {
                      lat: 28.6139,
                      lng: 77.209,
                      label: "New Delhi (HQ)",
                    },
                    end: {
                      lat: 34.0522,
                      lng: -118.2437,
                      label: "Los Angeles, USA",
                    },
                  },
                  {
                    start: { lat: 28.6139, lng: 77.209 },
                    end: { lat: 51.5074, lng: -0.1278, label: "London, UK" },
                  },
                  {
                    start: { lat: 28.6139, lng: 77.209 },
                    end: { lat: 40.7128, lng: -74.006, label: "New York, USA" },
                  },
                  {
                    start: { lat: 28.6139, lng: 77.209 },
                    end: {
                      lat: -33.8688,
                      lng: 151.2093,
                      label: "Sydney, Australia",
                    },
                  },
                  {
                    start: { lat: 28.6139, lng: 77.209 },
                    end: { lat: 25.2048, lng: 55.2708, label: "Dubai, UAE" },
                  },
                ]}
              />
            </Suspense>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            <Button
              asChild
              variant="outline"
              size="lg"
              className="rounded-full border-neutral-300 hover:bg-neutral-100"
            >
              <Link to="/about">
                Learn More About Us <ArrowRight className="ml-2 w-4 h-4" />
              </Link>
            </Button>
          </motion.div>
        </div>
      </section>

      <Suspense fallback={<div className="min-h-[680px]" />}>
        <HomeCaseStudiesSection />
      </Suspense>

      <Suspense fallback={<div className="min-h-[500px]" />}>
        <IndustriesSection />
        <HomeServicesSection />
        <ThreeDMarqueeDemo />
      </Suspense>

      <Suspense fallback={<div className="min-h-[500px]" />}>
        <WhatSetsUsApart />
        <Testimonials />
        <FaqSection />
        <HomeBlogSection />
      </Suspense>
    </main>
  );
}
