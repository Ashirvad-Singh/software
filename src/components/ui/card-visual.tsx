import "./card-visual.css";

interface CardVisualProps {
  variant: number;
  title?: string;
}

function getCardIllustration(title: string, variant: number): { src: string; alt: string } {
  const norm = (title || "").toLowerCase();
  if (norm.includes("shopify")) {
    return { src: "/illustrations/shopify.jpg", alt: "Shopify Development 3D Illustration" };
  }
  if (norm.includes("woocommerce")) {
    return { src: "/illustrations/woocommerce.jpg", alt: "WooCommerce Development 3D Illustration" };
  }
  if (norm.includes("redesign")) {
    return { src: "/illustrations/store-redesign.jpg", alt: "Store Redesign & Optimization 3D Illustration" };
  }
  if (norm.includes("ecommerce") || norm.includes("e-commerce")) {
    return { src: "/illustrations/ecommerce.jpg", alt: "eCommerce Websites 3D Illustration" };
  }
  if (norm.includes("ui/ux") || norm.includes("design systems") || (variant === 0 && norm.includes("ui"))) {
    return { src: "/illustrations/uiux-design.jpg", alt: "UI/UX Design Studio 3D Illustration" };
  }
  if (norm.includes("research") || norm.includes("user")) {
    return { src: "/illustrations/user-research.jpg", alt: "User Research 3D Illustration" };
  }
  if (norm.includes("wireframe") || norm.includes("prototype")) {
    return { src: "/illustrations/wireframes.jpg", alt: "Wireframes and Prototypes 3D Illustration" };
  }

  // Fallbacks by variant index
  if (variant === 0) return { src: "/illustrations/ecommerce.jpg", alt: "eCommerce Websites" };
  if (variant === 1) return { src: "/illustrations/shopify.jpg", alt: "Shopify Development" };
  if (variant === 2) return { src: "/illustrations/woocommerce.jpg", alt: "WooCommerce Development" };
  if (variant === 3) return { src: "/illustrations/store-redesign.jpg", alt: "Store Redesign" };
  return { src: "/illustrations/ecommerce.jpg", alt: "Digital Solutions" };
}

function getCardBadge(title: string, variant: number): { label: string; colorClass?: string } {
  const norm = (title || "").toLowerCase();
  if (norm.includes("shopify")) return { label: "Shopify Plus", colorClass: "green" };
  if (norm.includes("woocommerce")) return { label: "WooCommerce Core", colorClass: "purple" };
  if (norm.includes("redesign")) return { label: "Conversion Lab", colorClass: "amber" };
  if (norm.includes("ecommerce")) return { label: "High-Perf Store", colorClass: "sky" };
  if (norm.includes("ui/ux")) return { label: "Design Engine", colorClass: "indigo" };
  if (norm.includes("research")) return { label: "Telemetry & Insights", colorClass: "purple" };
  if (norm.includes("wireframe")) return { label: "Interactive Prototype", colorClass: "cyan" };
  if (variant === 4 || norm.includes("launch")) return { label: "Next-Gen Launch", colorClass: "emerald" };
  return { label: "Digital Core", colorClass: "sky" };
}

export default function CardVisual({ variant, title = "" }: CardVisualProps) {
  const illustration = getCardIllustration(title, variant);

  return (
    <div className="svg-card-container">
      {/* High-Fidelity 3D Themed Illustration Frame */}
      <div className="card-illustration-frame">
        <img
          src={illustration.src}
          alt={illustration.alt}
          className="card-illustration-img"
          loading="lazy"
        />
        <div className="card-illustration-shine" />
      </div>
    </div>
  );
}
