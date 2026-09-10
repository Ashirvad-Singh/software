import { useEffect, useRef } from "react";

export default function ParticleWave() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationFrameId = 0;
    let visible = false;
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
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
      if (!reducedMotion.matches) step += 0.015;

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

      if (visible && !document.hidden && !reducedMotion.matches) {
        animationFrameId = requestAnimationFrame(render);
      }
    };

    const updateAnimation = () => {
      cancelAnimationFrame(animationFrameId);
      render();
    };
    const observer = new IntersectionObserver(([entry]) => {
      visible = entry.isIntersecting;
      updateAnimation();
    });
    observer.observe(canvas);
    reducedMotion.addEventListener("change", updateAnimation);
    document.addEventListener("visibilitychange", updateAnimation);
    window.addEventListener("resize", updateAnimation);
    render();

    return () => {
      observer.disconnect();
      reducedMotion.removeEventListener("change", updateAnimation);
      document.removeEventListener("visibilitychange", updateAnimation);
      window.removeEventListener("resize", updateAnimation);
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <canvas
      aria-hidden="true"
      ref={canvasRef}
      className="absolute bottom-0 inset-x-0 w-full h-[240px] pointer-events-none opacity-80 z-0"
    />
  );
};
