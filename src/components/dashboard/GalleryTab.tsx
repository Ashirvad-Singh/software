import { useState, useEffect } from "react";
import { collection, writeBatch, getDocs, doc, query, orderBy } from "firebase/firestore";
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
  const [selected, setSelected] = useState<Set<string>>(new Set());
  const [deleting, setDeleting] = useState(false);
  const [loading, setLoading] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [saving, setSaving] = useState(false);
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
      setSelected(current => new Set([...current].filter(id => data.some(image => image.id === id))));
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
    if (uploading || saving) return;
    const urls = [...new Set(formData.imageUrl.split("\n").map(url => url.trim()).filter(Boolean))];
    if (!urls.length) { toast.error("Upload at least one image first."); return; }
    if (urls.length > 450) { toast.error("Please save up to 450 images at a time."); return; }
    setSaving(true);
    try {
      const batch = writeBatch(db);
      const createdAt = Date.now();
      urls.forEach((imageUrl, index) => {
        batch.set(doc(collection(db, "gallery")), {
          imageUrl,
          title: urls.length > 1 ? `${formData.title.trim()} ${index + 1}` : formData.title.trim(),
          category: formData.category.trim(),
          description: formData.description.trim(),
          createdAt: createdAt + index,
        });
      });
      await batch.commit();
      toast.success(`${urls.length} image${urls.length === 1 ? "" : "s"} added successfully`);
      setIsFormOpen(false);
      setFormData({ imageUrl: "", title: "", category: "", description: "" });
      fetchImages();
    } catch (error) {
      console.error(error);
      toast.error("Could not save images. Your uploaded images are still here; please try again.");
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async (ids: string[]) => {
    if (deleting || !ids.length) return;
    if (!confirm(`Delete ${ids.length} selected image${ids.length === 1 ? "" : "s"} from the gallery? This cannot be undone.`)) return;
    setDeleting(true);
    let deleted = 0;
    try {
      for (let offset = 0; offset < ids.length; offset += 450) {
        const chunk = ids.slice(offset, offset + 450);
        const batch = writeBatch(db);
        chunk.forEach(id => batch.delete(doc(db, "gallery", id)));
        await batch.commit();
        deleted += chunk.length;
        setImages(current => current.filter(image => !chunk.includes(image.id!)));
        setSelected(current => new Set([...current].filter(id => !chunk.includes(id))));
      }
      toast.success(`${deleted} image${deleted === 1 ? "" : "s"} deleted successfully`);
    } catch (error) {
      console.error(error);
      toast.error(deleted ? `${deleted} images deleted. Remaining images could not be deleted; please retry.` : "Could not delete images. Please try again.");
    } finally {
      setDeleting(false);
    }
  };

  const toggleImage = (id: string) => setSelected(current => {
    const next = new Set(current);
    if (next.has(id)) next.delete(id); else next.add(id);
    return next;
  });

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-neutral-200 p-6">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-bold text-neutral-800">Manage Gallery</h2>
        <Button onClick={() => setIsFormOpen(true)}>
          <Plus className="w-4 h-4 mr-2" /> Add Images
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
                disabled={uploading || saving}
                onClick={() => setIsFormOpen(false)}
                className="absolute top-4 right-4 text-neutral-500 hover:text-black"
              >
                <X className="w-5 h-5" />
              </button>
              <h3 className="font-bold text-lg mb-4">Add Images to Gallery</h3>
              <form onSubmit={handleSubmit} className="space-y-4">
                <fieldset disabled={saving} className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <Input placeholder="Image Title" name="title" value={formData.title} onChange={handleInputChange} required />
                  <Input placeholder="Category" name="category" value={formData.category} onChange={handleInputChange} required />
                  
                  <div className="md:col-span-2 space-y-2">
                    <label className="text-sm font-medium text-neutral-700">Images</label>
                    <p className="text-sm text-neutral-500">Select multiple images together. The category and description apply to all images; titles are numbered automatically.</p>
                    <ImageUpload 
                      value={formData.imageUrl} 
                      onChange={(url) => setFormData(prev => ({ ...prev, imageUrl: url }))} 
                      multiple
                      onUploadingChange={setUploading}
                    />
                  </div>
                  
                  <textarea 
                    placeholder="Short Description (Optional)" 
                    name="description" 
                    value={formData.description} 
                    onChange={handleInputChange} 
                    className="flex min-h-[80px] w-full rounded-md border border-input bg-transparent px-3 py-2 text-sm shadow-sm md:col-span-2"
                  />
                </fieldset>
                <Button type="submit" disabled={saving || uploading || !formData.imageUrl.trim()} className="w-full md:w-auto">
                  {saving || uploading ? <Loader2 className="w-4 h-4 mr-2 animate-spin" /> : null}
                  {uploading ? "Uploading images…" : saving ? "Saving…" : `Add ${formData.imageUrl.split("\n").filter(Boolean).length || ""} Images`}
                </Button>
              </form>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {images.length > 0 && <div className="mb-4 flex flex-wrap items-center gap-4 rounded-lg border border-neutral-200 bg-neutral-50 p-3">
        <label className="flex items-center gap-2 text-sm font-medium">
          <input type="checkbox" checked={selected.size === images.length} disabled={deleting || loading || saving}
            onChange={event => setSelected(event.target.checked ? new Set(images.map(image => image.id!)) : new Set())}
            className="h-4 w-4 accent-blue-600" />
          Select all
        </label>
        <span role="status" className="text-sm text-neutral-600">{selected.size} selected</span>
        {selected.size > 0 && <button type="button" disabled={deleting} onClick={() => setSelected(new Set())} className="text-sm text-blue-600">Clear selection</button>}
        <Button type="button" variant="destructive" disabled={!selected.size || deleting || saving || loading} onClick={() => handleDelete([...selected])} className="sm:ml-auto">
          {deleting ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <Trash2 className="mr-2 h-4 w-4" />}
          {deleting ? "Deleting…" : "Delete selected"}
        </Button>
      </div>}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {images.length === 0 ? (
          <div className="col-span-full p-8 text-center text-neutral-500 border rounded-lg bg-neutral-50">{loading ? "Loading gallery…" : "No images in the gallery."}</div>
        ) : (
          images.map((img) => (
            <div key={img.id} className={`relative group aspect-square rounded-lg overflow-hidden border ${selected.has(img.id!) ? "border-blue-500 ring-2 ring-blue-500" : "border-neutral-200"}`}>
              <label className="absolute left-2 top-2 z-10 flex h-9 w-9 cursor-pointer items-center justify-center rounded-md bg-white/95 shadow-sm">
                <input type="checkbox" aria-label={`Select ${img.title}`} checked={selected.has(img.id!)} disabled={deleting || loading || saving} onChange={() => toggleImage(img.id!)} className="h-5 w-5 accent-blue-600" />
              </label>
              <img src={img.imageUrl} alt={img.title} className="w-full h-full object-cover" />
              <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-4">
                <Button variant="destructive" size="icon" disabled={deleting || saving || loading} aria-label={`Delete ${img.title}`} onClick={() => handleDelete([img.id!])}>
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
