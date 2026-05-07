"use client";

import { motion, useReducedMotion } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import { HeroShell } from "./hero-shell";

const TAGLINE =
  "Full-Stack Developer building AI-powered products and enterprise systems";

function useTypewriter(text: string, speed: number, start: boolean) {
  const [out, setOut] = useState("");
  useEffect(() => {
    if (!start) {
      setOut("");
      return;
    }
    let i = 0;
    const id = window.setInterval(() => {
      i += 1;
      setOut(text.slice(0, i));
      if (i >= text.length) window.clearInterval(id);
    }, speed);
    return () => window.clearInterval(id);
  }, [text, speed, start]);
  return out;
}

export function Hero() {
  const prefersReduce = useReducedMotion() ?? false;
  const sectionRef = useRef<HTMLElement>(null);
  const [taglineStart, setTaglineStart] = useState(false);

  // Cursor-reactive spotlight: write px offsets to CSS vars on the section.
  useEffect(() => {
    const el = sectionRef.current;
    if (!el || prefersReduce) return;
    const onMove = (e: MouseEvent) => {
      const rect = el.getBoundingClientRect();
      el.style.setProperty("--mx", `${e.clientX - rect.left}px`);
      el.style.setProperty("--my", `${e.clientY - rect.top}px`);
    };
    el.addEventListener("mousemove", onMove);
    return () => el.removeEventListener("mousemove", onMove);
  }, [prefersReduce]);

  // Tagline begins typing slightly after the name fades in.
  useEffect(() => {
    if (prefersReduce) {
      setTaglineStart(false);
      return;
    }
    const t = window.setTimeout(() => setTaglineStart(true), 500);
    return () => window.clearTimeout(t);
  }, [prefersReduce]);

  const typed = useTypewriter(TAGLINE, 16, taglineStart && !prefersReduce);
  const taglineDisplay = prefersReduce ? TAGLINE : typed;

  const fade = (delay: number) =>
    prefersReduce
      ? {
          initial: { opacity: 1, y: 0 },
          animate: { opacity: 1, y: 0 },
          transition: { duration: 0 },
        }
      : {
          initial: { opacity: 0, y: 8 },
          animate: { opacity: 1, y: 0 },
          transition: { duration: 0.45, delay, ease: "easeOut" as const },
        };

  return (
    <section
      id="hero"
      ref={sectionRef}
      className="bg-grid relative flex min-h-screen items-center overflow-hidden px-6 py-24 sm:px-10"
    >
      {/* Cursor-reactive bright grid revealed by a radial mask. */}
      <div
        aria-hidden="true"
        className="bg-grid-bright hero-spotlight pointer-events-none absolute inset-0"
      />

      <div className="relative mx-auto w-full max-w-5xl">
        <motion.p
          {...fade(0)}
          className="font-mono text-sm text-accent sm:text-base"
        >
          ~/psymon —main &gt;
        </motion.p>

        <motion.h1
          {...fade(0.15)}
          className="font-heading mt-6 text-4xl font-bold tracking-tight sm:text-5xl md:text-6xl xl:text-7xl"
        >
          Psymon Sez Arcedera
        </motion.h1>

        <motion.p
          {...fade(0.35)}
          className="mt-6 max-w-2xl text-lg leading-relaxed text-muted-foreground sm:text-xl"
        >
          <span>{taglineDisplay}</span>
          <span aria-hidden="true" className="terminal-cursor" />
        </motion.p>

        <motion.dl
          {...fade(prefersReduce ? 0 : 1.55)}
          className="mt-10 inline-block border border-border bg-card p-4 font-mono text-sm leading-6 sm:text-[0.9rem]"
        >
          <div className="flex gap-3">
            <dt className="text-muted-foreground">STATUS:</dt>
            <dd>AI SWE Intern @ Ten X Development</dd>
          </div>
          <div className="flex gap-3">
            <dt className="text-muted-foreground">LOCATION:</dt>
            <dd>Calabarzon, PH</dd>
          </div>
          <div className="flex gap-3">
            <dt className="text-muted-foreground">OPEN_TO:</dt>
            <dd>SWE &amp; AI Developer roles</dd>
          </div>
        </motion.dl>

        <motion.div
          {...fade(prefersReduce ? 0 : 1.8)}
          className="mt-10 flex flex-col gap-3 sm:flex-row"
        >
          <a
            href="#projects"
            className="inline-flex items-center justify-center border border-foreground bg-foreground px-5 py-2.5 font-mono text-sm font-medium text-background transition-colors hover:bg-transparent hover:text-foreground"
          >
            [ View Projects ]
          </a>
          <a
            href="#contact"
            className="inline-flex items-center justify-center border border-border bg-transparent px-5 py-2.5 font-mono text-sm font-medium text-foreground transition-colors hover:border-accent-secondary hover:text-accent-secondary"
          >
            [ Get in Touch ]
          </a>
        </motion.div>

        <motion.div {...fade(prefersReduce ? 0 : 2.05)} className="mt-12">
          <HeroShell />
        </motion.div>
      </div>
    </section>
  );
}
