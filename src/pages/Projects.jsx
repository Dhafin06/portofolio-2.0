import { Projects } from "@/components/projects/projects";
import { FadeIn } from "@/components/ui/motion-primitives";
import TextType from "@/components/effects/TextType";
export default function ProjectsPage() {
    return (<main id="main-content" className="flex flex-1 flex-col">
      <section className="mx-auto w-full max-w-275 px-6 pt-30 pb-16 sm:px-10 sm:pt-60 sm:pb-20">
        <FadeIn className="flex flex-col items-center gap-5 text-center">
          <TextType
            as="h1"
            text="My recent work"
            className="font-sans text-[2.75rem] font-medium leading-[1.05] tracking-tight text-foreground md:text-[3.25rem] lg:text-[3.75rem]"
            typingSpeed={60}
            initialDelay={300}
            cursorStyle="bar"
            loop={false}
            showCursor={true}
            cursorGlide={true}
          />
          <p className="max-w-[33ch] text-[20px] leading-[1.4] tracking-tight text-foreground/65 sm:text-[22px]">
            Experiments, collaborations, and projects I&rsquo;m especially proud to have shipped.
          </p>
        </FadeIn>
      </section>
      <Projects />
      <div className="h-12 sm:h-16"/>
    </main>);
}
