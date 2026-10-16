import { ArrowRight, Bot, Compass, Layers, LineChart, Sparkles, Wand2, } from "lucide-react";
import { Link } from "react-router-dom";
import { FadeIn } from "@/components/ui/motion-primitives";
const PROJECTS = [
  {
    id: "it-governance",
    icon: Layers,
    iconLabel: "IT Governance",
    title: "IT Governance Analysis and Design",
    description:
      "Assessed IT governance practices using COBIT 2019, identified capability gaps, and developed 24 prioritized improvement recommendations across people, process, and technology.",
    meta: "COBIT 2019 · APO11, APO12, EDM03",
    imageRatio: 16 / 9,
    image: "/images/projects/it-governance.png",
    imageAlt: "IT governance assessment and improvement recommendations",
  },
  {
    id: "enterprise-architecture",
    icon: Compass,
    iconLabel: "Enterprise Architecture",
    title: "Enterprise Architecture Design",
    description:
      "Designed an enterprise architecture for PT Hiro Group using TOGAF, modeled as-is and to-be business processes, and identified gaps across four architecture domains.",
    meta: "TOGAF · BPMN · Architecture Modeling",
    imageRatio: 16 / 9,
    image: "/images/projects/enterprise-architecture.png",
    imageAlt: "Enterprise architecture models and business process diagrams",
  },
  {
    id: "risk-management",
    icon: LineChart,
    iconLabel: "Risk Management",
    title: "Risk Management Analysis and Design",
    description:
      "Identified and assessed 10 risk scenarios using ISO 31000:2018, prioritized risks through likelihood and impact analysis, and developed risk treatment recommendations.",
    meta: "ISO 31000:2018 · Risk Assessment",
    imageRatio: 16 / 9,
    image: "/images/projects/risk-management.png",
    imageAlt: "Risk assessment matrix and risk treatment planning",
  },
  {
    id: "ea-implementation",
    icon: Bot,
    iconLabel: "Enterprise Architecture Implementation",
    title: "Enterprise Architecture for Digital Transportation",
    description:
      "Designed a target architecture for PT Sinar Jaya's digital transformation, covering integrated ticketing, customer relationship management, fleet operations, and migration planning.",
    meta: "TOGAF · ArchiMate · Gap Analysis · Roadmap",
    imageRatio: 16 / 9,
    image: "/images/projects/ea-transportation.png",
    imageAlt: "Enterprise architecture design for digital transportation services",
  },
];
export function Projects({ withHeadline = false, viewMoreVisible = false, }) {
    const items = viewMoreVisible ? PROJECTS.slice(0, 4) : PROJECTS;
    return (<section className="relative w-full">
      <div className="mx-auto w-full max-w-[1280px] px-6 sm:px-10">
        {withHeadline ? (<FadeIn className="flex flex-col items-center gap-5 pt-12 pb-10 text-center sm:pt-20 sm:pb-14">
            <h2 className="font-serif text-[2.5rem] font-medium leading-[1.05] tracking-tight text-foreground md:text-[3rem] lg:text-[3.5rem]">
              My projects
            </h2>
            <p className="text-[18px] leading-[1.45] tracking-tight text-foreground/65 sm:text-[20px]">
              <span className="block">
                Selected projects in IT governance, enterprise architecture,
              </span>
              <span className="block">
                and risk management, focused on aligning business needs with technology.
              </span>
            </p>
          </FadeIn>) : null}

          <div className="grid grid-cols-1 items-stretch gap-5 md:grid-cols-2 md:gap-6">
            {items.map((project, index) => (
              <ProjectCard
                key={project.id}
                project={project}
                index={index}
              />
            ))}
          </div>

        {viewMoreVisible ? (<div className="mt-12 flex justify-center sm:mt-16">
            <Link to="/projects" className="border border-foreground/8 focus-ring group inline-flex cursor-pointer items-center gap-2 rounded-xl bg-background px-5 py-2.5 text-sm font-medium text-foreground transition-colors hover:bg-foreground/5">
              View all projects
              <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5" aria-hidden="true"/>
            </Link>
          </div>) : null}
      </div>
    </section>);
}
function ProjectCard({ project, index }) {
  const Icon = project.icon;

  return (
    <FadeIn
      delay={Math.min(index * 0.06, 0.3)}
      className="h-full min-w-0"
    >
      <article className="project-card flex h-full flex-col gap-4 rounded-3xl border border-foreground/8 bg-background p-3 sm:p-3.5">
        <header className="flex items-center gap-2.5 px-1 pt-2">
          <span className="inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-lg border border-foreground/10 bg-background">
            <Icon
              className="h-3.5 w-3.5 text-foreground"
              aria-hidden="true"
            />
          </span>

          <span className="text-sm font-medium tracking-tight text-foreground">
            {project.iconLabel}
          </span>
        </header>

        <div
          className="project-card__image relative aspect-[16/9] w-full shrink-0 overflow-hidden rounded-2xl bg-foreground/5 ring-1 ring-foreground/5"
        >
          <div className="project-card__image-inner">
            <img
              src={project.image}
              alt={project.imageAlt}
              loading={index < 2 ? "eager" : "lazy"}
              className="absolute inset-0 h-full w-full object-cover"
            />
          </div>
        </div>

        <div className="flex flex-1 flex-col gap-2.5 px-1">
          <h3 className="text-[20px] font-medium leading-[1.2] tracking-tight text-foreground sm:text-[22px]">
            {project.title}
          </h3>

          <p className="text-[14px] leading-normal tracking-tight text-foreground/65 sm:text-[15px]">
            {project.description}
          </p>
        </div>

        <p className="mt-auto px-1 pb-2 text-[12px] tracking-tight text-foreground/50">
          {project.meta}
        </p>
      </article>
    </FadeIn>
  );
}
