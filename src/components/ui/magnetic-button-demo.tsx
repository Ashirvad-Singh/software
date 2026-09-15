import { useState } from "react";
import { MagneticButton } from "@/components/ui/magnetic-button";

export default function MagneticButtonDemo() {
  const [clicked, setClicked] = useState(false);
  return <div className="flex h-[40rem] w-full items-center justify-center">
    <MagneticButton><button type="button" className="site-button" onClick={() => setClicked(!clicked)}>{clicked ? "Thanks for trying!" : "Try the magnetic button"}</button></MagneticButton>
  </div>;
}
