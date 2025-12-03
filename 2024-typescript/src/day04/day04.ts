const isXMAS = (s: string | null) => s === "XMAS";

type Vector = { x: number; y: number };

const scalars: Vector[] = [
  { x: 0, y: -1 },
  { x: -1, y: -1 },
  { x: -1, y: 0 },
  { x: -1, y: 1 },
  { x: 0, y: 1 },
  { x: 1, y: 1 },
  { x: 1, y: 0 },
  { x: 1, y: -1 },
];

export const getWordOrNull = (
  grid: string[][],
  vector: Vector,
  scalar: Vector,
  length: number
): string | null => {
  try {
    return Array.from(Array(length).keys()).reduce((sum, _, i) => {
      return sum + grid[vector.x + i * scalar.x][vector.y + i * scalar.y];
    }, "");
  } catch {
    return null;
  }
};

export const partOne = (s: string) => {
  const grid = s.split("\n").map((row) => row.split(""));
  return grid.reduce((total, row, x) => {
    return (
      total +
      row.reduce((rowTotal, _, y) => {
        return (
          rowTotal +
          scalars.reduce((sum, scalar) => {
            const word = getWordOrNull(grid, { x, y }, scalar, 4);
            if (isXMAS(word)) {
              return sum + 1;
            }
            return sum;
          }, 0)
        );
      }, 0)
    );
  }, 0);
};

export const getCrossOrNull = (grid: string[][], vec: Vector) => {
  try {
    const bottomLeftToTopRight =
      grid[vec.x - 1][vec.y + 1] +
      grid[vec.x][vec.y] +
      grid[vec.x + 1][vec.y - 1];
    const topLeftToBottomRight =
      grid[vec.x - 1][vec.y - 1] +
      grid[vec.x][vec.y] +
      grid[vec.x + 1][vec.y + 1];
    return [bottomLeftToTopRight, topLeftToBottomRight];
  } catch {
    return null;
  }
};

export const partTwo = (s: string) => {
  const grid = s.split("\n").map((row) => row.split(""));
  return grid.reduce((total, row, x) => {
    return (
      total +
      row.reduce((rowTotal, next, y) => {
        if (next !== "A") return rowTotal;
        const cross = getCrossOrNull(grid, { x, y });
        if (cross === null) return rowTotal;
        if (!cross.every((i) => i === "MAS" || i === "SAM")) return rowTotal;
        return 1 + rowTotal;
      }, 0)
    );
  }, 0);
};
