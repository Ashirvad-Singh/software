import { useState } from "react"
import { Menu as MenuIcon, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Link, useLocation } from "react-router-dom"
import { HoveredLink, Menu } from "@/components/ui/navbar-menu"
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

export default function Navbar({ className }: { className?: string }) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
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
          <Link to="/" className="text-xl font-bold tracking-tighter">
            Adat Soft<span className="text-primary">.</span>
          </Link>
          <button onClick={() => setIsMobileMenuOpen(true)}>
            <MenuIcon className="w-6 h-6" />
          </button>
        </div>

        {/* Desktop Navbar (Pill) */}
        <div className="hidden md:block w-full px-4">
          <Menu setActive={() => {}}>
            <div className="flex items-center justify-between w-full">
              {/* Logo */}
              <Link to="/" className="text-xl font-black text-neutral-900 flex items-center gap-2 relative z-20">
              Adat Soft Solutions<span className="text-primary">.</span>
            </Link>
              
              {/* Links */}
              <div className="flex items-center justify-center space-x-4 lg:space-x-8 text-sm font-medium flex-1">
                {navLinks.map((link) => (
                  <HoveredLink 
                    key={link.name} 
                    href={link.href}
                    active={location.pathname === link.href || (link.href !== "/" && location.pathname.startsWith(link.href))}
                  >
                    {link.name}
                  </HoveredLink>
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
