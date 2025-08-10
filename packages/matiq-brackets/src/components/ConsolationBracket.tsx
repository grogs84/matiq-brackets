/**
 * ConsolationBracket - Foundational component structure for consolation bracket visualization
 * 
 * This component provides the basic structure and integration with shared utilities
 * following the same patterns proven successful in ChampionshipBracket.
 * 
 * Phase 2a: Basic component structure without full bracket logic.
 */

import React from 'react';
import { SVGBracketContainer } from '../shared/components/SVGBracketContainer';
import { BRACKET_CONSTANTS } from '../shared/constants';
import type { 
  Match, 
  MatchClickHandler,
  Dimensions 
} from '../shared/types';

/**
 * Props interface for ConsolationBracket component
 */
export interface ConsolationBracketProps {
  /** Array of consolation match data */
  matches?: Match[];
  /** Optional callback function when a match is clicked */
  onMatchClick?: MatchClickHandler;
  /** Custom width for the bracket */
  width?: number;
  /** Custom height for the bracket */
  height?: number;
  /** Additional CSS classes for styling */
  className?: string;
}

/**
 * ConsolationBracket component renders the basic structure for wrestling consolation brackets
 * 
 * Currently displays placeholder structure with proper SVG container integration.
 * Future phases will add full consolation bracket positioning logic.
 */
export const ConsolationBracket: React.FC<ConsolationBracketProps> = ({
  matches = [],
  onMatchClick,
  width,
  height,
  className
}) => {
  // Calculate basic dimensions using bracket constants
  const defaultDimensions: Dimensions = {
    width: width || Math.max(600, BRACKET_CONSTANTS.DEFAULT_PADDING * 10),
    height: height || Math.max(400, BRACKET_CONSTANTS.DEFAULT_CONTAINER_HEIGHT / 2)
  };

  // For now, show basic placeholder structure
  // Future implementation will include full bracket positioning logic
  const placeholderWidth = BRACKET_CONSTANTS.MIN_MATCH_WIDTH;
  const placeholderHeight = BRACKET_CONSTANTS.MIN_MATCH_HEIGHT;
  const centerX = defaultDimensions.width / 2 - placeholderWidth / 2;
  const centerY = defaultDimensions.height / 2 - placeholderHeight / 2;

  return (
    <div className={className}>
      <SVGBracketContainer
        title="Consolation Bracket"
        viewBox={{
          x: 0,
          y: 0,
          width: defaultDimensions.width,
          height: defaultDimensions.height
        }}
        svgStyle={{ 
          height: `${defaultDimensions.height}px`, 
          minHeight: '400px' 
        }}
      >
        {/* Placeholder structure - will be replaced with actual bracket logic */}
        <rect
          x={centerX}
          y={centerY}
          width={placeholderWidth}
          height={placeholderHeight}
          fill="white"
          stroke="#d1d5db"
          strokeWidth="2"
          strokeDasharray="5,5"
          rx="3"
          ry="3"
        />
        
        {/* Placeholder text */}
        <text
          x={centerX + placeholderWidth / 2}
          y={centerY + placeholderHeight / 2 - 10}
          textAnchor="middle"
          className="text-sm font-medium fill-gray-500"
          style={{ dominantBaseline: 'middle' }}
        >
          Consolation Bracket
        </text>
        
        <text
          x={centerX + placeholderWidth / 2}
          y={centerY + placeholderHeight / 2 + 10}
          textAnchor="middle"
          className="text-xs fill-gray-400"
          style={{ dominantBaseline: 'middle' }}
        >
          {matches.length > 0 ? `${matches.length} matches` : 'No matches provided'}
        </text>
        
        {/* Show basic match count and interaction capability */}
        {matches.length > 0 && (
          <text
            x={centerX + placeholderWidth / 2}
            y={centerY + placeholderHeight / 2 + 30}
            textAnchor="middle"
            className="text-xs fill-gray-400"
            style={{ dominantBaseline: 'middle' }}
          >
            {onMatchClick ? 'Click handler enabled' : 'No click handler'}
          </text>
        )}
      </SVGBracketContainer>
    </div>
  );
};

export default ConsolationBracket;