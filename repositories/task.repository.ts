import { BaseRepository } from "./BaseRepository";
import { STORAGE_KEYS } from "@/lib/constants/storageKeys";
import { Task } from "@/types/task";

export const taskRepository =
  new BaseRepository<Task>(STORAGE_KEYS.TASKS);