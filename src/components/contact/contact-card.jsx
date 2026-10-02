import { Github, Linkedin, Mail, ArrowUpRight } from "lucide-react";

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
    value: "LinkedIn Profile",
    href: "#",
    icon: Linkedin,
  },
  {
    number: "03",
    label: "GitHub",
    value: "GitHub Profile",
    href: "#",
    icon: Github,
  },
];

export function ContactCard() {
  return (
    <div className="flex w-full flex-col gap-3">
      {CONTACT_ITEMS.map((item) => {
        const Icon = item.icon;

        return (
          <a
            key={item.number}
            href={item.href}
            target={item.href.startsWith("http") ? "_blank" : undefined}
            rel={
              item.href.startsWith("http")
                ? "noopener noreferrer"
                : undefined
            }
            className="group flex min-h-24 items-center justify-between rounded-2xl border border-foreground/20 bg-background px-5 py-4 shadow-sm transition-all duration-300 hover:border-foreground/70 sm:px-6"
          >
            <div className="flex items-center gap-4">
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-foreground/8 bg-foreground/[0.025] text-foreground/70 transition-all duration-300 group-hover:border-foreground/15 group-hover:bg-foreground/[0.06] group-hover:text-foreground">
                <Icon
                  className="h-4 w-4"
                  strokeWidth={2}
                  aria-hidden="true"
                />
              </div>

              <div className="flex flex-col gap-1">
                <span className="text-[11px] font-medium uppercase tracking-[0.16em] text-foreground/45">
                  {item.label}
                </span>

                <span className="text-sm font-medium tracking-tight text-foreground sm:text-[15px]">
                  {item.value}
                </span>
              </div>
            </div>

            <div className="flex items-center gap-3">
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

      <a
        href="mailto:aksanidradhafin05@gmail.com"
        className="group mt-2 flex h-12 items-center justify-center rounded-full border border-foreground/20 bg-background px-6 text-sm font-medium tracking-tight text-foreground transition-all duration-300 hover:border-foreground/70"
      >
        Send a message

        <ArrowUpRight className="ml-2 h-4 w-4 transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
      </a>
    </div>
  );
}