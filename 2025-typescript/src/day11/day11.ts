type Node = {
  curr: string;
  edges: string[];
};

export const toNode = (s: string): Node => {
  const match = s.match(/\w{3}/g);
  if (!match) throw new Error("error here");
  return {
    curr: String(match[0]),
    edges: match.slice(1, match.length).map(String),
  };
};

export const partOne = (s: string) => {
  const nodes: string[] = [];
  const edges = new Map<string, string[]>();
  s.split("\n").forEach((i) => {
    const node = toNode(i);
    nodes.push(node.curr);
    edges.set(node.curr, node.edges);
  });

  const stack: string[] = [];
  stack.push(nodes[nodes.findIndex((i) => i === "you")]);
  let counter = 0;

  while (stack.length > 0) {
    const next = stack.pop()!;
    const nextEdges = edges.get(next)!;
    nextEdges.forEach((i) => (i === "out" ? counter++ : stack.push(i)));
  }

  return counter;
};

export const partTwo = (s: string) => {
  const nodes: string[] = [];
  const edges = new Map<string, string[]>();
  s.split("\n").forEach((i) => {
    const node = toNode(i);
    nodes.push(node.curr);
    edges.set(node.curr, node.edges);
  });

  const explore = (
    curr: string,
    end: string,
    visit: Set<string>,
    scores: Map<string, number>
  ): number => {
    if (curr === end) return 1;
    if (visit.has(curr) || curr === "out") return 0;
    if (scores.has(curr)) return scores.get(curr)!;
    visit.add(curr);
    const total = edges
      .get(curr)!
      .map((nextNode) => explore(nextNode, end, visit, scores))
      .reduce((sum, next) => sum + next);

    visit.delete(curr);
    scores.set(curr, total);
    return total;
  };

  const a = explore("svr", "fft", new Set(), new Map());
  const b = explore("fft", "dac", new Set(), new Map());
  const c = explore("dac", "out", new Set(), new Map());
  const x = explore("svr", "dac", new Set(), new Map());
  const y = explore("dac", "fft", new Set(), new Map());
  const z = explore("fft", "out", new Set(), new Map());
  return a * b * c + x * y * z;
};
