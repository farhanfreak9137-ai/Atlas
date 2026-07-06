import { BaseRepository } from "./BaseRepository";
import { STORAGE_KEYS } from "@/lib/constants/storageKeys";
import { Goal } from "@/types/goal";

export const goalRepository =
  new BaseRepository<Goal>(STORAGE_KEYS.GOALS);