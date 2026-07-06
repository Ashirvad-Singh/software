import { HoverMember } from "@/components/ui/hover-member";
import { useState, useEffect } from "react";
import { collection, getDocs, query, orderBy } from "firebase/firestore";
import { db } from "@/lib/firebase";
import { Loader2 } from "lucide-react";

const staticTeamData = [
  { 
    name: "John Doe", 
    role: "CEO & Founder",
    image: "https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&q=80&w=800" 
  },
  { 
    name: "Sarah Smith", 
    role: "Lead Designer",
    image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=800" 
  },
  { 
    name: "Mike Johnson", 
    role: "Lead Developer",
    image: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&q=80&w=800" 
  },
  { 
    name: "Emily Davis", 
    role: "Product Manager",
    image: "https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&q=80&w=800" 
  },
  { 
    name: "David Wilson", 
    role: "Marketing Head",
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=800" 
  },
  { 
    name: "Lisa Chen", 
    role: "UX Researcher",
    image: "https://images.unsplash.com/photo-1598550874175-4d0ef43ce416?auto=format&fit=crop&q=80&w=800" 
  },
];

export default function TeamPage() {
  const [teamMembers, setTeamMembers] = useState<{name: string, role: string, image: string}[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTeam = async () => {
      try {
        const q = query(collection(db, "team"), orderBy("createdAt", "asc"));
        const snapshot = await getDocs(q);
        const data = snapshot.docs.map(doc => doc.data() as {name: string, role: string, image: string});
        if (data.length > 0) {
          setTeamMembers(data);
        } else {
          setTeamMembers(staticTeamData);
        }
      } catch (error) {
        console.error("Error fetching team:", error);
        setTeamMembers(staticTeamData);
      } finally {
        setLoading(false);
      }
    };
    fetchTeam();
  }, []);

  return (
    <main className="pt-32 pb-32 bg-neutral-50 dark:bg-neutral-950 min-h-screen">
      <div className="container mx-auto px-4 md:px-6">
        <div className="text-center max-w-3xl mx-auto mb-20">
          <h1 className="text-sm font-bold text-primary tracking-widest uppercase mb-3">
            Our Team
          </h1>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tighter mb-6 text-foreground">
            Meet the Minds Behind the Magic
          </h2>
          <p className="text-muted-foreground text-lg">
            We are a collective of passionate designers, developers, and strategists dedicated to crafting exceptional digital experiences.
          </p>
        </div>

        {loading ? (
          <div className="flex justify-center items-center h-64">
            <Loader2 className="w-8 h-8 animate-spin text-primary" />
          </div>
        ) : (
          <HoverMember teamMembers={teamMembers} />
        )}
      </div>
    </main>
  );
}
