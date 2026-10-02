import { ContactCard } from "@/components/contact/contact-card";
import { FadeIn } from "@/components/ui/motion-primitives";

export default function ContactPage() {
  return (
    <main id="main-content" className="flex flex-1 flex-col">
      <section className="mx-auto w-full max-w-275 px-6 pt-44 pb-10 sm:px-10 sm:pt-52 sm:pb-16">
        <FadeIn className="flex flex-col items-center gap-5 text-center">
          <h1 className="font-serif text-[2.75rem] font-medium leading-[1.05] tracking-tight text-foreground md:text-[3.25rem] lg:text-[3.75rem]">
            Let&apos;s connect
          </h1>
          <p className="max-w-[33ch] text-[20px] leading-[1.4] tracking-tight text-foreground/65 sm:text-[22px]">
            Have a project, opportunity, or idea in mind? Feel free to reach out.
          </p>
        </FadeIn>
      </section>
      <ContactCard />
      <div className="h-12 sm:h-16" />
    </main>
  );
}
