"use client";

import { FormEvent, useState, useEffect } from "react";

interface HabitFormProps {
  onAdd: (
    title: string,
    icon: string,
    color: string,
    target: number
  ) => void;
}

export function HabitForm({ onAdd }: HabitFormProps) {
  const [title, setTitle] = useState("");
  const [icon, setIcon] = useState("💧");
  const [color, setColor] = useState("blue");
  const [target, setTarget] = useState(8);

  // Auto-suggest icons based on common categories
  const suggestedIcons = [
    "💧", "🍎", "🏃", "🎧", "📚", "🌱", "💪", "⭐", "🧘", "🛌",
    "🍳", "🚲", "🪡", "📖", "💤", "🌙", "☀️", "🌈", "❤️", "🚀"
  ];

  const [suggestedIndex, setSuggestedIndex] = useState(0);

  const handleIconHintClick = () => {
    const nextIndex = (suggestedIndex + 1) % suggestedIcons.length;
    setSuggestedIndex(nextIndex);
    setIcon(suggestedIcons[nextIndex]);
  };

  useEffect(() => {
    const firstInput = document.querySelector<HTMLInputElement>('input[placeholder="What positive habit will you build?"]');
    if (firstInput) {
      firstInput.focus();
    }
  }, []);

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();

    if (!title.trim()) return;

    onAdd(title.trim(), icon, color, target);

    setTitle("");
    setIcon("💧");
    setColor("blue");
    setTarget(8);
  };

  return (
    <div className="min-h-screen flex items-start justify-center bg-gray-900 text-white">
      <div className="w-full max-w-md p-4 sm:p-6 lg:p-8">
        <div className="rounded-lg bg-zinc-900 bg-opacity-80 p-6 shadow-lg">
          <form
            onSubmit={handleSubmit}
            className="space-y-6 flex flex-col"
          >
            {/* Animated Title */}
            <div className="flex flex-col items-center justify-center">
              <h2 className="text-2xl md:text-3xl font-bold text-zinc-300 mb-4 bg-clip-text bg-gradient-to-r from-blue-400 to-purple-400 bg-opacity-20 rounded-full bg-clip-text bg-opacity-10">
                Create Habit
              </h2>
            </div>

            {/* Habit Name Input */}
            <div className="flex flex-col">
              <label htmlFor="habit-name" className="text-sm font-medium text-zinc-200 mb-1">
                Habit Name
              </label>
              <input
                id="habit-name"
                type="text"
                placeholder="What positive habit will you build?"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="rounded-xl border border-zinc-700 bg-zinc-950 px-5 py-4 text-lg text-white focus:bg-zinc-900 focus:border-blue-500 transition-all duration-300 shadow-sm"
                autoFocus
              />
            </div>

            {/* Icon Selection */}
            <div className="flex flex-col sm:flex-row gap-3 mb-4">
              {/* Icon Hint Button */}
              <button
                onClick={() => handleIconHintClick()}
                className="flex items-center justify-center w-full sm:w-auto rounded-xl bg-zinc-800 px-4 py-2.5 text-sm text-zinc-300 hover:bg-zinc-700 transition-colors"
                aria-label="Get icon suggestion"
              >
                {icon}
              </button>

              {/* Suggestion Hover Area */}
              <div className="flex-1 h-12 flex items-center justify-center overflow-hidden rounded-xl bg-zinc-800 group">
                <span
                  className={`w-full text-center transition-all duration-300 group-hover:scale-105 font-medium text-zinc-100 opacity-80`}
                  style={{
                    opacity: 0.8
                  }}
                >
                  {suggestedIcons.map((icon, idx) =>
                    idx === suggestedIndex ? icon : '•'
                  ).join('')}
                </span>
              </div>

              {/* Color Picker - Mobile Only */}
              <div className="flex flex-col sm:hidden">
                <label className="text-sm font-medium text-zinc-200 mb-1">Accent Color</label>
                <select
                  value={color}
                  onChange={(e) => setColor(e.target.value)}
                  className="rounded-xl border border-zinc-700 bg-zinc-950 px-4 py-2.5 text-lg text-zinc-200 focus:border-blue-500 focus:bg-zinc-950 transition-all"
                >
                  <option value="blue">Blue</option>
                  <option value="green">Green</option>
                  <option value="red">Red</option>
                  <option value="yellow">Yellow</option>
                  <option value="purple">Purple</option>
                </select>
              </div>
            </div>

            {/* Target Input */}
            <div className="flex flex-col">
              <label className="text-sm font-medium text-zinc-200 mb-1">
                Target Progress (#{Math.min(target, 20)})
              </label>
              <input
                type="number"
                min={1}
                value={target}
                onChange={(e) => setTarget(Number(e.target.value))}
                className="rounded-xl border border-zinc-700 bg-zinc-950 px-5 py-3 text-lg text-white focus:bg-zinc-950 focus:border-blue-500 transition-all duration-300"
              />
            </div>

            {/* Live Preview */}
            <div className="sm:hidden mb-4 rounded-xl bg-zinc-800 p-4 shadow-sm">
              <div className="flex flex-col items-center text-center">
                <div className="flex flex-col items-center text-center">
                  <span
                    className="rounded-full bg-gradient-to-r from-blue-400 to-purple-400 bg-opacity-30 p-3 w-10 h-10 flex items-center justify-center"
                  >
                    {icon}
                  </span>
                  <p className="text-xs text-zinc-300 mt-1 capitalize">
                    {title.charAt(0).toUpperCase() + title.slice(1)}
                  </p>
                </div>
                <div className="text-sm text-zinc-300">
                  Target: <span className="font-medium">{target}</span>
                </div>
              </div>
            </div>

            {/* Mobile Color Swatch Preview */}
            <div className="sm:hidden flex items-center gap-2 mb-3">
              <span
                className={`w-2 h-2 rounded-full transition-transform duration-200`}
                style={{ backgroundColor: `var(--${color}-500)` }}
              />
              <span className="text-xs text-zinc-300">{color} Accent</span>
            </div>

            {/* Submit Button */}
            <div className="flex flex-col sm:flex-row justify-center">
              <button
                type="submit"
                disabled={false}
                className="w-full sm:w-auto rounded-xl bg-blue-600 py-3 font-medium text-white px-6 transition-all duration-300 hover:bg-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-opacity-50 shadow-sm"
              >
                Add New Habit
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}