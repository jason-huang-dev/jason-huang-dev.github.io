import { useEffect, useRef, type RefObject } from "react";

export type SignaturePointerState = {
  pointer: React.MutableRefObject<[number, number]>;
  velocity: React.MutableRefObject<[number, number]>;
  ripple: React.MutableRefObject<{
    x: number;
    y: number;
    startedAt: number;
    strength: number;
  }>;
};

export function useSignatureFluidPointer(
  targetRef: RefObject<HTMLElement>,
): SignaturePointerState {
  const pointer = useRef<[number, number]>([0.5, 0.5]);
  const velocity = useRef<[number, number]>([0, 0]);
  const ripple = useRef({
    x: 0.5,
    y: 0.5,
    startedAt: -10,
    strength: 0,
  });
  const previous = useRef<[number, number]>([0.5, 0.5]);
  const frame = useRef<number | null>(null);

  useEffect(() => {
    const node = targetRef.current;
    if (!node) return undefined;

    const setPoint = (clientX: number, clientY: number) => {
      const rect = node.getBoundingClientRect();
      const x = (clientX - rect.left) / Math.max(rect.width, 1);
      const y = 1 - (clientY - rect.top) / Math.max(rect.height, 1);
      const clamped: [number, number] = [
        Math.min(1, Math.max(0, x)),
        Math.min(1, Math.max(0, y)),
      ];

      velocity.current = [
        clamped[0] - previous.current[0],
        clamped[1] - previous.current[1],
      ];
      previous.current = clamped;
      pointer.current = clamped;
    };

    const handlePointerMove = (event: PointerEvent) => {
      if (event.pointerType !== "mouse") return;

      if (frame.current) {
        cancelAnimationFrame(frame.current);
      }

      frame.current = requestAnimationFrame(() => {
        setPoint(event.clientX, event.clientY);
      });
    };

    const handlePointerDown = (event: PointerEvent) => {
      setPoint(event.clientX, event.clientY);
      ripple.current = {
        x: pointer.current[0],
        y: pointer.current[1],
        startedAt: performance.now() / 1000,
        strength: event.pointerType === "mouse" ? 1 : 0.72,
      };
    };

    node.addEventListener("pointermove", handlePointerMove);
    node.addEventListener("pointerdown", handlePointerDown);

    return () => {
      node.removeEventListener("pointermove", handlePointerMove);
      node.removeEventListener("pointerdown", handlePointerDown);
      if (frame.current) {
        cancelAnimationFrame(frame.current);
      }
    };
  }, [targetRef]);

  return { pointer, velocity, ripple };
}
