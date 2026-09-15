import { BackgroundBeams } from "@/components/ui/background-beams";

export default function BackgroundBeamsDemo() {
  return (
    <div className="relative isolate flex h-[40rem] w-full items-center justify-center overflow-hidden rounded-md bg-neutral-950">
      <BackgroundBeams className="-z-10" />
      <div className="mx-auto max-w-2xl p-4 text-center">
        <h2 className="bg-gradient-to-b from-neutral-200 to-neutral-600 bg-clip-text text-4xl font-bold text-transparent md:text-7xl">Background Beams</h2>
        <p className="mx-auto my-4 max-w-lg text-sm text-neutral-400">Soft animated beams flow across the background.</p>
      </div>
    </div>
  );
}
