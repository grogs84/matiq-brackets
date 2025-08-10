import './App.css'
import { ChampionshipBracket, ConsolationBracket } from 'matiq-brackets'
import { sampleChampionshipMatches, sampleMatchClickHandler } from '../../../sample-data/championship-bracket.js'
import { sampleConsolationMatches } from '../../../sample-data/consolation-bracket.js'

function App() {
  return (
    <div className="min-h-screen bg-gray-100">
      <header className="bg-blue-900 text-white py-6">
        <div className="container mx-auto px-4">
          <h1 className="text-3xl font-bold text-center">
            Wrestling Bracket Development
          </h1>
          <p className="text-center text-blue-200 mt-2">
            Testing shared utilities consolidation between Championship and Consolation brackets
          </p>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 xl:grid-cols-2 gap-8">
          {/* Championship Bracket Section */}
          <div className="mb-8">
            <h2 className="text-xl font-bold mb-4">Championship Bracket (Using Shared Utilities)</h2>
            <div className="bg-white rounded-lg shadow-lg p-6 max-h-[calc(75vh-100px)]">
              <ChampionshipBracket 
                matches={sampleChampionshipMatches}
                onMatchClick={sampleMatchClickHandler}
              />
            </div>
          </div>
          
          {/* Consolation Bracket Section */}
          <div className="mb-8">
            <h2 className="text-xl font-bold mb-4">Consolation Bracket (Shared MatchBox & Utilities)</h2>
            <div className="bg-white rounded-lg shadow-lg p-6 max-h-[calc(75vh-100px)]">
              <ConsolationBracket 
                matches={sampleConsolationMatches}
                onMatchClick={sampleMatchClickHandler}
              />
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}

export default App