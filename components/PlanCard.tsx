"use client";

import Link from "next/link";
import { Clock, Flame, Star, Check, X } from "lucide-react";
import { Workout } from "@/types/workouts";

type Props = {
  workout: Workout;
  variant: "plan" | "saved";
  done?: boolean;
  onRemove: (id: number) => void;
  onMarkDone?: (id: number) => void;
};

export default function PlanCard({ workout, variant, done, onRemove, onMarkDone }: Props) {
  return (
    <div className="flex flex-col sm:flex-row sm:items-center gap-4 bg-[#111] border border-white/10 rounded-xl p-4">
      <img src={workout.image} alt={workout.name} className="w-16 h-16 rounded-lg object-cover" />

      <div className="flex-1">
        <h3 className={`font-heading uppercase font-bold ${done ? "line-through text-gray-500" : ""}`}>
          {workout.name}
        </h3>
        <p className="text-gray-400 text-xs mb-1">{workout.equipment}</p>
        <div className="flex items-center gap-3 text-gray-300 text-xs">
          <span className="flex items-center gap-1">
            <Clock size={12} /> {workout.duration} min
          </span>
          <span className="flex items-center gap-1">
            <Flame size={12} /> {workout.caloriesBurned} kcal
          </span>
          <span className="flex items-center gap-1">
            <Star size={12} /> {workout.rating}
          </span>
        </div>
      </div>

      <div className="flex items-center gap-2">
        <Link
          href={`/workouts/${workout.id}`}
          className="border border-white/20 text-sm px-4 py-2 rounded-md hover:border-accent"
        >
          View Details
        </Link>

        {variant === "plan" && onMarkDone && (
          <button
            onClick={() => onMarkDone(workout.id)}
            className={`text-sm px-4 py-2 rounded-md font-bold flex items-center gap-1 ${
              done ? "bg-white/10 text-gray-400" : "bg-accent text-black"
            }`}
          >
            <Check size={14} /> Mark as Done
          </button>
        )}

        <button
          onClick={() => onRemove(workout.id)}
          className="p-2 rounded-md border border-white/10 text-gray-400 hover:text-white hover:border-white/30"
          aria-label="Remove"
        >
          <X size={14} />
        </button>
      </div>
    </div>
  );
}