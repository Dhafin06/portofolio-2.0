import { CertificationList } from "@/components/certifications/certification-list";
import { FadeIn } from "@/components/ui/motion-primitives";
import TextType from "@/components/effects/TextType";

export default function CertificationsPage() {
  return (
    <main id="main-content" className="flex flex-1 flex-col">
      <section className="mx-auto w-full max-w-275 px-6 pt-30 pb-12 sm:px-10 sm:pt-60 sm:pb-16">
        <FadeIn className="flex flex-col items-center gap-5 text-center">
          <TextType
            as="h1"
            text="Certifications"
            className="font-sans text-[2.75rem] font-medium leading-[1.05] tracking-tight text-foreground md:text-[3.25rem] lg:text-[3.75rem]"
            typingSpeed={60}
            initialDelay={300}
            cursorStyle="bar"
            loop={false}
            showCursor={true}
            cursorGlide={true}
          />
          <p className="max-w-[36ch] text-[20px] leading-[1.4] tracking-tight text-foreground/65 sm:text-[22px]">
            Professional credentials and English proficiency that support my
            work across business and technology.
          </p>
        </FadeIn>
      </section>

      <CertificationList />

      <div className="h-12 sm:h-16" />
    </main>
  );
}