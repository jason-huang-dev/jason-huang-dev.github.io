import { useEffect, useRef, useState, type RefObject } from "react";

export function useInViewOnce<T extends Element>(options?: {
  rootMargin?: string;
  threshold?: number;
  once?: boolean;
}): [RefObject<T>, boolean] {
  const {
    rootMargin = "0px 0px -12% 0px",
    threshold = 0.18,
    once = true,
  } = options ?? {};
  const ref = useRef<T>(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const node = ref.current;
    if (!node || typeof IntersectionObserver === "undefined") {
      setInView(true);
      return undefined;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        const visible = entry.isIntersecting;
        setInView(visible);

        if (visible && once) {
          observer.unobserve(entry.target);
        }
      },
      { rootMargin, threshold },
    );

    observer.observe(node);

    return () => observer.disconnect();
  }, [once, rootMargin, threshold]);

  return [ref, inView];
}
