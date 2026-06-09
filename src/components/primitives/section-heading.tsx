import { cn } from "@/lib/utils";
import { Reveal } from "./reveal";

type SectionHeadingProps = {
  index: string;
  kicker: string;
  title: React.ReactNode;
  description?: React.ReactNode;
  className?: string;
  align?: "start" | "end";
};

/**
 * Editorial section header: mono index + kicker, a large title, and a
 * full-width hairline rule — the recurring rhythm across every section.
 */
export function SectionHeading({ index, kicker, title, description, className, align = "start" }: SectionHeadingProps) {
  return (
    <Reveal className={cn("flex flex-col gap-4 md:gap-6", className)}>
      <div className="flex items-baseline gap-4 text-faint">
        <span className="font-mono text-sm tabular-nums text-accent-strong">{index}</span>
        <span className="h-px flex-1 bg-line" aria-hidden />
        <span className="label">{kicker}</span>
      </div>
      <div className={cn("flex flex-col gap-5 md:flex-row md:items-end md:justify-between", align === "end" && "md:flex-row-reverse")}>
        <h2 className="max-w-2xl text-balance font-sans text-headline font-medium text-ink">{title}</h2>
        {description ? (
          <p className="hidden max-w-prose text-pretty font-sans text-base leading-relaxed text-muted md:block md:max-w-sm md:text-right">
            {description}
          </p>
        ) : null}
      </div>
    </Reveal>
  );
}
