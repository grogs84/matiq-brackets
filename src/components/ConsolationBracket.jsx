import React from 'react';

/**
 * ConsolationBracket - Renders consolation bracket matches for wrestling tournaments
 * 
 * This component handles the complex consolation bracket flow where championship
 * bracket losers enter at specific positions in the double elimination format.
 * 
 * Expected props:
 * @param {Array} matches - Array of consolation bracket matches with embedded participant data
 * @param {Function} onMatchClick - Optional callback for match interaction
 */
const ConsolationBracket = ({ 
  matches = [],
  onMatchClick // eslint-disable-line no-unused-vars
}) => {
  // For now, return a simple placeholder structure
  // This will be expanded with complex consolation bracket logic
  // onMatchClick will be used when actual match rendering is implemented
  
  return (
    <div className="consolation-bracket w-full">
      <h3 className="text-lg font-bold mb-4">Consolation Bracket</h3>
      <div className="w-full overflow-x-auto overflow-y-auto max-h-[calc(100vh-200px)]">
        <svg 
          viewBox="0 0 800 600"
          preserveAspectRatio="xMinYMin meet"
          className="w-full border border-gray-300"
          style={{ height: '600px', minHeight: '400px' }}
        >
          {/* Placeholder content - will be replaced with actual bracket layout */}
          <text 
            x="400" 
            y="300" 
            textAnchor="middle" 
            className="text-lg font-medium fill-gray-500"
          >
            Consolation Bracket Structure
          </text>
          <text 
            x="400" 
            y="330" 
            textAnchor="middle" 
            className="text-sm fill-gray-400"
          >
            Coming Soon - Complex Double Elimination Flow
          </text>
          
          {/* Show match count for debugging */}
          <text 
            x="400" 
            y="360" 
            textAnchor="middle" 
            className="text-xs fill-gray-400"
          >
            {matches.length > 0 ? `${matches.length} matches provided` : 'No matches provided'}
          </text>
        </svg>
      </div>
    </div>
  );
};

export default ConsolationBracket;