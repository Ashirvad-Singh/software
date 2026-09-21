import { useState, useEffect } from "react";
import { collection, addDoc, getDocs, deleteDoc, doc, updateDoc, query, orderBy } from "firebase/firestore";
import { db } from "@/lib/firebase";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";
import { Loader2, Plus, Trash2, Edit2, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { ImageUpload } from "@/components/ui/image-upload";

interface TeamMember {
  id?: string;
  name: string;
  role: string;
  image: string;
  createdAt: number;
}

export default function TeamTab() {
  const [teamMembers, setTeamMembers] = useState<TeamMember[]>([]);
  const [loading, setLoading] = useState(false);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);

  const [formData, setFormData] = useState({
    name: "",
    role: "",
    image: "",
  });

  const fetchTeam = async () => {
    setLoading(true);
    try {
      const q = query(collection(db, "team"), orderBy("createdAt", "asc"));
      const snapshot = await getDocs(q);
      const data = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() })) as TeamMember[];
      setTeamMembers(data);
    } catch (error) {
      console.error(error);
      toast.error("Failed to fetch team members");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTeam();
  }, []);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      if (editingId) {
        await updateDoc(doc(db, "team", editingId), { ...formData });
        toast.success("Team member updated successfully");
      } else {
        await addDoc(collection(db, "team"), { ...formData, createdAt: Date.now() });
        toast.success("Team member added successfully");
      }
      setIsFormOpen(false);
      setEditingId(null);
      setFormData({ name: "", role: "", image: "" });
      fetchTeam();
    } catch (error) {
      console.error(error);
      toast.error("Failed to save team member");
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this team member?")) return;
    try {
      await deleteDoc(doc(db, "team", id));
      toast.success("Team member deleted successfully");
      fetchTeam();
    } catch (error) {
      console.error(error);
      toast.error("Failed to delete team member");
    }
  };

  const handleEdit = (member: TeamMember) => {
    setEditingId(member.id!);
    setFormData({
      name: member.name,
      role: member.role,
      image: member.image,
    });
    setIsFormOpen(true);
  };

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-neutral-200 p-6">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-bold text-neutral-800">Manage Team</h2>
        <Button onClick={() => {
          setIsFormOpen(true);
          setEditingId(null);
          setFormData({ name: "", role: "", image: "" });
        }}>
          <Plus className="w-4 h-4 mr-2" /> Add Member
        </Button>
      </div>

      <AnimatePresence>
        {isFormOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="mb-8 overflow-hidden"
          >
            <div className="p-6 bg-neutral-50 rounded-xl border border-neutral-200 relative">
              <button
                onClick={() => setIsFormOpen(false)}
                className="absolute top-4 right-4 text-neutral-500 hover:text-black"
              >
                <X className="w-5 h-5" />
              </button>
              <h3 className="font-bold text-lg mb-4">{editingId ? "Edit Team Member" : "Add Team Member"}</h3>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <Input placeholder="Full Name" name="name" value={formData.name} onChange={handleInputChange} required />
                  <Input placeholder="Role / Position" name="role" value={formData.role} onChange={handleInputChange} required />
                  <div className="md:col-span-2 space-y-2">
                    <label className="text-sm font-medium text-neutral-700">Profile Image</label>
                    <ImageUpload 
                      value={formData.image} 
                      onChange={(url) => setFormData(prev => ({ ...prev, image: url }))} 
                      multiple={false} 
                    />
                  </div>
                </div>
                <Button type="submit" disabled={loading} className="w-full md:w-auto">
                  {loading ? <Loader2 className="w-4 h-4 mr-2 animate-spin" /> : null}
                  {editingId ? "Update Member" : "Add Member"}
                </Button>
              </form>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {teamMembers.length === 0 ? (
          <div className="col-span-full p-8 text-center text-neutral-500 border rounded-lg bg-neutral-50">No team members found.</div>
        ) : (
          teamMembers.map((member) => (
            <div key={member.id} className="flex items-center p-4 border rounded-lg bg-neutral-50 gap-4">
              <img src={member.image} alt={member.name} className="w-16 h-16 rounded-full object-cover border" />
              <div className="flex-1 min-w-0">
                <h4 className="font-bold text-neutral-800 truncate">{member.name}</h4>
                <p className="text-sm text-neutral-500 truncate">{member.role}</p>
              </div>
              <div className="flex flex-col gap-2">
                <Button variant="outline" size="icon" className="h-8 w-8" onClick={() => handleEdit(member)}>
                  <Edit2 className="w-4 h-4" />
                </Button>
                <Button variant="destructive" size="icon" className="h-8 w-8" onClick={() => handleDelete(member.id!)}>
                  <Trash2 className="w-4 h-4" />
                </Button>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
