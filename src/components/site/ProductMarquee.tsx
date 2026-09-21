import { ThreeDMarquee } from "@/components/ui/3d-marquee";
import { Link } from "react-router-dom";

export default function ProductMarquee() {
  const baseImages = [
    "/adat_hero_ui.webp",
    "/adat_mobile_app.webp",
    "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&q=80&w=600",
    "https://images.unsplash.com/photo-1576091160550-2173dba999ef?auto=format&fit=crop&q=80&w=600",
    "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&q=80&w=600",
    "https://images.unsplash.com/photo-1581291518633-83b4ebd1d83e?auto=format&fit=crop&q=80&w=600",
    "/adat_mobile_app.webp",
    "https://images.unsplash.com/photo-1512486130939-2c4f79935e4f?auto=format&fit=crop&q=80&w=600",
    "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?auto=format&fit=crop&q=80&w=600",
    "/adat_hero_ui.webp",
    "https://images.unsplash.com/photo-1531403009284-440f080d1e12?auto=format&fit=crop&q=80&w=600",
    "https://images.unsplash.com/photo-1555421689-491a97ff2040?auto=format&fit=crop&q=80&w=600",
    "/adat_mobile_app.webp",
    "https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&q=80&w=600",
    "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&q=80&w=600",
    "/adat_hero_ui.webp",
  ];
  const images = [...baseImages, ...baseImages, ...baseImages];

  return (
    <div className="relative w-full flex flex-col items-center justify-center overflow-hidden bg-neutral-50 dark:bg-neutral-900 border-y border-neutral-200 py-10 md:py-12">
      <h2 className="relative z-20 mx-auto max-w-4xl text-center text-fluid-h2 font-bold text-balance text-black dark:text-white px-4 tracking-tight">
        Build digital products that redefine your{" "}
        <span className="relative z-20 inline-block rounded-2xl bg-primary/10 px-4 py-2 text-primary underline decoration-primary/40 decoration-[4px] underline-offset-[12px] backdrop-blur-sm">
          Industry
        </span>
      </h2>
      <p className="relative z-20 mx-auto max-w-2xl py-4 text-center text-fluid-body text-neutral-600 dark:text-neutral-300 px-4 leading-relaxed">
        We specialize in modern web and mobile applications that scale effortlessly. 
        Partner with Adat Soft Solutions to transform your boldest ideas into reality.
      </p>

      <div className="relative z-20 flex flex-wrap items-center justify-center gap-3 px-4 pt-2">
        <Link 
          to="/contact"
          className="rounded-full bg-primary px-8 py-3 text-sm font-medium text-primary-foreground transition-all hover:bg-primary/90 hover:scale-105 focus:ring-2 focus:ring-primary focus:ring-offset-2 focus:outline-none shadow-lg"
        >
          Start Your Project
        </Link>
        <Link 
          to="/work"
          className="rounded-full border border-neutral-300/50 bg-white/60 px-8 py-3 text-sm font-medium text-neutral-900 backdrop-blur-md transition-all hover:bg-white/90 hover:scale-105 focus:ring-2 focus:ring-neutral-200 focus:outline-none shadow-sm"
        >
          Explore Our Work
        </Link>
      </div>

      {/* Overlay to ensure text readability */}
      <div className="absolute inset-0 z-10 h-full w-full bg-white/70 dark:bg-black/80 backdrop-blur-[1px]" />
      
      {/* 3D Background */}
      <ThreeDMarquee
        className="pointer-events-none absolute inset-0 h-full w-full opacity-60 dark:opacity-40"
        images={images}
      />
    </div>
  );
}
