# Wrestling Bracket Visualization

Interactive NCAA D1 wrestling tournament bracket visualization built with React + Vite and Tailwind CSS.

## Project Overview

This application visualizes NCAA D1 wrestling tournament brackets with complex double elimination structures. Wrestling tournaments have unique flow patterns where losers from the championship bracket enter the consolation bracket at specific positions, creating non-linear tournament flows.

## Features

- **Championship Bracket**: 32-man single elimination tournament tree
- **Consolation Bracket**: Complex double elimination with wrestling-specific flow rules
- **Tabbed Interface**: Separate views for championship and consolation brackets
- **SVG Rendering**: Precise positioning and connecting lines for bracket visualization
- **Responsive Design**: Optimized for large bracket structures

## Technical Stack

- **Frontend**: React 18 + Vite
- **Styling**: Tailwind CSS
- **Rendering**: SVG-based bracket visualization
- **Data**: PostgreSQL integration (backend: Python/FastAPI)

## Development

### Prerequisites

- Node.js (v18+ recommended)
- npm

### Getting Started

1. Install dependencies:
   ```bash
   npm install
   ```

2. Start the development server:
   ```bash
   npm run dev
   ```

3. Open [http://localhost:5173](http://localhost:5173) to view the application

### Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint

## Wrestling Tournament Structure

### Championship Bracket
- Standard single elimination
- 32 wrestlers, 5 rounds to determine champion
- Winners advance, losers drop to consolation

### Consolation Bracket
- Complex double elimination system
- Championship bracket losers enter at specific positions
- Multiple paths back to placement matches
- Non-linear flow specific to wrestling rules

## Data Structure

Tournament data includes:
- Match results with winner/loser information
- "Next match" pointers for each wrestler after each match
- Round information ('champ 32', 'consi round 8', etc.)
- Wrestler seeds and tournament metadata
- Sample data from 2012 NCAA tournament (125lb weight class)

## Current Status

✅ Basic React app with tabbed interface  
✅ Wrestling-themed UI components  
✅ Tailwind CSS integration  
🔄 SVG bracket rendering (in development)  
🔄 Data integration with PostgreSQL backend  
🔄 Championship bracket visualization  
🔄 Consolation bracket complex flow implementation  

## Key Challenges

1. **Consolation Bracket Flow**: Wrestling's unique double elimination requires complex positioning algorithms
2. **Cross-bracket Connections**: Visual lines connecting matches across championship and consolation sections
3. **Responsive Layout**: Handling large bracket structures across different screen sizes
4. **Wrestling Rules**: Implementing sport-specific tournament advancement rules
