import { cn } from "@/lib/utils";

function Placeholder({ className }: { className: string }) {
  return <div className={cn("rounded-lg bg-neutral-200/80 motion-safe:animate-pulse dark:bg-neutral-800", className)} />;
}

export default function ContentSkeleton({ label = "content", variant = "cards", count = 3, className }: {
  label?: string;
  variant?: "cards" | "list" | "detail" | "gallery" | "team";
  count?: number;
  className?: string;
}) {
  return <div role="status" aria-busy="true" className={cn("w-full", className)}>
    <span className="sr-only">Loading {label}…</span>
    {variant === "detail" ? <div aria-hidden="true" className="mx-auto max-w-6xl space-y-8 px-5 pb-16 pt-36">
      <Placeholder className="h-4 w-36" />
      <Placeholder className="h-12 w-4/5 max-w-3xl" />
      <Placeholder className="h-5 w-3/5" />
      <Placeholder className="aspect-video w-full rounded-3xl" />
      <div className="max-w-3xl space-y-4">
        <Placeholder className="h-8 w-1/2" />
        {[0, 1, 2, 3].map(i => <Placeholder key={i} className={i === 3 ? "h-4 w-2/3" : "h-4 w-full"} />)}
      </div>
    </div> : <div aria-hidden="true" className={variant === "list" ? "space-y-4" : "grid gap-6 sm:grid-cols-2 lg:grid-cols-3"}>
      {Array.from({ length: count }, (_, i) => <div key={i} className="overflow-hidden rounded-2xl border border-neutral-200 bg-white dark:border-neutral-800 dark:bg-neutral-950">
        {variant !== "list" && <Placeholder className={cn("w-full rounded-none", variant === "team" ? "aspect-[3/4]" : "aspect-[4/3]")} />}
        {variant !== "gallery" && <div className="space-y-3 p-5">
          <Placeholder className="h-5 w-2/3" />
          <Placeholder className="h-3 w-full" />
          <Placeholder className="h-3 w-4/5" />
          <Placeholder className="mt-5 h-4 w-24" />
        </div>}
      </div>)}
    </div>}
  </div>;
}
