import { Mail, MapPin, Phone } from "lucide-react"
import { IconBrandGithub, IconBrandInstagram, IconBrandLinkedin } from "@tabler/icons-react"
import { Link } from "react-router-dom"

export default function Footer() {
  return (
    <footer className="border-t border-border/50 bg-background pt-16 pb-8">
      <div className="container mx-auto px-4 md:px-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
          {/* Brand */}
          <div className="md:col-span-1">
            <Link to="/" className="text-2xl font-bold tracking-tighter mb-4 inline-block">
              Adat Soft Solutions<span className="text-primary">.</span>
            </Link>
            <p className="text-muted-foreground mb-6 max-w-sm">
              We build custom software, web apps, and digital solutions to help your business scale globally.
            </p>
            <div className="flex gap-4">
              <a href="#" className="text-muted-foreground hover:text-primary transition-colors">
                <IconBrandLinkedin className="w-5 h-5" />
              </a>
              <a href="#" className="text-muted-foreground hover:text-primary transition-colors">
                <IconBrandInstagram className="w-5 h-5" />
              </a>
              <a href="#" className="text-muted-foreground hover:text-primary transition-colors">
                <IconBrandGithub className="w-5 h-5" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-semibold text-lg mb-4">Company</h3>
            <ul className="space-y-3">
              <li><Link to="/about" className="text-muted-foreground hover:text-foreground transition-colors">About Us</Link></li>
              <li><Link to="/work" className="text-muted-foreground hover:text-foreground transition-colors">Our Work</Link></li>
              <li><Link to="/process" className="text-muted-foreground hover:text-foreground transition-colors">Process</Link></li>
              <li><Link to="/team" className="text-muted-foreground hover:text-foreground transition-colors">Careers</Link></li>
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
                <span>hello@adatsoft.com</span>
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

        <div className="pt-8 border-t border-border/50 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-sm text-muted-foreground">
            &copy; {new Date().getFullYear()} Adat Soft Solutions. All rights reserved.
          </p>
          <div className="flex gap-6 text-sm text-muted-foreground">
            <a href="#" className="hover:text-foreground transition-colors">Privacy Policy</a>
            <a href="#" className="hover:text-foreground transition-colors">Terms of Service</a>
          </div>
        </div>
      </div>
    </footer>
  )
}
