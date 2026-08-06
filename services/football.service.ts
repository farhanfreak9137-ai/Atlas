import {
  footballMatchRepository,
  footballTrainingRepository,
} from "@/repositories/football.repository";
import { FootballMatch, FootballStats, FootballTraining } from "@/types/football";

export class FootballService {
  static getMatches(): FootballMatch[] {
    return footballMatchRepository.getAll();
  }

  static getTrainingSessions(): FootballTraining[] {
    return footballTrainingRepository.getAll();
  }

  static logMatch(matchData: Omit<FootballMatch, "id">): FootballMatch {
    const matches = footballMatchRepository.getAll();
    const newMatch: FootballMatch = {
      ...matchData,
      id: crypto.randomUUID(),
    };
    matches.unshift(newMatch);
    footballMatchRepository.save(matches);
    return newMatch;
  }

  static logTraining(trainingData: Omit<FootballTraining, "id">): FootballTraining {
    const sessions = footballTrainingRepository.getAll();
    const newSession: FootballTraining = {
      ...trainingData,
      id: crypto.randomUUID(),
    };
    sessions.unshift(newSession);
    footballTrainingRepository.save(sessions);
    return newSession;
  }

  static deleteMatch(id: string): void {
    const matches = footballMatchRepository.getAll().filter((m) => m.id !== id);
    footballMatchRepository.save(matches);
  }

  static deleteTraining(id: string): void {
    const sessions = footballTrainingRepository.getAll().filter((t) => t.id !== id);
    footballTrainingRepository.save(sessions);
  }

  static getStats(): FootballStats {
    const matches = footballMatchRepository.getAll();
    const trainings = footballTrainingRepository.getAll();

    const totalMatches = matches.length;
    let totalGoals = 0;
    let totalAssists = 0;
    let ratingSum = 0;
    let wins = 0;

    for (const match of matches) {
      totalGoals += match.goals;
      totalAssists += match.assists;
      ratingSum += match.rating;
      if (match.result === "Win") {
        wins++;
      }
    }

    const averageRating = totalMatches > 0 ? Number((ratingSum / totalMatches).toFixed(1)) : 0;
    const winPercentage = totalMatches > 0 ? Math.round((wins / totalMatches) * 100) : 0;

    let totalTrainingMinutes = 0;
    for (const training of trainings) {
      totalTrainingMinutes += training.durationMinutes;
    }
    const totalTrainingHours = Number((totalTrainingMinutes / 60).toFixed(1));

    return {
      totalMatches,
      totalGoals,
      totalAssists,
      averageRating,
      winPercentage,
      totalTrainingHours,
    };
  }
}
