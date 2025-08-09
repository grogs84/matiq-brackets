/**
 * Shared bracket type definitions
 * 
 * This module defines TypeScript interfaces and types used across
 * bracket components for consistent data structures.
 */

/**
 * 2D coordinate point
 */
export interface Point {
  x: number;
  y: number;
}

/**
 * 2D dimensions
 */
export interface Dimensions {
  width: number;
  height: number;
}

/**
 * Rectangle with position and size
 */
export interface Rectangle extends Point, Dimensions {}

/**
 * Match participant information
 * Matches the embedded participant structure from current implementation
 */
export interface Participant {
  id: string;
  name: string;
  seed?: number;
  school?: string;
  [key: string]: any; // Allow additional properties
}

/**
 * Tournament match node
 * Represents a match in the bracket with positioning metadata
 */
export interface MatchNode {
  id: string;
  participants: [Participant?, Participant?];
  roundIndex: number;
  matchIndex: number;
  
  // Result information
  winner?: string;
  score?: string;
  status?: 'upcoming' | 'in_progress' | 'completed';
  
  // Navigation pointers (from flat database structure)
  winner_next_match_id?: string;
  loser_next_match_id?: string;
  winner_prev_match_id?: string;  
  loser_prev_match_id?: string;
  
  [key: string]: any; // Allow additional properties
}

/**
 * Tournament round
 */
export interface Round {
  index: number;
  matches: MatchNode[];
  name?: string; // e.g., "First Round", "Quarterfinals", "Final"
}

/**
 * Connection between matches
 * Defines how matches are visually connected in the bracket
 */
export interface Connection {
  id: string;
  fromMatchId: string;
  toMatchId: string;
  fromAnchor?: 'left' | 'right' | 'top' | 'bottom';
  toAnchor?: 'left' | 'right' | 'top' | 'bottom';
  pathStyle?: 'elbow' | 'straight' | 'curved';
}

/**
 * SVG path data for a connection line
 */
export interface ConnectionPath {
  id: string;
  pathData: string;
  className?: string;
}

/**
 * Text position for match participant information
 */
export interface TextPosition {
  seedAndName: Point;
  school: Point;
  score: Point;
}

/**
 * Complete text positioning for a match
 */
export interface MatchTextPositions {
  participant1: TextPosition;
  participant2: TextPosition;
}

/**
 * Layout calculation result
 */
export interface LayoutResult {
  positions: Record<string, Point>;
  dimensions: Dimensions;
  matchSize: Dimensions;
  rounds?: Round[];
}

/**
 * Validation result for coordinates
 */
export interface ValidationResult {
  isValid: boolean;
  clampedValue?: Point | Rectangle;
  warnings?: string[];
}

/**
 * Bracket component props
 */
export interface BracketProps {
  matches: MatchNode[];
  onMatchClick?: (match: MatchNode) => void;
  className?: string;
  config?: Partial<BracketConstants>;
}

// Import for access to constants
import type { BracketConstants } from './constants';

/**
 * Type guards for runtime validation
 */
export function isValidPoint(value: unknown): value is Point {
  return (
    typeof value === 'object' &&
    value !== null &&
    'x' in value &&
    'y' in value &&
    typeof (value as any).x === 'number' &&
    typeof (value as any).y === 'number' &&
    !isNaN((value as any).x) &&
    !isNaN((value as any).y)
  );
}

export function isValidDimensions(value: unknown): value is Dimensions {
  return (
    typeof value === 'object' &&
    value !== null &&
    'width' in value &&
    'height' in value &&
    typeof (value as any).width === 'number' &&
    typeof (value as any).height === 'number' &&
    (value as any).width > 0 &&
    (value as any).height > 0
  );
}

export function isValidMatchNode(value: unknown): value is MatchNode {
  return (
    typeof value === 'object' &&
    value !== null &&
    'id' in value &&
    'participants' in value &&
    'roundIndex' in value &&
    'matchIndex' in value &&
    typeof (value as any).id === 'string' &&
    Array.isArray((value as any).participants) &&
    typeof (value as any).roundIndex === 'number' &&
    typeof (value as any).matchIndex === 'number'
  );
}