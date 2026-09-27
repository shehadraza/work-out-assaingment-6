"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { Plus, Bookmark } from "lucide-react";
import { Workout } from "@/types/workouts";
import { getWorkoutById } from "@/data/workout";
import { useApp } from "@/lib/store";

export default function WorkoutDetailPage() {
  const params = useParams<{ id: string }>();
  const { addToPlan, addToSaved, plan } = useApp();
  const [workout, setWorkout] = useState<Workout | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getWorkoutById(params.id)
      .then(setWorkout)
      .finally(() => setLoading(false));
  }, [params.id]);

  if (loading) return <p className="text-center text-gray-400 py-20">Loading…</p>;
  if (!workout) return <p className="text-center text-gray-400 py-20">Workout not found.</p>;

  const isFull = plan.length >= 5;
  const alreadyInPlan = plan.some((p) => p.id === workout.id);

  const specs = [
    { label: "EQUIPMENT", value: workout.equipment },
    { label: "DIFFICULTY", value: workout.difficulty },
    { label: "SETS", value: workout.sets },
    { label: "REPS", value: workout.reps },
    { label: "DURATION", value: `${workout.duration} min` },
    { label: "CALORIES", value: `${workout.caloriesBurned} kcal` },
    { label: "RATING", value: workout.rating },
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-10 grid grid-cols-1 md:grid-cols-2 gap-10">
      <img src={workout.image} alt={workout.name} className="w-full rounded-xl object-cover max-h-[520px]" />

      <div>
        <h1 className="font-heading uppercase text-3xl font-bold mb-3">{workout.name}</h1>
        <p className="text-gray-400 mb-4">{workout.description}</p>

        <div className="flex gap-2 mb-6">
          {workout.muscleGroups.map((tag) => (
            <span key={tag} className="bg-accent text-black text-xs font-bold px-3 py-1 rounded-full">
              {tag}
            </span>
          ))}
        </div>

        <div className="bg-[#111] border border-white/10 rounded-xl divide-y divide-white/10 mb-6">
          {specs.map((s) => (
            <div key={s.label} className="flex items-center justify-between px-4 py-3 text-sm">
              <span className="text-gray-400">{s.label}</span>
              <span className="font-bold">{s.value}</span>
            </div>
          ))}
        </div>

        <h2 className="font-heading uppercase font-bold mb-3">Instructions</h2>
        <ol className="list-decimal list-inside text-gray-300 space-y-2 mb-8">
          {workout.instructions.map((step, i) => (
            <li key={i}>{step}</li>
          ))}
        </ol>

        <div className="flex flex-wrap gap-3">
          <button
            onClick={() => addToPlan(workout)}
            disabled={isFull || alreadyInPlan}
            className={`font-bold px-5 py-3 rounded-md flex items-center gap-2 ${
              isFull || alreadyInPlan
                ? "bg-white/10 text-gray-500 cursor-not-allowed"
                : "bg-accent text-black"
            }`}
          >
            <Plus size={16} />{" "}
            {alreadyInPlan ? "Already in Plan" : isFull ? "Plan Full (5/5)" : "Add to today's plan"}
          </button>
          <button
            onClick={() => addToSaved(workout)}
            className="border border-white/20 font-bold px-5 py-3 rounded-md flex items-center gap-2"
          >
            <Bookmark size={16} /> Save for later
          </button>
        </div>
      </div>
    </div>
  );
}