/**
 * Sample Championship Bracket Data
 * 
 * Complete 32-wrestler championship bracket with embedded participant data.
 * This represents a realistic wrestling tournament structure with:
 * - 5 rounds of matches (32→16→8→4→2→1)
 * - Proper winner_next_match_id relationships
 * - Embedded participant data with names, seeds, schools
 * - Realistic wrestling scores and match outcomes
 * 
 * Used by both demo app and Storybook for consistent testing and showcase.
 */

export const sampleChampionshipMatches = [
  // Round 1 (32 wrestlers, 16 matches)
  { id: "r1m1", participants: [ { name: "Matt McDonough", seed: 1, school: "Iowa" }, { name: "Jared Germaine", seed: null, school: "Penn State" } ], winner: "Matt McDonough", score: "Fall 3:24", winner_next_match_id: "r2m1", winner_prev_match_id: null, loser_prev_match_id: null },
  { id: "r1m2", participants: [ { name: "Trent Sprenkle", seed: null, school: "Minnesota" }, { name: "Vince Rodriquez", seed: null, school: "Ohio State" } ], winner: "Trent Sprenkle", score: "Fall 2:23", winner_next_match_id: "r2m1", winner_prev_match_id: null, loser_prev_match_id: null },
  { id: "r1m3", participants: [ { name: "Levi Mele", seed: 9, school: "Cornell" }, { name: "Garrett Frey", seed: null, school: "Michigan" } ], winner: "Levi Mele", score: "Fall 2:38", winner_next_match_id: "r2m2", winner_prev_match_id: null, loser_prev_match_id: null },
  { id: "r1m4", participants: [ { name: "Shane Young", seed: null, school: "Indiana" }, { name: "Ryan Mango", seed: 8, school: "Stanford" } ], winner: "Ryan Mango", score: "10-8", winner_next_match_id: "r2m2", winner_prev_match_id: null, loser_prev_match_id: null },
  { id: "r1m5", participants: [ { name: "Nic Bedelyon", seed: 5, school: "Kent State" }, { name: "Cory Finch", seed: null, school: "Illinois" } ], winner: "Nic Bedelyon", score: "13-2", winner_next_match_id: "r2m3", winner_prev_match_id: null, loser_prev_match_id: null },
  { id: "r1m6", participants: [ { name: "Tyler Iwamura", seed: null, school: "Oregon State" }, { name: "Steve Bonanno", seed: 12, school: "Rutgers" } ], winner: "Steve Bonanno", score: "6-3", winner_next_match_id: "r2m3", winner_prev_match_id: null, loser_prev_match_id: null },
  { id: "r1m7", participants: [ { name: "Joe Roth", seed: null, school: "Michigan State" }, { name: "Camden Eppert", seed: null, school: "Northern Iowa" } ], winner: "Camden Eppert", score: "4-3", winner_next_match_id: "r2m4", winner_prev_match_id: null, loser_prev_match_id: null },
  { id: "r1m8", participants: [ { name: "Jerome Robinson", seed: null, school: "Navy" }, { name: "Jesse Delgado", seed: 4, school: "Illinois" } ], winner: "Jesse Delgado", score: "6-1", winner_next_match_id: "r2m4", winner_prev_match_id: null, loser_prev_match_id: null },
  { id: "r1m9", participants: [ { name: "Alan Waters", seed: 3, school: "Missouri" }, { name: "Pat Rollins", seed: null, school: "Ohio State" } ], winner: "Alan Waters", score: "15-0", winner_next_match_id: "r2m5", winner_prev_match_id: null, loser_prev_match_id: null },
  { id: "r1m10", participants: [ { name: "Colton Fought", seed: null, school: "Wyoming" }, { name: "Anthony Zanetta", seed: null, school: "Wisconsin" } ], winner: "Anthony Zanetta", score: "14-4", winner_next_match_id: "r2m5", winner_prev_match_id: null, loser_prev_match_id: null },
  { id: "r1m11", participants: [ { name: "Matt Snyder", seed: 11, school: "Minnesota" }, { name: "Johnni DiJulius", seed: null, school: "Ohio State" } ], winner: "Matt Snyder", score: "3-2", winner_next_match_id: "r2m6", winner_prev_match_id: null, loser_prev_match_id: null },
  { id: "r1m12", participants: [ { name: "Erik Spjut", seed: null, school: "Northern Iowa" }, { name: "Frank Perrelli", seed: 6, school: "Penn State" } ], winner: "Frank Perrelli", score: "4-2", winner_next_match_id: "r2m6", winner_prev_match_id: null, loser_prev_match_id: null },
  { id: "r1m13", participants: [ { name: "Jarrod Patterson", seed: 7, school: "Oklahoma" }, { name: "Max Soria", seed: null, school: "Nebraska" } ], winner: "Jarrod Patterson", score: "6-1", winner_next_match_id: "r2m7", winner_prev_match_id: null, loser_prev_match_id: null },
  { id: "r1m14", participants: [ { name: "Michael Martinez", seed: null, school: "Wyoming" }, { name: "Nich Megaludis", seed: 10, school: "Penn State" } ], winner: "Nich Megaludis", score: "13-2", winner_next_match_id: "r2m7", winner_prev_match_id: null, loser_prev_match_id: null },
  { id: "r1m15", participants: [ { name: "Jon Morrison", seed: null, school: "Oklahoma State" }, { name: "Tony Gravely", seed: null, school: "Virginia Tech" } ], winner: "Jon Morrison", score: "16-0", winner_next_match_id: "r2m8", winner_prev_match_id: null, loser_prev_match_id: null },
  { id: "r1m16", participants: [ { name: "Austin Miller", seed: null, school: "Central Michigan" }, { name: "Zachary Sanders", seed: 2, school: "Minnesota" } ], winner: "Zachary Sanders", score: "Fall 6:00", winner_next_match_id: "r2m8", winner_prev_match_id: null, loser_prev_match_id: null },

  // Round 2 (16 wrestlers, 8 matches)
  { id: "r2m1", participants: [ { name: "Matt McDonough", seed: 1, school: "Iowa" }, { name: "Trent Sprenkle", seed: null, school: "Minnesota" } ], winner: "Matt McDonough", score: "Fall 2:56", winner_next_match_id: "r3m1", winner_prev_match_id: "r1m1", loser_prev_match_id: "r1m2" },
  { id: "r2m2", participants: [ { name: "Levi Mele", seed: 9, school: "Cornell" }, { name: "Ryan Mango", seed: 8, school: "Stanford" } ], winner: "Ryan Mango", score: "15-6", winner_next_match_id: "r3m1", winner_prev_match_id: "r1m3", loser_prev_match_id: "r1m4" },
  { id: "r2m3", participants: [ { name: "Nic Bedelyon", seed: 5, school: "Kent State" }, { name: "Steve Bonanno", seed: 12, school: "Rutgers" } ], winner: "Nic Bedelyon", score: "10-7", winner_next_match_id: "r3m2", winner_prev_match_id: "r1m5", loser_prev_match_id: "r1m6" },
  { id: "r2m4", participants: [ { name: "Camden Eppert", seed: null, school: "Northern Iowa" }, { name: "Jesse Delgado", seed: 4, school: "Illinois" } ], winner: "Jesse Delgado", score: "Fall 5:12", winner_next_match_id: "r3m2", winner_prev_match_id: "r1m7", loser_prev_match_id: "r1m8" },
  { id: "r2m5", participants: [ { name: "Alan Waters", seed: 3, school: "Missouri" }, { name: "Anthony Zanetta", seed: null, school: "Wisconsin" } ], winner: "Anthony Zanetta", score: "4-2 OT", winner_next_match_id: "r3m3", winner_prev_match_id: "r1m9", loser_prev_match_id: "r1m10" },
  { id: "r2m6", participants: [ { name: "Matt Snyder", seed: 11, school: "Minnesota" }, { name: "Frank Perrelli", seed: 6, school: "Penn State" } ], winner: "Frank Perrelli", score: "4-3 TB", winner_next_match_id: "r3m3", winner_prev_match_id: "r1m11", loser_prev_match_id: "r1m12" },
  { id: "r2m7", participants: [ { name: "Jarrod Patterson", seed: 7, school: "Oklahoma" }, { name: "Nich Megaludis", seed: 10, school: "Penn State" } ], winner: "Nich Megaludis", score: "7-3", winner_next_match_id: "r3m4", winner_prev_match_id: "r1m13", loser_prev_match_id: "r1m14" },
  { id: "r2m8", participants: [ { name: "Jon Morrison", seed: null, school: "Oklahoma State" }, { name: "Zachary Sanders", seed: 2, school: "Minnesota" } ], winner: "Zachary Sanders", score: "2-0", winner_next_match_id: "r3m4", winner_prev_match_id: "r1m15", loser_prev_match_id: "r1m16" },

  // Round 3 (8 wrestlers, 4 matches)
  { id: "r3m1", participants: [ { name: "Matt McDonough", seed: 1, school: "Iowa" }, { name: "Ryan Mango", seed: 8, school: "Stanford" } ], winner: "Matt McDonough", score: "13-3", winner_next_match_id: "r4m1", winner_prev_match_id: "r2m1", loser_prev_match_id: "r2m2" },
  { id: "r3m2", participants: [ { name: "Nic Bedelyon", seed: 5, school: "Kent State" }, { name: "Jesse Delgado", seed: 4, school: "Illinois" } ], winner: "Nic Bedelyon", score: "8-5 OT", winner_next_match_id: "r4m1", winner_prev_match_id: "r2m3", loser_prev_match_id: "r2m4" },
  { id: "r3m3", participants: [ { name: "Anthony Zanetta", seed: null, school: "Wisconsin" }, { name: "Frank Perrelli", seed: 6, school: "Penn State" } ], winner: "Frank Perrelli", score: "6-3", winner_next_match_id: "r4m2", winner_prev_match_id: "r2m5", loser_prev_match_id: "r2m6" },
  { id: "r3m4", participants: [ { name: "Nich Megaludis", seed: 10, school: "Penn State" }, { name: "Zachary Sanders", seed: 2, school: "Minnesota" } ], winner: "Nich Megaludis", score: "7-4", winner_next_match_id: "r4m2", winner_prev_match_id: "r2m7", loser_prev_match_id: "r2m8" },

  // Round 4 (4 wrestlers, 2 matches)
  { id: "r4m1", participants: [ { name: "Matt McDonough", seed: 1, school: "Iowa" }, { name: "Nic Bedelyon", seed: 5, school: "Kent State" } ], winner: "Matt McDonough", score: "4-1", winner_next_match_id: "r5m1", winner_prev_match_id: "r3m1", loser_prev_match_id: "r3m2" },
  { id: "r4m2", participants: [ { name: "Frank Perrelli", seed: 6, school: "Penn State" }, { name: "Nich Megaludis", seed: 10, school: "Penn State" } ], winner: "Nich Megaludis", score: "3-2 TB", winner_next_match_id: "r5m1", winner_prev_match_id: "r3m3", loser_prev_match_id: "r3m4" },

  // Round 5 (Final)
  { id: "r5m1", participants: [ { name: "Matt McDonough", seed: 1, school: "Iowa" }, { name: "Nich Megaludis", seed: 10, school: "Penn State" } ], winner: "Matt McDonough", score: "4-1", winner_next_match_id: null, winner_prev_match_id: "r4m1", loser_prev_match_id: "r4m2" }
];

/**
 * Unordered Championship Bracket Data for Testing
 * 
 * Same tournament data as sampleChampionshipMatches but with matches 
 * in random order to test tournament tree parsing algorithm robustness.
 * Should produce identical bracket layout since algorithm uses
 * winner_next_match_id relationships instead of array order.
 */
export const sampleChampionshipBracket2 = [
  // Randomly ordered matches from various rounds
  { id: "r5m1", participants: [ { name: "Matt McDonough", seed: 1, school: "Iowa" }, { name: "Nich Megaludis", seed: 10, school: "Penn State" } ], winner: "Matt McDonough", score: "4-1", winner_next_match_id: null, winner_prev_match_id: "r4m1", loser_prev_match_id: "r4m2" },
  { id: "r1m8", participants: [ { name: "Jerome Robinson", seed: null, school: "Navy" }, { name: "Jesse Delgado", seed: 4, school: "Illinois" } ], winner: "Jesse Delgado", score: "6-1", winner_next_match_id: "r2m4", winner_prev_match_id: null, loser_prev_match_id: null },
  { id: "r3m2", participants: [ { name: "Nic Bedelyon", seed: 5, school: "Kent State" }, { name: "Jesse Delgado", seed: 4, school: "Illinois" } ], winner: "Nic Bedelyon", score: "8-5 OT", winner_next_match_id: "r4m1", winner_prev_match_id: "r2m3", loser_prev_match_id: "r2m4" },
  { id: "r2m1", participants: [ { name: "Matt McDonough", seed: 1, school: "Iowa" }, { name: "Trent Sprenkle", seed: null, school: "Minnesota" } ], winner: "Matt McDonough", score: "Fall 2:56", winner_next_match_id: "r3m1", winner_prev_match_id: "r1m1", loser_prev_match_id: "r1m2" },
  { id: "r1m12", participants: [ { name: "Erik Spjut", seed: null, school: "Northern Iowa" }, { name: "Frank Perrelli", seed: 6, school: "Penn State" } ], winner: "Frank Perrelli", score: "4-2", winner_next_match_id: "r2m6", winner_prev_match_id: null, loser_prev_match_id: null },
  { id: "r4m1", participants: [ { name: "Matt McDonough", seed: 1, school: "Iowa" }, { name: "Nic Bedelyon", seed: 5, school: "Kent State" } ], winner: "Matt McDonough", score: "4-1", winner_next_match_id: "r5m1", winner_prev_match_id: "r3m1", loser_prev_match_id: "r3m2" },
  { id: "r1m3", participants: [ { name: "Levi Mele", seed: 9, school: "Cornell" }, { name: "Garrett Frey", seed: null, school: "Michigan" } ], winner: "Levi Mele", score: "Fall 2:38", winner_next_match_id: "r2m2", winner_prev_match_id: null, loser_prev_match_id: null },
  { id: "r2m8", participants: [ { name: "Jon Morrison", seed: null, school: "Oklahoma State" }, { name: "Zachary Sanders", seed: 2, school: "Minnesota" } ], winner: "Zachary Sanders", score: "2-0", winner_next_match_id: "r3m4", winner_prev_match_id: "r1m15", loser_prev_match_id: "r1m16" },
  { id: "r1m14", participants: [ { name: "Michael Martinez", seed: null, school: "Wyoming" }, { name: "Nich Megaludis", seed: 10, school: "Penn State" } ], winner: "Nich Megaludis", score: "13-2", winner_next_match_id: "r2m7", winner_prev_match_id: null, loser_prev_match_id: null },
  { id: "r3m4", participants: [ { name: "Nich Megaludis", seed: 10, school: "Penn State" }, { name: "Zachary Sanders", seed: 2, school: "Minnesota" } ], winner: "Nich Megaludis", score: "7-4", winner_next_match_id: "r4m2", winner_prev_match_id: "r2m7", loser_prev_match_id: "r2m8" },
  { id: "r1m1", participants: [ { name: "Matt McDonough", seed: 1, school: "Iowa" }, { name: "Jared Germaine", seed: null, school: "Penn State" } ], winner: "Matt McDonough", score: "Fall 3:24", winner_next_match_id: "r2m1", winner_prev_match_id: null, loser_prev_match_id: null },
  { id: "r2m5", participants: [ { name: "Alan Waters", seed: 3, school: "Missouri" }, { name: "Anthony Zanetta", seed: null, school: "Wisconsin" } ], winner: "Anthony Zanetta", score: "4-2 OT", winner_next_match_id: "r3m3", winner_prev_match_id: "r1m9", loser_prev_match_id: "r1m10" },
  { id: "r1m16", participants: [ { name: "Austin Miller", seed: null, school: "Central Michigan" }, { name: "Zachary Sanders", seed: 2, school: "Minnesota" } ], winner: "Zachary Sanders", score: "Fall 6:00", winner_next_match_id: "r2m8", winner_prev_match_id: null, loser_prev_match_id: null },
  { id: "r4m2", participants: [ { name: "Frank Perrelli", seed: 6, school: "Penn State" }, { name: "Nich Megaludis", seed: 10, school: "Penn State" } ], winner: "Nich Megaludis", score: "3-2 TB", winner_next_match_id: "r5m1", winner_prev_match_id: "r3m3", loser_prev_match_id: "r3m4" },
  { id: "r1m9", participants: [ { name: "Alan Waters", seed: 3, school: "Missouri" }, { name: "Pat Rollins", seed: null, school: "Ohio State" } ], winner: "Alan Waters", score: "15-0", winner_next_match_id: "r2m5", winner_prev_match_id: null, loser_prev_match_id: null },
  { id: "r2m3", participants: [ { name: "Nic Bedelyon", seed: 5, school: "Kent State" }, { name: "Steve Bonanno", seed: 12, school: "Rutgers" } ], winner: "Nic Bedelyon", score: "10-7", winner_next_match_id: "r3m2", winner_prev_match_id: "r1m5", loser_prev_match_id: "r1m6" },
  { id: "r1m7", participants: [ { name: "Joe Roth", seed: null, school: "Michigan State" }, { name: "Camden Eppert", seed: null, school: "Northern Iowa" } ], winner: "Camden Eppert", score: "4-3", winner_next_match_id: "r2m4", winner_prev_match_id: null, loser_prev_match_id: null },
  { id: "r3m1", participants: [ { name: "Matt McDonough", seed: 1, school: "Iowa" }, { name: "Ryan Mango", seed: 8, school: "Stanford" } ], winner: "Matt McDonough", score: "13-3", winner_next_match_id: "r4m1", winner_prev_match_id: "r2m1", loser_prev_match_id: "r2m2" },
  { id: "r1m15", participants: [ { name: "Jon Morrison", seed: null, school: "Oklahoma State" }, { name: "Tony Gravely", seed: null, school: "Virginia Tech" } ], winner: "Jon Morrison", score: "16-0", winner_next_match_id: "r2m8", winner_prev_match_id: null, loser_prev_match_id: null },
  { id: "r1m2", participants: [ { name: "Trent Sprenkle", seed: null, school: "Minnesota" }, { name: "Vince Rodriquez", seed: null, school: "Ohio State" } ], winner: "Trent Sprenkle", score: "Fall 2:23", winner_next_match_id: "r2m1", winner_prev_match_id: null, loser_prev_match_id: null },
  { id: "r2m7", participants: [ { name: "Jarrod Patterson", seed: 7, school: "Oklahoma" }, { name: "Nich Megaludis", seed: 10, school: "Penn State" } ], winner: "Nich Megaludis", score: "7-3", winner_next_match_id: "r3m4", winner_prev_match_id: "r1m13", loser_prev_match_id: "r1m14" },
  { id: "r1m11", participants: [ { name: "Matt Snyder", seed: 11, school: "Minnesota" }, { name: "Johnni DiJulius", seed: null, school: "Ohio State" } ], winner: "Matt Snyder", score: "3-2", winner_next_match_id: "r2m6", winner_prev_match_id: null, loser_prev_match_id: null },
  { id: "r1m6", participants: [ { name: "Tyler Iwamura", seed: null, school: "Oregon State" }, { name: "Steve Bonanno", seed: 12, school: "Rutgers" } ], winner: "Steve Bonanno", score: "6-3", winner_next_match_id: "r2m3", winner_prev_match_id: null, loser_prev_match_id: null },
  { id: "r1m4", participants: [ { name: "Shane Young", seed: null, school: "Indiana" }, { name: "Ryan Mango", seed: 8, school: "Stanford" } ], winner: "Ryan Mango", score: "10-8", winner_next_match_id: "r2m2", winner_prev_match_id: null, loser_prev_match_id: null },
  { id: "r2m2", participants: [ { name: "Levi Mele", seed: 9, school: "Cornell" }, { name: "Ryan Mango", seed: 8, school: "Stanford" } ], winner: "Ryan Mango", score: "15-6", winner_next_match_id: "r3m1", winner_prev_match_id: "r1m3", loser_prev_match_id: "r1m4" },
  { id: "r1m13", participants: [ { name: "Jarrod Patterson", seed: 7, school: "Oklahoma" }, { name: "Max Soria", seed: null, school: "Nebraska" } ], winner: "Jarrod Patterson", score: "6-1", winner_next_match_id: "r2m7", winner_prev_match_id: null, loser_prev_match_id: null },
  { id: "r3m3", participants: [ { name: "Anthony Zanetta", seed: null, school: "Wisconsin" }, { name: "Frank Perrelli", seed: 6, school: "Penn State" } ], winner: "Frank Perrelli", score: "6-3", winner_next_match_id: "r4m2", winner_prev_match_id: "r2m5", loser_prev_match_id: "r2m6" },
  { id: "r1m10", participants: [ { name: "Colton Fought", seed: null, school: "Wyoming" }, { name: "Anthony Zanetta", seed: null, school: "Wisconsin" } ], winner: "Anthony Zanetta", score: "14-4", winner_next_match_id: "r2m5", winner_prev_match_id: null, loser_prev_match_id: null },
  { id: "r1m5", participants: [ { name: "Nic Bedelyon", seed: 5, school: "Kent State" }, { name: "Cory Finch", seed: null, school: "Illinois" } ], winner: "Nic Bedelyon", score: "13-2", winner_next_match_id: "r2m3", winner_prev_match_id: null, loser_prev_match_id: null },
  { id: "r2m6", participants: [ { name: "Matt Snyder", seed: 11, school: "Minnesota" }, { name: "Frank Perrelli", seed: 6, school: "Penn State" } ], winner: "Frank Perrelli", score: "4-3 TB", winner_next_match_id: "r3m3", winner_prev_match_id: "r1m11", loser_prev_match_id: "r1m12" },
  { id: "r2m4", participants: [ { name: "Camden Eppert", seed: null, school: "Northern Iowa" }, { name: "Jesse Delgado", seed: 4, school: "Illinois" } ], winner: "Jesse Delgado", score: "Fall 5:12", winner_next_match_id: "r3m2", winner_prev_match_id: "r1m7", loser_prev_match_id: "r1m8" },
];

/**
 * Sample match click handler for demonstration purposes
 * @param {Object} match - The match object that was clicked
 */
export const sampleMatchClickHandler = (match) => {
  console.log('Match clicked:', match)
  alert(`Match: ${match.participants[0]?.name} vs ${match.participants[1]?.name}`)
};