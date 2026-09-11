import { motion } from "framer-motion";
import { MousePointer2 } from "lucide-react";
import { Link } from "react-router-dom";

const FloatingCursor = ({
  color,
  name,
  className,
  delay = 0,
}: {
  color: string;
  name: string;
  className: string;
  delay?: number;
}) => {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.8 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true }}
      animate={{
        y: [0, -10, 0],
        x: [0, 5, 0],
      }}
      transition={{
        y: { repeat: Infinity, duration: 3, ease: "easeInOut", delay },
        x: { repeat: Infinity, duration: 4, ease: "easeInOut", delay: delay + 0.5 },
        opacity: { duration: 0.5 },
      }}
      className={`absolute z-20 flex items-center gap-1 ${className}`}
    >
      <MousePointer2 className="w-5 h-5 -rotate-12 drop-shadow-md" style={{ fill: color, color: color }} />
      <div
        className="px-2 py-1 text-[10px] font-bold tracking-wide rounded shadow-sm"
        style={{ 
          backgroundColor: color,
          color: color === "#ffffff" ? "#000000" : "#ffffff"
        }}
      >
        {name}
      </div>
    </motion.div>
  );
};

export default function UpgradeBrandCta() {
  return (
    <section className="py-10 md:py-16 relative w-full overflow-hidden bg-[#ffe885]">
      <div className="container mx-auto px-4 relative z-10 flex flex-col items-center justify-center min-h-[400px]">
        
        {/* Center Content */}
        <div className="max-w-2xl text-center relative z-30">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mb-4"
          >
            <span className="text-neutral-800 font-medium tracking-wide">
              — Book A Call
            </span>
          </motion.div>
          
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-4xl md:text-5xl lg:text-6xl font-medium text-neutral-900 mb-6"
          >
            Upgrade Your <span className="text-blue-700 italic font-serif">Brand!</span>
          </motion.h2>
          
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-neutral-800 md:text-lg mb-10 max-w-xl mx-auto leading-relaxed"
          >
            Schedule a call with our experts to discuss how we can craft bespoke solutions tailored to your goals. Let's create something extraordinary together.
          </motion.p>
          
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3 }}
          >
            <Link
              to="/contact"
              className="inline-block bg-[#f36c31] hover:bg-[#e05a1f] text-white font-medium py-3 px-8 text-lg transition-colors shadow-lg"
            >
              Request a Consultation
            </Link>
          </motion.div>
        </div>

        {/* Floating Images & Cursors */}
        
        {/* Top Left Image */}
        <motion.div
          initial={{ opacity: 0, x: -50, y: -50 }}
          whileInView={{ opacity: 1, x: 0, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="absolute top-0 left-0 w-48 md:w-64 lg:w-80 shadow-2xl z-10 hidden sm:block"
        >
          <img
            src="https://images.unsplash.com/photo-1517694712202-14dd9538aa97?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
            alt="Web Design Mockup"
            className="w-full h-auto object-cover rounded-br-lg"
          />
        </motion.div>

        {/* Bottom Left Image */}
        <motion.div
          initial={{ opacity: 0, x: -50, y: 50 }}
          whileInView={{ opacity: 1, x: 0, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="absolute bottom-0 left-10 w-40 md:w-56 lg:w-72 shadow-2xl z-10 hidden sm:block"
        >
          <img
            src="https://images.unsplash.com/photo-1498050108023-c5249f4df085?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80"
            alt="Development Workspace"
            className="w-full h-auto object-cover rounded-tr-lg"
          />
        </motion.div>

        {/* Top Right Image */}
        <motion.div
          initial={{ opacity: 0, x: 50, y: -50 }}
          whileInView={{ opacity: 1, x: 0, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="absolute top-5 right-0 w-48 md:w-64 lg:w-80 shadow-2xl z-10 hidden sm:block"
        >
          <img
            src="https://images.unsplash.com/photo-1460925895917-afdab827c52f?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
            alt="Analytics Dashboard"
            className="w-full h-auto object-cover rounded-bl-lg"
          />
        </motion.div>

        {/* Bottom Right Image */}
        <motion.div
          initial={{ opacity: 0, x: 50, y: 50 }}
          whileInView={{ opacity: 1, x: 0, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.5 }}
          className="absolute bottom-0 right-0 w-44 md:w-60 lg:w-72 shadow-2xl z-10 hidden sm:block"
        >
          <img
            src="https://images.unsplash.com/photo-1555421689-491a97ff2040?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80"
            alt="Mobile App Design"
            className="w-full h-auto object-cover rounded-tl-lg"
          />
        </motion.div>

        {/* Cursors */}
        <FloatingCursor
          color="#1d4ed8" // blue-700
          name="Sukumar"
          className="top-[15%] right-[25%] md:right-[35%]"
          delay={0}
        />
        <FloatingCursor
          color="#d946ef" // fuchsia-500
          name="Emmanuel"
          className="top-[45%] left-[20%] md:left-[28%]"
          delay={0.5}
        />
        <FloatingCursor
          color="#10b981" // emerald-500
          name="Scarlett"
          className="bottom-[25%] right-[20%] md:right-[30%]"
          delay={1}
        />
        <FloatingCursor
          color="#ffffff"
          name="Josh"
          className="bottom-[15%] left-[30%] md:left-[40%]"
          delay={1.5}
        />

      </div>
    </section>
  );
}
