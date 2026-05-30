import { type ReactNode } from "react";
import { FiArrowUpRight, FiExternalLink, FiGithub } from "react-icons/fi";
import { Link } from "react-router-dom";

import { BrandAsset } from "../brand/BrandAsset";

export type SignatureProjectCardProps = {
  title: string;
  eyebrow?: string;
  description: string;
  tags?: string[];
  href?: string;
  githubHref?: string;
  demoHref?: string;
  impacts?: string[];
  imageSrc?: string;
  imageAlt?: string;
  featured?: boolean;
  accent?: "blue" | "gold" | "balanced";
  className?: string;
};

function cx(...classes: Array<string | undefined | false>) {
  return classes.filter(Boolean).join(" ");
}

function ProjectAction({
  href,
  className,
  children,
  ariaLabel,
}: {
  href: string;
  className: string;
  children: ReactNode;
  ariaLabel: string;
}) {
  if (href.startsWith("/")) {
    return (
      <Link className={className} to={href} aria-label={ariaLabel}>
        {children}
      </Link>
    );
  }

  return (
    <a
      className={className}
      href={href}
      target="_blank"
      rel="noreferrer"
      aria-label={ariaLabel}
    >
      {children}
    </a>
  );
}

export function SignatureProjectCard({
  title,
  eyebrow,
  description,
  tags = [],
  href,
  githubHref,
  demoHref,
  impacts = [],
  imageSrc,
  imageAlt = "",
  featured = false,
  accent = "balanced",
  className,
}: SignatureProjectCardProps) {
  return (
    <article
      className={cx(
        "signatureProjectCard",
        featured && "signatureProjectCard--featured",
        className,
      )}
      data-accent={accent}
    >
      <span className="signatureProjectCard__edge" aria-hidden="true" />
      <BrandAsset
        id="signatureEmblem"
        className="signatureProjectCard__watermark"
        decorative
      />
      <span className="signatureProjectCard__content">
        {eyebrow ? (
          <span className="signatureProjectCard__eyebrow">{eyebrow}</span>
        ) : null}
        <strong className="signatureProjectCard__title">{title}</strong>
        <span className="signatureProjectCard__description">{description}</span>
        {tags.length > 0 ? (
          <span className="signatureProjectCard__tags">
            {tags.slice(0, featured ? 6 : 4).map((tag) => (
              <span key={tag}>{tag}</span>
            ))}
          </span>
        ) : null}
        {impacts.length > 0 ? (
          <ul className="signatureProjectCard__impact">
            {impacts.slice(0, 3).map((impact) => (
              <li key={impact}>{impact}</li>
            ))}
          </ul>
        ) : null}
        <span className="signatureProjectCard__footer">
          {href ? (
            <ProjectAction
              href={href}
              className="signatureProjectCard__cta"
              ariaLabel={`View project: ${title}`}
            >
              View case study <FiArrowUpRight aria-hidden="true" />
            </ProjectAction>
          ) : null}
          {githubHref ? (
            <a
              className="signatureProjectCard__github"
              href={githubHref}
              target="_blank"
              rel="noreferrer"
              aria-label={`Open GitHub repository for ${title}`}
            >
              <FiGithub aria-hidden="true" /> GitHub
            </a>
          ) : null}
          {demoHref ? (
            <a
              className="signatureProjectCard__github"
              href={demoHref}
              target="_blank"
              rel="noreferrer"
              aria-label={`Open live demo for ${title}`}
            >
              <FiExternalLink aria-hidden="true" /> Demo
            </a>
          ) : null}
        </span>
      </span>
      {imageSrc ? (
        <span className="signatureProjectCard__media">
          <img src={imageSrc} alt={imageAlt} loading="lazy" decoding="async" />
        </span>
      ) : null}
    </article>
  );
}
