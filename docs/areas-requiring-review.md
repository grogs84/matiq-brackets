# Areas Requiring Closer Review - Phase 1

## Overview

This document identifies specific areas of the shared logic extraction that require deeper analysis and careful design decisions before implementation. These areas involve complex interactions between championship and consolation brackets that may require specialized handling.

## Critical Review Areas

### 1. Connection Logic Differences

#### Championship vs Consolation Connection Patterns

**Championship Bracket (Current Implementation)**:
- Simple tree structure: winners advance to next round
- Single elimination flow with predictable connections
- Box-pattern lines with horizontal extensions work well
- All connections follow winner_next_match_id pointers

**Consolation Bracket (Complex Requirements)**:
- Championship losers enter at specific consolation positions
- Cross-bracket connections from championship to consolation
- Multiple path types: losers drop down, winners advance sideways
- "Blood round" and placement matches require unique routing

#### Design Decision Required:
**Option A**: Extend current connection system with new connection types
- Pro: Reuses existing box-pattern logic
- Con: May become complex with many special cases

**Option B**: Separate connection systems for different bracket types
- Pro: Each system optimized for its use case
- Con: More code duplication, less shared logic

**Recommendation**: Start with Option A, fallback to Option B if complexity becomes unmanageable

#### Technical Considerations:
- Connection lines may need to cross between different SVG regions
- Path routing may need obstacle avoidance for crossed lines
- Visual styling may differ (solid lines vs dashed lines for different flows)

### 2. Placement and Seed Rules for Consolation Rounds

#### Current Championship Seeding:
- Linear progression: match winners advance to next round
- Predictable vertical positioning based on source match centers
- Fixed spacing ratios work for balanced tree structure

#### Consolation Seeding Complexity:
- Championship round losers enter at specific consolation positions
- Seeding affects vertical positioning and requires special calculation
- "Backside" bracket may use different spacing rules
- Placement matches (3rd, 5th, 7th place) have unique positioning requirements

#### Review Questions:
1. **Can the current `computeMatchPositions()` handle consolation seeding rules?**
   - Current: Centers matches between source matches
   - Consolation: May need fixed positions based on seed rankings

2. **Do consolation rounds require different vertical spacing?**
   - Championship: Even spacing works due to tree structure
   - Consolation: Uneven spacing might be needed for proper visual flow

3. **How do placement matches integrate with standard consolation flow?**
   - May require separate positioning calculations
   - Could need special connection handling

#### Design Decision Required:
**Option A**: Extend `positions.ts` with consolation-specific positioning functions
**Option B**: Create separate positioning module for consolation brackets
**Option C**: Make positioning system fully configurable with rule-based calculations

**Recommendation**: Option A initially, with clear extension points for complex rules

### 3. Path Styles and Routing Differences

#### Current Path System:
- Box-pattern with horizontal extensions
- Fixed extension ratio based on gap between rounds
- Single line stroke style and width
- Lines drawn behind match boxes

#### Consolation Requirements:
- May need different line styles for different flow types:
  - Solid lines for normal advancement
  - Dashed lines for cross-bracket movement
  - Different colors for championship vs consolation connections
- Routing challenges:
  - Lines crossing between bracket regions
  - Avoiding overlaps with match boxes and other lines
  - Maintaining visual clarity with complex flows

#### Technical Challenges:
- Current system assumes non-overlapping horizontal routing
- Cross-bracket connections may need vertical routing
- Line ordering (z-index) becomes important with crossovers

#### Design Decisions Required:
1. **Line Style Variations**: How many different line styles are needed?
2. **Routing Algorithm**: Can current box-pattern handle all cases?
3. **Visual Priority**: How to handle line crossovers and overlaps?

### 4. Round Spacing Variability

#### Current Fixed Spacing:
- `ROUND_SPACING: 260` pixels between all rounds
- `MIN_SPACING: 50` pixels between matches vertically
- Consistent `LEFT_MARGIN: 30` for first round

#### Consolation Variables:
- Different number of rounds than championship
- Rounds may have different widths (more/fewer matches)
- Cross-connections may require extra horizontal space
- Placement matches may need special positioning

#### Review Questions:
1. **Should consolation use different default spacing constants?**
2. **Can responsive calculations handle mixed bracket types?**
3. **Do we need per-round spacing customization?**

#### Proposed Solutions:
- Make spacing configurable per bracket type
- Add responsive calculations for optimal spacing
- Support variable spacing between different round types

### 5. Data Model Parity Considerations

#### Current Match Structure:
```typescript
interface MatchNode {
  id: string;
  participants: [Participant?, Participant?];
  winner_next_match_id?: string;
  loser_next_match_id?: string;
  // ...
}
```

#### Consolation Requirements:
- Multiple next match pointers (winner/loser paths)
- Cross-references to championship bracket matches
- Special match types (placement matches, blood rounds)
- Potentially different participant structures

#### Review Questions:
1. **Are current MatchNode interfaces sufficient for consolation?**
2. **Do we need separate match types or can we use discriminated unions?**
3. **How to handle cross-bracket references efficiently?**

#### Design Considerations:
- Ensure backward compatibility with existing championship data
- Support for complex tournament flows without over-engineering
- Clear separation between match data and rendering concerns

## Decisions Made in Phase 1

### Connection Logic - DECISION: Extend Current System
- **Rationale**: Existing box-pattern logic is solid and tested
- **Approach**: Add connection type variants (solid, dashed, colored)
- **Fallback**: If complexity grows too much, separate systems per bracket type
- **Implementation**: Extend `connections.ts` with style variants

### Positioning - DECISION: Configurable Extension
- **Rationale**: Championship positioning logic is mostly reusable  
- **Approach**: Add consolation-specific positioning functions to `positions.ts`
- **Configuration**: Support different spacing rules via bracket config
- **Special Cases**: Handle placement matches as separate positioning logic

### Path Styles - DECISION: Multi-Style Support
- **Rationale**: Visual clarity requires different line styles
- **Implementation**: Extend line rendering to support style variants
- **Routing**: Start with enhanced box-pattern, add complexity as needed
- **Performance**: Ensure line style variations don't impact rendering performance

### Round Spacing - DECISION: Flexible Configuration
- **Rationale**: Different bracket types need different spacing characteristics
- **Approach**: Make spacing constants configurable per bracket type
- **Responsive**: Ensure responsive calculations work with variable spacing
- **Migration**: Maintain backward compatibility with current fixed spacing

### Data Model - DECISION: Extend Current Interfaces
- **Rationale**: Existing MatchNode structure is well-designed
- **Approach**: Add optional fields for consolation-specific data
- **Type Safety**: Use discriminated unions for different match types if needed
- **Compatibility**: Ensure championship brackets continue working unchanged

## Implementation Order Based on Review

### Low Risk (Implement First):
1. **Constants and Types**: Well-defined interfaces with clear extension points
2. **Basic Positioning**: Core positioning logic is bracket-agnostic
3. **Container Component**: Pure presentation logic with no bracket-specific concerns

### Medium Risk (Implement with Testing):
1. **Layout Calculations**: Some consolation-specific requirements, but core logic reusable
2. **Basic Connections**: Box-pattern logic works, but may need style extensions
3. **Validation**: Core validation logic universal, may need bracket-specific rules

### High Risk (Require Prototyping):
1. **Cross-bracket Connections**: Complex visual routing between different bracket areas
2. **Consolation Positioning**: Special seeding and placement rules need careful design
3. **Complex Path Routing**: Advanced connection patterns with overlap avoidance

## Next Phase Planning

### Phase 2 Focus Areas:
- Implement low-risk modules with comprehensive testing
- Create prototype consolation positioning system
- Design connection style system with examples

### Phase 3 Validation:
- Build simple consolation bracket using shared modules
- Identify areas where current design assumptions break down
- Refine complex modules based on real implementation experience

### Phase 4 Optimization:
- Address performance concerns with large brackets
- Optimize connection routing algorithms
- Add advanced features like animations and exports

## Open Questions for Future Phases

1. **Responsive Design**: How do complex cross-bracket connections behave on mobile?
2. **Accessibility**: How to make complex bracket flows understandable to screen readers?
3. **Performance**: At what point do we need virtualization for very large tournaments?
4. **Internationalization**: How do different text lengths affect our positioning calculations?
5. **Animation**: How do we design shared modules to support animated bracket reveals?

These questions don't block Phase 1 but should be considered in the shared module API design to avoid breaking changes later.