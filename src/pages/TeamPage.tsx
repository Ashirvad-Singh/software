import TeamShowcaseScroll, { type TeamMember } from "@/components/site/TeamShowcaseScroll";
import { useState, useEffect } from "react";
import { collection, getDocs, query, orderBy } from "firebase/firestore";
import { db } from "@/lib/firebase";
import SubBanner from "@/components/site/SubBanner";
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
  const [teamMembers, setTeamMembers] = useState<TeamMember[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTeam = async () => {
      try {
        const q = query(collection(db, "team"), orderBy("createdAt", "asc"));
        const snapshot = await getDocs(q);
        const data = snapshot.docs.map(doc => doc.data() as TeamMember);
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
    <main className="bg-neutral-50 dark:bg-neutral-950 min-h-screen font-sans">
      <SubBanner
        badge="Our Team"
        title="Meet the Minds Behind the"
        highlightTitle="Magic"
        subtitle="We are a collective of passionate designers, developers, and strategists dedicated to crafting exceptional digital experiences."
      />

        {loading ? (
          <div role="status" className="flex justify-center items-center h-64">
            <span className="sr-only">Loading our team</span>
            <Loader2 className="w-8 h-8 animate-spin text-primary" />
          </div>
        ) : (
          <TeamShowcaseScroll members={teamMembers} />
        )}
    </main>
  );
}
