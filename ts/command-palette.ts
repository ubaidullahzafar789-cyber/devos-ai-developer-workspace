// DevOS — command palette controller
import type { CommandAction } from './types';

export function initCommandPalette(actions: CommandAction[]): void {
  const overlay = document.getElementById('cmdOverlay');
  const input = document.getElementById('cmdInput') as HTMLInputElement | null;
  const results = document.getElementById('cmdResults');
  const trigger = document.getElementById('cmdTrigger');
  if (!overlay || !input || !results || !trigger) return;

  let filtered: CommandAction[] = actions.slice();
  let selected = 0;

  function open(): void {
    overlay!.classList.add('open');
    overlay!.setAttribute('aria-hidden', 'false');
    input!.value = '';
    filtered = actions.slice();
    selected = 0;
    render();
    setTimeout(() => input!.focus(), 50);
  }

  function close(): void {
    overlay!.classList.remove('open');
    overlay!.setAttribute('aria-hidden', 'true');
  }

  function render(): void {
    if (filtered.length === 0) {
      results!.innerHTML = '<div class="cmd-empty">No results found</div>';
      return;
    }
    const groups = new Map<string, CommandAction[]>();
    filtered.forEach((a) => {
      const arr = groups.get(a.group) ?? [];
      arr.push(a);
      groups.set(a.group, arr);
    });
    let html = '';
    let idx = 0;
    groups.forEach((items, group) => {
      html += `<div class="cmd-group-label">${group}</div>`;
      items.forEach((a) => {
        html += `<div class="cmd-item${idx === selected ? ' selected' : ''}" data-id="${a.id}" role="option">
          <span class="cmd-icon"><i class="bi ${a.icon}"></i></span>
          <span class="cmd-label">${a.label}</span>
          <span class="cmd-hint">${a.hint}</span>
        </div>`;
        idx++;
      });
    });
    results!.innerHTML = html;

    results!.querySelectorAll<HTMLElement>('.cmd-item').forEach((el, i) => {
      el.addEventListener('click', () => {
        filtered[i]?.action();
        close();
      });
      el.addEventListener('mouseenter', () => {
        selected = i;
        updateSelected();
      });
    });
  }

  function updateSelected(): void {
    results!.querySelectorAll('.cmd-item').forEach((el, i) => {
      el.classList.toggle('selected', i === selected);
    });
    const sel = results!.querySelector('.cmd-item.selected') as HTMLElement | null;
    sel?.scrollIntoView({ block: 'nearest' });
  }

  function filter(query: string): void {
    const q = query.trim().toLowerCase();
    filtered = q
      ? actions.filter((a) => a.label.toLowerCase().includes(q) || a.group.toLowerCase().includes(q))
      : actions.slice();
    selected = 0;
    render();
  }

  trigger.addEventListener('click', open);
  overlay.addEventListener('click', (e) => { if (e.target === overlay) close(); });
  input.addEventListener('input', () => filter(input.value));
  input.addEventListener('keydown', (e) => {
    if (e.key === 'ArrowDown') { e.preventDefault(); selected = (selected + 1) % filtered.length; updateSelected(); }
    else if (e.key === 'ArrowUp') { e.preventDefault(); selected = (selected - 1 + filtered.length) % filtered.length; updateSelected(); }
    else if (e.key === 'Enter') { e.preventDefault(); filtered[selected]?.action(); close(); }
    else if (e.key === 'Escape') { e.preventDefault(); close(); }
  });

  document.addEventListener('keydown', (e) => {
    if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k') {
      e.preventDefault();
      overlay!.classList.contains('open') ? close() : open();
    }
    if (e.key === 'Escape' && overlay!.classList.contains('open')) close();
  });
}
