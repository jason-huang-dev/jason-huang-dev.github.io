import type { ComponentType } from "react";

import { usePointerGlow } from "../../hooks/usePointerGlow";

export type SystemItem = {
  icon: ComponentType<{ "aria-hidden"?: boolean }>;
  title: string;
  body: string;
  proof?: string;
  accent?: "water" | "gold" | "jade";
};

export type InteractiveSystemCardProps = {
  item: SystemItem;
  index?: number;
};

export function InteractiveSystemCard({ item }: InteractiveSystemCardProps) {
  const ref = usePointerGlow<HTMLElement>();
  const Icon = item.icon;

  return (
    <article
      ref={ref}
      className="systemCard systemCard--interactive"
      data-accent={item.accent ?? "water"}
      tabIndex={0}
    >
      <span className="systemCard__medallion">
        <Icon aria-hidden="true" />
      </span>
      <h3>{item.title}</h3>
      <p>{item.body}</p>
      {item.proof ? <strong>{item.proof}</strong> : null}
    </article>
  );
}
