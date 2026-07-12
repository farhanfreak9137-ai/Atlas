import { BaseRepository } from "./BaseRepository";
import { STORAGE_KEYS } from "@/lib/constants/storageKeys";
import { Reminder } from "@/types/reminder";

export const reminderRepository =
  new BaseRepository<Reminder>(STORAGE_KEYS.REMINDERS);