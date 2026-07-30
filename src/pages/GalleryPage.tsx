import { ParallaxScroll } from "@/components/ui/parallax-scroll";
import { motion } from "framer-motion";
import { useState, useEffect } from "react";
import { collection, getDocs, query, orderBy } from "firebase/firestore";
import { db } from "@/lib/firebase";
import { Loader2 } from "lucide-react";

const staticImages = [
  "https://images.unsplash.com/photo-1554080353-a576cf803bda?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80",
  "https://images.unsplash.com/photo-1505144808419-1957a94ca61e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80",
  "https://images.unsplash.com/photo-1470252649378-9c29740c9fa8?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80",
  "https://images.unsplash.com/photo-1682686581854-5e71f58e7e3f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDF8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80",
  "https://images.unsplash.com/photo-1510784722466-f2aa9c52fff6?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80",
  "https://images.unsplash.com/photo-1505765050516-f72dcac9c60e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=3540&q=80",
  "https://images.unsplash.com/photo-1439853949127-fa647821eba0?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2640&q=80",
];

// Simple masonry-style grid for mobile
const MobileGallery = ({ images }: { images: string[] }) => (
  <div className="columns-2 gap-3 px-4 pb-16">
    {images.map((img, idx) => (
      <motion.div
        key={idx}
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.4, delay: idx * 0.05 }}
        className="mb-3 break-inside-avoid overflow-hidden rounded-xl"
      >
        <img
          src={img}
          alt={`Gallery ${idx + 1}`}
          className="w-full h-auto object-cover rounded-xl"
          loading="lazy"
        />
      </motion.div>
    ))}
  </div>
);

export default function GalleryPage() {
  const [images, setImages] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 768);
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);

  useEffect(() => {
    const fetchImages = async () => {
      try {
        const q = query(collection(db, "gallery"), orderBy("createdAt", "desc"));
        const snapshot = await getDocs(q);
        const data = snapshot.docs.map(doc => doc.data().imageUrl || doc.data().url);
        const validData = data.filter(Boolean);
        if (validData.length > 0) {
          setImages(validData);
        } else {
          setImages(staticImages);
        }
      } catch (error) {
        console.error("Error fetching gallery:", error);
        setImages(staticImages);
      } finally {
        setLoading(false);
      }
    };
    fetchImages();
  }, []);

  return (
    <main className="pt-24 md:pt-40 min-h-screen bg-background">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="text-center mb-8 md:mb-10 px-4"
      >
        <h1 className="text-3xl md:text-5xl font-bold tracking-tight mb-3 md:mb-4">Our Gallery</h1>
        <p className="text-sm md:text-lg text-neutral-500 max-w-2xl mx-auto">
          Explore our workspace, team events, and the amazing web and mobile apps we build.
        </p>
      </motion.div>

      {loading ? (
        <div className="flex justify-center items-center h-64">
          <Loader2 className="w-8 h-8 animate-spin text-primary" />
        </div>
      ) : isMobile ? (
        <MobileGallery images={images} />
      ) : (
        <ParallaxScroll images={images} />
      )}
    </main>
  );
}
