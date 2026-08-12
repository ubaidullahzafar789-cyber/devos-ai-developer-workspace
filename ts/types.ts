// DevOS — shared types and data models

export interface Project {
  id: string;
  name: string;
  description: string;
  icon: string;
  tags: string[];
  progress: number;
  status: 'active' | 'paused' | 'archived';
  lastUpdated: string;
  language: string;
}

export interface DeveloperStats {
  projects: number;
  snippets: number;
  aiRuns: number;
  streak: number;
}

export interface ActivityItem {
  id: string;
  type: 'commit' | 'ai' | 'snippet' | 'project' | 'milestone';
  text: string;
  time: string;
  color: 'violet' | 'cyan' | 'green' | 'warn';
}

export interface AiRun {
  id: string;
  name: string;
  type: string;
  time: string;
}

export interface RoadmapItem {
  id: string;
  title: string;
  description: string;
  icon: string;
  skills: string[];
  progress: number;
  status: 'done' | 'active' | 'pending';
}

export interface Snippet {
  id: string;
  title: string;
  language: string;
  code: string;
}

export interface CommandAction {
  id: string;
  label: string;
  hint: string;
  icon: string;
  group: string;
  action: () => void;
}

export interface AiUsageSegment {
  label: string;
  value: number;
  color: string;
}

export interface WeeklyActivity {
  day: string;
  value: number;
}
