/**
 * Dimension calculation utilities for responsive bracket layouts
 */

import type { TournamentRounds, BracketLayout, LayoutOptions, Position } from '../types';
import { BRACKET_CONSTANTS } from '../constants';

/**
 * Calculate responsive tournament tree dimensions and positions using DFS
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

  // Use DFS-based positioning to handle any match order
  const positions = calculateDFSPositions(
    rounds,
    leftMargin,
    roundSpacing,
    containerHeight,
    minMatchHeight,
    minSpacing,
    padding
  );

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

/**
 * Calculate match positions using depth-first search to handle any match ordering
 * @param rounds - Array of round arrays containing matches
 * @param leftMargin - Left margin for first round
 * @param roundSpacing - Horizontal spacing between rounds
 * @param containerHeight - Container height for vertical spacing
 * @param minMatchHeight - Minimum match height
 * @param minSpacing - Minimum spacing between matches
 * @param padding - Base padding
 * @returns Match positions calculated using DFS
 */
function calculateDFSPositions(
  rounds: TournamentRounds,
  leftMargin: number,
  roundSpacing: number,
  containerHeight: number,
  minMatchHeight: number,
  minSpacing: number,
  padding: number
): Record<string, Position> {
  console.log('=== DFS POSITIONING CALLED ===');
  console.log('Rounds:', rounds.map(r => r.length));
  
  // Flatten all matches and create lookup map
  const allMatches = rounds.flat();
  const matchMap: Record<string, any> = {};
  allMatches.forEach(match => {
    matchMap[match.id] = match;
  });

  // Find the final/championship match (no winner_next_match_id)
  const finalMatch = allMatches.find(match => !match.winner_next_match_id);
  if (!finalMatch) {
    throw new Error('No final match found - tournament structure is invalid');
  }

  console.log('Final match found:', finalMatch.id);

  // Use DFS to establish correct processing order
  const processedMatches = new Set<string>();
  const matchDepths: Record<string, number> = {};
  const roundMatches: Record<number, any[]> = {};

  // DFS function to traverse from final match to first round
  function traverseMatch(match: any, depth: number): void {
    if (processedMatches.has(match.id)) return;

    processedMatches.add(match.id);
    matchDepths[match.id] = depth;
    
    if (!roundMatches[depth]) {
      roundMatches[depth] = [];
    }
    roundMatches[depth].push(match);

    // Recursively process previous matches
    if (match.winner_prev_match_id && matchMap[match.winner_prev_match_id]) {
      traverseMatch(matchMap[match.winner_prev_match_id], depth + 1);
    }
    if (match.loser_prev_match_id && matchMap[match.loser_prev_match_id]) {
      traverseMatch(matchMap[match.loser_prev_match_id], depth + 1);
    }
  }

  // Start DFS from final match
  traverseMatch(finalMatch, 0);
  console.log('Processed matches:', processedMatches.size);

  // Calculate positions, starting with deepest round (first round)
  const positions: Record<string, Position> = {};
  const maxDepth = Math.max(...Object.keys(matchDepths).map(id => matchDepths[id]));

  console.log('Max depth:', maxDepth);

  // Position first round matches (deepest depth)
  const firstRoundMatches = roundMatches[maxDepth] || [];
  if (firstRoundMatches.length > 0) {
    const firstRoundSpacing = Math.max(
      minMatchHeight + minSpacing, 
      containerHeight / (firstRoundMatches.length + 1)
    );
    
    firstRoundMatches.forEach((match, i) => {
      positions[match.id] = {
        x: leftMargin,
        y: BRACKET_CONSTANTS.FIRST_MATCH_TOP_MARGIN + (i * firstRoundSpacing)
      };
    });
  }

  // Position subsequent rounds, working from first round toward final
  for (let depth = maxDepth - 1; depth >= 0; depth--) {
    const currentRoundMatches = roundMatches[depth] || [];
    const roundNumber = maxDepth - depth;
    
    console.log(`Processing round ${roundNumber} (depth ${depth}): ${currentRoundMatches.length} matches`);
    
    currentRoundMatches.forEach((match) => {
      const prevMatch1Id = match.winner_prev_match_id;
      const prevMatch2Id = match.loser_prev_match_id;
      
      console.log(`  Match ${match.id}: prev1=${prevMatch1Id}, prev2=${prevMatch2Id}`);
      
      if (prevMatch1Id && prevMatch2Id && 
          positions[prevMatch1Id] && positions[prevMatch2Id]) {
        // Position this match at the midpoint between its two source matches
        const y1 = positions[prevMatch1Id].y;
        const y2 = positions[prevMatch2Id].y;
        const centerY = (y1 + y2) / 2;
        
        positions[match.id] = {
          x: leftMargin + roundNumber * roundSpacing,
          y: centerY
        };
        
        console.log(`    -> Positioned at (${positions[match.id].x}, ${positions[match.id].y})`);
      } else {
        // Fallback positioning for matches without proper prev match references
        const idx = currentRoundMatches.indexOf(match);
        const roundMatchSpacing = containerHeight / (currentRoundMatches.length + 1);
        positions[match.id] = {
          x: leftMargin + roundNumber * roundSpacing,
          y: padding + (idx + 1) * roundMatchSpacing
        };
        console.log(`    -> Fallback position at (${positions[match.id].x}, ${positions[match.id].y})`);
      }
    });
  }

  console.log('DFS positioning complete. Sample positions:');
  Object.entries(positions).slice(0, 10).forEach(([id, pos]) => {
    console.log(`  ${id}: (${pos.x}, ${pos.y})`);
  });
  return positions;
}