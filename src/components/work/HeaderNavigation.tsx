"use client";

import { useEffect, useRef, useState } from "react";
import { usePathname } from "next/navigation";
import type { NavigationItem } from "@/lib/content";
import { ThemeControls } from "./ThemeControls";

const DESKTOP_QUERY = "(min-width: 1024px)";
const MOBILE_QUERY = "(max-width: 1023px)";
const HEADER_OFFSET = 80;
const PRONUNCIATION_AUDIO_URL = "/audio/name-pronunciation.mp3";
const PRONUNCIATION_ERROR_MESSAGE =
  "Name pronunciation audio could not be played. Please try again.";

export default function HeaderNavigation({
  items,
  name,
}: {
  items: NavigationItem[];
  name: string;
}) {
  const pathname = usePathname() ?? "/";
  const currentPath = pathname.replace(/\/+$/, "") || "/";
  const isHome = currentPath === "/";
  const [activeSection, setActiveSection] = useState(
    () => items.find((item) => item.type === "section")?.target ?? "",
  );
  const [menuOpen, setMenuOpen] = useState(false);
  const [audioError, setAudioError] = useState("");
  const menuButtonRef = useRef<HTMLButtonElement>(null);
  const audioRef = useRef<HTMLAudioElement>(null);
  const playbackAttemptRef = useRef(0);

  const handleAudioError = () => setAudioError(PRONUNCIATION_ERROR_MESSAGE);

  const playNamePronunciation = () => {
    const audio = audioRef.current;
    if (!audio) return;

    const playbackAttempt = ++playbackAttemptRef.current;
    setAudioError("");
    try {
      if (!audio.hasAttribute("src")) audio.src = PRONUNCIATION_AUDIO_URL;
      audio.pause();
      audio.currentTime = 0;
      void audio.play().catch(() => {
        if (playbackAttempt === playbackAttemptRef.current) handleAudioError();
      });
    } catch {
      handleAudioError();
    }
  };

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
        <div className="site-header-brand">
          <span className="site-header-name">{name}</span>
          <button
            className="name-pronunciation-button"
            type="button"
            aria-label="Play name pronunciation"
            onClick={playNamePronunciation}
          >
            <svg aria-hidden="true" viewBox="0 0 24 24" fill="none">
              <path
                d="M3 9v6h4l5 4V5L7 9H3Z"
                stroke="currentColor"
                strokeWidth="1.75"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M16 9a5 5 0 0 1 0 6m3-9a9 9 0 0 1 0 12"
                stroke="currentColor"
                strokeWidth="1.75"
                strokeLinecap="round"
              />
            </svg>
          </button>
          <span className="site-header-audio-status" role="status" aria-live="polite" aria-atomic="true">
            {audioError}
          </span>
          <audio ref={audioRef} preload="none" hidden onError={handleAudioError} />
        </div>

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
            <li className="theme-control-item" key="theme-control">
              <ThemeControls />
            </li>
            <li key="academic-portfolio">
              <a
                className="academic-link"
                href="https://razibit.github.io/academic/"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Academic portfolio (opens in a new tab)"
                onClick={() => {
                  setMenuOpen(false);
                  if (window.matchMedia(MOBILE_QUERY).matches) menuButtonRef.current?.focus();
                }}
              >
                <span>Academic</span>
                <svg aria-hidden="true" viewBox="0 0 24 24" fill="none">
                  <path
                    d="M14 3h7v7m0-7L10 14m8-1v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h6"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </a>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
}
