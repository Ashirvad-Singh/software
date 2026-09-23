import { ImageUpload } from "@/components/ui/image-upload";
import { useState, useEffect } from "react";
import { collection, addDoc, getDocs, updateDoc, deleteDoc, doc, query, orderBy } from "firebase/firestore";
import { db } from "@/lib/firebase";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";
import { Loader2, Plus, Pencil, Trash2, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export interface JobPost {
  id?: string;
  featuredImageUrl?: string;
  title: string;
  department: string;
  location: string;
  type: string;
  experience: string;
  salaryRange: string;
  description: string;
  role?: string;
  benefits?: string;
  requirements: string;
  responsibilities: string;
  active: boolean;
  createdAt: number;
}

export default function JobsTab() {
  const [jobs, setJobs] = useState<JobPost[]>([]);
  const [uploading, setUploading] = useState(false);
  const [loading, setLoading] = useState(false);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);

  const [formData, setFormData] = useState<Omit<JobPost, "id" | "createdAt">>({
    featuredImageUrl: "",
    title: "",
    department: "",
    location: "",
    type: "Full-time",
    experience: "",
    salaryRange: "",
    description: "",
    role: "",
    benefits: "",
    requirements: "",
    responsibilities: "",
    active: true,
  });

  const fetchJobs = async () => {
    setLoading(true);
    try {
      const q = query(collection(db, "jobs"), orderBy("createdAt", "desc"));
      const snapshot = await getDocs(q);
      const data = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() })) as JobPost[];
      setJobs(data);
    } catch (error) {
      console.error(error);
      toast.error("Failed to fetch jobs");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchJobs();
  }, []);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData((prev) => ({ ...prev, active: e.target.checked }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (loading || uploading) return;
    setLoading(true);
    try {
      if (editingId) {
        await updateDoc(doc(db, "jobs", editingId), { ...formData });
        toast.success("Job updated successfully");
      } else {
        await addDoc(collection(db, "jobs"), { ...formData, createdAt: Date.now() });
        toast.success("Job created successfully");
      }
      setIsFormOpen(false);
      setEditingId(null);
      resetForm();
      fetchJobs();
    } catch (error) {
      console.error(error);
      toast.error("Failed to save job");
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this job?")) return;
    try {
      await deleteDoc(doc(db, "jobs", id));
      toast.success("Job deleted successfully");
      fetchJobs();
    } catch (error) {
      console.error(error);
      toast.error("Failed to delete job");
    }
  };

  const handleEdit = (job: JobPost) => {
    setEditingId(job.id!);
    setFormData({
      featuredImageUrl: job.featuredImageUrl || "",
      title: job.title,
      department: job.department,
      location: job.location,
      type: job.type,
      experience: job.experience || "",
      salaryRange: job.salaryRange || "",
      description: job.description || "",
      role: job.role || "",
      benefits: job.benefits || "",
      requirements: job.requirements,
      responsibilities: job.responsibilities || "",
      active: job.active,
    });
    setIsFormOpen(true);
  };

  const resetForm = () => {
    setFormData({
      featuredImageUrl: "",
    title: "",
      department: "",
      location: "",
      type: "Full-time",
      experience: "",
      salaryRange: "",
      description: "",
    role: "",
    benefits: "",
      requirements: "",
      responsibilities: "",
      active: true,
    });
  };

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-neutral-200 p-6">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-bold text-neutral-800">Manage Job Postings</h2>
        <Button onClick={() => { setIsFormOpen(true); setEditingId(null); resetForm(); }}>
          <Plus className="w-4 h-4 mr-2" /> Add Job
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
              <h3 className="font-bold text-lg mb-4">{editingId ? "Edit Job" : "Create New Job"}</h3>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="space-y-2">
                  <h4 className="text-sm font-medium">Featured Image</h4>
                  <p className="text-xs text-neutral-500">Upload or change the main image shown on this job’s detail page.</p>
                  <ImageUpload value={formData.featuredImageUrl || ""} onChange={url => setFormData(prev => ({ ...prev, featuredImageUrl: url }))} onUploadingChange={setUploading} />
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <Input placeholder="Job Title" name="title" value={formData.title} onChange={handleInputChange} required />
                  <Input aria-label="Job category / department" placeholder="Category / Department (e.g. Engineering)" name="department" value={formData.department} onChange={handleInputChange} required />
                  <Input placeholder="Location (e.g. Remote, India)" name="location" value={formData.location} onChange={handleInputChange} required />
                  <select 
                    name="type" 
                    value={formData.type} 
                    onChange={handleInputChange} 
                    className="flex h-10 w-full rounded-md border border-input bg-transparent px-3 py-2 text-sm shadow-sm"
                  >
                    <option value="Full-time">Full-time</option>
                    <option value="Part-time">Part-time</option>
                    <option value="Contract">Contract</option>
                    <option value="Internship">Internship</option>
                  </select>
                  <Input placeholder="Experience (e.g. 3-5 Years)" name="experience" value={formData.experience} onChange={handleInputChange} required />
                  <Input placeholder="Salary Range (e.g. $100k - $120k)" name="salaryRange" value={formData.salaryRange} onChange={handleInputChange} />
                  
                  <textarea 
                    aria-label="Job description" placeholder="Job description (shown on the careers page)"
                    name="description" 
                    value={formData.description} 
                    onChange={handleInputChange} 
                    required 
                    className="flex min-h-[80px] w-full rounded-md border border-input bg-transparent px-3 py-2 text-sm shadow-sm md:col-span-2"
                  />
                  <label className="md:col-span-2 text-sm font-medium">About the role
                    <textarea name="role" value={formData.role || ""} onChange={handleInputChange} placeholder="Role purpose, team, and scope" className="mt-2 min-h-[100px] w-full rounded-md border border-input bg-transparent px-3 py-2 text-sm" />
                  </label>
                  <label className="md:col-span-2 text-sm font-medium">Benefits (optional)
                    <textarea name="benefits" value={formData.benefits || ""} onChange={handleInputChange} placeholder="Benefits and perks, one per line" className="mt-2 min-h-[100px] w-full rounded-md border border-input bg-transparent px-3 py-2 text-sm" />
                  </label>
                  <textarea 
                    aria-label="Responsibilities"
                    placeholder="Responsibilities (one per line or paragraph)" 
                    name="responsibilities" 
                    value={formData.responsibilities} 
                    onChange={handleInputChange} 
                    required 
                    className="flex min-h-[100px] w-full rounded-md border border-input bg-transparent px-3 py-2 text-sm shadow-sm md:col-span-2"
                  />
                  <textarea 
                    aria-label="Requirements" placeholder="Requirements (one per line)"
                    name="requirements" 
                    value={formData.requirements} 
                    onChange={handleInputChange} 
                    required 
                    className="flex min-h-[100px] w-full rounded-md border border-input bg-transparent px-3 py-2 text-sm shadow-sm md:col-span-2"
                  />
                  <div className="flex items-center space-x-2 md:col-span-2">
                    <input type="checkbox" id="active" name="active" checked={formData.active} onChange={handleCheckboxChange} className="rounded border-gray-300" />
                    <label htmlFor="active" className="text-sm font-medium text-green-700">Active (Visible on Careers Page)</label>
                  </div>
                </div>
                <Button type="submit" disabled={loading || uploading} className="w-full md:w-auto">
                  {loading ? <Loader2 className="w-4 h-4 mr-2 animate-spin" /> : null}
                  {editingId ? "Update Job" : "Publish Job"}
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
              <th className="p-4 font-medium">Title</th>
              <th className="p-4 font-medium">Department</th>
              <th className="p-4 font-medium">Status</th>
              <th className="p-4 font-medium text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="text-sm">
            {jobs.length === 0 ? (
              <tr><td colSpan={4} className="p-8 text-center text-neutral-500">No jobs found.</td></tr>
            ) : (
              jobs.map((job) => (
                <tr key={job.id} className="border-b border-neutral-100 hover:bg-neutral-50">
                  <td className="p-4 font-medium text-neutral-800">{job.title}</td>
                  <td className="p-4 text-neutral-600">{job.department}</td>
                  <td className="p-4">
                    {job.active 
                      ? <span className="text-green-600 bg-green-50 px-2 py-1 rounded-md font-medium text-xs">Active</span>
                      : <span className="text-red-600 bg-red-50 px-2 py-1 rounded-md font-medium text-xs">Closed</span>
                    }
                  </td>
                  <td className="p-4 text-right">
                    <Button variant="ghost" size="icon" onClick={() => handleEdit(job)}>
                      <Pencil className="w-4 h-4 text-blue-600" />
                    </Button>
                    <Button variant="ghost" size="icon" onClick={() => handleDelete(job.id!)}>
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
