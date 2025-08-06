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
      // Extract previous match IDs from the data structure
      const prevMatch1 = match.previousMatch?.wrestler1;
      const prevMatch2 = match.previousMatch?.wrestler2;
      
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
 * Build rounds based on tournament tree structure (database agnostic)
 * Uses previousMatch/nextMatch pointers instead of custom round fields
 */
const buildRoundsFromTree = (matches) => {
  const rounds = [];
  const matchMap = {};
  
  // Create lookup map
  matches.forEach(match => {
    matchMap[match.id] = match;
  });
  
  // Find first round (matches with no previousMatch or previousMatch.winner === null)
  const firstRound = matches.filter(match => 
    !match.previousMatch || match.previousMatch.winner === null
  );
  
  if (firstRound.length > 0) {
    rounds.push(firstRound);
    
    // Build subsequent rounds by following nextMatch pointers
    let currentRound = firstRound;
    while (currentRound.length > 1) {
      const nextRound = [];
      const nextMatchIds = new Set();
      
      currentRound.forEach(match => {
        if (match.nextMatch?.winner && !nextMatchIds.has(match.nextMatch.winner)) {
          const nextMatch = matchMap[match.nextMatch.winner];
          if (nextMatch) {
            nextRound.push(nextMatch);
            nextMatchIds.add(match.nextMatch.winner);
          }
        }
      });
      
      if (nextRound.length > 0) {
        rounds.push(nextRound);
        currentRound = nextRound;
      } else {
        break;
      }
    }
  }
  
  return rounds;
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