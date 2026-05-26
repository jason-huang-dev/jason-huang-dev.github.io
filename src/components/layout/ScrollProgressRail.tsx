import { useActiveSection } from "../../hooks/useActiveSection";

export type ScrollProgressSection = {
  id: string;
  label: string;
};

export type ScrollProgressRailProps = {
  sections: ScrollProgressSection[];
};

export function ScrollProgressRail({ sections }: ScrollProgressRailProps) {
  const activeId = useActiveSection(sections.map((section) => section.id));

  return (
    <nav className="scrollProgressRail" aria-label="Section navigation">
      {sections.map((section) => (
        <a
          key={section.id}
          href={`/#${section.id}`}
          className={activeId === section.id ? "is-active" : ""}
          aria-current={activeId === section.id ? "true" : undefined}
        >
          <span className="scrollProgressRail__dot" aria-hidden="true" />
          <span className="scrollProgressRail__label">{section.label}</span>
        </a>
      ))}
    </nav>
  );
}
