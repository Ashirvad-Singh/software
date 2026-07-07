"use client";
import { ContainerScroll } from "@/components/ui/container-scroll-animation";
import { BackgroundBeamsWithCollision } from "@/components/ui/background-beams-with-collision";
import { ContainerTextFlip } from "@/components/ui/container-text-flip";

export default function HeroScrollDemo() {
  return (
    <BackgroundBeamsWithCollision className="h-full min-h-screen items-start relative overflow-hidden pt-32 md:pt-40">
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
            <h1 className="text-4xl font-semibold text-black dark:text-white leading-tight">
              Elevate your business with <br />
              <ContainerTextFlip 
                words={["Custom Software", "Modern Websites", "Scalable Apps", "Digital Growth"]}
                className="mt-4 mb-2 text-4xl md:text-[5rem] px-4 shadow-none bg-transparent dark:bg-transparent dark:shadow-none"
                textClassName="text-primary font-black"
                interval={2500}
              />
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
