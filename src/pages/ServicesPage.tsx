import HomeServicesSection from "@/components/site/HomeServicesSection";
import SubBanner from "@/components/site/SubBanner";

export default function ServicesPage() {
  return (
    <main className="min-h-[80vh] flex flex-col justify-center bg-white dark:bg-neutral-950 pb-16">
      <SubBanner
        badge="What We Do"
        title="Our"
        highlightTitle="Services"
        subtitle="From full-stack web applications to cross-platform mobile apps, explore our end-to-end digital solutions."
      />
      <HomeServicesSection showAll hideHeader />
    </main>
  );
}
