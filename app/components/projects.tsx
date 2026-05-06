import { ProjectCard, type Project } from "./project-card";

const projects: Project[] = [
  {
    name: "ParaLink",
    status: "SHIPPED",
    tagline: "Real-time jeepney tracking for San Pablo City commuters",
    description:
      "Mobile app with three user roles (commuter, driver, admin) for tracking jeepneys in real time. Built and tested with 25 real users in a usability evaluation. My undergraduate Special Problem.",
    stack: ["React Native", "Expo", "Firebase", "Google Maps API", "OSRM"],
    highlight: 'SUS score: 91.1 (Grade A+) — "Best imaginable"',
    links: [
      { label: "github", url: "#" },
      { label: "paper", url: "#" },
    ],
  },
  {
    name: "ICS-ASTRA",
    status: "IN PRODUCTION",
    tagline: "Alumni network platform for UPLB ICS",
    description:
      "Backend developer on a team building an alumni network spanning multiple graduation batches. Implemented session-based auth, role-based access control, and optimized search with indexed database fields.",
    stack: ["Next.js", "PostgreSQL", "Express.js", "Vercel"],
    highlight: "Indexed search reduced query time on large record sets",
    links: [{ label: "github", url: "#" }],
  },
  {
    name: "Modeling Merit",
    status: "PUBLISHED",
    tagline: "Naïve Bayes classifier for scholarship eligibility",
    description:
      "Co-authored research building an end-to-end classification pipeline to estimate scholarship eligibility from student attributes. Published on SSRN.",
    stack: ["Python", "Scikit-learn", "Naïve Bayes"],
    highlight: "Published research — SSRN",
    links: [{ label: "ssrn", url: "#" }],
  },
];

export function Projects() {
  return (
    <section id="projects" className="px-6 py-24 sm:px-10 md:py-32">
      <div className="mx-auto max-w-5xl">
        <p className="font-mono text-sm text-muted-foreground">
          // 01. projects
        </p>
        <h2 className="font-heading mt-3 text-3xl font-bold tracking-tight sm:text-4xl md:text-5xl">
          Selected Work
        </h2>
        <p className="mt-4 max-w-xl text-muted-foreground">
          Things I&apos;ve built, shipped, and published.
        </p>

        <div className="mt-12 grid grid-cols-1 gap-6 md:grid-cols-2">
          {projects.map((project) => (
            <ProjectCard key={project.name} project={project} />
          ))}
        </div>
      </div>
    </section>
  );
}
