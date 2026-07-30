import { useState, useEffect } from "react";
import { useLocation, Link } from "react-router-dom";
import { motion } from "framer-motion";
import { collection, getDocs, query, where } from "firebase/firestore";
import { db } from "@/lib/firebase";
import JobApplicationForm from "@/components/site/JobApplicationForm";
import SubBanner from "@/components/site/SubBanner";



const staticJobOpenings = [
  { title: "Senior Frontend Developer", type: "Full-time", location: "Remote" },
  { title: "UI/UX Designer", type: "Full-time", location: "Remote" },
  { title: "Backend Engineer (Node.js)", type: "Full-time", location: "San Francisco, CA" },
  { title: "Product Manager", type: "Full-time", location: "Remote" },
  { title: "DevOps Engineer", type: "Contract", location: "Remote" },
];

export default function CareersPage() {
  const [jobOpenings, setJobOpenings] = useState<any[]>([]);
  const location = useLocation();
  const defaultPosition = location.state?.applyingFor || "";

  useEffect(() => {
    const fetchJobs = async () => {
      try {
        const q = query(collection(db, "jobs"), where("active", "==", true));
        const snapshot = await getDocs(q);
        const data = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
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


  return (
    <main className="min-h-screen bg-background pb-24">
      <SubBanner
        badge="Careers"
        title="Join Adat"
        highlightTitle="Soft Solutions"
        subtitle="We are always looking for talented individuals to join our team of builders. Explore our open roles and apply below!"
      />

      <div className="container mx-auto px-4 max-w-3xl pt-12 md:pt-16">
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="shadow-input mx-auto w-full rounded-2xl bg-white p-6 md:p-10 border border-neutral-100"
        >

        {/* Job Openings List */}
        <div className="mb-12">
          <h3 className="text-xl font-bold text-neutral-800 mb-6 border-b pb-2">Current Openings</h3>
          <div className="space-y-4">
            {jobOpenings.map((job, index) => (
              <div key={index} className="flex flex-col sm:flex-row sm:items-center justify-between p-4 rounded-xl border border-neutral-200 bg-neutral-50 hover:border-primary hover:shadow-sm transition-all">
                <div>
                  <h4 className="font-semibold text-neutral-800 text-lg">{job.title}</h4>
                  <div className="flex gap-3 text-sm text-neutral-500 mt-1">
                    <span>{job.type}</span>
                    <span>&bull;</span>
                    <span>{job.location}</span>
                  </div>
                </div>
                {job.id ? (
                  <Link to={`/careers/${job.id}`} className="mt-4 sm:mt-0 px-4 py-2 text-sm font-medium text-primary bg-primary/10 rounded-lg hover:bg-primary/20 transition-colors">
                    View Details
                  </Link>
                ) : (
                  <button 
                    onClick={() => {
                      const formElement = document.getElementById('apply-form');
                      if (formElement) {
                        formElement.scrollIntoView({ behavior: 'smooth' });
                      }
                    }}
                    className="mt-4 sm:mt-0 px-4 py-2 text-sm font-medium text-primary bg-primary/10 rounded-lg hover:bg-primary/20 transition-colors"
                  >
                    Apply Now
                  </button>
                )}
              </div>
            ))}
          </div>
        </div>

        <h3 className="text-xl font-bold text-neutral-800 mb-6 border-b pb-2">Submit Application</h3>

        <div id="apply-form">
          <JobApplicationForm defaultPosition={defaultPosition} />
        </div>
      </motion.div>
    </div>
  </main>
  );
}
