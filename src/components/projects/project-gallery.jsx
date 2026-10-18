
import { useState } from "react";
import { ArrowUpRight } from "lucide-react";
import { Link } from "react-router-dom";
import DepthCarousel from "@/components/effects/DepthCarousel";

const PROJECTS = [
  {
    id: "it-governance",
    category: "IT Governance",
    title: "IT Governance Analysis and Design",
    description:
      "Assessed IT governance practices using COBIT 2019, identified capability gaps, and developed prioritized improvement recommendations across people, process, and technology.",
    tags: ["COBIT 2019", "APO11", "APO12", "EDM03"],
    image: "/images/projects/it-governance.png",
    alt: "IT governance assessment and improvement recommendations",
  },
  {
    id: "enterprise-architecture",
    category: "Enterprise Architecture",
    title: "Enterprise Architecture Design",
    description:
      "Designed an enterprise architecture for PT Hiro Group using TOGAF, modeled business processes, and identified gaps across four architecture domains.",
    tags: ["TOGAF", "BPMN", "Architecture Modeling"],
    image: "/images/projects/enterprise-architecture.png",
    alt: "Enterprise architecture and business process models",
  },
  {
    id: "risk-management",
    category: "Risk Management",
    title: "Risk Management Analysis and Design",
    description:
      "Assessed 10 risk scenarios using ISO 31000:2018, prioritized risks through likelihood and impact analysis, and developed risk treatment recommendations.",
    tags: ["ISO 31000:2018", "Risk Assessment"],
    image: "/images/projects/risk-management.png",
    alt: "Risk assessment matrix and risk treatment planning",
  },
  {
    id: "ea-transportation",
    category: "Enterprise Architecture",
    title: "Enterprise Architecture for Digital Transportation",
    description:
      "Designed a target architecture for digital transportation services, covering integrated ticketing, fleet operations, CRM, and an implementation roadmap.",
    tags: ["TOGAF", "Gap Analysis", "Roadmap"],
    image: "/images/projects/ea-transportation.png",
    alt: "Target architecture for digital transportation services",
  },
];

export default function ProjectGallery() {
  const [activeIndex, setActiveIndex] = useState(0);
  const activeProject = PROJECTS[activeIndex];

  const carouselItems = PROJECTS.map((project) => ({
    image: project.image,
    alt: project.alt,
  }));

  return (
    <section
      id="work-gallery"
      className="w-full overflow-hidden py-16 sm:py-24"
      aria-label="Selected projects"
    >
      <div className="mx-auto w-full max-w-[1280px] px-6 sm:px-10">
        {/* Section heading */}
        <div className="mb-8 flex flex-col gap-6 sm:mb-10 sm:flex-row sm:items-end sm:justify-between">
          <div className="max-w-2xl">
            <p className="mb-4 text-xs font-medium uppercase tracking-[0.2em] text-foreground/50">
              Selected Work
            </p>

            <h2 className="text-4xl font-medium tracking-tight text-foreground sm:text-5xl lg:text-6xl">
              Work Gallery
              <span className="text-foreground/35">.</span>
            </h2>

            <p className="mt-4 max-w-lg text-sm leading-6 text-foreground/60 sm:text-base">
              A collection of projects in IT governance,
              enterprise architecture, and risk management.
            </p>
          </div>

          <Link
            to="/projects"
            className="inline-flex w-fit shrink-0 items-center gap-2 rounded-full border border-foreground/15 px-4 py-2.5 text-sm transition-colors hover:bg-foreground/5"
          >
            View All Projects
            <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
          </Link>
        </div>

        {/* Depth Carousel */}
        <div className="relative">
            <DepthCarousel
            items={carouselItems}
            cardWidth={520}
            cardHeight={300}
            radius={18}
            depth={100}
            spread={230}
            tilt={0}
            perspective={1400}
            visibleCards={1}
            falloff={0.12}
            blur={0}
            duration={700}
            ease="power3.inOut"
            loop
            autoplay={false}
            showControls
            showIndicators
            onChange={(index) => setActiveIndex(index)}
            className="min-h-[320px] sm:min-h-[380px] lg:min-h-[430px]"
            />
        </div>

        {/* Active project information */}
        <div
          className="mt-8 grid gap-6 border-t border-foreground/10 pt-8 sm:mt-10 sm:grid-cols-[1fr_auto] sm:items-end"
          aria-live="polite"
        >
          <div className="max-w-3xl">
            <p className="mb-3 text-xs font-medium uppercase tracking-[0.16em] text-foreground/50">
              {activeProject.category}
            </p>

            <h3 className="text-2xl font-medium leading-tight tracking-tight text-foreground sm:text-3xl">
              {activeProject.title}
            </h3>

            <p className="mt-4 max-w-2xl text-sm leading-6 text-foreground/65 sm:text-base">
              {activeProject.description}
            </p>

            <div className="mt-5 flex flex-wrap gap-2">
              {activeProject.tags.map((tag) => (
                <span
                  key={tag}
                  className="rounded-full border border-foreground/10 px-3 py-1.5 text-xs text-foreground/65"
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>

          <Link
            to="/projects"
            className="inline-flex w-fit items-center gap-2 text-sm font-medium text-foreground transition-opacity hover:opacity-60"
          >
          </Link>
        </div>
      </div>
    </section>
  );
}
