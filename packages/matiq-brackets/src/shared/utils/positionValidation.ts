/**
 * Position validation and fallback utilities for bracket positioning
 */

import type { Match, Participant } from '../types';

/**
 * Create lookup map for matches by ID
 * @param matches - Array of match objects  
 * @returns Map of match.id -> match object
 */
export function createMatchMap(matches: Match[]): Record<string, Match> {
  const matchMap: Record<string, Match> = {};
  matches.forEach(match => {
    matchMap[match.id] = match;
  });
  return matchMap;
}

/**
 * Format participant display name with seed prefix
 * @param participant - Participant object with name and seed
 * @returns Formatted name with seed prefix (e.g., "[1] Matt McDonough")
 */
export function formatParticipantName(participant: Participant | null): string {
  if (!participant) return 'TBD';
  const seed = participant.seed ? `[${participant.seed}] ` : '';
  return `${seed}${participant.name || 'TBD'}`;
}

/**
 * Determine if participant is the winner of the match
 * @param match - Match object with winner field
 * @param participant - Participant to check
 * @returns True if participant is the winner
 */
export function isWinner(match: Match, participant: Participant | null): boolean {
  return !!(match.winner && participant && match.winner === participant.name);
}

/**
 * Build championship bracket rounds using flat match structure
 * Works with database format using winner_next_match_id pointers
 * @param matches - Array of all matches in the tournament
 * @returns Array of rounds, each containing matches for that round
 */
export function buildRoundsFromTree(matches: Match[]): Match[][] {
  const rounds: Match[][] = [];
  const matchMap = createMatchMap(matches);
  
  // Find first round: matches with no winner_prev_match_id
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
}