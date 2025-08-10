/**
 * ConsolationBracket - Renders responsive consolation bracket matches
 * 
 * Uses shared utilities and components to maintain consistency with ChampionshipBracket
 * while implementing consolation-specific positioning and flow patterns.
 * 
 * Expects matches with embedded participant data:
 * match.participants[0/1] = { id, name, seed, school, ... }
 */

import React from 'react';
import { SVGBracketContainer, MatchBox } from './shared/components';
import { 
  buildConsolationRoundsFromTree,
  calculateConsolationLayout,
  calculateConsolationConnectingLines,
  renderConnectingLines,
  calculateSafeDimensions
} from './shared/utils';

/**
 * ConsolationBracket component renders wrestling consolation brackets
 * 
 * Now includes full bracket positioning logic using shared utilities for 
 * consistent styling and behavior with ChampionshipBracket.
 */
const ConsolationBracket = ({
  matches = [],
  onMatchClick,
  width,
  height,
  className
}) => {
  // Build rounds using shared consolation bracket logic
  const rounds = buildConsolationRoundsFromTree(matches);
  
  // DEBUG: Log the consolation bracket structure
  console.log('🔍 DEBUGGING ConsolationBracket:');
  console.log('Total matches:', matches.length);
  console.log('Sample match structure:', {
    id: matches[0]?.id,
    winner_next: matches[0]?.winner_next_match_id,
    winner_prev: matches[0]?.winner_prev_match_id, 
    loser_prev: matches[0]?.loser_prev_match_id
  });
  console.log('Consolation rounds built:', rounds.map(r => r.length));

  // If no matches provided, show empty state
  if (matches.length === 0) {
    const emptyDimensions = {
      width: width || 600,
      height: height || 400
    };
    
    return (
      <div className={className}>
        <SVGBracketContainer
          title="Consolation Bracket"
          viewBox={{
            x: 0,
            y: 0,
            width: emptyDimensions.width,
            height: emptyDimensions.height
          }}
          svgStyle={{ 
            height: `${emptyDimensions.height}px`, 
            minHeight: '400px' 
          }}
        >
          <text
            x={emptyDimensions.width / 2}
            y={emptyDimensions.height / 2}
            textAnchor="middle"
            className="text-lg font-medium fill-gray-500"
            style={{ dominantBaseline: 'middle' }}
          >
            No consolation matches provided
          </text>
        </SVGBracketContainer>
      </div>
    );
  }

  // Calculate responsive layout for consolation bracket using shared utilities
  const layout = calculateConsolationLayout(rounds, {
    containerWidth: width,
    containerHeight: height
  });
  const { positions, matchSize } = layout;

  // Calculate connecting lines using consolation-specific logic
  const connectingLines = calculateConsolationConnectingLines(matches, positions, matchSize);

  // Calculate safe final dimensions using shared utility
  const finalDimensions = calculateSafeDimensions(positions, matchSize, connectingLines);

  return (
    <div className={className}>
      <SVGBracketContainer
        title="Consolation Bracket"
        viewBox={{
          x: 0,
          y: 0,
          width: finalDimensions.width,
          height: finalDimensions.height
        }}
        svgStyle={{ 
          height: `${finalDimensions.height}px`, 
          minHeight: '400px' 
        }}
      >
        {/* Connecting lines - drawn first so they appear behind matches */}
        {renderConnectingLines(connectingLines)}
        
        {/* Match boxes - drawn on top of lines using shared MatchBox component */}
        {rounds.map((roundMatches) =>
          roundMatches.map((match) => {
            const pos = positions[match.id];
            if (!pos || isNaN(pos.x) || isNaN(pos.y)) return null; // Skip invalid positions
            
            return (
              <MatchBox
                key={match.id}
                match={match}
                position={pos}
                matchSize={matchSize}
                onMatchClick={onMatchClick}
              />
            );
          })
        )}
      </SVGBracketContainer>
    </div>
  );
};

export default ConsolationBracket;