import { FadeIn } from "@/components/ui/motion-primitives";
import { CertificationCard } from "./certification-card";

const CERTIFICATIONS = [
  {
    number: "01",
    title: "Enterprise Architect",
    description:
      "Professional certification in enterprise architecture, covering the alignment of business needs, organizational objectives, and technology.",
    credential: "Certified Enterprise Architect",
    issuer: "BNSP",
    issued: "November 2025",
    validUntil: "November 2028",
    file: "/certifications/certified-enterprise-architect.pdf",
  },
  {
    number: "02",
    title: "English Proficiency Test",
    description:
      "An English proficiency assessment documenting English language skills through the EPrT examination at Telkom University.",
    credential: "EPrT · Score 507 · CEFR B1",
    issuer: "Telkom University Language Center",
    issued: "December 2025",
    validUntil: "December 2027",
    file: "/certifications/eprt-certificate.pdf",
  },
];

export function CertificationList() {
  return (
    <section
      aria-label="Professional certifications"
      className="mx-auto w-full max-w-275 px-6 sm:px-10"
    >
      <div className="flex flex-col gap-8 sm:gap-10">
        {CERTIFICATIONS.map((certification, index) => (
          <FadeIn key={certification.number} delay={index * 0.08}>
            <CertificationCard certification={certification} />
          </FadeIn>
        ))}
      </div>
    </section>
  );
}