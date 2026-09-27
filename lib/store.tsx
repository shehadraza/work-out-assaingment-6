"use client";

import { createContext, useContext, useEffect, useState } from "react";
import { Workout } from "@/types/workouts";
import { loadPlan, savePlan, loadSaved, saveSaved, PlanWorkout } from "@/lib/storage";

const PLAN_LIMIT = 5;

type ToastMsg = { id: number; text: string };

type AppContextType = {
  plan: PlanWorkout[];
  saved: Workout[];
  ready: boolean;
  addToPlan: (w: Workout) => void;
  addToSaved: (w: Workout) => void;
  removeFromPlan: (id: number) => void;
  removeFromSaved: (id: number) => void;
  markDone: (id: number) => void;
};

const AppContext = createContext<AppContextType | null>(null);

export function AppProvider({ children }: { children: React.ReactNode }) {
  const [plan, setPlan] = useState<PlanWorkout[]>([]);
  const [saved, setSaved] = useState<Workout[]>([]);
  const [ready, setReady] = useState(false);
  const [toasts, setToasts] = useState<ToastMsg[]>([]);

  useEffect(() => {
    setPlan(loadPlan());
    setSaved(loadSaved());
    setReady(true);
  }, []);

  useEffect(() => {
    if (ready) savePlan(plan);
  }, [plan, ready]);

  useEffect(() => {
    if (ready) saveSaved(saved);
  }, [saved, ready]);

  function showToast(text: string) {
    const id = Date.now();
    setToasts((t) => [...t, { id, text }]);
    setTimeout(() => {
      setToasts((t) => t.filter((toast) => toast.id !== id));
    }, 2500);
  }

  function addToPlan(w: Workout) {
    if (plan.some((p) => p.id === w.id)) {
      showToast("Already in today's plan");
      return;
    }
    if (plan.length >= PLAN_LIMIT) {
      showToast("Today's plan is full (5 max)");
      return;
    }
    setPlan((p) => [...p, { ...w, done: false }]);
    showToast("Added to today's plan");
  }

  function addToSaved(w: Workout) {
    if (saved.some((s) => s.id === w.id)) {
      showToast("Already saved");
      return;
    }
    setSaved((s) => [...s, w]);
    showToast("Saved for later");
  }

  function removeFromPlan(id: number) {
    setPlan((p) => p.filter((w) => w.id !== id));
    showToast("Removed from plan");
  }

  function removeFromSaved(id: number) {
    setSaved((s) => s.filter((w) => w.id !== id));
    showToast("Removed from saved");
  }

  function markDone(id: number) {
    setPlan((p) => p.map((w) => (w.id === id ? { ...w, done: !w.done } : w)));
    showToast("Marked as done");
  }

  return (
    <AppContext.Provider
      value={{ plan, saved, ready, addToPlan, addToSaved, removeFromPlan, removeFromSaved, markDone }}
    >
      {children}
      <div className="fixed bottom-5 right-5 z-50 flex flex-col gap-2">
        {toasts.map((t) => (
          <div key={t.id} className="bg-accent text-black px-4 py-2 rounded-md text-sm font-bold shadow-lg">
            {t.text}
          </div>
        ))}
      </div>
    </AppContext.Provider>
  );
}

export function useApp() {
  const ctx = useContext(AppContext);
  if (!ctx) throw new Error("useApp must be used inside AppProvider");
  return ctx;
}