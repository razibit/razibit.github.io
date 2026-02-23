import { useState } from "react";
import { HiMenu, HiX, HiMoon, HiSun } from "react-icons/hi";
import { useTheme } from "../context/ThemeContext";

const navLinks = [
  { label: "About", href: "#about" },
  { label: "Skills", href: "#skills" },
  { label: "Experience", href: "#experience" },
  { label: "Projects", href: "#projects" },
  { label: "Publications", href: "#publications" },
  { label: "Research", href: "#research" },
  { label: "Awards", href: "#awards" },
  { label: "Contact", href: "#contact" },
];

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const { dark, toggle } = useTheme();

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-white/80 dark:bg-gray-900/80 backdrop-blur-md border-b border-gray-100 dark:border-gray-800">
      <div className="mx-auto max-w-6xl flex items-center justify-between px-6 py-3">
        {/* Logo / Name */}
        <a
          href="#hero"
          className="text-lg font-semibold tracking-tight text-gray-900 dark:text-white hover:text-accent transition-colors"
        >
          Rajib Dab
        </a>

        {/* Desktop links + theme toggle */}
        <div className="hidden md:flex items-center gap-6">
          <ul className="flex items-center gap-6 text-sm font-medium text-gray-600 dark:text-gray-300">
            {navLinks.map((l) => (
              <li key={l.href}>
                <a
                  href={l.href}
                  className="hover:text-accent transition-colors"
                >
                  {l.label}
                </a>
              </li>
            ))}
          </ul>
          <button
            onClick={toggle}
            className="p-2 rounded-lg text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 hover:text-accent transition-colors"
            aria-label="Toggle dark mode"
          >
            {dark ? <HiSun size={20} /> : <HiMoon size={20} />}
          </button>
        </div>

        {/* Mobile: theme toggle + hamburger */}
        <div className="flex md:hidden items-center gap-2">
          <button
            onClick={toggle}
            className="p-2 rounded-lg text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 hover:text-accent transition-colors"
            aria-label="Toggle dark mode"
          >
            {dark ? <HiSun size={20} /> : <HiMoon size={20} />}
          </button>
          <button
            onClick={() => setOpen(!open)}
            className="text-gray-700 dark:text-gray-300 focus:outline-none"
            aria-label="Toggle menu"
          >
            {open ? <HiX size={24} /> : <HiMenu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {open && (
        <ul className="md:hidden bg-white dark:bg-gray-900 border-t border-gray-100 dark:border-gray-800 px-6 pb-4 space-y-3 text-sm font-medium text-gray-600 dark:text-gray-300">
          {navLinks.map((l) => (
            <li key={l.href}>
              <a
                href={l.href}
                onClick={() => setOpen(false)}
                className="block py-1 hover:text-accent transition-colors"
              >
                {l.label}
              </a>
            </li>
          ))}
        </ul>
      )}
    </nav>
  );
}
