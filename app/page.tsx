"use client";

import { useEffect, useState } from "react";
import Hero from "@/components/Hero";
import SearchBar from "@/components/SearchBar";
import WorkoutGrid from "@/components/WorkoutGrid";
import { Workout } from "@/types/workouts";
import { getAllWorkouts } from "@/data/workout";
import { sortWorkouts, filterWorkouts, SortKey } from "@/lib/utils";

export default function HomePage() {
  const [workouts, setWorkouts] = useState<Workout[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [sortBy, setSortBy] = useState<SortKey>("duration");

  useEffect(() => {
    getAllWorkouts()
      .then(setWorkouts)
      .finally(() => setLoading(false));
  }, []);

  const visible = sortWorkouts(filterWorkouts(workouts, search), sortBy);

  return (
    <>
      <Hero />

      <section id="library" className="max-w-7xl mx-auto px-4 sm:px-6 py-14">
        <h2 className="font-heading uppercase text-3xl font-bold mb-1">The Library</h2>
        <p className="text-gray-400 mb-8">Twelve lifts covering every major muscle group.</p>

        <SearchBar search={search} onSearchChange={setSearch} sortBy={sortBy} onSortChange={setSortBy} />

        {loading ? (
  <div className="flex flex-col items-center justify-center py-20 gap-3">
    <div className="w-8 h-8 border-2 border-accent border-t-transparent rounded-full animate-spin" />
    <p className="text-gray-400 text-sm">Loading workouts…</p>
  </div>
) : (
          <WorkoutGrid workouts={visible} />
        )}
      </section>
    </>
  );
}