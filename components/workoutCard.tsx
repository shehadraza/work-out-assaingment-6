import Link from "next/link";
import { Clock, Flame, Star } from "lucide-react";
import { Workout } from "@/types/workouts";

export default function WorkoutCard({ workout }: { workout: Workout }) {
  return (
    <Link
      href={`/workouts/${workout.id}`}
      className="bg-[#111] border border-white/10 rounded-xl overflow-hidden hover:border-accent transition-colors block"
    >
      <img src={workout.image} alt={workout.name} className="w-full h-40 object-cover" />

      <div className="p-4">
        <div className="flex gap-2 mb-2">
          {workout.muscleGroups.slice(0, 2).map((tag) => (
            <span key={tag} className="bg-accent text-black text-[10px] font-bold px-2 py-0.5 rounded-full uppercase">
              {tag}
            </span>
          ))}
        </div>

        <h3 className="font-heading uppercase text-white font-bold mb-1">{workout.name}</h3>
        <p className="text-gray-400 text-xs mb-3">{workout.equipment}</p>

        <div className="flex items-center gap-4 text-gray-300 text-xs">
          <span className="flex items-center gap-1">
            <Clock size={14} /> {workout.duration} min
          </span>
          <span className="flex items-center gap-1">
            <Flame size={14} /> {workout.caloriesBurned} kcal
          </span>
          <span className="flex items-center gap-1">
            <Star size={14} /> {workout.rating}
          </span>
        </div>
      </div>
    </Link>
  );
}