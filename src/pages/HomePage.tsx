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
const ProductMarquee = lazy(() => import("@/components/site/ProductMarquee"));
const WhatSetsUsApart = lazy(() => import("@/components/site/WhatSetsUsApart"));
const Testimonials = lazy(() => import("@/components/site/Testimonials"));
const HomeCaseStudiesSection = lazy(
  () => import("@/components/site/HomeCaseStudiesSection"),
);
const HomeBlogSection = lazy(
  () => import("@/components/site/HomeBlogSection"),
);
const FaqSection = lazy(() => import("@/components/site/FaqSection"));
import SEO from "@/components/site/SEO";

export default function HomePage() {
  return (
    <main>
      <SEO
        title="Adat Soft Solutions | Web, Mobile App & AI Development Agency"
        description="Adat Soft Solutions is an internationally-recognized software engineering agency building custom web apps, mobile applications, enterprise AI, and cloud software solutions."
      />
      <HeroModern />

      {/* Mini About Section */}
      <section className="py-10 md:py-16 bg-neutral-50 relative overflow-hidden">
        <FloatingShapes />
        <div className="container mx-auto px-4 max-w-4xl text-center relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-xs sm:text-sm font-bold text-primary tracking-widest uppercase mb-4">
              ABOUT ADAT SOLUTIONS
            </h2>
            <p className="text-sm sm:text-base md:text-lg text-neutral-600 dark:text-neutral-300 mb-8 md:mb-12 leading-relaxed max-w-3xl mx-auto">
              ADAT Soft Solutions is an internationally-recognized brand for the
              development of sophisticated web &amp; mobile solutions. We
              specialize in providing premium development and design services
              that fit the challenging requirements of our enterprise customers
              across various industries in the US, Canada, Australia, and
              Europe.
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

      <Suspense fallback={<div className="min-h-[200px]" />}>
        <HomeCaseStudiesSection />
      </Suspense>

      <Suspense fallback={<div className="min-h-[200px]" />}>
        <IndustriesSection />
        <HomeServicesSection />
        <ProductMarquee />
      </Suspense>

      <Suspense fallback={<div className="min-h-[200px]" />}>
        <WhatSetsUsApart />
        <Testimonials />
        <FaqSection />
        <HomeBlogSection />
      </Suspense>
    </main>
  );
}
