import type { ReactNode } from "react";

export type SealStampCTAProps = {
  href: string;
  children: ReactNode;
  sealText?: string;
  variant?: "gold" | "water";
  external?: boolean;
  className?: string;
};

export function SealStampCTA({
  href,
  children,
  sealText = "黄",
  variant = "gold",
  external = false,
  className = "",
}: SealStampCTAProps) {
  return (
    <a
      className={`sealStampCTA sealStampCTA--${variant} ${className}`}
      href={href}
      target={external ? "_blank" : undefined}
      rel={external ? "noreferrer" : undefined}
    >
      <span className="sealStampCTA__text">{children}</span>
      <span className="sealStampCTA__seal" aria-hidden="true">
        {sealText}
      </span>
    </a>
  );
}
