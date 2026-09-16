import { useEffect } from "react";

interface SEOProps {
  title?: string;
  description?: string;
  keywords?: string;
  image?: string;
  canonicalUrl?: string;
  jsonLd?: object;
}

export default function SEO({
  title = "Adat Soft Solutions | Web, Mobile App & AI Development Agency",
  description = "Adat Soft Solutions is a premier digital tech agency building high-performance web applications, custom mobile apps, enterprise AI platforms, and cloud infrastructure.",
  keywords = "Adat Soft Solutions, Web Development Agency, Mobile App Development, Enterprise AI, React Development, Next.js Agency, Flutter Apps, Cloud DevOps",
  image = "/adat_hero_ui.png",
  canonicalUrl,
  jsonLd,
}: SEOProps) {
  useEffect(() => {
    // 1. Update Document Title
    const fullTitle = title.includes("Adat") ? title : `${title} | Adat Soft Solutions`;
    document.title = fullTitle;

    // 2. Update Meta Description
    let metaDescription = document.querySelector('meta[name="description"]');
    if (metaDescription) {
      metaDescription.setAttribute("content", description);
    } else {
      metaDescription = document.createElement("meta");
      metaDescription.setAttribute("name", "description");
      metaDescription.setAttribute("content", description);
      document.head.appendChild(metaDescription);
    }

    // 3. Update Meta Keywords
    let metaKeywords = document.querySelector('meta[name="keywords"]');
    if (metaKeywords) {
      metaKeywords.setAttribute("content", keywords);
    } else {
      metaKeywords = document.createElement("meta");
      metaKeywords.setAttribute("name", "keywords");
      metaKeywords.setAttribute("content", keywords);
      document.head.appendChild(metaKeywords);
    }

    // 4. Set Robots tag to ensure Google Indexing
    let metaRobots = document.querySelector('meta[name="robots"]');
    if (!metaRobots) {
      metaRobots = document.createElement("meta");
      metaRobots.setAttribute("name", "robots");
      metaRobots.setAttribute("content", "index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1");
      document.head.appendChild(metaRobots);
    }

    // 5. Update Open Graph Meta Tags
    const setOgMeta = (property: string, content: string) => {
      let el = document.querySelector(`meta[property="${property}"]`);
      if (el) {
        el.setAttribute("content", content);
      } else {
        el = document.createElement("meta");
        el.setAttribute("property", property);
        el.setAttribute("content", content);
        document.head.appendChild(el);
      }
    };

    const currentHref = canonicalUrl || window.location.href;
    setOgMeta("og:title", fullTitle);
    setOgMeta("og:description", description);
    setOgMeta("og:image", image);
    setOgMeta("og:url", currentHref);
    setOgMeta("og:type", "website");

    // 6. Set Canonical Tag for SEO
    let canonicalTag = document.querySelector('link[rel="canonical"]');
    if (canonicalTag) {
      canonicalTag.setAttribute("href", currentHref);
    } else {
      canonicalTag = document.createElement("link");
      canonicalTag.setAttribute("rel", "canonical");
      canonicalTag.setAttribute("href", currentHref);
      document.head.appendChild(canonicalTag);
    }

    // 7. Inject JSON-LD Schema Markup
    const defaultSchema = {
      "@context": "https://schema.org",
      "@type": "Organization",
      name: "Adat Soft Solutions",
      url: "https://www.adatsolutions.com/",
      logo: "https://www.adatsolutions.com/adat-logo.png",
      description: description,
      contactPoint: {
        "@type": "ContactPoint",
        contactType: "customer service",
        email: "info@adatsolutions.com",
        availableLanguage: ["English", "Hindi"],
      },
      sameAs: [
        "https://github.com/Ashirvad-Singh",
        "https://linkedin.com",
        "https://twitter.com",
      ],
    };

    let scriptTag = document.querySelector("#json-ld-schema") as HTMLScriptElement;
    if (!scriptTag) {
      scriptTag = document.createElement("script");
      scriptTag.id = "json-ld-schema";
      scriptTag.type = "application/ld+json";
      document.head.appendChild(scriptTag);
    }
    scriptTag.textContent = JSON.stringify(jsonLd || defaultSchema);
  }, [title, description, keywords, image, canonicalUrl, jsonLd]);

  return null;
}
