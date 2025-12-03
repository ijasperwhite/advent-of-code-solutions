// PART ONE & PART TWO
type Galaxy = {
  x: number;
  y: number;
};

const transposeArray = (arr: number[][]) =>
  arr.map((_, colIndex) => arr.map((row) => row[colIndex]));

const toDistances = (s: string, multi: number): number[][] => {
  const rows = s.split("\n").map((r) => r.split(""));
  const rowDistances = rows.map((curr) => {
    const isFar = curr.every((e) => e === ".");
    return curr.map((x) => {
      return isFar ? multi : x === "#" ? 0 : 1;
    });
  });
  const columnDistances = transposeArray(rowDistances).map((curr, i) => {
    const isFar = curr.every((e) => e === 1 || e === multi);
    return curr.map((x) => {
      return isFar && x === multi
        ? multi * multi
        : isFar && x === 1
        ? multi
        : x === 0
        ? 1
        : x;
    });
  });
  return [...transposeArray(columnDistances)];
};

export const getGalaxies = (s: string): Galaxy[] => {
  return s.split("\n").flatMap((column, y) => {
    return column.split("").reduce((galaxies, curr, x) => {
      if (curr === "#") galaxies.push({ x, y });
      return galaxies;
    }, [] as Galaxy[]);
  });
};

export const getDistance = (
  a: Galaxy,
  b: Galaxy,
  distances: number[][]
): number => {
  const [xMin, xMax] = [Math.min(a.x, b.x), Math.max(a.x, b.x)];
  const [yMin, yMax] = [Math.min(a.y, b.y), Math.max(a.y, b.y)];
  return (
    [...new Array(xMax - xMin)].reduce(
      (sumX, _, i) => sumX + distances[yMin][xMin + i],
      0
    ) +
    [...new Array(yMax - yMin)].reduce(
      (sumY, _, i) => sumY + distances[yMin + i][xMin],
      0
    )
  );
};

export const subsetValues = (g: Galaxy[]): Galaxy[][] => {
  const subsets = new Set<Galaxy[]>();
  [...new Array(g.length)].forEach((_, i) => {
    [...new Array(g.length)].forEach((_, j) => {
      if (i !== j && i < j) subsets.add([g[i], g[j]]);
    });
  });
  return [...subsets];
};

export const solve = (s: string, multi: number) => {
  const universe = {
    distances: toDistances(s, multi),
    galaxies: getGalaxies(s),
  };
  return subsetValues(universe.galaxies).reduce(
    (sum, curr) => sum + getDistance(curr[0], curr[1], universe.distances),
    0
  );
};
