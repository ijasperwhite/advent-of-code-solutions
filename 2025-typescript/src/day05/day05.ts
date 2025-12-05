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

export const mergeRanges = (range: Range, allRanges: Range[]): Range[] => {
  if (allRanges.length === 0) return [range];
  // in middle
  if (allRanges.some((i) => i.first < range.first && i.last > range.last)) {
    console.log("in middle of range", range, allRanges);
    return allRanges;
  }
  // new range
  if (allRanges.every((i) => range.first > i.last || range.last < i.first)) {
    console.log("adding new range", range, allRanges);
    return [...allRanges, range].sort((a, b) => a.first - b.first);
  }
  const firstOverLapIndex = allRanges.findIndex(
    (i) => range.first <= i.last && range.first >= i.first
  );
  const lastOverlapIndex = allRanges.findIndex(
    (i) => range.last >= i.first && range.last <= i.last
  );

  //console.log(firstOverLapIndex, lastOverlapIndex);
  const result = [...allRanges];

  if (firstOverLapIndex >= 0 && lastOverlapIndex >= 0) {
    console.log(
      "merging two three ranges",
      range,
      allRanges[firstOverLapIndex],
      allRanges[lastOverlapIndex]
    );

    result.splice(firstOverLapIndex, 1);
    result.splice(lastOverlapIndex - 1, 1);
    return [
      ...result,
      {
        first: allRanges[firstOverLapIndex].first,
        last: allRanges[lastOverlapIndex].last,
      },
    ].sort((a, b) => a.first - b.first);
  }
  if (firstOverLapIndex >= 0) {
    console.log("first value overlap", range, allRanges[firstOverLapIndex]);

    result.splice(firstOverLapIndex, 1);
    return [
      ...result,
      {
        first: allRanges[firstOverLapIndex].first,
        last: range.last,
      },
    ].sort((a, b) => a.first - b.first);
  }
  if (lastOverlapIndex >= 0) {
    console.log("last value overlap", range, allRanges[lastOverlapIndex]);

    result.splice(lastOverlapIndex, 1);
    return [
      ...result,
      {
        first: range.first,
        last: allRanges[lastOverlapIndex].last,
      },
    ].sort((a, b) => a.first - b.first);
  }

  return [];
};

export const partTwo = (s: string) => {
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
  const merged = ranges.reduce((sum, next, i) => {
    if (i >= 20) return sum;
    console.log(i, "next item", next, "merged", sum);
    return mergeRanges(next, sum);
  }, [] as Range[]);

  console.log("merged", merged);

  return merged.reduce((sum, next) => {
    return sum + (next.last - next.first + 1);
  }, 0);
};
