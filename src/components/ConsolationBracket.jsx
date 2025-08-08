import React from 'react';

/**
 * Default dimensions and constants for consolation bracket layout
 */
const CONSOLATION_CONSTANTS = {
  DEFAULT_WIDTH: 1200,    // Default viewport width
  DEFAULT_HEIGHT: 800,    // Default viewport height
  MIN_WIDTH: 600,         // Minimum container width
  MIN_HEIGHT: 400,        // Minimum container height
  PADDING: 40             // Standard padding around bracket edges
};

/**
 * Calculate responsive consolation bracket dimensions
 * @param {Array} matches - Array of consolation bracket matches
 * @param {Object} options - Sizing options {width, height, padding}
 * @returns {Object} Calculated dimensions and layout info
 */
const calculateConsolationLayout = (matches = [], options = {}) => {
  const {
    width = CONSOLATION_CONSTANTS.DEFAULT_WIDTH,
    height = CONSOLATION_CONSTANTS.DEFAULT_HEIGHT
    // padding will be used in future layout calculations
  } = options;

  // For now, return basic responsive dimensions
  // This will be expanded when actual consolation bracket logic is implemented
  const calculatedWidth = Math.max(CONSOLATION_CONSTANTS.MIN_WIDTH, width);
  const calculatedHeight = Math.max(CONSOLATION_CONSTANTS.MIN_HEIGHT, height);

  return {
    width: calculatedWidth,
    height: calculatedHeight,
    viewBox: `0 0 ${calculatedWidth} ${calculatedHeight}`,
    contentInfo: {
      matchCount: matches.length,
      hasContent: matches.length > 0
    }
  };
};

/**
 * ConsolationBracket - Renders consolation bracket matches for wrestling tournaments
 * 
 * This component handles the complex consolation bracket flow where championship
 * bracket losers enter at specific positions in the double elimination format.
 * 
 * Expected props:
 * @param {Array} matches - Array of consolation bracket matches with embedded participant data
 * @param {Function} onMatchClick - Optional callback for match interaction
 * @param {number} width - Optional SVG viewport width (defaults to 1200)
 * @param {number} height - Optional SVG viewport height (defaults to 800)
 */
const ConsolationBracket = ({ 
  matches = [],
  onMatchClick, // eslint-disable-line no-unused-vars
  width,
  height
}) => {
  // Calculate responsive layout based on props and matches
  const layout = calculateConsolationLayout(matches, { width, height });
  
  return (
    <div className="consolation-bracket w-full">
      <h3 className="text-lg font-bold mb-4">Consolation Bracket</h3>
      <div className="w-full overflow-x-auto overflow-y-auto max-h-[calc(100vh-200px)]">
        <svg 
          viewBox={layout.viewBox}
          preserveAspectRatio="xMinYMin meet"
          className="w-full border border-gray-300"
          style={{ height: `${layout.height}px`, minHeight: '400px' }}
        >
          {/* Placeholder content - will be replaced with actual bracket layout */}
          <text 
            x={layout.width / 2} 
            y={layout.height / 2 - 30} 
            textAnchor="middle" 
            className="text-lg font-medium fill-gray-500"
          >
            Consolation Bracket Structure
          </text>
          <text 
            x={layout.width / 2} 
            y={layout.height / 2} 
            textAnchor="middle" 
            className="text-sm fill-gray-400"
          >
            Coming Soon - Complex Double Elimination Flow
          </text>
          
          {/* Show match count and dimensions for debugging */}
          <text 
            x={layout.width / 2} 
            y={layout.height / 2 + 30} 
            textAnchor="middle" 
            className="text-xs fill-gray-400"
          >
            {layout.contentInfo.matchCount > 0 ? `${layout.contentInfo.matchCount} matches provided` : 'No matches provided'}
          </text>
          <text 
            x={layout.width / 2} 
            y={layout.height / 2 + 50} 
            textAnchor="middle" 
            className="text-xs fill-gray-300"
          >
            Viewport: {layout.width} × {layout.height}
          </text>
        </svg>
      </div>
    </div>
  );
};

export default ConsolationBracket;