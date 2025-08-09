/**
 * Wrestling bracket layout constants
 * 
 * Centralized configuration for bracket layouts, dimensions, and spacing.
 * These constants ensure consistent styling and positioning across all bracket types.
 */
export const BRACKET_CONSTANTS = {
  // Container dimensions
  DEFAULT_CONTAINER_HEIGHT: 1200,  // Base height for tournament layout calculations
  DEFAULT_PADDING: 60,             // Standard padding around bracket edges
  
  // Match box dimensions
  MIN_MATCH_WIDTH: 220,            // Match box width for wrestler names, seeds, schools
  MIN_MATCH_HEIGHT: 110,           // Match box height for two participants + scores
  
  // Layout spacing
  MIN_SPACING: 50,                 // Minimum vertical space between matches
  LEFT_MARGIN: 30,                 // Distance from left edge to first round
  ROUND_SPACING: 260,              // Horizontal distance between tournament rounds
  BOTTOM_PADDING_EXTRA: 40,        // Additional bottom padding for scroll visibility
  FIRST_MATCH_TOP_MARGIN: 100,     // Y position offset for first match placement
  
  // Connecting lines
  MIN_HORIZONTAL_EXTENSION: 20,    // Minimum length for connecting line extensions
  HORIZONTAL_EXTENSION_RATIO: 0.4, // Fraction of gap used for line extensions
  LINE_STROKE_WIDTH: 2,            // Thickness of bracket connecting lines
} as const;

/**
 * Common dimension calculations and ratios
 */
export const DIMENSION_RATIOS = {
  // Text positioning within match boxes (as fractions of match height)
  PARTICIPANT1_NAME_Y: 0.28,
  PARTICIPANT1_SCHOOL_Y: 0.42,
  PARTICIPANT1_SCORE_Y: 0.28,
  PARTICIPANT2_NAME_Y: 0.68,
  PARTICIPANT2_SCHOOL_Y: 0.82,
  PARTICIPANT2_SCORE_Y: 0.68,
  
  // Text positioning within match boxes (as fractions of match width)
  TEXT_LEFT_MARGIN: 8,
  TEXT_RIGHT_MARGIN: 8,
} as const;

/**
 * SVG styling constants
 */
export const SVG_STYLES = {
  // Default viewBox and dimensions
  MIN_VIEWBOX_WIDTH: 600,
  MIN_VIEWBOX_HEIGHT: 400,
  DEFAULT_ASPECT_RATIO: "xMinYMin meet",
  
  // Styling classes and properties
  CONTAINER_CLASSES: "w-full overflow-x-auto overflow-y-auto max-h-[calc(100vh-200px)]",
  SVG_CLASSES: "w-full border border-gray-300",
  
  // Match box styling
  MATCH_FILL: "white",
  MATCH_STROKE: "black",
  MATCH_STROKE_WIDTH: "1.5",
  MATCH_BORDER_RADIUS: "3",
  
  // Interactive styling
  HOVER_CLASSES: "cursor-pointer hover:fill-blue-50 hover:stroke-blue-400",
  
  // Line styling
  LINE_COLOR: "#d1d5db",
  LINE_OPACITY: "0.60",
  SEPARATOR_LINE_COLOR: "#e5e7eb",
  SEPARATOR_LINE_OPACITY: "0.50",
} as const;