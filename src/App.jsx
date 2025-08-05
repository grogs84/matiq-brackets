import { useState } from 'react'
import './App.css'
import ChampionshipBracket from './components/ChampionshipBracket'

function App() {
  const [activeTab, setActiveTab] = useState('championship')

  // Sample championship bracket matches with embedded participant data
  const sampleMatches = [
    {
      id: 'final',
      participants: [
        { id: 'w1', name: 'Spencer Lee', seed: 1, school: 'Iowa' },
        { id: 'w2', name: 'Nick Suriano', seed: 2, school: 'Rutgers' }
      ],
      round: 'final',
      status: 'upcoming'
    },
    {
      id: 'semi1',
      participants: [
        { id: 'w3', name: 'Sebastian Rivera', seed: 3, school: 'Northwestern' },
        { id: 'w4', name: 'Pat Glory', seed: 4, school: 'Princeton' }
      ],
      round: 'semifinals',
      status: 'upcoming'
    },
    {
      id: 'semi2',
      participants: [
        { id: 'w5', name: 'Vito Arujau', seed: 5, school: 'Cornell' },
        { id: 'w6', name: 'Sean Russell', seed: 6, school: 'Minnesota' }
      ],
      round: 'semifinals',
      status: 'upcoming'
    }
  ]

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
