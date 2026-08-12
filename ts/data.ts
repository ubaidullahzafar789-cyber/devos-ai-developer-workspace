// DevOS — application data
import type { Project, ActivityItem, AiRun, RoadmapItem, Snippet, AiUsageSegment, WeeklyActivity } from './types';

export const projects: Project[] = [
  {
    id: 'p1',
    name: 'DevOS Web',
    description: 'AI developer workspace frontend with custom design system.',
    icon: 'bi-grid-1x2',
    tags: ['TypeScript', 'Bootstrap', 'Canvas'],
    progress: 78,
    status: 'active',
    lastUpdated: '2h ago',
    language: 'TS',
  },
  {
    id: 'p2',
    name: 'Neural API',
    description: 'REST API for AI-powered code analysis and suggestions.',
    icon: 'bi-hdd-network',
    tags: ['Node', 'Postgres', 'AI'],
    progress: 54,
    status: 'active',
    lastUpdated: '5h ago',
    language: 'Node',
  },
  {
    id: 'p3',
    name: 'Atlas Design Kit',
    description: 'Component library and design tokens for developer tools.',
    icon: 'bi-palette',
    tags: ['CSS', 'Design', 'Tokens'],
    progress: 92,
    status: 'active',
    lastUpdated: '1d ago',
    language: 'CSS',
  },
  {
    id: 'p4',
    name: 'Pulse Monitor',
    description: 'Real-time developer activity and productivity tracker.',
    icon: 'bi-activity',
    tags: ['WebSocket', 'Charts', 'Realtime'],
    progress: 34,
    status: 'paused',
    lastUpdated: '4d ago',
    language: 'TS',
  },
  {
    id: 'p5',
    name: 'Codex Vault',
    description: 'Encrypted snippet manager with full-text search.',
    icon: 'bi-safe',
    tags: ['Crypto', 'Search', 'Local'],
    progress: 100,
    status: 'archived',
    lastUpdated: '2w ago',
    language: 'TS',
  },
  {
    id: 'p6',
    name: 'Orbit Docs',
    description: 'Interactive documentation with embedded runnable examples.',
    icon: 'bi-journal-code',
    tags: ['MDX', 'Docs', 'Runtime'],
    progress: 61,
    status: 'active',
    lastUpdated: '3h ago',
    language: 'MDX',
  },
];

export const recentProjects: Project[] = projects.slice(0, 4);

export const activity: ActivityItem[] = [
  { id: 'a1', type: 'commit', text: 'Pushed <strong>3 commits</strong> to <strong>DevOS Web</strong>', time: '12m ago', color: 'violet' },
  { id: 'a2', type: 'ai', text: 'AI refactored <strong>auth callback</strong> handler', time: '38m ago', color: 'cyan' },
  { id: 'a3', type: 'snippet', text: 'Saved snippet <strong>useDebounce.ts</strong>', time: '1h ago', color: 'green' },
  { id: 'a4', type: 'milestone', text: 'Completed <strong>Frontend</strong> roadmap milestone', time: '3h ago', color: 'warn' },
  { id: 'a5', type: 'project', text: 'Created project <strong>Orbit Docs</strong>', time: '5h ago', color: 'violet' },
];

export const aiActivity = [
  { id: 'ai1', label: 'Refactors', icon: 'bi-arrow-repeat', value: '412' },
  { id: 'ai2', label: 'Bug finds', icon: 'bi-bug', value: '86' },
  { id: 'ai3', label: 'Tests generated', icon: 'bi-check2-square', value: '154' },
  { id: 'ai4', label: 'Explanations', icon: 'bi-lightbulb', value: '768' },
];

export const aiRuns: AiRun[] = [
  { id: 'r1', name: 'Summarize repository', type: 'analysis', time: '8m ago' },
  { id: 'r2', name: 'Generate unit tests — auth.ts', type: 'tests', time: '25m ago' },
  { id: 'r3', name: 'Find bugs in src/api', type: 'audit', time: '1h ago' },
  { id: 'r4', name: 'Explain caching strategy', type: 'explain', time: '2h ago' },
  { id: 'r5', name: 'Refactor useHook patterns', type: 'refactor', time: '4h ago' },
];

export const roadmap: RoadmapItem[] = [
  {
    id: 'rm1',
    title: 'Foundation',
    description: 'HTML, CSS, JavaScript fundamentals and developer tooling.',
    icon: 'bi-bricks',
    skills: ['HTML5', 'CSS3', 'Git', 'CLI'],
    progress: 100,
    status: 'done',
  },
  {
    id: 'rm2',
    title: 'Frontend',
    description: 'Modern UI development, accessibility, and design systems.',
    icon: 'bi-window-fullscreen',
    skills: ['TypeScript', 'Responsive', 'A11y', 'CSS Arch'],
    progress: 100,
    status: 'done',
  },
  {
    id: 'rm3',
    title: 'Backend',
    description: 'APIs, databases, authentication, and server architecture.',
    icon: 'bi-hdd-network',
    skills: ['Node', 'Postgres', 'Auth', 'REST'],
    progress: 62,
    status: 'active',
  },
  {
    id: 'rm4',
    title: 'AI',
    description: 'Integrating AI into developer workflows and tooling.',
    icon: 'bi-stars',
    skills: ['LLMs', 'Prompts', 'Embeddings', 'RAG'],
    progress: 28,
    status: 'pending',
  },
  {
    id: 'rm5',
    title: 'Advanced Engineering',
    description: 'Distributed systems, performance, and platform design.',
    icon: 'bi-rocket-takeoff',
    skills: ['Scale', 'Perf', 'Architecture', 'DX'],
    progress: 0,
    status: 'pending',
  },
];

export const snippets: Snippet[] = [
  {
    id: 's1',
    title: 'useDebounce',
    language: 'TypeScript',
    code: `function useDebounce<T>(val: T, ms: number): T {
  const [d, setD] = useState(val);
  useEffect(() => {
    const t = setTimeout(() => setD(val), ms);
    return () => clearTimeout(t);
  }, [val, ms]);
  return d;
}`,
  },
  {
    id: 's2',
    title: 'fetchJSON',
    language: 'TypeScript',
    code: `async function fetchJSON<T>(url: string): Promise<T> {
  const res = await fetch(url);
  if (!res.ok) throw new Error(res.status);
  return res.json() as Promise<T>;
}`,
  },
  {
    id: 's3',
    title: 'groupBy',
    language: 'TypeScript',
    code: `function groupBy<T, K extends string>(
  arr: T[], key: (i: T) => K
): Record<K, T[]> {
  return arr.reduce((acc, item) => {
    (acc[key(item)] ??= []).push(item);
    return acc;
  }, {} as Record<K, T[]>);
}`,
  },
  {
    id: 's4',
    title: 'clamp',
    language: 'TypeScript',
    code: `const clamp = (n: number, min: number, max: number) =>
  Math.min(Math.max(n, min), max);`,
  },
];

export const aiUsage: AiUsageSegment[] = [
  { label: 'Refactors', value: 412, color: '#8B5CF6' },
  { label: 'Explanations', value: 768, color: '#22D3EE' },
  { label: 'Tests', value: 154, color: '#34D399' },
  { label: 'Bug finds', value: 86, color: '#FBBF24' },
];

export const weeklyActivity: WeeklyActivity[] = [
  { day: 'Mon', value: 62 },
  { day: 'Tue', value: 84 },
  { day: 'Wed', value: 71 },
  { day: 'Thu', value: 95 },
  { day: 'Fri', value: 78 },
  { day: 'Sat', value: 40 },
  { day: 'Sun', value: 52 },
];

export const projectProgress = [
  { name: 'DevOS Web', pct: 78, color: '#8B5CF6' },
  { name: 'Neural API', pct: 54, color: '#22D3EE' },
  { name: 'Atlas Design Kit', pct: 92, color: '#34D399' },
  { name: 'Pulse Monitor', pct: 34, color: '#FBBF24' },
];

export const learningProgress = [
  { name: 'Backend — APIs', pct: 80, color: '#8B5CF6' },
  { name: 'Backend — Databases', pct: 55, color: '#22D3EE' },
  { name: 'AI — LLMs', pct: 35, color: '#34D399' },
  { name: 'AI — RAG', pct: 20, color: '#FBBF24' },
];
