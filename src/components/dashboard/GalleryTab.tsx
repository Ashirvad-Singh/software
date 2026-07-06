import { useState, useEffect } from "react";
import { collection, addDoc, getDocs, deleteDoc, doc, query, orderBy } from "firebase/firestore";
import { db } from "@/lib/firebase";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";
import { Loader2, Plus, Trash2, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { ImageUpload } from "@/components/ui/image-upload";

export interface GalleryImage {
  id?: string;
  imageUrl: string;
  title: string;
  category: string;
  description: string;
  createdAt: number;
}

export default function GalleryTab() {
  const [images, setImages] = useState<GalleryImage[]>([]);
  const [loading, setLoading] = useState(false);
  const [isFormOpen, setIsFormOpen] = useState(false);

  const [formData, setFormData] = useState({
    imageUrl: "",
    title: "",
    category: "",
    description: "",
  });

  const fetchImages = async () => {
    setLoading(true);
    try {
      const q = query(collection(db, "gallery"), orderBy("createdAt", "desc"));
      const snapshot = await getDocs(q);
      const data = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() })) as GalleryImage[];
      setImages(data);
    } catch (error) {
      console.error(error);
      toast.error("Failed to fetch gallery images");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchImages();
  }, []);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      await addDoc(collection(db, "gallery"), { ...formData, createdAt: Date.now() });
      toast.success("Image added successfully");
      setIsFormOpen(false);
      setFormData({ imageUrl: "", title: "", category: "", description: "" });
      fetchImages();
    } catch (error) {
      console.error(error);
      toast.error("Failed to save image");
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this image?")) return;
    try {
      await deleteDoc(doc(db, "gallery", id));
      toast.success("Image deleted successfully");
      fetchImages();
    } catch (error) {
      console.error(error);
      toast.error("Failed to delete image");
    }
  };

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-neutral-200 p-6">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-bold text-neutral-800">Manage Gallery</h2>
        <Button onClick={() => setIsFormOpen(true)}>
          <Plus className="w-4 h-4 mr-2" /> Add Image
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
              <h3 className="font-bold text-lg mb-4">Add Image to Gallery</h3>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <Input placeholder="Image Title" name="title" value={formData.title} onChange={handleInputChange} required />
                  <Input placeholder="Category" name="category" value={formData.category} onChange={handleInputChange} required />
                  
                  <div className="md:col-span-2 space-y-2">
                    <label className="text-sm font-medium text-neutral-700">Image</label>
                    <ImageUpload 
                      value={formData.imageUrl} 
                      onChange={(url) => setFormData(prev => ({ ...prev, imageUrl: url }))} 
                      multiple={false} 
                    />
                  </div>
                  
                  <textarea 
                    placeholder="Short Description (Optional)" 
                    name="description" 
                    value={formData.description} 
                    onChange={handleInputChange} 
                    className="flex min-h-[80px] w-full rounded-md border border-input bg-transparent px-3 py-2 text-sm shadow-sm md:col-span-2"
                  />
                </div>
                <Button type="submit" disabled={loading} className="w-full md:w-auto">
                  {loading ? <Loader2 className="w-4 h-4 mr-2 animate-spin" /> : null}
                  Add Image
                </Button>
              </form>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {images.length === 0 ? (
          <div className="col-span-full p-8 text-center text-neutral-500 border rounded-lg bg-neutral-50">No images in the gallery.</div>
        ) : (
          images.map((img) => (
            <div key={img.id} className="relative group aspect-square rounded-lg overflow-hidden border border-neutral-200">
              <img src={img.imageUrl} alt={img.title} className="w-full h-full object-cover" />
              <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-4">
                <Button variant="destructive" size="icon" onClick={() => handleDelete(img.id!)}>
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
