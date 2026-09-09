import AboutSection from "@/components/site/AboutSection"
import CoreValuesSection from "@/components/site/CoreValuesSection"
import ProcessTimeline from "@/components/site/ProcessTimeline"
import SubBanner from "@/components/site/SubBanner"

export default function AboutPage() {
  return (
    <main className="bg-background">
      <SubBanner
        badge="Who We Are"
        title="About"
        highlightTitle="Adat Soft Solutions"
        subtitle="We connect global businesses with cutting-edge web & mobile technology, empowering brands to scale and succeed."
      />
      <AboutSection hideHeader />
      <CoreValuesSection />
      <ProcessTimeline />
    </main>
  );
}
