import { useState, useEffect } from "react";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import { collection, getDocs, query, where, orderBy } from "firebase/firestore";
import { db } from "@/lib/firebase";
import useEmblaCarousel from "embla-carousel-react";
import AutoScroll from "embla-carousel-auto-scroll";
import { Link } from "react-router-dom";
import { 
  ArrowDown, 
  MapPin, 
  Clock, 
  Briefcase, 
  Sun,
  Heart,
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
  description?: string;
  experience?: string;
}

// Default Fallback Job Openings from ADAT Soft Solutions
const defaultJobs: JobOpening[] = [
  {
    id: "sr-shopify-developer",
    title: "Sr. Shopify Developer",
    experience: "4+ years",
    type: "Full Time",
    location: "Mohali (India)",
    department: "Development",
    description: "We are looking for a Senior Shopify Developer with 4+ years of experience in custom Liquid theme development, Storefront API, App integrations, and e-commerce optimization.",
  },
  {
    id: "sr-wordpress-developer",
    title: "Sr. WordPress Developer",
    experience: "4+ years",
    type: "Full Time",
    location: "Mohali, Punjab",
    department: "Development",
    description: "Seeking a Senior WordPress Developer with 4+ years experience in custom PHP theme & plugin development, WooCommerce customization, and web performance optimization.",
  },
  {
    id: "business-development-executive",
    title: "Business Development Executive",
    experience: "2-3 years",
    type: "Full Time",
    location: "Mohali",
    department: "Sales & Marketing",
    description: "Looking for a proactive Business Development Executive with 2-3 years experience in IT services sales, client communication, lead generation, and closing deals in US, EU & global markets.",
  },
];

const teams = [
  {
    id: 1,
    name: "Engineering & Development",
    desc: "Build scalable and performant systems. Our engineering teams cover Frontend, Backend, Shopify, WordPress, Mobile Apps, and Cloud Infrastructure.",
  },
  {
    id: 2,
    name: "Product & UI/UX Design",
    desc: "Craft intuitive, accessible, and high-converting user experiences across web and mobile touchpoints.",
  },
  {
    id: 3,
    name: "Sales & Business Development",
    desc: "Drive growth by building relationships with enterprise and SME clients across US, Canada, Europe, and Australia.",
  },
  {
    id: 4,
    name: "Quality Assurance & Testing",
    desc: "Guarantee zero-defect releases through automated regression testing, manual QA, and performance audits.",
  },
];

export default function CareersPage() {
  const [jobsLoading, setJobsLoading] = useState(true);
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
  const reduceMotion = useReducedMotion();

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
          setJobOpenings(defaultJobs);
        }
      } catch (error) {
        console.error("Error fetching jobs:", error);
        setJobOpenings(defaultJobs);
      } finally {
        setJobsLoading(false);
      }
    };
    fetchJobs();
  }, []);

  const departments = ["All", ...Array.from(new Map(
    jobOpenings.map(job => job.department?.trim()).filter((value): value is string => Boolean(value) && value!.toLowerCase() !== "all")
      .map(value => [value.toLowerCase(), value])
  ).values())];

  const filteredJobs = jobOpenings.filter(job => {
    if (activeTab === "All") return true;
    return job.department?.trim().toLowerCase() === activeTab.toLowerCase();
  });

  const scrollToRoles = () => {
    document.getElementById("open-roles")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <main className="min-h-screen bg-white">
      {/* 1. Hero Section */}
      <section className="relative bg-sky-50 pt-32 pb-16 overflow-hidden">
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
            className="site-button mx-auto flex items-center gap-2 bg-neutral-900 text-white px-8 py-3.5 rounded-full font-medium hover:bg-neutral-800 transition-colors shadow-lg shadow-neutral-900/20"
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
          <div className="flex touch-pan-y pl-4 min-w-max">
            {galleryImages.map((src, i) => (
              <div key={i} className={`relative flex-shrink-0 w-[200px] md:w-[280px] h-full mr-4 rounded-2xl overflow-hidden shadow-xl ${i % 2 !== 0 ? 'mt-4 md:mt-8' : ''}`}>
                <img src={src} alt={`Gallery ${i}`} className="w-full h-full object-cover hover:scale-105 transition-transform duration-700 pointer-events-none" />
              </div>
            ))}
          </div>
        </motion.div>
      </section>

      {/* 2. Perks & Culture */}
      <section className="py-10 md:py-16 bg-white">
        <div className="container mx-auto px-4 max-w-6xl">
          <div className="text-center mb-16">
            <span className="text-xs font-bold text-sky-600 tracking-widest uppercase mb-2 block">
              WORK HARD AND BE YOURSELF
            </span>
            <h2 className="text-3xl md:text-5xl font-extrabold text-neutral-900 mb-4">
              Pay a visit &amp; have some coffee!
            </h2>
            <p className="text-base sm:text-lg text-neutral-600 max-w-2xl mx-auto">
              We empower our team with strong leadership, continuous growth, and an inspiring work environment.
            </p>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-5xl mx-auto">
            {[
              { icon: Zap, title: "Leader's Support", desc: "Direct mentorship and guidance from experienced leaders to accelerate your career." },
              { icon: Heart, title: "Great Team", desc: "Collaborative, friendly, and passionate engineering atmosphere." },
              { icon: Lightbulb, title: "Knowledge Sharing", desc: "Regular internal workshops, tech talks, and continuous learning opportunities." },
              { icon: Clock, title: "Flexible Hours", desc: "Work-life balance with flexible working hours to help you stay productive." },
              { icon: Star, title: "12-month increment", desc: "Structured annual performance appraisals and merit-based salary increments." },
              { icon: Sun, title: "Annual Retreat", desc: "Company-sponsored annual trips, retreats, and team celebrations." }
            ].map((feature, i) => (
              <div key={i} className="flex flex-col items-center text-center p-8 rounded-2xl border border-neutral-100 bg-white shadow-sm hover:shadow-md transition-all hover:-translate-y-1">
                <div className="flex-shrink-0 w-14 h-14 rounded-2xl bg-sky-50 text-sky-500 flex items-center justify-center mb-4">
                  <feature.icon size={28} />
                </div>
                <h3 className="text-xl font-bold text-neutral-900 mb-2">{feature.title}</h3>
                <p className="text-sm text-neutral-600 leading-relaxed">{feature.desc}</p>
              </div>
            ))}
          </div>
          <aside aria-labelledby="employee-perspective" className="mx-auto mt-8 max-w-4xl border-t border-neutral-200 pt-6">
            <a
              href="https://www.glassdoor.co.in/Overview/Working-at-ADAT-Soft-Solutions-EI_IE2063108.11,30.htm"
              target="_blank"
              rel="noopener noreferrer"
              className="group flex flex-col items-center gap-4 rounded-lg py-2 text-center focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-sky-500 sm:flex-row sm:gap-6 sm:text-left"
            >
              <img alt="Find us on Glassdoor" src="https://www.glassdoor.co.in/pc-app/static/img/partnerCenter/badges/eng_BASIC_250x90.png" width={250} height={90} loading="lazy" className="h-auto w-[160px] max-w-full shrink-0" />
              <div className="sm:border-l sm:border-neutral-200 sm:pl-6">
                <h3 id="employee-perspective" className="text-base font-semibold text-neutral-900">A closer look at life at ADAT</h3>
                <p className="mt-1 text-sm text-neutral-500">Explore our company and employee reviews on Glassdoor.</p>
              </div>
              <span className="inline-flex shrink-0 items-center gap-2 text-sm font-semibold text-sky-600 group-hover:text-sky-700 sm:ml-auto">
                View on Glassdoor <ArrowRight size={16} aria-hidden="true" className="transition-transform group-hover:translate-x-1 motion-reduce:transform-none" />
              </span>
            </a>
          </aside>
        </div>
      </section>

      {/* 3. Teams We Hire For */}
      <section className="py-10 md:py-16 bg-sky-50">
        <div className="container mx-auto px-4 max-w-6xl">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-neutral-900 mb-4">Teams We Hire For</h2>
            <p className="text-lg text-neutral-600">Find your dream role across any of our major functions.</p>
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
                  className={`cursor-pointer rounded-2xl p-5 border transition-all duration-300 ${activeTeam === team.id ? 'bg-white border-sky-200 shadow-lg shadow-sky-100/50' : 'bg-transparent border-transparent hover:bg-white/50'}`}
                >
                  <div className="flex items-center gap-4">
                    <div className={`site-step-badge w-8 h-8 rounded-full flex items-center justify-center font-bold text-sm transition-colors ${activeTeam === team.id ? 'bg-sky-500 text-white' : 'bg-neutral-200 text-neutral-600'}`}>
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
                        <p className="text-neutral-600 mt-4 pl-12 leading-relaxed">
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
      <section className="py-10 md:py-16 bg-white">
        <div className="container mx-auto px-4 max-w-6xl">
          <div className="flex flex-col items-center gap-10 md:gap-12">
            <div className="w-full max-w-2xl text-center">
              <h2 className="text-3xl md:text-4xl font-bold text-neutral-900 mb-4">How We Work</h2>
              <p className="text-lg text-neutral-600">Our core values inform every decision we make.</p>
            </div>
            
            <div className="w-full grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {[
                { icon: Star, title: "Customer First", desc: "We obsess over our customers, working backwards to deliver what they truly need." },
                { icon: CheckCircle, title: "Own It, Build It", desc: "We take full accountability for our work, from initial concept to final execution." },
                { icon: Target, title: "Focus on Impact", desc: "We prioritize work that moves the needle and creates tangible business value." },
                { icon: RefreshCw, title: "Continuous Improvement", desc: "We are always learning, adapting, and striving to be better than we were yesterday." }
              ].map((val, i) => (
                <div key={i} className="bg-neutral-50 p-5 rounded-2xl hover:shadow-xl transition-all hover:-translate-y-1">
                  <div className="w-10 h-10 bg-white rounded-xl shadow-sm flex items-center justify-center text-sky-500 mb-4">
                    <val.icon size={20} />
                  </div>
                  <h3 className="text-lg font-bold text-neutral-900 mb-2">{val.title}</h3>
                  <p className="text-sm text-neutral-600 leading-relaxed">{val.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* 5. What We Look For */}
      <section className="py-10 md:py-16 bg-sky-50 overflow-hidden">
        <div className="container mx-auto px-4 max-w-6xl text-center relative z-10">
          <h2 className="text-3xl md:text-4xl font-bold text-neutral-900 mb-4">What We Look For</h2>
          <p className="text-lg text-neutral-600 mb-16 max-w-2xl mx-auto">Skills can be taught, character cannot. We value those who show up every day with:</p>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 relative">
            {/* Background Decorative SVG simulating the squiggly lines */}
            <div className="absolute top-1/2 left-0 w-full h-full -z-10 opacity-20 pointer-events-none hidden md:block">
               <svg viewBox="0 0 1000 200" preserveAspectRatio="none" className="w-full h-full">
                  <path d="M0,100 C150,200 350,0 500,100 C650,200 850,0 1000,100" fill="none" stroke="url(#grad)" strokeWidth="40" strokeLinecap="round" />
                  <defs>
                    <linearGradient id="grad" x1="0%" y1="0%" x2="100%" y2="0%">
                      <stop offset="0%" stopColor="#bae6fd" />
                      <stop offset="33%" stopColor="#7dd3fc" />
                      <stop offset="66%" stopColor="#38bdf8" />
                      <stop offset="100%" stopColor="#0ea5e9" />
                    </linearGradient>
                  </defs>
               </svg>
            </div>

            {[
              { icon: MessageSquare, title: "Strong Communication", color: "text-sky-500", bg: "bg-sky-50" },
              { icon: Lightbulb, title: "A 'Figure It Out' Mindset", color: "text-sky-500", bg: "bg-sky-50" },
              { icon: Search, title: "Obsession over details", color: "text-sky-500", bg: "bg-sky-50" },
              { icon: Zap, title: "Bias for Action", color: "text-sky-500", bg: "bg-sky-50" }
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
      <section id="open-roles" className="py-10 md:py-16 bg-white">
        <div className="container mx-auto px-4 max-w-5xl text-center">
          <span className="text-xs font-bold text-sky-600 tracking-widest uppercase mb-2 block">
            WORK HARD AND BE YOURSELF
          </span>
          <h2 className="text-3xl md:text-5xl font-extrabold text-neutral-900 mb-12">
            Showing current offers and jobs available
          </h2>
          
          {/* Tabs */}
          <div className="flex flex-wrap justify-center gap-2 mb-12">
            {departments.map(dept => (
              <button
                key={dept}
                onClick={() => setActiveTab(dept)}
                aria-pressed={activeTab === dept}
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
                  initial={reduceMotion ? false : { opacity: 0, y: 24 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.15 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: reduceMotion ? 0 : 0.4 }}
                  key={job.id || idx} 
                  className="group flex flex-col md:flex-row md:items-center justify-between gap-6 p-6 md:p-8 rounded-3xl border border-neutral-200 bg-white hover:border-neutral-300 hover:shadow-xl transition-all"
                >
                  <div className="min-w-0 flex-1">
                    <h3 className="text-2xl font-bold text-neutral-900 mb-4 group-hover:text-sky-500 transition-colors"><Link to={`/careers/${job.id}`}>{job.title}</Link></h3>
                    <div className="flex flex-wrap gap-4 text-sm font-medium text-neutral-600">
                      <span className="flex items-center gap-1.5 bg-neutral-100 px-3 py-1 rounded-full"><MapPin size={14} /> {job.location}</span>
                      {job.experience && <span className="flex items-center gap-1.5 bg-neutral-100 px-3 py-1 rounded-full"><Clock size={14} /> {job.experience}</span>}
                      <span className="flex items-center gap-1.5 bg-neutral-100 px-3 py-1 rounded-full"><Briefcase size={14} /> {job.type}</span>
                    </div>
                    {job.description?.trim() && <p className="mt-4 whitespace-pre-line break-words text-sm leading-relaxed text-neutral-600">{job.description}</p>}
                  </div>
                  <Link
                    to={`/careers/${job.id}`}
                    className="site-button mt-6 md:mt-0 flex items-center justify-center gap-2 px-6 py-3 bg-neutral-900 text-white rounded-full font-medium hover:bg-sky-500 transition-colors shrink-0"
                  >
                    View Job & Apply <ArrowRight size={16} />
                  </Link>
                </motion.div>
              )) : (
                <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-center py-12 text-neutral-600">
                  {jobsLoading ? "Loading open roles…" : "No open roles in this category right now. Check back later!"}
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </section>


    </main>
  );
}
