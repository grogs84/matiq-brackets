import './App.css'
import { ChampionshipBracket, ConsolationBracket } from 'matiq-brackets'
import { sampleChampionshipMatches, sampleMatchClickHandler, sampleChampionshipBracket2 } from '../../../sample-data/championship-bracket.js'

function App() {
  // Sample consolation matches for testing the new component
  const sampleConsolationMatches = [
    {
      id: "cons_r1m1",
      participants: [
        { name: "John Doe", seed: 5, school: "State University" },
        { name: "Mike Smith", seed: 12, school: "Tech College" }
      ],
      round: "consolation-first",
      status: "upcoming"
    },
    {
      id: "cons_r1m2", 
      participants: [
        { name: "Alex Johnson", seed: 8, school: "City College" },
        { name: "Chris Williams", seed: 9, school: "Valley High" }
      ],
      round: "consolation-first",
      status: "upcoming"
    }
  ];

  return (
    <div className="min-h-screen bg-gray-100">
      <header className="bg-blue-900 text-white py-6">
        <div className="container mx-auto px-4">
          <h1 className="text-3xl font-bold text-center">
            Wrestling Bracket Development
          </h1>
          <p className="text-center text-blue-200 mt-2">
            Testing DFS positioning fix - ordered vs unordered data
          </p>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 xl:grid-cols-2 gap-8">
          {/* Championship Bracket Section */}
          <div className="mb-8">
            <h2 className="text-xl font-bold mb-4">Championship Bracket (Ordered Data)</h2>
            <div className="bg-white rounded-lg shadow-lg p-6 max-h-[calc(75vh-100px)]">
              <ChampionshipBracket 
                matches={sampleChampionshipMatches}
                onMatchClick={sampleMatchClickHandler}
              />
            </div>
          </div>
          
          {/* Consolation Bracket Section */}
          <div className="mb-8">
            <h2 className="text-xl font-bold mb-4">Consolation Bracket (New Component)</h2>
            <div className="bg-white rounded-lg shadow-lg p-6 max-h-[calc(75vh-100px)]">
              <ConsolationBracket 
                matches={sampleConsolationMatches}
                onMatchClick={sampleMatchClickHandler}
              />
            </div>
          </div>
        </div>
        
        {/* Second Championship Bracket for DFS testing */}
        {/* <div>
          <h2 className="text-xl font-bold mb-4">Championship Bracket (Unordered Data - DFS Fix Applied)</h2>
          <div className="bg-white rounded-lg shadow-lg p-6 max-h-[calc(75vh-100px)]">
            <ChampionshipBracket 
              matches={sampleChampionshipBracket2}
              onMatchClick={sampleMatchClickHandler}
            />
          </div>
        </div> */}
      </main>
    </div>
  )
}

export default App