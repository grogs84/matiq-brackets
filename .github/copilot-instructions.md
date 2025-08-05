<!-- Use this file to provide workspace-specific custom instructions to Copilot. For more details, visit https://code.visualstudio.com/docs/copilot/copilot-customization#_use-a-githubcopilotinstructionsmd-file -->

# Wrestling Bracket Visualization Project

This is a React + Vite application for building **reusable wrestling bracket components** with a **step-by-step, component-first approach**.

## Project Philosophy
- **Component-First Design**: Components define their own data contracts, users adapt data to fit
- **Incremental Development**: Build and test one component at a time, hands-on keyboard approach
- **Database Agnostic**: Works with both PostgreSQL (normalized) and Neo4j (embedded) data structures
- **Pure Components**: No side effects, easy to test, clear prop interfaces
- **Embedded Data Approach**: Components expect complete data, not references to separate arrays

## Current Project Structure
```
src/
├── components/
│   └── ChampionshipBracket.jsx   # ✅ Working championship bracket component
├── App.jsx                       # ✅ Test harness with sample data
├── main.jsx
└── index.css
```

## Implementation Status
- ✅ **React + Vite + Tailwind**: Development environment set up and running
- ✅ **ChampionshipBracket Component**: Basic SVG rendering with embedded participant data
- ✅ **Sample Data**: Test matches with embedded wrestler information
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
// Import component directly (no complex library structure)
import ChampionshipBracket from './components/ChampionshipBracket'

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
- Test with sample data in App.jsx before building more complex features

### When Adding Wrestling-Specific Logic:
- Focus on visual bracket layout first, tournament logic second
- Handle complex consolation bracket flows as separate component
- Consider different tournament formats/years (NCAA rule changes)
- Reference actual NCAA bracket PDFs in `/brackets` folder for accuracy

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

## Files to Reference
- `COMPONENT_DESIGN.md`: Detailed component architecture and API design
- `ROADMAP.md`: Development phases and progress tracking
- `src/components/ChampionshipBracket.jsx`: Working example of component structure
- `src/App.jsx`: Test harness with sample data
- `/brackets/*.pdf`: Actual NCAA bracket PDFs for visual reference

When working on this project, prioritize reusable component design, follow wrestling-specific tournament rules, and use SVG-based visualization techniques.
