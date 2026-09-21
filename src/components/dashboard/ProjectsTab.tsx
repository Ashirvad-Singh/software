import { useEffect, useState } from "react";
import {
  collection,
  getDocs,
  doc,
  runTransaction,
  updateDoc,
} from "firebase/firestore";
import { db } from "@/lib/firebase";
import { Button } from "@/components/ui/button";
import { ImageUpload } from "@/components/ui/image-upload";
import { toast } from "sonner";
import {
  normalizeEntry,
  emptyClientReview,
  validateClientReview,
  slugify,
  safeUrl,
  listValue,
  type ContentKind,
  type ContentEntry,
} from "@/lib/content/model";

type Field = {
  key: string;
  label: string;
  multiline?: boolean;
  required?: boolean;
  hint?: string;
};
const commonFields: Field[] = [
  { key: "title", label: "Title", required: true },
  { key: "category", label: "Category", required: true },
  { key: "industry", label: "Industry" },
  { key: "client", label: "Client / company name" },
  {
    key: "description",
    label: "Short description",
    multiline: true,
    required: true,
  },
  { key: "services", label: "Services provided", hint: "Separate with commas" },
  { key: "technologies", label: "Technologies", hint: "Separate with commas" },
  { key: "timeline", label: "Duration / project timeline", multiline: true },
];
const storyFields: Field[] = [
  {
    key: "overview",
    label: "Project overview",
    multiline: true,
    required: true,
  },
  { key: "background", label: "Client / business background", multiline: true },
  {
    key: "challenge",
    label: "Challenge / problem",
    multiline: true,
    required: true,
  },
  { key: "goals", label: "Goals / objectives", multiline: true },
  { key: "approach", label: "Our approach", multiline: true },
  { key: "solution", label: "Solution", multiline: true, required: true },
  {
    key: "process",
    label: "Development / implementation process",
    multiline: true,
  },
  {
    key: "features",
    label: "Key features",
    multiline: true,
    hint: "One feature per line",
  },
  {
    key: "tools",
    label: "Technologies & tools — how they were used",
    multiline: true,
  },
  {
    key: "outcomes",
    label: "Results / outcomes",
    multiline: true,
    required: true,
  },
  {
    key: "metrics",
    label: "Metrics / KPIs",
    multiline: true,
    hint: "Optional. One per line: value|label. Example: 25%|Reduction in checkout time",
  },
  {
    key: "measurementNotes",
    label: "Measurement context",
    multiline: true,
    hint: "Source, baseline, and measurement period for the reported results",
  },
  {
    key: "testimonial",
    label: "Client testimonial (optional)",
    multiline: true,
  },
  { key: "testimonialAuthor", label: "Testimonial author / role" },
  { key: "ctaTitle", label: "CTA heading" },
  { key: "ctaLabel", label: "CTA button text (links to Contact)" },
];
const seoFields: Field[] = [
  { key: "seoTitle", label: "SEO title" },
  { key: "seoDescription", label: "SEO description", multiline: true },
  { key: "seoKeywords", label: "SEO keywords" },
];
const emptyForm = () =>
  Object.fromEntries(
    [
      ...commonFields,
      ...storyFields,
      ...seoFields,
      ...["slug", "image", "gallery", "liveUrl", "projectId"].map((key) => ({
        key,
      })),
    ].map((f) => [f.key, ""]),
  );
export default function ProjectsTab({
  collectionName = "projects",
  heading,
}: {
  collectionName?: ContentKind;
  heading?: string;
}) {
  const story = collectionName === "case_studies";
  const label = story ? "Case Study" : "Project";
  const [entries, setEntries] = useState<ContentEntry[]>([]);
  const [projects, setProjects] = useState<ContentEntry[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [saving, setSaving] = useState(false);
  const [open, setOpen] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [form, setForm] = useState<Record<string, string>>(emptyForm);
  const [reviewUploading, setReviewUploading] = useState(false);
  const [clientReview, setClientReview] = useState(emptyClientReview);
  const [status, setStatus] = useState("draft");
  const [featured, setFeatured] = useState(false);
  const [search, setSearch] = useState("");
  const [revision, setRevision] = useState(0);
  useEffect(() => {
    let active = true;
    setLoading(true);
    setError(false);
    Promise.all([
      getDocs(collection(db, collectionName)),
      story ? getDocs(collection(db, "projects")) : Promise.resolve(null),
    ])
      .then(([snapshot, projectSnapshot]) => {
        if (!active) return;
        setEntries(
          snapshot.docs
            .map((d) => normalizeEntry(d.id, d.data()))
            .sort((a, b) => b.createdAt - a.createdAt),
        );
        setProjects(
          projectSnapshot?.docs.map((d) => normalizeEntry(d.id, d.data())) ||
            [],
        );
      })
      .catch(() => {
        if (active) setError(true);
      })
      .finally(() => {
        if (active) setLoading(false);
      });
    return () => {
      active = false;
    };
  }, [collectionName, story, revision]);
  const change = (key: string, value: string) =>
    setForm((prev) => ({
      ...prev,
      [key]: value,
      ...(key === "title" && (!prev.slug || prev.slug === slugify(prev.title))
        ? { slug: slugify(value) }
        : {}),
    }));
  function edit(entry?: ContentEntry, copy = false) {
    setClientReview(copy ? emptyClientReview() : { ...(entry?.clientReview || emptyClientReview()) });
    setEditingId(copy ? null : entry?.id || null);
    setStatus(copy ? "draft" : entry?.status || "draft");
    setFeatured(copy ? false : entry?.featured || false);
    const next = emptyForm();
    if (entry)
      for (const key of Object.keys(next)) {
        const value = entry[key as keyof ContentEntry];
        next[key] =
          key === "metrics"
            ? entry.metrics.map((m) => `${m.value}|${m.label}`).join("\n")
            : Array.isArray(value)
              ? value.join(["gallery", "features"].includes(key) ? "\n" : ", ")
              : typeof value === "string"
                ? value
                : "";
      }
    if (copy && entry) {
      let suffix = 1;
      let title = `${entry.title} (Copy)`;
      while (entries.some((item) => item.slug === slugify(title))) {
        suffix += 1;
        title = `${entry.title} (Copy ${suffix})`;
      }
      next.title = title;
      next.slug = slugify(title);
      toast.success("Copy ready. Edit the details and save as a new draft.");
    }
    setForm(next);
    setOpen(true);
  }
  async function save(e: React.FormEvent) {
    e.preventDefault();
    if (reviewUploading) { toast.error("Wait for the client photo upload to finish."); return; }
    const reviewError = !story && validateClientReview(clientReview);
    if (reviewError) { toast.error(reviewError); return; }
    const slug = slugify(form.slug);
    if (!slug || !form.title.trim()) {
      toast.error("A title and valid slug are required.");
      return;
    }
    if (status === "published") {
      const required = [...commonFields, ...(story ? storyFields : [])].filter(
        (f) => f.required,
      );
      if (required.some((f) => !form[f.key]?.trim()) || !form.image.trim()) {
        toast.error(
          "Complete the required fields and cover image before publishing.",
        );
        return;
      }
    }
    if (form.liveUrl && !safeUrl(form.liveUrl)) {
      toast.error("Live URL must start with https:// or http://.");
      return;
    }
    const images = [form.image, ...listValue(form.gallery, /\n/)].filter(
      Boolean,
    );
    if (images.some((url) => !safeUrl(url) && !/^\/(?!\/)/.test(url))) {
      toast.error(
        "Images must use an HTTP(S) URL or a local path starting with /.",
      );
      return;
    }
    if (
      story &&
      listValue(form.metrics, /\n/).some((line) => {
        const [value, ...labels] = line.split("|");
        return !value.trim() || !labels.join("|").trim();
      })
    ) {
      toast.error("Each metric needs a value and label separated by |.");
      return;
    }
    setSaving(true);
    try {
      const snapshot = await getDocs(collection(db, collectionName));
      if (
        snapshot.docs.some((d) => d.id !== editingId && d.data().slug === slug)
      )
        throw new Error("This slug is already in use. Choose another slug.");
      const ref = editingId
        ? doc(db, collectionName, editingId)
        : doc(collection(db, collectionName));
      const allowed = [
        ...commonFields,
        ...seoFields,
        ...(story ? storyFields : [{ key: "liveUrl" }]),
        ...["slug", "image", "gallery", ...(story ? ["projectId"] : [])].map(
          (key) => ({ key }),
        ),
      ];
      const data: Record<string, unknown> = Object.fromEntries(
        allowed.map((f) => [f.key, (form[f.key] || "").trim()]),
      );
      Object.assign(data, {
        slug,
        status,
        featured,
        updatedAt: Date.now(),
        services: listValue(form.services),
        technologies: listValue(form.technologies),
        gallery: listValue(form.gallery, /\n/),
      });
      if (!story) data.clientReview = clientReview;
      if (story) {
        data.features = listValue(form.features, /\n/);
        data.metrics = normalizeEntry("", { metrics: form.metrics }).metrics;
      }
      // Reserve the slug atomically, including for drafts and concurrent editors.
      await runTransaction(db, async (transaction) => {
        const reservation = doc(
          db,
          "content_slugs",
          `${collectionName}--${slug}`,
        );
        const [existing, reserved] = await Promise.all([
          transaction.get(ref),
          transaction.get(reservation),
        ]);
        if (reserved.exists() && reserved.data().entryId !== ref.id)
          throw new Error("This slug is already in use.");
        if (editingId && !existing.exists())
          throw new Error("This entry was deleted. Refresh and try again.");
        const oldSlug = existing.data()?.slug;
        const oldReservation =
          oldSlug && oldSlug !== slug
            ? doc(db, "content_slugs", `${collectionName}--${oldSlug}`)
            : null;
        const old = oldReservation
          ? await transaction.get(oldReservation)
          : null;
        transaction.set(reservation, {
          entryId: ref.id,
          collection: collectionName,
        });
        if (oldReservation && old?.data()?.entryId === ref.id)
          transaction.delete(oldReservation);
        if (!existing.exists()) data.createdAt = Date.now();
        transaction.set(ref, data, { merge: true });
      });
      toast.success(`${label} saved as ${status}.`);
      setOpen(false);
      setRevision((n) => n + 1);
    } catch (err) {
      toast.error(
        err instanceof Error
          ? err.message
          : "Could not save. Please try again.",
      );
    } finally {
      setSaving(false);
    }
  }
  async function remove(entry: ContentEntry) {
    if (!window.confirm(`Delete “${entry.title}”? This cannot be undone.`))
      return;
    setSaving(true);
    try {
      await runTransaction(db, async (transaction) => {
        const ref = doc(db, collectionName, entry.id);
        const current = await transaction.get(ref);
        const slug = current.data()?.slug;
        const reserved = slug
          ? doc(db, "content_slugs", `${collectionName}--${slug}`)
          : null;
        const reservation = reserved ? await transaction.get(reserved) : null;
        if (reserved && reservation?.data()?.entryId === entry.id)
          transaction.delete(reserved);
        transaction.delete(ref);
      });
      toast.success(`${label} deleted.`);
      if (editingId === entry.id) setOpen(false);
      setRevision((n) => n + 1);
    } catch {
      toast.error("Could not delete. Please try again.");
    } finally {
      setSaving(false);
    }
  }
  async function unpublish(entry: ContentEntry) {
    setSaving(true);
    try {
      await updateDoc(doc(db, collectionName, entry.id), {
        status: "draft",
        updatedAt: Date.now(),
      });
      setRevision((n) => n + 1);
      toast.success("Moved to draft.");
    } catch {
      toast.error("Could not unpublish.");
    } finally {
      setSaving(false);
    }
  }
  const fields = (items: Field[]) =>
    items.map((f) => (
      <label
        key={f.key}
        className={`block space-y-2 text-sm font-medium ${f.multiline ? "md:col-span-2" : ""}`}
      >
        <span>
          {f.label}
          {f.required && " *"}
        </span>
        {f.multiline ? (
          <textarea
            rows={4}
            value={form[f.key]}
            onChange={(e) => change(f.key, e.target.value)}
            className="w-full rounded-lg border border-neutral-300 bg-white p-3 font-normal"
          />
        ) : (
          <input
            value={form[f.key]}
            onChange={(e) => change(f.key, e.target.value)}
            className="w-full rounded-lg border border-neutral-300 bg-white p-3 font-normal"
          />
        )}
        {f.hint && (
          <span className="block text-xs font-normal text-neutral-500">
            {f.hint}
          </span>
        )}
      </label>
    ));
  return (
    <div className="rounded-2xl border border-neutral-200 bg-white p-4 text-neutral-900 md:p-6">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <h2 className="text-xl font-bold">
            {heading || `Manage ${story ? "Case Studies" : "Projects"}`}
          </h2>
          <p className="mt-2 text-sm text-neutral-500">
            {story
              ? "Document the problem, your approach, and the outcome."
              : "Showcase the products and platforms you have built."}
          </p>
        </div>
        <Button onClick={() => edit()} disabled={saving}>
          Add {label}
        </Button>
      </div>
      {open && (
        <form
          onSubmit={save}
          className="my-8 space-y-8 rounded-xl border border-neutral-200 bg-neutral-50 p-4 md:p-6"
        >
          <fieldset disabled={saving} className="space-y-8">
            <div className="flex justify-between gap-4">
              <h3 className="text-xl font-semibold">
                {editingId ? "Edit" : "New"} {label}
              </h3>
              <button
                type="button"
                onClick={() => setOpen(false)}
                className="text-sm underline"
              >
                Close editor
              </button>
            </div>
            <p className="text-sm text-neutral-500">
              Drafts can be incomplete. Fields marked * and a cover image are
              required to publish. Existing entries without a status are drafts
              until reviewed.
            </p>
            <div className="grid gap-4 md:grid-cols-2">
              {fields(
                commonFields.map((field) =>
                  field.key === "timeline"
                    ? {
                        ...field,
                        label: story
                          ? "Project timeline"
                          : "Project duration (optional)",
                        hint: story
                          ? "Enter each phase on a new line, for example: Weeks 1–2: Discovery and interface design."
                          : "For example: 8 weeks or January–March 2026.",
                        multiline: story,
                      }
                    : field,
                ),
              )}
              <label className="block space-y-2 text-sm font-medium">
                Slug *
                <div className="flex gap-2">
                  <input
                    required
                    value={form.slug}
                    onChange={(e) => change("slug", e.target.value)}
                    className="min-w-0 flex-1 rounded-lg border border-neutral-300 bg-white p-3"
                  />
                  <button
                    type="button"
                    onClick={() => change("slug", slugify(form.title))}
                    className="text-xs underline"
                  >
                    Generate
                  </button>
                </div>
              </label>
              {!story &&
                fields([
                  {
                    key: "liveUrl",
                    label: "Project URL / Live demo (optional)",
                  },
                ])}
            </div>
            {story && (
              <>
                <label className="block space-y-2 text-sm font-medium">
                  Linked project (optional)
                  <select
                    value={form.projectId}
                    onChange={(e) => change("projectId", e.target.value)}
                    className="block w-full rounded-lg border border-neutral-300 bg-white p-3"
                  >
                    <option value="">No linked project</option>
                    {form.projectId &&
                      !projects.some((p) => p.id === form.projectId) && (
                        <option value={form.projectId}>
                          Previously linked project (unavailable)
                        </option>
                      )}
                    {projects.map((p) => (
                      <option key={p.id} value={p.id}>
                        {p.title} ({p.status})
                      </option>
                    ))}
                  </select>
                </label>
                <div className="grid gap-4 md:grid-cols-2">
                  {fields(storyFields)}
                </div>
              </>
            )}
            {!story && <section className="space-y-4 border-t border-neutral-200 pt-6">
              <h4 className="font-semibold">Client Review / Testimonial</h4>
              <label className="flex items-center gap-2 text-sm"><input type="checkbox" checked={clientReview.enabled} onChange={e => setClientReview({...clientReview, enabled:e.target.checked})} />Enable Client Review</label>
              <div className="grid gap-4 md:grid-cols-2">
                {([['clientName','Client Name'],['clientRole','Client Role'],['clientCompany','Client Company']] as const).map(([key,label]) => <label key={key} className="block space-y-2 text-sm font-medium">{label}<input className="block w-full rounded-lg border bg-white p-3" value={clientReview[key]} onChange={e=>setClientReview({...clientReview,[key]:e.target.value})} /></label>)}
                <label className="block space-y-2 text-sm font-medium">Rating<select className="block w-full rounded-lg border bg-white p-3" value={clientReview.rating} onChange={e=>setClientReview({...clientReview,rating:Number(e.target.value)})}>{[1,2,3,4,5].map(n=><option key={n} value={n}>{n} {n===1?'star':'stars'}</option>)}</select></label>
              </div>
              <p className="text-sm font-medium">Client Photo (optional)</p>
              <ImageUpload onUploadingChange={setReviewUploading} value={clientReview.clientPhoto} onChange={clientPhoto=>setClientReview(prev=>({...prev,clientPhoto}))} />
              <label className="block space-y-2 text-sm font-medium">Testimonial<textarea rows={5} className="block w-full rounded-lg border bg-white p-3" value={clientReview.testimonial} onChange={e=>setClientReview({...clientReview,testimonial:e.target.value})} /></label>
            </section>}
            <section className="space-y-4">
              <h4 className="font-semibold">Images</h4>
              <p className="text-sm">Cover image *</p>
              <ImageUpload
                value={form.image}
                onChange={(v) => change("image", v)}
              />
              <label className="block text-sm">
                Cover image URL
                <input
                  value={form.image}
                  onChange={(e) => change("image", e.target.value)}
                  className="mt-2 block w-full rounded-lg border bg-white p-3"
                />
              </label>
              <p className="text-sm">Gallery images (optional)</p>
              <ImageUpload
                multiple
                value={form.gallery}
                onChange={(v) => change("gallery", v)}
              />
              <label className="block text-sm">
                Gallery URLs — one per line
                <textarea
                  value={form.gallery}
                  onChange={(e) => change("gallery", e.target.value)}
                  className="mt-2 block w-full rounded-lg border bg-white p-3"
                />
              </label>
            </section>
            <section>
              <h4 className="mb-4 font-semibold">Search engine metadata</h4>
              <div className="grid gap-4 md:grid-cols-2">
                {fields(seoFields)}
              </div>
            </section>
            <div className="flex flex-wrap items-center gap-6">
              <label className="text-sm">
                Status
                <select
                  value={status}
                  onChange={(e) => setStatus(e.target.value)}
                  className="ml-3 rounded-lg border bg-white p-2"
                >
                  <option value="draft">Draft / unpublished</option>
                  <option value="published">Published</option>
                </select>
              </label>
              <label className="flex items-center gap-2 text-sm">
                <input
                  type="checkbox"
                  checked={featured}
                  onChange={(e) => setFeatured(e.target.checked)}
                />
                Featured (prioritize on listings and homepage)
              </label>
            </div>
            <Button type="submit">
              {saving
                ? "Saving…"
                : `Save ${status === "published" ? "& publish" : "draft"}`}
            </Button>
          </fieldset>
        </form>
      )}
      <input
        aria-label={`Search ${label.toLowerCase()} entries`}
        placeholder="Search titles…"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="my-6 w-full rounded-lg border border-neutral-300 p-3 text-sm"
      />
      {loading ? (
        <p role="status">Loading…</p>
      ) : error ? (
        <p role="alert">
          Unable to load content.{" "}
          <button
            onClick={() => setRevision((n) => n + 1)}
            className="underline"
          >
            Retry
          </button>
        </p>
      ) : (
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm">
            <thead>
              <tr className="border-b">
                <th className="p-3">Title / category</th>
                <th className="p-3">Status</th>
                <th className="p-3">Featured</th>
                <th className="p-3">Actions</th>
              </tr>
            </thead>
            <tbody>
              {entries
                .filter((e) =>
                  e.title.toLowerCase().includes(search.toLowerCase()),
                )
                .map((entry) => (
                  <tr key={entry.id} className="border-b">
                    <td className="p-3">
                      <span className="font-medium">{entry.title}</span>
                      <p className="mt-1 text-xs text-neutral-500">
                        {entry.category}
                      </p>
                    </td>
                    <td className="p-3">
                      <span
                        className={`rounded-full px-3 py-1 text-xs ${entry.status === "published" ? "bg-green-50 text-green-700" : "bg-amber-50 text-amber-800"}`}
                      >
                        {entry.status}
                      </span>
                    </td>
                    <td className="p-3">{entry.featured ? "Yes" : "—"}</td>
                    <td className="p-3">
                      <div className="flex flex-wrap gap-3">
                        <button
                          disabled={saving}
                          onClick={() => edit(entry)}
                          className="text-blue-600"
                        >
                          Edit
                        </button>
                        <button
                          disabled={saving}
                          onClick={() => edit(entry, true)}
                          className="text-blue-600"
                          aria-label={`Copy ${entry.title}`}
                          title="Copy into a new draft"
                        >
                          Copy
                        </button>
                        {entry.status === "published" && (
                          <>
                            <a
                              href={`${story ? "/case-studies" : "/work"}/${entry.slug}`}
                              target="_blank"
                              rel="noreferrer"
                              className="text-blue-600"
                            >
                              View
                            </a>
                            <button
                              disabled={saving}
                              onClick={() => unpublish(entry)}
                            >
                              Unpublish
                            </button>
                          </>
                        )}
                        <button
                          disabled={saving}
                          onClick={() => remove(entry)}
                          className="text-red-600"
                          aria-label={`Delete ${entry.title}`}
                        >
                          Delete
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
            </tbody>
          </table>
          {entries.length === 0 && (
            <p className="py-8 text-center text-neutral-500">
              No entries yet. Create your first {label.toLowerCase()}.
            </p>
          )}
        </div>
      )}
    </div>
  );
}
