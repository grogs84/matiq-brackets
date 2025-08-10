import type { Meta, StoryObj } from '@storybook/react';
import { ConsolationBracket } from 'matiq-brackets';

const meta: Meta<typeof ConsolationBracket> = {
  title: 'Wrestling Brackets/ConsolationBracket',
  component: ConsolationBracket,
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        component: 'A consolation bracket component for wrestling tournaments. Currently displays basic structure with placeholder content. Future phases will add full consolation bracket positioning logic.',
      },
    },
  },
  argTypes: {
    matches: {
      description: 'Array of consolation match objects with embedded participant data',
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

// Sample consolation matches for testing (placeholder data)
const sampleConsolationMatches = [
  {
    id: "cons1",
    participants: [
      { name: "John Doe", seed: 5, school: "State University" },
      { name: "Mike Smith", seed: 12, school: "Tech College" }
    ],
    round: "consolation-first",
    status: "upcoming"
  },
  {
    id: "cons2", 
    participants: [
      { name: "Alex Johnson", seed: 8, school: "City College" },
      { name: "Chris Williams", seed: 9, school: "Valley High" }
    ],
    round: "consolation-first",
    status: "upcoming"
  }
];

const sampleMatchClickHandler = (match) => {
  console.log('Consolation match clicked:', match);
  alert(`Clicked on consolation match: ${match.id}`);
};

export const BasicStructure: Story = {
  args: {
    matches: [],
  },
  parameters: {
    docs: {
      description: {
        story: 'Basic consolation bracket structure with no matches - shows placeholder content.',
      },
    },
  },
};

export const WithMatches: Story = {
  args: {
    matches: sampleConsolationMatches,
    onMatchClick: sampleMatchClickHandler,
  },
  parameters: {
    docs: {
      description: {
        story: 'Consolation bracket with sample matches and click handler enabled.',
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
        story: 'Consolation bracket with matches but no click handler.',
      },
    },
  },
};

export const CustomDimensions: Story = {
  args: {
    matches: sampleConsolationMatches,
    width: 800,
    height: 500,
    onMatchClick: sampleMatchClickHandler,
  },
  parameters: {
    docs: {
      description: {
        story: 'Consolation bracket with custom width and height dimensions.',
      },
    },
  },
};

export const WithCustomStyling: Story = {
  args: {
    matches: sampleConsolationMatches,
    className: "border-2 border-red-300 rounded-lg p-4",
    onMatchClick: sampleMatchClickHandler,
  },
  parameters: {
    docs: {
      description: {
        story: 'Consolation bracket with custom CSS styling applied.',
      },
    },
  },
};