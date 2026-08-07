"use client";

import { useEffect, useRef, useState } from "react";
import {
  X,
  User,
  Scale,
  Ruler,
  Calendar,
  MapPin,
  Mail,
  Briefcase,
  Activity,
  Target,
  ChevronDown,
  Save,
  Check,
  LogOut,
  LogIn,
  ShieldCheck,
  Lock,
  AlertCircle,
} from "lucide-react";
import {
  useProfileStore,
  ActivityLevel,
  FitnessGoal,
  Gender,
  UserProfile,
} from "@/stores/profile.store";
import { useAuthStore } from "@/stores/auth.store";
import { SupabaseService } from "@/services/supabase.service";

const ACTIVITY_LABELS: Record<ActivityLevel, string> = {
  sedentary: "Sedentary (desk job, little exercise)",
  light: "Light (1–3x exercise/week)",
  moderate: "Moderate (3–5x exercise/week)",
  active: "Active (6–7x exercise/week)",
  very_active: "Very Active (physical job or 2x/day)",
};

const GOAL_LABELS: Record<FitnessGoal, string> = {
  lose_weight: "Lose Weight",
  maintain: "Maintain Weight",
  gain_muscle: "Build Muscle",
  endurance: "Improve Endurance",
  flexibility: "Improve Flexibility",
  general: "General Health",
};

const GENDER_LABELS: Record<Gender, string> = {
  male: "Male",
  female: "Female",
  other: "Other",
  prefer_not_to_say: "Prefer not to say",
};

function calculateAge(dob: string): number | null {
  if (!dob) return null;
  const birth = new Date(dob);
  const today = new Date();
  let age = today.getFullYear() - birth.getFullYear();
  const m = today.getMonth() - birth.getMonth();
  if (m < 0 || (m === 0 && today.getDate() < birth.getDate())) age--;
  return age;
}

function calculateBMI(heightCm: number | "", weightKg: number | ""): string | null {
  if (!heightCm || !weightKg) return null;
  const bmi = Number(weightKg) / Math.pow(Number(heightCm) / 100, 2);
  return bmi.toFixed(1);
}

function getBMICategory(bmi: string | null): { label: string; color: string } {
  if (!bmi) return { label: "", color: "" };
  const v = parseFloat(bmi);
  if (v < 18.5) return { label: "Underweight", color: "text-blue-400" };
  if (v < 25) return { label: "Normal", color: "text-green-400" };
  if (v < 30) return { label: "Overweight", color: "text-yellow-400" };
  return { label: "Obese", color: "text-red-400" };
}

interface FieldProps {
  label: string;
  icon: React.ReactNode;
  children: React.ReactNode;
}

function Field({ label, icon, children }: FieldProps) {
  return (
    <div className="space-y-1.5">
      <label className="flex items-center gap-2 text-xs font-medium text-zinc-400 uppercase tracking-wider">
        <span className="text-[#1F7A5B]">{icon}</span>
        {label}
      </label>
      {children}
    </div>
  );
}

const inputClass = `
  w-full rounded-xl border border-white/10 bg-white/5 px-4 py-2.5
  text-sm text-white placeholder-zinc-500
  focus:outline-none focus:border-[#1F7A5B]/50 focus:bg-white/8
  transition-all duration-200
`;

const selectClass = `
  w-full rounded-xl border border-white/10 bg-white/5 px-4 py-2.5
  text-sm text-white
  focus:outline-none focus:border-[#1F7A5B]/50
  transition-all duration-200
  appearance-none
  [&>option]:bg-zinc-900
`;

export function ProfilePanel() {
  const { profile, isProfileOpen, closeProfile, updateProfile } = useProfileStore();
  const {
    user,
    loading: authLoading,
    error: authError,
    isSupabaseConfigured,
    signInEmail,
    signUpEmail,
    signInGoogle,
    logOut,
    clearError,
  } = useAuthStore();

  const panelRef = useRef<HTMLDivElement>(null);
  const [saved, setSaved] = useState(false);
  const [local, setLocal] = useState<UserProfile>(profile);

  // Auth form state
  const [authMode, setAuthMode] = useState<"login" | "signup">("login");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [authSubmitting, setAuthSubmitting] = useState(false);

  // Sync local state when panel opens
  useEffect(() => {
    if (isProfileOpen) {
      setLocal(profile);
    }
  }, [isProfileOpen, profile]);

  // Sync user details to local profile when user logs in
  useEffect(() => {
    if (user) {
      const name = user.user_metadata?.full_name || user.email?.split("@")[0] || profile.name || "User";
      const initials = name
        .split(" ")
        .map((w: string) => w[0])
        .join("")
        .toUpperCase()
        .slice(0, 2) || "U";

      const updated = {
        ...profile,
        name,
        email: user.email || profile.email,
        initials,
      };
      updateProfile(updated);
      setLocal(updated);

      // Load remote profile if available
      SupabaseService.getProfile(user.id).then((remote) => {
        if (remote) {
          updateProfile(remote);
          setLocal(remote);
        }
      });
    }
  }, [user]);

  // Close on Escape
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape" && isProfileOpen) closeProfile();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [isProfileOpen, closeProfile]);

  // Close on backdrop click
  useEffect(() => {
    const onClick = (e: MouseEvent) => {
      if (!isProfileOpen) return;
      if (panelRef.current && !panelRef.current.contains(e.target as Node)) {
        closeProfile();
      }
    };
    window.addEventListener("mousedown", onClick);
    return () => window.removeEventListener("mousedown", onClick);
  }, [isProfileOpen, closeProfile]);

  // Lock body scroll
  useEffect(() => {
    document.body.style.overflow = isProfileOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [isProfileOpen]);

  function set<K extends keyof UserProfile>(key: K, value: UserProfile[K]) {
    setLocal((prev) => ({ ...prev, [key]: value }));
  }

  async function handleSave() {
    const initials =
      local.name
        .split(" ")
        .map((w) => w[0])
        .join("")
        .toUpperCase()
        .slice(0, 2) || "U";
    const updated = { ...local, initials };
    updateProfile(updated);

    if (user) {
      try {
        await SupabaseService.saveProfile(user.id, updated);
      } catch (e) {
        console.error("Failed to save to Supabase", e);
      }
    }

    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  }

  async function handleAuthSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!email || !password) return;
    setAuthSubmitting(true);
    clearError();
    try {
      if (authMode === "login") {
        await signInEmail(email, password);
      } else {
        await signUpEmail(email, password, local.name);
      }
      setEmail("");
      setPassword("");
    } catch (e) {
      // handled by store
    } finally {
      setAuthSubmitting(false);
    }
  }

  async function handleGoogleSignIn() {
    setAuthSubmitting(true);
    clearError();
    try {
      await signInGoogle();
    } catch (e) {
      // handled by store
    } finally {
      setAuthSubmitting(false);
    }
  }

  const age = calculateAge(local.dateOfBirth);
  const bmi = calculateBMI(local.heightCm, local.weightKg);
  const bmiCategory = getBMICategory(bmi);

  if (!isProfileOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-end">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/60 backdrop-blur-sm animate-in fade-in duration-200"
        aria-hidden="true"
      />

      {/* Slide-over Panel */}
      <div
        ref={panelRef}
        className="
          relative z-10
          h-full w-full max-w-[440px]
          flex flex-col
          border-l border-white/10
          bg-[#050816]/98 backdrop-blur-3xl
          shadow-[-20px_0_80px_rgba(0,0,0,0.8)]
          animate-in slide-in-from-right duration-300
          overflow-hidden
        "
      >
        {/* Top Glow */}
        <div className="absolute inset-x-0 top-0 h-48 bg-gradient-to-b from-[#1F7A5B]/15 to-transparent pointer-events-none" />

        {/* Header */}
        <div className="relative flex items-center justify-between px-6 pt-6 pb-4 shrink-0">
          <div className="flex items-center gap-4">
            {/* Avatar */}
            <div className="relative">
              <div
                className="
                flex h-14 w-14 items-center justify-center
                rounded-2xl
                bg-gradient-to-br from-[#1F7A5B] to-[#2A8F66]
                text-xl font-bold text-white
                shadow-lg shadow-[0_10px_30px_rgba(31,122,91,.35)]
              "
              >
                {profile.initials || "U"}
              </div>
              <div
                className={`absolute -bottom-1 -right-1 h-4 w-4 rounded-full border-2 border-[#050816] ${
                  user ? "bg-emerald-400 shadow-[0_0_8px_#34d399]" : "bg-zinc-500"
                }`}
              />
            </div>
            <div>
              <h2 className="text-xl font-bold text-white leading-tight">
                {profile.name || "Your Profile"}
              </h2>
              <p className="text-xs text-zinc-400 flex items-center gap-1.5 mt-0.5">
                {user ? (
                  <span className="text-emerald-400 font-medium flex items-center gap-1">
                    <ShieldCheck size={13} /> Supabase Sync Active
                  </span>
                ) : (
                  <span>{age !== null ? `${age} years old` : "Atlas Personal OS"}</span>
                )}
              </p>
            </div>
          </div>

          <button
            onClick={closeProfile}
            className="
              flex h-9 w-9 items-center justify-center
              rounded-xl border border-white/10 bg-white/5
              text-zinc-400 hover:text-white hover:bg-white/10
              transition-all
            "
            aria-label="Close profile"
          >
            <X size={18} />
          </button>
        </div>

        {/* BMI Quick-stat */}
        {bmi && (
          <div className="mx-6 mb-2 rounded-2xl border border-white/8 bg-white/[0.04] px-4 py-3 flex items-center justify-between">
            <div className="text-xs text-zinc-400">Body Mass Index</div>
            <div className="flex items-baseline gap-2">
              <span className="text-2xl font-bold text-white">{bmi}</span>
              <span className={`text-xs font-semibold ${bmiCategory.color}`}>{bmiCategory.label}</span>
            </div>
          </div>
        )}

        <div className="mx-6 h-px bg-white/8 mb-4 shrink-0" />

        {/* Scrollable Container */}
        <div className="flex-1 overflow-y-auto px-6 pb-6 space-y-6 no-scrollbar">

          {/* === SUPABASE AUTH SECTION === */}
          <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-4 space-y-3.5">
            <div className="flex items-center justify-between">
              <span className="text-xs font-semibold uppercase tracking-wider text-zinc-300 flex items-center gap-1.5">
                <Lock size={14} className="text-[#1F7A5B]" />
                Supabase Auth & Sync
              </span>
              <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                100% Free Forever (No Card)
              </span>
            </div>

            {user ? (
              // Logged in View
              <div className="space-y-3 pt-1">
                <div className="flex items-center justify-between rounded-xl bg-white/5 p-3 border border-white/5">
                  <div className="min-w-0 flex-1">
                    <p className="text-xs text-zinc-400">Signed in as</p>
                    <p className="text-sm font-medium text-white truncate">{user.email}</p>
                  </div>
                  <button
                    onClick={() => logOut()}
                    disabled={authLoading}
                    className="flex items-center gap-1.5 text-xs font-medium text-red-400 hover:text-red-300 bg-red-500/10 hover:bg-red-500/20 px-3 py-2 rounded-xl transition"
                  >
                    <LogOut size={13} /> Log Out
                  </button>
                </div>
              </div>
            ) : !isSupabaseConfigured ? (
              // Supabase Env setup guide
              <div className="space-y-2.5 text-xs text-zinc-400">
                <div className="flex items-center gap-2 text-emerald-400 font-medium">
                  <AlertCircle size={15} /> Add Supabase Keys to `.env.local`
                </div>
                <p className="leading-relaxed">
                  Get your free API keys from <a href="https://supabase.com" target="_blank" rel="noreferrer" className="text-emerald-400 underline">supabase.com</a> (no credit card required ever) and paste them in <code className="text-zinc-200 font-mono">.env.local</code>:
                </p>
                <div className="rounded-xl bg-black/40 p-3 font-mono text-[11px] text-zinc-300 overflow-x-auto space-y-1 border border-white/5">
                  <p>NEXT_PUBLIC_SUPABASE_URL=https://xyz.supabase.co</p>
                  <p>NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbGci...</p>
                </div>
              </div>
            ) : (
              // Supabase Auth Form
              <div className="space-y-3 pt-1">
                {/* Tabs */}
                <div className="flex rounded-xl bg-white/5 p-1 border border-white/5">
                  <button
                    type="button"
                    onClick={() => {
                      setAuthMode("login");
                      clearError();
                    }}
                    className={`flex-1 py-1.5 text-xs font-medium rounded-lg transition ${
                      authMode === "login"
                        ? "bg-[#1F7A5B] text-white shadow"
                        : "text-zinc-400 hover:text-white"
                    }`}
                  >
                    Sign In
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      setAuthMode("signup");
                      clearError();
                    }}
                    className={`flex-1 py-1.5 text-xs font-medium rounded-lg transition ${
                      authMode === "signup"
                        ? "bg-[#1F7A5B] text-white shadow"
                        : "text-zinc-400 hover:text-white"
                    }`}
                  >
                    Create Account
                  </button>
                </div>

                {authError && (
                  <div className="text-xs text-red-400 bg-red-500/10 border border-red-500/20 p-2.5 rounded-xl">
                    {authError}
                  </div>
                )}

                <form onSubmit={handleAuthSubmit} className="space-y-2.5">
                  <input
                    type="email"
                    placeholder="Email address"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className={inputClass}
                    required
                  />
                  <input
                    type="password"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className={inputClass}
                    required
                  />
                  <button
                    type="submit"
                    disabled={authSubmitting}
                    className="w-full flex items-center justify-center gap-2 rounded-xl bg-[#1F7A5B] py-2.5 text-xs font-semibold text-white hover:bg-[#2A8F66] transition shadow-md"
                  >
                    <LogIn size={14} />
                    {authSubmitting
                      ? "Processing..."
                      : authMode === "login"
                      ? "Sign In with Email"
                      : "Create Free Account"}
                  </button>
                </form>

                <div className="flex items-center gap-3 my-2">
                  <div className="h-px flex-1 bg-white/10" />
                  <span className="text-[10px] text-zinc-500 uppercase tracking-wider">OR</span>
                  <div className="h-px flex-1 bg-white/10" />
                </div>

                <button
                  type="button"
                  onClick={handleGoogleSignIn}
                  disabled={authSubmitting}
                  className="w-full flex items-center justify-center gap-2 rounded-xl border border-white/10 bg-white/5 py-2.5 text-xs font-medium text-zinc-200 hover:bg-white/10 hover:text-white transition"
                >
                  <svg className="w-4 h-4" viewBox="0 0 24 24">
                    <path
                      fill="#EA4335"
                      d="M12 5c1.6 0 3 .6 4.1 1.6l3.1-3.1C17.3 1.7 14.8 1 12 1 7.5 1 3.7 3.6 1.9 7.3l3.7 2.9C6.5 7.2 9 5 12 5z"
                    />
                    <path
                      fill="#4285F4"
                      d="M23.5 12.3c0-.8-.1-1.6-.2-2.3H12v4.5h6.5c-.3 1.5-1.1 2.8-2.4 3.7l3.7 2.9c2.2-2 3.7-5 3.7-8.8z"
                    />
                    <path
                      fill="#FBBC05"
                      d="M5.6 14.8c-.2-.7-.4-1.5-.4-2.3s.2-1.6.4-2.3L1.9 7.3C.7 9.7 0 10.8 0 12s.7 2.3 1.9 4.7l3.7-1.9z"
                    />
                    <path
                      fill="#34A853"
                      d="M12 23c3.2 0 6-1.1 8-3l-3.7-2.9c-1.1.7-2.5 1.2-4.3 1.2-3 0-5.5-2.2-6.4-5.2L1.9 16c1.8 3.7 5.6 7 10.1 7z"
                    />
                  </svg>
                  Continue with Google
                </button>
              </div>
            )}
          </div>

          {/* === Identity === */}
          <div>
            <p className="mb-3 text-[10px] font-bold uppercase tracking-widest text-zinc-500">Identity</p>
            <div className="space-y-3">
              <Field label="Full Name" icon={<User size={12} />}>
                <input
                  className={inputClass}
                  placeholder="e.g. Farhan Ahmed"
                  value={local.name}
                  onChange={(e) => set("name", e.target.value)}
                />
              </Field>

              <Field label="Email" icon={<Mail size={12} />}>
                <input
                  type="email"
                  className={inputClass}
                  placeholder="you@example.com"
                  value={local.email}
                  onChange={(e) => set("email", e.target.value)}
                />
              </Field>

              <div className="grid grid-cols-2 gap-3">
                <Field label="Date of Birth" icon={<Calendar size={12} />}>
                  <input
                    type="date"
                    className={`${inputClass} [color-scheme:dark]`}
                    value={local.dateOfBirth}
                    onChange={(e) => set("dateOfBirth", e.target.value)}
                  />
                </Field>
                <Field label="Gender" icon={<User size={12} />}>
                  <div className="relative">
                    <select
                      className={selectClass}
                      value={local.gender}
                      onChange={(e) => set("gender", e.target.value as Gender)}
                    >
                      {Object.entries(GENDER_LABELS).map(([v, l]) => (
                        <option key={v} value={v}>
                          {l}
                        </option>
                      ))}
                    </select>
                    <ChevronDown
                      size={14}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-zinc-400 pointer-events-none"
                    />
                  </div>
                </Field>
              </div>
            </div>
          </div>

          {/* === Physical === */}
          <div>
            <p className="mb-3 text-[10px] font-bold uppercase tracking-widest text-zinc-500">Physical</p>
            <div className="grid grid-cols-2 gap-3">
              <Field label="Height (cm)" icon={<Ruler size={12} />}>
                <input
                  type="number"
                  min={50}
                  max={280}
                  className={inputClass}
                  placeholder="175"
                  value={local.heightCm}
                  onChange={(e) => set("heightCm", e.target.value === "" ? "" : Number(e.target.value))}
                />
              </Field>
              <Field label="Weight (kg)" icon={<Scale size={12} />}>
                <input
                  type="number"
                  min={20}
                  max={500}
                  step={0.1}
                  className={inputClass}
                  placeholder="70"
                  value={local.weightKg}
                  onChange={(e) => set("weightKg", e.target.value === "" ? "" : Number(e.target.value))}
                />
              </Field>
            </div>
          </div>

          {/* === Lifestyle === */}
          <div>
            <p className="mb-3 text-[10px] font-bold uppercase tracking-widest text-zinc-500">Lifestyle</p>
            <div className="space-y-3">
              <Field label="Activity Level" icon={<Activity size={12} />}>
                <div className="relative">
                  <select
                    className={selectClass}
                    value={local.activityLevel}
                    onChange={(e) => set("activityLevel", e.target.value as ActivityLevel)}
                  >
                    {Object.entries(ACTIVITY_LABELS).map(([v, l]) => (
                      <option key={v} value={v}>
                        {l}
                      </option>
                    ))}
                  </select>
                  <ChevronDown
                    size={14}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-zinc-400 pointer-events-none"
                  />
                </div>
              </Field>

              <Field label="Fitness Goal" icon={<Target size={12} />}>
                <div className="grid grid-cols-2 gap-2">
                  {(Object.entries(GOAL_LABELS) as [FitnessGoal, string][]).map(([v, l]) => (
                    <button
                      key={v}
                      type="button"
                      onClick={() => set("fitnessGoal", v)}
                      className={`
                        rounded-xl border px-3 py-2 text-xs font-medium text-left transition-all duration-200
                        ${
                          local.fitnessGoal === v
                            ? "border-[#1F7A5B]/60 bg-[#1F7A5B]/15 text-white shadow-[0_0_15px_rgba(31,122,91,.2)]"
                            : "border-white/8 bg-white/[0.03] text-zinc-400 hover:border-white/15 hover:text-zinc-200"
                        }
                      `}
                    >
                      {l}
                    </button>
                  ))}
                </div>
              </Field>
            </div>
          </div>

          {/* === Location & Work === */}
          <div>
            <p className="mb-3 text-[10px] font-bold uppercase tracking-widest text-zinc-500">About You</p>
            <div className="space-y-3">
              <Field label="Occupation" icon={<Briefcase size={12} />}>
                <input
                  className={inputClass}
                  placeholder="e.g. Software Engineer"
                  value={local.occupation}
                  onChange={(e) => set("occupation", e.target.value)}
                />
              </Field>
              <Field label="City" icon={<MapPin size={12} />}>
                <input
                  className={inputClass}
                  placeholder="e.g. Dhaka"
                  value={local.city}
                  onChange={(e) => set("city", e.target.value)}
                />
              </Field>
            </div>
          </div>
        </div>

        {/* Save footer */}
        <div className="shrink-0 border-t border-white/8 px-6 py-4 bg-[#050816]/80 backdrop-blur-xl">
          <button
            onClick={handleSave}
            className={`
              w-full flex items-center justify-center gap-2.5
              rounded-2xl py-3.5 text-sm font-semibold
              transition-all duration-300
              ${
                saved
                  ? "bg-green-600/20 border border-green-500/40 text-green-400"
                  : "bg-gradient-to-r from-[#1F7A5B] to-[#2A8F66] text-white shadow-lg shadow-[0_8px_30px_rgba(31,122,91,.35)] hover:shadow-[0_12px_40px_rgba(31,122,91,.5)] hover:-translate-y-0.5 active:translate-y-0"
              }
            `}
          >
            {saved ? (
              <>
                <Check size={16} />
                Profile Saved & Synced
              </>
            ) : (
              <>
                <Save size={16} />
                Save Profile
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
}
