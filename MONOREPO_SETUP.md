# Monorepo Workspace Setup

This repository has been restructured as a monorepo to support the `matiq-brackets` package as a local workspace dependency. This enables modular development and seamless local iteration between the brackets package and frontend applications.

## Project Structure

```
matiq-brackets/
├── packages/
│   └── matiq-brackets/               # Wrestling bracket components package
│       ├── src/
│       │   ├── championship/
│       │   │   └── ChampionshipBracket.tsx    # ✅ Main championship bracket component
│       │   ├── consolation/
│       │   │   └── ConsolationBracket.tsx     # 📋 Placeholder (future implementation)
│       │   ├── pigtail/
│       │   │   └── PigtailBracket.tsx         # 📋 Placeholder (future implementation)
│       │   ├── types.ts                       # ✅ Shared TypeScript types
│       │   ├── utils/
│       │   │   └── index.ts                   # ✅ Shared utility functions
│       │   └── index.ts                       # ✅ Package entry point with explicit exports
│       └── package.json                       # Package configuration
├── src/                                       # Frontend application (test harness)
│   ├── App.jsx                               # ✅ Updated to import from matiq-brackets package
│   ├── main.jsx
│   └── ...
├── package.json                              # ✅ Root workspace configuration
└── README.md
```

## Workspace Configuration

The root `package.json` includes:
- **Workspace setup**: `"workspaces": ["packages/*"]`
- **Local dependency**: `"matiq-brackets": "workspace:*"`
- **Monorepo name**: `"matiq-brackets-monorepo"`

## Package Features

### Current Implementation (✅)
- **ChampionshipBracket**: Full tournament bracket visualization
- **TypeScript support**: All components converted from JSX to TSX
- **Shared types**: Common interfaces for Match, Participant, BracketPosition, etc.
- **Utility functions**: Reusable logic for match handling and formatting
- **Explicit exports**: Clean package API with named exports

### Future Extensions (📋)
- **ConsolationBracket**: Double elimination consolation bracket
- **PigtailBracket**: Preliminary elimination/play-in matches
- **Additional utilities**: More bracket layout algorithms

## Usage

### Installing Dependencies
```bash
npm install
```
This installs all dependencies and links the workspace packages automatically.

### Importing the Package
```javascript
// Named imports (recommended)
import { ChampionshipBracket, ConsolationBracket, PigtailBracket } from 'matiq-brackets';
import type { Match, Participant, BracketType } from 'matiq-brackets';

// Specific imports
import { ChampionshipBracket } from 'matiq-brackets/championship';
import { formatParticipantName, isWinner } from 'matiq-brackets/utils';
import type { Match } from 'matiq-brackets/types';

// Default import (ChampionshipBracket)
import ChampionshipBracket from 'matiq-brackets';
```

### Example Usage
```jsx
import React from 'react';
import { ChampionshipBracket } from 'matiq-brackets';

function App() {
  const matches = [
    {
      id: "final",
      participants: [
        { name: "Matt McDonough", seed: 1, school: "Iowa" },
        { name: "Nich Megaludis", seed: 10, school: "Penn State" }
      ],
      winner: "Matt McDonough",
      score: "4-1"
    }
  ];

  return (
    <ChampionshipBracket 
      matches={matches}
      onMatchClick={(match) => console.log('Match clicked:', match)}
    />
  );
}
```

## Development Workflow

### Local Development
1. Make changes to components in `packages/matiq-brackets/src/`
2. Changes are immediately reflected in the frontend (no rebuild needed)
3. Run development server: `npm run dev`

### Building
```bash
npm run build      # Builds the frontend app
npm run lint       # Lints all code
```

### Testing Package Changes
The frontend app serves as a test harness. Any changes to the `matiq-brackets` package are immediately available when imported.

## Package API

### Components
- `ChampionshipBracket`: Main tournament bracket component
- `ConsolationBracket`: Double elimination consolation bracket (placeholder)
- `PigtailBracket`: Play-in/preliminary matches (placeholder)

### Types
- `Match`: Tournament match with participants and results
- `Participant`: Individual competitor with name, seed, school
- `BracketType`: Union type for bracket categories
- `BracketPosition`, `BracketDimensions`, `BracketLayout`: Layout types
- `ConnectingLine`: SVG line coordinates

### Utilities
- `createMatchMap`: Build lookup map from match array
- `formatParticipantName`: Format name with seed prefix
- `isWinner`: Check if participant won a match
- `buildRoundsFromMatches`: Build tournament rounds from flat data
- Various position/layout utilities

## Future Publishing

This package structure is ready for npm publishing when needed:
1. The `matiq-brackets` package has proper `package.json` with all metadata
2. Dependencies are properly declared as `peerDependencies`
3. TypeScript types are included
4. Clear exports and API surface

To publish: `cd packages/matiq-brackets && npm publish`

## Benefits

✅ **Modular Development**: Bracket logic isolated from frontend code
✅ **Local Iteration**: Changes propagate immediately without complex setup  
✅ **Type Safety**: Full TypeScript support throughout
✅ **Extensible**: Ready for additional bracket types
✅ **Clean API**: Explicit exports and clear component interfaces
✅ **Future-Ready**: Structure supports npm publishing when ready