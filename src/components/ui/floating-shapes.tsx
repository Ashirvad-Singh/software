import { cn } from "@/lib/utils";

/** Quiet SVG accents shared by page backgrounds. */
export function FloatingShapes({ className }: { className?: string }) {
  return (
    <div aria-hidden="true" className={cn("pointer-events-none absolute inset-0 z-0 overflow-hidden", className)}>
      <svg className="absolute -right-16 top-[8%] w-56 text-sky-300 opacity-25 sm:w-72" viewBox="0 0 240 240" fill="none" focusable="false">
        <circle cx="120" cy="120" r="98" stroke="currentColor" strokeWidth="1" />
        <circle cx="120" cy="120" r="76" stroke="currentColor" strokeWidth="1" />
        <circle cx="120" cy="120" r="54" stroke="currentColor" strokeWidth="1" />
      </svg>
      <svg className="absolute -left-12 bottom-[12%] w-44 text-sky-200 opacity-30 sm:w-60" viewBox="0 0 200 200" fill="none" focusable="false">
        <rect x="40" y="40" width="120" height="120" rx="28" transform="rotate(-22 100 100)" fill="currentColor" fillOpacity=".25" stroke="currentColor" />
        <rect x="56" y="56" width="88" height="88" rx="20" transform="rotate(-22 100 100)" stroke="currentColor" />
      </svg>
      <svg className="absolute left-[43%] top-[18%] hidden w-14 text-sky-400 opacity-20 sm:block" viewBox="0 0 60 60" fill="none" focusable="false">
        <path d="M30 15V45M15 30H45" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
        <circle cx="30" cy="30" r="23" stroke="currentColor" strokeDasharray="2 6" />
      </svg>
      <svg className="absolute bottom-[8%] right-[38%] w-16 text-blue-300 opacity-25" viewBox="0 0 80 48" fill="currentColor" focusable="false">
        {[12, 28, 44, 60].flatMap(x => [12, 28, 44].map(y => <circle key={`${x}-${y}`} cx={x} cy={y} r="1.5" />))}
      </svg>
    </div>
  );
}
