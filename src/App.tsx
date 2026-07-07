import { useEffect, useState } from "react"
import { Routes, Route, useLocation } from "react-router-dom"
import Lenis from "lenis"
import { Toaster } from "sonner"
import Cursor from "@/components/site/Cursor"
import ScrollProgress from "@/components/site/ScrollProgress"
import Navbar from "@/components/site/Navbar"
import Footer from "@/components/site/Footer"
import CTASection from "@/components/site/CTASection"
import { ThemeProvider } from "@/components/ThemeProvider"

import HomePage from "@/pages/HomePage"
import ScrollToTop from "@/components/ScrollToTop"
import ServicesPage from "@/pages/ServicesPage"
import ServiceDetailPage from "@/pages/ServiceDetailPage"
import WorkPage from "@/pages/WorkPage"
import ProjectDetailPage from "@/pages/ProjectDetailPage"
import ProcessPage from "@/pages/ProcessPage"
import AboutPage from "@/pages/AboutPage"
import ContactPage from "@/pages/ContactPage"
import TeamPage from "@/pages/TeamPage"
import GalleryPage from "@/pages/GalleryPage"
import CareersPage from "@/pages/CareersPage"
import JobDetailPage from "@/pages/JobDetailPage"
import DashboardPage from "@/pages/DashboardPage"
import BlogPage from "@/pages/BlogPage"
import BlogPostPage from "@/pages/BlogPostPage"
import NotFoundPage from "@/pages/NotFoundPage"
import { FloatingShapes } from "@/components/ui/floating-shapes"
import Preloader from "@/components/site/Preloader"
import { AnimatePresence, motion } from "framer-motion"

function App() {
  const location = useLocation()
  const isDashboard = location.pathname.startsWith("/dashboard")
  const [showPreloader, setShowPreloader] = useState(true)

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowPreloader(false)
    }, 3000)
    return () => clearTimeout(timer)
  }, [])

  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: "vertical",
      gestureOrientation: "vertical",
      smoothWheel: true,
      wheelMultiplier: 1,
      touchMultiplier: 2,
    })

    function raf(time: number) {
      lenis.raf(time)
      requestAnimationFrame(raf)
    }

    requestAnimationFrame(raf)

    return () => {
      lenis.destroy()
    }
  }, [])

  return (
    <ThemeProvider defaultTheme="light" storageKey="vite-ui-theme">
      <div className="bg-background text-foreground min-h-screen selection:bg-primary/30 selection:text-primary flex flex-col relative">
        <AnimatePresence mode="wait">
          {showPreloader && (
            <motion.div
              key="preloader"
              initial={{ y: 0 }}
              exit={{ y: "-100%" }}
              transition={{ duration: 1, ease: [0.785, 0.135, 0.15, 0.86] }}
              className="fixed inset-0 z-[1000000]"
            >
              <Preloader />
            </motion.div>
          )}
        </AnimatePresence>

        <ScrollToTop />
        <Cursor />
        <ScrollProgress />
        {!isDashboard && <FloatingShapes />}
        {!isDashboard && <Navbar />}
        
        <div className="flex-1 relative z-10">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/services" element={<ServicesPage />} />
            <Route path="/services/:slug" element={<ServiceDetailPage />} />
            <Route path="/work" element={<WorkPage />} />
            <Route path="/work/:slug" element={<ProjectDetailPage />} />
            <Route path="/process" element={<ProcessPage />} />
            <Route path="/about" element={<AboutPage />} />
            <Route path="/contact" element={<ContactPage />} />
            <Route path="/team" element={<TeamPage />} />
            <Route path="/gallery" element={<GalleryPage />} />
            <Route path="/careers" element={<CareersPage />} />
            <Route path="/careers/:id" element={<JobDetailPage />} />
            <Route path="/dashboard" element={<DashboardPage />} />
            <Route path="/blog" element={<BlogPage />} />
            <Route path="/blog/:slug" element={<BlogPostPage />} />
            <Route path="*" element={<NotFoundPage />} />
          </Routes>
        </div>

        {!isDashboard && <CTASection />}
        {!isDashboard && <Footer />}
        
        <Toaster position="bottom-right" theme="system" />
      </div>
    </ThemeProvider>
  )
}

export default App
