export const explore = (
  rows: string[],
  columnIndex: number,
  rowIndex: number
): number => {
  for (let i = rowIndex + 1; i < rows.length; i++) {
    if (rows[i].charAt(columnIndex) === "*") return 0; // don't double count
    if (rows[i].charAt(columnIndex) === "^") {
      rows[i] = rows[i]
        .split("")
        .map((b, j) => (j === columnIndex ? "*" : b))
        .join("");

      const left = explore(rows, columnIndex - 1, i);
      const right = explore(rows, columnIndex + 1, i);
      return 1 + right + left;
    }
  }
  return 0; // base case
};

const cache = new Map<string, number>();

export const exploreWorlds = (
  rows: string[],
  columnIndex: number,
  rowIndex: number
): number => {
  for (let i = rowIndex + 1; i < rows.length; i++) {
    if (rows[i].charAt(columnIndex) === "^") {
      if (cache.has(`${rowIndex}_${columnIndex}`)) {
        return cache.get(`${rowIndex}_${columnIndex}`)!;
      }
      const left = exploreWorlds(rows, columnIndex - 1, i);
      const right = exploreWorlds(rows, columnIndex + 1, i);
      cache.set(`${rowIndex}_${columnIndex}`, right + left);

      return right + left;
    }
  }
  return 1; // base case
};

export const partOne = (s: string) => {
  const rows = s.split("\n");
  const start = rows[0].indexOf("S");
  const result = explore(rows, start, 0);
  return result;
};

export const partTwo = (s: string) => {
  const rows = s.split("\n");
  const start = rows[0].indexOf("S");
  const result = exploreWorlds(rows, start, 0);
  return result;
};
