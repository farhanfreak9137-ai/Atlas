import { BaseRepository } from "./BaseRepository";
import { STORAGE_KEYS } from "@/lib/constants/storageKeys";
import { Habit } from "@/types/habit";

export const habitRepository =
  new BaseRepository<Habit>(STORAGE_KEYS.HABITS);