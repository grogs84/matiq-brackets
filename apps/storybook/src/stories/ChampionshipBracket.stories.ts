import type { Meta, StoryObj } from '@storybook/react';
import React from 'react';
import { ChampionshipBracket } from 'matiq-brackets';
import { sampleChampionshipMatches, sampleChampionshipBracket3, sampleMatchClickHandler } from '../../../../sample-data/championship-bracket.js';

const meta: Meta<typeof ChampionshipBracket> = {
  title: 'Wrestling Brackets/ChampionshipBracket',
  component: ChampionshipBracket,
  parameters: {
    layout: 'fullscreen',
  },
  argTypes: {
    matches: {
      description: 'Array of championship match objects with embedded participant data',
      control: { type: 'object' },
    },
    onMatchClick: {
      description: 'Optional callback function when a match is clicked',
      control: false, // Functions can't be controlled in Storybook UI
      action: 'match-clicked', // This will log clicks in the Actions panel
    },
  },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    matches: sampleChampionshipMatches,
    onMatchClick: sampleMatchClickHandler,
  },
};

export const MinimalStyling: Story = {
  args: {
    matches: sampleChampionshipMatches,
    onMatchClick: sampleMatchClickHandler,
  },
  render: (args) => {
    return React.createElement('div', {
      style: { 
        padding: '20px', 
        backgroundColor: '#f5f5f5',
        minHeight: '100vh'
      }
    }, [
      React.createElement('h3', { 
        key: 'title',
        style: { marginBottom: '10px', color: '#333' } 
      }, 'Minimal Container Styling'),
      React.createElement(ChampionshipBracket, { 
        key: 'bracket', 
        matches: args.matches,
        onMatchClick: args.onMatchClick
      })
    ]);
  },
  parameters: {
    docs: {
      description: {
        story: 'Championship bracket with minimal container styling to isolate component design from demo app layout.',
      },
    },
  },
};

export const NakedComponent: Story = {
  args: {
    matches: sampleChampionshipMatches,
    onMatchClick: sampleMatchClickHandler,
  },
  parameters: {
    docs: {
      description: {
        story: 'Pure component with no container styling - shows raw component design.',
      },
    },
  },
};

export const UnorderedDataTest: Story = {
  args: {
    matches: sampleChampionshipBracket3,
    onMatchClick: sampleMatchClickHandler,
  },
  render: (args) => {
    return React.createElement('div', {
      style: { 
        padding: '10px',
        backgroundColor: 'white',
        border: '1px solid #ddd'
      }
    }, [
      React.createElement('h3', { 
        key: 'title',
        style: { color: '#d63384', marginBottom: '10px' } 
      }, 'Unordered Data (Testing Positioning Algorithm)'),
      React.createElement(ChampionshipBracket, { 
        key: 'bracket', 
        matches: args.matches,
        onMatchClick: args.onMatchClick
      })
    ]);
  },
  parameters: {
    docs: {
      description: {
        story: 'Tests component with unordered match data to verify tournament tree positioning works correctly.',
      },
    },
  },
};

export const OrderedDataComparison: Story = {
  args: {
    matches: sampleChampionshipMatches,
    onMatchClick: sampleMatchClickHandler,
  },
  render: (args) => {
    return React.createElement('div', {
      style: { 
        padding: '10px',
        backgroundColor: 'white',
        border: '1px solid #ddd'
      }
    }, [
      React.createElement('h3', { 
        key: 'title',
        style: { color: '#198754', marginBottom: '10px' } 
      }, 'Ordered Data (Expected to Work)'),
      React.createElement(ChampionshipBracket, { 
        key: 'bracket', 
        matches: args.matches,
        onMatchClick: args.onMatchClick
      })
    ]);
  },
  parameters: {
    docs: {
      description: {
        story: 'Baseline test with properly ordered match data for comparison.',
      },
    },
  },
};