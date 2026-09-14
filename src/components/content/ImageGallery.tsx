import { useEffect, useRef, useState } from "react";
import { ArrowLeft, ArrowRight, X } from "lucide-react";

export default function ImageGallery({ images, title }: { images: string[]; title: string }) {
  const [selected, setSelected] = useState<number | null>(null);
  const dialog = useRef<HTMLDialogElement>(null);
  const isOpen = selected !== null;

  useEffect(() => {
    if (!isOpen) return;
    const modal = dialog.current;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    modal?.showModal();
    return () => {
      modal?.close();
      document.body.style.overflow = previousOverflow;
    };
  }, [isOpen]);

  const close = () => setSelected(null);
  const move = (offset: number) => setSelected(index => index === null ? null : (index + offset + images.length) % images.length);

  return <>
    <div className="mt-5 grid gap-4 sm:grid-cols-2">
      {images.map((src, index) => <button key={index} type="button" onClick={() => setSelected(index)} aria-label={`Preview ${title}, image ${index + 1}`} className="cursor-zoom-in overflow-hidden rounded-xl border border-border focus-visible:outline-2 focus-visible:outline-primary">
        <img src={src} alt={`${title} — screenshot ${index + 1}`} loading="lazy" className="aspect-[4/3] w-full object-cover transition-transform motion-safe:hover:scale-105" />
      </button>)}
    </div>
    <dialog ref={dialog} aria-label={`${title} image preview`} onClose={close}
      onClick={event => { if (event.target === event.currentTarget) close(); }}
      onKeyDown={event => {
        if (event.key === "ArrowLeft") { event.preventDefault(); move(-1); }
        if (event.key === "ArrowRight") { event.preventDefault(); move(1); }
      }}
      className="m-auto max-h-[95dvh] w-[95vw] max-w-6xl overflow-visible border-0 bg-transparent p-0 text-white backdrop:bg-black/85 backdrop:backdrop-blur-sm">
      {selected !== null && <div className="relative rounded-2xl bg-neutral-950 p-3 shadow-2xl sm:p-5">
        <div className="mb-3 flex items-center justify-between gap-4">
          <p aria-live="polite" className="text-sm">Image {selected + 1} of {images.length}</p>
          <button type="button" autoFocus onClick={close} aria-label="Close image preview" className="flex h-11 w-11 items-center justify-center rounded-full bg-white/10 hover:bg-white/20"><X size={22} /></button>
        </div>
        <img src={images[selected]} alt={`${title} — screenshot ${selected + 1}`} className="mx-auto max-h-[70dvh] w-full object-contain" />
        {images.length > 1 && <div className="mt-3 flex justify-center gap-4">
          <button type="button" onClick={() => move(-1)} aria-label="Previous image" className="flex h-11 w-11 items-center justify-center rounded-full bg-white/10 hover:bg-white/20"><ArrowLeft size={20} /></button>
          <button type="button" onClick={() => move(1)} aria-label="Next image" className="flex h-11 w-11 items-center justify-center rounded-full bg-white/10 hover:bg-white/20"><ArrowRight size={20} /></button>
        </div>}
      </div>}
    </dialog>
  </>;
}
