/**
 * Match positioning calculations
 * 
 * This module handles the calculation of match box positions within the bracket,
 * including round positioning, vertical alignment, and coordinate utilities.
 */

import type { Point, Dimensions, MatchNode, Round, MatchTextPositions } from './types';
import type { BracketConstants } from './constants';

/**
 * Calculate positions for all matches in tournament rounds
 * 
 * This will contain the core positioning logic extracted from 
 * ChampionshipBracket.calculateResponsiveLayout
 * 
 * @param rounds - Tournament rounds with matches
 * @param config - Bracket configuration constants
 * @returns Record mapping match IDs to their positions
 */
export function computeMatchPositions(
  rounds: Round[],
  config: BracketConstants
): Record<string, Point> {
  // TODO: Extract positioning logic from ChampionshipBracket
  // This includes:
  // - First round even spacing
  // - Subsequent rounds centered between source matches
  // - Fallback positioning for missing connections
  
  const positions: Record<string, Point> = {};
  
  // Placeholder implementation
  rounds.forEach((round, roundIndex) => {
    round.matches.forEach((match, matchIndex) => {
      positions[match.id] = {
        x: config.LEFT_MARGIN + (roundIndex * config.ROUND_SPACING),
        y: config.FIRST_MATCH_TOP_MARGIN + (matchIndex * (config.MIN_MATCH_HEIGHT + config.MIN_SPACING))
      };
    });
  });
  
  return positions;
}

/**
 * Calculate X position for a specific tournament round
 * 
 * @param roundIndex - Zero-based round index (0 = first round)
 * @param config - Bracket configuration constants
 * @returns X coordinate for the round
 */
export function getRoundX(roundIndex: number, config: BracketConstants): number {
  return config.LEFT_MARGIN + (roundIndex * config.ROUND_SPACING);
}

/**
 * Calculate Y position for a match within its round
 * 
 * @param roundIndex - Round index for spacing calculations
 * @param matchIndex - Match index within the round
 * @param config - Bracket configuration constants  
 * @returns Y coordinate for the match
 */
export function getMatchY(
  roundIndex: number,
  matchIndex: number, 
  config: BracketConstants
): number {
  // TODO: Implement proper vertical spacing that accounts for:
  // - Tournament tree structure (matches center between their sources)
  // - Even spacing for first round
  // - Container height constraints
  
  return config.FIRST_MATCH_TOP_MARGIN + (matchIndex * (config.MIN_MATCH_HEIGHT + config.MIN_SPACING));
}

/**
 * Get the center point of a match box's right edge
 * 
 * Extracted from ChampionshipBracket.getMatchRightEdgeCenter
 * Used for connection line calculations.
 * 
 * @param position - Match box position
 * @param matchSize - Match box dimensions
 * @returns Center point of right edge
 */
export function getMatchRightEdgeCenter(position: Point, matchSize: Dimensions): Point {
  return {
    x: position.x + matchSize.width,
    y: position.y + matchSize.height / 2
  };
}

/**
 * Get the center point of a match box's left edge
 * 
 * @param position - Match box position  
 * @param matchSize - Match box dimensions
 * @returns Center point of left edge
 */
export function getMatchLeftEdgeCenter(position: Point, matchSize: Dimensions): Point {
  return {
    x: position.x,
    y: position.y + matchSize.height / 2
  };
}

/**
 * Calculate text positions for match participants
 * 
 * Extracted from ChampionshipBracket.getMatchTextPositions
 * Handles positioning for seeds, names, schools, and scores.
 * 
 * @param position - Match box position
 * @param matchSize - Match box dimensions
 * @returns Text positions for both participants
 */
export function getMatchTextPositions(
  position: Point,
  matchSize: Dimensions
): MatchTextPositions {
  return {
    participant1: {
      seedAndName: {
        x: position.x + 8,
        y: position.y + matchSize.height * 0.28
      },
      school: {
        x: position.x + 8,
        y: position.y + matchSize.height * 0.42
      },
      score: {
        x: position.x + matchSize.width - 8,
        y: position.y + matchSize.height * 0.28
      }
    },
    participant2: {
      seedAndName: {
        x: position.x + 8,
        y: position.y + matchSize.height * 0.68
      },
      school: {
        x: position.x + 8,
        y: position.y + matchSize.height * 0.82
      },
      score: {
        x: position.x + matchSize.width - 8,
        y: position.y + matchSize.height * 0.68
      }
    }
  };
}

/**
 * Calculate the center point of a match box
 * 
 * @param position - Match box position
 * @param matchSize - Match box dimensions
 * @returns Center point of the match box
 */
export function getMatchCenter(position: Point, matchSize: Dimensions): Point {
  return {
    x: position.x + matchSize.width / 2,
    y: position.y + matchSize.height / 2
  };
}

/**
 * Calculate anchor points for different sides of a match box
 * 
 * @param position - Match box position
 * @param matchSize - Match box dimensions
 * @param side - Which side to get the anchor point for
 * @returns Anchor point coordinates
 */
export function getMatchAnchor(
  position: Point, 
  matchSize: Dimensions,
  side: 'left' | 'right' | 'top' | 'bottom'
): Point {
  switch (side) {
    case 'left':
      return getMatchLeftEdgeCenter(position, matchSize);
    case 'right':
      return getMatchRightEdgeCenter(position, matchSize);
    case 'top':
      return { x: position.x + matchSize.width / 2, y: position.y };
    case 'bottom':
      return { x: position.x + matchSize.width / 2, y: position.y + matchSize.height };
    default:
      throw new Error(`Invalid anchor side: ${side}`);
  }
}