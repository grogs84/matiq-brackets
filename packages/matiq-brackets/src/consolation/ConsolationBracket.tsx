import React from 'react';
import { Match } from '../types';

export interface ConsolationBracketProps {
  /** Array of matches with embedded participant data */
  matches?: Match[];
  /** Optional callback when a match is clicked */
  onMatchClick?: (match: Match) => void;
}

/**
 * ConsolationBracket - Renders consolation bracket matches
 * 
 * TODO: Implement consolation bracket logic for double elimination tournament
 * This bracket handles losers from championship bracket and their path to placement matches
 */
export const ConsolationBracket: React.FC<ConsolationBracketProps> = ({ 
  matches = [],
  onMatchClick 
}) => {
  const handlePlaceholderClick = () => {
    console.log('ConsolationBracket placeholder clicked');
    if (onMatchClick) {
      console.log('onMatchClick handler available for future implementation');
    }
  };

  return (
    <div className="consolation-bracket w-full">
      <h3 className="text-lg font-bold mb-4">Consolation Bracket</h3>
      <div className="w-full p-8 text-center text-gray-500">
        <p className="text-lg">Consolation bracket not implemented yet.</p>
        <p className="text-sm">This will handle the complex double elimination flow for wrestling tournaments.</p>
        {matches.length > 0 && (
          <p className="text-xs mt-2">
            Received {matches.length} matches - implementation coming soon.
          </p>
        )}
        <button 
          onClick={handlePlaceholderClick}
          className="mt-4 px-4 py-2 bg-gray-200 text-gray-700 rounded hover:bg-gray-300"
        >
          Placeholder (click to test)
        </button>
      </div>
    </div>
  );
};

export default ConsolationBracket;