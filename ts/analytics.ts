// DevOS — analytics charts (Canvas-based, no libraries)
import { weeklyActivity, aiUsage, projectProgress, learningProgress } from './data';

export function initAnalytics(): void {
  drawActivityChart();
  drawDonutChart();
  renderProgressList();
  renderLearningList();
  window.addEventListener('devos-theme', () => {
    drawActivityChart();
    drawDonutChart();
  });
  let resizeTimer = 0;
  window.addEventListener('resize', () => {
    clearTimeout(resizeTimer);
    resizeTimer = window.setTimeout(() => drawActivityChart(), 200);
  });
}

function cssVar(name: string): string {
  return getComputedStyle(document.documentElement).getPropertyValue(name).trim();
}

function drawActivityChart(): void {
  const canvas = document.getElementById('activityChart') as HTMLCanvasElement | null;
  if (!canvas) return;
  const ctx = canvas.getContext('2d');
  if (!ctx) return;

  const dpr = Math.min(window.devicePixelRatio || 1, 2);
  const rect = canvas.getBoundingClientRect();
  const W = rect.width || 800;
  const H = W < 480 ? 200 : 260;
  canvas.width = W * dpr;
  canvas.height = H * dpr;
  canvas.style.height = H + 'px';
  ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
  ctx.clearRect(0, 0, W, H);

  const pad = { l: 36, r: 16, t: 20, b: 32 };
  const cw = W - pad.l - pad.r;
  const ch = H - pad.t - pad.b;
  const max = 100;
  const accent = cssVar('--accent') || '#8B5CF6';
  const grid = cssVar('--border') || '#242830';
  const text3 = cssVar('--text-3') || '#626975';

  // Grid lines
  ctx.strokeStyle = grid;
  ctx.lineWidth = 1;
  ctx.font = '11px JetBrains Mono, monospace';
  ctx.fillStyle = text3;
  for (let i = 0; i <= 4; i++) {
    const y = pad.t + (ch / 4) * i;
    ctx.beginPath();
    ctx.moveTo(pad.l, y);
    ctx.lineTo(W - pad.r, y);
    ctx.stroke();
    const val = max - (max / 4) * i;
    ctx.fillText(String(val), 6, y + 4);
  }

  // Bars
  const barW = cw / weeklyActivity.length;
  const gap = barW * 0.32;
  weeklyActivity.forEach((d, i) => {
    const x = pad.l + barW * i + gap / 2;
    const bw = barW - gap;
    const bh = (d.value / max) * ch;
    const y = pad.t + ch - bh;

    const grad = ctx.createLinearGradient(0, y, 0, pad.t + ch);
    grad.addColorStop(0, accent);
    grad.addColorStop(1, accent + '20');
    ctx.fillStyle = grad;
    roundedRect(ctx, x, y, bw, bh, 4);
    ctx.fill();

    // Value label on top
    ctx.fillStyle = text3;
    ctx.font = '11px JetBrains Mono, monospace';
    ctx.textAlign = 'center';
    ctx.fillText(String(d.value), x + bw / 2, y - 6);

    // Day label
    ctx.textAlign = 'center';
    ctx.fillText(d.day, x + bw / 2, H - 10);
  });
  ctx.textAlign = 'left';
}

function roundedRect(ctx: CanvasRenderingContext2D, x: number, y: number, w: number, h: number, r: number): void {
  const rr = Math.min(r, h / 2, w / 2);
  ctx.beginPath();
  ctx.moveTo(x + rr, y);
  ctx.arcTo(x + w, y, x + w, y + h, rr);
  ctx.arcTo(x + w, y + h, x, y + h, rr);
  ctx.arcTo(x, y + h, x, y, rr);
  ctx.arcTo(x, y, x + w, y, rr);
  ctx.closePath();
}

function drawDonutChart(): void {
  const canvas = document.getElementById('donutChart') as HTMLCanvasElement | null;
  if (!canvas) return;
  const ctx = canvas.getContext('2d');
  if (!ctx) return;

  const dpr = Math.min(window.devicePixelRatio || 1, 2);
  const size = 220;
  canvas.width = size * dpr;
  canvas.height = size * dpr;
  canvas.style.width = size + 'px';
  canvas.style.height = size + 'px';
  ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
  ctx.clearRect(0, 0, size, size);

  const cx = size / 2;
  const cy = size / 2;
  const outerR = size / 2 - 8;
  const innerR = outerR - 28;
  const total = aiUsage.reduce((s, seg) => s + seg.value, 0);
  let start = -Math.PI / 2;

  aiUsage.forEach((seg) => {
    const angle = (seg.value / total) * Math.PI * 2;
    ctx.beginPath();
    ctx.arc(cx, cy, outerR, start, start + angle);
    ctx.arc(cx, cy, innerR, start + angle, start, true);
    ctx.closePath();
    ctx.fillStyle = seg.color;
    ctx.fill();
    start += angle;
  });

  // Legend
  const legend = document.getElementById('donutLegend');
  if (legend) {
    legend.innerHTML = aiUsage
      .map(
        (s) => `<div class="donut-legend-item">
          <span class="ll"><span class="sw" style="background:${s.color}"></span>${s.label}</span>
          <span class="vv">${s.value}</span>
        </div>`
      )
      .join('');
  }
}

function renderProgressList(): void {
  const container = document.getElementById('progressList');
  if (!container) return;
  container.innerHTML = projectProgress
    .map(
      (p) => `<div class="pl-item">
        <div class="pl-head"><span class="name">${p.name}</span><span class="pct">${p.pct}%</span></div>
        <div class="pl-bar"><span style="width:${p.pct}%; background:${p.color}"></span></div>
      </div>`
    )
    .join('');
}

function renderLearningList(): void {
  const container = document.getElementById('learningList');
  if (!container) return;
  container.innerHTML = learningProgress
    .map(
      (p) => `<div class="pl-item">
        <div class="pl-head"><span class="name">${p.name}</span><span class="pct">${p.pct}%</span></div>
        <div class="pl-bar"><span style="width:${p.pct}%; background:${p.color}"></span></div>
      </div>`
    )
    .join('');
}
