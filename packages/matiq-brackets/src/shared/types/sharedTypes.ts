/**
 * Shared TypeScript types for bracket components
 */

/**
 * Participant in a match
 */
export interface Participant {
  id?: string;
  name: string;
  seed?: number | null;
  school?: string;
}

/**
 * Match data structure with embedded participants
 */
export interface Match {
  id: string;
  participants: [Participant | null, Participant | null];
  winner?: string | null;
  score?: string | null;
  round?: string;
  status?: 'upcoming' | 'in_progress' | 'completed';
  winner_next_match_id?: string | null;
  winner_prev_match_id?: string | null;
  loser_prev_match_id?: string | null;
  loser_next_match_id?: string | null;
}

/**
 * 2D position coordinates
 */
export interface Position {
  x: number;
  y: number;
}

/**
 * Rectangular dimensions
 */
export interface Dimensions {
  width: number;
  height: number;
}

/**
 * Match size dimensions
 */
export interface MatchSize {
  width: number;
  height: number;
}

/**
 * Text positioning for match participants
 */
export interface ParticipantTextPositions {
  seedAndName: Position;
  school: Position;
  score: Position;
}

/**
 * Complete text positioning for a match
 */
export interface MatchTextPositions {
  participant1: ParticipantTextPositions;
  participant2: ParticipantTextPositions;
}

/**
 * Layout calculation results
 */
export interface BracketLayout {
  positions: Record<string, Position>;
  dimensions: Dimensions;
  matchSize: MatchSize;
}

/**
 * Options for responsive layout calculation
 */
export interface LayoutOptions {
  containerWidth?: number;
  containerHeight?: number;
  padding?: number;
  minMatchWidth?: number;
  minMatchHeight?: number;
  minSpacing?: number;
}

/**
 * SVG line coordinates
 */
export interface SVGLine {
  id: string;
  x1: number;
  y1: number;
  x2: number;
  y2: number;
}

/**
 * Match map lookup
 */
export type MatchMap = Record<string, Match>;

/**
 * Tournament rounds (array of matches per round)
 */
export type TournamentRounds = Match[][];

/**
 * Match click handler
 */
export type MatchClickHandler = (match: Match) => void;