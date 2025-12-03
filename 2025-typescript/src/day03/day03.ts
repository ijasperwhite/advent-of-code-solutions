export const search = (s: string, l: number): string => {
  for (let n = 9; n > 0; n--) {
    for (let a = 0; a < s.length - l + 1; a++) {
      if (s[a] === String(n)) {
        if (l === 1) return s[a]; // base case
        return s[a] + search(s.slice(a + 1, s.length), l - 1); // recursion
      }
    }
  }
  return s;
};

const sum = (a: number, b: number) => a + b;

export const partOne = (s: string) => {
  return s
    .split("\n")
    .map((row) => Number(search(row, 2)))
    .reduce(sum);
};

export const partTwo = (s: string) => {
  return s
    .split("\n")
    .map((row) => Number(search(row, 12)))
    .reduce(sum);
};
