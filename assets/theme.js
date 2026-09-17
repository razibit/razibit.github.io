/* Resolve the first paint without requiring storage access. */
(() => {
  let saved = null;
  try {
    const value = localStorage.getItem('portfolio-theme');
    if (value === 'light' || value === 'dark') saved = value;
  } catch { /* Storage can be disabled; the system preference still works. */ }
  const theme = saved || (matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light');
  document.documentElement.dataset.theme = theme;
  document.documentElement.dataset.themeSource = saved ? 'explicit' : 'system';
})();
