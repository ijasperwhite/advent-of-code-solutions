type Vector = {
  x: number;
  y: number;
};
const vectors: Vector[] = [
  { x: 1, y: 1 },
  { x: 0, y: 1 },
  { x: -1, y: 1 },
  { x: -1, y: 0 },
  { x: -1, y: -1 },
  { x: 0, y: -1 },
  { x: 1, y: -1 },
  { x: 1, y: 0 },
];

export const generateArray = (s: string) =>
  s.split("\n").map((i) => i.split(""));

export const countPaper = (arr: string[][], current: Vector): number => {
  return vectors.reduce((sum, v) => {
    try {
      const next = arr[current.y + v.y][current.x + v.x];
      if (next === "@") return sum + 1;
      return sum;
    } catch {
      return sum; // out of bounds
    }
  }, 0);
};

const countPaperInArray = (
  arr: string[][]
): { count: number; nextArr: string[][] } => {
  const nextArr = arr.map((row) => [...row]);
  const count = arr.reduce(
    (total, newCol, y) =>
      total +
      newCol.reduce((rowTotal, next, x) => {
        if ("." === next) return rowTotal;
        if (countPaper(arr, { x, y }) >= 4) return rowTotal;
        nextArr[y][x] = ".";
        return rowTotal + 1;
      }, 0),
    0
  );
  return { count, nextArr };
};

export const partOne = (s: string) => {
  const arr = generateArray(s);
  return countPaperInArray(arr).count;
};

export const partTwo = (s: string) => {
  let arr = generateArray(s);
  let [nextCount, finalCount] = [0, 0];
  do {
    const { count, nextArr } = countPaperInArray(arr);
    [nextCount, arr] = [count, nextArr];
    finalCount += count;
  } while (nextCount > 0);
  return finalCount;
};
