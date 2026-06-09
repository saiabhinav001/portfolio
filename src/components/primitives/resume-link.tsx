import type { ReactNode } from "react";
import { profile } from "@/content/site";
import { cn } from "@/lib/utils";

/**
 * Renders the Resume affordance. When `profile.resume` is set it's a real
 * download link; when it's null it degrades to a non-interactive "coming soon"
 * state so we never ship a broken link or a placeholder document.
 */
export function ResumeLink({
  className,
  children,
  ariaLabel = "Resume",
  onClick,
}: {
  className?: string;
  children: ReactNode;
  ariaLabel?: string;
  onClick?: () => void;
}) {
  if (profile.resume) {
    return (
      <a
        href={profile.resume}
        target="_blank"
        rel="noreferrer"
        onClick={onClick}
        className={className}
        aria-label={ariaLabel}
      >
        {children}
      </a>
    );
  }

  return (
    <span className={cn(className, "cursor-not-allowed opacity-50")} aria-disabled="true" title="Resume — coming soon">
      {children}
      <span className="sr-only"> (coming soon)</span>
    </span>
  );
}
