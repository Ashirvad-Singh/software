import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { collection, getDocs, query, where, orderBy } from "firebase/firestore";
import { db } from "@/lib/firebase";
import useEmblaCarousel from "embla-carousel-react";
import AutoScroll from "embla-carousel-auto-scroll";
import JobApplicationForm from "@/components/site/JobApplicationForm";
import { 
  ArrowDown, 
  MapPin, 
  Clock, 
  Briefcase, 
  Laptop,
  Sun,
  Heart,
  Baby,
  Star,
  CheckCircle,
  Target,
  RefreshCw,
  MessageSquare,
  Lightbulb,
  Search,
  Zap,
  ArrowRight
} from "lucide-react";

// Types
interface JobOpening {
  id?: string;
  title: string;
  type: string;
  location: string;
  department?: string;
  experience?: string;
}

const staticJobOpenings: JobOpening[] = [
  { title: "Product Design", type: "Full Time", location: "Pune", department: "Design", experience: "3 to 5 Years Exp." },
  { title: "Senior Frontend Developer", type: "Full Time", location: "Remote", department: "Tech", experience: "4 to 6 Years Exp." },
  { title: "Graphic Design", type: "Full Time", location: "Delhi", department: "Design", experience: "2 to 4 Years Exp." },
  { title: "Product Management", type: "Full Time", location: "Pune", department: "Tech", experience: "5+ Years Exp." },
  { title: "Performance Marketing", type: "Full Time", location: "Remote", department: "Marketing", experience: "3+ Years Exp." },
  { title: "Sales Executive", type: "Full Time", location: "Delhi", department: "Sales", experience: "1 to 3 Years Exp." },
];

const departments = ["All", "Offline", "Tech", "Sales", "HR", "Support", "Design", "Marketing"];

const teams = [
  {
    id: 1,
    name: "Engineering",
    desc: "Build scalable and performant systems. Our engineering teams cover Backend, Frontend, QA, and Infrastructure.",
  },
  {
    id: 2,
    name: "Product Management",
    desc: "Drive product strategy and execution to deliver features that customers love.",
  },
  {
    id: 3,
    name: "Customer Success & Support",
    desc: "Help our customers achieve their goals and solve complex issues with our platform.",
  },
  {
    id: 4,
    name: "Sales & Marketing",
    desc: "Spread the word and drive growth by showcasing the value of our solutions.",
  },
  {
    id: 5,
    name: "Human Resources & Operations",
    desc: "Support our most valuable asset—our people—and keep operations running smoothly.",
  },
  {
    id: 6,
    name: "Design",
    desc: "Craft intuitive, beautiful, and accessible user experiences across all touchpoints.",
  }
];

export default function CareersPage() {
  const [jobOpenings, setJobOpenings] = useState<JobOpening[]>([]);
  const [emblaRef] = useEmblaCarousel({ loop: true, dragFree: true }, [
    AutoScroll({ playOnInit: true, speed: 1.5, stopOnInteraction: false, stopOnMouseEnter: true })
  ]);
  const [galleryImages, setGalleryImages] = useState<string[]>([
    "https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&q=80&w=600",
    "https://images.unsplash.com/photo-1531482615713-2afd69097998?auto=format&fit=crop&q=80&w=600",
    "https://images.unsplash.com/photo-1556761175-5973dc0f32e7?auto=format&fit=crop&q=80&w=600",
    "https://images.unsplash.com/photo-1542744173-8e7e53415bb0?auto=format&fit=crop&q=80&w=600",
    "https://images.unsplash.com/photo-1600880292203-757bb62b4baf?auto=format&fit=crop&q=80&w=600"
  ]);
  const [activeTab, setActiveTab] = useState("All");
  const [activeTeam, setActiveTeam] = useState(1);
  const [selectedPosition, setSelectedPosition] = useState("");

  const handleApplyClick = (title: string = "") => {
    setSelectedPosition(title);
    setTimeout(() => {
      document.getElementById("apply-form")?.scrollIntoView({ behavior: "smooth", block: "start" });
    }, 100);
  };

  useEffect(() => {
    const fetchGallery = async () => {
      try {
        const q = query(collection(db, "gallery"), orderBy("createdAt", "desc"));
        const snapshot = await getDocs(q);
        const data = snapshot.docs.map(doc => doc.data().imageUrl || doc.data().url);
        const validData = data.filter(Boolean);
        if (validData.length > 0) {
          setGalleryImages(validData);
        }
      } catch (error) {
        console.error("Error fetching gallery:", error);
      }
    };
    fetchGallery();

    const fetchJobs = async () => {
      try {
        const q = query(collection(db, "jobs"), where("active", "==", true));
        const snapshot = await getDocs(q);
        const data = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })) as JobOpening[];
        if (data.length > 0) {
          setJobOpenings(data);
        } else {
          setJobOpenings(staticJobOpenings);
        }
      } catch (error) {
        console.error("Error fetching jobs:", error);
        setJobOpenings(staticJobOpenings);
      }
    };
    fetchJobs();
  }, []);

  const filteredJobs = jobOpenings.filter(job => {
    if (activeTab === "All") return true;
    if (activeTab === "Offline") return job.location !== "Remote";
    return job.department?.toLowerCase() === activeTab.toLowerCase();
  });

  const scrollToRoles = () => {
    document.getElementById("open-roles")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <main className="min-h-screen bg-white">
      {/* 1. Hero Section */}
      <section className="relative bg-[#Fdfbf8] pt-32 pb-16 overflow-hidden">
        <div className="absolute inset-0 z-0 opacity-[0.03]" style={{ backgroundImage: 'url("data:image/svg+xml,%3Csvg width=\'60\' height=\'60\' viewBox=\'0 0 60 60\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cg fill=\'none\' fill-rule=\'evenodd\'%3E%3Cg fill=\'%23000000\' fill-opacity=\'1\'%3E%3Cpath d=\'M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z\'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")' }} />
        
        <div className="container mx-auto px-4 relative z-10 text-center max-w-4xl">
          <motion.h1 
            initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}
            className="text-4xl md:text-6xl font-bold text-neutral-900 leading-tight mb-6"
          >
            Build Systems <br className="hidden md:block" /> With A Team 
          </motion.h1>
          
          <motion.p 
            initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.1 }}
            className="text-lg md:text-xl text-neutral-600 mb-10 max-w-3xl mx-auto"
          >
            We solve highly complex problems in commerce platforms for global enterprises. 
            If you want to dive deep into backend architecture, headless storefronts, 
            scalable cloud infrastructure and more - we're the place for you.
          </motion.p>
          
          <motion.button 
            initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.2 }}
            onClick={scrollToRoles}
            className="mx-auto flex items-center gap-2 bg-neutral-900 text-white px-8 py-3.5 rounded-full font-medium hover:bg-neutral-800 transition-colors shadow-lg shadow-neutral-900/20"
          >
            Join Our Team <ArrowDown size={18} />
          </motion.button>
        </div>

        {/* Hero Image Marquee */}
        <motion.div 
          initial={{ opacity: 0, y: 40 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.3 }}
          className="mt-16 w-full overflow-hidden h-[240px] md:h-[320px] cursor-grab active:cursor-grabbing"
          ref={emblaRef}
        >
          <div className="flex pl-4 min-w-max">
            {galleryImages.map((src, i) => (
              <div key={i} className={`relative flex-shrink-0 w-[200px] md:w-[280px] h-full mr-4 rounded-2xl overflow-hidden shadow-xl ${i % 2 !== 0 ? 'mt-4 md:mt-8' : ''}`}>
                <img src={src} alt={`Gallery ${i}`} className="w-full h-full object-cover hover:scale-105 transition-transform duration-700 pointer-events-none" />
              </div>
            ))}
          </div>
        </motion.div>
      </section>

      {/* 2. Why Work At Adat */}
      <section className="py-24 bg-white">
        <div className="container mx-auto px-4 max-w-6xl">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-neutral-900 mb-4">Why Work At Adat</h2>
            <p className="text-lg text-neutral-500">Learn by building for the best in class. Uncover your true potential.</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
            {[
              { icon: Laptop, title: "Flexi Work Mode", desc: "Work from anywhere. Flexible timings to help you balance work and life." },
              { icon: Sun, title: "Paid Time Off (PTO)", desc: "Generous PTO policies to help you relax, recharge, and return to work fully refreshed." },
              { icon: Heart, title: "Health & Well-being", desc: "Comprehensive health insurance coverage for you and your dependents." },
              { icon: Baby, title: "Parental Leave", desc: "Paid time off for expecting parents to welcome the newest member of their family." }
            ].map((feature, i) => (
              <div key={i} className="flex gap-4 p-6 rounded-2xl border border-neutral-100 bg-white shadow-sm hover:shadow-md transition-shadow">
                <div className="flex-shrink-0 w-12 h-12 rounded-xl bg-orange-50 text-orange-500 flex items-center justify-center">
                  <feature.icon size={24} />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-neutral-900 mb-2">{feature.title}</h3>
                  <p className="text-neutral-500 leading-relaxed">{feature.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 3. Teams We Hire For */}
      <section className="py-24 bg-[#Fdfbf8]">
        <div className="container mx-auto px-4 max-w-6xl">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-neutral-900 mb-4">Teams We Hire For</h2>
            <p className="text-lg text-neutral-500">Find your dream role across any of our major functions.</p>
          </div>

          <div className="flex flex-col lg:flex-row gap-12 items-center">
            <div className="w-full lg:w-1/2">
              <div className="rounded-3xl overflow-hidden shadow-2xl h-[400px] lg:h-[500px]">
                <img src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&q=80&w=800" alt="Team working" className="w-full h-full object-cover" />
              </div>
            </div>
            <div className="w-full lg:w-1/2 flex flex-col gap-2">
              {teams.map((team) => (
                <div 
                  key={team.id}
                  onClick={() => setActiveTeam(team.id)}
                  className={`cursor-pointer rounded-2xl p-5 border transition-all duration-300 ${activeTeam === team.id ? 'bg-white border-orange-200 shadow-lg shadow-orange-100/50' : 'bg-transparent border-transparent hover:bg-white/50'}`}
                >
                  <div className="flex items-center gap-4">
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center font-bold text-sm transition-colors ${activeTeam === team.id ? 'bg-orange-500 text-white' : 'bg-neutral-200 text-neutral-500'}`}>
                      {team.id.toString().padStart(2, '0')}
                    </div>
                    <h3 className={`text-xl font-bold ${activeTeam === team.id ? 'text-neutral-900' : 'text-neutral-600'}`}>
                      {team.name}
                    </h3>
                  </div>
                  <AnimatePresence>
                    {activeTeam === team.id && (
                      <motion.div 
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        className="overflow-hidden"
                      >
                        <p className="text-neutral-500 mt-4 pl-12 leading-relaxed">
                          {team.desc}
                        </p>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* 4. How We Work */}
      <section className="py-24 bg-white">
        <div className="container mx-auto px-4 max-w-6xl">
          <div className="flex flex-col lg:flex-row gap-16">
            <div className="w-full lg:w-1/3">
              <h2 className="text-3xl md:text-4xl font-bold text-neutral-900 mb-4">How We Work</h2>
              <p className="text-lg text-neutral-500 mb-8">Our core values inform every decision we make.</p>
            </div>
            
            <div className="w-full lg:w-2/3 grid grid-cols-1 sm:grid-cols-2 gap-6">
              {[
                { icon: Star, title: "Customer First", desc: "We obsess over our customers, working backwards to deliver what they truly need." },
                { icon: CheckCircle, title: "Own It, Build It", desc: "We take full accountability for our work, from initial concept to final execution." },
                { icon: Target, title: "Focus on Impact", desc: "We prioritize work that moves the needle and creates tangible business value." },
                { icon: RefreshCw, title: "Continuous Improvement", desc: "We are always learning, adapting, and striving to be better than we were yesterday." }
              ].map((val, i) => (
                <div key={i} className="bg-neutral-50 p-8 rounded-3xl hover:shadow-xl transition-all hover:-translate-y-1">
                  <div className="w-12 h-12 bg-white rounded-2xl shadow-sm flex items-center justify-center text-orange-500 mb-6">
                    <val.icon size={24} />
                  </div>
                  <h3 className="text-xl font-bold text-neutral-900 mb-3">{val.title}</h3>
                  <p className="text-neutral-500 leading-relaxed">{val.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* 5. What We Look For */}
      <section className="py-24 bg-[#Fdfbf8] overflow-hidden">
        <div className="container mx-auto px-4 max-w-6xl text-center relative z-10">
          <h2 className="text-3xl md:text-4xl font-bold text-neutral-900 mb-4">What We Look For</h2>
          <p className="text-lg text-neutral-500 mb-16 max-w-2xl mx-auto">Skills can be taught, character cannot. We value those who show up every day with:</p>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 relative">
            {/* Background Decorative SVG simulating the squiggly lines */}
            <div className="absolute top-1/2 left-0 w-full h-full -z-10 opacity-20 pointer-events-none hidden md:block">
               <svg viewBox="0 0 1000 200" preserveAspectRatio="none" className="w-full h-full">
                  <path d="M0,100 C150,200 350,0 500,100 C650,200 850,0 1000,100" fill="none" stroke="url(#grad)" strokeWidth="40" strokeLinecap="round" />
                  <defs>
                    <linearGradient id="grad" x1="0%" y1="0%" x2="100%" y2="0%">
                      <stop offset="0%" stopColor="#ec4899" />
                      <stop offset="33%" stopColor="#f97316" />
                      <stop offset="66%" stopColor="#10b981" />
                      <stop offset="100%" stopColor="#3b82f6" />
                    </linearGradient>
                  </defs>
               </svg>
            </div>

            {[
              { icon: MessageSquare, title: "Strong Communication", color: "text-pink-500", bg: "bg-pink-50" },
              { icon: Lightbulb, title: "A 'Figure It Out' Mindset", color: "text-orange-500", bg: "bg-orange-50" },
              { icon: Search, title: "Obsession over details", color: "text-emerald-500", bg: "bg-emerald-50" },
              { icon: Zap, title: "Bias for Action", color: "text-blue-500", bg: "bg-blue-50" }
            ].map((item, i) => (
              <div key={i} className="bg-white/90 backdrop-blur-sm p-8 rounded-3xl shadow-lg border border-white relative overflow-hidden group hover:-translate-y-2 transition-transform">
                <div className={`w-14 h-14 rounded-2xl ${item.bg} ${item.color} flex items-center justify-center mb-6`}>
                  <item.icon size={28} />
                </div>
                <h3 className="text-xl font-bold text-neutral-900 text-left">{item.title}</h3>
                <div className={`absolute bottom-0 left-0 w-full h-2 bg-gradient-to-r from-transparent via-current to-transparent opacity-0 group-hover:opacity-20 transition-opacity ${item.color}`} />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 6. Open Roles */}
      <section id="open-roles" className="py-24 bg-white">
        <div className="container mx-auto px-4 max-w-5xl text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-neutral-900 mb-12">Open Roles</h2>
          
          {/* Tabs */}
          <div className="flex flex-wrap justify-center gap-2 mb-12">
            {departments.map(dept => (
              <button
                key={dept}
                onClick={() => setActiveTab(dept)}
                className={`px-6 py-2.5 rounded-full text-sm font-medium transition-all ${activeTab === dept ? 'bg-neutral-900 text-white shadow-md' : 'bg-neutral-100 text-neutral-600 hover:bg-neutral-200'}`}
              >
                {dept}
              </button>
            ))}
          </div>

          {/* Job List */}
          <div className="space-y-4 text-left">
            <AnimatePresence>
              {filteredJobs.length > 0 ? filteredJobs.map((job, idx) => (
                <motion.div 
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.2 }}
                  key={job.id || idx} 
                  className="group flex flex-col md:flex-row md:items-center justify-between p-6 md:p-8 rounded-3xl border border-neutral-200 bg-white hover:border-neutral-300 hover:shadow-xl transition-all"
                >
                  <div>
                    <h3 className="text-2xl font-bold text-neutral-900 mb-4 group-hover:text-orange-500 transition-colors">{job.title}</h3>
                    <div className="flex flex-wrap gap-4 text-sm font-medium text-neutral-600">
                      <span className="flex items-center gap-1.5 bg-neutral-100 px-3 py-1 rounded-full"><MapPin size={14} /> {job.location}</span>
                      {job.experience && <span className="flex items-center gap-1.5 bg-neutral-100 px-3 py-1 rounded-full"><Clock size={14} /> {job.experience}</span>}
                      <span className="flex items-center gap-1.5 bg-neutral-100 px-3 py-1 rounded-full"><Briefcase size={14} /> {job.type}</span>
                    </div>
                  </div>
                  <button 
                    onClick={() => handleApplyClick(job.title)}
                    className="mt-6 md:mt-0 flex items-center justify-center gap-2 px-6 py-3 bg-neutral-900 text-white rounded-full font-medium hover:bg-orange-500 transition-colors shrink-0"
                  >
                    Apply Now <ArrowRight size={16} />
                  </button>
                </motion.div>
              )) : (
                <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-center py-12 text-neutral-500">
                  No open roles in this category right now. Check back later!
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </section>

      {/* 7. How To Apply */}
      <section className="py-24 bg-[#Fdfbf8]">
        <div className="container mx-auto px-4 max-w-5xl">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-neutral-900">How To Apply</h2>
          </div>

          <div className="flex flex-col md:flex-row items-center gap-16">
            <div className="w-full md:w-1/2 relative pl-8">
              {/* Connecting line */}
              <div className="absolute left-10 top-6 bottom-6 w-0.5 bg-orange-200" />
              
              <div className="space-y-12">
                {[
                  "Apply To Open Roles",
                  "HR Screening",
                  "Technical Interview",
                  "Final HR Discussion"
                ].map((step, i) => (
                  <div key={i} className="relative flex items-center bg-white p-5 rounded-2xl shadow-sm border border-neutral-100">
                    <div className="absolute -left-6 w-8 h-8 rounded-full bg-white border-4 border-orange-500 flex items-center justify-center shrink-0 z-10" />
                    <h3 className="text-lg font-bold text-neutral-900 pl-4">{step}</h3>
                  </div>
                ))}
              </div>
            </div>
            
            <div className="w-full md:w-1/2 flex justify-center">
              <div className="relative w-full max-w-sm">
                <img src="https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&q=80&w=600" alt="Apply process" className="rounded-3xl shadow-2xl" />
                <div className="absolute -bottom-6 right-0 bg-white p-4 rounded-2xl shadow-xl flex items-center gap-3">
                  <div className="w-10 h-10 bg-green-100 text-green-500 rounded-full flex items-center justify-center">
                    <CheckCircle size={20} />
                  </div>
                  <div>
                    <p className="text-sm font-bold text-neutral-900">Application</p>
                    <p className="text-xs text-neutral-500">Submitted Successfully</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 7.5. Application Form */}
      <section id="apply-form" className="py-24 bg-white border-t border-neutral-100">
        <div className="container mx-auto px-4 max-w-3xl">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-neutral-900">Submit Application</h2>
            <p className="text-neutral-500 mt-4 text-lg">Take the next step in your career. Fill out the form below to apply.</p>
          </div>
          <div className="bg-white border border-neutral-200 rounded-[2rem] p-6 md:p-10 shadow-2xl">
            <JobApplicationForm key={selectedPosition} defaultPosition={selectedPosition} />
          </div>
        </div>
      </section>

    </main>
  );
}
