import { BaseRepository } from "./BaseRepository";
import { STORAGE_KEYS } from "@/lib/constants/storageKeys";
import { Note } from "@/types/note";

export const noteRepository =
  new BaseRepository<Note>(STORAGE_KEYS.NOTES, );