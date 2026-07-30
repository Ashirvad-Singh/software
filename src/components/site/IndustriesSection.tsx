import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import { 
  Heart, 
  DollarSign, 
  Utensils, 
  ShoppingCart, 
  Layers, 
  GraduationCap, 
  Truck, 
  Home, 
  Share2, 
  Plane, 
  Leaf, 
  Shield 
} from "lucide-react";

const industries = [
  { name: "Healthcare", icon: Heart },
  { name: "Finance", icon: DollarSign },
  { name: "Restaurant", icon: Utensils },
  { name: "eCommerce", icon: ShoppingCart },
  { name: "SaaS", icon: Layers },
  { name: "Education", icon: GraduationCap },
  { name: "Logistics", icon: Truck },
  { name: "Real Estate", icon: Home },
  { name: "Social Media", icon: Share2 },
  { name: "Aviation", icon: Plane },
  { name: "Agriculture", icon: Leaf },
  { name: "Insurance", icon: Shield },
];

export default function IndustriesSection() {
  return (
    <section className="relative py-12 sm:py-16 md:py-20 lg:py-24 overflow-x-hidden bg-white dark:bg-neutral-950">
      {/* Background Glows */}
      <div className="absolute top-0 left-0 w-[500px] h-[500px] bg-purple-500/10 dark:bg-purple-500/5 blur-[100px] rounded-full pointer-events-none -translate-x-1/2 -translate-y-1/2"></div>
      <div className="absolute bottom-0 right-0 w-[500px] h-[500px] bg-sky-500/10 dark:bg-sky-500/5 blur-[100px] rounded-full pointer-events-none translate-x-1/2 translate-y-1/2"></div>

      <div className="container mx-auto px-4 sm:px-6 md:px-8 relative z-10 max-w-7xl">
        {/* Header */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-4 sm:gap-6 md:gap-8 mb-16 lg:mb-24">
          <div className="max-w-3xl">
            <motion.h2 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-black text-neutral-900 dark:text-white leading-[1.1] tracking-tight"
            >
              Accelerate Growth with <br className="hidden sm:block" /> Tailored <span className="text-sky-500">IT Solutions</span>
              <span className="inline-block w-4 h-4 md:w-5 md:h-5 bg-sky-500 rotate-45 ml-3 md:ml-4 transform -translate-y-1 md:-translate-y-2 rounded-sm"></span>
            </motion.h2>
          </div>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-sm sm:text-base md:text-lg text-neutral-600 dark:text-neutral-400 max-w-sm lg:pb-2"
          >
            Delivering scalable web, mobile, AI, and cloud solutions designed around your business goals.
          </motion.p>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 mx-auto border-t border-l border-sky-100/60 dark:border-sky-900/30">
          {industries.map((item, index) => (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.05 }}
              key={index}
              className={cn(
                "group flex flex-col items-center justify-center p-3.5 sm:p-5 md:p-6 lg:p-8 hover:bg-neutral-50/50 dark:hover:bg-neutral-900/20 transition-all cursor-pointer",
                // Base borders
                "border-b border-r border-sky-100/60 dark:border-sky-900/30"
              )}
            >
              <div className="w-11 h-11 sm:w-14 sm:h-14 md:w-16 md:h-16 bg-sky-50 dark:bg-sky-900/20 rounded-2xl flex items-center justify-center mb-3 sm:mb-4 md:mb-6 text-sky-500 group-hover:scale-110 group-hover:bg-sky-500 group-hover:text-white transition-all duration-300">
                <item.icon className="w-5 h-5 sm:w-6 sm:h-6 md:w-7 md:h-7 stroke-[1.5]" />
              </div>
              <span className="font-semibold text-neutral-800 dark:text-neutral-200 text-xs sm:text-sm md:text-base tracking-tight text-center">
                {item.name}
              </span>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
