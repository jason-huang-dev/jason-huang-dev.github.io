import type { ReactNode } from "react";
import { useEffect, useRef } from "react";
import { useReducedMotion } from "framer-motion";

export type MagneticProps = {
  children: ReactNode;
  strength?: number;
  className?: string;
  disabled?: boolean;
};

export function Magnetic({
  children,
  strength = 6,
  className = "",
  disabled = false,
}: MagneticProps) {
  const ref = useRef<HTMLSpanElement | null>(null);
  const frame = useRef<number | null>(null);
  const reduceMotion = useReducedMotion();

  useEffect(() => {
    const node = ref.current;
    if (!node || disabled || reduceMotion) return undefined;

    const handleMove = (event: PointerEvent) => {
      if (event.pointerType !== "mouse") return;

      if (frame.current) {
        cancelAnimationFrame(frame.current);
      }

      frame.current = requestAnimationFrame(() => {
        const rect = node.getBoundingClientRect();
        const x = ((event.clientX - rect.left) / rect.width - 0.5) * strength;
        const y = ((event.clientY - rect.top) / rect.height - 0.5) * strength;
        node.style.transform = `translate3d(${x}px, ${y}px, 0)`;
      });
    };

    const handleLeave = () => {
      node.style.transform = "translate3d(0, 0, 0)";
    };

    node.addEventListener("pointermove", handleMove);
    node.addEventListener("pointerleave", handleLeave);

    return () => {
      node.removeEventListener("pointermove", handleMove);
      node.removeEventListener("pointerleave", handleLeave);
      if (frame.current) {
        cancelAnimationFrame(frame.current);
      }
    };
  }, [disabled, reduceMotion, strength]);

  return (
    <span ref={ref} className={`magnetic ${className}`}>
      {children}
    </span>
  );
}
