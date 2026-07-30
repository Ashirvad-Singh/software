import { useState } from "react"
import { 
  Menu as MenuIcon, X, 
  Store, Smartphone, Wifi, Brain, Server, BarChart, GitBranch, Cloud, Megaphone, 
  Code, Globe, Wrench, ShieldCheck, Lightbulb, Monitor
} from "lucide-react"
import * as LucideIcons from "lucide-react"
import { useEffect } from "react"
import { collection, getDocs, query, orderBy } from "firebase/firestore"
import { db } from "@/lib/firebase"
import { services as staticServices } from "@/data/services"
import { Button } from "@/components/ui/button"
import { Link, useLocation } from "react-router-dom"
import { HoveredLink, Menu, MenuItem } from "@/components/ui/navbar-menu"
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

const MegaMenuContent = () => {
  const [dbServices, setDbServices] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

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
      } finally {
        setLoading(false);
      }
    };
    fetchServices();
  }, []);

  const displayServices = dbServices.length > 0 ? dbServices : staticServices;

  const col1 = displayServices.slice(0, 4);
  const col2 = displayServices.slice(4, 9);
  const col3 = displayServices.slice(9, 14);

  const renderLinks = (services: any[]) => (
    <div className="flex flex-col gap-5">
      {loading ? (
        <div className="py-4 text-center text-neutral-400 text-sm">Loading...</div>
      ) : services.length === 0 ? (
        <div className="py-4 text-center text-neutral-400 text-sm">No services found.</div>
      ) : services.map((service, idx) => {
        const IconComponent = (LucideIcons as any)[service.iconName || "Code"] || LucideIcons.Circle;
        return (
          <Link key={idx} to={`/services/${service.slug}`} className="text-sm flex items-center gap-3 text-neutral-600 hover:text-sky-600 transition-colors font-medium">
            <IconComponent className="w-4 h-4 text-neutral-400 shrink-0" /> <span className="truncate">{service.title}</span>
          </Link>
        )
      })}
    </div>
  );

  return (
    <div className="flex w-[850px] bg-white text-neutral-900 overflow-hidden gap-8 p-2">
      {/* Left Sidebar */}
      <div className="w-[280px] flex flex-col gap-2 border-r border-neutral-100 pr-6 shrink-0">
        <div className="bg-sky-500 text-white rounded-xl p-5 cursor-pointer shadow-md">
          <div className="font-bold flex items-center gap-2"><Monitor className="w-4 h-4"/> IT Services</div>
          <p className="text-xs text-sky-100 mt-2 leading-relaxed">Web, mobile, AI, and cloud solutions that fuel growth.</p>
        </div>
      </div>

      {/* Right Content */}
      <div className="flex-1 flex gap-8 pt-2">
        <div className="flex-1 min-w-[200px]">
          <h4 className="font-bold mb-6 text-sm text-neutral-900">Featured Expertise</h4>
          {renderLinks(col1)}
        </div>

        {col2.length > 0 && (
          <div className="flex-1 min-w-[200px]">
            <h4 className="font-bold mb-6 text-sm text-neutral-900">Services</h4>
            {renderLinks(col2)}
          </div>
        )}

        {col3.length > 0 && (
          <div className="flex-1 min-w-[200px]">
            <h4 className="font-bold mb-6 text-sm text-transparent select-none">Services</h4>
            {renderLinks(col3)}
          </div>
        )}
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
        
        {/* Mobile Logo & Toggle */}
        <div className="md:hidden flex items-center justify-between w-full bg-white/80 backdrop-blur-md px-6 py-3 rounded-full border border-neutral-200 shadow-sm">
          <Link to="/" className="flex items-center">
            <img src="/adat-logo.png" alt="Adat Soft Solutions" className="h-8 md:h-10 w-auto" />
          </Link>
          <button onClick={() => setIsMobileMenuOpen(true)}>
            <MenuIcon className="w-6 h-6" />
          </button>
        </div>

        {/* Desktop Navbar (Pill) */}
        <div className="hidden md:block w-full px-4">
          <Menu setActive={setActive}>
            <div className="flex items-center justify-between w-full">
              {/* Logo */}
              <Link to="/" className="flex items-center gap-2 relative z-20">
                <img src="/adat-logo.png" alt="Adat Soft Solutions" className="h-10 md:h-12 w-auto" />
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
              <Button size="sm" className="rounded-full px-6 py-5 ml-8" asChild>
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
