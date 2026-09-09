import { useState, useEffect, useRef } from "react";
import {
  Menu as MenuIcon,
  X,
  ArrowRight,
  Code2,
  Layers3,
  Smartphone,
  Database,
  Cloud,
  Globe2,
  Server,
  Sparkles,
  ChevronDown,
  ShoppingCart,
  Heart,
  TrendingUp,
  Radio,
  Zap,
  GraduationCap,
  Cpu,
  Gamepad2,
  Truck,
} from "lucide-react";
import { collection, getDocs, query, orderBy } from "firebase/firestore";
import { db } from "@/lib/firebase";
import { services as staticServices } from "@/data/services";
import { Button } from "@/components/ui/button";
import { Link, useLocation } from "react-router-dom";
import {
  HoveredLink,
  Menu,
  MenuItem,
  ProductItem,
} from "@/components/ui/navbar-menu";
import {
  motion,
  AnimatePresence,
  useScroll,
  useMotionValueEvent,
} from "framer-motion";
import { cn } from "@/lib/utils";
import * as TablerIcons from "@tabler/icons-react";

const navLinks = [
  { name: "Home", href: "/" },
  { name: "Industries", href: "/#industries" },
  { name: "Services", href: "/services" },
  { name: "Technologies", href: "/technologies" },
  { name: "About", href: "/about" },
  { name: "Resources", href: "#resources" },
];

const industriesList = [
  {
    icon: ShoppingCart,
    title: "Retail & eCommerce",
    description: "Digital platforms built for scale, conversion, and experience.",
  },
  {
    icon: Heart,
    title: "Healthcare & Life Sciences",
    description: "Secure, compliant systems enabling modern care delivery.",
  },
  {
    icon: TrendingUp,
    title: "Market Research",
    description: "Digital tools that simplify research and speed up insight delivery.",
  },
  {
    icon: Radio,
    title: "Telecom & Media",
    description: "Infrastructure for real-time content, connection, and digital reach.",
  },
  {
    icon: Zap,
    title: "Energy & Utilities",
    description: "Intelligent systems supporting resilient, data-driven energy operations.",
  },
  {
    icon: GraduationCap,
    title: "EdTech",
    description: "Adaptive learning platforms built for scale, insight, and real outcomes.",
  },
  {
    icon: Cpu,
    title: "Manufacturing & SaaS",
    description: "Connected digital cores enabling smarter, faster production decisions.",
  },
  {
    icon: Gamepad2,
    title: "Gaming & Entertainment",
    description: "High-performance digital experiences designed for engagement at scale.",
  },
  {
    icon: Truck,
    title: "Mobility & Transportation",
    description: "Software that moves riders, drivers, and fleets from booking to payout.",
  },
];

const IndustriesMegaMenu = () => {
  return (
    <div className="w-[min(880px,calc(100vw-2rem))] overflow-hidden text-neutral-900 dark:text-white">
      <div className="grid grid-cols-1 lg:grid-cols-12 min-h-[360px]">
        {/* Left 2 Columns of Industries */}
        <div className="lg:col-span-8 p-6 sm:p-7 bg-white dark:bg-neutral-950 flex flex-col justify-between">
          <div>
            <p className="mb-4 text-[11px] font-bold uppercase tracking-[0.18em] text-neutral-400">
              Industries
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-4">
              {industriesList.map((ind) => {
                const Icon = ind.icon;
                return (
                  <Link
                    key={ind.title}
                    to="/#industries"
                    className="group flex items-start gap-3 p-1.5 rounded-xl transition-all hover:bg-sky-50/70 dark:hover:bg-neutral-900"
                  >
                    <div className="mt-0.5 flex h-9 w-9 shrink-0 items-center justify-center rounded-lg border border-sky-100 bg-sky-50 text-sky-600 transition-colors group-hover:bg-sky-500 group-hover:text-white dark:border-neutral-800 dark:bg-neutral-900 dark:text-sky-400">
                      <Icon className="h-4.5 w-4.5 stroke-[1.75]" />
                    </div>
                    <div>
                      <h4 className="text-sm font-bold text-neutral-900 group-hover:text-sky-600 dark:text-white dark:group-hover:text-sky-400 transition-colors">
                        {ind.title}
                      </h4>
                      <p className="mt-0.5 text-xs text-neutral-500 dark:text-neutral-400 leading-snug line-clamp-2">
                        {ind.description}
                      </p>
                    </div>
                  </Link>
                );
              })}
            </div>
          </div>
        </div>

        {/* Right Promo Side Panel */}
        <div className="lg:col-span-4 p-6 sm:p-7 bg-slate-50 dark:bg-neutral-900 border-l border-neutral-100 dark:border-neutral-800/80 flex flex-col justify-between">
          <div>
            <h4 className="text-base font-bold text-neutral-950 dark:text-white leading-snug">
              See how ADAT enables <span className="text-sky-500">digital evolution across critical</span> global sectors.
            </h4>
            
            <div className="mt-5 relative h-36 rounded-2xl overflow-hidden shadow-md group">
              <img
                src="https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=600&q=80"
                alt="Digital Evolution"
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
            </div>
          </div>

          <Link
            to="/contact"
            className="mt-6 inline-flex items-center justify-center gap-2 rounded-full bg-neutral-950 px-5 py-3 text-xs font-bold text-white transition-colors hover:bg-neutral-800 dark:bg-white dark:text-neutral-950 dark:hover:bg-neutral-200"
          >
            Let's Connect <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </div>
    </div>
  );
};

const AboutMenuContent = () => {
  return (
    <div className="flex w-64 flex-col gap-3 p-4 text-neutral-900 dark:text-white">
      <HoveredLink href="/about">About Us</HoveredLink>
      <HoveredLink href="/team">Our Team</HoveredLink>
      <HoveredLink href="/careers">Careers</HoveredLink>
      <HoveredLink href="/gallery">Gallery</HoveredLink>
    </div>
  );
};



const defaultThumbnails = [
  "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=500&q=80",
  "https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?auto=format&fit=crop&w=500&q=80",
  "https://images.unsplash.com/photo-1677442136019-21780efad99a?auto=format&fit=crop&w=500&q=80",
  "https://images.unsplash.com/photo-1556742049-0a67d5145747?auto=format&fit=crop&w=500&q=80",
  "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=500&q=80",
  "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?auto=format&fit=crop&w=500&q=80",
];

const MegaMenuContent = () => {
  const [dbServices, setDbServices] = useState<any[]>([]);

  useEffect(() => {
    const fetchServices = async () => {
      try {
        const q = query(
          collection(db, "services"),
          orderBy("createdAt", "asc"),
        );
        const snapshot = await getDocs(q);
        const data = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        if (data.length > 0) {
          setDbServices(data);
        } else {
          setDbServices(staticServices);
        }
      } catch (error) {
        console.error("Error fetching services:", error);
        setDbServices(staticServices);
      }
    };
    fetchServices();
  }, []);

  const displayServices = dbServices.length > 0 ? dbServices : staticServices;
  const itemsToDisplay = displayServices.slice(0, 4);

  return (
    <div className="w-[640px] sm:w-[720px] max-w-[92vw] p-3 sm:p-4 text-neutral-900 dark:text-white">
      <div className="grid grid-cols-2 gap-4 sm:gap-6">
        {itemsToDisplay.map((service, idx) => (
          <ProductItem
            key={service.slug || idx}
            title={service.title}
            description={service.description}
            href={`/services/${service.slug}`}
            src={
              service.thumbnailUrl ||
              service.image ||
              service.thumbnail ||
              defaultThumbnails[idx % defaultThumbnails.length]
            }
          />
        ))}
      </div>
      <div className="mt-4 pt-3 border-t border-neutral-100 dark:border-neutral-800/60 flex items-center justify-between px-2">
        <span className="text-xs text-neutral-500 dark:text-neutral-400 font-medium">
          Explore all enterprise & digital solutions
        </span>
        <Link
          to="/services"
          className="text-xs font-semibold text-sky-500 hover:text-sky-600 dark:hover:text-sky-400 transition-colors flex items-center gap-1.5 group"
        >
          View all services{" "}
          <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-0.5" />
        </Link>
      </div>
    </div>
  );
};

const technologyIcons = [
  Code2,
  Layers3,
  Smartphone,
  Database,
  Cloud,
  Globe2,
  Server,
  Sparkles,
];

const technologyLogoSlugs: Record<string, string> = {
  angular: "angular",
  aws: "amazonaws",
  bigcommerce: "bigcommerce",
  drupal: "drupal",
  firebase: "firebase",
  flutter: "flutter",
  github: "github",
  ionic: "ionic",
  javascript: "javascript",
  laravel: "laravel",
  magento: "magento",
  moodle: "moodle",
  mongodb: "mongodb",
  mysql: "mysql",
  next: "nextdotjs",
  node: "nodedotjs",
  opencart: "opencart",
  php: "php",
  prestashop: "prestashop",
  react: "react",
  shopify: "shopify",
  stripe: "stripe",
  swift: "swift",
  typescript: "typescript",
  vue: "vuedotjs",
  webflow: "webflow",
  wix: "wix",
  woocommerce: "woocommerce",
  wordpress: "wordpress",
};

const getTechnologyLogo = (name: string, iconUrl?: string) => {
  if (iconUrl?.startsWith("http") || iconUrl?.startsWith("data:")) {
    return iconUrl;
  }

  if (iconUrl) {
    return null;
  }

  const normalizedName = name.toLowerCase().replace(/[^a-z0-9]/g, "");
  const logoKey = Object.keys(technologyLogoSlugs).find((key) =>
    normalizedName.includes(key),
  );

  return logoKey
    ? `https://cdn.simpleicons.org/${technologyLogoSlugs[logoKey]}`
    : null;
};

const getSavedBrandIcon = (iconUrl?: string) => {
  if (!iconUrl || iconUrl.startsWith("http") || iconUrl.startsWith("data:")) {
    return null;
  }

  return (TablerIcons as any)[iconUrl] || null;
};

const TechnologyMenuItem = ({ technology }: { technology: any }) => {
  const logoUrl = getTechnologyLogo(technology.name, technology.iconUrl);
  const SavedBrandIcon = getSavedBrandIcon(technology.iconUrl);

  return (
    <Link
      to="/technologies"
      className="group flex items-center gap-3 rounded-xl border border-neutral-100 bg-neutral-50/70 px-3 py-3 transition-all hover:border-primary/30 hover:bg-white hover:shadow-sm dark:border-neutral-800 dark:bg-neutral-900/70 dark:hover:bg-neutral-900"
    >
      {logoUrl ? (
        <img src={logoUrl} alt="" className="h-7 w-7 object-contain" />
      ) : SavedBrandIcon ? (
        <SavedBrandIcon
          className="h-7 w-7 text-neutral-500 transition-colors group-hover:text-primary"
          stroke={1.6}
        />
      ) : (
        <Code2 className="h-7 w-7 text-neutral-400 transition-colors group-hover:text-primary" />
      )}
      <span className="text-sm font-medium text-neutral-700 group-hover:text-primary dark:text-neutral-200">
        {technology.name}
      </span>
    </Link>
  );
};

const defaultTechnologyCategories = [
  {
    id: "ecommerce-platforms",
    title: "Ecommerce Platforms",
    description: "Powerful storefronts, marketplaces, and commerce migrations.",
    technologies: [
      { name: "Shopify" },
      { name: "WooCommerce" },
      { name: "Magento" },
      { name: "BigCommerce" },
      { name: "PrestaShop" },
      { name: "OpenCart" },
    ],
  },
  {
    id: "cms-learning",
    title: "CMS & Learning",
    description: "Flexible content and learning platforms for growing teams.",
    technologies: [
      { name: "WordPress" },
      { name: "Drupal" },
      { name: "Moodle" },
      { name: "Webflow" },
      { name: "Wix" },
    ],
  },
];

const TechnologyMegaMenu = () => {
  const [categories, setCategories] = useState<any[]>([]);
  const [activeCategory, setActiveCategory] = useState(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTechnologies = async () => {
      try {
        const technologyQuery = query(
          collection(db, "tech_stack"),
          orderBy("createdAt", "asc"),
        );
        const snapshot = await getDocs(technologyQuery);
        const data = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setCategories(data.length > 0 ? data : defaultTechnologyCategories);
      } catch (error) {
        console.error("Error fetching technologies:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchTechnologies();
  }, []);

  const selectedCategory = categories[activeCategory];
  const selectedTechnologies = selectedCategory?.technologies || [];

  return (
    <div className="w-[min(860px,calc(100vw-2rem))] overflow-hidden text-neutral-900 dark:text-white">
      <div className="flex min-h-[300px]">
        <aside className="w-[215px] shrink-0 bg-slate-50/90 p-5 dark:bg-neutral-950/80">
          <p className="mb-4 text-[11px] font-semibold uppercase tracking-[0.18em] text-neutral-400">
            Technologies
          </p>
          {loading ? (
            <div className="space-y-3">
              {[1, 2, 3, 4].map((item) => (
                <div
                  key={item}
                  className="h-9 animate-pulse rounded-lg bg-neutral-200/70 dark:bg-neutral-800"
                />
              ))}
            </div>
          ) : categories.length > 0 ? (
            <div className="space-y-1">
              {categories.map((category, index) => {
                const Icon = technologyIcons[index % technologyIcons.length];
                return (
                  <button
                    key={category.id || index}
                    type="button"
                    onMouseEnter={() => setActiveCategory(index)}
                    onFocus={() => setActiveCategory(index)}
                    className={`flex w-full items-center gap-2 rounded-lg px-3 py-2.5 text-left text-sm transition-colors ${
                      activeCategory === index
                        ? "bg-primary text-white shadow-sm"
                        : "text-neutral-600 hover:bg-white hover:text-neutral-900 dark:text-neutral-300 dark:hover:bg-neutral-900 dark:hover:text-white"
                    }`}
                  >
                    <Icon className="h-4 w-4 shrink-0" />
                    <span className="line-clamp-2">{category.title}</span>
                  </button>
                );
              })}
            </div>
          ) : (
            <p className="text-sm leading-relaxed text-neutral-500">
              Technology categories are coming soon.
            </p>
          )}
        </aside>

        <div className="flex min-w-0 flex-1 flex-col p-6 sm:p-7">
          {selectedCategory ? (
            <>
              <div className="mb-6 flex items-start justify-between gap-4">
                <div>
                  <p className="mb-1 text-xs font-medium uppercase tracking-[0.16em] text-primary">
                    Explore our stack
                  </p>
                  <h3 className="text-xl font-bold text-neutral-950 dark:text-white">
                    {selectedCategory.title}
                  </h3>
                  <p className="mt-2 max-w-lg text-sm leading-relaxed text-neutral-500 dark:text-neutral-400">
                    {selectedCategory.description}
                  </p>
                </div>
                <Sparkles className="mt-1 h-5 w-5 shrink-0 text-primary" />
              </div>
              {selectedTechnologies.length > 0 ? (
                <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
                  {selectedTechnologies.map(
                    (technology: any, index: number) => (
                      <TechnologyMenuItem
                        key={`${technology.name}-${index}`}
                        technology={technology}
                      />
                    ),
                  )}
                </div>
              ) : (
                <p className="text-sm text-neutral-500">
                  Explore the complete technology stack to learn more.
                </p>
              )}
            </>
          ) : (
            <div className="flex flex-1 items-center justify-center text-center text-sm text-neutral-500">
              Select a category to explore our technology stack.
            </div>
          )}
        </div>
      </div>
      <div className="flex items-center justify-between gap-4 border-t border-neutral-100 bg-white px-6 py-4 dark:border-neutral-800 dark:bg-black">
        <span className="text-xs text-neutral-500 dark:text-neutral-400">
          Built for scalable digital products
        </span>
        <Link
          to="/technologies"
          className="group flex items-center gap-1.5 text-xs font-semibold text-primary hover:text-primary/80"
        >
          View all technologies{" "}
          <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-1" />
        </Link>
      </div>
    </div>
  );
};

export default function Navbar({ className }: { className?: string }) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isResourcesOpen, setIsResourcesOpen] = useState(false);
  const [isAboutOpen, setIsAboutOpen] = useState(false);
  const [isIndustriesOpen, setIsIndustriesOpen] = useState(false);
  const [active, setActive] = useState<string | null>(null);
  const menuRef = useRef<HTMLDivElement>(null);
  const location = useLocation();

  useEffect(() => {
    if (!isMobileMenuOpen) return;
    const previousFocus = document.activeElement as HTMLElement | null;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    menuRef.current?.querySelector<HTMLButtonElement>("button")?.focus();
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") setIsMobileMenuOpen(false);
      if (event.key !== "Tab") return;
      const controls = menuRef.current?.querySelectorAll<HTMLElement>("a[href], button:not([disabled])");
      if (!controls?.length) return;
      const first = controls[0];
      const last = controls[controls.length - 1];
      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", handleKeyDown);
      previousFocus?.focus();
    };
  }, [isMobileMenuOpen]);

  const { scrollY } = useScroll();
  const [hidden, setHidden] = useState(false);

  useMotionValueEvent(scrollY, "change", (latest) => {
    const previous = scrollY.getPrevious() ?? 0;
    if (latest > previous && latest > 150) {
      setHidden(true);
    } else {
      setHidden(false);
    }
  });

  return (
    <>
      <motion.div
        variants={{
          visible: { y: 0 },
          hidden: { y: "-150%" },
        }}
        animate={hidden ? "hidden" : "visible"}
        transition={{ duration: 0.35, ease: "easeInOut" }}
        className={cn(
          "fixed top-4 inset-x-0 max-w-7xl mx-auto z-50 flex items-center justify-center px-4 sm:px-6 xl:px-0 w-full",
          className,
        )}
      >
        {/* Mobile Logo & Toggle - shown on mobile AND tablet */}
        <div className="xl:hidden [@media(pointer:coarse)]:flex flex items-center justify-between w-full bg-white/80 backdrop-blur-md px-4 sm:px-6 h-14 sm:h-16 rounded-full border border-neutral-200 shadow-sm">
          <Link to="/" className="flex items-center">
            <img
              src="/adat-logo.png"
              alt="Adat Soft Solutions"
              className="h-6 sm:h-8 md:h-10 w-auto"
            />
          </Link>
          <button type="button" aria-label="Open navigation" aria-expanded={isMobileMenuOpen} className="flex h-11 w-11 items-center justify-center" onClick={() => setIsMobileMenuOpen(true)}>
            <MenuIcon className="w-6 h-6" />
          </button>
        </div>

        {/* Wide-screen navigation for mouse and trackpad input. */}
        <div className="hidden xl:block [@media(pointer:coarse)]:hidden w-full px-4">
          <Menu setActive={setActive}>
            <div className="flex items-center justify-between w-full">
              {/* Logo */}
              <Link to="/" className="flex items-center gap-2 relative z-20">
                <img
                  src="/adat-logo.png"
                  alt="Adat Soft Solutions"
                  className="h-8 md:h-10 w-auto"
                />
              </Link>

              {/* Links */}
              <div className="flex items-center justify-center space-x-4 xl:space-x-5 text-sm font-medium flex-1">
                {navLinks.map((link) =>
                  link.name === "Industries" ? (
                    <MenuItem
                      key={link.name}
                      setActive={setActive}
                      active={active}
                      item="Industries"
                    >
                      <IndustriesMegaMenu />
                    </MenuItem>
                  ) : link.name === "Services" ? (
                    <MenuItem
                      key={link.name}
                      setActive={setActive}
                      active={active}
                      item="Services"
                    >
                      <MegaMenuContent />
                    </MenuItem>
                  ) : link.name === "Technologies" ? (
                    <MenuItem
                      key={link.name}
                      setActive={setActive}
                      active={active}
                      item="Technologies"
                    >
                      <TechnologyMegaMenu />
                    </MenuItem>
                  ) : link.name === "About" ? (
                    <MenuItem
                      key={link.name}
                      setActive={setActive}
                      active={active}
                      item="About"
                    >
                      <AboutMenuContent />
                    </MenuItem>
                  ) : link.name === "Resources" ? (
                    <MenuItem
                      key={link.name}
                      setActive={setActive}
                      active={active}
                      item="Resources"
                    >
                      <div className="flex w-64 flex-col gap-3 p-4 text-neutral-900 dark:text-white">
                        <HoveredLink href="/case-studies">
                          Case Studies
                        </HoveredLink>
                        <HoveredLink href="/blog">Blog</HoveredLink>
                      </div>
                    </MenuItem>
                  ) : (
                    <div key={link.name} onMouseEnter={() => setActive(null)}>
                      <HoveredLink
                        href={link.href}
                        active={
                          location.pathname === link.href ||
                          (link.href !== "/" &&
                            location.pathname.startsWith(link.href))
                        }
                      >
                        {link.name}
                      </HoveredLink>
                    </div>
                  ),
                )}
              </div>

              {/* CTA */}
              <Button
                size="sm"
                className="rounded-full px-6 py-2.5 ml-8 h-10"
                asChild
              >
                <Link to="/contact">Get a Quote</Link>
              </Button>
            </div>
          </Menu>
        </div>
      </motion.div>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            ref={menuRef}
            data-lenis-prevent
            role="dialog"
            aria-modal="true"
            aria-label="Site navigation"
            className="fixed inset-0 z-[100] overflow-y-auto overscroll-contain bg-background/95 backdrop-blur-xl px-6 py-20"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
          >
            <button
              aria-label="Close navigation"
              className="absolute top-6 right-6 p-2 text-foreground"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              <X className="w-8 h-8" />
            </button>
            <div className="mx-auto flex min-h-full max-w-lg flex-col items-center justify-center gap-5">
              {navLinks.map((link, i) => {
                const isActive = location.pathname === link.href;
                if (link.name === "Industries") {
                  return (
                    <motion.div
                      key={link.name}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.1 * i, duration: 0.4 }}
                      className="flex flex-col items-center"
                    >
                      <button
                        type="button"
                        onClick={() => setIsIndustriesOpen((open) => !open)}
                        className="flex items-center gap-2 text-2xl font-semibold transition-colors hover:text-primary"
                      >
                        Industries
                        <ChevronDown
                          className={`h-5 w-5 transition-transform ${isIndustriesOpen ? "rotate-180" : ""}`}
                        />
                      </button>
                      {isIndustriesOpen && (
                        <div className="mt-3 flex flex-col items-center gap-2.5 text-lg text-muted-foreground">
                          {industriesList.map((ind) => (
                            <Link
                              key={ind.title}
                              to="/#industries"
                              onClick={() => setIsMobileMenuOpen(false)}
                              className="hover:text-primary text-base"
                            >
                              {ind.title}
                            </Link>
                          ))}
                        </div>
                      )}
                    </motion.div>
                  );
                }
                if (link.name === "About") {
                  return (
                    <motion.div
                      key={link.name}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.1 * i, duration: 0.4 }}
                      className="flex flex-col items-center"
                    >
                      <button
                        type="button"
                        onClick={() => setIsAboutOpen((open) => !open)}
                        className="flex items-center gap-2 text-2xl font-semibold transition-colors hover:text-primary"
                      >
                        About
                        <ChevronDown
                          className={`h-5 w-5 transition-transform ${isAboutOpen ? "rotate-180" : ""}`}
                        />
                      </button>
                      {isAboutOpen && (
                        <div className="mt-3 flex flex-col items-center gap-3 text-lg text-muted-foreground">
                          <Link
                            to="/about"
                            onClick={() => setIsMobileMenuOpen(false)}
                            className="hover:text-primary"
                          >
                            About Us
                          </Link>
                          <Link
                            to="/about#process"
                            onClick={() => setIsMobileMenuOpen(false)}
                            className="hover:text-primary"
                          >
                            Our Process
                          </Link>
                          <Link
                            to="/team"
                            onClick={() => setIsMobileMenuOpen(false)}
                            className="hover:text-primary"
                          >
                            Our Team
                          </Link>
                          <Link
                            to="/careers"
                            onClick={() => setIsMobileMenuOpen(false)}
                            className="hover:text-primary"
                          >
                            Careers
                          </Link>
                          <Link
                            to="/gallery"
                            onClick={() => setIsMobileMenuOpen(false)}
                            className="hover:text-primary"
                          >
                            Gallery
                          </Link>
                        </div>
                      )}
                    </motion.div>
                  );
                }
                if (link.name === "Resources") {
                  return (
                    <motion.div
                      key={link.name}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.1 * i, duration: 0.4 }}
                      className="flex flex-col items-center"
                    >
                      <button
                        type="button"
                        onClick={() => setIsResourcesOpen((open) => !open)}
                        className="flex items-center gap-2 text-2xl font-semibold transition-colors hover:text-primary"
                      >
                        Resources
                        <ChevronDown
                          className={`h-5 w-5 transition-transform ${isResourcesOpen ? "rotate-180" : ""}`}
                        />
                      </button>
                      {isResourcesOpen && (
                        <div className="mt-3 flex flex-col items-center gap-3 text-lg text-muted-foreground">
                          <Link
                            to="/case-studies"
                            onClick={() => setIsMobileMenuOpen(false)}
                            className="hover:text-primary"
                          >
                            Case Studies
                          </Link>
                          <Link
                            to="/blog"
                            onClick={() => setIsMobileMenuOpen(false)}
                            className="hover:text-primary"
                          >
                            Blog
                          </Link>
                        </div>
                      )}
                    </motion.div>
                  );
                }
                return (
                  <motion.div
                    key={link.name}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.1 * i, duration: 0.4 }}
                  >
                    <Link
                      to={link.href}
                      className={`text-2xl font-semibold transition-colors ${isActive ? "text-primary" : "hover:text-primary"}`}
                      onClick={() => setIsMobileMenuOpen(false)}
                    >
                      {link.name}
                    </Link>
                  </motion.div>
                );
              })}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 * navLinks.length, duration: 0.4 }}
                className="mt-4"
              >
                <Button
                  size="lg"
                  className="rounded-full px-8"
                  onClick={() => setIsMobileMenuOpen(false)}
                  asChild
                >
                  <Link to="/contact">Get a Quote</Link>
                </Button>
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
