import { ChevronDown } from "lucide-react";

type Stage = { title: string; detail?: string; items?: string[] };

/**
 * Native, no-scroll architecture layout for small screens. Renders the same
 * pipeline the SVG diagram shows, as a vertical sequence of stages — so mobile
 * users get the full architecture without horizontal scrolling.
 */
export function MobileArchitecture({ stages }: { stages: Stage[] }) {
  return (
    <figure className="overflow-hidden rounded-xl border border-line bg-surface">
      <figcaption className="flex items-center justify-between border-b border-line px-4 py-2.5">
        <span className="label text-faint">Architecture</span>
        <span className="font-mono text-[0.62rem] text-accent-strong">flow</span>
      </figcaption>

      <ol className="flex flex-col p-4">
        {stages.map((stage, i) => (
          <li key={stage.title}>
            <div className="rounded-lg border border-line bg-canvas px-3.5 py-3">
              <div className="flex items-baseline gap-2.5">
                <span className="font-mono text-[0.62rem] tabular-nums text-accent-strong">{String(i + 1).padStart(2, "0")}</span>
                <p className="text-sm font-medium leading-snug text-ink">{stage.title}</p>
              </div>
              {stage.detail ? <p className="mt-1.5 pl-[1.7rem] text-xs leading-relaxed text-muted">{stage.detail}</p> : null}
              {stage.items ? (
                <ul className="mt-2.5 flex flex-wrap gap-1.5 pl-[1.7rem]">
                  {stage.items.map((item) => (
                    <li key={item} className="rounded border border-line bg-surface px-2 py-0.5 font-mono text-[0.65rem] text-muted">
                      {item}
                    </li>
                  ))}
                </ul>
              ) : null}
            </div>
            {i < stages.length - 1 ? (
              <div className="flex justify-center py-1.5" aria-hidden>
                <ChevronDown size={14} strokeWidth={1.75} className="text-faint" />
              </div>
            ) : null}
          </li>
        ))}
      </ol>
    </figure>
  );
}
