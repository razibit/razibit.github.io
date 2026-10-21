'use client';

export function ThemeControls() {
  function toggleTheme() {
    const root = document.documentElement;
    const next = root.dataset.theme === "dark" ? "light" : "dark";

    root.dataset.theme = next;
    root.dataset.themeSource = "explicit";
    try { localStorage.setItem("portfolio-theme", next); } catch { /* Storage may be disabled. */ }
  }

  return (
    <button
      className="theme-toggle"
      type="button"
      aria-label="Switch between light and dark themes"
      onClick={toggleTheme}
    >
      <svg
        className="theme-icon theme-icon-moon"
        aria-hidden="true"
        viewBox="0 0 24 24"
        fill="none"
      >
        <path
          d="M20.2 15.1A8.9 8.9 0 0 1 8.9 3.8 9 9 0 1 0 20.2 15.1Z"
          stroke="currentColor"
          strokeWidth="1.75"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
      <svg
        className="theme-icon theme-icon-sun"
        aria-hidden="true"
        viewBox="0 0 24 24"
        fill="none"
      >
        <circle cx="12" cy="12" r="4" stroke="currentColor" strokeWidth="1.75" />
        <path
          d="M12 2.75v2m0 14.5v2m9.25-9.25h-2m-14.5 0h-2m16.54-6.54-1.42 1.42M6.13 17.87l-1.42 1.42m14.58 0-1.42-1.42M6.13 6.13 4.71 4.71"
          stroke="currentColor"
          strokeWidth="1.75"
          strokeLinecap="round"
        />
      </svg>
    </button>
  );
}

