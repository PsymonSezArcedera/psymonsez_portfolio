"use client";

import { AnimatePresence, motion } from "framer-motion";
import Image from "next/image";
import { useCallback, useEffect, useRef, useState } from "react";
import type { IconType } from "react-icons";
import {
  SiExpo,
  SiExpress,
  SiFirebase,
  SiGooglemaps,
  SiNextdotjs,
  SiPostgresql,
  SiPython,
  SiReact,
  SiScikitlearn,
  SiVercel,
} from "react-icons/si";
import { Reveal } from "./reveal";

type ProjectStatus = "SHIPPED" | "IN PRODUCTION" | "PUBLISHED";

type ProjectLink = {
  label: string;
  url: string;
};

type Tech = {
  label: string;
  /** Optional logo. Items without an icon render as a small text pill. */
  icon?: IconType;
};

type Project = {
  name: string;
  status: ProjectStatus;
  tagline: string;
  description: string;
  stack: Tech[];
  highlight: string;
  links: ProjectLink[];
  /** Optional background image. Drop a file in /public/projects/ and reference it here, e.g. "/projects/paralink.png". */
  image?: string;
};

const statusStyles: Record<ProjectStatus, string> = {
  SHIPPED: "border-accent text-accent",
  "IN PRODUCTION": "border-accent-secondary text-accent-secondary",
  PUBLISHED: "border-border text-muted-foreground",
};

const projects: Project[] = [
  {
    name: "ParaLink",
    status: "SHIPPED",
    tagline: "Real-time jeepney tracking for San Pablo City commuters",
    description:
      "Mobile app with three user roles (commuter, driver, admin) for tracking jeepneys in real time. Built and tested with 25 real users in a usability evaluation. My undergraduate Special Problem.",
    stack: [
      { label: "React Native", icon: SiReact },
      { label: "Expo", icon: SiExpo },
      { label: "Firebase", icon: SiFirebase },
      { label: "Google Maps", icon: SiGooglemaps },
      { label: "OSRM" },
    ],
    highlight: 'SUS score: 91.1 (Grade A+) — "Best imaginable"',
    links: [
      { label: "github", url: "#" },
      { label: "paper", url: "#" },
    ],
    // image: "/projects/paralink.png",
  },
  {
    name: "ICS-ASTRA",
    status: "IN PRODUCTION",
    tagline: "Alumni network platform for UPLB ICS",
    description:
      "Backend developer on a team building an alumni network spanning multiple graduation batches. Implemented session-based auth, role-based access control, and optimized search with indexed database fields.",
    stack: [
      { label: "Next.js", icon: SiNextdotjs },
      { label: "PostgreSQL", icon: SiPostgresql },
      { label: "Express.js", icon: SiExpress },
      { label: "Vercel", icon: SiVercel },
    ],
    highlight: "Indexed search reduced query time on large record sets",
    links: [
      {
        label: "github",
        url: "https://github.com/fofajardo/cmsc128-ics-astra",
      },
    ],
    // image: "/projects/ics-astra.png",
  },
  {
    name: "Modeling Merit",
    status: "PUBLISHED",
    tagline: "Naïve Bayes classifier for scholarship eligibility",
    description:
      "Co-authored research building an end-to-end classification pipeline to estimate scholarship eligibility from student attributes. Published on SSRN.",
    stack: [
      { label: "Python", icon: SiPython },
      { label: "scikit-learn", icon: SiScikitlearn },
      { label: "Naïve Bayes" },
    ],
    highlight: "Published research — SSRN",
    links: [
      {
        label: "ssrn",
        url: "https://papers.ssrn.com/sol3/papers.cfm?abstract_id=5062553",
      },
    ],
    // image: "/projects/modeling-merit.png",
  },
];

export function Projects() {
  const [focused, setFocused] = useState(0);
  const [inView, setInView] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);
  const rowRef = useRef<HTMLDivElement>(null);

  const next = useCallback(
    () => setFocused((i) => Math.min(i + 1, projects.length - 1)),
    [],
  );
  const prev = useCallback(() => setFocused((i) => Math.max(i - 1, 0)), []);

  // Only listen for arrow keys when the section is on screen.
  useEffect(() => {
    if (!sectionRef.current) return;
    const obs = new IntersectionObserver(
      ([entry]) => setInView(entry.isIntersecting),
      { threshold: 0.3 },
    );
    obs.observe(sectionRef.current);
    return () => obs.disconnect();
  }, []);

  useEffect(() => {
    if (!inView) return;
    const onKey = (e: KeyboardEvent) => {
      const target = e.target as HTMLElement | null;
      if (
        target &&
        (target.tagName === "INPUT" ||
          target.tagName === "TEXTAREA" ||
          target.isContentEditable)
      ) {
        return;
      }
      if (e.key === "ArrowRight") {
        e.preventDefault();
        next();
      } else if (e.key === "ArrowLeft") {
        e.preventDefault();
        prev();
      } else if (e.key === "Enter") {
        const primary = projects[focused].links[0];
        if (primary && primary.url && primary.url !== "#") {
          window.open(primary.url, "_blank", "noopener,noreferrer");
        }
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [inView, focused, next, prev]);

  // Center the focused tile in the scrollable row (mobile + tight viewports).
  useEffect(() => {
    const row = rowRef.current;
    if (!row) return;
    const tile = row.children[focused] as HTMLElement | undefined;
    if (!tile) return;
    const target =
      tile.offsetLeft - row.clientWidth / 2 + tile.clientWidth / 2;
    row.scrollTo({ left: target, behavior: "smooth" });
  }, [focused]);

  // When the user swipes the row on touch, sync `focused` to whichever tile
  // ends up centered. Debounced so it only fires once scrolling settles.
  useEffect(() => {
    const row = rowRef.current;
    if (!row) return;
    let timer: ReturnType<typeof setTimeout> | null = null;
    const onScroll = () => {
      if (timer) clearTimeout(timer);
      timer = setTimeout(() => {
        const tiles = Array.from(row.children) as HTMLElement[];
        const center = row.scrollLeft + row.clientWidth / 2;
        let bestIdx = 0;
        let bestDist = Infinity;
        tiles.forEach((tile, i) => {
          const tileCenter = tile.offsetLeft + tile.clientWidth / 2;
          const dist = Math.abs(tileCenter - center);
          if (dist < bestDist) {
            bestDist = dist;
            bestIdx = i;
          }
        });
        setFocused((current) => (current === bestIdx ? current : bestIdx));
      }, 120);
    };
    row.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      row.removeEventListener("scroll", onScroll);
      if (timer) clearTimeout(timer);
    };
  }, []);

  const active = projects[focused];

  return (
    <section
      ref={sectionRef}
      id="projects"
      className="relative overflow-hidden px-6 py-24 sm:px-10 md:py-32"
    >
      <div className="mx-auto max-w-5xl">
        <Reveal className="relative">
          <p className="font-mono text-sm text-muted-foreground">
            // 03. projects
          </p>
          <h2 className="font-heading mt-3 text-3xl font-bold tracking-tight sm:text-4xl md:text-5xl">
            Selected Work
          </h2>
          <p className="mt-4 max-w-xl text-muted-foreground">
            Pick a project to load.{" "}
            <span className="hidden sm:inline">
              Use <span className="font-mono text-foreground">←</span>{" "}
              <span className="font-mono text-foreground">→</span> to browse,{" "}
              <span className="font-mono text-foreground">Enter</span> to open.
            </span>
            <span className="sm:hidden">Swipe to browse.</span>
          </p>
        </Reveal>

        {/* Status bar: index + keyboard hint */}
        <div className="mt-12 flex items-center justify-between font-mono text-xs text-muted-foreground">
          <span>
            <span className="text-accent">
              {String(focused + 1).padStart(2, "0")}
            </span>
            <span className="mx-1">/</span>
            {String(projects.length).padStart(2, "0")}
          </span>
          <div className="hidden items-center gap-2 sm:flex">
            <Kbd>←</Kbd>
            <Kbd>→</Kbd>
            <span>navigate</span>
            <span className="mx-1 opacity-50">·</span>
            <Kbd>↵</Kbd>
            <span>open</span>
          </div>
        </div>

        {/* Tiles row */}
        <div className="relative mt-6">
          {/* Side fade hints on overflow */}
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-y-0 left-0 z-10 w-12 bg-gradient-to-r from-background to-transparent sm:hidden"
          />
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-y-0 right-0 z-10 w-12 bg-gradient-to-l from-background to-transparent sm:hidden"
          />

          <div
            ref={rowRef}
            className="no-scrollbar -mx-6 flex snap-x snap-mandatory items-center gap-4 overflow-x-auto pb-6 pt-12 pl-[max(1.5rem,calc(50%-6rem))] pr-[max(1.5rem,calc(50%-6rem))] sm:mx-0 sm:justify-center sm:gap-6 sm:overflow-visible sm:px-0"
            role="listbox"
            aria-label="Projects"
            aria-activedescendant={`tile-${focused}`}
          >
            {projects.map((p, i) => (
              <Tile
                key={p.name}
                id={`tile-${i}`}
                project={p}
                isFocused={i === focused}
                onClick={() => setFocused(i)}
              />
            ))}
          </div>
        </div>

        {/* Details panel — crossfades when focus changes */}
        <div className="relative mt-8 min-h-[280px]">
          <AnimatePresence mode="wait">
            <motion.article
              key={active.name}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
              className="border border-border bg-card p-6 md:p-8"
            >
              <div className="flex items-start justify-between gap-4">
                <p className="font-mono text-sm text-accent-secondary">
                  {active.tagline}
                </p>
                <span
                  className={`shrink-0 border px-2 py-0.5 font-mono text-[0.65rem] uppercase tracking-wider ${statusStyles[active.status]}`}
                >
                  {active.status}
                </span>
              </div>

              <p className="mt-4 leading-relaxed text-foreground/90">
                {active.description}
              </p>

              <ul className="mt-5 flex flex-wrap gap-2">
                {active.stack.map((tech) => {
                  const Icon = tech.icon;
                  return (
                    <li
                      key={tech.label}
                      title={tech.label}
                      className="flex h-9 min-w-9 items-center justify-center border border-border bg-card px-2 text-muted-foreground"
                    >
                      {Icon ? (
                        <>
                          <Icon className="h-4 w-4" aria-hidden="true" />
                          <span className="sr-only">{tech.label}</span>
                        </>
                      ) : (
                        <span className="font-mono text-[0.7rem]">
                          {tech.label}
                        </span>
                      )}
                    </li>
                  );
                })}
              </ul>

              <div className="mt-6 border-t border-border pt-4">
                <p className="font-mono text-sm">
                  <span className="text-accent">→</span> {active.highlight}
                </p>

                <div className="mt-4 flex flex-wrap gap-3">
                  {active.links.map((link) => {
                    const isExternal = link.url.startsWith("http");
                    return (
                      <a
                        key={link.label}
                        href={link.url}
                        target={isExternal ? "_blank" : undefined}
                        rel={isExternal ? "noopener noreferrer" : undefined}
                        className="font-mono text-sm text-muted-foreground transition-colors hover:text-accent-secondary"
                      >
                        [ {link.label} ]
                      </a>
                    );
                  })}
                </div>
              </div>
            </motion.article>
          </AnimatePresence>
        </div>

        {/* Screen-reader live region */}
        <div className="sr-only" aria-live="polite">
          {active.name} selected. {active.tagline}.
        </div>
      </div>
    </section>
  );
}

function Tile({
  id,
  project,
  isFocused,
  onClick,
}: {
  id: string;
  project: Project;
  isFocused: boolean;
  onClick: () => void;
}) {
  return (
    <motion.button
      id={id}
      type="button"
      onClick={onClick}
      role="option"
      aria-selected={isFocused}
      animate={{
        scale: isFocused ? 1 : 0.78,
        opacity: isFocused ? 1 : 0.45,
        y: isFocused ? 0 : 8,
      }}
      whileHover={{ opacity: isFocused ? 1 : 0.75, scale: isFocused ? 1 : 0.82 }}
      transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
      className={`group relative aspect-[4/5] w-[240px] shrink-0 cursor-pointer snap-center overflow-hidden border bg-card text-left transition-colors sm:w-[260px] md:w-[280px] ${
        isFocused
          ? "border-accent shadow-[0_0_50px_-8px_rgba(0,255,136,0.45)]"
          : "border-border"
      }`}
    >
      {/* Background image (or placeholder when not yet provided) */}
      <div className="absolute inset-0" aria-hidden="true">
        {project.image ? (
          <Image
            src={project.image}
            alt=""
            fill
            sizes="(max-width: 640px) 240px, 280px"
            className="object-cover"
            priority={isFocused}
          />
        ) : (
          <div className="absolute inset-0 flex flex-col items-center justify-center gap-3">
            <span className="font-heading select-none text-[8rem] font-bold leading-none text-foreground/[0.08]">
              {project.name.charAt(0)}
            </span>
            <span className="absolute bottom-12 font-mono text-[0.6rem] uppercase tracking-widest text-muted-foreground/40">
              [ image slot ]
            </span>
          </div>
        )}
      </div>

      {/* Grid texture overlay */}
      <div
        className="bg-grid absolute inset-0 opacity-40"
        aria-hidden="true"
      />

      {/* Dark scrim — keeps title + chrome legible regardless of image */}
      <div
        aria-hidden="true"
        className="absolute inset-0 bg-gradient-to-b from-background/40 via-background/55 to-background/85"
      />

      {/* Top: terminal path + status */}
      <div className="absolute inset-x-0 top-0 z-10 flex items-center justify-between border-b border-border bg-background/60 px-3 py-2 backdrop-blur-sm">
        <span className="font-mono text-[0.65rem] text-muted-foreground">
          ./{project.name.toLowerCase().replace(/\s+/g, "-")}
        </span>
        <span
          className={`border px-1.5 py-0.5 font-mono text-[0.55rem] uppercase tracking-wider ${statusStyles[project.status]}`}
        >
          {project.status}
        </span>
      </div>

      {/* Center: project name + tagline */}
      <div className="absolute inset-0 z-10 flex flex-col items-center justify-center px-5 text-center">
        <h3 className="font-heading text-2xl font-bold tracking-tight text-foreground [text-shadow:_0_2px_12px_rgb(0_0_0_/_0.7)] md:text-[1.7rem]">
          {project.name}
        </h3>
        <p className="mt-3 font-mono text-[0.7rem] leading-relaxed text-foreground/80 [text-shadow:_0_1px_6px_rgb(0_0_0_/_0.7)]">
          {project.tagline}
        </p>
      </div>

      {/* Bottom: select indicator */}
      <div className="absolute inset-x-0 bottom-0 z-10 flex items-center justify-between border-t border-border bg-background/60 px-3 py-2 font-mono text-[0.65rem] backdrop-blur-sm">
        <span
          className={
            isFocused
              ? "flex items-center gap-1.5 text-accent"
              : "text-muted-foreground"
          }
        >
          {isFocused ? (
            <>
              <span className="relative inline-flex h-1.5 w-1.5">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-accent/70" />
                <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-accent" />
              </span>
              SELECTED
            </>
          ) : (
            "press"
          )}
        </span>
        <span className="text-muted-foreground">↵ open</span>
      </div>

      {/* Inset accent ring on the focused tile */}
      {isFocused && (
        <motion.span
          aria-hidden="true"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.3 }}
          className="pointer-events-none absolute inset-0 ring-1 ring-inset ring-accent/60"
        />
      )}

      {/* Entrance shine sweep on focus change */}
      {isFocused && (
        <motion.span
          aria-hidden="true"
          initial={{ x: "-120%" }}
          animate={{ x: "220%" }}
          transition={{ duration: 1.1, ease: "easeOut" }}
          className="pointer-events-none absolute inset-y-0 left-0 z-0 w-1/3 -skew-x-12 bg-gradient-to-r from-transparent via-foreground/[0.08] to-transparent"
        />
      )}
    </motion.button>
  );
}

function Kbd({ children }: { children: React.ReactNode }) {
  return (
    <kbd className="inline-flex h-6 min-w-6 items-center justify-center border border-border bg-background px-1.5 font-mono text-[0.7rem] text-foreground">
      {children}
    </kbd>
  );
}
