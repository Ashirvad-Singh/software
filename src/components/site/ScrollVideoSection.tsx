import { useRef, useEffect, useState } from "react";
import { useScroll, useMotionValueEvent } from "framer-motion";

export default function ScrollVideoSection() {
  const containerRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const [duration, setDuration] = useState(0);
  
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });

  // Retrieve video duration once loaded
  useEffect(() => {
    if (videoRef.current) {
      const handleLoadedMetadata = () => {
        setDuration(videoRef.current?.duration || 0);
      };
      // If already loaded
      if (videoRef.current.readyState >= 1) {
        handleLoadedMetadata();
      }
      videoRef.current.addEventListener('loadedmetadata', handleLoadedMetadata);
      return () => {
        videoRef.current?.removeEventListener('loadedmetadata', handleLoadedMetadata);
      }
    }
  }, []);

  // Sync scroll to video time
  useMotionValueEvent(scrollYProgress, "change", (latest) => {
    if (videoRef.current && duration > 0) {
      // Small trick: Request Animation Frame helps smooth out some scrubbing
      requestAnimationFrame(() => {
        if (videoRef.current) {
          videoRef.current.currentTime = latest * duration;
        }
      });
    }
  });

  return (
    <section ref={containerRef} className="relative h-[300vh] bg-black">
      <div className="sticky top-0 h-screen w-full flex items-center justify-center overflow-hidden">
        {/* Placeholder video - works best with all-intra encoded videos */}
        <video 
          ref={videoRef}
          src="/video_me_likho.mp4" 
          className="w-full h-full object-cover"
          muted
          playsInline
          preload="auto"
        />
        
      </div>
    </section>
  );
}
