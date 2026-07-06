import { useState, useEffect } from "react";
import { collection, addDoc, getDocs, deleteDoc, doc, updateDoc, query, orderBy } from "firebase/firestore";
import { db } from "@/lib/firebase";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";
import { Loader2, Plus, Trash2, Edit2, X, Star } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { ImageUpload } from "@/components/ui/image-upload";

export interface Testimonial {
  id?: string;
  name: string;
  role: string;
  content: string;
  avatar: string;
  rating: number;
  createdAt: number;
}

export default function TestimonialsTab() {
  const [testimonials, setTestimonials] = useState<Testimonial[]>([]);
  const [loading, setLoading] = useState(false);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);

  const [formData, setFormData] = useState({
    name: "",
    role: "",
    content: "",
    avatar: "",
    rating: 5,
  });

  const fetchTestimonials = async () => {
    setLoading(true);
    try {
      const q = query(collection(db, "testimonials"), orderBy("createdAt", "desc"));
      const snapshot = await getDocs(q);
      const data = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() })) as Testimonial[];
      setTestimonials(data);
    } catch (error) {
      console.error(error);
      toast.error("Failed to fetch testimonials");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTestimonials();
  }, []);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: name === "rating" ? Number(value) : value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      if (editingId) {
        await updateDoc(doc(db, "testimonials", editingId), { ...formData });
        toast.success("Testimonial updated successfully");
      } else {
        await addDoc(collection(db, "testimonials"), { ...formData, createdAt: Date.now() });
        toast.success("Testimonial added successfully");
      }
      setIsFormOpen(false);
      setEditingId(null);
      setFormData({ name: "", role: "", content: "", avatar: "", rating: 5 });
      fetchTestimonials();
    } catch (error) {
      console.error(error);
      toast.error("Failed to save testimonial");
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this testimonial?")) return;
    try {
      await deleteDoc(doc(db, "testimonials", id));
      toast.success("Testimonial deleted successfully");
      fetchTestimonials();
    } catch (error) {
      console.error(error);
      toast.error("Failed to delete testimonial");
    }
  };

  const handleEdit = (item: Testimonial) => {
    setEditingId(item.id!);
    setFormData({
      name: item.name,
      role: item.role,
      content: item.content,
      avatar: item.avatar,
      rating: item.rating,
    });
    setIsFormOpen(true);
  };

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-neutral-200 p-6">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-bold text-neutral-800">Manage Testimonials</h2>
        <Button onClick={() => {
          setIsFormOpen(true);
          setEditingId(null);
          setFormData({ name: "", role: "", content: "", avatar: "", rating: 5 });
        }}>
          <Plus className="w-4 h-4 mr-2" /> Add Testimonial
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
              <h3 className="font-bold text-lg mb-4">{editingId ? "Edit Testimonial" : "Add Testimonial"}</h3>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <Input placeholder="Client Name" name="name" value={formData.name} onChange={handleInputChange} required />
                  <Input placeholder="Role / Company" name="role" value={formData.role} onChange={handleInputChange} required />
                  
                  <div className="md:col-span-2 space-y-2">
                    <label className="text-sm font-medium text-neutral-700">Profile Image</label>
                    <ImageUpload 
                      value={formData.avatar} 
                      onChange={(url) => setFormData(prev => ({ ...prev, avatar: url }))} 
                    />
                  </div>

                  <Input type="number" min="1" max="5" placeholder="Rating (1-5)" name="rating" value={formData.rating} onChange={handleInputChange} required />
                  
                  <div className="md:col-span-2">
                    <textarea 
                      placeholder="Testimonial Content" 
                      name="content" 
                      value={formData.content} 
                      onChange={handleInputChange} 
                      required 
                      className="w-full flex min-h-[80px] rounded-md border border-input bg-transparent px-3 py-2 text-sm shadow-sm placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50"
                    />
                  </div>
                </div>
                <Button type="submit" disabled={loading} className="w-full md:w-auto">
                  {loading ? <Loader2 className="w-4 h-4 mr-2 animate-spin" /> : null}
                  {editingId ? "Update Testimonial" : "Add Testimonial"}
                </Button>
              </form>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {testimonials.length === 0 ? (
          <div className="col-span-full p-8 text-center text-neutral-500 border rounded-lg bg-neutral-50">No testimonials found.</div>
        ) : (
          testimonials.map((item) => (
            <div key={item.id} className="p-6 border rounded-lg bg-white shadow-sm flex flex-col">
              <div className="flex gap-1 mb-4">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className={`w-4 h-4 ${i < item.rating ? "fill-primary text-primary" : "text-neutral-200"}`} />
                ))}
              </div>
              <p className="text-sm text-neutral-700 italic flex-grow mb-6">"{item.content}"</p>
              <div className="flex items-center justify-between mt-auto">
                <div className="flex items-center gap-3">
                  <img src={item.avatar} alt={item.name} className="w-10 h-10 rounded-full object-cover bg-neutral-100" />
                  <div>
                    <h4 className="font-bold text-sm text-neutral-900">{item.name}</h4>
                    <p className="text-xs text-neutral-500">{item.role}</p>
                  </div>
                </div>
                <div className="flex gap-2">
                  <Button variant="outline" size="icon" className="h-8 w-8" onClick={() => handleEdit(item)}>
                    <Edit2 className="w-4 h-4" />
                  </Button>
                  <Button variant="destructive" size="icon" className="h-8 w-8" onClick={() => handleDelete(item.id!)}>
                    <Trash2 className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
