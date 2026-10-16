
import { HeroCtas } from "./hero-ctas";
import { FadeIn, ScaleUnblur } from "@/components/ui/motion-primitives";
import { HeroProfileCard } from "./profile-card";

export function Hero() {
  return (
    <section className="relative w-full">
      <div className="mx-auto w-[calc(100%-2rem)] max-w-[1080px] pt-40 pb-16 sm:pt-55 sm:pb-24">
        <div className="grid grid-cols-1 items-center gap-10 md:grid-cols-[1.1fr_0.9fr] md:gap-12">
          <FadeIn className="flex flex-col items-start gap-4">
            <p className="text-lg font-medium leading-tight tracking-tight text-foreground/70">
              Hi, I’m
            </p>

            <h1 className="text-5xl font-semibold leading-[1.05] tracking-tight text-foreground sm:text-6xl lg:text-7xl">
              Dhafin Aksanidra
            </h1>

            <p className="max-w-[34ch] text-lg leading-relaxed tracking-tight text-foreground/65 sm:text-xl">
              IT Governance & Enterprise Architecture Enthusiast
            </p>

            <HeroCtas />
          </FadeIn>

          <ScaleUnblur className="flex justify-center md:justify-end">
            <HeroProfileCard />
          </ScaleUnblur>
        </div>
      </div>
    </section>
  );
}
