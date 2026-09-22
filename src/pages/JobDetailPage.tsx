import { useParams, useNavigate } from "react-router-dom";
import { Loader2, MapPin, Briefcase, IndianRupee, Clock } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useState, useEffect } from "react";
import { doc, getDoc } from "firebase/firestore";
import { db } from "@/lib/firebase";
import type { JobPost } from "@/components/dashboard/JobsTab";
import SEO from "@/components/site/SEO";
import JobApplicationForm from "@/components/site/JobApplicationForm";

function renderFormattedList(content: string, jobTitle?: string) {
  if (!content?.trim()) return null;

  const rawLines = content
    .split("\n")
    .map((line) => line.trim())
    .filter(Boolean);

  const elements: React.ReactNode[] = [];
  let currentList: string[] = [];

  const flushList = (keyPrefix: string) => {
    if (currentList.length > 0) {
      elements.push(
        <ul key={`${keyPrefix}-ul-${elements.length}`} className="list-disc pl-6 space-y-2.5 marker:text-primary my-3">
          {currentList.map((item, idx) => (
            <li key={idx} className="break-words leading-relaxed text-neutral-700 dark:text-neutral-300">
              {item}
            </li>
          ))}
        </ul>
      );
      currentList = [];
    }
  };

  rawLines.forEach((line, index) => {
    const isBulletLine = /^[-*•\d+.]\s*/.test(line);
    const cleanedLine = line.replace(/^[-*•]\s*/, "").replace(/^\d+\.\s*/, "").trim();

    if (!cleanedLine) return;

    // Skip redundant title lines matching the job title
    if (jobTitle && cleanedLine.toLowerCase() === jobTitle.toLowerCase()) {
      return;
    }

    // Identify if the line is a section header (ends with colon, or is a known heading phrase, or short non-bullet title)
    const isHeader =
      !isBulletLine &&
      (line.endsWith(":") ||
        /^(required skills|key responsibilities|preferred qualifications|what expected from you|qualifications|responsibilities|requirements|skills|education|experience|benefits)/i.test(
          cleanedLine
        ) ||
        (cleanedLine.length < 40 && !cleanedLine.endsWith(".")));

    if (isHeader) {
      flushList(`section-${index}`);
      elements.push(
        <h4 key={`header-${index}`} className="font-bold text-neutral-900 dark:text-white text-base md:text-lg mt-6 mb-2 tracking-tight">
          {cleanedLine.endsWith(":") ? cleanedLine : `${cleanedLine}:`}
        </h4>
      );
    } else {
      currentList.push(cleanedLine);
    }
  });

  flushList("final");

  return <div className="space-y-1">{elements}</div>;
}

import InnerPageHero from "@/components/site/InnerPageHero";

export default function JobDetailPage() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [job, setJob] = useState<JobPost | null>(null);
  const [error, setError] = useState(false);
  const [attempt, setAttempt] = useState(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let active = true;
    setJob(null);
    setLoading(true);
    setError(false);
    const fetchJob = async () => {
      try {
        if (!id) return;
        const docRef = doc(db, "jobs", id);
        const docSnap = await getDoc(docRef);
        if (!active) return;
        if (docSnap.exists()) {
          setJob({ id: docSnap.id, ...docSnap.data() } as JobPost);
        } else {
          setJob(null);
        }
      } catch (error) {
        console.error("Error fetching job details:", error);
        if (active) setError(true);
      } finally {
        if (active) setLoading(false);
      }
    };
    fetchJob();
    return () => { active = false; };
  }, [id, attempt]);

  if (loading) {
    return (
      <main className="bg-white dark:bg-neutral-950 min-h-screen flex items-center justify-center">
        <Loader2 className="w-8 h-8 animate-spin text-primary" />
      </main>
    );
  }

  if (error) return <main className="min-h-screen px-5 pt-36 text-center"><h1 className="text-2xl font-bold">Unable to load this job</h1><Button className="mt-6" onClick={() => setAttempt(value => value + 1)}>Try again</Button></main>;

  if (!job || !job.active) {
    return (
      <main className="bg-white dark:bg-neutral-950 min-h-screen flex flex-col items-center justify-center">
        <h1 className="text-2xl font-bold mb-4">Job not found or no longer active</h1>
        <Button onClick={() => navigate("/careers")}>Back to Careers</Button>
      </main>
    );
  }

  return (
    <main className="bg-white dark:bg-neutral-950 min-h-screen">
      <SEO title={`${job.title} Careers`} description={job.description} />
      <InnerPageHero
        eyebrow={`CAREERS / ${(job.department || "OPEN ROLE").toUpperCase()}`}
        title={job.title}
        description={job.description}
        breadcrumbs={[
          { label: "Home", href: "/" },
          { label: "Careers", href: "/careers" },
          { label: job.title },
        ]}
      />
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl py-10">

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6 mb-10 md:mb-12 py-6 border-y border-neutral-200">
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

          <a href="#job-application" className="site-button mb-10 inline-flex rounded-full bg-primary px-7 py-3 font-semibold text-primary-foreground">Apply for this job</a>
          <div className="space-y-10 text-neutral-600 mb-12">
            {[["Job description", job.description], ["About the role", job.role]].map(([heading, content]) => content?.trim() && <section key={heading}><h2 className="mb-4 text-section-subtitle font-bold text-neutral-900">{heading}</h2><p className="whitespace-pre-wrap break-words leading-relaxed text-body">{content}</p></section>)}
            {job.responsibilities?.trim() && (
              <section>
                <h2 className="mb-4 text-section-subtitle font-bold text-neutral-900">Responsibilities</h2>
                {renderFormattedList(job.responsibilities, job.title)}
              </section>
            )}
            {job.requirements?.trim() && (
              <section>
                <h2 className="mb-4 text-section-subtitle font-bold text-neutral-900">Requirements</h2>
                {renderFormattedList(job.requirements, job.title)}
              </section>
            )}
            {job.benefits?.trim() && (
              <section>
                <h2 className="mb-4 text-section-subtitle font-bold text-neutral-900">Benefits</h2>
                {renderFormattedList(job.benefits, job.title)}
              </section>
            )}
          </div>

          <div id="job-application" className="scroll-mt-28 bg-neutral-50 dark:bg-neutral-900 p-4 sm:p-8 rounded-2xl border border-neutral-200 dark:border-neutral-800 mt-16">
            <h3 className="text-section-subtitle font-bold text-neutral-900 dark:text-white mb-2">Apply for this Role</h3>
            <JobApplicationForm jobId={job.id} defaultPosition={job.title} readOnlyPosition />
          </div>
        </div>
    </main>
  );
}
