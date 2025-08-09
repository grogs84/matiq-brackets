/**
 * SVGBracketContainer - Reusable SVG container component for bracket visualization
 * 
 * Provides consistent viewBox, preserveAspectRatio, and responsive sizing
 * for all bracket types with proper TypeScript props.
 */

import React from 'react';
import type { ReactNode } from 'react';
import { SVG_STYLES } from '../constants';

export interface SVGBracketContainerProps {
  /** SVG content to render inside the container */
  children: ReactNode;
  /** Bracket title */
  title?: string;
  /** SVG viewBox dimensions */
  viewBox: {
    x: number;
    y: number;
    width: number;
    height: number;
  };
  /** Container CSS classes (defaults to responsive overflow styles) */
  containerClassName?: string;
  /** SVG CSS classes */
  svgClassName?: string;
  /** Preserve aspect ratio setting */
  preserveAspectRatio?: string;
  /** Fixed height style for the SVG */
  svgStyle?: React.CSSProperties;
  /** Minimum height for the container */
  minHeight?: string;
}

/**
 * SVGBracketContainer component provides consistent SVG wrapper
 * with responsive sizing and proper viewBox handling
 */
export const SVGBracketContainer: React.FC<SVGBracketContainerProps> = ({
  children,
  title,
  viewBox,
  containerClassName = SVG_STYLES.CONTAINER_CLASSES,
  svgClassName = SVG_STYLES.SVG_CLASSES,
  preserveAspectRatio = SVG_STYLES.DEFAULT_ASPECT_RATIO,
  svgStyle,
  minHeight = '400px'
}) => {
  const viewBoxString = `${viewBox.x} ${viewBox.y} ${viewBox.width} ${viewBox.height}`;
  
  const defaultSvgStyle: React.CSSProperties = {
    height: `${viewBox.height}px`,
    minHeight,
    ...svgStyle
  };

  return (
    <div className="w-full">
      {title && (
        <h3 className="text-lg font-bold mb-4">{title}</h3>
      )}
      <div className={containerClassName}>
        <svg 
          viewBox={viewBoxString}
          preserveAspectRatio={preserveAspectRatio}
          className={svgClassName}
          style={defaultSvgStyle}
        >
          {children}
        </svg>
      </div>
    </div>
  );
};

export default SVGBracketContainer;