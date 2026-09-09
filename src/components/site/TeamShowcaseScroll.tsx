import { useRef, useState } from "react";
import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion";
import { ArrowDown, ArrowUpRight } from "lucide-react";
import { Link } from "react-router-dom";

export interface TeamMember {
  name: string;
  role: string;
  image: string;
}

function TeamPortrait({ member, index }: { member: TeamMember; index: number }) {
  const ref = useRef<HTMLElement>(null);
  const reduceMotion = useReducedMotion();
  const [showColor, setShowColor] = useState(false);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const scale = useTransform(scrollYProgress, [0, 0.4, 0.8, 1], [0.72, 1, 1, 0.94]);
  const imageScale = useTransform(scrollYProgress, [0, 0.5, 1], [1.18, 1, 1.08]);

  return (
    <figure ref={ref} className={`min-w-0 ${index % 3 === 1 ? "md:translate-y-28" : "md:translate-y-0"} ${index % 2 === 1 ? "translate-y-12" : ""}`}>
      <motion.div style={reduceMotion ? undefined : { scale }} className="origin-center">
        <button
          type="button"
          aria-label={`Show ${member.name}'s portrait in color`}
          aria-pressed={showColor}
          onClick={() => setShowColor((value) => !value)}
          className="group relative block aspect-[3/4] w-full overflow-hidden rounded-2xl bg-neutral-200 text-left outline-none ring-offset-4 ring-offset-neutral-50 focus-visible:ring-2 focus-visible:ring-primary dark:bg-neutral-800 dark:ring-offset-neutral-950 sm:rounded-3xl"
        >
          <motion.img
            src={member.image}
            alt={member.name}
            loading="lazy"
            decoding="async"
            style={reduceMotion ? undefined : { scale: imageScale }}
            className={`h-full w-full object-cover transition-[filter] duration-700 motion-reduce:transition-none group-hover:grayscale-0 group-focus-visible:grayscale-0 ${showColor ? "grayscale-0" : "grayscale"}`}
          />
          <span className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
          <span aria-hidden="true" className="absolute bottom-4 right-4 flex h-9 w-9 items-center justify-center rounded-full bg-white/90 text-primary transition-colors group-hover:bg-primary group-hover:text-white">
            <ArrowUpRight className="h-4 w-4" />
          </span>
        </button>
        <figcaption className="mt-4 px-1 sm:mt-5">
          <h3 className="text-base font-bold text-neutral-900 dark:text-white sm:text-xl lg:text-2xl">{member.name}</h3>
          <p className="mt-1 text-xs text-neutral-500 dark:text-neutral-400 sm:text-sm">{member.role}</p>
        </figcaption>
      </motion.div>
    </figure>
  );
}

export default function TeamShowcaseScroll({ members }: { members: TeamMember[] }) {
  return (
    <>
      <section aria-labelledby="team-grid-heading" className="relative isolate px-4 pb-24 pt-6 sm:px-8 md:px-12 md:pb-48 lg:px-16">
        <h2 id="team-grid-heading" className="sr-only">The people behind Adat</h2>
        <div className="mx-auto mb-10 flex max-w-[1600px] items-center justify-between border-t border-neutral-200 pt-5 text-xs text-neutral-500 dark:border-neutral-800 sm:mb-16">
          <p className="font-bold uppercase tracking-widest text-primary">Different minds. Shared ambition.</p>
          <ArrowDown aria-hidden="true" className="h-4 w-4 shrink-0" />
        </div>

        <div aria-hidden="true" className="pointer-events-none sticky top-[36svh] z-10 h-0 select-none text-center text-white mix-blend-exclusion">
          <p className="text-[clamp(2.5rem,9vw,9rem)] font-bold leading-[0.95] tracking-tight">
            THE PEOPLE<br />BEHIND ADAT.
          </p>
        </div>

        <div className="mx-auto grid max-w-[1600px] grid-cols-2 items-start gap-x-5 gap-y-12 sm:gap-x-10 sm:gap-y-20 md:grid-cols-3 md:gap-x-14 md:gap-y-28 lg:gap-x-24">
          {members.map((member, index) => (
            <TeamPortrait key={`${member.name}-${index}`} member={member} index={index} />
          ))}
        </div>
      </section>

      <section className="border-t border-neutral-200 bg-white px-4 py-16 text-center dark:border-neutral-800 dark:bg-neutral-900 sm:py-24">
        <p className="mb-4 text-sm font-bold uppercase tracking-widest text-primary">Build with us</p>
        <h2 className="text-2xl font-bold text-neutral-900 dark:text-white sm:text-3xl md:text-4xl lg:text-5xl">Great work starts with great people.</h2>
        <p className="mx-auto mt-5 max-w-xl text-sm leading-relaxed text-neutral-500 dark:text-neutral-400 sm:text-base">Bring your curiosity, your craft, and your ideas. Find your place on the Adat team.</p>
        <Link to="/careers" className="mt-8 inline-flex items-center gap-3 rounded-full bg-primary px-6 py-3 text-sm font-semibold text-primary-foreground transition-colors hover:bg-primary/90 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-primary">
          Explore careers <ArrowUpRight aria-hidden="true" className="h-4 w-4" />
        </Link>
      </section>
    </>
  );
}
