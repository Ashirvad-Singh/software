import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { sendContactEmail } from "@/lib/email";
import * as z from "zod";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { cn } from "@/lib/utils";
import { Mail, MapPin, Loader2, ArrowRight } from "lucide-react";
import CompanyLinks from "@/components/site/CompanyLinks";
import { motion } from "framer-motion";
import { toast } from "sonner";
import { collection, addDoc, serverTimestamp } from "firebase/firestore";
import { db } from "@/lib/firebase";
import InnerPageHero from "@/components/site/InnerPageHero";
import SEO from "@/components/site/SEO";

const contactSchema = z.object({
  fullName: z.string().min(2, "Full name is required"),
  email: z.string().email("Invalid email address"),
  phone: z.string().min(10, "Phone number is required"),
  company: z.string().optional(),
  subject: z.string().min(2, "Subject is required"),
  message: z.string().min(10, "Message is too short"),
});

type ContactFormValues = z.infer<typeof contactSchema>;

export default function ContactPage() {
  const [isSubmitting, setIsSubmitting] = useState(false);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<ContactFormValues>({
    resolver: zodResolver(contactSchema),
  });

  const onSubmit = async (data: ContactFormValues) => {
    if (isSubmitting) return;
    setIsSubmitting(true);
    try {
      await addDoc(collection(db, "contact_submissions"), {
        ...data,
        createdAt: serverTimestamp(),
      });
      await sendContactEmail(data.fullName, data.email, data.phone || "", data.company || "", data.message, data.subject);
      toast.success("Message submitted successfully!");
      reset();
    } catch (error) {
      console.error("Error submitting contact form:", error);
      toast.error("Failed to send message. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <main className="min-h-screen relative overflow-x-hidden bg-white md:">
      <SEO
        title="Contact Us"
        description="Whether you have a project in mind or want to explore potential technical partnerships, our team is ready to help."
      />
      <InnerPageHero
        eyebrow="GET IN TOUCH"
        title="Let's Build"
        highlightTitle="Together."
        description="Whether you have a project in mind or want to explore potential technical partnerships, our team is ready to help."
        breadcrumbs={[
          { label: "Home", href: "/" },
          { label: "Contact Us" },
        ]}
      />

      <div className="container mx-auto px-4 sm:px-6 md:px-8 max-w-6xl relative z-10 pt-4 sm:pt-6 md:pt-8">
        
          <motion.div 
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: "easeOut" }}
          className="bg-white rounded-[2rem] shadow-[0_8px_30px_rgb(0,0,0,0.06)] border border-neutral-100 overflow-hidden flex flex-col xl:flex-row"
        >
          
          {/* Left Dark Side - Contact Info */}
          <div className="xl:w-2/5 min-w-0 bg-gradient-to-br from-sky-500 to-sky-700 p-5 sm:p-8 md:p-10 xl:p-12 text-white relative overflow-hidden flex flex-col justify-between">
            <div className="absolute top-0 right-0 -mr-16 -mt-16 w-64 h-64 rounded-full bg-white/20 blur-3xl pointer-events-none"></div>
            <div className="absolute bottom-0 left-0 -ml-16 -mb-16 w-64 h-64 rounded-full bg-sky-300/30 blur-3xl pointer-events-none"></div>
            
            <div className="relative z-10">
              <h3 className="text-fluid-h3 font-semibold mb-4 tracking-tight">Contact Information</h3>
              <p className="text-sky-100 mb-12 text-sm leading-relaxed">Fill up the form and our Team will get back to you within 24 hours.</p>

              <div className="space-y-8">
                <div className="flex items-center gap-4 group cursor-pointer">
                  <div className="site-icon-tile shrink-0 p-3 rounded-full text-sky-600">
                    <Mail className="w-5 h-5" />
                  </div>
                  <a href="mailto:info@adatsolutions.com" className="min-w-0 break-words text-sky-100 hover:text-white transition-colors">info@adatsolutions.com</a>
                </div>
                <div className="flex items-center gap-4 group cursor-pointer">
                  <div className="site-icon-tile shrink-0 p-3 rounded-full text-sky-600">
                    <MapPin className="w-5 h-5" />
                  </div>
                  <span className="text-sky-100 leading-relaxed group-hover:text-white transition-colors">
                    Plot no - ITC -11, Sector -67,<br/>Mohali (India)
                  </span>
                </div>
                <div className="flex items-center gap-4 group cursor-pointer">
                  <div className="site-icon-tile shrink-0 p-3 rounded-full text-sky-600">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="20"
                      height="20"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="w-5 h-5"
                    >
                      <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
                      <rect width="4" height="12" x="2" y="9" />
                      <circle cx="4" cy="4" r="2" />
                    </svg>
                  </div>
                  <a href="https://www.linkedin.com/company/adatsoftsolutions/" target="_blank" rel="noopener noreferrer" className="min-w-0 break-words text-sky-100 hover:text-white transition-colors">ADAT Soft Solutions</a>
                </div>
              </div>
            </div>

            <div className="mt-16 pt-8 border-t border-white/10 relative z-10">
              <p className="text-xs text-sky-200 font-medium tracking-wider uppercase mb-4">Follow us</p>
              <CompanyLinks contact />
            </div>
          </div>

          {/* Right White Side - Form */}
          <div className="xl:w-3/5 min-w-0 p-5 sm:p-8 md:p-10 xl:p-12 bg-sky-50 relative">
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 sm:space-y-6">
              
              <div className="grid grid-cols-1 gap-4 sm:gap-6 md:grid-cols-2">
                <LabelInputContainer>
                  <Label htmlFor="fullName" className="text-neutral-600 font-medium">First & Last Name</Label>
                  <Input id="fullName" placeholder="John Doe" type="text" {...register("fullName")} className="bg-neutral-50/50" />
                  {errors.fullName && <p className="text-red-500 text-xs mt-1">{errors.fullName.message}</p>}
                </LabelInputContainer>

                <LabelInputContainer>
                  <Label htmlFor="phone" className="text-neutral-600 font-medium">Phone Number</Label>
                  <Input id="phone" placeholder="+1 (555) 000-0000" type="tel" {...register("phone")} className="bg-neutral-50/50" />
                  {errors.phone && <p className="text-red-500 text-xs mt-1">{errors.phone.message}</p>}
                </LabelInputContainer>
              </div>

              <div className="grid grid-cols-1 gap-4 sm:gap-6 md:grid-cols-2">
                <LabelInputContainer>
                  <Label htmlFor="email" className="text-neutral-600 font-medium">Email Address</Label>
                  <Input id="email" placeholder="john@example.com" type="email" {...register("email")} className="bg-neutral-50/50" />
                  {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email.message}</p>}
                </LabelInputContainer>

                <LabelInputContainer>
                  <Label htmlFor="company" className="text-neutral-600 font-medium">Company Name (Optional)</Label>
                  <Input id="company" placeholder="Your Company Ltd" type="text" {...register("company")} className="bg-neutral-50/50" />
                </LabelInputContainer>
              </div>

              <LabelInputContainer>
                <Label htmlFor="subject" className="text-neutral-600 font-medium">Subject</Label>
                <Input id="subject" placeholder="What is this regarding?" type="text" {...register("subject")} className="bg-neutral-50/50" />
                {errors.subject && <p className="text-red-500 text-xs mt-1">{errors.subject.message}</p>}
              </LabelInputContainer>

              <LabelInputContainer>
                <Label htmlFor="message" className="text-neutral-600 font-medium">Message</Label>
                <Textarea id="message" placeholder="Write your message here..." className="h-32 bg-neutral-50/50" {...register("message")} />
                {errors.message && <p className="text-red-500 text-xs mt-1">{errors.message.message}</p>}
              </LabelInputContainer>

              <div className="pt-6 flex justify-end">
                <button
                  className="site-button w-full sm:w-auto group relative inline-flex h-12 items-center justify-center overflow-hidden rounded-full bg-sky-600 px-8 font-medium text-white transition-all duration-300 hover:bg-sky-700 hover:scale-105 hover:shadow-lg disabled:opacity-70 disabled:cursor-not-allowed disabled:hover:scale-100 shadow-[0_4px_14px_0_rgba(2,132,199,0.39)]"
                  type="submit"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? (
                    <Loader2 className="w-5 h-5 animate-spin" />
                  ) : (
                    <>
                      <span className="mr-2">Send Message</span>
                      <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" />
                    </>
                  )}
                </button>
              </div>

            </form>
          </div>

        </motion.div>

        {/* Google Map Section */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: "easeOut", delay: 0.2 }}
          className="mt-12 bg-white rounded-[2rem] shadow-[0_8px_30px_rgb(0,0,0,0.06)] border border-neutral-100 overflow-hidden w-full h-[400px] md:h-[500px]"
        >
          <iframe 
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3431.3103102169703!2d76.7259426!3d30.681544100000004!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x390fefbaaccba1ef%3A0x49ca0988c02a1f4f!2sADAT%20Soft%20Solutions!5e0!3m2!1sen!2sin!4v1789974550501!5m2!1sen!2sin" 
            className="w-full h-full border-0" 
            allowFullScreen={false} 
            loading="lazy" 
            referrerPolicy="no-referrer-when-downgrade"
          />
        </motion.div>

      </div>
    </main>
  );
}

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

