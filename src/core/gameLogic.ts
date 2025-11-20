import ScoreManager from './ScoreManager';

export type Tile = number | null;

/**
 * Check adjacency for a grid represented as a flat array with `cols` columns.
 * Adjacent = up / down / left / right (no diagonals).
 */
export function areAdjacent(a: number, b: number, cols: number) {
    if (a === b) return false;
    const rowA = Math.floor(a / cols);
    const colA = a % cols;
    const rowB = Math.floor(b / cols);
    const colB = b % cols;
    const dr = Math.abs(rowA - rowB);
    const dc = Math.abs(colA - colB);
    return (dr === 1 && dc === 0) || (dr === 0 && dc === 1);
}

/**
 * Attempt to match two indices. If they are adjacent and values equal (non-null),
 * clear them (set to null) and add points to scoreManager.
 * returns an object describing the result.
 */
export function tryMatch(
    grid: Tile[],
    cols: number,
    idxA: number,
    idxB: number,
    scoreManager: ScoreManager,
    pointsPerMatch = 10
) {
    const valueA = grid[idxA];
    const valueB = grid[idxB];

    if (valueA == null || valueB == null) {
        return { matched: false, reason: 'empty', newGrid: grid.slice(), points: 0 };
    }

    if (!areAdjacent(idxA, idxB, cols)) {
        return { matched: false, reason: 'not_adjacent', newGrid: grid.slice(), points: 0 };
    }

    if (valueA !== valueB) {
        return { matched: false, reason: 'different', newGrid: grid.slice(), points: 0 };
    }

    // It's a valid match: clear both tiles and give points
    const newGrid = grid.slice();
    newGrid[idxA] = null;
    newGrid[idxB] = null;

    scoreManager.add(pointsPerMatch);

    return { matched: true, reason: 'ok', newGrid, points: pointsPerMatch };
}