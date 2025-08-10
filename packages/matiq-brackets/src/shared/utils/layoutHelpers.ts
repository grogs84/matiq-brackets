/**
 * Layout helper utilities for bracket positioning and text placement
 */

import type { Position, MatchSize, MatchTextPositions } from '../types';
import { DIMENSION_RATIOS } from '../constants';

/**
 * Get right edge center point of a match box
 * @param position - Match position {x, y}
 * @param matchSize - Match dimensions {width, height}
 * @returns Right edge center coordinates {x, y}
 */
export function getMatchRightEdgeCenter(position: Position, matchSize: MatchSize): Position {
  return {
    x: position.x + matchSize.width,
    y: position.y + matchSize.height / 2
  };
}

/**
 * Calculate text positions for match participants with enhanced layout for scores, seeds, and schools
 * @param position - Match position {x, y}
 * @param matchSize - Match dimensions {width, height}
 * @returns Text positions for participant1, participant2 with seeds inline and winner-based scoring
 */
export function getMatchTextPositions(position: Position, matchSize: MatchSize): MatchTextPositions {
  return {
    participant1: {
      seedAndName: {
        x: position.x + DIMENSION_RATIOS.TEXT_LEFT_MARGIN,
        y: position.y + matchSize.height * DIMENSION_RATIOS.PARTICIPANT1_NAME_Y
      },
      school: {
        x: position.x + DIMENSION_RATIOS.TEXT_LEFT_MARGIN,
        y: position.y + matchSize.height * DIMENSION_RATIOS.PARTICIPANT1_SCHOOL_Y
      },
      score: {
        x: position.x + matchSize.width - DIMENSION_RATIOS.TEXT_RIGHT_MARGIN,
        y: position.y + matchSize.height * DIMENSION_RATIOS.PARTICIPANT1_SCORE_Y
      }
    },
    participant2: {
      seedAndName: {
        x: position.x + DIMENSION_RATIOS.TEXT_LEFT_MARGIN,
        y: position.y + matchSize.height * DIMENSION_RATIOS.PARTICIPANT2_NAME_Y
      },
      school: {
        x: position.x + DIMENSION_RATIOS.TEXT_LEFT_MARGIN,
        y: position.y + matchSize.height * DIMENSION_RATIOS.PARTICIPANT2_SCHOOL_Y
      },
      score: {
        x: position.x + matchSize.width - DIMENSION_RATIOS.TEXT_RIGHT_MARGIN,
        y: position.y + matchSize.height * DIMENSION_RATIOS.PARTICIPANT2_SCORE_Y
      }
    }
  };
}