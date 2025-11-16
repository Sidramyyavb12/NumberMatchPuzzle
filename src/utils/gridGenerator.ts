import { Cell } from '../types/game.types';
import { GameLevel } from '../types/game.types';

/**
 * Generate a grid of numbers for the game
 * Ensures ALL cells have valid matches (guaranteed solvable)
 */
export function generateGrid(level: GameLevel): Cell[][] {
  const grid: Cell[][] = [];
  const totalCells = level.rows * level.cols;
  
  // Ensure even number of cells for pairing
  const pairsNeeded = Math.floor(totalCells / 2);
  
  // Generate guaranteed matching pairs
  // Strategy: More equal pairs (easier) and some sum-to-10 pairs
  const pairs: number[][] = [];
  
  // Prefer equal pairs for easier matching (70% equal, 30% sum-to-10)
  for (let i = 0; i < pairsNeeded; i++) {
    if (i % 10 < 7) {
      // Equal pairs (easier to spot) - 70% of pairs
      const num = ((i * 2) % 9) + 1; // Cycle through 1-9
      pairs.push([num, num]);
    } else {
      // Sum to 10 pairs - 30% of pairs
      const sumPairs = [[1, 9], [2, 8], [3, 7], [4, 6], [5, 5]];
      const pair = sumPairs[i % sumPairs.length];
      pairs.push([pair[0], pair[1]]);
    }
  }
  
  // Flatten pairs into single array
  const flatNumbers: number[] = [];
  pairs.forEach(pair => {
    flatNumbers.push(...pair);
  });
  
  // If odd number of cells, add one more number with its match
  if (totalCells % 2 === 1) {
    const extraNum = Math.floor(Math.random() * 9) + 1;
    flatNumbers.push(extraNum);
    // Find a match for it
    const matchNum = Math.random() > 0.5 ? extraNum : (10 - extraNum);
    if (matchNum >= 1 && matchNum <= 9) {
      flatNumbers.push(matchNum);
    } else {
      flatNumbers.push(extraNum); // Fallback to equal pair
    }
  }
  
  // Shuffle array to randomize positions
  shuffleArray(flatNumbers);
  
  // Create grid
  let idCounter = 1;
  for (let row = 0; row < level.rows; row++) {
    const rowCells: Cell[] = [];
    for (let col = 0; col < level.cols; col++) {
      const index = row * level.cols + col;
      if (index < flatNumbers.length) {
        rowCells.push({
          id: `cell-${idCounter++}`,
          value: flatNumbers[index],
          matched: false,
          row,
          col,
        });
      }
    }
    if (rowCells.length > 0) {
      grid.push(rowCells);
    }
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

