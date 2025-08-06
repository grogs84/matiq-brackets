import React from 'react';

/**
 * Calculate match position in tournament tree
 * @param {number} roundIndex - Index of the round (0 = first round)
 * @param {number} matchIndex - Index within that round
 * @param {number} totalRounds - Total number of rounds
 * @param {number} matchesInRound - Number of matches in this round
 */
// Calculate tree positions for all matches
const calculateTreePositions = (rounds) => {
  const roundSpacing = 180;
  const matchSpacing = 60;
  const positions = {};

  // First round: evenly spaced vertically
  const firstRound = rounds[0];
  firstRound.forEach((match, i) => {
    positions[match.id] = {
      x: 100,
      y: 100 + i * matchSpacing
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
        const avgY = prevYs.length ? prevYs.reduce((a, b) => a + b, 0) / prevYs.length : 100;
        positions[match.id] = {
          x: 100 + r * roundSpacing,
          y: avgY
        };
      } else {
        // Fallback: stack vertically
        const idx = rounds[r].indexOf(match);
        positions[match.id] = {
          x: 100 + r * roundSpacing,
          y: 100 + idx * matchSpacing
        };
      }
    });
  }
  return positions;
};

/**
 * ChampionshipBracket - Renders championship bracket matches
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

  // Calculate tree positions for all matches
  const positions = calculateTreePositions(rounds);

  return (
    <div className="championship-bracket">
      <h3 className="text-lg font-bold mb-4">Championship Bracket</h3>
      <svg width="900" height="700" className="border border-gray-300">
        <text x="450" y="30" textAnchor="middle" className="text-lg font-bold">
          Championship
        </text>
        {rounds.map((roundMatches) =>
          roundMatches.map((match) => {
            const pos = positions[match.id];
            return (
              <g key={match.id}>
                <rect
                  x={pos.x}
                  y={pos.y}
                  width="120"
                  height="60"
                  fill="white"
                  stroke="black"
                  strokeWidth="1"
                  className={onMatchClick ? "cursor-pointer hover:fill-blue-50" : ""}
                  onClick={() => onMatchClick?.(match)}
                />
                <text x={pos.x + 60} y={pos.y + 20} textAnchor="middle" className="text-xs">
                  {match.participants[0]?.name || 'TBD'}
                </text>
                <text x={pos.x + 60} y={pos.y + 40} textAnchor="middle" className="text-xs">
                  vs {match.participants[1]?.name || 'TBD'}
                </text>
              </g>
            );
          })
        )}
      </svg>
    </div>
  );
};

export default ChampionshipBracket;