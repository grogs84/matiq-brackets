/**
 * Consolation bracket specific utilities for positioning and round organization
 * 
 * Wrestling consolation brackets have unique flow patterns where eliminated
 * wrestlers from the championship bracket enter at specific positions.
 */

import type { Match, Position, TournamentRounds, BracketLayout, LayoutOptions } from '../types';
import { BRACKET_CONSTANTS } from '../constants';
import { createMatchMap } from './positionValidation';

/**
 * Build consolation bracket rounds from flat match structure
 * Consolation brackets follow different advancement rules than championship brackets
 * @param matches - Array of all consolation matches
 * @returns Array of rounds, each containing matches for that round
 */
export function buildConsolationRoundsFromTree(matches: Match[]): TournamentRounds {
  const rounds: Match[][] = [];
  const matchMap = createMatchMap(matches);
  
  // For consolation brackets, find the starting round
  // These are typically matches where wrestlers enter from championship bracket losses
  const firstRound = matches.filter(match => 
    !match.winner_prev_match_id && !match.loser_prev_match_id
  );
  
  if (firstRound.length === 0) {
    // If no clear first round, organize by match progression
    return organizeConsolationByProgression(matches);
  }
  
  rounds.push(firstRound);
  
  // Build subsequent rounds by following next match pointers
  let currentRound = firstRound;
  
  while (currentRound.length > 0) {
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
      break;
    }
  }
  
  return rounds;
}

/**
 * Organize consolation matches by progression when clear round structure isn't available
 * @param matches - Array of consolation matches
 * @returns Organized rounds
 */
function organizeConsolationByProgression(matches: Match[]): TournamentRounds {
  // Sort matches by some logical progression (could be match IDs, positions, etc.)
  // This is a fallback when the match structure doesn't clearly define rounds
  
  const sortedMatches = [...matches].sort((a, b) => {
    // Simple sorting by match ID for now - can be enhanced
    return a.id.localeCompare(b.id);
  });
  
  // For a simple consolation structure, assume single elimination format
  // This can be enhanced for more complex consolation flows
  const rounds: Match[][] = [];
  let remainingMatches = [...sortedMatches];
  
  while (remainingMatches.length > 0) {
    // Take matches for this round (could be refined based on specific rules)
    const roundSize = Math.min(Math.ceil(remainingMatches.length / 2), remainingMatches.length);
    const roundMatches = remainingMatches.slice(0, roundSize);
    rounds.push(roundMatches);
    remainingMatches = remainingMatches.slice(roundSize);
  }
  
  return rounds;
}

/**
 * Calculate consolation bracket layout with specific positioning rules
 * Consolation brackets often have different spacing and positioning than championship brackets
 * @param rounds - Array of consolation rounds
 * @param options - Layout options
 * @returns Layout with positions, dimensions, and match size
 */
export function calculateConsolationLayout(
  rounds: TournamentRounds, 
  options: LayoutOptions = {}
): BracketLayout {
  if (rounds.length === 0) {
    return { 
      positions: {}, 
      dimensions: { width: 400, height: 300 },
      matchSize: { width: BRACKET_CONSTANTS.MIN_MATCH_WIDTH, height: BRACKET_CONSTANTS.MIN_MATCH_HEIGHT }
    };
  }

  // Default options - consolation might need tighter spacing
  const {
    containerHeight = BRACKET_CONSTANTS.DEFAULT_CONTAINER_HEIGHT / 2, // Smaller than championship
    padding = BRACKET_CONSTANTS.DEFAULT_PADDING,
    minMatchWidth = BRACKET_CONSTANTS.MIN_MATCH_WIDTH,
    minMatchHeight = BRACKET_CONSTANTS.MIN_MATCH_HEIGHT,
    minSpacing = BRACKET_CONSTANTS.MIN_SPACING * 0.8 // Tighter spacing for consolation
  } = options;

  // Position consolation matches with tighter layout
  const positions = calculateConsolationPositions(
    rounds,
    BRACKET_CONSTANTS.LEFT_MARGIN,
    BRACKET_CONSTANTS.ROUND_SPACING * 0.9, // Slightly tighter round spacing
    containerHeight,
    minMatchHeight,
    minSpacing,
    padding
  );

  // Calculate final dimensions
  const maxX = Math.max(...Object.values(positions).map(p => p.x)) + minMatchWidth + padding;
  const maxY = Math.max(...Object.values(positions).map(p => p.y)) + minMatchHeight + padding;
  
  return {
    positions,
    dimensions: {
      width: Math.max(600, maxX),
      height: Math.max(300, maxY + BRACKET_CONSTANTS.BOTTOM_PADDING_EXTRA)
    },
    matchSize: {
      width: minMatchWidth,
      height: minMatchHeight
    }
  };
}

/**
 * Calculate specific positions for consolation bracket matches
 * @param rounds - Consolation rounds
 * @param leftMargin - Left margin
 * @param roundSpacing - Spacing between rounds
 * @param containerHeight - Available height
 * @param minMatchHeight - Match height
 * @param minSpacing - Minimum spacing between matches
 * @param padding - Base padding
 * @returns Positions for all matches
 */
function calculateConsolationPositions(
  rounds: TournamentRounds,
  leftMargin: number,
  roundSpacing: number,
  containerHeight: number,
  minMatchHeight: number,
  minSpacing: number,
  padding: number
): Record<string, Position> {
  const positions: Record<string, Position> = {};
  
  rounds.forEach((roundMatches, roundIndex) => {
    const roundX = leftMargin + roundIndex * roundSpacing;
    
    // Calculate vertical spacing for this round
    const availableHeight = containerHeight - (2 * padding);
    const totalMatchHeight = roundMatches.length * minMatchHeight;
    const totalSpacingHeight = (roundMatches.length - 1) * minSpacing;
    const remainingHeight = availableHeight - totalMatchHeight - totalSpacingHeight;
    const topMargin = Math.max(padding, remainingHeight / 2);
    
    roundMatches.forEach((match, matchIndex) => {
      positions[match.id] = {
        x: roundX,
        y: topMargin + matchIndex * (minMatchHeight + minSpacing)
      };
    });
  });
  
  return positions;
}

/**
 * Check if a match structure represents a consolation bracket
 * Consolation brackets may have different characteristics we can detect
 * @param matches - Array of matches to analyze
 * @returns True if this appears to be a consolation bracket structure
 */
export function isConsolationBracket(matches: Match[]): boolean {
  // Look for characteristics that suggest consolation bracket:
  // - Presence of loser_next_match_id fields
  // - Specific naming patterns
  // - Flow patterns different from championship
  
  const hasLoserNext = matches.some(match => match.loser_next_match_id);
  const hasConsolationNaming = matches.some(match => 
    match.id.toLowerCase().includes('consolation') || 
    match.id.toLowerCase().includes('cons')
  );
  
  return hasLoserNext || hasConsolationNaming;
}