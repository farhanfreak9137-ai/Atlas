import {
  LayoutDashboard,
  Brain,
  BookOpen,
  Target,
  CheckSquare,
  Dumbbell,
  Trophy,
  GraduationCap,
  FolderKanban,
  Settings,
} from "lucide-react";

export const navigation = [
  {
    title: "Dashboard",
    icon: LayoutDashboard,
    href: "/",
  },
  {
    title: "AI",
    icon: Brain,
    href: "/ai",
  },
  {
    title: "Journal",
    icon: BookOpen,
    href: "/journal",
  },
  {
    title: "Goals",
    icon: Target,
    href: "/goals",
  },
  {
    title: "Habits",
    icon: CheckSquare,
    href: "/habits",
  },
  {
    title: "Gym",
    icon: Dumbbell,
    href: "/gym",
  },
  {
    title: "Football",
    icon: Trophy,
    href: "/football",
  },
  {
    title: "Study",
    icon: GraduationCap,
    href: "/study",
  },
  {
    title: "Projects",
    icon: FolderKanban,
    href: "/projects",
  },
  {
    title: "Settings",
    icon: Settings,
    href: "/settings",
  },
];