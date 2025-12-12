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

export const toDistance = (start: Battery, end: Battery): number =>
  Math.pow(start.x - end.x, 2) +
  Math.pow(start.y - end.y, 2) +
  Math.pow(start.z - end.z, 2);

export const getAllConnections = (all: Battery[]): Circuit[] => {
  const result: Circuit[] = [];
  for (let i = 0; i < all.length; i++) {
    for (let j = i + 1; j < all.length; j++) {
      result.push({
        start: all[i],
        end: all[j],
        distance: toDistance(all[i], all[j]),
      });
    }
  }
  return result.sort((a, b) => a.distance - b.distance);
};

export const partOne = (s: string, limit: number) => {
  const batteries = s.split("\n").map(toBattery);
  const sorted = getAllConnections(batteries).map((a) => {
    return { start: batteryToString(a.start), end: batteryToString(a.end) };
  });
  let n = 0;
  const nodes = new Set<string>();
  const edges = new Map<string, Set<string>>();
  do {
    const { start, end } = sorted[n];
    nodes.add(start);
    nodes.add(end);

    const currStartEdges = edges.get(start);
    const currEndEdges = edges.get(end);

    currStartEdges
      ? edges.set(start, currStartEdges.add(end))
      : edges.set(start, new Set([end]));
    currEndEdges
      ? edges.set(end, currEndEdges.add(start))
      : edges.set(end, new Set([start]));
    n++;
  } while (n < limit);

  const stack = [...nodes];
  const visit = new Set<string>();
  const sizes: number[] = [];

  while (stack.length > 0) {
    const nextItem = stack.pop()!;
    if (!visit.has(nextItem)) {
      visit.add(nextItem);
      let counter = 1;
      const queue: string[] = [];
      const nextEdges = [...edges.get(nextItem)!];
      nextEdges.forEach((i) => {
        queue.push(i);
        counter++;
        visit.add(i);
      });
      while (queue.length > 0) {
        const head = queue.shift()!;
        const nextEdges = edges.get(head)!;
        [...nextEdges].forEach((j) => {
          if (!visit.has(j)) {
            queue.push(j);
            counter++;
            visit.add(j);
          }
        });
      }
      sizes.push(counter);
    }
  }

  const high = sizes.sort((a, b) => b - a);
  return high[0] * high[1] * high[2];
};

export const partTwo = (s: string) => {
  const batteries = s.split("\n").map(toBattery);
  const sorted = getAllConnections(batteries).map((a) => {
    return { start: batteryToString(a.start), end: batteryToString(a.end) };
  });
  const target = batteries.length;

  const edges = new Map<string, Set<string>>();
  batteries.forEach((b) => {
    const path = batteryToString(b);
    edges.set(path, new Set([path]));
  });
  let n = 0;

  while (n < sorted.length) {
    const { start, end } = sorted[n];

    const startValues = edges.get(start)!;
    const endValues = edges.get(end)!;
    const stack: string[] = [...startValues, ...endValues];
    const nodes = new Set([...stack]);

    let i = nodes.size;
    while (stack.length > 0) {
      const next = stack.pop()!;
      const nextValues = [...edges.get(next)!];
      nextValues.forEach((a) => {
        if (!nodes.has(a)) {
          i++;
          nodes.add(a);
          stack.push(a);
        }
      });
    }
    if (i === target) {
      return toBattery(start).x * toBattery(end).x;
    }
    edges.set(start, new Set([...startValues, ...endValues]));
    edges.set(end, new Set([...endValues, ...startValues]));
    n++;
  }
  // should not get here
  return 0;
};
