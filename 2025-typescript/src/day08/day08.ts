type Battery = {
  x: number;
  y: number;
  z: number;
};

type Circuit = {
  start: Battery;
  end: Battery;
  distance: number;
};

export const toBattery = (s: string): Battery => {
  const match = s.match(/\d+/g);
  if (!match) throw new Error("no battery for provided string");
  return { x: Number(match[0]), y: Number(match[1]), z: Number(match[2]) };
};

export const batteryToString = (b: Battery): string => `${b.x},${b.y},${b.z}`;

export const toDistance = (start: Battery, end: Battery): number => {
  return Math.sqrt(
    Math.pow(start.x - end.x, 2) +
      Math.pow(start.y - end.y, 2) +
      Math.pow(start.z - end.z, 2)
  );
};

export const getBatteryShortestDistance = (
  start: Battery,
  all: Battery[]
): Circuit | null => {
  return all.reduce((sum, end) => {
    if (batteryToString(start) === batteryToString(end)) return sum;
    const distance = toDistance(start, end);
    if (sum === null) return { start, end, distance };
    return distance < sum.distance ? { start, end, distance } : sum;
  }, null as Circuit | null);
};

export const getAllShortest = (all: Battery[]): Circuit[] => {
  return all
    .map((next, i) => {
      const nextAll = [...all].slice(i, all.length);
      const result = getBatteryShortestDistance(next, nextAll);
      if (result === null) return null;
      return {
        start: result.start,
        end: result.end,
        distance: result.distance,
      };
    })
    .filter((i) => !!i)
    .sort((a, b) => a.distance - b.distance);
};

export const addCircuit = (
  c: { start: string; end: string },
  result: Set<string>[]
): Set<string>[] => {
  let isNew = true;
  const addedIndex: number[] = [];
  [...result].forEach((item, i) => {
    if (item.has(c.start) || item.has(c.end)) {
      isNew = false;
      result[i].add(c.start);
      result[i].add(c.end);
      addedIndex.push(i);
    }
  });
  if (isNew) {
    result.push(new Set<string>([c.start, c.end]));
  }
  if (addedIndex.length === 2) {
    const a = result[addedIndex[0]];
    const b = result[addedIndex[1]];
    //console.log("a", a, "b", b);
    result.push(new Set([...a, ...b]));
    result.splice(addedIndex[0], 1);
    result.splice(addedIndex[1] - 1, 1);
  }
  return result;
};

export const partOne = (s: string, limit: number) => {
  const batteries = s.split("\n").map(toBattery);
  let circuits: Set<string>[] = [];
  const short = getAllShortest(batteries).map((a) => {
    return { start: batteryToString(a.start), end: batteryToString(a.end) };
  });
  console.log("shorted 10", short.slice(999, 1000));

  let [n, i] = [0, 0];
  do {
    try {
      circuits = addCircuit(short[n], circuits);
    } catch (e: unknown) {
      console.error("faid on n", n, short[n]);
      n = limit;
    }
    // console.log("next shortest to add", short[n]);
    n++;
  } while (n < limit - 1);
  console.log("current circuits", circuits);

  const sorted = circuits.map((i) => i.size).sort((a, b) => b - a);
  console.log("sorted sizes", sorted);

  return sorted[0] * sorted[1] * sorted[2];
};

export const partTwo = (s: string) => {
  return 0;
};
