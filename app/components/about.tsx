import Image from "next/image";
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
          <p className="font-mono text-sm text-muted-foreground">
            // 01. about
          </p>
        </div>
        <h2 className="font-heading mt-3 text-3xl font-bold tracking-tight sm:text-4xl md:text-5xl">
          About
        </h2>

        <div className="mt-12 grid grid-cols-1 gap-10 md:grid-cols-[280px_1fr] md:gap-14 lg:grid-cols-[320px_1fr] lg:gap-16">
          <div className="relative aspect-[4/5] w-full overflow-hidden border border-border bg-card">
            <Image
              src="/psymon.jpg"
              alt="Psymon Sez Arcedera"
              fill
              sizes="(min-width: 1024px) 320px, (min-width: 768px) 280px, 100vw"
              className="object-cover"
              priority
            />
          </div>

          <div className="space-y-4 leading-relaxed">
            <p>
              I build software that solves real problems for real people.
            </p>
            <p className="text-muted-foreground">
              I&apos;m a Computer Science student at the University of the
              Philippines Los Baños and a DOST-SEI Merit Scholar, but most of
              what I know I&apos;ve learned by shipping. As an AI Software
              Developer Intern at Ten X Development, I&apos;ve helped deploy
              production AI features across Metro Manila, including{" "}
              <strong className="font-semibold text-foreground">
                pose-detection kiosks
              </strong>{" "}
              running in malls, and built{" "}
              <strong className="font-semibold text-foreground">
                admin dashboard modules
              </strong>{" "}
              used by food chain clients to run their day-to-day operations.
            </p>
            <p className="text-muted-foreground">
              My work spans{" "}
              <strong className="font-semibold text-foreground">
                full-stack development
              </strong>
              ,{" "}
              <strong className="font-semibold text-foreground">
                mobile apps
              </strong>
              , and{" "}
              <strong className="font-semibold text-foreground">
                applied AI
              </strong>
              .{" "}
              <strong className="font-semibold text-foreground">
                React Native
              </strong>{" "}
              and{" "}
              <strong className="font-semibold text-foreground">Flutter</strong>{" "}
              on the front,{" "}
              <strong className="font-semibold text-foreground">Node.js</strong>
              ,{" "}
              <strong className="font-semibold text-foreground">Python</strong>,
              and{" "}
              <strong className="font-semibold text-foreground">
                Firebase
              </strong>{" "}
              on the back, with production exposure to{" "}
              <strong className="font-semibold text-foreground">
                LLM tooling
              </strong>{" "}
              and{" "}
              <strong className="font-semibold text-foreground">
                computer vision
              </strong>
              . I care less about chasing every new framework and more about
              making sure what I build actually works for the user, for the
              team, and at scale.
            </p>
            <p className="text-muted-foreground">
              When I&apos;m not coding, I&apos;m usually at the gym, hanging
              out, or exploring different places.
            </p>
            <p>
              I&apos;m currently open to software engineering and AI developer
              opportunities. If you&apos;re building something interesting,
              I&apos;d love to talk.
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
