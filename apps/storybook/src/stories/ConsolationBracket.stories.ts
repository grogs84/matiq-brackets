import type { Meta, StoryObj } from '@storybook/react';
import { ConsolationBracket } from 'matiq-brackets';
import { sampleConsolationMatches, largeSampleConsolationMatches } from '../../../../sample-data/consolation-bracket.js';

const meta: Meta<typeof ConsolationBracket> = {
  title: 'Wrestling Brackets/ConsolationBracket',
  component: ConsolationBracket,
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        component: `
A fully functional consolation bracket component for wrestling tournaments using shared utilities with ChampionshipBracket.

**Key Features:**
- Uses shared MatchBox component for consistent rendering
- Consolation-specific positioning algorithms  
- Shared formatting and styling utilities
- Responsive design with connecting lines
- Supports different bracket sizes and configurations

**Logic Consolidation:** This component shares significant code with ChampionshipBracket including match rendering, participant formatting, dimension calculations, and visual styling.
        `,
      },
    },
  },
  argTypes: {
    matches: {
      description: 'Array of consolation match objects with embedded participant data and winner_next_match_id relationships',
      control: { type: 'object' },
    },
    onMatchClick: {
      description: 'Optional callback function when a match is clicked',
      control: { type: 'function' },
    },
    width: {
      description: 'Custom width for the bracket',
      control: { type: 'number' },
    },
    height: {
      description: 'Custom height for the bracket',
      control: { type: 'number' },
    },
    className: {
      description: 'Additional CSS classes for styling',
      control: { type: 'text' },
    },
  },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof meta>;

const sampleMatchClickHandler = (match) => {
  console.log('Consolation match clicked:', match);
  alert(`Clicked on consolation match: ${match.id}\nWinner: ${match.winner || 'TBD'}`);
};

export const EmptyBracket: Story = {
  args: {
    matches: [],
  },
  parameters: {
    docs: {
      description: {
        story: 'Empty consolation bracket showing the default empty state with proper messaging.',
      },
    },
  },
};

export const SmallConsolationBracket: Story = {
  args: {
    matches: sampleConsolationMatches,
    onMatchClick: sampleMatchClickHandler,
  },
  parameters: {
    docs: {
      description: {
        story: `
Small consolation bracket with 7 matches organized into 3 rounds [4, 2, 1]. 

**Demonstrates:**
- Shared MatchBox component rendering
- Participant formatting with schools
- Winner highlighting and score display
- Proper connecting lines between matches
- Consolation-specific positioning algorithm
        `,
      },
    },
  },
};

export const LargeConsolationBracket: Story = {
  args: {
    matches: largeSampleConsolationMatches,
    onMatchClick: sampleMatchClickHandler,
  },
  parameters: {
    docs: {
      description: {
        story: `
Larger consolation bracket with 15 matches organized into 4 rounds [8, 4, 2, 1].

**Demonstrates:**
- Scalability of shared positioning utilities
- Consistent styling across bracket sizes  
- Complex tournament flows with multiple rounds
- Shared dimension calculation algorithms
        `,
      },
    },
  },
};

export const WithoutClickHandler: Story = {
  args: {
    matches: sampleConsolationMatches,
    // No onMatchClick provided to test optional behavior
  },
  parameters: {
    docs: {
      description: {
        story: 'Consolation bracket without click handler - matches are not interactive but still fully rendered using shared components.',
      },
    },
  },
};

export const CustomDimensions: Story = {
  args: {
    matches: sampleConsolationMatches,
    width: 1000,
    height: 400,
    onMatchClick: sampleMatchClickHandler,
  },
  parameters: {
    docs: {
      description: {
        story: 'Consolation bracket with custom dimensions, demonstrating the responsive layout calculations from shared utilities.',
      },
    },
  },
};

export const CompactLayout: Story = {
  args: {
    matches: sampleConsolationMatches.slice(0, 3), // Fewer matches for compact demo
    onMatchClick: sampleMatchClickHandler,
  },
  parameters: {
    docs: {
      description: {
        story: 'Compact consolation bracket with minimal matches, showing how the shared layout algorithms adapt to different sizes.',
      },
    },
  },
};

export const VisualConsistencyComparison: Story = {
  args: {
    matches: sampleConsolationMatches,
    className: "border-2 border-blue-300 rounded-lg p-4",
    onMatchClick: sampleMatchClickHandler,
  },
  parameters: {
    docs: {
      description: {
        story: `
Consolation bracket with custom styling to demonstrate visual consistency.

**Shared Design Elements:**
- Identical match box styling with ChampionshipBracket
- Same text positioning and formatting utilities  
- Consistent color schemes and typography
- Unified interaction patterns and hover effects

Compare this with ChampionshipBracket stories to see the visual consistency achieved through shared utilities.
        `,
      },
    },
  },
};