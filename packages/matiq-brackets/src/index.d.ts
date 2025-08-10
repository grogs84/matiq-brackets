import React from 'react';

export interface Participant {
  id?: string;
  name: string;
  seed?: number;
  school?: string;
}

export interface Match {
  id: string;
  participants: Participant[];
  round: string;
  status?: 'upcoming' | 'in_progress' | 'completed';
  winner?: string;
  score?: string;
  winner_next_match_id?: string | null;
  winner_prev_match_id?: string | null;
  loser_prev_match_id?: string | null;
}

export interface ChampionshipBracketProps {
  matches: Match[];
  onMatchClick?: (match: Match) => void;
}

export interface ConsolationBracketProps {
  matches?: Match[];
  onMatchClick?: (match: Match) => void;
  width?: number;
  height?: number;
  className?: string;
}

export declare const ChampionshipBracket: React.FC<ChampionshipBracketProps>;

export declare const ConsolationBracket: React.FC<ConsolationBracketProps>;
