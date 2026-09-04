import { useState, useEffect } from "react"
import { Menu as MenuIcon, X, ArrowRight } from "lucide-react"
import { collection, getDocs, query, orderBy } from "firebase/firestore"
import { db } from "@/lib/firebase"
import { services as staticServices } from "@/data/services"
import { Button } from "@/components/ui/button"
import { Link, useLocation } from "react-router-dom"
import { HoveredLink, Menu, MenuItem, ProductItem } from "@/components/ui/navbar-menu"
import { motion, AnimatePresence, useScroll, useMotionValueEvent } from "framer-motion"
import { cn } from "@/lib/utils"

const navLinks = [
  { name: "Home", href: "/" },
  { name: "Services", href: "/services" },
  { name: "Work", href: "/work" },
  { name: "Process", href: "/process" },
  { name: "About", href: "/about" },
  { name: "Team", href: "/team" },
  { name: "Blog", href: "/blog" },
  { name: "Careers", href: "/careers" },
  { name: "Gallery", href: "/gallery" },
]

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
        const q = query(collection(db, "services"), orderBy("createdAt", "asc"));
        const snapshot = await getDocs(q);
        const data = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
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
            src={service.thumbnailUrl || service.image || service.thumbnail || defaultThumbnails[idx % defaultThumbnails.length]}
          />
        ))}
      </div>
      <div className="mt-4 pt-3 border-t border-neutral-100 dark:border-neutral-800/60 flex items-center justify-between px-2">
        <span className="text-xs text-neutral-500 dark:text-neutral-400 font-medium">Explore all enterprise & digital solutions</span>
        <Link to="/services" className="text-xs font-semibold text-sky-500 hover:text-sky-600 dark:hover:text-sky-400 transition-colors flex items-center gap-1.5 group">
          View all services <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-0.5" />
        </Link>
      </div>
    </div>
  )
}

export default function Navbar({ className }: { className?: string }) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [active, setActive] = useState<string | null>(null)
  const location = useLocation()
  
  const { scrollY } = useScroll()
  const [hidden, setHidden] = useState(false)

  useMotionValueEvent(scrollY, "change", (latest) => {
    const previous = scrollY.getPrevious() ?? 0
    if (latest > previous && latest > 150) {
      setHidden(true)
    } else {
      setHidden(false)
    }
  })

  return (
    <>
      <motion.div 
        variants={{
          visible: { y: 0 },
          hidden: { y: "-150%" },
        }}
        animate={hidden ? "hidden" : "visible"}
        transition={{ duration: 0.35, ease: "easeInOut" }}
        className={cn("fixed top-4 inset-x-0 max-w-7xl mx-auto z-50 flex items-center justify-center px-4 md:px-0 w-full", className)}
      >
        
        {/* Mobile Logo & Toggle - shown on mobile AND tablet */}
        <div className="lg:hidden flex items-center justify-between w-full bg-white/80 backdrop-blur-md px-4 sm:px-6 h-14 sm:h-16 rounded-full border border-neutral-200 shadow-sm">
          <Link to="/" className="flex items-center">
            <img src="/adat-logo.png" alt="Adat Soft Solutions" className="h-6 sm:h-8 md:h-10 w-auto" />
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
                <img src="/adat-logo.png" alt="Adat Soft Solutions" className="h-8 md:h-10 w-auto" />
              </Link>
              
              {/* Links */}
              <div className="flex items-center justify-center space-x-4 lg:space-x-8 text-sm font-medium flex-1">
                {navLinks.map((link) => (
                  link.name === "Services" ? (
                    <MenuItem key={link.name} setActive={setActive} active={active} item="Services">
                       <MegaMenuContent />
                    </MenuItem>
                  ) : (
                    <div key={link.name} onMouseEnter={() => setActive(null)}>
                      <HoveredLink 
                        href={link.href}
                        active={location.pathname === link.href || (link.href !== "/" && location.pathname.startsWith(link.href))}
                      >
                        {link.name}
                      </HoveredLink>
                    </div>
                  )
                ))}
              </div>

              {/* CTA */}
              <Button size="sm" className="rounded-full px-6 py-2.5 ml-8 h-10" asChild>
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
                const isActive = location.pathname === link.href
                return (
                  <motion.div
                    key={link.name}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.1 * i, duration: 0.4 }}
                  >
                    <Link
                      to={link.href}
                      className={`text-2xl font-semibold transition-colors ${isActive ? 'text-primary' : 'hover:text-primary'}`}
                      onClick={() => setIsMobileMenuOpen(false)}
                    >
                      {link.name}
                    </Link>
                  </motion.div>
                )
              })}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 * navLinks.length, duration: 0.4 }}
                className="mt-4"
              >
                <Button size="lg" className="rounded-full px-8" onClick={() => setIsMobileMenuOpen(false)} asChild>
                  <Link to="/contact">Get a Quote</Link>
                </Button>
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
