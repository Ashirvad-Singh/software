import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"

const teamMembers = [
  {
    name: "Manu Arora",
    role: "Founder & CEO",
    avatar: "https://images.unsplash.com/photo-1599566150163-29194dcaad36?q=80&w=200&auto=format&fit=crop",
  },
  {
    name: "John Doe",
    role: "Co-Founder & CTO",
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=200&auto=format&fit=crop",
  },
  {
    name: "Glennfiddich Doe",
    role: "Software Engineer",
    avatar: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?q=80&w=200&auto=format&fit=crop",
  },
  {
    name: "Jameson Beam",
    role: "Designer",
    avatar: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?q=80&w=200&auto=format&fit=crop",
  },
  {
    name: "Johnny Walker",
    role: "Marketing Manager",
    avatar: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?q=80&w=200&auto=format&fit=crop",
  },
  {
    name: "Jack Daniels",
    role: "HR & Management",
    avatar: "https://images.unsplash.com/photo-1531427186611-ecfd6d936c79?q=80&w=200&auto=format&fit=crop",
  },
  {
    name: "Samantha Rives",
    role: "Product Manager",
    avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?q=80&w=200&auto=format&fit=crop",
  },
  {
    name: "Evelyn Martinez",
    role: "QA Lead",
    avatar: "https://images.unsplash.com/photo-1580489944761-15a19d654956?q=80&w=200&auto=format&fit=crop",
  },
  {
    name: "Priya Patel",
    role: "Lead UX Researcher",
    avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=200&auto=format&fit=crop",
  },
]

export default function TeamPage() {
  return (
    <main className="pt-32 pb-24 bg-white text-black min-h-screen">
      <div className="container mx-auto px-4">
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="max-w-3xl mx-auto text-center mb-24"
        >
          <h1 className="text-4xl md:text-5xl font-bold tracking-tight mb-6">The team building the future of web & mobile apps</h1>
          <p className="text-lg text-neutral-600 mb-8 leading-relaxed">
            We are a team of expert engineers and designers, focused on building custom software and digital solutions for the world, one step at a time. We are not afraid to take risks and push technical boundaries.
          </p>
          <div className="flex items-center justify-center gap-4">
            <Button size="lg" className="bg-[#3b82f6] hover:bg-[#2563eb] text-white rounded-md border-0">We are hiring</Button>
            <Button variant="ghost" size="lg" className="rounded-md text-neutral-600 hover:text-black hover:bg-neutral-100">Our culture &rarr;</Button>
          </div>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-12 max-w-6xl mx-auto">
          {teamMembers.map((member, index) => (
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1, duration: 0.5 }}
              viewport={{ once: true }}
              key={member.name} 
              className="flex items-center gap-4 p-4 rounded-xl hover:bg-neutral-50 transition-colors cursor-pointer group"
            >
              <div className="h-14 w-14 rounded-xl overflow-hidden bg-neutral-200 shrink-0 border border-neutral-200">
                <img src={member.avatar} alt={member.name} className="h-full w-full object-cover group-hover:scale-110 transition-transform duration-300" />
              </div>
              <div>
                <h3 className="font-semibold text-lg text-black">{member.name}</h3>
                <p className="text-sm text-neutral-500">{member.role}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </main>
  )
}
