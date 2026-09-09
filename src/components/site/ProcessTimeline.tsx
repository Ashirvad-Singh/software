import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";

const processSteps = [
  {
    number: "01",
    title: "Discovery & Strategy",
    description: "Deep dive into business goals, user needs, and strategic technical roadmap.",
  },
  {
    number: "02",
    title: "Architecture & UI/UX",
    description: "Designing scalable cloud architecture, wireframes, and intuitive user interfaces.",
  },
  {
    number: "03",
    title: "Agile Development",
    description: "Iterative sprint coding, robust API integrations, and clean code standards.",
  },
  {
    number: "04",
    title: "Quality & Security",
    description: "Rigorous automated testing, security audits, and multi-device performance tuning.",
  },
  {
    number: "05",
    title: "Deployment & Scaling",
    description: "Production cloud launch, real-time monitoring, and continuous product evolution.",
  },
];

const ParticleWave = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationFrameId: number;
    let width = (canvas.width = canvas.parentElement?.clientWidth || 1000);
    let height = (canvas.height = 240);

    const handleResize = () => {
      if (!canvas.parentElement) return;
      width = canvas.width = canvas.parentElement.clientWidth;
      height = canvas.height = 240;
    };
    window.addEventListener("resize", handleResize);

    let step = 0;

    const render = () => {
      ctx.clearRect(0, 0, width, height);
      step += 0.015;

      const rows = 14;
      const colSpacing = 24;
      const cols = Math.floor(width / colSpacing) + 3;

      for (let r = 0; r < rows; r++) {
        const yBase = height * 0.35 + r * 11;
        const scale = 0.5 + r * 0.05;

        for (let c = 0; c < cols; c++) {
          const x = c * colSpacing - 12;
          const dist = Math.sin(c * 0.18 + step + r * 0.25);
          const y = yBase + dist * (9 + r * 1.6);
          const alpha = (r / rows) * 0.75 + 0.15;
          const size = 1.2 * scale + (dist + 1) * 0.7;

          // Particle
          ctx.beginPath();
          ctx.arc(x, y, size, 0, Math.PI * 2);
          ctx.fillStyle = `rgba(14, 165, 233, ${alpha * 0.8})`;
          ctx.shadowColor = "#0284c7";
          ctx.shadowBlur = size * 2;
          ctx.fill();

          // Horizontal wireframe line
          if (c < cols - 1) {
            const nextDist = Math.sin((c + 1) * 0.18 + step + r * 0.25);
            const nextY = yBase + nextDist * (9 + r * 1.6);
            ctx.beginPath();
            ctx.moveTo(x, y);
            ctx.lineTo((c + 1) * colSpacing - 12, nextY);
            ctx.strokeStyle = `rgba(56, 189, 248, ${alpha * 0.35})`;
            ctx.lineWidth = 0.6;
            ctx.shadowBlur = 0;
            ctx.stroke();
          }

          // Vertical wireframe line
          if (r < rows - 1) {
            const nextRowYBase = height * 0.35 + (r + 1) * 11;
            const nextRowDist = Math.sin(c * 0.18 + step + (r + 1) * 0.25);
            const nextRowY = nextRowYBase + nextRowDist * (9 + (r + 1) * 1.6);
            ctx.beginPath();
            ctx.moveTo(x, y);
            ctx.lineTo(x, nextRowY);
            ctx.strokeStyle = `rgba(56, 189, 248, ${alpha * 0.3})`;
            ctx.lineWidth = 0.5;
            ctx.shadowBlur = 0;
            ctx.stroke();
          }
        }
      }

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="absolute bottom-0 inset-x-0 w-full h-[240px] pointer-events-none opacity-80 z-0"
    />
  );
};

export default function ProcessTimeline({ hideHeader = false }: { hideHeader?: boolean }) {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  return (
    <section id="process" className={`w-full bg-gradient-to-b from-white via-sky-50/50 to-slate-100/90 dark:from-[#060D27] dark:via-[#050B1E] dark:to-[#020617] border-y border-neutral-200/80 dark:border-sky-500/20 text-foreground relative overflow-hidden ${hideHeader ? "py-12 sm:py-16 md:py-20" : "py-16 sm:py-20 md:py-24"}`}>
      <div className="w-full max-w-[1600px] mx-auto px-4 sm:px-8 md:px-12 lg:px-16 relative z-10">
        {!hideHeader && (
          <div className="text-center max-w-3xl mx-auto mb-12 sm:mb-16">
            <h2 className="text-xs sm:text-sm font-bold text-sky-600 dark:text-sky-400 tracking-widest uppercase mb-3">
              How We Work
            </h2>
            <h3 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-neutral-900 dark:text-white">
              Our Process
            </h3>
          </div>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-16 items-start pb-28 md:pb-32">
          {/* Left Column */}
          <div className="lg:col-span-5 flex flex-col justify-between h-full">
            <div>
              <h3 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold tracking-tight text-neutral-900 dark:text-white leading-tight">
                Your Path <br className="hidden sm:inline" />
                to Success
              </h3>
              <p className="mt-5 text-sm sm:text-base leading-relaxed text-neutral-600 dark:text-sky-200/70 max-w-md font-normal">
                ADAT Soft Solutions offers a structured engineering approach to scaling your business, ensuring you have the right strategies, architecture, and continuous execution.
              </p>
            </div>

            {/* Large Outline Arrow */}
            <div className="mt-10 lg:mt-20 text-sky-500/25 dark:text-sky-500/25">
              <svg
                className="w-24 h-24 sm:w-32 sm:h-32"
                viewBox="0 0 100 100"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M20 80L80 20M80 20H35M80 20V65"
                  stroke="currentColor"
                  strokeWidth="3.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </div>
          </div>

          {/* Right Column: Process Steps List */}
          <div className="lg:col-span-7 flex flex-col border-t border-neutral-200/80 dark:border-sky-900/40">
            {processSteps.map((step, index) => {
              const isHovered = hoveredIndex === index;
              return (
                <motion.div
                  key={step.number}
                  initial={{ opacity: 0, x: 20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: index * 0.08 }}
                  onMouseEnter={() => setHoveredIndex(index)}
                  onMouseLeave={() => setHoveredIndex(null)}
                  className={`py-6 border-b border-neutral-200/80 dark:border-sky-900/40 grid grid-cols-1 md:grid-cols-12 items-center gap-4 transition-all duration-300 ${
                    isHovered ? "bg-sky-500/10 px-4 rounded-xl border-sky-300 dark:border-sky-500/40" : "px-2"
                  }`}
                >
                  {/* Number Circle & Step Title */}
                  <div className="md:col-span-6 flex items-center gap-4 sm:gap-6">
                    <div className={`w-10 h-10 sm:w-11 sm:h-11 rounded-full border flex items-center justify-center text-xs sm:text-sm font-semibold shrink-0 transition-colors ${
                      isHovered
                        ? "border-sky-500 bg-sky-500 text-white shadow-md shadow-sky-500/30"
                        : "border-sky-200 dark:border-sky-400/30 text-sky-600 dark:text-sky-200 bg-sky-50 dark:bg-sky-950/30"
                    }`}>
                      {step.number}
                    </div>
                    <h4 className="text-base sm:text-lg lg:text-xl font-bold text-neutral-900 dark:text-white tracking-wide">
                      {step.title}
                    </h4>
                  </div>

                  {/* Step Description */}
                  <div className="md:col-span-6">
                    <p className="text-xs sm:text-sm text-neutral-600 dark:text-sky-200/70 leading-relaxed font-normal">
                      {step.description}
                    </p>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>

      {/* 3D Particle Mesh Background */}
      <ParticleWave />
    </section>
  );
}

