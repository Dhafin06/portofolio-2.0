import { Download } from "lucide-react";

export function ContactCardCtas() {
  return (
    <div className="flex items-center">
      <a
        href="/cv/Dhafin-Aksanidra-CV.pdf"
        download="Dhafin-Aksanidra-CV.pdf"
        className="focus-ring group inline-flex items-center gap-2 rounded-xl bg-foreground px-5 py-2.5 text-sm font-medium text-background transition-opacity duration-300 hover:opacity-85"
      >
        Download CV
        <Download
          className="h-4 w-4 transition-transform duration-300 group-hover:translate-y-0.5"
          aria-hidden="true"
        />
      </a>
    </div>
  );
}