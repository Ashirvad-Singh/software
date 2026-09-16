import { useEffect, useState } from "react";
import { collection, getDocs, query, where } from "firebase/firestore";
import { db } from "@/lib/firebase";
import type { ServiceItem } from "@/components/dashboard/ServicesTab";
import type { BlogPost } from "@/components/dashboard/BlogsTab";

type Catalog = { services: ServiceItem; blogs: BlogPost };
export function useCatalog<K extends keyof Catalog>(kind: K, slug?: string) {
  const [entries, setEntries] = useState<(Catalog[K] & { id: string })[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [attempt, setAttempt] = useState(0);
  useEffect(() => {
    let active = true;
    setEntries([]); setLoading(true); setError(false);
    const source = collection(db, kind);
    getDocs(slug === undefined ? source : query(source, where("slug", "==", slug)))
      .then(snapshot => {
        if (!active) return;
        const records = snapshot.docs.map(record => ({ ...record.data(), id: record.id }) as Catalog[K] & { id: string });
        setEntries(records.filter(record => record.title && record.slug).sort((a, b) =>
          kind === "blogs" ? (b.createdAt || 0) - (a.createdAt || 0) : (a.createdAt || 0) - (b.createdAt || 0)));
      })
      .catch(() => { if (active) setError(true); })
      .finally(() => { if (active) setLoading(false); });
    return () => { active = false; };
  }, [kind, slug, attempt]);
  return { entries, loading, error, retry: () => setAttempt(value => value + 1) };
}
