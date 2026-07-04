import Link from "next/link";
import { navigation } from "@/lib/navigation";

export function AppSidebar() {
  return (
    <aside className="w-72 border-r border-zinc-800 bg-zinc-900">
      <div className="p-6">
        <h1 className="text-2xl font-bold">
          Atlas
        </h1>

        <p className="mt-1 text-sm text-zinc-400">
          Personal Operating System
        </p>
      </div>

      <nav className="space-y-2 px-3">
        {navigation.map((item) => {
          const Icon = item.icon;

          return (
            <Link
              key={item.title}
              href={item.href}
              className="flex items-center gap-3 rounded-lg px-4 py-3 text-zinc-300 transition hover:bg-zinc-800 hover:text-white"
            >
              <Icon size={20} />

              <span>{item.title}</span>
            </Link>
          );
        })}
      </nav>
    </aside>
  );
}