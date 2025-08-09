/**
 * BracketContainer - Shared SVG container for tournament brackets
 * 
 * This component provides a responsive SVG wrapper with viewport management,
 * overflow handling, and consistent styling for all bracket types.
 */

import React from 'react';
import type { ReactNode } from 'react';

export interface BracketContainerProps {
  /** Width of the SVG viewBox */
  viewBoxWidth: number;
  
  /** Height of the SVG viewBox */
  viewBoxHeight: number;
  
  /** Optional container width override */
  width?: number;
  
  /** Optional container height override */
  height?: number;
  
  /** Additional CSS classes for the container */
  className?: string;
  
  /** Additional CSS classes for the SVG element */
  svgClassName?: string;
  
  /** SVG content to render */
  children: ReactNode;
  
  /** Title for accessibility */
  title?: string;
  
  /** Description for accessibility */
  description?: string;
}

/**
 * Responsive SVG container for tournament brackets
 * 
 * Extracted from ChampionshipBracket's SVG wrapper logic.
 * Provides consistent viewport management and overflow handling.
 */
export const BracketContainer: React.FC<BracketContainerProps> = ({
  viewBoxWidth,
  viewBoxHeight,
  width,
  height,
  className = '',
  svgClassName = '',
  children,
  title,
  description
}) => {
  const containerStyles = {
    height: height ? `${height}px` : `${viewBoxHeight}px`,
    minHeight: '400px',
    ...(width && { width: `${width}px` })
  };
  
  return (
    <div className={`w-full overflow-x-auto overflow-y-auto max-h-[calc(100vh-200px)] ${className}`}>
      <svg
        viewBox={`0 0 ${viewBoxWidth} ${viewBoxHeight}`}
        preserveAspectRatio="xMinYMin meet"
        className={`w-full border border-gray-300 ${svgClassName}`}
        style={containerStyles}
        role="img"
        aria-labelledby={title ? "bracket-title" : undefined}
        aria-describedby={description ? "bracket-desc" : undefined}
      >
        {title && (
          <title id="bracket-title">{title}</title>
        )}
        {description && (
          <desc id="bracket-desc">{description}</desc>
        )}
        {children}
      </svg>
    </div>
  );
};

export default BracketContainer;