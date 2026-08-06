import { BaseRepository } from "./BaseRepository";
import { STORAGE_KEYS } from "@/lib/constants/storageKeys";
import { FootballMatch, FootballTraining } from "@/types/football";

export const footballMatchRepository = new BaseRepository<FootballMatch>(
  STORAGE_KEYS.FOOTBALL_MATCHES
);

export const footballTrainingRepository = new BaseRepository<FootballTraining>(
  STORAGE_KEYS.FOOTBALL_TRAINING
);
