import { Mail } from "lucide-react";
import { FadeIn } from "@/components/ui/motion-primitives";
import { ShaderFlow } from "@/components/shaders/shader-flow";
import { FooterCtas } from "./footer-ctas";

const CARD_FADE_MASK =
  "radial-gradient(ellipse 90% 110% at 50% 50%, rgba(0,0,0,1) 0%, rgba(0,0,0,0.92) 40%, rgba(0,0,0,0.7) 70%, rgba(0,0,0,0.4) 90%, rgba(0,0,0,0.15) 100%)";

const SOCIAL_LINKS = [
  {
    href: "mailto:aksanidradhafin05@gmail.com",
    label: "Email",
    lucideIcon: Mail,
  },
  {
    href: "#",
    label: "LinkedIn",
    imageSrc: "/icons/linkedin.svg",
  },
  {
    href: "#",
    label: "GitHub",
    imageSrc: "/icons/github.svg",
  },
];

export function Footer() {
  return (
    <footer className="mx-auto w-full max-w-275 px-6 pb-24 pt-12 sm:px-10 sm:pb-32 sm:pt-20">      <FadeIn>
        <div className="relative w-full overflow-hidden rounded-4xl border border-foreground/8 bg-background p-1.5 shadow-sm">
          <div className="relative w-full overflow-hidden rounded-[1.6rem]">
            <div
              aria-hidden="true"
              className="pointer-events-none absolute inset-0 opacity-45 dark:opacity-25"
              style={{
                WebkitMaskImage: CARD_FADE_MASK,
                maskImage: CARD_FADE_MASK,
              }}
            >
              <ShaderFlow scale={3} brightness={3} />
            </div>

            <div className="relative grid gap-8 p-6 sm:gap-10 sm:p-7 md:grid-cols-[1.2fr_1fr] md:items-stretch md:gap-6 md:p-6">
              <div className="flex flex-col gap-5">
                <h2 className="font-serif text-[2.25rem] font-medium leading-[1.05] tracking-tight text-foreground sm:text-[2.75rem] lg:text-[3.25rem]">
                  Let&rsquo;s work together
                </h2>

                <p className="mb-6 max-w-[29ch] text-[18px] leading-[1.4] tracking-tight text-foreground/65 sm:text-[22px]">
                  I&rsquo;m open to opportunities, collaborations, and
                  interesting projects. Feel free to get in touch.
                </p>

                <FooterCtas />
              </div>

              <div className="flex flex-col items-center justify-center gap-6 rounded-[1.1rem] border border-foreground/8 bg-background p-6 sm:p-8">
                <div className="flex items-center gap-3 opacity-75">
                  {SOCIAL_LINKS.map((item) => (
                    <SocialIcon key={item.label} {...item} />
                  ))}
                </div>

                <div className="flex flex-col items-center gap-1 text-center">
                  <p className="text-[13px] tracking-tight text-foreground/70">
                    © 2026 Dhafin Aksanidra
                  </p>

                  <p className="text-[12px] tracking-tight text-foreground/45">
                    Built with React + Vite
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </FadeIn>
    </footer>
  );
}

function SocialIcon({
  href,
  label,
  lucideIcon: LucideIcon,
  imageSrc,
}) {
  const isExternal = href.startsWith("http");

  const props = isExternal
    ? {
        target: "_blank",
        rel: "noopener noreferrer",
      }
    : {};

  return (
    <a
      href={href}
      aria-label={label}
      className="focus-ring inline-flex h-11 w-11 items-center justify-center rounded-xl border border-foreground/8 bg-background text-foreground/70 transition-colors hover:border-foreground/15 hover:text-foreground"
      {...props}
    >
      {LucideIcon ? (
        <LucideIcon
          className="h-4 w-4"
          strokeWidth={2.5}
          aria-hidden="true"
        />
      ) : imageSrc ? (
        <img
          src={imageSrc}
          alt=""
          width="14"
          height="14"
          aria-hidden="true"
          className="max-h-[14px] max-w-[14px] object-contain dark:invert"
        />
      ) : null}
    </a>
  );
}