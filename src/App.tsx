import { lazy, Suspense } from "react";
import { FloatingShapes } from "@/components/ui/floating-shapes";
import { ErrorBoundary } from "@/components/ErrorBoundary";
import { Routes, Route, useLocation } from "react-router-dom";
import { Toaster } from "sonner";
import SiteMagneticButtons from "@/components/ui/site-magnetic-buttons";

import ScrollProgress from "@/components/site/ScrollProgress";
import Navbar from "@/components/site/Navbar";
import Footer from "@/components/site/Footer";
import WebsiteAssistant from "@/components/site/WebsiteAssistant";
import CTASection from "@/components/site/CTASection";
import { ThemeProvider } from "@/components/ThemeProvider";

import HomePage from "@/pages/HomePage";
import ScrollToTop from "@/components/ScrollToTop";
import ScrollToTopButton from "@/components/ui/ScrollToTopButton";
const ServicesPage = lazy(() => import("@/pages/ServicesPage"));
const TechnologiesPage = lazy(() => import("@/pages/TechnologiesPage"));
const TechnologyDetailPage = lazy(() => import("@/pages/TechnologyDetailPage"));
const ServiceDetailPage = lazy(() => import("@/pages/ServiceDetailPage"));
const WorkPage = lazy(() => import("@/pages/WorkPage"));
const ContentDetail = lazy(() => import("@/components/content/ContentDetail"));
const CaseStudiesPage = lazy(() => import("@/pages/CaseStudiesPage"));
const AboutPage = lazy(() => import("@/pages/AboutPage"));
const ContactPage = lazy(() => import("@/pages/ContactPage"));
const TeamPage = lazy(() => import("@/pages/TeamPage"));
const GalleryPage = lazy(() => import("@/pages/GalleryPage"));
const CareersPage = lazy(() => import("@/pages/CareersPage"));
const JobDetailPage = lazy(() => import("@/pages/JobDetailPage"));
const DashboardPage = lazy(() => import("@/pages/DashboardPage"));
const BlogPage = lazy(() => import("@/pages/BlogPage"));
const BlogPostPage = lazy(() => import("@/pages/BlogPostPage"));
const PrivacyPolicyPage = lazy(() => import("@/pages/PrivacyPolicyPage"));
const TermsOfServicePage = lazy(() => import("@/pages/TermsOfServicePage"));
const NotFoundPage = lazy(() => import("@/pages/NotFoundPage"));

function App() {
  const location = useLocation();
  const isDashboard = location.pathname.startsWith("/dashboard");

  return (
    <ErrorBoundary>
      <ThemeProvider defaultTheme="light" storageKey="vite-ui-theme">
        <div className={`${isDashboard ? "" : "public-site "}bg-background text-foreground min-h-screen selection:bg-primary/30 selection:text-primary flex flex-col relative`}>
          <ScrollToTop />
          <SiteMagneticButtons />

          {!isDashboard && <ScrollProgress />}
          {!isDashboard && <FloatingShapes />}
          {!isDashboard && <Navbar />}

          <div className="flex-1 relative z-10">
            <Suspense fallback={null}>
              <Routes>
                <Route path="/" element={<HomePage />} />
                <Route path="/services" element={<ServicesPage />} />
                <Route path="/technologies" element={<TechnologiesPage />} />
                <Route path="/technologies/:slug" element={<TechnologyDetailPage />} />
                <Route path="/services/:slug" element={<ServiceDetailPage />} />
                <Route path="/work" element={<WorkPage />} />
                <Route path="/projects" element={<WorkPage />} />
                <Route path="/projects/:slug" element={<ContentDetail key="projects" kind="projects" />} />
                <Route path="/work/:slug" element={<ContentDetail key="projects" kind="projects" />} />
                <Route path="/case-studies" element={<CaseStudiesPage />} />
                <Route
                  path="/case-studies/:slug"
                  element={<ContentDetail key="case_studies" kind="case_studies" />}
                />
                <Route path="/process" element={<AboutPage />} />
                <Route path="/about" element={<AboutPage />} />
                <Route path="/contact" element={<ContactPage />} />
                <Route path="/team" element={<TeamPage />} />
                <Route path="/gallery" element={<GalleryPage />} />
                <Route path="/careers" element={<CareersPage />} />
                <Route path="/careers/:id" element={<JobDetailPage />} />
                <Route path="/dashboard" element={<DashboardPage />} />
                <Route path="/blog" element={<BlogPage />} />
                <Route path="/blog/:slug" element={<BlogPostPage />} />
                <Route path="/privacy" element={<PrivacyPolicyPage />} />
                <Route path="/terms" element={<TermsOfServicePage />} />
                <Route path="*" element={<NotFoundPage />} />
              </Routes>
            </Suspense>
          </div>

          {!isDashboard && <CTASection />}
          {!isDashboard && <Footer />}
          {!isDashboard && <WebsiteAssistant />}
          {!isDashboard && <ScrollToTopButton />}

          <Toaster position="bottom-right" theme="system" />
        </div>
      </ThemeProvider>
    </ErrorBoundary>
  );
}

export default App;
