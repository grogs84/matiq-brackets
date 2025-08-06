import { useState } from 'react'
import './App.css'
import ChampionshipBracket from './components/ChampionshipBracket'

function App() {
  const [activeTab, setActiveTab] = useState('championship')

  // Sample championship bracket matches with embedded participant data
  const sampleMatches = [
    // Round 1 (32 wrestlers, 16 matches)
    { id: "r1m1", round: 1, match: 1, participants: [ { name: "Matt McDonough [1]" }, { name: "Jared Germaine" } ], winner: "Matt McDonough", score: "Fall 3:24", nextMatch: { winner: "r2m1" }, previousMatch: { winner: null } },
    { id: "r1m2", round: 1, match: 2, participants: [ { name: "Trent Sprenkle" }, { name: "Vince Rodriquez" } ], winner: "Trent Sprenkle", score: "Fall 2:23", nextMatch: { winner: "r2m1" }, previousMatch: { winner: null } },
    { id: "r1m3", round: 1, match: 3, participants: [ { name: "Levi Mele [9]" }, { name: "Garrett Frey" } ], winner: "Levi Mele", score: "Fall 2:38", nextMatch: { winner: "r2m2" }, previousMatch: { winner: null } },
    { id: "r1m4", round: 1, match: 4, participants: [ { name: "Shane Young" }, { name: "Ryan Mango [8]" } ], winner: "Ryan Mango", score: "10-8", nextMatch: { winner: "r2m2" }, previousMatch: { winner: null } },
    { id: "r1m5", round: 1, match: 5, participants: [ { name: "Nic Bedelyon [5]" }, { name: "Cory Finch" } ], winner: "Nic Bedelyon", score: "13-2", nextMatch: { winner: "r2m3" }, previousMatch: { winner: null } },
    { id: "r1m6", round: 1, match: 6, participants: [ { name: "Tyler Iwamura" }, { name: "Steve Bonanno [12]" } ], winner: "Steve Bonanno", score: "6-3", nextMatch: { winner: "r2m3" }, previousMatch: { winner: null } },
    { id: "r1m7", round: 1, match: 7, participants: [ { name: "Joe Roth" }, { name: "Camden Eppert" } ], winner: "Camden Eppert", score: "4-3", nextMatch: { winner: "r2m4" }, previousMatch: { winner: null } },
    { id: "r1m8", round: 1, match: 8, participants: [ { name: "Jerome Robinson" }, { name: "Jesse Delgado [4]" } ], winner: "Jesse Delgado", score: "6-1", nextMatch: { winner: "r2m4" }, previousMatch: { winner: null } },
    { id: "r1m9", round: 1, match: 9, participants: [ { name: "Alan Waters [3]" }, { name: "Pat Rollins" } ], winner: "Alan Waters", score: "15-0", nextMatch: { winner: "r2m5" }, previousMatch: { winner: null } },
    { id: "r1m10", round: 1, match: 10, participants: [ { name: "Colton Fought" }, { name: "Anthony Zanetta" } ], winner: "Anthony Zanetta", score: "14-4", nextMatch: { winner: "r2m5" }, previousMatch: { winner: null } },
    { id: "r1m11", round: 1, match: 11, participants: [ { name: "Matt Snyder [11]" }, { name: "Johnni DiJulius" } ], winner: "Matt Snyder", score: "3-2", nextMatch: { winner: "r2m6" }, previousMatch: { winner: null } },
    { id: "r1m12", round: 1, match: 12, participants: [ { name: "Erik Spjut" }, { name: "Frank Perrelli [6]" } ], winner: "Frank Perrelli", score: "4-2", nextMatch: { winner: "r2m6" }, previousMatch: { winner: null } },
    { id: "r1m13", round: 1, match: 13, participants: [ { name: "Jarrod Patterson [7]" }, { name: "Max Soria" } ], winner: "Jarrod Patterson", score: "6-1", nextMatch: { winner: "r2m7" }, previousMatch: { winner: null } },
    { id: "r1m14", round: 1, match: 14, participants: [ { name: "Michael Martinez" }, { name: "Nich Megaludis [10]" } ], winner: "Nich Megaludis", score: "13-2", nextMatch: { winner: "r2m7" }, previousMatch: { winner: null } },
    { id: "r1m15", round: 1, match: 15, participants: [ { name: "Jon Morrison" }, { name: "Tony Gravely" } ], winner: "Jon Morrison", score: "16-0", nextMatch: { winner: "r2m8" }, previousMatch: { winner: null } },
    { id: "r1m16", round: 1, match: 16, participants: [ { name: "Austin Miller" }, { name: "Zachary Sanders [2]" } ], winner: "Zachary Sanders", score: "Fall 6:00", nextMatch: { winner: "r2m8" }, previousMatch: { winner: null } },

    // Round 2 (16 wrestlers, 8 matches)
    { id: "r2m1", round: 2, match: 1, participants: [ { name: "Matt McDonough" }, { name: "Trent Sprenkle" } ], winner: "Matt McDonough", score: "Fall 2:56", nextMatch: { winner: "r3m1" }, previousMatch: { wrestler1: "r1m1", wrestler2: "r1m2" } },
    { id: "r2m2", round: 2, match: 2, participants: [ { name: "Levi Mele" }, { name: "Ryan Mango" } ], winner: "Ryan Mango", score: "15-6", nextMatch: { winner: "r3m1" }, previousMatch: { wrestler1: "r1m3", wrestler2: "r1m4" } },
    { id: "r2m3", round: 2, match: 3, participants: [ { name: "Nic Bedelyon" }, { name: "Steve Bonanno" } ], winner: "Nic Bedelyon", score: "10-7", nextMatch: { winner: "r3m2" }, previousMatch: { wrestler1: "r1m5", wrestler2: "r1m6" } },
    { id: "r2m4", round: 2, match: 4, participants: [ { name: "Camden Eppert" }, { name: "Jesse Delgado" } ], winner: "Jesse Delgado", score: "Fall 5:12", nextMatch: { winner: "r3m2" }, previousMatch: { wrestler1: "r1m7", wrestler2: "r1m8" } },
    { id: "r2m5", round: 2, match: 5, participants: [ { name: "Alan Waters" }, { name: "Anthony Zanetta" } ], winner: "Anthony Zanetta", score: "4-2 OT", nextMatch: { winner: "r3m3" }, previousMatch: { wrestler1: "r1m9", wrestler2: "r1m10" } },
    { id: "r2m6", round: 2, match: 6, participants: [ { name: "Matt Snyder" }, { name: "Frank Perrelli" } ], winner: "Frank Perrelli", score: "4-3 TB", nextMatch: { winner: "r3m3" }, previousMatch: { wrestler1: "r1m11", wrestler2: "r1m12" } },
    { id: "r2m7", round: 2, match: 7, participants: [ { name: "Jarrod Patterson" }, { name: "Nich Megaludis" } ], winner: "Nich Megaludis", score: "7-3", nextMatch: { winner: "r3m4" }, previousMatch: { wrestler1: "r1m13", wrestler2: "r1m14" } },
    { id: "r2m8", round: 2, match: 8, participants: [ { name: "Jon Morrison" }, { name: "Zachary Sanders" } ], winner: "Zachary Sanders", score: "2-0", nextMatch: { winner: "r3m4" }, previousMatch: { wrestler1: "r1m15", wrestler2: "r1m16" } },

    // Round 3 (8 wrestlers, 4 matches)
    { id: "r3m1", round: 3, match: 1, participants: [ { name: "Matt McDonough" }, { name: "Ryan Mango" } ], winner: "Matt McDonough", score: "13-3", nextMatch: { winner: "r4m1" }, previousMatch: { wrestler1: "r2m1", wrestler2: "r2m2" } },
    { id: "r3m2", round: 3, match: 2, participants: [ { name: "Nic Bedelyon" }, { name: "Jesse Delgado" } ], winner: "Nic Bedelyon", score: "8-5 OT", nextMatch: { winner: "r4m1" }, previousMatch: { wrestler1: "r2m3", wrestler2: "r2m4" } },
    { id: "r3m3", round: 3, match: 3, participants: [ { name: "Anthony Zanetta" }, { name: "Frank Perrelli" } ], winner: "Frank Perrelli", score: "6-3", nextMatch: { winner: "r4m2" }, previousMatch: { wrestler1: "r2m5", wrestler2: "r2m6" } },
    { id: "r3m4", round: 3, match: 4, participants: [ { name: "Nich Megaludis" }, { name: "Zachary Sanders" } ], winner: "Nich Megaludis", score: "7-4", nextMatch: { winner: "r4m2" }, previousMatch: { wrestler1: "r2m7", wrestler2: "r2m8" } },

    // Round 4 (4 wrestlers, 2 matches)
    { id: "r4m1", round: 4, match: 1, participants: [ { name: "Matt McDonough" }, { name: "Nic Bedelyon" } ], winner: "Matt McDonough", score: "4-1", nextMatch: { winner: "r5m1" }, previousMatch: { wrestler1: "r3m1", wrestler2: "r3m2" } },
    { id: "r4m2", round: 4, match: 2, participants: [ { name: "Frank Perrelli" }, { name: "Nich Megaludis" } ], winner: "Nich Megaludis", score: "3-2 TB", nextMatch: { winner: "r5m1" }, previousMatch: { wrestler1: "r3m3", wrestler2: "r3m4" } },

    // Round 5 (Final)
    { id: "r5m1", round: 5, match: 1, participants: [ { name: "Matt McDonough" }, { name: "Nich Megaludis" } ], winner: "Matt McDonough", score: "4-1", nextMatch: { winner: null }, previousMatch: { wrestler1: "r4m1", wrestler2: "r4m2" } }
  ];

  const handleMatchClick = (match) => {
    console.log('Match clicked:', match)
    alert(`Match: ${match.participants[0]?.name} vs ${match.participants[1]?.name}`)
  }

  return (
    <div className="min-h-screen bg-gray-100">
      <header className="bg-blue-900 text-white py-6">
        <div className="container mx-auto px-4">
          <h1 className="text-3xl font-bold text-center">
            Wrestling Bracket Development
          </h1>
          <p className="text-center text-blue-200 mt-2">
            Starting fresh - building step by step
          </p>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        <div className="bg-white rounded-lg shadow-lg p-6">
          <ChampionshipBracket 
            matches={sampleMatches}
            onMatchClick={handleMatchClick}
          />
        </div>
      </main>
    </div>
  )
}

export default App
