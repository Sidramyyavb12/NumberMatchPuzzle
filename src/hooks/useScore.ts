// src/hooks/useScore.ts
import { useState, useRef } from "react";
import { ScoreManager, ScoreConfig } from "../core/score";

export interface UseScoreReturn {
  value: number;
  addMatch: (x?: number) => void;
  reset: () => void;
  breakCombo: () => void;
}

export function useScore(config?: ScoreConfig): UseScoreReturn {
  // ScoreManager behaves like a modular package instance
  const managerRef = useRef(new ScoreManager(config));
  const [, setTick] = useState(0); // Used only to trigger rerenders

  const manager = managerRef.current;

  const update = () => setTick((t) => t + 1);

  return {
    value: manager.value,

    addMatch: (x = 1) => {
      manager.addMatch(x);
      update();
    },

    reset: () => {
      manager.reset();
      update();
    },

    breakCombo: () => {
      manager.breakCombo();
    },
  };
}
