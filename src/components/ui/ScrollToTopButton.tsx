import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowUp } from "lucide-react";

export default function ScrollToTopButton() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const toggleVisibility = () => {
      if (window.scrollY > 300) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener("scroll", toggleVisibility);
    return () => window.removeEventListener("scroll", toggleVisibility);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.button
          initial={{ opacity: 0, scale: 0.8, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.8, y: 20 }}
          transition={{ duration: 0.3 }}
          onClick={scrollToTop}
          className="fixed bottom-6 right-6 z-[99] p-3.5 rounded-full bg-primary text-primary-foreground shadow-xl hover:bg-primary/90 hover:scale-110 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 transition-all duration-300 border border-white/20 backdrop-blur-md group"
          aria-label="Scroll to top"
          title="Scroll to top"
        >
          <ArrowUp className="w-5 h-5 transition-transform duration-300 group-hover:-translate-y-1" />
        </motion.button>
      )}
    </AnimatePresence>
  );
}
