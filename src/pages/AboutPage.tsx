import AboutSection from "@/components/site/AboutSection"
import CoreValuesSection from "@/components/site/CoreValuesSection"
import InnerPageHero from "@/components/site/InnerPageHero"

export default function AboutPage() {
  return (
    <main className="bg-background">
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
