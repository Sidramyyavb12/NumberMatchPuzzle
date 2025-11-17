import { GameLevel } from '../types/game.types';

/**
 * Generate levels with progressive difficulty
 * Levels 1-20: Easy (4x4 to 5x5 grids)
 * Levels 21-40: Medium (5x5 to 7x6 grids)
 * Levels 41-50: Hard (7x6 to 8x7 grids)
 */
function generateLevels(): GameLevel[] {
  const levels: GameLevel[] = [];

  // Easy Levels (1-20)
  for (let i = 1; i <= 20; i++) {
    // Progressive grid size: 4x4 to 5x5
    // Levels 1-10: 4x4, Levels 11-20: 5x5
    const rows = i <= 10 ? 4 : 5;
    const cols = i <= 10 ? 4 : 5;
    const initialVisibleRows = rows === 4 ? 3 : 4;
    
    levels.push({
      id: i,
      name: `Level ${i} - Easy`,
      rows,
      cols,
      initialVisibleRows,
      maxRows: rows,
      timeLimit: 120, // 2 minutes
      description: 'Match numbers that are equal or sum to 10',
    });
  }

  // Medium Levels (21-40)
  for (let i = 21; i <= 40; i++) {
    const levelInMedium = i - 20; // 1-20 within medium range
    // Progressive grid size: 5x5 to 7x6
    // Levels 21-25: 5x5, 26-30: 6x5, 31-35: 6x6, 36-40: 7x6
    let rows: number, cols: number;
    
    if (levelInMedium <= 5) {
      rows = 5;
      cols = 5;
    } else if (levelInMedium <= 10) {
      rows = 6;
      cols = 5;
    } else if (levelInMedium <= 15) {
      rows = 6;
      cols = 6;
    } else {
      rows = 7;
      cols = 6;
    }
    
    const initialVisibleRows = rows <= 5 ? 4 : rows - 2;
    
    levels.push({
      id: i,
      name: `Level ${i} - Medium`,
      rows,
      cols,
      initialVisibleRows,
      maxRows: rows,
      timeLimit: 120, // 2 minutes
      description: 'More numbers, more challenge!',
    });
  }

  // Hard Levels (41-50)
  for (let i = 41; i <= 50; i++) {
    const levelInHard = i - 40; // 1-10 within hard range
    // Progressive grid size: 7x6 to 8x7
    // Levels 41-45: 7x6, 46-50: 8x7
    const rows = levelInHard <= 5 ? 7 : 8;
    const cols = levelInHard <= 5 ? 6 : 7;
    const initialVisibleRows = rows === 7 ? 4 : 5;
    
    levels.push({
      id: i,
      name: `Level ${i} - Hard`,
      rows,
      cols,
      initialVisibleRows,
      maxRows: rows,
      timeLimit: 120, // 2 minutes
      description: 'The ultimate challenge!',
    });
  }

  return levels;
}

export const LEVELS: GameLevel[] = generateLevels();

export const GAME_CONFIG = {
  CELL_SIZE: 60,
  CELL_MARGIN: 8,
  ANIMATION_DURATION: 300,
  SHAKE_DURATION: 500,
};

