"use client";

import { ChevronDown } from "lucide-react";
import { SortKey } from "@/lib/utils";

type Props = {
  search: string;
  onSearchChange: (v: string) => void;
  sortBy: SortKey;
  onSortChange: (v: SortKey) => void;
};

export default function SearchBar({ search, onSearchChange, sortBy, onSortChange }: Props) {
  return (
    <div className="flex flex-col sm:flex-row gap-3 sm:items-center sm:justify-between mb-6">
      <input
        type="text"
        value={search}
        onChange={(e) => onSearchChange(e.target.value)}
        placeholder="Search by name or tag..."
        className="bg-[#111] border border-white/10 rounded-md px-4 py-2 text-sm w-full sm:w-72 outline-none focus:border-accent"
      />

      <div className="flex items-center gap-2 text-sm text-gray-300">
        <span>Sort By</span>
        <div className="relative">
          <select
            value={sortBy}
            onChange={(e) => onSortChange(e.target.value as SortKey)}
            className="appearance-none bg-[#111] border border-white/10 rounded-md pl-3 pr-8 py-2 text-sm outline-none focus:border-accent"
          >
            <option value="duration">Duration</option>
            <option value="calories">Calories</option>
            <option value="rating">Rating</option>
          </select>
          <ChevronDown size={14} className="absolute right-2 top-1/2 -translate-y-1/2 pointer-events-none" />
        </div>
      </div>
    </div>
  );
}