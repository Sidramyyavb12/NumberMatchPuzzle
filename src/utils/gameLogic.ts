import { Cell } from '../types/game.types';

/**
 * Check if two cells can be matched
 * Match rule: cells are equal OR sum to 10
 */
export function canMatch(cell1: Cell, cell2: Cell): boolean {
  if (cell1.matched || cell2.matched) return false;
  if (cell1.id === cell2.id) return false;
  
  return cell1.value === cell2.value || cell1.value + cell2.value === 10;
}

/**
 * Check if all cells in the grid are matched
 */
export function isGameComplete(grid: Cell[][]): boolean {
  for (const row of grid) {
    for (const cell of row) {
      if (!cell.matched) return false;
    }
  }
  return true;
}

/**
 * Check if there are any possible matches remaining
 */
export function hasPossibleMatches(grid: Cell[][]): boolean {
  const unmatchedCells: Cell[] = [];
  
  for (const row of grid) {
    for (const cell of row) {
      if (!cell.matched) {
        unmatchedCells.push(cell);
      }
    }
  }
  
  // Check all pairs
  for (let i = 0; i < unmatchedCells.length; i++) {
    for (let j = i + 1; j < unmatchedCells.length; j++) {
      if (canMatch(unmatchedCells[i], unmatchedCells[j])) {
        return true;
      }
    }
  }
  
  return false;
}

/**
 * Find a valid matching pair in the grid
 * Returns the IDs of two cells that can be matched, or null if no match exists
 */
export function findHintPair(grid: Cell[][], visibleRows: number): { cell1Id: string; cell2Id: string } | null {
  const unmatchedCells: Cell[] = [];
  
  // Only check visible rows
  for (let row = 0; row < Math.min(visibleRows, grid.length); row++) {
    for (const cell of grid[row]) {
      if (!cell.matched) {
        unmatchedCells.push(cell);
      }
    }
  }
  
  // Find first valid pair
  for (let i = 0; i < unmatchedCells.length; i++) {
    for (let j = i + 1; j < unmatchedCells.length; j++) {
      if (canMatch(unmatchedCells[i], unmatchedCells[j])) {
        return {
          cell1Id: unmatchedCells[i].id,
          cell2Id: unmatchedCells[j].id,
        };
      }
    }
  }
  
  return null;
}

