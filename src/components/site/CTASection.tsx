import { ArrowRight, MessageCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import type { Variants } from "framer-motion";

export default function CTASection() {
  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
      },
    },
  };

  const itemVariants: Variants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: "easeOut" },
    },
  };

  return (
    <section className="py-10 sm:py-12 md:py-16 bg-white text-neutral-900 relative overflow-hidden font-sans border-t border-neutral-100">
      <div className="container mx-auto px-4 sm:px-6 md:px-8 lg:px-8 max-w-7xl">
        {/* Dashed Box Container */}
        <div className="grid grid-cols-1 lg:grid-cols-[1.2fr_1fr] border-y border-dashed border-neutral-300">
          {/* Left Side: Copy & Buttons */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            className="p-4 sm:p-6 md:p-12 lg:p-10 xl:p-16 border-b lg:border-b-0 lg:border-r border-dashed border-neutral-300"
          >
            <motion.h2
              variants={itemVariants}
              className="text-2xl sm:text-3xl md:text-4xl lg:text-[2.75rem] leading-[1.1] font-normal text-neutral-600 mb-4 tracking-tight"
            >
              Build{" "}
              <span className="font-bold text-neutral-900">
                websites and apps
              </span>{" "}
              with the speed of light
            </motion.h2>
            <motion.p
              variants={itemVariants}
              className="text-lg sm:text-xl md:text-2xl lg:text-[2rem] leading-[1.2] font-normal text-neutral-600 mb-8 sm:mb-10 tracking-tight"
            >
              Get the best in class{" "}
              <span className="text-blue-600">support</span> for your company's{" "}
              <span className="text-purple-600">digital presence</span>.
            </motion.p>

            <motion.div
              variants={itemVariants}
              className="flex flex-col sm:flex-row sm:flex-wrap items-stretch sm:items-center gap-4"
            >
              <Button
                asChild
                className="w-full sm:w-auto bg-blue-600 hover:bg-blue-700 text-white rounded-xl px-7 py-6 text-base font-semibold shadow-[0_0_20px_rgba(37,99,235,0.2)] transition-all"
              >
                <Link to="/contact" className="flex items-center justify-center">
                  Start Project <ArrowRight className="ml-2 w-4 h-4" />
                </Link>
              </Button>
              <Button
                asChild
                variant="outline"
                className="w-full sm:w-auto bg-white hover:bg-neutral-50 border-neutral-300 text-neutral-900 rounded-xl px-7 py-6 text-base font-medium transition-all shadow-sm"
              >
                <Link to="/contact" className="flex items-center justify-center">
                  Talk to us{" "}
                  <MessageCircle className="ml-2 w-4 h-4 text-neutral-500" />
                </Link>
              </Button>
            </motion.div>
          </motion.div>

          {/* Right Side: Mini Testimonial */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="p-4 sm:p-6 md:p-12 lg:p-10 xl:p-16 flex flex-col justify-center"
          >
            <blockquote className="text-base sm:text-lg leading-relaxed text-neutral-700 mb-8 font-medium">
              "Adat Soft Solutions is the best development partner ever. Ten on
              ten recommended. I just can't wait to see what happens with our
              new mobile app and website."
            </blockquote>

            <div>
              <p className="font-bold text-neutral-900 mb-1"> </p>
              <p className="text-neutral-500 text-sm">Tech Entrepreneur</p>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
