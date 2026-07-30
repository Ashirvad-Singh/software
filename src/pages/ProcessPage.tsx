import ProcessTimeline from "@/components/site/ProcessTimeline"
import SubBanner from "@/components/site/SubBanner"

export default function ProcessPage() {
  return (
    <main className="bg-neutral-50 dark:bg-neutral-950 pb-16">
      <SubBanner
        badge="How We Work"
        title="Our"
        highlightTitle="Process"
        subtitle="A transparent, agile engineering workflow designed to deliver world-class digital products from concept to launch."
      />
      <ProcessTimeline hideHeader />
    </main>
  )
}
