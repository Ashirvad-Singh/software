import { useSwipe } from "@/hooks/useSwipe";
import { useEffect, useRef, useState } from "react";
import { motion, useReducedMotion, useMotionValue, useInView, animate } from "framer-motion";
import { Link } from "react-router-dom";
import { ArrowUpRight, ChevronLeft, ChevronRight, Pause, Play, Heart, DollarSign, Utensils, ShoppingCart, Layers, GraduationCap, Truck, House, Share2, Plane, Sprout, Shield } from "lucide-react";

const industries = [
  {
    name: "Healthcare",
    icon: Heart,
    image: "https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?auto=format&fit=crop&q=85&w=1000",
    description: "Connected care, patient platforms, and better digital health experiences.",
  },
  {
    name: "Finance",
    icon: DollarSign,
    image: "https://images.unsplash.com/photo-1444653614773-995cb1ef9efa?auto=format&fit=crop&q=85&w=1000",
    description: "Intuitive financial platforms that simplify everyday money management.",
  },
  {
    name: "Restaurant",
    icon: Utensils,
    image: "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&q=85&w=1000",
    description: "Seamless ordering, reservations, and memorable guest experiences.",
  },
  {
    name: "eCommerce",
    icon: ShoppingCart,
    image: "https://images.unsplash.com/photo-1472851294608-062f824d29cc?auto=format&fit=crop&q=85&w=1000",
    description: "Online stores and shopping experiences built to turn visitors into customers.",
  },
  {
    name: "SaaS",
    icon: Layers,
    image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&q=85&w=1000",
    description: "Scalable software platforms that make everyday work simpler.",
  },
  {
    name: "Education",
    icon: GraduationCap,
    image: "https://images.unsplash.com/photo-1503676260728-1c00da094a0b?auto=format&fit=crop&q=85&w=1000",
    description: "Engaging learning platforms that connect students and educators.",
  },
  {
    name: "Logistics",
    icon: Truck,
    image: "https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?auto=format&fit=crop&q=85&w=1000",
    description: "Connected operations, shipment tracking, and smarter delivery workflows.",
  },
  {
    name: "Real Estate",
    icon: House,
    image: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&q=85&w=1000",
    description: "Property discovery and management experiences that bring spaces to life.",
  },
  {
    name: "Social Media",
    icon: Share2,
    image: "https://images.unsplash.com/photo-1611162617474-5b21e879e113?auto=format&fit=crop&q=85&w=1000",
    description: "Community platforms that help people connect, create, and share.",
  },
  {
    name: "Aviation",
    icon: Plane,
    image: "https://images.unsplash.com/photo-1436491865332-7a61a109cc05?auto=format&fit=crop&q=85&w=1000",
    description: "Digital booking and operational tools for seamless travel experiences.",
  },
  {
    name: "Agriculture",
    icon: Sprout,
    image: "https://images.unsplash.com/photo-1500382017468-9049fed747ef?auto=format&fit=crop&q=85&w=1000",
    description: "Practical digital tools for connected farms and agricultural businesses.",
  },
  {
    name: "Insurance",
    icon: Shield,
    image: "https://images.unsplash.com/photo-1450101499163-c8848c66ca85?auto=format&fit=crop&q=85&w=1000",
    description: "Simple policy management, claims workflows, and customer experiences.",
  },
];

export default function IndustriesSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const [currentGroup, setCurrentGroup] = useState(0);
  const [visibleGroup, setVisibleGroup] = useState(0);
  const reduceMotion = useReducedMotion();
  const galleryRef = useRef<HTMLDivElement>(null);
  const isVisible = useInView(galleryRef, { amount: 0.3 });
  const [isPaused, setIsPaused] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const [isFocused, setIsFocused] = useState(false);

  const [cardsPerGroup, setCardsPerGroup] = useState<number>(() => {
    if (typeof window === "undefined") return 3;
    const w = window.innerWidth;
    if (w >= 1024) return 3;
    if (w >= 640) return 2;
    return 1;
  });

  useEffect(() => {
    const updateCards = () => {
      const w = window.innerWidth;
      if (w >= 1024) {
        setCardsPerGroup(3);
      } else if (w >= 640) {
        setCardsPerGroup(2);
      } else {
        setCardsPerGroup(1);
      }
    };
    updateCards();
    window.addEventListener("resize", updateCards);
    return () => window.removeEventListener("resize", updateCards);
  }, []);

  const groupCount = Math.ceil(industries.length / cardsPerGroup);
  const trackGroups = groupCount;
  const slideAnimation = useRef<{ stop: () => void } | null>(null);
  const pauseTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const x = useMotionValue("0%");

  const currentGroupRef = useRef(currentGroup);
  currentGroupRef.current = currentGroup;

  const groupCountRef = useRef(groupCount);
  groupCountRef.current = groupCount;

  useEffect(() => {
    setCurrentGroup(0);
    setVisibleGroup(0);
    x.set("0%");
  }, [cardsPerGroup, x]);

  useEffect(() => {
    if (!isVisible || reduceMotion || isPaused || isHovered || isFocused) return;
    const timer = window.setInterval(() => {
      if (document.hidden) return;
      const nextGroup = (currentGroup + 1) % groupCount;
      setCurrentGroup(nextGroup);
      setVisibleGroup(nextGroup);
      slideAnimation.current?.stop();
      slideAnimation.current = animate(x, `${nextGroup * (-100 / groupCount)}%`, {
        duration: 0.75,
        ease: [0.25, 1, 0.5, 1],
      });
    }, 4500);
    return () => window.clearInterval(timer);
  }, [currentGroup, isVisible, reduceMotion, isPaused, isHovered, isFocused, x, groupCount]);

  useEffect(() => {
    return () => {
      slideAnimation.current?.stop();
      if (pauseTimeoutRef.current) clearTimeout(pauseTimeoutRef.current);
    };
  }, []);

  const selectAdjacent = (direction: number) => {
    const nextGroup = (currentGroupRef.current + direction + groupCountRef.current) % groupCountRef.current;
    setIsPaused(true);

    if (pauseTimeoutRef.current) clearTimeout(pauseTimeoutRef.current);
    pauseTimeoutRef.current = setTimeout(() => {
      setIsPaused(false);
    }, 6000);

    setCurrentGroup(nextGroup);
    setVisibleGroup(nextGroup);
    slideAnimation.current?.stop();
    slideAnimation.current = animate(x, `${nextGroup * (-100 / groupCountRef.current)}%`, {
      duration: reduceMotion ? 0 : 0.65,
      ease: [0.25, 1, 0.5, 1],
    });
  };

  const wheelCooldown = useRef(false);

  // Page-pinning Wheel Listener: Pins vertical page scroll to step through carousel slides first
  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const handleNativeWheel = (e: WheelEvent) => {
      const delta = Math.abs(e.deltaX) > Math.abs(e.deltaY) ? e.deltaX : e.deltaY;
      if (Math.abs(delta) < 15) return;

      const isScrollingDown = delta > 0;
      const isScrollingUp = delta < 0;
      const curr = currentGroupRef.current;
      const count = groupCountRef.current;

      const rect = section.getBoundingClientRect();
      const windowHeight = window.innerHeight;
      // Section is active when in visible view
      const isVisibleInView = rect.top <= windowHeight * 0.4 && rect.bottom >= windowHeight * 0.6;

      if (isVisibleInView) {
        if (isScrollingDown && curr < count - 1) {
          e.preventDefault();
          if (wheelCooldown.current) return;
          wheelCooldown.current = true;
          setTimeout(() => {
            wheelCooldown.current = false;
          }, 550);
          selectAdjacent(1);
        } else if (isScrollingUp && curr > 0) {
          e.preventDefault();
          if (wheelCooldown.current) return;
          wheelCooldown.current = true;
          setTimeout(() => {
            wheelCooldown.current = false;
          }, 550);
          selectAdjacent(-1);
        }
      }
    };

    section.addEventListener("wheel", handleNativeWheel, { passive: false });
    return () => {
      section.removeEventListener("wheel", handleNativeWheel);
    };
  }, []);

  const industrySwipe = useSwipe(selectAdjacent);

  return (
    <section ref={sectionRef} className="relative bg-[#f7f7f5] font-sans py-10 sm:py-14 lg:py-20 overflow-hidden">
      <div className="relative z-10 mx-auto w-full max-w-7xl 2xl:max-w-[1480px] px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-6 sm:mb-8 md:mb-10 text-center">
          <motion.div
            initial={reduceMotion ? false : { opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <p className="mb-1.5 text-xs sm:text-sm font-bold uppercase tracking-widest text-primary">
              What we build
            </p>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight text-neutral-900 text-balance leading-[1.15]">
              Use Cases &amp; <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-sky-400">Industry Applications</span>
            </h2>
          </motion.div>
          <p className="mx-auto mt-2 max-w-2xl text-fluid-body text-neutral-500">
            From first sketch to global scale, we pair product thinking with engineering that creates measurable momentum.
          </p>
        </div>

        {/* Controls */}
        <div className="mb-4 flex items-center justify-end text-xs text-neutral-500">
          <div className="flex items-center gap-2">
            {!reduceMotion && (
              <button
                type="button"
                onClick={() => setIsPaused((paused) => !paused)}
                aria-label={isPaused ? "Play industry slider" : "Pause industry slider"}
                className="site-button site-button-icon rounded-full border border-neutral-300 p-2 hover:bg-white focus-visible:outline-2 focus-visible:outline-primary"
              >
                {isPaused ? <Play className="h-4 w-4" /> : <Pause className="h-4 w-4" />}
              </button>
            )}
            <button
              type="button"
              onClick={() => selectAdjacent(-1)}
              aria-label="Previous industry"
              className="site-button site-button-icon rounded-full border border-neutral-300 p-2 hover:bg-white focus-visible:outline-2 focus-visible:outline-primary"
            >
              <ChevronLeft className="h-4 w-4" />
            </button>
            <button
              type="button"
              onClick={() => selectAdjacent(1)}
              aria-label="Next industry"
              className="site-button site-button-icon rounded-full border border-neutral-300 p-2 hover:bg-white focus-visible:outline-2 focus-visible:outline-primary"
            >
              <ChevronRight className="h-4 w-4" />
            </button>
          </div>
        </div>

        {/* Carousel Track */}
        <div
          {...industrySwipe}
          ref={galleryRef}
          className="overflow-hidden rounded-2xl md:rounded-3xl cursor-grab active:cursor-grabbing select-none"
          role="region"
          aria-roledescription="carousel"
          aria-label="Industries gallery"
          onPointerEnter={(event) => {
            if (event.pointerType === "mouse") setIsHovered(true);
          }}
          onPointerLeave={() => setIsHovered(false)}
          onPointerDown={(event) => {
            if (event.pointerType !== "mouse") setIsPaused(true);
          }}
          onFocusCapture={() => setIsFocused(true)}
          onBlurCapture={(event) => {
            if (!event.currentTarget.contains(event.relatedTarget)) setIsFocused(false);
          }}
        >
          <motion.div
            style={{ x, width: `${trackGroups * 100}%` }}
            className="flex h-[320px] sm:h-[380px] md:h-[440px] lg:h-[490px] xl:h-[540px] 2xl:h-[580px]"
          >
            {Array.from({ length: trackGroups }, (_, group) => (
              <div
                key={group}
                inert={visibleGroup !== group}
                aria-hidden={visibleGroup !== group}
                style={{ width: `${100 / trackGroups}%` }}
                className="flex shrink-0 gap-3 sm:gap-5 md:gap-6 lg:gap-7 px-1"
              >
                {industries
                  .slice(
                    (group % groupCount) * cardsPerGroup,
                    (group % groupCount + 1) * cardsPerGroup
                  )
                  .map((industry) => {
                    const Icon = industry.icon;
                    return (
                      <article
                        key={industry.name}
                        className="relative min-h-0 min-w-0 flex-1 overflow-hidden rounded-2xl md:rounded-3xl bg-neutral-900 group shadow-lg"
                      >
                        <motion.img
                          src={industry.image}
                          alt={industry.name}
                          loading="lazy"
                          className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/40 to-black/10" />

                        {/* Icon */}
                        <div className="absolute left-4 top-4 z-20 flex h-8 w-8 sm:h-9 sm:w-9 lg:h-11 lg:w-11 items-center justify-center rounded-full border border-white/30 bg-black/50 text-white backdrop-blur-sm shadow-md">
                          <Icon className="h-4 w-4 lg:h-5 lg:w-5" aria-hidden="true" />
                        </div>

                        {/* Content */}
                        <div className="absolute inset-x-0 bottom-0 z-20 p-4 sm:p-5 lg:p-7 xl:p-8">
                          <h3 className="text-base font-bold leading-tight text-white sm:text-lg lg:text-xl xl:text-2xl 2xl:text-3xl">
                            {industry.name}
                          </h3>
                          <p className="mt-1.5 sm:mt-2 text-xs sm:text-sm lg:text-base leading-relaxed text-white/85 line-clamp-3 font-normal">
                            {industry.description}
                          </p>
                          <Link
                            to="/contact"
                            aria-label={`Start a ${industry.name} project`}
                            className="pointer-events-auto mt-3.5 inline-flex items-center gap-2 rounded-full bg-white px-3.5 py-1.5 text-xs sm:text-sm font-semibold text-neutral-900 transition-colors hover:bg-neutral-100 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white lg:mt-5 lg:px-5 lg:py-2.5 lg:text-base"
                          >
                            Let's build{" "}
                            <ArrowUpRight
                              className="h-3.5 w-3.5 shrink-0 text-neutral-900 lg:h-4 lg:w-4"
                              aria-hidden="true"
                            />
                          </Link>
                        </div>
                      </article>
                    );
                  })}
              </div>
            ))}
          </motion.div>
        </div>

        {/* Footer Link */}
        <div className="mt-4 flex flex-col gap-2 border-t border-neutral-200 pt-3 text-xs sm:text-sm sm:flex-row sm:items-center sm:justify-between shrink-0">
          <p className="text-neutral-500">Your next big idea belongs here.</p>
          <Link
            to="/contact"
            className="inline-flex items-center gap-2 font-semibold text-neutral-950 hover:text-primary transition-colors"
          >
            Tell us what you are building <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
          </Link>
        </div>
      </div>
    </section>
  );
}
