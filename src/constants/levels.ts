import { GameLevel } from '../types/game.types';

export const LEVELS: GameLevel[] = [
  {
    id: 1,
    name: 'Level 1 - Easy',
    rows: 4,
    cols: 4,
    initialVisibleRows: 3,
    maxRows: 4,
    timeLimit: 120, // 2 minutes
    description: 'Match numbers that are equal or sum to 10',
  },
  {
    id: 2,
    name: 'Level 2 - Medium',
    rows: 7,
    cols: 6,
    initialVisibleRows: 4,
    maxRows: 7,
    timeLimit: 120, // 2 minutes
    description: 'More numbers, more challenge!',
  },
  {
    id: 3,
    name: 'Level 3 - Hard',
    rows: 8,
    cols: 7,
    initialVisibleRows: 4,
    maxRows: 8,
    timeLimit: 120, // 2 minutes
    description: 'The ultimate challenge!',
  },
];

export const GAME_CONFIG = {
  CELL_SIZE: 60,
  CELL_MARGIN: 8,
  ANIMATION_DURATION: 300,
  SHAKE_DURATION: 500,
};

