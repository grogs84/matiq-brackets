# Shared Module API Specifications

> **Supporting document for Phase 1 Analysis**  
> **Issue #29 - Phase 1 Analysis and Planning**

## API Design for Shared Modules

This document provides detailed API specifications for the proposed shared modules, including function signatures, expected inputs/outputs, and usage examples.

---

## 1. Constants Module

### 1.1 File: `utils/constants.js`

#### **BRACKET_CONSTANTS**
```javascript
export const BRACKET_CONSTANTS = {
  // Container dimensions
  DEFAULT_CONTAINER_HEIGHT: 1200,     // Base height for tournament calculations
  DEFAULT_PADDING: 60,                // Standard padding around bracket edges
  BOTTOM_PADDING_EXTRA: 40,           // Additional bottom padding for scroll
  
  // Match box dimensions  
  MIN_MATCH_WIDTH: 220,               // Match box width for names/schools
  MIN_MATCH_HEIGHT: 110,              // Match box height for two participants
  MIN_SPACING: 50,                    // Minimum vertical space between matches
  
  // Layout spacing
  LEFT_MARGIN: 30,                    // Distance from left edge to first round
  ROUND_SPACING: 260,                 // Horizontal distance between rounds
  FIRST_MATCH_TOP_MARGIN: 100,        // Y position offset for first match
  
  // Connection lines
  MIN_HORIZONTAL_EXTENSION: 20,       // Minimum length for connecting extensions
  HORIZONTAL_EXTENSION_RATIO: 0.4,    // Fraction of gap used for extensions
  LINE_STROKE_WIDTH: 2,               // Thickness of bracket connecting lines
};
```

#### **MATCH_STYLES**
```javascript
export const MATCH_STYLES = {
  // Match box styling
  DEFAULT_FILL: "white",
  DEFAULT_STROKE: "black", 
  STROKE_WIDTH: "1.5",
  BORDER_RADIUS: "3",
  
  // Interactive states
  HOVER_FILL: "blue-50",
  HOVER_STROKE: "blue-400",
  SELECTED_FILL: "blue-100",
  SELECTED_STROKE: "blue-600",
};
```

#### **TEXT_STYLES**
```javascript
export const TEXT_STYLES = {
  // Participant information
  PARTICIPANT_NAME: "text-sm font-semibold",
  SCHOOL_NAME: "text-xs text-gray-600",
  SEED_PREFIX: "text-sm font-medium",
  
  // Match results
  WINNER_SCORE: "text-xs font-medium text-green-700",
  LOSER_SCORE: "text-xs text-gray-500",
  STATUS_TEXT: "text-xs italic text-gray-400",
};
```

---

## 2. Data Processing Module

### 2.1 File: `utils/dataProcessing.js`

#### **createMatchMap**
```javascript
/**
 * Create lookup map for matches by ID
 * @param {Array} matches - Array of match objects with id property
 * @returns {Object} Map of match.id -> match object
 */
export const createMatchMap = (matches) => {
  const matchMap = {};
  matches.forEach(match => {
    matchMap[match.id] = match;
  });
  return matchMap;
};

// Usage
const matches = [{ id: "r1m1", participants: [...] }, ...];
const matchMap = createMatchMap(matches);
// Result: { "r1m1": {...}, "r1m2": {...} }
```

#### **formatParticipantName**
```javascript
/**
 * Format participant display name with seed prefix
 * @param {Object|null} participant - Participant object with name and seed
 * @param {string} participant.name - Participant name
 * @param {number|null} participant.seed - Tournament seed (optional)
 * @returns {string} Formatted name with seed prefix (e.g., "[1] Matt McDonough")
 */
export const formatParticipantName = (participant) => {
  if (!participant) return 'TBD';
  const seed = participant.seed ? `[${participant.seed}] ` : '';
  return `${seed}${participant.name || 'TBD'}`;
};

// Usage
formatParticipantName({ name: "John Doe", seed: 1 });        // "[1] John Doe"
formatParticipantName({ name: "Jane Smith", seed: null });   // "Jane Smith"
formatParticipantName(null);                                 // "TBD"
```

#### **isWinner**
```javascript
/**
 * Determine if participant is the winner of the match
 * @param {Object} match - Match object with winner field
 * @param {string} match.winner - Name of winning participant
 * @param {Object|null} participant - Participant to check
 * @param {string} participant.name - Participant name
 * @returns {boolean} True if participant is the winner
 */
export const isWinner = (match, participant) => {
  return match.winner && participant && match.winner === participant.name;
};

// Usage
const match = { winner: "John Doe", participants: [...] };
const participant = { name: "John Doe" };
isWinner(match, participant); // true
```

#### **validateMatchData** (Future)
```javascript
/**
 * Validate match data structure and relationships
 * @param {Array} matches - Array of match objects
 * @returns {Object} Validation result with errors and warnings
 */
export const validateMatchData = (matches) => {
  // Implementation in future phases
  return { isValid: boolean, errors: [], warnings: [] };
};
```

---

## 3. SVG Helpers Module

### 3.1 File: `utils/svgHelpers.js`

#### **getMatchRightEdgeCenter**
```javascript
/**
 * Get right edge center point of a match box
 * @param {Object} position - Match position coordinates
 * @param {number} position.x - X coordinate of top-left corner
 * @param {number} position.y - Y coordinate of top-left corner
 * @param {Object} matchSize - Match dimensions
 * @param {number} matchSize.width - Match box width
 * @param {number} matchSize.height - Match box height
 * @returns {Object} Right edge center coordinates {x, y}
 */
export const getMatchRightEdgeCenter = (position, matchSize) => ({
  x: position.x + matchSize.width,
  y: position.y + matchSize.height / 2
});

// Usage
const position = { x: 100, y: 200 };
const matchSize = { width: 220, height: 110 };
const rightCenter = getMatchRightEdgeCenter(position, matchSize);
// Result: { x: 320, y: 255 }
```

#### **getMatchLeftEdgeCenter** (Future)
```javascript
/**
 * Get left edge center point of a match box
 * @param {Object} position - Match position coordinates
 * @param {Object} matchSize - Match dimensions  
 * @returns {Object} Left edge center coordinates {x, y}
 */
export const getMatchLeftEdgeCenter = (position, matchSize) => ({
  x: position.x,
  y: position.y + matchSize.height / 2
});
```

#### **getMatchTextPositions**
```javascript
/**
 * Calculate text positions for match participants with enhanced layout
 * @param {Object} position - Match position coordinates
 * @param {Object} matchSize - Match dimensions
 * @returns {Object} Text positions for participant1, participant2 with seeds and scores
 */
export const getMatchTextPositions = (position, matchSize) => ({
  participant1: {
    seedAndName: {
      x: position.x + 8,                        // Left-aligned seed and name
      y: position.y + matchSize.height * 0.28
    },
    school: {
      x: position.x + 8,                        // Left-aligned school
      y: position.y + matchSize.height * 0.42
    },
    score: {
      x: position.x + matchSize.width - 8,      // Right-aligned score
      y: position.y + matchSize.height * 0.28
    }
  },
  participant2: {
    seedAndName: {
      x: position.x + 8,                        // Left-aligned seed and name
      y: position.y + matchSize.height * 0.68
    },
    school: {
      x: position.x + 8,                        // Left-aligned school
      y: position.y + matchSize.height * 0.82
    },
    score: {
      x: position.x + matchSize.width - 8,      // Right-aligned score
      y: position.y + matchSize.height * 0.68
    }
  }
});
```

#### **calculateSafeCoordinates** (Future)
```javascript
/**
 * Validate and sanitize SVG coordinates to prevent rendering errors
 * @param {Array} coordinates - Array of coordinate values
 * @returns {Array} Filtered array of valid, finite coordinates
 */
export const calculateSafeCoordinates = (coordinates) => {
  return coordinates.filter(coord => !isNaN(coord) && isFinite(coord));
};
```

---

## 4. Layout Calculation Module

### 4.1 File: `utils/layoutCalculation.js`

#### **calculateResponsiveLayout**
```javascript
/**
 * Calculate responsive tournament tree dimensions and positions
 * @param {Array} rounds - Array of round arrays containing matches
 * @param {Object} options - Sizing options
 * @param {number} options.containerHeight - Base container height
 * @param {number} options.padding - Padding around bracket edges
 * @param {number} options.minMatchWidth - Minimum match box width
 * @param {number} options.minMatchHeight - Minimum match box height
 * @param {number} options.minSpacing - Minimum spacing between matches
 * @returns {Object} Layout result with positions, dimensions, and matchSize
 */
export const calculateResponsiveLayout = (rounds, options = {}) => {
  const {
    containerHeight = BRACKET_CONSTANTS.DEFAULT_CONTAINER_HEIGHT,
    padding = BRACKET_CONSTANTS.DEFAULT_PADDING,
    minMatchWidth = BRACKET_CONSTANTS.MIN_MATCH_WIDTH,
    minMatchHeight = BRACKET_CONSTANTS.MIN_MATCH_HEIGHT,
    minSpacing = BRACKET_CONSTANTS.MIN_SPACING
  } = options;

  // Return object structure
  return {
    positions: {
      // matchId: { x: number, y: number }
    },
    dimensions: {
      width: number,
      height: number
    },
    matchSize: {
      width: number,
      height: number
    }
  };
};

// Usage
const rounds = [
  [{ id: "r1m1" }, { id: "r1m2" }],  // Round 1: 2 matches
  [{ id: "r2m1" }]                   // Round 2: 1 match
];
const layout = calculateResponsiveLayout(rounds);
```

#### **calculateFinalDimensions**
```javascript
/**
 * Calculate final SVG dimensions including connecting lines
 * @param {Object} positions - Match position coordinates
 * @param {Object} matchSize - Match box dimensions
 * @param {Array} connectingLines - Array of line objects with coordinates
 * @param {Object} baseDimensions - Base dimensions before line calculations
 * @returns {Object} Final dimensions with width and height
 */
export const calculateFinalDimensions = (positions, matchSize, connectingLines, baseDimensions) => {
  // Collect all coordinate points
  const allXCoords = [
    ...Object.values(positions).map(p => p.x),
    ...Object.values(positions).map(p => p.x + matchSize.width),
    ...connectingLines.flatMap(line => [line.x1, line.x2])
  ].filter(coord => !isNaN(coord) && isFinite(coord));

  const allYCoords = [
    ...Object.values(positions).map(p => p.y),
    ...Object.values(positions).map(p => p.y + matchSize.height),
    ...connectingLines.flatMap(line => [line.y1, line.y2])
  ].filter(coord => !isNaN(coord) && isFinite(coord));

  const maxX = allXCoords.length > 0 ? Math.max(...allXCoords) : baseDimensions.width;
  const maxY = allYCoords.length > 0 ? Math.max(...allYCoords) : baseDimensions.height;

  return {
    width: Math.max(600, maxX + BRACKET_CONSTANTS.DEFAULT_PADDING),
    height: Math.max(400, maxY + BRACKET_CONSTANTS.BOTTOM_PADDING_EXTRA)
  };
};
```

---

## 5. Shared Components

### 5.1 File: `components/shared/BracketContainer.jsx`

```javascript
import React from 'react';

/**
 * SVG container wrapper for bracket visualization with responsive sizing
 * @param {Object} props - Component props
 * @param {React.ReactNode} props.children - SVG content to render inside container
 * @param {Object} props.dimensions - Container dimensions
 * @param {number} props.dimensions.width - SVG width
 * @param {number} props.dimensions.height - SVG height
 * @param {string} props.className - Additional CSS classes
 * @param {string} props.title - Optional bracket title
 * @param {Function} props.onContainerClick - Optional container click handler
 * @returns {React.ReactElement} BracketContainer component
 */
const BracketContainer = ({ 
  children, 
  dimensions, 
  className = "", 
  title,
  onContainerClick 
}) => {
  return (
    <div className={`bracket-container w-full ${className}`}>
      {title && <h3 className="text-lg font-bold mb-4">{title}</h3>}
      <div className="w-full overflow-x-auto overflow-y-auto max-h-[calc(100vh-200px)]">
        <svg 
          viewBox={`0 0 ${dimensions.width} ${dimensions.height}`}
          preserveAspectRatio="xMinYMin meet"
          className="w-full border border-gray-300"
          style={{ height: `${dimensions.height}px`, minHeight: '400px' }}
          onClick={onContainerClick}
        >
          {children}
        </svg>
      </div>
    </div>
  );
};

export default BracketContainer;
```

### 5.2 File: `components/shared/MatchBox.jsx`

```javascript
import React from 'react';
import { getMatchTextPositions, formatParticipantName, isWinner } from '../../utils';
import { MATCH_STYLES, TEXT_STYLES } from '../../utils/constants';

/**
 * Individual match box component with participant information
 * @param {Object} props - Component props
 * @param {Object} props.match - Match data
 * @param {Array} props.match.participants - Array of participant objects
 * @param {string} props.match.winner - Winner name (optional)
 * @param {string} props.match.score - Match score (optional)
 * @param {Object} props.position - Match position coordinates
 * @param {number} props.position.x - X coordinate
 * @param {number} props.position.y - Y coordinate
 * @param {Object} props.matchSize - Match box dimensions
 * @param {number} props.matchSize.width - Box width
 * @param {number} props.matchSize.height - Box height
 * @param {Function} props.onMatchClick - Optional click handler
 * @param {boolean} props.isClickable - Enable click interactions
 * @param {Object} props.customStyles - Override default styles
 * @returns {React.ReactElement} MatchBox component
 */
const MatchBox = ({ 
  match, 
  position, 
  matchSize, 
  onMatchClick, 
  isClickable = true,
  customStyles = {} 
}) => {
  const textPositions = getMatchTextPositions(position, matchSize);
  
  const boxStyles = {
    fill: customStyles.fill || MATCH_STYLES.DEFAULT_FILL,
    stroke: customStyles.stroke || MATCH_STYLES.DEFAULT_STROKE,
    strokeWidth: customStyles.strokeWidth || MATCH_STYLES.STROKE_WIDTH,
  };

  return (
    <g key={match.id}>
      <rect
        x={position.x}
        y={position.y}
        width={matchSize.width}
        height={matchSize.height}
        {...boxStyles}
        rx={MATCH_STYLES.BORDER_RADIUS}
        ry={MATCH_STYLES.BORDER_RADIUS}
        className={
          isClickable && onMatchClick 
            ? `cursor-pointer hover:fill-${MATCH_STYLES.HOVER_FILL} hover:stroke-${MATCH_STYLES.HOVER_STROKE}` 
            : ""
        }
        onClick={() => isClickable && onMatchClick?.(match)}
      />
      
      {/* Participant 1 */}
      <text 
        x={textPositions.participant1.seedAndName.x} 
        y={textPositions.participant1.seedAndName.y} 
        textAnchor="start" 
        className={`${TEXT_STYLES.PARTICIPANT_NAME} fill-current pointer-events-none`}
        style={{ dominantBaseline: 'middle' }}
      >
        {formatParticipantName(match.participants[0])}
      </text>
      <text 
        x={textPositions.participant1.school.x} 
        y={textPositions.participant1.school.y} 
        textAnchor="start" 
        className={`${TEXT_STYLES.SCHOOL_NAME} fill-current pointer-events-none`}
        style={{ dominantBaseline: 'middle' }}
      >
        {match.participants[0]?.school || ''}
      </text>
      {isWinner(match, match.participants[0]) && match.score && (
        <text 
          x={textPositions.participant1.score.x} 
          y={textPositions.participant1.score.y} 
          textAnchor="end" 
          className={`${TEXT_STYLES.WINNER_SCORE} fill-current pointer-events-none`}
          style={{ dominantBaseline: 'middle' }}
        >
          {match.score}
        </text>
      )}
      
      {/* Participant 2 */}
      <text 
        x={textPositions.participant2.seedAndName.x} 
        y={textPositions.participant2.seedAndName.y} 
        textAnchor="start" 
        className={`${TEXT_STYLES.PARTICIPANT_NAME} fill-current pointer-events-none`}
        style={{ dominantBaseline: 'middle' }}
      >
        {formatParticipantName(match.participants[1])}
      </text>
      <text 
        x={textPositions.participant2.school.x} 
        y={textPositions.participant2.school.y} 
        textAnchor="start" 
        className={`${TEXT_STYLES.SCHOOL_NAME} fill-current pointer-events-none`}
        style={{ dominantBaseline: 'middle' }}
      >
        {match.participants[1]?.school || ''}
      </text>
      {isWinner(match, match.participants[1]) && match.score && (
        <text 
          x={textPositions.participant2.score.x} 
          y={textPositions.participant2.score.y} 
          textAnchor="end" 
          className={`${TEXT_STYLES.WINNER_SCORE} fill-current pointer-events-none`}
          style={{ dominantBaseline: 'middle' }}
        >
          {match.score}
        </text>
      )}
      
      {/* Separator line between participants */}
      <line
        x1={position.x + 4}
        y1={position.y + matchSize.height / 2}
        x2={position.x + matchSize.width - 4}
        y2={position.y + matchSize.height / 2}
        stroke="#e5e7eb"
        strokeWidth="1"
        className="opacity-50"
      />
    </g>
  );
};

export default MatchBox;
```

### 5.3 File: `components/shared/ConnectingLines.jsx`

```javascript
import React from 'react';
import { BRACKET_CONSTANTS } from '../../utils/constants';

/**
 * SVG connecting lines component for bracket visualization
 * @param {Object} props - Component props
 * @param {Array} props.lines - Array of line objects with coordinates
 * @param {Object} props.lines[].id - Unique line identifier
 * @param {number} props.lines[].x1 - Start X coordinate
 * @param {number} props.lines[].y1 - Start Y coordinate
 * @param {number} props.lines[].x2 - End X coordinate
 * @param {number} props.lines[].y2 - End Y coordinate
 * @param {string} props.strokeColor - Line color
 * @param {number} props.strokeWidth - Line thickness
 * @param {string} props.className - Additional CSS classes
 * @returns {React.ReactElement} ConnectingLines component
 */
const ConnectingLines = ({ 
  lines, 
  strokeColor = "#d1d5db", 
  strokeWidth = BRACKET_CONSTANTS.LINE_STROKE_WIDTH,
  className = "" 
}) => {
  return (
    <>
      {lines
        .filter(line => 
          !isNaN(line.x1) && !isNaN(line.y1) && 
          !isNaN(line.x2) && !isNaN(line.y2)
        )
        .map((line) => (
          <line
            key={line.id}
            x1={line.x1}
            y1={line.y1}
            x2={line.x2}
            y2={line.y2}
            stroke={strokeColor}
            strokeWidth={strokeWidth}
            className={`opacity-60 ${className}`}
          />
        ))
      }
    </>
  );
};

export default ConnectingLines;
```

---

## 6. Usage Examples

### 6.1 Refactored ChampionshipBracket Using Shared Components

```javascript
// Future ChampionshipBracket.jsx
import React from 'react';
import { BracketContainer, MatchBox, ConnectingLines } from './shared';
import { 
  buildRoundsFromTree, 
  calculateResponsiveLayout, 
  calculateConnectingLines, 
  calculateFinalDimensions 
} from '../utils';

const ChampionshipBracket = ({ matches = [], onMatchClick }) => {
  // Championship-specific tournament logic
  const rounds = buildRoundsFromTree(matches);
  
  // Shared layout calculation
  const layout = calculateResponsiveLayout(rounds);
  const { positions, dimensions, matchSize } = layout;
  
  // Championship-specific connection logic
  const connectingLines = calculateConnectingLines(matches, positions, matchSize);
  
  // Final dimensions including lines
  const finalDimensions = calculateFinalDimensions(
    positions, 
    matchSize, 
    connectingLines, 
    dimensions
  );

  return (
    <BracketContainer 
      title="Championship Bracket"
      dimensions={finalDimensions}
    >
      <ConnectingLines lines={connectingLines} />
      
      {rounds.map((roundMatches) =>
        roundMatches.map((match) => {
          const pos = positions[match.id];
          if (!pos || isNaN(pos.x) || isNaN(pos.y)) return null;
          
          return (
            <MatchBox
              key={match.id}
              match={match}
              position={pos}
              matchSize={matchSize}
              onMatchClick={onMatchClick}
            />
          );
        })
      )}
    </BracketContainer>
  );
};

export default ChampionshipBracket;
```

### 6.2 Future ConsolationBracket Using Shared Components

```javascript
// Future ConsolationBracket.jsx
import React from 'react';
import { BracketContainer, MatchBox, ConnectingLines } from './shared';
import { 
  buildConsolationRounds,          // Consolation-specific
  calculateResponsiveLayout,       // Shared
  calculateConsolationLines,       // Consolation-specific
  calculateFinalDimensions         // Shared
} from '../utils';

const ConsolationBracket = ({ matches = [], championshipMatches = [], onMatchClick }) => {
  // Consolation-specific tournament logic
  const rounds = buildConsolationRounds(matches, championshipMatches);
  
  // Shared layout calculation
  const layout = calculateResponsiveLayout(rounds, { 
    containerHeight: 1600  // Taller for complex consolation structure
  });
  
  // Consolation-specific connection logic
  const connectingLines = calculateConsolationLines(matches, positions, matchSize);
  
  // Shared final dimension calculation
  const finalDimensions = calculateFinalDimensions(
    positions, 
    matchSize, 
    connectingLines, 
    dimensions
  );

  return (
    <BracketContainer 
      title="Consolation Bracket"
      dimensions={finalDimensions}
    >
      <ConnectingLines lines={connectingLines} />
      
      {/* Same MatchBox rendering pattern as Championship */}
      {rounds.map((roundMatches) =>
        roundMatches.map((match) => (
          <MatchBox
            key={match.id}
            match={match}
            position={positions[match.id]}
            matchSize={matchSize}
            onMatchClick={onMatchClick}
          />
        ))
      )}
    </BracketContainer>
  );
};

export default ConsolationBracket;
```

---

## 7. Implementation Notes

### 7.1 Backward Compatibility

All shared modules are designed to maintain backward compatibility:
- Existing ChampionshipBracket API remains unchanged
- Internal refactoring only - no breaking changes to public interface
- Gradual migration allows for incremental testing

### 7.2 Performance Considerations

- Pure functions enable React optimization
- Shared components use React.memo where appropriate
- Layout calculations cached when inputs haven't changed
- SVG rendering optimized for large tournament structures

### 7.3 Testing Strategy

Each module includes comprehensive test coverage:
- Unit tests for utility functions
- Component tests for shared components  
- Integration tests for complete bracket rendering
- Visual regression tests for layout changes

### 7.4 TypeScript Support (Future)

APIs designed with TypeScript compatibility:
- Clear parameter and return types
- Interface definitions for match and participant objects
- Generic types for extensibility

---

**API Version**: 1.0  
**Last Updated**: December 2024  
**Implementation Status**: Phase 1 - Specification Complete