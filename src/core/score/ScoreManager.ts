// src/core/score/ScoreManager.ts

export interface ScoreConfig {
  base?: number;             // Base score per match
  comboMultiplier?: number;  // How much combo increases
}

export class ScoreManager {
  private score = 0;
  private combo = 1;

  private cfg: Required<ScoreConfig>;

  constructor(config?: ScoreConfig) {
    // Normalize configuration with defaults (safer in real projects)
    this.cfg = {
      base: config?.base ?? 10,
      comboMultiplier: config?.comboMultiplier ?? 1,
    };
  }

  /** Current score value */
  get value(): number {
    return this.score;
  }

  /** Current combo multiplier value */
  get comboValue(): number {
    return this.combo;
  }

  /** Reset score + combo to initial state */
  reset(): void {
    this.score = 0;
    this.combo = 1;
  }

  /**
   * Adds score based on match count and combo.
   * Automatically increases combo.
   */
  addMatch(matches = 1): number {
    if (matches < 1) matches = 1;

    const increment = this.cfg.base * matches * this.combo;
    this.score += increment;

    // Increase combo for consecutive matches
    this.combo += this.cfg.comboMultiplier;

    return this.score;
  }

  /** Breaks combo streak */
  breakCombo(): void {
    this.combo = 1;
  }
}
