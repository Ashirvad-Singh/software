import { Component, lazy, Suspense, useEffect, useRef, useState } from "react";
import type { ReactNode } from "react";

const Spline = lazy(() => import("@splinetool/react-spline"));

function WorkspacePlaceholder() {
  return (
    <div className="absolute inset-0 flex items-center justify-center" aria-hidden="true">
      <div className="absolute size-80 rounded-full bg-blue-500/20 blur-3xl" />
      <div className="relative w-72 lg:w-96 [transform:perspective(900px)_rotateY(-25deg)_rotateX(15deg)_rotateZ(-8deg)]">
        <div className="rounded-2xl border-4 border-slate-500 bg-slate-950 p-5 shadow-2xl shadow-blue-500/30">
          <div className="mb-6 flex gap-2 border-b border-slate-700 pb-4">
            <span className="size-2 rounded-full bg-sky-400" /><span className="size-2 rounded-full bg-blue-500" /><span className="size-2 rounded-full bg-indigo-400" />
          </div>
          <div className="space-y-4">
            {["w-3/4 bg-sky-400", "w-1/2 bg-indigo-400", "w-4/5 bg-blue-500", "w-2/3 bg-sky-300", "w-1/3 bg-indigo-400"].map((line) => <div key={line} className={`h-2 rounded-full ${line}`} />)}
          </div>
          <div className="mt-6 font-mono text-xl text-sky-300">{'</>'}</div>
        </div>
        <div className="h-8 rounded-b-2xl border border-slate-400 bg-gradient-to-b from-slate-400 to-slate-700 shadow-xl [transform:skewX(-35deg)]" />
        <div className="absolute -right-6 -top-10 rounded-xl border border-blue-300/50 bg-blue-600 px-5 py-4 font-mono text-xl text-white shadow-xl">{'{ }'}</div>
        <div className="absolute -bottom-12 -left-6 rounded-xl border border-sky-300/40 bg-slate-800 p-4 shadow-xl">
          {[0, 1, 2].map((row) => <div key={row} className="mb-2 flex h-5 w-24 items-center gap-2 rounded bg-slate-700 px-2 last:mb-0"><span className="size-1.5 rounded-full bg-sky-400" /><span className="h-1 w-12 rounded bg-slate-400" /></div>)}
        </div>
      </div>
    </div>
  );
}

class SceneBoundary extends Component<{ children: ReactNode }, { failed: boolean }> {
  state = { failed: false };
  static getDerivedStateFromError() { return { failed: true }; }
  render() { return this.state.failed ? null : this.props.children; }
}

function DeferredScene({ scene }: { scene: string }) {
  const host = useRef<HTMLDivElement>(null);
  const [enabled, setEnabled] = useState(false);
  const [loaded, setLoaded] = useState(false);
  useEffect(() => {
    const desktop = window.matchMedia("(min-width: 768px)");
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)");
    let timer: ReturnType<typeof setTimeout> | undefined;
    const observer = new IntersectionObserver(([entry]) => {
      clearTimeout(timer);
      if (entry.isIntersecting && desktop.matches && !reduced.matches) {
        timer = setTimeout(() => setEnabled(true), 800);
      }
    });
    if (host.current) observer.observe(host.current);
    const update = () => {
      setEnabled(false);
      clearTimeout(timer);
      if (host.current) { observer.unobserve(host.current); observer.observe(host.current); }
    };
    desktop.addEventListener("change", update);
    reduced.addEventListener("change", update);
    return () => { clearTimeout(timer); observer.disconnect(); desktop.removeEventListener("change", update); reduced.removeEventListener("change", update); };
  }, []);
  return (
    <div ref={host} className="absolute inset-0">
      <WorkspacePlaceholder />
      {enabled && <SceneBoundary><Suspense fallback={null}>
        <Spline scene={scene} onLoad={() => setLoaded(true)} className={`relative size-full bg-slate-950 transition-opacity duration-500 ${loaded ? "opacity-100" : "opacity-0"}`} />
      </Suspense></SceneBoundary>}
    </div>
  );
}

/** Pass the scene URL from Spline's React export, or configure VITE_SPLINE_SCENE_URL. */
export default function HeroScene({ scene = import.meta.env.VITE_SPLINE_SCENE_URL, className = "" }: { scene?: string; className?: string }) {
  return (
    <div aria-hidden="true" className={`pointer-events-none absolute inset-y-0 right-0 hidden w-[44%] md:block ${className}`}>
      {scene ? <DeferredScene key={scene} scene={scene} /> : <WorkspacePlaceholder />}
    </div>
  );
}
