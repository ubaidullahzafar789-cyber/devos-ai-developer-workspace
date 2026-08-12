// DevOS — Developer Core canvas visual
// A lightweight 2D canvas approximation of a 3D core.
// Replaceable with a Three.js/Spline version later.

interface Node {
  angle: number;
  radius: number;
  speed: number;
  size: number;
  ring: number;
  color: string;
}

export function initHeroCore(): void {
  const canvasEl = document.getElementById('coreCanvas') as HTMLCanvasElement | null;
  if (!canvasEl) return;
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
  if (document.body.classList.contains('reduce-motion')) return;

  const ctxEl = canvasEl.getContext('2d');
  if (!ctxEl) return;

  const canvas: HTMLCanvasElement = canvasEl;
  const ctx: CanvasRenderingContext2D = ctxEl;

  const dpr = Math.min(window.devicePixelRatio || 1, 2);
  let w = 0;
  let h = 0;
  let cx = 0;
  let cy = 0;
  let mouseX = 0;
  let mouseY = 0;
  let targetMx = 0;
  let targetMy = 0;
  let rafId = 0;
  let t = 0;

  const nodes: Node[] = [];
  const rings = [
    { r: 0.28, count: 6, speed: 0.0006 },
    { r: 0.42, count: 10, speed: -0.0004 },
    { r: 0.56, count: 14, speed: 0.0003 },
  ];

  function resize(): void {
    const rect = canvas.getBoundingClientRect();
    w = rect.width;
    h = rect.height;
    canvas.width = w * dpr;
    canvas.height = h * dpr;
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    cx = w / 2;
    cy = h / 2;
  }

  function buildNodes(): void {
    nodes.length = 0;
    const palette = ['#8B5CF6', '#A78BFA', '#22D3EE', '#34D399'];
    rings.forEach((ring, ri) => {
      for (let i = 0; i < ring.count; i++) {
        nodes.push({
          angle: (i / ring.count) * Math.PI * 2,
          radius: ring.r,
          speed: ring.speed,
          size: ri === 0 ? 3.5 : 2.5,
          ring: ri,
          color: palette[(i + ri) % palette.length],
        });
      }
    });
  }

  function draw(): void {
    t += 1;
    targetMx += (mouseX - targetMx) * 0.04;
    targetMy += (mouseY - targetMy) * 0.04;

    ctx.clearRect(0, 0, w, h);
    const baseR = Math.min(w, h);

    // Glow background
    const grad = ctx.createRadialGradient(cx, cy, 0, cx, cy, baseR * 0.5);
    grad.addColorStop(0, 'rgba(139, 92, 246, 0.12)');
    grad.addColorStop(0.5, 'rgba(34, 211, 238, 0.04)');
    grad.addColorStop(1, 'rgba(0, 0, 0, 0)');
    ctx.fillStyle = grad;
    ctx.fillRect(0, 0, w, h);

    const tiltX = targetMx * 12;
    const tiltY = targetMy * 12;

    // Orbital rings
    rings.forEach((ring, ri) => {
      const r = ring.r * baseR;
      ctx.beginPath();
      ctx.ellipse(cx + tiltX * 0.3, cy + tiltY * 0.3, r, r * (0.78 - ri * 0.05), ring.speed * t * 100, 0, Math.PI * 2);
      ctx.strokeStyle = ri === 0 ? 'rgba(139, 92, 246, 0.25)' : 'rgba(255, 255, 255, 0.06)';
      ctx.lineWidth = 1;
      ctx.stroke();
    });

    // Compute node positions
    const positions = nodes.map((n) => {
      n.angle += n.speed;
      const r = n.radius * baseR;
      const x = cx + Math.cos(n.angle) * r + tiltX * (1 - n.radius);
      const y = cy + Math.sin(n.angle) * r * (0.78 - n.ring * 0.05) + tiltY * (1 - n.radius);
      return { x, y, node: n };
    });

    // Connection lines between near nodes
    for (let i = 0; i < positions.length; i++) {
      for (let j = i + 1; j < positions.length; j++) {
        const a = positions[i];
        const b = positions[j];
        const dx = a.x - b.x;
        const dy = a.y - b.y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        const maxDist = baseR * 0.22;
        if (dist < maxDist) {
          const alpha = (1 - dist / maxDist) * 0.25;
          ctx.beginPath();
          ctx.moveTo(a.x, a.y);
          ctx.lineTo(b.x, b.y);
          ctx.strokeStyle = `rgba(139, 92, 246, ${alpha})`;
          ctx.lineWidth = 0.8;
          ctx.stroke();
        }
      }
    }

    // Core
    const coreR = baseR * 0.09;
    const coreGrad = ctx.createRadialGradient(cx + tiltX, cy + tiltY, 0, cx + tiltX, cy + tiltY, coreR * 2.2);
    coreGrad.addColorStop(0, 'rgba(167, 139, 250, 0.9)');
    coreGrad.addColorStop(0.4, 'rgba(139, 92, 246, 0.5)');
    coreGrad.addColorStop(1, 'rgba(139, 92, 246, 0)');
    ctx.fillStyle = coreGrad;
    ctx.beginPath();
    ctx.arc(cx + tiltX, cy + tiltY, coreR * 2.2, 0, Math.PI * 2);
    ctx.fill();

    // Core inner
    ctx.beginPath();
    ctx.arc(cx + tiltX, cy + tiltY, coreR * 0.7, 0, Math.PI * 2);
    ctx.fillStyle = 'rgba(245, 247, 250, 0.85)';
    ctx.fill();

    // Nodes
    positions.forEach((p) => {
      ctx.beginPath();
      ctx.arc(p.x, p.y, p.node.size, 0, Math.PI * 2);
      ctx.fillStyle = p.node.color;
      ctx.shadowBlur = 8;
      ctx.shadowColor = p.node.color;
      ctx.fill();
      ctx.shadowBlur = 0;
    });

    rafId = requestAnimationFrame(draw);
  }

  function onMouseMove(e: MouseEvent): void {
    const rect = canvas.getBoundingClientRect();
    mouseX = (e.clientX - rect.left - rect.width / 2) / rect.width;
    mouseY = (e.clientY - rect.top - rect.height / 2) / rect.height;
  }

  function cleanup(): void {
    cancelAnimationFrame(rafId);
    window.removeEventListener('resize', resize);
    canvas.removeEventListener('mousemove', onMouseMove);
    document.removeEventListener('devos-cleanup', cleanup);
  }

  resize();
  buildNodes();
  draw();
  window.addEventListener('resize', resize);
  canvas.addEventListener('mousemove', onMouseMove);
  document.addEventListener('devos-cleanup', cleanup);
}
