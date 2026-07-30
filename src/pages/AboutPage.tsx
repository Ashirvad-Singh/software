import AboutSection from "@/components/site/AboutSection"
import SubBanner from "@/components/site/SubBanner"

export default function AboutPage() {
  return (
    <main className="bg-background pb-16">
      <SubBanner
        badge="Who We Are"
        title="About"
        highlightTitle="Adat Soft Solutions"
        subtitle="We connect global businesses with cutting-edge web & mobile technology, empowering brands to scale and succeed."
      />
      <AboutSection hideHeader />
    </main>
  )
}
