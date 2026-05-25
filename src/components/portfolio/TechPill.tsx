type TechPillProps = {
  children: string;
};

export function TechPill({ children }: TechPillProps) {
  return <span className="techPill">{children}</span>;
}
