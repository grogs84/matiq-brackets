/**
 * Tournament tree structure and layout utilities
 * 
 * This module provides a tree-based approach to bracket layout that is
 * independent of input data ordering, making it robust for various data scenarios.
 */

/**
 * Index matches by ID and build parent/child relationships
 */
const indexMatches = (matches) => {
  const map = new Map();
  const nodes = new Map();
  
  // First pass: create all nodes
  matches.forEach(match => {
    map.set(match.id, match);
    nodes.set(match.id, {
      id: match.id,
      children: [],
      parent: null,
      rank: -1, // Will be calculated
      slot: -1, // Will be calculated
      data: match
    });
  });
  
  // Second pass: link parent/child relationships
  matches.forEach(match => {
    const node = nodes.get(match.id);
    
    // Add children (previous matches)
    if (match.winner_prev_match_id && nodes.has(match.winner_prev_match_id)) {
      const child = nodes.get(match.winner_prev_match_id);
      node.children.push(child);
      child.parent = node;
    }
    
    if (match.loser_prev_match_id && nodes.has(match.loser_prev_match_id)) {
      const child = nodes.get(match.loser_prev_match_id);
      node.children.push(child);
      child.parent = node;
    }
  });
  
  return { map, nodes };
};

/**
 * Calculate rank (round number) for each node using BFS
 * Rank 0 = first round (no children), increasing towards final
 */
const calculateRanks = (nodes) => {
  // Find leaf nodes (first round matches - no children)
  const leafNodes = Array.from(nodes.values()).filter(node => node.children.length === 0);
  
  // BFS to assign ranks
  const queue = [...leafNodes];
  leafNodes.forEach(node => { node.rank = 0; });
  
  while (queue.length > 0) {
    const current = queue.shift();
    
    if (current.parent && current.parent.rank === -1) {
      // Check if all children have been assigned ranks
      const childrenRanks = current.parent.children.map(child => child.rank);
      if (childrenRanks.every(rank => rank !== -1)) {
        // Parent rank is max child rank + 1
        current.parent.rank = Math.max(...childrenRanks) + 1;
        queue.push(current.parent);
      }
    }
  }
};

/**
 * Calculate slot (vertical position within round) for stable ordering
 * Uses deterministic sorting to ensure consistent vertical order regardless of input order
 */
const calculateSlots = (nodes) => {
  // Group nodes by rank
  const rankGroups = new Map();
  
  nodes.forEach(node => {
    if (!rankGroups.has(node.rank)) {
      rankGroups.set(node.rank, []);
    }
    rankGroups.get(node.rank).push(node);
  });
  
  // For each rank, calculate slots using deterministic ordering
  rankGroups.forEach((rankNodes, rank) => {
    if (rank === 0) {
      // First round: sort by match ID for consistent ordering
      rankNodes.sort((a, b) => a.id.localeCompare(b.id));
      rankNodes.forEach((node, index) => {
        node.slot = index;
      });
    } else {
      // Later rounds: sort by the slots of their children (midpoint)
      rankNodes.sort((a, b) => {
        const aSlotSum = a.children.reduce((sum, child) => sum + child.slot, 0);
        const bSlotSum = b.children.reduce((sum, child) => sum + child.slot, 0);
        const aAvgSlot = aSlotSum / a.children.length;
        const bAvgSlot = bSlotSum / b.children.length;
        return aAvgSlot - bAvgSlot;
      });
      
      rankNodes.forEach((node, index) => {
        node.slot = index;
      });
    }
  });
};

/**
 * Build tournament tree structure from flat match array
 * Returns nodes organized by rank with stable positioning
 */
export const buildTournamentTree = (matches) => {
  if (matches.length === 0) return [];
  
  const { nodes } = indexMatches(matches);
  
  // Calculate ranks and slots
  calculateRanks(nodes);
  calculateSlots(nodes);
  
  // Group by rank and sort by slot within each rank
  const rankGroups = new Map();
  
  nodes.forEach(node => {
    if (node.rank !== -1) { // Only include nodes with valid ranks
      if (!rankGroups.has(node.rank)) {
        rankGroups.set(node.rank, []);
      }
      rankGroups.get(node.rank).push(node);
    }
  });
  
  // Sort each rank group by slot and convert to rounds array
  const rounds = [];
  const maxRank = Math.max(...Array.from(rankGroups.keys()));
  
  for (let rank = 0; rank <= maxRank; rank++) {
    if (rankGroups.has(rank)) {
      const rankNodes = rankGroups.get(rank);
      rankNodes.sort((a, b) => a.slot - b.slot);
      rounds.push(rankNodes);
    }
  }
  
  return rounds;
};

/**
 * Convert tree structure back to match array format for existing renderer
 * Maintains the stable ordering established by the tree algorithm
 */
export const treeToRounds = (tree) => {
  return tree.map(round => round.map(node => node.data));
};