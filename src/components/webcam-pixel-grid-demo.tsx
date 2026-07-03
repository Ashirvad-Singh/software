import { WebcamPixelGrid } from "@/components/ui/webcam-pixel-grid";
import { ArrowRight, ChevronDown } from "lucide-react";
import Magnetic from "@/components/ui/magnetic";
import { Button } from "@/components/ui/button";

export default function WebcamPixelGridDemo() {
  return (
    <section id="home" className="relative h-screen w-screen bg-black overflow-hidden pt-20">
      {/* Webcam pixel grid background */}
      <div className="absolute inset-0 z-0">
        <WebcamPixelGrid
          gridCols={60}
          gridRows={40}
          maxElevation={50}
          motionSensitivity={0.25}
          elevationSmoothing={0.2}
          colorMode="webcam"
          backgroundColor="#030303"
          mirror={true}
          gapRatio={0.05}
          invertColors={false}
          darken={0.6}
          borderColor="#ffffff"
          borderOpacity={0.06}
          className="w-full h-full"
          onWebcamReady={() => console.log("Webcam ready!")}
          onWebcamError={(err) => console.error("Webcam error:", err)}
        />
      </div>

      {/* Gradient overlay for better text readability */}
      <div className="absolute inset-0 bg-gradient-to-b from-background/40 via-transparent to-background pointer-events-none z-0" />

      {/* Hero content */}
      <div className="relative z-10 flex h-full flex-col items-center justify-center px-4 pt-10">
        <div className="max-w-4xl text-center">
          {/* Badge */}
          <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-1.5 text-sm text-white/70 backdrop-blur-sm shadow-xl">
            Introducing Adat Soft Solutions <ArrowRight className="w-4 h-4 ml-1" />
          </div>

          {/* Title */}
          <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold tracking-tighter mb-6 text-white drop-shadow-lg">
            We Build Apps & Websites <br className="hidden md:block" />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-blue-300">
              That Grow Your Business
            </span>
          </h1>

          {/* Description */}
          <p className="text-lg md:text-xl text-white/80 max-w-2xl mx-auto mb-10 drop-shadow-md">
            Adat Soft Solutions creates custom software, beautiful web experiences, and scalable mobile apps designed to convert and impress.
          </p>

          {/* Buttons */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Magnetic strength={20}>
              <Button size="lg" className="rounded-full h-14 px-8 text-lg group bg-white text-black hover:bg-white/90 shadow-xl" asChild>
                <a href="#contact">
                  Start Your Project
                  <ArrowRight className="ml-2 w-5 h-5 transition-transform group-hover:translate-x-1" />
                </a>
              </Button>
            </Magnetic>
            
            <Magnetic strength={15}>
              <Button size="lg" variant="outline" className="rounded-full h-14 px-8 text-lg hover:bg-white/10 bg-black/20 text-white border-white/20 backdrop-blur-md shadow-xl" asChild>
                <a href="#work">View Our Work</a>
              </Button>
            </Magnetic>
          </div>
        </div>
      </div>
      
      {/* Scroll indicator */}
      <div className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-white/50 z-10">
        <span className="text-xs tracking-widest uppercase">Scroll</span>
        <div className="animate-bounce">
          <ChevronDown className="w-5 h-5" />
        </div>
      </div>
    </section>
  );
}
