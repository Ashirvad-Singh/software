import { useRef, type TouchEvent, type MouseEvent } from "react";

// Horizontal gestures leave normal page scrolling and pinch zoom available.
export function useSwipe(onSwipe: (direction: number) => void) {
  const start = useRef<{ x: number; y: number } | null>(null);
  const suppressClickUntil = useRef(0);

  return {
    style: { touchAction: "pan-y pinch-zoom" },
    onTouchStart(event: TouchEvent<HTMLElement>) {
      suppressClickUntil.current = 0;
      start.current = event.touches.length === 1
        ? { x: event.touches[0].clientX, y: event.touches[0].clientY }
        : null;
    },
    onTouchMove(event: TouchEvent<HTMLElement>) {
      if (event.touches.length !== 1) start.current = null;
    },
    onTouchCancel() { start.current = null; },
    onTouchEnd(event: TouchEvent<HTMLElement>) {
      const origin = start.current;
      start.current = null;
      if (!origin || event.touches.length || !event.changedTouches.length) return;
      const dx = event.changedTouches[0].clientX - origin.x;
      const dy = event.changedTouches[0].clientY - origin.y;
      if (Math.abs(dx) < 40 || Math.abs(dx) < Math.abs(dy) * 1.25) return;
      suppressClickUntil.current = Date.now() + 500;
      onSwipe(dx < 0 ? 1 : -1);
    },
    onClickCapture(event: MouseEvent<HTMLElement>) {
      if (Date.now() < suppressClickUntil.current) {
        event.preventDefault();
        event.stopPropagation();
      }
    },
  };
}
