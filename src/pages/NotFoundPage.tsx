import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { ArrowRight, Home } from "lucide-react";
import { Button } from "@/components/ui/button";
import { FloatingShapes } from "@/components/ui/floating-shapes";

export default function NotFoundPage() {
  return (
    <main className="min-h-screen pt-28 md:pt-36 pb-16 md:pb-24 flex items-center justify-center relative overflow-hidden bg-white">
      {/* Background Shapes */}
      <FloatingShapes />
      
      {/* Grid Pattern */}
      <div 
        className="absolute inset-0 pointer-events-none opacity-[0.03] z-0"
        style={{
          backgroundImage: 'radial-gradient(#000 1px, transparent 1px)',
          backgroundSize: '24px 24px'
        }}
      ></div>

      <div className="container mx-auto px-4 relative z-10 flex flex-col items-center justify-center text-center">
        {/* Animated 404 Text */}
        <motion.div
          initial={{ opacity: 0, y: 50, scale: 0.9 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="relative"
        >
          <h1 className="text-[8rem] sm:text-[12rem] md:text-[18rem] font-black text-transparent bg-clip-text bg-gradient-to-br from-neutral-200 to-neutral-50 select-none leading-none tracking-tighter">
            404
          </h1>
          <div className="absolute inset-0 flex items-center justify-center flex-col">
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.4, duration: 0.5 }}
              className="bg-white/80 backdrop-blur-md px-6 py-2 rounded-full border border-neutral-100 shadow-sm mb-4"
            >
              <span className="text-primary font-bold tracking-widest uppercase text-sm">
                Oops! Page Not Found
              </span>
            </motion.div>
          </div>
        </motion.div>

        {/* Content */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6, duration: 0.6 }}
          className="max-w-md mx-auto mt-8"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-neutral-900 mb-4">
            Lost in Space?
          </h2>
          <p className="text-neutral-500 text-lg mb-10 leading-relaxed">
            The page you are looking for might have been removed, had its name changed, or is temporarily unavailable.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Button asChild size="lg" className="rounded-full shadow-md hover:shadow-lg transition-all w-full sm:w-auto group">
              <Link to="/">
                <Home className="w-4 h-4 mr-2" />
                Back to Homepage
              </Link>
            </Button>
            <Button asChild variant="outline" size="lg" className="rounded-full border-neutral-200 hover:bg-neutral-50 w-full sm:w-auto">
              <Link to="/contact">
                Contact Support <ArrowRight className="w-4 h-4 ml-2 opacity-70 group-hover:opacity-100 transition-opacity" />
              </Link>
            </Button>
          </div>
        </motion.div>
      </div>
    </main>
  );
}
