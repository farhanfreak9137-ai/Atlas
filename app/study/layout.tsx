"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { BookOpen, Clock, BarChart2, GraduationCap } from "lucide-react";

const tabs = [
  { href: "/study", label: "Overview", icon: BarChart2 },
  { href: "/study/subjects", label: "Subjects", icon: BookOpen },
  { href: "/study/sessions", label: "Sessions", icon: Clock },
  { href: "/study/grades", label: "Grades", icon: GraduationCap },
];

export default function StudyLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();

  return (
    <div className="mx-auto max-w-7xl space-y-6">
      {/* Header */}
      <div className="mb-2">
        <p className="text-sm uppercase tracking-[0.25em] text-emerald-500">Academic</p>
        <h1 className="mt-2 text-3xl sm:text-5xl font-bold text-white">Study</h1>
        <p className="mt-3 max-w-2xl text-zinc-400 text-sm sm:text-base">
          Track your subjects, study sessions, and academic performance.
        </p>
      </div>

      {/* Tab Navigation */}
      <nav className="flex items-center space-x-1 rounded-2xl border border-white/5 bg-zinc-900/60 p-1.5 overflow-x-auto no-scrollbar">
        {tabs.map(({ href, label, icon: Icon }) => {
          const isActive = pathname === href;
          return (
            <Link
              key={href}
              href={href}
              className={`flex shrink-0 sm:flex-1 items-center justify-center gap-2 rounded-xl px-4 py-2.5 text-xs sm:text-sm font-medium transition-all duration-200 ${
                isActive
                  ? "bg-zinc-800 text-white shadow-sm font-semibold"
                  : "text-zinc-400 hover:text-zinc-200"
              }`}
            >
              <Icon className="h-4 w-4" />
              {label}
            </Link>
          );
        })}
      </nav>

      {/* Page Content */}
      {children}
    </div>
  );
}
