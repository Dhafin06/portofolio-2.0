
const frameworks = [
  { name: "TOGAF", detail: "Enterprise Architecture" },
  { name: "COBIT 2019", detail: "IT Governance" },
  { name: "ISO 31000", detail: "Risk Management" },
];

const tools = [
  { name: "Visual Paradigm", logo: "/icons/visual-paradigm.svg" },
  { name: "Bizagi Modeler", logo: "/icons/bizagi.svg" },
  { name: "Draw.io", logo: "/icons/drawio.svg" },
  { name: "Microsoft Excel", logo: "/icons/excel.svg" },
  { name: "Canva", logo: "/icons/canva.svg" },
  { name: "Jira", logo: "/icons/jira.svg" },
  { name: "Notion", logo: "/icons/notion.svg" },
  { name: "Figma", logo: "/icons/figma.svg" },
  { name: "Google Drive", logo: "/icons/google-drive.svg" },
  { name: "Microsoft Teams", logo: "/icons/microsoft-teams.svg" },
];

const capabilities = [
  {
    number: "01",
    eyebrow: "GOVERNANCE & ARCHITECTURE",
    title: "IT Governance & Enterprise Architecture",
    description:
      "Assessing IT governance practices using COBIT 2019, identifying organizational risks through structured analysis, and evaluating gaps between existing capabilities and target objectives. Applying TOGAF to analyze business processes, map current and target architectures, and develop recommendations that align technology initiatives with organizational goals.",
    tags: [
      "COBIT 2019",
      "TOGAF",
      "ISO 31000",
      "Gap Analysis",
      "Risk Assessment",
      "Architecture Design",
    ],
  },
  {
    number: "02",
    eyebrow: "BUSINESS & PROCESS",
    title: "Business Analysis & Process Design",
    description:
      "Analyzing business processes to understand operational workflows, identify bottlenecks, and evaluate gaps between current practices and desired outcomes. Translating findings into process maps, BPMN models, and structured improvement recommendations to clarify business requirements, support decision-making, and improve alignment between business needs and technology solutions.",
    tags: [
      "BPMN",
      "Gap Analysis",
      "Process Mapping",
      "Requirements Analysis",
      "Workflow Analysis",
      "Process Improvement",
    ],
  },
];


function FrameworkGroup() {
  return (
    <div className="mt-7">
      <h3 className="text-xs font-medium text-foreground">
        Frameworks
      </h3>

      <div className="mt-3 flex flex-wrap gap-2">
        {frameworks.map((framework) => (
          <span
            key={framework.name}
            title={framework.detail}
            className="rounded-lg border border-foreground/10 bg-background px-3 py-2 text-xs font-medium text-foreground transition-colors hover:bg-muted/50"
          >
            {framework.name}
          </span>
        ))}
      </div>
    </div>
  );
}

function ToolsGrid() {
  return (
    <div className="mt-7">
      <h3 className="text-xs font-medium text-foreground">
        Tools
      </h3>

      <div className="mt-3 grid max-w-[250px] grid-cols-3 gap-2">
        {tools.map((tool) => (
          <div
            key={tool.name}
            title={tool.name}
            className="flex aspect-square min-w-0 items-center justify-center rounded-xl border border-foreground/10 bg-background p-2 transition-colors hover:bg-muted/50"
          >
            <img
              src={tool.logo}
              alt={tool.name}
              className="size-7 object-contain sm:size-8"
              loading="lazy"
            />
          </div>
        ))}
      </div>
    </div>
  );
}

function CapabilityCard({ item }) {
  return (
    <article className="flex min-w-0 flex-col rounded-xl border border-foreground/10 bg-background p-5 sm:p-6">
      <div className="flex items-start justify-between gap-3">
        <span className="text-3xl font-medium tracking-tight text-foreground/85">
          {item.number}
        </span>

        <span className="max-w-36 text-right text-[9px] font-medium leading-relaxed tracking-[0.16em] text-muted-foreground">
          {item.eyebrow}
        </span>
      </div>

      <div className="mt-8">
        <h3 className="text-lg font-medium leading-snug tracking-tight text-foreground">
          {item.title}
        </h3>

        <p className="mt-3 text-sm leading-6 text-muted-foreground">
          {item.description}
        </p>
      </div>

      <div className="mt-auto flex flex-wrap gap-2 pt-6">
        {item.tags.map((tag) => (
          <span
            key={tag}
            className="rounded-lg border border-foreground/10 px-2 py-1 text-[11px] text-muted-foreground"
          >
            {tag}
          </span>
        ))}
      </div>
    </article>
  );
}

export default function WhatCanIDo() {
  return (
    <section
      id="capabilities"
      aria-labelledby="capabilities-title"
      className="mx-auto w-full max-w-[1280px] px-5 py-12 sm:px-8 sm:py-16 lg:px-10"
    >
      <div className="grid gap-8 lg:grid-cols-[0.95fr_1.65fr] lg:gap-6 xl:gap-8">
        {/* Left: Introduction, frameworks, and tools */}
        <div className="min-w-0">
          <p className="text-[10px] font-medium uppercase tracking-[0.22em] text-muted-foreground">
            My capabilities
          </p>

          <h2
            id="capabilities-title"
            className="mt-3 text-4xl font-semibold tracking-tight text-foreground sm:text-5xl"
          >
            What Can I Do?
          </h2>

          <p className="mt-4 max-w-md text-sm leading-6 text-muted-foreground">
            I combine structured analysis, governance frameworks, and process
            design to help align technology with business needs.
          </p>

          <FrameworkGroup />
          <ToolsGrid />
        </div>

        {/* Right: Capability cards */}
        <div className="grid min-w-0 grid-cols-1 gap-3 sm:grid-cols-2">
          {capabilities.map((item) => (
            <CapabilityCard key={item.number} item={item} />
          ))}
        </div>
      </div>
    </section>
  );
}
