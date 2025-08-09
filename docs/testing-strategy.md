# Testing Strategy for Shared Bracket Logic

## Overview

This document defines the comprehensive testing strategy for the shared bracket modules extraction project. The strategy ensures that refactored code maintains identical behavior while providing a robust foundation for future bracket development.

## Testing Philosophy

### Safety-First Approach
- **No Regression**: Existing functionality must remain unchanged
- **Comprehensive Coverage**: Every extracted module has thorough test coverage
- **Visual Validation**: Automated comparison of rendered output
- **Performance Monitoring**: Ensure refactoring doesn't degrade performance

### Test-Driven Extraction
- **Baseline First**: Capture current behavior before changes
- **Test Per Function**: Every extracted function has dedicated unit tests
- **Integration Validation**: Verify end-to-end behavior remains identical
- **Continuous Feedback**: Tests run on every change

## Testing Levels

### 1. Unit Testing

#### Target Modules and Functions

**constants.ts**
```typescript
describe('Bracket Constants', () => {
  it('should have all required constants defined', () => {
    expect(BRACKET_CONSTANTS.MIN_MATCH_WIDTH).toBe(220);
    expect(BRACKET_CONSTANTS.MIN_MATCH_HEIGHT).toBe(110);
    // ... test all constants
  });
  
  it('should support configuration overrides', () => {
    const customConfig = createBracketConfig({
      MIN_MATCH_WIDTH: 300
    });
    expect(customConfig.MIN_MATCH_WIDTH).toBe(300);
    expect(customConfig.MIN_MATCH_HEIGHT).toBe(110); // unchanged
  });
});
```

**layout.ts**
```typescript
describe('Layout Calculations', () => {
  const sampleRounds = [
    { index: 0, matches: [/* 8 first round matches */] },
    { index: 1, matches: [/* 4 quarterfinal matches */] },
    { index: 2, matches: [/* 2 semifinal matches */] },
    { index: 3, matches: [/* 1 final match */] }
  ];

  it('should calculate canvas dimensions for tournament', () => {
    const dimensions = computeCanvasDimensions(sampleRounds, BRACKET_CONSTANTS);
    expect(dimensions.width).toBeGreaterThan(800);
    expect(dimensions.height).toBeGreaterThan(600);
    expect(dimensions.width).toBe(expectedWidth); // exact value from baseline
  });

  it('should handle responsive layout calculations', () => {
    const layout = calculateBracketLayout(sampleRounds, {
      containerWidth: 1200
    });
    
    expect(layout.positions).toBeDefined();
    expect(layout.dimensions).toBeDefined();
    expect(layout.matchSize).toBeDefined();
    
    // Verify specific positions match expected values
    expect(layout.positions['match-1'].x).toBe(expectedX);
    expect(layout.positions['match-1'].y).toBe(expectedY);
  });
});
```

**positions.ts**
```typescript
describe('Position Calculations', () => {
  it('should calculate match right edge center correctly', () => {
    const position = { x: 100, y: 200 };
    const matchSize = { width: 220, height: 110 };
    
    const center = getMatchRightEdgeCenter(position, matchSize);
    
    expect(center.x).toBe(320); // 100 + 220
    expect(center.y).toBe(255); // 200 + 110/2
  });

  it('should calculate text positions with correct offsets', () => {
    const position = { x: 50, y: 100 };
    const matchSize = { width: 220, height: 110 };
    
    const textPositions = getMatchTextPositions(position, matchSize);
    
    expect(textPositions.participant1.seedAndName.x).toBe(58); // 50 + 8
    expect(textPositions.participant1.seedAndName.y).toBe(130.8); // 100 + 110 * 0.28
    
    expect(textPositions.participant2.school.x).toBe(58);
    expect(textPositions.participant2.school.y).toBe(190.2); // 100 + 110 * 0.82
  });
});
```

**connections.ts**
```typescript
describe('Connection Calculations', () => {
  it('should generate valid SVG path data', () => {
    const start = { x: 100, y: 150 };
    const end = { x: 400, y: 250 };
    
    const path = pathBetween(start, end, 'elbow', 50);
    
    expect(path).toMatch(/^M \d+ \d+ L \d+ \d+ L \d+ \d+ L \d+ \d+$/);
    expect(path).toContain('M 100 150'); // starts at correct point
    expect(path).toContain('L 400 250'); // ends at correct point
  });

  it('should calculate horizontal extension correctly', () => {
    const gapBetweenRounds = 200;
    const extension = calculateHorizontalExtension(
      gapBetweenRounds, 
      BRACKET_CONSTANTS
    );
    
    const expectedExtension = Math.max(
      BRACKET_CONSTANTS.MIN_HORIZONTAL_EXTENSION,
      gapBetweenRounds * BRACKET_CONSTANTS.HORIZONTAL_EXTENSION_RATIO
    );
    
    expect(extension).toBe(expectedExtension);
  });
});
```

**validation.ts**
```typescript
describe('Validation Utilities', () => {
  it('should identify finite numbers correctly', () => {
    expect(isFiniteNumber(42)).toBe(true);
    expect(isFiniteNumber(-3.14)).toBe(true);
    expect(isFiniteNumber(NaN)).toBe(false);
    expect(isFiniteNumber(Infinity)).toBe(false);
    expect(isFiniteNumber('42')).toBe(false);
  });

  it('should filter valid coordinates from arrays', () => {
    const coordinates = [10, NaN, 20, Infinity, 30, -40];
    const valid = filterValidCoordinates(coordinates);
    
    expect(valid).toEqual([10, 20, 30, -40]);
  });

  it('should clamp points to canvas bounds', () => {
    const point = { x: -10, y: 1500 };
    const canvas = { width: 1000, height: 800 };
    const padding = 20;
    
    const clamped = clampToCanvas(point, canvas, padding);
    
    expect(clamped.x).toBe(20); // clamped to padding
    expect(clamped.y).toBe(780); // clamped to height - padding
  });
});
```

#### Unit Testing Requirements
- **Coverage Target**: >95% line coverage for all shared modules
- **Test Data**: Use realistic tournament data structures
- **Edge Cases**: Test with empty data, malformed data, extreme values
- **Performance**: Include performance benchmarks for complex calculations

### 2. Integration Testing

#### ChampionshipBracket Integration
```typescript
describe('ChampionshipBracket Integration', () => {
  const sampleMatches = [
    // Complete 32-participant tournament data
  ];

  it('should render identically to baseline after refactoring', () => {
    const originalOutput = renderChampionshipBracketOriginal(sampleMatches);
    const refactoredOutput = renderChampionshipBracketRefactored(sampleMatches);
    
    // Compare DOM structure
    expect(refactoredOutput.container.innerHTML)
      .toBe(originalOutput.container.innerHTML);
    
    // Compare computed styles
    expect(getComputedStyles(refactoredOutput.svg))
      .toEqual(getComputedStyles(originalOutput.svg));
  });

  it('should produce identical positioning results', () => {
    const { positions: originalPositions } = calculateLayoutOriginal(sampleMatches);
    const { positions: refactoredPositions } = calculateLayoutRefactored(sampleMatches);
    
    Object.keys(originalPositions).forEach(matchId => {
      expect(refactoredPositions[matchId]).toEqual(originalPositions[matchId]);
    });
  });

  it('should generate identical SVG paths', () => {
    const originalPaths = generateConnectionPathsOriginal(sampleMatches);
    const refactoredPaths = generateConnectionPathsRefactored(sampleMatches);
    
    expect(refactoredPaths).toEqual(originalPaths);
  });
});
```

#### Shared Component Integration
```typescript
describe('BracketContainer Integration', () => {
  it('should wrap content with identical SVG structure', () => {
    const testContent = <circle cx="50" cy="50" r="20" />;
    
    const containerOutput = render(
      <BracketContainer viewBoxWidth={400} viewBoxHeight={300}>
        {testContent}
      </BracketContainer>
    );
    
    // Verify SVG attributes
    const svg = containerOutput.container.querySelector('svg');
    expect(svg.getAttribute('viewBox')).toBe('0 0 400 300');
    expect(svg.getAttribute('preserveAspectRatio')).toBe('xMinYMin meet');
    
    // Verify content is preserved
    expect(svg.querySelector('circle')).toBeTruthy();
  });
});
```

### 3. Visual Regression Testing

#### Automated Screenshot Comparison
```typescript
describe('Visual Regression Tests', () => {
  const tournaments = [
    load8PersonTournament(),
    load16PersonTournament(), 
    load32PersonTournament(),
    loadTournamentWithIncompleteData()
  ];

  tournaments.forEach((tournament, index) => {
    it(`should render tournament ${index + 1} identically`, async () => {
      // Render original implementation
      const originalImage = await captureScreenshot(
        <ChampionshipBracketOriginal matches={tournament.matches} />
      );
      
      // Render refactored implementation
      const refactoredImage = await captureScreenshot(
        <ChampionshipBracketRefactored matches={tournament.matches} />
      );
      
      // Compare images pixel-by-pixel
      const diff = await compareImages(originalImage, refactoredImage);
      expect(diff.pixelDifference).toBe(0);
      expect(diff.percentageDifference).toBe(0);
    });
  });

  it('should handle responsive behavior identically', async () => {
    const viewports = [
      { width: 1920, height: 1080 },
      { width: 1024, height: 768 },
      { width: 768, height: 1024 },
      { width: 375, height: 667 }
    ];

    for (const viewport of viewports) {
      // Test at different screen sizes
      const original = await captureScreenshotAtSize(
        <ChampionshipBracketOriginal />,
        viewport
      );
      
      const refactored = await captureScreenshotAtSize(
        <ChampionshipBracketRefactored />,
        viewport
      );
      
      const diff = await compareImages(original, refactored);
      expect(diff.pixelDifference).toBe(0);
    }
  });
});
```

#### Visual Test Infrastructure
- **Tools**: Playwright for consistent rendering, pixelmatch for image comparison
- **Environments**: Test across Chrome, Firefox, Safari
- **Resolutions**: Test multiple screen sizes and device types
- **Data Sets**: Various tournament sizes and completion states

### 4. Performance Testing

#### Rendering Performance
```typescript
describe('Performance Tests', () => {
  const largeTournament = generate32PersonTournament();

  it('should maintain rendering performance after refactoring', () => {
    const originalTime = measureRenderTime(() =>
      render(<ChampionshipBracketOriginal matches={largeTournament.matches} />)
    );
    
    const refactoredTime = measureRenderTime(() =>
      render(<ChampionshipBracketRefactored matches={largeTournament.matches} />)
    );
    
    // Performance should be within 5% of baseline
    expect(refactoredTime).toBeLessThan(originalTime * 1.05);
  });

  it('should not leak memory during re-renders', () => {
    const initialMemory = getMemoryUsage();
    
    // Perform many re-renders
    for (let i = 0; i < 100; i++) {
      const wrapper = render(<ChampionshipBracketRefactored />);
      wrapper.rerender(<ChampionshipBracketRefactored matches={generateRandomMatches()} />);
      wrapper.unmount();
    }
    
    // Force garbage collection
    global.gc?.();
    
    const finalMemory = getMemoryUsage();
    const memoryIncrease = finalMemory - initialMemory;
    
    // Memory usage should not increase significantly
    expect(memoryIncrease).toBeLessThan(10 * 1024 * 1024); // 10MB threshold
  });
});
```

#### Calculation Performance
```typescript
describe('Calculation Performance', () => {
  it('should calculate layouts efficiently', () => {
    const largeTournament = generate32PersonTournament();
    
    const startTime = performance.now();
    
    for (let i = 0; i < 1000; i++) {
      calculateBracketLayout(largeTournament.rounds);
    }
    
    const endTime = performance.now();
    const averageTime = (endTime - startTime) / 1000;
    
    // Should calculate layout in under 1ms on average
    expect(averageTime).toBeLessThan(1);
  });
});
```

### 5. Cross-Browser Testing

#### Browser Compatibility Matrix
- **Chrome**: Latest stable version
- **Firefox**: Latest stable version  
- **Safari**: Latest stable version (macOS/iOS)
- **Edge**: Latest stable version

#### SVG Rendering Consistency
```typescript
describe('Cross-Browser SVG Rendering', () => {
  const testBrowsers = ['chrome', 'firefox', 'webkit'];
  
  testBrowsers.forEach(browserName => {
    it(`should render identically in ${browserName}`, async () => {
      const browser = await playwright[browserName].launch();
      const page = await browser.newPage();
      
      await page.setContent(renderToString(
        <ChampionshipBracket matches={sampleTournament} />
      ));
      
      const screenshot = await page.screenshot();
      
      // Compare against baseline screenshot
      const baseline = loadBaselineScreenshot(browserName);
      const diff = await compareImages(screenshot, baseline);
      
      expect(diff.percentageDifference).toBeLessThan(0.1);
      
      await browser.close();
    });
  });
});
```

## Testing Infrastructure

### Test Environment Setup

#### Development Environment
```json
{
  "scripts": {
    "test": "vitest",
    "test:coverage": "vitest --coverage",
    "test:ui": "vitest --ui",
    "test:visual": "playwright test",
    "test:performance": "vitest --run performance",
    "test:all": "npm run test:coverage && npm run test:visual && npm run test:performance"
  }
}
```

#### CI/CD Pipeline
```yaml
name: Test Shared Bracket Modules
on: [push, pull_request]

jobs:
  unit-tests:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - uses: actions/setup-node@v3
      - run: npm install
      - run: npm run test:coverage
      - uses: codecov/codecov-action@v3

  visual-tests:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - uses: actions/setup-node@v3
      - run: npm install
      - run: npx playwright install
      - run: npm run test:visual

  performance-tests:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - uses: actions/setup-node@v3
      - run: npm install
      - run: npm run test:performance
```

### Test Data Management

#### Sample Data Generation
```typescript
// utils/testData.ts
export function generate8PersonTournament(): Tournament {
  return {
    matches: [
      // First round matches
      createMatch('q1', participants(['Alice', 'Bob'])),
      createMatch('q2', participants(['Carol', 'Dave'])),
      createMatch('q3', participants(['Eve', 'Frank'])),
      createMatch('q4', participants(['Grace', 'Henry'])),
      
      // Semifinals
      createMatch('s1', [], { winner_prev_match_id: 'q1', loser_prev_match_id: 'q2' }),
      createMatch('s2', [], { winner_prev_match_id: 'q3', loser_prev_match_id: 'q4' }),
      
      // Final
      createMatch('f1', [], { winner_prev_match_id: 's1', loser_prev_match_id: 's2' })
    ]
  };
}
```

#### Baseline Data Capture
```typescript
// Capture current behavior for comparison
export function captureBaseline() {
  const tournaments = [
    generate8PersonTournament(),
    generate16PersonTournament(),
    generate32PersonTournament()
  ];
  
  tournaments.forEach((tournament, index) => {
    const layout = calculateResponsiveLayoutOriginal(tournament.rounds);
    const connections = calculateConnectingLinesOriginal(tournament.matches, layout.positions, layout.matchSize);
    
    writeFileSync(
      `baselines/tournament-${index + 1}-layout.json`,
      JSON.stringify(layout, null, 2)
    );
    
    writeFileSync(
      `baselines/tournament-${index + 1}-connections.json`, 
      JSON.stringify(connections, null, 2)
    );
  });
}
```

## Success Criteria

### Phase Completion Requirements
For each migration phase to be considered complete:

- [ ] **Unit Tests**: >95% coverage on all extracted modules
- [ ] **Integration Tests**: ChampionshipBracket renders identically
- [ ] **Visual Tests**: Zero pixel difference in automated comparisons
- [ ] **Performance Tests**: Within 5% of baseline performance
- [ ] **Cross-Browser Tests**: Consistent rendering across all target browsers
- [ ] **Code Review**: All tests pass peer review for completeness and quality

### Overall Project Success
The testing strategy is successful when:

- [ ] All shared modules have comprehensive test coverage
- [ ] ChampionshipBracket refactoring shows zero behavioral changes
- [ ] Test suite provides confidence for future ConsolationBracket development
- [ ] Performance is maintained or improved across all test scenarios
- [ ] Visual regression detection catches any unintended changes

## Maintenance and Evolution

### Test Suite Maintenance
- **Regular Updates**: Keep test data and baselines current with application changes
- **Performance Monitoring**: Track performance trends over time
- **Browser Updates**: Adjust cross-browser tests as browsers evolve
- **Tool Updates**: Keep testing tools and libraries up to date

### Future Extension
- **ConsolationBracket Tests**: Extend test suite when adding consolation bracket
- **Additional Bracket Types**: Framework ready for testing new bracket implementations
- **Animation Testing**: Extend visual tests to cover bracket animations when added
- **Accessibility Testing**: Add automated accessibility testing for screen reader compliance

This comprehensive testing strategy ensures that the shared bracket logic extraction maintains quality, performance, and reliability while providing a robust foundation for future development.