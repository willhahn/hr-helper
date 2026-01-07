
import { Participant } from '../types';

/**
 * Shuffles an array using Fisher-Yates algorithm.
 */
export const shuffleArray = <T,>(array: T[]): T[] => {
  const shuffled = [...array];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
};

/**
 * Parses raw text or CSV-style input into a list of names.
 */
export const parseParticipants = (input: string): Participant[] => {
  return input
    .split(/\r?\n|,/)
    .map(name => name.trim())
    .filter(name => name.length > 0)
    .map((name, index) => ({
      id: `${Date.now()}-${index}`,
      name,
    }));
};
