// PART ONE

export const formatRow = (s: string): number[] => {
  return s.match(/\d+/g)?.map(Number) ?? [];
};

export type Race = {
  time: number;
  distance: number;
  speed: number;
};

export const getRaceResult = (r: Race): boolean => {
  const result = (r.time - r.speed) * r.speed;
  return result > r.distance ? true : false;
};

// Could optimism this by getting the first and last win, then adding up all numbers in range
export const getAllWins = (t: number, d: number): number => {
  return [...new Array(t).keys()].reduce(
    (sum, next) =>
      getRaceResult({ time: t, distance: d, speed: next }) ? sum + 1 : sum,
    0
  );
};

export const solveOne = (s: string): number => {
  const rows = s.split("\n");
  const times = formatRow(rows[0]);
  const distances = formatRow(rows[1]);
  return times.reduce(
    (sum, _, i) => sum * getAllWins(times[i], distances[i]),
    1
  );
};

// PART TWO

export const mergeValues = (s: string): number => {
  return Number(s.match(/\d+/g)?.join("") ?? "0");
};

export const solveTwo = (s: string): number => {
  const rows = s.split("\n");
  return getAllWins(mergeValues(rows[0]), mergeValues(rows[1]));
};
