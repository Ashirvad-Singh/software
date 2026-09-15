import { ArrowUpRight, Mail, MapPin, Phone } from "lucide-react"
import { IconBrandGithub, IconBrandInstagram, IconBrandLinkedin } from "@tabler/icons-react"
import { Link } from "react-router-dom"

export default function Footer() {
  return (
    <footer className="border-t border-border/50 bg-white relative overflow-hidden">
      
      {/* Decorative gradient background for marquee */}
      <div className="absolute inset-0 bg-gradient-to-r from-sky-50 via-white to-sky-100 opacity-60 pointer-events-none"></div>

      {/* Two identical groups make the -50% animation seamless. */}
      <div className="group/marquee relative z-10 flex h-24 sm:h-32 w-full items-center overflow-hidden border-b border-blue-200 bg-blue-50">
        <div className="flex w-max animate-marquee group-hover/marquee:[animation-play-state:paused] group-focus-within/marquee:[animation-play-state:paused] motion-reduce:animate-none">
          {[0, 1].map((group) => (
            <div key={group} aria-hidden={group === 1 ? true : undefined} className="flex shrink-0 items-center gap-8 pr-8">
              {Array.from({ length: 6 }, (_, item) => (
                <Link key={item} to="/contact" tabIndex={group === 0 && item === 0 ? 0 : -1} className="site-button inline-flex shrink-0 items-center gap-4 rounded-full bg-blue-600 px-6 py-3 text-xl sm:text-2xl font-semibold whitespace-nowrap text-white shadow-sm transition-colors hover:bg-blue-700 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-blue-800">
                  Let's Chat
                  <ArrowUpRight aria-hidden="true" className="size-6 shrink-0" />
                </Link>
              ))}
            </div>
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
