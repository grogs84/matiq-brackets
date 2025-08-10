import './App.css'
import { ChampionshipBracket } from 'matiq-brackets'
import { sampleChampionshipMatches, sampleMatchClickHandler, sampleChampionshipBracket2 } from '../../../sample-data/championship-bracket.js'

function App() {

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
        <div className="mb-8">
          <h2 className="text-xl font-bold mb-4">Ordered Data (Original)</h2>
          <div className="bg-white rounded-lg shadow-lg p-6 max-h-[calc(150vh-200px)]">
            <ChampionshipBracket 
              matches={sampleChampionshipMatches}
              onMatchClick={sampleMatchClickHandler}
            />
          </div>
        </div>
        <div>
          <h2 className="text-xl font-bold mb-4">Unordered Data (DFS Fix Applied)</h2>
          <div className="bg-white rounded-lg shadow-lg p-6 max-h-[calc(150vh-200px)]">
            <ChampionshipBracket 
              matches={sampleChampionshipBracket2}
              onMatchClick={sampleMatchClickHandler}
            />
          </div>
        </div>
      </main>
    </div>
  )
}

export default App