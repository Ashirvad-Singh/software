import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import { Loader2, ArrowRight } from "lucide-react";
import { toast } from "sonner";
import { collection, addDoc, serverTimestamp } from "firebase/firestore";
import { db } from "@/lib/firebase";
import { sendJobApplicationEmail } from "@/lib/email";

const MAX_FILE_SIZE = 5 * 1024 * 1024;
const ACCEPTED_FILE_TYPES = [
  "application/pdf",
  "application/msword",
  "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
];

const careerSchema = z.object({
  fullName: z.string().min(2, "Full name is required"),
  email: z.string().email("Invalid email address"),
  phone: z.string().min(10, "Phone number is required"),
  currentCity: z.string().min(2, "Current city is required"),
  position: z.string().min(2, "Position is required"),
  experience: z.string().min(1, "Years of experience is required"),
  currentCompany: z.string().optional(),
  currentCtc: z.string().optional(),
  expectedCtc: z.string().optional(),
  noticePeriod: z.string().min(1, "Notice period is required"),
  linkedin: z.string().url("Invalid LinkedIn URL").optional().or(z.literal("")),
  portfolio: z.string().url("Invalid Portfolio URL").optional().or(z.literal("")),
  skills: z.string().min(2, "Skills are required"),
  coverLetter: z.string().optional(),
  resume: z
    .custom<FileList>()
    .refine((files) => files && files.length === 1, "Resume is required.")
    .refine((files) => files && files[0]?.size <= MAX_FILE_SIZE, "Max file size is 5MB.")
    .refine(
      (files) => files && ACCEPTED_FILE_TYPES.includes(files[0]?.type),
      "Only .pdf, .doc, and .docx formats are supported."
    ),
});

type CareerFormValues = z.infer<typeof careerSchema>;

interface JobApplicationFormProps {
  jobId?: string;
  defaultPosition?: string;
  readOnlyPosition?: boolean;
}

export default function JobApplicationForm({ jobId, defaultPosition = "", readOnlyPosition = false }: JobApplicationFormProps) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<CareerFormValues>({
    resolver: zodResolver(careerSchema),
    defaultValues: {
      position: defaultPosition,
    }
  });

  const onSubmit = async (data: CareerFormValues) => {
    if (isSubmitting) return;
    setIsSubmitting(true);
    setUploadProgress(0);
    try {
      const file = data.resume[0];
      const cloudName = import.meta.env.VITE_CLOUDINARY_CLOUD_NAME;
      const uploadPreset = import.meta.env.VITE_CLOUDINARY_UPLOAD_PRESET;

      if (!cloudName || !uploadPreset) {
        toast.error("Cloudinary setup is incomplete.");
        throw new Error("Cloudinary configuration is missing");
      }

      const formData = new FormData();
      formData.append("file", file);
      formData.append("upload_preset", uploadPreset);

      await new Promise<void>((resolve, reject) => {
        const xhr = new XMLHttpRequest();
        xhr.open("POST", `https://api.cloudinary.com/v1_1/${cloudName}/auto/upload`, true);
        
        xhr.upload.onprogress = (e) => {
          if (e.lengthComputable) {
            const progress = (e.loaded / e.total) * 100;
            setUploadProgress(progress);
          }
        };

        xhr.onload = async () => {
          if (xhr.status === 200) {
            try {
              const response = JSON.parse(xhr.responseText);
              const downloadURL = response.secure_url;
              
              const { resume: _resume, ...restData } = data;
              await addDoc(collection(db, "job_applications"), {
                ...restData,
                ...(jobId ? { jobId } : {}),
                position: readOnlyPosition ? defaultPosition : restData.position,
                resumeFileName: file.name,
                resumeDownloadURL: downloadURL,
                status: "New",
                createdAt: serverTimestamp(),
              });
              
              // Send automated email
              await sendJobApplicationEmail(restData.fullName, restData.email, readOnlyPosition ? defaultPosition : restData.position);

              toast.success("Application submitted successfully!");
              reset();
              resolve();
            } catch (err) {
              reject(err);
            }
          } else {
            reject(new Error("Cloudinary Upload failed: " + xhr.responseText));
          }
        };

        xhr.onerror = () => reject(new Error("Network error during upload"));
        xhr.send(formData);
      });
    } catch (error) {
      console.error("Error submitting application:", error);
      toast.error("Failed to submit application. Please try again.");
    } finally {
      setIsSubmitting(false);
      setUploadProgress(0);
    }
  };

  return (
    <form className="my-8" onSubmit={handleSubmit(onSubmit)}>
      <div className="mb-4 flex flex-col space-y-2 md:flex-row md:space-y-0 md:space-x-4">
        <LabelInputContainer>
          <Label htmlFor="fullName">Full name</Label>
          <Input id="fullName" placeholder="John Doe" type="text" {...register("fullName")} />
          {errors.fullName && <p className="text-red-500 text-xs mt-1">{errors.fullName.message}</p>}
        </LabelInputContainer>
        <LabelInputContainer>
          <Label htmlFor="email">Email Address</Label>
          <Input id="email" placeholder="john@example.com" type="email" {...register("email")} />
          {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email.message}</p>}
        </LabelInputContainer>
      </div>

      <div className="mb-4 flex flex-col space-y-2 md:flex-row md:space-y-0 md:space-x-4">
        <LabelInputContainer>
          <Label htmlFor="phone">Phone Number</Label>
          <Input id="phone" placeholder="+1 (555) 000-0000" type="tel" {...register("phone")} />
          {errors.phone && <p className="text-red-500 text-xs mt-1">{errors.phone.message}</p>}
        </LabelInputContainer>
        <LabelInputContainer>
          <Label htmlFor="currentCity">Current City</Label>
          <Input id="currentCity" placeholder="San Francisco, CA" type="text" {...register("currentCity")} />
          {errors.currentCity && <p className="text-red-500 text-xs mt-1">{errors.currentCity.message}</p>}
        </LabelInputContainer>
      </div>

      <div className="mb-4 flex flex-col space-y-2 md:flex-row md:space-y-0 md:space-x-4">
        <LabelInputContainer>
          <Label htmlFor="position">Position Applying For</Label>
          <Input 
            id="position" 
            placeholder="Frontend Developer" 
            type="text" 
            readOnly={readOnlyPosition}
            className={readOnlyPosition ? "bg-neutral-100 text-neutral-500 cursor-not-allowed focus-visible:ring-0" : ""}
            {...register("position")} 
          />
          {errors.position && <p className="text-red-500 text-xs mt-1">{errors.position.message}</p>}
        </LabelInputContainer>
        <LabelInputContainer>
          <Label htmlFor="experience">Years of Experience</Label>
          <Input id="experience" placeholder="3 years" type="text" {...register("experience")} />
          {errors.experience && <p className="text-red-500 text-xs mt-1">{errors.experience.message}</p>}
        </LabelInputContainer>
      </div>
      
      <div className="mb-4 flex flex-col space-y-2 md:flex-row md:space-y-0 md:space-x-4">
        <LabelInputContainer>
          <Label htmlFor="currentCompany">Current Company</Label>
          <Input id="currentCompany" placeholder="Tech Corp Inc." type="text" {...register("currentCompany")} />
        </LabelInputContainer>
        <LabelInputContainer>
          <Label htmlFor="noticePeriod">Notice Period</Label>
          <Input id="noticePeriod" placeholder="30 days" type="text" {...register("noticePeriod")} />
          {errors.noticePeriod && <p className="text-red-500 text-xs mt-1">{errors.noticePeriod.message}</p>}
        </LabelInputContainer>
      </div>
      
      <div className="mb-4 flex flex-col space-y-2 md:flex-row md:space-y-0 md:space-x-4">
        <LabelInputContainer>
          <Label htmlFor="currentCtc">Current CTC</Label>
          <Input id="currentCtc" placeholder="e.g. 5 LPA" type="text" {...register("currentCtc")} />
        </LabelInputContainer>
        <LabelInputContainer>
          <Label htmlFor="expectedCtc">Expected CTC</Label>
          <Input id="expectedCtc" placeholder="e.g. 7 LPA" type="text" {...register("expectedCtc")} />
        </LabelInputContainer>
      </div>
      
      <div className="mb-4 flex flex-col space-y-2 md:flex-row md:space-y-0 md:space-x-4">
        <LabelInputContainer>
          <Label htmlFor="linkedin">LinkedIn Profile</Label>
          <Input id="linkedin" placeholder="https://linkedin.com/in/..." type="url" {...register("linkedin")} />
          {errors.linkedin && <p className="text-red-500 text-xs mt-1">{errors.linkedin.message}</p>}
        </LabelInputContainer>
        <LabelInputContainer>
          <Label htmlFor="portfolio">Portfolio / Website</Label>
          <Input id="portfolio" placeholder="https://yourwebsite.com" type="url" {...register("portfolio")} />
          {errors.portfolio && <p className="text-red-500 text-xs mt-1">{errors.portfolio.message}</p>}
        </LabelInputContainer>
      </div>
      
      <LabelInputContainer className="mb-4">
        <Label htmlFor="skills">Skills</Label>
        <Input id="skills" placeholder="React, Node.js, TypeScript..." type="text" className="h-16" {...register("skills")} />
        {errors.skills && <p className="text-red-500 text-xs mt-1">{errors.skills.message}</p>}
      </LabelInputContainer>

      <LabelInputContainer className="mb-4">
        <Label htmlFor="coverLetter">Cover Letter (Optional)</Label>
        <Input id="coverLetter" placeholder="Why would you be a good fit?" type="text" className="h-24" {...register("coverLetter")} />
      </LabelInputContainer>

      <LabelInputContainer className="mb-8">
        <Label htmlFor="resume">Resume Upload (PDF, DOC, DOCX - Max 5MB)</Label>
        <Input id="resume" type="file" accept=".pdf,.doc,.docx" className="file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-primary/10 file:text-primary hover:file:bg-primary/20 cursor-pointer pt-[6px]" {...register("resume")} />
        {errors.resume && <p className="text-red-500 text-xs mt-1">{errors.resume.message as string}</p>}
        {uploadProgress > 0 && uploadProgress < 100 && (
          <p className="text-blue-500 text-xs mt-1">Uploading: {Math.round(uploadProgress)}%</p>
        )}
      </LabelInputContainer>

      <button
        className="site-button group/btn relative block h-12 w-full flex items-center justify-center rounded-md bg-gradient-to-br from-black to-neutral-600 font-medium text-white shadow-[0px_1px_0px_0px_#ffffff40_inset,0px_-1px_0px_0px_#ffffff40_inset] disabled:opacity-70 disabled:cursor-not-allowed"
        type="submit"
        disabled={isSubmitting}
      >
        {isSubmitting ? (
          <Loader2 className="w-5 h-5 animate-spin" />
        ) : (
          <span className="flex items-center justify-center gap-2">
            Submit Application <ArrowRight className="w-4 h-4" />
            <BottomGradient />
          </span>
        )}
      </button>
    </form>
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
