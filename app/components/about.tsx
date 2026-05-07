import { Reveal } from "./reveal";
import { TechMarquee } from "./tech-marquee";

export function About() {
  return (
    <section
      id="about"
      className="relative overflow-hidden py-24 md:py-32"
    >
      <Reveal className="relative mx-auto max-w-5xl px-6 sm:px-10">
        <div className="relative">
          <span
            aria-hidden="true"
            className="absolute -top-10 left-0 hidden h-6 w-px bg-border md:block"
          />
          <span
            aria-hidden="true"
            className="absolute -top-3 left-0 hidden h-1.5 w-1.5 -translate-x-1/2 rounded-full bg-accent md:block"
          />
          <p className="font-mono text-sm text-muted-foreground">
            // 01. about
          </p>
        </div>
        <h2 className="font-heading mt-3 text-3xl font-bold tracking-tight sm:text-4xl md:text-5xl">
          About
        </h2>

        <div className="mt-12 grid grid-cols-1 gap-10 md:grid-cols-[280px_1fr] md:gap-14 lg:grid-cols-[320px_1fr] lg:gap-16">
          {/* TODO: replace placeholder with <Image src="/psymon.jpg" ... /> once a photo is provided */}
          <div className="relative aspect-[4/5] w-full overflow-hidden border border-border bg-card">
            <div className="bg-grid absolute inset-0" aria-hidden="true" />
            <div className="absolute inset-0 flex flex-col items-center justify-center gap-2 font-mono text-xs text-muted-foreground">
              <span className="text-accent">~/photo</span>
              <span>[ psymon.jpg ]</span>
            </div>
          </div>

          <div className="space-y-4 leading-relaxed">
            <p>
              CS senior at UP Los Baños and a DOST-SEI Merit Scholar. I
              specialize in full-stack development with a growing focus on
              integrating AI into real products — the kind people actually
              use, not demos.
            </p>
            <p className="text-muted-foreground">
              Currently building admin dashboards and pose-detection kiosks at
              Ten X Development. Earlier I shipped a real-time jeepney
              tracking app for San Pablo City as my undergraduate Special
              Problem, and was nominated to the Honor Society of the
              Philippines (top 10% of batch).
            </p>
            <p className="text-muted-foreground">
              Outside of code: building public transit tech, hypertrophy
              training, and Filipino culinary culture.
            </p>
          </div>
        </div>
      </Reveal>

      <div className="mt-14 md:mt-20">
        <p className="mx-auto mb-6 max-w-5xl px-6 font-mono text-xs text-muted-foreground sm:px-10">
          // tech I&apos;m using
        </p>
        <TechMarquee />
      </div>
    </section>
  );
}
