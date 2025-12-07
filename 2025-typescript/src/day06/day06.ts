export const getValuesOrSymbols = (s: string): number[] | string[] => {
  const digits = s.match(/\d+/g);
  if (digits) {
    return digits.map(Number);
  }
  const symbols = s.match(/\+|\*/g);
  if (!symbols) return [];
  return symbols.map(String);
};

export const partOne = (s: string) => {
  const rows = s.split("\n").map(getValuesOrSymbols);
  const symbols = rows.find((i) => typeof i[0] === "string") as string[];
  const nums = rows.filter((i) => typeof i[0] === "number") as number[][];

  return symbols.reduce((sum, next, i) => {
    return (
      sum +
      nums.reduce(
        (colSum, nextRow) => {
          return next === "*" ? colSum * nextRow[i] : colSum + nextRow[i];
        },
        next === "*" ? 1 : 0
      )
    );
  }, 0);
};

export const partTwo = (s: string) => {
  const rows = s.split("\n").map((i) => i.split(""));
  const symbols = rows[rows.length - 1];
  rows.pop();
  let sum = [];
  let a = "";
  let curr = 0;
  for (let i = 0; i < symbols.length; i++) {
    if (symbols[i] === "*") {
      a = symbols[i];
      sum.push(curr);
      curr = 1;
    }
    if (symbols[i] === "+") {
      a = symbols[i];
      sum.push(curr);
      curr = 0;
    }
    let temp = "";
    for (let j = 0; j < rows.length; j++) {
      temp += rows[j][i];
    }

    if (a === "*" && Number(temp) !== 0) curr *= Number(temp);
    if (a === "+" && Number(temp) !== 0) curr += Number(temp);
  }
  return [...sum, curr].reduce((sum, next) => {
    return sum + next;
  }, 0);
};
