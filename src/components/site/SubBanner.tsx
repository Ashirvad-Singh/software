import InnerPageHero, { type BreadcrumbItem } from "./InnerPageHero";

interface SubBannerProps {
  badge?: string;
  title: string;
  highlightTitle?: string;
  subtitle: string;
  breadcrumbs?: BreadcrumbItem[];
  backLink?: { to: string; label: string };
  className?: string;
}

export default function SubBanner({
  badge,
  title,
  highlightTitle,
  subtitle,
  breadcrumbs,
  backLink,
  className = "",
}: SubBannerProps) {
  const computedBreadcrumbs = breadcrumbs || [
    { label: "Home", href: "/" },
    { label: title },
  ];

  if (backLink && !breadcrumbs) {
    computedBreadcrumbs[0] = { label: backLink.label, href: backLink.to };
  }

  return (
    <InnerPageHero
      eyebrow={badge}
      title={title}
      highlightTitle={highlightTitle}
      description={subtitle}
      breadcrumbs={computedBreadcrumbs}
      className={className}
    />
  );
}
