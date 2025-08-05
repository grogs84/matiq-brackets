import React from 'react';

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
  return (
    <div className="championship-bracket">
      <h3 className="text-lg font-bold mb-4">Championship Bracket</h3>
      
      <svg width="800" height="600" className="border border-gray-300">
        <text x="400" y="50" textAnchor="middle" className="text-lg font-bold">
          Championship
        </text>
        
        {matches.map((match, index) => (
          <g key={match.id}>
            <rect 
              x={50 + index * 150} 
              y="100" 
              width="120" 
              height="60" 
              fill="white" 
              stroke="black" 
              strokeWidth="1"
              className={onMatchClick ? "cursor-pointer hover:fill-blue-50" : ""}
              onClick={() => onMatchClick?.(match)}
            />
            <text x={110 + index * 150} y="125" textAnchor="middle" className="text-sm">
              {match.participants[0]?.name || 'TBD'}
            </text>
            <text x={110 + index * 150} y="145" textAnchor="middle" className="text-sm">
              vs {match.participants[1]?.name || 'TBD'}
            </text>
          </g>
        ))}
      </svg>
    </div>
  );
};

export default ChampionshipBracket;