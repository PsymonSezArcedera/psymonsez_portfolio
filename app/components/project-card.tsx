export type ProjectStatus = "SHIPPED" | "IN PRODUCTION" | "PUBLISHED";

export type ProjectLink = {
  label: string;
  url: string;
};

export type Project = {
  name: string;
  status: ProjectStatus;
  tagline: string;
  description: string;
  stack: string[];
  highlight: string;
  links: ProjectLink[];
};

const statusStyles: Record<ProjectStatus, string> = {
  SHIPPED: "border-accent text-accent",
  "IN PRODUCTION": "border-accent-secondary text-accent-secondary",
  PUBLISHED: "border-border text-muted-foreground",
};

export function ProjectCard({ project }: { project: Project }) {
  return (
    <article className="group flex flex-col border border-border bg-card p-6 transition-all duration-200 hover:-translate-y-0.5 hover:border-accent-secondary">
      <header className="flex items-start justify-between gap-4">
        <h3 className="font-heading text-xl font-bold tracking-tight">
          {project.name}
        </h3>
        <span
          className={`shrink-0 border px-2 py-0.5 font-mono text-[0.65rem] uppercase tracking-wider ${statusStyles[project.status]}`}
        >
          {project.status}
        </span>
      </header>

      <p className="mt-2 font-mono text-sm text-muted-foreground">
        {project.tagline}
      </p>

      <p className="mt-4 text-sm leading-relaxed text-foreground/90">
        {project.description}
      </p>

      <ul className="mt-5 flex flex-wrap gap-1.5">
        {project.stack.map((tech) => (
          <li
            key={tech}
            className="border border-border px-2 py-0.5 font-mono text-xs text-muted-foreground"
          >
            {tech}
          </li>
        ))}
      </ul>

      <div className="mt-auto pt-6">
        <p className="border-t border-border pt-4 font-mono text-sm text-foreground">
          <span className="text-accent">→</span> {project.highlight}
        </p>

        <div className="mt-4 flex flex-wrap gap-3">
          {project.links.map((link) => (
            <a
              key={link.label}
              href={link.url}
              className="font-mono text-sm text-muted-foreground transition-colors hover:text-accent-secondary"
            >
              [ {link.label} ]
            </a>
          ))}
        </div>
      </div>
    </article>
  );
}
