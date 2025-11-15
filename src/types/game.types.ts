export interface Cell {
  id: string;
  value: number;
  matched: boolean;
  row: number;
  col: number;
}

export interface GameLevel {
  id: number;
  name: string;
  rows: number;
  cols: number;
  initialVisibleRows: number;
  maxRows: number;
  timeLimit: number; // in seconds
  description: string;
}

export type GameStatus = 'playing' | 'won' | 'lost' | 'paused';

export interface GameState {
  level: number;
  grid: Cell[][];
  selectedCell: Cell | null;
  matchedPairs: number;
  status: GameStatus;
  visibleRows: number;
  startTime: number;
}

