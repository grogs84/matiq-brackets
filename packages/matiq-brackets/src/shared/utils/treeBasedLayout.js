/**
 * Tree-based layout calculation utilities
 * 
 * This module calculates bracket positions directly from tree structure
 * using rank and slot information for input-order independence.
 */

// Inline constants to avoid import issues
const BRACKET_CONSTANTS = {
  DEFAULT_CONTAINER_HEIGHT: 1200,
  DEFAULT_PADDING: 60,
  MIN_MATCH_WIDTH: 220,
  MIN_MATCH_HEIGHT: 110,
  MIN_SPACING: 50,
  LEFT_MARGIN: 30,
  ROUND_SPACING: 260,
  BOTTOM_PADDING_EXTRA: 40,
  FIRST_MATCH_TOP_MARGIN: 100
};

/**
 * Calculate responsive layout directly from tournament tree structure
 * Uses rank (round) and slot (position within round) for stable positioning
 * @param tree - Array of round arrays containing Node objects with rank/slot info
 * @param options - Sizing options {containerWidth, containerHeight, padding}
 * @returns Layout with positions, dimensions, and match size
 */
export function calculateTreeBasedLayout(tree, options = {}) {
  if (tree.length === 0) {
    return { 
      positions: {}, 
      dimensions: { width: 400, height: 300 },
      matchSize: { width: BRACKET_CONSTANTS.MIN_MATCH_WIDTH, height: BRACKET_CONSTANTS.MIN_MATCH_HEIGHT }
    };
  }

  // Default options
  const {
    containerHeight = BRACKET_CONSTANTS.DEFAULT_CONTAINER_HEIGHT,
    padding = BRACKET_CONSTANTS.DEFAULT_PADDING,
    minMatchWidth = BRACKET_CONSTANTS.MIN_MATCH_WIDTH,
    minMatchHeight = BRACKET_CONSTANTS.MIN_MATCH_HEIGHT,
    minSpacing = BRACKET_CONSTANTS.MIN_SPACING
  } = options;

  const leftMargin = BRACKET_CONSTANTS.LEFT_MARGIN;
  const roundSpacing = BRACKET_CONSTANTS.ROUND_SPACING;
  const positions = {};

  // Process each round using tree structure
  tree.forEach((round, roundIndex) => {
    const roundNodes = round; // Array of Node objects
    
    if (roundNodes.length === 0) return;

    if (roundIndex === 0) {
      // First round: use slot-based vertical spacing (not array index)
      const firstRoundSpacing = Math.max(
        minMatchHeight + minSpacing, 
        containerHeight / (roundNodes.length + 1)
      );
      
      roundNodes.forEach((node) => {
        positions[node.id] = {
          x: leftMargin,
          y: BRACKET_CONSTANTS.FIRST_MATCH_TOP_MARGIN + (node.slot * firstRoundSpacing)
        };
      });
    } else {
      // Later rounds: calculate positions based on children's positions from tree
      roundNodes.forEach((node) => {
        if (node.children && node.children.length > 0) {
          // Calculate center Y based on children positions
          const childPositions = node.children
            .map(child => positions[child.id])
            .filter(pos => pos && typeof pos.y === 'number' && !isNaN(pos.y));
          
          if (childPositions.length > 0) {
            const avgY = childPositions.reduce((sum, pos) => sum + pos.y, 0) / childPositions.length;
            positions[node.id] = {
              x: leftMargin + roundIndex * roundSpacing,
              y: avgY
            };
          } else {
            // Fallback: use slot-based positioning
            const roundSpacing = containerHeight / (roundNodes.length + 1);
            positions[node.id] = {
              x: leftMargin + roundIndex * roundSpacing,
              y: padding + (node.slot + 1) * roundSpacing
            };
          }
        } else {
          // No children (shouldn't happen in later rounds, but fallback)
          const roundSpacing = containerHeight / (roundNodes.length + 1);
          positions[node.id] = {
            x: leftMargin + roundIndex * roundSpacing,
            y: padding + (node.slot + 1) * roundSpacing
          };
        }
      });
    }
  });

  // Calculate final dimensions
  const allPositions = Object.values(positions);
  const maxX = Math.max(...allPositions.map(p => p.x)) + minMatchWidth + padding;
  const maxY = Math.max(...allPositions.map(p => p.y)) + minMatchHeight + padding + BRACKET_CONSTANTS.BOTTOM_PADDING_EXTRA;
  
  return {
    positions,
    dimensions: {
      width: Math.max(600, maxX),
      height: Math.max(400, maxY)
    },
    matchSize: {
      width: minMatchWidth,
      height: minMatchHeight
    }
  };
}