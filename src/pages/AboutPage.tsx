import AboutSection from "@/components/site/AboutSection"
import CoreValuesSection from "@/components/site/CoreValuesSection"
import InnerPageHero from "@/components/site/InnerPageHero"
import SEO from "@/components/site/SEO"

export default function AboutPage() {
  return (
    <main className="bg-background">
      <SEO
        title="About Us"
        description="Learn about Adat Soft Solutions, our engineering center, core values, leadership team, and our commitment to building world-class digital products."
      />
      <InnerPageHero
        eyebrow="ABOUT ADAT"
        title="Building Digital Experiences"
        highlightTitle="That Move Businesses Forward"
        description="We combine technology, strategy and creativity to build digital solutions designed for long-term growth."
        breadcrumbs={[
          { label: "Home", href: "/" },
          { label: "About" },
        ]}
      />
      <AboutSection />
      <CoreValuesSection />
    </main>
  );
}
