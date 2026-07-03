import { useState } from "react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import * as z from "zod"
import { toast } from "sonner"
import { motion } from "framer-motion"
import { Send, Loader2, Sparkles } from "lucide-react"

const formSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Please enter a valid email address"),
  projectType: z.string().min(1, "Please select a project type"),
  budget: z.string().min(1, "Please select a budget range"),
  message: z.string().min(10, "Message must be at least 10 characters"),
})

type FormData = z.infer<typeof formSchema>

export default function ContactSection() {
  const [isSubmitting, setIsSubmitting] = useState(false)

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(formSchema),
  })

  const onSubmit = async (data: FormData) => {
    setIsSubmitting(true)
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1500))
    setIsSubmitting(false)
    
    console.log(data)
    toast.success("Message sent successfully!", {
      description: "We'll get back to you within 24 hours.",
      icon: <Sparkles className="w-4 h-4 text-primary" />,
    })
    reset()
  }

  return (
    <section id="contact" className="py-24 relative overflow-hidden">
      {/* Background Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-primary/10 rounded-full blur-[120px] -z-10 pointer-events-none" />

      <div className="container mx-auto px-4 md:px-6">
        <div className="grid lg:grid-cols-2 gap-16 items-center max-w-6xl mx-auto">
          
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="text-5xl md:text-6xl font-bold tracking-tighter mb-6 leading-tight">
              Have a project in mind? <br />
              <span className="text-primary">Let's build it together.</span>
            </h2>
            <p className="text-xl text-muted-foreground mb-8">
              Whether you need a custom web application, a scalable mobile app, or a complete digital transformation, our team is ready to bring your vision to life.
            </p>
            
            <div className="space-y-6">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-full bg-secondary flex items-center justify-center text-primary font-bold text-xl">1</div>
                <div>
                  <h4 className="font-bold text-lg">Discovery Call</h4>
                  <p className="text-muted-foreground">We discuss your goals and requirements.</p>
                </div>
              </div>
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-full bg-secondary flex items-center justify-center text-primary font-bold text-xl">2</div>
                <div>
                  <h4 className="font-bold text-lg">Project Proposal</h4>
                  <p className="text-muted-foreground">Detailed scope, timeline, and budget.</p>
                </div>
              </div>
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-full bg-secondary flex items-center justify-center text-primary font-bold text-xl">3</div>
                <div>
                  <h4 className="font-bold text-lg">Development Begins</h4>
                  <p className="text-muted-foreground">We start building your digital solution.</p>
                </div>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="bg-card border border-border/50 rounded-2xl p-8 shadow-2xl relative"
          >
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label htmlFor="name" className="text-sm font-medium">Full Name</label>
                  <input
                    id="name"
                    {...register("name")}
                    className="w-full h-12 px-4 rounded-lg bg-secondary/50 border border-border focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-all"
                    placeholder="John Doe"
                  />
                  {errors.name && <p className="text-destructive text-sm">{errors.name.message}</p>}
                </div>
                <div className="space-y-2">
                  <label htmlFor="email" className="text-sm font-medium">Email Address</label>
                  <input
                    id="email"
                    type="email"
                    {...register("email")}
                    className="w-full h-12 px-4 rounded-lg bg-secondary/50 border border-border focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-all"
                    placeholder="john@example.com"
                  />
                  {errors.email && <p className="text-destructive text-sm">{errors.email.message}</p>}
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label htmlFor="projectType" className="text-sm font-medium">Project Type</label>
                  <select
                    id="projectType"
                    {...register("projectType")}
                    className="w-full h-12 px-4 rounded-lg bg-secondary/50 border border-border focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-all appearance-none"
                  >
                    <option value="">Select a service...</option>
                    <option value="web">Web Development</option>
                    <option value="app">Mobile App</option>
                    <option value="ecommerce">E-commerce</option>
                    <option value="uiux">UI/UX Design</option>
                    <option value="other">Other</option>
                  </select>
                  {errors.projectType && <p className="text-destructive text-sm">{errors.projectType.message}</p>}
                </div>
                <div className="space-y-2">
                  <label htmlFor="budget" className="text-sm font-medium">Budget Range</label>
                  <select
                    id="budget"
                    {...register("budget")}
                    className="w-full h-12 px-4 rounded-lg bg-secondary/50 border border-border focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-all appearance-none"
                  >
                    <option value="">Select budget...</option>
                    <option value="5k-10k">$5k - $10k</option>
                    <option value="10k-25k">$10k - $25k</option>
                    <option value="25k-50k">$25k - $50k</option>
                    <option value="50k+">$50k+</option>
                  </select>
                  {errors.budget && <p className="text-destructive text-sm">{errors.budget.message}</p>}
                </div>
              </div>

              <div className="space-y-2">
                <label htmlFor="message" className="text-sm font-medium">Project Details</label>
                <textarea
                  id="message"
                  {...register("message")}
                  className="w-full min-h-[120px] p-4 rounded-lg bg-secondary/50 border border-border focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-all resize-y"
                  placeholder="Tell us about your project goals, timeline, and any specific requirements..."
                />
                {errors.message && <p className="text-destructive text-sm">{errors.message.message}</p>}
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full h-14 bg-primary text-primary-foreground rounded-lg font-bold text-lg flex items-center justify-center gap-2 hover:bg-primary/90 transition-colors disabled:opacity-70"
              >
                {isSubmitting ? (
                  <>
                    <Loader2 className="w-5 h-5 animate-spin" />
                    Sending...
                  </>
                ) : (
                  <>
                    Send Message
                    <Send className="w-5 h-5 ml-2" />
                  </>
                )}
              </button>
            </form>
          </motion.div>
          
        </div>
      </div>
    </section>
  )
}
