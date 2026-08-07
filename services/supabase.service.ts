import { supabase, isSupabaseConfigured } from "@/lib/supabase";
import { UserProfile } from "@/stores/profile.store";

export class SupabaseService {
  /**
   * Save user profile to Supabase `user_profiles` table
   */
  static async saveProfile(userId: string, profile: UserProfile): Promise<void> {
    if (!isSupabaseConfigured || !userId) return;

    const payload = {
      id: userId,
      name: profile.name,
      initials: profile.initials,
      date_of_birth: profile.dateOfBirth,
      gender: profile.gender,
      height_cm: profile.heightCm === "" ? null : profile.heightCm,
      weight_kg: profile.weightKg === "" ? null : profile.weightKg,
      activity_level: profile.activityLevel,
      fitness_goal: profile.fitnessGoal,
      occupation: profile.occupation,
      city: profile.city,
      email: profile.email,
      updated_at: new Date().toISOString(),
    };

    const { error } = await supabase.from("user_profiles").upsert(payload);
    if (error) {
      console.warn("Supabase saveProfile warning:", error.message);
    }
  }

  /**
   * Fetch user profile from Supabase `user_profiles` table
   */
  static async getProfile(userId: string): Promise<UserProfile | null> {
    if (!isSupabaseConfigured || !userId) return null;

    const { data, error } = await supabase
      .from("user_profiles")
      .select("*")
      .eq("id", userId)
      .single();

    if (error || !data) return null;

    return {
      name: data.name || "",
      initials: data.initials || "U",
      dateOfBirth: data.date_of_birth || "",
      gender: data.gender || "prefer_not_to_say",
      heightCm: data.height_cm ?? "",
      weightKg: data.weight_kg ?? "",
      activityLevel: data.activity_level || "moderate",
      fitnessGoal: data.fitness_goal || "general",
      occupation: data.occupation || "",
      city: data.city || "",
      email: data.email || "",
    };
  }

  /**
   * Generic save item to any user table
   */
  static async saveUserItem<T extends { id: string }>(
    userId: string,
    tableName: string,
    item: T
  ): Promise<void> {
    if (!isSupabaseConfigured || !userId) return;

    const payload = { ...item, user_id: userId, updated_at: new Date().toISOString() };
    const { error } = await supabase.from(tableName).upsert(payload);
    if (error) {
      console.warn(`Supabase saveUserItem [${tableName}] warning:`, error.message);
    }
  }

  /**
   * Delete item from user table
   */
  static async deleteUserItem(
    userId: string,
    tableName: string,
    itemId: string
  ): Promise<void> {
    if (!isSupabaseConfigured || !userId) return;

    const { error } = await supabase
      .from(tableName)
      .delete()
      .eq("id", itemId)
      .eq("user_id", userId);

    if (error) {
      console.warn(`Supabase deleteUserItem [${tableName}] warning:`, error.message);
    }
  }
}
