import { useEffect, useRef } from "react";

export function usePointerGlow<T extends HTMLElement>() {
  const ref = useRef<T | null>(null);
  const frame = useRef<number | null>(null);

  useEffect(() => {
    const node = ref.current;
    if (!node) return undefined;

    const handleMove = (event: PointerEvent) => {
      if (event.pointerType !== "mouse") return;

      if (frame.current) {
        cancelAnimationFrame(frame.current);
      }

      frame.current = requestAnimationFrame(() => {
        const rect = node.getBoundingClientRect();
        node.style.setProperty("--pointer-x", `${event.clientX - rect.left}px`);
        node.style.setProperty("--pointer-y", `${event.clientY - rect.top}px`);
      });
    };

    node.addEventListener("pointermove", handleMove);

    return () => {
      node.removeEventListener("pointermove", handleMove);
      if (frame.current) {
        cancelAnimationFrame(frame.current);
      }
    };
  }, []);

  return ref;
}
