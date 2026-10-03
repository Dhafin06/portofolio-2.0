import { ArrowUpRight } from "lucide-react";
import { Link } from "react-router-dom";
import { ContactButton } from "@/components/contact/contact-button";

export function FooterCtas() {
  return (
    <div className="flex flex-wrap items-center gap-3">
      <ContactButton />

      <Link
        to="/projects"
        className="focus-ring group inline-flex items-center gap-2 rounded-full border border-foreground/15 bg-background px-5 py-2.5 text-sm font-medium text-foreground transition-colors duration-300 hover:bg-foreground/5"
      >
        View Projects

          <ArrowUpRight
            className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5"
            aria-hidden="true"
          />
      </Link>
    </div>
  );
}