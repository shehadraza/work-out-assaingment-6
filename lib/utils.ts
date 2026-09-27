import { Workout } from "@/types/workouts";

export type SortKey = "duration" | "calories" | "rating";

export function sortWorkouts(list: Workout[], sortBy: SortKey): Workout[] {
  const copy = [...list];
  if (sortBy === "duration") copy.sort((a, b) => a.duration - b.duration);
  if (sortBy === "calories") copy.sort((a, b) => a.caloriesBurned - b.caloriesBurned);
  if (sortBy === "rating") copy.sort((a, b) => b.rating - a.rating);
  return copy;
}

export function filterWorkouts(list: Workout[], query: string): Workout[] {
  if (!query.trim()) return list;
  const q = query.toLowerCase();
  return list.filter(
    (w) =>
      w.name.toLowerCase().includes(q) ||
      w.muscleGroups.some((g) => g.toLowerCase().includes(q))
  );
}