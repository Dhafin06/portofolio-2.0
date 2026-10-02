import { ArrowUpRight, Download } from "lucide-react";
import { Link } from "react-router-dom";

export function ContactCardCtas() {
  return (
    <div className="flex flex-wrap items-center gap-3">
      <a
        href="/cv/Dhafin-Aksanidra-CV.pdf"
        download
        className="focus-ring group inline-flex items-center gap-2 rounded-full bg-foreground px-5 py-2.5 text-sm font-medium text-background transition-opacity duration-300 hover:opacity-85"
      >
        Download CV
        <Download
          className="h-4 w-4 transition-transform duration-300 group-hover:translate-y-0.5"
          aria-hidden="true"
        />
      </a>

      <Link
        to="/projects"
        className="focus-ring group inline-flex items-center gap-2 rounded-full border border-foreground/15 bg-background px-5 py-2.5 text-sm font-medium text-foreground transition-colors duration-300 hover:bg-foreground/5"
      >
        See projects
        <ArrowUpRight
          className="h-4 w-4 transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
          aria-hidden="true"
        />
      </Link>
    </div>
  );
}