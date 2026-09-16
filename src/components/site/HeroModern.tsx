import { useCallback, useEffect, useState } from "react";
import { useReducedMotion } from "framer-motion";
import { Link } from "react-router-dom";
import { ArrowLeft, ArrowRight, Pause, Play, Globe2, ShoppingBag, Layers } from "lucide-react";
import useEmblaCarousel from "embla-carousel-react";
import { FloatingShapes } from "@/components/ui/floating-shapes";
import WebsiteHero from "./WebsiteHero";
import HeroServiceCard from "./HeroServiceCard";
import "./HeroModern.css";

const slides = [
  {
    eyebrow: "Web & Mobile Development",
    focus: "Built around your business",
    title: "Turning Ideas Into Intuitive Web and Mobile Solutions",
    highlight: "Mobile Solutions",
    intro: "Hi! We're ADAT Soft Solutions.",
    description: "We engineer performant websites, native & cross-platform mobile apps, and custom software. Share our passion for high-quality, scalable digital products that work for your business.",
    cards: ["Website Development", "Mobile App Development", "E-Commerce Stores", "CMS Solutions", "From idea to launch"],
    note: "End-to-end design, development, and cloud launch support for software built to stand out and scale.",
  },
  {
    eyebrow: "Shopify & WooCommerce",
    focus: "Built for better shopping",
    title: "Turn Your Store Into a Better Shopping Experience",
    highlight: "Shopping Experience",
    intro: "Let's build your online store.",
    description: "Launch or refresh your Shopify, WooCommerce, or custom store with thoughtful design, clear product catalogs, secure payment integrations, and a smooth checkout journey.",
    cards: ["eCommerce Websites", "Shopify Development", "WooCommerce Development", "Store Redesign", "Ready to sell online?"],
    note: "From product catalogs to payment and shipping setup, we bring every detail of your online store together.",
  },
  {
    eyebrow: "UI/UX & Dynamic Tech",
    focus: "Designed around your users",
    title: "Unleashing Innovation With Dynamic Technologies",
    highlight: "Dynamic Technologies",
    intro: "Beautiful interfaces. Clear journeys.",
    description: "We bring user needs and business goals together through research, intuitive interfaces, and interactive prototypes. From mobile apps to web platforms, we design experiences that feel natural to use.",
    cards: ["UI/UX Design", "User Research", "Wireframes & Prototypes", "Design Systems", "Let's design your experience"],
    note: "From understanding your users to testing details, we shape consistent, accessible software for your brand.",
    destinations: ["/services", "/services", "/services", "/services", "/contact"],
  },
];
const cardDescriptions = [
  ["Responsive websites shaped around your brand, with clear navigation and a strong foundation for growth.", "Custom Shopify storefronts with thoughtful product pages, easy checkout, and the integrations your store needs.", "Flexible WooCommerce stores with product catalogs, payment gateways, and shipping options tailored to your business.", "Easy-to-manage WordPress websites with custom layouts, responsive design, and room to grow."],
  ["Online stores designed to make browsing, choosing products, and checking out feel effortless.", "Shopify theme development and store setup that bring your brand to life across every shopping touchpoint.", "WooCommerce development for a shopping experience you can customize and manage with confidence.", "Refresh your store with clearer navigation, stronger product presentation, and a smoother purchase journey."],
  ["Intuitive interfaces that connect your business goals with what your users need.", "Understand your audience through research, journey mapping, and usability insights.", "Explore layouts and test interactive prototypes before moving into development.", "Reusable components and design guidelines that keep your digital experience consistent."],
];
const destinations = ["/services", "/services", "/services", "/services", "/contact"];

export default function HeroModern() {
  const reducedMotion = useReducedMotion();
  const [emblaRef, embla] = useEmblaCarousel({ loop: true, duration: reducedMotion ? 0 : 35 });
  const [selected, setSelected] = useState(0);
  const [paused, setPaused] = useState(false);
  const [hovered, setHovered] = useState(false);
  const [focused, setFocused] = useState(false);
  const syncSlide = useCallback(() => { if (embla) setSelected(embla.selectedScrollSnap()); }, [embla]);

  useEffect(() => {
    if (!embla) return;
    syncSlide();
    embla.on("select", syncSlide);
    return () => { embla.off("select", syncSlide); };
  }, [embla, syncSlide]);

  useEffect(() => {
    if (!embla || paused || hovered || focused || reducedMotion) return;
    const timer = window.setInterval(() => { if (!document.hidden) embla.scrollNext(); }, 7000);
    return () => window.clearInterval(timer);
  }, [embla, paused, hovered, focused, reducedMotion]);



  return (
    <section className={`adat-hero${selected === 0 ? " adat-hero-simple" : ""}`} aria-label="Discover ADAT" aria-roledescription="carousel"
      onMouseEnter={() => setHovered(true)} onMouseLeave={() => setHovered(false)}
      onFocusCapture={() => setFocused(true)}
      onBlurCapture={(event) => { if (!event.currentTarget.contains(event.relatedTarget)) setFocused(false); }}
      onKeyDown={(event) => {
        if (event.key === "ArrowLeft" || event.key === "ArrowRight") {
          event.preventDefault();
          setPaused(true);
          if (event.key === "ArrowLeft") embla?.scrollPrev(); else embla?.scrollNext();
        }
      }}>
      <FloatingShapes className="-z-10" />
      <div className="adat-hero-viewport" ref={emblaRef}>
        <div className="adat-hero-track">
          {[0, 1, 2].map((dataIndex, index) => {
            const slide = slides[dataIndex];
            return (
            <div className={`adat-hero-slide adat-slide-${index}`} key={slide.title} role="group" aria-roledescription="slide"
              aria-label={`${index + 1} of ${slides.length}`} aria-hidden={selected !== index} inert={selected !== index}>
              {index === 0 ? <WebsiteHero /> : <>
              <div className="adat-hero-copy">
                <p className="adat-hero-eyebrow">{slide.eyebrow} <span>{slide.focus}</span></p>
                {index === 0 ? <h1>{slide.title.slice(0, -slide.highlight.length)}<span className="adat-title-accent">{slide.highlight}</span></h1> : <h2 className="adat-hero-title">{slide.title.slice(0, -slide.highlight.length)}<span className="adat-title-accent">{slide.highlight}</span></h2>}
                <div className="adat-hero-intro">
                  <h2>{slide.intro}</h2>
                  <p>{slide.description}</p>
                  <Link className="adat-hero-cta site-button" to="/about">Learn more <ArrowRight size={15} /></Link>
                </div>
              </div>
              <div className={`adat-showcase adat-showcase-${index}`}>
                <div className="adat-showcase-bar">
                  {index === 0 ? <><span className="adat-browser-dots" aria-hidden="true"><i /><i /><i /></span><span><Globe2 size={14} /> Your next website</span><span className="adat-showcase-label">DESIGN · BUILD · LAUNCH</span></> : dataIndex === 1 ? <><span><ShoppingBag size={17} /> Your digital storefront</span><span className="adat-showcase-label">SHOPIFY / WOOCOMMERCE</span></> : <><span><Layers size={17} /> The design studio</span><span className="adat-showcase-label">RESEARCH → PROTOTYPE → DESIGN</span></>}
                </div>
                <div className="adat-hero-grid">
                {slide.cards.map((card, cardIndex) => (
                  <HeroServiceCard key={card} title={card} index={cardIndex} destination={(slide.destinations ?? destinations)[cardIndex]} description={cardIndex === 4 ? slide.note : cardDescriptions[dataIndex][cardIndex]} />
                ))}
                </div>
              </div>
              </>}
            </div>
          ); })}
        </div>
      </div>
      <div className="adat-hero-controls">
        <span className="adat-hero-count" aria-live="polite">0{selected + 1} <span>/ 0{slides.length}</span></span>
        <div className="adat-hero-dots">
          {slides.map((slide, index) => <button key={slide.title} aria-label={`Go to slide ${index + 1}`} aria-current={selected === index ? "true" : undefined} onClick={() => { setPaused(true); embla?.scrollTo(index); }} />)}
        </div>
        <div className="adat-hero-arrows">
          {!reducedMotion && <button className="site-button site-button-icon" aria-label={paused ? "Play slideshow" : "Pause slideshow"} onClick={() => setPaused(!paused)}>{paused ? <Play size={15} /> : <Pause size={15} />}</button>}
          <button className="site-button site-button-icon" aria-label="Previous slide" onClick={() => { setPaused(true); embla?.scrollPrev(); }}><ArrowLeft size={19} /></button>
          <button className="site-button site-button-icon" aria-label="Next slide" onClick={() => { setPaused(true); embla?.scrollNext(); }}><ArrowRight size={19} /></button>
        </div>
      </div>
    </section>
  );
}
