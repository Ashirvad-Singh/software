import { useEffect, useState } from "react"
import { Loader2 } from "lucide-react"
import { collection, getDocs, query, orderBy } from "firebase/firestore"
import { db } from "@/lib/firebase"
import useEmblaCarousel from "embla-carousel-react"
import AutoScroll from "embla-carousel-auto-scroll"

const staticTestimonials = [
  {
    id: "1",
    name: "Elena Ruiz",
    role: "CTO, Stackforge",
    content: "Performance and aesthetics without compromise. Exactly what we needed for the rebrand. The team adopted it overnight.",
    avatar: "https://i.pravatar.cc/150?img=47",
  },
  {
    id: "2",
    name: "James Okonkwo",
    role: "Product Ops, Fieldline",
    content: "The team adopted it overnight. Documentation and demos are first-class. Highly recommended for any serious startup.",
    avatar: "https://i.pravatar.cc/150?img=11",
  },
  {
    id: "3",
    name: "Amelia Park",
    role: "Head of Brand, Lumen Co",
    content: "This is the testimonial we feature everywhere. It perfectly captures why teams choose us. Simply brilliant execution.",
    avatar: "https://i.pravatar.cc/150?img=5",
  },
  {
    id: "4",
    name: "Marcus Webb",
    role: "Design Lead, Orbit Labs",
    content: "Finally a component kit that feels intentional. Our marketing site shipped in days. We couldn't be happier.",
    avatar: "https://i.pravatar.cc/150?img=8",
  },
  {
    id: "5",
    name: "Sarah Chen",
    role: "VP Engineering",
    content: "We cut onboarding time in half. This is what we ship to our most demanding clients.",
    avatar: "https://i.pravatar.cc/150?img=1",
  },
  {
    id: "6",
    name: "Nina Volkov",
    role: "Founder, Arc Studio",
    content: "We use it across three products now. Consistent quality at a speed we didn't expect.",
    avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=150",
  }
]

const TestimonialCard = ({ testimonial }: { testimonial: any }) => (
  <div className="w-[240px] sm:w-[300px] md:w-[360px] lg:w-[400px] p-4 sm:p-5 md:p-7 flex flex-col justify-between bg-white rounded-2xl border border-neutral-100 shadow-[0_2px_10px_-3px_rgba(6,81,237,0.05)] hover:shadow-md transition-shadow h-[180px] sm:h-[210px] md:h-[240px] select-none">
    <p className="leading-relaxed font-medium mb-4 text-[11px] sm:text-[12px] md:text-[14px] text-neutral-700 pointer-events-none line-clamp-4">
      "{testimonial.content}"
    </p>
    
    <div className="flex items-center gap-2 sm:gap-3 mt-auto pointer-events-none">
      <img 
        src={testimonial.avatar || `https://ui-avatars.com/api/?name=${encodeURIComponent(testimonial.name)}&background=random`} 
        alt={testimonial.name}
        className="w-7 h-7 sm:w-9 sm:h-9 md:w-10 md:h-10 rounded-full object-cover border border-neutral-100 shrink-0"
      />
      <div>
        <h4 className="font-bold text-neutral-900 text-[11px] sm:text-xs md:text-sm tracking-tight">{testimonial.name}</h4>
        <p className="text-[10px] sm:text-xs text-neutral-500 font-medium">{testimonial.role}</p>
      </div>
    </div>
  </div>
);

const ScrollingRow = ({ items, speed, direction = "forward" }: { items: any[], speed: number, direction?: "forward" | "backward" }) => {
  // Duplicate items to ensure smooth infinite scroll
  const duplicatedItems = [...items, ...items, ...items, ...items, ...items, ...items];
  
  const [emblaRef] = useEmblaCarousel(
    { loop: true, dragFree: true },
    [
      AutoScroll({
        playOnInit: true,
        speed: speed,
        direction: direction,
        stopOnInteraction: false,
        stopOnMouseEnter: true,
      })
    ]
  )

  return (
    <div className="overflow-hidden w-full py-2 cursor-grab active:cursor-grabbing" ref={emblaRef}>
      <div className="flex touch-pan-y">
        {duplicatedItems.map((testimonial, idx) => (
          <div key={idx} className="pl-6 shrink-0">
             <TestimonialCard testimonial={testimonial} />
          </div>
        ))}
      </div>
    </div>
  )
}

export default function Testimonials() {
  const [testimonials, setTestimonials] = useState<any[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchTestimonials = async () => {
      try {
        const q = query(collection(db, "testimonials"), orderBy("createdAt", "desc"));
        const snapshot = await getDocs(q);
        const data = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
        if (data.length > 0) {
          setTestimonials(data);
        } else {
          setTestimonials(staticTestimonials);
        }
      } catch (error) {
        console.error("Error fetching testimonials:", error);
        setTestimonials(staticTestimonials);
      } finally {
        setLoading(false);
      }
    };
    fetchTestimonials();
  }, []);

  if (loading) {
    return (
      <section className="py-24 flex justify-center items-center bg-[#fafafa] min-h-[500px]">
        <Loader2 className="w-8 h-8 animate-spin text-primary" />
      </section>
    )
  }

  const displayTestimonials = testimonials.length >= 4 
    ? testimonials 
    : [...testimonials, ...staticTestimonials].slice(0, 8); 

  // Split into two rows
  const midPoint = Math.ceil(displayTestimonials.length / 2);
  const topRow = displayTestimonials.slice(0, midPoint);
  const bottomRow = displayTestimonials.slice(midPoint);

  return (
    <section className="py-24 bg-[#fafafa] w-full overflow-hidden font-sans">
      
      <div className="text-center mb-16 relative z-20 px-8">
        <h2 className="text-3xl md:text-5xl font-bold text-neutral-900 mb-5 tracking-tight text-balance">
          Trusted in production, not just in demos.
        </h2>
        <p className="text-neutral-500 font-medium max-w-2xl mx-auto text-sm md:text-base">
          Short notes from teams who ship with the same polish they show customers.
        </p>
      </div>

      {/* Full width Marquee Rows */}
      <div className="w-full relative z-20 flex flex-col gap-2">
        <ScrollingRow items={topRow} speed={0.7} direction="forward" />
        <ScrollingRow items={bottomRow} speed={0.5} direction="backward" />
        
        {/* Side Gradients for smooth fade out */}
        <div className="absolute inset-y-0 left-0 w-24 md:w-64 bg-gradient-to-r from-[#fafafa] to-transparent z-30 pointer-events-none"></div>
        <div className="absolute inset-y-0 right-0 w-24 md:w-64 bg-gradient-to-l from-[#fafafa] to-transparent z-30 pointer-events-none"></div>
      </div>
      
    </section>
  )
}
