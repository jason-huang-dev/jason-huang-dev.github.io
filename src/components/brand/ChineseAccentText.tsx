type ChineseAccentTextProps = {
  text?: string;
  className?: string;
};

export function ChineseAccentText({
  text = "水静则明",
  className = "",
}: ChineseAccentTextProps) {
  return (
    <span className={`chineseAccent ${className}`} aria-hidden="true">
      {text}
    </span>
  );
}
