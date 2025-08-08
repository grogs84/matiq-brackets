# matiq-brackets

Wrestling bracket visualization components for React applications.

## Installation

```bash
npm install matiq-brackets
```

## Usage

```javascript
import { ChampionshipBracket } from 'matiq-brackets';

const MyTournament = () => {
  const matches = [
    // Your tournament match data with embedded participant information
    {
      id: "final",
      participants: [
        { name: "Matt McDonough", seed: 1, school: "Iowa" },
        { name: "Nick Suriano", seed: 2, school: "Rutgers" }
      ],
      winner: "Matt McDonough",
      score: "7-2",
      winner_next_match_id: null
    }
    // ... more matches
  ];

  const handleMatchClick = (match) => {
    console.log('Match clicked:', match);
  };

  return (
    <ChampionshipBracket 
      matches={matches}
      onMatchClick={handleMatchClick}  // Optional
    />
  );
};
```

## Components

### ChampionshipBracket

Renders a single-elimination tournament bracket with SVG-based visualization.

#### Props

- `matches` (Array): Tournament match data with embedded participant information
- `onMatchClick` (Function, optional): Callback when a match is clicked

#### Match Data Format

Each match should have:
- `id`: Unique match identifier
- `participants`: Array of participant objects with `name`, `seed`, and `school`
- `winner`: Name of winning participant (optional)
- `score`: Match score (optional)
- `winner_next_match_id`: ID of next match for winner (for bracket flow)

## Features

- SVG-based rendering for precise positioning
- Responsive design that scales across screen sizes
- "Box pattern" connecting lines following wrestling bracket conventions
- Enhanced match cards with seeds, schools, and winner-based scoring
- Interactive match clicking (optional)
- Database-agnostic flat structure using pointer relationships

## Development

This is a pure React component library with no build step required. The components are distributed as ES6 modules that work directly with modern bundlers.

## License

MIT