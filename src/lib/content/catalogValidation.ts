import { collection, getDocs, query, where } from "firebase/firestore";
import { db } from "@/lib/firebase";
import { slugify } from "./model";

export async function validateCatalogSlug(kind: "services" | "blogs", value: string, editingId: string | null) {
  const slug = slugify(value);
  if (!slug) throw new Error("Enter a valid URL slug.");
  const matches = await getDocs(query(collection(db, kind), where("slug", "==", slug)));
  if (matches.docs.some(record => record.id !== editingId)) throw new Error("This URL slug is already in use. Choose a unique slug.");
  return slug;
}
