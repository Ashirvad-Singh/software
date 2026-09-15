import { useState } from "react";
import { Link } from "react-router-dom";
import { ArrowRight, RotateCcw } from "lucide-react";
import CardVisual from "@/components/ui/card-visual";

export default function HeroServiceCard({ title, description, destination, index }: { title: string; description: string; destination: string; index: number }) {
  const [flipped, setFlipped] = useState(false);
  return <div className={`adat-flip-card adat-flip-card-${index}${flipped ? " is-flipped" : ""}`} onMouseLeave={() => setFlipped(false)} onBlur={(event) => { if (!event.currentTarget.contains(event.relatedTarget)) setFlipped(false); }} onKeyDown={(event) => { if (event.key === "Escape") setFlipped(false); }}>
    <div className="adat-flip-inner">
      <button type="button" className={`adat-hero-card adat-flip-front adat-hero-card-${index}`} onClick={() => setFlipped(true)} aria-label={`Show details about ${title}`} aria-expanded={flipped}>
        <span className="adat-card-heading">{title}</span>
        <CardVisual variant={index} />
        <span className="adat-hero-card-link">View details <ArrowRight size={16} /></span>
      </button>
      <div className={`adat-hero-card adat-flip-back adat-hero-card-${index}`}>
        <h3>{title}</h3>
        <p>{description}</p>
        <div className="adat-flip-actions">
          <button className="site-button site-button-icon" type="button" onClick={() => setFlipped(false)} aria-label={`Hide details about ${title}`}><RotateCcw size={16} /></button>
          <Link to={destination} className="adat-hero-card-link">{index === 4 ? "Let's talk" : "Explore services"} <ArrowRight size={16} /></Link>
        </div>
      </div>
    </div>
  </div>;
}
