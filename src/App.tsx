import { useEffect } from "react"
import { Routes, Route } from "react-router-dom"
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
import WorkPage from "@/pages/WorkPage"
import ProcessPage from "@/pages/ProcessPage"
import AboutPage from "@/pages/AboutPage"
import ContactPage from "@/pages/ContactPage"
import TeamPage from "@/pages/TeamPage"
import GalleryPage from "@/pages/GalleryPage"
import CareersPage from "@/pages/CareersPage"
import DashboardPage from "@/pages/DashboardPage"

function App() {
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
      <div className="bg-background text-foreground min-h-screen selection:bg-primary/30 selection:text-primary flex flex-col">
        <ScrollToTop />
        <Cursor />
        <ScrollProgress />
        <Navbar />
        
        <div className="flex-1">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/services" element={<ServicesPage />} />
            <Route path="/work" element={<WorkPage />} />
            <Route path="/process" element={<ProcessPage />} />
            <Route path="/about" element={<AboutPage />} />
            <Route path="/contact" element={<ContactPage />} />
            <Route path="/team" element={<TeamPage />} />
            <Route path="/gallery" element={<GalleryPage />} />
            <Route path="/careers" element={<CareersPage />} />
            <Route path="/dashboard" element={<DashboardPage />} />
          </Routes>
        </div>

        <CTASection />
        <Footer />
        
        <Toaster position="bottom-right" theme="system" />
      </div>
    </ThemeProvider>
  )
}

export default App
