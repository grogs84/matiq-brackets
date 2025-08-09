# Phase 1: Code Inventory and Extraction Analysis

## Overview
This document provides a detailed analysis of the current ChampionshipBracket.jsx implementation and identifies extractable components for shared use between ChampionshipBracket and ConsolationBracket components.

## Current ChampionshipBracket.jsx Analysis

### File Statistics
- **Total Lines**: 516
- **Functions**: 8 major functions + component
- **Constants**: 1 major constant object (BRACKET_CONSTANTS)
- **Dependencies**: React only

### Extractable Components with Mapping

#### 1. Constants → `src/bracket/constants.ts`

**Source**: Lines 88-101
```javascript
const BRACKET_CONSTANTS = {
  DEFAULT_CONTAINER_HEIGHT: 1200,
  DEFAULT_PADDING: 60,
  MIN_MATCH_WIDTH: 220,
  MIN_MATCH_HEIGHT: 110,
  MIN_SPACING: 50,
  LEFT_MARGIN: 30,
  ROUND_SPACING: 260,
  BOTTOM_PADDING_EXTRA: 40,
  MIN_HORIZONTAL_EXTENSION: 20,
  HORIZONTAL_EXTENSION_RATIO: 0.4,
  LINE_STROKE_WIDTH: 2,
  FIRST_MATCH_TOP_MARGIN: 100
};
```

**Extraction Status**: ✅ Ready - Self-contained constants
**Dependencies**: None
**Usage**: Referenced throughout positioning and layout calculations

#### 2. Utility Functions → `src/bracket/utils.ts`

**createMatchMap** (Lines 8-14)
- **Purpose**: Create lookup map for matches by ID
- **Dependencies**: None
- **Reusability**: High - used by both bracket types

**formatParticipantName** (Lines 69-73)
- **Purpose**: Format participant display name with seed prefix
- **Dependencies**: None  
- **Reusability**: High - common formatting logic

**isWinner** (Lines 81-83)
- **Purpose**: Determine if participant is the winner of the match
- **Dependencies**: None
- **Reusability**: High - common match logic

#### 3. Position Calculations → `src/bracket/positions.ts`

**getMatchRightEdgeCenter** (Lines 22-25)
- **Purpose**: Get right edge center point of a match box
- **Dependencies**: None
- **Reusability**: High - used in connection calculations

**getMatchTextPositions** (Lines 33-62)
- **Purpose**: Calculate text positions for match participants
- **Dependencies**: None
- **Reusability**: High - text positioning logic
- **Notes**: Contains detailed layout for seeds, names, schools, scores

#### 4. Layout Calculations → `src/bracket/layout.ts`

**calculateResponsiveLayout** (Lines 108-184)
- **Purpose**: Calculate responsive tournament tree dimensions and positions
- **Dependencies**: BRACKET_CONSTANTS
- **Reusability**: High - core layout logic
- **Complexity**: High - 76 lines of complex positioning math
- **Key Features**:
  - Responsive sizing based on container
  - Round spacing calculations
  - Vertical positioning for tournament tree
  - Dimension calculations

#### 5. Tree Building Logic → `src/bracket/tree.ts`

**buildRoundsFromTree** (Lines 190-230)
- **Purpose**: Build championship bracket rounds using flat match structure
- **Dependencies**: createMatchMap
- **Reusability**: Medium - may need consolation-specific variants
- **Complexity**: High - 40 lines of tree traversal logic
- **Database Compatibility**: Works with flat structure using next/prev match IDs

#### 6. Connection Calculations → `src/bracket/connections.ts`

**calculateConnectingLines** (Lines 239-327)
- **Purpose**: Calculate connecting lines between tournament matches
- **Dependencies**: getMatchRightEdgeCenter, BRACKET_CONSTANTS
- **Reusability**: Medium - single-elimination specific, needs consolation variants
- **Complexity**: Very High - 88 lines of complex line path calculations
- **Features**:
  - Box-pattern bracket lines
  - Horizontal extension calculations
  - Vertical connector positioning
  - Multiple line segments per connection

#### 7. SVG Container Logic → `src/components/bracket/BracketContainer.tsx`

**Current SVG Wrapper** (Lines 374-380)
- **Purpose**: Responsive SVG container with overflow handling
- **Dependencies**: Calculated dimensions
- **Reusability**: Very High - pure container logic
- **Features**:
  - Responsive viewBox
  - Overflow scroll container
  - Border and minimum size styling
  - preserveAspectRatio handling

#### 8. Validation Logic → `src/bracket/validation.ts`

**Coordinate Validation** (Lines 353-365)
- **Purpose**: Filter invalid coordinates and ensure bounds
- **Dependencies**: None
- **Reusability**: High - safety logic
- **Features**:
  - NaN and infinite number filtering
  - Safe dimension calculations with fallbacks

### Component-Specific Logic (Remains in ChampionshipBracket)

#### Match Rendering (Lines 411-510)
- SVG match box rendering
- Participant text rendering with positioning
- Winner highlighting logic
- Click interaction handling
- Score display logic

**Reasoning**: This is presentation logic specific to match display format

#### Round Iteration Logic (Lines 411-413)
- Nested loops for rounds and matches
- Match position lookup and validation

**Reasoning**: While potentially shareable, this is tightly coupled to the specific rendering approach

## Implicit Assumptions and Dependencies

### Data Structure Assumptions
1. **Match Structure**: Assumes matches have `participants[]`, `id`, `winner_next_match_id`, `winner_prev_match_id`
2. **Participant Structure**: Assumes participants have `name`, `seed`, `school`, `id`
3. **Round Structure**: Assumes tournament tree structure with clear first round identification

### Layout Assumptions
1. **Tournament Flow**: Left-to-right progression with increasing rounds
2. **Match Box Size**: Fixed width/height for all matches
3. **Connection Style**: Box-pattern bracket lines with specific horizontal extensions
4. **Coordinate System**: SVG coordinate system with top-left origin

### Browser Assumptions
1. **SVG Support**: Full SVG 1.1 support assumed
2. **CSS Support**: Modern CSS with Flexbox/Grid assumptions in container classes
3. **JavaScript Support**: ES6+ features used throughout

## Complexity Analysis

### High Complexity (Requires Careful Extraction)
1. **calculateConnectingLines** - 88 lines, complex path calculation
2. **calculateResponsiveLayout** - 76 lines, multiple interdependent calculations
3. **buildRoundsFromTree** - 40 lines, tree traversal with edge cases

### Medium Complexity (Straightforward Extraction)
1. **getMatchTextPositions** - Well-defined input/output
2. **Validation Logic** - Clear utility functions

### Low Complexity (Easy Extraction)
1. **Constants** - Self-contained values
2. **Simple Utilities** - createMatchMap, formatParticipantName, isWinner
3. **BracketContainer** - Pure container component

## Risk Assessment

### Low Risk Extractions
- Constants and simple utilities
- BracketContainer component
- Basic validation functions

### Medium Risk Extractions
- Layout calculations (dependencies on constants)
- Position calculations (coordinate system assumptions)

### High Risk Extractions
- Connection line calculations (complex interdependencies)
- Tree building logic (assumptions about match structure)

## Dependencies Between Extractable Components

```
constants.ts ←── layout.ts ←── positions.ts
     ↑              ↑             ↑
     └── connections.ts ←──────────┘
            ↑
         utils.ts
```

**Recommended Extraction Order**:
1. constants.ts (no dependencies)
2. types.ts (no dependencies) 
3. utils.ts (no dependencies)
4. validation.ts (no dependencies)
5. positions.ts (depends on constants)
6. layout.ts (depends on constants, positions)
7. connections.ts (depends on constants, positions, utils)
8. BracketContainer.tsx (depends on validation)

## Next Steps for Phase 2

1. Create shared modules in recommended order
2. Implement comprehensive unit tests for each module
3. Refactor ChampionshipBracket to use shared modules with zero behavioral change
4. Validate visual regression testing setup
5. Document ConsolationBracket integration requirements