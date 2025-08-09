/**
 * Coordinate and bounds validation utilities
 * 
 * This module provides validation functions for ensuring bracket coordinates
 * are valid, finite, and within expected bounds.
 */

import type { Point, Dimensions, Rectangle, ValidationResult } from './types';

/**
 * Check if a value is a finite number (not NaN or Infinity)
 * 
 * @param value - Value to check
 * @returns True if value is a finite number
 */
export function isFiniteNumber(value: unknown): value is number {
  return typeof value === 'number' && isFinite(value) && !isNaN(value);
}

/**
 * Validate and filter an array of coordinates
 * 
 * @param coordinates - Array of coordinate values
 * @returns Array with only valid finite coordinates
 */
export function filterValidCoordinates(coordinates: number[]): number[] {
  return coordinates.filter(isFiniteNumber);
}

/**
 * Clamp a point to stay within canvas bounds
 * 
 * @param point - Point to clamp
 * @param canvasDimensions - Canvas dimensions for bounds
 * @param padding - Padding to maintain from edges
 * @returns Clamped point within bounds
 */
export function clampToCanvas(
  point: Point,
  canvasDimensions: Dimensions,
  padding: number = 0
): Point {
  return {
    x: Math.max(padding, Math.min(point.x, canvasDimensions.width - padding)),
    y: Math.max(padding, Math.min(point.y, canvasDimensions.height - padding))
  };
}

/**
 * Ensure rectangle stays within canvas bounds
 * 
 * @param rectangle - Rectangle to constrain
 * @param canvasDimensions - Canvas dimensions for bounds
 * @returns Rectangle adjusted to fit within bounds
 */
export function ensureInBounds(
  rectangle: Rectangle,
  canvasDimensions: Dimensions
): Rectangle {
  // Adjust width and height if they exceed canvas
  const width = Math.min(rectangle.width, canvasDimensions.width);
  const height = Math.min(rectangle.height, canvasDimensions.height);
  
  // Adjust position to keep rectangle within bounds
  const x = Math.max(0, Math.min(rectangle.x, canvasDimensions.width - width));
  const y = Math.max(0, Math.min(rectangle.y, canvasDimensions.height - height));
  
  return { x, y, width, height };
}

/**
 * Validate a point and provide correction suggestions
 * 
 * @param point - Point to validate
 * @param canvasDimensions - Optional canvas bounds for validation
 * @returns Validation result with any corrections needed
 */
export function validatePoint(
  point: Point,
  canvasDimensions?: Dimensions
): ValidationResult {
  const warnings: string[] = [];
  
  // Check for invalid coordinates
  if (!isFiniteNumber(point.x)) {
    warnings.push(`Invalid X coordinate: ${point.x}`);
  }
  
  if (!isFiniteNumber(point.y)) {
    warnings.push(`Invalid Y coordinate: ${point.y}`);
  }
  
  if (warnings.length > 0) {
    return {
      isValid: false,
      warnings,
      clampedValue: {
        x: isFiniteNumber(point.x) ? point.x : 0,
        y: isFiniteNumber(point.y) ? point.y : 0
      }
    };
  }
  
  // Check bounds if canvas dimensions provided
  if (canvasDimensions) {
    if (point.x < 0 || point.x > canvasDimensions.width) {
      warnings.push(`X coordinate ${point.x} outside canvas width ${canvasDimensions.width}`);
    }
    
    if (point.y < 0 || point.y > canvasDimensions.height) {
      warnings.push(`Y coordinate ${point.y} outside canvas height ${canvasDimensions.height}`);
    }
    
    if (warnings.length > 0) {
      return {
        isValid: false,
        warnings,
        clampedValue: clampToCanvas(point, canvasDimensions)
      };
    }
  }
  
  return { isValid: true };
}

/**
 * Validate dimensions are positive and finite
 * 
 * @param dimensions - Dimensions to validate
 * @returns Validation result
 */
export function validateDimensions(dimensions: Dimensions): ValidationResult {
  const warnings: string[] = [];
  
  if (!isFiniteNumber(dimensions.width) || dimensions.width <= 0) {
    warnings.push(`Invalid width: ${dimensions.width}`);
  }
  
  if (!isFiniteNumber(dimensions.height) || dimensions.height <= 0) {
    warnings.push(`Invalid height: ${dimensions.height}`);
  }
  
  if (warnings.length > 0) {
    return {
      isValid: false,
      warnings,
      clampedValue: {
        width: isFiniteNumber(dimensions.width) && dimensions.width > 0 ? dimensions.width : 100,
        height: isFiniteNumber(dimensions.height) && dimensions.height > 0 ? dimensions.height : 100
      }
    };
  }
  
  return { isValid: true };
}

/**
 * Safe calculation of maximum value from coordinate arrays
 * 
 * Extracted from ChampionshipBracket coordinate validation logic.
 * Filters invalid values before calculating max to prevent NaN results.
 * 
 * @param values - Array of numeric values
 * @param fallback - Fallback value if no valid values found
 * @returns Maximum valid value or fallback
 */
export function safeMax(values: number[], fallback: number): number {
  const validValues = filterValidCoordinates(values);
  return validValues.length > 0 ? Math.max(...validValues) : fallback;
}

/**
 * Safe calculation of minimum value from coordinate arrays
 * 
 * @param values - Array of numeric values
 * @param fallback - Fallback value if no valid values found
 * @returns Minimum valid value or fallback
 */
export function safeMin(values: number[], fallback: number): number {
  const validValues = filterValidCoordinates(values);
  return validValues.length > 0 ? Math.min(...validValues) : fallback;
}

/**
 * Create development warning for invalid coordinates
 * 
 * This helps during development to catch coordinate calculation issues early.
 * 
 * @param context - Context description for the warning
 * @param invalidValue - The invalid value that was detected
 */
export function warnInvalidCoordinate(context: string, invalidValue: unknown): void {
  if (process.env.NODE_ENV === 'development') {
    console.warn(`[Bracket Validation] Invalid coordinate in ${context}:`, invalidValue);
  }
}

/**
 * Assert that a point has valid coordinates, with fallback
 * 
 * @param point - Point to validate
 * @param fallback - Fallback point if invalid
 * @param context - Context for debugging
 * @returns Valid point (original or fallback)
 */
export function assertValidPoint(
  point: Point,
  fallback: Point,
  context: string = 'unknown'
): Point {
  if (!isFiniteNumber(point.x) || !isFiniteNumber(point.y)) {
    warnInvalidCoordinate(context, point);
    return fallback;
  }
  return point;
}

/**
 * Assert that dimensions are valid, with fallback
 * 
 * @param dimensions - Dimensions to validate
 * @param fallback - Fallback dimensions if invalid
 * @param context - Context for debugging
 * @returns Valid dimensions (original or fallback)
 */
export function assertValidDimensions(
  dimensions: Dimensions,
  fallback: Dimensions,
  context: string = 'unknown'
): Dimensions {
  if (!isFiniteNumber(dimensions.width) || !isFiniteNumber(dimensions.height) ||
      dimensions.width <= 0 || dimensions.height <= 0) {
    warnInvalidCoordinate(context, dimensions);
    return fallback;
  }
  return dimensions;
}