export const explore = (
  rows: string[],
  columnIndex: number,
  rowIndex: number,
  visited: Set<string>
): Set<string> => {
  for (let i = rowIndex + 1; i < rows.length; i++) {
    if (rows[i].charAt(columnIndex) === "^") {
      console.log("explore next", i, "on column  +/-", columnIndex);
      visited.add(`${rowIndex}-${columnIndex}`);
      const left = explore(rows, columnIndex - 1, i, visited);
      const right = explore(rows, columnIndex + 1, i, visited);
      return new Set([...visited, ...left, ...right]);
    }
  }
  return visited; // base case
};

export const partOne = (s: string) => {
  const rows = s.split("\n");
  const start = rows[0].indexOf("S");
  console.log("starting at", start);
  const visited = new Set<string>();
  return explore(rows, start, 0, visited).size - 1;
};

export const partTwo = (s: string) => {
  return 0;
};
