<!-- Use this file to provide workspace-specific custom instructions to Copilot. For more details, visit https://code.visualstudio.com/docs/copilot/copilot-customization#_use-a-githubcopilotinstructionsmd-file -->

# Wrestling Bracket Visualization - Monorepo Project

This is a **monorepo** containing reusable wrestling bracket components with a **component-first approach**. The project has evolved from a single application into a professional component library with demo and development tools.

## Project Philosophy
- **Component-First Design**: Components define their own data contracts, users adapt data to fit
- **Monorepo Structure**: Clear separation between component library, demo apps, and shared data
- **Database Agnostic**: Works with both PostgreSQL (normalized) and Neo4j (embedded) data structures
- **Pure Components**: No side effects, easy to test, clear prop interfaces
- **Embedded Data Approach**: Components expect complete data, not references to separate arrays

## Current Project Structure
```
matiq-brackets/
├── packages/matiq-brackets/         # 📦 Component library (publishable)
│   ├── src/ChampionshipBracket.jsx  # ✅ Working championship bracket component
│   └── index.js                     # ✅ Clean exports
├── apps/demo/                       # 🚀 Demo application 
│   └── src/App.jsx                  # ✅ Test harness with sample data
├── apps/storybook/                  # 📚 Component development environment
│   └── src/stories/                 # ✅ Component stories and scenarios
├── sample-data/                     # 🎯 Shared tournament data
│   └── championship-bracket.js      # ✅ Realistic 32-wrestler tournament
└── package.json                     # ✅ Workspace configuration
```

## Implementation Status
- ✅ **Monorepo Setup**: npm workspaces with proper package linking
- ✅ **Component Library**: Publishable package with clean exports  
- ✅ **Demo Application**: Full showcase at `npm run demo` (localhost:5173)
- ✅ **Storybook**: Component development at `npm run storybook` (localhost:6006)
- ✅ **ChampionshipBracket Component**: SVG rendering with embedded participant data
- ✅ **Sample Data**: Complete 5-round tournament (32→16→8→4→2→1) 
- ✅ **Tailwind Integration**: Green score styling working across monorepo
- ✅ **Click Handling**: Optional match interaction for future features
- 🔄 **Bracket Positioning**: Currently simple horizontal layout (needs tournament tree positioning)
- 📋 **Consolation Bracket**: Not started yet (complex wrestling flow)
- 📋 **Connecting Lines**: SVG lines between matches (future enhancement)

## Wrestling Bracket Specifics
- 32-man double elimination tournament structure
- Championship bracket: standard single elimination tree
- Consolation bracket: complex flow where championship losers enter at specific positions
- Unlike simple tournaments, wrestling has sport-specific advancement rules
- Multiple placement matches (3rd, 5th, 7th place)

## Technical Requirements
## Technical Requirements
- **SVG Rendering**: Precise positioning and connecting lines for bracket visualization
- **Responsive Design**: Handle large bracket structures across screen sizes
- **Tabbed UI**: Separate views for championship/consolation brackets
- **No Browser Storage**: localStorage/sessionStorage not supported in deployment
- **Tailwind CSS**: Utility-first styling approach
- **Component Library Pattern**: Clean exports and imports

## Data Structure - Embedded Participant Approach
Components expect matches with **embedded participant data** (not separate arrays):

### Current Match Structure (IMPLEMENTED)
```javascript
const match = {
  id: "final",
  participants: [
    { id: "w1", name: "Spencer Lee", seed: 1, school: "Iowa" },
    { id: "w2", name: "Nick Suriano", seed: 2, school: "Rutgers" }
  ],
  round: "final",           // "final", "semifinals", "quarterfinals", etc.
  status: "upcoming"        // "upcoming", "in_progress", "completed"
}
```

### Future Enhancements (when needed)
```javascript
const match = {
  // ... existing fields
  winner: "w1",            // ID of winning participant
  score: "7-2",           // Match score
  nextMatch: {            // Advancement logic
    winner: "final_match",
    loser: "consolation_match_id"
  }
}
```

## Current Component Usage
```javascript
// Import from component library
import { ChampionshipBracket } from 'matiq-brackets'

// Basic usage (WORKING NOW)
<ChampionshipBracket 
  matches={sampleMatches}
  onMatchClick={handleMatchClick}  // Optional click handler
/>
```

## Development Guidelines

### Current Working Approach:
- **Start Simple**: Begin with basic functionality, add complexity incrementally
- **Test as You Go**: Each component should render and work before moving to the next feature
- **Embedded Data**: Components receive complete participant data, not IDs that reference other arrays
- **SVG Rendering**: Use SVG for precise bracket positioning and future connecting lines
- **Optional Handlers**: Make click handlers and other interactive features optional props

### When Working on Components:
- Keep components pure - no side effects, clear props
- Handle missing data gracefully (participants[0]?.name || 'TBD')
- Use semantic HTML/SVG structure for accessibility
- Follow established patterns from ChampionshipBracket.jsx
- Test with sample data in both demo app and Storybook before building more complex features

### Monorepo Development Workflow:
- **Component Library**: Develop components in `packages/matiq-brackets/src/`
- **Test in Demo**: Use `npm run demo` to test components with realistic data
- **Develop in Storybook**: Use `npm run storybook` for isolated component development
- **Shared Data**: Use sample data from `sample-data/` for consistency across apps
- **Build Commands**: Use root-level npm scripts for workspace management

### When Adding Wrestling-Specific Logic:
- Focus on visual bracket layout first, tournament logic second
- Handle complex consolation bracket flows as separate component
- Consider different tournament formats/years (NCAA rule changes)
- Reference wrestling bracket PDFs and tournament documentation for accuracy

### Next Development Priorities:
1. **Bracket Positioning Algorithm**: Replace simple horizontal layout with proper tournament tree
2. **Connecting Lines**: SVG lines between related matches
3. **Consolation Bracket Component**: Handle complex double-elimination flow
4. **Match Status Visualization**: Different styling for completed/upcoming matches

## Key Challenges
1. **Consolation Bracket Flow**: Wrestling's non-linear double elimination requires complex positioning
2. **Cross-Bracket Connections**: Visual lines connecting matches between championship and consolation
3. **Bracket Positioning**: Mathematical algorithms for proper tournament tree layout
4. **Format Flexibility**: Supporting different wrestling tournament rules across years

## Available Development Commands
```bash
# Development
npm run demo          # Start demo app (localhost:5173)
npm run storybook     # Start Storybook (localhost:6006)

# Building
npm run build:demo        # Build demo application
npm run build:storybook   # Build Storybook
npm run build:all         # Build everything
```

## Files to Reference
- `packages/matiq-brackets/src/ChampionshipBracket.jsx`: Working example of component structure
- `apps/demo/src/App.jsx`: Test harness with sample data
- `sample-data/championship-bracket.js`: Complete tournament data for testing

When working on this project, prioritize reusable component design, follow wrestling-specific tournament rules, and use SVG-based visualization techniques.
