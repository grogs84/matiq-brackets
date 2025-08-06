import React from 'react';

/**
 * Calculate responsive tournament tree dimensions and positions
 * @param {Array} rounds - Array of round arrays containing matches
 * @param {Object} options - Sizing options {containerWidth, containerHeight, padding}
 */
const calculateResponsiveLayout = (rounds, options = {}) => {
  if (rounds.length === 0) return { positions: {}, dimensions: { width: 400, height: 300 } };

  // Default options with responsive considerations
  const {
    containerWidth = 900,
    containerHeight = 700,
    padding = 40,
    minMatchWidth = 120,
    minMatchHeight = 60,
    minSpacing = 40
  } = options;

  // Calculate available space
  const availableWidth = containerWidth - (2 * padding);
  const availableHeight = containerHeight - (2 * padding);

  // Calculate optimal spacing based on available space and content
  const roundSpacing = Math.max(minSpacing + minMatchWidth, availableWidth / (rounds.length + 1));
  const maxMatchesInRound = Math.max(...rounds.map(r => r.length));
  const matchSpacing = Math.max(minSpacing, availableHeight / (maxMatchesInRound + 1));

  const positions = {};

  // First round: evenly spaced vertically within available height
  const firstRound = rounds[0];
  const firstRoundStartY = padding + (availableHeight - ((firstRound.length - 1) * matchSpacing)) / 2;
  
  firstRound.forEach((match, i) => {
    positions[match.id] = {
      x: padding,
      y: Math.max(padding, firstRoundStartY + i * matchSpacing)
    };
  });

  // Subsequent rounds: center each match between its previous matches
  for (let r = 1; r < rounds.length; r++) {
    rounds[r].forEach((match) => {
      // Find previous match ids for winner
      const prevIds = [];
      Object.values(match.previousMatch || {}).forEach(id => {
        if (id) prevIds.push(id);
      });
      
      // If previous matches found, center between them
      if (prevIds.length) {
        const prevYs = prevIds.map(pid => positions[pid]?.y).filter(Boolean);
        const avgY = prevYs.length ? prevYs.reduce((a, b) => a + b, 0) / prevYs.length : padding;
        positions[match.id] = {
          x: padding + r * roundSpacing,
          y: avgY
        };
      } else {
        // Fallback: stack vertically with proper spacing
        const idx = rounds[r].indexOf(match);
        const roundStartY = padding + (availableHeight - ((rounds[r].length - 1) * matchSpacing)) / 2;
        positions[match.id] = {
          x: padding + r * roundSpacing,
          y: Math.max(padding, roundStartY + idx * matchSpacing)
        };
      }
    });
  }

  // Calculate final dimensions based on content
  const maxX = Math.max(...Object.values(positions).map(p => p.x)) + minMatchWidth + padding;
  const maxY = Math.max(...Object.values(positions).map(p => p.y)) + minMatchHeight + padding;
  
  return {
    positions,
    dimensions: {
      width: Math.max(400, maxX),
      height: Math.max(300, maxY)
    },
    matchSize: {
      width: minMatchWidth,
      height: minMatchHeight
    }
  };
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
  // Build a lookup table for matches by ID
  const matchLookup = {};
  matches.forEach(m => { matchLookup[m.id] = m; });

  // Build rounds by traversing previousMatch pointers
  // Find first round matches (no previousMatch for winner)
  const firstRound = matches.filter(m => !m.previousMatch || !m.previousMatch.winner);
  const rounds = [];
  rounds.push(firstRound);

  // Build subsequent rounds
  let currentRound = firstRound;
  while (currentRound.length > 0) {
    const nextRound = [];
    currentRound.forEach(match => {
      // Find next match for winner
      if (match.nextMatch && match.nextMatch.winner) {
        const next = matchLookup[match.nextMatch.winner];
        if (next && !nextRound.includes(next)) nextRound.push(next);
      }
      // Optionally, find next match for loser (for consolation)
      // if (match.nextMatch && match.nextMatch.loser) { ... }
    });
    if (nextRound.length > 0) rounds.push(nextRound);
    currentRound = nextRound;
  }

  // Calculate responsive layout based on available space
  const layout = calculateResponsiveLayout(rounds);
  const { positions, dimensions, matchSize } = layout;

  return (
    <div className="championship-bracket w-full">
      <h3 className="text-lg font-bold mb-4">Championship Bracket</h3>
      <div className="w-full overflow-x-auto">
        <svg 
          viewBox={`0 0 ${dimensions.width} ${dimensions.height}`}
          preserveAspectRatio="xMidYMid meet"
          className="w-full h-auto border border-gray-300 min-h-[400px] max-h-[80vh]"
          style={{ aspectRatio: `${dimensions.width} / ${dimensions.height}` }}
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