/**
 * Shared types for wrestling bracket components
 */

export interface Participant {
  /** Unique identifier for the participant */
  id?: string;
  /** Participant's name */
  name: string;
  /** Tournament seed number (e.g., 1, 2, 3...) */
  seed?: number | null;
  /** School or organization */
  school?: string;
}

export interface Match {
  /** Unique identifier for the match */
  id: string;
  /** Array of participants in this match */
  participants: [Participant?, Participant?];
  /** Name of the winner (matches participant.name) */
  winner?: string;
  /** Match score (e.g., "Fall 3:24", "10-8", "4-1") */
  score?: string;
  /** Round identifier (e.g., "final", "semifinals", "quarterfinals") */
  round?: string;
  /** Match status */
  status?: "upcoming" | "in_progress" | "completed";
  
  // Database relationship fields for flat structure
  /** Match ID that the winner advances to */
  winner_next_match_id?: string | null;
  /** Previous match ID for winner's path */
  winner_prev_match_id?: string | null;
  /** Previous match ID for loser's path */
  loser_prev_match_id?: string | null;
}

export type BracketType = "championship" | "consolation" | "pigtail";

export interface BracketPosition {
  x: number;
  y: number;
}

export interface BracketDimensions {
  width: number;
  height: number;
}

export interface BracketLayout {
  positions: Record<string, BracketPosition>;
  dimensions: BracketDimensions;
  matchSize: BracketDimensions;
}

export interface ConnectingLine {
  id: string;
  x1: number;
  y1: number;
  x2: number;
  y2: number;
}