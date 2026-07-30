import { useState, useEffect } from "react";
import { collection, addDoc, getDocs, updateDoc, deleteDoc, doc, query, orderBy } from "firebase/firestore";
import { db } from "@/lib/firebase";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";
import { Loader2, Plus, Pencil, Trash2, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { ImageUpload } from "@/components/ui/image-upload";

export interface ServiceItem {
  id?: string;
  title: string;
  slug: string;
  description: string;
  longDescription: string;
  benefits: string;
  process: string;
  iconName: string; // e.g. "Code", "Smartphone", "Globe"
  features: string; // comma separated
  visualType?: "default" | "globe" | "image";
  thumbnailUrl?: string;
  createdAt: number;
}

export default function ServicesTab() {
  const [services, setServices] = useState<ServiceItem[]>([]);
  const [loading, setLoading] = useState(false);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);

  const [formData, setFormData] = useState<Omit<ServiceItem, "id" | "createdAt">>({
    title: "",
    slug: "",
    description: "",
    longDescription: "",
    benefits: "",
    process: "",
    iconName: "Code",
    features: "",
    visualType: "default",
    thumbnailUrl: "",
  });

  const fetchServices = async () => {
    setLoading(true);
    try {
      const q = query(collection(db, "services"), orderBy("createdAt", "desc"));
      const snapshot = await getDocs(q);
      const data = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() })) as ServiceItem[];
      setServices(data);
    } catch (error) {
      console.error(error);
      toast.error("Failed to fetch services");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchServices();
  }, []);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      if (editingId) {
        await updateDoc(doc(db, "services", editingId), { ...formData });
        toast.success("Service updated successfully");
      } else {
        await addDoc(collection(db, "services"), { ...formData, createdAt: Date.now() });
        toast.success("Service created successfully");
      }
      setIsFormOpen(false);
      setEditingId(null);
      resetForm();
      fetchServices();
    } catch (error) {
      console.error(error);
      toast.error("Failed to save service");
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this service?")) return;
    try {
      await deleteDoc(doc(db, "services", id));
      toast.success("Service deleted successfully");
      fetchServices();
    } catch (error) {
      console.error(error);
      toast.error("Failed to delete service");
    }
  };

  const handleEdit = (service: ServiceItem) => {
    setEditingId(service.id!);
    setFormData({
      title: service.title,
      slug: service.slug,
      description: service.description,
      longDescription: service.longDescription || "",
      benefits: service.benefits || "",
      process: service.process || "",
      iconName: service.iconName,
      features: service.features,
    });
    setIsFormOpen(true);
  };

  const resetForm = () => {
    setFormData({
      title: "",
      slug: "",
      description: "",
      longDescription: "",
      benefits: "",
      process: "",
      iconName: "Code",
      features: "",
    });
  };

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-neutral-200 p-6">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-bold text-neutral-800">Manage Services</h2>
        <Button onClick={() => { setIsFormOpen(true); setEditingId(null); resetForm(); }}>
          <Plus className="w-4 h-4 mr-2" /> Add Service
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
              <h3 className="font-bold text-lg mb-4">{editingId ? "Edit Service" : "Create New Service"}</h3>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <Input placeholder="Service Title" name="title" value={formData.title} onChange={handleInputChange} required />
                  <Input placeholder="Slug (e.g. web-development)" name="slug" value={formData.slug} onChange={handleInputChange} required />
                  <Input placeholder="Icon Name (lucide-react)" name="iconName" value={formData.iconName} onChange={handleInputChange} required className="md:col-span-2" />
                  
                  <textarea 
                    placeholder="Short Description" 
                    name="description" 
                    value={formData.description} 
                    onChange={handleInputChange} 
                    required 
                    className="flex min-h-[80px] w-full rounded-md border border-input bg-transparent px-3 py-2 text-sm shadow-sm md:col-span-2"
                  />
                  <textarea 
                    placeholder="Long Description (Detailed overview for the service page)" 
                    name="longDescription" 
                    value={formData.longDescription} 
                    onChange={handleInputChange} 
                    required 
                    className="flex min-h-[120px] w-full rounded-md border border-input bg-transparent px-3 py-2 text-sm shadow-sm md:col-span-2"
                  />
                  <textarea 
                    placeholder="Benefits (one per line)" 
                    name="benefits" 
                    value={formData.benefits} 
                    onChange={handleInputChange} 
                    className="flex h-10 w-full rounded-md border border-input bg-transparent px-3 py-2 text-sm shadow-sm"
                  />

                  <div className="md:col-span-2 space-y-2">
                    <label className="text-sm font-medium text-neutral-700 mb-2 block">Visual Layout Component</label>
                    <select
                      name="visualType"
                      value={formData.visualType}
                      onChange={handleInputChange}
                      className="w-full rounded-xl border border-neutral-200 bg-white px-4 py-2.5 text-sm outline-none focus:border-sky-500 focus:ring-2 focus:ring-sky-500/20"
                    >
                      <option value="default">Standard Layout</option>
                      <option value="globe">3D Globe Component (Great for Cloud/Web)</option>
                      <option value="staggered_images">UI/UX Interactive Mockup (Great for UI/UX Design)</option>
                      <option value="analytics">Analytics Dashboard Demo (Great for AI/Analytics)</option>
                      <option value="image">Custom Thumbnail Image</option>
                    </select>
                  </div>

                  {formData.visualType === "image" && (
                    <div className="md:col-span-2 space-y-2">
                      <label className="text-sm font-medium text-neutral-700">Service Thumbnail</label>
                      <ImageUpload 
                        value={formData.thumbnailUrl || ""} 
                        onChange={(url) => setFormData(prev => ({ ...prev, thumbnailUrl: url }))} 
                        multiple={false} 
                      />
                    </div>
                  )}

                  <textarea 
                    placeholder="Process (Format: 'Step Title: Step Description' one per line)" 
                    name="process" 
                    value={formData.process} 
                    onChange={handleInputChange} 
                    className="flex min-h-[100px] w-full rounded-md border border-input bg-transparent px-3 py-2 text-sm shadow-sm md:col-span-2"
                  />
                  <textarea 
                    placeholder="Features (comma separated)" 
                    name="features" 
                    value={formData.features} 
                    onChange={handleInputChange} 
                    className="flex min-h-[60px] w-full rounded-md border border-input bg-transparent px-3 py-2 text-sm shadow-sm md:col-span-2"
                  />
                </div>
                <Button type="submit" disabled={loading} className="w-full md:w-auto">
                  {loading ? <Loader2 className="w-4 h-4 mr-2 animate-spin" /> : null}
                  {editingId ? "Update Service" : "Publish Service"}
                </Button>
              </form>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-neutral-50 border-b border-neutral-200 text-sm text-neutral-500">
              <th className="p-4 font-medium">Title / Slug</th>
              <th className="p-4 font-medium">Icon</th>
              <th className="p-4 font-medium">Description</th>
              <th className="p-4 font-medium text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="text-sm">
            {services.length === 0 ? (
              <tr><td colSpan={4} className="p-8 text-center text-neutral-500">No services found.</td></tr>
            ) : (
              services.map((service) => (
                <tr key={service.id} className="border-b border-neutral-100 hover:bg-neutral-50">
                  <td className="p-4">
                    <div className="font-medium text-neutral-800">{service.title}</div>
                    <div className="text-neutral-500 text-xs mt-1">/{service.slug}</div>
                  </td>
                  <td className="p-4 text-neutral-600">{service.iconName}</td>
                  <td className="p-4 text-neutral-600 max-w-xs truncate" title={service.description}>{service.description}</td>
                  <td className="p-4 text-right">
                    <Button variant="ghost" size="icon" onClick={() => handleEdit(service)}>
                      <Pencil className="w-4 h-4 text-blue-600" />
                    </Button>
                    <Button variant="ghost" size="icon" onClick={() => handleDelete(service.id!)}>
                      <Trash2 className="w-4 h-4 text-red-600" />
                    </Button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
