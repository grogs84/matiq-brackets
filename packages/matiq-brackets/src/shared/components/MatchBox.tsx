/**
 * Shared MatchBox component for consistent match rendering across bracket types
 * 
 * This component encapsulates all match rendering logic to ensure visual
 * consistency between championship and consolation brackets while reducing
 * code duplication.
 */

import React from 'react';
import type { Match, Position, MatchSize, MatchClickHandler } from '../types';
import { getMatchTextPositions } from '../utils/layoutHelpers';
import { formatParticipantName, isWinner } from '../utils/positionValidation';
import { SVG_STYLES } from '../constants/bracketConstants';

interface MatchBoxProps {
  match: Match;
  position: Position;
  matchSize: MatchSize;
  onMatchClick?: MatchClickHandler;
}

/**
 * MatchBox - Reusable component for rendering tournament match boxes
 * 
 * Handles all participant display, score display, winner highlighting,
 * and interactive behaviors in a consistent manner.
 */
export const MatchBox: React.FC<MatchBoxProps> = ({
  match,
  position,
  matchSize,
  onMatchClick
}) => {
  const textPositions = getMatchTextPositions(position, matchSize);
  
  return (
    <g key={match.id}>
      {/* Main match rectangle */}
      <rect
        x={position.x}
        y={position.y}
        width={matchSize.width}
        height={matchSize.height}
        fill={SVG_STYLES.MATCH_FILL}
        stroke={SVG_STYLES.MATCH_STROKE}
        strokeWidth={SVG_STYLES.MATCH_STROKE_WIDTH}
        rx={SVG_STYLES.MATCH_BORDER_RADIUS}
        ry={SVG_STYLES.MATCH_BORDER_RADIUS}
        className={onMatchClick ? SVG_STYLES.HOVER_CLASSES : ""}
        onClick={() => onMatchClick?.(match)}
      />
      
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
        x1={position.x + 4}
        y1={position.y + matchSize.height / 2}
        x2={position.x + matchSize.width - 4}
        y2={position.y + matchSize.height / 2}
        stroke={SVG_STYLES.SEPARATOR_LINE_COLOR}
        strokeWidth="1"
        className={`opacity-${SVG_STYLES.SEPARATOR_LINE_OPACITY.replace('0.', '')}`}
      />
    </g>
  );
};