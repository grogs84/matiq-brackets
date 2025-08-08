import type { Meta, StoryObj } from '@storybook/react';
import { ChampionshipBracket } from 'matiq-brackets';
import { sampleChampionshipMatches, sampleMatchClickHandler } from '../../../../sample-data/championship-bracket.js';

const meta: Meta<typeof ChampionshipBracket> = {
  title: 'Wrestling Brackets/ChampionshipBracket',
  component: ChampionshipBracket,
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        component: 'A championship bracket component for wrestling tournaments. Displays the single-elimination bracket with embedded participant data, connecting lines, and interactive match cards.',
      },
    },
  },
  argTypes: {
    matches: {
      description: 'Array of match objects with embedded participant data',
      control: { type: 'object' },
    },
    onMatchClick: {
      description: 'Optional callback function when a match is clicked',
      control: { type: 'function' },
    },
  },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof meta>;

export const FullTournament: Story = {
  args: {
    matches: sampleChampionshipMatches,
    onMatchClick: sampleMatchClickHandler,
  },
  parameters: {
    docs: {
      description: {
        story: 'Complete 32-wrestler championship bracket with all rounds from first round to finals.',
      },
    },
  },
};

// Create smaller tournament scenarios
const finalOnlyMatches = sampleChampionshipMatches.filter(match => match.id === 'r5m1');
const semifinalsAndFinal = sampleChampionshipMatches.filter(match => match.id.startsWith('r4') || match.id.startsWith('r5'));

export const FinalOnly: Story = {
  args: {
    matches: finalOnlyMatches,
    onMatchClick: sampleMatchClickHandler,
  },
  parameters: {
    docs: {
      description: {
        story: 'Shows just the final match - useful for testing single match display.',
      },
    },
  },
};

export const SemifinalsAndFinal: Story = {
  args: {
    matches: semifinalsAndFinal,
    onMatchClick: sampleMatchClickHandler,
  },
  parameters: {
    docs: {
      description: {
        story: 'Shows semifinals and final matches - demonstrates multi-round bracket display.',
      },
    },
  },
};

export const WithoutClickHandler: Story = {
  args: {
    matches: sampleChampionshipMatches,
    // No onMatchClick provided to test optional behavior
  },
  parameters: {
    docs: {
      description: {
        story: 'Full tournament without click handler - matches are not interactive.',
      },
    },
  },
};

// Test edge cases
const edgeCaseMatches = [
  {
    id: "test1",
    participants: [
      { name: "Very Long Wrestler Name That Might Overflow", seed: 1, school: "University with an Extremely Long Name" },
      { name: "", seed: null, school: "" }
    ],
    winner: "Very Long Wrestler Name That Might Overflow",
    score: "Fall 1:23",
    winner_next_match_id: null,
    winner_prev_match_id: null,
    loser_prev_match_id: null
  }
];

export const EdgeCases: Story = {
  args: {
    matches: edgeCaseMatches,
    onMatchClick: sampleMatchClickHandler,
  },
  parameters: {
    docs: {
      description: {
        story: 'Tests edge cases like long names, missing data, and text overflow handling.',
      },
    },
  },
};