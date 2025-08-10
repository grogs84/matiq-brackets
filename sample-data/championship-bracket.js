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

export const sampleChampionshipBracket3 = [
  {
    "id": "464a0d76-fdfc-427e-961c-d46b819f31c4",
    "participants": [
      {
        "name": "shane gentry",
        "seed": null,
        "school": "maryland"
      },
      {
        "name": "jarrod patterson",
        "seed": 7,
        "school": "oklahoma"
      }
    ],
    "winner": "jarrod patterson",
    "score": "9-0",
    "winner_next_match_id": "2191c780-1992-4210-82b3-68cc750de59c",
    "winner_prev_match_id": null,
    "loser_prev_match_id": null
  },
  {
    "id": "079601b4-a548-4f59-84b1-7767cd956466",
    "participants": [
      {
        "name": "tyler iwamura",
        "seed": null,
        "school": "california-bakersfield"
      },
      {
        "name": "steve bonanno",
        "seed": 12,
        "school": "hofstra (ny)"
      }
    ],
    "winner": "steve bonanno",
    "score": "6-3",
    "winner_next_match_id": "4e121cf8-ec55-48b8-b468-5b62d9e098eb",
    "winner_prev_match_id": null,
    "loser_prev_match_id": null
  },
  {
    "id": "fff64350-d462-446f-b554-30e415b8d9db",
    "participants": [
      {
        "name": "levi mele",
        "seed": 9,
        "school": "northwestern (il)"
      },
      {
        "name": "garrett frey",
        "seed": null,
        "school": "princeton (nj)"
      }
    ],
    "winner": "levi mele",
    "score": "Fall 02:38",
    "winner_next_match_id": "d3796f63-044c-45a6-bf38-3d60a7c47006",
    "winner_prev_match_id": null,
    "loser_prev_match_id": null
  },
  {
    "id": "2191c780-1992-4210-82b3-68cc750de59c",
    "participants": [
      {
        "name": "max soria",
        "seed": null,
        "school": "buffalo (ny)"
      },
      {
        "name": "jarrod patterson",
        "seed": 7,
        "school": "oklahoma"
      }
    ],
    "winner": "jarrod patterson",
    "score": "6-1",
    "winner_next_match_id": "d3ea7979-e3a9-4f63-ba93-a7547970e2c8",
    "winner_prev_match_id": "464a0d76-fdfc-427e-961c-d46b819f31c4",
    "loser_prev_match_id": null
  },
  {
    "id": "3f320708-9610-4f11-82e1-2ad59be853e7",
    "participants": [
      {
        "name": "jon morrison",
        "seed": null,
        "school": "oklahoma state"
      },
      {
        "name": "antonio 'tony' gravely",
        "seed": null,
        "school": "appalachian state (nc)"
      }
    ],
    "winner": "jon morrison",
    "score": "16-0",
    "winner_next_match_id": "7fe1fb6f-84c4-4bbd-a349-7dd8d7763351",
    "winner_prev_match_id": null,
    "loser_prev_match_id": null
  },
  {
    "id": "4aae9a36-0069-4bf0-b606-6db76bffbfb7",
    "participants": [
      {
        "name": "erik spjut",
        "seed": null,
        "school": "virginia tech"
      },
      {
        "name": "frank perrelli",
        "seed": 6,
        "school": "cornell (ny)"
      }
    ],
    "winner": "frank perrelli",
    "score": "4-2",
    "winner_next_match_id": "850b0793-422a-4907-bedf-cd01b36a7df3",
    "winner_prev_match_id": null,
    "loser_prev_match_id": null
  },
  {
    "id": "9691a9d4-5118-4086-8709-1a23934fb748",
    "participants": [
      {
        "name": "pat rollins",
        "seed": null,
        "school": "oregon state"
      },
      {
        "name": "alan waters",
        "seed": 3,
        "school": "missouri"
      }
    ],
    "winner": "alan waters",
    "score": "15-0",
    "winner_next_match_id": "f92b8bf4-cab0-457b-86ea-e442c2bb35f4",
    "winner_prev_match_id": null,
    "loser_prev_match_id": null
  },
  {
    "id": "af461551-c6aa-4754-8003-7c5c3e3b74be",
    "participants": [
      {
        "name": "camden eppert",
        "seed": null,
        "school": "purdue (in)"
      },
      {
        "name": "joe roth",
        "seed": null,
        "school": "central michigan"
      }
    ],
    "winner": "camden eppert",
    "score": "4-3",
    "winner_next_match_id": "0bce4087-5623-49ad-89bf-d27ff9f55f5f",
    "winner_prev_match_id": null,
    "loser_prev_match_id": null
  },
  {
    "id": "af7b0d7b-1a2b-4502-bdab-cb4c6c49622a",
    "participants": [
      {
        "name": "austin miller",
        "seed": null,
        "school": "bucknell (pa)"
      },
      {
        "name": "zach sanders",
        "seed": 2,
        "school": "minnesota"
      }
    ],
    "winner": "zach sanders",
    "score": "Fall 06:00",
    "winner_next_match_id": "7fe1fb6f-84c4-4bbd-a349-7dd8d7763351",
    "winner_prev_match_id": null,
    "loser_prev_match_id": null
  },
  {
    "id": "aff767b7-0264-4934-b2db-4cf35b0296d2",
    "participants": [
      {
        "name": "trent sprenkle",
        "seed": null,
        "school": "north dakota state"
      },
      {
        "name": "vince rodriguez",
        "seed": null,
        "school": "george mason (va)"
      }
    ],
    "winner": "trent sprenkle",
    "score": "Fall 02:23",
    "winner_next_match_id": "f38f3e5a-3ac8-4f89-aca7-f16830136bdd",
    "winner_prev_match_id": null,
    "loser_prev_match_id": null
  },
  {
    "id": "bd6ff82f-6d25-4c21-bcb6-0cc1e2fac001",
    "participants": [
      {
        "name": "nic bedelyon",
        "seed": 5,
        "school": "kent state (oh)"
      },
      {
        "name": "cory 'ryak' finch",
        "seed": null,
        "school": "iowa state"
      }
    ],
    "winner": "nic bedelyon",
    "score": "13-2",
    "winner_next_match_id": "4e121cf8-ec55-48b8-b468-5b62d9e098eb",
    "winner_prev_match_id": null,
    "loser_prev_match_id": null
  },
  {
    "id": "bde45158-b10c-4795-9c58-ef66d45e7be0",
    "participants": [
      {
        "name": "nicholas 'nico' megaludis",
        "seed": 10,
        "school": "pennsylvania state"
      },
      {
        "name": "michael martinez",
        "seed": null,
        "school": "wyoming"
      }
    ],
    "winner": "nicholas 'nico' megaludis",
    "score": "13-5",
    "winner_next_match_id": "d3ea7979-e3a9-4f63-ba93-a7547970e2c8",
    "winner_prev_match_id": null,
    "loser_prev_match_id": null
  },
  {
    "id": "be06dd74-90a9-43a7-9e3f-506ce9100773",
    "participants": [
      {
        "name": "johnni dijulius",
        "seed": null,
        "school": "ohio state"
      },
      {
        "name": "matthew snyder",
        "seed": 11,
        "school": "virginia"
      }
    ],
    "winner": "matthew snyder",
    "score": "3-2",
    "winner_next_match_id": "850b0793-422a-4907-bedf-cd01b36a7df3",
    "winner_prev_match_id": null,
    "loser_prev_match_id": null
  },
  {
    "id": "c31bdf8f-b270-42f4-b171-ce887007262b",
    "participants": [
      {
        "name": "matt mcdonough",
        "seed": 1,
        "school": "iowa"
      },
      {
        "name": "jared germaine",
        "seed": null,
        "school": "eastern michigan"
      }
    ],
    "winner": "matt mcdonough",
    "score": "Fall 03:24",
    "winner_next_match_id": "f38f3e5a-3ac8-4f89-aca7-f16830136bdd",
    "winner_prev_match_id": null,
    "loser_prev_match_id": null
  },
  {
    "id": "e5afcfc6-0eed-4b5f-bcd4-bb60b3d031fc",
    "participants": [
      {
        "name": "jerome robinson",
        "seed": null,
        "school": "old dominion (va)"
      },
      {
        "name": "jesse delgado",
        "seed": 4,
        "school": "illinois"
      }
    ],
    "winner": "jesse delgado",
    "score": "6-1",
    "winner_next_match_id": "0bce4087-5623-49ad-89bf-d27ff9f55f5f",
    "winner_prev_match_id": null,
    "loser_prev_match_id": null
  },
  {
    "id": "ebe2b011-3d30-4f5b-8944-0fcbc241a893",
    "participants": [
      {
        "name": "shane young",
        "seed": null,
        "school": "west virginia"
      },
      {
        "name": "ryan mango",
        "seed": 8,
        "school": "stanford (ca)"
      }
    ],
    "winner": "ryan mango",
    "score": "10-8",
    "winner_next_match_id": "d3796f63-044c-45a6-bf38-3d60a7c47006",
    "winner_prev_match_id": null,
    "loser_prev_match_id": null
  },
  {
    "id": "fe2a75e2-5844-4181-9afa-1e76b394a2b8",
    "participants": [
      {
        "name": "coltin fought",
        "seed": null,
        "school": "north carolina state"
      },
      {
        "name": "anthony zanetta",
        "seed": null,
        "school": "pittsburgh (pa)"
      }
    ],
    "winner": "anthony zanetta",
    "score": "14-4",
    "winner_next_match_id": "f92b8bf4-cab0-457b-86ea-e442c2bb35f4",
    "winner_prev_match_id": null,
    "loser_prev_match_id": null
  },
  {
    "id": "4e121cf8-ec55-48b8-b468-5b62d9e098eb",
    "participants": [
      {
        "name": "nic bedelyon",
        "seed": 5,
        "school": "kent state (oh)"
      },
      {
        "name": "steve bonanno",
        "seed": 12,
        "school": "hofstra (ny)"
      }
    ],
    "winner": "nic bedelyon",
    "score": "10-7",
    "winner_next_match_id": "328c6836-8b2a-4475-a95f-6a2c7e192710",
    "winner_prev_match_id": "bd6ff82f-6d25-4c21-bcb6-0cc1e2fac001",
    "loser_prev_match_id": "079601b4-a548-4f59-84b1-7767cd956466"
  },
  {
    "id": "7fe1fb6f-84c4-4bbd-a349-7dd8d7763351",
    "participants": [
      {
        "name": "jon morrison",
        "seed": null,
        "school": "oklahoma state"
      },
      {
        "name": "zach sanders",
        "seed": 2,
        "school": "minnesota"
      }
    ],
    "winner": "zach sanders",
    "score": "2-0",
    "winner_next_match_id": "09198a1d-4962-42ee-91af-ac0e6bcccff2",
    "winner_prev_match_id": "af7b0d7b-1a2b-4502-bdab-cb4c6c49622a",
    "loser_prev_match_id": "3f320708-9610-4f11-82e1-2ad59be853e7"
  },
  {
    "id": "850b0793-422a-4907-bedf-cd01b36a7df3",
    "participants": [
      {
        "name": "frank perrelli",
        "seed": 6,
        "school": "cornell (ny)"
      },
      {
        "name": "matthew snyder",
        "seed": 11,
        "school": "virginia"
      }
    ],
    "winner": "frank perrelli",
    "score": "4-3",
    "winner_next_match_id": "ea5e0cb2-2a9f-4deb-87c3-e233a727d3e0",
    "winner_prev_match_id": "4aae9a36-0069-4bf0-b606-6db76bffbfb7",
    "loser_prev_match_id": "be06dd74-90a9-43a7-9e3f-506ce9100773"
  },
  {
    "id": "d3796f63-044c-45a6-bf38-3d60a7c47006",
    "participants": [
      {
        "name": "levi mele",
        "seed": 9,
        "school": "northwestern (il)"
      },
      {
        "name": "ryan mango",
        "seed": 8,
        "school": "stanford (ca)"
      }
    ],
    "winner": "ryan mango",
    "score": "15-6",
    "winner_next_match_id": "f178651e-ea2a-4786-b319-103dfb7c9931",
    "winner_prev_match_id": "ebe2b011-3d30-4f5b-8944-0fcbc241a893",
    "loser_prev_match_id": "fff64350-d462-446f-b554-30e415b8d9db"
  },
  {
    "id": "0bce4087-5623-49ad-89bf-d27ff9f55f5f",
    "participants": [
      {
        "name": "camden eppert",
        "seed": null,
        "school": "purdue (in)"
      },
      {
        "name": "jesse delgado",
        "seed": 4,
        "school": "illinois"
      }
    ],
    "winner": "jesse delgado",
    "score": "Fall 05:12",
    "winner_next_match_id": "328c6836-8b2a-4475-a95f-6a2c7e192710",
    "winner_prev_match_id": "e5afcfc6-0eed-4b5f-bcd4-bb60b3d031fc",
    "loser_prev_match_id": "af461551-c6aa-4754-8003-7c5c3e3b74be"
  },
  {
    "id": "f92b8bf4-cab0-457b-86ea-e442c2bb35f4",
    "participants": [
      {
        "name": "alan waters",
        "seed": 3,
        "school": "missouri"
      },
      {
        "name": "anthony zanetta",
        "seed": null,
        "school": "pittsburgh (pa)"
      }
    ],
    "winner": "anthony zanetta",
    "score": "4-2",
    "winner_next_match_id": "ea5e0cb2-2a9f-4deb-87c3-e233a727d3e0",
    "winner_prev_match_id": "fe2a75e2-5844-4181-9afa-1e76b394a2b8",
    "loser_prev_match_id": "9691a9d4-5118-4086-8709-1a23934fb748"
  },
  {
    "id": "d3ea7979-e3a9-4f63-ba93-a7547970e2c8",
    "participants": [
      {
        "name": "jarrod patterson",
        "seed": 7,
        "school": "oklahoma"
      },
      {
        "name": "nicholas 'nico' megaludis",
        "seed": 10,
        "school": "pennsylvania state"
      }
    ],
    "winner": "nicholas 'nico' megaludis",
    "score": "7-3",
    "winner_next_match_id": "09198a1d-4962-42ee-91af-ac0e6bcccff2",
    "winner_prev_match_id": "bde45158-b10c-4795-9c58-ef66d45e7be0",
    "loser_prev_match_id": "2191c780-1992-4210-82b3-68cc750de59c"
  },
  {
    "id": "f38f3e5a-3ac8-4f89-aca7-f16830136bdd",
    "participants": [
      {
        "name": "matt mcdonough",
        "seed": 1,
        "school": "iowa"
      },
      {
        "name": "trent sprenkle",
        "seed": null,
        "school": "north dakota state"
      }
    ],
    "winner": "matt mcdonough",
    "score": "Fall 02:56",
    "winner_next_match_id": "f178651e-ea2a-4786-b319-103dfb7c9931",
    "winner_prev_match_id": "c31bdf8f-b270-42f4-b171-ce887007262b",
    "loser_prev_match_id": "aff767b7-0264-4934-b2db-4cf35b0296d2"
  },
  {
    "id": "ea5e0cb2-2a9f-4deb-87c3-e233a727d3e0",
    "participants": [
      {
        "name": "anthony zanetta",
        "seed": null,
        "school": "pittsburgh (pa)"
      },
      {
        "name": "frank perrelli",
        "seed": 6,
        "school": "cornell (ny)"
      }
    ],
    "winner": "frank perrelli",
    "score": "6-3",
    "winner_next_match_id": "01cb0dba-6dd2-4d68-b1f1-c3d4a43b5174",
    "winner_prev_match_id": "850b0793-422a-4907-bedf-cd01b36a7df3",
    "loser_prev_match_id": "f92b8bf4-cab0-457b-86ea-e442c2bb35f4"
  },
  {
    "id": "328c6836-8b2a-4475-a95f-6a2c7e192710",
    "participants": [
      {
        "name": "nic bedelyon",
        "seed": 5,
        "school": "kent state (oh)"
      },
      {
        "name": "jesse delgado",
        "seed": 4,
        "school": "illinois"
      }
    ],
    "winner": "nic bedelyon",
    "score": "8-5",
    "winner_next_match_id": "ecc03357-62d3-48ce-a067-6f2a692ff0bf",
    "winner_prev_match_id": "4e121cf8-ec55-48b8-b468-5b62d9e098eb",
    "loser_prev_match_id": "0bce4087-5623-49ad-89bf-d27ff9f55f5f"
  },
  {
    "id": "f178651e-ea2a-4786-b319-103dfb7c9931",
    "participants": [
      {
        "name": "matt mcdonough",
        "seed": 1,
        "school": "iowa"
      },
      {
        "name": "ryan mango",
        "seed": 8,
        "school": "stanford (ca)"
      }
    ],
    "winner": "matt mcdonough",
    "score": "13-3",
    "winner_next_match_id": "ecc03357-62d3-48ce-a067-6f2a692ff0bf",
    "winner_prev_match_id": "f38f3e5a-3ac8-4f89-aca7-f16830136bdd",
    "loser_prev_match_id": "d3796f63-044c-45a6-bf38-3d60a7c47006"
  },
  {
    "id": "09198a1d-4962-42ee-91af-ac0e6bcccff2",
    "participants": [
      {
        "name": "nicholas 'nico' megaludis",
        "seed": 10,
        "school": "pennsylvania state"
      },
      {
        "name": "zach sanders",
        "seed": 2,
        "school": "minnesota"
      }
    ],
    "winner": "nicholas 'nico' megaludis",
    "score": "7-4",
    "winner_next_match_id": "01cb0dba-6dd2-4d68-b1f1-c3d4a43b5174",
    "winner_prev_match_id": "d3ea7979-e3a9-4f63-ba93-a7547970e2c8",
    "loser_prev_match_id": "7fe1fb6f-84c4-4bbd-a349-7dd8d7763351"
  },
  {
    "id": "ecc03357-62d3-48ce-a067-6f2a692ff0bf",
    "participants": [
      {
        "name": "nic bedelyon",
        "seed": 5,
        "school": "kent state (oh)"
      },
      {
        "name": "matt mcdonough",
        "seed": 1,
        "school": "iowa"
      }
    ],
    "winner": "matt mcdonough",
    "score": "15-7",
    "winner_next_match_id": "284eef04-d45f-4bf8-b7e3-015ae7e40c53",
    "winner_prev_match_id": "f178651e-ea2a-4786-b319-103dfb7c9931",
    "loser_prev_match_id": "328c6836-8b2a-4475-a95f-6a2c7e192710"
  },
  {
    "id": "01cb0dba-6dd2-4d68-b1f1-c3d4a43b5174",
    "participants": [
      {
        "name": "frank perrelli",
        "seed": 6,
        "school": "cornell (ny)"
      },
      {
        "name": "nicholas 'nico' megaludis",
        "seed": 10,
        "school": "pennsylvania state"
      }
    ],
    "winner": "nicholas 'nico' megaludis",
    "score": "3-2",
    "winner_next_match_id": "284eef04-d45f-4bf8-b7e3-015ae7e40c53",
    "winner_prev_match_id": "09198a1d-4962-42ee-91af-ac0e6bcccff2",
    "loser_prev_match_id": "ea5e0cb2-2a9f-4deb-87c3-e233a727d3e0"
  },
  {
    "id": "284eef04-d45f-4bf8-b7e3-015ae7e40c53",
    "participants": [
      {
        "name": "matt mcdonough",
        "seed": 1,
        "school": "iowa"
      },
      {
        "name": "nicholas 'nico' megaludis",
        "seed": 10,
        "school": "pennsylvania state"
      }
    ],
    "winner": "matt mcdonough",
    "score": "4-1",
    "winner_next_match_id": null,
    "winner_prev_match_id": "ecc03357-62d3-48ce-a067-6f2a692ff0bf",
    "loser_prev_match_id": "01cb0dba-6dd2-4d68-b1f1-c3d4a43b5174"
  }
];