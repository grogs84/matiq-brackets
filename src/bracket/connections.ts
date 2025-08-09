/**
 * SVG connection path calculations
 * 
 * This module handles the generation of SVG paths for connecting lines
 * between tournament matches, including bracket-style box patterns.
 */

import type { Point, Dimensions, Connection, ConnectionPath, MatchNode } from './types';
import type { BracketConstants } from './constants';

/**
 * Line segment for building complex paths
 */
export interface LineSegment {
  id: string;
  x1: number;
  y1: number; 
  x2: number;
  y2: number;
  className?: string;
}

/**
 * Calculate connecting lines between tournament matches
 * 
 * This will contain the complex logic extracted from 
 * ChampionshipBracket.calculateConnectingLines for generating
 * bracket-style box pattern connections.
 * 
 * @param matches - All tournament matches
 * @param positions - Match position coordinates
 * @param matchSize - Match box dimensions
 * @param config - Bracket configuration constants
 * @returns Array of line segments for SVG rendering
 */
export function calculateConnectingLines(
  matches: MatchNode[],
  positions: Record<string, Point>,
  matchSize: Dimensions,
  config: BracketConstants
): LineSegment[] {
  // TODO: Extract the complex connection logic from ChampionshipBracket
  // This includes:
  // - Grouping matches by winner_next_match_id
  // - Box-pattern line generation
  // - Horizontal extension calculations
  // - Vertical connector positioning
  
  const lines: LineSegment[] = [];
  
  // Placeholder implementation
  return lines;
}

/**
 * Generate SVG path data between two points
 * 
 * @param start - Starting point
 * @param end - Ending point  
 * @param style - Path style (elbow, straight, curved)
 * @param gutter - Optional gutter/extension distance
 * @returns SVG path data string
 */
export function pathBetween(
  start: Point,
  end: Point,
  style: 'elbow' | 'straight' | 'curved' = 'elbow',
  gutter: number = 0
): string {
  switch (style) {
    case 'straight':
      return `M ${start.x} ${start.y} L ${end.x} ${end.y}`;
      
    case 'elbow':
      // Create right-angle elbow path with optional horizontal extension
      const midX = start.x + gutter;
      return `M ${start.x} ${start.y} L ${midX} ${start.y} L ${midX} ${end.y} L ${end.x} ${end.y}`;
      
    case 'curved':
      // Create smooth curved path
      const controlX = (start.x + end.x) / 2 + gutter;
      return `M ${start.x} ${start.y} Q ${controlX} ${start.y} ${controlX} ${(start.y + end.y) / 2} Q ${controlX} ${end.y} ${end.x} ${end.y}`;
      
    default:
      throw new Error(`Unknown path style: ${style}`);
  }
}

/**
 * Calculate anchor points for match connections
 * 
 * @param matchPosition - Position of the match box
 * @param matchSize - Dimensions of the match box
 * @param side - Which side to get the anchor from
 * @returns Anchor point coordinates
 */
export function computeMatchAnchor(
  matchPosition: Point,
  matchSize: Dimensions,
  side: 'left' | 'right' | 'top' | 'bottom'
): Point {
  switch (side) {
    case 'left':
      return {
        x: matchPosition.x,
        y: matchPosition.y + matchSize.height / 2
      };
    case 'right':
      return {
        x: matchPosition.x + matchSize.width,
        y: matchPosition.y + matchSize.height / 2
      };
    case 'top':
      return {
        x: matchPosition.x + matchSize.width / 2,
        y: matchPosition.y
      };
    case 'bottom':
      return {
        x: matchPosition.x + matchSize.width / 2,
        y: matchPosition.y + matchSize.height
      };
    default:
      throw new Error(`Invalid anchor side: ${side}`);
  }
}

/**
 * Generate connection paths from connection definitions
 * 
 * @param connections - Array of connection definitions
 * @param positions - Match position coordinates
 * @param matchSize - Match box dimensions
 * @param config - Bracket configuration constants
 * @returns Record of connection IDs to SVG path data
 */
export function computeConnectionPaths(
  connections: Connection[],
  positions: Record<string, Point>,
  matchSize: Dimensions,
  config: BracketConstants
): Record<string, string> {
  const paths: Record<string, string> = {};
  
  connections.forEach(connection => {
    const startPos = positions[connection.fromMatchId];
    const endPos = positions[connection.toMatchId];
    
    if (!startPos || !endPos) {
      console.warn(`Missing position for connection ${connection.id}`);
      return;
    }
    
    const startAnchor = computeMatchAnchor(
      startPos, 
      matchSize, 
      connection.fromAnchor || 'right'
    );
    
    const endAnchor = computeMatchAnchor(
      endPos,
      matchSize,
      connection.toAnchor || 'left'
    );
    
    paths[connection.id] = pathBetween(
      startAnchor,
      endAnchor,
      connection.pathStyle || 'elbow',
      config.MIN_HORIZONTAL_EXTENSION
    );
  });
  
  return paths;
}

/**
 * Calculate horizontal extension distance for bracket lines
 * 
 * @param gapBetweenRounds - Space between tournament rounds
 * @param config - Bracket configuration constants
 * @returns Calculated extension distance
 */
export function calculateHorizontalExtension(
  gapBetweenRounds: number,
  config: BracketConstants
): number {
  return Math.max(
    config.MIN_HORIZONTAL_EXTENSION,
    gapBetweenRounds * config.HORIZONTAL_EXTENSION_RATIO
  );
}

/**
 * Generate box-pattern bracket lines for tournament connections
 * 
 * This creates the classic tournament bracket appearance with
 * horizontal extensions and vertical connectors.
 * 
 * @param sourceMatches - Array of matches feeding into target
 * @param targetMatchId - ID of the target match
 * @param positions - Match positions
 * @param matchSize - Match dimensions
 * @param config - Bracket configuration
 * @returns Array of line segments for the box pattern
 */
export function generateBoxPatternLines(
  sourceMatches: MatchNode[],
  targetMatchId: string,
  positions: Record<string, Point>,
  matchSize: Dimensions,
  config: BracketConstants
): LineSegment[] {
  if (sourceMatches.length !== 2 || !positions[targetMatchId]) {
    return [];
  }
  
  const lines: LineSegment[] = [];
  const [match1, match2] = sourceMatches;
  const pos1 = positions[match1.id];
  const pos2 = positions[match2.id];
  const targetPos = positions[targetMatchId];
  
  if (!pos1 || !pos2) {
    return [];
  }
  
  // TODO: Implement the full box pattern logic from ChampionshipBracket
  // This includes:
  // - Horizontal extensions from each source match
  // - Vertical connector between extensions  
  // - Final horizontal line to target match
  
  return lines;
}