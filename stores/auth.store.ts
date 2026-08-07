"use client";

import { create } from "zustand";
import { User } from "@supabase/supabase-js";
import { supabase, isSupabaseConfigured } from "@/lib/supabase";

interface AuthState {
  user: User | null;
  loading: boolean;
  error: string | null;
  isSupabaseConfigured: boolean;
  initAuthListener: () => () => void;
  signInEmail: (email: string, pass: string) => Promise<void>;
  signUpEmail: (email: string, pass: string, name?: string) => Promise<void>;
  signInGoogle: () => Promise<void>;
  logOut: () => Promise<void>;
  clearError: () => void;
}

export const useAuthStore = create<AuthState>((set) => ({
  user: null,
  loading: true,
  error: null,
  isSupabaseConfigured,

  initAuthListener: () => {
    if (!isSupabaseConfigured) {
      set({ loading: false });
      return () => {};
    }

    // Get current session
    supabase.auth.getSession().then(({ data }) => {
      set({ user: data.session?.user ?? null, loading: false });
    });

    // Listen for auth changes
    const { data: authListener } = supabase.auth.onAuthStateChange(
      (_event, session) => {
        set({ user: session?.user ?? null, loading: false });
      }
    );

    return () => {
      authListener.subscription.unsubscribe();
    };
  },

  signInEmail: async (email, pass) => {
    if (!isSupabaseConfigured) throw new Error("Supabase keys missing in .env.local");
    set({ loading: true, error: null });
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password: pass,
    });
    if (error) {
      set({ error: error.message, loading: false });
      throw error;
    }
    set({ user: data.user, loading: false });
  },

  signUpEmail: async (email, pass, name) => {
    if (!isSupabaseConfigured) throw new Error("Supabase keys missing in .env.local");
    set({ loading: true, error: null });
    const { data, error } = await supabase.auth.signUp({
      email,
      password: pass,
      options: {
        data: { full_name: name },
      },
    });
    if (error) {
      set({ error: error.message, loading: false });
      throw error;
    }
    set({ user: data.user, loading: false });
  },

  signInGoogle: async () => {
    if (!isSupabaseConfigured) throw new Error("Supabase keys missing in .env.local");
    set({ loading: true, error: null });
    const { error } = await supabase.auth.signInWithOAuth({
      provider: "google",
    });
    if (error) {
      set({ error: error.message, loading: false });
      throw error;
    }
    set({ loading: false });
  },

  logOut: async () => {
    set({ loading: true });
    await supabase.auth.signOut();
    set({ user: null, loading: false });
  },

  clearError: () => set({ error: null }),
}));
