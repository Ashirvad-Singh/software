import { useRef, type TouchEvent, type MouseEvent } from "react";

// Horizontal gestures (touch & mouse drag) leave normal page scrolling available.
export function useSwipe(onSwipe: (direction: number) => void) {
  const start = useRef<{ x: number; y: number } | null>(null);
  const isMouseDown = useRef(false);
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
      if (Math.abs(dx) < 30 || Math.abs(dx) < Math.abs(dy) * 1.25) return;
      suppressClickUntil.current = Date.now() + 500;
      onSwipe(dx < 0 ? 1 : -1);
    },
    onMouseDown(event: MouseEvent<HTMLElement>) {
      if (event.button !== 0) return;
      isMouseDown.current = true;
      start.current = { x: event.clientX, y: event.clientY };
    },
    onMouseUp(event: MouseEvent<HTMLElement>) {
      if (!isMouseDown.current || !start.current) return;
      isMouseDown.current = false;
      const dx = event.clientX - start.current.x;
      const dy = event.clientY - start.current.y;
      start.current = null;
      if (Math.abs(dx) > 35 && Math.abs(dx) > Math.abs(dy)) {
        suppressClickUntil.current = Date.now() + 500;
        onSwipe(dx < 0 ? 1 : -1);
      }
    },
    onMouseLeave(event: MouseEvent<HTMLElement>) {
      if (isMouseDown.current && start.current) {
        isMouseDown.current = false;
        const dx = event.clientX - start.current.x;
        const dy = event.clientY - start.current.y;
        start.current = null;
        if (Math.abs(dx) > 35 && Math.abs(dx) > Math.abs(dy)) {
          suppressClickUntil.current = Date.now() + 500;
          onSwipe(dx < 0 ? 1 : -1);
        }
      }
    },
    onClickCapture(event: MouseEvent<HTMLElement>) {
      if (Date.now() < suppressClickUntil.current) {
        event.preventDefault();
        event.stopPropagation();
      }
    },
  };
}
