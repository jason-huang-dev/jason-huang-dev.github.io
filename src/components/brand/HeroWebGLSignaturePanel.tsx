import { SignatureEmblem } from "./SignatureEmblem";
import { SignatureFluidCanvas } from "../webgl/signature/SignatureFluidCanvas";

export function HeroWebGLSignaturePanel() {
  return (
    <div className="heroWebGLSignaturePanel">
      <SignatureFluidCanvas />

      <SignatureEmblem
        className="heroWebGLSignaturePanel__signature"
        glow="gold"
      />
    </div>
  );
}
