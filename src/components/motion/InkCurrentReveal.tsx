import {
  createElement,
  type HTMLAttributes,
  type CSSProperties,
  type ReactNode,
} from "react";

import { useInViewOnce } from "./useInViewOnce";

export type InkCurrentRevealProps = {
  children: ReactNode;
  as?: keyof JSX.IntrinsicElements;
  delayMs?: number;
  direction?: "up" | "left" | "right" | "none";
  intensity?: "quiet" | "normal" | "signature";
  once?: boolean;
  className?: string;
} & Omit<HTMLAttributes<HTMLElement>, "children" | "className">;

function cx(...classes: Array<string | undefined | false>) {
  return classes.filter(Boolean).join(" ");
}

export function InkCurrentReveal({
  children,
  as = "div",
  delayMs = 0,
  direction = "up",
  intensity = "normal",
  once = true,
  className,
  ...rest
}: InkCurrentRevealProps) {
  const [ref, inView] = useInViewOnce<HTMLElement>({ once });
  const style = {
    "--ink-current-delay": `${delayMs}ms`,
  } as CSSProperties;

  return createElement(
    as,
    {
      ref,
      className: cx(
        "inkCurrentReveal",
        inView && "inkCurrentReveal--visible",
        `inkCurrentReveal--${direction}`,
        `inkCurrentReveal--${intensity}`,
        className,
      ),
      style,
      ...rest,
    },
    <>
      {intensity === "signature" ? (
        <span className="inkCurrentReveal__glint" aria-hidden="true" />
      ) : null}
      {children}
    </>,
  );
}
