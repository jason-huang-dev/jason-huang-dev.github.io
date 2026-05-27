import { FiArrowUpRight, FiMail } from "react-icons/fi";

import { BrandAsset } from "./BrandAsset";

export type SealStampContactCTAProps = {
  title?: string;
  description?: string;
  primaryLabel?: string;
  primaryHref?: string;
  secondaryLabel?: string;
  secondaryHref?: string;
  email?: string;
  variant?: "panel" | "inline";
  className?: string;
};

function cx(...classes: Array<string | undefined | false>) {
  return classes.filter(Boolean).join(" ");
}

export function SealStampContactCTA({
  title = "Let's build something polished.",
  description = "I design and build modern web experiences with clean systems, strong interaction details, and practical implementation.",
  primaryLabel = "Contact Me",
  primaryHref,
  secondaryLabel,
  secondaryHref,
  email,
  variant = "panel",
  className,
}: SealStampContactCTAProps) {
  const resolvedPrimaryHref =
    primaryHref ?? (email ? `mailto:${email.replace(/^mailto:/, "")}` : "#contact");

  return (
    <aside
      className={cx(
        "sealStampContactCTA",
        `sealStampContactCTA--${variant}`,
        className,
      )}
    >
      <span className="sealStampContactCTA__seal" aria-hidden="true">
        <span className="sealStampContactCTA__sealCurrent" />
        <BrandAsset
          id="signatureEmblem"
          className="sealStampContactCTA__sealGlyph"
          decorative
        />
      </span>
      <span className="sealStampContactCTA__content">
        <strong className="sealStampContactCTA__title">{title}</strong>
        <span className="sealStampContactCTA__description">{description}</span>
        <span className="sealStampContactCTA__actions">
          <a className="sealStampContactCTA__primary" href={resolvedPrimaryHref}>
            <FiMail aria-hidden="true" />
            {primaryLabel}
          </a>
          {secondaryHref && secondaryLabel ? (
            <a
              className="sealStampContactCTA__secondary"
              href={secondaryHref}
              target={secondaryHref.startsWith("http") ? "_blank" : undefined}
              rel={secondaryHref.startsWith("http") ? "noreferrer" : undefined}
            >
              {secondaryLabel} <FiArrowUpRight aria-hidden="true" />
            </a>
          ) : null}
        </span>
      </span>
    </aside>
  );
}
