import { useState, useCallback } from 'react';
import { Cell, GameState, GameStatus } from '../types/game.types';
import { GameLevel } from '../types/game.types';
import { generateGrid } from '../utils/gridGenerator';
import { canMatch, isGameComplete, findHintPair } from '../utils/gameLogic';

export function useGameEngine(level: GameLevel) {
  const [gameState, setGameState] = useState<GameState>(() => {
    const grid = generateGrid(level);
    return {
      level: level.id,
      grid,
      selectedCell: null,
      matchedPairs: 0,
      status: 'playing' as GameStatus,
      visibleRows: level.initialVisibleRows,
      startTime: Date.now(),
    };
  });
  const [invalidMatchCellId, setInvalidMatchCellId] = useState<string | null>(null);
  const [hintCells, setHintCells] = useState<{ cell1Id: string; cell2Id: string } | null>(null);
  const [hintsUsed, setHintsUsed] = useState(0);

  const handleCellPress = useCallback((cell: Cell) => {
    // Clear hint when any cell is pressed
    setHintCells(null);
    
    setGameState((prev) => {
      // Don't allow interaction if game is not playing
      if (prev.status !== 'playing') return prev;

      // Don't allow clicking matched cells
      if (cell.matched) return prev;

      // If no cell is selected, select this one
      if (!prev.selectedCell) {
        return {
          ...prev,
          selectedCell: cell,
        };
      }

      // If clicking the same cell, deselect it
      if (prev.selectedCell.id === cell.id) {
        return {
          ...prev,
          selectedCell: null,
        };
      }

      // Check if cells can match
      if (canMatch(prev.selectedCell, cell)) {
        // Create new grid with matched cells
        const newGrid = prev.grid.map((row) =>
          row.map((c) => {
            if (c.id === prev.selectedCell!.id || c.id === cell.id) {
              return { ...c, matched: true };
            }
            return c;
          })
        );

        // Check if game is complete
        const completed = isGameComplete(newGrid);

        return {
          ...prev,
          grid: newGrid,
          selectedCell: null,
          matchedPairs: prev.matchedPairs + 1,
          status: completed ? 'won' : prev.status,
        };
      } else {
        // Invalid match - trigger animation
        setInvalidMatchCellId(cell.id);
        setTimeout(() => setInvalidMatchCellId(null), 500);
        
        return {
          ...prev,
          selectedCell: null,
        };
      }
    });
  }, []);

  const addRow = useCallback(() => {
    setGameState((prev) => {
      if (prev.visibleRows < level.maxRows) {
        return {
          ...prev,
          visibleRows: Math.min(prev.visibleRows + 1, level.maxRows),
        };
      }
      return prev;
    });
  }, [level.maxRows]);

  const resetGame = useCallback(() => {
    const grid = generateGrid(level);
    setGameState({
      level: level.id,
      grid,
      selectedCell: null,
      matchedPairs: 0,
      status: 'playing',
      visibleRows: level.initialVisibleRows,
      startTime: Date.now(),
    });
    setHintsUsed(0);
    setHintCells(null);
  }, [level]);

  const showHint = useCallback(() => {
    setGameState((prev) => {
      if (prev.status !== 'playing') return prev;
      
      const hintPair = findHintPair(prev.grid, prev.visibleRows);
      if (hintPair) {
        setHintCells(hintPair);
        setHintsUsed((prevHints) => prevHints + 1);
        
        // Clear hint after 3 seconds
        setTimeout(() => {
          setHintCells(null);
        }, 3000);
      }
      
      return prev;
    });
  }, []);

  const setGameStatus = useCallback((status: GameStatus) => {
    setGameState((prev) => ({ ...prev, status }));
  }, []);

  return {
    gameState,
    handleCellPress,
    addRow,
    resetGame,
    setGameStatus,
    invalidMatchCellId,
    hintCells,
    showHint,
    hintsUsed,
  };
}

