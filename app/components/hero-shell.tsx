"use client";

import { motion, useDragControls } from "framer-motion";
import {
  useEffect,
  useRef,
  useState,
  type KeyboardEvent,
  type PointerEvent as ReactPointerEvent,
  type RefObject,
} from "react";
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

const COMMANDS = [
  "help",
  "whoami",
  "projects",
  "experience",
  "about",
  "contact",
  "socials",
  "ls",
  "clear",
];

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

type HeroShellProps = {
  /** Section ref the window is allowed to roam inside. Drag is disabled if absent. */
  constraintsRef?: RefObject<HTMLElement | null>;
};

export function HeroShell({ constraintsRef }: HeroShellProps) {
  const [history, setHistory] = useState<Line[]>([
    {
      kind: "info",
      text: "> commands: help · projects · whoami · contact · clear",
    },
  ]);
  const [input, setInput] = useState("");
  const [cmdLog, setCmdLog] = useState<string[]>([]);
  const [logIdx, setLogIdx] = useState<number | null>(null);
  const [focused, setFocused] = useState(false);
  const [draggable, setDraggable] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const outputRef = useRef<HTMLDivElement>(null);
  const dragControls = useDragControls();

  // Drag is desktop-only — on touch, it would fight the page scroll.
  useEffect(() => {
    if (typeof window === "undefined") return;
    const mq = window.matchMedia("(min-width: 768px) and (pointer: fine)");
    setDraggable(mq.matches);
    const onChange = (e: MediaQueryListEvent) => setDraggable(e.matches);
    mq.addEventListener("change", onChange);
    return () => mq.removeEventListener("change", onChange);
  }, []);

  const showIdleCursor = !focused && input.length === 0;
  const dragEnabled = draggable && Boolean(constraintsRef);

  function handleTitleBarPointerDown(e: ReactPointerEvent<HTMLDivElement>) {
    if (!dragEnabled) return;
    dragControls.start(e);
  }

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
    } else if (e.key === "Tab") {
      e.preventDefault();
      const partial = input.toLowerCase();
      if (!partial) return;
      const matches = COMMANDS.filter((c) => c.startsWith(partial));
      if (matches.length === 0) return;
      if (matches.length === 1) {
        setInput(matches[0]);
        return;
      }
      let prefix = matches[0];
      for (const m of matches) {
        while (!m.startsWith(prefix)) prefix = prefix.slice(0, -1);
      }
      if (prefix.length > partial.length) {
        setInput(prefix);
      } else {
        append([{ kind: "output", text: matches.join("  ") }]);
      }
    }
  }

  return (
    <motion.div
      drag={dragEnabled}
      dragControls={dragControls}
      dragListener={false}
      dragConstraints={constraintsRef}
      dragMomentum={false}
      dragElastic={0.08}
      whileDrag={{ scale: 1.005 }}
      onClick={() => inputRef.current?.focus()}
      className="max-w-2xl cursor-text border border-border bg-card font-mono text-sm shadow-sm transition-colors hover:border-accent/50"
    >
      <div
        onPointerDown={handleTitleBarPointerDown}
        className={cn(
          "flex select-none items-center gap-2 border-b border-border px-4 py-2 text-xs text-muted-foreground",
          dragEnabled && "cursor-grab active:cursor-grabbing",
        )}
      >
        <span className="h-2.5 w-2.5 rounded-full bg-destructive/70" />
        <span className="h-2.5 w-2.5 rounded-full bg-accent/60" />
        <span className="h-2.5 w-2.5 rounded-full bg-accent-secondary/60" />
        <span className="ml-2">psymon@portfolio: ~</span>
      </div>

      <div className="p-3">
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
          <div className="relative flex-1">
            <input
              ref={inputRef}
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={handleKey}
              onFocus={() => setFocused(true)}
              onBlur={() => setFocused(false)}
              spellCheck={false}
              autoCapitalize="off"
              autoCorrect="off"
              aria-label="terminal input, type 'help' to explore"
              className="w-full bg-transparent text-foreground caret-accent outline-none placeholder:text-muted-foreground/40"
              placeholder={showIdleCursor ? "" : "type a command…"}
            />
            {showIdleCursor && (
              <span
                aria-hidden="true"
                className="terminal-cursor pointer-events-none absolute left-0 top-1/2 -translate-y-1/2"
              />
            )}
          </div>
        </div>
      </div>
    </motion.div>
  );
}
