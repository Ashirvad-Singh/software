import { BackgroundRippleEffect } from "@/components/ui/background-ripple-effect";

export default function BackgroundRippleEffectDemo() {
  return <div className="relative isolate flex min-h-screen w-full flex-col items-center justify-center overflow-hidden bg-white">
    <BackgroundRippleEffect />
    <h2 className="max-w-4xl text-center text-4xl font-bold text-neutral-800">Interactive Background Boxes Ripple Effect</h2>
    <p className="mt-4 text-neutral-600">Move your mouse over the grid and click to create a ripple.</p>
  </div>;
}
