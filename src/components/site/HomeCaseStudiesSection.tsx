import ContentSkeleton from "@/components/content/ContentSkeleton";
import { useContent } from "@/lib/content/useContent";
import CaseStudyStack from "@/components/site/CaseStudyStack";

export default function HomeCaseStudiesSection() {
  const { entries, loading } = useContent("case_studies");
  const caseStudies = entries.slice(0, 5);
  if (loading) return <ContentSkeleton label="case studies" className="mx-auto max-w-7xl px-5 py-16" />;
  if (!caseStudies.length) return null;

  return (
    <CaseStudyStack
      cards={caseStudies.map((cs) => ({
        id: cs.id || cs.slug,
        image: cs.image,
        alt: cs.title,
        title: cs.title,
        category: cs.category || "Digital Product",
        client: cs.client || "Adat Client",
        challenge: cs.challenge || cs.description || "Solving complex digital challenges with scalable engineering.",
        solution: cs.solution || "Custom software engineered for high performance, reliability, and growth.",
        features: cs.features,
        result: cs.outcomes,
        slug: cs.slug,
        tags: cs.technologies,
      }))}
      badge="Selected Case Studies"
      title="Case Studies That Drive Growth"
      subtitle="Explore real client outcomes, engineering solutions, and digital products we built."
    />
  );
}
