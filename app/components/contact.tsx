import type { IconType } from "react-icons";
import { FaLinkedin } from "react-icons/fa";
import { FiMail } from "react-icons/fi";
import { SiGithub } from "react-icons/si";
import { Reveal } from "./reveal";

type Link = {
  label: string;
  value: string;
  href: string;
  icon: IconType;
};

const links: Link[] = [
  {
    label: "email",
    value: "psarcedera@gmail.com",
    href: "mailto:psarcedera@gmail.com",
    icon: FiMail,
  },
  {
    label: "github",
    value: "github.com/PsymonSezArcedera",
    href: "https://github.com/PsymonSezArcedera",
    icon: SiGithub,
  },
  {
    label: "linkedin",
    value: "linkedin.com/in/psymonsezarcedera",
    href: "https://www.linkedin.com/in/psymonsezarcedera/",
    icon: FaLinkedin,
  },
];

export function Contact() {
  return (
    <section
      id="contact"
      className="relative overflow-hidden px-6 py-24 sm:px-10 md:py-32"
    >
      <span aria-hidden="true" className="section-watermark">
        04
      </span>
      <Reveal className="relative mx-auto max-w-5xl">
        <span
          aria-hidden="true"
          className="absolute -top-10 left-0 hidden h-6 w-px bg-border md:block"
        />
        <span
          aria-hidden="true"
          className="absolute -top-3 left-0 hidden h-1.5 w-1.5 -translate-x-1/2 rounded-full bg-accent md:block"
        />
        <p className="font-mono text-sm text-muted-foreground">
          // 04. contact
        </p>
        <h2 className="font-heading mt-3 text-3xl font-bold tracking-tight sm:text-4xl md:text-5xl">
          Get in Touch
        </h2>
        <p className="mt-4 max-w-xl text-muted-foreground">
          Open to SWE and AI engineering roles, research collaborations, and
          interesting side projects. Email is fastest.
        </p>

        <div className="mt-12 border border-border bg-card">
          <div className="flex items-center gap-2 border-b border-border px-4 py-2 font-mono text-xs text-muted-foreground">
            <span className="h-2.5 w-2.5 rounded-full bg-destructive/70" />
            <span className="h-2.5 w-2.5 rounded-full bg-accent/60" />
            <span className="h-2.5 w-2.5 rounded-full bg-accent-secondary/60" />
            <span className="ml-2">~/contact</span>
          </div>

          <ul className="divide-y divide-border">
            {links.map(({ label, value, href, icon: Icon }) => {
              const isExternal = href.startsWith("http");
              return (
                <li key={label}>
                  <a
                    href={href}
                    target={isExternal ? "_blank" : undefined}
                    rel={isExternal ? "noopener noreferrer" : undefined}
                    className="group flex items-center gap-4 px-6 py-5 font-mono text-sm transition-colors hover:bg-background"
                  >
                    <Icon
                      className="h-5 w-5 shrink-0 text-muted-foreground transition-colors group-hover:text-accent"
                      aria-hidden="true"
                    />
                    <span className="w-20 shrink-0 text-muted-foreground">
                      {label}
                    </span>
                    <span className="truncate text-foreground transition-colors group-hover:text-accent-secondary">
                      {value}
                    </span>
                    <span
                      className="ml-auto hidden text-muted-foreground transition-colors group-hover:text-accent-secondary sm:inline"
                      aria-hidden="true"
                    >
                      →
                    </span>
                  </a>
                </li>
              );
            })}
          </ul>
        </div>
      </Reveal>
    </section>
  );
}
