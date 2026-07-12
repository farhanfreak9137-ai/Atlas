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
} from "lucide-react";

export const navigation = [
  {
    title: "Dashboard",
    href: "/",
    icon: LayoutDashboard,
  },
  {
    title: "Calendar",
    href: "/calendar",
    icon: Calendar,
  },
  {
    title: "Tasks",
    href: "/tasks",
    icon: CheckSquare,
  },
  {
    title: "AI",
    href: "/ai",
    icon: Brain,
  },
  {
    title: "Notes",
    href: "/notes",
    icon: NotebookPen,
  },
  {
    title: "Goals",
    href: "/goals",
    icon: Target,
  },
  {
    title: "Habits",
    href: "/habits",
    icon: Repeat,
  },
  {
    title: "Gym",
    href: "/gym",
    icon: Dumbbell,
  },
  {
    title: "Football",
    href: "/football",
    icon: Trophy,
  },
  {
    title: "Study",
    href: "/study",
    icon: GraduationCap,
  },
  {
    title: "Projects",
    href: "/projects",
    icon: FolderKanban,
  },
  {
    title: "Settings",
    href: "/settings",
    icon: Settings,
  },
];