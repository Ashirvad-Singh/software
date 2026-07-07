import { useEffect, useState } from "react"
import useEmblaCarousel from "embla-carousel-react"
import { Star, Loader2 } from "lucide-react"
import { collection, getDocs, query, orderBy } from "firebase/firestore"
import { db } from "@/lib/firebase"

const staticTestimonials = [
  {
    id: 1,
    name: "David Eyezenhour",
    role: "Founder - 2020 LI",
    content: "Adat Soft Solutions came in as a contractor and grew into one of the most valuable people in our operation. They managed our KOL network, built internal systems that genuinely changed how we operate, and then led the development of our analytics platform from architecture through deployment. When we needed an Operations Director, the decision was straightforward. They understand the business, anticipate what's needed, and deliver at a level most senior hires don't reach.",
    rating: 5,
    avatar: "https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&q=80&w=600",
    stats: []
  },
  {
    id: 2,
    name: "Chad Culp",
    role: "Founder/Owner - Bloom County",
    content: "The web development work alone was worth every dollar — but what stood out was how well they understood the brand before they even wrote a line of code. The digital platform they created didn't just look good, it felt like our company. The campaign they ran gave us exposure we couldn't have bought. We saw real growth in our following and engagement from an audience that actually matched our customer base.",
    rating: 5,
    avatar: "https://i.pravatar.cc/150?img=11",
    stats: [
      { value: "3x", label: "Social following growth" },
      { value: "100%", label: "Original content" }
    ]
  },
  {
    id: 3,
    name: "Majd Hailat",
    role: "Founder / CEO - Altura",
    content: "Getting our SaaS platform launched in the same cycle is not something that happens by accident. They built our entire infrastructure from the ground up, handled every pitch, and made sure we showed up to each event prepared. The seamless API integrations extended our reach into audiences we weren't reaching. The work they executed moved the needle on how the broader community perceives us.",
    rating: 5,
    avatar: "https://i.pravatar.cc/150?img=5",
    stats: [
      { value: "5+", label: "Conference stages secured" },
      { value: "30+", label: "Podcast placements" }
    ]
  }
]

export default function Testimonials() {
  const [emblaRef] = useEmblaCarousel({ align: "start", dragFree: true })
  const [testimonials, setTestimonials] = useState<any[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchTestimonials = async () => {
      try {
        const q = query(collection(db, "testimonials"), orderBy("createdAt", "desc"));
        const snapshot = await getDocs(q);
        const data = snapshot.docs.map(doc => doc.data());
        if (data.length >= 3) {
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
      <section className="py-24 flex justify-center items-center bg-gray-50 min-h-[500px]">
        <Loader2 className="w-8 h-8 animate-spin text-primary" />
      </section>
    )
  }

  return (
    <section className="py-12 bg-white w-full overflow-hidden">
      <div className="container mx-auto px-4 max-w-[1400px]">
        <div className="overflow-hidden" ref={emblaRef} data-cursor-text="Drag or scroll">
          <div className="flex -ml-6 cursor-none">
          
          {/* Card 0: Title Card */}
          <div className="flex-[0_0_100%] md:flex-[0_0_50%] lg:flex-[0_0_25%] pl-6 min-w-0">
            <div className="bg-white border border-gray-100 p-8 flex flex-col justify-between h-[650px] shadow-sm">
              <div>
                <div className="flex items-center gap-2 mb-12">
                  <span className="text-xl font-medium tracking-tight">AdatSoft<span className="font-bold text-red-500">Vox</span></span>
                  <div className="w-2 h-2 border-t-2 border-r-2 border-red-500"></div>
                </div>
                <h2 className="text-5xl lg:text-6xl font-semibold tracking-tight text-gray-900 leading-[1.1]">
                  Success<br />Stories
                </h2>
              </div>
              <p className="text-gray-500 font-serif italic text-[15px] leading-relaxed pr-4">
                My work speaks for itself, but my clients' success stories are the true testament to what I deliver.
              </p>
            </div>
          </div>

          {testimonials.map((testimonial, i) => {
            // Cycle through styles based on index
            const styleIdx = i % 3;

            // Style 1: Solid Gradient (Image Removed)
            if (styleIdx === 0) {
              return (
                <div key={i} className="flex-[0_0_100%] md:flex-[0_0_50%] lg:flex-[0_0_25%] pl-6 min-w-0">
                  <div className="relative overflow-hidden h-[650px] bg-gradient-to-br from-[#ff4d4d] to-[#ff7b7b] flex flex-col justify-end p-8 text-white group">
                    <div className="relative z-10">
                      <p className="text-white/95 text-[15px] leading-relaxed mb-8 line-clamp-[12]">
                        {testimonial.content}
                      </p>
                      <div>
                        <h4 className="font-medium text-lg">{testimonial.name}</h4>
                        <p className="text-white/80 text-sm">{testimonial.role}</p>
                      </div>
                    </div>
                  </div>
                </div>
              )
            }

            // Style 2: Dark Card
            if (styleIdx === 1) {
              return (
                <div key={i} className="flex-[0_0_100%] md:flex-[0_0_50%] lg:flex-[0_0_25%] pl-6 min-w-0">
                  <div className="bg-black text-white p-8 flex flex-col h-[650px]">
                    <div className="flex gap-1 mb-6">
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} className="w-4 h-4 fill-[#ff0000] text-[#ff0000]" />
                      ))}
                    </div>
                    <p className="text-gray-300 text-[15px] leading-relaxed flex-grow line-clamp-[10]">
                      {testimonial.content}
                    </p>
                    
                    <div className="mt-auto">
                      {testimonial.stats && testimonial.stats.length > 0 && (
                        <div className="grid grid-cols-2 gap-4 mb-6">
                          {testimonial.stats.map((stat: any, i: number) => (
                            <div key={i}>
                              <div className="text-3xl font-bold mb-1">{stat.value}</div>
                              <div className="text-xs text-gray-400">{stat.label}</div>
                            </div>
                          ))}
                        </div>
                      )}
                      <hr className="border-gray-800 my-6" />
                      <div className="flex items-center gap-4">
                        <img src={testimonial.avatar} alt={testimonial.name} className="w-12 h-12 rounded-full object-cover" />
                        <div>
                          <h4 className="font-medium">{testimonial.name}</h4>
                          <p className="text-gray-400 text-xs">{testimonial.role}</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )
            }

            // Style 3: Light Card
            return (
              <div key={i} className="flex-[0_0_100%] md:flex-[0_0_50%] lg:flex-[0_0_25%] pl-6 min-w-0">
                <div className="bg-[#f4f4f4] text-black p-8 flex flex-col h-[650px]">
                  <div className="flex gap-1 mb-6">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-black text-black" />
                    ))}
                  </div>
                  <p className="text-gray-800 text-[15px] leading-relaxed flex-grow line-clamp-[10]">
                    {testimonial.content}
                  </p>
                  
                  <div className="mt-auto">
                    {testimonial.stats && testimonial.stats.length > 0 && (
                      <div className="grid grid-cols-2 gap-4 mb-6">
                        {testimonial.stats.map((stat: any, i: number) => (
                          <div key={i}>
                            <div className="text-3xl font-bold mb-1">{stat.value}</div>
                            <div className="text-xs text-gray-500">{stat.label}</div>
                          </div>
                        ))}
                      </div>
                    )}
                    <hr className="border-gray-300 my-6" />
                    <div className="flex items-center gap-4">
                      <img src={testimonial.avatar} alt={testimonial.name} className="w-12 h-12 rounded-full object-cover filter grayscale" />
                      <div>
                        <h4 className="font-medium">{testimonial.name}</h4>
                        <p className="text-gray-500 text-xs">{testimonial.role}</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )
          })}
          </div>
        </div>
      </div>
    </section>
  )
}
