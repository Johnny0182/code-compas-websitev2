"use client";

type Theme = "light" | "dark";

const STORAGE_KEY = "code-compas-theme";
function applyTheme(theme: Theme) {
  document.documentElement.dataset.theme = theme;
  document.documentElement.style.colorScheme = theme;
}

export function ThemeToggle() {
  function toggleTheme() {
    const nextTheme: Theme = document.documentElement.dataset.theme === "dark" ? "light" : "dark";
    applyTheme(nextTheme);
    try { window.localStorage.setItem(STORAGE_KEY, nextTheme); } catch { /* Theme still applies when storage is unavailable. */ }
  }

  return (
    <button
      className="theme-toggle"
      type="button"
      aria-label="Toggle color theme"
      onClick={toggleTheme}
    >
      <svg className="theme-toggle-icon theme-toggle-icon--moon" viewBox="0 0 24 24" aria-hidden="true">
        <path d="M20.4 15.2A8.5 8.5 0 0 1 8.8 3.6a8.6 8.6 0 1 0 11.6 11.6Z" />
      </svg>
      <svg className="theme-toggle-icon theme-toggle-icon--sun" viewBox="0 0 24 24" aria-hidden="true">
        <circle cx="12" cy="12" r="4" />
        <path d="M12 2v2M12 20v2M4.93 4.93l1.42 1.42M17.66 17.66l1.41 1.41M2 12h2M20 12h2M4.93 19.07l1.42-1.42M17.66 6.34l1.41-1.41" />
      </svg>
    </button>
  );
}
