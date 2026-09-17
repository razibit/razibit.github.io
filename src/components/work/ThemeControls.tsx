'use client';

import { useEffect, useState } from "react";

export function ThemeControls() {
  const [theme, setTheme] = useState<"light" | "dark">("light");

  useEffect(() => {
    const current = document.documentElement.dataset.theme === "dark" ? "dark" : "light";
    setTheme(current);
  }, []);

  function choose(next: "light" | "dark") {
    document.documentElement.dataset.theme = next;
    document.documentElement.dataset.themeSource = "explicit";
    setTheme(next);
    try { localStorage.setItem("portfolio-theme", next); } catch { /* Storage may be disabled. */ }
  }

  return (
    <div className="theme-control" role="group" aria-label="Color theme">
      <button type="button" data-theme-choice="light" aria-pressed={theme === "light"} onClick={() => choose("light")}>Light</button>
      <button type="button" data-theme-choice="dark" aria-pressed={theme === "dark"} onClick={() => choose("dark")}>Dark</button>
    </div>
  );
}

export function SectionNav({ items }: { items: { title: string; target: string; href: string }[] }) {
  const [active, setActive] = useState(items[0]?.target ?? "");

  useEffect(() => {
    const sections = items.map((item) => document.getElementById(item.target)).filter(Boolean) as HTMLElement[];
    const observer = new IntersectionObserver((entries) => {
      for (const entry of entries) if (entry.isIntersecting) setActive(entry.target.id);
    }, { rootMargin: "-20% 0px -65% 0px", threshold: 0 });
    sections.forEach((section) => observer.observe(section));
    return () => observer.disconnect();
  }, [items]);

  return (
    <nav className="section-nav" aria-label="On this page">
      {items.map((item) => (
        <a key={item.target} href={item.href} aria-current={active === item.target ? "location" : undefined}>{item.title}</a>
      ))}
    </nav>
  );
}

