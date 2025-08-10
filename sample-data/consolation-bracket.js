/**
 * Sample Consolation Bracket Data
 * 
 * Simple consolation bracket structure for testing the ConsolationBracket component.
 * This represents wrestlers who were eliminated from the championship bracket
 * competing for placement positions.
 * 
 * Used for testing shared logic consolidation and consolation bracket rendering.
 */

export const sampleConsolationMatches = [
  // Consolation Round 1 - First elimination matches
  { 
    id: "cons1m1", 
    participants: [
      { name: "Jared Germaine", seed: null, school: "Penn State" }, 
      { name: "Vince Rodriquez", seed: null, school: "Ohio State" }
    ], 
    winner: "Jared Germaine", 
    score: "8-6", 
    winner_next_match_id: "cons2m1", 
    winner_prev_match_id: null, 
    loser_prev_match_id: null 
  },
  { 
    id: "cons1m2", 
    participants: [
      { name: "Garrett Frey", seed: null, school: "Michigan" }, 
      { name: "Shane Young", seed: null, school: "Indiana" }
    ], 
    winner: "Shane Young", 
    score: "12-4", 
    winner_next_match_id: "cons2m1", 
    winner_prev_match_id: null, 
    loser_prev_match_id: null 
  },
  { 
    id: "cons1m3", 
    participants: [
      { name: "Cory Finch", seed: null, school: "Illinois" }, 
      { name: "Tyler Iwamura", seed: null, school: "Oregon State" }
    ], 
    winner: "Tyler Iwamura", 
    score: "7-3", 
    winner_next_match_id: "cons2m2", 
    winner_prev_match_id: null, 
    loser_prev_match_id: null 
  },
  { 
    id: "cons1m4", 
    participants: [
      { name: "Joe Roth", seed: null, school: "Michigan State" }, 
      { name: "Jerome Robinson", seed: null, school: "Navy" }
    ], 
    winner: "Joe Roth", 
    score: "5-2", 
    winner_next_match_id: "cons2m2", 
    winner_prev_match_id: null, 
    loser_prev_match_id: null 
  },
  
  // Consolation Round 2 - Advancing winners
  { 
    id: "cons2m1", 
    participants: [
      { name: "Jared Germaine", seed: null, school: "Penn State" }, 
      { name: "Shane Young", seed: null, school: "Indiana" }
    ], 
    winner: "Jared Germaine", 
    score: "Fall 4:23", 
    winner_next_match_id: "cons3m1", 
    winner_prev_match_id: "cons1m1", 
    loser_prev_match_id: "cons1m2" 
  },
  { 
    id: "cons2m2", 
    participants: [
      { name: "Tyler Iwamura", seed: null, school: "Oregon State" }, 
      { name: "Joe Roth", seed: null, school: "Michigan State" }
    ], 
    winner: "Tyler Iwamura", 
    score: "6-4 OT", 
    winner_next_match_id: "cons3m1", 
    winner_prev_match_id: "cons1m3", 
    loser_prev_match_id: "cons1m4" 
  },
  
  // Consolation Final - 3rd place match
  { 
    id: "cons3m1", 
    participants: [
      { name: "Jared Germaine", seed: null, school: "Penn State" }, 
      { name: "Tyler Iwamura", seed: null, school: "Oregon State" }
    ], 
    winner: "Tyler Iwamura", 
    score: "9-7", 
    winner_next_match_id: null, 
    winner_prev_match_id: "cons2m1", 
    loser_prev_match_id: "cons2m2" 
  }
];

/**
 * Alternative larger consolation bracket for testing different sizes
 */
export const largeSampleConsolationMatches = [
  // Round 1 - 8 matches
  { id: "cons1m1", participants: [{ name: "Wrestler A1", school: "School A" }, { name: "Wrestler A2", school: "School B" }], winner: "Wrestler A1", score: "7-4", winner_next_match_id: "cons2m1" },
  { id: "cons1m2", participants: [{ name: "Wrestler B1", school: "School C" }, { name: "Wrestler B2", school: "School D" }], winner: "Wrestler B2", score: "6-3", winner_next_match_id: "cons2m1" },
  { id: "cons1m3", participants: [{ name: "Wrestler C1", school: "School E" }, { name: "Wrestler C2", school: "School F" }], winner: "Wrestler C1", score: "Fall 3:45", winner_next_match_id: "cons2m2" },
  { id: "cons1m4", participants: [{ name: "Wrestler D1", school: "School G" }, { name: "Wrestler D2", school: "School H" }], winner: "Wrestler D1", score: "8-2", winner_next_match_id: "cons2m2" },
  { id: "cons1m5", participants: [{ name: "Wrestler E1", school: "School I" }, { name: "Wrestler E2", school: "School J" }], winner: "Wrestler E2", score: "5-4 OT", winner_next_match_id: "cons2m3" },
  { id: "cons1m6", participants: [{ name: "Wrestler F1", school: "School K" }, { name: "Wrestler F2", school: "School L" }], winner: "Wrestler F1", score: "9-3", winner_next_match_id: "cons2m3" },
  { id: "cons1m7", participants: [{ name: "Wrestler G1", school: "School M" }, { name: "Wrestler G2", school: "School N" }], winner: "Wrestler G2", score: "Fall 5:12", winner_next_match_id: "cons2m4" },
  { id: "cons1m8", participants: [{ name: "Wrestler H1", school: "School O" }, { name: "Wrestler H2", school: "School P" }], winner: "Wrestler H1", score: "12-5", winner_next_match_id: "cons2m4" },
  
  // Round 2 - 4 matches  
  { id: "cons2m1", participants: [{ name: "Wrestler A1", school: "School A" }, { name: "Wrestler B2", school: "School D" }], winner: "Wrestler A1", score: "6-2", winner_next_match_id: "cons3m1", winner_prev_match_id: "cons1m1", loser_prev_match_id: "cons1m2" },
  { id: "cons2m2", participants: [{ name: "Wrestler C1", school: "School E" }, { name: "Wrestler D1", school: "School G" }], winner: "Wrestler D1", score: "4-3 TB", winner_next_match_id: "cons3m1", winner_prev_match_id: "cons1m3", loser_prev_match_id: "cons1m4" },
  { id: "cons2m3", participants: [{ name: "Wrestler E2", school: "School J" }, { name: "Wrestler F1", school: "School K" }], winner: "Wrestler F1", score: "10-4", winner_next_match_id: "cons3m2", winner_prev_match_id: "cons1m5", loser_prev_match_id: "cons1m6" },
  { id: "cons2m4", participants: [{ name: "Wrestler G2", school: "School N" }, { name: "Wrestler H1", school: "School O" }], winner: "Wrestler G2", score: "7-5", winner_next_match_id: "cons3m2", winner_prev_match_id: "cons1m7", loser_prev_match_id: "cons1m8" },
  
  // Round 3 - 2 matches (semifinals)
  { id: "cons3m1", participants: [{ name: "Wrestler A1", school: "School A" }, { name: "Wrestler D1", school: "School G" }], winner: "Wrestler A1", score: "8-3", winner_next_match_id: "cons4m1", winner_prev_match_id: "cons2m1", loser_prev_match_id: "cons2m2" },
  { id: "cons3m2", participants: [{ name: "Wrestler F1", school: "School K" }, { name: "Wrestler G2", school: "School N" }], winner: "Wrestler F1", score: "Fall 2:45", winner_next_match_id: "cons4m1", winner_prev_match_id: "cons2m3", loser_prev_match_id: "cons2m4" },
  
  // Round 4 - Final
  { id: "cons4m1", participants: [{ name: "Wrestler A1", school: "School A" }, { name: "Wrestler F1", school: "School K" }], winner: "Wrestler A1", score: "5-3", winner_next_match_id: null, winner_prev_match_id: "cons3m1", loser_prev_match_id: "cons3m2" }
];