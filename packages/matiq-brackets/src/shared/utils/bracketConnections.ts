/**
 * Shared bracket utilities for connecting lines and bracket rendering
 * 
 * These utilities can be used by both championship and consolation brackets
 * to generate consistent connecting lines between matches.
 */

import React from 'react';
import type { Match, Position, MatchSize, SVGLine } from '../types';
import { BRACKET_CONSTANTS, SVG_STYLES } from '../constants';
import { getMatchRightEdgeCenter } from './layoutHelpers';
import { createMatchMap } from './positionValidation';

/**
 * Calculate connecting lines for championship bracket structure
 * @param matches - All matches in the tournament
 * @param positions - Match position coordinates
 * @param matchSize - Match box dimensions
 * @returns Array of line objects with start/end coordinates
 */
export function calculateChampionshipConnectingLines(
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
        lines.push(...createBoxPatternLines(
          match1, match2, targetMatchId,
          pos1, pos2, targetPos, matchSize
        ));
      }
    }
  });
  
  return lines;
}

/**
 * Calculate connecting lines for consolation bracket structure
 * Consolation brackets have different flow patterns than championship brackets
 * @param matches - All matches in the consolation bracket
 * @param positions - Match position coordinates
 * @param matchSize - Match box dimensions
 * @returns Array of line objects with start/end coordinates
 */
export function calculateConsolationConnectingLines(
  matches: Match[], 
  positions: Record<string, Position>, 
  matchSize: MatchSize
): SVGLine[] {
  const lines: SVGLine[] = [];
  
  // For consolation brackets, we may have different connection patterns
  // This function can be expanded based on specific consolation bracket rules
  matches.forEach(match => {
    if (match.winner_next_match_id && positions[match.id] && positions[match.winner_next_match_id]) {
      const sourcePos = positions[match.id];
      const targetPos = positions[match.winner_next_match_id];
      
      // Simple direct line for now - can be enhanced for specific consolation patterns
      const sourceRightCenter = getMatchRightEdgeCenter(sourcePos, matchSize);
      const targetLeftCenter = {
        x: targetPos.x,
        y: targetPos.y + matchSize.height / 2
      };
      
      lines.push({
        id: `consolation-line-${match.id}`,
        x1: sourceRightCenter.x,
        y1: sourceRightCenter.y,
        x2: targetLeftCenter.x,
        y2: targetLeftCenter.y
      });
    }
  });
  
  return lines;
}

/**
 * Create box pattern lines between two source matches and a target match
 * This creates the classic tournament bracket "box" connection pattern
 */
function createBoxPatternLines(
  match1: Match,
  match2: Match, 
  targetMatchId: string,
  pos1: Position, 
  pos2: Position, 
  targetPos: Position,
  matchSize: MatchSize
): SVGLine[] {
  const lines: SVGLine[] = [];
  
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
  
  return lines;
}

/**
 * Render SVG lines with consistent styling
 * @param lines - Array of SVG lines to render
 * @returns Array of JSX line elements
 */
export function renderConnectingLines(lines: SVGLine[]): React.ReactElement[] {
  return lines
    .filter(line => 
      !isNaN(line.x1) && !isNaN(line.y1) && 
      !isNaN(line.x2) && !isNaN(line.y2)
    )
    .map((line) => (
      React.createElement('line', {
        key: line.id,
        x1: line.x1,
        y1: line.y1,
        x2: line.x2,
        y2: line.y2,
        stroke: SVG_STYLES.LINE_COLOR,
        strokeWidth: BRACKET_CONSTANTS.LINE_STROKE_WIDTH,
        className: `opacity-${SVG_STYLES.LINE_OPACITY.replace('0.', '')}`
      })
    ));
}