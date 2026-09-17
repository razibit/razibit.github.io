/* Legacy static-preview helper retained as a reference asset. The Next app uses its React theme control. */
(() => {
  let saved = null;
  try {
    const value = localStorage.getItem('portfolio-theme');
    if (value === 'light' || value === 'dark') saved = value;
  } catch { /* Storage can be disabled. */ }
  const theme = saved || (matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light');
  document.documentElement.dataset.theme = theme;
  document.documentElement.dataset.themeSource = saved ? 'explicit' : 'system';
})();
