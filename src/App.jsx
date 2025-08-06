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
      status: 'upcoming',
      previousMatch: { winner: 'semi1', loser: 'semi2' },
      nextMatch: { winner: null, loser: null }
    },
    {
      id: 'semi1',
      participants: [
        { id: 'w3', name: 'Sebastian Rivera', seed: 3, school: 'Northwestern' },
        { id: 'w4', name: 'Pat Glory', seed: 4, school: 'Princeton' }
      ],
      round: 'semifinals',
      status: 'upcoming',
      previousMatch: { winner: 'qf1', loser: 'qf2' },
      nextMatch: { winner: 'final', loser: null }
    },
    {
      id: 'semi2',
      participants: [
        { id: 'w5', name: 'Vito Arujau', seed: 5, school: 'Cornell' },
        { id: 'w6', name: 'Sean Russell', seed: 6, school: 'Minnesota' }
      ],
      round: 'semifinals',
      status: 'upcoming',
      previousMatch: { winner: 'qf3', loser: 'qf4' },
      nextMatch: { winner: 'final', loser: null }
    },
    {
      id: 'qf1',
      participants: [
        { id: 'w7', name: 'Austin DeSanto', seed: 7, school: 'Iowa' },
        { id: 'w8', name: 'Brandon Courtney', seed: 8, school: 'Arizona State' }
      ],
      round: 'quarterfinals',
      status: 'upcoming',
      previousMatch: { winner: null, loser: null },
      nextMatch: { winner: 'semi1', loser: null }
    },
    {
      id: 'qf2',
      participants: [
        { id: 'w9', name: 'Hayden Hidlay', seed: 9, school: 'NC State' },
        { id: 'w10', name: 'Kaleb Young', seed: 10, school: 'Iowa' }
      ],
      round: 'quarterfinals',
      status: 'upcoming',
      previousMatch: { winner: null, loser: null },
      nextMatch: { winner: 'semi1', loser: null }
    },
    {
      id: 'qf3',
      participants: [
        { id: 'w11', name: 'Jack Mueller', seed: 11, school: 'Virginia' },
        { id: 'w12', name: 'Thomas Gilman', seed: 12, school: 'Navy' }
      ],
      round: 'quarterfinals',
      status: 'upcoming',
      previousMatch: { winner: null, loser: null },
      nextMatch: { winner: 'semi2', loser: null }
    },
    {
      id: 'qf4',
      participants: [
        { id: 'w13', name: 'Jace Koelzer', seed: 13, school: 'Northern Iowa' },
        { id: 'w14', name: 'Ethan Lizak', seed: 14, school: 'Minnesota' }
      ],
      round: 'quarterfinals',
      status: 'upcoming',
      previousMatch: { winner: null, loser: null },
      nextMatch: { winner: 'semi2', loser: null }
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
