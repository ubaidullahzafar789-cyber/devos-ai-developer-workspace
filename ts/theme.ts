// DevOS — theme controller (dark/light)

export type ThemeMode = 'dark' | 'light';

const STORAGE_KEY = 'devos-theme';

export function initTheme(): void {
  const saved = localStorage.getItem(STORAGE_KEY) as ThemeMode | null;
  const mode: ThemeMode = saved ?? 'dark';
  applyTheme(mode);

  const toggle = document.getElementById('themeToggle');
  toggle?.addEventListener('click', () => {
    const current = document.documentElement.getAttribute('data-bs-theme') as ThemeMode;
    applyTheme(current === 'dark' ? 'light' : 'dark');
  });

  document.querySelectorAll('[data-theme-set]').forEach((btn) => {
    btn.addEventListener('click', () => {
      const m = (btn as HTMLElement).dataset.themeSet as ThemeMode;
      applyTheme(m);
      document.querySelectorAll('[data-theme-set]').forEach((b) => b.classList.remove('active'));
      btn.classList.add('active');
    });
  });
}

export function applyTheme(mode: ThemeMode): void {
  document.documentElement.setAttribute('data-bs-theme', mode);
  localStorage.setItem(STORAGE_KEY, mode);
  const icon = document.querySelector('#themeToggle i');
  if (icon) {
    icon.className = mode === 'dark' ? 'bi bi-moon-stars-fill' : 'bi bi-sun-fill';
  }
  document.querySelectorAll('[data-theme-set]').forEach((b) => {
    b.classList.toggle('active', (b as HTMLElement).dataset.themeSet === mode);
  });
  window.dispatchEvent(new CustomEvent('devos-theme', { detail: mode }));
}
