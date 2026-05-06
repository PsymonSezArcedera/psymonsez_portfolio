import type { IconType } from "react-icons";
import {
  SiFirebase,
  SiGit,
  SiLaravel,
  SiNextdotjs,
  SiOpenai,
  SiPhp,
  SiPostgresql,
  SiPython,
  SiReact,
  SiScikitlearn,
  SiTailwindcss,
  SiTypescript,
  SiVercel,
} from "react-icons/si";

type Tech = { icon: IconType; label: string };

const tech: Tech[] = [
  // languages
  { icon: SiTypescript, label: "TypeScript" },
  { icon: SiPython, label: "Python" },
  { icon: SiPhp, label: "PHP" },
  // frameworks
  { icon: SiNextdotjs, label: "Next.js" },
  { icon: SiReact, label: "React Native" },
  { icon: SiLaravel, label: "Laravel" },
  { icon: SiTailwindcss, label: "Tailwind" },
  // ai
  { icon: SiScikitlearn, label: "scikit-learn" },
  { icon: SiOpenai, label: "OpenAI" },
  // database
  { icon: SiPostgresql, label: "PostgreSQL" },
  { icon: SiFirebase, label: "Firebase" },
  // infra
  { icon: SiVercel, label: "Vercel" },
  { icon: SiGit, label: "Git" },
];

function Pill({ icon: Icon, label }: Tech) {
  return (
    <div className="flex shrink-0 items-center gap-2 border border-border bg-card px-3 py-1.5 font-mono text-xs text-foreground">
      <Icon className="h-4 w-4 shrink-0" aria-hidden="true" />
      <span>{label}</span>
    </div>
  );
}

export function TechMarquee() {
  // Duplicate the list so the -50% translation in the keyframe loops seamlessly.
  const track = [...tech, ...tech];

  return (
    <div
      className="marquee-mask relative overflow-hidden"
      aria-label="Tech stack"
    >
      <div className="flex w-max animate-marquee gap-3 py-1">
        {track.map((t, i) => (
          <Pill key={`${t.label}-${i}`} {...t} />
        ))}
      </div>
    </div>
  );
}
