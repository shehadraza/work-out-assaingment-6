"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useApp } from "@/lib/store";

export default function Navbar() {
  const pathname = usePathname();
  const { plan, saved } = useApp();

  const linkClass = (href: string) =>
    `text-sm font-medium transition-colors ${
      pathname === href ? "text-accent" : "text-gray-300 hover:text-white"
    }`;

  return (
    <header className="border-b border-white/10 bg-black">
      <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-3 px-4 sm:px-6 py-4">
        <Link href="/" className="text-lg font-bold tracking-wide text-white">
          FITLOG
        </Link>

        <nav className="flex items-center gap-6">
          <Link href="/" className={linkClass("/")}>
            Workouts
          </Link>
          <Link href="/my-plan" className={linkClass("/my-plan")}>
            My Plan
          </Link>
        </nav>

        <div className="flex items-center gap-3 text-xs sm:text-sm">
          <Link href="/my-plan" className="flex items-center gap-1 text-gray-300">
            Plan
            <span className="bg-accent text-black rounded-full px-2 py-0.5 text-xs font-bold">
              {plan.length}
            </span>
          </Link>
          <Link href="/my-plan" className="flex items-center gap-1 text-gray-300">
            Saved
            <span className="border border-gray-500 rounded-full px-2 py-0.5 text-xs font-bold">
              {saved.length}
            </span>
          </Link>
        </div>
      </div>
    </header>
  );
}