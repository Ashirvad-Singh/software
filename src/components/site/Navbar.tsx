import { useState } from "react"
import { Menu as MenuIcon, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Link, useLocation } from "react-router-dom"
import { HoveredLink, Menu } from "@/components/ui/navbar-menu"
import { motion, AnimatePresence } from "framer-motion"
import { cn } from "@/lib/utils"

const navLinks = [
  { name: "Home", href: "/" },
  { name: "Services", href: "/services" },
  { name: "Work", href: "/work" },
  { name: "Process", href: "/process" },
  { name: "About", href: "/about" },
  { name: "Team", href: "/team" },
  { name: "Careers", href: "/careers" },
  { name: "Gallery", href: "/gallery" },
]

export default function Navbar({ className }: { className?: string }) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const location = useLocation()

  return (
    <>
      <div className={cn("fixed top-4 inset-x-0 max-w-5xl mx-auto z-50 flex items-center justify-between px-4 md:px-0", className)}>
        
        {/* Logo */}
        <Link to="/" className="text-xl md:text-2xl font-bold tracking-tighter hidden md:block">
          Adat Soft<span className="text-primary">.</span>
        </Link>
        
        {/* Mobile Logo & Toggle */}
        <div className="md:hidden flex items-center justify-between w-full bg-white/80 backdrop-blur-md px-6 py-3 rounded-full border border-neutral-200 shadow-sm">
          <Link to="/" className="text-xl font-bold tracking-tighter">
            Adat Soft<span className="text-primary">.</span>
          </Link>
          <button onClick={() => setIsMobileMenuOpen(true)}>
            <MenuIcon className="w-6 h-6" />
          </button>
        </div>

        {/* Desktop Menu */}
        <div className="hidden md:block absolute left-1/2 -translate-x-1/2 w-max">
          <Menu setActive={() => {}}>
            <div className="flex items-center space-x-6 text-sm font-medium">
              <HoveredLink href="/">Home</HoveredLink>
              <HoveredLink href="/services">Services</HoveredLink>
              <HoveredLink href="/work">Work</HoveredLink>
              <HoveredLink href="/process">Process</HoveredLink>
              <HoveredLink href="/about">About</HoveredLink>
              <HoveredLink href="/team">Team</HoveredLink>
              <HoveredLink href="/careers">Careers</HoveredLink>
              <HoveredLink href="/gallery">Gallery</HoveredLink>
            </div>
          </Menu>
        </div>

        {/* Desktop CTA */}
        <div className="hidden md:block">
          <Button size="sm" className="rounded-full px-6 py-5" asChild>
            <Link to="/contact">Get a Quote</Link>
          </Button>
        </div>
      </div>

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
