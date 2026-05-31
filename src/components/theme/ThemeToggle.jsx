const options = [
  { value: 'light', label: 'Light' },
  { value: 'dark', label: 'Dark' },
];

export function ThemeToggle({ resolvedTheme, setPreference }) {
  return (
    <div
      className="themeToggle"
      role="group"
      aria-label={`Theme preference. Current theme is ${resolvedTheme}.`}
    >
      {options.map((option) => (
        <button
          key={option.value}
          type="button"
          className="themeToggle__option"
          aria-pressed={resolvedTheme === option.value}
          data-active={resolvedTheme === option.value ? 'true' : 'false'}
          onClick={() => setPreference(option.value)}
        >
          {option.label}
        </button>
      ))}
    </div>
  );
}
