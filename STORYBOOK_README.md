# Storybook Integration for ChampionshipBracket

This project now includes Storybook integration for comprehensive visual testing and documentation of the ChampionshipBracket component.

## Setup and Installation

Storybook 9.1.1 is configured to work with our existing React + Vite + Tailwind CSS stack.

### Running Storybook

```bash
# Start Storybook development server
npm run storybook

# Build Storybook for production
npm run build-storybook
```

## Stories Overview

### ChampionshipBracket Stories

Located in `src/components/ChampionshipBracket.stories.js`, these stories provide comprehensive testing scenarios:

#### Tournament Size Variations
- **Default** - 32-wrestler full tournament bracket with interactive click handlers
- **Small Bracket 8 Wrestlers** - Compact tournament format for testing smaller screens
- **Medium Bracket 16 Wrestlers** - Mid-size tournament layout  
- **Large Bracket 32 Wrestlers** - Full-size tournament (same as default)

#### Edge Case Testing
- **Long Wrestler Names** - Tests component with extremely long participant names
- **Missing Participant Data** - Tests graceful handling of null/missing data with "TBD" fallbacks
- **Without Click Handler** - Tests component without optional interactive features
- **Empty Bracket** - Tests graceful handling of no tournament data

## Responsive Testing

Storybook includes built-in viewport controls for testing across different device sizes:

### Available Viewports
- **Small Mobile** (320px wide) - iPhone SE and similar devices
- **Large Mobile** (414px wide) - iPhone 12 Pro and similar devices  
- **Tablet** (768px wide) - iPad and similar tablets
- **Desktop** (1280px wide) - Standard desktop screens

### Testing Workflow

1. Open any ChampionshipBracket story
2. Click the viewport button in the toolbar (shows current size like "Desktop (P)")
3. Select different viewport sizes to test responsiveness
4. Use zoom controls to test different scaling levels
5. Enable grid overlay to check alignment

## Component Integration

### Tailwind CSS Support

Storybook is configured to use the same Tailwind CSS configuration as the main app via:
- Import in `.storybook/preview.js` pulls in `src/index.css`
- All component styling renders correctly in Storybook environment

### Data Structure

Stories use the same embedded participant data approach as the main application:

```javascript
const sampleMatch = {
  id: "r1m1",
  participants: [
    { name: "John Smith [1]", school: "State University" },
    { name: "Mike Johnson", school: "Tech College" }
  ],
  winner: "John Smith",
  score: "Fall 3:24",
  winner_next_match_id: "r2m1",
  winner_prev_match_id: null,
  loser_prev_match_id: null
};
```

### Interactive Features

- **Click Handlers** - Stories demonstrate optional `onMatchClick` prop functionality
- **Controls Panel** - Modify story data in real-time using Storybook controls
- **Actions Panel** - View click events and other interactions

## Configuration Files

### `.storybook/main.js`
- Defines story locations
- Configures React + Vite framework integration
- Sets up essential addons

### `.storybook/preview.js`
- Imports Tailwind CSS styles
- Configures global parameters
- Sets up controls matchers

## Visual Testing Results

The ChampionshipBracket component demonstrates excellent responsive behavior:

✅ **Mobile Compatibility** - Renders correctly with horizontal scrolling on narrow screens  
✅ **Tablet Optimization** - Proper scaling and spacing on medium screens  
✅ **Desktop Experience** - Full bracket visibility on large screens  
✅ **Edge Case Handling** - Graceful degradation with missing data  
✅ **Long Content** - Handles extremely long wrestler names without layout breaks  

## Development Workflow

### Adding New Stories

1. Add new export to `ChampionshipBracket.stories.js`
2. Create test data for the specific scenario
3. Include descriptive args and documentation

### Testing Changes

1. Start Storybook: `npm run storybook`
2. Navigate to ChampionshipBracket stories
3. Test across multiple viewport sizes
4. Verify edge cases still work correctly
5. Check that Tailwind styles render properly

### Production Builds

For deployment or sharing:
```bash
npm run build-storybook
```

This creates a static build in `storybook-static/` that can be hosted anywhere.

## Future Enhancements

Potential additions to the Storybook setup:

- **Accessibility Testing** - Add a11y addon for automated accessibility checks
- **Visual Regression Testing** - Integrate with Chromatic or similar service
- **Performance Testing** - Add performance monitoring for large brackets
- **Documentation** - Enhanced MDX documentation pages
- **Interaction Testing** - Automated interaction testing with play functions

## Troubleshooting

### Common Issues

**Styles not loading**: Ensure `.storybook/preview.js` imports `../src/index.css`

**Stories not appearing**: Check that story files match the pattern in `.storybook/main.js`

**Build errors**: Verify all dependencies are installed with `npm install`

**Component not rendering**: Ensure component export matches import in stories file