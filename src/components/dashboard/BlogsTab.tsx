import { useState, useEffect } from "react";
import { collection, addDoc, getDocs, updateDoc, deleteDoc, doc, query, orderBy } from "firebase/firestore";
import { db } from "@/lib/firebase";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";
import { Loader2, Plus, Pencil, Trash2, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { ImageUpload } from "@/components/ui/image-upload";

export interface BlogPost {
  id?: string;
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  author: string;
  date: string;
  readTime: string;
  category: string;
  image: string;
  featured: boolean;
  createdAt: number;
}

export default function BlogsTab() {
  const [blogs, setBlogs] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(false);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);

  const [formData, setFormData] = useState<Omit<BlogPost, "id" | "createdAt">>({
    title: "",
    slug: "",
    excerpt: "",
    content: "",
    author: "",
    date: new Date().toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" }),
    readTime: "",
    category: "",
    image: "",
    featured: false,
  });

  const fetchBlogs = async () => {
    setLoading(true);
    try {
      const q = query(collection(db, "blogs"), orderBy("createdAt", "desc"));
      const snapshot = await getDocs(q);
      const data = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() })) as BlogPost[];
      setBlogs(data);
    } catch (error) {
      console.error(error);
      toast.error("Failed to fetch blogs");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBlogs();
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
        await updateDoc(doc(db, "blogs", editingId), { ...formData });
        toast.success("Blog updated successfully");
      } else {
        await addDoc(collection(db, "blogs"), { ...formData, createdAt: Date.now() });
        toast.success("Blog created successfully");
      }
      setIsFormOpen(false);
      setEditingId(null);
      resetForm();
      fetchBlogs();
    } catch (error) {
      console.error(error);
      toast.error("Failed to save blog");
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this blog?")) return;
    try {
      await deleteDoc(doc(db, "blogs", id));
      toast.success("Blog deleted successfully");
      fetchBlogs();
    } catch (error) {
      console.error(error);
      toast.error("Failed to delete blog");
    }
  };

  const handleEdit = (blog: BlogPost) => {
    setEditingId(blog.id!);
    setFormData({
      title: blog.title,
      slug: blog.slug,
      excerpt: blog.excerpt,
      content: blog.content,
      author: blog.author,
      date: blog.date,
      readTime: blog.readTime,
      category: blog.category,
      image: blog.image,
      featured: blog.featured || false,
    });
    setIsFormOpen(true);
  };

  const resetForm = () => {
    setFormData({
      title: "",
      slug: "",
      excerpt: "",
      content: "",
      author: "",
      date: new Date().toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" }),
      readTime: "",
      category: "",
      image: "",
      featured: false,
    });
  };

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-neutral-200 p-6">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-bold text-neutral-800">Manage Blogs</h2>
        <Button onClick={() => { setIsFormOpen(true); setEditingId(null); resetForm(); }}>
          <Plus className="w-4 h-4 mr-2" /> Add Blog
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
              <h3 className="font-bold text-lg mb-4">{editingId ? "Edit Blog" : "Create New Blog"}</h3>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <Input placeholder="Blog Title" name="title" value={formData.title} onChange={handleInputChange} required />
                  <Input placeholder="Slug (e.g. my-first-blog)" name="slug" value={formData.slug} onChange={handleInputChange} required />
                  <Input placeholder="Category" name="category" value={formData.category} onChange={handleInputChange} required />
                  <Input placeholder="Author Name" name="author" value={formData.author} onChange={handleInputChange} required />
                  <Input type="date" placeholder="Date" name="date" value={formData.date} onChange={handleInputChange} required />
                  <Input placeholder="Read Time (e.g. 5 min read)" name="readTime" value={formData.readTime} onChange={handleInputChange} required />
                  
                  <div className="md:col-span-2 space-y-2">
                    <label className="text-sm font-medium text-neutral-700">Cover Image</label>
                    <ImageUpload 
                      value={formData.image} 
                      onChange={(url) => setFormData(prev => ({ ...prev, image: url }))} 
                      multiple={false} 
                    />
                  </div>
                  
                  <textarea 
                    placeholder="Short Excerpt" 
                    name="excerpt" 
                    value={formData.excerpt} 
                    onChange={handleInputChange} 
                    required 
                    className="flex min-h-[80px] w-full rounded-md border border-input bg-transparent px-3 py-2 text-sm shadow-sm md:col-span-2"
                  />
                  <textarea 
                    placeholder="HTML Content" 
                    name="content" 
                    value={formData.content} 
                    onChange={handleInputChange} 
                    required 
                    className="flex min-h-[200px] w-full rounded-md border border-input bg-transparent px-3 py-2 text-sm shadow-sm md:col-span-2 font-mono"
                  />
                  <div className="flex items-center space-x-2 md:col-span-2">
                    <input type="checkbox" id="featured" name="featured" checked={formData.featured} onChange={handleCheckboxChange} className="rounded border-gray-300" />
                    <label htmlFor="featured" className="text-sm font-medium">Featured Post</label>
                  </div>
                </div>
                <Button type="submit" disabled={loading} className="w-full md:w-auto">
                  {loading ? <Loader2 className="w-4 h-4 mr-2 animate-spin" /> : null}
                  {editingId ? "Update Blog" : "Publish Blog"}
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
              <th className="p-4 font-medium">Post</th>
              <th className="p-4 font-medium">Category</th>
              <th className="p-4 font-medium">Date</th>
              <th className="p-4 font-medium text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="text-sm">
            {blogs.length === 0 ? (
              <tr><td colSpan={4} className="p-8 text-center text-neutral-500">No blogs found.</td></tr>
            ) : (
              blogs.map((blog) => (
                <tr key={blog.id} className="border-b border-neutral-100 hover:bg-neutral-50">
                  <td className="p-4">
                    <div className="font-bold text-neutral-800 flex items-center gap-2">
                      {blog.title}
                      {blog.featured && <span className="bg-yellow-100 text-yellow-800 text-[10px] px-2 py-0.5 rounded-full">Featured</span>}
                    </div>
                    <div className="text-neutral-500 text-xs">/{blog.slug}</div>
                  </td>
                  <td className="p-4 text-neutral-600">{blog.category}</td>
                  <td className="p-4 text-neutral-600">{blog.date}</td>
                  <td className="p-4 text-right">
                    <Button variant="ghost" size="icon" onClick={() => handleEdit(blog)}>
                      <Pencil className="w-4 h-4 text-blue-600" />
                    </Button>
                    <Button variant="ghost" size="icon" onClick={() => handleDelete(blog.id!)}>
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
