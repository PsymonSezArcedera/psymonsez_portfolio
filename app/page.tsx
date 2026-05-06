export default function Home() {
  return (
    <main className="flex flex-1 items-center justify-center px-6 py-24">
      <div className="mx-auto max-w-3xl space-y-4">
        <p className="font-mono text-sm text-muted-foreground">
          ~/psymon &gt; status
        </p>
        <h1 className="font-heading text-4xl font-semibold tracking-tight sm:text-5xl">
          <span className="text-accent">$</span> foundation_ready
          <span className="terminal-cursor" />
        </h1>
        <p className="text-muted-foreground">
          Design system, fonts, and shadcn/ui are wired up. Sections come next.
        </p>
      </div>
    </main>
  );
}
