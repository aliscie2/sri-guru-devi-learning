import { courses } from './courses';
export type CourseProgress = { completed: Record<string, string>; lastLesson: string; updatedAt: string };
export type Progress = Record<string, CourseProgress>;
export const STORAGE_KEY = 'sgdf-learning-progress-v1';
export function parseProgress(raw: string | null): Progress {
  if (!raw) return {};
  try {
    const value: unknown = JSON.parse(raw);
    if (!value || typeof value !== 'object' || Array.isArray(value)) return {};
    const clean: Progress = {};
    for (const course of courses.filter(c => c.lessons.length)) {
      const saved = (value as Record<string, unknown>)[course.id];
      if (!saved || typeof saved !== 'object') continue;
      const entry = saved as CourseProgress;
      const validIds = new Set(course.lessons.map(l => l.id));
      if (!validIds.has(entry.lastLesson)) continue;
      const completed: Record<string, string> = {};
      if (entry.completed && typeof entry.completed === 'object') {
        for (const [id, timestamp] of Object.entries(entry.completed)) {
          if (validIds.has(id) && typeof timestamp === 'string' && !Number.isNaN(Date.parse(timestamp))) completed[id] = timestamp;
        }
      }
      clean[course.id] = { completed, lastLesson: entry.lastLesson, updatedAt: typeof entry.updatedAt === 'string' ? entry.updatedAt : '' };
    }
    return clean;
  } catch { return {}; }
}
export function visitLesson(progress: Progress, courseId: string, lessonId: string, now = new Date().toISOString()): Progress {
  if (!courses.find(c => c.id === courseId)?.lessons.some(l => l.id === lessonId)) return progress;
  return { ...progress, [courseId]: { completed: progress[courseId]?.completed ?? {}, lastLesson: lessonId, updatedAt: now } };
}
export function completeLesson(progress: Progress, courseId: string, lessonId: string, now = new Date().toISOString()): Progress {
  const visited = visitLesson(progress, courseId, lessonId, now);
  if (visited === progress) return progress;
  const entry = visited[courseId];
  return { ...visited, [courseId]: { ...entry, completed: { ...entry.completed, [lessonId]: entry.completed[lessonId] ?? now } } };
}
export function completionPercent(progress: Progress, courseId: string) {
  const course = courses.find(c => c.id === courseId);
  if (!course?.lessons.length) return 0;
  return Math.round(course.lessons.filter(l => progress[courseId]?.completed[l.id]).length / course.lessons.length * 100);
}
