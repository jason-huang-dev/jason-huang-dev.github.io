import type { ReactNode } from "react";

type ProjectDetailSectionProps = {
  title: string;
  children?: ReactNode;
};

export function ProjectDetailSection({
  title,
  children,
}: ProjectDetailSectionProps) {
  if (!children) return null;

  return (
    <section className="projectDetailSection">
      <h3>{title}</h3>
      {children}
    </section>
  );
}
