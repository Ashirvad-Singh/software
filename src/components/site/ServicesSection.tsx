import { motion } from "framer-motion"
import {
  Code2,
  Smartphone,
  ShoppingCart,
  Palette,
  Server,
  Wrench,
  ArrowRight
} from "lucide-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import TechSphere from "./TechSphere"

const services = [
  {
    icon: <Code2 className="w-8 h-8 text-primary" />,
    title: "Custom Website Development",
    description: "High-performance, SEO-optimized web applications built with React, Next.js, and modern tech stacks."
  },
  {
    icon: <Smartphone className="w-8 h-8 text-primary" />,
    title: "Mobile App Development",
    description: "Native and cross-platform mobile experiences for iOS and Android using Flutter and React Native."
  },
  {
    icon: <ShoppingCart className="w-8 h-8 text-primary" />,
    title: "E-commerce Solutions",
    description: "Scalable online stores built on Shopify, WooCommerce, or completely custom tailored to your business."
  },
  {
    icon: <Palette className="w-8 h-8 text-primary" />,
    title: "UI/UX Design",
    description: "Intuitive, user-centered designs that drive engagement and provide seamless user experiences."
  },
  {
    icon: <Server className="w-8 h-8 text-primary" />,
    title: "API & Backend Development",
    description: "Robust, secure backend architectures and REST/GraphQL APIs that power your digital products."
  },
  {
    icon: <Wrench className="w-8 h-8 text-primary" />,
    title: "Maintenance & Support",
    description: "Ongoing technical support, performance optimization, and regular updates to keep your apps running."
  }
]

export default function ServicesSection() {
  return (
    <section id="services" className="py-24 bg-secondary/10 overflow-hidden border-t border-border/50">
      <div className="container mx-auto px-4 md:px-6">
        
        <div className="text-center max-w-3xl mx-auto mb-20">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-sm font-bold text-primary tracking-widest uppercase mb-3"
          >
            Our Services
          </motion.h2>
          <motion.h3
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-3xl md:text-5xl font-bold tracking-tighter mb-6"
          >
            Comprehensive Digital Solutions
          </motion.h3>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-muted-foreground text-lg"
          >
            We offer end-to-end software development services, from initial design to final deployment and ongoing maintenance.
          </motion.p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-24">
          {services.map((service, index) => (
            <motion.div
              key={service.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ delay: index * 0.1, duration: 0.5 }}
            >
              <Card className="h-full bg-background border-border/50 hover:border-primary/50 transition-colors group cursor-pointer overflow-hidden relative">
                <div className="absolute inset-0 bg-primary/5 translate-y-full group-hover:translate-y-0 transition-transform duration-500 ease-out" />
                <CardHeader>
                  <div className="mb-4 bg-secondary w-14 h-14 rounded-lg flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                    {service.icon}
                  </div>
                  <CardTitle className="text-xl relative z-10">{service.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-sm md:text-base mb-6 relative z-10">
                    {service.description}
                  </CardDescription>
                  <div className="flex items-center text-primary text-sm font-medium opacity-0 -translate-x-4 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300 relative z-10">
                    Learn more <ArrowRight className="ml-2 w-4 h-4" />
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>

        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <h3 className="text-3xl md:text-4xl font-bold tracking-tighter mb-6">
              Technologies We Master
            </h3>
            <p className="text-muted-foreground text-lg mb-6">
              We leverage the latest and most reliable technologies to build scalable, secure, and future-proof applications.
            </p>
            <div className="flex flex-wrap gap-2">
              {["React", "Node.js", "TypeScript", "Flutter", "Tailwind CSS", "Next.js", "AWS", "Firebase"].map((tech) => (
                <span key={tech} className="px-3 py-1 bg-secondary text-secondary-foreground rounded-full text-sm font-medium">
                  {tech}
                </span>
              ))}
              <span className="px-3 py-1 bg-secondary text-secondary-foreground rounded-full text-sm font-medium">
                + Many More
              </span>
            </div>
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="w-full"
          >
            <TechSphere />
          </motion.div>
        </div>

      </div>
    </section>
  )
}
