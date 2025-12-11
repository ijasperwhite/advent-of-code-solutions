type Node = {
  curr: string;
  edges: string[];
};
const nodes: string[] = [];
const edges = new Map<string, string[]>();
const routes = new Set<string>();

export const toNode = (s: string): Node => {
  const match = s.match(/\w{3}/g);
  if (!match) throw new Error("error here");
  const curr = String(match[0]);
  const edges = match.slice(1, match.length).map(String);
  return { curr, edges };
};

export const displayGraph = () => {
  let graph = "";
  nodes.forEach((node) => {
    graph += node + " -> " + edges.get(node)?.join(",") + "\n";
  });
  console.log(graph);
};

export const explore = (curr: string, visited: Set<string>) => {
  if (curr === "out") {
    visited.add(curr);
    if (!isPartTwo) {
      routes.add([...visited].join("_"));
    }
    if (isPartTwo && visited.has("fft") && visited.has("dac")) {
      routes.add([...visited].join("_"));
    }
    return; // base case : we need to exit with the route
  }
  if (visited.has(curr)) {
    return; // if already visited exit
  }
  const nextVisited = new Set([...visited.add(curr)]);
  (edges.get(curr) ?? []).map((i) => explore(i, new Set([...nextVisited])));
  return;
};

let isPartTwo: boolean;
const setIsPartTwo = (b: boolean) => {
  isPartTwo = b;
};

const buildGraph = (s: string) => {
  s.split("\n").forEach((i) => {
    const node = toNode(i);
    nodes.push(node.curr);
    edges.set(node.curr, node.edges);
  });
};

export const partOne = (s: string, start: string) => {
  setIsPartTwo(false);
  buildGraph(s);
  // displayGraph();
  explore(start, new Set<string>([]));
  return routes.size;
};

export const partTwo = (s: string, start: string) => {
  setIsPartTwo(true);
  buildGraph(s);
  // displayGraph();
  explore(start, new Set<string>([]));
  return routes.size;
};
