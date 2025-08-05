# Wrestling Bracket Component - Development Process

## Design Philosophy: Component-First Approach

**Goal**: Create reusable bracket components that define their own data contract, not components built around specific data.

**Principle**: The component dictates the data format it needs, then users adapt their data to fit that format.

## Step-by-Step Development Process

### Step 1: Define Component API & Data Contract ← **START HERE**
**What we do**: Design the ideal props and data structure for bracket components
**Output**: Clear interfaces defining what data the components expect

```javascript
// Example of what we want to define:
<WrestlingBracket 
  type="championship" 
  matches={matchesArray}
  participants={participantsArray}
  onMatchClick={handleMatchClick}
/>
```

### Step 2: Build Core Visual Components
**What we do**: Create the visual bracket components using SVG
**Focus**: Pure visual rendering based on our defined data contract
**Components**: 
- `BracketMatch` - individual match box
- `BracketConnector` - connecting lines
- `ChampionshipBracket` - main championship layout
- `ConsolationBracket` - consolation bracket layout

### Step 3: Create Positioning Algorithms
**What we do**: Build the mathematical logic for bracket layout
**Output**: Functions that calculate where each match should be positioned in SVG space
**Benefit**: Generic algorithms that work with any tournament size/format

### Step 4: Add Sample Data & Documentation
**What we do**: Create example data that fits our component's contract
**Purpose**: Show users how to structure their data to use our components
**Include**: Multiple examples (different tournament years, formats)

### Step 5: Build Demo Application
**What we do**: Use our own components to build the wrestling app
**Purpose**: Validate the component API and demonstrate usage
**Benefit**: We become our own first customer

---

## Data Contract Design Principles

### 1. Simple & Predictable
```javascript
// Good: Clear, predictable structure
const match = {
  id: "match_001",
  participants: [participant1Id, participant2Id],
  winner: participant1Id,
  round: "championship_32"
}

// Bad: Complex nested structures with magic strings
const match = {
  participants: { primary: {...}, secondary: {...} },
  outcome: { victor: "primary", method: "decision" }
}
```

### 2. Wrestling-Agnostic Where Possible
```javascript
// Good: Generic enough for other sports
const bracket = {
  type: "double_elimination",
  size: 32,
  matches: [...],
  participants: [...]
}

// Wrestling-specific details only where necessary
const wrestlingMatch = {
  ...genericMatch,
  metadata: {
    weight_class: "125",
    period_scores: [2, 3, 2]
  }
}
```

### 3. Extensible
```javascript
// Allow for future wrestling rule changes
const bracket = {
  format: "ncaa_2012", // Different formats for different years
  rules: {
    consolation_entry_points: [...],
    placement_matches: [...]
  }
}
```

---

## Step 1: Component API Design

### Core Component Hierarchy

```
WrestlingBracket (main wrapper)
├── ChampionshipBracket
│   ├── BracketMatch
│   └── BracketConnector
└── ConsolationBracket
    ├── BracketMatch
    └── BracketConnector
```

### Proposed Component APIs

#### 1. Main Wrapper Component
```javascript
<WrestlingBracket
  // Required props
  participants={participants}
  matches={matches}
  
  // Optional configuration
  format="ncaa_2012"           // Tournament format/rules
  view="both"                  // "championship" | "consolation" | "both"
  size="large"                 // "small" | "medium" | "large"
  
  // Event handlers (optional - for future interactivity)
  onMatchClick={handleMatchClick}         // Optional: MVP can omit this
  onParticipantClick={handleParticipantClick}  // Optional: Future enhancement
  
  // Styling
  theme="default"              // Custom theming
  className="custom-styles"
/>

// MVP usage (no interactivity):
<WrestlingBracket
  participants={participants}
  matches={matches}
  format="ncaa_2012"
/>

// Future usage (with interactivity):
<WrestlingBracket
  participants={participants}
  matches={matches}
  format="ncaa_2012"
  onMatchClick={(match) => showMatchDetails(match)}
/>
```

#### 2. Individual Bracket Components
```javascript
<ChampionshipBracket
  participants={participants}
  matches={championshipMatches}
  onMatchClick={handleMatchClick}
  width={800}
  height={600}
/>

<ConsolationBracket
  participants={participants}
  matches={consolationMatches}
  onMatchClick={handleMatchClick}
  width={1200}
  height={800}
/>
```

#### 3. Match Component
```javascript
<BracketMatch
  match={matchData}
  participants={[participant1, participant2]}
  position={{ x: 100, y: 200 }}
  size="standard"
  onClick={handleClick}  // Optional: only used if parent provides onMatchClick
/>

// Internal component logic will be:
// onClick={() => onClick?.(match)}  // Only calls if onClick is provided
```

### Data Contracts

#### Participant Data Structure
```javascript
const participant = {
  id: "wrestler_001",
  name: "John Smith",
  seed: 1,
  school: "Penn State",
  
  // Optional metadata
  metadata: {
    weight_class: "125",
    year: "Senior",
    record: "25-2"
  }
}
```

#### Match Data Structure
```javascript
const match = {
  id: "match_001",
  
  // Participants
  participants: ["wrestler_001", "wrestler_032"], // Array of participant IDs
  winner: "wrestler_001", // participant ID or null if not completed
  
  // Tournament structure
  round: "championship_32",  // Standardized round names
  position: 1,               // Position within the round
  
  // Results
  score: "7-2",             // Optional score
  status: "completed",      // "upcoming" | "in_progress" | "completed"
  
  // Flow (where winners/losers go next)
  nextMatch: {
    winner: "match_017",    // Next match for winner
    loser: "consi_match_045" // Next match for loser (null for elimination)
  },
  
  // Optional metadata
  metadata: {
    date: "2012-03-15",
    period_scores: [2, 3, 2],
    match_time: "4:32"
  }
}
```

#### Tournament Format Structure
```javascript
const tournamentFormat = {
  name: "ncaa_2012",
  description: "NCAA Wrestling Tournament Rules (2012)",
  
  structure: {
    participants: 32,
    championship_rounds: ["32", "16", "quarterfinals", "semifinals", "finals"],
    consolation_rounds: ["consi_r1", "consi_r2", "consi_r3", "consi_r4", "consi_r5"],
    placement_matches: ["3rd_place", "5th_place", "7th_place"]
  },
  
  rules: {
    consolation_entry_points: {
      "championship_32": "consi_r1",
      "championship_16": "consi_r2",
      // ... etc
    }
  }
}
```

---

## Key Questions to Answer

### 1. What's the minimum data needed to render a bracket?
- **Answer**: Participants array + Matches array with basic flow information

### 2. What's optional/customizable?
- Styling and theming
- Event handlers for interactivity
- Additional match/participant metadata
- Tournament format rules

### 3. How do we handle different tournament formats?
- **Approach**: Format configuration objects that define:
  - Round names and structure
  - Consolation entry rules
  - Positioning algorithms

### 4. What does the component NOT care about?
- How data is fetched or stored
- User authentication
- Tournament management/scheduling
- Real-time updates (that's the parent app's responsibility)

---

## Success Criteria

✅ **Clear API**: Component props are intuitive and well-documented  
✅ **Flexible Data**: Works with different data sources and formats  
✅ **Pure Components**: No side effects, easy to test  
✅ **Extensible**: Can handle different tournament years/rules  
✅ **Wrestling-Focused**: Handles wrestling-specific bracket flows correctly  

---

## Next Steps

1. **Validate this API design** - Does this feel right for your use case?
2. **Create sample data** that matches these contracts
3. **Build the simplest possible BracketMatch component** first
4. **Test the data flow** with mock data

---

*This document will evolve as we build and test the components*
