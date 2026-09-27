"use client";

import { useState } from "react";
import { useApp } from "@/lib/store";
import { sortWorkouts, SortKey } from "@/lib/utils";
import PlanCard from "@/components/PlanCard";
import EmptyState from "@/components/EmptyState";

type Tab = "today" | "saved";

export default function MyPlanPage() {
  const { plan, saved, ready, removeFromPlan, removeFromSaved, markDone } = useApp();
  const [tab, setTab] = useState<Tab>("today");
  const [sortBy, setSortBy] = useState<SortKey>("duration");

  const minutes = plan.reduce((sum, w) => sum + w.duration, 0);
  const calories = plan.reduce((sum, w) => sum + w.caloriesBurned, 0);

  const list = tab === "today" ? sortWorkouts(plan, sortBy) : sortWorkouts(saved, sortBy);

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 py-10">
      <h1 className="font-heading uppercase text-3xl font-bold mb-1">My Plan</h1>
      <p className="text-gray-400 mb-8">Cap of five lifts for today. Finish them, then load more.</p>

      <div className="grid grid-cols-3 border border-white/10 rounded-xl mb-8 divide-x divide-white/10">
        <Stat label="Exercises" value={plan.length} />
        <Stat label="Minutes" value={minutes} />
        <Stat label="Calories" value={calories} />
      </div>

      <div className="flex items-center justify-between mb-6 flex-wrap gap-3">
        <div className="flex bg-[#111] rounded-md p-1">
          <button
            onClick={() => setTab("today")}
            className={`px-4 py-2 text-sm rounded-md font-bold ${tab === "today" ? "bg-accent text-black" : "text-gray-400"}`}
          >
            Today&apos;s Plan
          </button>
          <button
            onClick={() => setTab("saved")}
            className={`px-4 py-2 text-sm rounded-md font-bold ${tab === "saved" ? "bg-accent text-black" : "text-gray-400"}`}
          >
            Saved
          </button>
        </div>

        <div className="flex items-center gap-2 text-sm text-gray-300">
          <span>Sort By</span>
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value as SortKey)}
            className="bg-[#111] border border-white/10 rounded-md px-3 py-2 text-sm outline-none"
          >
            <option value="duration">Duration</option>
            <option value="calories">Calories</option>
            <option value="rating">Rating</option>
          </select>
        </div>
      </div>

      {!ready ? (
        <p className="text-center text-gray-400 py-16">Loading workouts…</p>
      ) : list.length === 0 ? (
        <EmptyState
          title="Nothing here yet"
          text="Browse the library and add a lift to get today moving."
          ctaText="Go to workouts"
          ctaHref="/"
        />
      ) : (
        <div className="space-y-4">
          {list.map((w) =>
            tab === "today" ? (
              <PlanCard
                key={w.id}
                workout={w}
                variant="plan"
                done={(w as any).done}
                onRemove={removeFromPlan}
                onMarkDone={markDone}
              />
            ) : (
              <PlanCard key={w.id} workout={w} variant="saved" onRemove={removeFromSaved} />
            )
          )}
        </div>
      )}
    </div>
  );
}

function Stat({ label, value }: { label: string; value: number }) {
  return (
    <div className="p-5">
      <p className="text-gray-400 text-xs mb-1">{label}</p>
      <p className="text-2xl font-bold text-accent">{value}</p>
    </div>
  );
}