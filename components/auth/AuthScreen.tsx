"use client";

import React, { useState } from "react";
import { LogIn, Sparkles, UserPlus, Lock, Mail, User, ArrowRight, ShieldCheck } from "lucide-react";
import { useAuthStore } from "@/stores/auth.store";

interface AuthScreenProps {
  onGuestAccess?: () => void;
}

export function AuthScreen({ onGuestAccess }: AuthScreenProps) {
  const {
    signInEmail,
    signUpEmail,
    signInGoogle,
    error,
    clearError,
    isSupabaseConfigured,
  } = useAuthStore();

  const [mode, setMode] = useState<"login" | "signup">("login");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [submitting, setSubmitting] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!email || !password) return;
    setSubmitting(true);
    clearError();
    try {
      if (mode === "login") {
        await signInEmail(email, password);
      } else {
        await signUpEmail(email, password, name);
      }
    } catch (err) {
      // handled by store
    } finally {
      setSubmitting(false);
    }
  }

  async function handleGoogle() {
    setSubmitting(true);
    clearError();
    try {
      await signInGoogle();
    } catch (err) {
      // handled by store
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <div className="relative min-h-screen w-full flex items-center justify-center bg-[#050816] text-white p-4 sm:p-6 overflow-hidden">
      {/* Background Glow Effects */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute left-1/2 top-1/4 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full bg-[#1F7A5B]/20 blur-[180px]" />
        <div className="absolute right-[-100px] bottom-[-100px] w-[500px] h-[500px] rounded-full bg-violet-500/15 blur-[200px]" />
        <div className="absolute inset-0 opacity-[0.03] bg-[linear-gradient(rgba(255,255,255,.08)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,.08)_1px,transparent_1px)] bg-[size:60px_60px]" />
      </div>

      {/* Main Glass Box */}
      <div className="relative z-10 w-full max-w-md space-y-6">
        {/* Header Branding */}
        <div className="text-center space-y-3">
          <div className="inline-flex h-16 w-16 items-center justify-center rounded-3xl bg-gradient-to-br from-[#1F7A5B] to-[#2A8F66] text-2xl font-bold text-white shadow-[0_10px_40px_rgba(31,122,91,.4)] border border-white/20">
            A
          </div>
          <h1 className="text-3xl font-extrabold tracking-tight text-white sm:text-4xl">
            Atlas OS
          </h1>
          <p className="text-sm text-zinc-400 max-w-xs mx-auto">
            Your Personal AI Operating System. Sign in to access your habits, tasks, goals & notes.
          </p>
        </div>

        {/* Auth Card */}
        <div className="rounded-3xl border border-white/10 bg-white/[0.04] p-6 backdrop-blur-3xl shadow-[0_20px_80px_rgba(0,0,0,0.6)] space-y-5">
          {/* Mode Switcher Tabs */}
          <div className="flex rounded-2xl bg-white/5 p-1 border border-white/5">
            <button
              type="button"
              onClick={() => {
                setMode("login");
                clearError();
              }}
              className={`flex-1 py-2.5 text-xs font-semibold rounded-xl transition-all duration-200 ${
                mode === "login"
                  ? "bg-[#1F7A5B] text-white shadow-lg shadow-[#1F7A5B]/30"
                  : "text-zinc-400 hover:text-white"
              }`}
            >
              Sign In
            </button>
            <button
              type="button"
              onClick={() => {
                setMode("signup");
                clearError();
              }}
              className={`flex-1 py-2.5 text-xs font-semibold rounded-xl transition-all duration-200 ${
                mode === "signup"
                  ? "bg-[#1F7A5B] text-white shadow-lg shadow-[#1F7A5B]/30"
                  : "text-zinc-400 hover:text-white"
              }`}
            >
              Create Account
            </button>
          </div>

          {error && (
            <div className="text-xs text-red-400 bg-red-500/10 border border-red-500/20 p-3 rounded-2xl text-center">
              {error}
            </div>
          )}

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-3.5">
            {mode === "signup" && (
              <div className="relative">
                <User size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-400" />
                <input
                  type="text"
                  placeholder="Full Name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full rounded-2xl border border-white/10 bg-white/5 pl-11 pr-4 py-3 text-sm text-white placeholder-zinc-500 focus:outline-none focus:border-[#1F7A5B]/60 focus:bg-white/8 transition"
                  required
                />
              </div>
            )}

            <div className="relative">
              <Mail size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-400" />
              <input
                type="email"
                placeholder="Email address"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full rounded-2xl border border-white/10 bg-white/5 pl-11 pr-4 py-3 text-sm text-white placeholder-zinc-500 focus:outline-none focus:border-[#1F7A5B]/60 focus:bg-white/8 transition"
                required
              />
            </div>

            <div className="relative">
              <Lock size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-400" />
              <input
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full rounded-2xl border border-white/10 bg-white/5 pl-11 pr-4 py-3 text-sm text-white placeholder-zinc-500 focus:outline-none focus:border-[#1F7A5B]/60 focus:bg-white/8 transition"
                required
              />
            </div>

            <button
              type="submit"
              disabled={submitting}
              className="w-full flex items-center justify-center gap-2 rounded-2xl bg-gradient-to-r from-[#1F7A5B] to-[#2A8F66] py-3.5 text-sm font-semibold text-white shadow-lg shadow-[0_10px_30px_rgba(31,122,91,.4)] hover:shadow-[0_15px_40px_rgba(31,122,91,.5)] transition active:scale-[0.99]"
            >
              {submitting ? (
                "Processing..."
              ) : mode === "login" ? (
                <>
                  Sign In <ArrowRight size={16} />
                </>
              ) : (
                <>
                  Create Account <UserPlus size={16} />
                </>
              )}
            </button>
          </form>

          {/* Divider */}
          <div className="flex items-center gap-3 my-3">
            <div className="h-px flex-1 bg-white/10" />
            <span className="text-[10px] text-zinc-500 uppercase tracking-widest font-semibold">OR</span>
            <div className="h-px flex-1 bg-white/10" />
          </div>

          {/* Google OAuth Button */}
          <button
            type="button"
            onClick={handleGoogle}
            disabled={submitting}
            className="w-full flex items-center justify-center gap-3 rounded-2xl border border-white/10 bg-white/5 py-3 text-xs font-medium text-zinc-200 hover:bg-white/10 hover:text-white transition"
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

        {/* Guest access option */}
        {onGuestAccess && (
          <div className="text-center pt-1">
            <button
              type="button"
              onClick={onGuestAccess}
              className="text-xs text-zinc-400 hover:text-white underline transition"
            >
              Continue as Guest (Local Offline Mode)
            </button>
          </div>
        )}

        <div className="text-center text-[11px] text-zinc-500 flex items-center justify-center gap-1.5">
          <ShieldCheck size={13} className="text-[#1F7A5B]" /> Supabase Encrypted Authentication
        </div>
      </div>
    </div>
  );
}
