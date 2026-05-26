import { ChineseAccentText } from "./ChineseAccentText";
import { SignatureEmblem } from "./SignatureEmblem";

export type HeroOrbitalSignatureProps = {
  className?: string;
};

export function HeroOrbitalSignature({
  className = "",
}: HeroOrbitalSignatureProps) {
  return (
    <div className={`heroOrbitalSignature ${className}`}>
      <span className="heroOrbitalSignature__ring heroOrbitalSignature__ring--outer" />
      <span className="heroOrbitalSignature__ring heroOrbitalSignature__ring--middle" />
      <span className="heroOrbitalSignature__orbit heroOrbitalSignature__orbit--one">
        <span className="heroOrbitalSignature__bead heroOrbitalSignature__bead--water" />
      </span>
      <span className="heroOrbitalSignature__orbit heroOrbitalSignature__orbit--two">
        <span className="heroOrbitalSignature__bead heroOrbitalSignature__bead--gold" />
      </span>
      <span className="heroOrbitalSignature__orbit heroOrbitalSignature__orbit--three">
        <span className="heroOrbitalSignature__bead heroOrbitalSignature__bead--jade" />
      </span>
      <SignatureEmblem glow="gold" />
      <ChineseAccentText />
    </div>
  );
}
