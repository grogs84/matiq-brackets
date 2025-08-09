/**
 * BracketLines - Shared connection line rendering component
 * 
 * This component handles the rendering of connection lines between
 * tournament matches, supporting various line styles and patterns.
 */

import React from 'react';
import type { LineSegment } from '../../bracket/connections';

export interface BracketLinesProps {
  /** Array of line segments to render */
  lines: LineSegment[];
  
  /** Stroke color for the lines */
  stroke?: string;
  
  /** Stroke width for the lines */
  strokeWidth?: number;
  
  /** Opacity for the lines */
  opacity?: number;
  
  /** Additional CSS classes for line styling */
  className?: string;
}

/**
 * Renders connection lines for tournament brackets
 * 
 * This component can be shared between different bracket types,
 * with line data calculated by the connections module.
 */
export const BracketLines: React.FC<BracketLinesProps> = ({
  lines,
  stroke = '#d1d5db',
  strokeWidth = 2,
  opacity = 0.6,
  className = ''
}) => {
  return (
    <>
      {lines
        .filter(line => 
          !isNaN(line.x1) && !isNaN(line.y1) && 
          !isNaN(line.x2) && !isNaN(line.y2)
        )
        .map((line) => (
          <line
            key={line.id}
            x1={line.x1}
            y1={line.y1}
            x2={line.x2}
            y2={line.y2}
            stroke={stroke}
            strokeWidth={strokeWidth}
            className={`${className} ${line.className || ''}`}
            style={{ opacity }}
          />
        ))
      }
    </>
  );
};

export default BracketLines;