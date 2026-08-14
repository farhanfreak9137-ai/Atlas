import { ChatMessage } from "@/types/chat";
import { useChatStore } from "@/stores/chat.store";
import { useDashboardStore } from "@/stores/dashboard.store";
import { useProfileStore } from "@/stores/profile.store";
import { Storage } from "@/lib/storage/storage";
import { STORAGE_KEYS } from "@/lib/constants/storageKeys";

// ---------------------------------------------------------------------------
// Atlas context builder
// Reads all user profile details & module data and formats it for the AI
// ---------------------------------------------------------------------------
function buildAtlasContext(): string {
  const profile = useProfileStore.getState().profile;

  const tasks = Storage.get<any[]>(STORAGE_KEYS.TASKS) ?? [];
  const habits = Storage.get<any[]>(STORAGE_KEYS.HABITS) ?? [];
  const goals = Storage.get<any[]>(STORAGE_KEYS.GOALS) ?? [];
  const notes = Storage.get<any[]>(STORAGE_KEYS.NOTES) ?? [];
  const reminders = Storage.get<any[]>(STORAGE_KEYS.REMINDERS) ?? [];
  const journal = Storage.get<any[]>(STORAGE_KEYS.JOURNAL) ?? [];
  const gymWorkouts = Storage.get<any[]>(STORAGE_KEYS.GYM_WORKOUTS) ?? [];
  const footballMatches = Storage.get<any[]>(STORAGE_KEYS.FOOTBALL_MATCHES) ?? [];
  const studySessions = Storage.get<any[]>(STORAGE_KEYS.STUDY_SESSIONS) ?? [];

  const today = new Date().toDateString();

  const pendingTasks = tasks.filter((t) => !t.completed);
  const completedTasks = tasks.filter((t) => t.completed);
  const todaysHabits = habits.map((h) => ({
    title: h.title,
    frequency: h.frequency,
    completedToday: h.completions?.includes(today) ?? false,
  }));
  const activeGoals = goals.filter((g) => g.status !== "completed");

  const settings = useDashboardStore.getState().settings;

  const verbosityInstructions: Record<number, string> = {
    1: "RESPONSE VERBOSITY: Extremely brief and concise. Keep responses to 1-2 sentences maximum.",
    2: "RESPONSE VERBOSITY: Concise. Answer directly without fluff.",
    3: "RESPONSE VERBOSITY: Balanced length and detail.",
    4: "RESPONSE VERBOSITY: Detailed. Provide background explanation and bullet points.",
    5: "RESPONSE VERBOSITY: Comprehensive. Provide deep analysis, complete explanations, and thorough suggestions.",
  };

  const creativeInstruction = settings.creativeMode
    ? "MODE: Creative mode enabled. Be imaginative, energetic, and offer creative suggestions."
    : "MODE: Precise mode. Be factual, logical, and direct.";

  return `
You are Atlas, the user's personal AI assistant embedded inside their personal life OS.
You know their personal biography, profile, habits, tasks, fitness goals, and notes. Be insightful, specific, empathetic, and highly personal.
Address them by their name (${profile.name || "there"}).
Never say you don't have access to their personal background or data — you have full access provided below.
Today's date: ${today}

${verbosityInstructions[settings.aiVerbosity] ?? verbosityInstructions[3]}
${creativeInstruction}

=== USER PROFILE & BIOGRAPHY ===
- Name: ${profile.name || "Not specified"}
- Email: ${profile.email || "Not specified"}
- Occupation: ${profile.occupation || "Not specified"}
- Location/City: ${profile.city || "Not specified"}
- Date of Birth: ${profile.dateOfBirth || "Not specified"}
- Gender: ${profile.gender || "Not specified"}
- Height: ${profile.heightCm ? `${profile.heightCm} cm` : "Not specified"}
- Weight: ${profile.weightKg ? `${profile.weightKg} kg` : "Not specified"}
- Activity Level: ${profile.activityLevel || "Not specified"}
- Primary Fitness Goal: ${profile.fitnessGoal || "Not specified"}
- Personal Biography & Context: ${profile.bio ? profile.bio : "No bio entered yet."}

=== TASKS ===
Pending (${pendingTasks.length}):
${pendingTasks.length === 0 ? "None" : pendingTasks.map((t) => `- [${t.priority ?? "normal"}] ${t.title}${t.dueDate ? ` (due: ${t.dueDate})` : ""}`).join("\n")}

Completed (${completedTasks.length}):
${completedTasks.length === 0 ? "None" : completedTasks.map((t) => `- ${t.title}`).join("\n")}

=== HABITS ===
${habits.length === 0 ? "No habits tracked yet." : todaysHabits.map((h) => `- ${h.title} (${h.frequency}) — today: ${h.completedToday ? "✓ done" : "✗ not done"}`).join("\n")}

=== GOALS ===
${activeGoals.length === 0 ? "No active goals." : activeGoals.map((g) => `- ${g.title}${g.progress !== undefined ? ` (${g.progress}% complete)` : ""}${g.deadline ? ` — deadline: ${g.deadline}` : ""}`).join("\n")}

=== NOTES & RECENT JOURNAL ===
Notes (${notes.length}):
${notes.length === 0 ? "No notes." : notes.slice(0, 5).map((n) => `- ${n.title ?? "Untitled"}${n.content ? `: ${String(n.content).slice(0, 120)}` : ""}`).join("\n")}

Journal Reflections (${journal.length}):
${journal.length === 0 ? "No journal entries yet." : journal.slice(0, 5).map((j) => `- [${j.date || "Recent"}] ${j.content ? String(j.content).slice(0, 120) : "Entry"}`).join("\n")}

=== FITNESS & LEARNING SUMMARY ===
- Gym Workouts Tracked: ${gymWorkouts.length}
- Football Matches Tracked: ${footballMatches.length}
- Study Sessions Tracked: ${studySessions.length}
`.trim();
}

// ---------------------------------------------------------------------------
// Chat history builder
// Sends the last N messages as conversation history so Atlas remembers context
// ---------------------------------------------------------------------------
function buildMessageHistory(
  currentMessages: ChatMessage[]
): { role: "user" | "assistant"; content: string }[] {
  return currentMessages
    .slice(-10) // last 10 messages for context window efficiency
    .map((m) => ({
      role: m.role === "ai" ? "assistant" : "user",
      content: m.content,
    }));
}

// ---------------------------------------------------------------------------
// Main ChatService
// ---------------------------------------------------------------------------
export class ChatService {
  static add(message: ChatMessage): void {
    useChatStore.getState().addMessage(message);
  }

  static clear(): void {
    useChatStore.getState().clearMessages();
  }

  static generateMessage(
    content: string,
    role: "user" | "ai"
  ): ChatMessage {
    return {
      id: `msg_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
      content,
      role,
      timestamp: Date.now(),
    };
  }

  static async sendMessage(userMessage: string): Promise<string> {
    const userMsg = this.generateMessage(userMessage, "user");
    this.add(userMsg);

    useChatStore.getState().setLoading(true);

    const modelsToTry = [
      "openrouter/free",
      "google/gemini-2.0-flash-lite-001",
      "meta-llama/llama-3.3-70b-instruct:free",
      "google/gemini-flash-1.5:free",
    ];

    try {
      const settings = useDashboardStore.getState().settings;
      const systemPrompt = buildAtlasContext();
      const history = settings.rememberHistory
        ? buildMessageHistory(
            useChatStore.getState().messages.slice(0, -1) // exclude the message we just added
          )
        : [];

      let lastErrorMessage = "";

      for (const model of modelsToTry) {
        try {
          const response = await fetch(
            "https://openrouter.ai/api/v1/chat/completions",
            {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${process.env.NEXT_PUBLIC_OPENROUTER_API_KEY}`,
                "HTTP-Referer": "https://atlas.app",
                "X-Title": "Atlas Personal OS",
              },
              body: JSON.stringify({
                model,
                temperature: settings.creativeMode ? 0.9 : 0.3,
                messages: [
                  { role: "system", content: systemPrompt },
                  ...history,
                  { role: "user", content: userMessage },
                ],
              }),
            }
          );

          if (!response.ok) {
            const error = await response.json().catch(() => ({}));
            lastErrorMessage = error.error?.message ?? `Model ${model} failed`;
            continue; // try next model in fallback list
          }

          const data = await response.json();
          const aiResponse =
            data.choices?.[0]?.message?.content ??
            "Sorry, I couldn't generate a response. Please try again.";

          const aiMsg = this.generateMessage(aiResponse, "ai");
          this.add(aiMsg);

          return aiResponse;
        } catch (err) {
          lastErrorMessage =
            err instanceof Error ? err.message : `Failed connecting to ${model}`;
        }
      }

      throw new Error(lastErrorMessage || "All AI models are currently unavailable.");
    } catch (error) {
      const errorMsg =
        error instanceof Error ? error.message : "Something went wrong.";
      const aiMsg = this.generateMessage(
        `Sorry, I ran into an error: ${errorMsg}`,
        "ai"
      );
      this.add(aiMsg);
      return errorMsg;
    } finally {
      useChatStore.getState().setLoading(false);
    }
  }
}
