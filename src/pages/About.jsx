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
            <div className="grid min-h-[480px] grid-cols-1 md:grid-cols-[1.15fr_0.85fr]">
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

                <div className="mt-6 max-w-[36rem] text-[14px] leading-[1.8] tracking-normal text-foreground/65 sm:text-[15px]">
                  <p>
                    I&rsquo;m an Information Systems graduate from Telkom University with
                    project experience in enterprise architecture using TOGAF, IT governance
                    using COBIT 2019, and risk management using ISO 31000. Through my academic
                    projects and experience as a Teaching Assistant and Tools Coordinator at
                    the System Architecture and Governance Laboratory, I&rsquo;ve developed
                    an interest in business analysis, IT governance, and aligning technology
                    solutions with organizational goals.
                  </p>
                </div>

                  {/* Quick Info */}
                  <div className="mt-8 grid max-w-[28rem] grid-cols-2 gap-6 border-t border-foreground/8 pt-6">
                    <div>
                      <p className="text-xl font-medium tracking-tight text-foreground sm:text-2xl">
                        IT Governance
                      </p>
                      <p className="mt-1 text-xs tracking-tight text-foreground/50 sm:text-sm">
                        Risk & Quality
                      </p>
                    </div>

                    <div>
                      <p className="text-xl font-medium tracking-tight text-foreground sm:text-2xl">
                        Enteprise 
                      </p>
                      <p className="mt-1 text-xs tracking-tight text-foreground/50 sm:text-sm">
                        Arhitecture
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Lanyard */}
              <div className="relative h-[420px] min-w-0 border-t border-foreground/8 md:h-[560px] md:border-t-0 md:border-l">
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