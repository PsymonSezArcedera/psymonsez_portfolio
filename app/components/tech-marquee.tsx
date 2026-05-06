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

const languages: Tech[] = [
  { icon: SiTypescript, label: "TypeScript" },
  { icon: SiPython, label: "Python" },
  { icon: SiPhp, label: "PHP" },
];

const frameworks: Tech[] = [
  { icon: SiNextdotjs, label: "Next.js" },
  { icon: SiReact, label: "React Native" },
  { icon: SiLaravel, label: "Laravel" },
  { icon: SiTailwindcss, label: "Tailwind" },
  { icon: SiScikitlearn, label: "scikit-learn" },
  { icon: SiOpenai, label: "OpenAI" },
];

const databases: Tech[] = [
  { icon: SiPostgresql, label: "PostgreSQL" },
  { icon: SiFirebase, label: "Firebase" },
];

const tools: Tech[] = [
  { icon: SiVercel, label: "Vercel" },
  { icon: SiGit, label: "Git" },
];

function Pill({ icon: Icon, label }: Tech) {
  return (
    <div className="flex shrink-0 items-center gap-3 border border-border bg-card px-4 py-2.5 font-mono text-sm text-foreground">
      <Icon className="h-7 w-7 shrink-0" aria-hidden="true" />
      <span>{label}</span>
    </div>
  );
}

function MarqueeRow({ items, label }: { items: Tech[]; label: string }) {
  // Repeat the list so even short rows fill the viewport, then duplicate the
  // whole block once so the -50% translation in the keyframe loops seamlessly.
  const minPerHalf = 12;
  const reps = Math.max(1, Math.ceil(minPerHalf / items.length));
  const half = Array.from({ length: reps }, () => items).flat();
  const track = [...half, ...half];

  return (
    <div>
      <p className="mx-auto mb-3 max-w-5xl px-6 font-mono text-xs text-muted-foreground sm:px-10">
        {label}
      </p>
      <div className="marquee-mask relative overflow-hidden" aria-label={label}>
        <div className="flex w-max animate-marquee gap-4 py-1">
          {track.map((t, i) => (
            <Pill key={`${t.label}-${i}`} {...t} />
          ))}
        </div>
      </div>
    </div>
  );
}

export function TechMarquee() {
  return (
    <div className="space-y-8">
      <MarqueeRow items={languages} label="// languages" />
      <MarqueeRow items={frameworks} label="// frameworks & libraries" />
      <MarqueeRow items={databases} label="// databases" />
      <MarqueeRow items={tools} label="// tools" />
    </div>
  );
}
