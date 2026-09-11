import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { sendContactEmail } from "@/lib/email";
import * as z from "zod";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { cn } from "@/lib/utils";
import { Mail, Phone, MapPin, Loader2, ArrowRight } from "lucide-react";
import { IconBrandTwitter, IconBrandLinkedin, IconBrandInstagram } from "@tabler/icons-react";
import { motion } from "framer-motion";
import { toast } from "sonner";
import { collection, addDoc, serverTimestamp } from "firebase/firestore";
import { db } from "@/lib/firebase";
import SubBanner from "@/components/site/SubBanner";

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
      await sendContactEmail(data.fullName, data.email, data.phone || "", data.company || "", data.message);
      toast.success("Message sent successfully!");
      reset();
    } catch (error) {
      console.error("Error submitting contact form:", error);
      toast.error("Failed to send message. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <main className="min-h-screen relative overflow-x-hidden bg-white pb-16 lg:pb-10 md:pb-16">
      <SubBanner
        badge="Contact Us"
        title="Get in"
        highlightTitle="touch"
        subtitle="Whether you have a question about our services, pricing, or anything else, our team is ready to answer all your questions."
      />

      <div className="container mx-auto px-4 sm:px-6 md:px-8 max-w-6xl relative z-10 pt-10 md:pt-16">
        
          <motion.div 
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: "easeOut" }}
          className="bg-white rounded-[2rem] shadow-[0_8px_30px_rgb(0,0,0,0.06)] border border-neutral-100 overflow-hidden flex flex-col xl:flex-row"
        >
          
          {/* Left Dark Side - Contact Info */}
          <div className="xl:w-2/5 min-w-0 bg-gradient-to-br from-sky-500 to-sky-700 p-6 sm:p-8 md:p-10 xl:p-12 text-white relative overflow-hidden flex flex-col justify-between">
            <div className="absolute top-0 right-0 -mr-16 -mt-16 w-64 h-64 rounded-full bg-white/20 blur-3xl pointer-events-none"></div>
            <div className="absolute bottom-0 left-0 -ml-16 -mb-16 w-64 h-64 rounded-full bg-sky-300/30 blur-3xl pointer-events-none"></div>
            
            <div className="relative z-10">
              <h3 className="text-2xl sm:text-3xl md:text-4xl font-semibold mb-4 tracking-tight">Contact Information</h3>
              <p className="text-sky-100 mb-12 text-sm leading-relaxed">Fill up the form and our Team will get back to you within 24 hours.</p>

              <div className="space-y-8">
                <div className="flex items-center gap-4 group cursor-pointer">
                  <div className="shrink-0 p-3 bg-white/10 rounded-full text-white backdrop-blur-sm group-hover:bg-sky-400 transition-colors">
                    <Phone className="w-5 h-5" />
                  </div>
                  <span className="min-w-0 break-words text-sky-100 hover:text-white transition-colors">+1 (555) 123-4567</span>
                </div>
                <div className="flex items-center gap-4 group cursor-pointer">
                  <div className="shrink-0 p-3 bg-white/10 rounded-full text-white backdrop-blur-sm group-hover:bg-sky-400 transition-colors">
                    <Mail className="w-5 h-5" />
                  </div>
                  <span className="min-w-0 break-words text-sky-100 hover:text-white transition-colors">hello@adatsoft.com</span>
                </div>
                <div className="flex items-center gap-4 group cursor-pointer">
                  <div className="shrink-0 p-3 bg-white/10 rounded-full text-white backdrop-blur-sm group-hover:bg-sky-400 transition-colors">
                    <MapPin className="w-5 h-5" />
                  </div>
                  <span className="text-sky-100 leading-relaxed group-hover:text-white transition-colors">
                    123 Tech Lane, Silicon Valley<br/>CA 94043, USA
                  </span>
                </div>
              </div>
            </div>

            <div className="mt-16 pt-8 border-t border-white/10 relative z-10">
              <p className="text-xs text-sky-200 font-medium tracking-wider uppercase mb-4">Follow us</p>
              <div className="flex gap-4">
                {[
                  { name: 'Twitter', icon: IconBrandTwitter },
                  { name: 'LinkedIn', icon: IconBrandLinkedin },
                  { name: 'Instagram', icon: IconBrandInstagram }
                ].map(social => (
                  <div key={social.name} className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center text-sky-100 hover:bg-white hover:text-sky-600 transition-all cursor-pointer">
                    <social.icon className="w-4 h-4" />
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Right White Side - Form */}
          <div className="xl:w-3/5 min-w-0 p-6 sm:p-8 md:p-10 xl:p-12 bg-sky-50 relative">
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
                  className="w-full sm:w-auto group relative inline-flex h-12 items-center justify-center overflow-hidden rounded-full bg-sky-600 px-8 font-medium text-white transition-all duration-300 hover:bg-sky-700 hover:scale-105 hover:shadow-lg disabled:opacity-70 disabled:cursor-not-allowed disabled:hover:scale-100 shadow-[0_4px_14px_0_rgba(2,132,199,0.39)]"
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

