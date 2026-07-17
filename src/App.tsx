import { useEffect } from "react"
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
import { lazy, Suspense } from "react"
import ScrollToTop from "@/components/ScrollToTop"
const ServicesPage = lazy(() => import("@/pages/ServicesPage"))
const ServiceDetailPage = lazy(() => import("@/pages/ServiceDetailPage"))
const WorkPage = lazy(() => import("@/pages/WorkPage"))
const ProjectDetailPage = lazy(() => import("@/pages/ProjectDetailPage"))
const ProcessPage = lazy(() => import("@/pages/ProcessPage"))
const AboutPage = lazy(() => import("@/pages/AboutPage"))
const ContactPage = lazy(() => import("@/pages/ContactPage"))
const TeamPage = lazy(() => import("@/pages/TeamPage"))
const GalleryPage = lazy(() => import("@/pages/GalleryPage"))
const CareersPage = lazy(() => import("@/pages/CareersPage"))
const JobDetailPage = lazy(() => import("@/pages/JobDetailPage"))
const DashboardPage = lazy(() => import("@/pages/DashboardPage"))
const BlogPage = lazy(() => import("@/pages/BlogPage"))
const BlogPostPage = lazy(() => import("@/pages/BlogPostPage"))
const NotFoundPage = lazy(() => import("@/pages/NotFoundPage"))
import { FloatingShapes } from "@/components/ui/floating-shapes"

function ReadyNotifier() {
  useEffect(() => {
    (window as any).__reactReady = true;
    if ((window as any).__loaderFinished && (window as any).__removeLoader) {
      (window as any).__removeLoader();
    }
  }, []);
  return null;
}

function App() {
  const location = useLocation()
  const isDashboard = location.pathname.startsWith("/dashboard")

  useEffect(() => {
    // Fallback safety
    setTimeout(() => {
      if ((window as any).__removeLoader) (window as any).__removeLoader();
    }, 5000);
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
        <ScrollToTop />
        <Cursor />
        <ScrollProgress />
        {!isDashboard && <FloatingShapes />}
        {!isDashboard && <Navbar />}
        
        <div className="flex-1 relative z-10">
          <Suspense fallback={<div className="h-screen w-full bg-background relative z-50"></div>}>
            <ReadyNotifier />
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
          </Suspense>
        </div>

        {!isDashboard && <CTASection />}
        {!isDashboard && <Footer />}
        
        <Toaster position="bottom-right" theme="system" />
      </div>
    </ThemeProvider>
  )
}

export default App
