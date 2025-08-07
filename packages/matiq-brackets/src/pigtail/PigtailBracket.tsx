import React from 'react';
import { Match } from '../types';

export interface PigtailBracketProps {
  /** Array of matches with embedded participant data */
  matches?: Match[];
  /** Optional callback when a match is clicked */
  onMatchClick?: (match: Match) => void;
}

/**
 * PigtailBracket - Renders pigtail bracket matches
 * 
 * TODO: Implement pigtail bracket logic for preliminary elimination matches
 * This bracket handles play-in matches when field size requires reduction before main bracket
 */
export const PigtailBracket: React.FC<PigtailBracketProps> = ({ 
  matches = [],
  onMatchClick 
}) => {
  const handlePlaceholderClick = () => {
    console.log('PigtailBracket placeholder clicked');
    if (onMatchClick) {
      console.log('onMatchClick handler available for future implementation');
    }
  };

  return (
    <div className="pigtail-bracket w-full">
      <h3 className="text-lg font-bold mb-4">Pigtail Bracket</h3>
      <div className="w-full p-8 text-center text-gray-500">
        <p className="text-lg">Pigtail bracket not implemented yet.</p>
        <p className="text-sm">This will handle play-in matches for tournament field reduction.</p>
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

export default PigtailBracket;