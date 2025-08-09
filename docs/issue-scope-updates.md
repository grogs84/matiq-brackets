# Issue Scope Updates - Phase 1 Preparation

## Overview

This document prepares the scope updates for related issues (#16, #18, #19, #20, #21) based on the shared logic extraction plan. These updates align the issues with the new shared module architecture and eliminate duplicated work.

## Issue #16: Enhanced Match Cards with Scores and Seeds

### Original Scope (Before Shared Modules)
- Enhance match card display with scores, seeds, and schools
- Update ChampionshipBracket component styling
- Add winner highlighting and score positioning
- Implement responsive text layouts

### Updated Scope (After Shared Modules Available)

#### In Scope
- **Match Rendering Enhancement**: Focus on match card visual design and styling
- **Text Positioning Refinement**: Use and potentially extend `getMatchTextPositions()` from shared module
- **Winner Highlighting Logic**: Enhance existing `isWinner()` utility or add new styling utilities
- **Responsive Text Sizing**: Add responsive text sizing that works with shared layout calculations

#### Out of Scope (Now Handled by Shared Modules)
- ~~Basic text positioning calculations~~ → Available in `positions.ts`
- ~~Match box sizing logic~~ → Available in `layout.ts`
- ~~Constants for spacing and dimensions~~ → Available in `constants.ts`

#### Dependencies on Shared Modules
- **positions.ts**: Use `getMatchTextPositions()` for baseline text layout
- **constants.ts**: Reference standard match dimensions and spacing
- **types.ts**: Use standard `Participant` and `MatchNode` interfaces
- **validation.ts**: Ensure text positioning stays within match box bounds

#### Implementation Notes
- Build on shared positioning utilities rather than creating custom layouts
- Ensure enhancements work with both ChampionshipBracket and future ConsolationBracket
- Consider adding enhanced text positioning functions to shared `positions.ts` if they're reusable

### Acceptance Criteria Updates
- [ ] Enhanced match cards work with shared `BracketContainer`
- [ ] Text positioning extends shared `getMatchTextPositions()` utility
- [ ] Styling works consistently across different bracket types
- [ ] No duplication of logic available in shared modules

---

## Issue #18: SVG Container and Viewport Management

### Original Scope (Before Shared Modules)
- Implement responsive SVG container
- Add overflow handling and scrolling
- Ensure proper aspect ratio maintenance
- Handle various screen sizes and orientations

### Updated Scope (After Shared Modules Available)

#### Scope Significantly Reduced
Most of the original scope is now handled by the shared `BracketContainer` component.

#### Remaining In Scope
- **Advanced Viewport Features**: Features not covered by basic `BracketContainer`
  - Zoom controls (zoom in/out functionality)
  - Pan controls for navigating large brackets
  - Fullscreen mode toggle
  - Viewport reset/center functionality
- **Enhanced Responsive Behavior**: Advanced responsive features beyond basic container
  - Breakpoint-specific layout adjustments
  - Touch gesture handling for mobile
  - Orientation change optimizations

#### Out of Scope (Now in BracketContainer)
- ~~Basic SVG wrapper setup~~ → Available in `BracketContainer`
- ~~ViewBox management~~ → Available in `BracketContainer`
- ~~Overflow scroll container~~ → Available in `BracketContainer`
- ~~Aspect ratio preservation~~ → Available in `BracketContainer`
- ~~Basic responsive behavior~~ → Available in `BracketContainer`

#### Dependencies on Shared Modules
- **BracketContainer**: Extend or wrap for advanced viewport features
- **validation.ts**: Use bounds checking for zoom and pan limits
- **layout.ts**: Reference responsive calculations for zoom/pan constraints

#### Implementation Strategy
- Build advanced features as optional props/wrapper around `BracketContainer`
- Ensure advanced features don't break basic `BracketContainer` functionality
- Consider contributing enhancements back to shared `BracketContainer` if universally useful

### Acceptance Criteria Updates
- [ ] Advanced viewport features extend `BracketContainer` without modification
- [ ] All bracket types can benefit from advanced viewport features
- [ ] Basic viewport functionality remains in shared `BracketContainer`
- [ ] No duplication of basic SVG container logic

---

## Issue #19: Consolation Bracket Positioning and Seeding

### Original Scope (Before Shared Modules)
- Implement consolation bracket positioning logic
- Handle complex double-elimination seeding rules
- Calculate positions for cross-bracket connections
- Manage placement matches and special rounds

### Updated Scope (After Shared Modules Available)

#### In Scope (Consolation-Specific Logic)
- **Consolation Seeding Rules**: Implement wrestling-specific seeding logic for consolation bracket
- **Cross-Bracket Positioning**: Calculate positions for matches where championship losers enter consolation
- **Placement Match Positioning**: Handle 3rd, 5th, 7th place matches with special positioning requirements
- **Blood Round Logic**: Implement positioning for consolation bracket "blood rounds"
- **Consolation-Specific Spacing**: Customize spacing rules for consolation bracket flow

#### Out of Scope (Now in Shared Modules)
- ~~Basic match positioning calculations~~ → Available in `positions.ts`
- ~~Round spacing and layout~~ → Available in `layout.ts`
- ~~Canvas dimension calculations~~ → Available in `layout.ts`
- ~~Basic coordinate validation~~ → Available in `validation.ts`

#### Leverage Shared Modules
- **positions.ts**: Extend `computeMatchPositions()` with consolation-specific rules
- **layout.ts**: Use `calculateBracketLayout()` as base, add consolation modifications
- **types.ts**: Extend `MatchNode` interface for consolation-specific properties
- **constants.ts**: Add consolation-specific constants while inheriting base values

#### Extension Strategy
- Add consolation-specific functions to shared modules where they're reusable
- Create consolation-only utilities for highly specific logic
- Ensure extensions don't break championship bracket functionality

### Implementation Approach
```typescript
// Example of extending shared functionality
export function computeConsolationPositions(
  rounds: Round[],
  championshipPositions: Record<string, Point>,
  config: BracketConstants
): Record<string, Point> {
  // Start with base positioning logic
  const basePositions = computeMatchPositions(rounds, config);
  
  // Apply consolation-specific adjustments
  return applyConsolationSeeding(basePositions, championshipPositions);
}
```

### Acceptance Criteria Updates
- [ ] Consolation positioning builds on shared `positions.ts` utilities
- [ ] Consolation-specific logic is clearly separated from shared logic
- [ ] Extensions to shared modules are backward compatible
- [ ] Complex seeding rules are well-documented and tested

---

## Issue #20: Cross-Bracket Connection Lines

### Original Scope (Before Shared Modules)
- Implement connection lines between championship and consolation brackets
- Handle complex routing between different bracket regions
- Manage visual clarity with crossing lines
- Support different line styles for different connection types

### Updated Scope (After Shared Modules Available)

#### In Scope (Cross-Bracket Specific)
- **Cross-Region Routing**: Calculate connection paths between different bracket areas
- **Line Style Variations**: Implement different styles (solid, dashed, colored) for different flow types
- **Overlap Avoidance**: Advanced routing algorithms to prevent line overlaps
- **Visual Hierarchy**: Ensure important connections are visually prominent

#### Leverage Shared Modules
- **BracketContainer**: Use shared container for consistent SVG setup
- **BracketLines**: Use shared line rendering component with style extensions
- **connections.ts**: Extend path calculation utilities for cross-bracket routing
- **positions.ts**: Use anchor point utilities for connection endpoints

#### Extension Strategy
- Extend `connections.ts` with new connection types and routing algorithms
- Enhance `BracketLines` component with additional styling options
- Add connection style constants to shared `constants.ts`

#### Implementation Pattern
```typescript
// Example of extending connection system
export function calculateCrossBracketLines(
  championshipMatches: MatchNode[],
  consolationMatches: MatchNode[],
  championshipPositions: Record<string, Point>,
  consolationPositions: Record<string, Point>,
  config: BracketConstants
): LineSegment[] {
  // Use shared utilities for basic line calculation
  const baseLines = calculateConnectingLines(/* ... */);
  
  // Add cross-bracket specific routing
  const crossLines = calculateChampionshipToConsolationLines(/* ... */);
  
  return [...baseLines, ...crossLines];
}
```

### Acceptance Criteria Updates
- [ ] Cross-bracket connections build on shared `connections.ts` utilities
- [ ] Line rendering uses enhanced `BracketLines` component
- [ ] New connection types are added to shared modules where reusable
- [ ] Visual complexity is managed without breaking existing functionality

---

## Issue #21: Responsive Behavior for Complex Brackets

### Original Scope (Before Shared Modules)
- Implement responsive behavior for both championship and consolation brackets
- Handle various screen sizes and orientations
- Manage layout adjustments for mobile devices
- Ensure readability across different viewport sizes

### Updated Scope (After Shared Modules Available)

#### In Scope (Complex Bracket Specific)
- **Multi-Bracket Responsive Coordination**: Coordinate responsive behavior between championship and consolation brackets when displayed together
- **Complex Layout Breakpoints**: Handle responsive adjustments specific to double-elimination tournament complexity
- **Mobile-Specific Optimizations**: Implement mobile-specific layouts for complex bracket flows
- **Adaptive Detail Level**: Show/hide detail based on available space in complex brackets

#### Out of Scope (Now in Shared Modules)
- ~~Basic responsive calculations~~ → Available in `layout.ts`
- ~~Canvas dimension adjustments~~ → Available in `layout.ts`
- ~~SVG viewport management~~ → Available in `BracketContainer`

#### Leverage Shared Modules
- **layout.ts**: Use `calculateResponsiveLayout()` as foundation
- **BracketContainer**: Extend responsive viewport management for complex brackets
- **constants.ts**: Add responsive breakpoint constants for complex layouts

#### Multi-Bracket Coordination
```typescript
// Example of coordinating multiple brackets
export function calculateMultiBracketLayout(
  championshipRounds: Round[],
  consolationRounds: Round[],
  containerWidth: number,
  config: BracketConfig
): {
  championship: LayoutResult;
  consolation: LayoutResult;
  combined: Dimensions;
} {
  // Use shared calculations for each bracket
  const champLayout = calculateBracketLayout(championshipRounds, config);
  const consolationLayout = calculateBracketLayout(consolationRounds, config);
  
  // Coordinate sizing and positioning
  return coordinateMultipleBrackets(champLayout, consolationLayout, containerWidth);
}
```

### Acceptance Criteria Updates
- [ ] Complex bracket responsive behavior builds on shared responsive utilities
- [ ] Multi-bracket coordination doesn't duplicate shared responsive logic
- [ ] Mobile optimizations work with shared `BracketContainer` responsive features
- [ ] Complex bracket breakpoints extend shared responsive system

---

## Summary of Changes

### Scope Reductions
All issues have significantly reduced scope due to shared modules handling common functionality:

- **Issue #16**: Focus on match card styling, not basic positioning
- **Issue #18**: Focus on advanced viewport features, not basic SVG container
- **Issue #19**: Focus on consolation-specific logic, not basic positioning
- **Issue #20**: Focus on cross-bracket routing, not basic line rendering
- **Issue #21**: Focus on complex bracket coordination, not basic responsive behavior

### Shared Dependencies
All issues now depend on shared modules:

- **constants.ts**: Used by all issues for consistent sizing and spacing
- **types.ts**: Ensures type safety across all bracket-related issues
- **BracketContainer**: Provides consistent SVG setup for all bracket types
- **positions.ts**: Base positioning utilities used by multiple issues
- **layout.ts**: Responsive calculations used by multiple issues
- **validation.ts**: Ensures robustness across all implementations

### Implementation Coordination
Issues should be implemented in this order to maximize shared module benefits:

1. **Complete shared module extraction first** (ChampionshipBracket refactoring)
2. **Issue #16** (Enhanced Match Cards) - Extends shared modules
3. **Issue #19** (Consolation Positioning) - Adds consolation-specific extensions
4. **Issue #20** (Cross-Bracket Connections) - Uses consolation positioning results
5. **Issue #18** (Advanced Viewport) - Adds advanced features to proven container
6. **Issue #21** (Complex Responsive) - Coordinates all bracket types

### Benefits of Updated Scopes
- **Reduced Development Time**: Less duplicate code to write and maintain
- **Better Consistency**: All bracket types use same base utilities
- **Easier Testing**: Shared logic tested once, issue-specific logic focused
- **Cleaner Architecture**: Clear separation between shared and specific functionality
- **Future Extensibility**: New bracket types can leverage proven shared modules

These updated scopes ensure that the shared logic extraction effort provides maximum benefit to all related issues while maintaining clear boundaries between shared and issue-specific functionality.