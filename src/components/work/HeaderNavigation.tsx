"use client";

import { useEffect, useRef, useState } from "react";
import { usePathname } from "next/navigation";
import type { NavigationItem } from "@/lib/content";
import { ThemeControls } from "./ThemeControls";

const DESKTOP_QUERY = "(min-width: 640px)";
const MOBILE_QUERY = "(max-width: 639px)";
const HEADER_OFFSET = 80;

export default function HeaderNavigation({ items }: { items: NavigationItem[] }) {
  const pathname = usePathname() ?? "/";
  const currentPath = pathname.replace(/\/+$/, "") || "/";
  const isHome = currentPath === "/";
  const [activeSection, setActiveSection] = useState(
    () => items.find((item) => item.type === "section")?.target ?? "",
  );
  const [menuOpen, setMenuOpen] = useState(false);
  const menuButtonRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (!isHome) {
      setActiveSection("");
      return;
    }

    const sectionItems = items.filter((item) => item.type === "section");
    const sectionTargets = new Set(sectionItems.map((item) => item.target));
    const sections = sectionItems
      .map((item) => document.getElementById(item.target))
      .filter((section): section is HTMLElement => section !== null);

    if (sections.length === 0) return;

    const finalSection = sections.reduce((last, section) =>
      last.compareDocumentPosition(section) & Node.DOCUMENT_POSITION_FOLLOWING ? section : last,
    );

    const syncHash = () => {
      const target = window.location.hash.slice(1);
      if (sectionTargets.has(target)) {
        setActiveSection(target);
      } else if (!target) {
        setActiveSection(sectionItems[0]?.target ?? "");
      }
    };

    syncHash();

    const observer = new IntersectionObserver((entries) => {
      const hashTarget = window.location.hash.slice(1);
      if (sectionTargets.has(hashTarget)) {
        const hashSection = document.getElementById(hashTarget);
        const hashBounds = hashSection?.getBoundingClientRect();
        if (hashBounds && hashBounds.bottom > HEADER_OFFSET && hashBounds.top < window.innerHeight) {
          setActiveSection(hashTarget);
          return;
        }
      }

      const atPageEnd = window.scrollY + window.innerHeight >=
        document.documentElement.scrollHeight - 2;
      if (atPageEnd) {
        setActiveSection(finalSection.id);
        return;
      }

      const intersecting = entries.filter((entry) => entry.isIntersecting);
      if (intersecting.length === 0) return;

      const activeEntry = intersecting.reduce((closest, entry) =>
        Math.abs(entry.boundingClientRect.top - HEADER_OFFSET) <
        Math.abs(closest.boundingClientRect.top - HEADER_OFFSET)
          ? entry
          : closest,
      );

      setActiveSection(activeEntry.target.id);
    }, { rootMargin: `-${HEADER_OFFSET}px 0px -65% 0px`, threshold: 0 });

    sections.forEach((section) => observer.observe(section));
    window.addEventListener("hashchange", syncHash);

    return () => {
      observer.disconnect();
      window.removeEventListener("hashchange", syncHash);
    };
  }, [isHome, items]);

  useEffect(() => {
    const desktop = window.matchMedia(DESKTOP_QUERY);
    const closeOnDesktop = (event: MediaQueryListEvent) => {
      if (event.matches) setMenuOpen(false);
    };

    desktop.addEventListener("change", closeOnDesktop);
    return () => desktop.removeEventListener("change", closeOnDesktop);
  }, []);

  useEffect(() => {
    if (!menuOpen) return;

    const closeOnEscape = (event: KeyboardEvent) => {
      if (event.key !== "Escape") return;
      setMenuOpen(false);
      menuButtonRef.current?.focus();
    };

    document.addEventListener("keydown", closeOnEscape);
    return () => document.removeEventListener("keydown", closeOnEscape);
  }, [menuOpen]);

  useEffect(() => {
    setMenuOpen(false);
  }, [pathname]);

  return (
    <header className="site-header">
      <div className="site-header-inner">
        <button
          ref={menuButtonRef}
          className="nav-menu-toggle"
          type="button"
          aria-label={menuOpen ? "Close navigation" : "Open navigation"}
          aria-expanded={menuOpen}
          aria-controls="primary-navigation"
          onClick={() => setMenuOpen((open) => !open)}
        >
          {menuOpen ? "Close" : "Menu"}
        </button>

        <nav
          className="primary-nav"
          id="primary-navigation"
          aria-label="Primary"
          data-open={menuOpen}
        >
          <ul className="primary-nav-list">
            {items.map((item) => {
              const hrefPath = item.href.split("#", 1)[0].replace(/\/+$/, "") || "/";
              const isCurrentPage = item.type !== "section" && hrefPath !== "/" &&
                (currentPath === hrefPath || currentPath.startsWith(`${hrefPath}/`));
              const isCurrentSection = item.type === "section" && isHome &&
                activeSection === item.target;
              const ariaCurrent = isCurrentSection ? "location" :
                isCurrentPage ? "page" : undefined;

              return (
                <li key={item.target}>
                  <a
                    href={item.href}
                    aria-current={ariaCurrent}
                    onClick={() => {
                      setMenuOpen(false);
                      if (item.type === "section" && isHome) setActiveSection(item.target);
                      if (window.matchMedia(MOBILE_QUERY).matches) menuButtonRef.current?.focus();
                    }}
                  >
                    {item.title}
                  </a>
                </li>
              );
            })}
          </ul>
        </nav>
        <ThemeControls />
      </div>
    </header>
  );
}
