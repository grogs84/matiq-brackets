import React from 'react';
import { Match, Participant, BracketPosition, BracketDimensions, BracketLayout, ConnectingLine } from '../types';

/**
 * Create lookup map for matches by ID
 * @param matches - Array of match objects  
 * @returns Map of match.id -> match object
 */
const createMatchMap = (matches: Match[]): Record<string, Match> => {
  const matchMap: Record<string, Match> = {};
  matches.forEach(match => {
    matchMap[match.id] = match;
  });
  return matchMap;
};

/**
 * Get right edge center point of a match box
 * @param position - Match position {x, y}
 * @param matchSize - Match dimensions {width, height}
 * @returns Right edge center coordinates {x, y}
 */
const getMatchRightEdgeCenter = (position: BracketPosition, matchSize: BracketDimensions): BracketPosition => ({
  x: position.x + matchSize.width,
  y: position.y + matchSize.height / 2
});

/**
 * Calculate text positions for match participants with enhanced layout for scores, seeds, and schools
 * @param position - Match position {x, y}
 * @param matchSize - Match dimensions {width, height}
 * @returns Text positions for participant1, participant2 with seeds inline and winner-based scoring
 */
const getMatchTextPositions = (position: BracketPosition, matchSize: BracketDimensions) => ({
  participant1: {
    seedAndName: {
      x: position.x + 8, // Left-aligned seed and name
      y: position.y + matchSize.height * 0.28
    },
    school: {
      x: position.x + 8, // Left-aligned school
      y: position.y + matchSize.height * 0.42
    },
    score: {
      x: position.x + matchSize.width - 8, // Right-aligned score (only for winner)
      y: position.y + matchSize.height * 0.28
    }
  },
  participant2: {
    seedAndName: {
      x: position.x + 8, // Left-aligned seed and name
      y: position.y + matchSize.height * 0.68
    },
    school: {
      x: position.x + 8, // Left-aligned school
      y: position.y + matchSize.height * 0.82
    },
    score: {
      x: position.x + matchSize.width - 8, // Right-aligned score (only for winner)
      y: position.y + matchSize.height * 0.68
    }
  }
});

/**
 * Format participant display name with seed prefix
 * @param participant - Participant object with name and seed
 * @returns Formatted name with seed prefix (e.g., "[1] Matt McDonough")
 */
const formatParticipantName = (participant?: Participant): string => {
  if (!participant) return 'TBD';
  const seed = participant.seed ? `[${participant.seed}] ` : '';
  return `${seed}${participant.name || 'TBD'}`;
};

/**
 * Determine if participant is the winner of the match
 * @param match - Match object with winner field
 * @param participant - Participant to check
 * @returns True if participant is the winner
 */
const isWinner = (match: Match, participant?: Participant): boolean => {
  return !!(match.winner && participant && match.winner === participant.name);
};

/**
 * Wrestling consolation bracket layout constants
 * Similar to championship but with more complex flow patterns
 */
const CONSOLATION_CONSTANTS = {
  DEFAULT_CONTAINER_HEIGHT: 1400,  // Taller for more complex bracket
  DEFAULT_PADDING: 60,
  MIN_MATCH_WIDTH: 220,
  MIN_MATCH_HEIGHT: 110,
  MIN_SPACING: 50,
  LEFT_MARGIN: 30,
  ROUND_SPACING: 260,
  BOTTOM_PADDING_EXTRA: 40,
  MIN_HORIZONTAL_EXTENSION: 20,
  HORIZONTAL_EXTENSION_RATIO: 0.4,
  LINE_STROKE_WIDTH: 2,
  FIRST_MATCH_TOP_MARGIN: 80,
  PLACEMENT_MATCH_SPACING: 180  // Extra spacing for placement matches
};

interface LayoutOptions {
  containerHeight?: number;
  padding?: number;
  minMatchWidth?: number;
  minMatchHeight?: number;
  minSpacing?: number;
}

/**
 * Build consolation bracket rounds using match structure
 * Handles the complex non-binary tree flow of consolation brackets
 */
const buildConsolationRounds = (matches: Match[]): Match[][] => {
  const rounds: Match[][] = [];
  const matchMap = createMatchMap(matches);
  
  // Group matches by round based on their IDs (c1m1, c2m1, etc.)
  const roundGroups: Record<string, Match[]> = {};
  
  matches.forEach(match => {
    // Extract round number from match ID (c1m1 -> "1", c2m1 -> "2", etc.)
    const roundMatch = match.id.match(/c(\d+)m\d+/);
    if (roundMatch) {
      const roundNum = roundMatch[1];
      if (!roundGroups[roundNum]) {
        roundGroups[roundNum] = [];
      }
      roundGroups[roundNum].push(match);
    }
  });
  
  // Sort rounds by round number and add to rounds array
  const sortedRoundKeys = Object.keys(roundGroups).sort((a, b) => parseInt(a) - parseInt(b));
  
  sortedRoundKeys.forEach(roundKey => {
    // Sort matches within each round by match number
    const roundMatches = roundGroups[roundKey].sort((a, b) => {
      const aMatch = a.id.match(/c\d+m(\d+)/);
      const bMatch = b.id.match(/c\d+m(\d+)/);
      if (aMatch && bMatch) {
        return parseInt(aMatch[1]) - parseInt(bMatch[1]);
      }
      return 0;
    });
    rounds.push(roundMatches);
  });
  
  return rounds;
};

/**
 * Calculate responsive consolation bracket layout
 * Handles the complex positioning needs of consolation brackets
 */
const calculateConsolationLayout = (rounds: Match[][], options: LayoutOptions = {}): BracketLayout => {
  if (rounds.length === 0) return { positions: {}, dimensions: { width: 400, height: 300 }, matchSize: { width: 220, height: 110 } };

  const {
    containerHeight = CONSOLATION_CONSTANTS.DEFAULT_CONTAINER_HEIGHT,
    padding = CONSOLATION_CONSTANTS.DEFAULT_PADDING,
    minMatchWidth = CONSOLATION_CONSTANTS.MIN_MATCH_WIDTH,
    minMatchHeight = CONSOLATION_CONSTANTS.MIN_MATCH_HEIGHT,
    minSpacing = CONSOLATION_CONSTANTS.MIN_SPACING
  } = options;

  const leftMargin = CONSOLATION_CONSTANTS.LEFT_MARGIN;
  const roundSpacing = CONSOLATION_CONSTANTS.ROUND_SPACING;
  const positions: Record<string, BracketPosition> = {};

  // Position matches round by round
  rounds.forEach((roundMatches, roundIndex) => {
    const xPosition = leftMargin + roundIndex * roundSpacing;
    
    // For consolation brackets, we need more sophisticated vertical spacing
    // to handle the irregular flow patterns
    if (roundIndex === 0) {
      // First round: space evenly
      const spacing = Math.max(minMatchHeight + minSpacing, containerHeight / (roundMatches.length + 1));
      roundMatches.forEach((match, matchIndex) => {
        positions[match.id] = {
          x: xPosition,
          y: CONSOLATION_CONSTANTS.FIRST_MATCH_TOP_MARGIN + (matchIndex * spacing)
        };
      });
    } else {
      // Later rounds: try to center between source matches where possible
      roundMatches.forEach((match, matchIndex) => {
        const prevMatch1 = match.winner_prev_match_id;
        const prevMatch2 = match.loser_prev_match_id;
        
        if (prevMatch1 && prevMatch2 && positions[prevMatch1] && positions[prevMatch2]) {
          // Position at midpoint between source matches
          const y1 = positions[prevMatch1].y;
          const y2 = positions[prevMatch2].y;
          const centerY = (y1 + y2) / 2;
          
          positions[match.id] = {
            x: xPosition,
            y: centerY
          };
        } else if (prevMatch1 && positions[prevMatch1]) {
          // Only one source match, offset slightly
          positions[match.id] = {
            x: xPosition,
            y: positions[prevMatch1].y + (matchIndex * 20) // Small offset for visual separation
          };
        } else {
          // Fallback: space evenly
          const baseSpacing = containerHeight / (roundMatches.length + 1);
          positions[match.id] = {
            x: xPosition,
            y: padding + (matchIndex + 1) * baseSpacing
          };
        }
      });
    }
  });

  // Handle placement matches (3rd, 5th, 7th place) - position them at the end with extra spacing
  const placementMatches = rounds[rounds.length - 1]?.filter(match => 
    match.id.includes('c6m') // Final round matches
  ) || [];
  
  if (placementMatches.length > 0) {
    const placementX = leftMargin + (rounds.length - 1) * roundSpacing;
    placementMatches.forEach((match, index) => {
      const baseY = CONSOLATION_CONSTANTS.FIRST_MATCH_TOP_MARGIN + (index * CONSOLATION_CONSTANTS.PLACEMENT_MATCH_SPACING);
      positions[match.id] = {
        x: placementX,
        y: baseY
      };
    });
  }

  // Calculate final dimensions
  const maxX = Math.max(...Object.values(positions).map(p => p.x)) + minMatchWidth + padding;
  const maxY = Math.max(...Object.values(positions).map(p => p.y)) + minMatchHeight + padding + CONSOLATION_CONSTANTS.BOTTOM_PADDING_EXTRA;
  
  return {
    positions,
    dimensions: {
      width: Math.max(600, maxX),
      height: Math.max(400, maxY)
    },
    matchSize: {
      width: minMatchWidth,
      height: minMatchHeight
    }
  };
};

/**
 * Calculate connecting lines for consolation bracket
 * Simplified version - consolation brackets have complex flows that don't always follow simple binary patterns
 */
const calculateConsolationLines = (matches: Match[], positions: Record<string, BracketPosition>, matchSize: BracketDimensions): ConnectingLine[] => {
  const lines: ConnectingLine[] = [];
  
  // Group matches by their winner_next_match_id to find pairs that feed into the same target
  const targetGroups: Record<string, Match[]> = {};
  matches.forEach(match => {
    const nextMatchId = match.winner_next_match_id;
    if (nextMatchId) {
      if (!targetGroups[nextMatchId]) {
        targetGroups[nextMatchId] = [];
      }
      targetGroups[nextMatchId].push(match);
    }
  });
  
  // For each target match, create connecting lines from its source matches
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
          CONSOLATION_CONSTANTS.MIN_HORIZONTAL_EXTENSION, 
          gapBetweenRounds * CONSOLATION_CONSTANTS.HORIZONTAL_EXTENSION_RATIO
        );
        
        // Get match edge centers
        const match1RightCenter = getMatchRightEdgeCenter(pos1, matchSize);
        const match2RightCenter = getMatchRightEdgeCenter(pos2, matchSize);
        const targetLeftCenter = {
          x: targetPos.x,
          y: targetPos.y + matchSize.height / 2
        };
        
        // Horizontal extension endpoints
        const extension1X = match1RightCenter.x + horizontalExtension;
        const extension2X = match2RightCenter.x + horizontalExtension;
        
        // Vertical connector X position
        const connectorX = Math.max(extension1X, extension2X);
        
        // Create the box pattern lines
        lines.push({
          id: `line-${match1.id}-horizontal`,
          x1: match1RightCenter.x,
          y1: match1RightCenter.y,
          x2: connectorX,
          y2: match1RightCenter.y
        });
        
        lines.push({
          id: `line-${match2.id}-horizontal`,
          x1: match2RightCenter.x,
          y1: match2RightCenter.y,
          x2: connectorX,
          y2: match2RightCenter.y
        });
        
        lines.push({
          id: `line-${match1.id}-${match2.id}-vertical`,
          x1: connectorX,
          y1: Math.min(match1RightCenter.y, match2RightCenter.y),
          x2: connectorX,
          y2: Math.max(match1RightCenter.y, match2RightCenter.y)
        });
        
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

export interface ConsolationBracketProps {
  /** Array of matches with embedded participant data */
  matches?: Match[];
  /** Optional callback when a match is clicked */
  onMatchClick?: (match: Match) => void;
}

/**
 * ConsolationBracket - Renders consolation bracket matches for double elimination tournament
 * 
 * Handles the complex flow where championship bracket losers drop down at various rounds
 * and compete for placement matches (3rd/4th, 5th/6th, 7th/8th places)
 */
export const ConsolationBracket: React.FC<ConsolationBracketProps> = ({ 
  matches = [],
  onMatchClick 
}) => {
  // Build consolation rounds using the complex bracket structure
  const rounds = buildConsolationRounds(matches);

  // Calculate responsive layout for consolation bracket
  const layout = calculateConsolationLayout(rounds);
  const { positions, dimensions, matchSize } = layout;

  // Calculate connecting lines between matches
  const connectingLines = calculateConsolationLines(matches, positions, matchSize);

  // Calculate final dimensions including connecting lines
  const allXCoords = [
    ...Object.values(positions).map(p => p.x),
    ...Object.values(positions).map(p => p.x + matchSize.width),
    ...connectingLines.flatMap(line => [line.x1, line.x2])
  ].filter(coord => !isNaN(coord) && isFinite(coord));

  const allYCoords = [
    ...Object.values(positions).map(p => p.y),
    ...Object.values(positions).map(p => p.y + matchSize.height),
    ...connectingLines.flatMap(line => [line.y1, line.y2])
  ].filter(coord => !isNaN(coord) && isFinite(coord));

  // Safe dimension calculation with fallbacks
  const maxX = allXCoords.length > 0 ? Math.max(...allXCoords) : dimensions.width;
  const maxY = allYCoords.length > 0 ? Math.max(...allYCoords) : dimensions.height;

  const finalDimensions = {
    width: Math.max(600, maxX + CONSOLATION_CONSTANTS.DEFAULT_PADDING),
    height: Math.max(400, maxY + CONSOLATION_CONSTANTS.BOTTOM_PADDING_EXTRA)
  };

  return (
    <div className="consolation-bracket w-full">
      <h3 className="text-lg font-bold mb-4">Consolation Bracket</h3>
      <div className="w-full overflow-x-auto overflow-y-auto max-h-[calc(100vh-200px)]">
        <svg 
          viewBox={`0 0 ${finalDimensions.width} ${finalDimensions.height}`}
          preserveAspectRatio="xMinYMin meet"
          className="w-full border border-gray-300"
          style={{ height: `${finalDimensions.height}px`, minHeight: '400px' }}
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
                strokeWidth={CONSOLATION_CONSTANTS.LINE_STROKE_WIDTH}
                className="opacity-60"
              />
            ))
          }
          
          {/* Match boxes - drawn on top of lines */}
          {rounds.map((roundMatches) =>
            roundMatches.map((match) => {
              const pos = positions[match.id];
              if (!pos || isNaN(pos.x) || isNaN(pos.y)) return null;
              
              const textPositions = getMatchTextPositions(pos, matchSize);
              
              // Highlight placement matches with different styling
              const isPlacementMatch = match.id.includes('c6m');
              
              return (
                <g key={match.id}>
                  <rect
                    x={pos.x}
                    y={pos.y}
                    width={matchSize.width}
                    height={matchSize.height}
                    fill={isPlacementMatch ? "#fef3c7" : "white"}
                    stroke={isPlacementMatch ? "#f59e0b" : "black"}
                    strokeWidth="1.5"
                    rx="3"
                    ry="3"
                    className={onMatchClick ? "cursor-pointer hover:fill-blue-50 hover:stroke-blue-400" : ""}
                    onClick={() => onMatchClick?.(match)}
                  />
                  
                  {/* Placement match label */}
                  {isPlacementMatch && (
                    <text 
                      x={pos.x + matchSize.width / 2} 
                      y={pos.y - 5} 
                      textAnchor="middle" 
                      className="text-xs font-bold fill-amber-600"
                    >
                      {match.id === 'c6m1' ? '3rd Place' : match.id === 'c6m2' ? '5th Place' : '7th Place'}
                    </text>
                  )}
                  
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
        </svg>
      </div>
    </div>
  );
};

export default ConsolationBracket;