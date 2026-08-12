// DevOS — main application entry
// Compiles to /js/script.js
import { initTheme } from './theme';
import { initScrollReveal } from './scroll';
import { initHeroCore } from './hero-canvas';
import { initCommandPalette } from './command-palette';
import { initDashboard } from './dashboard';
import { initAnalytics } from './analytics';
import { initRoadmap } from './roadmap';
import { initAIChat } from './ai-chat';
import type { CommandAction } from './types';

// ---------- Toast notification ----------
function notify(msg: string): void {
  const toast = document.getElementById('toast');
  const text = document.getElementById('toastText');
  if (!toast || !text) return;
  text.textContent = msg;
  toast.classList.add('show');
  toast.setAttribute('aria-hidden', 'false');
  clearTimeout(notifyTimer);
  notifyTimer = window.setTimeout(() => {
    toast.classList.remove('show');
    toast.setAttribute('aria-hidden', 'true');
  }, 2600);
}
let notifyTimer = 0;

// ---------- Command actions ----------
function scrollTo(id: string): void {
  document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' });
}

function setTab(tab: string): void {
  const target = document.querySelector(`.dash-nav-item[data-tab="${tab}"]`) as HTMLElement | null;
  target?.click();
  scrollTo('dashboard');
}

const commands: CommandAction[] = [
  { id: 'c1', label: 'Open Workspace', hint: 'Go', icon: 'bi-grid-1x2', group: 'Navigation', action: () => scrollTo('dashboard') },
  { id: 'c2', label: 'Go to Features', hint: 'Go', icon: 'bi-stars', group: 'Navigation', action: () => scrollTo('workspace') },
  { id: 'c3', label: 'Go to AI Assistant', hint: 'Go', icon: 'bi-chat-dots', group: 'Navigation', action: () => scrollTo('ai') },
  { id: 'c4', label: 'Go to Projects', hint: 'Go', icon: 'bi-folder', group: 'Navigation', action: () => scrollTo('projects') },
  { id: 'c5', label: 'Go to Analytics', hint: 'Go', icon: 'bi-graph-up', group: 'Navigation', action: () => scrollTo('analytics') },
  { id: 'c6', label: 'Go to Roadmap', hint: 'Go', icon: 'bi-map', group: 'Navigation', action: () => scrollTo('roadmap') },
  { id: 'c7', label: 'Open Overview tab', hint: 'Tab', icon: 'bi-house', group: 'Workspace', action: () => setTab('overview') },
  { id: 'c8', label: 'Open Projects tab', hint: 'Tab', icon: 'bi-folder', group: 'Workspace', action: () => setTab('projects') },
  { id: 'c9', label: 'Open Snippets tab', hint: 'Tab', icon: 'bi-code-slash', group: 'Workspace', action: () => setTab('snippets') },
  { id: 'c10', label: 'Open AI Assistant tab', hint: 'Tab', icon: 'bi-stars', group: 'Workspace', action: () => setTab('ai') },
  { id: 'c11', label: 'Open Roadmap tab', hint: 'Tab', icon: 'bi-map', group: 'Workspace', action: () => setTab('roadmap') },
  { id: 'c12', label: 'Open Settings tab', hint: 'Tab', icon: 'bi-gear', group: 'Workspace', action: () => setTab('settings') },
  { id: 'c13', label: 'Toggle theme', hint: 'Action', icon: 'bi-moon-stars', group: 'Actions', action: () => document.getElementById('themeToggle')?.click() },
  { id: 'c14', label: 'New project', hint: 'Action', icon: 'bi-plus-lg', group: 'Actions', action: () => notify('New project form opened') },
  { id: 'c15', label: 'Ask AI', hint: 'Action', icon: 'bi-magic', group: 'Actions', action: () => { setTab('ai'); notify('AI assistant ready'); } },
];

// ---------- Navbar scroll + mobile menu ----------
function initNavbar(): void {
  const navbar = document.getElementById('navbar');
  const burger = document.getElementById('burger');
  const mobileMenu = document.getElementById('mobileMenu');

  window.addEventListener('scroll', () => {
    navbar?.classList.toggle('scrolled', window.scrollY > 20);
  }, { passive: true });

  burger?.addEventListener('click', () => {
    const open = mobileMenu?.classList.toggle('open');
    burger.classList.toggle('open', open);
    burger.setAttribute('aria-expanded', String(open));
    mobileMenu?.setAttribute('aria-hidden', String(!open));
  });

  mobileMenu?.querySelectorAll('a').forEach((a) => {
    a.addEventListener('click', () => {
      mobileMenu.classList.remove('open');
      burger?.classList.remove('open');
      burger?.setAttribute('aria-expanded', 'false');
      mobileMenu.setAttribute('aria-hidden', 'true');
    });
  });
}

// ---------- Smooth CTA buttons ----------
function initCTAs(): void {
  document.getElementById('openWorkspaceBtn')?.addEventListener('click', () => scrollTo('dashboard'));
  document.getElementById('exploreBtn')?.addEventListener('click', () => scrollTo('workspace'));
  document.getElementById('ctaOpen')?.addEventListener('click', () => scrollTo('dashboard'));
  document.getElementById('ctaExplore')?.addEventListener('click', () => scrollTo('workspace'));
  document.getElementById('navAvatar')?.addEventListener('click', () => notify('Profile menu coming soon'));
}

// ---------- Reduced motion toggle ----------
function initSettings(): void {
  const toggle = document.getElementById('reduceMotionToggle') as HTMLInputElement | null;
  if (!toggle) return;
  toggle.addEventListener('change', () => {
    document.body.classList.toggle('reduce-motion', toggle.checked);
    if (toggle.checked) {
      notify('Reduced motion enabled');
    } else {
      notify('Reduced motion disabled — reload to restore canvas');
    }
  });
}

// ---------- Year ----------
function setYear(): void {
  const y = document.getElementById('year');
  if (y) y.textContent = String(new Date().getFullYear());
}

// ---------- Boot ----------
function boot(): void {
  initTheme();
  initNavbar();
  initScrollReveal();
  initHeroCore();
  initCommandPalette(commands);
  initDashboard(notify);
  initAnalytics();
  initRoadmap();
  initAIChat(notify);
  initCTAs();
  initSettings();
  setYear();
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', boot);
} else {
  boot();
}
