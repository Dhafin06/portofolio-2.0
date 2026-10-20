
import {
  Layers,
  Compass,
  LineChart,
  Bot,
} from "lucide-react";

export const PROJECTS = [
  {
    id: "it-governance",
    category: "IT Governance",
    icon: Layers,
    title: "IT Governance Analysis and Design",
    description:
      "Assessed IT governance practices using COBIT 2019, identified capability gaps, and developed 24 prioritized improvement recommendations across people, process, and technology.",
    tags: ["COBIT 2019", "APO11", "APO12", "EDM03"],
    image: "/images/it-governance.webp",
    alt: "IT governance assessment and improvement recommendations",
  },
  {
    id: "enterprise-architecture",
    category: "Enterprise Architecture",
    icon: Compass,
    title: "Enterprise Architecture Design",
    description:
      "Designed an enterprise architecture for PT Hiro Group using TOGAF, modeled as-is and to-be business processes, and identified gaps across four architecture domains.",
    tags: ["TOGAF", "BPMN", "Architecture Modeling"],
    image: "/images/enterprise-architecture.webp",
    alt: "Enterprise architecture models and business process diagrams",
  },
  {
    id: "risk-management",
    category: "Risk Management",
    icon: LineChart,
    title: "Risk Management Analysis and Design",
    description:
      "Identified and assessed 10 risk scenarios using ISO 31000:2018, prioritized risks through likelihood and impact analysis, and developed risk treatment recommendations.",
    tags: ["ISO 31000:2018", "Risk Assessment"],
    image: "/images/risk-management.webp",
    alt: "Risk assessment matrix and risk treatment planning",
  },
  {
    id: "ea-transportation",
    category: "Enterprise Architecture",
    icon: Bot,
    title: "Enterprise Architecture for Digital Transportation",
    description:
      "Designed a target architecture for digital transportation services, covering integrated ticketing, fleet operations, CRM, and an implementation roadmap.",
    tags: ["TOGAF", "Gap Analysis", "Roadmap"],
    image: "/images/ea-transportation.webp",
    alt: "Enterprise architecture design for digital transportation services",
  },
];
