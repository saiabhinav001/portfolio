import Link from "next/link";
import { ArrowUp, Code2, Github, Linkedin, Mail } from "lucide-react";
import { navItems, profile } from "@/content/site";

const socials = [
  { label: "GitHub", href: profile.links.github, Icon: Github, external: true },
  { label: "LinkedIn", href: profile.links.linkedin, Icon: Linkedin, external: true },
  { label: "LeetCode", href: profile.links.leetcode, Icon: Code2, external: true },
  { label: "Email", href: profile.links.email, Icon: Mail, external: false },
];

export function SiteFooter() {
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-line">
      <div className="shell py-14">
        <div className="flex flex-col gap-12 md:flex-row md:items-start md:justify-between">
          <div className="max-w-sm">
            <Link href="/#top" className="flex items-center gap-3">
              <span aria-hidden="true" className="grid h-8 w-8 place-items-center rounded-md border border-ink/15 font-mono text-[0.7rem] font-medium text-ink">
                {profile.initials}
              </span>
              <span className="text-sm font-medium tracking-tight text-ink">{profile.name}</span>
            </Link>
            <p className="mt-4 text-sm leading-relaxed text-muted">
              AI &amp; software engineer working on AI systems, full-stack products, search infrastructure, and cloud.
            </p>

            <ul className="mt-6 flex flex-wrap gap-2.5">
              {socials.map(({ label, href, Icon, external }) => (
                <li key={label}>
                  <a
                    href={href}
                    target={external ? "_blank" : undefined}
                    rel={external ? "noreferrer" : undefined}
                    aria-label={label}
                    className="group inline-flex items-center gap-2 rounded-full border border-line px-3.5 py-1.5 text-xs text-muted transition-colors duration-300 hover:border-accent hover:text-accent"
                  >
                    <Icon size={14} strokeWidth={1.6} />
                    {label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <nav aria-label="Footer navigation" className="grid grid-cols-2 gap-x-10 gap-y-2.5">
            {navItems.slice(1).map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="flex items-baseline gap-2.5 py-1 text-sm text-muted transition-colors hover:text-ink"
              >
                <span className="font-mono text-[0.62rem] text-faint">{item.index}</span>
                {item.label}
              </Link>
            ))}
          </nav>
        </div>

        <div className="mt-12 flex flex-col gap-4 border-t border-line pt-6 text-xs text-faint sm:flex-row sm:items-center sm:justify-between">
          <p className="font-mono">
            © {year} {profile.name} — {profile.location}
          </p>
          <div className="flex items-center gap-5">
            <span className="hidden font-mono sm:inline">Next.js · TypeScript · Tailwind · Framer Motion</span>
            <Link href="/#top" className="group inline-flex items-center gap-1.5 text-muted transition-colors hover:text-accent">
              Top
              <ArrowUp size={13} strokeWidth={1.75} className="transition-transform group-hover:-translate-y-0.5" />
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
