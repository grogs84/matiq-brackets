# matiq-brackets

Reusable wrestling bracket visualization components for React applications.

## Overview

This package provides TypeScript-first React components for rendering wrestling tournament brackets with embedded participant data. Designed for flexibility and extensibility, it supports multiple bracket types commonly used in wrestling tournaments.

## Features

- **🏆 Championship Bracket**: Full tournament tree with proper positioning and connecting lines
- **🔄 Consolation Bracket**: Double elimination consolation flow (planned)
- **🎯 Pigtail Bracket**: Play-in/preliminary matches (planned)
- **⚡ TypeScript**: Full type safety with comprehensive interfaces
- **🎨 Responsive**: SVG-based rendering with responsive layout
- **🔧 Customizable**: Extensible component API and styling

## Installation

As a workspace dependency (current setup):
```json
{
  "dependencies": {
    "matiq-brackets": "workspace:*"
  }
}
```

For npm publishing (future):
```bash
npm install matiq-brackets
```

## Quick Start

```tsx
import React from 'react';
import { ChampionshipBracket } from 'matiq-brackets';
import type { Match } from 'matiq-brackets';

const matches: Match[] = [
  {
    id: "final",
    participants: [
      { name: "Matt McDonough", seed: 1, school: "Iowa" },
      { name: "Nich Megaludis", seed: 10, school: "Penn State" }
    ],
    winner: "Matt McDonough",
    score: "4-1",
    winner_next_match_id: null,
    winner_prev_match_id: "semifinal1",
    loser_prev_match_id: "semifinal2"
  }
  // ... more matches
];

function App() {
  return (
    <ChampionshipBracket 
      matches={matches}
      onMatchClick={(match) => console.log('Match clicked:', match)}
    />
  );
}
```

## API Reference

### ChampionshipBracket

Props:
- `matches?: Match[]` - Array of tournament matches with embedded participant data
- `onMatchClick?: (match: Match) => void` - Optional click handler

### Data Format

```typescript
interface Match {
  id: string;
  participants: [Participant?, Participant?];
  winner?: string;
  score?: string;
  winner_next_match_id?: string | null;
  winner_prev_match_id?: string | null;
  loser_prev_match_id?: string | null;
}

interface Participant {
  id?: string;
  name: string;
  seed?: number | null;
  school?: string;
}
```

## Component Design Philosophy

### Embedded Data Approach
Components expect complete participant data within each match, not references to separate arrays. This makes components more predictable and easier to test.

```typescript
// ✅ Good: Embedded participant data
const match = {
  participants: [
    { name: "Spencer Lee", seed: 1, school: "Iowa" },
    { name: "Nick Suriano", seed: 2, school: "Rutgers" }
  ]
};

// ❌ Avoid: References requiring external lookup
const match = {
  participant_ids: ["p1", "p2"]  // Requires separate participants array
};
```

### Database Agnostic
Works with both normalized (PostgreSQL) and embedded (Neo4j) data structures by using a flat match format with relationship IDs.

### Pure Components
No side effects, clear prop interfaces, easy to test and reason about.

## Future Bracket Types

### Consolation Bracket (Planned)
```tsx
import { ConsolationBracket } from 'matiq-brackets';

<ConsolationBracket 
  matches={consolationMatches}
  onMatchClick={handleClick}
/>
```

### Pigtail Bracket (Planned)
```tsx
import { PigtailBracket } from 'matiq-brackets';

<PigtailBracket 
  matches={pigtailMatches}
  onMatchClick={handleClick}
/>
```

## Styling

Components use Tailwind CSS classes but can be styled with any CSS framework:

```css
.championship-bracket {
  /* Custom styles */
}

.championship-bracket svg {
  /* SVG customization */
}
```

## Wrestling-Specific Features

- **Seed Display**: Shows tournament seeds in bracket format `[1] Wrestler Name`
- **Score Positioning**: Winner's score displayed on the right
- **School Information**: Shows competitor's institution
- **Tournament Tree**: Proper bracket positioning with connecting lines
- **Match Status**: Visual indicators for completed/upcoming matches

## Contributing

This package is designed for incremental development:

1. Start with basic functionality
2. Add complexity incrementally  
3. Test as you go
4. Follow established patterns from ChampionshipBracket

## License

MIT