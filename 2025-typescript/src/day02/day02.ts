export const getProductIds = (
  s: string,
  isPartOne: boolean
): { first: number; last: number; isPartOne: boolean }[] => {
  const matches = s.match(/\d+-\d+/g);
  if (!matches) return [];
  return matches.map((i) => {
    const split = i.split("-");
    return { first: Number(split[0]), last: Number(split[1]), isPartOne };
  });
};

export const splitString = (s: string, size: number): string[] =>
  String(s)
    .match(new RegExp(".{1," + size + "}", "g"))
    ?.map(String) ?? [];

export const getInvalidIds = (range: {
  first: number;
  last: number;
  isPartOne: boolean;
}): number[] => {
  const invalids = new Set<number>();
  while (range.first <= range.last) {
    const next = String(range.first);
    if (next.length % 2 === 0) {
      const one = next.slice(0, next.length / 2);
      const two = next.slice(next.length / 2, next.length);
      if (one === two) invalids.add(range.first);
    }
    if (!range.isPartOne) {
      let n = 1;
      while (n < Math.ceil(next.length / 2)) {
        if (new Set(splitString(next, n)).size === 1) {
          invalids.add(range.first);
          break;
        }
        n++;
      }
    }
    range.first++;
  }
  return [...invalids];
};

const sum = (a: number, b: number) => a + b;

export const partOne = (s: string) =>
  getProductIds(s, true).map(getInvalidIds).flat().reduce(sum);

export const partTwo = (s: string) =>
  getProductIds(s, false).map(getInvalidIds).flat().reduce(sum);
