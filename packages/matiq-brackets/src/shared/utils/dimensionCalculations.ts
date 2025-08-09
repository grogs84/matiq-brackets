/**
 * Dimension calculation utilities for responsive bracket layouts
 */

import type { TournamentRounds, BracketLayout, LayoutOptions, Position } from '../types';
import { BRACKET_CONSTANTS } from '../constants';

/**
 * Calculate responsive tournament tree dimensions and positions
 * @param rounds - Array of round arrays containing matches
 * @param options - Sizing options {containerWidth, containerHeight, padding}
 * @returns Layout with positions, dimensions, and match size
 */
export function calculateResponsiveLayout(
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

  // Default options with larger container for better initial layout
  const {
    containerHeight = BRACKET_CONSTANTS.DEFAULT_CONTAINER_HEIGHT,
    padding = BRACKET_CONSTANTS.DEFAULT_PADDING,
    minMatchWidth = BRACKET_CONSTANTS.MIN_MATCH_WIDTH,
    minMatchHeight = BRACKET_CONSTANTS.MIN_MATCH_HEIGHT,
    minSpacing = BRACKET_CONSTANTS.MIN_SPACING
  } = options;

  // Calculate spacing between rounds with more horizontal space
  // Move first round closer to left and increase spacing between rounds
  const leftMargin = BRACKET_CONSTANTS.LEFT_MARGIN;
  const roundSpacing = BRACKET_CONSTANTS.ROUND_SPACING;

  const positions: Record<string, Position> = {};

  // First round: evenly spaced vertically
  const firstRound = rounds[0];
  if (firstRound.length > 0) {
    const firstRoundSpacing = Math.max(minMatchHeight + minSpacing, containerHeight / (firstRound.length + 1));
    
    firstRound.forEach((match, i) => {
      positions[match.id] = {
        x: leftMargin,
        y: BRACKET_CONSTANTS.FIRST_MATCH_TOP_MARGIN + (i * firstRoundSpacing)  // Start at margin, use i instead of (i + 1)
      };
    });
  }

  // Subsequent rounds: center each match between its source matches
  for (let r = 1; r < rounds.length; r++) {
    rounds[r].forEach((match) => {
      // Extract previous match IDs from the flat database structure
      const prevMatch1 = match.winner_prev_match_id;
      const prevMatch2 = match.loser_prev_match_id;
      
      if (prevMatch1 && prevMatch2 && positions[prevMatch1] && positions[prevMatch2]) {
        // Position this match at the midpoint between its two source matches
        const y1 = positions[prevMatch1].y;
        const y2 = positions[prevMatch2].y;
        const centerY = (y1 + y2) / 2;
        
        positions[match.id] = {
          x: leftMargin + r * roundSpacing,
          y: centerY
        };
      } else {
        // Fallback: space matches evenly in this round (shouldn't happen with proper data)
        const idx = rounds[r].indexOf(match);
        const roundMatchSpacing = containerHeight / (rounds[r].length + 1);
        positions[match.id] = {
          x: leftMargin + r * roundSpacing,
          y: padding + (idx + 1) * roundMatchSpacing
        };
      }
    });
  }

  // Calculate final dimensions based on content
  const maxX = Math.max(...Object.values(positions).map(p => p.x)) + minMatchWidth + padding;
  const maxY = Math.max(...Object.values(positions).map(p => p.y)) + minMatchHeight + padding + BRACKET_CONSTANTS.BOTTOM_PADDING_EXTRA;
  
  return {
    positions,
    dimensions: {
      width: Math.max(600, maxX),
      height: Math.max(400, maxY)
    },
    matchSize: {
      width: minMatchWidth,
      height: minMatchHeight
    }
  };
}