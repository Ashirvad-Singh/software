import { useCallback, useEffect, useState } from "react"
import useEmblaCarousel from "embla-carousel-react"
import { ChevronLeft, ChevronRight, Quote, Star, Loader2 } from "lucide-react"
import { collection, getDocs, query, orderBy } from "firebase/firestore"
import { db } from "@/lib/firebase"

const staticTestimonials = [
  {
    id: 1,
    name: "Sarah Jenkins",
    role: "CEO, TechFlow",
    content: "Adat Soft Solutions transformed our clunky legacy system into a sleek, fast, and modern web application. Their attention to detail and technical expertise is unmatched.",
    rating: 5,
    avatar: "https://i.pravatar.cc/150?img=1"
  },
  {
    id: 2,
    name: "David Chen",
    role: "Founder, HealthSync",
    content: "We hired them for a complex mobile app project. They delivered on time, communicated perfectly throughout, and the end product exceeded our expectations. Highly recommended.",
    rating: 5,
    avatar: "https://i.pravatar.cc/150?img=11"
  },
  {
    id: 3,
    name: "Emily Rodriguez",
    role: "Marketing Director, Bloom",
    content: "Our e-commerce conversion rates doubled after Adat Soft completely redesigned and rebuilt our Shopify store. The 3D elements and smooth animations wow our customers.",
    rating: 5,
    avatar: "https://i.pravatar.cc/150?img=5"
  },
  {
    id: 4,
    name: "Michael Chang",
    role: "CTO, NextGen Logistics",
    content: "They seamlessly integrated with our internal team to build out our REST API and backend infrastructure. Solid architecture and completely reliable.",
    rating: 4,
    avatar: "https://i.pravatar.cc/150?img=12"
  }
]

export default function Testimonials() {
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true, align: "start" })
  const [selectedIndex, setSelectedIndex] = useState(0)
  const [testimonials, setTestimonials] = useState<any[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchTestimonials = async () => {
      try {
        const q = query(collection(db, "testimonials"), orderBy("createdAt", "desc"));
        const snapshot = await getDocs(q);
        const data = snapshot.docs.map(doc => doc.data());
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

  const scrollPrev = useCallback(() => {
    if (emblaApi) emblaApi.scrollPrev()
  }, [emblaApi])

  const scrollNext = useCallback(() => {
    if (emblaApi) emblaApi.scrollNext()
  }, [emblaApi])

  const onSelect = useCallback(() => {
    if (!emblaApi) return
    setSelectedIndex(emblaApi.selectedScrollSnap())
  }, [emblaApi, setSelectedIndex])

  useEffect(() => {
    if (!emblaApi) return
    onSelect()
    emblaApi.on("select", onSelect)
    emblaApi.on("reInit", onSelect)
  }, [emblaApi, onSelect])

  return (
    <section id="testimonials" className="py-32 relative overflow-hidden bg-neutral-50 border-t border-border/50">
      {/* Grid Background */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px]"></div>
      
      {/* Decorative gradient overlay */}
      <div className="absolute top-0 inset-x-0 h-40 bg-gradient-to-b from-white to-transparent"></div>
      <div className="absolute bottom-0 inset-x-0 h-40 bg-gradient-to-t from-white to-transparent pointer-events-none z-10"></div>

      <div className="container mx-auto px-4 md:px-6 relative z-20">
        
        <div className="flex flex-col md:flex-row items-end justify-between mb-16 gap-6">
          <div className="relative">
            <span className="absolute -top-10 -left-6 text-7xl text-primary/10 font-serif">"</span>
            <h2 className="text-sm font-bold text-primary tracking-widest uppercase mb-3">
              Client Success
            </h2>
            <h3 className="text-4xl md:text-5xl font-extrabold tracking-tight text-neutral-900">
              Trusted by the Best
            </h3>
          </div>
          
          <div className="flex gap-4">
            <button 
              onClick={scrollPrev}
              className="w-12 h-12 rounded-full border border-border flex items-center justify-center hover:bg-secondary hover:text-primary transition-colors"
            >
              <ChevronLeft className="w-6 h-6" />
            </button>
            <button 
              onClick={scrollNext}
              className="w-12 h-12 rounded-full border border-border flex items-center justify-center hover:bg-secondary hover:text-primary transition-colors"
            >
              <ChevronRight className="w-6 h-6" />
            </button>
          </div>
        </div>

        {loading ? (
          <div className="flex justify-center items-center h-64">
            <Loader2 className="w-8 h-8 animate-spin text-primary" />
          </div>
        ) : (
          <div className="overflow-hidden" ref={emblaRef}>
            <div className="flex -ml-4 md:-ml-6">
              {testimonials.map((testimonial, index) => (
                <div 
                  key={testimonial.id || index} 
                  className="flex-[0_0_100%] min-w-0 md:flex-[0_0_50%] lg:flex-[0_0_33.333%] pl-4 md:pl-6 pt-4"
                >
                  <div className="bg-white border border-neutral-200 shadow-sm rounded-3xl p-8 md:p-10 h-full flex flex-col hover:shadow-xl hover:-translate-y-2 hover:border-primary/20 transition-all duration-300 relative group">
                    
                    {/* Subtle hover gradient */}
                    <div className="absolute inset-0 bg-gradient-to-br from-blue-50/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity rounded-3xl pointer-events-none"></div>
                    <div className="flex items-center gap-1 mb-6">
                      {[...Array(5)].map((_, i) => (
                        <Star 
                          key={i} 
                          className={`w-5 h-5 ${i < (testimonial.rating || 5) ? "fill-primary text-primary" : "text-muted"}`} 
                        />
                      ))}
                    </div>
                    
                    <Quote className="w-10 h-10 text-primary/20 mb-4" />
                    
                    <p className="text-lg mb-10 flex-grow text-neutral-700 leading-relaxed font-medium">"{testimonial.content}"</p>
                    
                    <div className="flex items-center gap-4 mt-auto">
                      <img 
                        src={testimonial.avatar} 
                        alt={testimonial.name} 
                        className="w-14 h-14 rounded-full border-2 border-white shadow-md object-cover"
                      />
                      <div>
                        <h5 className="font-bold text-neutral-900">{testimonial.name}</h5>
                        <p className="text-sm text-primary font-medium">{testimonial.role}</p>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {!loading && (
          <div className="flex justify-center gap-2 mt-12">
            {testimonials.map((_, index) => (
              <button
                key={index}
                onClick={() => emblaApi?.scrollTo(index)}
                className={`h-2 rounded-full transition-all ${
                  index === selectedIndex ? "w-8 bg-primary" : "w-2 bg-border hover:bg-border/80"
                }`}
                aria-label={`Go to slide ${index + 1}`}
              />
            ))}
          </div>
        )}

      </div>
    </section>
  )
}
