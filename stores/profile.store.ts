"use client";

import { create } from "zustand";
import { persist } from "zustand/middleware";

export type Gender = "male" | "female" | "other" | "prefer_not_to_say";
export type ActivityLevel = "sedentary" | "light" | "moderate" | "active" | "very_active";
export type FitnessGoal = "lose_weight" | "maintain" | "gain_muscle" | "endurance" | "flexibility" | "general";

export interface UserProfile {
  // Identity
  name: string;
  initials: string;
  avatarUrl?: string;        // Base64 data URL or remote image URL
  dateOfBirth: string;       // ISO date string "YYYY-MM-DD"
  gender: Gender;
  bio?: string;              // Personal biography, background & interests

  // Physical
  heightCm: number | "";     // cm
  weightKg: number | "";     // kg

  // Lifestyle
  activityLevel: ActivityLevel;
  fitnessGoal: FitnessGoal;
  occupation: string;
  city: string;

  // Contact
  email: string;
}

interface ProfileStore {
  profile: UserProfile;
  isProfileOpen: boolean;
  openProfile: () => void;
  closeProfile: () => void;
  updateProfile: (partial: Partial<UserProfile>) => void;
}

const defaultProfile: UserProfile = {
  name: "Farhan",
  initials: "F",
  avatarUrl: "",
  dateOfBirth: "",
  gender: "prefer_not_to_say",
  bio: "",
  heightCm: "",
  weightKg: "",
  activityLevel: "moderate",
  fitnessGoal: "general",
  occupation: "",
  city: "",
  email: "",
};

export const useProfileStore = create<ProfileStore>()(
  persist(
    (set) => ({
      profile: defaultProfile,
      isProfileOpen: false,
      openProfile: () => set({ isProfileOpen: true }),
      closeProfile: () => set({ isProfileOpen: false }),
      updateProfile: (partial) =>
        set((state) => ({
          profile: { ...state.profile, ...partial },
        })),
    }),
    {
      name: "atlas-profile",
      partialize: (state) => ({ profile: state.profile }),
    }
  )
);
