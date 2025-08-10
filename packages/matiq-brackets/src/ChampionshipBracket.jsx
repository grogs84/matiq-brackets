import React from 'react';
import { BRACKET_CONSTANTS, SVGBracketContainer, MatchBox } from './shared';
import { 
  calculateResponsiveLayout,
  buildRoundsFromTree,
  calculateChampionshipConnectingLines,
  renderConnectingLines,
  calculateSafeDimensions
} from './shared';

/**
 * ChampionshipBracket - Renders responsive championship bracket matches
 * 
 * Expects matches with embedded participant data:
 * match.participants[0/1] = { id, name, seed, school, ... }
 */
const ChampionshipBracket = ({ 
  matches = [],
  onMatchClick 
}) => {
  // Build rounds using shared tournament tree logic (database agnostic)
  const rounds = buildRoundsFromTree(matches);
  
  // DEBUG: Log the data structure we're working with
  console.log('🔍 DEBUGGING ChampionshipBracket:');
  console.log('Total matches:', matches.length);
  console.log('Sample match structure:', {
    id: matches[0]?.id,
    winner_next: matches[0]?.winner_next_match_id,
    winner_prev: matches[0]?.winner_prev_match_id, 
    loser_prev: matches[0]?.loser_prev_match_id
  });
  console.log('Rounds built:', rounds.map(r => r.length));

  // Calculate responsive layout based on available space
  const layout = calculateResponsiveLayout(rounds);
  const { positions, dimensions, matchSize } = layout;

  // Calculate connecting lines between matches using shared utilities
  const connectingLines = calculateChampionshipConnectingLines(matches, positions, matchSize);

  // Calculate safe final dimensions using shared utility
  const finalDimensions = calculateSafeDimensions(positions, matchSize, connectingLines);

  return (
    <SVGBracketContainer
      title="Championship Bracket"
      viewBox={{
        x: 0,
        y: 0,
        width: finalDimensions.width,
        height: finalDimensions.height
      }}
      svgStyle={{ height: `${finalDimensions.height}px`, minHeight: '400px' }}
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
  );
};

export default ChampionshipBracket;