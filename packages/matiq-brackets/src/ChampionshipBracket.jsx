import React from 'react';
import { BRACKET_CONSTANTS, SVGBracketContainer } from './shared';
import { 
  getMatchTextPositions, 
  getMatchRightEdgeCenter, 
  calculateResponsiveLayout 
} from './shared';

/**
 * Create lookup map for matches by ID
 * @param {Array} matches - Array of match objects  
 * @returns {Object} Map of match.id -> match object
 */
const createMatchMap = (matches) => {
  const matchMap = {};
  matches.forEach(match => {
    matchMap[match.id] = match;
  });
  return matchMap;
};

/**
 * Format participant display name with seed prefix
 * @param {Object} participant - Participant object with name and seed
 * @returns {string} Formatted name with seed prefix (e.g., "[1] Matt McDonough")
 */
const formatParticipantName = (participant) => {
  if (!participant) return 'TBD';
  const seed = participant.seed ? `[${participant.seed}] ` : '';
  return `${seed}${participant.name || 'TBD'}`;
};

/**
 * Determine if participant is the winner of the match
 * @param {Object} match - Match object with winner field
 * @param {Object} participant - Participant to check
 * @returns {boolean} True if participant is the winner
 */
const isWinner = (match, participant) => {
  return match.winner && participant && match.winner === participant.name;
};

/**
 * Build championship bracket rounds using flat match structure
 * Works with database format using winner_next_match_id pointers
 */
const buildRoundsFromTree = (matches) => {
  const rounds = [];
  const matchMap = createMatchMap(matches);
  
  // Find first round: matches with no winner_prev_match_id
  const firstRound = matches.filter(match => 
    !match.winner_prev_match_id && !match.loser_prev_match_id
  );
  
  if (firstRound.length === 0) return rounds;
  
  rounds.push(firstRound);
  
  // Build subsequent rounds by following winner_next_match_id pointers
  let currentRound = firstRound;
  
  while (currentRound.length > 1) {
    const nextRound = [];
    const processedMatches = new Set();
    
    currentRound.forEach(match => {
      const nextMatchId = match.winner_next_match_id;
      if (nextMatchId && !processedMatches.has(nextMatchId)) {
        const nextMatch = matchMap[nextMatchId];
        if (nextMatch) {
          nextRound.push(nextMatch);
          processedMatches.add(nextMatchId);
        }
      }
    });
    
    if (nextRound.length > 0) {
      rounds.push(nextRound);
      currentRound = nextRound;
    } else {
      break; // Reached final
    }
  }
  
  return rounds;
};

/**
 * Calculate connecting lines between tournament matches using bracket-style box pattern
 * @param {Array} matches - All matches in the tournament
 * @param {Object} positions - Match position coordinates
 * @param {Object} matchSize - Match box dimensions
 * @returns {Array} Array of line objects with start/end coordinates
 */
const calculateConnectingLines = (matches, positions, matchSize) => {
  const lines = [];
  
  // Group matches by their winner_next_match_id to find pairs that feed into the same target
  const targetGroups = {};
  matches.forEach(match => {
    const nextMatchId = match.winner_next_match_id;
    if (nextMatchId) {
      if (!targetGroups[nextMatchId]) {
        targetGroups[nextMatchId] = [];
      }
      targetGroups[nextMatchId].push(match);
    }
  });
  
  // For each target match, create box-pattern lines from its source matches
  Object.entries(targetGroups).forEach(([targetMatchId, sourceMatches]) => {
    if (sourceMatches.length === 2 && positions[targetMatchId]) {
      const [match1, match2] = sourceMatches;
      const pos1 = positions[match1.id];
      const pos2 = positions[match2.id];
      const targetPos = positions[targetMatchId];
      
      if (pos1 && pos2) {
        // Calculate horizontal extension distance
        const gapBetweenRounds = targetPos.x - Math.max(pos1.x, pos2.x) - matchSize.width;
        const horizontalExtension = Math.max(
          BRACKET_CONSTANTS.MIN_HORIZONTAL_EXTENSION, 
          gapBetweenRounds * BRACKET_CONSTANTS.HORIZONTAL_EXTENSION_RATIO
        );
        
        // Get match edge centers using utility functions
        const match1RightCenter = getMatchRightEdgeCenter(pos1, matchSize);
        const match2RightCenter = getMatchRightEdgeCenter(pos2, matchSize);
        const targetLeftCenter = {
          x: targetPos.x,
          y: targetPos.y + matchSize.height / 2
        };
        
        // Horizontal extension endpoints
        const extension1X = match1RightCenter.x + horizontalExtension;
        const extension2X = match2RightCenter.x + horizontalExtension;
        
        // Vertical connector X position (at the extension point)
        const connectorX = Math.max(extension1X, extension2X);
        
        // Create the box pattern lines:
        
        // 1. Horizontal line from match1 right edge
        lines.push({
          id: `line-${match1.id}-horizontal`,
          x1: match1RightCenter.x,
          y1: match1RightCenter.y,
          x2: connectorX,
          y2: match1RightCenter.y
        });
        
        // 2. Horizontal line from match2 right edge
        lines.push({
          id: `line-${match2.id}-horizontal`,
          x1: match2RightCenter.x,
          y1: match2RightCenter.y,
          x2: connectorX,
          y2: match2RightCenter.y
        });
        
        // 3. Vertical line connecting the horizontal extensions
        lines.push({
          id: `line-${match1.id}-${match2.id}-vertical`,
          x1: connectorX,
          y1: Math.min(match1RightCenter.y, match2RightCenter.y),
          x2: connectorX,
          y2: Math.max(match1RightCenter.y, match2RightCenter.y)
        });
        
        // 4. Final horizontal line from vertical connector to target match
        lines.push({
          id: `line-connector-to-${targetMatchId}`,
          x1: connectorX,
          y1: targetLeftCenter.y,
          x2: targetLeftCenter.x,
          y2: targetLeftCenter.y
        });
      }
    }
  });
  
  return lines;
};

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
  // Build rounds using tournament tree logic (database agnostic)
  const rounds = buildRoundsFromTree(matches);

  // Calculate responsive layout based on available space
  const layout = calculateResponsiveLayout(rounds);
  const { positions, dimensions, matchSize } = layout;

  // Calculate connecting lines between matches
  const connectingLines = calculateConnectingLines(matches, positions, matchSize);

  // Recalculate dimensions to include connecting lines with proper validation
  const allXCoords = [
    ...Object.values(positions).map(p => p.x),
    ...Object.values(positions).map(p => p.x + matchSize.width),
    ...connectingLines.flatMap(line => [line.x1, line.x2])
  ].filter(coord => !isNaN(coord) && isFinite(coord)); // Filter out invalid coordinates

  const allYCoords = [
    ...Object.values(positions).map(p => p.y),
    ...Object.values(positions).map(p => p.y + matchSize.height),
    ...connectingLines.flatMap(line => [line.y1, line.y2])
  ].filter(coord => !isNaN(coord) && isFinite(coord)); // Filter out invalid coordinates

  // Safe dimension calculation with fallbacks
  const maxX = allXCoords.length > 0 ? Math.max(...allXCoords) : dimensions.width;
  const maxY = allYCoords.length > 0 ? Math.max(...allYCoords) : dimensions.height;

  const finalDimensions = {
    width: Math.max(600, maxX + BRACKET_CONSTANTS.DEFAULT_PADDING),
    height: Math.max(400, maxY + BRACKET_CONSTANTS.BOTTOM_PADDING_EXTRA)
  };

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
      {connectingLines
        .filter(line => 
          !isNaN(line.x1) && !isNaN(line.y1) && 
          !isNaN(line.x2) && !isNaN(line.y2)
        )
        .map((line) => (
          <line
            key={line.id}
            x1={line.x1}
            y1={line.y1}
            x2={line.x2}
            y2={line.y2}
            stroke="#d1d5db"
            strokeWidth={BRACKET_CONSTANTS.LINE_STROKE_WIDTH}
            className="opacity-60"
          />
        ))
      }
      
      {/* Match boxes - drawn on top of lines */}
      {rounds.map((roundMatches) =>
        roundMatches.map((match) => {
          const pos = positions[match.id];
          if (!pos || isNaN(pos.x) || isNaN(pos.y)) return null; // Skip invalid positions
          
          const textPositions = getMatchTextPositions(pos, matchSize);
          
          return (
            <g key={match.id}>
              <rect
                x={pos.x}
                y={pos.y}
                width={matchSize.width}
                height={matchSize.height}
                fill="white"
                stroke="black"
                strokeWidth="1.5"
                rx="3"
                ry="3"
                className={onMatchClick ? "cursor-pointer hover:fill-blue-50 hover:stroke-blue-400" : ""}
                onClick={() => onMatchClick?.(match)}
              />
              
              {/* Participant 1 */}
              <text 
                x={textPositions.participant1.seedAndName.x} 
                y={textPositions.participant1.seedAndName.y} 
                textAnchor="start" 
                className="text-sm font-semibold fill-current pointer-events-none"
                style={{ dominantBaseline: 'middle' }}
              >
                {formatParticipantName(match.participants[0])}
              </text>
              <text 
                x={textPositions.participant1.school.x} 
                y={textPositions.participant1.school.y} 
                textAnchor="start" 
                className="text-xs text-gray-600 fill-current pointer-events-none"
                style={{ dominantBaseline: 'middle' }}
              >
                {match.participants[0]?.school || ''}
              </text>
              {isWinner(match, match.participants[0]) && match.score && (
                <text 
                  x={textPositions.participant1.score.x} 
                  y={textPositions.participant1.score.y} 
                  textAnchor="end" 
                  className="text-xs font-medium text-green-700 fill-current pointer-events-none"
                  style={{ dominantBaseline: 'middle' }}
                >
                  {match.score}
                </text>
              )}
              
              {/* Participant 2 */}
              <text 
                x={textPositions.participant2.seedAndName.x} 
                y={textPositions.participant2.seedAndName.y} 
                textAnchor="start" 
                className="text-sm font-semibold fill-current pointer-events-none"
                style={{ dominantBaseline: 'middle' }}
              >
                {formatParticipantName(match.participants[1])}
              </text>
              <text 
                x={textPositions.participant2.school.x} 
                y={textPositions.participant2.school.y} 
                textAnchor="start" 
                className="text-xs text-gray-600 fill-current pointer-events-none"
                style={{ dominantBaseline: 'middle' }}
              >
                {match.participants[1]?.school || ''}
              </text>
              {isWinner(match, match.participants[1]) && match.score && (
                <text 
                  x={textPositions.participant2.score.x} 
                  y={textPositions.participant2.score.y} 
                  textAnchor="end" 
                  className="text-xs font-medium text-green-700 fill-current pointer-events-none"
                  style={{ dominantBaseline: 'middle' }}
                >
                  {match.score}
                </text>
              )}
              
              {/* Separator line between participants */}
              <line
                x1={pos.x + 4}
                y1={pos.y + matchSize.height / 2}
                x2={pos.x + matchSize.width - 4}
                y2={pos.y + matchSize.height / 2}
                stroke="#e5e7eb"
                strokeWidth="1"
                className="opacity-50"
              />
            </g>
          );
        })
      )}
    </SVGBracketContainer>
  );
};

export default ChampionshipBracket;