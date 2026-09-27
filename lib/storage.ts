import { Workout } from "@/types/workouts";

const PLAN_KEY = "fitlog_plan";
const SAVED_KEY = "fitlog_saved";

export type PlanWorkout = Workout & { done: boolean };

export function loadPlan(): PlanWorkout[] {
  if (typeof window === "undefined") return [];
  try {
    const raw = localStorage.getItem(PLAN_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
}

export function savePlan(plan: PlanWorkout[]) {
  if (typeof window === "undefined") return;
  localStorage.setItem(PLAN_KEY, JSON.stringify(plan));
}

export function loadSaved(): Workout[] {
  if (typeof window === "undefined") return [];
  try {
    const raw = localStorage.getItem(SAVED_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
}

export function saveSaved(saved: Workout[]) {
  if (typeof window === "undefined") return;
  localStorage.setItem(SAVED_KEY, JSON.stringify(saved));
}