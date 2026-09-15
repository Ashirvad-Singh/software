import "./card-visual.css";

/** Small CSS illustrations with perspective, bevels, and layered shadows. */
export default function CardVisual({ variant }: { variant: number }) {
  return <span className={`card-visual card-visual-${variant}`} aria-hidden="true">
    {variant === 0 && <span className="visual-screens"><span className="visual-screen visual-screen-rear" /><span className="visual-screen visual-screen-front"><i /><span className="visual-screen-layout"><b /><span><i /><i /><i /></span></span></span></span>}
    {variant === 1 && <span className="visual-research"><span className="visual-bubble visual-bubble-back"><i /><i /></span><span className="visual-bubble visual-bubble-front"><i /><i /><i /></span></span>}
    {variant === 2 && <span className="visual-wireframes"><span className="visual-wireframe"><i /><b /><span /></span><span className="visual-wireframe"><i /><b /><span /></span><span className="visual-wireframe"><i /><b /><span /></span></span>}
    {variant === 3 && <span className="visual-blocks"><i /><i /><i /><i /></span>}
    {variant === 4 && <span className="visual-launch"><span className="visual-orbit-ring" /><span className="visual-sphere" /><span className="visual-satellite" /></span>}
  </span>;
}
