# matiq-brackets

A monorepo containing wrestling bracket visualization components and development tools.

## 🏗️ Project Structure

This repository is organized as a monorepo with clear separation between the component library, demo applications, and shared data:

```
matiq-brackets/
├── packages/matiq-brackets/         # 📦 Component library (publishable)
├── apps/demo/                       # 🚀 Demo application
├── apps/storybook/                  # 📚 Component documentation and testing
├── sample-data/                     # 🎯 Shared tournament data
└── package.json                     # Workspace configuration
```

## 🚀 Quick Start

### Development

```bash
# Install all dependencies
npm install

# Run demo application (http://localhost:5173)
npm run demo

# Run Storybook for component development (http://localhost:6006)  
npm run storybook
```

### Building

```bash
# Build demo application
npm run build:demo

# Build Storybook
npm run build:storybook

# Build everything
npm run build:all
```

## 📦 Component Library (`packages/matiq-brackets`)

The core wrestling bracket components for React applications.

### Installation

```bash
npm install matiq-brackets
```

### Usage

```javascript
import { ChampionshipBracket } from 'matiq-brackets';

const MyTournament = () => {
  const matches = [
    {
      id: "final",
      participants: [
        { name: "Matt McDonough", seed: 1, school: "Iowa" },
        { name: "Nick Suriano", seed: 2, school: "Rutgers" }
      ],
      winner: "Matt McDonough",
      score: "7-2"
    }
    // ... more matches
  ];

  return (
    <ChampionshipBracket 
      matches={matches}
      onMatchClick={(match) => console.log('Match clicked:', match)}
    />
  );
};
```

### Features

- **SVG-based rendering** for precise positioning and scaling
- **Embedded participant data** - no external lookups required
- **"Box pattern" connecting lines** following wrestling bracket conventions
- **Enhanced match cards** with seeds, schools, and winner-based scoring
- **Interactive matches** with optional click handlers
- **Database-agnostic design** using flat structure with pointer relationships
- **Responsive layout** that adapts to different screen sizes

## 🚀 Demo Application (`apps/demo`)

A complete showcase application demonstrating the bracket components in action. Features a full 32-wrestler championship bracket with realistic tournament data.

**Run locally:** `npm run demo`

## 📚 Storybook (`apps/storybook`)

Comprehensive component documentation and isolated testing environment with multiple scenarios:

- **Full Tournament**: Complete 32-wrestler championship bracket
- **Scenario Testing**: Finals-only, semifinals + finals for focused development
- **Edge Cases**: Long names, missing data, text overflow handling  
- **Interactive Controls**: Test with and without click handlers

**Run locally:** `npm run storybook`

## 🎯 Sample Data (`sample-data/`)

Centralized tournament data shared across demo and Storybook applications:

- **championship-bracket.js**: Complete 5-round tournament (32→16→8→4→2→1)
- Realistic wrestler names, seeds, schools, and match outcomes
- Proper `winner_next_match_id` relationships for bracket flow
- Wrestling-specific scoring formats (Falls, OT, TB decisions)

## 🛠️ Development

### Component Development

Components are developed as pure TypeScript source files with no build step. The library exports ES6 modules that work directly with modern bundlers.

### Data Structure

Components expect matches with **embedded participant data**:

```javascript
const match = {
  id: "r1m1",
  participants: [
    { name: "Matt McDonough", seed: 1, school: "Iowa" },
    { name: "Jared Germaine", seed: null, school: "Penn State" }
  ],
  winner: "Matt McDonough",
  score: "Fall 3:24",
  winner_next_match_id: "r2m1",    // Flat database structure
  winner_prev_match_id: null,
  loser_prev_match_id: null
}
```

## 📋 Available Scripts

| Command | Description |
|---------|-------------|
| `npm run demo` | Start demo application |
| `npm run storybook` | Start Storybook development server |
| `npm run build:demo` | Build demo application |
| `npm run build:storybook` | Build Storybook |
| `npm run build:all` | Build all applications |
| `npm run lint` | Run ESLint across workspace |

## 🏛️ Architecture

### Component-First Design
- Components define their own data contracts
- Users adapt data to fit component expectations  
- Pure components with no side effects

### Database Agnostic
- Works with PostgreSQL (normalized) and Neo4j (embedded) structures
- Flat database design using pointer fields (`winner_next_match_id`)
- No complex JOIN queries or graph traversals required

### Wrestling Tournament Specifics
- 32-man double elimination tournament structure
- Sport-specific advancement rules (not generic tournament logic)
- Multiple placement matches (3rd, 5th, 7th place)
- Visual styling matches NCAA bracket conventions

## 📖 Documentation

- [Component API Documentation](packages/matiq-brackets/README.md)
- [Development Guide](COMPONENT_DESIGN.md) 
- [Project Roadmap](ROADMAP.md)
- [Reference Brackets](brackets/) - NCAA bracket PDFs for accuracy

## 🤝 Contributing

1. Clone the repository
2. Run `npm install` to install dependencies
3. Use `npm run demo` or `npm run storybook` for development
4. Make changes to components in `packages/matiq-brackets/`
5. Test in both demo and Storybook
6. Submit a pull request

## 📄 License

MIT - See [LICENSE](LICENSE) for details.