import { useParams, Link, useNavigate } from "react-router-dom";
import { ArrowLeft, Loader2, MapPin, Briefcase, IndianRupee, Clock } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useState, useEffect } from "react";
import { doc, getDoc } from "firebase/firestore";
import { db } from "@/lib/firebase";
import type { JobPost } from "@/components/dashboard/JobsTab";
import { motion } from "framer-motion";
import JobApplicationForm from "@/components/site/JobApplicationForm";

export default function JobDetailPage() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [job, setJob] = useState<JobPost | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchJob = async () => {
      try {
        if (!id) return;
        const docRef = doc(db, "jobs", id);
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
          setJob({ id: docSnap.id, ...docSnap.data() } as JobPost);
        } else {
          setJob(null);
        }
      } catch (error) {
        console.error("Error fetching job details:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchJob();
  }, [id]);

  if (loading) {
    return (
      <main className="bg-white dark:bg-neutral-950 min-h-screen flex items-center justify-center">
        <Loader2 className="w-8 h-8 animate-spin text-primary" />
      </main>
    );
  }

  if (!job || !job.active) {
    return (
      <main className="bg-white dark:bg-neutral-950 min-h-screen flex flex-col items-center justify-center">
        <h1 className="text-2xl font-bold mb-4">Job not found or no longer active</h1>
        <Button onClick={() => navigate("/careers")}>Back to Careers</Button>
      </main>
    );
  }

  return (
    <main className="bg-white dark:bg-neutral-950 min-h-screen pt-32 pb-24">
      <div className="container mx-auto px-4 max-w-4xl">
        <Link to="/careers" className="inline-flex items-center text-sm font-medium text-neutral-500 hover:text-primary transition-colors mb-8">
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back to Careers
        </Link>
        
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <div className="mb-6 flex flex-wrap items-center gap-3">
            <span className="px-4 py-1.5 rounded-full bg-blue-50 text-blue-700 text-sm font-bold uppercase tracking-wider">
              {job.department}
            </span>
            <span className="px-4 py-1.5 rounded-full bg-neutral-100 text-neutral-700 text-sm font-bold uppercase tracking-wider">
              {job.type}
            </span>
          </div>

          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-neutral-900 tracking-tight mb-8">
            {job.title}
          </h1>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-12 py-6 border-y border-neutral-200">
            <div className="flex flex-col gap-1">
              <span className="flex items-center text-sm text-neutral-500 font-medium"><MapPin className="w-4 h-4 mr-2" /> Location</span>
              <span className="font-semibold text-neutral-900">{job.location}</span>
            </div>
            <div className="flex flex-col gap-1">
              <span className="flex items-center text-sm text-neutral-500 font-medium"><Briefcase className="w-4 h-4 mr-2" /> Experience</span>
              <span className="font-semibold text-neutral-900">{job.experience || "Not specified"}</span>
            </div>
            <div className="flex flex-col gap-1">
              <span className="flex items-center text-sm text-neutral-500 font-medium"><IndianRupee className="w-4 h-4 mr-2" /> Salary</span>
              <span className="font-semibold text-neutral-900">{job.salaryRange || "Competitive"}</span>
            </div>
            <div className="flex flex-col gap-1">
              <span className="flex items-center text-sm text-neutral-500 font-medium"><Clock className="w-4 h-4 mr-2" /> Job Type</span>
              <span className="font-semibold text-neutral-900">{job.type}</span>
            </div>
          </div>

          <div className="prose prose-lg max-w-none text-neutral-600 mb-12">
            <h2 className="text-2xl font-bold text-neutral-900 mb-4">About the Role</h2>
            <p className="whitespace-pre-wrap">{job.description}</p>
            
            <h2 className="text-2xl font-bold text-neutral-900 mt-10 mb-4">What You'll Do</h2>
            <ul className="list-disc pl-6 space-y-2 marker:text-primary">
              {job.responsibilities?.split('\n').filter(r => r.trim().length > 0).map((req, i) => (
                <li key={i}>{req}</li>
              ))}
            </ul>

            <h2 className="text-2xl font-bold text-neutral-900 mt-10 mb-4">What You Need</h2>
            <ul className="list-disc pl-6 space-y-2 marker:text-primary">
              {job.requirements?.split('\n').filter(r => r.trim().length > 0).map((req, i) => (
                <li key={i}>{req}</li>
              ))}
            </ul>
          </div>

          <div className="bg-neutral-50 p-8 rounded-2xl border border-neutral-200 mt-16">
            <h3 className="text-2xl font-bold text-neutral-900 mb-2">Apply for this Role</h3>
            <p className="text-neutral-600 mb-8">Please fill out the form below to apply for the {job.title} position.</p>
            <JobApplicationForm defaultPosition={job.title} readOnlyPosition={true} />
          </div>
        </motion.div>
      </div>
    </main>
  );
}
