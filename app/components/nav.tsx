"use client";

import { useEffect, useState } from "react";
import { Menu, X } from "lucide-react";
import { cn } from "@/lib/utils";

const links = [
  { num: "01", label: "about", href: "#about" },
  { num: "02", label: "experience", href: "#experience" },
  { num: "03", label: "projects", href: "#projects" },
  { num: "04", label: "contact", href: "#contact" },
];

export function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  return (
    <header
      className={cn(
        "fixed inset-x-0 top-0 z-50 transition-colors",
        scrolled || open
          ? "border-b border-border bg-background/80 backdrop-blur"
          : "border-b border-transparent",
      )}
    >
      <nav className="mx-auto flex h-14 max-w-6xl items-center justify-between px-6 sm:px-10">
        <a
          href="#hero"
          className="font-mono text-sm transition-colors hover:text-accent-secondary"
        >
          <span className="text-accent">~/psymon</span>
          <span className="ml-1 text-muted-foreground">&gt;</span>
        </a>

        <ul className="hidden items-center gap-7 md:flex">
          {links.map((link) => (
            <li key={link.href}>
              <a
                href={link.href}
                className="group font-mono text-sm text-foreground transition-colors hover:text-accent-secondary"
              >
                <span className="text-muted-foreground group-hover:text-accent">
                  {link.num}.
                </span>{" "}
                {link.label}
              </a>
            </li>
          ))}
        </ul>

        <button
          type="button"
          aria-label={open ? "Close menu" : "Open menu"}
          aria-expanded={open}
          onClick={() => setOpen((v) => !v)}
          className="inline-flex h-9 w-9 items-center justify-center border border-border text-foreground transition-colors hover:border-accent-secondary hover:text-accent-secondary md:hidden"
        >
          {open ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
        </button>
      </nav>

      {open && (
        <div className="border-t border-border bg-background md:hidden">
          <ul className="mx-auto flex max-w-6xl flex-col px-6 py-2 sm:px-10">
            {links.map((link) => (
              <li key={link.href}>
                <a
                  href={link.href}
                  onClick={() => setOpen(false)}
                  className="group flex items-center gap-3 py-3 font-mono text-sm text-foreground transition-colors hover:text-accent-secondary"
                >
                  <span className="text-muted-foreground group-hover:text-accent">
                    {link.num}.
                  </span>
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
        </div>
      )}
    </header>
  );
}
