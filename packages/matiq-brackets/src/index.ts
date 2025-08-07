/**
 * matiq-brackets - Wrestling bracket visualization components
 * 
 * This package provides reusable React components for rendering wrestling tournament brackets.
 * Supports championship, consolation, and pigtail bracket types with embedded participant data.
 * 
 * @version 1.0.0
 * @author matiq-brackets team
 */

// Bracket Components
export { ChampionshipBracket } from './championship/ChampionshipBracket';
export type { ChampionshipBracketProps } from './championship/ChampionshipBracket';

export { ConsolationBracket } from './consolation/ConsolationBracket';
export type { ConsolationBracketProps } from './consolation/ConsolationBracket';

export { PigtailBracket } from './pigtail/PigtailBracket';
export type { PigtailBracketProps } from './pigtail/PigtailBracket';

// Shared Types
export type {
  Participant,
  Match,
  BracketType,
  BracketPosition,
  BracketDimensions,
  BracketLayout,
  ConnectingLine
} from './types';

// Utility Functions
export {
  createMatchMap,
  formatParticipantName,
  isWinner,
  findSourceMatches,
  buildRoundsFromMatches,
  getRectangleCenter,
  calculateDistance,
  isValidPosition,
  filterValidPositions
} from './utils';

// Default export for convenience (most commonly used component)
export { ChampionshipBracket as default } from './championship/ChampionshipBracket';