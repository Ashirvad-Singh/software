"use client";
import { ContainerScroll } from "@/components/ui/container-scroll-animation";
import { BackgroundBeamsWithCollision } from "@/components/ui/background-beams-with-collision";

export default function HeroScrollDemo() {
  return (
    <BackgroundBeamsWithCollision className="h-full min-h-screen items-start relative overflow-hidden">
      {/* Animated Grid Background */}
      <div
        className="absolute inset-0 pointer-events-none opacity-[0.06] animate-grid-pan"
        style={{
          backgroundImage:
            "linear-gradient(to right, #000 1px, transparent 1px), linear-gradient(to bottom, #000 1px, transparent 1px)",
          backgroundSize: "40px 40px",
        }}
      ></div>

      <ContainerScroll
        titleComponent={
          <>
            <h1 className="text-4xl font-semibold text-black dark:text-white">
              Elevate your business with <br />
              <span className="text-4xl md:text-[6rem] font-bold mt-1 leading-none text-primary">
                Next-Gen Software
              </span>
            </h1>
          </>
        }
      >
        <video
          src="/video_5b66213ff51f.mp4"
          autoPlay
          loop
          muted
          playsInline
          className="mx-auto rounded-2xl object-cover h-full object-left-top w-full"
        />
      </ContainerScroll>
    </BackgroundBeamsWithCollision>
  );
}
