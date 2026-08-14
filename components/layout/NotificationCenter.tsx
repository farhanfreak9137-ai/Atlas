"use client";

import { useState, useRef, useEffect } from "react";
import Link from "next/link";
import {
  Bell,
  CheckSquare,
  Flame,
  Target,
  Clock,
  CheckCheck,
  Trash2,
  X,
  Info,
} from "lucide-react";
import { useNotificationStore, NotificationItem } from "@/stores/notification.store";
import { useDashboardStore } from "@/stores/dashboard.store";

function formatRelativeTime(isoString: string): string {
  try {
    const diff = Math.floor((Date.now() - new Date(isoString).getTime()) / 1000);
    if (diff < 60) return "Just now";
    if (diff < 3600) return `${Math.floor(diff / 60)}m ago`;
    if (diff < 86400) return `${Math.floor(diff / 3600)}h ago`;
    return `${Math.floor(diff / 86400)}d ago`;
  } catch {
    return "Recently";
  }
}

export function NotificationCenter() {
  const [open, setOpen] = useState(false);
  const [filter, setFilter] = useState<"all" | "unread">("all");
  const popoverRef = useRef<HTMLDivElement>(null);

  const {
    notifications,
    markAsRead,
    markAllAsRead,
    deleteNotification,
    clearAll,
  } = useNotificationStore();

  const { settings } = useDashboardStore();
  const enabledCategories = settings.notificationCategories ?? ["tasks", "habits", "goals", "reminders"];

  // Filter notifications by active categories in settings
  const activeNotifications = notifications.filter((n) =>
    enabledCategories.includes(n.category)
  );

  const unreadCount = activeNotifications.filter((n) => !n.read).length;

  const displayedNotifications = activeNotifications.filter((n) =>
    filter === "unread" ? !n.read : true
  );

  // Close popover when clicking outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (popoverRef.current && !popoverRef.current.contains(event.target as Node)) {
        setOpen(false);
      }
    }
    if (open) {
      document.addEventListener("mousedown", handleClickOutside);
    }
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [open]);

  // Icon mapping
  const getIcon = (type: NotificationItem["type"]) => {
    switch (type) {
      case "task":
        return <CheckSquare size={16} className="text-blue-500" />;
      case "habit":
        return <Flame size={16} className="text-amber-500" />;
      case "goal":
        return <Target size={16} className="text-purple-500" />;
      case "reminder":
        return <Clock size={16} className="text-[var(--primary)]" />;
      default:
        return <Info size={16} className="text-[var(--primary)]" />;
    }
  };

  return (
    <div className="relative" ref={popoverRef}>
      {/* Bell Trigger Button */}
      <button
        onClick={() => setOpen(!open)}
        className={`
          relative flex items-center justify-center
          h-9 w-9 rounded-xl border transition-all duration-200
          ${
            open
              ? "border-[var(--primary)] bg-[var(--primary)]/15 text-[var(--primary)] shadow-sm"
              : "border-[var(--border)] bg-[var(--surface-2,rgba(255,255,255,0.05))] text-[var(--text-secondary)] hover:text-[var(--text)] hover:bg-[var(--surface-hover)]"
          }
        `}
        aria-label="Notifications"
      >
        <Bell size={17} />

        {/* Unread badge count dot */}
        {unreadCount > 0 && (
          <span
            className="
              absolute -top-1 -right-1
              flex h-4 min-w-4 items-center justify-center
              rounded-full bg-[var(--primary)] px-1
              text-[10px] font-bold text-white font-mono
              border-2 border-[var(--background)]
              shadow-[0_0_8px_var(--primary-glow)]
              animate-pulse
            "
          >
            {unreadCount}
          </span>
        )}
      </button>

      {/* Notification Dropdown Panel */}
      {open && (
        <div
          className="
            absolute right-0 top-12 z-50
            w-80 sm:w-96 rounded-2xl border border-[var(--border)]
            bg-[var(--card)] backdrop-blur-2xl
            p-4 shadow-2xl animate-in fade-in slide-in-from-top-2 duration-200
          "
        >
          {/* Panel Header */}
          <div className="flex items-center justify-between pb-3 border-b border-[var(--border)]">
            <div className="flex items-center gap-2">
              <Bell size={16} className="text-[var(--primary)]" />
              <h3 className="font-bold font-heading text-[var(--text)] text-base">
                Notifications
              </h3>
              {unreadCount > 0 && (
                <span className="rounded-full bg-[var(--primary)]/15 border border-[var(--primary)]/30 px-2 py-0.5 text-[11px] font-bold text-[var(--primary)] font-mono">
                  {unreadCount} new
                </span>
              )}
            </div>

            <div className="flex items-center gap-1">
              {unreadCount > 0 && (
                <button
                  onClick={markAllAsRead}
                  className="rounded-lg p-1.5 text-xs text-[var(--text-secondary)] hover:text-[var(--primary)] hover:bg-[var(--surface-hover)] transition"
                  title="Mark all as read"
                >
                  <CheckCheck size={16} />
                </button>
              )}

              {activeNotifications.length > 0 && (
                <button
                  onClick={clearAll}
                  className="rounded-lg p-1.5 text-xs text-[var(--text-secondary)] hover:text-rose-400 hover:bg-rose-500/10 transition"
                  title="Clear all"
                >
                  <Trash2 size={15} />
                </button>
              )}

              <button
                onClick={() => setOpen(false)}
                className="rounded-lg p-1.5 text-xs text-[var(--text-secondary)] hover:text-[var(--text)] hover:bg-[var(--surface-hover)] transition"
              >
                <X size={16} />
              </button>
            </div>
          </div>

          {/* Filter Tabs */}
          <div className="flex items-center gap-1 my-3 rounded-xl bg-[var(--surface-2,rgba(255,255,255,0.04))] p-1 border border-[var(--border)] text-xs font-medium">
            <button
              onClick={() => setFilter("all")}
              className={`flex-1 rounded-lg py-1 text-center transition-all ${
                filter === "all"
                  ? "bg-[var(--primary)]/20 text-[var(--primary)] font-semibold border border-[var(--primary)]/30 shadow-sm"
                  : "text-[var(--text-secondary)] hover:text-[var(--text)]"
              }`}
            >
              All ({activeNotifications.length})
            </button>

            <button
              onClick={() => setFilter("unread")}
              className={`flex-1 rounded-lg py-1 text-center transition-all ${
                filter === "unread"
                  ? "bg-[var(--primary)]/20 text-[var(--primary)] font-semibold border border-[var(--primary)]/30 shadow-sm"
                  : "text-[var(--text-secondary)] hover:text-[var(--text)]"
              }`}
            >
              Unread ({unreadCount})
            </button>
          </div>

          {/* Notifications List */}
          <div className="max-h-80 overflow-y-auto space-y-2 pr-0.5 custom-scrollbar">
            {displayedNotifications.length === 0 ? (
              <div className="py-8 text-center">
                <Bell size={28} className="mx-auto text-[var(--text-tertiary)] opacity-40 mb-2" />
                <p className="text-sm font-semibold text-[var(--text-secondary)]">No notifications</p>
                <p className="text-xs text-[var(--text-tertiary)] mt-0.5">
                  {filter === "unread" ? "You're all caught up!" : "Nothing to show right now."}
                </p>
              </div>
            ) : (
              displayedNotifications.map((notif) => {
                const Content = (
                  <div
                    onClick={() => {
                      if (!notif.read) markAsRead(notif.id);
                    }}
                    className={`
                      group relative flex items-start gap-3 rounded-xl p-3 border transition-all duration-200 cursor-pointer
                      ${
                        notif.read
                          ? "border-[var(--border)] bg-[var(--surface-2,rgba(255,255,255,0.02))] opacity-75 hover:opacity-100 hover:bg-[var(--surface-hover)]"
                          : "border-[var(--primary)]/30 bg-[var(--primary)]/8 hover:bg-[var(--primary)]/12 shadow-sm"
                      }
                    `}
                  >
                    {/* Category Icon */}
                    <div className="mt-0.5 shrink-0 p-2 rounded-lg bg-[var(--surface-3,rgba(255,255,255,0.06))] border border-[var(--border)]">
                      {getIcon(notif.type)}
                    </div>

                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between gap-2">
                        <p
                          className={`text-xs font-semibold truncate ${
                            notif.read ? "text-[var(--text-secondary)]" : "text-[var(--text)]"
                          }`}
                        >
                          {notif.title}
                        </p>
                        <span className="text-[10px] text-[var(--text-tertiary)] font-mono shrink-0">
                          {formatRelativeTime(notif.timestamp)}
                        </span>
                      </div>

                      <p className="text-xs text-[var(--text-secondary)] mt-0.5 line-clamp-2 leading-relaxed">
                        {notif.message}
                      </p>
                    </div>

                    {/* Unread indicator dot */}
                    {!notif.read && (
                      <span className="absolute top-3 right-3 h-2 w-2 rounded-full bg-[var(--primary)] shadow-[0_0_6px_var(--primary)]" />
                    )}

                    {/* Delete action button on hover */}
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        deleteNotification(notif.id);
                      }}
                      className="opacity-0 group-hover:opacity-100 p-1 rounded-md text-[var(--text-tertiary)] hover:text-rose-400 hover:bg-rose-500/10 transition shrink-0"
                      title="Delete notification"
                    >
                      <X size={13} />
                    </button>
                  </div>
                );

                return notif.link ? (
                  <Link key={notif.id} href={notif.link} onClick={() => setOpen(false)}>
                    {Content}
                  </Link>
                ) : (
                  <div key={notif.id}>{Content}</div>
                );
              })
            )}
          </div>

          {/* Panel Footer */}
          <div className="mt-3 pt-2 border-t border-[var(--border)] text-center">
            <Link
              href="/settings"
              onClick={() => setOpen(false)}
              className="text-[11px] font-medium text-[var(--text-tertiary)] hover:text-[var(--primary)] transition"
            >
              Manage notifications in Settings →
            </Link>
          </div>
        </div>
      )}
    </div>
  );
}
