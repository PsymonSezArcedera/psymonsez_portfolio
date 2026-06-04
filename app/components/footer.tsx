import { SiGithub } from "react-icons/si";

const SOURCE_URL =
  "https://github.com/PsymonSezArcedera/psymonsez_portfolio";

export function Footer() {
  const year = new Date().getFullYear();
  const sha = process.env.VERCEL_GIT_COMMIT_SHA?.slice(0, 7);

  return (
    <footer className="border-t border-border">
      <div className="mx-auto flex max-w-5xl flex-col gap-4 px-6 py-8 font-mono text-xs text-muted-foreground sm:flex-row sm:items-center sm:justify-between sm:px-10">
        <div className="flex flex-wrap items-center gap-x-3 gap-y-1">
          <span>
            <span className="text-accent">{"©"}</span> {year} Psymon
            Sez Arcedera
          </span>
        </div>

        <div className="flex flex-wrap items-center gap-x-3 gap-y-1">
          {sha && (
            <>
              <span aria-hidden="true" className="opacity-50">
                ·
              </span>
            </>
          )}
          <a
            href={SOURCE_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 transition-colors hover:text-accent-secondary"
          >
            <SiGithub className="h-3.5 w-3.5" aria-hidden="true" />
            <span>view source</span>
          </a>
        </div>
      </div>
    </footer>
  );
}
