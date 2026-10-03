import { HeroCtas } from "./hero-ctas";
import { FadeIn, ScaleUnblur } from "@/components/ui/motion-primitives";
import { SpotlightImage } from "./spotlight-image";

const PORTRAIT_SRC = "/images/profile.png";

export function Hero() {
  return (
    <section className="relative w-full">
      <div className="mx-auto w-[calc(100%-2rem)] max-w-[1080px] pt-44 pb-24 sm:pt-56 sm:pb-32">
        <div className="grid grid-cols-1 items-center gap-8 md:grid-cols-2 md:gap-8">
          <FadeIn className="flex flex-col gap-4">
            <p className="text-[20px] font-medium leading-tight tracking-tight text-foreground">
              Hey
              <span aria-hidden="true" className="mx-0.5">
                👋
              </span>
              , I&rsquo;m Josh
            </p>

            <h1 className="text-[2.75rem] font-medium leading-[1.05] tracking-tight text-foreground md:text-[2.5rem] lg:text-[3.65rem]">
              <span className="block whitespace-nowrap">
                Design engineer &
              </span>
              <span className="block whitespace-nowrap">
                AI enthusiast
              </span>
            </h1>

            <p className="max-w-[34ch] text-[22px] leading-[1.4] tracking-tight text-foreground/65">
              Independent engineer focused on interfaces that feel calm,
              considered, and quietly fast.
            </p>

            <HeroCtas />
          </FadeIn>

          <ScaleUnblur className="flex justify-stretch md:justify-end">
            <div className="relative aspect-square w-full md:max-w-105">
              <SpotlightImage
                src={PORTRAIT_SRC}
                alt="Dhafin Aksanidra portrait"
              />
            </div>
          </ScaleUnblur>
        </div>
      </div>
    </section>
  );
}