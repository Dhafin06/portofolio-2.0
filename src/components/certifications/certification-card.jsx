
import { ArrowUpRight, FileText } from "lucide-react";

export function CertificationCard({ certification }) {
  return (
    <article className="grid overflow-hidden rounded-2xl border border-foreground/10 bg-background md:grid-cols-[0.9fr_1.1fr]">
      {/* Certification information */}
      <div className="flex flex-col justify-between gap-10 p-6 sm:p-8 lg:p-10">
        <div>
          <div className="mb-6 flex items-center gap-3">
            <span className="text-[11px] font-medium uppercase tracking-[0.18em] text-foreground/45">
              Certification
            </span>

            <span className="h-px w-8 bg-foreground/20" />

            <span className="text-[11px] tabular-nums text-foreground/40">
              {certification.number}
            </span>
          </div>

          <h2 className="max-w-[14ch] font-sans text-3xl font-medium leading-[1.08] tracking-tight text-foreground sm:text-4xl lg:text-[2.75rem]">
            {certification.title}
          </h2>

          <p className="mt-5 max-w-md text-sm leading-7 text-foreground/65 sm:text-[15px]">
            {certification.description}
          </p>
        </div>

        <div>
          <div className="grid grid-cols-2 gap-x-6 gap-y-6 border-t border-foreground/10 pt-6">
            <div>
              <p className="text-[10px] font-medium uppercase tracking-[0.16em] text-foreground/40">
                Credential
              </p>
              <p className="mt-2 text-sm leading-6 text-foreground">
                {certification.credential}
              </p>
            </div>

            <div>
              <p className="text-[10px] font-medium uppercase tracking-[0.16em] text-foreground/40">
                Issued
              </p>
              <p className="mt-2 text-sm leading-6 text-foreground">
                {certification.issued}
              </p>
            </div>

            <div className="col-span-2">
              <p className="text-[10px] font-medium uppercase tracking-[0.16em] text-foreground/40">
                Issued by
              </p>
              <p className="mt-2 text-sm leading-6 text-foreground">
                {certification.issuer}
              </p>
            </div>

            {certification.validUntil && (
              <div className="col-span-2">
                <p className="text-[10px] font-medium uppercase tracking-[0.16em] text-foreground/40">
                  Valid until
                </p>
                <p className="mt-2 text-sm leading-6 text-foreground">
                  {certification.validUntil}
                </p>
              </div>
            )}
          </div>

          <a
            href={certification.file}
            target="_blank"
            rel="noopener noreferrer"
            className="focus-ring group mt-7 inline-flex items-center gap-2 rounded-xl border border-foreground/15 px-4 py-2.5 text-sm font-medium text-foreground transition-all duration-300 hover:border-foreground/40 hover:bg-foreground/[0.03]"
          >
            <FileText
              className="h-4 w-4 text-foreground/55"
              aria-hidden="true"
            />

            View Certificate

            <ArrowUpRight
              className="h-4 w-4 text-foreground/45 transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
              aria-hidden="true"
            />
          </a>
        </div>
      </div>

      {/* Certificate preview */}
      <div className="group/preview relative flex min-h-[320px] flex-col border-t border-foreground/10 bg-foreground/[0.025] p-4 transition-colors duration-300 hover:bg-foreground/[0.04] sm:min-h-[400px] sm:p-6 md:border-l md:border-t-0 lg:p-8">
        <div className="mb-3 flex items-center justify-between">
          <span className="text-[10px] font-medium uppercase tracking-[0.16em] text-foreground/40 transition-colors duration-300 group-hover/preview:text-foreground/65">
            Certificate preview
          </span>

          <span className="text-[10px] tabular-nums text-foreground/35">
            {certification.number} / 02
          </span>
        </div>

        <div className="relative min-h-[300px] flex-1 overflow-hidden rounded-xl border border-foreground/10 bg-background shadow-sm transition-all duration-500 ease-out hover:border-foreground/25 hover:shadow-lg sm:min-h-[380px]">
          <iframe
            src={`${certification.file}#toolbar=0&navpanes=0&view=Fit`}
            title={`${certification.title} certificate preview`}
            className="absolute inset-0 h-full w-full bg-background"
            loading="lazy"
          />
        </div>

        <p className="mt-3 text-[11px] leading-5 text-foreground/40 transition-colors duration-300 group-hover/preview:text-foreground/60">
          Open the full document to view the certificate in detail.
        </p>
      </div>
    </article>
  );
}
