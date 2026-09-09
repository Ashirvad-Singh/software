import { useEffect, useRef, useState } from "react";
import { motion, useReducedMotion, useScroll, useMotionValue, useMotionValueEvent, useInView, animate } from "framer-motion";
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
  const [expandedCard, setExpandedCard] = useState<string | null>(null);
  const reduceMotion = useReducedMotion();
  const galleryRef = useRef<HTMLDivElement>(null);
  const isVisible = useInView(galleryRef, { amount: 0.5 });
  const [autoIndex, setAutoIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const [isFocused, setIsFocused] = useState(false);
  const slideAnimation = useRef<{ stop: () => void } | null>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end end"],
  });
  const x = useMotionValue("0%");

  useMotionValueEvent(scrollYProgress, "change", (progress) => {
    const position = Math.max(0, Math.min(1, (progress - 0.1) / 0.8));
    const group = Math.round(position);
    slideAnimation.current?.stop();
    x.set(`${position * (-100 / 3)}%`);
    setVisibleGroup(group);
    setCurrentGroup(group);
    setAutoIndex((index) => Math.floor(index / 6) === group ? index : group * 6);
  });

  useEffect(() => {
    if (!isVisible || reduceMotion || isPaused || isHovered || isFocused) return;
    const timer = window.setInterval(() => {
      if (document.hidden) return;
      const nextIndex = (autoIndex + 1) % industries.length;
      const nextGroup = Math.floor(nextIndex / 6);
      // Slide forward into a matching copy of the first group at the loop boundary.
      const targetGroup = nextIndex === 0 ? 2 : nextGroup;
      setVisibleGroup(targetGroup);
      setAutoIndex(nextIndex);
      setExpandedCard(null);
      setCurrentGroup(nextGroup);
      slideAnimation.current?.stop();
      slideAnimation.current = animate(x, `${targetGroup * (-100 / 3)}%`, {
        duration: 0.8,
        ease: [0.22, 1, 0.36, 1],
        onComplete: () => {
          if (targetGroup === 2) {
            // Both groups have identical content, so this reset is invisible.
            x.set("0%");
            setVisibleGroup(0);
          }
        },
      });
    }, 3000);
    return () => window.clearInterval(timer);
  }, [autoIndex, isVisible, reduceMotion, isPaused, isHovered, isFocused, x]);

  useEffect(() => () => slideAnimation.current?.stop(), []);

  const selectAdjacent = (direction: number) => {
    const section = sectionRef.current;
    if (!section) return;
    const group = Math.max(0, Math.min(1, currentGroup + direction));
    const start = section.getBoundingClientRect().top + window.scrollY;
    const distance = section.offsetHeight - window.innerHeight;
    window.scrollTo({
      top: start + distance * (0.1 + group * 0.8),
      behavior: reduceMotion ? "instant" : "smooth",
    });
  };

  return (
    <section ref={sectionRef} className="relative h-[200svh] bg-[#f7f7f5] font-sans">
      <div className="sticky top-0 flex h-svh items-center overflow-hidden pt-20 pb-4">
      <div className="relative z-10 w-full px-3 sm:px-5 lg:px-8">
        <div className="mb-4 text-center md:mb-6">
          <motion.div
            initial={reduceMotion ? false : { opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <p className="mb-3 text-sm font-bold uppercase tracking-widest text-primary">
              What we build
            </p>
            <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-neutral-900 text-balance">
              Use Cases &amp; Industry Applications
            </h2>
          </motion.div>
          <p className="hidden mx-auto mt-4 max-w-2xl text-sm sm:text-base md:text-lg leading-relaxed text-neutral-500 md:block">
            From first sketch to global scale, we pair product thinking with
            engineering that creates measurable momentum.
          </p>
        </div>

        <div className="mb-4 flex items-center justify-end text-xs text-neutral-500">
          <div className="flex items-center gap-2">
            {!reduceMotion && (
              <button type="button" onClick={() => setIsPaused((paused) => !paused)} aria-label={isPaused ? "Play industry slider" : "Pause industry slider"} className="rounded-full border border-neutral-300 p-2 hover:bg-white focus-visible:outline-2 focus-visible:outline-primary">
                {isPaused ? <Play className="h-4 w-4" /> : <Pause className="h-4 w-4" />}
              </button>
            )}
            <button type="button" onClick={() => selectAdjacent(-1)} disabled={currentGroup === 0} aria-label="Previous industry" className="rounded-full border border-neutral-300 p-2 hover:bg-white disabled:opacity-30 disabled:cursor-not-allowed focus-visible:outline-2 focus-visible:outline-primary">
              <ChevronLeft className="h-4 w-4" />
            </button>
            <button type="button" onClick={() => selectAdjacent(1)} disabled={currentGroup === 1} aria-label="Next industry" className="rounded-full border border-neutral-300 p-2 hover:bg-white disabled:opacity-30 disabled:cursor-not-allowed focus-visible:outline-2 focus-visible:outline-primary">
              <ChevronRight className="h-4 w-4" />
            </button>
          </div>
        </div>

        <div
          ref={galleryRef}
          className="overflow-hidden"
          role="region"
          aria-roledescription="carousel"
          aria-label="Industries gallery"
          onPointerEnter={(event) => { if (event.pointerType === "mouse") setIsHovered(true); }}
          onPointerLeave={() => setIsHovered(false)}
          onPointerDown={(event) => { if (event.pointerType !== "mouse") setIsPaused(true); }}
          onFocusCapture={() => setIsFocused(true)}
          onBlurCapture={(event) => { if (!event.currentTarget.contains(event.relatedTarget)) setIsFocused(false); }}
        >
          <motion.div style={{ x }} className="flex h-[clamp(340px,48svh,460px)] w-[300%] sm:h-[clamp(340px,52svh,640px)]">
            {[0, 1, 2].map((group) => (
              <div
                key={group}
                inert={visibleGroup !== group}
                aria-hidden={visibleGroup !== group}
                onPointerLeave={() => setExpandedCard(null)}
                onBlurCapture={(event) => {
                  if (!event.currentTarget.contains(event.relatedTarget)) setExpandedCard(null);
                }}
                className="grid w-1/3 shrink-0 grid-cols-3 gap-2 px-0.5 lg:flex lg:gap-3"
              >
                {industries.slice((group % 2) * 6, (group % 2) * 6 + 6).map((industry) => {
                  const Icon = industry.icon;
                  const hoveredInGroup = industries
                    .slice((group % 2) * 6, (group % 2) * 6 + 6)
                    .some((item) => item.name === expandedCard);
                  const isExpanded = hoveredInGroup
                    ? expandedCard === industry.name
                    : industry === industries[autoIndex];
                  return (
                    <motion.article
                      key={industry.name}
                      initial={false}
                      animate={{ flexGrow: isExpanded ? 2.8 : 1 }}
                      transition={reduceMotion ? { duration: 0 } : { type: "spring", stiffness: 180, damping: 28 }}
                      onPointerEnter={(event) => {
                        if (event.pointerType === "mouse") setExpandedCard(industry.name);
                      }}
                      onFocusCapture={() => setExpandedCard(industry.name)}
                      className="relative min-h-0 min-w-0 overflow-hidden rounded-xl bg-neutral-900 lg:basis-0"
                    >
                      <motion.img
                        src={industry.image}
                        alt=""
                        loading="lazy"
                        initial={false}
                        animate={{ scale: isExpanded ? 1.06 : 1 }}
                        transition={reduceMotion ? { duration: 0 } : { duration: 0.5 }}
                        className="absolute inset-0 h-full w-full object-cover"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/55 to-black/10" />
                      <div className="absolute left-4 top-4 hidden h-9 w-9 items-center justify-center rounded-full border border-white/30 bg-black/20 text-white sm:flex">
                        <Icon className="h-4 w-4" aria-hidden="true" />
                      </div>
                      <div className="absolute inset-x-0 bottom-0 p-2 sm:p-4 lg:p-4">
                        <h3 className="text-xs font-bold leading-tight text-white sm:text-lg lg:text-xl">
                          {industry.name}
                        </h3>
                        <p className="mt-1 text-[10px] leading-snug text-white/80 sm:mt-2 sm:text-xs lg:text-sm">
                          {industry.description}
                        </p>
                        <Link
                          to="/contact"
                          aria-label={`Start a ${industry.name} project`}
                          className="mt-2 inline-flex items-center gap-2 rounded-full bg-white px-3 py-1.5 text-[11px] font-semibold text-neutral-900 transition-colors hover:bg-neutral-200 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white sm:mt-4 sm:py-2 sm:text-xs"
                        >
                          Let's build <ArrowUpRight className="h-3 w-3 shrink-0 sm:h-4 sm:w-4" aria-hidden="true" />
                        </Link>
                      </div>
                    </motion.article>
                  );
                })}
              </div>
            ))}
          </motion.div>
        </div>

        <div className="mt-3 flex flex-col gap-2 border-t border-neutral-200 pt-3 text-xs sm:text-sm sm:flex-row sm:items-center sm:justify-between">
          <p className="text-neutral-500">Your next big idea belongs here.</p>
          <Link to="/contact" className="inline-flex items-center gap-2 font-semibold text-neutral-950 hover:text-primary">
            Tell us what you are building <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
          </Link>
        </div>
      </div>
      </div>
    </section>
  );
}
