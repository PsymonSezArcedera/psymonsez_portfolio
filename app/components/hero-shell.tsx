"use client";

import { useRef, useState, type KeyboardEvent } from "react";
import { cn } from "@/lib/utils";

type Line = {
  kind: "input" | "output" | "error" | "info";
  text: string;
};

const PROMPT = "~/psymon —main >";

const SECTIONS: Record<string, string> = {
  projects: "projects",
  experience: "experience",
  about: "about",
  contact: "contact",
};

const HELP_LINES = [
  "available commands:",
  "  help        show this list",
  "  projects    jump to projects",
  "  experience  jump to experience",
  "  about       about psymon",
  "  contact     get in touch",
  "  socials     show social links",
  "  whoami      one-line summary",
  "  ls          list sections",
  "  clear       clear output",
];

const WHOAMI_LINES = [
  "Psymon Sez Arcedera",
  "CS senior @ UPLB · DOST-SEI Merit Scholar",
  "AI SWE Intern @ Ten X Development",
];

const SOCIALS_LINES = [
  "email    → psarcedera@gmail.com",
  "github   → github.com/PsymonSezArcedera",
  "linkedin → linkedin.com/in/psymonsezarcedera",
];

function scrollToId(id: string) {
  if (typeof document === "undefined") return;
  const el = document.getElementById(id);
  if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
}

export function HeroShell() {
  const [history, setHistory] = useState<Line[]>([
    { kind: "info", text: "type 'help' to explore" },
  ]);
  const [input, setInput] = useState("");
  const [cmdLog, setCmdLog] = useState<string[]>([]);
  const [logIdx, setLogIdx] = useState<number | null>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const outputRef = useRef<HTMLDivElement>(null);

  const append = (lines: Line[]) =>
    setHistory((h) => [...h, ...lines].slice(-40));

  function run(raw: string) {
    const cmd = raw.trim().toLowerCase();
    append([{ kind: "input", text: `${PROMPT} ${raw}` }]);
    if (!cmd) return;
    setCmdLog((l) => [...l, raw]);

    if (cmd === "help") {
      append(HELP_LINES.map((text) => ({ kind: "output" as const, text })));
    } else if (cmd === "clear") {
      setHistory([]);
    } else if (cmd === "whoami") {
      append(WHOAMI_LINES.map((text) => ({ kind: "output" as const, text })));
    } else if (cmd === "socials") {
      append(SOCIALS_LINES.map((text) => ({ kind: "output" as const, text })));
    } else if (cmd === "ls") {
      append([
        {
          kind: "output",
          text: Object.keys(SECTIONS)
            .map((s) => `${s}/`)
            .join("  "),
        },
      ]);
    } else if (cmd in SECTIONS) {
      append([{ kind: "output", text: `navigating to /${cmd}…` }]);
      scrollToId(SECTIONS[cmd]);
    } else {
      append([
        { kind: "error", text: `command not found: ${cmd} (try 'help')` },
      ]);
    }
  }

  function handleKey(e: KeyboardEvent<HTMLInputElement>) {
    if (e.key === "Enter") {
      run(input);
      setInput("");
      setLogIdx(null);
      requestAnimationFrame(() => {
        const el = outputRef.current;
        if (el) el.scrollTop = el.scrollHeight;
      });
    } else if (e.key === "ArrowUp") {
      if (cmdLog.length === 0) return;
      e.preventDefault();
      const next =
        logIdx === null ? cmdLog.length - 1 : Math.max(0, logIdx - 1);
      setLogIdx(next);
      setInput(cmdLog[next] ?? "");
    } else if (e.key === "ArrowDown") {
      if (logIdx === null) return;
      e.preventDefault();
      const next = logIdx + 1;
      if (next >= cmdLog.length) {
        setLogIdx(null);
        setInput("");
      } else {
        setLogIdx(next);
        setInput(cmdLog[next]);
      }
    }
  }

  return (
    <div
      onClick={() => inputRef.current?.focus()}
      className="max-w-2xl cursor-text border border-border bg-card p-3 font-mono text-sm"
    >
      <div
        ref={outputRef}
        className="no-scrollbar max-h-40 overflow-y-auto pr-1"
      >
        {history.map((line, i) => (
          <div
            key={i}
            className={cn(
              "leading-6 whitespace-pre-wrap",
              line.kind === "input" && "text-accent",
              line.kind === "error" && "text-destructive",
              line.kind === "info" && "italic text-muted-foreground",
            )}
          >
            {line.text}
          </div>
        ))}
      </div>
      <div className="mt-1 flex items-center gap-2">
        <span className="shrink-0 text-accent">{PROMPT}</span>
        <input
          ref={inputRef}
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={handleKey}
          spellCheck={false}
          autoCapitalize="off"
          autoCorrect="off"
          aria-label="terminal input — type 'help' to explore"
          className="flex-1 bg-transparent text-foreground caret-accent outline-none placeholder:text-muted-foreground/50"
          placeholder="type a command…"
        />
      </div>
    </div>
  );
}
