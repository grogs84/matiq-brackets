/**
 * Responsive design helpers for bracket layouts and SVG elements
 */

import type { Match, SVGLine, Position, MatchSize } from '../types';
import { BRACKET_CONSTANTS } from '../constants';
import { getMatchRightEdgeCenter } from './layoutHelpers';
import { createMatchMap } from './positionValidation';

/**
 * Calculate connecting lines between tournament matches using bracket-style box pattern
 * @param matches - All matches in the tournament
 * @param positions - Match position coordinates
 * @param matchSize - Match box dimensions
 * @returns Array of line objects with start/end coordinates
 */
export function calculateConnectingLines(
  matches: Match[], 
  positions: Record<string, Position>, 
  matchSize: MatchSize
): SVGLine[] {
  const lines: SVGLine[] = [];
  
  // Group matches by their winner_next_match_id to find pairs that feed into the same target
  const targetGroups: Record<string, Match[]> = {};
  matches.forEach(match => {
    const nextMatchId = match.winner_next_match_id;
    if (nextMatchId) {
      if (!targetGroups[nextMatchId]) {
        targetGroups[nextMatchId] = [];
      }
      targetGroups[nextMatchId].push(match);
    }
  });
  
  // For each target match, create box-pattern lines from its source matches
  Object.entries(targetGroups).forEach(([targetMatchId, sourceMatches]) => {
    if (sourceMatches.length === 2 && positions[targetMatchId]) {
      const [match1, match2] = sourceMatches;
      const pos1 = positions[match1.id];
      const pos2 = positions[match2.id];
      const targetPos = positions[targetMatchId];
      
      if (pos1 && pos2) {
        // Calculate horizontal extension distance
        const gapBetweenRounds = targetPos.x - Math.max(pos1.x, pos2.x) - matchSize.width;
        const horizontalExtension = Math.max(
          BRACKET_CONSTANTS.MIN_HORIZONTAL_EXTENSION, 
          gapBetweenRounds * BRACKET_CONSTANTS.HORIZONTAL_EXTENSION_RATIO
        );
        
        // Get match edge centers using utility functions
        const match1RightCenter = getMatchRightEdgeCenter(pos1, matchSize);
        const match2RightCenter = getMatchRightEdgeCenter(pos2, matchSize);
        const targetLeftCenter: Position = {
          x: targetPos.x,
          y: targetPos.y + matchSize.height / 2
        };
        
        // Horizontal extension endpoints
        const extension1X = match1RightCenter.x + horizontalExtension;
        const extension2X = match2RightCenter.x + horizontalExtension;
        
        // Vertical connector X position (at the extension point)
        const connectorX = Math.max(extension1X, extension2X);
        
        // Create the box pattern lines:
        
        // 1. Horizontal line from match1 right edge
        lines.push({
          id: `line-${match1.id}-horizontal`,
          x1: match1RightCenter.x,
          y1: match1RightCenter.y,
          x2: connectorX,
          y2: match1RightCenter.y
        });
        
        // 2. Horizontal line from match2 right edge
        lines.push({
          id: `line-${match2.id}-horizontal`,
          x1: match2RightCenter.x,
          y1: match2RightCenter.y,
          x2: connectorX,
          y2: match2RightCenter.y
        });
        
        // 3. Vertical line connecting the horizontal extensions
        lines.push({
          id: `line-${match1.id}-${match2.id}-vertical`,
          x1: connectorX,
          y1: Math.min(match1RightCenter.y, match2RightCenter.y),
          x2: connectorX,
          y2: Math.max(match1RightCenter.y, match2RightCenter.y)
        });
        
        // 4. Final horizontal line from vertical connector to target match
        lines.push({
          id: `line-connector-to-${targetMatchId}`,
          x1: connectorX,
          y1: targetLeftCenter.y,
          x2: targetLeftCenter.x,
          y2: targetLeftCenter.y
        });
      }
    }
  });
  
  return lines;
}

/**
 * Safe coordinate validation for SVG elements
 * Filters out NaN and infinite coordinate values
 * @param coordinates - Array of coordinate values
 * @returns Filtered array with only valid finite numbers
 */
export function validateCoordinates(coordinates: number[]): number[] {
  return coordinates.filter(coord => !isNaN(coord) && isFinite(coord));
}

/**
 * Calculate safe dimensions from positions and lines
 * @param positions - Match positions
 * @param matchSize - Match dimensions
 * @param connectingLines - Array of SVG lines
 * @param padding - Additional padding around content
 * @returns Safe final dimensions with fallbacks
 */
export function calculateSafeDimensions(
  positions: Record<string, Position>,
  matchSize: MatchSize,
  connectingLines: SVGLine[],
  padding: number = BRACKET_CONSTANTS.DEFAULT_PADDING
): { width: number; height: number } {
  // Collect all X coordinates with validation
  const allXCoords = validateCoordinates([
    ...Object.values(positions).map(p => p.x),
    ...Object.values(positions).map(p => p.x + matchSize.width),
    ...connectingLines.flatMap(line => [line.x1, line.x2])
  ]);

  const allYCoords = validateCoordinates([
    ...Object.values(positions).map(p => p.y),
    ...Object.values(positions).map(p => p.y + matchSize.height),
    ...connectingLines.flatMap(line => [line.y1, line.y2])
  ]);

  // Safe dimension calculation with fallbacks
  const maxX = allXCoords.length > 0 ? Math.max(...allXCoords) : 600;
  const maxY = allYCoords.length > 0 ? Math.max(...allYCoords) : 400;

  return {
    width: Math.max(600, maxX + padding),
    height: Math.max(400, maxY + BRACKET_CONSTANTS.BOTTOM_PADDING_EXTRA)
  };
}