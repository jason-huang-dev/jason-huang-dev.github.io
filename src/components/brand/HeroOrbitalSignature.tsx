import { SignatureEmblem } from "./SignatureEmblem";

export type HeroOrbitalSignatureProps = {
  className?: string;
};

export function HeroOrbitalSignature({
  className = "",
}: HeroOrbitalSignatureProps) {
  return (
    <div className={`heroOrbitalSignature ${className}`}>
      <SignatureEmblem glow="gold" />
    </div>
  );
}
