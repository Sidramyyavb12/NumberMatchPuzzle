import { Cell } from '../types/game.types';
import { GameLevel } from '../types/game.types';

/**
 * Generate a grid of numbers for the game
 * Ensures there are valid matches available
 */
export function generateGrid(level: GameLevel): Cell[][] {
  const grid: Cell[][] = [];
  const totalCells = level.rows * level.cols;
  
  // Generate numbers (1-9) ensuring pairs that can match
  const numbers: number[] = [];
  
  // Add pairs that sum to 10
  const pairs = [
    [1, 9], [2, 8], [3, 7], [4, 6], [5, 5],
    [1, 9], [2, 8], [3, 7], [4, 6],
  ];
  
  // Add equal pairs
  for (let i = 1; i <= 9; i++) {
    pairs.push([i, i]);
  }
  
  // Flatten and shuffle
  const flatNumbers: number[] = [];
  pairs.forEach(pair => {
    flatNumbers.push(...pair);
  });
  
  // Fill remaining cells with random numbers
  while (flatNumbers.length < totalCells) {
    flatNumbers.push(Math.floor(Math.random() * 9) + 1);
  }
  
  // Shuffle array
  shuffleArray(flatNumbers);
  
  // Create grid
  let idCounter = 1;
  for (let row = 0; row < level.rows; row++) {
    const rowCells: Cell[] = [];
    for (let col = 0; col < level.cols; col++) {
      const index = row * level.cols + col;
      rowCells.push({
        id: `cell-${idCounter++}`,
        value: flatNumbers[index] || Math.floor(Math.random() * 9) + 1,
        matched: false,
        row,
        col,
      });
    }
    grid.push(rowCells);
  }
  
  return grid;
}

/**
 * Fisher-Yates shuffle algorithm
 */
function shuffleArray<T>(array: T[]): void {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
}

