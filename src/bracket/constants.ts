/**
 * Shared bracket layout constants
 * 
 * This module contains all configurable constants used for bracket layout,
 * spacing, sizing, and visual appearance.
 */

export interface BracketConstants {
  // Container and canvas sizing
  DEFAULT_CONTAINER_HEIGHT: number;
  DEFAULT_PADDING: number;
  
  // Match box dimensions  
  MIN_MATCH_WIDTH: number;
  MIN_MATCH_HEIGHT: number;
  MIN_SPACING: number;
  
  // Layout positioning
  LEFT_MARGIN: number;
  ROUND_SPACING: number;
  FIRST_MATCH_TOP_MARGIN: number;
  BOTTOM_PADDING_EXTRA: number;
  
  // Connection line styling
  MIN_HORIZONTAL_EXTENSION: number;
  HORIZONTAL_EXTENSION_RATIO: number;
  LINE_STROKE_WIDTH: number;
}

/**
 * Default bracket constants
 * Extracted from ChampionshipBracket.jsx
 */
export const BRACKET_CONSTANTS: BracketConstants = {
  DEFAULT_CONTAINER_HEIGHT: 1200,
  DEFAULT_PADDING: 60,
  MIN_MATCH_WIDTH: 220,
  MIN_MATCH_HEIGHT: 110,
  MIN_SPACING: 50,
  LEFT_MARGIN: 30,
  ROUND_SPACING: 260,
  FIRST_MATCH_TOP_MARGIN: 100,
  BOTTOM_PADDING_EXTRA: 40,
  MIN_HORIZONTAL_EXTENSION: 20,
  HORIZONTAL_EXTENSION_RATIO: 0.4,
  LINE_STROKE_WIDTH: 2,
};

/**
 * Partial configuration override interface
 * Allows customization of specific constants while inheriting defaults
 */
export interface BracketConfig extends Partial<BracketConstants> {
  containerWidth?: number;
  containerHeight?: number;
}

/**
 * Merge custom config with defaults
 */
export function createBracketConfig(customConfig: BracketConfig = {}): BracketConstants {
  return {
    ...BRACKET_CONSTANTS,
    ...customConfig,
  };
}

// Re-export for backward compatibility
export default BRACKET_CONSTANTS;