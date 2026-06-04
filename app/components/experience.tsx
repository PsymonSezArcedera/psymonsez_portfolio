"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import Image from "next/image";
import { useRef } from "react";
import { cn } from "@/lib/utils";

type Role = {
  company: string;
  title: string;
  period: string;
  current?: boolean;
  bullets: string[];
  /** Filename used inside the terminal header (e.g. ten-x.log) */
  logFile: string;
  /** Path under /public/ for the company logo */
  logoSrc: string;
  /** Use a white frame instead of the dark default — for logos that need contrast on dark backgrounds. */
  logoLight?: boolean;
};

const roles: Role[] = [
  {
    company: "Ten X Development",
    title: "AI Software Developer Intern",
    period: "Sep 2025 – May 2026",
    current: true,
    logFile: "ten-x.log",
    logoSrc: "/ten-x.png",
    bullets: [
      "Developed 3 of 5 core features for AI-powered interactive kiosks deployed across 5 mall locations in Metro Manila, including pose detectiondriven experiences, boosting consumer engagement with telecom products and services at scale.",
      "Engineered 6 core modules for a full-featured admin dashboard for a major food chain client: covering orders, menu, inventory, products, customers, and settings, enabling real-time operational control and significantly reducing manual overhead.",
      " Maintained system stability across multiple production environments through proactive bug fixing and cross-functional collaboration, ensuring consistent performance and on-time delivery.",
      "Authored and maintained technical documentation for critical system workflows, streamlining team knowledge sharing and improving onboarding efficiency."
    ],
  },
  {
    company: "Department of Science and Technology",
    title: "Software Developer Intern",
    period: "Jun 2025 – Aug 2025",
    logFile: "dost.log",
    logoSrc: "/dost.png",
    logoLight: true,
    bullets: [
      "Built and deployed a full-stack prototype web application consolidating records of 10 government offices and facilities into a single centralized interface, serving staff across multiple DOST regional divisions.",
      "Implemented 3 core workflows: record creation and updates, search and filtering, and detail views, iterating on usability based on stakeholder feedback to deliver a polished, production-ready system.",
      "Translated stakeholder requirements into functional features end-to-end, conducting iterative testing and maintaining thorough documentation for long-term maintainability and handoff."
    ],
  },
];

export function Experience() {
  const timelineRef = useRef<HTMLOListElement>(null);

  // Scroll-link the line draw to the timeline's position in the viewport.
  const { scrollYProgress } = useScroll({
    target: timelineRef,
    offset: ["start 75%", "end 60%"],
  });
  const lineScaleY = useTransform(scrollYProgress, [0, 1], [0, 1]);

  return (
    <section
      id="experience"
      className="relative overflow-hidden px-6 py-24 sm:px-10 md:py-32"
    >
      <div className="mx-auto max-w-5xl">
        <motion.div
          initial={{ opacity: 0, y: 8 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.6 }}
          transition={{ duration: 0.4, ease: "easeOut" }}
          className="relative"
        >
          <p className="font-mono text-sm text-muted-foreground">
            // 02. experience
          </p>
        </motion.div>
        <motion.h2
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.6 }}
          transition={{ duration: 0.5, ease: "easeOut", delay: 0.05 }}
          className="font-heading mt-3 text-3xl font-bold tracking-tight sm:text-4xl md:text-5xl"
        >
          Experience
        </motion.h2>
        <motion.p
          initial={{ opacity: 0, y: 8 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.6 }}
          transition={{ duration: 0.5, ease: "easeOut", delay: 0.1 }}
          className="mt-4 max-w-xl text-muted-foreground"
        >
          Where I&apos;ve been shipping code.
        </motion.p>

        <ol ref={timelineRef} className="relative mt-14 ml-3 sm:ml-5">
          {/* Static base line (dim) */}
          <span
            aria-hidden="true"
            className="absolute left-0 top-2 bottom-2 w-px bg-border"
          />
          {/* Animated overlay — grows as the user scrolls through the section */}
          <motion.span
            aria-hidden="true"
            style={{ scaleY: lineScaleY }}
            className="absolute left-0 top-2 bottom-2 w-px origin-top bg-accent shadow-[0_0_8px_var(--accent)]"
          />

          {roles.map((role, i) => (
            <motion.li
              key={`${role.company}-${role.period}`}
              initial={{ opacity: 0, x: 28 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, amount: 0.25 }}
              transition={{
                duration: 0.55,
                ease: [0.22, 1, 0.36, 1],
                delay: i * 0.12,
              }}
              className="relative pb-12 pl-8 last:pb-0 sm:pl-12"
            >
              {/* Node */}
              <span
                aria-hidden="true"
                className="absolute -left-[5px] top-3 flex h-2.5 w-2.5 items-center justify-center"
              >
                {role.current && (
                  <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-accent/70" />
                )}
                <span
                  className="relative inline-flex h-2.5 w-2.5 rounded-full border border-accent bg-accent shadow-[0_0_10px_var(--accent)]"
                />
              </span>

              {/* Card */}
              <article className="group relative overflow-hidden border border-border bg-card transition-all duration-300 hover:-translate-y-1 hover:border-accent-secondary hover:shadow-[0_12px_40px_-12px_rgba(0,212,255,0.25)]">
                {/* Entrance shine sweep — passes once when card enters view */}
                <motion.span
                  aria-hidden="true"
                  initial={{ x: "-120%" }}
                  whileInView={{ x: "220%" }}
                  viewport={{ once: true, amount: 0.4 }}
                  transition={{
                    duration: 1.4,
                    delay: i * 0.12 + 0.35,
                    ease: "easeOut",
                  }}
                  className="pointer-events-none absolute inset-y-0 left-0 z-0 w-1/3 -skew-x-12 bg-gradient-to-r from-transparent via-foreground/[0.06] to-transparent"
                />

                {/* Terminal-window header */}
                <div className="relative flex items-center gap-2 border-b border-border bg-background/40 px-4 py-2">
                  <span className="h-2 w-2 rounded-full bg-destructive/60" />
                  <span className="h-2 w-2 rounded-full bg-accent/50" />
                  <span className="h-2 w-2 rounded-full bg-accent-secondary/50" />
                  <span className="ml-2 font-mono text-[0.7rem] text-muted-foreground">
                    ~/experience/{role.logFile}
                  </span>
                  <span className="ml-auto font-mono text-[0.7rem] text-muted-foreground/70">
                    [{String(i + 1).padStart(2, "0")}]
                  </span>
                </div>

                <div className="relative p-6 md:p-8">
                  <header className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between sm:gap-6">
                    <div className="flex items-start gap-4">
                      <div
                        className={cn(
                          "relative flex h-14 w-14 shrink-0 items-center justify-center overflow-hidden border border-border transition-colors duration-300 group-hover:border-accent-secondary sm:h-16 sm:w-16",
                          role.logoLight ? "bg-white" : "bg-background",
                        )}
                        aria-hidden="true"
                      >
                        {!role.logoLight && (
                          <div className="bg-grid absolute inset-0" />
                        )}
                        <Image
                          src={role.logoSrc}
                          alt=""
                          fill
                          sizes="64px"
                          className="relative object-contain p-2"
                        />
                      </div>

                      <div>
                        <h3 className="font-heading text-xl font-bold tracking-tight">
                          {role.title}
                        </h3>
                        <p className="mt-1 font-mono text-sm text-accent-secondary">
                          @ {role.company}
                        </p>
                      </div>
                    </div>

                    <span
                      className="flex shrink-0 items-center gap-1.5 self-start border border-accent px-2 py-0.5 font-mono text-[0.65rem] uppercase tracking-wider text-accent shadow-[0_0_12px_-2px_var(--accent)]"
                    >
                      {role.period}
                    </span>
                  </header>

                  <ul className="mt-6 space-y-2">
                    {role.bullets.map((bullet, j) => (
                      <motion.li
                        key={bullet}
                        initial={{ opacity: 0, x: 12 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true, amount: 0.4 }}
                        transition={{
                          duration: 0.4,
                          ease: "easeOut",
                          delay: 0.25 + j * 0.07,
                        }}
                        className="flex gap-3 text-sm leading-relaxed text-foreground/90"
                      >
                        <span
                          className="font-mono text-accent"
                          aria-hidden="true"
                        >
                          ›
                        </span>
                        <span>{bullet}</span>
                      </motion.li>
                    ))}
                  </ul>
                </div>
              </article>
            </motion.li>
          ))}
        </ol>
      </div>
    </section>
  );
}
