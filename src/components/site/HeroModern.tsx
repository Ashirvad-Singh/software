import { useCallback, useEffect, useState } from "react";
import { useReducedMotion } from "framer-motion";
import { Link } from "react-router-dom";
import { ArrowLeft, ArrowRight, Pause, Play } from "lucide-react";
import useEmblaCarousel from "embla-carousel-react";
import { BackgroundBeams } from "@/components/ui/background-beams";
import HeroServiceCard from "./HeroServiceCard";
import "./HeroModern.css";

const slides = [
  {
    eyebrow: "Website Design & Development",
    focus: "Built around your business",
    title: "Great Websites Do More Than Look Good",
    intro: "Hi! We're ADAT.",
    description: "We build beautiful, easy-to-use websites and online stores with Shopify, WooCommerce, and WordPress. From your first website to a complete redesign, we help your business stand out online.",
    cards: ["Website Development", "Shopify Stores", "WooCommerce Stores", "WordPress Websites", "From idea to launch"],
    note: "Design, development, and launch support for a website that reflects your brand and works for your customers.",
  },
  {
    eyebrow: "Shopify & WooCommerce",
    focus: "Built for better shopping",
    title: "Turn Your Store Into a Better Shopping Experience",
    intro: "Let's build your online store.",
    description: "Launch or refresh your Shopify or WooCommerce store with thoughtful design, clear product pages, and a smooth checkout. We help you create a shopping experience that keeps customers coming back.",
    cards: ["eCommerce Websites", "Shopify Development", "WooCommerce Development", "Store Redesign", "Ready to sell online?"],
    note: "From product catalogs to payment and shipping setup, we bring the details of your online store together.",
  },
  {
    eyebrow: "UI/UX Design",
    focus: "Designed around your users",
    title: "Thoughtful Design. Effortless Experiences.",
    intro: "Beautiful interfaces. Clear journeys.",
    description: "We bring user needs and business goals together through research, intuitive interfaces, and interactive prototypes. From websites to online stores, we design experiences that feel simple and natural to use.",
    cards: ["UI/UX Design", "User Research", "Wireframes & Prototypes", "Design Systems", "Let's design your experience"],
    note: "From understanding your users to testing the details, we help shape a consistent, accessible experience for your brand.",
    destinations: ["/services", "/services", "/services", "/services", "/contact"],
  },
];
const cardDescriptions = [
  ["Responsive websites shaped around your brand, with clear navigation and a strong foundation for growth.", "Custom Shopify storefronts with thoughtful product pages, easy checkout, and the integrations your store needs.", "Flexible WooCommerce stores with product catalogs, payment gateways, and shipping options tailored to your business.", "Easy-to-manage WordPress websites with custom layouts, responsive design, and room to grow."],
  ["Online stores designed to make browsing, choosing products, and checking out feel effortless.", "Shopify theme development and store setup that bring your brand to life across every shopping touchpoint.", "WooCommerce development for a shopping experience you can customize and manage with confidence.", "Refresh your store with clearer navigation, stronger product presentation, and a smoother purchase journey."],
  ["Intuitive interfaces that connect your business goals with what your users need.", "Understand your audience through research, journey mapping, and usability insights.", "Explore layouts and test interactive prototypes before moving into development.", "Reusable components and design guidelines that keep your digital experience consistent."],
];
const destinations = ["/services/web-development", "/services", "/services", "/services/web-development", "/contact"];

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
    <section className="adat-hero" aria-label="Discover ADAT" aria-roledescription="carousel"
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
      <BackgroundBeams className="-z-10" />
      <div className="adat-hero-viewport" ref={emblaRef}>
        <div className="adat-hero-track">
          {slides.map((slide, index) => (
            <div className="adat-hero-slide" key={slide.title} role="group" aria-roledescription="slide"
              aria-label={`${index + 1} of ${slides.length}`} aria-hidden={selected !== index} inert={selected !== index}>
              <div className="adat-hero-copy">
                <p className="adat-hero-eyebrow">{slide.eyebrow} <span>{slide.focus}</span></p>
                {index === 0 ? <h1>{slide.title}</h1> : <h2 className="adat-hero-title">{slide.title}</h2>}
                <div className="adat-hero-intro">
                  <h2>{slide.intro}</h2>
                  <p>{slide.description}</p>
                  <Link className="adat-hero-cta site-button" to="/about">Learn more <ArrowRight size={15} /></Link>
                </div>
              </div>
              <div className="adat-hero-grid">
                {slide.cards.map((card, cardIndex) => (
                  <HeroServiceCard key={card} title={card} index={cardIndex} destination={(slide.destinations ?? destinations)[cardIndex]} description={cardIndex === 4 ? slide.note : cardDescriptions[index][cardIndex]} />
                ))}
              </div>
            </div>
          ))}
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
