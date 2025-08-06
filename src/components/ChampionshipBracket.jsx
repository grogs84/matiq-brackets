import React from 'react';

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
 * Get right edge center point of a match box
 * @param {Object} position - Match position {x, y}
 * @param {Object} matchSize - Match dimensions {width, height}
 * @returns {Object} Right edge center coordinates {x, y}
 */
const getMatchRightEdgeCenter = (position, matchSize) => ({
  x: position.x + matchSize.width,
  y: position.y + matchSize.height / 2
});

/**
 * Calculate text positions for match participants
 * @param {Object} position - Match position {x, y}
 * @param {Object} matchSize - Match dimensions {width, height}
 * @returns {Object} Text positions for participant1 and participant2
 */
const getMatchTextPositions = (position, matchSize) => ({
  participant1: {
    x: position.x + matchSize.width / 2,
    y: position.y + matchSize.height / 3
  },
  participant2: {
    x: position.x + matchSize.width / 2,
    y: position.y + (2 * matchSize.height) / 3
  }
});

/**
 * Wrestling bracket layout constants
 */
const BRACKET_CONSTANTS = {
  DEFAULT_CONTAINER_HEIGHT: 1200,
  DEFAULT_PADDING: 60,
  MIN_MATCH_WIDTH: 140,
  MIN_MATCH_HEIGHT: 70,
  MIN_SPACING: 20,
  LEFT_MARGIN: 30,
  ROUND_SPACING: 200,
  BOTTOM_PADDING_EXTRA: 40,
  MIN_HORIZONTAL_EXTENSION: 20,
  HORIZONTAL_EXTENSION_RATIO: 0.4,
  LINE_STROKE_WIDTH: 2
};

/**
 * Calculate responsive tournament tree dimensions and positions
 * @param {Array} rounds - Array of round arrays containing matches
 * @param {Object} options - Sizing options {containerWidth, containerHeight, padding}
 */
const calculateResponsiveLayout = (rounds, options = {}) => {
  if (rounds.length === 0) return { positions: {}, dimensions: { width: 400, height: 300 } };

  // Default options with larger container for better initial layout
  const {
    containerHeight = BRACKET_CONSTANTS.DEFAULT_CONTAINER_HEIGHT,
    padding = BRACKET_CONSTANTS.DEFAULT_PADDING,
    minMatchWidth = BRACKET_CONSTANTS.MIN_MATCH_WIDTH,
    minMatchHeight = BRACKET_CONSTANTS.MIN_MATCH_HEIGHT,
    minSpacing = BRACKET_CONSTANTS.MIN_SPACING
  } = options;

  // Calculate spacing between rounds with more horizontal space
  // Move first round closer to left and increase spacing between rounds
  const leftMargin = BRACKET_CONSTANTS.LEFT_MARGIN;
  const roundSpacing = BRACKET_CONSTANTS.ROUND_SPACING;

  const positions = {};

  // First round: evenly spaced vertically
  const firstRound = rounds[0];
  if (firstRound.length > 0) {
    const firstRoundSpacing = Math.max(minMatchHeight + minSpacing, containerHeight / (firstRound.length + 1));
    
    firstRound.forEach((match, i) => {
      positions[match.id] = {
        x: leftMargin,
        y: padding + (i + 1) * firstRoundSpacing
      };
    });
  }

  // Subsequent rounds: center each match between its source matches
  for (let r = 1; r < rounds.length; r++) {
    rounds[r].forEach((match) => {
      // Extract previous match IDs from the flat database structure
      const prevMatch1 = match.winner_prev_match_id;
      const prevMatch2 = match.loser_prev_match_id;
      
      if (prevMatch1 && prevMatch2 && positions[prevMatch1] && positions[prevMatch2]) {
        // Position this match at the midpoint between its two source matches
        const y1 = positions[prevMatch1].y;
        const y2 = positions[prevMatch2].y;
        const centerY = (y1 + y2) / 2;
        
        positions[match.id] = {
          x: leftMargin + r * roundSpacing,
          y: centerY
        };
      } else {
        // Fallback: space matches evenly in this round (shouldn't happen with proper data)
        const idx = rounds[r].indexOf(match);
        const roundMatchSpacing = containerHeight / (rounds[r].length + 1);
        positions[match.id] = {
          x: leftMargin + r * roundSpacing,
          y: padding + (idx + 1) * roundMatchSpacing
        };
      }
    });
  }

  // Calculate final dimensions based on content
  const maxX = Math.max(...Object.values(positions).map(p => p.x)) + minMatchWidth + padding;
  const maxY = Math.max(...Object.values(positions).map(p => p.y)) + minMatchHeight + padding + BRACKET_CONSTANTS.BOTTOM_PADDING_EXTRA;
  
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

  return (
    <div className="championship-bracket w-full">
      <h3 className="text-lg font-bold mb-4">Championship Bracket</h3>
      <div className="w-full overflow-x-auto overflow-y-auto max-h-[calc(100vh-200px)]">
        <svg 
          viewBox={`0 0 ${dimensions.width} ${dimensions.height}`}
          preserveAspectRatio="xMinYMin meet"
          className="w-full border border-gray-300"
          style={{ height: `${dimensions.height}px`, minHeight: '400px' }}
        >
          <text 
            x={dimensions.width / 2} 
            y="30" 
            textAnchor="middle" 
            className="text-lg font-bold fill-current"
          >
            Championship
          </text>
          
          {/* Connecting lines - drawn first so they appear behind matches */}
          {connectingLines.map((line) => (
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
          ))}
          
          {/* Match boxes - drawn on top of lines */}
          {rounds.map((roundMatches) =>
            roundMatches.map((match) => {
              const pos = positions[match.id];
              if (!pos) return null;
              
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
                    strokeWidth="1"
                    className={onMatchClick ? "cursor-pointer hover:fill-blue-50" : ""}
                    onClick={() => onMatchClick?.(match)}
                  />
                  <text 
                    x={textPositions.participant1.x} 
                    y={textPositions.participant1.y} 
                    textAnchor="middle" 
                    className="text-xs fill-current pointer-events-none"
                  >
                    {match.participants[0]?.name || 'TBD'}
                  </text>
                  <text 
                    x={textPositions.participant2.x} 
                    y={textPositions.participant2.y} 
                    textAnchor="middle" 
                    className="text-xs fill-current pointer-events-none"
                  >
                    vs {match.participants[1]?.name || 'TBD'}
                  </text>
                </g>
              );
            })
          )}
        </svg>
      </div>
    </div>
  );
};

export default ChampionshipBracket;