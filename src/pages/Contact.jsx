import { ContactCard } from "@/components/contact/contact-card";
import { FadeIn } from "@/components/ui/motion-primitives";
import { ContactCardCtas } from "@/components/contact/contact-card-ctas";

export default function ContactPage() {
  return (
    <main
      id="main-content"
      className="flex flex-1 flex-col"
    >
      <section className="mx-auto w-full max-w-[1180px] px-6 pt-36 pb-16 sm:px-10 sm:pt-44 lg:px-12 lg:pt-48">
        <div className="grid items-end gap-12 lg:grid-cols-[1.15fr_0.85fr] lg:gap-20">
          {/* Heading */}
          <FadeIn className="flex flex-col gap-6">
            <span className="text-xs font-medium uppercase tracking-[0.18em] text-foreground/50">
              Get in touch
            </span>

            <h1 className="max-w-[8ch] text-[4.5rem] font-semibold leading-[0.9] tracking-[-0.055em] text-foreground sm:text-[5.5rem] lg:text-[6.5rem]">
              Let&apos;s work together.
            </h1>

            <p className="max-w-[34rem] text-base leading-7 text-foreground/60 sm:text-lg">
              Have a project, opportunity, or idea in mind? Feel free to
              reach out. I&apos;m always open to discussing new
              opportunities and meaningful work.
            </p>

            <ContactCardCtas />
          </FadeIn>

          {/* Contact Information */}
          <FadeIn
            delay={0.1}
            className="w-full"
          >
            <ContactCard />
          </FadeIn>
        </div>
      </section>

      <div className="h-8 sm:h-12" />
    </main>
  );
}