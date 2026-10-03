import { Mail } from "lucide-react";
import { Link } from "react-router-dom";

export function ContactButton() {
  return (
    <Link
      to="/contact"
      className="focus-ring inline-flex h-11 cursor-pointer items-center justify-center gap-2 rounded-xl bg-foreground px-5 text-sm font-medium text-background shadow-2xl transition-opacity duration-300 hover:opacity-85"
    >
      <Mail
        className="h-4 w-4 shrink-0"
        aria-hidden="true"
      />

      <span>Contact</span>
    </Link>
  );
}