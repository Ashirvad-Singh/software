import { useState, useEffect } from "react";
import {
  collection,
  addDoc,
  getDocs,
  updateDoc,
  deleteDoc,
  doc,
  query,
  orderBy,
} from "firebase/firestore";
import { db } from "@/lib/firebase";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";
import { Loader2, Plus, Pencil, Trash2, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

import * as TablerIcons from "@tabler/icons-react";
import * as LucideIcons from "lucide-react";

export interface TechTechnology {
  name: string;
  iconUrl: string;
  iconType: "library" | "custom";
}

export interface TechCategory {
  id?: string;
  title: string;
  description: string;
  categoryIcon: string; // from lucide-react
  themeColor: "blue" | "purple" | "orange" | "green" | "gray";
  technologies: TechTechnology[];
  createdAt: number;
}

const COMMON_ICONS = [
  "IconBrandReact",
  "IconBrandNextjs",
  "IconBrandVue",
  "IconBrandAngular",
  "IconBrandSvelte",
  "IconBrandTailwind",
  "IconBrandTypescript",
  "IconBrandJavascript",
  "IconBrandHtml5",
  "IconBrandCss3",
  "IconBrandNodejs",
  "IconBrandPython",
  "IconBrandPhp",
  "IconBrandLaravel",
  "IconBrandDjango",
  "IconBrandFlutter",
  "IconBrandSwift",
  "IconBrandKotlin",
  "IconBrandAws",
  "IconBrandDocker",
  "IconBrandFirebase",
  "IconBrandSupabase",
  "IconBrandMongodb",
  "IconBrandMysql",
  "IconBrandPrisma",
  "IconBrandWordpress",
  "IconBrandWix",
  "IconBrandWebflow",
  "IconBrandFigma",
  "IconBrandGithub",
  "IconBrandGitlab",
  "IconBrandVercel",
  "IconBrandStripe",
  "IconBrandGraphql",
];

const CATEGORY_ICONS = [
  "Code",
  "Smartphone",
  "Layout",
  "ShoppingCart",
  "Database",
  "Server",
  "Globe",
  "Cloud",
];

const THEME_COLORS = [
  { label: "Blue", value: "blue" },
  { label: "Purple", value: "purple" },
  { label: "Orange", value: "orange" },
  { label: "Green", value: "green" },
  { label: "Gray", value: "gray" },
];

const STARTER_TECH_STACK: Omit<TechCategory, "id" | "createdAt">[] = [
  {
    title: "eCommerce Development",
    description:
      "We build scalable online stores, marketplaces, payment systems, and custom commerce solutions that help businesses sell globally.",
    categoryIcon: "ShoppingCart",
    themeColor: "blue",
    technologies: [
      {
        name: "Shopify Development",
        iconUrl: "https://cdn.simpleicons.org/shopify",
        iconType: "custom",
      },
      {
        name: "WooCommerce Development",
        iconUrl: "https://cdn.simpleicons.org/woocommerce",
        iconType: "custom",
      },
      {
        name: "Magento Development",
        iconUrl: "https://cdn.simpleicons.org/magento",
        iconType: "custom",
      },
      {
        name: "Adobe Commerce",
        iconUrl: "https://cdn.simpleicons.org/adobecommerce",
        iconType: "custom",
      },
      {
        name: "Drupal Commerce",
        iconUrl: "https://cdn.simpleicons.org/drupal",
        iconType: "custom",
      },
      {
        name: "Moodle",
        iconUrl: "https://cdn.simpleicons.org/moodle",
        iconType: "custom",
      },
    ],
  },
  {
    title: "Frontend Development",
    description:
      "Modern, fast, and responsive web interfaces built with reliable frontend technologies.",
    categoryIcon: "Code",
    themeColor: "green",
    technologies: [
      { name: "React.js", iconUrl: "IconBrandReact", iconType: "library" },
      { name: "Next.js", iconUrl: "IconBrandNextjs", iconType: "library" },
      { name: "Vue.js", iconUrl: "IconBrandVue", iconType: "library" },
      { name: "Angular", iconUrl: "IconBrandAngular", iconType: "library" },
      {
        name: "TypeScript",
        iconUrl: "IconBrandTypescript",
        iconType: "library",
      },
      {
        name: "Tailwind CSS",
        iconUrl: "IconBrandTailwind",
        iconType: "library",
      },
    ],
  },
  {
    title: "Backend Development",
    description:
      "Secure and scalable backend systems, APIs, databases, and integrations for growing businesses.",
    categoryIcon: "Server",
    themeColor: "orange",
    technologies: [
      { name: "Node.js", iconUrl: "IconBrandNodejs", iconType: "library" },
      { name: "PHP", iconUrl: "IconBrandPhp", iconType: "library" },
      { name: "Laravel", iconUrl: "IconBrandLaravel", iconType: "library" },
      { name: "Python", iconUrl: "IconBrandPython", iconType: "library" },
      { name: "MySQL", iconUrl: "IconBrandMysql", iconType: "library" },
      { name: "MongoDB", iconUrl: "IconBrandMongodb", iconType: "library" },
    ],
  },
  {
    title: "Cloud & DevOps",
    description:
      "Reliable cloud infrastructure, deployment automation, monitoring, and scalable application hosting.",
    categoryIcon: "Cloud",
    themeColor: "purple",
    technologies: [
      { name: "AWS", iconUrl: "IconBrandAws", iconType: "library" },
      { name: "Firebase", iconUrl: "IconBrandFirebase", iconType: "library" },
      { name: "Docker", iconUrl: "IconBrandDocker", iconType: "library" },
      { name: "GitHub", iconUrl: "IconBrandGithub", iconType: "library" },
      { name: "Vercel", iconUrl: "IconBrandVercel", iconType: "library" },
      { name: "Supabase", iconUrl: "IconBrandSupabase", iconType: "library" },
    ],
  },
  {
    title: "Mobile App Development",
    description:
      "High-performance mobile applications for iOS, Android, and cross-platform business experiences.",
    categoryIcon: "Smartphone",
    themeColor: "blue",
    technologies: [
      { name: "React Native", iconUrl: "IconBrandReact", iconType: "library" },
      { name: "Flutter", iconUrl: "IconBrandFlutter", iconType: "library" },
      { name: "Swift", iconUrl: "IconBrandSwift", iconType: "library" },
      { name: "Kotlin", iconUrl: "IconBrandKotlin", iconType: "library" },
    ],
  },
];

export default function TechStackTab() {
  const [techStack, setTechStack] = useState<TechCategory[]>([]);
  const [loading, setLoading] = useState(false);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);

  const [formData, setFormData] = useState<
    Omit<TechCategory, "id" | "createdAt">
  >({
    title: "",
    description: "",
    categoryIcon: "Code",
    themeColor: "blue",
    technologies: [],
  });

  const fetchTechStack = async () => {
    setLoading(true);
    try {
      const q = query(
        collection(db, "tech_stack"),
        orderBy("createdAt", "desc"),
      );
      const snapshot = await getDocs(q);
      const data = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      })) as TechCategory[];
      setTechStack(data);
    } catch (error) {
      console.error(error);
      toast.error("Failed to fetch tech stack");
    } finally {
      setLoading(false);
    }
  };

  const addStarterTechStack = async () => {
    setLoading(true);
    try {
      const existingTitles = new Set(
        techStack.map((category) => category.title),
      );
      const categoriesToAdd = STARTER_TECH_STACK.filter(
        (category) => !existingTitles.has(category.title),
      );

      await Promise.all(
        categoriesToAdd.map((category, index) =>
          addDoc(collection(db, "tech_stack"), {
            ...category,
            createdAt: Date.now() + index,
          }),
        ),
      );

      toast.success(
        categoriesToAdd.length > 0
          ? `${categoriesToAdd.length} technology categories added`
          : "Starter technology content is already added",
      );
      await fetchTechStack();
    } catch (error) {
      console.error(error);
      toast.error("Failed to add starter technology content");
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTechStack();
  }, []);

  const handleInputChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >,
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleTechChange = (
    index: number,
    field: keyof TechTechnology,
    value: any,
  ) => {
    setFormData((prev) => {
      const newTech = [...prev.technologies];
      newTech[index] = { ...newTech[index], [field]: value };
      if (field === "iconType") {
        newTech[index].iconUrl = value === "library" ? "IconBrandReact" : "";
      }
      return { ...prev, technologies: newTech };
    });
  };

  const addTech = () => {
    setFormData((prev) => ({
      ...prev,
      technologies: [
        ...prev.technologies,
        { name: "", iconUrl: "IconBrandReact", iconType: "library" },
      ],
    }));
  };

  const removeTech = (index: number) => {
    setFormData((prev) => ({
      ...prev,
      technologies: prev.technologies.filter((_, i) => i !== index),
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      if (editingId) {
        await updateDoc(doc(db, "tech_stack", editingId), { ...formData });
        toast.success("Tech stack category updated");
      } else {
        await addDoc(collection(db, "tech_stack"), {
          ...formData,
          createdAt: Date.now(),
        });
        toast.success("Tech stack category added");
      }
      setIsFormOpen(false);
      setEditingId(null);
      resetForm();
      fetchTechStack();
    } catch (error) {
      console.error(error);
      toast.error("Failed to save tech stack category");
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this category?")) return;
    try {
      await deleteDoc(doc(db, "tech_stack", id));
      toast.success("Category deleted");
      fetchTechStack();
    } catch (error) {
      console.error(error);
      toast.error("Failed to delete category");
    }
  };

  const handleEdit = (category: TechCategory) => {
    setEditingId(category.id!);
    setFormData({
      title: category.title || "",
      description: category.description || "",
      categoryIcon: category.categoryIcon || "Code",
      themeColor: category.themeColor || "blue",
      technologies: category.technologies || [],
    });
    setIsFormOpen(true);
  };

  const resetForm = () => {
    setFormData({
      title: "",
      description: "",
      categoryIcon: "Code",
      themeColor: "blue",
      technologies: [],
    });
  };

  const renderIcon = (iconValue: string) => {
    if (!iconValue)
      return <div className="w-8 h-8 bg-neutral-200 rounded-md" />;
    if (iconValue.startsWith("http") || iconValue.startsWith("data:")) {
      return (
        <img src={iconValue} alt="icon" className="w-8 h-8 object-contain" />
      );
    }
    const IconComponent = (TablerIcons as any)[iconValue];
    if (IconComponent) {
      return (
        <IconComponent className="w-8 h-8 text-neutral-700" stroke={1.5} />
      );
    }
    return <div className="w-8 h-8 bg-neutral-200 rounded-md" />;
  };

  const renderCategoryIcon = (iconName: string) => {
    const IconComponent = (LucideIcons as any)[iconName];
    if (IconComponent) {
      return <IconComponent className="w-6 h-6 text-neutral-700" />;
    }
    return <LucideIcons.Code className="w-6 h-6 text-neutral-700" />;
  };

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-neutral-200 p-6">
      <div className="flex flex-wrap justify-between items-center gap-3 mb-6">
        <h2 className="text-xl font-bold text-neutral-800">
          Manage Tech Stack Categories
        </h2>
        <div className="flex flex-wrap gap-2">
          <Button
            variant="outline"
            onClick={addStarterTechStack}
            disabled={loading}
          >
            Add Starter Content
          </Button>
          <Button
            onClick={() => {
              setIsFormOpen(true);
              setEditingId(null);
              resetForm();
            }}
          >
            <Plus className="w-4 h-4 mr-2" /> Add Category
          </Button>
        </div>
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
              <h3 className="font-bold text-lg mb-4">
                {editingId ? "Edit Category" : "Add Category"}
              </h3>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <label className="text-sm font-medium">
                      Category Title
                    </label>
                    <Input
                      placeholder="e.g. Frontend Architecture"
                      name="title"
                      value={formData.title}
                      onChange={handleInputChange}
                      required
                    />
                  </div>

                  <div className="space-y-2">
                    <label className="text-sm font-medium">Theme Color</label>
                    <select
                      name="themeColor"
                      value={formData.themeColor}
                      onChange={handleInputChange}
                      className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                    >
                      {THEME_COLORS.map((c) => (
                        <option key={c.value} value={c.value}>
                          {c.label}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div className="space-y-2">
                    <label className="text-sm font-medium">
                      Category Icon (Lucide)
                    </label>
                    <select
                      name="categoryIcon"
                      value={formData.categoryIcon}
                      onChange={handleInputChange}
                      className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                    >
                      {CATEGORY_ICONS.map((i) => (
                        <option key={i} value={i}>
                          {i}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div className="md:col-span-2 space-y-2">
                    <label className="text-sm font-medium">Description</label>
                    <textarea
                      placeholder="e.g. Crafting lightning-fast, reactive..."
                      name="description"
                      value={formData.description}
                      onChange={handleInputChange}
                      className="flex min-h-[80px] w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                      required
                    />
                  </div>
                </div>

                <div className="border-t border-neutral-200 pt-6">
                  <div className="flex justify-between items-center mb-4">
                    <h4 className="font-bold">Technologies in this Category</h4>
                    <Button
                      type="button"
                      variant="outline"
                      size="sm"
                      onClick={addTech}
                    >
                      <Plus className="w-4 h-4 mr-2" /> Add Tech
                    </Button>
                  </div>

                  <div className="space-y-4">
                    {formData.technologies.map((tech, index) => (
                      <div
                        key={index}
                        className="flex flex-wrap items-start gap-4 p-4 border rounded-md bg-white relative"
                      >
                        <Button
                          type="button"
                          variant="ghost"
                          size="icon"
                          className="absolute top-2 right-2 text-red-500 hover:text-red-700"
                          onClick={() => removeTech(index)}
                        >
                          <Trash2 className="w-4 h-4" />
                        </Button>
                        <div className="w-full md:w-1/3 space-y-2">
                          <label className="text-sm font-medium">
                            Tech Name
                          </label>
                          <Input
                            placeholder="e.g. React"
                            value={tech.name}
                            onChange={(e) =>
                              handleTechChange(index, "name", e.target.value)
                            }
                            required
                          />
                        </div>
                        <div className="w-full md:w-1/2 space-y-2">
                          <label className="text-sm font-medium block">
                            Icon Type
                          </label>
                          <div className="flex gap-4 mb-2">
                            <label className="flex items-center gap-2 text-sm cursor-pointer">
                              <input
                                type="radio"
                                checked={tech.iconType === "library"}
                                onChange={() =>
                                  handleTechChange(index, "iconType", "library")
                                }
                              />
                              Tabler Icons
                            </label>
                            <label className="flex items-center gap-2 text-sm cursor-pointer">
                              <input
                                type="radio"
                                checked={tech.iconType === "custom"}
                                onChange={() =>
                                  handleTechChange(index, "iconType", "custom")
                                }
                              />
                              URL
                            </label>
                          </div>
                          {tech.iconType === "library" ? (
                            <div className="flex gap-4 items-center">
                              <select
                                value={tech.iconUrl}
                                onChange={(e) =>
                                  handleTechChange(
                                    index,
                                    "iconUrl",
                                    e.target.value,
                                  )
                                }
                                className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                              >
                                {COMMON_ICONS.map((icon) => (
                                  <option key={icon} value={icon}>
                                    {icon.replace("IconBrand", "")}
                                  </option>
                                ))}
                              </select>
                              <div className="p-2 border rounded-md bg-white">
                                {renderIcon(tech.iconUrl)}
                              </div>
                            </div>
                          ) : (
                            <Input
                              placeholder="Icon URL (SVG/PNG)"
                              value={tech.iconUrl}
                              onChange={(e) =>
                                handleTechChange(
                                  index,
                                  "iconUrl",
                                  e.target.value,
                                )
                              }
                              required
                            />
                          )}
                        </div>
                      </div>
                    ))}
                    {formData.technologies.length === 0 && (
                      <div className="text-center p-4 text-neutral-500 border rounded-md border-dashed">
                        No technologies added yet. Click "Add Tech" to start.
                      </div>
                    )}
                  </div>
                </div>

                <div className="pt-4">
                  <Button
                    type="submit"
                    disabled={loading}
                    className="w-full md:w-auto"
                  >
                    {loading ? (
                      <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                    ) : null}
                    {editingId ? "Update Category" : "Save Category"}
                  </Button>
                </div>
              </form>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-neutral-50 border-b border-neutral-200 text-sm text-neutral-500">
              <th className="p-4 font-medium w-16">Icon</th>
              <th className="p-4 font-medium">Category Title</th>
              <th className="p-4 font-medium">Technologies</th>
              <th className="p-4 font-medium text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="text-sm">
            {techStack.length === 0 ? (
              <tr>
                <td colSpan={4} className="p-8 text-center text-neutral-500">
                  No tech stack categories found.
                </td>
              </tr>
            ) : (
              techStack.map((cat) => (
                <tr
                  key={cat.id}
                  className="border-b border-neutral-100 hover:bg-neutral-50"
                >
                  <td className="p-4">
                    {renderCategoryIcon(cat.categoryIcon || "Code")}
                  </td>
                  <td className="p-4 font-medium text-neutral-800">
                    {cat.title}
                    <span className="block text-xs text-neutral-500 font-normal mt-1 capitalize">
                      {cat.themeColor} Theme
                    </span>
                  </td>
                  <td className="p-4 text-neutral-600">
                    <div className="flex flex-wrap gap-2">
                      {cat.technologies?.map((t, i) => (
                        <span
                          key={i}
                          className="inline-flex items-center gap-1 bg-white border px-2 py-1 rounded-md text-xs font-medium"
                        >
                          <span className="scale-75 origin-left inline-block">
                            {renderIcon(t.iconUrl)}
                          </span>
                          {t.name}
                        </span>
                      ))}
                    </div>
                  </td>
                  <td className="p-4 text-right flex items-center justify-end gap-2">
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => handleEdit(cat)}
                    >
                      <Pencil className="w-4 h-4 text-blue-600" />
                    </Button>
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => handleDelete(cat.id!)}
                    >
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
