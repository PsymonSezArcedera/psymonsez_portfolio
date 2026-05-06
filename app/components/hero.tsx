export function Hero() {
  return (
    <section
      id="hero"
      className="bg-grid relative flex min-h-screen items-center px-6 py-24 sm:px-10"
    >
      <div className="mx-auto w-full max-w-5xl">
        <p className="font-mono text-sm text-accent sm:text-base">
          ~/psymon —main &gt;
        </p>

        <h1 className="font-heading mt-6 text-4xl font-bold tracking-tight sm:text-5xl md:text-6xl xl:text-7xl">
          Psymon Sez Arcedera
        </h1>

        <p className="mt-6 max-w-2xl text-lg leading-relaxed text-muted-foreground sm:text-xl">
          <span>
            Full-Stack Developer building AI-powered products and enterprise
            systems
          </span>
          <span aria-hidden="true" className="terminal-cursor" />
        </p>

        <dl className="mt-10 inline-block border border-border bg-card p-4 font-mono text-sm leading-6 sm:text-[0.9rem]">
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
        </dl>

        <div className="mt-10 flex flex-col gap-3 sm:flex-row">
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
        </div>
      </div>
    </section>
  );
}
