import { Mail, MapPin, Phone } from "lucide-react"
import { IconBrandGithub, IconBrandInstagram, IconBrandLinkedin } from "@tabler/icons-react"
import { Link } from "react-router-dom"
import { MagneticButton } from "@/components/ui/magnetic-button"

export default function Footer() {
  return (
    <footer className="border-t border-border/50 bg-white relative overflow-hidden">
      
      {/* Decorative gradient background for marquee */}
      <div className="absolute inset-0 bg-gradient-to-r from-sky-50 via-white to-sky-100 opacity-60 pointer-events-none"></div>

      {/* Marquee Section */}
      <div className="w-full overflow-hidden border-b border-border/30 py-6 sm:py-10 relative z-10">
        <div className="flex w-max animate-marquee">
          {[...Array(6)].map((_, i) => (
            <Link key={i} to="/contact" className="flex items-center px-4 sm:px-8 group">
              <span className="text-2xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-blue-600 tracking-tight leading-none pr-4 sm:pr-8 group-hover:text-blue-700 transition-colors">
                Let's Chat
              </span>
              <MagneticButton>
                <div className="w-10 h-10 sm:w-12 sm:h-12 md:w-14 md:h-14 bg-blue-600 rounded-full flex items-center justify-center shrink-0 group-hover:scale-110 transition-transform">
                  <svg className="w-5 h-5 sm:w-6 sm:h-6 text-white" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M5 12H19M19 12L12 5M19 12L12 19" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </div>
              </MagneticButton>
            </Link>
          ))}
        </div>
      </div>

      <div className="container mx-auto px-4 sm:px-6 md:px-8 pt-10 sm:pt-12 md:pt-16 pb-6 md:pb-8 relative z-10">
        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-8 lg:gap-10 mb-8 md:mb-12">
          {/* Brand */}
          <div className="md:col-span-1">
            <Link to="/" className="mb-4 inline-block">
              <img src="/adat-logo.png" alt="Adat Soft Solutions" className="h-12 md:h-14 w-auto max-w-full" />
            </Link>
            <p className="text-muted-foreground mb-6 max-w-sm">
              We build custom software, web apps, and digital solutions to help your business scale globally.
            </p>
            <div className="flex gap-4">
              <a href="#" aria-label="LinkedIn" className="text-muted-foreground hover:text-primary transition-colors">
                <IconBrandLinkedin className="w-5 h-5" />
              </a>
              <a href="#" aria-label="Instagram" className="text-muted-foreground hover:text-primary transition-colors">
                <IconBrandInstagram className="w-5 h-5" />
              </a>
              <a href="#" aria-label="GitHub" className="text-muted-foreground hover:text-primary transition-colors">
                <IconBrandGithub className="w-5 h-5" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-semibold text-lg mb-4">Company</h3>
            <ul className="space-y-2.5 text-sm">
              <li><Link to="/about" className="text-muted-foreground hover:text-foreground transition-colors">About Us</Link></li>
              <li><Link to="/team" className="text-muted-foreground hover:text-foreground transition-colors">Our Team</Link></li>
              <li><Link to="/careers" className="text-muted-foreground hover:text-foreground transition-colors">Careers</Link></li>
              <li><Link to="/gallery" className="text-muted-foreground hover:text-foreground transition-colors">Gallery</Link></li>
              <li><Link to="/work" className="text-muted-foreground hover:text-foreground transition-colors">Our Work</Link></li>
              <li><Link to="/about#process" className="text-muted-foreground hover:text-foreground transition-colors">Our Process</Link></li>
            </ul>
          </div>


          {/* Services */}
          <div>
            <h3 className="font-semibold text-lg mb-4">Services</h3>
            <ul className="space-y-3">
              <li><Link to="/services" className="text-muted-foreground hover:text-foreground transition-colors">Web Development</Link></li>
              <li><Link to="/services" className="text-muted-foreground hover:text-foreground transition-colors">Mobile Apps</Link></li>
              <li><Link to="/services" className="text-muted-foreground hover:text-foreground transition-colors">UI/UX Design</Link></li>
              <li><Link to="/services" className="text-muted-foreground hover:text-foreground transition-colors">E-commerce</Link></li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="font-semibold text-lg mb-4">Contact</h3>
            <ul className="space-y-4">
              <li className="flex items-start gap-3 text-muted-foreground">
                <Mail className="w-5 h-5 text-primary shrink-0 mt-0.5" />
                <span className="min-w-0 break-words">hello@adatsoft.com</span>
              </li>
              <li className="flex items-start gap-3 text-muted-foreground">
                <Phone className="w-5 h-5 text-primary shrink-0 mt-0.5" />
                <span>+1 (555) 123-4567</span>
              </li>
              <li className="flex items-start gap-3 text-muted-foreground">
                <MapPin className="w-5 h-5 text-primary shrink-0 mt-0.5" />
                <span>123 Tech Lane, Silicon Valley<br/>CA 94043, USA</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="pt-8 border-t border-border/50 flex flex-col lg:flex-row items-center justify-between gap-4">
          <p className="text-sm text-muted-foreground">
            &copy; {new Date().getFullYear()} Adat Soft Solutions. All rights reserved.
          </p>
          <div className="flex gap-6 text-sm text-muted-foreground">
            <Link to="/privacy" className="hover:text-foreground transition-colors">Privacy Policy</Link>
            <Link to="/terms" className="hover:text-foreground transition-colors">Terms of Service</Link>
          </div>
        </div>
      </div>
    </footer>
  )
}
