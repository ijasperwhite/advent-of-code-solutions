type Range = {
  first: number;
  last: number;
};

export const toRangeOrId = (s: string): Range | number | null => {
  const match = s.match(/\d+/g);
  if (!match || match.length > 2) return null;
  if (match.length === 1) return Number(match[0]);
  return { first: Number(match[0]), last: Number(match[1]) };
};

export const isFresh = (id: number, ranges: Range[]): boolean => {
  return ranges.some((r) => r.first <= id && r.last >= id);
};

export const partOne = (s: string) => {
  const { ids, ranges } = s.split("\n").reduce(
    (sum, row) => {
      const rangeOrId = toRangeOrId(row);
      if (!rangeOrId) return sum;
      if (rangeOrId)
        if (typeof rangeOrId === "number") {
          return { ...sum, ids: [...sum.ids, rangeOrId] };
        }
      return { ...sum, ranges: [...sum.ranges, rangeOrId as Range] };
    },
    { ranges: [], ids: [] } as { ranges: Range[]; ids: number[] }
  );
  return ids.reduce((sum, next) => {
    if (isFresh(next, ranges)) return sum + 1;
    return sum;
  }, 0);
};

export const toRange = (s: string): Range => {
  const match = s.match(/\d+/g);
  if (!match || match.length !== 2) throw new Error("no range found");
  return { first: Number(match[0]), last: Number(match[1]) };
};

export const partTwo = (s: string) => {
  const ranges = s
    .split("\n\n")[0]
    .split("\n")
    .map(toRange)
    .sort((a, b) => a.first - b.first);
  console.log(ranges);
  let [counter, previous] = [0, 0];
  for (let i = 0; i < ranges.length; i++) {
    const { first, last } = ranges[i];
    if (last <= previous) {
      continue;
    }
    counter += last - Math.max(first, previous + 1) + 1;
    previous = Math.max(last, previous);
  }
  return counter;
};
