import { Education } from "@/components/about/education";
import { Experience } from "@/components/about/experience";
import { Skills } from "@/components/about/skills";
import { Stack } from "@/components/about/stack";
import Lanyard from "@/components/about/lanyard";
import { FadeIn } from "@/components/ui/motion-primitives";

export default function AboutPage() {
  return (
    <main id="main-content" className="flex flex-1 flex-col">
      {/* About Intro */}
      <section className="mx-auto w-full max-w-[1155px] px-6 pt-25 pb-16 sm:px-10 sm:pt-30 sm:pb-20">
        <FadeIn>
          <div className="overflow-hidden rounded-4xl border border-foreground/8 bg-background">
            <div className="grid min-h-[560px] md:grid-cols-[0.95fr_1.05fr]">
              {/* About Content */}
              <div className="flex flex-col justify-center p-7 sm:p-10 md:p-12">
                <div className="max-w-[30rem]">
                  <p className="mb-4 text-sm font-medium tracking-tight text-foreground/50">
                    About Me
                  </p>

                  <h1 className="font-serif text-[2.5rem] font-medium leading-[1.05] tracking-tight text-foreground sm:text-[3rem] lg:text-[3.5rem]">
                    Hi, I&rsquo;m{" "}
                    <span className="border-b border-foreground/30 pb-1">
                      Dhafin Aksanidra
                    </span>
                    .
                  </h1>

                  <div className="mt-6 space-y-4 text-[15px] leading-[1.65] tracking-tight text-foreground/65 sm:text-[16px]">
                    <p>
                      I&rsquo;m an Information Systems student with an interest
                      in building digital products and understanding how
                      technology supports business processes.
                    </p>

                    <p>
                      My experience combines{" "}
                      <strong className="font-semibold text-foreground">
                        full-stack development
                      </strong>{" "}
                      with{" "}
                      <strong className="font-semibold text-foreground">
                        business process and IT governance
                      </strong>
                      , allowing me to approach projects from both technical
                      and business perspectives.
                    </p>

                    <p>
                      I enjoy turning ideas and requirements into practical,
                      structured, and usable digital solutions.
                    </p>
                  </div>

                  {/* Quick Info */}
                  <div className="mt-8 grid max-w-[28rem] grid-cols-2 gap-6 border-t border-foreground/8 pt-6">
                    <div>
                      <p className="text-xl font-medium tracking-tight text-foreground sm:text-2xl">
                        Full-Stack
                      </p>
                      <p className="mt-1 text-xs tracking-tight text-foreground/50 sm:text-sm">
                        Development
                      </p>
                    </div>

                    <div>
                      <p className="text-xl font-medium tracking-tight text-foreground sm:text-2xl">
                        IT Business
                      </p>
                      <p className="mt-1 text-xs tracking-tight text-foreground/50 sm:text-sm">
                        Analyst
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Lanyard */}
              <div className="relative min-h-[420px] border-t border-foreground/8 md:min-h-[560px] md:border-t-0 md:border-l">
                <Lanyard frontImage="/images/profile.png" />
              </div>
            </div>
          </div>
        </FadeIn>
      </section>

      {/* Experience, Education, Skills, Stack */}
      <section className="mx-auto w-full max-w-[52rem] px-6 pb-20 sm:px-10 sm:pb-28">
        <FadeIn delay={0.1}>
          <div className="flex flex-col gap-10">
            <Experience />
            <Education />
            <Skills />
            <Stack />
          </div>
        </FadeIn>
      </section>

      <div className="h-12 sm:h-16" />
    </main>
  );
}