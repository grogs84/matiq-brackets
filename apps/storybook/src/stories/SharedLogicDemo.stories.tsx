import type { Meta, StoryObj } from '@storybook/react';
import React from 'react';
import { ChampionshipBracket, ConsolationBracket } from 'matiq-brackets';
import { sampleChampionshipMatches } from '../../../../sample-data/championship-bracket.js';
import { sampleConsolationMatches } from '../../../../sample-data/consolation-bracket.js';

// Create a compound component to show both brackets side by side
const BracketComparison: React.FC<{
  championshipMatches: any[];
  consolationMatches: any[];
  onMatchClick?: (match: any) => void;
}> = ({ championshipMatches, consolationMatches, onMatchClick }) => (
  <div style={{ display: 'flex', gap: '2rem', padding: '1rem' }}>
    <div style={{ flex: 1, maxHeight: '80vh', overflow: 'auto' }}>
      <h2 style={{ marginBottom: '1rem', textAlign: 'center', color: '#1f2937' }}>
        Championship Bracket
      </h2>
      <div style={{ border: '2px solid #3b82f6', borderRadius: '8px', padding: '1rem' }}>
        <ChampionshipBracket 
          matches={championshipMatches}
          onMatchClick={onMatchClick}
        />
      </div>
    </div>
    <div style={{ flex: 1, maxHeight: '80vh', overflow: 'auto' }}>
      <h2 style={{ marginBottom: '1rem', textAlign: 'center', color: '#1f2937' }}>
        Consolation Bracket
      </h2>
      <div style={{ border: '2px solid #10b981', borderRadius: '8px', padding: '1rem' }}>
        <ConsolationBracket 
          matches={consolationMatches}
          onMatchClick={onMatchClick}
        />
      </div>
    </div>
  </div>
);

const meta: Meta<typeof BracketComparison> = {
  title: 'Wrestling Brackets/Shared Logic Demonstration',
  component: BracketComparison,
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        component: `
# Shared Logic Consolidation Demonstration

This story showcases the successful consolidation of shared logic between ChampionshipBracket and ConsolationBracket components.

## Shared Components & Utilities

**✅ Consolidated Logic:**
- **MatchBox Component**: Both brackets use the identical MatchBox component for rendering
- **Participant Formatting**: Shared \`formatParticipantName()\` and \`isWinner()\` utilities
- **Text Positioning**: Common \`getMatchTextPositions()\` for consistent layout
- **Dimension Calculations**: Shared \`calculateSafeDimensions()\` and responsive helpers
- **Styling Constants**: Unified SVG_STYLES and BRACKET_CONSTANTS
- **Connecting Lines**: Shared line rendering utilities with \`renderConnectingLines()\`

**🎯 Visual Consistency:**
- Identical match box styling, colors, and typography
- Consistent hover effects and interaction patterns  
- Unified spacing, padding, and border treatments
- Same winner highlighting and score display logic

**📊 Code Reduction:**
- Eliminated duplicate match rendering code (~200+ lines)
- Consolidated participant formatting functions
- Shared positioning and layout calculations
- Common utility functions reduce maintenance burden

Compare the visual consistency between both bracket types - they share the same core rendering logic while maintaining their unique tournament flows.
        `,
      },
    },
  },
  argTypes: {
    championshipMatches: {
      description: 'Array of championship tournament matches',
      control: { type: 'object' },
    },
    consolationMatches: {
      description: 'Array of consolation tournament matches', 
      control: { type: 'object' },
    },
    onMatchClick: {
      description: 'Shared match click handler for both bracket types',
      control: { type: 'function' },
    },
  },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof meta>;

const sharedMatchClickHandler = (match) => {
  const bracketType = match.id.includes('cons') ? 'Consolation' : 'Championship';
  console.log(`${bracketType} match clicked:`, match);
  alert(`${bracketType} Match: ${match.id}\nWinner: ${match.winner || 'TBD'}\nScore: ${match.score || 'No score'}`);
};

export const SideBySideComparison: Story = {
  args: {
    championshipMatches: sampleChampionshipMatches.slice(0, 7), // Smaller subset for better comparison
    consolationMatches: sampleConsolationMatches,
    onMatchClick: sharedMatchClickHandler,
  },
  parameters: {
    docs: {
      description: {
        story: `
**Side-by-side comparison demonstrating shared logic consolidation.**

**Key Observations:**
- Both brackets render with identical match box styling and layout
- Participant names, seeds, and schools display consistently  
- Winner highlighting (green scores) works the same in both brackets
- Click interactions provide consistent user experience
- Connecting lines use the same styling and algorithms

**Shared MatchBox Component in Action:**
The same MatchBox component renders matches in both brackets, ensuring visual consistency and reducing code duplication by ~200+ lines.
        `,
      },
    },
  },
};

export const EmptyBracketsComparison: Story = {
  args: {
    championshipMatches: [],
    consolationMatches: [],
    onMatchClick: sharedMatchClickHandler,
  },
  parameters: {
    docs: {
      description: {
        story: `
**Empty state comparison showing consistent empty bracket handling.**

Both bracket types use shared SVGBracketContainer and consistent empty state messaging, demonstrating the unified approach to edge case handling.
        `,
      },
    },
  },
};

export const DifferentSizeComparison: Story = {
  args: {
    championshipMatches: sampleChampionshipMatches.slice(0, 15), // Medium championship bracket
    consolationMatches: sampleConsolationMatches, // Smaller consolation bracket  
    onMatchClick: sharedMatchClickHandler,
  },
  parameters: {
    docs: {
      description: {
        story: `
**Different bracket sizes using shared responsive utilities.**

**Demonstrates:**
- Shared dimension calculation algorithms adapt to different bracket sizes
- Consistent spacing and positioning across bracket types
- Responsive design utilities work for both championship and consolation flows
- Visual consistency maintained regardless of tournament size
        `,
      },
    },
  },
};