import {
  LayoutDashboard,
  Brain,
  Target,
  CheckSquare,
  Repeat,
  Calendar,
  Dumbbell,
  Trophy,
  GraduationCap,
  FolderKanban,
  Settings,
  NotebookPen,
  Smartphone,
} from "lucide-react";

export type NavGroup = "overview" | "productivity" | "lifestyle" | "system";

export interface NavItem {
  title: string;
  href: string;
  icon: React.ComponentType<{ size?: number; className?: string }>;
  group: NavGroup;
}

export const navigation: NavItem[] = [
  {
    title: "Dashboard",
    href: "/",
    icon: LayoutDashboard,
    group: "overview",
  },
  {
    title: "AI",
    href: "/ai",
    icon: Brain,
    group: "overview",
  },
  {
    title: "Focus & Control",
    href: "/focus",
    icon: Smartphone,
    group: "productivity",
  },
  {
    title: "Calendar",
    href: "/calendar",
    icon: Calendar,
    group: "productivity",
  },
  {
    title: "Tasks",
    href: "/tasks",
    icon: CheckSquare,
    group: "productivity",
  },
  {
    title: "Goals",
    href: "/goals",
    icon: Target,
    group: "productivity",
  },
  {
    title: "Habits",
    href: "/habits",
    icon: Repeat,
    group: "productivity",
  },
  {
    title: "Notes",
    href: "/notes",
    icon: NotebookPen,
    group: "productivity",
  },
  {
    title: "Projects",
    href: "/projects",
    icon: FolderKanban,
    group: "productivity",
  },
  {
    title: "Gym",
    href: "/gym",
    icon: Dumbbell,
    group: "lifestyle",
  },
  {
    title: "Football",
    href: "/football",
    icon: Trophy,
    group: "lifestyle",
  },
  {
    title: "Study",
    href: "/study",
    icon: GraduationCap,
    group: "lifestyle",
  },
  {
    title: "Settings",
    href: "/settings",
    icon: Settings,
    group: "system",
  },
];

export const navGroups: { key: NavGroup; label: string }[] = [
  { key: "overview",    label: "Overview" },
  { key: "productivity", label: "Productivity" },
  { key: "lifestyle",   label: "Lifestyle" },
  { key: "system",      label: "System" },
];