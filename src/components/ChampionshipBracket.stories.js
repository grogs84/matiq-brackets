import ChampionshipBracket from './ChampionshipBracket';

// Default export defines the metadata for the component stories
export default {
  title: 'Components/ChampionshipBracket',
  component: ChampionshipBracket,
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        component: 'Wrestling bracket component that renders championship tournament matches with SVG-based responsive layout. Supports embedded participant data and optional click handlers.'
      }
    }
  },
  argTypes: {
    matches: {
      description: 'Array of tournament match objects with embedded participant data',
      control: { type: 'object' }
    },
    onMatchClick: {
      description: 'Optional callback function for match interaction',
      control: { type: 'function' }
    }
  }
};

// Sample data for different bracket sizes
const create8WrestlerBracket = () => [
  // Round 1 (8 wrestlers, 4 matches)
  { id: "r1m1", participants: [{ name: "John Smith [1]" }, { name: "Mike Johnson" }], winner: "John Smith", score: "10-3", winner_next_match_id: "r2m1", winner_prev_match_id: null, loser_prev_match_id: null },
  { id: "r1m2", participants: [{ name: "Dave Wilson" }, { name: "Tom Brown [8]" }], winner: "Tom Brown", score: "7-5", winner_next_match_id: "r2m1", winner_prev_match_id: null, loser_prev_match_id: null },
  { id: "r1m3", participants: [{ name: "Chris Lee [4]" }, { name: "Sam Davis" }], winner: "Chris Lee", score: "Fall 2:15", winner_next_match_id: "r2m2", winner_prev_match_id: null, loser_prev_match_id: null },
  { id: "r1m4", participants: [{ name: "Alex Taylor" }, { name: "Ryan Clark [5]" }], winner: "Ryan Clark", score: "12-8", winner_next_match_id: "r2m2", winner_prev_match_id: null, loser_prev_match_id: null },
  
  // Round 2 (4 wrestlers, 2 matches)
  { id: "r2m1", participants: [{ name: "John Smith" }, { name: "Tom Brown" }], winner: "John Smith", score: "6-2", winner_next_match_id: "r3m1", winner_prev_match_id: "r1m1", loser_prev_match_id: "r1m2" },
  { id: "r2m2", participants: [{ name: "Chris Lee" }, { name: "Ryan Clark" }], winner: "Chris Lee", score: "4-1", winner_next_match_id: "r3m1", winner_prev_match_id: "r1m3", loser_prev_match_id: "r1m4" },
  
  // Round 3 (Final)
  { id: "r3m1", participants: [{ name: "John Smith" }, { name: "Chris Lee" }], winner: "John Smith", score: "8-3", winner_next_match_id: null, winner_prev_match_id: "r2m1", loser_prev_match_id: "r2m2" }
];

const create16WrestlerBracket = () => [
  // Round 1 (16 wrestlers, 8 matches)
  { id: "r1m1", participants: [{ name: "Spencer Lee [1]" }, { name: "Jake Anderson" }], winner: "Spencer Lee", score: "Fall 1:23", winner_next_match_id: "r2m1", winner_prev_match_id: null, loser_prev_match_id: null },
  { id: "r1m2", participants: [{ name: "Matt Johnson" }, { name: "Nick Rivera [16]" }], winner: "Nick Rivera", score: "9-7", winner_next_match_id: "r2m1", winner_prev_match_id: null, loser_prev_match_id: null },
  { id: "r1m3", participants: [{ name: "David Kim [8]" }, { name: "Steve Wilson" }], winner: "David Kim", score: "12-5", winner_next_match_id: "r2m2", winner_prev_match_id: null, loser_prev_match_id: null },
  { id: "r1m4", participants: [{ name: "Tony Garcia" }, { name: "Brad Miller [9]" }], winner: "Brad Miller", score: "6-3", winner_next_match_id: "r2m2", winner_prev_match_id: null, loser_prev_match_id: null },
  { id: "r1m5", participants: [{ name: "Alex Thompson [5]" }, { name: "Ryan Davis" }], winner: "Alex Thompson", score: "14-2", winner_next_match_id: "r2m3", winner_prev_match_id: null, loser_prev_match_id: null },
  { id: "r1m6", participants: [{ name: "Joe Martinez" }, { name: "Chris Taylor [12]" }], winner: "Chris Taylor", score: "Fall 3:45", winner_next_match_id: "r2m3", winner_prev_match_id: null, loser_prev_match_id: null },
  { id: "r1m7", participants: [{ name: "Mark Brown [4]" }, { name: "Dan White" }], winner: "Mark Brown", score: "8-1", winner_next_match_id: "r2m4", winner_prev_match_id: null, loser_prev_match_id: null },
  { id: "r1m8", participants: [{ name: "Kevin Jones" }, { name: "Sam Clark [13]" }], winner: "Sam Clark", score: "11-6", winner_next_match_id: "r2m4", winner_prev_match_id: null, loser_prev_match_id: null },
  
  // Round 2 (8 wrestlers, 4 matches)
  { id: "r2m1", participants: [{ name: "Spencer Lee" }, { name: "Nick Rivera" }], winner: "Spencer Lee", score: "15-0", winner_next_match_id: "r3m1", winner_prev_match_id: "r1m1", loser_prev_match_id: "r1m2" },
  { id: "r2m2", participants: [{ name: "David Kim" }, { name: "Brad Miller" }], winner: "David Kim", score: "7-4", winner_next_match_id: "r3m1", winner_prev_match_id: "r1m3", loser_prev_match_id: "r1m4" },
  { id: "r2m3", participants: [{ name: "Alex Thompson" }, { name: "Chris Taylor" }], winner: "Alex Thompson", score: "5-2", winner_next_match_id: "r3m2", winner_prev_match_id: "r1m5", loser_prev_match_id: "r1m6" },
  { id: "r2m4", participants: [{ name: "Mark Brown" }, { name: "Sam Clark" }], winner: "Mark Brown", score: "9-4", winner_next_match_id: "r3m2", winner_prev_match_id: "r1m7", loser_prev_match_id: "r1m8" },
  
  // Round 3 (4 wrestlers, 2 matches)
  { id: "r3m1", participants: [{ name: "Spencer Lee" }, { name: "David Kim" }], winner: "Spencer Lee", score: "6-1", winner_next_match_id: "r4m1", winner_prev_match_id: "r2m1", loser_prev_match_id: "r2m2" },
  { id: "r3m2", participants: [{ name: "Alex Thompson" }, { name: "Mark Brown" }], winner: "Mark Brown", score: "3-2 OT", winner_next_match_id: "r4m1", winner_prev_match_id: "r2m3", loser_prev_match_id: "r2m4" },
  
  // Round 4 (Final)
  { id: "r4m1", participants: [{ name: "Spencer Lee" }, { name: "Mark Brown" }], winner: "Spencer Lee", score: "11-5", winner_next_match_id: null, winner_prev_match_id: "r3m1", loser_prev_match_id: "r3m2" }
];

// Full 32-wrestler tournament data from App.jsx
const create32WrestlerBracket = () => [
  // Round 1 (32 wrestlers, 16 matches)
  { id: "r1m1", participants: [ { name: "Matt McDonough [1]" }, { name: "Jared Germaine" } ], winner: "Matt McDonough", score: "Fall 3:24", winner_next_match_id: "r2m1", winner_prev_match_id: null, loser_prev_match_id: null },
  { id: "r1m2", participants: [ { name: "Trent Sprenkle" }, { name: "Vince Rodriquez" } ], winner: "Trent Sprenkle", score: "Fall 2:23", winner_next_match_id: "r2m1", winner_prev_match_id: null, loser_prev_match_id: null },
  { id: "r1m3", participants: [ { name: "Levi Mele [9]" }, { name: "Garrett Frey" } ], winner: "Levi Mele", score: "Fall 2:38", winner_next_match_id: "r2m2", winner_prev_match_id: null, loser_prev_match_id: null },
  { id: "r1m4", participants: [ { name: "Shane Young" }, { name: "Ryan Mango [8]" } ], winner: "Ryan Mango", score: "10-8", winner_next_match_id: "r2m2", winner_prev_match_id: null, loser_prev_match_id: null },
  { id: "r1m5", participants: [ { name: "Nic Bedelyon [5]" }, { name: "Cory Finch" } ], winner: "Nic Bedelyon", score: "13-2", winner_next_match_id: "r2m3", winner_prev_match_id: null, loser_prev_match_id: null },
  { id: "r1m6", participants: [ { name: "Tyler Iwamura" }, { name: "Steve Bonanno [12]" } ], winner: "Steve Bonanno", score: "6-3", winner_next_match_id: "r2m3", winner_prev_match_id: null, loser_prev_match_id: null },
  { id: "r1m7", participants: [ { name: "Joe Roth" }, { name: "Camden Eppert" } ], winner: "Camden Eppert", score: "4-3", winner_next_match_id: "r2m4", winner_prev_match_id: null, loser_prev_match_id: null },
  { id: "r1m8", participants: [ { name: "Jerome Robinson" }, { name: "Jesse Delgado [4]" } ], winner: "Jesse Delgado", score: "6-1", winner_next_match_id: "r2m4", winner_prev_match_id: null, loser_prev_match_id: null },
  { id: "r1m9", participants: [ { name: "Alan Waters [3]" }, { name: "Pat Rollins" } ], winner: "Alan Waters", score: "15-0", winner_next_match_id: "r2m5", winner_prev_match_id: null, loser_prev_match_id: null },
  { id: "r1m10", participants: [ { name: "Colton Fought" }, { name: "Anthony Zanetta" } ], winner: "Anthony Zanetta", score: "14-4", winner_next_match_id: "r2m5", winner_prev_match_id: null, loser_prev_match_id: null },
  { id: "r1m11", participants: [ { name: "Matt Snyder [11]" }, { name: "Johnni DiJulius" } ], winner: "Matt Snyder", score: "3-2", winner_next_match_id: "r2m6", winner_prev_match_id: null, loser_prev_match_id: null },
  { id: "r1m12", participants: [ { name: "Erik Spjut" }, { name: "Frank Perrelli [6]" } ], winner: "Frank Perrelli", score: "4-2", winner_next_match_id: "r2m6", winner_prev_match_id: null, loser_prev_match_id: null },
  { id: "r1m13", participants: [ { name: "Jarrod Patterson [7]" }, { name: "Max Soria" } ], winner: "Jarrod Patterson", score: "6-1", winner_next_match_id: "r2m7", winner_prev_match_id: null, loser_prev_match_id: null },
  { id: "r1m14", participants: [ { name: "Michael Martinez" }, { name: "Nich Megaludis [10]" } ], winner: "Nich Megaludis", score: "13-2", winner_next_match_id: "r2m7", winner_prev_match_id: null, loser_prev_match_id: null },
  { id: "r1m15", participants: [ { name: "Jon Morrison" }, { name: "Tony Gravely" } ], winner: "Jon Morrison", score: "16-0", winner_next_match_id: "r2m8", winner_prev_match_id: null, loser_prev_match_id: null },
  { id: "r1m16", participants: [ { name: "Austin Miller" }, { name: "Zachary Sanders [2]" } ], winner: "Zachary Sanders", score: "Fall 6:00", winner_next_match_id: "r2m8", winner_prev_match_id: null, loser_prev_match_id: null },

  // Round 2 (16 wrestlers, 8 matches)
  { id: "r2m1", participants: [ { name: "Matt McDonough" }, { name: "Trent Sprenkle" } ], winner: "Matt McDonough", score: "Fall 2:56", winner_next_match_id: "r3m1", winner_prev_match_id: "r1m1", loser_prev_match_id: "r1m2" },
  { id: "r2m2", participants: [ { name: "Levi Mele" }, { name: "Ryan Mango" } ], winner: "Ryan Mango", score: "15-6", winner_next_match_id: "r3m1", winner_prev_match_id: "r1m3", loser_prev_match_id: "r1m4" },
  { id: "r2m3", participants: [ { name: "Nic Bedelyon" }, { name: "Steve Bonanno" } ], winner: "Nic Bedelyon", score: "10-7", winner_next_match_id: "r3m2", winner_prev_match_id: "r1m5", loser_prev_match_id: "r1m6" },
  { id: "r2m4", participants: [ { name: "Camden Eppert" }, { name: "Jesse Delgado" } ], winner: "Jesse Delgado", score: "Fall 5:12", winner_next_match_id: "r3m2", winner_prev_match_id: "r1m7", loser_prev_match_id: "r1m8" },
  { id: "r2m5", participants: [ { name: "Alan Waters" }, { name: "Anthony Zanetta" } ], winner: "Anthony Zanetta", score: "4-2 OT", winner_next_match_id: "r3m3", winner_prev_match_id: "r1m9", loser_prev_match_id: "r1m10" },
  { id: "r2m6", participants: [ { name: "Matt Snyder" }, { name: "Frank Perrelli" } ], winner: "Frank Perrelli", score: "4-3 TB", winner_next_match_id: "r3m3", winner_prev_match_id: "r1m11", loser_prev_match_id: "r1m12" },
  { id: "r2m7", participants: [ { name: "Jarrod Patterson" }, { name: "Nich Megaludis" } ], winner: "Nich Megaludis", score: "7-3", winner_next_match_id: "r3m4", winner_prev_match_id: "r1m13", loser_prev_match_id: "r1m14" },
  { id: "r2m8", participants: [ { name: "Jon Morrison" }, { name: "Zachary Sanders" } ], winner: "Zachary Sanders", score: "2-0", winner_next_match_id: "r3m4", winner_prev_match_id: "r1m15", loser_prev_match_id: "r1m16" },

  // Round 3 (8 wrestlers, 4 matches)
  { id: "r3m1", participants: [ { name: "Matt McDonough" }, { name: "Ryan Mango" } ], winner: "Matt McDonough", score: "13-3", winner_next_match_id: "r4m1", winner_prev_match_id: "r2m1", loser_prev_match_id: "r2m2" },
  { id: "r3m2", participants: [ { name: "Nic Bedelyon" }, { name: "Jesse Delgado" } ], winner: "Nic Bedelyon", score: "8-5 OT", winner_next_match_id: "r4m1", winner_prev_match_id: "r2m3", loser_prev_match_id: "r2m4" },
  { id: "r3m3", participants: [ { name: "Anthony Zanetta" }, { name: "Frank Perrelli" } ], winner: "Frank Perrelli", score: "6-3", winner_next_match_id: "r4m2", winner_prev_match_id: "r2m5", loser_prev_match_id: "r2m6" },
  { id: "r3m4", participants: [ { name: "Nich Megaludis" }, { name: "Zachary Sanders" } ], winner: "Nich Megaludis", score: "7-4", winner_next_match_id: "r4m2", winner_prev_match_id: "r2m7", loser_prev_match_id: "r2m8" },

  // Round 4 (4 wrestlers, 2 matches)
  { id: "r4m1", participants: [ { name: "Matt McDonough" }, { name: "Nic Bedelyon" } ], winner: "Matt McDonough", score: "4-1", winner_next_match_id: "r5m1", winner_prev_match_id: "r3m1", loser_prev_match_id: "r3m2" },
  { id: "r4m2", participants: [ { name: "Frank Perrelli" }, { name: "Nich Megaludis" } ], winner: "Nich Megaludis", score: "3-2 TB", winner_next_match_id: "r5m1", winner_prev_match_id: "r3m3", loser_prev_match_id: "r3m4" },

  // Round 5 (Final)
  { id: "r5m1", participants: [ { name: "Matt McDonough" }, { name: "Nich Megaludis" } ], winner: "Matt McDonough", score: "4-1", winner_next_match_id: null, winner_prev_match_id: "r4m1", loser_prev_match_id: "r4m2" }
];

// Edge case data with long names and special scenarios
const createLongNamesData = () => [
  { id: "r1m1", participants: [{ name: "Christopher Alexander Montgomery III [1]", school: "University of Pennsylvania" }, { name: "Maximilian Sebastian Rodriguez-Johnson", school: "California State University" }], winner: "Christopher Alexander Montgomery III", score: "Fall 3:24", winner_next_match_id: "r2m1", winner_prev_match_id: null, loser_prev_match_id: null },
  { id: "r1m2", participants: [{ name: "Jonathan Michael Thompson-Williams" }, { name: "Benjamin Alexander Davis-Smith [16]" }], winner: "Benjamin Alexander Davis-Smith", score: "12-10 OT", winner_next_match_id: "r2m1", winner_prev_match_id: null, loser_prev_match_id: null },
  { id: "r2m1", participants: [{ name: "Christopher Alexander Montgomery III" }, { name: "Benjamin Alexander Davis-Smith" }], winner: "Christopher Alexander Montgomery III", score: "8-3", winner_next_match_id: null, winner_prev_match_id: "r1m1", loser_prev_match_id: "r1m2" }
];

const createMissingDataScenario = () => [
  { id: "r1m1", participants: [{ name: "John Smith [1]" }, null], winner: null, score: null, winner_next_match_id: "r2m1", winner_prev_match_id: null, loser_prev_match_id: null },
  { id: "r1m2", participants: [null, { name: "Mike Johnson [16]" }], winner: "Mike Johnson", score: "Forfeit", winner_next_match_id: "r2m1", winner_prev_match_id: null, loser_prev_match_id: null },
  { id: "r2m1", participants: [{ name: "John Smith" }, { name: "Mike Johnson" }], winner: null, score: null, winner_next_match_id: null, winner_prev_match_id: "r1m1", loser_prev_match_id: "r1m2" }
];

// Story definitions
export const Default = {
  args: {
    matches: create32WrestlerBracket(),
    onMatchClick: (match) => {
      console.log('Match clicked:', match);
      alert(`Match: ${match.participants[0]?.name || 'TBD'} vs ${match.participants[1]?.name || 'TBD'}`);
    }
  }
};

export const SmallBracket8Wrestlers = {
  args: {
    matches: create8WrestlerBracket(),
    onMatchClick: (match) => console.log('8-wrestler match clicked:', match)
  }
};

export const MediumBracket16Wrestlers = {
  args: {
    matches: create16WrestlerBracket(),
    onMatchClick: (match) => console.log('16-wrestler match clicked:', match)
  }
};

export const LargeBracket32Wrestlers = {
  args: {
    matches: create32WrestlerBracket(),
    onMatchClick: (match) => console.log('32-wrestler match clicked:', match)
  }
};

export const LongWrestlerNames = {
  args: {
    matches: createLongNamesData(),
    onMatchClick: (match) => console.log('Long names match clicked:', match)
  }
};

export const MissingParticipantData = {
  args: {
    matches: createMissingDataScenario(),
    onMatchClick: (match) => console.log('Missing data match clicked:', match)
  }
};

export const WithoutClickHandler = {
  args: {
    matches: create16WrestlerBracket()
    // No onMatchClick handler provided
  }
};

export const EmptyBracket = {
  args: {
    matches: []
  }
};