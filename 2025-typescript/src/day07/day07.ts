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

export const exploreWorlds = (
  rows: string[],
  columnIndex: number,
  rowIndex: number,
  visited: string
): Set<string> => {
  for (let i = rowIndex + 1; i < rows.length; i++) {
    const curr = rows[i].charAt(columnIndex);
    if (curr !== "." && curr !== "^") return visited;
    if (curr === "^") {
      const next = visited + `&${rowIndex}.${columnIndex}`;
      const left = exploreWorlds(rows, columnIndex - 1, i, next);
      const right = exploreWorlds(rows, columnIndex + 1, i, next);
      rows[i] = rows[i]
        .split("")
        .map((b, j) => (j === columnIndex ? "*" : b))
        .join("");
      return left + right;
    }
  }
  console.log("returning visited", rowIndex, columnIndex, visited);
  return visited; // base case
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
  const result = exploreWorlds(rows, start, 0, 1);
  return result;
};
