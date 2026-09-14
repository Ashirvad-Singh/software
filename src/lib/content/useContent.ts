import { useEffect, useState } from "react";
import { collection, getDocs, query, where } from "firebase/firestore";
import { db } from "@/lib/firebase";
import { normalizeEntry, sortEntries, type ContentEntry, type ContentKind } from "./model";
export function useContent(kind: ContentKind) {
  const [entries, setEntries] = useState<ContentEntry[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [attempt, setAttempt] = useState(0);
  useEffect(() => {
    let active = true;
    setLoading(true); setError(false); setEntries([]);
    getDocs(query(collection(db, kind), where("status", "==", "published")))
      .then(snapshot => { if (active) setEntries(sortEntries(snapshot.docs.map(doc => normalizeEntry(doc.id, doc.data())))); })
      .catch(() => { if (active) setError(true); })
      .finally(() => { if (active) setLoading(false); });
    return () => { active = false; };
  }, [kind, attempt]);
  return { entries, loading, error, retry: () => setAttempt(n => n + 1) };
}
