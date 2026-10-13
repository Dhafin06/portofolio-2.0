
import {
  Instagram,
  Linkedin,
  Mail,
  ArrowUpRight,
} from "lucide-react";

const CONTACT_ITEMS = [
  {
    number: "01",
    label: "Email",
    value: "aksanidradhafin05@gmail.com",
    href: "mailto:aksanidradhafin05@gmail.com",
    icon: Mail,
  },
  {
    number: "02",
    label: "LinkedIn",
    value: "Dhafin Aksanidra",
    href: "https://www.linkedin.com/in/dhafinaksanidra",
    icon: Linkedin,
  },
  {
    number: "03",
    label: "Instagram",
    value: "@dhafin.as",
    href: "https://www.instagram.com/dhafin.as/",
    icon: Instagram,
  },
];

export function ContactCard() {
  return (
    <div className="flex w-full flex-col gap-3">
      {CONTACT_ITEMS.map((item) => {
        const Icon = item.icon;
        const isExternal = item.href.startsWith("https://");

        return (
          <a
            key={item.number}
            href={item.href}
            target={isExternal ? "_blank" : undefined}
            rel={
              isExternal
                ? "noopener noreferrer"
                : undefined
            }
            className="group flex min-h-24 items-center justify-between rounded-2xl border border-foreground/20 bg-background px-5 py-4 shadow-sm transition-all duration-300 hover:border-foreground/70 sm:px-6"
          >
            <div className="flex min-w-0 items-center gap-4">
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-foreground/8 bg-foreground/[0.025] text-foreground/70 transition-all duration-300 group-hover:border-foreground/15 group-hover:bg-foreground/[0.06] group-hover:text-foreground">
                <Icon
                  className="h-4 w-4"
                  strokeWidth={2}
                  aria-hidden="true"
                />
              </div>

              <div className="flex min-w-0 flex-col gap-1">
                <span className="text-[11px] font-medium uppercase tracking-[0.16em] text-foreground/45">
                  {item.label}
                </span>

                <span className="break-all text-sm font-medium tracking-tight text-foreground sm:text-[15px]">
                  {item.value}
                </span>
              </div>
            </div>

            <div className="ml-3 flex shrink-0 items-center gap-3">
              <span className="hidden text-[11px] font-medium tracking-[0.12em] text-foreground/35 sm:block">
                {item.number}
              </span>

              <ArrowUpRight
                className="h-4 w-4 text-foreground/35 transition-all duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-foreground/70"
                aria-hidden="true"
              />
            </div>
          </a>
        );
      })}

    </div>
  );
}
