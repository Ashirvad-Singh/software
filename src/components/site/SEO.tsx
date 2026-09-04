import { useEffect } from "react";

interface SEOProps {
  title?: string;
  description?: string;
  keywords?: string;
  image?: string;
}

export default function SEO({
  title = "Adat Soft Solutions | Web, Mobile App & AI Development Agency",
  description = "Adat Soft Solutions is a global tech agency building scalable, modern, and high-performance websites and mobile applications.",
  keywords = "web development, mobile app development, software agency, custom software, UI UX design, AI development",
  image = "/adat_hero_ui.png"
}: SEOProps) {
  useEffect(() => {
    // Update Title
    document.title = title.includes("Adat") ? title : `${title} | Adat Soft Solutions`;

    // Update Meta Description
    let metaDescription = document.querySelector('meta[name="description"]');
    if (metaDescription) {
      metaDescription.setAttribute("content", description);
    } else {
      metaDescription = document.createElement("meta");
      metaDescription.setAttribute("name", "description");
      metaDescription.setAttribute("content", description);
      document.head.appendChild(metaDescription);
    }

    // Update Meta Keywords
    let metaKeywords = document.querySelector('meta[name="keywords"]');
    if (metaKeywords) {
      metaKeywords.setAttribute("content", keywords);
    } else {
      metaKeywords = document.createElement("meta");
      metaKeywords.setAttribute("name", "keywords");
      metaKeywords.setAttribute("content", keywords);
      document.head.appendChild(metaKeywords);
    }

    // Update Open Graph (og:title, og:description, og:image)
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

    setOgMeta("og:title", title);
    setOgMeta("og:description", description);
    setOgMeta("og:image", image);
    setOgMeta("og:type", "website");
  }, [title, description, keywords, image]);

  return null;
}
