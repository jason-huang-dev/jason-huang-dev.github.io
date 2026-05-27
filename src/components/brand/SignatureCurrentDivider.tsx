export type SignatureCurrentDividerTone =
  | "balanced"
  | "blue"
  | "gold"
  | "quiet";

export type SignatureCurrentDividerProps = {
  tone?: SignatureCurrentDividerTone;
  label?: string;
  align?: "left" | "center" | "right";
  density?: "compact" | "normal" | "cinematic";
  className?: string;
};

function cx(...classes: Array<string | undefined | false>) {
  return classes.filter(Boolean).join(" ");
}

export function SignatureCurrentDivider({
  tone = "balanced",
  label,
  align = "center",
  density = "normal",
  className,
}: SignatureCurrentDividerProps) {
  return (
    <div
      className={cx(
        "signatureCurrentDivider",
        `signatureCurrentDivider--${tone}`,
        `signatureCurrentDivider--${align}`,
        `signatureCurrentDivider--${density}`,
        className,
      )}
    >
      <span className="signatureCurrentDivider__line" aria-hidden="true">
        <span className="signatureCurrentDivider__current signatureCurrentDivider__current--blue" />
        <span className="signatureCurrentDivider__current signatureCurrentDivider__current--gold" />
        <span className="signatureCurrentDivider__glint" />
      </span>
      {label ? (
        <span className="signatureCurrentDivider__label">{label}</span>
      ) : null}
    </div>
  );
}
