import './App.css'
import { ChampionshipBracket } from 'matiq-brackets'
import { sampleMatchClickHandler, sampleChampionshipBracket2 } from '../../../sample-data/championship-bracket.js'

function App() {
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
        <div className="bg-white rounded-lg shadow-lg p-6 max-h-[calc(150vh-200px)]">
          <ChampionshipBracket 
            matches={sampleChampionshipBracket2}
            onMatchClick={sampleMatchClickHandler}
          />
        </div>
      </main>
    </div>
  )
}

export default App