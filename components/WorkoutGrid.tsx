import { Workout } from "@/types/workouts";
import WorkoutCard from "./workoutCard";

export default function WorkoutGrid({ workouts }: { workouts: Workout[] }) {
  if (workouts.length === 0) {
    return <p className="text-gray-400 text-center py-10">No workouts found.</p>;
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      {workouts.map((w) => (
        <WorkoutCard key={w.id} workout={w} />
      ))}
    </div>
  );
}