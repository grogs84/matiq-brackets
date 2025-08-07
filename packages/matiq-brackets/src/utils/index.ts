/**
 * Shared utility functions for wrestling bracket components
 */

import { Match, Participant, BracketPosition } from '../types';

/**
 * Create lookup map for matches by ID
 * @param matches - Array of match objects  
 * @returns Map of match.id -> match object
 */
export const createMatchMap = (matches: Match[]): Record<string, Match> => {
  const matchMap: Record<string, Match> = {};
  matches.forEach(match => {
    matchMap[match.id] = match;
  });
  return matchMap;
};

/**
 * Format participant display name with seed prefix
 * @param participant - Participant object with name and seed
 * @returns Formatted name with seed prefix (e.g., "[1] Matt McDonough")
 */
export const formatParticipantName = (participant?: Participant): string => {
  if (!participant) return 'TBD';
  const seed = participant.seed ? `[${participant.seed}] ` : '';
  return `${seed}${participant.name || 'TBD'}`;
};

/**
 * Determine if participant is the winner of the match
 * @param match - Match object with winner field
 * @param participant - Participant to check
 * @returns True if participant is the winner
 */
export const isWinner = (match: Match, participant?: Participant): boolean => {
  return !!(match.winner && participant && match.winner === participant.name);
};

/**
 * Find all matches that advance to a specific target match
 * @param matches - Array of all matches
 * @param targetMatchId - ID of the target match
 * @returns Array of matches that advance to the target
 */
export const findSourceMatches = (matches: Match[], targetMatchId: string): Match[] => {
  return matches.filter(match => match.winner_next_match_id === targetMatchId);
};

/**
 * Build tournament rounds by following advancement pointers
 * Works with flat database structure using winner_next_match_id
 * @param matches - Array of all matches
 * @returns Array of rounds, each containing an array of matches
 */
export const buildRoundsFromMatches = (matches: Match[]): Match[][] => {
  const rounds: Match[][] = [];
  const matchMap = createMatchMap(matches);
  
  // Find first round: matches with no previous match references
  const firstRound = matches.filter(match => 
    !match.winner_prev_match_id && !match.loser_prev_match_id
  );
  
  if (firstRound.length === 0) return rounds;
  
  rounds.push(firstRound);
  
  // Build subsequent rounds by following winner_next_match_id pointers
  let currentRound = firstRound;
  
  while (currentRound.length > 1) {
    const nextRound: Match[] = [];
    const processedMatches = new Set<string>();
    
    currentRound.forEach(match => {
      const nextMatchId = match.winner_next_match_id;
      if (nextMatchId && !processedMatches.has(nextMatchId)) {
        const nextMatch = matchMap[nextMatchId];
        if (nextMatch) {
          nextRound.push(nextMatch);
          processedMatches.add(nextMatchId);
        }
      }
    });
    
    if (nextRound.length > 0) {
      rounds.push(nextRound);
      currentRound = nextRound;
    } else {
      break; // Reached final
    }
  }
  
  return rounds;
};

/**
 * Calculate the center point of a rectangle
 * @param position - Top-left corner position
 * @param width - Rectangle width
 * @param height - Rectangle height
 * @returns Center point coordinates
 */
export const getRectangleCenter = (position: BracketPosition, width: number, height: number): BracketPosition => ({
  x: position.x + width / 2,
  y: position.y + height / 2
});

/**
 * Calculate distance between two points
 * @param point1 - First point
 * @param point2 - Second point
 * @returns Euclidean distance between the points
 */
export const calculateDistance = (point1: BracketPosition, point2: BracketPosition): number => {
  const dx = point2.x - point1.x;
  const dy = point2.y - point1.y;
  return Math.sqrt(dx * dx + dy * dy);
};

/**
 * Validate that a position has finite, non-NaN coordinates
 * @param position - Position to validate
 * @returns True if position is valid
 */
export const isValidPosition = (position: BracketPosition): boolean => {
  return !isNaN(position.x) && !isNaN(position.y) && 
         isFinite(position.x) && isFinite(position.y);
};

/**
 * Filter array of positions to only include valid ones
 * @param positions - Array of positions to filter
 * @returns Array containing only valid positions
 */
export const filterValidPositions = (positions: BracketPosition[]): BracketPosition[] => {
  return positions.filter(isValidPosition);
};