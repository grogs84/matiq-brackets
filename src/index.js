/**
 * Wrestling Bracket Components Package
 * Following component-first design with embedded data approach
 */

export { default as ChampionshipBracket } from './components/ChampionshipBracket.jsx';

// Temporary placeholder for ConsolationBracket until implemented
const ConsolationBracket = ({ matches, onMatchClick }) => {
  return (
    <div className="consolation-bracket">
      <h3 className="text-lg font-bold mb-4">Consolation Bracket</h3>
      <div className="text-center text-gray-500 py-8">
        <p>Consolation Bracket component coming soon...</p>
        <p className="text-sm mt-2">
          {matches?.length || 0} consolation matches ready for implementation
        </p>
        <div className="mt-4 text-xs">
          <p>Complex double elimination with wrestling-specific flow patterns</p>
          <p>Championship losers drop down at specific positions</p>
        </div>
      </div>
    </div>
  );
};

export { ConsolationBracket };
