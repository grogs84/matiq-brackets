# Bracket Architecture Documentation

## Overview

This document describes the proposed shared architecture for tournament bracket components, designed to extract common functionality from ChampionshipBracket and enable efficient development of ConsolationBracket and future bracket types.

## Design Principles

### Component-First Approach
- **Pure Components**: All bracket components are pure React components with no side effects
- **Embedded Data**: Components expect complete participant data, not references to separate arrays
- **Clear Prop Interfaces**: Well-defined TypeScript interfaces for all component props
- **Optional Handlers**: Interactive features like click handlers are optional props

### Shared Logic Philosophy
- **No Premature Generalization**: Shared modules created by copying working logic, not by abstracting prematurely
- **Zero Behavioral Change**: Refactoring existing components must maintain identical behavior
- **Incremental Extraction**: Extract modules in dependency order to minimize risk
- **Testing First**: Every shared module has comprehensive unit tests before use

## Directory Structure

```
src/
├── bracket/                          # Shared bracket utilities
│   ├── constants.ts                  # Layout constants and configuration
│   ├── types.ts                      # TypeScript interfaces and types
│   ├── layout.ts                     # Responsive sizing and canvas dimensions
│   ├── positions.ts                  # Match box coordinates and spacing
│   ├── connections.ts                # SVG path generation for bracket lines
│   └── validation.ts                 # Coordinate validation and bounds checking
├── components/
│   ├── bracket/                      # Shared bracket components
│   │   ├── BracketContainer.tsx      # SVG wrapper with viewport management
│   │   └── BracketLines.tsx          # Shared line rendering component
│   ├── championship/
│   │   └── ChampionshipBracket.tsx   # Refactored to use shared modules
│   └── consolation/
│       └── ConsolationBracket.tsx    # Will use shared modules
└── docs/
    ├── brackets-architecture.md     # This file
    └── phase1-code-inventory.md     # Detailed extraction analysis
```

## Module Responsibilities

### Core Utilities (`src/bracket/`)

#### `constants.ts`
- **Purpose**: Centralized configuration for bracket layout
- **Exports**: `BRACKET_CONSTANTS`, `BracketConfig`, `createBracketConfig()`
- **Usage**: Referenced by all other modules for consistent sizing
- **Customization**: Supports partial overrides for different bracket types

#### `types.ts`  
- **Purpose**: TypeScript interfaces for type safety and documentation
- **Key Types**: `Point`, `Dimensions`, `MatchNode`, `Round`, `Connection`
- **Type Guards**: Runtime validation functions for critical data structures
- **Extensibility**: Interfaces allow additional properties via index signatures

#### `layout.ts`
- **Purpose**: Canvas sizing and responsive layout calculations  
- **Key Functions**: 
  - `calculateBracketLayout()` - Main layout calculation
  - `computeCanvasDimensions()` - Canvas size determination
  - `calculateResponsiveLayout()` - Responsive scaling logic
- **Flexibility**: Supports container constraints and custom configurations

#### `positions.ts`
- **Purpose**: Match box positioning and coordinate calculations
- **Key Functions**:
  - `computeMatchPositions()` - Position all matches in rounds
  - `getMatchTextPositions()` - Text layout within match boxes
  - `getMatchRightEdgeCenter()` - Anchor points for connections
- **Precision**: Handles tournament tree positioning with proper centering

#### `connections.ts`
- **Purpose**: SVG path generation for bracket connecting lines
- **Key Functions**:
  - `calculateConnectingLines()` - Box-pattern bracket lines
  - `pathBetween()` - SVG path data generation
  - `computeConnectionPaths()` - Connection definition to SVG conversion
- **Styles**: Supports elbow, straight, and curved connection styles

#### `validation.ts`
- **Purpose**: Coordinate validation and bounds checking
- **Safety**: Prevents NaN/Infinity coordinates from breaking rendering
- **Development**: Provides warnings for invalid data during development
- **Fallbacks**: Graceful degradation with sensible default values

### Shared Components (`src/components/bracket/`)

#### `BracketContainer.tsx`
- **Purpose**: Responsive SVG wrapper with consistent viewport management
- **Features**:
  - Responsive viewBox with proper aspect ratio
  - Overflow scroll container for large brackets
  - Accessibility support with titles and descriptions
  - Consistent border and minimum size styling
- **Reusability**: Used by all bracket component types

#### `BracketLines.tsx`
- **Purpose**: Shared rendering for connection lines
- **Features**:
  - Filters invalid coordinates automatically
  - Configurable stroke, width, and opacity
  - Support for custom CSS classes per line
  - Optimized for performance with large line sets
- **Flexibility**: Works with any line data format from connections module

## Integration Patterns

### Bracket Component Structure

All bracket components follow this pattern:

```typescript
const BracketComponent = ({ matches, onMatchClick, config }) => {
  // 1. Build tournament rounds from flat match data
  const rounds = buildRoundsFromTree(matches);
  
  // 2. Calculate layout with responsive sizing
  const layout = calculateBracketLayout(rounds, config);
  const { positions, dimensions, matchSize } = layout;
  
  // 3. Generate connection lines
  const connectionLines = calculateConnectingLines(matches, positions, matchSize, config);
  
  // 4. Render using shared container and components
  return (
    <BracketContainer viewBoxWidth={dimensions.width} viewBoxHeight={dimensions.height}>
      <BracketLines lines={connectionLines} />
      {/* Match rendering specific to this bracket type */}
    </BracketContainer>
  );
};
```

### Data Flow

```
Raw Match Data → Tree Building → Layout Calculation → Position Calculation → Connection Generation → Rendering
     ↓               ↓               ↓                    ↓                      ↓              ↓
matches[]      Round[]      LayoutResult        positions{}         LineSegment[]    SVG Elements
```

## Testing Strategy

### Unit Testing
- **Layout Functions**: Test dimension calculations with various input sizes
- **Position Functions**: Verify deterministic positioning for known inputs
- **Connection Functions**: Validate SVG path data generation
- **Validation Functions**: Test edge cases and invalid data handling

### Visual Testing  
- **Storybook Stories**: Interactive examples for each bracket type
- **Baseline Capture**: Visual regression testing for layout changes
- **Responsive Testing**: Verify layout at different container sizes

### Integration Testing
- **No-Op Validation**: Verify refactored components produce identical output
- **Cross-Browser Testing**: Ensure SVG rendering consistency
- **Performance Testing**: Measure rendering time with large datasets

## Migration Strategy

### Phase 1: Planning and Analysis ✅
- Detailed code inventory and module mapping
- Proposed API definitions and directory structure
- Risk assessment and dependency analysis

### Phase 2: Foundation Modules
1. Create `constants.ts` and `types.ts` with comprehensive tests
2. Extract `validation.ts` with safety utilities
3. Add `BracketContainer.tsx` shared component

### Phase 3: Core Logic Extraction
1. Extract `positions.ts` with positioning utilities
2. Extract `layout.ts` with responsive calculations
3. Refactor ChampionshipBracket to use shared modules (no visual changes)

### Phase 4: Advanced Features
1. Extract `connections.ts` with line generation logic
2. Add `BracketLines.tsx` shared component
3. Complete ChampionshipBracket refactoring with comprehensive testing

### Phase 5: ConsolationBracket Integration
1. Identify consolation-specific requirements
2. Extend shared modules as needed (without breaking changes)
3. Build ConsolationBracket using shared architecture

## Benefits

### For Development
- **Reduced Duplication**: Common logic shared between bracket types
- **Faster Development**: New bracket types use proven, tested modules
- **Better Testing**: Shared modules have comprehensive unit tests
- **Consistent Behavior**: All brackets use same layout and validation logic

### For Maintenance  
- **Single Source of Truth**: Layout constants and types centrally managed
- **Easier Bug Fixes**: Fix once in shared module, applies to all brackets
- **Clearer Dependencies**: Explicit module boundaries and interfaces
- **Better Documentation**: Shared modules are well-documented with examples

### For Performance
- **Optimized Calculations**: Shared modules can be optimized once for all brackets
- **Reduced Bundle Size**: Eliminates duplicate logic across components
- **Better Caching**: Shared utilities can benefit from module-level optimizations

## Extension Points

### Custom Bracket Types
New bracket types can leverage shared modules by:
1. Using `BracketContainer` for consistent SVG setup
2. Calling layout and position utilities for match placement
3. Extending or customizing connection logic for unique flows
4. Adding bracket-specific rendering while reusing shared positioning

### Configuration Flexibility
The architecture supports customization through:
- **BracketConfig**: Partial overrides of layout constants
- **Custom Types**: Extending base interfaces with additional properties
- **Style Variants**: Different visual styles using same positioning logic
- **Responsive Breakpoints**: Custom responsive behavior for different screen sizes

## Future Considerations

- **Animation Support**: Shared modules designed to support animated bracket reveals
- **Accessibility**: Enhanced screen reader support and keyboard navigation
- **Internationalization**: Text positioning that accommodates different languages
- **Performance**: Virtualization support for very large tournament brackets
- **Export Features**: SVG export capabilities for sharing and printing