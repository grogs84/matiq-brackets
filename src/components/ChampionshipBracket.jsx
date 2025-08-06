import React from 'react';

/**
 * Calculate responsive tournament tree dimensions and positions
 * @param {Array} rounds - Array of round arrays containing matches
 * @param {Object} options - Sizing options {containerWidth, containerHeight, padding}
 */
const calculateResponsiveLayout = (rounds, options = {}) => {
  if (rounds.length === 0) return { positions: {}, dimensions: { width: 400, height: 300 } };

  // Default options with larger container for better initial layout
  const {
    containerHeight = 1200, // Increased from 800 to give more vertical space
    padding = 60,
    minMatchWidth = 140,
    minMatchHeight = 70,
    minSpacing = 20
  } = options;

  // Calculate spacing between rounds with more horizontal space
  // Move first round closer to left and increase spacing between rounds
  const leftMargin = 30; // Reduced from padding to move first round closer to left
  const roundSpacing = 200; // Increased fixed spacing for more balanced feel

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
  const maxY = Math.max(...Object.values(positions).map(p => p.y)) + minMatchHeight + padding + 40; // Added extra 40px bottom padding
  
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
  const matchMap = {};
  
  // Create lookup map
  matches.forEach(match => {
    matchMap[match.id] = match;
  });
  
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
  const matchMap = {};
  
  // Create match lookup
  matches.forEach(match => {
    matchMap[match.id] = match;
  });
  
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
        // Calculate horizontal extension distance (typically 1/3 of the gap between rounds)
        const gapBetweenRounds = targetPos.x - Math.max(pos1.x, pos2.x) - matchSize.width;
        const horizontalExtension = Math.max(20, gapBetweenRounds * 0.4); // At least 20px, typically 40% of gap
        
        // Right edge centers of source matches
        const match1RightX = pos1.x + matchSize.width;
        const match1CenterY = pos1.y + matchSize.height / 2;
        const match2RightX = pos2.x + matchSize.width;
        const match2CenterY = pos2.y + matchSize.height / 2;
        
        // Target match left edge center
        const targetLeftX = targetPos.x;
        const targetCenterY = targetPos.y + matchSize.height / 2;
        
        // Horizontal extension endpoints
        const extension1X = match1RightX + horizontalExtension;
        const extension2X = match2RightX + horizontalExtension;
        
        // Vertical connector X position (at the extension point)
        const connectorX = Math.max(extension1X, extension2X);
        
        // Create the box pattern lines:
        
        // 1. Horizontal line from match1 right edge
        lines.push({
          id: `line-${match1.id}-horizontal`,
          x1: match1RightX,
          y1: match1CenterY,
          x2: connectorX,
          y2: match1CenterY
        });
        
        // 2. Horizontal line from match2 right edge
        lines.push({
          id: `line-${match2.id}-horizontal`,
          x1: match2RightX,
          y1: match2CenterY,
          x2: connectorX,
          y2: match2CenterY
        });
        
        // 3. Vertical line connecting the horizontal extensions
        lines.push({
          id: `line-${match1.id}-${match2.id}-vertical`,
          x1: connectorX,
          y1: Math.min(match1CenterY, match2CenterY),
          x2: connectorX,
          y2: Math.max(match1CenterY, match2CenterY)
        });
        
        // 4. Final horizontal line from vertical connector to target match
        lines.push({
          id: `line-connector-to-${targetMatchId}`,
          x1: connectorX,
          y1: targetCenterY,
          x2: targetLeftX,
          y2: targetCenterY
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
              strokeWidth="2"
              className="opacity-60"
            />
          ))}
          
          {/* Match boxes - drawn on top of lines */}
          {rounds.map((roundMatches) =>
            roundMatches.map((match) => {
              const pos = positions[match.id];
              if (!pos) return null;
              
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
                    x={pos.x + matchSize.width / 2} 
                    y={pos.y + matchSize.height / 3} 
                    textAnchor="middle" 
                    className="text-xs fill-current pointer-events-none"
                  >
                    {match.participants[0]?.name || 'TBD'}
                  </text>
                  <text 
                    x={pos.x + matchSize.width / 2} 
                    y={pos.y + (2 * matchSize.height) / 3} 
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