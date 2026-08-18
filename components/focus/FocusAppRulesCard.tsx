"use client";

import { useState } from "react";
import { GlassCard } from "@/components/ui/GlassCard";
import { usePhoneControlStore } from "@/stores/phone-control.store";
import { AppCategory } from "@/types/phone-control";
import {
  Ban,
  CheckCircle,
  Share2,
  Gamepad2,
  Tv,
  Film,
  Moon,
  Clock,
  Check,
  Search,
  Smartphone,
  Lock,
  Unlock,
} from "lucide-react";

export function FocusAppRulesCard() {
  const {
    settings,
    installedApps,
    toggleAppCategory,
    toggleAppPackage,
    setBedtime,
  } = usePhoneControlStore();

  const [searchQuery, setSearchQuery] = useState("");

  const categories: {
    id: AppCategory;
    name: string;
    description: string;
    icon: any;
  }[] = [
    {
      id: "social",
      name: "Social Media",
      description: "Instagram, TikTok, X (Twitter), Facebook, Snapchat",
      icon: Share2,
    },
    {
      id: "games",
      name: "Mobile Games",
      description: "PUBG, Clash of Clans, Candy Crush, Action & Casual games",
      icon: Gamepad2,
    },
    {
      id: "streaming",
      name: "Video Streaming",
      description: "YouTube, Netflix, Twitch, Prime Video",
      icon: Tv,
    },
    {
      id: "short_videos",
      name: "Short Video Reels",
      description: "YouTube Shorts, TikTok Feed, Instagram Reels",
      icon: Film,
    },
  ];

  const filteredApps = installedApps.filter((app) =>
    app.appName.toLowerCase().includes(searchQuery.toLowerCase()) ||
    app.packageName.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const blockedCount = (settings.customBlockedPackages || []).length;

  return (
    <GlassCard className="p-6 sm:p-7 space-y-6">
      <div className="flex items-center gap-3 border-b border-[var(--border)] pb-5">
        <div className="p-3 rounded-2xl bg-rose-500/10 text-rose-400 border border-rose-500/20">
          <Ban size={24} />
        </div>
        <div>
          <h3 className="text-lg font-semibold text-[var(--text)] font-heading">
            Device App Restrictions & Bedtime Quiet Hours
          </h3>
          <p className="text-xs text-[var(--text-secondary)]">
            Block specific installed apps on your device or whole category groups.
          </p>
        </div>
      </div>

      {/* Installed Apps Access & Custom App Block Manager */}
      <div className="space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
          <div className="flex items-center gap-2">
            <Smartphone size={16} className="text-[var(--primary)]" />
            <h4 className="text-xs font-semibold uppercase tracking-wider text-[var(--text-secondary)]">
              All Installed Device Apps ({installedApps.length} Detected, {blockedCount} Blocked)
            </h4>
          </div>

          {/* App Search Bar */}
          <div className="relative w-full sm:w-64">
            <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-[var(--text-secondary)]" />
            <input
              type="text"
              placeholder="Search installed apps..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full rounded-xl border border-[var(--border)] bg-[var(--surface-2,rgba(255,255,255,0.04))] pl-9 pr-3 py-1.5 text-xs text-[var(--text)] placeholder:text-[var(--text-tertiary)] outline-none focus:border-[var(--primary)]/50"
            />
          </div>
        </div>

        {/* Installed Apps Grid */}
        <div className="max-h-64 overflow-y-auto no-scrollbar rounded-2xl border border-[var(--border)] bg-[var(--surface-2,rgba(255,255,255,0.02))] p-3">
          {filteredApps.length === 0 ? (
            <div className="py-8 text-center text-xs text-[var(--text-secondary)]">
              No matching installed apps found.
            </div>
          ) : (
            <div className="grid gap-2 sm:grid-cols-2 lg:grid-cols-3">
              {filteredApps.map((app) => {
                const isBlocked = (settings.customBlockedPackages || []).includes(app.packageName);

                return (
                  <div
                    key={app.packageName}
                    onClick={() => toggleAppPackage(app.packageName)}
                    className={`cursor-pointer p-3 rounded-xl border flex items-center justify-between gap-2 transition-all ${
                      isBlocked
                        ? "bg-rose-500/10 border-rose-500/40"
                        : "bg-[var(--surface-3,rgba(255,255,255,0.04))] border-[var(--border)] hover:bg-[var(--surface-hover)]"
                    }`}
                  >
                    <div className="min-w-0 flex-1">
                      <div className="text-xs font-semibold text-[var(--text)] truncate">
                        {app.appName}
                      </div>
                      <div className="text-[10px] text-[var(--text-secondary)] truncate">
                        {app.packageName}
                      </div>
                    </div>

                    <button
                      type="button"
                      className={`flex items-center gap-1 px-2.5 py-1 rounded-lg text-[10px] font-semibold border transition-all ${
                        isBlocked
                          ? "bg-rose-500 text-white border-rose-500"
                          : "bg-white/5 text-[var(--text-secondary)] border-white/10 hover:text-white"
                      }`}
                    >
                      {isBlocked ? (
                        <>
                          <Lock size={10} /> Blocked
                        </>
                      ) : (
                        <>
                          <Unlock size={10} /> Allow
                        </>
                      )}
                    </button>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </div>

      {/* Category Blacklist Preset */}
      <div className="pt-3 border-t border-[var(--border)] space-y-3">
        <h4 className="text-xs font-semibold uppercase tracking-wider text-[var(--text-secondary)]">
          Category Preset Restrictions
        </h4>

        <div className="grid gap-3 sm:grid-cols-2">
          {categories.map((cat) => {
            const Icon = cat.icon;
            const isBlocked = settings.blacklistedAppCategories.includes(cat.id);

            return (
              <div
                key={cat.id}
                onClick={() => toggleAppCategory(cat.id)}
                className={`cursor-pointer p-4 rounded-xl border transition-all ${
                  isBlocked
                    ? "bg-rose-500/10 border-rose-500/40 shadow-sm"
                    : "bg-[var(--surface-2,rgba(255,255,255,0.04))] border-[var(--border)] opacity-60 hover:opacity-100"
                }`}
              >
                <div className="flex items-start gap-3">
                  <div
                    className={`p-2.5 rounded-xl ${
                      isBlocked
                        ? "bg-rose-500 text-white"
                        : "bg-[var(--surface-3,rgba(255,255,255,0.08))] text-[var(--text-secondary)]"
                    }`}
                  >
                    <Icon size={18} />
                  </div>
                  <div className="space-y-0.5 flex-1">
                    <div className="flex items-center justify-between">
                      <h5 className="text-xs font-semibold text-[var(--text)]">{cat.name}</h5>
                      {isBlocked ? (
                        <span className="text-[10px] font-bold uppercase tracking-wider text-rose-400 bg-rose-500/20 px-2 py-0.5 rounded-md border border-rose-500/30">
                          BLOCKED
                        </span>
                      ) : (
                        <span className="text-[10px] text-[var(--text-secondary)]">Allowed</span>
                      )}
                    </div>
                    <p className="text-[11px] text-[var(--text-secondary)] leading-tight">
                      {cat.description}
                    </p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Bedtime Lock Schedule */}
      <div className="pt-4 border-t border-[var(--border)] space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Moon size={18} className="text-indigo-400" />
            <div>
              <h4 className="text-sm font-semibold text-[var(--text)]">Bedtime Quiet Hours Lock</h4>
              <p className="text-xs text-[var(--text-secondary)]">
                Automatically enforce full phone lock during night hours.
              </p>
            </div>
          </div>

          <button
            onClick={() => setBedtime(!settings.bedtimeLockEnabled)}
            className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
              settings.bedtimeLockEnabled ? "bg-indigo-500" : "bg-white/10"
            }`}
          >
            <span
              className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                settings.bedtimeLockEnabled ? "translate-x-6" : "translate-x-1"
              }`}
            />
          </button>
        </div>

        {settings.bedtimeLockEnabled && (
          <div className="grid grid-cols-2 gap-4 p-4 rounded-xl bg-indigo-500/10 border border-indigo-500/30 text-xs">
            <div className="space-y-1">
              <label className="text-[var(--text-secondary)] flex items-center gap-1">
                <Clock size={13} /> Lock Start Time
              </label>
              <input
                type="time"
                value={settings.bedtimeStart}
                onChange={(e) => setBedtime(true, e.target.value, settings.bedtimeEnd)}
                className="w-full rounded-lg bg-black/40 border border-indigo-500/30 px-3 py-2 text-white font-mono outline-none"
              />
            </div>

            <div className="space-y-1">
              <label className="text-[var(--text-secondary)] flex items-center gap-1">
                <Clock size={13} /> Unlock Start Time
              </label>
              <input
                type="time"
                value={settings.bedtimeEnd}
                onChange={(e) => setBedtime(true, settings.bedtimeStart, e.target.value)}
                className="w-full rounded-lg bg-black/40 border border-indigo-500/30 px-3 py-2 text-white font-mono outline-none"
              />
            </div>
          </div>
        )}
      </div>

      {/* Whitelisted Essential Apps */}
      <div className="pt-3 border-t border-[var(--border)] space-y-2">
        <h4 className="text-xs font-semibold uppercase tracking-wider text-[var(--text-secondary)] flex items-center gap-1.5">
          <CheckCircle size={14} className="text-emerald-400" />
          Always Allowed Whitelisted Apps
        </h4>

        <div className="flex flex-wrap gap-2 pt-1">
          {settings.whitelistedApps.map((app) => (
            <span
              key={app}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-emerald-500/10 text-emerald-400 border border-emerald-500/30 text-xs font-medium"
            >
              <Check size={12} />
              {app}
            </span>
          ))}
        </div>
      </div>
    </GlassCard>
  );
}
