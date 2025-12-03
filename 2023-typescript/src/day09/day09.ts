// PART ONE

export const formatRow = (s: string) => s.split(" ").map(Number);

export const extrapolate = (arr: number[], isPartTwo: boolean): number => {
  if (arr.every((e) => e === 0)) return 0; // base case
  const next = arr.reduce((sum, _, i) => {
    if (i !== 0) sum.push(arr[i] - arr[i - 1]);
    return sum;
  }, [] as number[]);
  return isPartTwo
    ? arr[0] - extrapolate(next, true) // recursion part two
    : arr[arr.length - 1] + extrapolate(next, false); // recursion part one
};

export const solveOne = (s: string) => {
  return s.split("\n").reduce((sum, curr) => {
    return sum + extrapolate(formatRow(curr), false);
  }, 0);
};

// PART TWO

export const solveTwo = (s: string) => {
  return s.split("\n").reduce((sum, curr) => {
    return sum + extrapolate(formatRow(curr), true);
  }, 0);
};
