import { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";

export default function GsapHeroBanner() {
  const container = useRef(null);

  useGSAP(() => {
    // Floating Nodes Animation
    gsap.to(".gsap-node", {
      y: "random(-30, 30)",
      x: "random(-30, 30)",
      duration: "random(2, 5)",
      repeat: -1,
      yoyo: true,
      ease: "sine.inOut",
      stagger: 0.1,
    });

    // Connecting Lines Opacity Pulse
    gsap.to(".gsap-line", {
      opacity: 0.1,
      duration: "random(1, 3)",
      repeat: -1,
      yoyo: true,
      ease: "power1.inOut",
    });

    // Title entrance
    gsap.from(".hero-element", {
      y: 40,
      opacity: 0,
      duration: 1,
      stagger: 0.15,
      ease: "power3.out",
      delay: 0.2,
    });
  }, { scope: container });

  return (
    <div ref={container} className="relative min-h-[95vh] w-full overflow-hidden bg-gradient-to-b from-blue-50/50 to-white flex items-center justify-center pt-24">
      
      {/* Background SVG Grid */}
      <svg className="absolute inset-0 w-full h-full opacity-[0.04]" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <pattern id="grid-pattern-hero" width="40" height="40" patternUnits="userSpaceOnUse">
            <path d="M 40 0 L 0 0 0 40" fill="none" stroke="currentColor" strokeWidth="1" />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#grid-pattern-hero)" />
      </svg>

      {/* Abstract Animated Nodes & Lines (SVG) */}
      <svg className="absolute inset-0 w-full h-full pointer-events-none z-0" preserveAspectRatio="none">
         <g className="text-primary/30" stroke="currentColor" strokeWidth="1.5">
            <line className="gsap-line" x1="10%" y1="20%" x2="40%" y2="50%" />
            <line className="gsap-line" x1="40%" y1="50%" x2="80%" y2="30%" />
            <line className="gsap-line" x1="40%" y1="50%" x2="70%" y2="80%" />
            <line className="gsap-line" x1="15%" y1="75%" x2="40%" y2="50%" />
            <line className="gsap-line" x1="80%" y1="30%" x2="85%" y2="60%" />
         </g>

         <g className="text-primary" fill="currentColor">
            <circle className="gsap-node opacity-60" cx="10%" cy="20%" r="6" />
            <circle className="gsap-node opacity-80" cx="40%" cy="50%" r="10" />
            <circle className="gsap-node opacity-60" cx="80%" cy="30%" r="8" />
            <circle className="gsap-node opacity-50" cx="70%" cy="80%" r="6" />
            <circle className="gsap-node opacity-70" cx="15%" cy="75%" r="7" />
            <circle className="gsap-node opacity-40" cx="85%" cy="60%" r="5" />
         </g>

         <g className="text-blue-400" fill="none" stroke="currentColor" strokeWidth="1">
            <circle className="gsap-node opacity-30" cx="80%" cy="30%" r="24" />
            <circle className="gsap-node opacity-40" cx="40%" cy="50%" r="20" />
            <circle className="gsap-node opacity-30" cx="10%" cy="20%" r="16" />
         </g>
      </svg>

      {/* Hero Content */}
      <div className="relative z-10 container mx-auto px-4 max-w-5xl text-center pb-20">
        <div className="hero-element inline-block mb-6 px-5 py-2 rounded-full border border-primary/20 bg-primary/5 text-primary text-sm font-bold tracking-wide uppercase">
          Welcome to the Future
        </div>
        <h1 className="hero-element text-5xl md:text-7xl font-extrabold tracking-tight text-neutral-900 mb-8 leading-tight">
          We Build <span className="text-primary">Scalable</span> <br className="hidden md:block"/> Digital Ecosystems
        </h1>
        <p className="hero-element text-xl text-neutral-600 mb-10 max-w-2xl mx-auto leading-relaxed">
          Empowering global businesses with advanced web, mobile, and cloud technology. Watch your ideas transform into reality.
        </p>
        <div className="hero-element flex flex-col sm:flex-row items-center justify-center gap-4">
          <Button asChild size="lg" className="rounded-full h-14 px-8 text-lg bg-primary hover:bg-primary/90 shadow-xl shadow-primary/20">
            <Link to="/contact">Start Your Project</Link>
          </Button>
          <Button asChild size="lg" variant="outline" className="rounded-full h-14 px-8 text-lg border-neutral-200 hover:bg-neutral-50">
            <Link to="/work">View Our Work</Link>
          </Button>
        </div>
      </div>
    </div>
  );
}
