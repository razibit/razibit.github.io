(() => {
  const root = document.documentElement;
  const media = matchMedia('(prefers-color-scheme: dark)');
  const buttons = [...document.querySelectorAll('[data-theme-choice]')];
  const themeColor = document.querySelector('meta[name="theme-color"]');

  function renderTheme(theme) {
    root.dataset.theme = theme;
    buttons.forEach(button => button.setAttribute('aria-pressed', String(button.dataset.themeChoice === theme)));
    if (themeColor) themeColor.setAttribute('content', theme === 'dark' ? '#191D21' : '#FAFAF8');
  }

  renderTheme(root.dataset.theme || (media.matches ? 'dark' : 'light'));
  const themeControl = document.querySelector('.theme-control');
  if (themeControl) themeControl.hidden = false;
  buttons.forEach(button => button.addEventListener('click', () => {
    const theme = button.dataset.themeChoice;
    root.dataset.themeSource = 'explicit';
    renderTheme(theme);
    try { localStorage.setItem('portfolio-theme', theme); } catch { /* Keep the choice for this page session. */ }
  }));
  media.addEventListener('change', event => {
    if (root.dataset.themeSource !== 'explicit') renderTheme(event.matches ? 'dark' : 'light');
  });
  window.addEventListener('storage', event => {
    if (event.key !== 'portfolio-theme' && event.key !== null) return;
    const valid = event.newValue === 'light' || event.newValue === 'dark';
    root.dataset.themeSource = valid ? 'explicit' : 'system';
    renderTheme(valid ? event.newValue : (media.matches ? 'dark' : 'light'));
  });

  const profile = document.querySelector('.profile');
  function fitProfile() {
    if (profile) profile.dataset.sticky = String(window.innerWidth >= 1024 && profile.offsetHeight + 64 <= window.innerHeight);
  }
  fitProfile();
  window.addEventListener('resize', fitProfile, { passive: true });
  if ('ResizeObserver' in window && profile) new ResizeObserver(fitProfile).observe(profile);

  const sections = [...document.querySelectorAll('main > section[id]')];
  const links = [...document.querySelectorAll('.section-nav a')];
  let scheduled = false;
  function updateNavigation() {
    scheduled = false;
    if (!sections.length) return;
    let current = sections[0].id;
    const threshold = Math.min(160, innerHeight * 0.25);
    for (const section of sections) if (section.getBoundingClientRect().top <= threshold) current = section.id;
    if (scrollY > 0 && innerHeight + scrollY >= document.documentElement.scrollHeight - 2) current = sections.at(-1).id;
    links.forEach(link => {
      if (link.hash === `#${current}`) link.setAttribute('aria-current', 'location');
      else link.removeAttribute('aria-current');
    });
  }
  function scheduleNavigation() {
    if (!scheduled) { scheduled = true; requestAnimationFrame(updateNavigation); }
  }
  window.addEventListener('scroll', scheduleNavigation, { passive: true });
  window.addEventListener('resize', scheduleNavigation);
  window.addEventListener('hashchange', scheduleNavigation);
  updateNavigation();
})();
