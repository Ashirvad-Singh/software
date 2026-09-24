import { useEffect } from "react"
import { Mail, MapPin } from "lucide-react"
import CompanyLinks from "./CompanyLinks"
import { Link } from "react-router-dom"
import { useCatalog } from "@/lib/content/useCatalog"

export default function Footer() {
  const { entries: services } = useCatalog("services")

  const defaultServices = [
    { title: "CMS & E-commerce", slug: "cms-ecommerce-development" },
    { title: "Web Development", slug: "web-development" },
    { title: "Mobile Apps", slug: "mobile-app-development" },
    { title: "UI/UX Design", slug: "ui-ux-design" },
  ]

  const displayServices = services && services.length > 0 ? services : defaultServices

  useEffect(() => {
    const scriptId = "dmca-badge-helper"
    if (!document.getElementById(scriptId)) {
      const script = document.createElement("script")
      script.id = scriptId
      script.src = "https://images.dmca.com/Badges/DMCABadgeHelper.min.js"
      script.async = true
      document.body.appendChild(script)
    }
  }, [])

  return (
    <footer className="border-t border-border/50 bg-white relative overflow-hidden">
      
      {/* Decorative footer background */}
      <div className="absolute inset-0 bg-gradient-to-r from-sky-50 via-white to-sky-100 opacity-60 pointer-events-none"></div>

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
            <CompanyLinks />
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
            <ul className="space-y-2.5 text-sm">
              {displayServices.map((service, idx) => (
                <li key={service.slug || idx}>
                  <Link 
                    to={`/services/${service.slug}`} 
                    className="text-muted-foreground hover:text-foreground transition-colors"
                  >
                    {service.title}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="font-semibold text-lg mb-4">Contact</h3>
            <ul className="space-y-4">
              <li className="flex items-start gap-3 text-muted-foreground">
                <Mail className="w-5 h-5 text-primary shrink-0 mt-0.5" />
                <a href="mailto:info@adatsolutions.com" className="min-w-0 break-words hover:text-primary transition-colors">info@adatsolutions.com</a>
              </li>
              <li className="flex items-start gap-3 text-muted-foreground">
                <MapPin className="w-5 h-5 text-primary shrink-0 mt-0.5" />
                <span>Plot no - ITC -11, Sector -67,<br/>Mohali (India)</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="pt-8 pb-12 sm:pb-0 border-t border-border/50 flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex flex-wrap items-center justify-center md:justify-start gap-3 sm:gap-4 text-sm text-muted-foreground text-center md:text-left">
            <span className="whitespace-nowrap">&copy; {new Date().getFullYear()} Adat Soft Solutions. All rights reserved.</span>
            <a 
              href="https://www.dmca.com/Protection/Status.aspx?ID=94738ecb-bb55-43fe-b0df-9fb2dba662fc" 
              title="DMCA.com Protection Status" 
              className="dmca-badge inline-flex items-center hover:opacity-90 transition-opacity"
              target="_blank" 
              rel="noopener noreferrer"
            >
              <img 
                src="https://images.dmca.com/Badges/dmca-badge-w100-5x1-07.png?ID=94738ecb-bb55-43fe-b0df-9fb2dba662fc" 
                alt="DMCA.com Protection Status" 
                className="h-6 w-auto"
              />
            </a>
          </div>
          <div className="flex items-center gap-6 text-sm text-muted-foreground shrink-0">
            <Link to="/privacy" className="hover:text-foreground transition-colors whitespace-nowrap">Privacy Policy</Link>
            <Link to="/terms" className="hover:text-foreground transition-colors whitespace-nowrap">Terms of Service</Link>
          </div>
        </div>
      </div>
    </footer>
  )
}
