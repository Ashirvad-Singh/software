import { useEffect } from "react";
import { animate } from "framer-motion";
import { useLocation } from "react-router-dom";

/** Adds the same magnetic interaction to existing action buttons without changing their layout. */
export default function SiteMagneticButtons() {
  const { pathname } = useLocation();
  useEffect(() => {
    const media = window.matchMedia("(prefers-reduced-motion: reduce), (pointer: coarse)");
    const footprint = document.createElement("div");
    footprint.className = "site-magnetic-footprint";
    footprint.setAttribute("aria-hidden", "true");
    document.body.appendChild(footprint);
    type State = { element: HTMLElement; rect: DOMRect; x: number; y: number; stop: () => void };
    const states = new Set<State>();
    let active: State | null = null;
    const spring = { type: "spring" as const, stiffness: 150, damping: 25, mass: 0.1 };
    const move = (state: State, x: number, y: number, returning = false) => {
      state.stop();
      const a = animate(state.x, x, { ...spring, onUpdate(value) { state.x = value; state.element.style.setProperty("--magnetic-x", `${value}px`); } });
      const b = animate(state.y, y, { ...spring, onUpdate(value) { state.y = value; state.element.style.setProperty("--magnetic-y", `${value}px`); }, onComplete() {
        if (returning) { state.element.style.removeProperty("--magnetic-x"); state.element.style.removeProperty("--magnetic-y"); states.delete(state); }
      } });
      state.stop = () => { a.stop(); b.stop(); };
    };
    const reset = () => {
      footprint.style.display = "none";
      if (active) { move(active, 0, 0, true); active = null; }
    };
    const hardReset = () => {
      active = null; footprint.style.display = "none";
      for (const state of states) { state.stop(); state.element.style.removeProperty("--magnetic-x"); state.element.style.removeProperty("--magnetic-y"); }
      states.clear();
    };
    const pointer = (event: PointerEvent) => {
      if (media.matches || event.pointerType !== "mouse" || event.buttons) { reset(); return; }
      const element = event.target instanceof Element ? event.target.closest<HTMLElement>(".site-button") : null;
      if (!element || element.closest("[data-magnetic-zone]") || element.matches(':disabled, [aria-disabled="true"]') || element.closest("[inert]")) { reset(); return; }
      if (active?.element !== element) {
        reset();
        const old = [...states].find(state => state.element === element);
        if (old) { old.stop(); active = old; }
        else { active = { element, rect: element.getBoundingClientRect(), x: 0, y: 0, stop() {} }; states.add(active); }
        Object.assign(footprint.style, { display: "block", left: `${active.rect.left}px`, top: `${active.rect.top}px`, width: `${active.rect.width}px`, height: `${active.rect.height}px`, borderRadius: getComputedStyle(element).borderRadius });
      }
      if (!active) return;
      let x = (event.clientX - active.rect.left - active.rect.width / 2) * .8;
      let y = (event.clientY - active.rect.top - active.rect.height / 2) * .8;
      const distance = Math.hypot(x, y);
      if (distance > 100) { x *= 100 / distance; y *= 100 / distance; }
      move(active, x, y);
    };
    document.addEventListener("pointermove", pointer);
    document.addEventListener("pointerleave", reset);
    document.addEventListener("focusin", hardReset);
    window.addEventListener("scroll", hardReset, true);
    window.addEventListener("resize", hardReset);
    window.addEventListener("blur", hardReset);
    media.addEventListener("change", hardReset);
    return () => {
      hardReset(); footprint.remove();
      document.removeEventListener("pointermove", pointer);
      document.removeEventListener("pointerleave", reset);
      document.removeEventListener("focusin", hardReset);
      window.removeEventListener("scroll", hardReset, true);
      window.removeEventListener("resize", hardReset);
      window.removeEventListener("blur", hardReset);
      media.removeEventListener("change", hardReset);
    };
  }, [pathname]);
  return null;
}
