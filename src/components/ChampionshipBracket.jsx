import React from 'react';

/**
 * Calculate match position in tournament tree
 * @param {number} roundIndex - Index of the round (0 = first round)
 * @param {number} matchIndex - Index within that round
 * @param {number} totalRounds - Total number of rounds
 * @param {number} matchesInRound - Number of matches in this round
 */
const calculateMatchPosition = (roundIndex, matchIndex, totalRounds, matchesInRound) => {
  const roundSpacing = 150; // Horizontal spacing between rounds
  const matchSpacing = 80;  // Vertical spacing between matches
  const x = 100 + roundIndex * roundSpacing;
  // Center matches vertically for each round
  const totalHeight = (matchesInRound - 1) * matchSpacing;
  const startY = 200 - (totalHeight / 2); // Center around y=200
  const y = startY + (matchIndex * matchSpacing);
  return { x, y };
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

  const totalRounds = rounds.length;

  return (
    <div className="championship-bracket">
      <h3 className="text-lg font-bold mb-4">Championship Bracket</h3>
      <svg width="800" height="600" className="border border-gray-300">
        <text x="400" y="30" textAnchor="middle" className="text-lg font-bold">
          Championship
        </text>
        {rounds.map((roundMatches, roundIndex) => {
          const matchesInRound = roundMatches.length;
          return roundMatches.map((match, matchIndex) => {
            const position = calculateMatchPosition(roundIndex, matchIndex, totalRounds, matchesInRound);
            return (
              <g key={match.id}>
                <rect 
                  x={position.x} 
                  y={position.y} 
                  width="120" 
                  height="60" 
                  fill="white" 
                  stroke="black" 
                  strokeWidth="1"
                  className={onMatchClick ? "cursor-pointer hover:fill-blue-50" : ""}
                  onClick={() => onMatchClick?.(match)}
                />
                <text x={position.x + 60} y={position.y + 20} textAnchor="middle" className="text-xs">
                  {match.participants[0]?.name || 'TBD'}
                </text>
                <text x={position.x + 60} y={position.y + 40} textAnchor="middle" className="text-xs">
                  vs {match.participants[1]?.name || 'TBD'}
                </text>
              </g>
            );
          });
        })}
      </svg>
    </div>
  );
};

export default ChampionshipBracket;