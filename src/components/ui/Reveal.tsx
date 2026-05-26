import type { ReactNode } from "react";
import { motion, useReducedMotion } from "framer-motion";

export type RevealProps = {
  children: ReactNode;
  as?: keyof JSX.IntrinsicElements;
  className?: string;
  delay?: number;
  y?: number;
  once?: boolean;
} & Record<string, unknown>;

export function Reveal({
  children,
  as = "div",
  className,
  delay = 0,
  y = 18,
  once = true,
  ...props
}: RevealProps) {
  const reduceMotion = useReducedMotion();

  if (reduceMotion) {
    const Tag = as;
    return <Tag className={className} {...props}>{children}</Tag>;
  }

  const MotionTag = (motion as any)[as] ?? motion.div;

  return (
    <MotionTag
      className={className}
      {...props}
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once, margin: "-80px" }}
      transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1], delay }}
    >
      {children}
    </MotionTag>
  );
}
