import { ArrowRight, ArrowUpRight, Globe2, Check } from "lucide-react";
import { Link } from "react-router-dom";
import { LayoutTextFlip } from "@/components/ui/layout-text-flip";

export default function WebsiteHero() {
  return (
    <div className="website-hero">
      <div className="website-hero-label">
        <span /> WEBSITES THAT MEAN BUSINESS
      </div>
      <h1 className="flex flex-col md:flex-row items-center justify-center text-center whitespace-normal md:whitespace-nowrap">
        Built to stand out
        <span className="mt-2 md:mt-0 md:ml-4">
          <LayoutTextFlip
            text=""
            words={[
              "Designed to convert.",
              "Engineered to scale.",
              "Made to perform.",
              "Ready for what's next.",
            ]}
            wordsClassName="border-none bg-transparent shadow-none ring-0 drop-shadow-none text-[#0284c7] font-semibold px-0 py-0 text-inherit"
            duration={2600}
          />
        </span>
      </h1>

      <p className="website-hero-description">
        From a bold first impression to a seamless checkout.
        <br className="hidden sm:block" /> We design websites and online stores
        that work for your business.
      </p>
      <div className="website-hero-actions">
        <Link className="site-button" to="/contact">
          Let’s build your website <ArrowRight size={17} />
        </Link>
        <Link className="website-work-link" to="/work">
          Explore our work <ArrowUpRight size={18} />
        </Link>
      </div>

      <div className="website-stage" aria-hidden="true">
        <div className="website-orbit" />
        <div className="website-mini website-mini-left">
          <div className="website-window-bar">
            <span className="website-window-dots">● ● ●</span>
            <span>Brand experience</span>
          </div>
          <div className="website-brand-preview">
            <span className="website-preview-wordmark">FORM & FIELD</span>
            <strong>
              Less ordinary.
              <br />
              More you.
            </strong>
            <div className="website-sculpture" />
            <span className="website-preview-link">
              Discover the collection ↗
            </span>
          </div>
        </div>
        <div className="website-main-preview">
          <div className="website-window-bar">
            <span className="website-window-dots">● ● ●</span>
            <span>
              <Globe2 size={11} /> Your next website
            </span>
            <span>↗</span>
          </div>
          <div className="website-main-content">
            <div className="website-preview-nav">
              <b>
                studio<span>.</span>
              </b>
              <span>About &nbsp; Work &nbsp; Contact</span>
            </div>
            <div className="website-preview-body">
              <div>
                <small>MAKE ROOM FOR WHAT’S NEXT</small>
                <strong>
                  Good ideas.
                  <br />
                  <em>Beautifully built.</em>
                </strong>
                <span className="website-preview-cta">
                  Explore possibilities ↗
                </span>
              </div>
              <div className="website-art">
                <div />
                <div />
                <div />
              </div>
            </div>
          </div>
        </div>
        <div className="website-mini website-mini-right">
          <div className="website-window-bar">
            <span className="website-window-dots">● ● ●</span>
            <span>Shopping, simplified</span>
          </div>
          <div className="website-store-preview">
            <span className="website-preview-wordmark">
              everyday essentials
            </span>
            <div className="website-products">
              <div className="website-product-one" />
              <div className="website-product-two" />
            </div>
            <div className="website-store-caption">
              <span>Made for your everyday.</span>
              <b>↗</b>
            </div>
          </div>
        </div>
        <div className="website-detail-pill">
          <Check size={14} /> Thoughtfully designed. Ready to grow.
        </div>
      </div>
    </div>
  );
}
