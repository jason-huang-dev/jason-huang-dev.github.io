export type ProjectFilterChipsProps = {
  filters: string[];
  activeFilter: string;
  resultCount: number;
  onChange: (filter: string) => void;
};

export function ProjectFilterChips({
  filters,
  activeFilter,
  resultCount,
  onChange,
}: ProjectFilterChipsProps) {
  return (
    <div className="projectFilters" aria-label="Filter projects">
      <div className="projectFilters__chips">
        {filters.map((filter) => (
          <button
            key={filter}
            type="button"
            aria-pressed={activeFilter === filter}
            onClick={() => onChange(filter)}
          >
            {filter}
          </button>
        ))}
      </div>
      <p className="projectFilters__count" aria-live="polite">
        {resultCount} {resultCount === 1 ? "project" : "projects"}
      </p>
    </div>
  );
}
