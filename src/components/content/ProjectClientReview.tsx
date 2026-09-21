import { Star } from "lucide-react";
import type { ClientReview } from "@/lib/content/model";
import { safeUrl } from "@/lib/content/model";
export default function ProjectClientReview({ review }: { review?: ClientReview }) {
  if (!review?.enabled || !review.testimonial.trim()) return null;
  const photo = safeUrl(review.clientPhoto) || (/^\/(?!\/)/.test(review.clientPhoto) ? review.clientPhoto : "");
  return <section aria-label="Client review" className="mt-16 rounded-2xl border border-primary/20 bg-secondary/25 p-6 text-center sm:p-10 md:p-12">
    <h2 className="text-xs font-semibold uppercase tracking-widest text-primary">Client Review</h2>
    <div role="img" aria-label={`${review.rating} out of 5 stars`} className="mt-5 flex justify-center gap-1 text-primary">
      {Array.from({length:5},(_,index)=><Star key={index} aria-hidden="true" className="h-5 w-5" fill={index < review.rating ? "currentColor" : "none"} />)}
    </div>
    <blockquote className="mx-auto mt-6 max-w-3xl whitespace-pre-line break-words text-xl leading-relaxed md:text-2xl">“{review.testimonial}”</blockquote>
    <div className="mt-6 flex items-center justify-center gap-3">
      {photo && <img src={photo} alt="" className="h-12 w-12 shrink-0 rounded-full object-cover" />}
      <div className="min-w-0 break-words text-left"><p className="font-semibold">{review.clientName}</p><p className="text-sm text-muted-foreground">{[review.clientRole,review.clientCompany].filter(Boolean).join(", ")}</p></div>
    </div>
  </section>;
}
