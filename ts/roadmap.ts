// DevOS — roadmap scroll reveal
import { roadmap } from './data';

export function initRoadmap(): void {
  const track = document.getElementById('roadmapTrack');
  if (!track) return;

  track.innerHTML = roadmap
    .map(
      (r) => `<div class="roadmap-item ${r.status}" data-status="${r.status}">
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

  const items = track.querySelectorAll('.roadmap-item');
  if (!('IntersectionObserver' in window)) {
    items.forEach((i) => i.classList.add('revealed'));
    return;
  }

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('revealed');
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.2, rootMargin: '0px 0px -60px 0px' }
  );

  items.forEach((i) => observer.observe(i));
}

function progressColor(pct: number): string {
  if (pct >= 90) return '#34D399';
  if (pct >= 60) return '#8B5CF6';
  if (pct >= 30) return '#22D3EE';
  if (pct > 0) return '#FBBF24';
  return '#626975';
}
