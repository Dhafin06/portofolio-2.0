
import { CircleCheck } from "lucide-react";
import { lazy, Suspense } from "react";

const Lanyard = lazy(
  () => import("@/components/effects/Lanyard")
);

const currentFocus = [
  {
    title: "Exploring",
    description:
      "Business analysis, IT governance, and enterprise architecture.",
  },
  {
    title: "Learning",
    description:
      "Deepening knowledge of TOGAF and COBIT 2019.",
  },
  {
    title: "Building",
    description:
      "Process models, architecture designs, and risk recommendations.",
  },
];

function ProfileStats() {
  return (
    <div className="grid w-full max-w-[620px] grid-cols-[0.4fr_0.5fr_1.4fr] gap-2 sm:gap-3">
      <div className="min-w-0">
        <p className="text-sm font-medium text-white">
          Projects
        </p>
        <p className="mt-2 text-2xl font-semibold leading-none tracking-tight text-white tabular-nums sm:text-3xl">
          04
        </p>
      </div>

      <div className="min-w-0">
        <p className="text-sm font-medium text-white">
          Certificates
        </p>
        <p className="mt-2 text-2xl font-semibold leading-none tracking-tight text-white tabular-nums sm:text-3xl">
          02
        </p>
      </div>

      <div className="min-w-0">
        <p className="text-sm font-medium text-white">
          Telkom University Graduated
        </p>
        <p className="mt-2 text-2xl font-semibold leading-none tracking-tight text-white tabular-nums sm:text-3xl">
          2026
        </p>
      </div>
    </div>
  );
}

function CurrentlySection() {
  return (
    <div className="mt-8">
      <p className="text-[10px] font-medium uppercase tracking-[0.18em] text-foreground/45">
        Currently
      </p>

      <div className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-3 lg:grid-cols-1 xl:grid-cols-3">
        {currentFocus.map((item) => (
          <div key={item.title} className="min-w-0">
            <h2 className="text-sm font-medium tracking-tight text-foreground">
              {item.title}
            </h2>

            <p className="mt-1 text-xs leading-5 text-foreground/55">
              {item.description}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default function AboutIntro() {
  return (
    <section className="mx-auto w-full max-w-[1280px] px-5 pb-12 pt-28 sm:px-8 sm:pb-16 sm:pt-32 lg:px-10">
      <div className="overflow-hidden rounded-2xl border border-foreground/10 bg-background">
        <div className="grid grid-cols-1 lg:grid-cols-[1.3fr_0.7fr]">
          {/* About Content */}
          <div className="flex min-w-0 flex-col justify-center p-6 sm:p-9 lg:p-12">
            <p className="text-[10px] font-medium uppercase tracking-[0.2em] text-foreground/45">
              About Me
            </p>

            <div className="flex flex-wrap items-center gap-2">
              <h1 className="text-4xl font-semibold leading-tight tracking-tight text-foreground sm:text-5xl lg:text-6xl">
                Dhafin Aksanidra
              </h1>

              <CircleCheck
                aria-label="Verified"
                className="mt-3 size-7 shrink-0 fill-blue-500 text-white sm:size-9"
              />
            </div>

            <div className="mt-8">
              <ProfileStats />
            </div>

            {/* Introduction */}
            <div className="mt-6 max-w-3xl">
              <p className="text-sm leading-7 text-foreground/65 sm:text-[15px] sm:leading-8">
                I&rsquo;m an Information Systems graduate from Telkom
                University with project experience in enterprise architecture
                using TOGAF, IT governance using COBIT 2019, and risk
                management using ISO 31000. Through my academic projects and
                experience as a Teaching Assistant and Tools Coordinator at
                the System Architecture and Governance Laboratory, I&rsquo;ve
                developed an interest in business analysis, IT governance,
                and aligning technology solutions with organizational goals.
              </p>
            </div>

            <CurrentlySection />
          </div>

          {/* React Bits Lanyard */}
          <div className="relative min-h-[440px] min-w-0 border-t border-foreground/10 sm:min-h-[520px] lg:min-h-[600px] lg:border-l lg:border-t-0">
            <Suspense
                fallback={
                <div
                    className="h-full min-h-[440px] sm:min-h-[520px] lg:min-h-[600px]"
                    aria-label="Loading interactive 3D profile"
                />
                }
            >
                <Lanyard
                frontImage="/images/profile.webp"
                strapImage= "/images/lanyard.webp"
                imageFit="cover"
                orientation="portrait"
                finish="matte"
                size={0.35}
                anchor="center"
                strapLength={0.55}
                strapColor="#111111"
                strapWidth={0.65}
                metal="graphite"
                gravity={1}
                damping={0.5}
                elasticity={0.5}
                breeze={0.5}
                interactive={true}
                intro={true}
                className="h-full w-full"
                />
            </Suspense>
            </div>
        </div>
      </div>
    </section>
  );
}