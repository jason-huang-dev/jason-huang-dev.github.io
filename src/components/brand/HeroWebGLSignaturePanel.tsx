import { ChineseAccentText } from "./ChineseAccentText";
import { SignatureEmblem } from "./SignatureEmblem";
import { SignatureFluidCanvas } from "../webgl/signature/SignatureFluidCanvas";

export function HeroWebGLSignaturePanel() {
  return (
    <div className="heroWebGLSignaturePanel">
      <SignatureFluidCanvas />

      <span className="heroWebGLSignaturePanel__ring heroWebGLSignaturePanel__ring--outer" />
      <span className="heroWebGLSignaturePanel__ring heroWebGLSignaturePanel__ring--inner" />

      <span className="heroWebGLSignaturePanel__pearl heroWebGLSignaturePanel__pearl--large" />
      <span className="heroWebGLSignaturePanel__pearl heroWebGLSignaturePanel__pearl--gold" />
      <span className="heroWebGLSignaturePanel__pearl heroWebGLSignaturePanel__pearl--water" />
      <span className="heroWebGLSignaturePanel__pearl heroWebGLSignaturePanel__pearl--jade" />

      <SignatureEmblem
        className="heroWebGLSignaturePanel__signature"
        glow="gold"
      />
      <ChineseAccentText />
    </div>
  );
}
