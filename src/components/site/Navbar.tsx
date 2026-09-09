import { useState, useEffect } from "react";
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
  { name: "Services", href: "/services" },
  { name: "Technologies", href: "/technologies" },
  { name: "Work", href: "/work" },
  { name: "Process", href: "/process" },
  { name: "About", href: "/about" },
  { name: "Team", href: "/team" },
  { name: "Blog", href: "/blog" },
  { name: "Careers", href: "/careers" },
  { name: "Gallery", href: "/gallery" },
];

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
  const [active, setActive] = useState<string | null>(null);
  const location = useLocation();

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
          "fixed top-4 inset-x-0 max-w-7xl mx-auto z-50 flex items-center justify-center px-4 md:px-0 w-full",
          className,
        )}
      >
        {/* Mobile Logo & Toggle - shown on mobile AND tablet */}
        <div className="lg:hidden flex items-center justify-between w-full bg-white/80 backdrop-blur-md px-4 sm:px-6 h-14 sm:h-16 rounded-full border border-neutral-200 shadow-sm">
          <Link to="/" className="flex items-center">
            <img
              src="/adat-logo.png"
              alt="Adat Soft Solutions"
              className="h-6 sm:h-8 md:h-10 w-auto"
            />
          </Link>
          <button onClick={() => setIsMobileMenuOpen(true)}>
            <MenuIcon className="w-6 h-6" />
          </button>
        </div>

        {/* Desktop Navbar (Pill) - shown only on lg+ */}
        <div className="hidden lg:block w-full px-4">
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
              <div className="flex items-center justify-center space-x-4 lg:space-x-8 text-sm font-medium flex-1">
                {navLinks.map((link) =>
                  link.name === "Services" ? (
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
            className="fixed inset-0 z-[100] bg-background/95 backdrop-blur-xl flex flex-col justify-center items-center"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
          >
            <button
              className="absolute top-6 right-6 p-2 text-foreground"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              <X className="w-8 h-8" />
            </button>
            <div className="flex flex-col items-center gap-6">
              {navLinks.map((link, i) => {
                const isActive = location.pathname === link.href;
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
