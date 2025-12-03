// PART ONE
type Path = {
  left: string;
  right: string;
};

type Turn = "L" | "R";

type Journey = {
  current: string;
  turns: Turn[];
  paths: Map<string, Path>;
  count: number;
};

export const createPathsMap = (s: string): Map<string, Path> => {
  return s.split("\n").reduce((sum, next) => {
    const words = next.match(/\w+/g)!!;
    return sum.set(words[0], { left: words[1], right: words[2] });
  }, new Map<string, Path>());
};

const getJourneyEndCount = (
  journey: Journey,
  validator: (j: Journey) => boolean
): number => {
  do {
    const nextTurn = journey.turns[journey.count % journey.turns.length];
    const nextPath = journey.paths.get(journey.current)!!;
    if (nextTurn === "L") {
      journey = {
        ...journey,
        current: nextPath.left,
        count: journey.count + 1,
      };
    } else {
      journey = {
        ...journey,
        current: nextPath.right,
        count: journey.count + 1,
      };
    }
  } while (validator(journey));
  return journey.count;
};

const isNotZZZ = (journey: Journey) => journey.current !== "ZZZ";

export const solveOne = (s: string) => {
  const splits = s.split("\n\n");
  let journey: Journey = {
    current: "AAA",
    turns: splits[0].split("") as Turn[],
    paths: createPathsMap(splits[1]),
    count: 0,
  };
  return getJourneyEndCount(journey, isNotZZZ);
};

// PART TWO

const getNodes = (s: string): Set<string> => {
  return s.split("\n").reduce((nodes, next) => {
    const key = next.match(/\w+/g)!![0];
    const nodeMatch = key.match(/[A]/g); // Match to letter 'A'
    if (nodeMatch !== null && nodeMatch.length > 0) {
      return nodes.add(key);
    }
    return nodes;
  }, new Set<string>());
};

const isNotEndNode = (journey: Journey) => {
  const match = journey.current.match(/[Z]/g); // Match to letter 'Z'
  return match === null || match.length === 0;
};

const lcm = (arr: number[]) => {
  const gcd: any = (x: number, y: number) => (!y ? x : gcd(y, x % y));
  const lcm = (x: number, y: number) => (x * y) / gcd(x, y);
  return [...arr].reduce((a, b) => lcm(a, b));
};

export const solveTwo = (s: string) => {
  const splits = s.split("\n\n");
  const turns = splits[0].split("") as Turn[];
  const paths = createPathsMap(splits[1]);
  const results = [...getNodes(splits[1])]
    .map((node) => {
      return {
        current: node,
        turns,
        paths,
        count: 0,
      };
    })
    .map((j) => getJourneyEndCount(j, isNotEndNode));
  return lcm(results);
};
