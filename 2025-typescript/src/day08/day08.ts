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
  if (!match) throw new Error("no batter for provided string");
  return {
    x: Number(match[0]),
    y: Number(match[1]),
    z: Number(match[2]),
  };
};

export const batteryToString = (b: Battery): string => `${b.x},${b.y},${b.z}`;

export const toDistance = (start: Battery, end: Battery): number => {
  return Math.sqrt(
    Math.pow(start.x - end.x, 2) +
      Math.pow(start.y - end.y, 2) +
      Math.pow(start.z - end.z, 2)
  );
};

const init: Circuit = {
  start: { x: 0, y: 0, z: 0 },
  end: { x: 0, y: 0, z: 0 },
  distance: 100_000,
};

export const getBatterShortestDistance = (
  start: Battery,
  all: Battery[],
  lower: number,
  circuits: Set<string>[]
): Circuit => {
  return all.reduce((sum, next) => {
    if (batteryToString(start) === batteryToString(next)) return sum;
    const d = toDistance(start, next);
    if (d === 0) return sum;

    // if start and next both feature in a single circuit, then is invalid.
    const a = batteryToString(start);
    const b = batteryToString(next);
    const isInvalid = circuits.find((i) => {
      i.has(a) && i.has(b);
    });
    if (!!isInvalid) return sum;

    return d < sum.distance && d > lower
      ? { start, end: next, distance: d }
      : sum;
  }, init);
};

export const getAllShortest = (
  all: Battery[],
  lower: number,
  circuits: Set<string>[]
): Circuit[] => {
  return all.map((next, i) => {
    const result = getBatterShortestDistance(next, all, lower, circuits);
    return { start: next, end: result.end, distance: result.distance };
  });
};

export const addCircuit = (
  c: Circuit,
  result: Set<string>[]
): Set<string>[] => {
  const [x, y] = [batteryToString(c.start), batteryToString(c.end)];
  let isNew = true;
  const addedIndex: number[] = [];
  [...result].forEach((item, i) => {
    if (item.has(x) || item.has(y)) {
      isNew = false;
      result[i].add(x);
      result[i].add(y);
      addedIndex.push(i);
    }
  });
  if (isNew) {
    result.push(new Set<string>([x, y]));
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

// need to check if a battery can be added to the curcuit. as could make a triage.

export const partOne = (s: string, limit: number) => {
  const batteries = s.split("\n").map(toBattery);
  let n = 0;
  let lower = 0;
  let circuits: Set<string>[] = [];
  do {
    const shortest = getAllShortest(batteries, lower, circuits);
    const min = shortest.reduce((prev, next) => {
      if (next.distance < prev.distance) {
        return next;
      }
      return prev;
    }, init);
    console.log("the min battery is", min.distance, n);
    circuits = addCircuit(min, circuits);
    lower = min.distance;
    // add the min to object
    //remove from the batteries list
    //console.log("current circuits", circuits);
    n++;
  } while (n < limit);
  console.log("current circuits", circuits);
  const sorted = circuits.map((i) => i.size).sort((a, b) => b - a);
  console.log("sorted sizes", sorted);
  return sorted[0] * sorted[1] * sorted[2];
};

export const partTwo = (s: string) => {
  return 0;
};
