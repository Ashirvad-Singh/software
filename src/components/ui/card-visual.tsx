import ecommerceImage from "@/assets/hero/ecommerce.webp";
import shopifyImage from "@/assets/hero/shopify.webp";
import woocommerceImage from "@/assets/hero/woocommerce.webp";
import storeRedesignImage from "@/assets/hero/store-redesign.webp";
import uiuxImage from "@/assets/hero/uiux-design.webp";
import userResearchImage from "@/assets/hero/user-research.webp";
import wireframeImage from "@/assets/hero/wireframes-prototypes.webp";
import "./card-visual.css";

interface CardVisualProps {
  variant: number;
  title?: string;
  image?: string;
}

const defaultImages: Record<string, string> = {
  "eCommerce Websites": ecommerceImage,
  "Shopify Development": shopifyImage,
  "WooCommerce Development": woocommerceImage,
  "Store Redesign": storeRedesignImage,
  "UI/UX Design": uiuxImage,
  "User Research": userResearchImage,
  "Wireframes & Prototypes": wireframeImage,
};

export default function CardVisual({ variant, title, image }: CardVisualProps) {
  const imageSrc = image || (title ? defaultImages[title] : null);

  if (imageSrc) {
    return (
      <span className="card-visual card-visual-image-wrapper hero-service-image-wrap" aria-hidden="true">
        <img
          src={imageSrc}
          alt={title || "Service preview"}
          className="hero-service-image service-card-image"
          loading="lazy"
        />
      </span>
    );
  }

  return (
    <span className={`card-visual card-visual-${variant}`} aria-hidden="true">
      {variant === 3 && (
        <span className="visual-blocks">
          <i />
          <i />
          <i />
          <i />
        </span>
      )}
      {variant === 4 && (
        <span className="visual-launch">
          <span className="visual-orbit-ring" />
          <span className="visual-sphere" />
          <span className="visual-satellite" />
        </span>
      )}
    </span>
  );
}
