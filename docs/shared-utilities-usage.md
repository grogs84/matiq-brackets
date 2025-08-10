# Shared Utilities Usage Examples

This document demonstrates how to use the new shared utilities extracted from the ChampionshipBracket component.

## Basic Imports

```typescript
// Import individual utilities
import { 
  BRACKET_CONSTANTS, 
  calculateResponsiveLayout,
  SVGBracketContainer,
  formatParticipantName,
  buildRoundsFromTree 
} from 'matiq-brackets';

// Or import everything
import * as BracketUtils from 'matiq-brackets';
```

## Using Constants

```typescript
import { BRACKET_CONSTANTS, SVG_STYLES } from 'matiq-brackets';

// Access layout constants
const matchWidth = BRACKET_CONSTANTS.MIN_MATCH_WIDTH; // 220
const matchHeight = BRACKET_CONSTANTS.MIN_MATCH_HEIGHT; // 110
const roundSpacing = BRACKET_CONSTANTS.ROUND_SPACING; // 260

// Access SVG styling constants
const containerClasses = SVG_STYLES.CONTAINER_CLASSES; // "w-full overflow-x-auto..."
const svgClasses = SVG_STYLES.SVG_CLASSES; // "w-full border border-gray-300"
```

## Using Layout Utilities

```typescript
import { calculateResponsiveLayout, buildRoundsFromTree } from 'matiq-brackets';

// Build tournament rounds from match data
const rounds = buildRoundsFromTree(matchesArray);

// Calculate responsive layout
const layout = calculateResponsiveLayout(rounds, {
  containerHeight: 800,
  minMatchWidth: 250,
  minSpacing: 60
});

// Access calculated positions and dimensions
const { positions, dimensions, matchSize } = layout;
console.log(`Tournament size: ${dimensions.width}x${dimensions.height}`);
console.log(`Match at position:`, positions['match_id']);
```

## Using Formatting Utilities

```typescript
import { formatParticipantName, isWinner } from 'matiq-brackets';

// Format participant names with seeds
const participant = { name: "John Doe", seed: 3, school: "Iowa" };
const formattedName = formatParticipantName(participant); // "[3] John Doe"

// Check if participant won
const match = { winner: "John Doe", participants: [participant, null] };
const won = isWinner(match, participant); // true
```

## Using SVGBracketContainer

```typescript
import React from 'react';
import { SVGBracketContainer } from 'matiq-brackets';

const MyBracketComponent = ({ matches }) => {
  const viewBox = { x: 0, y: 0, width: 1200, height: 800 };
  
  return (
    <SVGBracketContainer
      title="Custom Bracket"
      viewBox={viewBox}
      preserveAspectRatio="xMinYMin meet"
    >
      {/* Your SVG content here */}
      <rect x="10" y="10" width="200" height="100" fill="white" stroke="black" />
      <text x="110" y="60" textAnchor="middle">Match Box</text>
    </SVGBracketContainer>
  );
};
```

## Creating Custom Brackets

```typescript
import { 
  BRACKET_CONSTANTS,
  calculateResponsiveLayout, 
  calculateConnectingLines,
  SVGBracketContainer 
} from 'matiq-brackets';

const CustomBracket = ({ matches }) => {
  // Build rounds and calculate layout
  const rounds = buildRoundsFromTree(matches);
  const layout = calculateResponsiveLayout(rounds);
  const lines = calculateConnectingLines(matches, layout.positions, layout.matchSize);
  
  const viewBox = {
    x: 0, 
    y: 0, 
    width: layout.dimensions.width, 
    height: layout.dimensions.height
  };

  return (
    <SVGBracketContainer title="My Custom Bracket" viewBox={viewBox}>
      {/* Render connecting lines */}
      {lines.map(line => (
        <line 
          key={line.id} 
          x1={line.x1} y1={line.y1} 
          x2={line.x2} y2={line.y2}
          stroke="#ccc" 
          strokeWidth={BRACKET_CONSTANTS.LINE_STROKE_WIDTH}
        />
      ))}
      
      {/* Render matches - implement your custom match rendering here */}
      {/* ... */}
    </SVGBracketContainer>
  );
};
```

## TypeScript Types

All utilities come with complete TypeScript types:

```typescript
import type { 
  Match, 
  Participant, 
  BracketLayout, 
  TournamentRounds,
  LayoutOptions 
} from 'matiq-brackets';

// Use types for your own components
interface MyComponentProps {
  matches: Match[];
  onMatchClick?: (match: Match) => void;
}

const MyComponent: React.FC<MyComponentProps> = ({ matches }) => {
  // Implementation with full type safety
};
```

## Benefits of Using Shared Utilities

1. **Consistency**: All bracket types use the same layout algorithms and constants
2. **Type Safety**: Full TypeScript support with comprehensive type definitions  
3. **Reusability**: Utilities can be used across different bracket implementations
4. **Maintainability**: Centralized logic makes updates easier
5. **Testing**: Individual utilities can be unit tested in isolation

## Backward Compatibility

The existing `ChampionshipBracket` component continues to work exactly as before:

```typescript
import { ChampionshipBracket } from 'matiq-brackets';

// This still works unchanged
<ChampionshipBracket 
  matches={matches} 
  onMatchClick={handleClick}
/>
```