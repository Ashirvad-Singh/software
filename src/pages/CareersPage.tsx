import React from "react";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import {
  IconBrandLinkedin,
  IconBrandGithub,
} from "@tabler/icons-react";
import { motion } from "framer-motion";

const jobOpenings = [
  { title: "Senior Frontend Developer", type: "Full-time", location: "Remote" },
  { title: "UI/UX Designer", type: "Full-time", location: "Remote" },
  { title: "Backend Engineer (Node.js)", type: "Full-time", location: "San Francisco, CA" },
  { title: "Product Manager", type: "Full-time", location: "Remote" },
  { title: "DevOps Engineer", type: "Contract", location: "Remote" },
];

export default function CareersPage() {
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log("Job Application submitted");
  };
  return (
    <main className="pt-32 pb-24 min-h-screen bg-background">
      <motion.div 
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="shadow-input mx-auto w-full max-w-2xl rounded-none bg-white p-4 md:rounded-2xl md:p-8 border border-neutral-100"
      >
        <h2 className="text-3xl font-bold text-neutral-800">
          Join Adat Soft Solutions
        </h2>
        <p className="mt-2 text-neutral-600 mb-10">
          We are always looking for talented individuals to join our team of builders. Explore our open roles and apply below!
        </p>

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
                <button className="mt-4 sm:mt-0 px-4 py-2 text-sm font-medium text-primary bg-primary/10 rounded-lg hover:bg-primary/20 transition-colors">
                  Apply Now
                </button>
              </div>
            ))}
          </div>
        </div>

        <h3 className="text-xl font-bold text-neutral-800 mb-6 border-b pb-2">Submit Application</h3>

        <form className="my-8" onSubmit={handleSubmit}>
          <div className="mb-4 flex flex-col space-y-2 md:flex-row md:space-y-0 md:space-x-4">
            <LabelInputContainer>
              <Label htmlFor="firstname">First name</Label>
              <Input id="firstname" placeholder="John" type="text" required />
            </LabelInputContainer>
            <LabelInputContainer>
              <Label htmlFor="lastname">Last name</Label>
              <Input id="lastname" placeholder="Doe" type="text" required />
            </LabelInputContainer>
          </div>
          
          <div className="mb-4 flex flex-col space-y-2 md:flex-row md:space-y-0 md:space-x-4">
            <LabelInputContainer>
              <Label htmlFor="email">Email Address</Label>
              <Input id="email" placeholder="john@example.com" type="email" required />
            </LabelInputContainer>
            <LabelInputContainer>
              <Label htmlFor="phone">Phone Number</Label>
              <Input id="phone" placeholder="+1 (555) 000-0000" type="tel" />
            </LabelInputContainer>
          </div>

          <LabelInputContainer className="mb-4">
            <Label htmlFor="role">Role Applied For</Label>
            <Input id="role" placeholder="e.g. Frontend Developer" type="text" required />
          </LabelInputContainer>

          <LabelInputContainer className="mb-8">
            <Label htmlFor="portfolio">Portfolio / Website Link</Label>
            <Input id="portfolio" placeholder="https://yourwebsite.com" type="url" />
          </LabelInputContainer>

          <button
            className="group/btn relative block h-12 w-full rounded-md bg-gradient-to-br from-black to-neutral-600 font-medium text-white shadow-[0px_1px_0px_0px_#ffffff40_inset,0px_-1px_0px_0px_#ffffff40_inset]"
            type="submit"
          >
            Submit Application &rarr;
            <BottomGradient />
          </button>

          <div className="my-8 h-[1px] w-full bg-gradient-to-r from-transparent via-neutral-300 to-transparent" />

          <p className="text-center text-sm text-neutral-600 mb-4">Or apply via social platforms</p>

          <div className="flex flex-col space-y-4">
            <button
              className="group/btn shadow-input relative flex h-10 w-full items-center justify-center space-x-2 rounded-md bg-gray-50 border border-neutral-200 px-4 font-medium text-black"
              type="button"
            >
              <IconBrandLinkedin className="h-5 w-5 text-blue-600" />
              <span className="text-sm text-neutral-700">Apply with LinkedIn</span>
              <BottomGradient />
            </button>
            <button
              className="group/btn shadow-input relative flex h-10 w-full items-center justify-center space-x-2 rounded-md bg-gray-50 border border-neutral-200 px-4 font-medium text-black"
              type="button"
            >
              <IconBrandGithub className="h-5 w-5 text-neutral-800" />
              <span className="text-sm text-neutral-700">Apply with GitHub</span>
              <BottomGradient />
            </button>
          </div>
        </form>
      </motion.div>
    </main>
  );
}

const BottomGradient = () => {
  return (
    <>
      <span className="absolute inset-x-0 -bottom-px block h-px w-full bg-gradient-to-r from-transparent via-blue-500 to-transparent opacity-0 transition duration-500 group-hover/btn:opacity-100" />
      <span className="absolute inset-x-10 -bottom-px mx-auto block h-px w-1/2 bg-gradient-to-r from-transparent via-blue-400 to-transparent opacity-0 blur-sm transition duration-500 group-hover/btn:opacity-100" />
    </>
  );
};

const LabelInputContainer = ({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) => {
  return (
    <div className={cn("flex w-full flex-col space-y-2", className)}>
      {children}
    </div>
  );
};
