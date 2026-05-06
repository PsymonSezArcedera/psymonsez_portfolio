export function Hero() {
  return (
    <section
      id="hero"
      className="relative flex min-h-screen items-center overflow-hidden px-6 pt-16 pb-32 md:px-8 md:pb-48"
    >
      {/* Subtle accent glow — top right, almost imperceptible */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -right-32 -top-32 h-160 w-160"
        style={{
          background:
            "radial-gradient(circle at center, rgba(99, 102, 241, 0.08), transparent 60%)",
        }}
      />

      <div className="relative mx-auto w-full max-w-3xl">
        {/* Availability indicator */}
        <div className="flex items-center gap-2.5 text-xs font-medium uppercase tracking-[0.15em] text-foreground-muted">
          <span className="relative flex h-2 w-2" aria-hidden="true">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-success opacity-60" />
            <span className="relative inline-flex h-2 w-2 rounded-full bg-success" />
          </span>
          Available for work
        </div>

        <h1 className="mt-8 text-5xl font-semibold tracking-[-0.03em] md:text-7xl">
          Psymon Sez Arcedera
        </h1>

        <p className="mt-6 max-w-2xl text-xl text-foreground-muted md:text-2xl">
          Building AI-powered products and enterprise systems.
        </p>

        <p className="mt-6 max-w-xl text-base leading-relaxed text-foreground-muted md:text-lg">
          Currently an AI Software Developer Intern at Ten X Development and CS
          senior at UPLB. Open to full-time roles in software and AI engineering
          starting mid-2026.
        </p>

        <div className="mt-10 flex flex-wrap items-center gap-3">
          <a
            href="#projects"
            className="inline-flex items-center justify-center rounded-lg bg-accent px-5 py-2.5 text-sm font-medium text-accent-foreground transition-all duration-200 hover:-translate-y-0.5 hover:bg-accent/90"
          >
            View Work
          </a>
          <a
            href="#contact"
            className="inline-flex items-center justify-center rounded-lg border border-border-strong px-5 py-2.5 text-sm font-medium text-foreground transition-all duration-200 hover:border-foreground"
          >
            Get in Touch
          </a>
        </div>
      </div>
    </section>
  );
}
