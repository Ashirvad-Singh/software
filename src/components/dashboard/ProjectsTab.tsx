import { useState, useEffect } from "react";
import { collection, addDoc, getDocs, updateDoc, deleteDoc, doc, query, orderBy } from "firebase/firestore";
import { db } from "@/lib/firebase";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";
import { Loader2, Plus, Pencil, Trash2, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { ImageUpload } from "@/components/ui/image-upload";

export interface ProjectItem {
  id?: string;
  title: string;
  slug: string;
  category: string;
  image: string;
  tags: string;
  result: string;
  featured: boolean;
  client: string;
  timeline: string;
  challenge: string;
  solution: string;
  gallery: string; // Newline separated URLs
  liveUrl?: string;
  createdAt: number;
}

export default function ProjectsTab() {
  const [projects, setProjects] = useState<ProjectItem[]>([]);
  const [loading, setLoading] = useState(false);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);

  const [formData, setFormData] = useState<Omit<ProjectItem, "id" | "createdAt">>({
    title: "",
    slug: "",
    category: "",
    image: "",
    tags: "",
    result: "",
    featured: false,
    client: "",
    timeline: "",
    challenge: "",
    solution: "",
    gallery: "",
    liveUrl: "",
  });

  const fetchProjects = async () => {
    setLoading(true);
    try {
      const q = query(collection(db, "projects"), orderBy("createdAt", "desc"));
      const snapshot = await getDocs(q);
      const data = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() })) as ProjectItem[];
      setProjects(data);
    } catch (error) {
      console.error(error);
      toast.error("Failed to fetch projects");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProjects();
  }, []);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData((prev) => ({ ...prev, featured: e.target.checked }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      if (editingId) {
        await updateDoc(doc(db, "projects", editingId), { ...formData });
        toast.success("Project updated successfully");
      } else {
        await addDoc(collection(db, "projects"), { ...formData, createdAt: Date.now() });
        toast.success("Project created successfully");
      }
      setIsFormOpen(false);
      setEditingId(null);
      resetForm();
      fetchProjects();
    } catch (error) {
      console.error(error);
      toast.error("Failed to save project");
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this project?")) return;
    try {
      await deleteDoc(doc(db, "projects", id));
      toast.success("Project deleted successfully");
      fetchProjects();
    } catch (error) {
      console.error(error);
      toast.error("Failed to delete project");
    }
  };

  const handleEdit = (project: ProjectItem) => {
    setEditingId(project.id!);
    setFormData({
      title: project.title,
      slug: project.slug,
      category: project.category,
      image: project.image,
      tags: project.tags,
      result: project.result,
      featured: project.featured,
      client: project.client,
      timeline: project.timeline,
      challenge: project.challenge,
      solution: project.solution,
      gallery: project.gallery,
      liveUrl: project.liveUrl || "",
    });
    setIsFormOpen(true);
  };

  const resetForm = () => {
    setFormData({
      title: "",
      slug: "",
      category: "",
      image: "",
      tags: "",
      result: "",
      featured: false,
      client: "",
      timeline: "",
      challenge: "",
      solution: "",
      gallery: "",
      liveUrl: "",
    });
  };

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-neutral-200 p-6">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-bold text-neutral-800">Manage Projects (Portfolio)</h2>
        <Button onClick={() => { setIsFormOpen(true); setEditingId(null); resetForm(); }}>
          <Plus className="w-4 h-4 mr-2" /> Add Project
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
              <h3 className="font-bold text-lg mb-4">{editingId ? "Edit Project" : "Create New Project"}</h3>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <Input placeholder="Project Title" name="title" value={formData.title} onChange={handleInputChange} required />
                  <Input placeholder="Slug (e.g. nextgen-fintech)" name="slug" value={formData.slug} onChange={handleInputChange} required />
                  <Input placeholder="Category" name="category" value={formData.category} onChange={handleInputChange} required />
                  <Input placeholder="Client Name" name="client" value={formData.client} onChange={handleInputChange} />
                  <Input placeholder="Timeline (e.g. 6 Months)" name="timeline" value={formData.timeline} onChange={handleInputChange} />
                  <Input placeholder="Key Result" name="result" value={formData.result} onChange={handleInputChange} />
                  <Input placeholder="Tags (comma separated)" name="tags" value={formData.tags} onChange={handleInputChange} required />
                  <Input placeholder="Live URL (https://...)" name="liveUrl" value={formData.liveUrl || ""} onChange={handleInputChange} />
                  
                  <div className="md:col-span-2 space-y-2">
                    <label className="text-sm font-medium text-neutral-700">Cover Image</label>
                    <ImageUpload 
                      value={formData.image} 
                      onChange={(url) => setFormData(prev => ({ ...prev, image: url }))} 
                      multiple={false} 
                    />
                  </div>
                  
                  <textarea 
                    placeholder="The Challenge" 
                    name="challenge" 
                    value={formData.challenge} 
                    onChange={handleInputChange} 
                    className="flex min-h-[100px] w-full rounded-md border border-input bg-transparent px-3 py-2 text-sm shadow-sm md:col-span-2"
                  />
                  <textarea 
                    placeholder="The Solution" 
                    name="solution" 
                    value={formData.solution} 
                    onChange={handleInputChange} 
                    className="flex min-h-[100px] w-full rounded-md border border-input bg-transparent px-3 py-2 text-sm shadow-sm md:col-span-2"
                  />
                  
                  <div className="md:col-span-2 space-y-2">
                    <label className="text-sm font-medium text-neutral-700">Gallery Images</label>
                    <ImageUpload 
                      value={formData.gallery} 
                      onChange={(url) => setFormData(prev => ({ ...prev, gallery: url }))} 
                      multiple={true} 
                    />
                  </div>
                  
                  <div className="flex items-center space-x-2 md:col-span-2">
                    <input type="checkbox" id="featured" name="featured" checked={formData.featured} onChange={handleCheckboxChange} className="rounded border-gray-300" />
                    <label htmlFor="featured" className="text-sm font-medium text-neutral-700">Featured Project (Show on Homepage)</label>
                  </div>
                </div>
                <Button type="submit" disabled={loading} className="w-full md:w-auto mt-4">
                  {loading ? <Loader2 className="w-4 h-4 mr-2 animate-spin" /> : null}
                  {editingId ? "Update Project" : "Publish Project"}
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
              <th className="p-4 font-medium w-16">Cover</th>
              <th className="p-4 font-medium">Title / Category</th>
              <th className="p-4 font-medium">Client</th>
              <th className="p-4 font-medium">Featured</th>
              <th className="p-4 font-medium text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="text-sm">
            {projects.length === 0 ? (
              <tr><td colSpan={5} className="p-8 text-center text-neutral-500">No projects found.</td></tr>
            ) : (
              projects.map((project) => (
                <tr key={project.id} className="border-b border-neutral-100 hover:bg-neutral-50">
                  <td className="p-4">
                    <img src={project.image} alt={project.title} className="w-12 h-12 object-cover rounded-md" />
                  </td>
                  <td className="p-4">
                    <div className="font-medium text-neutral-800">{project.title}</div>
                    <div className="text-neutral-500 text-xs mt-1">{project.category}</div>
                  </td>
                  <td className="p-4 text-neutral-600">{project.client}</td>
                  <td className="p-4">
                    {project.featured 
                      ? <span className="text-blue-600 bg-blue-50 px-2 py-1 rounded-md font-medium text-xs">Yes</span>
                      : <span className="text-neutral-500 text-xs">No</span>
                    }
                  </td>
                  <td className="p-4 text-right">
                    <Button variant="ghost" size="icon" onClick={() => handleEdit(project)}>
                      <Pencil className="w-4 h-4 text-blue-600" />
                    </Button>
                    <Button variant="ghost" size="icon" onClick={() => handleDelete(project.id!)}>
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
