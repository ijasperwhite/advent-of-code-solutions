import { exampleOne } from "../input-examples/day10-examples";

// PART ONE
type Location = {
  x: number;
  y: number;
};

type Node = {
  symbol: string;
  location: Location;
  connected: Location[];
};

export const getConnectedLocations = (
  location: Location,
  s: string
): Location[] => {
  if (s === "|") {
    return [
      { x: location.x, y: location.y - 1 },
      { x: location.x, y: location.y + 1 },
    ];
  } else if (s === "-" || s === "-") {
    return [
      { x: location.x - 1, y: location.y },
      { x: location.x + 1, y: location.y },
    ];
  } else if (s === "L") {
    return [
      { x: location.x + 1, y: location.y },
      { x: location.x, y: location.y + 1 },
    ];
  } else if (s === "J") {
    return [
      { x: location.x - 1, y: location.y },
      { x: location.x, y: location.y + 1 },
    ];
  } else if (s === "7") {
    return [
      { x: location.x - 1, y: location.y },
      { x: location.x, y: location.y - 1 },
    ];
  } else if (s === "F") {
    return [
      { x: location.x + 1, y: location.y },
      { x: location.x, y: location.y - 1 },
    ];
  }
  return [];
};

export const getNodes = (s: string[]) => {
  return s.flatMap((r, y) => {
    return r.split("").reduce((sum, curr, x) => {
      if (curr !== ".") {
        sum.push({
          symbol: curr,
          location: { x, y },
          connected: getConnectedLocations({ x, y }, curr),
        });
      }
      return sum;
    }, [] as Node[]);
  });
};

export const getNextNodes = (curr: Node, prev: Node | null, nodes: Node[]) => {
  if (prev !== null) {
    const next = curr.connected.find(
      (l) => l.x !== prev?.location.x || l.y !== prev?.location.y
    );
    return [
      nodes.find((e) => next?.x === e.location.x && next.y === e.location.y)!!,
    ];
  } else {
    return nodes.filter((n) => {
      const result = n?.connected.some(
        (e) => e.x === curr.location.x && e.y === curr.location.y
      );
      return result;
    });
  }
};

export const solveOne = (s: string) => {
  const lines = s.split("\n").reverse();
  const nodes = getNodes(lines);
  const start = nodes.find((n) => n?.symbol === "S")!!;
  const connected = getNextNodes(start, null, nodes);
  let count = 1;
  let [currOne, currTwo] = [connected[0], connected[1]];
  let [onePrev, twoPrev] = [start, start];
  do {
    const nextOne = getNextNodes(currOne, onePrev, nodes);
    const nextTwo = getNextNodes(currTwo, twoPrev, nodes);
    [onePrev, twoPrev] = [currOne, currTwo];
    [currOne, currTwo] = [nextOne[0], nextTwo[0]];
    count += 1;
  } while (currOne !== currTwo);
  return count;
};

// PART TWO

const getOutputArray = (arr: Location[], rowMax: number, columnMax: number) => {
  const init = [...new Array(columnMax)].map((r) =>
    [...new Array(rowMax)].map((e) => ".")
  );
  const result = arr.reduce((sum, curr, i) => {
    const [x, y] = [curr.x, curr.y];
    sum[y][x] = "X";
    return sum;
  }, init as string[][]);
  result.forEach((l) => {
    console.log(l.join(""));
  });
};

export const solveTwo = (s: string) => {
  const lines = s.split("\n").reverse();
  const nodes = getNodes(lines);
  const start = nodes.find((n) => n?.symbol === "S")!!;
  const connected = getNextNodes(start, null, nodes);
  let count = 1;
  let [currOne, currTwo] = [connected[0], connected[1]];
  let [onePrev, twoPrev] = [start, start];
  const visited = [start.location, currOne.location, currTwo.location];
  do {
    const nextOne = getNextNodes(currOne, onePrev, nodes);
    const nextTwo = getNextNodes(currTwo, twoPrev, nodes);
    [onePrev, twoPrev] = [currOne, currTwo];
    [currOne, currTwo] = [nextOne[0], nextTwo[0]];
    visited.push(currOne.location);
    visited.push(currTwo.location);
    count += 1;
  } while (currOne !== currTwo);
  getOutputArray(visited, lines[0].length, lines.length);
  return count;
};
