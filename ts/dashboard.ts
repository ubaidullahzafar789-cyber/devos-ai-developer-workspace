// DevOS — dashboard rendering and interactions
import { projects, recentProjects, activity, aiActivity, aiRuns, snippets, roadmap } from './data';

export function initDashboard(notify: (msg: string) => void): void {
  renderRecentProjects();
  renderActivity();
  renderAiActivity();
  renderProjectsGrid();
  renderSnippets();
  renderAiRuns();
  renderDashRoadmap();
  initTabs();
  initProjectFilter();
  initPromptButtons(notify);
}

function renderRecentProjects(): void {
  const container = document.getElementById('dashRecentProjects');
  if (!container) return;
  container.innerHTML = recentProjects
    .map(
      (p) => `<div class="dash-project-row">
        <div class="dp-info">
          <span class="dash-project-icon"><i class="bi ${p.icon}"></i></span>
          <div>
            <div class="dp-name">${p.name}</div>
            <div class="dp-meta">${p.language} · ${p.lastUpdated}</div>
          </div>
        </div>
        <div class="dp-progress">
          <div class="pct">${p.progress}%</div>
          <div class="bar"><span style="width:${p.progress}%"></span></div>
        </div>
      </div>`
    )
    .join('');
}

function renderActivity(): void {
  const container = document.getElementById('dashActivity');
  if (!container) return;
  container.innerHTML = activity
    .map(
      (a) => `<div class="activity-item">
        <span class="activity-dot ${a.color}"></span>
        <div>
          <div class="activity-text">${a.text}</div>
          <div class="activity-time">${a.time}</div>
        </div>
      </div>`
    )
    .join('');
}

function renderAiActivity(): void {
  const container = document.getElementById('dashAiActivity');
  if (!container) return;
  container.innerHTML = aiActivity
    .map(
      (a) => `<div class="ai-act-row">
        <span class="label"><i class="bi ${a.icon}"></i>${a.label}</span>
        <span class="val">${a.value}</span>
      </div>`
    )
    .join('');
}

export function renderProjectsGrid(): void {
  const container = document.getElementById('dashProjectsGrid');
  const projectsSection = document.getElementById('projectsGrid');
  const html = projects
    .map(
      (p) => `<div class="col-md-6 col-lg-4 project-item" data-status="${p.status}">
        <div class="project-card">
          <div class="project-card-head">
            <span class="project-card-icon"><i class="bi ${p.icon}"></i></span>
            <span class="project-status ${p.status}">${p.status}</span>
          </div>
          <h3>${p.name}</h3>
          <p class="pc-desc">${p.description}</p>
          <div class="project-tags">${p.tags.map((t) => `<span class="tag">${t}</span>`).join('')}</div>
          <div class="project-progress-row"><span>Progress</span><span>${p.progress}%</span></div>
          <div class="project-progress"><span style="width:${p.progress}%; background:${progressColor(p.progress)}"></span></div>
          <div class="project-card-foot">
            <span><i class="bi bi-clock"></i> ${p.lastUpdated}</span>
            <span class="mono">${p.language}</span>
          </div>
        </div>
      </div>`
    )
    .join('');
  if (container) container.innerHTML = html;
  if (projectsSection) projectsSection.innerHTML = html;
}

function progressColor(pct: number): string {
  if (pct >= 90) return '#34D399';
  if (pct >= 60) return '#8B5CF6';
  if (pct >= 30) return '#22D3EE';
  return '#FBBF24';
}

function renderSnippets(): void {
  const container = document.getElementById('snippetList');
  if (!container) return;
  container.innerHTML = snippets
    .map(
      (s) => `<div class="snippet-item">
        <div class="snippet-head">
          <strong>${s.title}</strong>
          <span class="lang">${s.language}</span>
        </div>
        <pre class="snippet-code"><code>${escapeHtml(s.code)}</code></pre>
      </div>`
    )
    .join('');
}

function renderAiRuns(): void {
  const container = document.getElementById('dashAiRuns');
  if (!container) return;
  container.innerHTML = aiRuns
    .map(
      (r) => `<div class="ai-run-row">
        <div class="ar-info">
          <span class="ar-icon"><i class="bi bi-stars"></i></span>
          <div>
            <div class="ar-name">${r.name}</div>
            <div class="ar-time">${r.time}</div>
          </div>
        </div>
        <button class="chip">Open</button>
      </div>`
    )
    .join('');
}

function renderDashRoadmap(): void {
  const container = document.getElementById('dashRoadmap');
  if (!container) return;
  container.innerHTML = roadmap
    .map(
      (r) => `<div class="roadmap-item ${r.status}">
        <div class="roadmap-marker"><i class="bi ${r.icon}"></i></div>
        <div class="roadmap-line"></div>
        <div class="roadmap-content">
          <h3>${r.title}</h3>
          <p>${r.description}</p>
          <div class="roadmap-skills">${r.skills.map((s) => `<span class="tag">${s}</span>`).join('')}</div>
          <div class="roadmap-progress-row">
            <div class="roadmap-progress"><span style="width:${r.progress}%; background:${progressColor(r.progress)}"></span></div>
            <span class="roadmap-pct">${r.progress}%</span>
          </div>
        </div>
      </div>`
    )
    .join('');
}

function initTabs(): void {
  const navItems = document.querySelectorAll('.dash-nav-item');
  const tabs = document.querySelectorAll('.dash-tab');
  navItems.forEach((btn) => {
    btn.addEventListener('click', () => {
      const tab = (btn as HTMLElement).dataset.tab;
      navItems.forEach((b) => b.classList.remove('active'));
      btn.classList.add('active');
      tabs.forEach((t) => t.classList.toggle('active', (t as HTMLElement).dataset.tab === tab));
    });
  });
}

function initProjectFilter(): void {
  const filterBar = document.getElementById('projectFilter');
  if (!filterBar) return;
  filterBar.querySelectorAll('button').forEach((btn) => {
    btn.addEventListener('click', () => {
      filterBar.querySelectorAll('button').forEach((b) => b.classList.remove('active'));
      btn.classList.add('active');
      const f = (btn as HTMLElement).dataset.filter;
      document.querySelectorAll<HTMLElement>('.project-item').forEach((card) => {
        const status = card.dataset.status;
        card.style.display = f === 'all' || f === status ? '' : 'none';
      });
    });
  });
}

function initPromptButtons(notify: (msg: string) => void): void {
  document.querySelectorAll('.ai-prompt').forEach((btn) => {
    btn.addEventListener('click', () => {
      const text = btn.textContent?.trim() ?? '';
      notify(`AI: ${text}`);
    });
  });
}

function escapeHtml(s: string): string {
  return s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
}
